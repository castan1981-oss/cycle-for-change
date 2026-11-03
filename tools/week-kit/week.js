"use strict";
/*
  week.js — the rows for the weekly carousel, as JSON on stdout (Nov 3, 2026).

    node tools/week-kit/week.js 2026-11-04 [days]

  The same rides and dates as /rides/az/phoenix/this-week/ (the carousel's link, /week): the listed rides
  (cfc-site/rides/live.json decides what's listed) in PHOENIX_WEEK, dated by tools/lib/week.js from the full records
  in rides.json (live.json keeps only posted dates still ahead, which loses a biweekly ride's week). make.py reads it.
*/
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..", "..");
const { weekOf, inArea, PHOENIX_WEEK } = require(path.join(ROOT, "tools/lib/week.js"));
const start = process.argv[2], days = +(process.argv[3] || 7);
const live = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site/rides/live.json"), "utf8"));
const raw = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site/rides/rides.json"), "utf8"));
const full = Object.fromEntries((raw.rides || raw).map((r) => [r.slug, r]));
const listed = live.filter((r) => inArea(r, PHOENIX_WEEK)).map((r) => ({ ...r, ...(full[r.slug] || {}), _live: r }));
const out = weekOf(listed, start, days).map((d) => ({
  ymd: d.ymd,
  rides: d.rides.map((x) => ({ at: x.at.toISOString(), hhmm: x.hhmm, allDay: x.allDay, live: x.ride._live, full: full[x.ride.slug] || null })),
}));
process.stdout.write(JSON.stringify(out));
