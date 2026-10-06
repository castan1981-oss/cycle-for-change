"use strict";
/*
  ride-time.js — reads a ride's start time out of its own words (Oct 6, 2026).

  Used by tools/derive-ride-fields.js (start_hhmm) and its tests. The old reader took any
  number after "ride at" / "leaves" / "roll" for a clock time, so "19-20 mph" became 7 pm,
  "leaves A1A" became 1 pm and "at 14–16 mph" became 2 pm; and every bare time up to 6 was
  made an evening ("rolls out sharp at 5:35" on a 5:35 am ride became 5:35 pm).

  The rules now:
  - A clock time has minutes ("7:00") or am/pm ("7 am"). A bare number is never a time.
  - Never part of a word or a road ("A1A", "US-1", "I-10"), never a speed, a distance or a count
    ("19-20 mph", "15 mi", "40 km", "4 laps").
  - The roll time beats the meet time: "meet 6:30 pm, roll 7:00" starts at 7:00.
  - A bare "7:00" takes its am/pm, in order, from: a range it opens ("5:35 to 7:00 am"); the
    ride's own time_local when the clock matches ("7:00 pm"); the nearest am/pm time before it
    in the same text ("meet 6:30 pm, roll 7:00"); morning or evening words around it
    ("Saturday morning", "night ride"); and only then a guess (1–6 → pm, 7–11 → am, 12 → noon).
    The guess is marked `sure: false`, and derive keeps a hand-set time over a guess.
*/

const AMPM = "(a\\.?\\s?m\\.?|p\\.?\\s?m\\.?)";
// a time token: hour, optional :minutes, optional am/pm; not inside a word, a road number or a decimal
const TOKEN = new RegExp(`(?<![\\w.:/#$-])(\\d{1,2})(?::(\\d{2}))?(?:\\s*${AMPM}(?![a-z]))?`, "gi");
// what can follow a number that makes it a speed, a distance or a count, not a time
const NOT_TIME_AFTER = /^\s*(?:(?:-|–|—|to)\s*\d+(?:\.\d+)?\s*)?(?:mph|kph|km\/h|kmh|km|k\b|mi\b|mile|miles|min\b|mins|minutes|hr|hrs|hour|hours|laps?|riders?|people|%|ft|feet|m\b|meters?|metres?|th\b|st\b|nd\b|rd\b|x\b)/i;
const ROLL = /\b(?:roll(?:s|ing)?(?:\s*out)?|rollout|wheels\s+(?:down|up|rolling)|kickstands?\s+up|depart(?:s|ing|ure)?|leav(?:e|es|ing)|ride\s+(?:at|out|starts?)|start(?:s|ing)?(?:\s+at)?|go(?:es)?\s+at|ride\s+time)\b/gi;
const MORNING = /\b(?:morning|mornings|a\.?m\.? ride|sunrise|dawn|breakfast|early bird|before work|brunch)\b/i;
const EVENING = /\b(?:evening|evenings|night|nights|nightly|tonight|after work|sunset|dusk|moonlight|full moon|happy hour|twilight|after dark)\b/i;

function toHHMM(h, m) {
  if (h > 23 || m > 59) return null;
  return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
}
const mer = (s) => (s ? (/^p/i.test(s) ? "pm" : "am") : null);
function apply(h, m, ap) {
  if (ap === "pm" && h < 12) h += 12;
  if (ap === "am" && h === 12) h = 0;
  return toHHMM(h, m);
}

// every clock time in a text, with where it sits and its own am/pm (or null)
function tokens(text) {
  const s = String(text || "");
  const out = [];
  for (const m of s.matchAll(TOKEN)) {
    const h = +m[1], mi = m[2] != null ? +m[2] : 0, ap = mer(m[3]);
    if (m[2] == null && !ap) continue;                 // a bare number is never a time
    if (h > 23 || mi > 59) continue;
    if (ap && (h < 1 || h > 12)) continue;             // "13 pm" is not a time
    const after = s.slice(m.index + m[0].length);
    if (!ap && NOT_TIME_AFTER.test(after)) continue;   // "19:00 min" etc.
    if (m[2] == null && NOT_TIME_AFTER.test(after)) continue;
    out.push({ h, m: mi, ap, index: m.index, end: m.index + m[0].length, raw: m[0], h24: m[2] != null && !ap && (h === 0 || h >= 13) });
  }
  return out;
}

