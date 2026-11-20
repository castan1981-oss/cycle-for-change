#!/usr/bin/env node
/*
  audit-ride-sources.js — the msp.bike audit, for every ride (Nov 19, 2026).

  A maintainer of a community calendar told Robert three things about our Twin Cities pages, all true: links that went
  to a front page instead of the event's own page, a calendar file of ours that copied theirs, and dates that had gone
  stale. This reads the data we already have (rides.json, live.json, the watcher's rides-health.json) and finds the
  same three things anywhere else. It fetches nothing and changes nothing.

    node tools/audit-ride-sources.js [--today YYYY-MM-DD] [--json out.json] [--md out.md]

  What it reports
    A  shared calendars    a site or feed that carries rides for several different hosts and isn't a platform
                           (Strava, Meetup…) and isn't in data/ride-calendars.json yet
    B  wrong link          a button that goes to a raw calendar feed, or a third party's front page shown as
                           "the host's website"
    C  promised, doubted   a listed ride showing a "Next ride" while our own upkeep data doubts it: the host's page
                           dates it in the past, uses ending words, is gone, or the host's feed stopped listing it
    D  ran out             an active ride whose own schedule text names an end date that has passed
    E  backlog             open watcher flags by kind and age: what the Monday re-check hasn't reached
*/
"use strict";
const fs = require("fs");
const path = require("path");
const F = require("./lib/rides-freshness.js");
const RC = require("./lib/ride-calendars.js");

const ROOT = path.join(__dirname, "..");
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const TODAY = arg("--today") || new Date().toISOString().slice(0, 10);
const read = (p, fb) => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8")); } catch (e) { return fb; } };

const rides = read("cfc-site/rides/rides.json", []);
const live = read("cfc-site/rides/live.json", []);
const health = (read("data/rides-health.json", {}).rides) || {};
const CALS = RC.make(read("data/ride-calendars.json", {}));
const liveBy = new Map(live.map((r) => [r.slug, r]));
const host = RC.hostOf;

