"use strict";
/*
  ride-facts.js — what a rider reads off a ride before they open it (Pass 22, Oct 2, 2026).

  Ten riders tested the directory. The row said "3 mi" and every one of them read it as the ride's
  length (it was the distance from the city centre); racers, beginners and gravel riders had to open
  every ride to learn its pace. A "fast" ride turned out to average 13 mph. A beginner ride's checklist
  quoted its fast group. So, from the ride's own text and nothing else:

    speedsOf(text)   every speed the host posted: [{lo, hi, plus, upper, unit, avg, fast, part}]
    paceInfo(r)      the pace buckets the finder sorts by (easy / steady / fast) and what they rest on
    paceOf(r)        the buckets alone (the three-tap matcher; "steady" when nothing is known)
    paceText(r)      the row's short pace ("14–16 mph", "22–25 km/h", "13 mph avg", "Easy pace", or "")
    lengthText(r)    the row's ride length ("25 mi", "25–30 mi", "40 km", or "")
    firstPace(r)     the first-time checklist's pace line: the easiest group the host posted, never the fastest
    ebikeOf(r)       the host's own e-bike rule, or null: { k: welcome|limited|discouraged|no, label, quote, ok }

  Posted speeds win over words: "fast" in the text doesn't make a 13 mph average fast. A drop ride stays
  fast. The host's name never counts (a shop called "Global Bikes & E-Bikes" says nothing about a ride).
  Used by tools/build-rides.js; the cases are in tools/test/ride-facts.test.js.
*/

const KMH = 1.609344;
const UNIT = /\b(mph|miles per hour|km\/h|km\/hr|kmh|kph|km per hour|kilomet(?:re|er)s? per hour)\b/i;
const MONTH_BEFORE = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\s*$/i;
// what can follow a number that is not a speed: a distance, a time, a date, a count, a share
const NOT_SPEED_AFTER = /^\s*(?:\d|%|\/|-?\s*mi\b|-?\s*miles?\b|-?\s*mile\b|-?\s*km\b(?!\s*\/?\s*h|h|ph)|kilomet(?!(?:re|er)s? per hour)|-?\s*ft\b|feet|foot|metres?|meters?|m\b|-?\s*hours?\b|hrs?\b|h\b|-?\s*minutes?|mins?\b|am\b|pm\b|a\.m|p\.m|th\b|st\b|nd\b|rd\b|s\b|x\b|people|riders|laps?\b|loops?\b|stops?\b|years?|weeks?|days?|members|of\b|out of)/i;
const NUM = /(~|≈)?(\d{1,2}(?:\.\d+)?)(\s*\+)?(?:\s*(?:–|—|-|to)\s*(\d{1,2}(?:\.\d+)?)(\s*\+)?)?/g;
const AVG = /\b(avg|average[sd]?|averaging|mean)\b/i;
const FLAT = /\bflats?\b|\bcruis|\bpeaks?\b|\btop speed|\bsprints?\b|\bon the level\b/i;
// a number that belongs to the front of the ride: "faster riders go around 20 mph", "A group 22+"
const FAST_PART = /\bfast(?:er|est)?\s+(?:riders?|group|guys|folks|pack|ones?)\b|(?:^|[\s,(:])A\+?(?=\s*(?:group|ride|riders|:|\d|$))|\bA[\s-]group\b|\bfront\s+group\b|\blead\s+group\b|\brace\s+group\b|\bbreaks?\s+away\b|\bfaster\s+(?:extensions?|options?)\b/i;
const UPPER_BEFORE = /(?:\b(?:under|below|up to|less than|no (?:more|faster) than|capped at|max(?:imum)?(?: of)?|at most)|<)\s*$/i;
const UPPER_AFTER = /^\s*(?:mph|km\/h|kmh|kph)?\s*(?:max\b|maximum\b|or (?:slower|less|under|below)\b|and (?:under|below|slower)\b|tops?\b)/i;
const OVER_BEFORE = /(?:\b(?:over|above|more than|at least)|>)\s*$/i;
const OVER_AFTER = /^\s*(?:mph|km\/h|kmh|kph)?\s*(?:or (?:faster|more|better|above)\b|and (?:up|faster|above)\b|plus\b|min(?:imum)?\b)/i;

const fmtN = (n) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10));
const toMph = (v, unit) => (unit === "kmh" ? v / KMH : v);

