#!/usr/bin/env node
/* Cycle for Change — 2027 ride calendar generator.
   Reads data/calendar-2027.json (every organized US ride and race we could pin
   down for 2027) and writes one static page plus a machine-readable feed into
   cfc-site/. No dependencies, no framework. Output is committed; Netlify just
   serves the files. Same chrome as scripts/build-events.js.

   Run:   node scripts/build-calendar.js      (or: npm run build:calendar)
   Docs:  data/SCHEMA.md  → "2027 calendar"

   URLs it produces:
     /events/2027/                     the calendar (static rows; calendar.js filters them)
     /events/2027/calendar-2027.json   machine-readable feed
     /sitemap-calendar.xml             listed in /sitemap.xml

   The page is styled by /events/events.css + /events/2027/calendar.css and
   enhanced by /events/events.js (mileage line) + /events/2027/calendar.js.
   Those three files are hand-written; this script does not touch them. */
"use strict";

const fs = require("fs");
const path = require("path");
const CHROME = require("./chrome.js"); // shared header, footer, fonts
const BLOCKS = require("./blocks.js"); // the ride-report form (Pass 3)
const TOWNS = require("./towns.js");  // the town layer (Sept 30, 2026): a guide link on every row that has one, the strip in its details
const PH = require("./photos.js");    // Pass 25: Robert's photos (alt text, place, the figure)

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data", "calendar-2027.json");
const OUT = path.join(ROOT, "cfc-site");
const SITE = "https://cycleforchange.org";
const URL = "/events/2027/";
const TODAY = new Date().toISOString().slice(0, 10);
// One form on this page: `ride-report` (scripts/blocks.js), for a missing event or a changed date.

// ——— guardrails from CLAUDE.md ———————————————————————————————————————
// Same list as build-events.js minus /Prescott/: here it is a place name in
// event data (Whiskey Off-Road runs there), not the retired origin line.
const BANNED = [
  /\bleverage\b/i, /\bsynergy\b/i, /\bjourney\b/i, /passionate about/i,
  /thrilled to announce/i, /excited to share/i, /\$800/, /two suitcases/i,
  /est\.? 2008/i, /years? sober\b/i, /sober since/i, /\brelapse/i, /7,?500[- ]mile/i,
];
function lintDeep(where, v) {
  if (typeof v === "string") { for (const re of BANNED) if (re.test(v)) throw new Error(`Banned phrase ${re} in ${where}: "${v.slice(0, 80)}"`); }
  else if (Array.isArray(v)) v.forEach((x, i) => lintDeep(`${where}[${i}]`, x));
  else if (v && typeof v === "object") Object.keys(v).forEach((k) => lintDeep(`${where}.${k}`, v[k]));
}

