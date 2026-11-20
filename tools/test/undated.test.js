// Nov 19, 2026: when a ride page may not promise a next date, and what a ride page may call "the host's website".
// Run: node --test tools/test/undated.test.js
"use strict";
const test = require("node:test");
const assert = require("node:assert");
const F = require("../lib/rides-freshness.js");
const SCH = require("../lib/schedule.js");
const RC = require("../lib/ride-calendars.js");

const TODAY = "2026-11-19";
const ride = (over = {}) => ({ slug: "x", status: "active", verified_on: "2026-10-01", confidence: "high", tz: "America/Chicago", frequency: "weekly",
  days: ["fri"], start_hhmm: "19:00", schedule: "Fridays, 7:00 pm", sources: [], links: {}, ...over });
const feed = (matched) => ({ url: "https://cal.example/basic.ics", role: "feed", feed: { events: 30, matched } });

test("a plain fresh ride keeps its date", () => {
  const a = F.assess(ride(), null, TODAY);
  assert.strictEqual(a.undated, null);
  assert.ok(SCH.nextOccurrence({ ...ride(), _f: a }, new Date(`${TODAY}T12:00:00Z`)));
});

test("ran out: the schedule text names an end date, with its year, that has passed and nobody has checked since", () => {
  const r = ride({ schedule: "Every Saturday in October. The calendar series runs through Oct 31, 2026." });
  const a = F.assess(r, null, TODAY);
  assert.strictEqual(a.undated, "ran-out");
  assert.match(a.nudge, /ran through Oct 31, 2026\. We've taken the next date down/);
  assert.strictEqual(SCH.nextOccurrence({ ...r, _f: a }, new Date(`${TODAY}T12:00:00Z`)), null);
  assert.deepStrictEqual(SCH.upcomingDates({ ...r, _f: a, dates: [{ date: "2026-12-05", start_hhmm: "10:00" }] }, new Date(`${TODAY}T12:00:00Z`)), []);
  assert.strictEqual(a.listed, true, "the ride stays listed");
  assert.strictEqual(a.priority, F.QUEUE.undated, "and goes up the re-check queue");
  // checked since the end date: the checker saw it, the date stands
  assert.strictEqual(F.assess({ ...r, verified_on: "2026-11-10" }, null, TODAY).undated, null);
  // an end date still ahead
  assert.strictEqual(F.assess(ride({ schedule: "Thursdays through Dec 17, 2026." }), null, TODAY).undated, null);
});

test("seriesEnd reads end dates only: a year is required, a range counts, a restart date doesn't", () => {
  const end = (schedule, notes) => F.seriesEnd({ schedule, refresh: { notes } });
  assert.strictEqual(end("Every Thursday, 6:00 pm, May 21 to Oct 29, 2026."), "2026-10-29");
  assert.strictEqual(end("Wednesdays", "Series entry ends Nov 1, 2026; the shop posts the next one."), "2026-11-01");
  assert.strictEqual(end("Every Wednesday, 6:00 pm (last ride Oct 28, 2026)"), "2026-10-28");
  assert.strictEqual(end("Fridays, 9:00 am ready to ride; paused until October 16, 2026"), null);
  assert.strictEqual(end("Saturdays through October"), null);
  assert.strictEqual(end("Mondays through Oct 26"), null, "no year, no evidence");
  assert.strictEqual(end("Meet 6:00 pm; ride to Dec 31, 2026 brewery night"), null, "a bare 'to' needs a start date before it");
  assert.strictEqual(end("Summer ended Sept 30, 2026. Winter series runs through Mar 30, 2027."), "2027-03-30");
});

test("feed stopped: the calendar used to list it, hasn't for two weeks, and nobody checked at the source since", () => {
  const h = { feed_seen: "2026-10-26", urls: [feed(0)] };
  const a = F.assess(ride(), h, TODAY);
  assert.strictEqual(a.undated, "feed-stopped");
  assert.match(a.nudge, /hasn't listed it since Oct 26, 2026/);
  assert.strictEqual(F.assess(ride(), { feed_seen: "2026-11-16", urls: [feed(1)] }, TODAY).undated, null, "still listed");
  assert.strictEqual(F.assess(ride(), { urls: [feed(0)] }, TODAY).undated, null, "a feed that never matched is not evidence");
  assert.strictEqual(F.assess(ride({ verified_on: "2026-11-10" }), h, TODAY).undated, null, "a person's later check wins");
  assert.strictEqual(F.assess(ride(), { feed_seen: "2026-11-09", urls: [feed(0)] }, TODAY).undated, null, "ten days is not yet two weeks");
});

test("the host's page dates the ride in the past, or a red flag is open: no date either", () => {
  const past = F.assess(ride(), { flags: [{ code: "event-date-past", severity: "amber", since: "2026-11-09" }] }, TODAY);
  assert.strictEqual(past.undated, "no-upcoming-date");
  const red = F.assess(ride(), { flags: [{ code: "page-gone", severity: "red", since: "2026-11-16" }] }, TODAY);
  assert.strictEqual(red.undated, "flagged");
  assert.match(red.nudge, /re-checking it/, "a red flag keeps its own line");
  // wording moved or a time went missing: the Oct 18 rule stands, the date stays with its nudge
  const amber = F.assess(ride(), { flags: [{ code: "schedule-text-changed", severity: "amber", since: "2026-11-09" }] }, TODAY);
  assert.strictEqual(amber.undated, null);
});

test("rides that promise nothing already are left alone", () => {
  assert.strictEqual(F.assess(ride({ status: "seasonal-break", schedule: "Through Oct 31, 2026" }), null, TODAY).undated, null);
  assert.strictEqual(F.assess(ride({ status: "ended", schedule: "Through Oct 31, 2026" }), null, TODAY).undated, null);
});

test("a raw calendar feed is never a button", () => {
  for (const u of ["https://calendar.google.com/calendar/ical/abc%40group.calendar.google.com/public/basic.ics", "https://club.example/events/?ical=1", "https://ridewithgps.com/organizations/1/calendar.ics", "webcal://club.example/cal"]) assert.ok(RC.isFeed(u), u);
  for (const u of ["https://club.example/events/", "https://msp.bike/events/a-ride-1234", "https://www.instagram.com/club/"]) assert.ok(!RC.isFeed(u), u);
});

test("a site that carries rides for three hosts is shared; a club's own site and the big platforms are not", () => {
  const r = (slug, host, url) => ({ slug, status: "active", host: { name: host }, links: { website: url, other: [] }, sources: [url] });
  const S = RC.sharedSites([
    r("a", "Alpha Riders", "https://town-rides.example/calendar"), r("b", "Beta Cycles", "https://town-rides.example/calendar"), r("c", "Gamma Club", "https://town-rides.example/calendar"),
    r("d", "Delta Wheelers", "https://deltawheelers.example/rides"), r("e", "Delta Wheelers", "https://deltawheelers.example/rides"),
    r("f", "One", "https://www.strava.com/clubs/1"), r("g", "Two", "https://www.strava.com/clubs/2"), r("h", "Three", "https://www.strava.com/clubs/3"),
  ]);
  assert.deepStrictEqual([...S.keys()], ["town-rides.example"]);
  assert.strictEqual(S.get("town-rides.example").hosts, 3);
});
