"use strict";
/*
  ics.js — read an iCalendar feed and list the dates it promises. No dependencies.

    const ICS = require("./lib/ics.js");
    const cal = ICS.parse(text);                       // { name, events: [...] }
    const occ = ICS.occurrences(cal, "2026-09-30", "2026-11-14");
      // [{ date: "2026-10-03", time: "09:00", zone: "Europe/London" | "UTC" | null, summary, uid, all_day }]
    ICS.toZone({ date, time, zone }, "America/Phoenix")  // the same instant as wall time in another zone

  Covers what ride calendars use: DTSTART with TZID, UTC or a bare date; RRULE DAILY / WEEKLY /
  MONTHLY / YEARLY with INTERVAL, UNTIL, COUNT, BYDAY (MO,WE · 1FR · -1FR), BYMONTHDAY, BYSETPOS,
  BYMONTH; EXDATE; RDATE; RECURRENCE-ID overrides; STATUS:CANCELLED. Expansion happens in the
  event's own wall time, so a weekly 6:00 pm ride stays at 6:00 pm across a clock change.
  Used by tools/rides-watch.js (feeds) — the time-zone helpers also serve Strava and JSON-LD dates.
*/

// ---------- calendar arithmetic (days since 1970-01-01, wall time) ----------
const dayNum = (y, m, d) => Math.floor(Date.UTC(y, m - 1, d) / 86400000);
function fromDayNum(n) { const t = new Date(n * 86400000); return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() }; }
const dow = (n) => ((n % 7) + 11) % 7;                 // 0 = Sunday … 6 = Saturday (1970-01-01 was a Thursday)
const pad = (n) => String(n).padStart(2, "0");
const isoDay = (n) => { const { y, m, d } = fromDayNum(n); return `${y}-${pad(m)}-${pad(d)}`; };
const daysIn = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate();
const DAY_CODES = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

