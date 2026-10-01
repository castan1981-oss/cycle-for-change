"use strict";
// tools/rides-watch.js against offline fixtures — node --test tools/test/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const W = require("../rides-watch.js");
const F = require("../lib/rides-freshness.js");

const FIX = path.join(__dirname, "fixtures");
const PAGE = "https://example.org/rides";
const ride = (o = {}) => ({
  slug: "tempe-az-bean-cafe-saturday-social", name: "Bean Café Saturday Social", name_en: null, kind: "group-ride", status: "active",
  city: "Tempe", region: "Arizona", state: "AZ", country: "US", lat: 33.42, lng: -111.94, tz: "America/Phoenix", discipline: ["road"],
  schedule: "Every Saturday, roll 7:00 am", days: ["sat"], time_local: "7:00 am", start_hhmm: "07:00", frequency: "weekly", monthly_rule: null,
  season: "year-round", season_months: null, host: { name: "Bean Café", type: "cafe" }, language: ["en"],
  description: "A no-drop Saturday road ride from the café and back for coffee.", links: { website: PAGE, other: [] },
  inclusive_focus: [], sources: [PAGE], verified_on: "2026-09-15", last_seen: null, confidence: "high",
  refresh: { method: "static-page", watch_url: PAGE, feed_url: null, notes: null }, ...o,
});
const html = (body, head = "") => `<!doctype html><html><head><title>Rides — Bean Café</title>${head}</head><body><nav>Home · Shop · Rides</nav>${body}<footer>© 2026 Bean Café</footer></body></html>`;
const schedulePage = (time = "7:00 am", extra = "") => html(`<h2>Bean Café Saturday Social</h2><p>Every Saturday, roll ${time} from the café. No-drop, 25 miles, coffee after.</p><p>Rides are cancelled if it rains.</p>${extra}`);
const ics = (...events) => ["BEGIN:VCALENDAR", "VERSION:2.0", "X-WR-CALNAME:Bean Café rides", ...events.flatMap((e) => ["BEGIN:VEVENT", ...e, "END:VEVENT"]), "END:VCALENDAR", ""].join("\r\n");

function sandbox() { return fs.mkdtempSync(path.join(os.tmpdir(), "rides-watch-")); }
// One watch run on fixtures: { url: { status, type, body | file, location, error } }
async function watch(dir, rides, fixtures, today, extra = {}) {
  fs.writeFileSync(path.join(dir, "rides.json"), JSON.stringify(rides));
  const fx = path.join(dir, "fx");
  fs.mkdirSync(fx, { recursive: true });
  const map = {};
  for (const [url, f] of Object.entries(fixtures)) {
    const g = { ...f };
    if (g.file) { fs.copyFileSync(g.file, path.join(fx, path.basename(g.file))); g.file = path.basename(g.file); }
    map[url] = g;
  }
  fs.writeFileSync(path.join(fx, "fixtures.json"), JSON.stringify(map));
  return W.run({ data: path.join(dir, "rides.json"), health: path.join(dir, "rides-health.json"), outDir: dir, offline: fx, today, ...extra });
}
const entry = (res, slug = ride().slug) => res.health.rides[slug];
const open = (e) => (e.flags || []).filter((f) => !f.resolved);

