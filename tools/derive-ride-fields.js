#!/usr/bin/env node
/*
  derive-ride-fields.js — fills the machine-readable fields in rides.json from
  the human text, so nobody has to hand-maintain them.

    node tools/derive-ride-fields.js        (or: npm run derive:rides)

  For every ride it (re)computes:
    tz             IANA zone from state + longitude (split states handled)
    start_hhmm     24h roll time, preferring "roll 6:30" over "meet 6:00" (tools/lib/ride-time.js);
                   never over a hand-set time (start_hhmm_by_hand) or one the text states
    duration_min   from `duration` ("~2 hours")
    season_months  {start,end} from `season` / `schedule` ("Apr–Oct")
    monthly_rule   [{ord,day}] from "Second Wednesday", "Last Friday", …
  and normalises state, days and slug characters. Idempotent. Run it after
  editing rides.json and before tools/build-rides.js.

  Schema v3 (Sept 30, 2026 — the world layer): it also fills the defaults every
  record carries (country "US" for a US state, region, kind, status, language,
  distance_km <-> distance_miles, refresh.method/watch_url, null for the rest)
  and puts the keys in the canonical order (tools/lib/rides-schema.js).
  Outside the US: `state` is null, `tz` and `start_hhmm` come from the research
  and are kept when valid (24-hour times like "06:30" are mornings there).
*/
"use strict";
const fs = require("fs"), path = require("path");
const S = require("./lib/rides-schema.js");
const dataArg = process.argv.indexOf("--data");                          // --data <file>: work on another copy (fixtures, merges)
const DATA = dataArg > -1 ? path.resolve(process.argv[dataArg + 1]) : path.join(__dirname, "..", "cfc-site", "rides", "rides.json");
const rides = JSON.parse(fs.readFileSync(DATA, "utf8"));

const ET = "America/New_York", CT = "America/Chicago", MT = "America/Denver", PT = "America/Los_Angeles";
const SIMPLE = { AL:CT, AK:"America/Anchorage", AZ:"America/Phoenix", AR:CT, CA:PT, CO:MT, CT:ET, DE:ET, DC:ET, GA:ET, HI:"Pacific/Honolulu",
  IL:CT, IA:CT, LA:CT, ME:ET, MD:ET, MA:ET, MN:CT, MS:CT, MO:CT, MT:MT, NV:PT, NH:ET, NJ:ET, NM:MT, NY:ET, NC:ET, OH:ET, OK:CT, PA:ET,
  RI:ET, SC:ET, UT:MT, VT:ET, VA:ET, WA:PT, WV:ET, WI:CT, WY:MT };
