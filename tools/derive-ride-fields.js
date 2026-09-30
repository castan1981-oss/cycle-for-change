#!/usr/bin/env node
/*
  derive-ride-fields.js — fills the machine-readable fields in rides.json from
  the human text, so nobody has to hand-maintain them.

    node tools/derive-ride-fields.js        (or: npm run derive:rides)

  For every ride it (re)computes:
    tz             IANA zone from state + longitude (split states handled)
    start_hhmm     24h roll time, preferring "roll 6:30" over "meet 6:00"
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
function hhmm(m) {
  if (!m) return null;
  let h = +m[1], mi = +(m[2] || 0); const ap = (m[3] || "").replace(/\./g, "");
  if (ap === "pm" && h < 12) h += 12; if (ap === "am" && h === 12) h = 0;
  if (!ap && h <= 6) h += 12;                                            // bare "6:30" on an evening ride
  if (h > 23 || mi > 59) return null;
  return String(h).padStart(2, "0") + ":" + String(mi).padStart(2, "0");
}
const rollTime = (s) => s ? hhmm(String(s).toLowerCase().match(/(?:roll|rolls|rolling|depart|departs|leave|leaves|ride at|ride out|roll out|rollout|wheels down)[^0-9]{0,14}(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)?/)) : null;
const anyTime = (s) => { if (!s) return null; s = String(s).toLowerCase(); return hhmm(s.match(/(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)/) || s.match(/\b(\d{1,2}):(\d{2})\b/)); };
function duration(s) {
  if (!s) return null; s = String(s).toLowerCase();
  const h = s.match(/(\d+(?:\.\d+)?)\s*(?:-|–|to)?\s*(\d+(?:\.\d+)?)?\s*(?:h|hr|hrs|hour)/); if (h) return Math.round(+h[1] * 60);
  const m = s.match(/(\d+)\s*min/); return m ? +m[1] : null;
}
const MON = { jan:1, feb:2, mar:3, apr:4, may:5, jun:6, jul:7, aug:8, sep:9, sept:9, oct:10, nov:11, dec:12 };
function season(s) {
  if (!s || /year[- ]round|all year/i.test(s)) return null;
  const t = String(s).toLowerCase();
  const ms = [...t.matchAll(/\b(jan|feb|mar|apr|may|jun|jul|aug|sept|sep|oct|nov|dec)[a-z]*\b/g)].map((x) => MON[x[1]]);
  if (ms.length >= 2) return { start: ms[0], end: ms[ms.length - 1] };
  // "spring and summer" with no months: assume Apr–Oct so the page never promises a January ride
  if (/spring|summer/.test(t) && !ms.length) return { start: 4, end: 10 };
  return null;
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
  if (us || !validHHMM(r.start_hhmm)) {
    const had = validHHMM(r.start_hhmm) ? r.start_hhmm : null;
    r.start_hhmm = rollTime(r.schedule) || rollTime(r.time_local) || anyTime(r.time_local) || anyTime(r.schedule) || had;
  }
  const dm = duration(r.duration);
  r.duration_min = dm != null ? dm : (Number.isFinite(r.duration_min) ? r.duration_min : null);
  r.season_months = season(r.season) || season(r.schedule) || (r.season_months && r.season_months.start ? r.season_months : null);
  r.monthly_rule = r.frequency === "monthly" || /month/i.test(r.schedule || "") ? (monthly(r.schedule) || r.monthly_rule || null) : null;
  if (r.monthly_rule && !r.days.length) r.days = [...new Set(r.monthly_rule.map((x) => x.day))];
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