// am/pm for a bare token. Returns { ap, sure }.
function meridiem(tok, all, text, ctx = {}) {
  const s = String(text || "");
  if (tok.ap) return { ap: tok.ap, sure: true };
  if (tok.h24 || tok.h === 0) return { ap: "24", sure: true };
  // a range it opens: "5:35 to 7:00 am", "11:30 and 11:59 pm"
  const nextTok = all.find((t) => t.index > tok.index);
  if (nextTok && nextTok.ap && /^\s*(?:-|–|—|to|until|till|and)\s*$/i.test(s.slice(tok.end, nextTok.index))) {
    let ap = nextTok.ap;
    // "11:30 to 1:00 pm": the start is the morning
    const a = tok.h % 12, b = nextTok.h % 12;
    if (ap === "pm" && a > b && tok.h !== 12) ap = "am";
    return { ap, sure: true };
  }
  // the ride's own time_local says it ("7:00 pm")
  if (ctx.timeLocal) {
    for (const t of tokens(ctx.timeLocal)) if (t.ap && t.h === tok.h && t.m === tok.m) return { ap: t.ap, sure: true };
  }
  // the nearest am/pm time before it, same sentence or clause run: "meet 6:30 pm, roll 7:00"
  const before = all.filter((t) => t.end <= tok.index && t.ap).pop();
  if (before && !/[.;]\s/.test(s.slice(before.end, tok.index))) {
    const bh = before.h % 12 + (before.ap === "pm" ? 12 : 0);
    for (const ap of [before.ap, before.ap === "am" ? "pm" : "am"]) {
      const th = tok.h % 12 + (ap === "pm" ? 12 : 0);
      const gap = (th * 60 + tok.m) - (bh * 60 + before.m);
      if (gap >= 0 && gap <= 180) return { ap, sure: true };
    }
  }
  // the ride's own time_local, any time: the same half of the day when the clock is close
  if (ctx.timeLocal) {
    const t = tokens(ctx.timeLocal).find((x) => x.ap);
    if (t && Math.abs((t.h % 12) - (tok.h % 12)) <= 2) return { ap: t.ap, sure: true };
  }
  // words around it
  const win = s.slice(Math.max(0, tok.index - 80), tok.end + 40);
  const morn = MORNING.test(win) || MORNING.test(ctx.name || ""), eve = EVENING.test(win) || EVENING.test(ctx.name || "");
  if (morn && !eve) return { ap: tok.h === 12 ? "pm" : "am", sure: true };
  if (eve && !morn) return { ap: tok.h >= 1 && tok.h <= 11 ? "pm" : "pm", sure: true };
  // a guess
  if (tok.h === 12) return { ap: "pm", sure: false };
  return { ap: tok.h <= 6 ? "pm" : "am", sure: false };
}

function resolve(tok, all, text, ctx) {
  const { ap, sure } = meridiem(tok, all, text, ctx);
  const hhmm = ap === "24" ? toHHMM(tok.h, tok.m) : apply(tok.h, tok.m, ap);
  return hhmm ? { hhmm, sure } : null;
}

// the roll time: a clock time right after a roll word ("roll 7:00", "rolls out sharp at 5:35", "leaves … at 7:15 am")
function rollTime(text, ctx = {}) {
  const s = String(text || "");
  const all = tokens(s);
  for (const m of s.matchAll(ROLL)) {
    const tok = all.find((t) => t.index >= m.index + m[0].length && t.index - (m.index + m[0].length) <= 18
      && !/[.;]/.test(s.slice(m.index + m[0].length, t.index)));
    if (!tok) continue;
    // "start changes", "start point" — only when the gap is plain ("at", "out sharp at", "between", ":")
    if (!/^[\s,:-]*(?:out\s+)?(?:sharp\s+)?(?:at\s+|around\s+|about\s+|by\s+|between\s+|from\s+|promptly\s+at\s+)?(?:~\s*)?$/i.test(s.slice(m.index + m[0].length, tok.index))) continue;
    const r = resolve(tok, all, s, ctx);
    if (r) return r;
  }
  return null;
}
// the first clock time in a text
function firstTime(text, ctx = {}) {
  const s = String(text || "");
  const all = tokens(s);
  for (const tok of all) { const r = resolve(tok, all, s, ctx); if (r) return r; }
  return null;
}

// The start time for a ride record: roll time in the schedule, then in time_local, then the
// first time in time_local, then in the schedule. Returns { hhmm, sure } or null.
function startOf(ride) {
  const ctx = { timeLocal: ride.time_local || null, name: ride.name || "" };
  return rollTime(ride.schedule, ctx) || rollTime(ride.time_local, ctx) || firstTime(ride.time_local, ctx) || firstTime(ride.schedule, ctx);
}
// every time a text states, as HH:MM (for the sweep that checks start_hhmm against the ride's own words)
function timesIn(text, ctx = {}) {
  const s = String(text || ""); const all = tokens(s);
  return all.map((t) => resolve(t, all, s, ctx)).filter(Boolean).map((r) => r.hhmm);
}

// What derive-ride-fields.js stores as start_hhmm. Never overwrites:
//   - a time a person set by hand (`start_hhmm_by_hand: true`);
//   - a time the ride's own words state ("8:00 or 9:00 am" keeps whichever was chosen; a meet time
//     the host also posts stays when it was picked on purpose).
// Otherwise the time read from the text, or what was there when the text says nothing.
const VALID = /^([01]\d|2[0-3]):[0-5]\d$/;
function chooseStart(ride) {
  const had = typeof ride.start_hhmm === "string" && VALID.test(ride.start_hhmm) ? ride.start_hhmm : null;
  if (had && ride.start_hhmm_by_hand === true) return had;
  const ctx = { timeLocal: ride.time_local || null, name: ride.name || "" };
  if (had) {
    const stated = new Set([...timesIn(ride.schedule, ctx), ...timesIn(ride.time_local, ctx)]);
    if (stated.has(had)) return had;
  }
  const got = startOf(ride);
  return got ? got.hhmm : had;
}

module.exports = { tokens, rollTime, firstTime, startOf, timesIn, chooseStart };