// every speed in a pace text, with what kind of number it is
function speedsOf(text) {
  const t = String(text || "").replace(/(\d),(\d{3})/g, "$1$2");
  const out = [];
  // sentences and clauses: a full stop before a space (not a decimal point), a semicolon, brackets, a spaced dash
  // (brackets read as commas: "B 19–22 (no drop), C 15–18 (no drop)" is still one list)
  for (const seg of t.replace(/[()]/g, ",").split(/\.(?=\s|$)|;|\s[–—]\s/)) {
    if (!UNIT.test(seg)) continue;
    const segUnit = /km\s*\/?\s*h|kph|kmh|kilomet/i.test(seg) && !/\bmph\b|miles per hour/i.test(seg) ? "kmh" : "mph";
    // the parts of a clause: "B group 17 mph, C group 14–15 mph, D group 10–12 mph"
    for (const part of seg.split(/,|\band\b(?=\s+\d|\s+[A-E]\b|\s+\w+\s+\d)/)) {
      NUM.lastIndex = 0;
      let m, prev = 0;
      while ((m = NUM.exec(part))) {
        const i = m.index, before = part.slice(0, i), after = part.slice(i + m[0].length);
        const lead = part.slice(prev, i); prev = i + m[0].length;      // the words since the last number: "A group", "faster riders go around"
        if (/[A-Za-z0-9\/.\-:]$/.test(before)) continue;                 // glued to a word or a time: "L3", "D-4", "4/10", "9:30"
        if (MONTH_BEFORE.test(before)) continue;                         // "Oct 7"
        if (NOT_SPEED_AFTER.test(after)) continue;                       // "30 miles", "1.5–2 hours", "6:30"
        if (/^\s*:\d/.test(after)) continue;
        // the unit of this number: the next one after it in the clause, or the clause's
        const nextUnit = (part.slice(i) + " " + seg.slice(seg.indexOf(part) + part.length)).match(/\bmph\b|miles per hour|km\s*\/\s*hr?\b|\bkmh\b|\bkph\b|kilomet(?:re|er)s? per hour/i);
        const unit = nextUnit ? (/mph|miles per/i.test(nextUnit[0]) ? "mph" : "kmh") : segUnit;
        let lo = +m[2], hi = m[4] != null ? +m[4] : lo;
        if (hi < lo) [lo, hi] = [hi, lo];
        const [min, max] = unit === "kmh" ? [6, 65] : [4, 40];
        if (lo < min || hi > max) continue;
        const upper = UPPER_BEFORE.test(before) || UPPER_AFTER.test(after);
        const plus = !!(m[5] || (m[4] == null && m[3])) || OVER_BEFORE.test(before) || OVER_AFTER.test(after);
        out.push({ lo, hi, plus: plus && !upper, upper, unit, avg: AVG.test(part), fast: FAST_PART.test(lead), flat: !AVG.test(part) && FLAT.test(part), approx: !!m[1] || /\b(about|around|roughly|approx(?:imately)?)\s*$/i.test(before), part: part.trim() });
      }
    }
  }
  return out;
}
// "14–16 mph", "20+ mph", "under 16 mph"
function speedText(t) {
  const u = t.unit === "kmh" ? "km/h" : "mph";
  if (t.upper) return `under ${fmtN(t.hi)} ${u}`;
  return `${fmtN(t.lo)}${t.hi !== t.lo ? `–${fmtN(t.hi)}` : ""}${t.plus ? "+" : ""} ${u}`;
}
const topMph = (t) => toMph(t.upper ? t.hi - 1 : t.plus ? t.hi + 1.5 : t.hi, t.unit);
const loMph = (t) => toMph(t.upper ? 0 : t.lo, t.unit);
// world rides speak the host's km/h first; US rides mph. Fall back to whatever was posted.
// A posted average wins over the same group's other numbers ("rolling 14–17 mph, ~13 mph average" is a 13 mph
// ride). With several groups the other numbers are other groups, so only a flats/cruising speed drops out.
const GROUPS = /\bgroups?\b|\b[A-E][+-]?(?=\s*(?:group|:|\d|\())/;
function sameGroup(toks) {
  if (!toks.some((t) => t.avg)) return toks;
  return GROUPS.test(toks.map((t) => t.part).join(" ")) ? toks.filter((t) => !t.flat) : toks.filter((t) => t.avg);
}
function displayTokens(r) {
  const all = sameGroup(speedsOf(r.pace));
  const want = (r.country || "US") === "US" ? "mph" : "kmh";
  const mine = all.filter((t) => t.unit === want);
  return mine.length ? mine : all;
}

const EASY_W = /casual|\bgentle|\beasy\b|leisur|\bslow(?!er)|party pace|\bsocial\b|mellow|\bchill|relaxed|conversational|chatt?(?:y|ing)|talking pace|no one (?:gets )?left|cruis(?:e|ing)\b|coffee pace|caf[eé][- ]pace/i;
const FAST_W = /(?<!\bthan (?:a |the )?)\b(fast|race|racing|spicy|advanced(?! beginner)|hammer(?:fest)?|drop ride|hard (?:efforts?|pace|ride|riding))\b/i;
const STEADY_W = /\b(intermediate|moderate|steady|tempo|brisk|spirited|solid)\b/i;
// "not particularly fast", "not a race ride", "none too long or fast", "keep speeds down": not fast
const NEGATED = /\b(?:not|never|no|none too|nor)\s+(?:(?:a|an|the|too|very|that|particularly|especially|really|super|overly|long or)\s+)*(?:fast|race|racing|competitive|hard)\b[\w ]{0,12}|\bkeep speeds? down\b/gi;
const plain = (pace) => String(pace || "").replace(NEGATED, " ");
const wordsOf = (pace) => ["easy", "steady", "fast"].filter((k) => ({ easy: EASY_W, steady: STEADY_W, fast: FAST_W })[k].test(plain(pace)));
const slowGroupOf = (r) => (r.inclusive_focus || []).includes("beginner") || r.drop_policy === "no-drop" || r.drop_policy === "groups";

// the pace buckets and what they rest on: "avg" (a posted average), "speed" (posted speeds), "words", or "none"
function paceInfo(r) {
  const pace = String(r.pace || "");
  const beginner = (r.inclusive_focus || []).includes("beginner");
  const toks = sameGroup(speedsOf(pace));   // posted speeds win over words; a posted average over a flats speed
  const b = new Set();
  let basis = "none";
  if (toks.length) {
    basis = toks.every((t) => t.avg) ? "avg" : "speed";
    const tops = toks.map(topMph);
    // easy: the slowest group the host posts sits around 14 mph or under ("C 13–15", "12–15", "14 mph avg")
    if (Math.min(...toks.map((t) => (t.upper ? topMph(t) : (loMph(t) + topMph(t)) / 2))) <= 14) b.add("easy");
    if (toks.some((t) => loMph(t) < 18 && topMph(t) > 14.5)) b.add("steady");
    if (Math.max(...tops) >= 18) b.add("fast");
  } else {
    const disc = r.discipline || [], w = plain(pace);
    if (EASY_W.test(w) || (disc.includes("social") && !pace)) b.add("easy");
    if (STEADY_W.test(w) || r.drop_policy === "groups") b.add("steady");
    if (FAST_W.test(w)) b.add("fast");
    if (b.size) basis = "words";
  }
  if (beginner) { b.add("easy"); if (basis === "none") basis = "words"; }
  if (r.drop_policy === "drop") { b.add("fast"); if (basis === "none") basis = "words"; }   // a drop ride stays fast
  const buckets = ["easy", "steady", "fast"].filter((k) => b.has(k));
  return { buckets: buckets.length ? buckets : ["steady"], basis, tokens: toks, words: wordsOf(pace) };
}
const paceOf = (r) => paceInfo(r).buckets;

const WORD = { easy: "Easy pace", steady: "Steady pace", fast: "Fast" };
function paceText(r) {
  const info = paceInfo(r);
  const toks = displayTokens(r);
  const u = (t) => (t.unit === "kmh" ? "km/h" : "mph");
  if (toks.length) {
    const use = toks;
    const avg = toks.every((t) => t.avg) ? toks : [];
    // a ride with a slow group whose only posted number is the fast group's: say so, don't headline it
    // a ride with a slow group whose only posted number is the fast riders' ("faster riders go around 20 mph"):
    // that number isn't the ride's pace. Say what the host's words or tags say, or nothing.
    if (!avg.length && slowGroupOf(r) && use.every((t) => t.fast)) {
      const w = info.words.filter((k) => k !== "fast");
      const easy = w.length ? w[0] : (r.inclusive_focus || []).includes("beginner") ? "easy" : null;
      return easy ? WORD[easy] : "";
    }
    if (use.length === 1) { const s = speedText(use[0]); return (s.charAt(0).toUpperCase() + s.slice(1)) + (avg.length ? " avg" : ""); }
    const hi = Math.max(...use.map((t) => t.hi));
    const plus = use.some((t) => t.plus && t.hi >= hi - 2);       // "15+" beside "14–16": the top is open
    if (use.every((t) => t.upper)) return `Under ${fmtN(hi)} ${u(use[0])}${avg.length ? " avg" : ""}`;
    const lo = Math.min(...use.map((t) => (t.upper ? t.hi : t.lo)));   // "under 10" is the slow end at 10
    const range = lo === hi ? `${fmtN(lo)}${plus ? "+" : ""}` : `${fmtN(lo)}–${fmtN(hi)}${plus ? "+" : ""}`;
    return `${range} ${u(use[0])}${avg.length ? " avg" : ""}`;
  }
  if (info.basis === "none") return "";
  // the host's own words first ("Race pace" says Fast even with pace groups); then what the tags say
  if ((r.inclusive_focus || []).includes("beginner")) return WORD.easy;
  const bk = info.words.length ? info.words : info.buckets;
  return slowGroupOf(r) ? WORD[bk[0]] : WORD[bk[bk.length - 1]];
}

// "25 mi", "25–30 mi", "Under 20 mi"; outside the US "40 km" (the host's miles when that's all there is)
function lengthText(r) {
  const us = (r.country || "US") === "US";
  const k = typeof r.distance_km === "number" ? r.distance_km : null;
  if (!us && k != null) return `${fmtN(Math.round(k))} km`;
  const raw = r.distance_miles;
  if (raw == null || raw === "") return k != null ? `${Math.round(k / KMH)} mi` : "";
  if (typeof raw === "number") return `${fmtN(raw)} mi`;
  const s = String(raw).replace(/\([^)]*\)/g, " ");
  const nums = [...s.matchAll(/(\d+(?:\.\d+)?)(\s*\+)?/g)].map((m) => ({ v: +m[1], plus: !!m[2] }));
  if (!nums.length) return "";
  const under = /^\s*(under|less than|up to|below)\b|\bor (less|under|fewer)\b/i.test(s);
  const lo = Math.min(...nums.map((n) => n.v)), hi = Math.max(...nums.map((n) => n.v));
  const plus = nums.some((n) => n.v === hi && n.plus) || /\b(and up|and longer|or more|longer options?|and beyond)\b/i.test(String(raw));
  const body = lo === hi ? `${fmtN(lo)}${plus ? "+" : ""}` : `${fmtN(lo)}–${fmtN(hi)}${plus ? "+" : ""}`;
  return `${under ? "Up to " : ""}${body} mi${/\beach way\b/i.test(String(raw)) ? " each way" : ""}`;
}

