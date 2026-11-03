"use strict";
/*
  week.js — the rides of a run of days, day by day, in time order (Nov 3, 2026).

  For /rides/az/phoenix/this-week/ (the weekly "Phoenix group rides this week" carousel's link, /week): the seven days
  starting the build's day, Phoenix time. Every date comes from tools/lib/schedule.js, the code the ride pages use,
  so it respects everything they do: first_ride (the Fruit Loop shows nothing before Dec 11, 2026), seasonal breaks,
  season months, a biweekly ride's posted weeks, monthly rules and the host's start_times. The host's own posted dates
  (`dates`) are added, one per instant.

    weekOf(rides, "2026-11-04", 7) → [{ ymd: "2026-11-04", rides: [{ ride, at, hhmm, allDay }] }, …]

  `at` is the start (a Date); `hhmm` the time in force that day (S.startOn, or the posted date's time), null for a
  posted date with no time (`allDay`, sorted last). Pass only the rides that may be listed; the caller decides that.
*/
const S = require("./rides-schema.js");
const SCH = require("./schedule.js");

// The Valley: rides that start within 45 miles of this point (central Phoenix), in Arizona. One constant.
const PHOENIX_WEEK = { lat: 33.4771, lng: -112.0445, miles: 45, state: "AZ", tz: "America/Phoenix" };

// haversine, miles (the same earth as tools/build-rides.js)
function milesBetween(a, b) {
  const R = 3958.8, toR = (d) => (d * Math.PI) / 180;
  const dLat = toR(b.lat - a.lat), dLng = toR(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
const inArea = (r, area = PHOENIX_WEEK) => r.state === area.state && Number.isFinite(r.lat) && Number.isFinite(r.lng) && milesBetween(area, r) <= area.miles;

const addDays = (ymd, n) => new Date(Date.UTC(+ymd.slice(0, 4), +ymd.slice(5, 7) - 1, +ymd.slice(8, 10) + n)).toISOString().slice(0, 10);
const midnight = (ymd, tz) => SCH.zoned(+ymd.slice(0, 4), +ymd.slice(5, 7), +ymd.slice(8, 10), 0, 0, tz);

// A ride whose rule the schedule code can turn into dates (a time, a zone, and weekdays or a week-of-month rule).
// The rest (irregular, posted date by date, no start time) live on the host's own calendar.
const computable = (r) => !!(r.start_hhmm && r.tz && r.frequency !== "irregular" && !SCH.ruleless(r)
  && ((r.monthly_rule && r.monthly_rule.length) || (Array.isArray(r.days) && r.days.length)));

function weekOf(rides, start, days = 7, { tz = PHOENIX_WEEK.tz } = {}) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start || "")) throw new Error(`weekOf: start must be YYYY-MM-DD, got ${start}`);
  const ymds = Array.from({ length: days }, (_, i) => addDays(start, i));
  const t0 = midnight(ymds[0], tz), t1 = midnight(addDays(start, days), tz);
  const before = new Date(t0.getTime() - 1);   // a ride at 00:00 on day 1 still counts (nextOccurrence wants t > from)
  const by = new Map(ymds.map((y) => [y, []]));
  for (const ride of rides) {
    if (SCH.onBreak(ride)) continue;           // a seasonal break promises nothing, not even a posted date (nextOf)
    const seen = new Set(), daysOn = new Set();
    const add = (ymd, at, hhmm, allDay) => {
      if (!by.has(ymd) || seen.has(+at) || (allDay && daysOn.has(ymd))) return;
      seen.add(+at); daysOn.add(ymd);
      by.get(ymd).push({ ride, at, hhmm, allDay });
    };
    // by the ride's own rule, stepped through the window
    let from = before;
    for (let i = 0; i < 64; i++) {
      const at = SCH.nextOccurrence(ride, from);
      if (!at || at >= t1) break;
      const ymd = SCH.localYmd(at, tz);
      add(ymd, at, S.startOn(ride, SCH.localYmd(at, ride.tz)), false);
      from = at;
    }
    // the host's own posted dates inside the window (deduped on the instant; a no-time date on a day the ride
    // already has a start is that same ride)
    for (const d of SCH.upcomingDates(ride, before)) {
      if (d.at >= t1) break;
      add(d.ymd, d.at, d.hhmm, d.allDay);
    }
  }
  return ymds.map((ymd) => ({ ymd, rides: by.get(ymd).sort((a, b) => a.at - b.at || String(a.ride.name).localeCompare(String(b.ride.name))) }));
}

module.exports = { PHOENIX_WEEK, milesBetween, inArea, computable, weekOf, addDays };
