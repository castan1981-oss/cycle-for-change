"use strict";
/*
  week.js — the rows for the weekly carousel, as JSON on stdout (Nov 3, 2026).

    node tools/week-kit/week.js 2026-11-04 [days]

  The same rides and dates as /rides/az/phoenix/this-week/ (the carousel's link, /week): the listed rides
  (cfc-site/rides/live.json decides what's listed) in PHOENIX_WEEK, dated by tools/lib/week.js from the full records
  in rides.json (live.json keeps only posted dates still ahead, which loses a biweekly ride's week). make.py reads it.

  Nov 3, 2026 (Robert: Monday mornings): each row also carries `doubt`, a plain reason the post should leave it off,
  from the site's own upkeep data (data/rides-health.json, read by tools/lib/rides-freshness.js) — an open red flag,
  the host's page using ending words or showing no upcoming date, or the host's own calendar feed with no ride after
  the week starts. The page (/week) still lists those rides with its own warning; the post only prints what it can stand behind.
*/
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..", "..");
const { weekOf, inArea, PHOENIX_WEEK } = require(path.join(ROOT, "tools/lib/week.js"));
const F = require(path.join(ROOT, "tools/lib/rides-freshness.js"));
const start = process.argv[2], days = +(process.argv[3] || 7);
const live = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site/rides/live.json"), "utf8"));
const raw = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site/rides/rides.json"), "utf8"));
const full = Object.fromEntries((raw.rides || raw).map((r) => [r.slug, r]));
const listed = live.filter((r) => inArea(r, PHOENIX_WEEK)).map((r) => ({ ...r, ...(full[r.slug] || {}), _live: r }));
const healthAll = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, "data/rides-health.json"), "utf8")).rides || {}; } catch (e) { return {}; } })();
const today = new Date().toISOString().slice(0, 10);
function doubt(slug) {
  const r = full[slug], h = healthAll[slug] || null;
  if (!r) return null;
  const a = F.assess(r, h, today);
  if (a.severity === "red") return "the host's page or a rider says it may have stopped or changed";
  const codes = new Set((a.flags || []).map((f) => f.code));
  if (codes.has("end-words")) return "the host's page uses ending words (last ride, season over)";
  if (codes.has("event-date-past")) return "the host's page shows no upcoming date";
  // the host's own calendar feed is live and used to list this ride, but hasn't for two weeks or more
  const feed = ((h && h.urls) || []).find((u) => u.role === "feed" && u.feed && u.feed.events > 0);
  if (feed && feed.feed.matched === 0 && h.feed_seen && (Date.parse(today) - Date.parse(h.feed_seen)) / 86400000 > 14) {
    const M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `the host's own calendar hasn't listed it since ${M[+h.feed_seen.slice(5, 7) - 1]} ${+h.feed_seen.slice(8, 10)}`;
  }
  return null;
}
const out = weekOf(listed, start, days).map((d) => ({
  ymd: d.ymd,
  rides: d.rides.map((x) => ({ at: x.at.toISOString(), hhmm: x.hhmm, allDay: x.allDay, live: x.ride._live, full: full[x.ride.slug] || null, doubt: doubt(x.ride.slug) })),
}));
process.stdout.write(JSON.stringify(out));