// The first-time checklist's pace line. A ride with a slow or waiting group (beginner, no-drop, pace
// groups) describes the easiest group the host posted, never the fastest; a casual ride never gets
// "you'll breathe hard on the hills".
function feel(top, casual) {
  if (top <= 13.5) return "you can talk the whole way";
  if (top <= 16.5) return casual ? "relaxed, with time to talk" : "steady — you'll breathe hard on the hills";
  if (top <= 19.5) return "brisk — you'll want some fitness";
  return "fast — for riders who race or train";
}
function firstPace(r) {
  const pace = String(r.pace || "").trim();
  if (!pace) return { text: "Pace isn't posted. Ask the host before you go, or say you're new when you arrive.", token: null };
  const toks = displayTokens(r);
  const w = wordsOf(pace);
  const casual = (w.includes("easy") || (r.discipline || []).includes("social")) && !w.includes("steady") && !w.includes("fast");
  const slow = slowGroupOf(r) || toks.length > 1;
  const sentence = (s) => { s = s.replace(/\s*[.;]\s*$/, ""); return s.charAt(0).toUpperCase() + s.slice(1) + "."; };
  let pick = null, how = "single";
  if (slow) {
    const cands = toks.filter((t) => !t.fast);
    if (cands.length) {
      pick = [...cands].sort((a, b) => topMph(a) - topMph(b) || (b.avg ? 1 : 0) - (a.avg ? 1 : 0))[0];
      how = pick.avg ? "avg" : toks.length > 1 ? "easiest" : "single";
    }
  } else if (toks.length) {
    pick = toks.find((t) => t.avg) || toks[0];
    how = pick.avg ? "avg" : "single";
  }
  if (!pick) {
    // only the fast group's number is posted (or none): the host's own words, and where to sit
    const tail = toks.length && slow ? " Ride with the main group your first time, not the fast one." : "";
    return { text: sentence(pace) + tail, token: null };
  }
  // a wide range on a ride that waits ("11 to 20+ mph") is told by its bottom end, where a new rider sits
  const top = slow ? Math.min(topMph(pick), toMph(pick.lo, pick.unit) + 3) : topMph(pick);
  const s = speedText(pick), f = feel(top, casual);
  const text = how === "avg" ? (toks.length > 1 && slow ? `The easiest group averages ${s}: ${f}.` : `Expect ${s} on average: ${f}.`)
    : how === "easiest" ? `The easiest pace the host lists is ${s}: ${f}.`
    : `Expect ${s}: ${f}.`;
  return { text, token: pick };
}