test("a schedule page is read and fingerprinted, with no flags on the first look", async () => {
  const dir = sandbox();
  const res = await watch(dir, [ride()], { [PAGE]: { body: schedulePage() } }, "2026-09-30");
  const u = entry(res).urls[0];
  assert.equal(u.class, "ok");
  assert.equal(u.role, "watch");
  assert.equal(u.time_present, true);
  assert.equal(u.day_present, true);
  assert.match(u.schedule_text, /Every Saturday, roll 7:00 am/);
  assert.match(u.fp_schedule, /^[0-9a-f]{40}$/);
  assert.equal(u.end_words, undefined, "\"cancelled if it rains\" is not an end word");
  assert.equal(open(entry(res)).length, 0);
  for (const f of ["rides-health.json", "rides-queue.json", "rides-queue.md"]) assert.ok(fs.existsSync(path.join(dir, f)), f);
  assert.match(fs.readFileSync(path.join(dir, "rides-queue.md"), "utf8"), /# Rides to re-check/);
  assert.equal(JSON.parse(fs.readFileSync(path.join(dir, "rides-queue.json"), "utf8")).queue[0].slug, ride().slug);
});

test("a changed start time is an amber flag, with what the page said before and now", async () => {
  const dir = sandbox();
  await watch(dir, [ride()], { [PAGE]: { body: schedulePage("7:00 am") } }, "2026-09-30");
  const res = await watch(dir, [ride()], { [PAGE]: { body: schedulePage("7:30 am") } }, "2026-10-05");
  const flags = open(entry(res));
  const changed = flags.find((f) => f.code === "schedule-text-changed");
  assert.ok(changed, "schedule-text-changed");
  assert.equal(changed.severity, "amber");
  assert.equal(changed.since, "2026-10-05");
  assert.match(changed.was, /7:00/);
  assert.match(changed.now, /7:30/);
  assert.ok(flags.find((f) => f.code === "time-missing"), "7:00 am is gone from the page");
  const a = F.assess(ride(), entry(res), "2026-10-05");
  assert.equal(a.state, "flagged");
  assert.equal(a.listed, true);
  // the same change next week is not raised twice
  const again = await watch(dir, [ride()], { [PAGE]: { body: schedulePage("7:30 am") } }, "2026-10-12");
  assert.equal(open(entry(again)).filter((f) => f.code === "schedule-text-changed").length, 1);
  assert.equal(open(entry(again)).find((f) => f.code === "schedule-text-changed").since, "2026-10-05");
});

test("a page that rolls its dates forward is not a change", async () => {
  const dir = sandbox();
  const cal = (d1, d2) => html(`<h2>Upcoming</h2><ul><li>Sat ${d1} · 7:00 am · Bean Café Saturday Social · 12 going</li><li>Sat ${d2} · 7:00 am · Bean Café Saturday Social · 3 going</li></ul>`);
  await watch(dir, [ride()], { [PAGE]: { body: cal("Oct 3", "Oct 10") } }, "2026-09-30");
  const res = await watch(dir, [ride()], { [PAGE]: { body: cal("Oct 10", "Oct 17") } }, "2026-10-05");
  assert.equal(open(entry(res)).length, 0);
});

test("a 404 is a red page-gone flag: listed with a warning for the grace period", async () => {
  const dir = sandbox();
  const res = await watch(dir, [ride()], { [PAGE]: { status: 404, body: html("<h1>Not found</h1>") } }, "2026-09-30");
  const f = open(entry(res)).find((x) => x.code === "page-gone");
  assert.ok(f);
  assert.equal(f.severity, "red");
  assert.match(f.detail, /404/);
  const a = F.assess(ride(), entry(res), "2026-10-01");
  assert.equal(a.state, "flagged");
  assert.equal(a.listed, true);
  assert.equal(a.priority, F.QUEUE.red);
  assert.equal(F.assess(ride(), entry(res), "2026-10-20").listed, false, "hidden once the grace period is over");
});

test("a parked domain and a DNS failure two runs running are page-gone too", async () => {
  let dir = sandbox();
  let res = await watch(dir, [ride()], { [PAGE]: { body: "<html><title>example.org</title><body>This domain is for sale! Buy this domain today.</body></html>" } }, "2026-09-30");
  assert.equal(entry(res).urls[0].why, "parked");
  assert.ok(open(entry(res)).find((x) => x.code === "page-gone"));
  dir = sandbox();
  res = await watch(dir, [ride()], { [PAGE]: { error: "ENOTFOUND" } }, "2026-09-30");
  assert.equal(open(entry(res)).length, 0, "one DNS failure is not enough");
  res = await watch(dir, [ride()], { [PAGE]: { error: "ENOTFOUND" } }, "2026-10-05");
  assert.ok(open(entry(res)).find((x) => x.code === "page-gone"));
});

test("a bot wall is no flag the first time; three runs running on every URL is unreachable", async () => {
  const dir = sandbox();
  const wall = { [PAGE]: { status: 403, body: "<html><head><title>Just a moment...</title></head><body><div id=\"cf-chl-widget\"></div></body></html>" } };
  let res = await watch(dir, [ride()], wall, "2026-09-30");
  assert.equal(entry(res).urls[0].class, "bot-wall");
  assert.equal(entry(res).urls[0].fail_streak, 1);
  assert.equal(open(entry(res)).length, 0);
  res = await watch(dir, [ride()], wall, "2026-10-05");
  assert.equal(open(entry(res)).length, 0);
  res = await watch(dir, [ride()], wall, "2026-10-12");
  const f = open(entry(res)).find((x) => x.code === "unreachable");
  assert.ok(f, "unreachable after three");
  assert.equal(f.severity, "amber");
  // it loads again: resolved
  res = await watch(dir, [ride()], { [PAGE]: { body: schedulePage() } }, "2026-10-19");
  assert.equal(open(entry(res)).length, 0);
  assert.equal(entry(res).flags.find((x) => x.code === "unreachable").resolved_by, "watch");
});

test("an ICS feed with a weekly rule is proof of life: feed_seen and feed_next", async () => {
  const dir = sandbox();
  const FEED = "https://example.org/rides.ics";
  const r = ride({ verified_on: "2026-03-01", refresh: { method: "ics", watch_url: PAGE, feed_url: FEED, notes: null } });
  const res = await watch(dir, [r], {
    [PAGE]: { body: schedulePage() },
    [FEED]: { type: "text/calendar", body: ics(["UID:w1", "SUMMARY:Bean Café Saturday Social", "DTSTART;TZID=America/Phoenix:20250104T070000", "RRULE:FREQ=WEEKLY;BYDAY=SA"]) },
  }, "2026-09-30");
  const e = entry(res);
  assert.equal(e.feed_seen, "2026-09-30");
  assert.equal(e.feed_next, "2026-10-03 07:00");
  assert.equal(e.feed_via, "ics");
  const a = F.assess(r, e, "2026-10-01");
  assert.equal(a.state, "fresh", "an old check kept fresh by the host's own feed");
  assert.equal(a.checked_by, "feed");
});

test("an ICS feed with a last-Friday monthly rule finds the next last Friday", async () => {
  const dir = sandbox();
  const FEED = "https://example.org/cm.ics";
  const r = ride({ slug: "london-gb-kings-cross-last-friday", name: "Kings Cross Wheelers Last Friday", city: "London", region: "England", state: null, country: "GB",
    tz: "Europe/London", days: ["fri"], start_hhmm: "18:30", frequency: "monthly", monthly_rule: [{ ord: -1, day: "fri" }], host: { name: "Kings Cross Wheelers", type: "club" },
    refresh: { method: "ics", watch_url: FEED, feed_url: FEED, notes: null } });
  const res = await watch(dir, [r], {
    [FEED]: { type: "text/calendar; charset=utf-8", body: ics(["UID:cm", "SUMMARY:Last Friday ride", "DTSTART;TZID=Europe/London:20240126T183000", "RRULE:FREQ=MONTHLY;BYDAY=-1FR"]) },
  }, "2026-09-30");
  const e = entry(res, r.slug);
  assert.equal(e.feed_seen, "2026-09-30");
  assert.equal(e.feed_next, "2026-10-30 18:30");
});

test("a shared calendar needs the ride's name: another group's Saturday 7 am is not proof", async () => {
  const dir = sandbox();
  const FEED = "https://example.org/city.ics";
  const r = ride({ refresh: { method: "ics", watch_url: PAGE, feed_url: FEED, notes: null } });
  const others = ["Hills Club Saturday", "Canal Ladies Ride", "Kids Bike Rodeo", "Night Owls"].map((s, i) => [`UID:o${i}`, `SUMMARY:${s}`, "DTSTART;TZID=America/Phoenix:20250104T070000", "RRULE:FREQ=WEEKLY;BYDAY=SA"]);
  const res = await watch(dir, [r], { [PAGE]: { body: schedulePage() }, [FEED]: { type: "text/calendar", body: ics(...others) } }, "2026-09-30");
  assert.equal(entry(res).feed_seen, undefined);
});

test("JSON-LD Event objects on the host's page are proof of life", async () => {
  const dir = sandbox();
  const ld = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebPage","name":"Rides"},{"@type":"Event","name":"Bean Café Saturday Social","startDate":"2026-10-03T07:00:00-07:00","eventStatus":"https://schema.org/EventScheduled"}]}</script>`;
  const res = await watch(dir, [ride()], { [PAGE]: { body: schedulePage("7:00 am", ld) } }, "2026-09-30");
  const e = entry(res);
  assert.equal(e.feed_via, "json-ld");
  assert.equal(e.feed_next, "2026-10-03 07:00");
});

test("a Strava club event page ('Oct 1 Thu 5:30 AM') is proof of life", async () => {
  const dir = sandbox();
  const EV = "https://www.strava.com/clubs/620243/group_events/815123";
  const r = ride({ slug: "scottsdale-az-gainey-thursday", name: "Gainey Thursday", city: "Scottsdale", days: ["thu"], start_hhmm: "05:30", time_local: "5:30 am",
    schedule: "Every Thursday, 5:30 am", host: { name: "Scottsdale Cycling (Strava club)", type: "club" }, sources: [EV], links: { strava: "https://www.strava.com/clubs/620243", other: [EV] },
    refresh: { method: "strava-club", watch_url: EV, feed_url: null, notes: null } });
  const res = await watch(dir, [r], { [EV]: { file: path.join(FIX, "strava-event.html") } }, "2026-09-30");
  const e = entry(res, r.slug);
  assert.equal(e.urls[0].class, "ok");
  assert.deepEqual(e.urls[0].event, { date: "2026-10-01", time: "05:30", title: "Gainey Thursday (Hidden Hills)" });
  assert.equal(e.feed_seen, "2026-09-30");
  assert.equal(e.feed_next, "2026-10-01 05:30");
  assert.equal(e.feed_via, "strava");
  assert.equal(open(e).length, 0);
});

test("a Strava event whose date has passed is an amber event-date-past flag", async () => {
  const dir = sandbox();
  const EV = "https://www.strava.com/clubs/620243/group_events/815123";
  const r = ride({ slug: "scottsdale-az-gainey-thursday", name: "Gainey Thursday", city: "Scottsdale", days: ["thu"], start_hhmm: "05:30",
    host: { name: "Scottsdale Cycling", type: "club" }, refresh: { method: "strava-club", watch_url: EV, feed_url: null, notes: null } });
  const res = await watch(dir, [r], { [EV]: { file: path.join(FIX, "strava-event-past.html") } }, "2026-09-30");
  const e = entry(res, r.slug);
  assert.equal(e.urls[0].event.date, "2026-09-03");
  assert.equal(e.feed_seen, undefined);
  const f = open(e).find((x) => x.code === "event-date-past");
  assert.ok(f);
  assert.equal(f.severity, "amber");
});

test("a deleted Strava event (it opens the club page) is page-gone; other strava.com pages aren't fetched", async () => {
  const dir = sandbox();
  const EV = "https://www.strava.com/clubs/620243/group_events/999";
  const r = ride({ refresh: { method: "strava-club", watch_url: EV, feed_url: null, notes: null }, links: { strava: "https://www.strava.com/clubs/620243", other: [] } });
  const res = await watch(dir, [r], { [EV]: { status: 307, location: "https://www.strava.com/clubs/620243" }, "https://www.strava.com/clubs/620243": { body: html("<h1>Scottsdale Cycling</h1>") } }, "2026-09-30");
  assert.equal(entry(res).urls[0].why, "strava-event-deleted");
  assert.ok(open(entry(res)).find((x) => x.code === "page-gone"));
  const ig = ride({ refresh: { method: "instagram", watch_url: "https://www.instagram.com/beancafe/", feed_url: null, notes: null } });
  const res2 = await watch(sandbox(), [ig], {}, "2026-09-30");
  assert.equal(entry(res2).urls[0].class, "social");
  assert.equal(open(entry(res2)).length, 0);
});

test("end words: ones already on the page are remembered, new ones raise a red flag", async () => {
  const dir = sandbox();
  const first = schedulePage("7:00 am", "<p>The Bean Café Saturday Social is suspended.</p>");
  let res = await watch(dir, [ride()], { [PAGE]: { body: first } }, "2026-09-30");
  assert.deepEqual(entry(res).urls[0].end_words, ["suspended"]);
  assert.equal(open(entry(res)).length, 0, "standing on the first read: not flagged");
  res = await watch(dir, [ride()], { [PAGE]: { body: first } }, "2026-10-05");
  assert.equal(open(entry(res)).length, 0, "still standing");
  const second = schedulePage("7:00 am", "<p>The Bean Café Saturday Social is suspended.</p><p>Update: the Bean Café Saturday Social has been discontinued.</p>");
  res = await watch(dir, [ride()], { [PAGE]: { body: second } }, "2026-10-12");
  const f = open(entry(res)).find((x) => x.code === "end-words");
  assert.ok(f, "a new end word");
  assert.equal(f.severity, "red");
  assert.match(f.detail, /discontinued/);
  assert.doesNotMatch(f.detail, /"suspended"/);
  // other languages, near the ride's name
  const es = ride({ slug: "tempe-az-rodada-nocturna", name: "Rodada Nocturna Tacuba", language: ["es"], host: { name: "Colectivo Tacuba", type: "collective" } });
  const d2 = sandbox();
  await watch(d2, [es], { [PAGE]: { body: html("<p>Rodada Nocturna Tacuba: todos los sábados, 7:00 am.</p>") } }, "2026-09-30");
  const r2 = await watch(d2, [es], { [PAGE]: { body: html("<p>Rodada Nocturna Tacuba: ya no se realiza. Gracias a todos.</p>") } }, "2026-10-05");
  assert.ok(open(entry(r2, es.slug)).find((x) => x.code === "end-words"));
});

test("a person's re-check after the flag clears it, and the watcher doesn't raise it again", async () => {
  const dir = sandbox();
  const gone = { [PAGE]: { status: 404, body: html("<h1>Not found</h1>") } };
  let res = await watch(dir, [ride()], gone, "2026-09-30");
  assert.ok(open(entry(res)).find((x) => x.code === "page-gone"));
  // a verifier confirmed the ride somewhere else on Oct 2 (rides-apply moved verified_on)
  res = await watch(dir, [ride({ verified_on: "2026-10-02" })], gone, "2026-10-07");
  assert.equal(open(entry(res)).length, 0);
  assert.equal(entry(res).flags[0].resolved_by, "re-check");
  res = await watch(dir, [ride({ verified_on: "2026-10-02" })], gone, "2026-10-14");
  assert.equal(open(entry(res)).length, 0, "not raised again for the same outage");
});

test("a page that comes back resolves its flag", async () => {
  const dir = sandbox();
  await watch(dir, [ride()], { [PAGE]: { status: 404, body: "" } }, "2026-09-30");
  const res = await watch(dir, [ride()], { [PAGE]: { body: schedulePage() } }, "2026-10-05");
  assert.equal(open(entry(res)).length, 0);
  assert.equal(entry(res).flags[0].code, "page-gone");
  assert.equal(entry(res).flags[0].resolved_by, "watch");
  assert.equal(entry(res).flags[0].resolved_at, "2026-10-05");
});

test("a feed the host's page points at becomes a feed candidate, and counts this run", async () => {
  const dir = sandbox();
  const FEED = "https://example.org/events/?ical=1";
  const page = schedulePage("7:00 am").replace("</head>", `<link rel="alternate" type="text/calendar" title="Bean Café events" href="${FEED}"></head>`);
  const res = await watch(dir, [ride({ verified_on: "2026-03-01" })], {
    [PAGE]: { body: page },
    [FEED]: { type: "text/calendar", body: ics(["UID:w1", "SUMMARY:Bean Café Saturday Social", "DTSTART;TZID=America/Phoenix:20250104T070000", "RRULE:FREQ=WEEKLY;BYDAY=SA"]) },
  }, "2026-09-30");
  const e = entry(res);
  assert.equal(e.feed_candidate.url, FEED);
  assert.equal(e.feed_candidate.found, "2026-09-30");
  assert.equal(e.feed_seen, "2026-09-30");
  assert.equal(e.feed_via, "candidate");
  assert.equal(res.summary.feed_candidates_new, 1);
});

test("a permanent redirect to another site's homepage is an amber moved flag", async () => {
  const dir = sandbox();
  const res = await watch(dir, [ride()], { [PAGE]: { status: 301, location: "https://newclub.org/" }, "https://newclub.org/": { body: html("<h1>Welcome to New Club</h1>") } }, "2026-09-30");
  assert.equal(entry(res).urls[0].final_url, "https://newclub.org/");
  const f = open(entry(res)).find((x) => x.code === "moved");
  assert.ok(f);
  assert.equal(f.severity, "amber");
});

test("only what changed changes: a second identical run, and rides outside --only, keep their entries", async () => {
  const dir = sandbox();
  const other = ride({ slug: "tempe-az-other-ride", name: "Mill Avenue Night Roll", refresh: { method: "static-page", watch_url: "https://example.org/other", feed_url: null, notes: null } });
  const fx = { [PAGE]: { body: schedulePage() }, "https://example.org/other": { body: html("<p>Mill Avenue Night Roll, Saturdays 7:00 am</p>") } };
  const a = await watch(dir, [ride(), other], fx, "2026-09-30");
  const b = await watch(dir, [ride(), other], fx, "2026-09-30");
  assert.deepEqual(b.health.rides, a.health.rides);
  const c = await watch(dir, [ride(), other], { [PAGE]: { status: 404, body: "" } }, "2026-10-05", { only: [ride().slug] });
  assert.deepEqual(c.health.rides[other.slug], a.health.rides[other.slug], "untouched");
  assert.ok(open(c.health.rides[ride().slug]).length);
  assert.equal(c.health.summary.last_partial.partial, true);
});

test("readers: time spellings, Strava text, JSON-LD shapes, feed discovery", () => {
  const t = (hhmm, s) => { const re = W.timeRe(hhmm); re.lastIndex = 0; return (W.foldSame(s).match(re) || []).length; };
  assert.equal(t("17:30", "roll 5:30 pm · 17:30 · 17h30 · 5.30"), 4);
  assert.equal(t("17:30", "5:30 am"), 0);
  assert.equal(t("18:00", "6pm, 6 p.m., 18 Uhr, 18h"), 4);
  assert.equal(W.stravaEvent("", "Club Event Mittwochsrunde Mar 31 Wed 5:30 PM Wednesday", "2026-09-30").date, "2027-03-31");
  const nd = `<script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps":{"event":{"occurrences":[{"occurrenceDateTime":"2026-10-01T05:30:00","title":"Gainey Thursday"}]}}}}</script>`;
  assert.deepEqual(W.stravaEvent(nd, "", "2026-09-30").date, "2026-10-01");
  const list = W.jsonLdEvents(`<script type="application/ld+json">[{"@type":"ItemList","itemListElement":[{"@type":"ListItem","item":{"@type":"SportsEvent","name":"A","startDate":"2026-10-03T07:00"}}]},{"@type":"Event","name":"B","startDate":"2026-10-04","eventStatus":"https://schema.org/EventCancelled"}]</script>`);
  assert.equal(list.length, 1);
  assert.equal(list[0].time, "07:00");
  const feeds = W.discoverFeeds(`<iframe src="https://calendar.google.com/calendar/embed?src=club%40example.org&ctz=America%2FPhoenix"></iframe><div class="tribe-events"></div>`, "https://example.org/events/");
  assert.equal(feeds[0], "https://calendar.google.com/calendar/ical/club%40example.org/public/basic.ics");
  assert.ok(feeds.includes("https://example.org/events/?ical=1"));
  assert.equal(W.meetupIcal("https://www.meetup.com/global-bikes-meetup/events/316176055/"), "https://www.meetup.com/global-bikes-meetup/events/ical/");
});

test("an event that names another city near the ride isn't the ride (no false proof)", async () => {
  const FEED = "https://www.meetup.com/crank-arm/events/ical/";
  const raleigh = ride({ slug: "raleigh-nc-crank-arm-wednesday", name: "Crank Arm Wednesday Bike Ride", city: "Raleigh", state: "NC", region: "North Carolina",
    tz: "America/New_York", days: ["wed"], start_hhmm: "19:00", host: { name: "Crank Arm Brewing", type: "cafe" }, refresh: { method: "meetup", watch_url: FEED, feed_url: FEED, notes: null } });
  const durham = ride({ slug: "durham-nc-bull-city-roll", name: "Bull City Roll", city: "Durham", state: "NC", region: "North Carolina", tz: "America/New_York" });
  const evs = ics(["UID:d", "SUMMARY:Crank Arm DURHAM Wednesday Night Ride", "DTSTART;TZID=America/New_York:20250101T183000", "RRULE:FREQ=WEEKLY;BYDAY=WE"]);
  let res = await watch(sandbox(), [raleigh, durham], { [FEED]: { type: "text/calendar", body: evs } }, "2026-09-30", { only: [raleigh.slug] });
  assert.equal(entry(res, raleigh.slug).feed_seen, undefined);
  assert.equal(open(entry(res, raleigh.slug)).length, 0);
  const both = ics(["UID:d", "SUMMARY:Crank Arm DURHAM Wednesday Night Ride", "DTSTART;TZID=America/New_York:20250101T183000", "RRULE:FREQ=WEEKLY;BYDAY=WE"],
    ["UID:r", "SUMMARY:Crank Arm Raleigh Wednesday Ride", "DTSTART;TZID=America/New_York:20250101T190000", "RRULE:FREQ=WEEKLY;BYDAY=WE"]);
  res = await watch(sandbox(), [raleigh, durham], { [FEED]: { type: "text/calendar", body: both } }, "2026-09-30", { only: [raleigh.slug] });
  assert.equal(entry(res, raleigh.slug).feed_next, "2026-09-30 19:00");
  assert.equal(open(entry(res, raleigh.slug)).length, 0, "the event on our time wins over the one 30 minutes off");
});

test("an event page dated last week is no warning; one dated months ago is", async () => {
  const mk = (date) => schedulePage("7:00 am", `<script type="application/ld+json">{"@type":"Event","name":"Bean Café Saturday Social","startDate":"${date}T07:00:00-07:00"}</script>`);
  let res = await watch(sandbox(), [ride()], { [PAGE]: { body: mk("2026-09-19") } }, "2026-09-30");
  assert.equal(open(entry(res)).length, 0);
  res = await watch(sandbox(), [ride()], { [PAGE]: { body: mk("2026-05-16") } }, "2026-09-30");
  const f = open(entry(res)).find((x) => x.code === "event-date-past");
  assert.ok(f);
  assert.match(f.detail, /May 16, 2026/);
});

test("in a host's own Meetup feed the host's name identifies nothing: trivia night is not the ride", async () => {
  const FEED = "https://www.meetup.com/crank-arm/events/ical/";
  const r = ride({ slug: "raleigh-nc-crank-arm-wednesday", name: "Crank Arm Wednesday Bike Ride", city: "Raleigh", state: "NC", region: "North Carolina",
    tz: "America/New_York", days: ["wed"], start_hhmm: "19:00", host: { name: "Crank Arm Brewing", type: "cafe" }, refresh: { method: "meetup", watch_url: FEED, feed_url: FEED, notes: null } });
  const evs = ics(["UID:t", "SUMMARY:Hammered Trivia at Crank Arm Raleigh", "DTSTART;TZID=America/New_York:20250102T190000", "RRULE:FREQ=WEEKLY;BYDAY=TH"]);
  const res = await watch(sandbox(), [r], { [FEED]: { type: "text/calendar", body: evs } }, "2026-09-30");
  assert.equal(open(entry(res, r.slug)).length, 0);
  assert.equal(entry(res, r.slug).feed_seen, undefined);
});

test("an unnamed event can't prove a ride out of its season, or one that carries another listed ride's name", async () => {
  const FEED = "https://calendar.google.com/calendar/ical/hub%40example.org/public/basic.ics";
  const hub = { name: "Black Hills Bike Hub", type: "shop" };
  const ladies = ride({ slug: "rapid-city-sd-hub-ladies", name: "Black Hills Bike Hub Ladies Rides", city: "Rapid City", state: "SD", region: "South Dakota", tz: "America/Denver",
    days: ["thu"], start_hhmm: "18:00", season: "June to August", season_months: { start: 6, end: 8 }, host: hub, refresh: { method: "ics", watch_url: FEED, feed_url: FEED, notes: null } });
  const chilly = ride({ slug: "rapid-city-sd-hub-chilly-nights", name: "Chilly Nights, Chill Rides", city: "Rapid City", state: "SD", region: "South Dakota", tz: "America/Denver",
    days: ["thu"], start_hhmm: null, season_months: { start: 11, end: 12 }, host: hub, refresh: { method: "ics", watch_url: FEED, feed_url: FEED, notes: null } });
  const evs = ics(["UID:c", "SUMMARY:Chilly Nights - Chill Rides", "DTSTART;TZID=America/Denver:20251002T180000", "RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TH"]);
  const res = await watch(sandbox(), [ladies, chilly], { [FEED]: { type: "text/calendar", body: evs } }, "2026-09-30");
  assert.equal(entry(res, ladies.slug).feed_seen, undefined, "October is out of the Ladies Rides' season, and the event is the other ride's");
  assert.equal(entry(res, chilly.slug).feed_seen, "2026-09-30", "named like the ride: proof, season or not");
  const summer = ride({ ...ladies, season_months: null });
  const res2 = await watch(sandbox(), [summer, chilly], { [FEED]: { type: "text/calendar", body: evs } }, "2026-09-30");
  assert.equal(entry(res2, summer.slug).feed_seen, undefined, "in season, but the event carries the other ride's name");
});