function tz(r) {
  if (SIMPLE[r.state]) return SIMPLE[r.state];
  switch (r.state) {
    case "TX": return r.lng < -105.5 ? MT : CT;                          // El Paso
    case "FL": return r.lng < -85.0 && r.lat > 29.5 ? CT : ET;           // western panhandle
    case "ID": return r.lat > 45.5 ? PT : MT;                            // panhandle
    case "OR": return r.lng > -117.2 ? MT : PT;                          // Malheur County
    case "IN": return (r.lng < -87.0 && r.lat > 41.0) || (r.lng < -87.3 && r.lat < 38.4) ? CT : ET;
    case "KY": return r.lng < -86.0 ? CT : ET;                           // Bowling Green CT, Louisville ET
    case "TN": return r.lng < -85.5 ? CT : ET;                           // Nashville CT, Chattanooga/Knoxville ET
    case "MI": return r.lng < -89.5 ? CT : ET;
    case "ND": return r.lng < -101.5 && r.lat < 47.2 ? MT : CT;
    case "SD": return r.lng < -100.5 ? MT : CT;
    case "NE": return r.lng < -101.0 ? MT : CT;
    case "KS": return r.lng < -101.6 ? MT : CT;
  }
  return ET;
}
// Start times come from tools/lib/ride-time.js (Oct 6, 2026): a clock time needs minutes or am/pm, never a
// speed or a road ("19-20 mph", "leaves A1A"), am/pm comes from the ride's own words, and a time a person set
// (start_hhmm_by_hand) or one the text states is never overwritten.
const RT = require("./lib/ride-time.js");
function duration(s) {
  if (!s) return null; s = String(s).toLowerCase();
  const h = s.match(/(\d+(?:\.\d+)?)\s*(?:-|–|to)?\s*(\d+(?:\.\d+)?)?\s*(?:h|hr|hrs|hour)/); if (h) return Math.round(+h[1] * 60);
  const m = s.match(/(\d+)\s*min/); return m ? +m[1] : null;
}
const MON = { jan:1, feb:2, mar:3, apr:4, may:5, jun:6, jul:7, aug:8, sep:9, sept:9, oct:10, nov:11, dec:12 };
// whole month words only: "market" is not March, "maybe" is not May, and "the start may vary" is not May either
const MONTH_WORD = "jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may(?!\\s+(?:be|vary|change|not|also|move|start|shift|run|have|take|leave|differ|get|need|ride|happen|come|go|stop|end|include|use|close|open|cancel|turn|switch|follow|join|bring|want)\\b)|june?|july?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?";
const SEASON_WORD = "spring|summer|fall|autumn|winter";
// spring/summer/fall/winter as the ends of a range: "May–fall" = May–Oct, "spring–Sep" = Apr–Sep
const SEASON_START = { spring: 4, summer: 6, fall: 9, autumn: 9, winter: 12 };
const SEASON_END = { spring: 5, summer: 9, fall: 10, autumn: 10, winter: 2 };
const monthNum = (w) => MON[w.slice(0, 4)] || MON[w.slice(0, 3)] || null;
function season(s) {
  if (!s || /year[- ]round|all year/i.test(s)) return null;
  const t = String(s).toLowerCase();
  const months = [...t.matchAll(new RegExp(`\\b(${MONTH_WORD})\\b`, "g"))].map((x) => monthNum(x[1]));
  if (months.length >= 2) return { start: months[0], end: months[months.length - 1] };
  const toks = [...t.matchAll(new RegExp(`\\b(${MONTH_WORD}|${SEASON_WORD})\\b`, "g"))].map((x) => x[1]);
  if (toks.length >= 2) {
    const a = toks[0], b = toks[toks.length - 1];
    return { start: monthNum(a) || SEASON_START[a], end: monthNum(b) || SEASON_END[b] };
  }
  // "summer" alone: Apr–Oct, so the page never promises a January ride; a lone month says nothing
  if (toks.length === 1 && /^(spring|summer)$/.test(toks[0])) return { start: 4, end: 10 };
  return null;
}
// A season from the schedule text only when the text states one ("Thursdays, 5:30 pm, spring and summer").
// Month words there are usually dates ("since Sept 27"), a start-time table ("7:00 am Apr–Nov, 8:00 am
// Dec–Mar", "9:00 am (summer) / 10:00 am (winter)", "Jan-Feb 9:00 am, Mar 8:00") or a remark ("draws few
// riders from April to mid October") — none of those is a season.
function scheduleSeason(s) {
  if (!s) return null;
  let t = String(s).toLowerCase();
  t = t.replace(new RegExp(`\\b(${MONTH_WORD})\\.?\\s+\\d{1,2}(st|nd|rd|th)?\\b`, "g"), " ");                      // dates
  if (/(start|time|roll)[^.;]{0,40}\b(changes?|moves?|shifts?|slides?|varies|vary|follows?)\b|\bby (the )?(month|season)\b/.test(t)) return null;
  if (/\b(earlier|later)\b[^.;]{0,20}\b(spring|summer|fall|autumn|winter)\b/.test(t)) return null;
  const TIME = "\\d{1,2}(?::\\d{2})?\\s*(?:a\\.?m\\.?|p\\.?m\\.?)";
  const WHEN = `(?:late\\s+|early\\s+|mid-?\\s*)?(?:${MONTH_WORD}|${SEASON_WORD})\\b`;
  // a time qualified by a month or season, with no comma between: "7:00 am Apr–Nov", "8:00 am in winter",
  // "(8:30 am late Oct–late Apr)", "6:00 am from July to early September"
  if (new RegExp(`${TIME}\\s*(?:\\(\\s*)?(?:(?:in|from|during|through)\\s+)?(?:the\\s+)?${WHEN}`).test(t)) return null;
  // a month followed by a time, twice or more: "Jan-Feb 9:00 am, Mar 8:00"
  if ((t.match(new RegExp(`\\b(?:${MONTH_WORD})\\b\\.?(?:\\s*[-–]\\s*(?:${MONTH_WORD})\\b)?\\s+\\d{1,2}:\\d{2}`, "g")) || []).length >= 2) return null;
  // two ranges is a remark or a table, not a season: "from April to mid October, and ... from late October through March"
  const RANGE = `\\b(?:${MONTH_WORD}|${SEASON_WORD})\\b[^.;]{0,8}?(?:–|-|\\bto\\b|\\bthrough\\b|\\bthru\\b|\\buntil\\b|\\binto\\b)\\s*${WHEN}`;
  if ((t.match(new RegExp(RANGE, "g")) || []).length >= 2) return null;
  return season(t);
}
const ORD = { first:1, "1st":1, second:2, "2nd":2, third:3, "3rd":3, fourth:4, "4th":4, last:-1 };
function monthly(s) {
  if (!s) return null;
  const near = String(s).toLowerCase().match(/\b(first|1st|second|2nd|third|3rd|fourth|4th|last)\b(?:\s+and\s+\b(first|1st|second|2nd|third|3rd|fourth|4th|last)\b)?\s+(mon|tue|wed|thu|fri|sat|sun)[a-z]*/);
  if (!near) return null;
  const os = [ORD[near[1]]]; if (near[2]) os.push(ORD[near[2]]);
  return os.map((o) => ({ ord: o, day: near[3] }));
}

