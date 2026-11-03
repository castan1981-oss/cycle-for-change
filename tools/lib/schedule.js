"use strict";
/*
  schedule.js — when a listed ride rolls (moved out of tools/build-rides.js on Nov 3, 2026, unchanged).

  The one place that turns a ride's own rule into dates: the next occurrence by its days, its week-of-month
  rule, its biweekly phase (from a host-posted date), its season months, its first ride and the host's table of
  start-time changes (S.startOn); and the host's own posted dates still ahead. tools/build-rides.js (ride pages,
  live.json, .ics, the named-ride hubs) and tools/lib/week.js (/rides/az/phoenix/this-week/) both ask here, so a
  date on one page is the date on every page.

  Every function takes `from` (a Date) explicitly; build-rides.js passes its NOW (the build's clock, or --today).
*/
const S = require("./rides-schema.js");

const DAY_IDX = { sun:0, mon:1, tue:2, wed:3, thu:4, fri:5, sat:6 };
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// wall clock in tz -> Date instant
function zoned(y, mo, d, hh, mm, tz) {
  const guess = Date.UTC(y, mo - 1, d, hh, mm);
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23",
    year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })
    .formatToParts(new Date(guess)).filter((x) => x.type !== "literal").map((x) => [x.type, +x.value]));
  const asIf = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
  return new Date(guess - (asIf - guess));
}
function partsIn(date, tz) {
  return Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23",
    year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", weekday: "short" })
    .formatToParts(date).filter((x) => x.type !== "literal").map((x) => [x.type, x.type === "weekday" ? x.value : +x.value]));
}
function inSeason(month, s) {
  if (!s) return true;
  return s.start <= s.end ? month >= s.start && month <= s.end : month >= s.start || month <= s.end;
}
function nthWeekdayOfMonth(y, mo, dow, ord) {   // dow 0..6, ord 1..4 or -1
  if (ord > 0) { const first = new Date(Date.UTC(y, mo - 1, 1)).getUTCDay(); return 1 + ((dow - first + 7) % 7) + (ord - 1) * 7; }
  const lastDay = new Date(Date.UTC(y, mo, 0)); const back = (lastDay.getUTCDay() - dow + 7) % 7; return lastDay.getUTCDate() - back;
}
// Weeks counted Monday to Sunday from a fixed Monday (1970-01-05), so every day of one ride week shares an index.
const weekIndex = (utcMs) => Math.floor((utcMs - Date.UTC(1970, 0, 5)) / (7 * 86400000));
// Which weeks a biweekly ride runs (0 or 1), from the first host-posted date in `dates`; null when there is none.
function biweeklyPhase(r) {
  if (r.frequency !== "biweekly" || !Array.isArray(r.dates)) return null;
  const d = r.dates.map((e) => e && e.date).filter((s) => DATE_RE.test(s || "")).sort()[0];
  if (!d) return null;
  const [y, mo, dd] = d.split("-").map(Number);
  return ((weekIndex(Date.UTC(y, mo - 1, dd)) % 2) + 2) % 2;
}
const ymdOf = (y, mo, d) => `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const localYmd = (date, tz) => { const p = partsIn(date, tz); return ymdOf(p.year, p.month, p.day); };
// Oct 6, 2026: breaks, and monthly rides posted date by date
const onBreak = (r) => r.status === "seasonal-break";
const ruleless = (r) => r.frequency === "monthly" && !(r.monthly_rule && r.monthly_rule.length);
// Next occurrence after `from` as a Date, or null when the schedule can't be computed
function nextOccurrence(r, from = new Date()) {
  if (!r.start_hhmm || !r.tz || r.frequency === "irregular") return null;
  // Oct 6, 2026: a ride on its seasonal break has no next ride (it showed "Next ride Tue, Oct 6" above "PAUSED FOR
  // THE WINTER"), and a monthly ride with no week-of-month rule is posted date by date — it is not weekly.
  if (onBreak(r) || ruleless(r)) return null;
  // Oct 23, 2026: a ride that hasn't started yet (`first_ride`, the host's first date) promises nothing before it —
  // The Fruit Loop rides first Fridays from Dec 4, 2026, so it must never show Nov 6.
  if (r.first_ride && /^\d{4}-\d{2}-\d{2}$/.test(r.first_ride)) {
    const [fy, fm, fd] = r.first_ride.split("-").map(Number);
    const f = zoned(fy, fm, fd, 0, 0, r.tz);
    if (f > from) from = f;
  }
  // the time in force on that day: start_hhmm, or the host's table of changes (start_times, S.startOn)
  const at = (y, mo, d) => { const [hh, mm] = S.startOn(r, ymdOf(y, mo, d)).split(":").map(Number); return zoned(y, mo, d, hh, mm, r.tz); };
  const p = partsIn(from, r.tz);
  const y0 = p.year, mo0 = p.month, d0 = p.day;
  if (r.monthly_rule && r.monthly_rule.length) {
    for (let k = 0; k < 4; k++) {
      let y = y0, mo = mo0 + k; while (mo > 12) { mo -= 12; y += 1; }
      const cands = r.monthly_rule.map((m) => nthWeekdayOfMonth(y, mo, DAY_IDX[m.day], m.ord)).sort((a, b) => a - b);
      for (const d of cands) { const t = at(y, mo, d); if (t > from && inSeason(mo, r.season_months)) return t; }
    }
    return null;
  }
  if (!r.days.length) return null;
  const want = new Set(r.days.map((d) => DAY_IDX[d]));
  // Oct 23, 2026: a biweekly ride with a host-posted date runs on that date's weeks, not just the next matching day
  // (Heavy Saturday: posted for Oct 31, so not Oct 24). No posted date = the old behaviour, with "confirm which week".
  const phase = biweeklyPhase(r);
  for (let k = 0; k < 400; k++) {
    const dt = new Date(Date.UTC(y0, mo0 - 1, d0 + k));
    if (!want.has(dt.getUTCDay())) continue;
    if (phase != null && weekIndex(dt.getTime()) % 2 !== phase) continue;
    const t = at(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
    if (t > from && inSeason(dt.getUTCMonth() + 1, r.season_months)) return t;
  }
  return null;
}
// `dates`: the host's posted dates ([{ date, start_hhmm|null }]). Only the ones still ahead ever render —
// a date with a time is ahead until it starts, a date with no time until that day ends. Past dates never show.
function upcomingDates(r, from = new Date()) {
  if (!r.tz || !Array.isArray(r.dates)) return [];
  return r.dates.filter((e) => e && DATE_RE.test(e.date)).map((e) => {
    const [y, mo, d] = e.date.split("-").map(Number);
    const t = typeof e.start_hhmm === "string" && /^\d{2}:\d{2}$/.test(e.start_hhmm) ? e.start_hhmm : null;
    const [hh, mm] = (t || "23:59").split(":").map(Number);
    return { at: zoned(y, mo, d, hh, mm, r.tz), allDay: !t, ymd: e.date, hhmm: t };
  }).filter((x) => x.at > from).sort((a, b) => a.at - b.at);
}

module.exports = { DAY_IDX, DATE_RE, zoned, partsIn, inSeason, nthWeekdayOfMonth, weekIndex, biweeklyPhase, ymdOf, localYmd,
  onBreak, ruleless, nextOccurrence, upcomingDates };