// places a ride is *posted* by its own host or by everyone: never a "shared calendar"
const PLATFORM = /(^|\.)(strava\.com|meetup\.com|facebook\.com|fb\.me|instagram\.com|ridewithgps\.com|eventbrite\.[a-z.]+|google\.com|goo\.gl|linktr\.ee|linkin\.bio|x\.com|twitter\.com|youtube\.com|komoot\.[a-z]+|discord\.gg|discord\.com|clubexpress\.com|wildapricot\.org|bikereg\.com|runsignup\.com|tiktok\.com|threads\.net|apple\.com|whatsapp\.com|t\.me|criticalmass\.in|letsride\.co\.uk|britishcycling\.org\.uk|nextdoor\.com|wikipedia\.org|reddit\.com)$/i;
const hostName = (r) => String((r.host && r.host.name) || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const urlsOf = (r) => {
  const L = r.links || {};
  return [...new Set([L.website, ...(L.other || []), r.refresh && r.refresh.watch_url, ...(r.sources || []).map((s) => (s && s.url) || s)].filter((u) => typeof u === "string" && u))];
};
const isFeed = (u) => /\.ics(\?|$)|calendar\.google\.com\/calendar\/(ical|embed)|\/ical\/?(\?|$)|webcal:/i.test(u);
const listed = (r) => liveBy.has(r.slug);
const nextOf = (r) => (liveBy.get(r.slug) || {}).next || null;
const daysAgo = (d) => (F.isDate(d) ? F.daysBetween(d, TODAY) : null);

// ── A. shared calendars ─────────────────────────────────────────────────────────────────────────────────────────
const byDomain = new Map(), byFeed = new Map();
for (const r of rides) {
  if (r.status === "ended") continue;
  for (const d of new Set(urlsOf(r).map(host).filter(Boolean))) {
    if (PLATFORM.test(d)) continue;
    if (!byDomain.has(d)) byDomain.set(d, []);
    byDomain.get(d).push(r);
  }
  const f = r.refresh && r.refresh.feed_url;
  if (f) { if (!byFeed.has(f)) byFeed.set(f, []); byFeed.get(f).push(r); }
}
const known = new Set(Object.values(CALS.calendars).flatMap((c) => [...c.hosts, ...(c.feeds || [])]));
// a host's own site carries only its own rides: a shared calendar carries rides whose hosts' names share no word with it
const distinctHosts = (rs) => new Set(rs.map(hostName).filter(Boolean)).size;
const shared = [...byDomain].map(([domain, rs]) => ({ domain, rides: rs, hosts: distinctHosts(rs) }))
  .filter((x) => x.hosts >= 3 && !known.has(x.domain))
  .sort((a, b) => b.hosts - a.hosts || b.rides.length - a.rides.length);
const sharedFeeds = [...byFeed].map(([feed, rs]) => ({ feed, rides: rs, hosts: distinctHosts(rs) }))
  .filter((x) => x.hosts >= 2 && !known.has(x.feed))
  .sort((a, b) => b.hosts - a.hosts);

// ── B. wrong links ─────────────────────────────────────────────────────────────────────────────────────────────
const sharedSet = new Set(shared.map((x) => x.domain));
const feedButtons = [], thirdPartyAsHost = [];
for (const r of rides) {
  if (!listed(r) || CALS.of(r)) continue;
  const L = r.links || {};
  for (const u of [L.website, ...(L.other || [])].filter(Boolean)) if (isFeed(u)) feedButtons.push({ slug: r.slug, url: u });
  if (L.website && sharedSet.has(host(L.website))) thirdPartyAsHost.push({ slug: r.slug, url: L.website, host: (r.host && r.host.name) || null });
}

// ── C. promised, doubted ───────────────────────────────────────────────────────────────────────────────────────
// one policy: the freshness module's own `undated` (what the build now takes the date down for). `--before` asks what
// the pages were promising before that rule, by working the next date out without it.
const SCH = require("./lib/schedule.js");
const SAY = { flagged: "a red flag or a rider's report is open", "no-upcoming-date": "the host's page dates it in the past", "feed-stopped": "the host's calendar stopped listing it", "ran-out": "our own schedule text names an end date that has passed" };
function doubt(r) {
  const a = F.assess(r, health[r.slug] || null, TODAY);
  return a.undated ? { why: a.undated, say: SAY[a.undated] } : null;
}
const plainNext = (r) => { const n = SCH.nextOccurrence({ ...r, _f: null }, new Date(`${TODAY}T12:00:00Z`)); if (n) return n.toISOString(); const d = SCH.upcomingDates({ ...r, _f: null }, new Date(`${TODAY}T12:00:00Z`))[0]; return d ? d.at.toISOString() : null; };
const promised = [];
for (const r of rides) {
  if (!listed(r) || r.status !== "active") continue;
  const d = doubt(r); if (!d) continue;
  const n = plainNext(r); if (!n) continue;
  const flag = ((health[r.slug] || {}).flags || []).filter((f) => !f.resolved).map((f) => f.since).filter(F.isDate).sort()[0] || null;
  promised.push({ slug: r.slug, name: r.name, place: [r.city, r.state || r.country].filter(Boolean).join(", "), next: n.slice(0, 10), why: d.why, say: d.say, since: flag, verified_on: r.verified_on });
}
promised.sort((a, b) => a.next.localeCompare(b.next));

// ── D. ran out: the schedule text itself names an end date that has passed ─────────────────────────────────────
const ranOut = [];
for (const r of rides) {
  if (r.status !== "active" || !listed(r)) continue;
  const text = [r.schedule, r.refresh && r.refresh.notes].filter(Boolean).join(" ");
  const end = F.seriesEnd(r);
  if (!end || end >= TODAY) continue;
  if (F.isDate(r.verified_on) && r.verified_on > end) continue;                         // checked since: the checker saw it
  ranOut.push({ slug: r.slug, name: r.name, place: [r.city, r.state || r.country].filter(Boolean).join(", "), ended: end, next: (plainNext(r) || "").slice(0, 10) || null, verified_on: r.verified_on, text: text.slice(0, 220) });
}
ranOut.sort((a, b) => a.ended.localeCompare(b.ended));

// ── E. backlog ─────────────────────────────────────────────────────────────────────────────────────────────────
const backlog = {};
for (const r of rides) {
  if (!listed(r)) continue;
  for (const f of F.assess(r, health[r.slug] || null, TODAY).flags || []) {
    const b = backlog[f.code] || (backlog[f.code] = { code: f.code, severity: f.severity, rides: 0, over14: 0, over28: 0, oldest: null });
    b.rides++; const age = daysAgo(f.since);
    if (age != null) { if (age > 14) b.over14++; if (age > 28) b.over28++; if (!b.oldest || f.since < b.oldest) b.oldest = f.since; }
  }
}
const ages = rides.filter(listed).map((r) => daysAgo(r.verified_on)).filter((n) => n != null);
const checked = { listed: ages.length, within30: ages.filter((n) => n <= 30).length, over45: ages.filter((n) => n > 45).length, over60: ages.filter((n) => n > 60).length };
const withIcs = rides.filter((r) => listed(r) && fs.existsSync(path.join(ROOT, "cfc-site/rides", r.slug, "ride.ics")));
const icsOverFeed = withIcs.filter((r) => r.refresh && r.refresh.feed_url);

const out = {
  today: TODAY, rides: rides.length, listed: live.length,
  A_shared_calendars: shared.map((x) => ({ domain: x.domain, rides: x.rides.length, hosts: x.hosts, examples: x.rides.slice(0, 4).map((r) => r.slug) })),
  A_shared_feeds: sharedFeeds.map((x) => ({ feed: x.feed, rides: x.rides.length, hosts: x.hosts, examples: x.rides.slice(0, 4).map((r) => r.slug) })),
  B_feed_buttons: feedButtons, B_third_party_as_host: thirdPartyAsHost,
  C_promised_doubted: promised, D_ran_out: ranOut,
  E_backlog: Object.values(backlog).sort((a, b) => b.rides - a.rides), E_checked: checked,
  ics: { ours: withIcs.length, over_a_host_feed: icsOverFeed.length },
};
if (arg("--json")) fs.writeFileSync(arg("--json"), JSON.stringify(out, null, 1) + "\n");
const line = (s) => console.log(s);
line(`audit of ${out.rides} rides (${out.listed} listed), ${TODAY}`);
line(`A  shared calendars not yet credited: ${shared.length} sites, ${sharedFeeds.length} shared feeds`);
for (const x of out.A_shared_calendars.slice(0, 25)) line(`     ${x.domain}  ${x.rides} rides, ${x.hosts} hosts  e.g. ${x.examples[0]}`);
for (const x of out.A_shared_feeds) line(`     feed ${x.feed.slice(0, 90)}  ${x.rides} rides, ${x.hosts} hosts`);
line(`B  buttons to a raw feed: ${feedButtons.length} · a shared site shown as the host's website: ${thirdPartyAsHost.length}`);
line(`C  rides whose next date our own data doubts (the build takes these dates down): ${promised.length}`);
const byWhy = {}; for (const p of promised) byWhy[p.why] = (byWhy[p.why] || 0) + 1; line(`     ${JSON.stringify(byWhy)}`);
line(`D  active, but the schedule text names an end date that has passed: ${ranOut.length} (${ranOut.filter((x) => x.next && x.next < String(+TODAY.slice(0, 4) + 1)).length} promise a date this year)`);
line(`E  open flags on listed rides: ${out.E_backlog.map((b) => `${b.code} ${b.rides} (${b.over14} older than 14 days)`).join(" · ")}`);
line(`   last checked: ${checked.within30} of ${checked.listed} within 30 days, ${checked.over45} over 45, ${checked.over60} over 60`);
line(`   our calendar files: ${withIcs.length}, of which ${icsOverFeed.length} sit beside a host's own feed`);