let changed = 0;
const validTz = (z) => { if (!z) return false; try { new Intl.DateTimeFormat("en", { timeZone: z }); return true; } catch (e) { return false; } };
const validHHMM = (t) => typeof t === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(t);
const KIND_CM = /critical mass|masa cr[ií]tica|massa cr[ií]tica|masse critique|kritische masse|masa krytyczna/i;
const out = rides.map((r) => {
  const before = JSON.stringify(r);
  // where it is
  if (!r.country && r.state && S.US_STATES[String(r.state).toUpperCase().slice(0, 2)]) r.country = "US";
  r.country = String(r.country || "US").toUpperCase();
  const us = r.country === "US";
  if (us) {
    r.state = String(r.state).toUpperCase().slice(0, 2);
    r.region = S.US_STATES[r.state] || r.region || null;
    r.tz = tz(r);
  } else {
    r.state = null;
    if (!validTz(r.tz)) r.tz = null;                                    // the validator reports it
  }
  // when it rolls
  r.days = (r.days || []).map((d) => String(d).toLowerCase().slice(0, 3)).filter((d) => /^(mon|tue|wed|thu|fri|sat|sun)$/.test(d));
  if (us || !validHHMM(r.start_hhmm)) r.start_hhmm = RT.chooseStart(r);
  if (r.start_hhmm_by_hand !== true) delete r.start_hhmm_by_hand;
  const dm = duration(r.duration);
  r.duration_min = dm != null ? dm : (Number.isFinite(r.duration_min) ? r.duration_min : null);
  // year-round means year-round, whatever months the schedule names; a season field says the season;
  // only with neither do we read one out of the schedule text (scheduleSeason)
  r.season_months = /^\s*(year[- ]round|all year)/i.test(r.season || "") ? null
    : (season(r.season) || scheduleSeason(r.schedule) || null);
  // a weekly ride that mentions a month in passing ("the route runs in reverse on the first Saturday of the month",
  // "start time changes by month") is still weekly: only monthly and twice-a-month rides get a monthly rule
  r.monthly_rule = r.frequency !== "weekly" && (r.frequency === "monthly" || /month/i.test(r.schedule || "")) ? (monthly(r.schedule) || r.monthly_rule || null) : null;
  if (r.monthly_rule && !r.days.length) r.days = [...new Set(r.monthly_rule.map((x) => x.day))];
  // v3 frequency words: "seasonal" was a v2 value — the season lives in season / season_months, the rhythm is weekly.
  if (r.frequency === "seasonal") r.frequency = "weekly";
  // no fixed weekday (full-moon rides, "most days", "posted ad hoc") = irregular; the schedule text says the rest
  if (!r.days.length && r.frequency !== "irregular") r.frequency = "irregular";
  // v3 defaults
  if (!r.kind) r.kind = KIND_CM.test(r.name || "") ? "critical-mass" : "group-ride";
  if (!r.status) r.status = "active";
  for (const k of ["name_en", "status_note", "status_since", "visitor_notes", "last_seen", "evidence"]) if (!(k in r)) r[k] = null;
  if (!Array.isArray(r.language) || !r.language.length) r.language = us ? ["en"] : [];
  // distance_miles is display text in the US data ("10–12", "~20"); keep it. Outside the US the research
  // gives distance_km as a number; fill miles from it when missing. Never overwrite a value that's there.
  if (!("distance_km" in r)) r.distance_km = null;
  if (!("distance_miles" in r)) r.distance_miles = null;
  if (!us && Number.isFinite(r.distance_km) && r.distance_miles == null) r.distance_miles = Math.round(r.distance_km * 0.621371);
  const f = r.refresh && typeof r.refresh === "object" ? r.refresh : {};
  const watch = f.watch_url || (r.sources || [])[0] || (r.links || {}).website || null;
  r.refresh = { method: f.method || S.refreshMethodFor(watch), watch_url: watch, feed_url: f.feed_url || null, notes: f.notes || null };
  const o = S.orderRecord(r);
  if (before !== JSON.stringify(o)) changed++;
  return o;
});
S.sortRides(out);
fs.writeFileSync(DATA, JSON.stringify(out, null, 1) + "\n");
const world = out.filter((r) => r.country !== "US");
console.log(`derived fields for ${out.length} rides (${changed} changed; ${world.length} outside the US in ${new Set(world.map((r) => r.country)).size} countries); ${out.filter((r) => r.start_hhmm).length} have a start time, ${out.filter((r) => r.season_months).length} a season, ${out.filter((r) => r.monthly_rule).length} a monthly rule`);