// ---------- time zones ----------
const DTF = new Map();
function zoneOk(z) {
  if (!z || typeof z !== "string") return false;
  try { fmt(z); return true; } catch (e) { return false; }
}
function fmt(z) {
  if (!DTF.has(z)) DTF.set(z, new Intl.DateTimeFormat("en-US", { timeZone: z, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  return DTF.get(z);
}
// wall-clock parts of an instant in a zone
function partsAt(epoch, z) {
  const o = {};
  for (const p of fmt(z).formatToParts(new Date(epoch))) if (p.type !== "literal") o[p.type] = +p.value;
  return { y: o.year, m: o.month, d: o.day, hh: o.hour === 24 ? 0 : o.hour, mm: o.minute, ss: o.second };
}
const offsetAt = (epoch, z) => { const p = partsAt(epoch, z); return Date.UTC(p.y, p.m - 1, p.d, p.hh, p.mm, p.ss) - Math.floor(epoch / 1000) * 1000; };
// the instant a wall time in a zone happens
function wallToEpoch(y, m, d, hh, mm, z) {
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  if (!z || z === "UTC") return guess;
  let e = guess - offsetAt(guess, z);
  const off2 = offsetAt(e, z);
  if (guess - off2 !== e) e = guess - off2;
  return e;
}
// Windows / Outlook names that turn up in TZID
const WINDOWS = {
  "Eastern Standard Time": "America/New_York", "Central Standard Time": "America/Chicago", "Mountain Standard Time": "America/Denver",
  "US Mountain Standard Time": "America/Phoenix", "Pacific Standard Time": "America/Los_Angeles", "Alaskan Standard Time": "America/Anchorage",
  "Hawaiian Standard Time": "Pacific/Honolulu", "Atlantic Standard Time": "America/Halifax", "Central America Standard Time": "America/Guatemala",
  "Central Standard Time (Mexico)": "America/Mexico_City", "SA Pacific Standard Time": "America/Bogota", "E. South America Standard Time": "America/Sao_Paulo",
  "Argentina Standard Time": "America/Argentina/Buenos_Aires", "GMT Standard Time": "Europe/London", "Greenwich Standard Time": "Atlantic/Reykjavik",
  "W. Europe Standard Time": "Europe/Berlin", "Romance Standard Time": "Europe/Paris", "Central Europe Standard Time": "Europe/Budapest",
  "Central European Standard Time": "Europe/Warsaw", "E. Europe Standard Time": "Europe/Chisinau", "FLE Standard Time": "Europe/Kiev",
  "GTB Standard Time": "Europe/Bucharest", "South Africa Standard Time": "Africa/Johannesburg", "Arabian Standard Time": "Asia/Dubai",
  "India Standard Time": "Asia/Kolkata", "Singapore Standard Time": "Asia/Singapore", "China Standard Time": "Asia/Shanghai",
  "Tokyo Standard Time": "Asia/Tokyo", "Korea Standard Time": "Asia/Seoul", "AUS Eastern Standard Time": "Australia/Sydney",
  "E. Australia Standard Time": "Australia/Brisbane", "W. Australia Standard Time": "Australia/Perth", "New Zealand Standard Time": "Pacific/Auckland",
  "UTC": "UTC", "Coordinated Universal Time": "UTC",
};
function ianaZone(tzid) {
  if (!tzid) return null;
  const z = String(tzid).replace(/^"+|"+$/g, "").trim();
  if (zoneOk(z) && /\/|^UTC$/.test(z)) return z;
  const m = z.match(/([A-Za-z]+\/[A-Za-z0-9_+\-]+(?:\/[A-Za-z0-9_+\-]+)?)\s*$/);
  if (m && zoneOk(m[1])) return m[1];
  return WINDOWS[z] || null;
}
// { date, time, zone } → the same instant as wall time in `target`. zone null = floating (already local).
function toZone(o, target) {
  if (!o || !o.time || !o.zone || !target || o.zone === target || !zoneOk(target)) return { date: o.date, time: o.time };
  const [y, m, d] = o.date.split("-").map(Number), [hh, mm] = o.time.split(":").map(Number);
  const p = partsAt(wallToEpoch(y, m, d, hh, mm, o.zone), target);
  return { date: `${p.y}-${pad(p.m)}-${pad(p.d)}`, time: `${pad(p.hh)}:${pad(p.mm)}` };
}

// ---------- parsing ----------
function unfold(text) { return String(text || "").replace(/\r\n?/g, "\n").replace(/\n[ \t]/g, ""); }
function parseLine(line) {
  // NAME;P=V;P2="a:b":VALUE — the first ':' outside quotes ends the name and params
  let i = 0, q = false;
  for (; i < line.length; i++) { const c = line[i]; if (c === '"') q = !q; else if (c === ":" && !q) break; }
  if (i >= line.length) return null;
  const head = line.slice(0, i), value = line.slice(i + 1);
  const parts = head.match(/(?:[^;"]|"[^"]*")+/g) || [head];
  const name = parts[0].toUpperCase(), params = {};
  for (const p of parts.slice(1)) { const j = p.indexOf("="); if (j > 0) params[p.slice(0, j).toUpperCase()] = p.slice(j + 1).replace(/^"|"$/g, ""); }
  return { name, params, value };
}
const unescapeText = (s) => String(s).replace(/\\n/gi, "\n").replace(/\\([,;\\])/g, "$1");
// "20261003T090000Z" / "20261003T090000" / "20261003" (+ TZID) → { date, time, zone, all_day }
function parseDt(value, params = {}) {
  const v = String(value || "").trim();
  const m = v.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?$/);
  if (!m) return null;
  const date = `${m[1]}-${m[2]}-${m[3]}`;
  if (!m[4] || params.VALUE === "DATE") return { date, time: null, zone: null, all_day: true };
  const zone = m[7] ? "UTC" : ianaZone(params.TZID);
  return { date, time: `${m[4]}:${m[5]}`, zone, all_day: false };
}
function parseRRule(v) {
  const o = {};
  for (const kv of String(v).split(";")) { const [k, val] = kv.split("="); if (k && val != null) o[k.toUpperCase()] = val; }
  const r = { freq: (o.FREQ || "").toUpperCase(), interval: Math.max(1, parseInt(o.INTERVAL || "1", 10) || 1) };
  if (o.COUNT) r.count = parseInt(o.COUNT, 10);
  if (o.UNTIL) r.until = parseDt(o.UNTIL, {});
  if (o.BYDAY) r.byday = o.BYDAY.split(",").map((s) => { const mm = s.trim().toUpperCase().match(/^([+-]?\d{1,2})?(SU|MO|TU|WE|TH|FR|SA)$/); return mm ? { ord: mm[1] ? parseInt(mm[1], 10) : 0, day: DAY_CODES.indexOf(mm[2]) } : null; }).filter(Boolean);
  if (o.BYMONTHDAY) r.bymonthday = o.BYMONTHDAY.split(",").map((s) => parseInt(s, 10)).filter((n) => n && Math.abs(n) <= 31);
  if (o.BYSETPOS) r.bysetpos = o.BYSETPOS.split(",").map((s) => parseInt(s, 10)).filter(Boolean);
  if (o.BYMONTH) r.bymonth = o.BYMONTH.split(",").map((s) => parseInt(s, 10)).filter((n) => n >= 1 && n <= 12);
  return r;
}

function parse(text) {
  const lines = unfold(text).split("\n");
  const cal = { name: null, events: [] };
  let ev = null, depth = 0;      // depth > 0 inside a nested component (VALARM) of an event
  for (const raw of lines) {
    if (!raw.trim()) continue;
    const L = parseLine(raw);
    if (!L) continue;
    if (L.name === "BEGIN") {
      const what = L.value.trim().toUpperCase();
      if (what === "VEVENT" && !ev) { ev = { uid: null, summary: "", description: "", location: "", url: null, status: null, start: null, rrule: null, exdates: [], rdates: [], recurrence_id: null }; depth = 0; }
      else if (ev) depth++;
      continue;
    }
    if (L.name === "END") {
      const what = L.value.trim().toUpperCase();
      if (ev && what === "VEVENT" && depth === 0) { if (ev.start) cal.events.push(ev); ev = null; }
      else if (ev && depth > 0) depth--;
      continue;
    }
    if (!ev) { if ((L.name === "X-WR-CALNAME" || L.name === "NAME") && !cal.name) cal.name = unescapeText(L.value); continue; }
    if (depth > 0) continue;
    switch (L.name) {
      case "UID": ev.uid = L.value.trim(); break;
      case "SUMMARY": ev.summary = unescapeText(L.value).trim(); break;
      case "DESCRIPTION": ev.description = unescapeText(L.value); break;
      case "LOCATION": ev.location = unescapeText(L.value); break;
      case "URL": ev.url = L.value.trim(); break;
      case "STATUS": ev.status = L.value.trim().toUpperCase(); break;
      case "DTSTART": ev.start = parseDt(L.value, L.params); break;
      case "RRULE": ev.rrule = parseRRule(L.value); break;
      case "EXDATE": for (const v of L.value.split(",")) { const d = parseDt(v, L.params); if (d) ev.exdates.push(d); } break;
      case "RDATE": if ((L.params.VALUE || "").toUpperCase() !== "PERIOD") for (const v of L.value.split(",")) { const d = parseDt(v, L.params); if (d) ev.rdates.push(d); } break;
      case "RECURRENCE-ID": ev.recurrence_id = parseDt(L.value, L.params); break;
    }
  }
  return cal;
}

// ---------- expansion ----------
// a dt from another zone, as wall time in the event's zone (for EXDATE / RECURRENCE-ID / UNTIL)
function inZone(dt, zone) {
  if (!dt) return null;
  if (!dt.time || !dt.zone || !zone || dt.zone === zone) return dt;
  const c = toZone(dt, zone);
  return { ...dt, date: c.date, time: c.time, zone };
}
// All the starts of one VEVENT on days [fromN, toN] (day numbers, in the event's own wall time).
function monthDays(r, yy, mo, sd) {
  const dim = daysIn(yy, mo), first = dayNum(yy, mo, 1);
  let set = [];
  if (r.byday && r.byday.length) {
    for (const b of r.byday) {
      const all = [];
      for (let d = 0; d < dim; d++) if (dow(first + d) === b.day) all.push(first + d);
      if (!b.ord) set.push(...all);
      else { const pick = b.ord > 0 ? all[b.ord - 1] : all[all.length + b.ord]; if (pick != null) set.push(pick); }
    }
  } else if (r.bymonthday && r.bymonthday.length) {
    for (const md of r.bymonthday) { const d = md > 0 ? md : dim + md + 1; if (d >= 1 && d <= dim) set.push(first + d - 1); }
  } else if (sd <= dim) set.push(first + sd - 1);
  set = [...new Set(set)].sort((a, b) => a - b);
  if (r.bysetpos && r.bysetpos.length) set = r.bysetpos.map((p) => (p > 0 ? set[p - 1] : set[set.length + p])).filter((n) => n != null).sort((a, b) => a - b);
  return set;
}
function expandEvent(ev, fromN, toN, maxIter = 6000) {
  const s = ev.start, zone = s.zone, r = ev.rrule;
  const [sy, sm, sd] = s.date.split("-").map(Number);
  const startN = dayNum(sy, sm, sd);
  const out = [];
  const until = r && r.until ? inZone(r.until, zone) : null;
  const untilN = until ? dayNum(...until.date.split("-").map(Number)) : Infinity;
  let produced = 0;
  // stop at UNTIL, at COUNT (counted from the first start, so the window never changes the count), or past the window
  const done = (n) => n > untilN || (n === untilN && until.time && s.time && s.time > until.time) || (r.count && produced >= r.count) || n > toN;
  const take = (n) => { produced++; if (n >= fromN) out.push(n); };
  if (!r || !r.freq) {
    if (startN >= fromN && startN <= toN) out.push(startN);
  } else if (r.freq === "DAILY") {
    for (let i = 0, n = startN; i < maxIter * 7; i++, n += r.interval) {
      if (done(n)) break;
      if (r.bymonth && !r.bymonth.includes(fromDayNum(n).m)) continue;
      if (r.byday && r.byday.length && !r.byday.some((b) => b.day === dow(n))) continue;
      take(n);
    }
  } else if (r.freq === "WEEKLY") {
    const days = r.byday && r.byday.length ? r.byday.map((b) => b.day) : [dow(startN)];
    const offs = [...new Set(days.map((d) => (d + 6) % 7))].sort((a, b) => a - b);   // Monday = 0 (WKST=MO)
    const week0 = startN - ((dow(startN) + 6) % 7);
    let stop = false;
    for (let i = 0, w = week0; i < maxIter && !stop; i++, w += 7 * r.interval) {
      for (const o of offs) {
        const n = w + o;
        if (n < startN) continue;
        if (done(n)) { stop = true; break; }
        if (r.bymonth && !r.bymonth.includes(fromDayNum(n).m)) continue;
        take(n);
      }
    }
  } else if (r.freq === "MONTHLY" || r.freq === "YEARLY") {
    let stop = false;
    for (let i = 0; i < maxIter && !stop; i++) {
      // MONTHLY: every INTERVAL months from the start month; YEARLY: the BYMONTH months (or the start month) every INTERVAL years
      const periods = [];
      if (r.freq === "MONTHLY") { const k = i * r.interval; periods.push([sy + Math.floor((sm - 1 + k) / 12), ((sm - 1 + k) % 12) + 1]); }
      else for (const mo of (r.bymonth && r.bymonth.length ? [...r.bymonth].sort((a, b) => a - b) : [sm])) periods.push([sy + i * r.interval, mo]);
      for (const [yy, mo] of periods) {
        if (dayNum(yy, mo, 1) > toN) { stop = true; break; }
        if (r.freq === "MONTHLY" && r.bymonth && !r.bymonth.includes(mo)) continue;
        for (const n of monthDays(r, yy, mo, sd)) {
          if (n < startN) continue;
          if (done(n)) { stop = true; break; }
          take(n);
        }
        if (stop) break;
      }
    }
  }
  for (const rd of ev.rdates || []) {
    const z = inZone(rd, zone); const n = dayNum(...z.date.split("-").map(Number));
    if (n >= fromN && n <= toN && !out.includes(n)) out.push(n);
  }
  const ex = new Set((ev.exdates || []).map((x) => inZone(x, zone).date));
  return out.filter((n) => n <= toN && !ex.has(isoDay(n))).sort((a, b) => a - b);
}

/*
  occurrences(cal, from, to) → every start between two dates (inclusive, YYYY-MM-DD), in each
  event's own wall time: [{ date, time, zone, all_day, summary, uid, url, status }]
  The window is padded by a day each side for zone differences; callers convert with toZone().
*/
function occurrences(cal, from, to) {
  const [fy, fm, fd] = from.split("-").map(Number), [ty, tm, td] = to.split("-").map(Number);
  const fromN = dayNum(fy, fm, fd) - 1, toN = dayNum(ty, tm, td) + 1;
  const masters = cal.events.filter((e) => !e.recurrence_id);
  const overrides = cal.events.filter((e) => e.recurrence_id);
  const moved = new Map();   // uid → Set(original dates replaced by an override)
  for (const o of overrides) {
    const master = masters.find((m) => m.uid && m.uid === o.uid);
    const rid = inZone(o.recurrence_id, master ? master.start.zone : o.recurrence_id.zone);
    if (!moved.has(o.uid)) moved.set(o.uid, new Set());
    moved.get(o.uid).add(rid.date);
  }
  const out = [];
  const push = (e, n) => out.push({ date: isoDay(n), time: e.start.time, zone: e.start.zone, all_day: !!e.start.all_day, summary: e.summary, uid: e.uid, url: e.url, status: e.status });
  for (const e of masters) {
    if (e.status === "CANCELLED") continue;
    const skip = moved.get(e.uid);
    for (const n of expandEvent(e, fromN, toN)) if (!skip || !skip.has(isoDay(n))) push(e, n);
  }
  for (const o of overrides) {
    if (o.status === "CANCELLED") continue;
    const n = dayNum(...o.start.date.split("-").map(Number));
    if (n >= fromN && n <= toN) push(o, n);
  }
  return out.sort((a, b) => (a.date + (a.time || "")).localeCompare(b.date + (b.time || "")));
}

const looksLikeICS = (text) => /^\s*BEGIN:VCALENDAR/i.test(String(text || "").slice(0, 400).replace(/^\uFEFF/, ""));

module.exports = { parse, occurrences, expandEvent, parseDt, parseRRule, toZone, ianaZone, zoneOk, wallToEpoch, partsAt, looksLikeICS, dayNum, isoDay, dow, DAY_KEYS };
