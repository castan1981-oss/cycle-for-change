#!/usr/bin/env node
/*
  rides-watch.js — the weekly watcher. Reads every ride's own pages and feeds, notices when
  something moved, changed or died, and writes the machine side of the freshness policy.
  Deterministic, no AI. Runs Mondays at 2 am Phoenix (.github/workflows/rides-watch.yml).

    node tools/rides-watch.js                       every ride in cfc-site/rides/rides.json
      --data file          rides.json to read
      --health file        the previous health (default data/rides-health.json)
      --out-dir dir        where the three files go (default data/)
      --only a,b           just these slugs          --country XX / --state XX   just this place
      --limit N            the first N rides         --concurrency N             parallel fetches (default 8)
      --today YYYY-MM-DD   pretend it's this day     --offline dir               fixtures instead of the network (tests)
      --no-write           print, write nothing      --verbose                   every URL, window and match
      --status             no fetching: what the current files say

  Per ride, the URLs: refresh.feed_url (feed), refresh.watch_url — else sources[0] or the website
  (watch), Strava club event pages in sources (strava), a Meetup group's /events/ical/ (feed),
  and a feed found on an earlier run (candidate). Instagram, Facebook, X, TikTok, Linktree,
  WhatsApp and other strava.com pages can't be read without a login: class "social", not fetched.

  Fetching: 8 at a time, one request per host at a time and a second between them, 20 s timeout,
  one retry on network errors, redirects followed by hand (final_url, host change), a Chrome user
  agent with "(+https://cycleforchange.org/rides/)", Accept-Language from the ride's languages.
  Every URL lands in a class: ok · bot-wall · gone · error · social.

  What it reads on a page that loads:
    - the schedule: windows around the ride's day words, its start time in every common spelling
      and the distinctive words of its name and host; a fingerprint of the lines that carry them
      (dates, counts and "3 days ago" taken out, so a calendar rolling forward isn't a change)
    - end words ("cancelled", "no longer", "abgesagt", "ya no se realiza"…) near the ride's name
    - dates it can prove: ICS feeds (RRULE included), JSON-LD Event objects, Strava event pages
      ("Club Event Gainey Thursday Oct 1 Thu 5:30 AM …"). An upcoming date on the ride's day and
      time = proof of life: feed_seen = today, which keeps the ride fresh (tools/lib/rides-freshness.js).
      An event counts when it's named like the ride (±45 min), or — from one host's calendar — sits
      within 20 minutes of our start, in the ride's season, and isn't named for another ride we list
      in that city or for another town ("Crank Arm DURHAM" is not the Raleigh ride). A false proof
      would keep a dead ride listed, so a doubtful event is no proof.
    - feeds the host didn't tell us about (The Events Calendar ?ical=1, Google Calendar embeds,
      <link rel=alternate type=text/calendar>): one that lists this ride → health.feed_candidate

  Flags (data/rides-health.json → the site and the re-check queue):
    page-gone (red)  404/410, a parked domain, a deleted Strava event, DNS failing two runs running
    end-words (red)  a new "cancelled"-type word near the ride's name
    schedule-text-changed (amber)  the schedule lines changed, the host's feed shows the ride on
                     another day or time, or starting 20+ minutes off ("NEW START TIME")
    time-missing (amber)  the start time vanished from the page
    event-date-past (amber)  the Strava event's date has passed, or the host's event page dates
                     the ride more than three weeks back
    next-date-far (amber)  the Strava event's next date is weeks away while the ride should be on
    unreachable (amber)  every readable URL failed three runs running
    moved (amber)  a permanent redirect to a homepage
  A flag is raised once; it resolves when the condition clears, or when a person re-checks the
  ride after it began (verified_on, or tools/rides-apply.js marking it resolved_by "re-check").

  Writes data/rides-health.json, data/rides-queue.json (the re-check queue, F.queue enriched)
  and data/rides-queue.md (the same, for people and the Monday issue). Never touches rides.json.
*/
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const S = require("./lib/rides-schema.js");
const F = require("./lib/rides-freshness.js");
const ICS = require("./lib/ics.js");

const ROOT = path.join(__dirname, "..");
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 (+https://cycleforchange.org/rides/)";
const ACCEPT = "text/html,application/xhtml+xml,application/xml;q=0.9,text/calendar;q=0.9,*/*;q=0.8";
const MAX_BYTES = 4 * 1024 * 1024;
const WINDOW = 160, SCHEDULE_MAX = 800, END_RADIUS = 200, TIME_SLACK = 45, ICS_DAYS = 45;
const RESOLVED_KEEP_DAYS = 180;

// ---------- small helpers ----------
const sha1 = (s) => crypto.createHash("sha1").update(s).digest("hex");
const pad = (n) => String(n).padStart(2, "0");
const isDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
function addDays(d, n) { const t = new Date(`${d}T00:00:00Z`); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); }
const WEEKDAY = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const weekdayOf = (d) => WEEKDAY[new Date(`${d}T00:00:00Z`).getUTCDay()];
const toMin = (t) => (typeof t === "string" && /^\d{1,2}:\d{2}/.test(t) ? +t.split(":")[0] * 60 + +t.split(":")[1].slice(0, 2) : null);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const hostOf = (u) => { try { return new URL(u).hostname.toLowerCase(); } catch (e) { return ""; } };
const bareHost = (u) => hostOf(u).replace(/^www\./, "");
const MONTHS3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYLONG = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
const fmtDay = (d) => (isDate(d) ? `${DAYLONG[weekdayOf(d)].slice(0, 3)} ${MONTHS3[+d.slice(5, 7) - 1]} ${+d.slice(8, 10)}, ${d.slice(0, 4)}` : String(d));
const fmtTime = (t) => { const m = toMin(t); if (m == null) return ""; const h = Math.floor(m / 60), mi = m % 60; return `${h % 12 || 12}:${pad(mi)} ${h < 12 ? "am" : "pm"}`; };
const clip = (s, n) => { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length <= n ? s : s.slice(0, n - 1) + "…"; };
const isStravaEvent = (u) => /^https?:\/\/(?:www\.)?strava\.com\/clubs\/[^/?#]+\/group_events\/\d+/i.test(String(u || ""));
const isIcsUrl = (u) => /\.ics(?:[?#]|$)|[?&](?:ical|outlook-ical)=1\b|\/events\/ical\/?(?:[?#]|$)|^webcal:/i.test(String(u || ""));

// Fold to lowercase ascii-ish WITHOUT changing the length, so positions found in the folded text
// point at the same characters in the original (windows are cut from the original).
function foldSame(s) {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i], c = ch.charCodeAt(0);
    if (c < 128) { out += c >= 65 && c <= 90 ? String.fromCharCode(c + 32) : ch; continue; }
    if (ch === "’" || ch === "‘" || ch === "`") { out += "'"; continue; }
    if (c >= 0xd800 && c <= 0xdfff) { out += ch; continue; }
    const f = ch.normalize("NFD")[0] || ch, lo = f.toLowerCase();
    out += lo.length === 1 ? lo : f;
  }
  return out;
}
const fold = (s) => foldSame(String(s || ""));

// ---------- page → text ----------
const COMBINING = { acute: "\u0301", grave: "\u0300", circ: "\u0302", uml: "\u0308", tilde: "\u0303", cedil: "\u0327", ring: "\u030a" };
const NAMED = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ensp: " ", emsp: " ", thinsp: " ", ndash: "–", mdash: "—",
  lsquo: "‘", rsquo: "’", sbquo: "‚", ldquo: "“", rdquo: "”", bdquo: "„", hellip: "…", middot: "·", bull: "•", copy: "©",
  reg: "®", trade: "™", deg: "°", szlig: "ß", aelig: "æ", AElig: "Æ", oslash: "ø", Oslash: "Ø", eth: "ð", thorn: "þ",
  iexcl: "¡", iquest: "¿", laquo: "«", raquo: "»", ordm: "º", ordf: "ª", euro: "€", pound: "£", yen: "¥", cent: "¢",
  times: "×", divide: "÷", frac12: "½", frac14: "¼", frac34: "¾", sup2: "²", rarr: "→", larr: "←", shy: "", zwj: "", zwnj: "",
};
function decodeEntities(s) {
  return String(s).replace(/&(#x[0-9a-f]{1,6}|#\d{1,7}|[a-z][a-z0-9]{1,31});/gi, (m, e) => {
    if (e[0] === "#") {
      const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return n > 0 && n <= 0x10ffff && !(n >= 0xd800 && n <= 0xdfff) ? String.fromCodePoint(n) : " ";
    }
    if (Object.prototype.hasOwnProperty.call(NAMED, e)) return NAMED[e];
    const a = e.match(/^([a-zA-Z])(acute|grave|circ|uml|tilde|cedil|ring)$/);
    if (a) return (a[1] + COMBINING[a[2]]).normalize("NFC");
    return m;
  });
}
// Visible text, one block per line ("\n" between blocks), spaces collapsed.
function htmlToText(html) {
  let s = String(html || "");
  s = s.replace(/<!--[\s\S]*?-->/g, " ");
  s = s.replace(/<(script|style|noscript|template|svg|iframe|object)\b[\s\S]*?<\/\1\s*>/gi, " ");
  s = s.replace(/<\/?(?:br|p|div|li|ul|ol|h[1-6]|tr|td|th|table|section|article|header|footer|nav|aside|main|dt|dd|dl|blockquote|option|hr|figcaption|address|pre|form|fieldset|legend|label|button|summary|details)\b[^>]*>/gi, "\n");
  s = s.replace(/<[^>]*>/g, " ");
  s = decodeEntities(s);
  s = s.replace(/[ \t\f\v\r\u00a0\u1680\u2000-\u200b\u2028\u2029\u202f\u205f\u3000\ufeff]+/g, " ").replace(/ ?\n[\n ]*/g, "\n");
  return s.trim();
}
const titleOf = (html) => { const m = String(html || "").match(/<title[^>]*>([\s\S]*?)<\/title>/i); return m ? decodeEntities(m[1]).replace(/\s+/g, " ").trim() : ""; };
const flat = (body) => body.replace(/\n/g, " ");

const CHALLENGE = /cf-chl|challenge-platform|cf_chl_|just a moment\.\.\.|attention required! \| cloudflare|checking your browser|enable javascript and cookies to continue|ddos protection by|g-recaptcha|h-captcha|hcaptcha|px-captcha|perimeterx|datadome|_incapsula_resource|incapsula incident|sucuri website firewall|request unsuccessful\. incapsula|awswafintegration|verify you are human|are you a robot|pardon our interruption|access denied<\/title>|<title>access denied/i;
const PARKED = /this domain (?:name )?(?:is|may be) for sale|buy this domain|domain (?:is )?parked|parked (?:free|domain)|parkingcrew|sedoparking|this domain has expired|domain has expired|this domain (?:name )?has been registered|hugedomains\.com|afternic|dan\.com\/buy|domainmarket|is available for purchase|bodis\.com|parklogic|domain for sale|inquire about this domain|make an offer on this domain/i;
const PARKING_HOSTS = /(?:^|\.)(?:sedoparking\.com|sedo\.com|parkingcrew\.net|bodis\.com|dan\.com|afternic\.com|hugedomains\.com|domainmarket\.com|above\.com|undeveloped\.com|parklogic\.com|uniregistry\.com|domainnamesales\.com|godaddy\.com)$/i;
const SOFT404 = /(?:^|\W)(?:404|page not found|not found|pagina no encontrada|página no encontrada|page introuvable|page non trouvée|seite nicht gefunden|pagina non trovata|pagina niet gevonden|página não encontrada|nothing found|ページが見つかりません)(?:\W|$)/i;
const LOGIN_PATH = /\/(?:login|signin|sign-in|log-in|account\/login|users\/sign_in|wp-login\.php)\b/i;
const HOME_PATH = /^\/?(?:index\.(?:html?|php)|home|[a-z]{2}(?:[-_][a-z]{2})?)?\/?$/i;