// ---------- e-bikes: only what the ride's own text says (description, visitor notes, pace) ----------
const EBIKE = /\be-?\s?bikes?\b|\bebikes?\b|\belectric[- ](?:bikes?|bicycles?|assist)\b|\belectric[- ]powered\b|\bpedal[- ]assist\b|\bthrottle\b|\bclass [123]\b/i;
const EB = "(?:e-?\\s?bikes?|ebikes?)";
const RULES = [
  // a separate e-bike ride, a shop that rents them, a speed comparison: not this ride's rule
  { k: null, re: new RegExp(`\\b(?:separate|also runs an?|an?)\\s+${EB}\\s+(?:ride|night|group|version)|${EB}\\s+(?:night|ride\\b(?! is))|\\brent(?:s|als?)?\\b[^.;]{0,30}${EB}|${EB}\\s+rentals?|${EB}\\s+speeds?|than\\b[^.;]{0,20}${EB}`, "i") },
  { k: "limited", label: "Class 1 only", re: /\bclass 1\b[^.;]{0,25}\bonly\b|\bonly class 1\b/i },
  { k: "limited", label: "Pedal-assist only", re: new RegExp(`\\bclass 2\\b[^.;]{0,40}\\b(?:not allowed|aren'?t allowed|prohibited|not permitted)|\\bthrottle\\b[^.;]{0,40}\\b(?:not allowed|aren'?t allowed|prohibited|not permitted)|\\bno throttles?\\b|\\bpedal[- ]assist\\b[^.;]{0,20}\\b(?:only|are fine|is fine|allowed|welcome|ok)\\b|\\ballows? pedal[- ]assist`, "i") },
  { k: "limited", label: (c) => `Class 1 and ${c.match(/class 1 and ([23])/i)[1]} allowed`, re: /\bclass 1 and [23]\b[^.;]{0,30}\b(?:allowed|fine|ok|welcome)/i },
  { k: "limited", label: "Class 1 allowed", re: new RegExp(`\\bclass 1 ${EB}\\b[^.;]{0,15}\\b(?:allowed|welcome|ok|fine)\\b`, "i") },
  { k: "limited", label: "Ask the ride leader", re: new RegExp(`${EB}[^.;]{0,40}\\b(?:discretion|ask (?:the )?(?:leader|host))`, "i") },
  { k: "limited", label: "Approved ones only", re: new RegExp(`\\bapproved ${EB}`, "i") },
  { k: "discouraged", label: "Not recommended", re: new RegExp(`${EB}[^.;]{0,20}\\bnot recommended|${EB}[^.;]{0,30}\\btoo heavy`, "i") },
  { k: "no", label: "Not allowed", re: new RegExp(`\\bno ${EB}\\b|${EB}[^.;]{0,30}\\b(?:not allowed|aren'?t allowed|not permitted|prohibited|banned|not welcome)\\b|\\bprohibits? ${EB}|leave (?:your )?${EB} at home|\\bwithout ${EB}`, "i") },
  { k: "welcome", label: "Welcome", re: new RegExp(`${EB}[^.;]{0,70}\\b(?:welcome|are fine|is fine|friendly|ok\\b|okay|allowed|all show up)|\\b(?:welcome|including|incl\\.?|any|all)\\b[^.;]{0,60}${EB}|\\bmembers ride ${EB}|\\belectric[- ]powered\\b[^.;]{0,40}\\bwelcome|\\bwhatever bike\\b[^.;]{0,80}${EB}|\\bbikes and ${EB} only\\b|\\bborrow\\b[^.;]{0,30}${EB}|routes? suits?\\b[^.;]{0,20}${EB}`, "i") },
];
function ebikeOf(r) {
  const text = [r.description, r.visitor_notes, r.pace].filter(Boolean).join(" ");   // never the host's name
  if (!EBIKE.test(text)) return null;
  // sentences, then ", and" / ", but" (so "both welcome, and the shop rents e-bikes" is two things)
  const clauses = text.split(/(?<=[.!?])\s+|;\s*|\s+—\s+|,\s+(?:and|but)\s+/).filter((c) => EBIKE.test(c));
  const RANK = { no: 4, discouraged: 3, limited: 2, welcome: 1 };
  let best = null;
  for (const c of clauses) {
    for (const rule of RULES) {
      if (!rule.re.test(c)) continue;
      if (rule.k === null) break;                                       // this clause isn't a rule for the ride
      // the strictest thing the host says wins (a rule beats a general welcome)
      if (!best || RANK[rule.k] > RANK[best.k]) best = { k: rule.k, label: typeof rule.label === "function" ? rule.label(c) : rule.label, quote: c.trim().replace(/\s+/g, " ") };
      break;
    }
  }
  if (!best) return null;
  return { ...best, ok: best.k === "welcome" || best.k === "limited" };
}

module.exports = { speedsOf, speedText, paceInfo, paceOf, paceText, lengthText, firstPace, ebikeOf, KMH };