// ——— helpers —————————————————————————————————————————————————————————————
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const attr = esc;
const jsonld = (obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/<\//g, "<\\/")}\n</script>`;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CATS = ["Charity ride", "Road", "Gravel", "MTB", "Multi-day tour", "Ultra / bikepacking", "Race", "Hill climb"];
const REGIONS = ["Southwest", "California", "Pacific NW", "Mountain", "Texas & South Central", "Midwest", "Southeast", "Mid-Atlantic", "Northeast", "Alaska & Hawaii", "National / multiple"];
const CAUSE_ORDER = ["LGBTQ+", "HIV/AIDS", "Recovery", "Mental health", "Cancer", "MS", "Diabetes", "Heart", "Children", "Health", "Veterans", "Lung", "ALS", "Arthritis", "Autism", "Cystic fibrosis", "Alzheimer's", "Hunger", "Bike advocacy", "Environment", "Community", "Various charities", "Other"];

function day(iso) { const d = new Date(iso + "T12:00:00Z"); return { m: d.getUTCMonth() + 1, d: d.getUTCDate(), dow: DOW[d.getUTCDay()] }; }
function fmtLong(iso) { return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", weekday: "short", month: "long", day: "numeric", year: "numeric" }); }
// Pass 9 (Sept 30, 2026): every row is a small poster — the day big, the rest of the date small,
// the category's mark beside it (cfc-site/rides/marks.svg).
const CAT_MARK = { "Charity ride": "hundred", Road: "road", Gravel: "gravel", MTB: "mtb", "Multi-day tour": "distance", "Ultra / bikepacking": "terrain", Race: "flag", "Hill climb": "climb" };
const mark = (id, cls = "mk") => `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="/rides/marks.svg#m-${id}"/></svg>`;
function dateCell(e) {
  const st = e.date_status === "confirmed" ? `<span class="st ok" title="Date published by the organizer">✓</span>` : e.date_status === "projected" ? `<span class="st" title="Projected from the 2026 edition">~</span>` : "";
  if (!e.start) return `<span class="d d--tba"><b class="dd">TBA</b><span class="dm">date to<br>come</span></span>`;
  const a = day(e.start), b = day(e.end || e.start);
  let small;
  if (e.start === (e.end || e.start)) small = `${a.dow}<br>${MONTHS[a.m - 1]}`;
  else if (a.m === b.m) small = `${MONTHS[a.m - 1]}<br>${a.d}–${b.d}`;
  else small = `${MONTHS[a.m - 1]} ${a.d}–<br>${MONTHS[b.m - 1]} ${b.d}`;
  return `<span class="d"><b class="dd num">${a.d}</b><span class="dm">${small}${st ? " " + st : ""}</span></span>`;
}
function place(e) {
  if (e.start_city && e.end_city && e.start_city !== e.end_city && e.days > 1) {
    const a = e.start_city.split("(")[0].trim(), b = e.end_city.split("(")[0].trim();
    if (a && b && a !== b) return `${a} → ${b}`;
  }
  const c = (e.city || "").replace(/\s*\(.*?\)\s*/g, " ").trim();
  return c ? `${c}${e.state && !c.includes(e.state) ? ", " + e.state : ""}` : (e.state || e.region);
}
function shortDist(s) { s = String(s || ""); return s.length > 60 ? s.slice(0, 58).replace(/[,;|(]?\s*\S*$/, "") + "…" : s; }
const host = (u) => { try { return new globalThis.URL(u).hostname.replace(/^www\./, ""); } catch { return u; } }; // `URL` below is the page path

// ——— Pass 22 (Oct 2, 2026): the research notes stay in the JSON, off the page ——————————
// The refresh writes its working notes into the data ("NOT VERIFIED THIS SESSION: web-search budget
// was exhausted …", "not listed on page read", "Strambecco lists …"). Riders read them as the site
// talking to itself. Every text field goes through publicText() before it reaches a page or the feed:
// a sentence, clause or bracket that is about the research is dropped; the facts around it stay.
// CORE is the process talk (also used on the retired list); EXTRA adds the listing sites and the
// "included because" asides, which only matter to whoever compiled the list.
const CORE = /\bthis session\b|\bbudget\b|provenance|\bfetch|\bunverified\b|\bverif|\bunvetted\b|\bpages? read\b|\b(?:calendars?|sources|listings?) read\b|\bnot read\b|\bwas(?:n['’]t| not)? read\b|\breadable\b|reachable|\bnot reached\b|\bthis research\b|\bcould not be researched\b|\bnot listed on (?:the )?page\b|\bcould(?: not|n[’']t) be opened\b|\bretrievable\b|\bcould not be retrieved\b|\bagents?\b|\btask\b|\bassignment\b|\bthe brief\b|\bfor completeness\b|\bbefore publishing\b|\bre-?check|\bfollow-?up\b|\bprior knowledge\b|\bnoted per\b|\bcited by\b|calendar-level|\bartifact\b|\bscheduled task\b|\bnot opened\b/i;
const EXTRA = /\baggregator|\bper listing\b|\bcalendar listing\b|\bincluded (?:only )?(?:because|as)\b|\blisted because\b|\bincluded from\b|\bborderline\b|\boverlaps with the\b|\bdiscovered via\b|\bwhile checking\b|\btreat(?:ed)? (?:as|it|the|date)\b|\b404|\bfound\b|\bconfirm (?:with|on|the|availability|details|route|beneficiary|status|start)\b|\bso confirm\b|strambecco|granfondoguide|gran fondo guide|gravel god|findarace|gravel calendar|cycling west|wheelbrothers|socalcycling|shryock|cycling new england|triple crown \d{4} calendar|\bidealist\b|biking bis|\bwuca\b|\bGFG\b|\bnote:/i;
const ABBR = /(?:\b(?:Mt|St|Ft|Dr|Ave|Rd|Blvd|Hwy|No|Jr|Sr|vs|approx|etc|Inc|Co|Corp|Mr|Mrs|Ms|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec|Sat|Sun|Mon|Tue|Wed|Thu|Fri|[A-Z])|e\.g|i\.e|U\.S)\.$/;
function splitTop(s, re) { // split on `re` (one char class) outside brackets, keeping the pieces
  const out = []; let depth = 0, cur = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(") depth++; else if (ch === ")") depth = Math.max(0, depth - 1);
    if (!depth && re.test(ch) && /\s/.test(s[i + 1] || " ")) { out.push(cur); cur = ""; i++; while (/\s/.test(s[i + 1] || "")) i++; continue; }
    cur += ch;
  }
  out.push(cur); return out;
}
// A bracket splits on ";" (and on "," only when every piece is a word or three: "historical, per
// listing"); flagged pieces go, and a bracket left with no words goes too.
function bracketParts(inner) {
  const semi = splitTop(inner, /;/);
  return semi.flatMap((p) => { const c = splitTop(p, /,/); return c.length > 1 && c.every((x) => x.trim().split(/\s+/).length <= 3) ? c : [p]; });
}
function cleanBrackets(s, flag) { // inner-first
  let prev;
  do {
    prev = s;
    s = s.replace(/\s*\(([^()]*)\)/g, (m, inner) => {
      const parts = bracketParts(inner), kept = parts.filter((p) => p.trim() && !flag.test(p));
      if (kept.length === parts.length) return m.replace("(", "⦃").replace(/\)$/, "⦄");
      const words = kept.filter((p) => /[a-z]{3}/i.test(p));
      return words.length ? ` ⦃${words.map((p) => p.trim()).join(", ")}⦄` : "";
    });
  } while (s !== prev);
  return s.replace(/⦃/g, "(").replace(/⦄/g, ")");
}
const up1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const lc1 = (s) => /^[A-Z][a-z]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
function publicText(v, flag = (s) => CORE.test(s) || EXTRA.test(s)) {
  if (typeof v !== "string" || !v.trim()) return v;
  const re = { test: flag };
  const sentences = [];
  // "per Cycling West Utah calendar", "per aggregator": the source name goes, the fact stays
  v = v.replace(/\s*,?\s*\bper ([^,;.()]{2,60}?)(?=\s*[,;.()]|$)/g, (m) => flag(m) ? "" : m);
  // " | " joins notes from different passes: it ends a sentence (unless it sits inside a quote)
  const joined = v.replace(/\s+\|\s+/g, (m, off) => {
    const before = v.slice(0, off);
    if ((before.match(/(^|\s)'/g) || []).length > (before.match(/'(\s|$|[,.;)])/g) || []).length) return m;
    return /[.!?]$/.test(before) ? " " : ". ";
  });
  for (const seg of [joined]) {
    // sentences, glued back where the period was an abbreviation (Mt. Hood, S. Palm Canyon Dr.)
    let glue = false;
    for (const part of seg.split(/(?<=[.!?])\s+(?=["'‘“(]?[A-Z0-9$~])/)) {
      if (glue) sentences[sentences.length - 1] += " " + part; else sentences.push(part);
      glue = ABBR.test(part.trim());
    }
  }
  const kept = [];
  for (const sen of sentences) {
    const end = /[.!?]["'’”)]?$/.test(sen.trim());
    let first = true, droppedFirst = false;
    const clauses = [];
    for (let c of splitTop(sen.trim(), /;/).map((x) => x.trim()).filter(Boolean)) {
      const lead = c.replace(/\([^()]*\)/g, "");
      if (re.test(lead)) {
        // research talk goes; "Not listed on page read (organizer requires per-mile fundraising)"
        // keeps the plain fact in its bracket
        const br = /^\s*not (?:listed|verified|published|stated)\b/i.test(lead)
          ? [...c.matchAll(/\(([^()]*)\)/g)].map((x) => x[1]).filter((x) => !re.test(x) && /[a-z]{3}/i.test(x)) : [];
        if (first) droppedFirst = true;
        first = false;
        if (!br.length) continue;
        c = br.join("; ");
      }
      first = false;
      c = cleanBrackets(c, re).replace(/[\s;,:–—-]+$/, "").replace(/\.$/, "").trim();
      if (c && !/^[-–—:;,.()\s]*$/.test(c)) clauses.push(c);
    }
    if (!clauses.length) continue;
    let s = clauses.join("; ") + (end ? "." : "");
    if (droppedFirst && !/^\S+\.(?:com|org|net)\b/.test(s)) s = up1(s);
    kept.push(s);
  }
  return kept.join(" ").replace(/\s+/g, " ").replace(/\s+([,.;)])/g, "$1").replace(/\(\s+/g, "(").replace(/\bpage reads\b/g, "page says").replace(/([.!?]["'’”)])\./g, "$1").trim();
}
const RETIRED_FLAG = (s) => CORE.test(s);
// the words a public page must never carry (the build fails on them)
const LEAK = /budget|this session|provenance|fetch tool|artifact|scheduled task|unverified|page read/i;
// the raw notes say the details were never checked against the organizer — one plain line says so instead
const UNCHECKED = /not verified this session|details unverified|\bunverified\b|could not be verified|not verified in this session|calendar-level verification|organizer site not (?:read|reached)|\bnot read\b|\bwas not read\b|official site could not be fetched/i;

// How far? — read from `distances` (miles, or km converted). A list or range counts each number;
// elevation (ft), runs (K) and anything without a unit are ignored. Nothing to read = no pick.
function milesIn(s, words = "") {
  const out = [];
  String(s || "").replace(/(~?\d[\d,]*(?:\.\d+)?)((?:\s*(?:,|\/|\bor\b|\band\b|\bto\b|–|-)\s*~?\d[\d,]*(?:\.\d+)?)*)\+?\s*-?\s*(miles?|mi|km)\b/gi, (m, a, rest, unit) => {
    const nums = [a, ...String(rest || "").split(/\s*(?:,(?=\s)|\/|\bor\b|\band\b|\bto\b|–|-)\s*/).slice(1)].map((x) => parseFloat(String(x).replace(/[~,]/g, ""))).filter((x) => x > 0 && x < 5000);
    for (const n of nums) out.push(/km/i.test(unit) ? n * 0.621 : n);
    return m;
  });
  // a century is 100 miles and a double century 200, when the event calls itself one
  const w = `${s || ""} ${words}`;
  if (/\bdouble[- ]century\b/i.test(w)) out.push(200);
  if (/(?<!half[- ]|metric |double[- ])\bcentury\b/i.test(w)) out.push(100);
  return out;
}
// What kind of days? Only what the data says: a stage race, a multi-day tour, a festival or weekend
// that races one day, a 24-hour event. Anything else with more than one day keeps "N days".
const NUMWORD = "(?:\\d+|one|two|three|four|five|six|seven|eight|nine|ten)";
function dayKind(e) {
  const days = Number(e.days) || 1;
  const sub = `${e.subtype || ""} ${e.name || ""}`;
  // a stage race is one where the data says so and it runs more than a day; a festival or
  // weekend "with a stage race" is still a festival (it races one main day)
  if (days > 1 && /\bstage race\b|\b(?:\d|three|four|five|six)[- ]stage\b/i.test(sub) && !/former|festival|weekend/i.test(e.subtype || "")) return { kind: "stage", label: `stage race &middot; ${days} days`, multi: true };
  const hrs = [...sub.matchAll(/\b((?:\d+[\/-])*\d+)[- ]?h(?:ou)?rs?\b/gi)].flatMap((x) => x[1].split(/[\/-]/).map(Number)).filter((h) => [6, 12, 24, 48].includes(h));
  if (days <= 3 && hrs.length) return { kind: "timed", label: `${Math.max(...hrs)}-hour`, multi: false };
  if (days <= 1) return { kind: "day", label: "", multi: false };
  if (/criterium series|\bpro series\b/i.test(e.subtype || "")) return { kind: "series", label: `series &middot; ${days} days`, multi: false };
  const tourish = new RegExp(`multi-day|multi-week|\\b${NUMWORD}[- ]day\\b(?![\\w\\s-]{0,10}festival)|over ${NUMWORD} days|\\/day\\b|per day|\\bday [12]\\b|\\bdaily\\b|riding days${days >= 3 ? "|\\btour\\b(?![\\w\\s-]{0,10}weekend)" : ""}`, "i");
  if (e.category === "Multi-day tour" || tourish.test(`${e.subtype || ""} ${e.distances || ""}`)) return { kind: "tour", label: `${days} days`, multi: true };
  if (/festival|\bfest\b|expo/i.test(e.subtype || "")) return { kind: "festival", label: `festival &middot; ${days} days`, multi: false };
  if (/weekend/i.test(e.subtype || "")) return { kind: "weekend", label: "weekend", multi: false };
  if (e.category === "Ultra / bikepacking") return { kind: "ultra", label: `${days} days`, multi: true };
  return { kind: "days", label: `${days} days`, multi: false };
}
const FAR = [
  { id: "short", name: "Under 60 mi", test: (mi) => mi.some((m) => m < 60) },
  { id: "100", name: "About 100", test: (mi) => mi.some((m) => m >= 85 && m <= 130) },
  { id: "200", name: "200+", test: (mi) => mi.some((m) => m >= 195) },
  { id: "multi", name: "Multi-day or stage" },
];
function farOf(e) {
  const k = dayKind(e), out = [];
  // a tour's or stage race's miles are totals or per-day mixes — it only answers "Multi-day",
  // unless it's a double or has a one-day option (STP); a timed event's miles are a lap
  const oneDay = /double|one[- ]day (?:option|entr)|in one day|single-day/i.test(`${e.subtype || ""} ${e.distances || ""}`);
  const mi = k.kind === "timed" || ((k.kind === "tour" || k.kind === "stage") && !oneDay) ? [] : milesIn(e.distances, `${e.subtype || ""} ${e.name || ""}`);
  for (const f of FAR) if (f.test ? f.test(mi) : k.multi) out.push(f.id);
  return out;
}
// the minimum on one line, for a charity row: "raise $2,500 (2026)"
function minLine(s) {
  s = String(s || "").trim();
  if (!/\$\d/.test(s)) return "";
  // the rider's own minimum: not the fee, the crew, the virtual tier or the kids' rate
  const clauses = splitTop(s, /;/).filter((c) => /\$\d/.test(c) && !/registration|\bfee|\bcrew\b|virtual|remote|children|youth/i.test(c.replace(/\([^()]*\)/g, "")));
  const clause = clauses.join("; ") || splitTop(s, /;/).find((c) => /\$\d/.test(c)) || "";
  const flat = clause.replace(/\([^()]*\)/g, " ");
  const money = (x) => parseFloat(x.replace(/[$,~+]/g, ""));
  let amts = [...flat.matchAll(/~?\$\d[\d,]*\+?/g)].map((x) => x[0]);
  if (!amts.length) amts = [...clause.matchAll(/~?\$\d[\d,]*\+?/g)].map((x) => x[0]);
  const total = flat.match(/(~?\$\d[\d,]*)\s+total\b/i);
  let txt;
  if (total) txt = total[1];
  else if (amts.length === 1) txt = amts[0];
  else { const v = amts.map(money), lo = amts[v.indexOf(Math.min(...v))], hi = amts[v.indexOf(Math.max(...v))]; txt = lo === hi ? lo : `${lo}–${hi}`; }
  const when = /histor/i.test(s) ? " (past years)" : /\b2026\b/.test(s) && !/\b2027\b/.test(clause) ? " (2026)" : "";
  return `raise ${txt}${when}`;
}
// the 2026 date a projected 2027 date was placed from, when the note gives one that fits (same
// weekend, give or take a week)
const MON = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
function priorDate(e) {
  if (!e.start || !e.date_note) return "";
  const want = new Date(e.start + "T12:00:00Z").getTime() - 364 * 864e5;
  const re = /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sept?(?:ember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.?\s+(\d{1,2})(?:\s*[-–]\s*(\d{1,2}))?(?:st|nd|rd|th)?(,?\s*(\d{4}))?/g;
  let m;
  while ((m = re.exec(e.date_note))) {
    // the year is the one written with the date, or else the last one named just before it in the clause
    const before = e.date_note.slice(Math.max(0, m.index - 48), m.index).split(/[.;]\s/).pop();
    const yrs = before.match(/\b20\d\d\b/g);
    const yr = m[5] ? +m[5] : yrs ? +yrs[yrs.length - 1] : 0;
    if (yr !== 2026) continue;
    const mo = MON[m[1].slice(0, 3).toLowerCase()], d = +m[2];
    const t = Date.UTC(2026, mo, d, 12);
    if (Math.abs(t - want) > 7 * 864e5) continue;
    return `${MONTHS[mo]} ${d}${m[3] ? "–" + m[3] : ""}`;
  }
  return "";
}
const fmtShort = (iso, yr = true) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", weekday: "short", month: "short", day: "numeric", ...(yr ? { year: "numeric" } : {}) });
const slugOf = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ——— load + validate ————————————————————————————————————————————————————
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
const events = data.events || [];
const retired = data.retired || [];
for (const e of events) {
  for (const k of ["id", "slug", "name", "category", "date_status"]) if (e[k] == null || e[k] === "") throw new Error(`Event ${e.slug || e.name || "?"} missing ${k}`);
  if (e.start && !/^\d{4}-\d{2}-\d{2}$/.test(e.start)) throw new Error(`Event ${e.slug}: bad start ${e.start}`);
  if (!e.start && e.date_status !== "tba") throw new Error(`Event ${e.slug}: no start date but status ${e.date_status}`);
  if (!CATS.includes(e.category)) throw new Error(`Event ${e.slug}: unknown category ${e.category}`);
  e.month = e.start ? day(e.start).m : 0;
}
lintDeep("calendar-2027", data);
// Pass 22: what a rider reads is the public text. The raw notes stay in data/calendar-2027.json.
const TEXT = ["subtype", "date_note", "city", "start_city", "end_city", "distances", "elevation", "beneficiary", "fundraising_min", "organizer", "reg_status", "lottery", "series", "cost", "qualification", "notes"];
for (const e of events) {
  e.prior = e.date_status === "projected" ? priorDate(e) : "";          // read from the raw note
  e.unchecked = UNCHECKED.test(e.notes || "") || UNCHECKED.test(e.date_note || "");
  for (const k of TEXT) if (typeof e[k] === "string") e[k] = publicText(e[k]);
}
for (const r of retired) r.reason = publicText(r.reason || "", RETIRED_FLAG);
// the source line without the refresh's plumbing (the task, the artifact link)
const sourceLine = publicText(String(data.source || ""), RETIRED_FLAG);
const slugs = new Set();
for (const e of events) { if (slugs.has(e.slug)) throw new Error(`Duplicate slug ${e.slug}`); slugs.add(e.slug); }
events.sort((a, b) => (a.start || "9999").localeCompare(b.start || "9999") || a.name.localeCompare(b.name));

const count = (fn) => { const m = new Map(); for (const e of events) { const k = fn(e); if (k === "" || k == null) continue; m.set(k, (m.get(k) || 0) + 1); } return m; };
const byMonth = count((e) => e.month), byCat = count((e) => e.category), byRegion = count((e) => e.region), byCause = count((e) => e.cause), byStatus = count((e) => e.date_status);
const nConf = byStatus.get("confirmed") || 0, nProj = byStatus.get("projected") || 0, nTba = byStatus.get("tba") || 0;
const riding = events.filter((e) => e.riding);
const updatedLong = new Date(data.updated + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", month: "long", day: "numeric", year: "numeric" });

// ——— chrome (mirrors build-events.js) —————————————————————————————————————

const title = "2027 cycling events calendar: US bike rides and races";
const description = `${events.length} US bike rides and races in 2027: charity rides, fondos, gravel, tours and races. ${nConf} with the organizer's date. Updated ${updatedLong}.`;
// Search pass (Oct 5, 2026): a description names as many events as fit in 158 characters, whole names only
const fitNames = (head, names, tail = " and more.") => { for (let k = Math.min(3, names.length); k > 0; k--) { const s = `${head}${names.slice(0, k).join(", ")}${tail}`; if (s.length <= 158) return s; } return head.replace(/[:,]\s*$/, ".") };

const ld = [
  { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: SITE + URL, dateModified: data.updated,
    isPartOf: { "@type": "WebSite", name: "Cycle for Change", url: SITE + "/" },
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".lede"] } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
    { "@type": "ListItem", position: 2, name: "Events", item: SITE + "/events/" },
    { "@type": "ListItem", position: 3, name: "2027 calendar", item: SITE + URL } ] },
  { "@context": "https://schema.org", "@type": "ItemList", name: "2027 US bike rides and races with confirmed dates", url: SITE + URL, numberOfItems: nConf,
    itemListElement: events.filter((e) => e.date_status === "confirmed").map((e, i) => ({ "@type": "ListItem", position: i + 1, name: e.name, url: SITE + URL + "#" + e.slug })) },
];

function head(pg = { title, description, url: URL, ld }) {
  return `<!DOCTYPE html>
<!-- Generated by scripts/build-calendar.js from data/calendar-2027.json. Edit the JSON, not this file. -->
<html lang="en">
<head>
${CHROME.head({ title: pg.title, description: pg.description, url: pg.url, styles: ["/events/events.css", "/events/2027/calendar.css"], ld: pg.ld })}
</head>
<body>
${CHROME.HEADER}
<main id="main" class="wrap">
`;
}
function foot({ filters = true, extra = "" } = {}) {
  return `
${CHROME.PLEDGE}
</main>
${CHROME.FOOTER}
<script src="/events/events.js" defer></script>
${filters ? `<script src="/events/2027/calendar.js" defer></script>\n` : ""}${BLOCKS.REPORT_JS}${extra}
</body>
</html>
`;
}

// ——— page pieces ————————————————————————————————————————————————————————
// Pass 22: the fold's date says what kind of date it is, in words
function datesText(e) {
  if (!e.start) return "Not announced yet";
  const end = e.end || e.start;
  let s = e.start === end ? fmtShort(e.start) : `${fmtShort(e.start, false)} – ${fmtShort(end)}`;
  if (e.date_status === "projected") s += ` · projected${e.prior ? ` (2026 was ${e.prior})` : ""}`;
  return s;
}
// When the research couldn't check a row, the page says so once, plainly.
function dateNote(e) {
  if (e.date_note) return e.date_note;
  if (e.date_status === "projected") return "Date not confirmed yet. Check the organizer’s site.";
  if (e.date_status === "tba") return "No 2027 date yet. Check the organizer’s site.";
  if (e.unchecked) return "Not checked with the organizer yet. Look at their site before you plan around it.";
  return "";
}
function facts(e) {
  const rows = [];
  const add = (k, v) => { if (v && String(v).trim()) rows.push(`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`); };
  add("Dates", datesText(e));
  add("Where", [e.city, e.state].filter(Boolean).join(", "));
  if (e.start_city && e.end_city && e.start_city !== e.end_city) add("Route", `${e.start_city} → ${e.end_city}`);
  add("Distances", e.distances); add("Elevation", e.elevation); add("Format", e.subtype);
  add("Cause", e.cause && e.beneficiary ? `${e.cause} — ${e.beneficiary}` : (e.beneficiary || e.cause));
  // on a charity ride a blank here would read as "no minimum"; say it isn't out yet
  add("Min. fundraising", e.fundraising_min || (e.category === "Charity ride" ? "Not published yet" : ""));
  add("Cost", e.cost); add("Organizer", e.organizer); add("Series", e.series);
  add("Registration", e.reg_status); add("Lottery", e.lottery); add("Qualification", e.qualification);
  return rows.join("");
}
// The town guide for where the ride starts: its city, its start city, the first town of a
// point-to-point ("New York City to Niagara Falls"), and the name without " City" (New York City →
// the New York guide). towns.js matches names exactly, so the variants are tried here.
function townFor(e) {
  const clean = (s) => String(s || "").replace(/\s*\(.*?\)\s*/g, " ").replace(/\s+/g, " ").trim();
  const cands = [];
  for (const s of [e.city, e.start_city]) {
    const c = clean(s);
    if (!c) continue;
    cands.push(c);
    const first = c.split(/\s+(?:to|→)\s+|\s*\/\s*|\s+[-–]\s+/)[0].trim();
    if (first && first !== c) cands.push(first);
  }
  for (const c of [...cands]) { const m = c.match(/^(.*\S)\s+City$/i); if (m) cands.push(m[1]); }
  for (const c of cands) { const t = TOWNS.find({ city: c, state: e.state }); if (t) return t; }
  return null;
}
function eventHtml(e) {
  const meta = [`<b>${esc(place(e))}</b>`, esc(e.category.toLowerCase())];
  if (e.cause) meta.push(esc(e.cause));
  const kind = dayKind(e);
  if (kind.label) meta.push(kind.label);
  // "not listed" / "Not published yet" says nothing in a row without its label; the fold keeps it
  if (e.distances && !/^not (?:listed|published|stated)\b/i.test(e.distances)) meta.push(esc(shortDist(e.distances)));
  if (e.category === "Charity ride") { const ml = minLine(e.fundraising_min); if (ml) meta.push(esc(ml)); }
  const q = [e.name, e.city, e.state, e.region, e.category, e.cause, e.beneficiary, e.organizer, e.series].join(" ").toLowerCase().replace(/\s+/g, " ").trim();
  const src = (e.sources || []).slice(0, 2).map((u) => `<a href="${attr(u)}" rel="noopener nofollow" target="_blank">${esc(host(u))}</a>`).join(" ");
  const town = townFor(e);
  if (town) meta.push(TOWNS.link(town));
  const dn = dateNote(e);
  return `<details class="ev${e.riding ? " you" : ""}" id="${attr(e.slug)}" data-m="${e.month}" data-t="${attr(e.category)}" data-r="${attr(e.region)}" data-c="${attr(e.cause)}" data-f="${farOf(e).join(" ")}" data-s="${attr(e.date_status)}" data-y="${e.riding ? 1 : 0}" data-q="${attr(q)}">
  <summary class="row">${mark(CAT_MARK[e.category] || "flag", "mk mk--row")}${dateCell(e)}<span class="nm"><span class="h">${esc(e.name)}${e.riding ? `<span class="you-tag">Robert&rsquo;s ride</span>` : ""}</span><span class="meta">${meta.join(" &middot; ")}</span></span><span class="acts">Details</span></summary>
  <div class="det">
    <dl class="facts">${facts(e)}</dl>
    ${dn ? `<p class="note"><b>Date</b>${esc(dn)}</p>` : ""}
    ${e.notes ? `<p class="note"><b>Notes</b>${esc(e.notes)}</p>` : ""}
    ${e.unchecked && e.date_note ? `<p class="note"><b>Check</b>${e.date_status === "confirmed" ? "The date is the organizer&rsquo;s. The rest isn&rsquo;t checked with them yet." : "Not checked with the organizer yet."} Look at their site before you plan around it.</p>` : ""}
    <p class="det-links">${e.url ? `<a class="btn btn--ghost" href="${attr(e.url)}" rel="noopener" target="_blank">Event site</a>` : ""}${src ? `<span class="src">Sources: ${src}</span>` : ""}</p>
    ${town ? TOWNS.strip(town, { compact: true, heading: `Once you&rsquo;re in ${esc(town.name)}` }) : ""}
  </div>
</details>`;
}

// ——— Pass 19 (Oct 2, 2026): step down, like /rides/ ———————————————————————————
// Robert, on his phone at /events/2027/: "Should we clean this up too?" The first screen was all
// words (a two-line stats strip, the h1, a paragraph explaining ✓ and ~) and the filters ran off
// the side. So the calendar asks one question with a few big picks, the way /rides/ does since
// Pass 15: When? (a tile per month) or What? (a door per type, and the six he's riding). Each pick
// is a short page with just its rows; the full list with every filter is /events/2027/all/.
const MONTH_SLUG = MONTHS_LONG.map((m) => m.toLowerCase());
const monthPath = (m) => `${URL}${m ? MONTH_SLUG[m - 1] : "date-tba"}/`;
const CAT_SLUG = { "Charity ride": "charity-rides", Road: "road", Gravel: "gravel", MTB: "mountain-bike", "Multi-day tour": "multi-day-tours", "Ultra / bikepacking": "ultra-and-bikepacking", Race: "races", "Hill climb": "hill-climbs" };
const CAT_DOOR = { "Charity ride": "Charity rides", Road: "Road", Gravel: "Gravel", MTB: "Mountain bike", "Multi-day tour": "Multi-day tours", "Ultra / bikepacking": "Ultra & bikepacking", Race: "Races", "Hill climb": "Hill climbs" };
const CAT_H1 = { "Charity ride": "charity bike rides", Road: "road rides and fondos", Gravel: "gravel rides and races", MTB: "mountain bike rides and races", "Multi-day tour": "multi-day bike tours", "Ultra / bikepacking": "ultra and bikepacking races", Race: "bike races", "Hill climb": "hill climbs" };
const shortUpdated = new Date(data.updated + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", month: "short", day: "numeric" });
const crumbs = (...more) => `<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/events/">Events</a></li>${more.length ? `<li><a href="${URL}">2027 calendar</a></li>${more.map((m, i) => i === more.length - 1 ? `<li><span aria-current="page">${m}</span></li>` : `<li>${m}</li>`).join("")}` : `<li><span aria-current="page">2027 calendar</span></li>`}</ol></nav>`;
const crumbLd = (name, url) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
  { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" }, { "@type": "ListItem", position: 2, name: "Events", item: SITE + "/events/" },
  { "@type": "ListItem", position: 3, name: "2027 calendar", item: SITE + URL }, ...(name ? [{ "@type": "ListItem", position: 4, name, item: SITE + url }] : []) ] });
const listLd = (name, url, list) => ({ "@context": "https://schema.org", "@type": "ItemList", name, url: SITE + url, numberOfItems: list.length,
  itemListElement: list.map((e, i) => ({ "@type": "ListItem", position: i + 1, name: e.name, url: SITE + monthPath(e.month) + "#" + e.slug })) });
const nConfOf = (list) => list.filter((e) => e.date_status === "confirmed").length;
const sub = (list, extra = "") => `<p class="cal-sub"><b>${list.length}</b> ${list.length === 1 ? "ride or race" : "rides and races"} &middot; <b>${nConfOf(list)}</b> with the organizer&rsquo;s date${extra}</p>`;
const KEY = `<p class="cal-key"><span class="key-conf">organizer&rsquo;s date</span><span class="key-proj">projected from 2026, check first</span></p>`;
// a short page opens the row its link points at (/events/2027/may/#unbound-gravel)
const OPEN_JS = `
<script>(function(){var h=decodeURIComponent(location.hash.slice(1));if(!h)return;var e=document.getElementById(h);if(!e||e.tagName!=="DETAILS")return;e.open=true;addEventListener("load",function(){requestAnimationFrame(function(){e.scrollIntoView({block:"start"});});});})();</script>`;
// old links (/events/2027/#slug, from before the step-down) go to the row on its month's page
const FIND_JS = `
<script>(function(){function go(){var h=decodeURIComponent(location.hash.slice(1));if(!h||document.getElementById(h))return;fetch("${URL}where.json").then(function(r){return r.json();}).then(function(w){location.replace((w[h]||"${URL}all/")+"#"+encodeURIComponent(h));}).catch(function(){location.replace("${URL}all/#"+encodeURIComponent(h));});}go();addEventListener("hashchange",go);})();</script>`;
const pages = [];   // [url, html] — every page this build writes, for the sitemap
// Pass 22: a short page stays a short list; one line under the key opens the filter page with this
// page's pick already on (Pat: Northeast + cancer + summer charity rides took 10 taps).
const ALL_URL = URL + "all/";
const allLink = (params) => ALL_URL + (Object.keys(params).length ? "?" + Object.entries(params).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&amp;") : "");
const narrowLine = (params, words) => `\n    <p class="cal-narrow"><a href="${allLink(params)}">${words} &rarr;</a></p>`;
// a row of picks that are links into /all/ (How far? on the big-day pages, Where? on races)
function pickRow(label, picks, cls = "") {
  const on = picks.filter((p) => p.n);
  if (on.length < 2) return "";
  return `
    <nav class="cal-picks${cls}" aria-label="${attr(label)}"><span class="cal-picks-h">${esc(label)}</span>${on.map((p) => `<a class="cal-pick" href="${p.href}"><span>${esc(p.name)}</span><b>${p.n}</b></a>`).join("")}</nav>`;
}
function farPicks(type, list) {
  return pickRow("How far?", FAR.map((f) => ({ name: f.name, n: list.filter((e) => farOf(e).includes(f.id)).length, href: allLink({ type, far: f.id }) })));
}
function shortPage({ url, crumb, h1, title, description, list, byMonth: grouped = false, nav = "", lead = "", narrow = "", picks = "", after = "" }) {
  let rows;
  if (grouped) {
    const ms = [...new Set(list.map((e) => e.month))].sort((a, b) => (a || 13) - (b || 13));
    rows = `${ms.length > 2 ? `<nav class="cal-jump" aria-label="Jump to a month">${ms.map((m) => `<a href="#m${m}">${m ? MONTHS[m - 1] : "TBA"}</a>`).join("")}</nav>` : ""}
${ms.map((m) => { const l = list.filter((e) => e.month === m); return `      <section class="month" id="m${m}">
        <div class="month-h"><h2>${m ? MONTHS_LONG[m - 1] : "Date to be announced"}</h2><span class="n">${l.length}</span></div>
${l.map(eventHtml).join("\n")}
      </section>`; }).join("\n")}`;
  } else rows = `      <section class="month">
${list.map(eventHtml).join("\n")}
      </section>`;
  const html = head({ title, description, url, ld: [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: SITE + url, dateModified: data.updated, isPartOf: { "@type": "WebSite", name: "Cycle for Change", url: SITE + "/" } },
    crumbLd(crumb, url), listLd(title, url, list) ] }) + `
  <article class="calendar cal-short">
    ${crumbs(crumb)}
    <h1>${h1}</h1>
    ${sub(list)}
    ${KEY}${lead}${picks}${narrow}${nav}
    <div id="results">
${rows}
    </div>${nav}${after}
    <p class="cal-back"><a href="${URL}">&larr; The 2027 calendar</a><a href="${URL}all/">All ${events.length}, with filters</a></p>
  </article>
` + foot({ filters: false, extra: OPEN_JS });
  pages.push([url, html]);
}

// one page per month (and the dates nobody has announced)
for (let m = 0; m <= 12; m++) {
  const list = events.filter((e) => e.month === m);
  if (!list.length) continue;
  const prev = [...Array(m).keys()].reverse().find((k) => k >= 1 && byMonth.get(k)), next = [...Array(12).keys()].map((k) => k + 1).find((k) => k > m && byMonth.get(k));
  const nav = m ? `
    <nav class="mo-nav" aria-label="Other months">${prev ? `<a href="${monthPath(prev)}">&larr; ${MONTHS_LONG[prev - 1]}</a>` : "<span></span>"}${next ? `<a href="${monthPath(next)}">${MONTHS_LONG[next - 1]} &rarr;</a>` : "<span></span>"}</nav>` : "";
  const name = m ? `${MONTHS_LONG[m - 1]} 2027` : "Date to be announced";
  shortPage({ url: monthPath(m), crumb: m ? MONTHS_LONG[m - 1] : "Date TBA", list, nav,
    narrow: narrowLine({ month: m || "tba" }, "Narrow by type, region, cause, distance"),
    h1: m ? `${MONTHS_LONG[m - 1]} 2027 bike rides &amp; races` : "2027 rides with no date yet",
    title: m ? `${MONTHS_LONG[m - 1]} 2027 bike rides and races in the US` : "2027 bike rides with no date announced yet",
    description: m ? fitNames(`${list.length} US bike rides and races in ${name}, ${nConfOf(list)} with the organizer's date: `, list.map((e) => e.name))
      : fitNames(`${list.length} US bike rides and races that run every year but haven't put out a 2027 date yet: `, list.map((e) => e.name)),
    lead: m ? "" : `<p class="cal-lead">These run every year but haven&rsquo;t put out a 2026 or 2027 date we could confirm.</p>` });
}
// Pass 22 (Oct 3, 2026): the homepage's "Find a race" lands on Races, which is road, crit and stage
// only — so it points across to the other kinds of racing in one line. "Find a fundraiser" lands on
// Charity rides, which points back at the pledge.
const otherRaces = ["Gravel", "MTB", "Hill climb", "Ultra / bikepacking"].filter((c) => byCat.get(c));
const CAT_LEAD = {
  Race: otherRaces.length ? `<p class="cal-lead">Racing off the road? ${otherRaces.map((c) => `<a href="${URL}${CAT_SLUG[c]}/">${esc(CAT_DOOR[c])}</a>`).join(" &middot; ")}</p>` : "",
  "Charity ride": `<p class="cal-lead">Ride one for a cause. The money goes through the ride&rsquo;s own sign-up.</p>`,
};
// one page per type, by month
for (const c of CATS) {
  const list = events.filter((e) => e.category === c);
  if (!list.length) continue;
  const type = CAT_SLUG[c];
  let lead = CAT_LEAD[c] || "", picks = "";
  if (c === "Race") {
    // the national races are here; the local ones are on the state calendars (rider 06, in Texas)
    lead += `\n    <p class="cal-lead">These are the big national races. Local and amateur road races live on each state&rsquo;s racing calendar. <a href="https://usacycling.org/events" rel="noopener" target="_blank">Find them on USA Cycling&rsquo;s event search &#8599;</a></p>`;
    picks = pickRow("Where?", REGIONS.map((r) => ({ name: r, n: list.filter((e) => e.region === r).length, href: allLink({ type, region: slugOf(r) }) })), " cal-picks--chips");
  } else if (c !== "Hill climb") picks = farPicks(type, list);
  shortPage({ url: `${URL}${CAT_SLUG[c]}/`, crumb: CAT_DOOR[c], list, byMonth: true, lead, picks,
    narrow: narrowLine({ type }, "Narrow by month, region, cause, distance"),
    h1: `2027 ${CAT_H1[c]} in the US`, title: `2027 ${CAT_H1[c]} in the US`,
    description: fitNames(`${list.length} ${CAT_H1[c]} in the US in 2027, ${nConfOf(list)} with the organizer's date, by month: `, list.map((e) => e.name)) });
}
// the six Robert is riding
if (riding.length) shortPage({ url: `${URL}riding/`, crumb: "Robert\u2019s rides", list: riding,
  h1: "The 2027 rides I&rsquo;m doing", title: "The 2027 rides I'm doing for Cycle for Change",
  description: `The ${riding.length} organized rides Robert is riding in 2027 as part of the 10,000 miles, with dates, distances and sign-up links.`,
  lead: `<p class="cal-lead">Part of the 10,000 miles. Come ride one.</p>`,
  after: `\n    ${PH.figure("robert-peace")}` });

// the calendar's own page: two questions, then the deep pages and the full list
{
  const mx = Math.max(...MONTHS.map((_, i) => byMonth.get(i + 1) || 0), 1);
  const tiles = MONTHS.map((m, i) => { const n = byMonth.get(i + 1) || 0; return n
    ? `<a class="mo-tile" href="${monthPath(i + 1)}" style="--h:${(n / mx).toFixed(2)}"><span class="mo-n">${m}</span><b class="mo-c">${n}</b><i class="mo-bar" aria-hidden="true"></i></a>`
    : `<span class="mo-tile" aria-disabled="true" style="--h:0"><span class="mo-n">${m}</span><b class="mo-c">0</b><i class="mo-bar" aria-hidden="true"></i></span>`; }).join("\n          ");
  const door = (href, name, n, markId, cls = "") => `<a class="cal-door${cls}" href="${href}">${mark(markId, "mk cal-door-mk")}<span class="cal-door-name">${name}</span><span class="cal-door-n">${n}</span></a>`;
  const doors = [riding.length ? door(`${URL}riding/`, "Robert&rsquo;s rides", riding.length, "ride-day", " cal-door--you") : "",
    ...CATS.filter((c) => byCat.get(c)).map((c) => door(`${URL}${CAT_SLUG[c]}/`, esc(CAT_DOOR[c]), byCat.get(c), CAT_MARK[c] || "flag"))].join("\n          ");
  let home = head({ title, description, url: URL, ld: [ld[0], ld[1], { ...ld[2], itemListElement: ld[2].itemListElement.map((x, i) => ({ ...x, url: SITE + monthPath(events.filter((e) => e.date_status === "confirmed")[i].month) + "#" + events.filter((e) => e.date_status === "confirmed")[i].slug })) }] }) + `
  <article class="calendar cal-home">
    ${crumbs()}
    <h1>2027 cycling events calendar: US bike rides &amp; races</h1>
    <p class="cal-sub lede"><b>${events.length}</b> rides and races &middot; <b>${nConf}</b> with the organizer&rsquo;s date &middot; updated ${esc(shortUpdated)}</p>

    <section class="cal-step" aria-labelledby="when-h">
      <h2 class="cal-q" id="when-h">When?</h2>
      <div class="mo-tiles">
          ${tiles}
      </div>
      ${byMonth.get(0) ? `<p class="cal-tba"><a href="${monthPath(0)}">${byMonth.get(0)} more with no date yet &rarr;</a></p>` : ""}
    </section>

    <section class="cal-step" aria-labelledby="what-h">
      <h2 class="cal-q" id="what-h">Or pick what</h2>
      <div class="cal-doors">
          ${doors}
      </div>
    </section>
    ${PH.figure("sawtooth-road", { cls: "ph--wide" })}
`;
  home += DEEP_HTML();
  home += `
    <p class="cal-all"><a class="btn btn--ghost" href="${URL}all/">All ${events.length}, with filters &rarr;</a></p>
${BLOCKS.REPORT({ thing: "event", heading: "Missing an event, or a date changed?", lede: "Tell us and we'll check it against the organizer's page. Confirmed dates only go up once the organizer publishes them." })}
  </article>
` + foot({ filters: false, extra: FIND_JS });
  pages.unshift([URL, home]);
}

// ——— the full list, with every filter: /events/2027/all/ ———————————————————————
const ALL = URL + "all/";
let body = head({ title: `All ${events.length} 2027 bike rides and races, with filters`, description: `Every one of the ${events.length} US bike rides and races on the 2027 calendar on one page. Filter by month, type, region, cause and distance.`, url: ALL, ld: [{ ...ld[0], url: SITE + ALL }, crumbLd("All", ALL)] });
body += `
  <article class="calendar">
    ${crumbs("All")}
    <p class="eyebrow" id="eyebrow">${events.length} events &middot; <b>${nConf} confirmed</b> &middot; ${nProj} projected &middot; ${nTba} tba &middot; updated ${esc(updatedLong)}</p>
    <h1>All 2027 bike rides &amp; races</h1>
    <p class="lede">Every organized ride and race in the US next year that we could pin down: ${events.length} events, ${nConf} with dates published by the organizer. <span class="k key-conf">Confirmed</span> means the organizer has published the 2027 date. <span class="k key-proj">Projected</span> means it is placed on the same weekend as the 2026 edition — check before you register.</p>

    <section class="controls" aria-label="Filters">
      <div class="search">
        <label for="q">Search</label>
        <input type="search" id="q" placeholder="Event, city, state, cause, organizer" autocomplete="off">
      </div>
      <div class="months" id="months" role="group" aria-label="Month">
${(() => { const mx = Math.max(...MONTHS.map((_, i) => byMonth.get(i + 1) || 0), 1); return MONTHS.map((m, i) => `        <button class="mo" type="button" data-m="${i + 1}" aria-pressed="false" style="--h:${((byMonth.get(i + 1) || 0) / mx).toFixed(2)}"><i class="mo-bar" aria-hidden="true"></i><span class="n">${m}</span><span class="c">${byMonth.get(i + 1) || 0}</span></button>`).join("\n"); })()}
        <button class="mo mo--tba" type="button" data-m="0" aria-pressed="false" style="--h:0"><i class="mo-bar" aria-hidden="true"></i><span class="n">TBA</span><span class="c">${byMonth.get(0) || 0}</span></button>
      </div>
      <div class="frow scroll" role="group" aria-label="Type"><span class="lab">Type</span>
${CATS.map((c) => `        <button class="tag tag--mk" type="button" data-set="t" data-v="${attr(c)}" data-k="${CAT_SLUG[c]}" aria-pressed="false">${mark(CAT_MARK[c] || "flag", "mk mk--tag")}${esc(c)}<span class="c">${byCat.get(c) || 0}</span></button>`).join("\n")}
      </div>
      <div class="frow scroll" role="group" aria-label="How far?"><span class="lab">How far?</span>
${FAR.map((f) => `        <button class="tag" type="button" data-set="f" data-v="${f.id}" data-k="${f.id}" aria-pressed="false">${esc(f.name)}<span class="c">${events.filter((e) => farOf(e).includes(f.id)).length}</span></button>`).join("\n")}
      </div>
      <div class="frow" role="group" aria-label="Show"><span class="lab">Show</span>
        <button class="tag" type="button" id="tConf" aria-pressed="false">Confirmed only<span class="c">${nConf}</span></button>
        <button class="tag you" type="button" id="tRiding" aria-pressed="false">Robert&rsquo;s rides<span class="c">${riding.length}</span></button>
      </div>
      <details class="more-f" id="moreF">
        <summary>More filters <span class="on" id="moreOn"></span></summary>
        <div class="frow scroll" role="group" aria-label="Region"><span class="lab">Region</span>
${REGIONS.filter((r) => byRegion.has(r)).map((r) => `          <button class="tag" type="button" data-set="r" data-v="${attr(r)}" data-k="${slugOf(r)}" aria-pressed="false">${esc(r)}<span class="c">${byRegion.get(r)}</span></button>`).join("\n")}
        </div>
        <div class="frow scroll" role="group" aria-label="Cause"><span class="lab">Cause</span>
${CAUSE_ORDER.filter((c) => byCause.has(c)).map((c) => `          <button class="tag" type="button" data-set="c" data-v="${attr(c)}" data-k="${slugOf(c)}" aria-pressed="false">${esc(c)}<span class="c">${byCause.get(c)}</span></button>`).join("\n")}
        </div>
      </details>
    </section>

${""}`;
function DEEP_HTML() {
  let deep = null;
  try { deep = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site", "events", "events.json"), "utf8")); } catch (e) { return ""; }
  const list = Array.isArray(deep) ? deep : (deep && deep.events) || [];
  if (!list.length) return "";
  const longestWord = (name) => Math.max(...String(name).split(/[\s-]+/).map((w) => w.length), 4);
  const norm = (x) => String(x || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  const tile = (d) => {
    // the 2027 date comes from this calendar (matched by name); the events feed's next_date may still be 2026
    const cal = events.find((e) => norm(e.name) === norm(d.name) || norm(e.name) === norm(d.short_name) || (d.website && e.url && host(e.url) === host(d.website)));
    const dt = cal && cal.start ? `${cal.start.slice(5, 7)}.${cal.start.slice(8, 10)}` : "TBA";
    const slug = String(d.town || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const art = fs.existsSync(path.join(ROOT, "cfc-site", "towns", "art", `${slug}.svg`)) ? `<img class="tile-art" src="/towns/art/${slug}.svg" alt="" loading="lazy" decoding="async" width="200" height="200">` : "";
    return `<a class="tile-p tile-p--deep${art ? " tile-p--art" : ""}" href="${attr(String(d.url || "").replace(SITE, ""))}" style="--l:${longestWord(d.town || d.name)}">${art}<span class="dd">${esc(dt)}${cal && cal.date_status === "confirmed" ? `<span class="st ok" title="Date published by the organizer">✓</span>` : cal && cal.date_status === "projected" ? `<span class="st" title="Projected from the 2026 edition">~</span>` : ""}</span><span class="t">${esc(d.town || "")}</span><span class="b">${esc(d.short_name || d.name)}</span></a>`;
  };
  return `
    <aside class="deep" aria-labelledby="deep-h">
      <p class="eyebrow" id="deep-h">${list.length} events with their own page</p>
      <p class="deep-note">Dates, routes, sign-up, weather, and where to sleep, eat and get the bike fixed.</p>
      <div class="tiles-p tiles-p--deep">${list.map(tile).join("")}</div>
    </aside>`;
}
body += `
    <div class="bar">
      <p class="count" id="count" aria-live="polite"><b>${events.length}</b> events</p>
      <p class="picked" id="picked" hidden></p>
      <button class="clear" id="clear" type="button" hidden>Clear all</button>
    </div>

    <div id="results">
`;
for (let m = 1; m <= 13; m++) {
  const mm = m === 13 ? 0 : m;
  const list = events.filter((e) => e.month === mm);
  if (!list.length) continue;
  body += `      <section class="month" data-m="${mm}">
        <div class="month-h"><h2>${mm ? MONTHS_LONG[mm - 1] : "Date to be announced"}</h2><span class="n" data-n>${list.length}</span></div>
${list.map(eventHtml).join("\n")}
      </section>
`;
}
body += `      <p class="empty" id="empty" hidden>Nothing matches. Clear a filter.</p>
    </div>

    <details class="retired" id="retired">
      <summary>Ended, paused or gone quiet <span>${retired.length}</span></summary>
      <ul>
${retired.slice().sort((a, b) => a.name.localeCompare(b.name)).map((r) => `        <li><b>${esc(r.name)}${r.state ? ` <span>&middot; ${esc(r.state)}</span>` : ""}</b><span>${esc(r.reason || "")}</span></li>`).join("\n")}
      </ul>
    </details>

    <div class="method">
      <p>Dates marked ✓ are published by the organizer. Dates marked ~ are placed on the same weekend as the 2026 edition; the date note under each event says how. TBA means the event exists but has not put out a 2026 or 2027 date. US only; virtual-only and indoor-only events are left out.</p>
      <p>Updated ${esc(updatedLong)}. ${esc(sourceLine)} Confirm with the organizer before booking travel. <a href="/events/2027/calendar-2027.json">JSON feed</a>.</p>
    </div>
${BLOCKS.REPORT({ thing: "event", heading: "Missing an event, or a date changed?", lede: "Tell us and we'll check it against the organizer's page. Confirmed dates only go up once the organizer publishes them." })}
  </article>
`;
body += foot();
pages.push([ALL, body]);

function write(rel, s) {
  // Pass 22: research notes never reach a public file
  const leak = s.match(new RegExp(`.{0,60}(?:${LEAK.source}).{0,40}`, "i"));
  if (leak) throw new Error(`Research note in ${rel}: "${leak[0]}" — add the phrase to CORE/EXTRA in build-calendar.js`);
  const p = path.join(OUT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); return rel;
}
for (const [u, html] of pages) write(u.replace(/^\//, "") + "index.html", html);
// where each event's row lives now, for old /events/2027/#slug links (FIND_JS)
write("events/2027/where.json", JSON.stringify(Object.fromEntries(events.map((e) => [e.slug, monthPath(e.month)]))));
write("events/2027/calendar-2027.json", JSON.stringify({ updated: data.updated, source: sourceLine, generated: TODAY, url: SITE + URL, events: events.map((e) => { const o = Object.assign({}, e); delete o.month; delete o.prior; delete o.unchecked; return o; }), retired }, null, 1));
write("sitemap-calendar.xml", `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/build-calendar.js. Listed in the sitemap index at /sitemap.xml. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([u]) => `  <url><loc>${SITE}${u}</loc><lastmod>${data.updated}</lastmod><changefreq>weekly</changefreq><priority>${u === URL ? "0.8" : "0.6"}</priority></url>`).join("\n")}
</urlset>
`);
console.log(`Built /events/2027/ (+ ${pages.length - 1} short pages): ${events.length} events (${nConf} confirmed, ${nProj} projected, ${nTba} tba), ${retired.length} retired. Data updated ${data.updated}.`);