// ---------- the ride's anchors ----------
const GENERIC = new Set(("ride rides riding rider riders group groups weekly week weeks bike bikes biking bicycle bicycles bicycling cycling cycle " +
  "cycles cyclist cyclists cyclery club clubs team teams shop shops social road roads gravel mtb mountain night nights morning mornings " +
  "evening evenings afternoon afternoons early late the and with from for our your you this that of an in on at to by de del la las los " +
  "el le les du des der die das den dem und et y e o il lo di da do dos van het een en no free open community casual easy fast drop nodrop " +
  "beginner beginners friendly series weekend weekends weekday weekdays every all monthly biweekly season seasonal summer winter spring " +
  "fall autumn city town inc llc ltd co company store sports sport outdoor outdoors official new old big little first second third last " +
  "rueda rodada salida salidas sortie sorties ausfahrt uscita rit toertocht pedal paseo pedalada passeio grupo groupe gruppo vélo velo " +
  "ciclismo ciclistas ciclista cycliste cyclistes radsport radfahrer fahrrad fiets wielren mesh").split(/\s+/));
const DAY_TOKENS = new Set(Object.values(S.DAY_WORDS).flat().map((w) => fold(w)).concat(["mon", "tue", "tues", "wed", "weds", "thu", "thur", "thurs", "fri", "sat", "sun"]));
const isDayToken = (t) => DAY_TOKENS.has(t) || /^(mon|tues|wednes|thurs|fri|satur|sun)days?$/.test(t) || [...DAY_TOKENS].some((d) => d.length > 4 && t.startsWith(d));
function wordsOf(s) { return fold(s).split(/[^\p{L}\p{N}']+/u).map((w) => w.replace(/^'+|'+$/g, "").replace(/'s$/, "")).filter(Boolean); }
const isCJK = (w) => /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(w);
function distinct(s, ride) {
  const city = new Set(wordsOf([ride.city, ride.region].filter(Boolean).join(" ")));   // the neighborhood stays: "Ealing", "Ahwatukee" tell rides apart
  const out = [];
  for (const w of wordsOf(s)) {
    if (/^\d+$/.test(w) || GENERIC.has(w) || city.has(w) || isDayToken(w)) continue;
    if (isCJK(w) ? w.length < 2 : w.length < 3) continue;
    if (!out.includes(w)) out.push(w);
  }
  return out;
}
const nameTokens = (ride) => distinct([ride.name, ride.name_en].filter(Boolean).join(" "), ride);
const hostTokens = (ride) => distinct((ride.host && ride.host.name) || "", ride);
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wordRe = (tokens) => {
  const latin = tokens.filter((t) => !isCJK(t)), cjk = tokens.filter(isCJK);
  const parts = [];
  if (latin.length) parts.push(`(?<![\\p{L}\\p{N}])(?:${latin.map(reEsc).join("|")})(?![\\p{L}\\p{N}])`);
  if (cjk.length) parts.push(`(?:${cjk.map(reEsc).join("|")})`);
  return parts.length ? new RegExp(parts.join("|"), "gu") : null;
};
const PT_AMBIGUOUS = new Set(["segunda", "terca", "terça", "quarta", "quinta", "sexta"]);
function dayRe(ride) {
  const langs = new Set(ride.language || []);
  const words = new Set();
  for (const d of ride.days || []) for (const w of S.DAY_WORDS[d] || []) {
    if (PT_AMBIGUOUS.has(w) && !langs.has("pt")) continue;
    words.add(fold(w));
  }
  if (!words.size) return null;
  const latin = [...words].filter((w) => !isCJK(w)), cjk = [...words].filter(isCJK);
  const parts = [];
  if (latin.length) parts.push(`(?<![\\p{L}\\p{N}])(?:${latin.map(reEsc).join("|")})s?(?![\\p{L}\\p{N}])`);
  if (cjk.length) parts.push(cjk.map(reEsc).join("|"));
  return new RegExp(parts.join("|"), "gu");
}
const ABBR = { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" };
function abbrRe(ride) {   // "Sat" / "SAT" on the original (case-sensitive: "sun" and "sat" are words too)
  const a = (ride.days || []).map((d) => ABBR[d]).filter(Boolean);
  return a.length ? new RegExp(`\\b(?:${a.map((x) => `${x}|${x.toUpperCase()}`).join("|")})\\b\\.?`, "g") : null;
}
// The start time in the spellings hosts use: 5:30, 5:30am, 5:30 am, 5.30, 05:30, 5h30, 17:30, 5:30 pm, 6pm, 18h, 18 Uhr, 18時…
function timeRe(hhmm) {
  if (typeof hhmm !== "string" || !/^\d{2}:\d{2}$/.test(hhmm)) return null;
  const H = +hhmm.slice(0, 2), M = +hhmm.slice(3), h12 = H % 12 || 12, pm = H >= 12, mm = pad(M);
  const AM = "a\\.?\\s?m\\b\\.?", PM = "p\\.?\\s?m\\b\\.?", ap = pm ? PM : AM, other = pm ? AM : PM;
  const alts = [`0?${h12}[:.h]${mm}(?:\\s?${ap})?(?!\\s?${other})`];
  if (H >= 13 || H === 0) alts.push(`${pad(H)}[:.h]${mm}`);
  if (M === 0) {
    alts.push(`0?${h12}\\s?${ap}`, `0?${h12}\\s?[-–]\\s?\\d{1,2}(?::\\d{2})?\\s?${ap}`, `${H}\\s?(?:h|uhr)(?![\\p{L}\\d])`);
    if (H === 12) alts.push("noon", "midday");
  }
  alts.push(`${H}時${M ? (M === 30 ? "(?:半|30分)" : `${M}分`) : ""}`);
  return new RegExp(`(?<![\\d:.$€£,])(?:${alts.join("|")})(?!\\d)`, "gu");
}
const ANY_TIME = /(?<![\d:.$€£])\d{1,2}(?:[:.h]\d{2})?\s?(?:a\.?\s?m\b|p\.?\s?m\b)|(?<![\d:.$€£])\d{1,2}[:h]\d{2}(?!\d)|\d{1,2}時/u;
function anchorsFor(ride) {
  const nt = nameTokens(ride), ht = hostTokens(ride).filter((t) => !nt.includes(t));
  return { name: wordRe(nt), host: wordRe(ht), nameTokens: nt, hostTokens: ht, day: dayRe(ride), abbr: abbrRe(ride), time: timeRe(ride.start_hhmm) };
}
function hits(re, s, type) {
  if (!re) return [];
  const out = [];
  re.lastIndex = 0;
  for (const m of s.matchAll(re)) { if (m[0].length) out.push({ pos: m.index, end: m.index + m[0].length, type }); if (out.length > 400) break; }
  return out;
}

// ---------- schedule windows + fingerprint ----------
function scheduleText(body, H) {
  if (!H.length) return "";
  const wins = H.map((h) => ({ s: Math.max(0, h.pos - WINDOW), e: Math.min(body.length, h.end + WINDOW), types: new Set([h.type]), first: h.pos }))
    .sort((a, b) => a.s - b.s);
  const merged = [];
  for (const w of wins) {
    const last = merged[merged.length - 1];
    if (last && w.s <= last.e) { last.e = Math.max(last.e, w.e); for (const t of w.types) last.types.add(t); }
    else merged.push(w);
  }
  const score = (w) => (w.types.has("name") ? 3 : 0) + (w.types.has("time") ? 2 : 0) + (w.types.has("day") ? 1 : 0) + (w.types.has("host") ? 1 : 0);
  const chosen = [];
  let total = 0;
  for (const w of [...merged].sort((a, b) => score(b) - score(a) || a.s - b.s)) {
    if (total >= SCHEDULE_MAX) break;
    let { s, e } = w;
    const room = SCHEDULE_MAX - total;
    if (e - s > room) {
      const best = H.find((h) => h.pos >= s && h.pos < e && h.type === "name") || H.find((h) => h.pos >= s && h.pos < e && h.type === "time") || { pos: s };
      s = Math.max(s, best.pos - WINDOW); e = Math.min(e, s + room);
    }
    chosen.push({ s, e }); total += e - s;
  }
  return chosen.sort((a, b) => a.s - b.s).map((w) => body.slice(w.s, w.e).replace(/\n/g, " · ").replace(/\s+/g, " ").trim()).join(" … ");
}
const MONTH_WORDS = "jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|sept|september|oct|october|nov|november|dec|december|" +
  "enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre|janeiro|fevereiro|marco|maio|junho|julho|setembro|outubro|novembro|dezembro|" +
  "janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre|januar|februar|marz|juni|juli|august|oktober|dezember|" +
  "gennaio|febbraio|aprile|maggio|giugno|luglio|settembre|ottobre|dicembre|januari|februari|maart|mei|augustus|gener|febrer|abril|maig|juny|juliol|setembre|desembre";
const DATE_RES = [
  /\b\d{4}-\d{2}-\d{2}(?:t[\d:.]+(?:z|[+-]\d{2}:?\d{2})?)?\b/g,
  new RegExp(`\\b(?:${MONTH_WORDS})\\.?\\s+\\d{1,2}(?:st|nd|rd|th)?\\b(?:,?\\s+\\d{4})?`, "g"),
  new RegExp(`\\b\\d{1,2}(?:st|nd|rd|th|er|e|º|°|\\.)?\\s+(?:de\\s+|of\\s+)?(?:${MONTH_WORDS})\\b\\.?(?:\\s+(?:de\\s+)?\\d{4})?`, "g"),
  /\b\d{1,2}\/\d{1,2}(?:\/\d{2,4})?\b/g,
  /\b\d{1,2}\.\d{1,2}\.(?:\d{2,4})?(?!\d)/g,
  /\d{1,2}月\d{1,2}日/g,
  new RegExp(`\\b(?:${MONTH_WORDS})\\b`, "g"),
  /\b20\d\d\b/g,
];
function countDates(fbody) { let n = 0; for (const re of DATE_RES.slice(0, 6)) { re.lastIndex = 0; n += (fbody.match(re) || []).length; if (n >= 12) break; } return n; }
function normSeg(s) {
  let t = fold(s);
  for (const re of DATE_RES) { re.lastIndex = 0; t = t.replace(re, " "); }
  t = t.replace(/\b\d+\s*(?:attendees?|going|spots?(?: left)?|seats?|people|riders?|members?|rsvps?|comments?|likes?|views?|interested|participants?|reviews?|followers?|photos?)\b/g, " ")
    .replace(/\b\d+\s*(?:seconds?|secs?|minutes?|mins?|hours?|hrs?|days?|weeks?|months?|years?)\s+ago\b/g, " ")
    .replace(/\b(?:today|tomorrow|yesterday|tonight|this week|next week|hoy|manana|ayer|aujourd'hui|demain|heute|morgen|oggi|domani|vandaag|amanha|ontem)\b/g, " ")
    .replace(/[^\p{L}\p{N}:.]+/gu, " ").replace(/\s+/g, " ").trim();
  return t;
}
function segmentsOf(body) {
  const out = [];
  for (const line of body.split("\n")) {
    if (line.length <= 300) { if (line.trim()) out.push(line); continue; }
    for (const p of line.split(/(?<=[.!?;])\s+|\s+[·•|]\s+/)) if (p.trim()) out.push(p);
  }
  return out;
}
function scheduleFingerprint(body, A, calendarLike) {
  const core = new Set();
  for (const seg of segmentsOf(body)) {
    const f = fold(seg);
    const test = (re) => { if (!re) return false; re.lastIndex = 0; return re.test(f); };
    const hasName = test(A.name);
    const keep = calendarLike ? hasName : hasName || test(A.time) || (test(A.day) && ANY_TIME.test(f));
    if (keep) { const n = normSeg(seg); if (n) core.add(n); }
  }
  return sha1([...core].sort().join("\n"));
}

// ---------- end words ----------
const END_WORDS = [
  ["cancelled", /\bcancell?ed\b/g], ["no longer", /\bno longer\b(?!\s+(?:than|need|needs|needed|require[sd]?|have to|has to|necessary|just|only|be able|accepting))/g],
  ["discontinued", /\bdiscontinued\b/g], ["on hiatus", /\b(?:on|an indefinite) hiatus\b/g],
  ["paused", /\b(?:is|are|been|being|currently|temporarily|now|indefinitely)\s+paused\b|\bon pause\b/g], ["suspended", /\bsuspended\b/g],
  ["final ride", /\bfinal ride\b/g], ["last ride", /\blast ride\b/g], ["has ended", /\b(?:has|have) (?:now )?ended\b/g],
  ["permanently closed", /\bpermanently closed\b|\bclosed permanently\b|\bclosed for good\b|\bout of business\b/g],
  ["cancelado", /\bcancelad[oa]s?\b/g], ["suspendido", /\bsuspendid[oa]s?\b/g], ["ya no se realiza", /\bya no se (?:realiza|hace|celebra|organiza)n?\b/g],
  ["suspenso", /\bsuspens[oa]s?\b/g], ["nao acontece mais", /\bnao (?:acontece|acontecem|ocorre|ocorrem|ha) mais\b/g], ["encerrado", /\bencerrad[oa]s?\b/g],
  ["annule", /\bannulee?s?\b/g], ["suspendu", /\bsuspendue?s?\b/g], ["n'a plus lieu", /\bn'?\s?(?:a|ont) plus lieu\b/g],
  ["abgesagt", /\babgesagt\b/g], ["eingestellt", /\beingestellt\b/g], ["findet nicht mehr statt", /\bfinde[nt] nicht mehr statt\b/g],
  ["pausiert", /\bpausier(?:t|en)\b/g], ["fallt aus", /\b(?:fallt|entfallt) aus\b|\bentfallt\b/g],
  ["annullato", /\bannullat[oaie]\b/g], ["sospeso", /\bsospes[oaie]\b/g], ["non si svolge piu", /\bnon si (?:svolge|terra|fa) piu\b/g],
  ["geannuleerd", /\bgeannuleerd\b/g], ["afgelast", /\bafgelast\b/g], ["gaat niet meer door", /\bgaa?t niet (?:meer )?door\b/g], ["gestopt", /\bgestopt\b/g],
  ["cancel·lat", /\bcancel.?la(?:t|da|ts|des)\b/g], ["ja no es fa", /\bja no es (?:fa|fan|realitza)\b/g],
];
// "cancelled if it rains", "may be cancelled", "never cancelled": not the ride ending
const IFFY = /\b(?:if|when|in case|unless|weather|rain|rains|raining|rainy|wet|storm|storms|thunder|lightning|heat|hot|temperatures?|wind|windy|snow|ice|icy|smoke|smoky|air quality|holiday|holidays|thanksgiving|christmas|may be|might be|could be|can be|si|en caso|lluvia|llueve|clima|tormenta|calor|feriado|festivo|chuva|chover|mau tempo|pluie|pleut|meteo|orage|ferie|regen|regnet|wetter|gewitter|feiertag|pioggia|piove|maltempo|weer|onweer|feestdag|pluja|plou)\b/;
const NEGATED = /\b(?:not|never|isn't|aren't|wasn't|won't be|nunca|jamais|nie|niemals|mai|nooit)\s+(?:been\s+|be\s+|ever\s+)?$/;
function endWords(body, fbody, nearHits) {
  if (!nearHits.length) return [];
  const found = new Map();
  for (const [label, re] of END_WORDS) {
    re.lastIndex = 0;
    for (const m of fbody.matchAll(re)) {
      const p = m.index;
      if (!nearHits.some((h) => Math.abs(h.pos - p) <= END_RADIUS)) continue;
      // the end word's own sentence: "Rides are cancelled if it rains." doesn't excuse the next sentence
      const before = fbody.slice(Math.max(0, p - 80), p), after = fbody.slice(p, Math.min(fbody.length, p + m[0].length + 80));
      const cutB = Math.max(...[".", "!", "?", "\n", "·", "|", "•"].map((c) => before.lastIndexOf(c)));
      const ends = [".", "!", "?", "\n", "·", "|", "•"].map((c) => after.indexOf(c, m[0].length)).filter((i) => i > -1);
      const sentence = before.slice(cutB + 1) + after.slice(0, ends.length ? Math.min(...ends) : after.length);
      if (IFFY.test(sentence) || NEGATED.test(fbody.slice(Math.max(0, p - 24), p))) continue;
      if (!found.has(label)) found.set(label, clip(body.slice(Math.max(0, p - 90), Math.min(body.length, p + m[0].length + 90)).replace(/\n/g, " · "), 220));
    }
  }
  return [...found.entries()].map(([word, context]) => ({ word, context }));
}

// ---------- dates the host publishes ----------
function seriesKey(summary) { return normSeg(summary || "").replace(/[\d:.]+/g, " ").replace(/\s+/g, " ").trim(); }
// Words that say what kind of ride it is, not which one: they never identify a ride on their own.
const WEAK = new Set("women womens woman ladies lady femme femmes girls gals queer lgbtq lgbt pride trans kids kid family families youth junior juniors seniors masters bipoc black latino latina latinx wtf wtnb nb coffee cafe".split(" "));
function nameMatch(tokens, text) {
  const strong = tokens.filter((t) => !WEAK.has(t));
  if (!strong.length || !text) return false;
  const have = new Set(wordsOf(text)), ftext = fold(text);
  const shared = strong.filter((t) => have.has(t) || (isCJK(t) && ftext.includes(t))).length;
  const need = strong.length >= 2 ? Math.max(2, Math.ceil(strong.length / 2)) : 1;
  return shared >= need;
}
/*
  Does a list of dated events show this ride? Each event: { date, time, zone, all_day, summary }.
  A match: on one of the ride's days (in the ride's zone), within 45 minutes of its start when both
  are known, and named like the ride — or, from a calendar that is clearly one host's (three or
  fewer distinct series, or a Meetup group's own feed), within 20 minutes of our start. A shared
  calendar (a city's events, a campaign's listings for many groups) needs the name — a Saturday
  10 am event from another group is not proof.
*/
function matchEvents(events, ride, today, days, { hostFeed = false, otherCities = null, siblings = [] } = {}) {
  const from = addDays(today, -1), to = addDays(today, days);
  const conv = events.map((o) => ({ ...o, ...ICS.toZone(o, ride.tz) })).filter((o) => o.date >= from && o.date <= to);
  const series = new Set(conv.map((o) => seriesKey(o.summary)));
  const dedicated = hostFeed || series.size <= 3;
  // in a host's own feed (a Meetup group) every event carries the host's name: only the ride's other words identify it
  const hostWords = new Set(distinct((ride.host && ride.host.name) || "", ride));
  const tokens = hostFeed ? nameTokens(ride).filter((t) => !hostWords.has(t)) : nameTokens(ride).length ? nameTokens(ride) : hostTokens(ride);
  // the time in force on the event's own date (start_times: the host's table of start-time changes)
  const startAt = (date) => toMin(S.startOn(ride, date));
  const matches = [];
  let mismatch = null;
  const own = wordRe(wordsOf([ride.city, ride.neighborhood].filter(Boolean).join(" ")).filter((w) => w.length > 2));
  const test = (re, s) => { if (!re) return false; re.lastIndex = 0; return re.test(s); };
  for (const o of conv) {
    if (o.date < today) continue;
    // "Crank Arm DURHAM Wednesday Night Ride" is not the Raleigh ride, however alike the names
    const fs_ = fold(o.summary || "");
    if (otherCities && test(otherCities, fs_) && !test(own, fs_)) continue;
    const dayOk = !(ride.days || []).length || ride.days.includes(weekdayOf(o.date));
    const t = toMin(o.time), start = startAt(o.date);
    const timeOk = start == null || t == null ? null : Math.abs(t - start) <= TIME_SLACK;
    const named = nameMatch(tokens, o.summary);
    // an unnamed event can't stand in for this ride out of its season, or when it carries the name of
    // another ride we list in the same city ("Chilly Nights" on a Thursday is not the summer Ladies Ride)
    if (!named && (!inSeason(ride, o.date) || siblings.some((st) => nameMatch(st, o.summary)))) continue;
    // unnamed events must sit on our time (±20 min): a host feed often has two Wednesday rides half an hour apart
    const close = t != null && start != null && Math.abs(t - start) < DRIFT_MIN;
    if (dayOk && timeOk !== false && (named || (dedicated && (close || (start == null && !o.all_day))))) matches.push(o);
    else if (!mismatch && named && (!dayOk || timeOk === false)) mismatch = o;
  }
  // the next date on our time first; a start that moved inside the 45 minutes ("NEW START TIME" 6:30
  // vs our 6:00) is still a change — unless another event sits on our time, or our schedule says it
  const off = (o) => (startAt(o.date) == null || toMin(o.time) == null ? 0 : Math.abs(toMin(o.time) - startAt(o.date)));
  matches.sort((a, b) => (off(a) >= DRIFT_MIN) - (off(b) >= DRIFT_MIN) || (a.date + (a.time || "")).localeCompare(b.date + (b.time || "")));
  const first = matches[0], ft = first && toMin(first.time), fs0 = first && startAt(first.date);
  const drift = first && fs0 != null && ft != null && Math.abs(ft - fs0) >= DRIFT_MIN && !scheduleMentions(ride, first.time) && nameMatch(tokens, first.summary) ? first : null;
  return { window: conv.length, dedicated, matches, drift, mismatch: matches.length ? null : mismatch };
}
const DRIFT_MIN = 20;
function scheduleMentions(ride, hhmm) {
  const re = timeRe(hhmm); if (!re) return false;
  re.lastIndex = 0;
  return re.test(fold([ride.schedule, ride.time_local, ride.visitor_notes].filter(Boolean).join(" · ")));
}
// A page about one event (The Events Calendar, Eventbrite) whose dates for this ride are all behind us
function pastOnly(events, ride, today) {
  const series = new Set(events.map((e) => seriesKey(e.summary)));
  if (!events.length || series.size > 3) return null;
  const tokens = nameTokens(ride).length ? nameTokens(ride) : hostTokens(ride);
  const mine = series.size === 1 ? events : events.filter((e) => nameMatch(tokens, e.summary));
  if (!mine.length) return null;
  // a weekly ride's page for last Tuesday is recent evidence, not a warning: only dates over three weeks old count
  const lo = addDays(today, -F.POLICY.FEED_FRESH_DAYS);
  if (mine.some((e) => (e.end_date && e.end_date > e.date ? e.end_date : e.date) >= lo)) return null;
  return mine.sort((a, b) => a.date.localeCompare(b.date)).pop();
}
// JSON-LD Event objects (Meetup, Eventbrite, many club sites): [{ date, time, zone, summary, status }]
function jsonLdEvents(html) {
  const out = [];
  const walk = (x, depth) => {
    if (depth > 10 || x == null || typeof x !== "object") return;
    if (Array.isArray(x)) { for (const y of x) walk(y, depth + 1); return; }
    const types = [].concat(x["@type"] || []).map(String);
    if (types.some((t) => /Event$|^Festival$|^Hackathon$/.test(t)) && typeof x.startDate === "string") {
      const d = parseIsoDate(x.startDate), e = typeof x.endDate === "string" ? parseIsoDate(x.endDate) : null;
      const status = String(x.eventStatus || "");
      if (d && !/Cancelled|Postponed/i.test(status)) out.push({ ...d, end_date: e ? e.date : null, summary: typeof x.name === "string" ? decodeEntities(x.name) : "", status });
    }
    for (const k of ["@graph", "itemListElement", "item", "subEvent", "subEvents", "event", "events", "mainEntity"]) if (x[k]) walk(x[k], depth + 1);
  };
  for (const m of String(html || "").matchAll(/<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi)) {
    let t = m[1].trim().replace(/^<!--|-->$/g, "").replace(/^\s*\/\/\s*<!\[CDATA\[|\/\/\s*\]\]>\s*$/g, "").trim();
    let data = null;
    try { data = JSON.parse(t); } catch (e) { try { data = JSON.parse(t.replace(/[\u0000-\u001f]+/g, " ")); } catch (e2) { continue; } }
    walk(data, 0);
  }
  return out;
}
function parseIsoDate(s) {
  const m = String(s).trim().match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::\d{2}(?:\.\d+)?)?\s*(Z|[+-]\d{2}:?\d{2})?)?/);
  if (!m) return null;
  const date = `${m[1]}-${m[2]}-${m[3]}`;
  if (!m[4]) return { date, time: null, zone: null, all_day: true };
  if (!m[6]) return { date, time: `${m[4]}:${m[5]}`, zone: null, all_day: false };
  // fixed offset → UTC wall time, so toZone() can move it into the ride's zone
  const off = m[6] === "Z" ? 0 : (m[6][0] === "-" ? -1 : 1) * (+m[6].slice(1, 3) * 60 + +m[6].slice(-2));
  const t = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]) - off * 60000);
  return { date: t.toISOString().slice(0, 10), time: t.toISOString().slice(11, 16), zone: "UTC", all_day: false };
}
// Strava club event page: the next date. The page's data block has it with the year
// ("occurrenceDateTime": "2026-10-01T05:30:00"); the text has "Club Event <title> Oct 1 Thu 5:30 AM <spot>".
const MON_IDX = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12 };
function resolveYear(mon, day, wd, today) {
  const Y = +today.slice(0, 4), lo = addDays(today, -1);
  const cands = [Y - 1, Y, Y + 1].map((y) => `${y}-${pad(mon)}-${pad(day)}`).filter((d) => { const t = new Date(`${d}T00:00:00Z`); return !isNaN(t) && t.toISOString().slice(0, 10) === d; });
  const ok = (d) => !wd || weekdayOf(d) === wd;
  const up = cands.filter((d) => d >= lo && ok(d));
  if (up.length) return { date: up[0], past: false };
  const past = cands.filter((d) => d < lo && ok(d));
  if (past.length) return { date: past[past.length - 1], past: true };
  const next = cands.find((d) => d >= lo);
  return next ? { date: next, past: false, weekday_mismatch: true } : null;
}
function stravaEvent(html, body, today) {
  const lo = addDays(today, -1);
  const nd = String(html || "").match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (nd) {
    try {
      const ev = JSON.parse(nd[1]).props.pageProps.event;
      const occ = (ev && Array.isArray(ev.occurrences) ? ev.occurrences : [])
        .map((o) => ({ date: String(o.occurrenceDateTime || "").slice(0, 10), time: String(o.occurrenceDateTime || "").slice(11, 16) || null, title: o.title || "", address: o.address || null }))
        .filter((o) => isDate(o.date)).sort((a, b) => a.date.localeCompare(b.date));
      if (occ.length) { const up = occ.find((o) => o.date >= lo); return { ...(up || occ[occ.length - 1]), past: !up, source: "data" }; }
    } catch (e) { /* fall through to the text */ }
  }
  const text = flat(body || "");
  const re = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept?|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2}),?\s+(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]*\.?,?\s+(\d{1,2}):(\d{2})\s*([AaPp])\.?\s?[Mm]\b\.?/;
  const m = text.match(re);
  if (!m) return null;
  const ce = text.lastIndexOf("Club Event", m.index);
  const title = ce > -1 ? text.slice(ce + 10, m.index).trim() : "";
  let h = +m[4] % 12; if (/p/i.test(m[6])) h += 12;
  const wd = m[3].slice(0, 3).toLowerCase();
  const y = resolveYear(MON_IDX[m[1].toLowerCase().slice(0, 3)], +m[2], wd, today);
  if (!y) return null;
  return { date: y.date, time: `${pad(h)}:${m[5]}`, title: clip(title, 120), past: y.past, weekday_mismatch: !!y.weekday_mismatch, source: "text" };
}
// Feeds a page points at without saying so
function discoverFeeds(html, pageUrl) {
  const found = [];
  const add = (u) => {
    try {
      u = decodeEntities(String(u)).replace(/^webcal:\/\//i, "https://");
      const abs = new URL(u, pageUrl).href;
      if (!found.includes(abs) && abs !== pageUrl) found.push(abs);
    } catch (e) { /* not a URL */ }
  };
  const h = String(html || "");
  for (const m of h.matchAll(/<link\b[^>]*>/gi)) {
    if (!/type\s*=\s*["']?text\/calendar/i.test(m[0])) continue;
    const href = m[0].match(/href\s*=\s*["']([^"']+)["']/i); if (href) add(href[1]);
  }
  for (const m of h.matchAll(/href\s*=\s*["']([^"']*?(?:\.ics(?:[?#][^"']*)?|[?&](?:amp;)?ical=1[^"']*))["']/gi)) add(m[1]);
  for (const m of h.matchAll(/calendar\.google\.com\/calendar\/(?:u\/\d+\/)?embed\?([^"'<>\s]+)/gi)) {
    for (const kv of decodeEntities(m[1]).split("&")) {
      const [k, v] = kv.split("=");
      if (k === "src" && v) { let id = v; try { id = decodeURIComponent(v); } catch (e) { /* keep */ } add(`https://calendar.google.com/calendar/ical/${encodeURIComponent(id)}/public/basic.ics`); }
    }
  }
  for (const m of h.matchAll(/calendar\.google\.com\/calendar\/ical\/([^"'<>\s/]+)\/public\/basic\.ics/gi)) add(`https://calendar.google.com/calendar/ical/${m[1]}/public/basic.ics`);
  for (const m of h.matchAll(/calendar\.google\.com\/calendar\/[^"'<>\s]*?[?&](?:amp;)?cid=([A-Za-z0-9_=%+/-]+)/gi)) {
    try { const id = Buffer.from(decodeURIComponent(m[1]), "base64").toString("utf8"); if (/^[\w.%+-]+@[\w.-]+$/.test(id)) add(`https://calendar.google.com/calendar/ical/${encodeURIComponent(id)}/public/basic.ics`); } catch (e) { /* not base64 */ }
  }
  if (/tribe-events|tribe_events|\/plugins\/the-events-calendar\//i.test(h) && !found.some((u) => /[?&]ical=1/.test(u))) {
    try { const u = new URL(pageUrl); u.searchParams.set("ical", "1"); add(u.href); } catch (e) { /* skip */ }
  }
  // whole calendars before single-event files: Google's basic.ics and <link rel=alternate>, then ?ical=1, then any .ics
  const rank = (u) => (/calendar\.google\.com\/calendar\/ical\//i.test(u) ? 0 : /[?&]ical=1/i.test(u) ? (/\/events?\/?(?:list\/?)?\?/i.test(u) ? 1 : 2) : 3);
  return found.filter((u) => /^https?:/i.test(u)).map((u, i) => ({ u, i, r: rank(u) })).sort((a, b) => a.r - b.r || a.i - b.i).map((x) => x.u).slice(0, 3);
}
function meetupIcal(u) {
  const m = String(u || "").match(/^https?:\/\/(?:www\.)?meetup\.com\/([A-Za-z0-9_-]+)(?:\/|$)/i);
  if (!m || /^(?:find|topics|cities|apps|pro|lp|help|login|register|blog|about|media|terms|privacy)$/i.test(m[1])) return null;
  return `https://www.meetup.com/${m[1]}/events/ical/`;
}

// ---------- fetching ----------
function acceptLanguage(langs) {
  const l = [...new Set((langs || []).filter((x) => /^[a-z]{2,3}$/.test(x)))];
  if (!l.length || (l.length === 1 && l[0] === "en")) return "en-US,en;q=0.9";
  const parts = l.map((x, i) => (i === 0 ? x : `${x};q=0.9`));
  if (!l.includes("en")) parts.push("en;q=0.8");
  return parts.join(",");
}
class Fetcher {
  constructor({ concurrency = 8, gapMs = 1000, timeoutMs = 20000, offline = null, log = () => {} } = {}) {
    Object.assign(this, { concurrency, gapMs, timeoutMs, log });
    this.cache = new Map(); this.queues = new Map(); this.busy = new Set(); this.nextAt = new Map();
    this.running = 0; this.timer = null; this.count = 0;
    this.proxied = !!(process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy));
    if (offline) {
      const file = path.join(offline, "fixtures.json");
      this.fixtures = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
      this.offlineDir = offline; this.gapMs = 0;
    }
  }
  get(url, opts = {}) {
    if (this.cache.has(url)) return this.cache.get(url);
    const p = new Promise((resolve) => {
      const host = hostOf(url) || url;
      if (!this.queues.has(host)) this.queues.set(host, []);
      this.queues.get(host).push({ url, opts, resolve });
      this.pump();
    });
    this.cache.set(url, p);
    return p;
  }
  pump() {
    while (this.running < this.concurrency) {
      const now = Date.now();
      let pick = null, wait = Infinity;
      for (const [host, q] of this.queues) {
        if (!q.length || this.busy.has(host)) continue;
        const t = this.nextAt.get(host) || 0;
        if (t <= now) { if (!pick || q.length > this.queues.get(pick).length) pick = host; }
        else wait = Math.min(wait, t - now);
      }
      if (!pick) {
        if (wait < Infinity && !this.timer) this.timer = setTimeout(() => { this.timer = null; this.pump(); }, wait + 5);
        return;
      }
      const task = this.queues.get(pick).shift();
      this.busy.add(pick); this.running++;
      this.run(task).then((res) => task.resolve(res), (e) => task.resolve({ url: task.url, error: { code: "internal", message: e.message } }))
        .finally(() => { this.busy.delete(pick); this.nextAt.set(pick, Date.now() + this.gapMs); this.running--; this.pump(); });
    }
  }
  async run(task) {
    const t0 = Date.now();
    let res = await this.once(task);
    if (res.error && res.error.retry) {
      await sleep(this.offlineDir ? 0 : Math.max(this.gapMs, 1500));
      res = await this.once(task); res.retried = true;
    }
    res.ms = Date.now() - t0; this.count++;
    this.log(`${res.status || (res.error && res.error.code) || "?"} ${task.url}`);
    return res;
  }
  async once({ url, opts }) {
    if (this.offlineDir) return this.fixture(url);
    const headers = { "user-agent": UA, accept: ACCEPT, "accept-language": opts.lang || "en-US,en;q=0.9", "cache-control": "no-cache" };
    const signal = AbortSignal.timeout(this.timeoutMs);
    const hops = [];
    let cur = url, r;
    try {
      for (let i = 0; ; i++) {
        r = await fetch(cur, { redirect: "manual", signal, headers });
        const loc = r.headers.get("location");
        if ([301, 302, 303, 307, 308].includes(r.status) && loc) {
          if (i >= 8) return { url, status: r.status, hops, final_url: cur, error: { code: "too-many-redirects", retry: false } };
          hops.push({ status: r.status, url: cur });
          try { await r.body?.cancel(); } catch (e) { /* ignore */ }
          cur = new URL(loc, cur).href;
          continue;
        }
        break;
      }
      const type = (r.headers.get("content-type") || "").toLowerCase();
      const buf = await readCapped(r);
      return { url, status: r.status, type, hops, final_url: cur, buf };
    } catch (e) {
      const code = e.name === "TimeoutError" || e.name === "AbortError" ? "timeout" : (e.cause && (e.cause.code || e.cause.name)) || "network";
      return { url, hops, final_url: cur, error: { code: String(code), message: String((e.cause && e.cause.message) || e.message).slice(0, 160), retry: true, dns: code === "ENOTFOUND" && !this.proxied } };
    }
  }
  fixture(url) {
    const hops = [];
    let cur = url;
    for (let i = 0; i < 10; i++) {
      const f = this.fixtures[cur];
      if (!f) return { url, hops, final_url: cur, error: { code: "no-fixture", message: `no fixture for ${cur}`, retry: false } };
      if (f.error) return { url, hops, final_url: cur, error: { code: f.error, message: f.error, retry: false, dns: f.error === "ENOTFOUND" } };
      if (f.location && [301, 302, 303, 307, 308].includes(f.status)) { hops.push({ status: f.status, url: cur }); cur = new URL(f.location, cur).href; continue; }
      const body = f.file ? fs.readFileSync(path.join(this.offlineDir, f.file)) : Buffer.from(f.body || "", "utf8");
      return { url, status: f.status || 200, type: (f.type || "text/html; charset=utf-8").toLowerCase(), hops, final_url: cur, buf: body };
    }
    return { url, hops, final_url: cur, error: { code: "too-many-redirects", retry: false } };
  }
}
async function readCapped(r) {
  if (!r.body) return Buffer.alloc(0);
  const reader = r.body.getReader();
  const chunks = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(Buffer.from(value)); total += value.length;
    if (total >= MAX_BYTES) { try { await reader.cancel(); } catch (e) { /* ignore */ } break; }
  }
  return Buffer.concat(chunks);
}
function decodeBody(buf, type) {
  let cs = (type.match(/charset=["']?([\w-]+)/i) || [])[1];
  if (!cs) {
    const head = buf.subarray(0, 4096).toString("latin1");
    cs = (head.match(/<meta[^>]+charset=["']?([\w-]+)/i) || head.match(/encoding=["']([\w-]+)["']/i) || [])[1];
  }
  try { return new TextDecoder((cs || "utf-8").toLowerCase()).decode(buf); } catch (e) { return new TextDecoder("utf-8").decode(buf); }
}

// What came back, read once per URL (shared by every ride that uses it)
function digest(res, today) {
  const d = { status: res.status || null, final_url: res.final_url || res.url, hops: res.hops || [], error: res.error || null };
  if (res.error) return d;
  const type = res.type || "", buf = res.buf || Buffer.alloc(0);
  d.bytes = buf.length;
  if (/application\/pdf/.test(type) || buf.subarray(0, 5).toString("latin1") === "%PDF-") { d.kind = "pdf"; d.fp_page = sha1(buf); return d; }
  if (/^(?:image|audio|video|font)\//.test(type) || /application\/(?:zip|octet-stream)/.test(type)) { d.kind = "other"; d.fp_page = sha1(buf); return d; }
  const text = decodeBody(buf, type);
  if (/text\/calendar/.test(type) || ICS.looksLikeICS(text)) {
    d.kind = "ics";
    try { const cal = ICS.parse(text); d.cal = { name: cal.name, events: cal.events }; } catch (e) { d.cal = { name: null, events: [] }; }
    d.fp_page = sha1(text.replace(/^DTSTAMP[^\n]*$/gm, ""));
    return d;
  }
  if (/json/.test(type) && /^\s*[[{]/.test(text)) { d.kind = "json"; d.fp_page = sha1(text); d.body = ""; return d; }
  const isXml = /xml|rss|atom/.test(type) && !/html/.test(type);
  d.kind = isXml ? "xml" : "html";
  const html = isXml ? decodeEntities(text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")) : text;
  d.title = titleOf(html);
  d.body = htmlToText(html);
  d.fp_page = sha1(flat(d.body));
  d.challenge = CHALLENGE.test(text.slice(0, 200000));
  d.parked = (PARKED.test(flat(d.body).slice(0, 20000)) && d.body.length < 4000) || d.hops.some((h) => PARKING_HOSTS.test(hostOf(h.url))) || PARKING_HOSTS.test(hostOf(d.final_url));
  d.login = LOGIN_PATH.test((() => { try { return new URL(d.final_url).pathname; } catch (e) { return ""; } })()) && !LOGIN_PATH.test((() => { try { return new URL(res.url).pathname; } catch (e) { return ""; } })());
  if (!isXml) {
    d.jsonld = jsonLdEvents(html);
    d.feeds = discoverFeeds(html, d.final_url);
    if (isStravaEvent(res.url)) d.strava = stravaEvent(html, d.body, today);
  }
  return d;
}
function classify(d, url) {
  if (d.error) {
    if (d.error.dns) return { cls: "gone", why: "dns" };
    return { cls: "error", why: d.error.code };
  }
  const s = d.status;
  const tiny = (d.bytes || 0) < 2500 || (d.kind === "html" && (d.body || "").length < 200);
  if (s === 404 || s === 410) return { cls: "gone", why: String(s) };
  if ([202, 403, 429, 503].includes(s) && (d.challenge || tiny)) return { cls: "bot-wall", why: String(s) };
  if (s >= 400) return { cls: "error", why: String(s) };
  if (s >= 300) return { cls: "error", why: "redirect" };
  if (d.parked) return { cls: "gone", why: "parked" };
  if (d.challenge && tiny) return { cls: "bot-wall", why: "challenge" };
  if (d.login) return { cls: "bot-wall", why: "login" };
  if (isStravaEvent(url) && !/\/group_events\/\d+/.test(d.final_url || "")) return { cls: "gone", why: "strava-event-deleted" };
  return { cls: "ok", why: null };
}
function movedHome(d, url) {
  if (!d.hops || !d.hops.length) return false;
  if (!d.hops.some((h) => h.status === 301 || h.status === 308)) return false;
  let from, to;
  try { from = new URL(url); to = new URL(d.final_url); } catch (e) { return false; }
  if (!HOME_PATH.test(to.pathname) || to.search.length > 1) return false;
  if (bareHost(url) !== bareHost(d.final_url)) return true;
  return !HOME_PATH.test(from.pathname);   // a deep page that now sends you to the homepage
}

// ---------- one ride ----------
function urlsFor(ride, prev) {
  const tasks = [];
  const add = (url, role, extra = {}) => {
    if (!url || typeof url !== "string" || !/^https?:\/\//i.test(url.trim())) return;
    url = url.trim();
    if (tasks.some((t) => t.url === url)) return;
    tasks.push({ url, role, ...extra });
  };
  const rf = ride.refresh || {}, links = ride.links || {};
  add(rf.feed_url, "feed");
  add(rf.watch_url || (ride.sources || [])[0] || links.website, "watch");
  if (!rf.feed_url) for (const u of [rf.watch_url, links.meetup, links.website, ...(ride.sources || [])]) { const ical = meetupIcal(u); if (ical) { add(ical, "feed", { derived: true }); break; } }
  for (const u of [...(ride.sources || []), ...(links.other || []), links.strava]) if (isStravaEvent(u)) add(u, "strava");
  if (!rf.feed_url && prev && prev.feed_candidate && prev.feed_candidate.url) add(prev.feed_candidate.url, "candidate");
  return tasks.map((t) => ({ ...t, social: S.isSocial(t.url) && !isStravaEvent(t.url) }));
}
const URL_KEYS = ["url", "role", "derived", "class", "status", "why", "since", "final_url", "fail_streak", "fail_since", "dns_streak", "dns_since", "last_ok",
  "kind", "fp_page", "fp_schedule", "schedule_text", "time_present", "day_present", "end_words", "base", "event", "feed", "cond"];
const RIDE_KEYS = ["feed_seen", "feed_next", "feed_via", "feed_src", "feed_candidate", "flags", "reports", "urls"];
const FLAG_KEYS = ["code", "severity", "since", "detail", "url", "was", "now", "resolved", "resolved_at", "resolved_by"];
function ordered(o, keys) {
  const out = {};
  for (const k of keys) if (o[k] !== undefined) out[k] = o[k];
  for (const k of Object.keys(o)) if (!(k in out) && o[k] !== undefined) out[k] = o[k];
  return out;
}
function diffExcerpt(a, b, ctx = 10, max = 360) {
  const A = String(a || "").split(/\s+/).filter(Boolean), B = String(b || "").split(/\s+/).filter(Boolean);
  let i = 0; while (i < A.length && i < B.length && A[i] === B[i]) i++;
  let j = 0; while (j < A.length - i && j < B.length - i && A[A.length - 1 - j] === B[B.length - 1 - j]) j++;
  const cut = (W) => {
    const s = Math.max(0, i - ctx), e = Math.min(W.length, W.length - j + ctx);
    let t = W.slice(s, e).join(" ");
    if (s > 0) t = "… " + t;
    if (e < W.length) t += " …";
    return clip(t, max);
  };
  return { was: cut(A), now: cut(B) };
}

/*
  Read one URL for one ride: class, fingerprints against the accepted baseline, proof of life,
  conditions. `prevU` is last run's record for the same URL; `ctx` has today, the ride's
  verified_on, its flags, and whether a feed proved the ride this run (that explains a page whose
  dates rolled forward).
*/
function analyze(ride, task, d, prevU, ctx) {
  const { today } = ctx;
  const u = { url: task.url, role: task.role };
  if (task.derived) u.derived = true;
  const out = { u, proof: null, conds: {}, candidates: [] };
  if (task.social) { u.class = "social"; return out; }
  const { cls, why } = classify(d, task.url);
  const prevCls = prevU && prevU.class;
  Object.assign(u, { class: cls, status: d.status, why: why || undefined, since: prevCls === cls && prevU.since ? prevU.since : today });
  if (d.final_url && d.final_url !== task.url) u.final_url = d.final_url;
  if (cls === "error" || cls === "bot-wall") {
    u.fail_streak = ((prevU && prevU.fail_streak) || 0) + 1;
    u.fail_since = prevU && prevU.fail_streak ? prevU.fail_since : today;
  }
  if (why === "dns") { u.dns_streak = ((prevU && prevU.dns_streak) || 0) + 1; u.dns_since = prevU && prevU.dns_streak ? prevU.dns_since : today; }
  if (cls !== "ok") u.last_ok = prevCls === "ok" ? (ctx.prevRun || prevU.since) : (prevU && prevU.last_ok) || undefined;
  // carry the last good reading while this one failed
  const carry = (keys) => { if (prevU) for (const k of keys) if (prevU[k] !== undefined) u[k] = prevU[k]; };
  const cond = (code, on, info = {}) => {
    const since = (prevU && prevU.cond && prevU.cond[code]) || today;
    if (on) (u.cond = u.cond || {})[code] = since;
    out.conds[code] = on ? { on: true, since, ...info } : { on: false };
  };
  if (cls !== "ok") {
    carry(["kind", "fp_page", "fp_schedule", "schedule_text", "time_present", "day_present", "end_words", "base", "event", "feed"]);
    if (prevU && prevU.cond) u.cond = prevU.cond;
    if (cls === "gone" && why !== "dns") out.conds["page-gone"] = { on: true, since: u.since, detail: goneDetail(why, task.url, d) };
    if (why === "dns" && u.dns_streak >= 2) out.conds["page-gone"] = { on: true, since: u.dns_since, detail: `the host's domain (${hostOf(task.url)}) hasn't resolved for ${u.dns_streak} runs` };
    return out;
  }
  out.conds["page-gone"] = { on: false };
  u.kind = d.kind;
  u.fp_page = d.fp_page;
  const moved = movedHome(d, task.url);
  if (task.role === "watch") cond("moved", moved, { detail: `${task.url} now sends you to ${d.final_url}` });

  // dated sources: ICS, Strava, JSON-LD
  const proof = (via, o) => ({ via, url: task.url, next: o.date, time: o.time || null, summary: clip(o.summary || o.title || "", 120) });
  if (d.kind === "ics") {
    const occ = ICS.occurrences(d.cal, addDays(today, -1), addDays(today, ICS_DAYS));
    const m = matchEvents(occ, ride, today, ICS_DAYS, { hostFeed: /meetup\.com\/[^/]+\/events\/ical/i.test(task.url), otherCities: ctx.otherCities, siblings: ctx.siblings });
    u.feed = { events: m.window, matched: m.matches.length, next: m.matches[0] ? `${m.matches[0].date}${m.matches[0].time ? " " + m.matches[0].time : ""}` : null };
    // a found feed is kept as a candidate only if it is a calendar (2+ events or a repeat rule), not one event's .ics
    const isFeed = d.cal.events.length >= 2 || d.cal.events.some((e) => e.rrule);
    if (m.matches.length) out.proof = proof((task.role === "candidate" || task.discovered) && isFeed ? "candidate" : "ics", m.matches[0]);
    cond("feed-mismatch", !!m.mismatch, m.mismatch ? mismatchInfo(ride, m.mismatch, "The host's calendar") : {});
    cond("feed-drift", !!m.drift, m.drift ? mismatchInfo(ride, m.drift, "The host's calendar") : {});
    return out;
  }
  if (d.strava) {
    const e = d.strava;
    u.event = { date: e.date, time: e.time, title: e.title || undefined };
    const horizon = ["monthly", "irregular"].includes(ride.frequency) ? ICS_DAYS : F.POLICY.FEED_FRESH_DAYS;
    const dayOk = !(ride.days || []).length || ride.days.includes(weekdayOf(e.date));
    const start = toMin(S.startOn(ride, e.date)), t = toMin(e.time);
    const timeOk = start == null || t == null || Math.abs(start - t) <= TIME_SLACK;
    const within = e.date <= addDays(today, horizon);
    cond("event-date-past", !!e.past, { detail: `the Strava event's date is ${fmtDay(e.date)}, which has passed; the ride may have ended` });
    if (!e.past && within && dayOk && timeOk) out.proof = proof("strava", { ...e, summary: e.title });
    const drifted = out.proof && start != null && t != null && Math.abs(start - t) >= DRIFT_MIN && !scheduleMentions(ride, e.time);
    cond("feed-drift", !!drifted, drifted ? mismatchInfo(ride, { ...e, summary: e.title }, "The Strava event") : {});
    cond("feed-mismatch", !e.past && within && !(dayOk && timeOk), mismatchInfo(ride, { ...e, summary: e.title }, "The Strava event"));
    cond("next-date-far", !e.past && !within && inSeason(ride, today) && (ride.status || "active") === "active",
      { detail: `the Strava event's next date is ${fmtDay(e.date)}${e.time ? " at " + fmtTime(e.time) : ""}; the ride may be on a break until then` });
  } else if (isStravaEvent(task.url)) {
    u.why = "strava-unreadable";   // the page loaded but the date wasn't where it usually is
  }
  if (d.jsonld && d.jsonld.length) {
    const m = matchEvents(d.jsonld, ride, today, ICS_DAYS, { otherCities: ctx.otherCities, siblings: ctx.siblings });
    if (m.matches.length && !out.proof) {
      out.proof = proof("json-ld", m.matches[0]);
      cond("feed-drift", !!m.drift, m.drift ? mismatchInfo(ride, m.drift, "The host's page") : {});
    }
  }
  if (task.role === "watch" && !d.strava) {
    const p = !out.proof && pastOnly(d.jsonld || [], ride, today);
    cond("event-date-past", !!p, p ? { detail: `the host's page dates this ride ${fmtDay(ICS.toZone(p, ride.tz).date)}, which has passed; it may not be running now` } : {});
  }
  out.candidates = task.role === "watch" ? d.feeds || [] : [];

  // the page text: only the ride's main page (watch) is read for its schedule and end words
  if (d.kind !== "html" && d.kind !== "xml") { carry(["base"]); return out; }
  if (task.role !== "watch") return out;
  const A = ctx.anchors, body = d.body || "", fbody = fold(body);
  const H = [...hits(A.name, fbody, "name"), ...hits(A.host, fbody, "host"), ...hits(A.time, fbody, "time"), ...hits(A.day, fbody, "day"), ...hits(A.abbr, body, "day")]
    .sort((a, b) => a.pos - b.pos);
  // a "not found" page that says nothing about the ride
  if (SOFT404.test(d.title || "") && !H.some((h) => h.type === "name" || h.type === "host")) {
    Object.assign(u, { class: "gone", why: "soft-404", since: prevCls === "gone" && prevU.since ? prevU.since : today });
    out.conds["page-gone"] = { on: true, since: u.since, detail: goneDetail("soft-404", task.url, d) };
    carry(["fp_schedule", "schedule_text", "time_present", "day_present", "end_words", "base"]);
    return out;
  }
  const calendarLike = countDates(fbody) >= 6;
  const cur = {
    fp: scheduleFingerprint(body, A, calendarLike),
    text: scheduleText(body, H),
    time_present: A.time ? (A.time.lastIndex = 0, A.time.test(fbody)) : null,
    day_present: H.some((h) => h.type === "day"),
    ends: endWords(body, fbody, H.filter((h) => h.type === "name" || h.type === "host").length ? H.filter((h) => h.type === "name" || h.type === "host") : H.filter((h) => h.type === "time")),
  };
  Object.assign(u, { fp_schedule: cur.fp, schedule_text: cur.text || undefined, time_present: cur.time_present === null ? undefined : cur.time_present, day_present: cur.day_present });
  const curWords = cur.ends.map((x) => x.word);
  if (curWords.length) u.end_words = curWords;
  // the accepted baseline: last run's reading, or what a person accepted
  const hadReading = prevU && prevU.fp_schedule;
  const base = prevU && prevU.base ? { ...prevU.base } : hadReading
    ? { fp: prevU.fp_schedule, text: prevU.schedule_text || "", time_present: prevU.time_present !== false, end_words: prevU.end_words || [] }
    : { fp: cur.fp, text: cur.text, time_present: cur.time_present !== false, end_words: curWords };
  const explained = !!(ctx.proofThisRun || out.proof);   // the host's own feed (or this page's own date) shows the ride on its day and time this week
  // schedule lines
  if (cur.fp !== base.fp) {
    base.fp_changed_on = base.fp_changed_on || today;
    if (explained || ctx.suppressed("schedule-text-changed", base.fp_changed_on)) { base.fp = cur.fp; base.text = cur.text; delete base.fp_changed_on; }
  } else delete base.fp_changed_on;
  if (cur.fp !== base.fp) {
    const x = diffExcerpt(base.text, cur.text);
    out.conds["schedule-text-changed"] = { on: true, since: base.fp_changed_on, detail: `the schedule text on ${task.url} changed`, was: x.was, now: x.now };
  } else out.conds["schedule-text-changed"] = { on: false };
  // the start time
  if (cur.time_present === false && base.time_present) {
    base.time_gone_on = base.time_gone_on || today;
    if (explained || ctx.suppressed("time-missing", base.time_gone_on)) { base.time_present = false; delete base.time_gone_on; }
  } else { base.time_present = cur.time_present !== false; delete base.time_gone_on; }
  out.conds["time-missing"] = base.time_gone_on
    ? { on: true, since: base.time_gone_on, detail: `${fmtTime(ride.start_hhmm)} no longer appears on ${task.url}` } : { on: false };
  // end words: only new ones count; a ride whose feed shows it this week isn't ending
  const fresh = curWords.filter((w) => !(base.end_words || []).includes(w));
  if (fresh.length) {
    base.end_new_on = base.end_new_on || today;
    if (explained || ctx.suppressed("end-words", base.end_new_on)) { base.end_words = curWords; delete base.end_new_on; }
  } else { base.end_words = curWords; delete base.end_new_on; }
  const newEnds = cur.ends.filter((x) => !(base.end_words || []).includes(x.word));
  out.conds["end-words"] = newEnds.length
    ? { on: true, since: base.end_new_on, detail: `"${newEnds.map((x) => x.word).join('", "')}" near the ride's name: ${newEnds[0].context}` } : { on: false };
  // keep the baseline only while it differs from what the page says now
  const same = base.fp === cur.fp && base.time_present === (cur.time_present !== false) && JSON.stringify(base.end_words || []) === JSON.stringify(curWords);
  if (!same) u.base = ordered({ fp: base.fp, text: base.text || "", time_present: base.time_present, end_words: base.end_words || [], fp_changed_on: base.fp_changed_on, time_gone_on: base.time_gone_on, end_new_on: base.end_new_on },
    ["fp", "text", "time_present", "end_words", "fp_changed_on", "time_gone_on", "end_new_on"]);
  return out;
}
function goneDetail(why, url, d) {
  if (why === "parked") return `${hostOf(url)} looks parked or for sale (${d.final_url || url})`;
  if (why === "soft-404") return `${url} says "page not found"${d.title ? ` ("${clip(d.title, 60)}")` : ""}`;
  if (why === "strava-event-deleted") return `the Strava event ${url} is gone (it now opens the club page)`;
  return `${url} answers ${why}`;
}
function mismatchInfo(ride, o, who) {
  const listed = `${(ride.days || []).map((x) => DAYLONG[x]).join(" / ") || "no day"}${ride.start_hhmm ? " " + fmtTime(ride.start_hhmm) : ""}`;
  const shows = `${fmtDay(o.date)}${o.time ? " " + fmtTime(o.time) : ""}${o.summary ? ` ("${clip(o.summary, 80)}")` : ""}`;
  return { detail: `${who} shows ${shows}; we list ${listed}`, was: listed, now: shows };
}
function inSeason(ride, day) {
  const sm = ride.season_months;
  if (!sm || !sm.start || !sm.end) return true;
  const m = +day.slice(5, 7);
  return sm.start <= sm.end ? m >= sm.start && m <= sm.end : m >= sm.start || m <= sm.end;
}

const SEVERITY = { "page-gone": "red", "end-words": "red", "schedule-text-changed": "amber", "time-missing": "amber", "event-date-past": "amber", "next-date-far": "amber", unreachable: "amber", moved: "amber" };
/*
  Put one ride's readings together: proof of life, then the flags. Returns the new health entry.
*/
function assembleRide(ride, prev, results, ctx) {
  const { today } = ctx;
  const entry = {};
  for (const k of ["feed_seen", "feed_next", "feed_via", "feed_src", "feed_candidate"]) if (prev && prev[k] !== undefined) entry[k] = prev[k];
  entry.flags = prev && Array.isArray(prev.flags) ? prev.flags.map((f) => ({ ...f })) : [];
  if (prev && Array.isArray(prev.reports) && prev.reports.length) entry.reports = prev.reports;
  entry.urls = results.map((x) => ordered(x.u, URL_KEYS));
  // proof of life
  const proofs = results.map((x) => x.proof).filter(Boolean).sort((a, b) => a.next.localeCompare(b.next));
  if (proofs.length) {
    const p = proofs[0];
    Object.assign(entry, { feed_seen: today, feed_next: p.next + (p.time ? " " + p.time : ""), feed_via: p.via, feed_src: p.url });
    const cand = proofs.find((x) => x.via === "candidate");
    if (cand) entry.feed_candidate = { url: cand.url, found: prev && prev.feed_candidate && prev.feed_candidate.url === cand.url ? prev.feed_candidate.found : today, next: cand.next };
  }
  // conditions, ride by ride
  const fetchable = results.filter((x) => x.u.class !== "social");
  const primary = results.find((x) => x.u.role === "watch" && x.u.class !== "social") || fetchable.find((x) => x.u.role !== "strava") || null;
  const states = {};
  const set = (code, st) => { if (!states[code] || st.on) states[code] = st; };
  const pick = (x, code) => x && x.conds[code];
  // page-gone: the ride's main page, or any Strava event of it
  const pg = pick(primary, "page-gone");
  if (pg) set("page-gone", pg);
  for (const x of results.filter((r) => r.u.role === "strava")) { const c = pick(x, "page-gone"); if (c && c.on) set("page-gone", c); }
  for (const code of ["end-words", "time-missing", "moved"]) { const c = pick(primary, code); if (c) set(code, c); }
  // the schedule: the page's lines changed, or the host's own dates show another day or time
  const drift = results.map((x) => x.conds["feed-drift"]).find((c) => c && c.on);
  const mismatch = results.map((x) => x.conds["feed-mismatch"]).find((c) => c && c.on);
  const page = pick(primary, "schedule-text-changed");
  if (drift) set("schedule-text-changed", drift);
  else if (proofs.length) set("schedule-text-changed", { on: false });          // the host's own date, on our day and time
  else if (page && page.on) set("schedule-text-changed", page);
  else if (mismatch) set("schedule-text-changed", mismatch);
  else if (page) set("schedule-text-changed", { on: false });
  // dates that passed, or a next date weeks away: on if any URL says so, off if one looked and didn't —
  // and off when the host's own feed shows the ride this week (a stale event link isn't a rider's problem)
  for (const code of ["event-date-past", "next-date-far"]) {
    const cs = results.map((x) => x.conds[code]).filter(Boolean);
    if (proofs.length) set(code, { on: false });
    else if (cs.some((c) => c.on)) set(code, cs.find((c) => c.on));
    else if (cs.length) set(code, { on: false });
  }
  // unreachable: every URL we can read has failed three runs running
  if (fetchable.length) {
    const failing = fetchable.filter((x) => x.u.class === "error" || x.u.class === "bot-wall");
    if (failing.length === fetchable.length && failing.every((x) => x.u.fail_streak >= 3)) {
      set("unreachable", { on: true, since: failing.map((x) => x.u.fail_since).sort().pop(), detail: `no page for this ride has loaded for ${Math.min(...failing.map((x) => x.u.fail_streak))} runs (${[...new Set(failing.map((x) => x.u.why || x.u.class))].join(", ")})` });
    } else if (fetchable.some((x) => x.u.class === "ok" || x.u.class === "gone")) set("unreachable", { on: false });
  }
  // flags: raise once, re-date one a same-day check made invisible, resolve what cleared
  const verified = isDate(ride.verified_on) ? ride.verified_on : null;
  const newFlags = [];
  for (const [code, st] of Object.entries(states)) {
    const open = entry.flags.filter((f) => !f.resolved && f.code === code);
    if (st.on) {
      if (ctx.suppressed(code, st.since)) { for (const f of open) Object.assign(f, { resolved: true, resolved_at: verified || today, resolved_by: "re-check" }); continue; }
      const info = { detail: st.detail || undefined, was: st.was || undefined, now: st.now || undefined };
      if (open.length) {
        const f = open[0];
        if (verified && !(f.since > verified)) f.since = today;
        for (const [k, v] of Object.entries(info)) if (v !== undefined) f[k] = v;
      } else {
        entry.flags.push({ code, severity: SEVERITY[code] || "amber", since: today, ...info });
        newFlags.push(code);
      }
    } else for (const f of open) Object.assign(f, { resolved: true, resolved_at: today, resolved_by: "watch" });
  }
  entry.flags = entry.flags.filter((f) => !f.resolved || !isDate(f.resolved_at) || F.daysBetween(f.resolved_at, today) <= RESOLVED_KEEP_DAYS).map((f) => ordered(f, FLAG_KEYS));
  if (!entry.flags.length) delete entry.flags;
  return { entry: ordered(entry, RIDE_KEYS), newFlags, proof: proofs[0] || null };
}
// Has a person looked since this condition began? (verified_on after it, or rides-apply resolved it)
function suppressor(ride, prevFlags) {
  const verified = isDate(ride.verified_on) ? ride.verified_on : null;
  return (code, since) => {
    if (!isDate(since)) return false;
    if (verified && verified > since) return true;
    return (prevFlags || []).some((f) => f.code === code && f.resolved && f.resolved_by === "re-check" && isDate(f.resolved_at) && since <= f.resolved_at);
  };
}

// ---------- the run ----------
async function run(opts = {}) {
  const t0 = Date.now();
  const today = opts.today || new Date().toISOString().slice(0, 10);
  const dataFile = opts.data || path.join(ROOT, "cfc-site", "rides", "rides.json");
  const healthFile = opts.health || path.join(ROOT, "data", "rides-health.json");
  const outDir = opts.outDir || path.join(ROOT, "data");
  const rides = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  let prevHealth = { rides: {} };
  try { prevHealth = JSON.parse(fs.readFileSync(healthFile, "utf8")); if (!prevHealth.rides) prevHealth.rides = {}; } catch (e) { /* first run */ }
  const prevRun = prevHealth.generated_at ? String(prevHealth.generated_at).slice(0, 10) : null;

  const only = opts.only ? new Set(opts.only) : null;
  let pickList = rides.filter((r) => r && r.slug && (r.status || "active") !== "ended");
  if (only) pickList = pickList.filter((r) => only.has(r.slug));
  if (opts.country) pickList = pickList.filter((r) => String(r.country || "US").toUpperCase() === opts.country.toUpperCase());
  if (opts.state) pickList = pickList.filter((r) => String(r.state || "").toUpperCase() === opts.state.toUpperCase());
  if (opts.limit) pickList = pickList.slice(0, opts.limit);
  const filtered = !!(only || opts.country || opts.state || opts.limit);

  const fetcher = new Fetcher({ concurrency: opts.concurrency || 8, offline: opts.offline || null, log: opts.verbose ? (s) => console.log("  fetched " + s) : () => {} });
  const plan = pickList.map((ride) => ({ ride, prev: prevHealth.rides[ride.slug] || null, tasks: urlsFor(ride, prevHealth.rides[ride.slug]) }));
  // 1. every URL once
  const digests = new Map();
  const want = (task, ride) => {
    if (task.social || digests.has(task.url)) return;
    const lang = isStravaEvent(task.url) ? "en-US,en;q=0.9" : acceptLanguage(ride.language);
    digests.set(task.url, fetcher.get(task.url, { lang }).then((res) => digest(res, today)));
  };
  for (const p of plan) for (const t of p.tasks) want(t, p.ride);
  await Promise.all(digests.values());
  // 2. feeds the pages point at, for rides with none
  for (const p of plan) {
    const rf = p.ride.refresh || {};
    if (rf.feed_url || p.tasks.some((t) => t.role === "candidate" || t.derived)) continue;
    const w = p.tasks.find((t) => t.role === "watch" && !t.social);
    if (!w) continue;
    const d = await digests.get(w.url);
    if (!d || d.error || d.kind !== "html" || !(d.feeds || []).length) continue;
    for (const f of d.feeds.slice(0, 2)) if (!p.tasks.some((t) => t.url === f)) { const t = { url: f, role: "candidate", discovered: true, social: false }; p.tasks.push(t); want(t, p.ride); }
  }
  await Promise.all(digests.values());

  // 3. read every ride. The other cities near each ride, so a feed's "DURHAM ride" isn't taken for the Raleigh one.
  const citiesBy = new Map();
  for (const r of rides) {
    if (!r || !r.city) continue;
    const k = (r.country || "US") === "US" ? `US-${r.state}` : r.country;
    if (!citiesBy.has(k)) citiesBy.set(k, new Set());
    citiesBy.get(k).add(fold(r.city).replace(/[^\p{L}\p{N}' ]+/gu, " ").replace(/\s+/g, " ").trim());
  }
  const otherCitiesRe = (ride) => {
    const k = (ride.country || "US") === "US" ? `US-${ride.state}` : ride.country;
    const mine = new Set([ride.city, ride.neighborhood].filter(Boolean).map((c) => fold(c).trim()));
    const list = [...(citiesBy.get(k) || [])].filter((c) => c.length > 3 && !mine.has(c) && ![...mine].some((m) => m.includes(c) || c.includes(m)));
    return list.length ? new RegExp(`(?<![\\p{L}\\p{N}])(?:${list.map(reEsc).join("|")})(?![\\p{L}\\p{N}])`, "u") : null;
  };
  // the other rides we list in the same city, by the words that tell them apart from their host
  const byCity = new Map();
  for (const r of rides) if (r && r.city) { const k = `${r.country || "US"}|${fold(r.city).trim()}`; if (!byCity.has(k)) byCity.set(k, []); byCity.get(k).push(r); }
  const siblingsOf = (ride) => (byCity.get(`${ride.country || "US"}|${fold(ride.city || "").trim()}`) || []).filter((o) => o.slug !== ride.slug)
    .map((o) => { const hw = new Set(distinct((o.host && o.host.name) || "", o)); return nameTokens(o).filter((t) => !hw.has(t)); })
    .filter((t) => t.some((x) => !WEAK.has(x)));
  const health = { rides: { ...prevHealth.rides } };
  const stats = { classes: {}, proof: {}, newFlags: {}, candidates: 0, urls: 0 };
  const urlSeen = new Set();
  for (const p of plan) {
    const { ride, prev } = p;
    const prevUrls = new Map(((prev && prev.urls) || []).map((u) => [u.url, u]));
    const ctx = { today, prevRun, anchors: anchorsFor(ride), otherCities: otherCitiesRe(ride), siblings: siblingsOf(ride), suppressed: suppressor(ride, prev && prev.flags), proofThisRun: false };
    const ordered_ = [...p.tasks].sort((a, b) => (a.role === "watch") - (b.role === "watch"));   // feeds first, the page last
    const results = [];
    for (const t of ordered_) {
      const d = t.social ? null : await digests.get(t.url);
      const prevU = prevUrls.get(t.url) || null;
      const r = analyze(ride, t, d || {}, prevU, ctx);
      if (t.discovered && !r.proof) continue;           // a discovered feed that doesn't list the ride isn't kept
      if (r.proof) ctx.proofThisRun = true;
      results.push(r);
    }
    results.sort((a, b) => p.tasks.findIndex((t) => t.url === a.u.url) - p.tasks.findIndex((t) => t.url === b.u.url));
    const { entry, newFlags, proof } = assembleRide(ride, prev, results, ctx);
    health.rides[ride.slug] = entry;
    for (const r of results) { if (!urlSeen.has(r.u.url)) { urlSeen.add(r.u.url); stats.classes[r.u.class] = (stats.classes[r.u.class] || 0) + 1; } }
    if (proof) stats.proof[proof.via] = (stats.proof[proof.via] || 0) + 1;
    if (entry.feed_candidate && entry.feed_candidate.found === today) stats.candidates++;
    for (const c of newFlags) stats.newFlags[c] = (stats.newFlags[c] || 0) + 1;
    if (opts.verbose) printRide(ride, entry, results);
  }
  stats.urls = urlSeen.size;
  // a full run forgets rides that left rides.json
  if (!filtered && !opts.data) for (const slug of Object.keys(health.rides)) if (!rides.some((r) => r.slug === slug)) delete health.rides[slug];
  const sorted = {};
  for (const slug of Object.keys(health.rides).sort()) sorted[slug] = health.rides[slug];

  // the queue
  const q = F.queue(rides.filter((r) => r && r.slug), sorted, today);
  const bySlug = new Map(rides.map((r) => [r.slug, r]));
  const queue = q.map((e) => enrich(e, bySlug.get(e.slug), sorted[e.slug], today));
  const openFlags = {};
  for (const [slug, h] of Object.entries(sorted)) {
    const r = bySlug.get(slug); if (!r) continue;
    for (const f of F.assess(r, h, today).flags) openFlags[f.code] = (openFlags[f.code] || 0) + 1;
  }
  const states = {};
  for (const r of rides) if (r && r.slug) { const s = F.assess(r, sorted[r.slug] || null, today).state; states[s] = (states[s] || 0) + 1; }
  const runtime = Math.round((Date.now() - t0) / 1000);
  const summary = {
    today, rides_checked: plan.length, rides_total: rides.length, urls: stats.urls, fetches: fetcher.count, runtime_s: runtime,
    classes: stats.classes, proof_of_life: { rides: Object.values(stats.proof).reduce((a, b) => a + b, 0), ...stats.proof },
    feed_candidates_new: stats.candidates, flags_new: stats.newFlags, flags_open: openFlags, states, ...(filtered ? { partial: true } : {}),
  };
  const out = { generated_at: new Date(`${today}T${new Date().toISOString().slice(11, 19)}Z`).toISOString(), summary, rides: sorted };
  if (filtered && prevHealth.summary && !prevHealth.summary.partial) out.summary = { ...prevHealth.summary, last_partial: summary };
  const queueDoc = { generated_at: out.generated_at, today, summary, queue };
  const md = queueMarkdown(queueDoc, sorted, rides);
  if (!opts.noWrite) {
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "rides-health.json"), JSON.stringify(out, null, 1) + "\n");
    fs.writeFileSync(path.join(outDir, "rides-queue.json"), JSON.stringify(queueDoc, null, 1) + "\n");
    fs.writeFileSync(path.join(outDir, "rides-queue.md"), md);
  }
  return { health: out, queue: queueDoc, markdown: md, summary, paragraph: paragraph(summary, opts, outDir) };
}
function enrich(e, ride, h, today) {
  const a = F.assess(ride, h || null, today);
  const links = ride.links || {}, rf = ride.refresh || {};
  const urls = ((h && h.urls) || []).map((u) => ordered({ url: u.url, role: u.role, class: u.class, status: u.status, why: u.why, final_url: u.final_url, end_words: u.end_words }, ["url", "role", "class", "status", "why", "final_url", "end_words"]));
  return ordered({
    ...e, us_state: ride.state || null, host: ride.host ? { name: ride.host.name, url: links.website || e.watch_url || null } : null,
    method: rf.method || null, confidence: ride.confidence || null, verified_on: ride.verified_on || null,
    flags: a.flags, reports: a.reports,
    feed: { feed_url: rf.feed_url || null, feed_seen: (h && h.feed_seen) || null, feed_next: (h && h.feed_next) || null, feed_via: (h && h.feed_via) || null, feed_candidate: (h && h.feed_candidate) || null },
    urls,
  }, ["slug", "name", "city", "us_state", "country", "state", "priority", "age_days", "checked_on", "verified_on", "confidence", "reasons", "watch_url", "host", "method", "flags", "reports", "feed", "urls"]);
}
function queueMarkdown(doc, health, rides) {
  const s = doc.summary;
  const n = (o) => Object.entries(o || {}).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(" · ") || "none";
  const L = [];
  L.push(`# Rides to re-check — ${doc.today}`, "");
  L.push(`Written by \`tools/rides-watch.js\` from ${s.rides_total} rides (${s.rides_checked} checked this run, ${s.urls} pages and feeds, ${Math.round(s.runtime_s / 60)} min).`, "");
  L.push(`- **Where the rides stand:** ${n(s.states)}`);
  L.push(`- **Pages:** ${n(s.classes)}`);
  L.push(`- **Proof of life from the hosts' own feeds this week:** ${s.proof_of_life.rides} rides (${n(Object.fromEntries(Object.entries(s.proof_of_life).filter(([k]) => k !== "rides")))}) · new feed candidates: ${s.feed_candidates_new}`);
  L.push(`- **Open flags:** ${n(s.flags_open)} · new this run: ${n(s.flags_new)}`);
  const reports = doc.queue.filter((q) => (q.reports || []).length).length;
  L.push(`- **Rider reports waiting:** ${reports}`, "");
  L.push("Work it with `/rides refresh 40` (or the Monday re-check PR). A ride comes off this list when a person re-checks it at its source; see `tools/RIDES-UPKEEP.md`.", "");
  L.push("## The top 60", "");
  const top = doc.queue.filter((q) => q.priority < F.QUEUE.fresh).slice(0, 60);
  if (!top.length) L.push("Nothing needs a look this week.", "");
  top.forEach((q, i) => {
    const place = q.country === "US" ? `${q.city}, ${q.us_state}` : `${q.city}, ${S.countryName(q.country)}`;
    const why = (q.reports || []).length ? "rider report" : (q.flags || []).some((f) => f.severity === "red") ? "red flag" : (q.flags || []).length ? "amber flag" : q.state;
    const host = q.host ? (q.host.url ? `[${q.host.name}](${q.host.url})` : q.host.name) : "";
    L.push(`${i + 1}. **${why}** — [${q.name}](https://cycleforchange.org/rides/${q.slug}/) · ${place}${host ? ` · ${host}` : ""} · checked ${q.checked_on || "never"}`);
    for (const r of q.reports || []) L.push(`   - ${r.type === "host-update" ? `host says **${r.said || "changed"}**${r.new_time ? ` → ${r.new_time}` : ""}${r.from_date ? ` from ${r.from_date}` : ""}` : `rider says **${r.type}**`} (${r.date})${r.note ? `: "${clip(r.note, 200)}"` : ""}`);
    for (const f of q.flags || []) {
      L.push(`   - \`${f.code}\` since ${f.since}${f.detail ? `: ${clip(f.detail, 240)}` : ""}`);
      if (f.was || f.now) L.push(`     - was: "${clip(f.was, 300)}"`, `     - now: "${clip(f.now, 300)}"`);
    }
    if (!(q.flags || []).length && !(q.reports || []).length) L.push(`   - ${(q.reasons || []).join("; ")}`);
    if (q.watch_url) L.push(`   - watch: ${q.watch_url}`);
  });
  L.push("");
  const broken = [];
  for (const r of rides) {
    const h = health[r.slug]; if (!h || !h.urls) continue;
    for (const u of h.urls) if ((u.role === "feed" || u.role === "candidate") && !u.derived && (u.class === "gone" || (u.fail_streak || 0) >= 3)) broken.push(`- ${r.slug}: ${u.url} (${u.why || u.class})`);
  }
  if (broken.length) L.push("## Feeds that stopped working", "", ...broken.slice(0, 40), "");
  // end words that were already on a page the first time it was read: never flagged (only new ones are), worth one look
  const standing = [];
  for (const r of rides) {
    const h = health[r.slug]; if (!h || !h.urls || (r.status || "active") !== "active") continue;
    const open = (h.flags || []).some((f) => !f.resolved && f.code === "end-words");
    for (const u of h.urls) if (u.role === "watch" && (u.end_words || []).length && !open) standing.push(`- [${r.name}](https://cycleforchange.org/rides/${r.slug}/): "${u.end_words.join('", "')}" on ${u.url}`);
  }
  if (standing.length) L.push("## Words already on the hosts' pages", "", "Not flagged: they were there the first time the watcher read the page (often \"cancelled if it rains\"). Worth one look on the next re-check.", "", ...standing.slice(0, 40), "");
  return L.join("\n");
}
function paragraph(s, opts, outDir) {
  const n = (o) => Object.entries(o || {}).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${v} ${k}`).join(", ") || "none";
  const m = Math.floor(s.runtime_s / 60), sec = s.runtime_s % 60;
  const via = Object.entries(s.proof_of_life).filter(([k]) => k !== "rides").map(([k, v]) => `${k} ${v}`).join(", ");
  return `rides-watch: checked ${s.rides_checked} of ${s.rides_total} rides (${s.urls} pages and feeds) in ${m}m ${sec}s. Pages: ${n(s.classes)}. ` +
    `Proof of life from the hosts' own feeds: ${s.proof_of_life.rides} rides${via ? ` (${via})` : ""}; new feed candidates: ${s.feed_candidates_new}. ` +
    `New flags: ${n(s.flags_new)}. Open flags: ${n(s.flags_open)}. Rides now: ${n(s.states)}. ` +
    (opts.noWrite ? "Nothing written (--no-write)." : `Wrote ${path.relative(process.cwd(), outDir) || "."}/rides-health.json, rides-queue.json, rides-queue.md.`);
}
function printRide(ride, entry, results) {
  console.log(`\n${ride.slug} — ${ride.name} (${ride.city}) days ${(ride.days || []).join(",")} ${ride.start_hhmm || ""}`);
  for (const r of results) {
    const u = r.u;
    console.log(`  [${u.role}] ${u.class}${u.status ? " " + u.status : ""}${u.why ? " (" + u.why + ")" : ""} ${u.url}${u.final_url ? " → " + u.final_url : ""}`);
    if (u.event) console.log(`     strava: ${u.event.date} ${u.event.time} "${u.event.title || ""}"`);
    if (u.feed) console.log(`     feed: ${u.feed.events} events in window, ${u.feed.matched} match, next ${u.feed.next || "—"}`);
    if (r.proof) console.log(`     PROOF via ${r.proof.via}: ${r.proof.next} ${r.proof.time || ""} ${r.proof.summary}`);
    if (u.schedule_text) console.log(`     schedule: ${clip(u.schedule_text, 400)}`);
    if (u.end_words) console.log(`     end words: ${u.end_words.join(", ")}`);
    for (const [k, c] of Object.entries(r.conds)) if (c.on) console.log(`     ${k}: ${c.detail || ""}`);
  }
  for (const f of entry.flags || []) if (!f.resolved) console.log(`  FLAG ${f.code} (${f.severity}) since ${f.since}: ${f.detail || ""}`);
}
function status(opts) {
  const today = opts.today || new Date().toISOString().slice(0, 10);
  const rides = JSON.parse(fs.readFileSync(opts.data || path.join(ROOT, "cfc-site", "rides", "rides.json"), "utf8"));
  let health = { rides: {} };
  try { health = JSON.parse(fs.readFileSync(opts.health || path.join(ROOT, "data", "rides-health.json"), "utf8")); } catch (e) { /* none yet */ }
  const states = {}, flags = {};
  for (const r of rides) { const a = F.assess(r, health.rides[r.slug] || null, today); states[a.state] = (states[a.state] || 0) + 1; for (const f of a.flags) flags[f.code] = (flags[f.code] || 0) + 1; }
  console.log(`${rides.length} rides on ${today}: ${Object.entries(states).map(([k, v]) => `${v} ${k}`).join(", ")}`);
  console.log(`open flags: ${Object.entries(flags).map(([k, v]) => `${v} ${k}`).join(", ") || "none"}`);
  console.log(`last watch run: ${health.generated_at || "never"}${health.summary ? ` (${health.summary.urls} URLs, ${health.summary.proof_of_life.rides} rides proved by feeds)` : ""}`);
  console.log(`rides proved by a feed in the last ${F.POLICY.FEED_FRESH_DAYS} days: ${Object.values(health.rides).filter((h) => isDate(h.feed_seen) && F.daysBetween(h.feed_seen, today) <= F.POLICY.FEED_FRESH_DAYS).length}`);
  for (const q of F.queue(rides, health.rides, today).slice(0, 10)) console.log(`  ${q.state.padEnd(8)} ${q.slug} — ${q.reasons.join("; ") || "fresh"}`);
}

// ---------- CLI ----------
function parseArgs(argv) {
  const args = argv.slice(2);
  const val = (n) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : null; };
  const num = (n) => (val(n) != null && /^\d+$/.test(val(n)) ? +val(n) : null);
  return {
    data: val("--data") ? path.resolve(val("--data")) : null,
    health: val("--health") ? path.resolve(val("--health")) : null,
    outDir: val("--out-dir") ? path.resolve(val("--out-dir")) : null,
    only: val("--only") ? val("--only").split(",").map((s) => s.trim()).filter(Boolean) : null,
    country: val("--country"), state: val("--state"), limit: num("--limit"), concurrency: num("--concurrency"),
    today: /^\d{4}-\d{2}-\d{2}$/.test(val("--today") || "") ? val("--today") : null,
    offline: val("--offline") ? path.resolve(val("--offline")) : null,
    noWrite: args.includes("--no-write"), verbose: args.includes("--verbose"), status: args.includes("--status"),
  };
}
async function main() {
  const opts = parseArgs(process.argv);
  if (opts.status) return status(opts);
  const r = await run(opts);
  console.log(r.paragraph);
}

module.exports = {
  run, analyze, assembleRide, urlsFor, digest, classify, htmlToText, decodeEntities, foldSame, anchorsFor, nameTokens, timeRe, scheduleText,
  scheduleFingerprint, endWords, matchEvents, jsonLdEvents, stravaEvent, resolveYear, discoverFeeds, meetupIcal, acceptLanguage, parseIsoDate, Fetcher,
};
if (require.main === module) {
  // Node's fetch ignores HTTPS_PROXY unless NODE_USE_ENV_PROXY is set (Node ≥ 22.21): re-run with it in a proxied sandbox.
  if ((process.env.HTTPS_PROXY || process.env.https_proxy) && !process.env.NODE_USE_ENV_PROXY && !process.argv.includes("--offline") && !process.argv.includes("--status")) {
    const r = require("child_process").spawnSync(process.execPath, ["--disable-warning=UNDICI-EHPA", ...process.argv.slice(1)], { stdio: "inherit", env: { ...process.env, NODE_USE_ENV_PROXY: "1" } });
    process.exit(r.status == null ? 1 : r.status);
  }
  main().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
}
