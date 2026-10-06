#!/usr/bin/env node
/*
  build-rides.js — generates the Group Rides directory from one data file.

    node tools/build-rides.js            (or: npm run build:rides)

  Reads   cfc-site/rides/rides.json            (the database — edit this)
  Writes  cfc-site/rides/index.html            (search page, every ride listed)
          cfc-site/rides/<st>/index.html       (one hub per state)
          cfc-site/rides/<st>/<city>/index.html (metro hubs where ≥3 rides sit within 25 mi)
          cfc-site/rides/<slug>/index.html     (one page per ride)
          cfc-site/rides/<slug>/ride.ics       (calendar file with the recurrence rule)
          cfc-site/rides/sitemap.xml           (rides-only sitemap, lastmod from the last check)
          cfc-site/rides/<country>/index.html  (the world, Sept 30, 2026: one page per country — /rides/spain/)
          cfc-site/rides/<country>/<city>/     (world city hubs where 2+ rides sit within 40 km)
          cfc-site/rides/united-states/        (the US as a country: the states)
          cfc-site/rides/live.json             (the rides on the lists, slim — /tonight/ and build-events read it)

  Freshness (tools/lib/rides-freshness.js, data/rides-health.json): every card and page says when
  the ride was last checked. Rides past the policy's window, paused, ended or flagged too long drop
  off every list; their own page stays with a banner and noindex (ended ones go after a year).

    node tools/build-rides.js [--data file] [--out dir] [--health file] [--today YYYY-MM-DD] [--history file]

  Oct 6, 2026: also writes cfc-site/_redirects (a generated block: 301s for list paths that stopped being built,
  from data/rides-hubs-history.json, which a real build keeps up to date) — see hubRedirects().

  Plain static HTML. Loads /events/events.css (the Creosote house shared with
  /events/ and /towns/) plus /rides/rides.css for the rides-only bits. Re-run after
  editing rides.json. Generated folders are wiped first so nothing drifts.
*/
"use strict";
const fs = require("fs");
const path = require("path");
const CHROME = require("../scripts/chrome.js"); // shared header, footer, fonts
const BLOCKS = require("../scripts/blocks.js"); // how-it's-built tiles + the ride-report form
const TOWNS = require("../scripts/towns.js");  // the town layer (Sept 30, 2026): the strip on every ride page and city hub that has a guide
const S = require("./lib/rides-schema.js");       // vocabularies, countries (schema v3)
const F = require("./lib/rides-freshness.js");    // what's fresh, what hides, the "Checked" line
const X = require("./lib/ride-facts.js");         // Pass 22: pace, length and e-bike rules read off the ride's own text
const PH = require("../scripts/photos.js");       // Pass 25: Robert's photos, one registry (alt text, place, the figure)

const ROOT = path.join(__dirname, "..");
const argOf = (name) => { const i = process.argv.indexOf(name); return i > -1 ? process.argv[i + 1] : null; };
const ASSETS = path.join(ROOT, "cfc-site", "rides");                  // marks.svg, art/, css, js live here
const OUT = argOf("--out") ? path.resolve(argOf("--out")) : ASSETS;   // where pages are written
const DATA = argOf("--data") ? path.resolve(argOf("--data")) : path.join(ASSETS, "rides.json");
const HEALTH = argOf("--health") ? path.resolve(argOf("--health")) : path.join(ROOT, "data", "rides-health.json");
const COUNTRY_NOTES = path.join(ROOT, "data", "rides-countries.json"); // optional: per-country "what to know"
const EVENTS = path.join(ROOT, "cfc-site", "events", "events.json");
const SITE = "https://cycleforchange.org";
const TODAY = /^\d{4}-\d{2}-\d{2}$/.test(argOf("--today") || "") ? argOf("--today") : new Date().toISOString().slice(0, 10);
const NOW = argOf("--today") ? new Date(`${TODAY}T12:00:00Z`) : new Date();
const WORLD_RADIUS_KM = 40;  // a world city hub covers rides within this radius
const WORLD_HUB_MIN = 2;     // rides needed before a world city gets its own hub
const OG_IMAGE = `${SITE}/og-cfc.png`;
const METRO_RADIUS = 25;   // miles — a city hub covers rides within this radius
const METRO_MIN = 3;       // rides needed before a city gets its own hub
const HUB_GAP = 15;        // miles — two hubs can't sit closer than this (Miami + Fort Lauderdale both survive; suburbs don't)
const OWN_MIN = 8;         // …unless the city has this many rides of its own (Scottsdale beside Phoenix)
const OWN_GAP = 6;         // miles — and sits at least this far from every other hub

const STATE_NAMES = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",
  DE:"Delaware",DC:"Washington, DC",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",
  IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",
  MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",
  NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",
  NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",
  RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",
  VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming",PR:"Puerto Rico"
};
const DAY_LONG = { mon:"Monday", tue:"Tuesday", wed:"Wednesday", thu:"Thursday", fri:"Friday", sat:"Saturday", sun:"Sunday" };
const DAY_IDX = { sun:0, mon:1, tue:2, wed:3, thu:4, fri:5, sat:6 };
const DAY_ICS = { mon:"MO", tue:"TU", wed:"WE", thu:"TH", fri:"FR", sat:"SA", sun:"SU" };
const ORD_WORD = { 1:"First", 2:"Second", 3:"Third", 4:"Fourth", "-1":"Last" };
const DISC_LABEL = { road:"Road", gravel:"Gravel", mtb:"Mountain bike", fixed:"Fixed gear", social:"Social", cruiser:"Cruiser",
  bmx:"BMX", track:"Track", cyclocross:"Cyclocross", ebike:"E-bikes welcome", mixed:"Mixed" };
const TAG_LABEL = { lgbtq:"LGBTQ+", wtf:"Women / trans / femme", bipoc:"BIPOC", beginner:"Beginner friendly",
  "no-drop":"No-drop", family:"Family", adaptive:"Adaptive", youth:"Youth" };
const HOST_TYPE = { shop:"Bike shop", club:"Club", collective:"Collective", nonprofit:"Nonprofit", informal:"Community-run", brand:"Brand", team:"Team" };
const BANNED = /\b(leverage|synergy|passionate about|thrilled to announce|excited to share)\b/i;

// ---------- helpers ----------
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const attr = esc;
const num = (v) => (v == null || v === "" || isNaN(Number(v)) ? null : Number(v));
const slugify = (s) => String(s).toLowerCase().replace(/['’.]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const miles = (a, b) => {
  const R = 3958.8, toR = (d) => (d * Math.PI) / 180;
  const dLat = toR(b.lat - a.lat), dLng = toR(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
const handle = (url) => { const m = String(url || "").match(/instagram\.com\/([A-Za-z0-9_.]+)/); return m ? "@" + m[1] : null; };
// Pass 22: an e-bike rule isn't a kind of ride — the ride page says it as its own fact (E-bikes)
const discLabel = (d) => (d || []).filter((x, i, a) => x !== "ebike" || a.length === 1).map((x) => DISC_LABEL[x] || x).join(" · ");
const isUS = (r) => (r.country || "US") === "US";
const countryName = (cc) => S.countryName(cc);
const countrySlug = (cc) => S.countrySlug(cc);
const THE = new Set(["GB", "US", "AE", "NL", "PH", "BS", "DO", "GM", "MV", "KY", "VG", "VI", "TC", "FO", "CF", "KM", "SC", "MH", "SB", "CD"]);
const theCountry = (cc) => (THE.has(cc) ? "the " : "") + countryName(cc);   // "in the United Kingdom", "in Spain"
const placeText = (r) => (isUS(r) ? `${r.city}, ${r.state}` : `${r.city}, ${countryName(r.country)}`);
const stateName = (st) => STATE_NAMES[st] || st;
const km = (a, b) => miles(a, b) * 1.609344;
const KIND_LABEL = { "open-streets": "Open streets", "critical-mass": "Critical Mass", "training-series": "Training ride" };
const kindLabel = (r) => KIND_LABEL[r.kind] || null;
let LANG = null;
const langName = (code) => { try { LANG = LANG || new Intl.DisplayNames(["en"], { type: "language" }); return LANG.of(code); } catch (e) { return code; } };
const langLine = (r) => { const l = (r.language || []).filter(Boolean); return l.length && !(l.length === 1 && l[0] === "en") ? l.map(langName).join(" and ") : null; };
// Distance text: US data keeps display text in distance_miles; world records carry km as a number.
function distText(r, { long = false } = {}) {
  const k = typeof r.distance_km === "number" ? r.distance_km : null;
  const m = cleanDist(r.distance_miles);
  if (!isUS(r) && k != null) return long ? `${k} km (${m || Math.round(k * 0.621371)} miles)` : `${k} km · ${m || Math.round(k * 0.621371)} mi`;
  return m ? (long ? `${m} miles` : `${m} mi`) : null;
}
const rmrf = (p) => fs.rmSync(p, { recursive: true, force: true });
const write = (p, s) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  // Pass 22: any page with a labelled map loads /rides/map.js, so city labels get a 44px hit area on phones
  if (typeof s === "string" && s.includes('class="gr-map-labels"') && !s.includes("/rides/map.js")) s = s.replace("</body>", '<script src="/rides/map.js" defer></script>\n</body>');
  if (typeof s === "string" && p.endsWith(".html")) s = require("../scripts/curl-quotes.js").curlQuotes(s);
  fs.writeFileSync(p, s);
};
const trunc = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…");
const lower1 = (s) => (/^(?:[A-Z][A-Z0-9+\/\-,]|[A-Z] (?:\d|[A-Z]\b|and\b|groups?\b|level\b|ride\b|on\b))/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));   // never "lGBTQ+" or "bCD/2/47"
const cleanDist = (d) => (d == null ? null : String(d).replace(/^[~≈]\s*/, "").replace(/\s*(mi|miles)$/i, ""));
// Filter tags: the data's inclusive_focus, plus "no-drop" whenever drop_policy says so
// (the two disagree on a handful of rides; the page counts and the chips use this).
const tagsOf = (r) => { const t = [...r.inclusive_focus]; if (r.drop_policy === "no-drop" && !t.includes("no-drop")) t.push("no-drop"); return t; };
// Pace class for the three-tap matcher: easy / steady / fast (a ride can be more than one).
// Pass 22: tools/lib/ride-facts.js — a posted average wins over keywords ("fast" never makes a 13 mph average
// fast), every posted group counts, a drop ride stays fast. The cases are in tools/test/ride-facts.test.js.
const paceOf = (r) => X.paceOf(r);
// Facet landing pages (recovery.com's "clientele" pages): one page per filter people ask for by name.
const FACETS = [
  { slug: "lgbtq", pick: (r) => tagsOf(r).includes("lgbtq"), chip: ["tag", "lgbtq"], label: "Made for LGBTQ+", h1: "LGBTQ+ group rides",
    blurb: "Queer-run and queer-first.", intro: "Rides made by and for queer riders. Some are clubs with decades behind them. Some are a few friends and a taco stop. All of them want you there." },
  { slug: "no-drop", pick: (r) => tagsOf(r).includes("no-drop"), chip: ["tag", "no-drop"], label: "No-drop", h1: "No-drop group rides",
    blurb: "Nobody gets left behind.", intro: "No-drop means the group waits. If you fall off the back on a hill, someone regroups with you. It's the easiest way into group riding." },
  { slug: "beginner", pick: (r) => tagsOf(r).includes("beginner"), chip: ["tag", "beginner"], label: "Beginner friendly", h1: "Beginner-friendly group rides",
    blurb: "First group ride? Start here.", intro: "Rides that say out loud that beginners are welcome. Easy pace, regroups, usually someone riding at the back. Tell the leader it's your first time." },
  { slug: "women-trans-femme", pick: (r) => tagsOf(r).includes("wtf"), chip: ["tag", "wtf"], label: "Women / trans / femme", h1: "Women, trans and femme group rides",
    blurb: "WTF and femme-led rides.", intro: "Rides led by and for women, trans, femme and nonbinary riders. Road, gravel, dirt and slow rolls." },
  { slug: "bipoc", pick: (r) => tagsOf(r).includes("bipoc"), chip: ["tag", "bipoc"], label: "BIPOC", h1: "BIPOC group rides",
    blurb: "Major Taylor clubs and more.", intro: "Rides run by and for Black, Indigenous and riders of color, including Major Taylor cycling clubs." },
  { slug: "family", pick: (r) => tagsOf(r).includes("family"), chip: ["tag", "family"], label: "Family", h1: "Family-friendly group rides",
    blurb: "Kids welcome, slow roll.", intro: "Slow rolls and kid-friendly loops. Bring the whole crew and whatever bikes they've got." },
  { slug: "gravel", pick: (r) => r.discipline.includes("gravel"), chip: ["disc", "gravel"], label: "Gravel", h1: "Gravel group rides",
    blurb: "Dirt roads, wider tires.", intro: "Weekly gravel rides. Wider tires, dirt roads, and usually coffee or a beer at the end." },
];

// ---------- time helpers (build-side; the same logic runs in ride.js on the client) ----------
function fmtTime(hhmm) {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(":").map(Number);
  const ap = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ap}`;
}
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
// Next occurrence as a Date, or null when the schedule can't be computed
const ymdOf = (y, mo, d) => `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const localYmd = (date, tz) => { const p = partsIn(date, tz); return ymdOf(p.year, p.month, p.day); };
function nextOccurrence(r, from = NOW) {
  if (!r.start_hhmm || !r.tz || r.frequency === "irregular") return null;
  // Oct 6, 2026: a ride on its seasonal break has no next ride (it showed "Next ride Tue, Oct 6" above "PAUSED FOR
  // THE WINTER"), and a monthly ride with no week-of-month rule is posted date by date — it is not weekly.
  if (onBreak(r) || ruleless(r)) return null;
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
  for (let k = 0; k < 400; k++) {
    const dt = new Date(Date.UTC(y0, mo0 - 1, d0 + k));
    if (!want.has(dt.getUTCDay())) continue;
    const t = at(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
    if (t > from && inSeason(dt.getUTCMonth() + 1, r.season_months)) return t;
  }
  return null;
}
// ---------- Oct 6, 2026: breaks, monthly rides posted date by date, and the host's own dates ----------
const onBreak = (r) => r.status === "seasonal-break";
const ruleless = (r) => r.frequency === "monthly" && !(r.monthly_rule && r.monthly_rule.length);
const MONTH_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
// `dates`: the host's posted dates ([{ date, start_hhmm|null }]). Only the ones still ahead ever render —
// a date with a time is ahead until it starts, a date with no time until that day ends. Past dates never show.
function upcomingDates(r, from = NOW) {
  if (!r.tz || !Array.isArray(r.dates)) return [];
  return r.dates.filter((e) => e && DATE_RE.test(e.date)).map((e) => {
    const [y, mo, d] = e.date.split("-").map(Number);
    const t = typeof e.start_hhmm === "string" && /^\d{2}:\d{2}$/.test(e.start_hhmm) ? e.start_hhmm : null;
    const [hh, mm] = (t || "23:59").split(":").map(Number);
    return { at: zoned(y, mo, d, hh, mm, r.tz), allDay: !t, ymd: e.date, hhmm: t };
  }).filter((x) => x.at > from).sort((a, b) => a.at - b.at);
}
// The next ride the build may promise: by the ride's rule, else the host's next posted date. Never on a break.
function nextOf(r) {
  if (onBreak(r)) return null;
  const n = nextOccurrence(r);
  if (n) return { at: n, allDay: false, kind: "rule" };
  const d = upcomingDates(r)[0];
  return d ? { at: d.at, allDay: d.allDay, kind: "date", ymd: d.ymd } : null;
}
const fmtDay = (ymd) => new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "short", month: "short", day: "numeric" }).format(new Date(`${ymd}T12:00:00Z`));
// A ride on its seasonal break: when it's back, only if the data says — its next posted date, or the month its season
// starts (when today is outside the season). { long, short } or null.
function backOf(r) {
  const d = upcomingDates(r)[0];
  if (d) return { long: `Back ${fmtDay(d.ymd)}${d.hhmm ? `, ${fmtTime(d.hhmm)}` : ""}, by the host's own dates.`, short: `back ${fmtDay(d.ymd).replace(/^\w+, /, "")}` };
  const s = r.season_months;
  if (s && r.tz) {
    const p = partsIn(NOW, r.tz);
    if (!inSeason(p.month, s)) {
      const y = s.start > p.month ? p.year : p.year + 1;
      return { long: `Its season starts in ${MONTH_LONG[s.start - 1]}, so look for it again in ${MONTH_LONG[s.start - 1]} ${y}.`, short: `back in ${MONTH_LONG[s.start - 1]}` };
    }
  }
  return null;
}
function isoWithOffset(date, tz) {
  const p = partsIn(date, tz);
  const local = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
  const off = Math.round((local - date.getTime()) / 60000);
  const sign = off >= 0 ? "+" : "-", a = Math.abs(off);
  return `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}T${String(p.hour).padStart(2, "0")}:${String(p.minute).padStart(2, "0")}:00${sign}${String(Math.floor(a / 60)).padStart(2, "0")}:${String(a % 60).padStart(2, "0")}`;
}
function fmtNext(date, tz) {
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(date).replace(/AM|PM/, (m) => m.toLowerCase());
}
function icsLocal(date, tz) { const p = partsIn(date, tz); return `${p.year}${String(p.month).padStart(2, "0")}${String(p.day).padStart(2, "0")}T${String(p.hour).padStart(2, "0")}${String(p.minute).padStart(2, "0")}00`; }

// A ride page's <title>: the ride's name, its town and when — the longest of these that fits in 60 characters
// ("Mellow Mondays — Austin, TX group ride, Mondays 6:00 pm"), down to the name alone when the name is that long.
function rideTitle(r) {
  const sw = shortWhen(r);
  const day = sw ? sw.replace(/\s+\d{1,2}:\d{2} [ap]m$/, "") : null;
  const place = placeText(r);
  const cands = [
    sw && `${r.name} — ${place} group ride, ${sw}`,
    sw && `${r.name} — ${place}, ${sw}`,
    day && day !== sw && `${r.name} — ${place}, ${day}`,
    `${r.name} — ${place} group ride`,
    sw && `${r.name} — ${r.city}, ${sw}`,
    day && `${r.name} — ${r.city}, ${day}`,
    `${r.name} — ${place}`,
    `${r.name} — ${r.city}`,
  ].filter(Boolean);
  return cands.find((t) => t.length <= TITLE_MAX) || (r.name.length <= TITLE_MAX ? r.name : trunc(r.name, TITLE_MAX));
}
// Human schedule from structured fields ("Every Tuesday", "Second Wednesday of the month")
function dayPhrase(r) {
  const names = r.days.map((d) => DAY_LONG[d]);
  const andList = (a) => (a.length < 3 ? a.join(" and ") : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`);
  if (r.monthly_rule && r.monthly_rule.length) {
    const same = r.monthly_rule.length > 1 && r.monthly_rule.every((m) => m.day === r.monthly_rule[0].day);
    return same
      ? `${andList(r.monthly_rule.map((m, i) => (i ? ORD_WORD[m.ord].toLowerCase() : ORD_WORD[m.ord])))} ${DAY_LONG[r.monthly_rule[0].day]}s of the month`
      : andList(r.monthly_rule.map((m) => `${ORD_WORD[m.ord]} ${DAY_LONG[m.day]}`)) + " of the month";
  }
  if (!names.length) return null;
  if (r.frequency === "irregular") return "Some " + andList(names.map((n) => n + "s"));   // posted date by date: never "Every Monday"
  if (r.frequency === "biweekly") return "Every other " + andList(names);
  // monthly with no week-of-month rule: posted date by date, about once a month (never "Every Saturday")
  if (r.frequency === "monthly") return "Some " + names.map((n) => n + "s").join(" or ") + " (about once a month)";
  if (names.length === 1) return "Every " + names[0];
  return andList(names.map((n) => n + "s"));
}
function shortWhen(r) {   // for <title>: "Tuesdays 8:30 pm" / "2nd Wednesdays" / "Last Fridays"
  if (r.frequency === "irregular") return null;
  if (ruleless(r)) return r.days.length === 1 ? `monthly ${DAY_LONG[r.days[0]]}s` : r.days.length ? `monthly ${r.days.map((d) => DAY_LONG[d].slice(0, 3)).join("/")}` : null;
  const t = fmtTime(r.start_hhmm);
  if (r.monthly_rule && r.monthly_rule.length) {
    const m = r.monthly_rule[0]; const o = { 1:"1st", 2:"2nd", 3:"3rd", 4:"4th", "-1":"Last" }[m.ord];
    return `${o} ${DAY_LONG[m.day]}s${t ? " " + t : ""}`;
  }
  if (r.days.length === 1) return `${DAY_LONG[r.days[0]]}s${t ? " " + t : ""}`;
  if (r.days.length > 1) return r.days.map((d) => DAY_LONG[d].slice(0, 3)).join("/") + (t ? " " + t : "");
  return null;
}
// UNTIL for a rule: the season's end or the hide date, whichever is first; "YYYYMMDDTHHMMSSZ" or null
const utcStamp = (date) => date.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
function rrule(r, cap = null) {
  if (r.frequency === "irregular") return null;
  let rule;
  if (r.monthly_rule && r.monthly_rule.length) rule = "FREQ=MONTHLY;BYDAY=" + r.monthly_rule.map((m) => `${m.ord}${DAY_ICS[m.day]}`).join(",");
  else if (r.days.length) rule = `FREQ=WEEKLY${r.frequency === "biweekly" ? ";INTERVAL=2" : ""};BYDAY=` + r.days.map((d) => DAY_ICS[d]).join(",");
  else return null;
  let until = null;   // YYYYMMDD
  if (r.season_months) {
    const p = partsIn(NOW, r.tz); let y = p.year; const s = r.season_months;
    if (s.start <= s.end ? p.month > s.end : false) y += 1;          // season over this year -> next year's run
    const endY = s.start <= s.end ? y : (p.month >= s.start ? y + 1 : y);
    const lastDay = new Date(Date.UTC(endY, s.end, 0)).getUTCDate();
    until = `${endY}${String(s.end).padStart(2, "0")}${String(lastDay).padStart(2, "0")}`;
  }
  // Never past the day the ride would drop off our lists without a new check (tools/lib/rides-freshness.js):
  // a saved calendar stops showing a ride nobody has confirmed, the same way the site does.
  const checked = r._f && r._f.checked_on;
  if (checked) {
    const d = new Date(Date.UTC(+checked.slice(0, 4), +checked.slice(5, 7) - 1, +checked.slice(8, 10) + F.POLICY.HIDE_DAYS));
    const hide = d.toISOString().slice(0, 10).replace(/-/g, "");
    if (!until || hide < until) until = hide;
  }
  let stamp = until ? `${until}T235959Z` : null;
  if (cap && (!stamp || cap < stamp)) stamp = cap;   // a start-time change ends this rule (periodsOf)
  if (stamp) rule += `;UNTIL=${stamp}`;
  return rule;
}
// One calendar rule per start time: a ride whose host publishes a table of start-time changes
// (start_times) gets one VEVENT per stretch, each ending the second before the next change.
function periodsOf(r, next) {
  const base = rrule(r);
  if (!base || !next) return [];
  const changes = (Array.isArray(r.start_times) ? r.start_times : []).filter((e) => e.from > localYmd(next, r.tz));
  const midnight = (ymd) => zoned(+ymd.slice(0, 4), +ymd.slice(5, 7), +ymd.slice(8, 10), 0, 0, r.tz);
  const stretches = [{ first: next, from: null }, ...changes.map((e) => ({ first: nextOccurrence(r, new Date(midnight(e.from).getTime() - 1)), from: e.from }))];
  const end = (base.match(/UNTIL=(\w+)/) || [])[1] || null;
  const out = [];
  stretches.forEach((st, i) => {
    if (!st.first || (end && utcStamp(st.first) > end)) return;
    const nextChange = stretches[i + 1];
    const cap = nextChange ? utcStamp(new Date(midnight(nextChange.from).getTime() - 1000)) : null;
    out.push({ next: st.first, rule: rrule(r, cap), uid: st.from ? `${r.slug}-from-${st.from}@cycleforchange.org` : `${r.slug}@cycleforchange.org` });
  });
  return out;
}
function icsEscape(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n"); }
function foldLine(line) { const out = []; let s = line; while (Buffer.byteLength(s) > 73) { let cut = 73; while (Buffer.byteLength(s.slice(0, cut)) > 73) cut--; out.push(s.slice(0, cut)); s = " " + s.slice(cut); } out.push(s); return out.join("\r\n"); }
function ics(r, periods) {
  const url = `${SITE}/rides/${r.slug}/`;
  const dur = r.duration_min || 120;
  const loc = r.start_location ? [r.start_location.name, r.start_location.address].filter(Boolean).join(", ") : placeText(r);
  const desc = [r.pace ? `Pace: ${r.pace.replace(/\.$/, "")}.` : null, r.drop_policy === "no-drop" ? "No-drop." : null, r.schedule ? `Schedule: ${r.schedule.replace(/\.$/, "")}.` : null, "Confirm with the host before you go.", url].filter(Boolean).join("\n");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Cycle for Change//Group Rides//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
  for (const { next, rule, uid } of periods) {
    const end = new Date(next.getTime() + dur * 60000);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${String(r.verified_on).replace(/-/g, "")}T000000Z`,            // stable across builds, so rebuilds don't churn 500 files
      `DTSTART;TZID=${r.tz}:${icsLocal(next, r.tz)}`,
      `DTEND;TZID=${r.tz}:${icsLocal(end, r.tz)}`,
      `RRULE:${rule}`,
      `SUMMARY:${icsEscape(r.name + " — " + placeText(r))}`,
      `LOCATION:${icsEscape(loc)}`,
      `DESCRIPTION:${icsEscape(desc)}`,
      `URL:${url}`,
      "END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
// A ride posted date by date: one VEVENT per date the host has posted that is still ahead (no RRULE — it doesn't
// repeat on a rule). A date with no time is an all-day entry: the host posts the time later.
function icsDated(r, list) {
  const url = `${SITE}/rides/${r.slug}/`;
  const dur = r.duration_min || 120;
  const loc = r.start_location ? [r.start_location.name, r.start_location.address].filter(Boolean).join(", ") : placeText(r);
  const desc = [r.pace ? `Pace: ${r.pace}.` : null, r.drop_policy === "no-drop" ? "No-drop." : null, r.schedule ? `Schedule: ${r.schedule}.` : null, "Confirm with the host before you go.", url].filter(Boolean).join("\n");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Cycle for Change//Group Rides//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
  for (const d of list) {
    const day = d.ymd.replace(/-/g, "");
    const next = new Date(Date.UTC(+d.ymd.slice(0, 4), +d.ymd.slice(5, 7) - 1, +d.ymd.slice(8, 10) + 1)).toISOString().slice(0, 10).replace(/-/g, "");
    lines.push("BEGIN:VEVENT", `UID:${r.slug}-${d.ymd}@cycleforchange.org`, `DTSTAMP:${String(r.verified_on).replace(/-/g, "")}T000000Z`,
      ...(d.allDay ? [`DTSTART;VALUE=DATE:${day}`, `DTEND;VALUE=DATE:${next}`]
        : [`DTSTART;TZID=${r.tz}:${icsLocal(d.at, r.tz)}`, `DTEND;TZID=${r.tz}:${icsLocal(new Date(d.at.getTime() + dur * 60000), r.tz)}`]),
      `SUMMARY:${icsEscape(r.name + " — " + placeText(r) + (d.allDay ? " (time on the host's page)" : ""))}`,
      `LOCATION:${icsEscape(loc)}`, `DESCRIPTION:${icsEscape(desc)}`, `URL:${url}`, "END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
function gcalUrl(r, next, rule) {
  const dur = r.duration_min || 120;
  const end = new Date(next.getTime() + dur * 60000);
  const loc = r.start_location ? [r.start_location.name, r.start_location.address].filter(Boolean).join(", ") : placeText(r);
  const q = new URLSearchParams({
    action: "TEMPLATE", text: `${r.name} — ${placeText(r)}`,
    dates: `${icsLocal(next, r.tz)}/${icsLocal(end, r.tz)}`, ctz: r.tz, recur: `RRULE:${rule}`,
    location: loc, details: `${r.schedule || ""}\n${SITE}/rides/${r.slug}/`,
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

// A schedule's "Next: Sat Oct 3, 2026" is true the day it's checked and false a week later. Once that date has
// passed, the page says "last listed" instead (Oct 6, 2026: past one-off dates never read as upcoming).
const MON3 = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const NEXT_DATE = /\b(next(?: ride| edition| one| date)?(?: listed)?|the next is)(:?\s+(?:on\s+)?)((?:mon|tue|wed|thu|fri|sat|sun)[a-z]*\.?,?\s+)?((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(\d{1,2}))(?:(,?\s+)(\d{4}))?\b/gi;
function pastNext(text, today = TODAY) {
  if (!text) return text;
  return String(text).replace(NEXT_DATE, (all, word, gap, dow, md, mon, day, comma, year, at, whole) => {
    // a list of dates ("Next: Fri Oct 2, 9, 16 and 23", "Next: Sun Oct 4, Sun Oct 18") still has dates ahead
    if (/^\s*(?:,|and|&)\s*(?:(?:mon|tue|wed|thu|fri|sat|sun)[a-z]*\.?,?\s+)?(?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+)?\d{1,2}\b(?!\s*(?::|am|pm|a\.m|p\.m))/i.test(whole.slice(at + all.length))) return all;
    let y = year ? +year : +today.slice(0, 4);
    let ymd = ymdOf(y, MON3[mon.toLowerCase()], +day);
    if (!year && daysApart(today, ymd) > 183) ymd = ymdOf(y - 1, MON3[mon.toLowerCase()], +day);   // "Next: Dec 30" read in January
    if (ymd >= today) return all;
    const lead = /^N/.test(word) ? "Last listed" : "last listed";
    return `${lead}${gap.startsWith(":") ? ":" : ""} ${dow || ""}${md}${year ? `${comma}${year}` : ""}`;
  });
}
const daysApart = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 864e5);

// ---------- load + validate ----------
function load() {
  const raw = JSON.parse(fs.readFileSync(DATA, "utf8"));
  const seen = new Set(); const out = []; const problems = [];
  for (const r of raw) {
    const id = r.slug || r.name; const links = r.links || {};
    if (!r.slug || !/^[a-z0-9-]+$/.test(r.slug)) { problems.push(`${id}: bad slug`); continue; }
    if (seen.has(r.slug)) { problems.push(`${id}: duplicate slug`); continue; }
    const country = String(r.country || "US").toUpperCase();
    if (!r.name || !r.city || (country === "US" && !r.state)) { problems.push(`${id}: missing name/city/state`); continue; }
    // a place to check it: the host's site or socials, a Meetup group, the page we watch, or a source (a city program posted on a news site counts)
    if (!(links.website || links.instagram || links.facebook || links.strava || links.meetup || (links.other || []).length || (r.refresh && r.refresh.watch_url) || (r.sources || []).length)) { problems.push(`${id}: no verified link`); continue; }
    const lat = num(r.lat), lng = num(r.lng);
    if (lat == null || lng == null) { problems.push(`${id}: missing lat/lng`); continue; }
    if (!r.tz) problems.push(`${id}: missing tz (calendar + next-ride disabled)`);
    if (BANNED.test([r.name, r.description, r.schedule, r.founded_note].join(" "))) problems.push(`${id}: banned word in copy (fix the data)`);
    seen.add(r.slug);
    // Pass 22: e-bikes only from the ride's own text (description, visitor notes, pace — never the host's name).
    // "ebike" in discipline now means e-bikes are welcome (Class 1 only counts): the tile, the doors and the filter read it.
    const eb = X.ebikeOf(r);
    let discipline = (Array.isArray(r.discipline) && r.discipline.length ? r.discipline : ["mixed"]).filter((d) => d !== "ebike");
    if (!discipline.length) discipline = ["mixed"];
    if (eb && eb.ok) discipline.push("ebike");
    out.push({
      ...r, country, state: country === "US" ? String(r.state).toUpperCase() : null, lat, lng,
      schedule: pastNext(r.schedule), status_note: pastNext(r.status_note),
      discipline, _eb: eb,
      days: Array.isArray(r.days) ? r.days : [],
      inclusive_focus: Array.isArray(r.inclusive_focus) ? r.inclusive_focus : [],
      sources: Array.isArray(r.sources) ? r.sources : [],
      links: { website: null, instagram: null, facebook: null, strava: null, meetup: null, other: [], ...links },
      host: r.host || null, start_location: r.start_location || null,
      language: Array.isArray(r.language) ? r.language : [],
      verified_on: r.verified_on || null,   // never stamp today on a ride nobody checked (freshness reads it)
    });
  }
  if (problems.length) {
    console.error("rides.json problems:\n  " + problems.join("\n  "));
    if (problems.some((p) => !/banned word|missing tz/.test(p))) process.exit(1);
  }
  return S.sortRides(out);
}
function loadHealth() {
  try { const h = JSON.parse(fs.readFileSync(HEALTH, "utf8")); return (h && h.rides) || {}; } catch (e) { return {}; }
}
function loadCountryNotes() {
  try { return JSON.parse(fs.readFileSync(COUNTRY_NOTES, "utf8")) || {}; } catch (e) { return {}; }
}
function loadEvents() {
  try { const e = JSON.parse(fs.readFileSync(EVENTS, "utf8")); return (Array.isArray(e) ? e : e.events || []).filter((x) => x.lat && x.lon); } catch { return []; }
}

// ---------- metro hubs ----------
// A city gets a hub when ≥3 rides sit within 25 mi of it and no bigger hub already covers it.
function buildMetros(allRides) {
  const rides = allRides.filter(isUS);
  const cities = {};
  for (const r of rides) {
    const k = `${r.city}|${r.state}`;
    (cities[k] ||= { city: r.city, state: r.state, lat: 0, lng: 0, n: 0, rides: [] });
    cities[k].lat += r.lat; cities[k].lng += r.lng; cities[k].n += 1;
  }
  const list = Object.values(cities).map((c) => ({ ...c, lat: c.lat / c.n, lng: c.lng / c.n }));
  for (const c of list) c.rides = rides.filter((r) => r.state === c.state && miles(c, r) <= METRO_RADIUS);
  list.sort((a, b) => b.rides.length - a.rides.length || b.n - a.n || a.city.localeCompare(b.city));
  // Name each hub after the biggest well-known city inside its radius (so a suburb whose
  // centroid happens to cover more rides doesn't become "Broomfield" instead of "Denver"),
  // re-centre on that city, and keep the hub only if it still covers ≥ METRO_MIN rides.
  const MAJOR = ["New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","Austin","Jacksonville","Fort Worth","San Jose","Columbus","Charlotte","Indianapolis","San Francisco","Seattle","Denver","Oklahoma City","Nashville","Washington","El Paso","Las Vegas","Boston","Portland","Louisville","Memphis","Detroit","Baltimore","Milwaukee","Albuquerque","Tucson","Fresno","Sacramento","Mesa","Kansas City","Atlanta","Omaha","Colorado Springs","Raleigh","Miami","Virginia Beach","Long Beach","Oakland","Minneapolis","Tulsa","Tampa","Arlington","New Orleans","Wichita","Cleveland","Bakersfield","Honolulu","Anaheim","Santa Ana","Riverside","Corpus Christi","Lexington","Henderson","Stockton","St. Paul","Cincinnati","St. Louis","Pittsburgh","Greensboro","Lincoln","Anchorage","Plano","Orlando","Irvine","Newark","Durham","Chula Vista","Toledo","Fort Wayne","St. Petersburg","Laredo","Jersey City","Chandler","Madison","Lubbock","Scottsdale","Reno","Buffalo","Gilbert","Glendale","North Las Vegas","Winston-Salem","Chesapeake","Norfolk","Fremont","Garland","Irving","Hialeah","Richmond","Boise","Spokane","Baton Rouge","Tacoma","San Bernardino","Modesto","Fontana","Des Moines","Moreno Valley","Santa Clarita","Fayetteville","Birmingham","Oxnard","Rochester","Port St. Lucie","Grand Rapids","Huntsville","Salt Lake City","Frisco","Yonkers","Amarillo","Glendale","Huntington Beach","McKinney","Montgomery","Augusta","Aurora","Akron","Little Rock","Tempe","Columbus","Overland Park","Grand Prairie","Tallahassee","Cape Coral","Mobile","Knoxville","Shreveport","Worcester","Ontario","Vancouver","Sioux Falls","Chattanooga","Brownsville","Fort Lauderdale","Providence","Newport News","Rancho Cucamonga","Santa Rosa","Peoria","Oceanside","Elk Grove","Salem","Pembroke Pines","Eugene","Garden Grove","Cary","Fort Collins","Corona","Springfield","Jackson","Alexandria","Hayward","Clarksville","Lakewood","Lancaster","Salinas","Palmdale","Hollywood","Springfield","Macon","Kansas City","Sunnyvale","Pomona","Killeen","Escondido","Pasadena","Naperville","Bellevue","Joliet","Murfreesboro","Midland","Rockford","Paterson","Savannah","Bridgeport","Torrance","McAllen","Syracuse","Surprise","Denton","Roseville","Thornton","Miramar","Pasadena","Mesquite","Olathe","Dayton","Carrollton","Waco","Orange","Fullerton","Charleston","West Valley City","Visalia","Hampton","Gainesville","Warren","Coral Springs","Cedar Rapids","Round Rock","Sterling Heights","Kent","Columbia","Santa Clara","New Haven","Stamford","Concord","Elizabeth","Athens","Thousand Oaks","Lafayette","Simi Valley","Topeka","Norman","Fargo","Wilmington","Abilene","Odessa","Pearland","Victorville","Hartford","Vallejo","Allentown","Berkeley","Richardson","Arvada","Ann Arbor","Rochester","Cambridge","Sugar Land","Lansing","Evansville","College Station","Fairfield","Clearwater","Beaumont","Independence","Provo","West Jordan","Murfreesboro","Palm Bay","El Monte","Carlsbad","Charleston","Temecula","Clovis","Springfield","Meridian","Westminster","Costa Mesa","High Point","Manchester","Pueblo","Lakeland","Pompano Beach","New Bedford","Portland","Boulder","Burlington","Missoula","Bozeman","Flagstaff","Sedona","Bentonville","Asheville","Santa Fe","Santa Cruz","Santa Barbara","Duluth","Traverse City","Bend","Ithaca","Portsmouth","Morgantown","Athens","Bloomington","Iowa City","Lawrence","Roanoke","Charlottesville","Harrisonburg","Kalamazoo","Green Bay","La Crosse","Montclair","Princeton","Frederick","Annapolis","Stowe","Ventura","Prescott","Laramie","Jackson","Las Cruces","Sparks","Kihei","Kapolei","Sanford","Coral Gables","Edmond","Germantown","Awendaw","Chesterfield","Sunrise","Middletown","Broomfield","Erie"];
  const rank = (city) => { const i = MAJOR.indexOf(city); return i < 0 ? 9999 : i; };
  const score = (o) => o.n + (rank(o.city) < 10 ? 8 : rank(o.city) < 120 ? 3 : 0);
  const hubs = [];
  for (const c of list) {
    if (c.rides.length < METRO_MIN) continue;
    if (hubs.some((h) => h.state === c.state && miles(h, c) <= HUB_GAP)) continue;
    // best = most rides of its own, with a bonus for being a genuinely big city (top ~150)
    // the ten biggest cities hold their name against a busy suburb (Phoenix, not Scottsdale), so the
    // home city's hub URL doesn't move when a suburb gains a few rides
    const covered = list.filter((o) => o.state === c.state && miles(c, o) <= METRO_RADIUS).sort((a, b) => score(b) - score(a) || rank(a.city) - rank(b.city));
    const best = covered[0] && score(covered[0]) > score(c) ? covered[0] : c;
    let center = { lat: best.lat, lng: best.lng }, name = best.city;
    let ridesIn = rides.filter((r) => r.state === c.state && miles(center, r) <= METRO_RADIUS);
    if (ridesIn.length < METRO_MIN) { center = { lat: c.lat, lng: c.lng }; name = c.city; ridesIn = c.rides; }
    if (hubs.some((h) => h.state === c.state && miles(h, center) <= HUB_GAP)) {
      // the big city it would be named after already has a hub; keep the candidate as its own hub if it stands clear
      if (best === c || c.n < METRO_MIN || hubs.some((h) => h.state === c.state && miles(h, c) <= HUB_GAP)) continue;   // only a city with 3+ rides of its own
      center = { lat: c.lat, lng: c.lng }; name = c.city; ridesIn = c.rides;
    }
    const RENAME = { "Awendaw|SC": "Charleston", "Germantown|TN": "Memphis" };   // metro name when the big city has no ride of its own
    name = RENAME[`${name}|${c.state}`] || name;
    if (hubs.some((h) => h.state === c.state && h.city === name)) continue;      // one hub per city name per state
    hubs.push({ ...c, ...center, city: name, rides: ridesIn, slug: slugify(name), path: `/rides/${c.state.toLowerCase()}/${slugify(name)}/` });
  }
  // A city with plenty of rides of its own gets its own page even inside a bigger city's radius
  // (Scottsdale beside Phoenix): people search for it by name. Added after the metro pass, so the
  // metro hubs never change because of it.
  for (const c of [...list].sort((a, b) => b.n - a.n || a.city.localeCompare(b.city))) {
    if (c.n < OWN_MIN) continue;
    if (hubs.some((h) => h.state === c.state && (h.city === c.city || miles(h, c) < OWN_GAP))) continue;
    hubs.push({ ...c, city: c.city, rides: c.rides, slug: slugify(c.city), path: `/rides/${c.state.toLowerCase()}/${slugify(c.city)}/` });
  }
  // Pass 22: a hub whose rides all sit inside another hub's is the same page twice (Watford was London's 28)
  // between two hubs with the same rides, the one the metro pass would name it after: own rides, big-city bonus
  const { kept, gone } = dropSubsetHubs(hubs, (a, b) => score(b) - score(a) || rank(a.city) - rank(b.city));
  // each ride -> nearest hub in its state that covers it (or null)
  const hubFor = {};
  for (const r of rides) {
    const cands = kept.filter((h) => h.state === r.state && miles(h, r) <= METRO_RADIUS).sort((a, b) => miles(a, r) - miles(b, r));
    hubFor[r.slug] = cands[0] || null;
  }
  return { hubs: kept, hubFor, gone };
}
// Pass 22 (Oct 2, 2026): /rides/united-kingdom/watford/ was an exact copy of /london/ (the same 28 rides,
// two of them in Watford), so the UK read as 56 rides. A hub whose ride set is a subset of a bigger hub's
// in the same state or country is dropped; between two hubs with the same set, the better-known name
// stays (prefer(a, b) < 0 keeps a). Returns the hubs kept and, for each one dropped, the hub that covers it
// — every dropped hub URL needs a 301 to that hub in netlify.toml (the build prints them).
function dropSubsetHubs(hubs, prefer) {
  const area = (h) => h.state || h.country;
  const sets = new Map(hubs.map((h) => [h, new Set(h.rides.map((r) => r.slug))]));
  const order = hubs.map((h, i) => [h, i]).sort(([a, i], [b, j]) => sets.get(b).size - sets.get(a).size || prefer(a, b) || i - j).map(([h]) => h);
  const gone = new Map();
  for (const big of order) {
    if (gone.has(big)) continue;
    const B = sets.get(big);
    for (const h of order) {
      if (h === big || gone.has(h) || area(h) !== area(big)) continue;
      const A = sets.get(h);
      if (A.size <= B.size && [...A].every((x) => B.has(x))) gone.set(h, big);
    }
  }
  return { kept: hubs.filter((h) => !gone.has(h)), gone: [...gone].map(([h, into]) => ({ from: h.path, to: into.path, n: h.rides.length, into: into.rides.length })) };
}

// ---------- world city hubs (Sept 30, 2026) ----------
// Outside the US a city gets a hub at /rides/<country>/<city>/ when 2+ listed rides sit within
// 40 km of it. Named for the city with the most rides of its own; one hub per city per country.
function buildWorldHubs(allRides) {
  const rides = allRides.filter((r) => !isUS(r));
  const cities = {};
  for (const r of rides) {
    const k = `${r.city}|${r.country}`;
    (cities[k] ||= { city: r.city, country: r.country, lat: 0, lng: 0, n: 0 });
    cities[k].lat += r.lat; cities[k].lng += r.lng; cities[k].n += 1;
  }
  const list = Object.values(cities).map((c) => ({ ...c, lat: c.lat / c.n, lng: c.lng / c.n }))
    .sort((a, b) => b.n - a.n || a.city.localeCompare(b.city));
  const hubs = [];
  for (const c of list) {
    const ridesIn = rides.filter((r) => r.country === c.country && km(c, r) <= WORLD_RADIUS_KM);
    if (ridesIn.length < WORLD_HUB_MIN) continue;
    if (hubs.some((h) => h.country === c.country && km(h, c) <= WORLD_RADIUS_KM / 2)) continue;   // a bigger neighbour already covers it
    const slug = S.slugify(c.city);
    hubs.push({ ...c, rides: ridesIn, slug, key: `${c.country.toLowerCase()}-${slug}`, path: `/rides/${countrySlug(c.country)}/${slug}/` });
  }
  const { kept, gone } = dropSubsetHubs(hubs, (a, b) => b.n - a.n);   // Pass 22: no hub twice (Watford inside London)
  const hubFor = {};
  for (const r of rides) {
    const cands = kept.filter((h) => h.country === r.country && km(h, r) <= WORLD_RADIUS_KM).sort((a, b) => km(a, r) - km(b, r));
    hubFor[r.slug] = cands[0] || null;
  }
  return { hubs: kept, hubFor, gone };
}

// ---------- shared chrome ----------
// Oct 6, 2026 (Search Lab): ride pages and the rides list pages drop " — Cycle for Change" from <title> so the
// descriptive part fits the ~60 characters a results page shows; og:title / twitter:title keep the brand (chrome.js).
// `brand: true` keeps it on the few doorway pages (/rides/, /find-a-ride/, about, add) when it still fits.
const TITLE_MAX = 60;
const BRAND = " — Cycle for Change";
function head({ title, description, canonical, jsonld, ogType = "website", noindex = false, brand = false }) {
  // a count in parentheses goes first when the title runs long ("… in San Francisco, CA (4 rides)")
  const fit = title.length > TITLE_MAX ? title.replace(/\s*\([^()]*\)$/, "") : title;
  const shown = brand && (fit + BRAND).length <= TITLE_MAX ? fit + BRAND : fit;
  const block = CHROME.head({ title, description, url: canonical, ogType, styles: ["/events/events.css", "/rides/rides.css"], ld: [jsonld], ...(noindex ? { robots: "noindex, follow" } : {}) })
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(shown)}</title>`);
  return `<!DOCTYPE html>
<!-- GENERATED by tools/build-rides.js from cfc-site/rides/rides.json — edit the data, not this file. -->
<html lang="en">
<head>
${block}
</head>
<body>
${CHROME.HEADER}
`;
}
const PUBLISHER = { "@type": "Organization", name: "Cycle for Change", url: `${SITE}/`, logo: `${SITE}/favicon-512.png` };
const AUTHOR = { "@type": "Person", name: "Robert Castan", url: `${SITE}/` };
function breadcrumbLd(items) {
  return { "@type": "BreadcrumbList", itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, ...(url ? { item: url } : {}) })) };
}
function crumbsHtml(items) {
  const inner = items.slice(1).map(([n, u], i, arr) => i < arr.length - 1 && u ? `<li><a href="${attr(u.replace(SITE, ""))}">${esc(n)}</a></li>` : `<li><span aria-current="page">${esc(n)}</span></li>`).join("");
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${inner}</ol></nav>`;
}

const CTA = `
${CHROME.PLEDGE}
`;
const CRISIS = `
      <aside class="crisis">
        <strong>If you're struggling:</strong> the <strong>988 Suicide &amp; Crisis Lifeline</strong>
        is free and 24/7 — call or text <strong>988</strong>. For LGBTQ youth, the
        <strong>Trevor Project</strong> is at <strong>1-866-488-7386</strong> (or text START to 678-678).
      </aside>`;
function foot(extraScript = "") {
  return `
${CHROME.FOOTER}
<script src="/rides/save.js" defer></script>
${BLOCKS.REPORT_JS}${extraScript}
</body>
</html>
`;
}

// ---------- ride card (directory + hubs) ----------
// ---------- Pass 6 (Sept 29, 2026): marks and poster tiles ----------
// One pictogram family lives in cfc-site/rides/marks.svg (a symbol sprite, currentColor).
// A ride card carries its discipline's mark; a facet tile carries its facet's mark.
const MARK_OF = { road:"road", gravel:"gravel", mtb:"mtb", fixed:"fixed", social:"social", cruiser:"cruiser",
  bmx:"bmx", track:"track", cyclocross:"cyclocross", ebike:"ebike", mixed:"mixed" };
const mark = (id, cls = "gr-mark") => `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="/rides/marks.svg#m-${id}"/></svg>`;
const discMark = (r) => mark(r.kind === "open-streets" ? "open-streets" : (MARK_OF[r.discipline[0]] || "mixed"));
const discText = (r) => [kindLabel(r), discLabel(r.discipline)].filter(Boolean).join(" · ");
// Poster tiles: the name blows up to fill the tile (font-size fits the longest word via --l),
// the count sits big at the foot. If tools/contour-art.js has drawn the town's contour into
// cfc-site/rides/art/<st>-<city>.svg, it sits behind the type; otherwise the tile is the type.
const ART_DIR = path.join(OUT, "art");   // OUT is cfc-site/rides
const artFor = (key) => (fs.existsSync(path.join(ART_DIR, `${key}.svg`)) ? `/rides/art/${key}.svg` : null);
const longestWord = (name) => Math.max(...String(name).split(/[\s-]+/).map((w) => w.length), 4);
function posterTile({ href, name, count, small, art, cls = "", markId = null, blurb = null }) {
  const artImg = art ? `<img class="tile-art" src="${art}" alt="" loading="lazy" decoding="async" width="200" height="200">` : "";
  const mk = markId ? mark(markId, "tile-mark") : "";
  return `<a class="tile-p ${cls}${art ? " tile-p--art" : ""}" href="${href}" style="--l:${longestWord(name)}">${artImg}${mk}<span class="t">${esc(name)}</span>${blurb ? `<span class="b">${esc(blurb)}</span>` : ""}<span class="c"><b class="n num">${count}</b><span class="s">${small}</span></span></a>`;
}

// A <div> with one stretched link plus a Save button (a button can't sit inside an <a>).
// The same markup is rendered client-side by hub.js — keep the two in step.
// a schedule written as prose gives its first sentence on a row (the page has the rest)
const cardWhenBase = (r) => (dayPhrase(r) && r.start_hhmm ? `${dayPhrase(r)}, ${fmtTime(r.start_hhmm)}` : r.schedule ? trunc(String(r.schedule).split(/(?<=\.)\s+/)[0].replace(/\.$/, ""), 64) : "See the ride's page for schedule");
// Oct 6, 2026: a ride on its seasonal break says so on its row (and when it's back, if the data says)
const cardWhen = (r) => { const w = cardWhenBase(r); if (!onBreak(r)) return w; const b = backOf(r); return `${w} · ${b ? b.short : "on a seasonal break"}`; };
const cardStat = (r) => [distText(r), r.pace ? trunc(r.pace, 34) : null].filter(Boolean).join(" · ");
// The freshness line every card carries: "Checked Sep 30", plus "Confirm first" when the policy wants a look.
const cardChecked = (r) => (r._f ? `${r._f.label_short}${r._f.nudge ? " · Confirm first" : ""}` : "");
const cardTagLabels = (r) => tagsOf(r).map((t) => TAG_LABEL[t] || t);
// Oct 1, 2026 (Pass 15): the card is a row — the mark, the name, when and where, one line of
// small facts. Pass 22 (Oct 2): ten riders read the old "3 mi" (distance from the city centre) as the
// ride's length, and racers, beginners and gravel riders had to open every ride to learn its pace. The
// line is now: waits for you · pace · length · when we checked (empties skipped). A distance from a
// point only shows where it's relative to the reader or their search ("3 mi away", hub.js / rides.js);
// static place pages never show one. hub.js renders the same row (index.json `pc`, `lg`).
// Pass 22: drop_policy "groups" = splits into pace groups (data/SCHEMA.md; research BRIEF) — "Regroups" read as jargon
const WAIT_OF = { "no-drop": ["waits", "Waits for you"], groups: ["regroups", "Pace groups"], drop: ["drops", "Drops"] };
const rowPlace = (r) => [r.city, r.neighborhood].filter(Boolean).join(" · ");
function card(r, opts = {}) {
  const wait = WAIT_OF[r.drop_policy];
  const checked = cardChecked(r);
  const pc = X.paceText(r), lg = X.lengthText(r);
  const meta = [
    wait ? `<em class="gr-wait gr-wait--${wait[0]}">${wait[1]}</em>` : "",
    pc ? `<span class="gr-card-pc">${esc(pc)}</span>` : "",
    lg ? `<span class="gr-card-lg">${esc(lg)}</span>` : "",
    r.confidence === "low" ? `<span class="gr-card-warn">Unconfirmed</span>` : "",
    checked ? `<span class="gr-card-checked${r._f && r._f.nudge ? " gr-card-checked--look" : ""}">${esc(checked)}</span>` : "",
  ].filter(Boolean).join("");   // the dots between them are CSS (.gr-card-meta > * + *), so a hidden one leaves no gap
  return `<div class="gr-card" data-slug="${r.slug}"
   data-name="${attr(r.name)}" data-city="${attr(r.city)}" data-state="${r.state || ""}" data-country="${r.country}"
   data-place="${attr([r.region, isUS(r) ? null : countryName(r.country)].filter(Boolean).join(" "))}"
   data-lat="${r.lat}" data-lng="${r.lng}" data-disc="${r.discipline.join(" ")}"
   data-tags="${tagsOf(r).join(" ")}" data-days="${r.days.join(" ")}" data-pace="${paceOf(r).join(" ")}"
   data-host="${attr(r.host ? r.host.name : "")}" data-hood="${attr(r.neighborhood || "")}">
  ${discMark(r)}
  <a class="gr-card-name" href="/rides/${r.slug}/">${esc(r.name)}<span class="visually-hidden">, ${esc(discText(r))}</span></a>
  ${r.name_en ? `<span class="gr-card-en">${esc(r.name_en)}</span>` : ""}
  <span class="gr-card-when">${esc(cardWhen(r))}<i class="gr-dot" aria-hidden="true"> · </i>${esc(rowPlace(r))}</span>
  <span class="gr-card-meta">${meta}</span>
  <button type="button" class="gr-save" data-save="${r.slug}" aria-pressed="false" aria-label="Save ${attr(r.name)}"><span aria-hidden="true">☆</span></button>
</div>`;
}

// ---------- the filter panel (Oct 1, 2026) ----------
// Robert, on his phone: the filters read as a wall of words, and once you tapped one nothing
// seemed to happen (the count was a small line below the fold). Now every option is a tile
// with its mark and a count, the week is a bar strip (the calendar's month strip, by day),
// and the number of rides left sits big under the panel. rides.js and hub.js keep the counts
// live — each tile says how many rides you'd get if you tapped it, and a tile that would leave
// nothing goes quiet. The counts written here are the whole page's; they're what shows
// without JS.
const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const DAY_SHORT = { mon:"Mo", tue:"Tu", wed:"We", thu:"Th", fri:"Fr", sat:"Sa", sun:"Su" };
const TILE_TAG = { ...TAG_LABEL, wtf:"Women, trans, femme", beginner:"Beginners" };
const TILE_SUB = { "no-drop":"Waits for you" };
const TAG_MARK = { lgbtq:"lgbtq", wtf:"wtf", bipoc:"bipoc", beginner:"beginner", "no-drop":"no-drop", family:"family", adaptive:"adaptive", youth:"youth" };
// how the status line says a pick: "2 rides · gravel · Saturdays"
const sayOf = (label) => (/^[A-Z]{2,}/.test(label) ? label : label.toLowerCase());
function tile(filter, value, name, n, markId, sub, say) {
  return `<button type="button" class="gr-tile" data-filter="${filter}" data-value="${value}" data-say="${attr(say)}" aria-pressed="false"${n ? "" : ` aria-disabled="true"`}>`
    + `${mark(markId, "gr-tile-mark")}<span class="gr-tile-name">${esc(name)}</span>${sub ? `<span class="gr-tile-sub">${esc(sub)}</span>` : ""}`
    + `<span class="gr-tile-n"><span data-n>${n}</span><span class="visually-hidden"> rides</span></span></button>`;
}
function filterPanel(rides, { tonight = true, groups = ["disc", "tag", "day"] } = {}) {
  const discs = groups.includes("disc") ? Object.keys(DISC_LABEL).map((k) => [k, rides.filter((r) => r.discipline.includes(k)).length]).filter(([, n]) => n) : [];
  const tags = groups.includes("tag") ? Object.keys(TAG_LABEL).map((k) => [k, rides.filter((r) => tagsOf(r).includes(k)).length]).filter(([, n]) => n) : [];
  const days = DAY_ORDER.map((d) => [d, rides.filter((r) => r.days.includes(d)).length]);
  const max = Math.max(1, ...days.map(([, n]) => n));
  const discTiles = discs.map(([k, n]) => tile("disc", k, DISC_LABEL[k], n, MARK_OF[k] || "mixed", null, sayOf(DISC_LABEL[k]))).join("\n            ");
  const tagTiles = tags.map(([k, n]) => tile("tag", k, TILE_TAG[k], n, TAG_MARK[k] || "riders", TILE_SUB[k], sayOf(TAG_LABEL[k]))).join("\n            ");
  const dayTiles = days.map(([d, n]) => `<button type="button" class="gr-day" data-filter="day" data-value="${d}" data-say="${DAY_LONG[d]}s" aria-pressed="false"${n ? "" : ` aria-disabled="true"`} style="--h:${(n / max).toFixed(2)}">`
    + `<i class="gr-day-bar" aria-hidden="true"></i><span class="gr-day-l" aria-hidden="true">${DAY_SHORT[d]}</span><span class="visually-hidden">${DAY_LONG[d]}s</span>`
    + `<span class="gr-day-n"><span data-n>${n}</span><span class="visually-hidden"> rides</span></span></button>`).join("\n            ");
  return `
      <div class="gr-filters" id="gr-filters">
        ${discs.length ? `<fieldset class="gr-group gr-group--disc"><legend class="gr-filter-label">Kind of ride</legend>
          <div class="gr-tiles">
            ${discTiles}
          </div>
        </fieldset>` : ""}
        ${tags.length ? `<fieldset class="gr-group gr-group--tag"><legend class="gr-filter-label">Made for</legend>
          <div class="gr-tiles">
            ${tagTiles}
          </div>
        </fieldset>` : ""}
        ${groups.includes("day") ? `<fieldset class="gr-group gr-group--day"><legend class="gr-filter-label">${groups.length === 1 ? "Pick a day" : "When"}</legend>
          <div class="gr-week">
            ${dayTiles}
          </div>
          ${tonight ? `<a class="gr-tonight" href="/tonight/">${mark("live", "gr-tonight-mark")}What&rsquo;s rolling tonight &rarr;</a>` : ""}
        </fieldset>` : ""}
      </div>`;
}

// ---------- search UI (the /all/ pages; a day strip alone on a long sub-page) ----------
function searchUi(rides, { cityIndex, placeholder, search = true, groups, tonight = true }) {
  const n = rides.length;
  return `
  <section class="gr-search-wrap gr-finder${search ? "" : " gr-finder--days"}" aria-label="${search ? "Find a ride" : "Pick a day"}">
    <div class="wrap">
      ${search ? `<form class="gr-search" role="search" id="gr-form" onsubmit="return false">
        <label class="visually-hidden" for="gr-q">Search by city, state or ride name</label>
        <span class="gr-field">${mark("search", "gr-field-mark")}<input id="gr-q" type="search" placeholder="${attr(placeholder)}" autocomplete="off" list="gr-cities"></span>
        <datalist id="gr-cities">${cityIndex.map(([k]) => `<option value="${attr(k)}">`).join("")}</datalist>
        <button type="button" class="btn btn--ink gr-geo" id="gr-geo">${mark("locate", "gr-geo-mark")}Near me</button>
      </form>` : ""}
${filterPanel(rides, { groups, tonight })}
      <div class="gr-result">
        <p class="gr-result-line" aria-live="polite"><b class="gr-result-n" id="gr-n">${n}</b> <span class="gr-status" id="gr-status" data-total="${n}">ride${n === 1 ? "" : "s"}</span></p>
        <button type="button" class="gr-clear" id="gr-clear" hidden>Clear all</button>
      </div>
    </div>
  </section>
  <a class="gr-jump" id="gr-jump" href="#gr-list" hidden><span class="gr-jump-n"></span><span class="gr-jump-go">See them &darr;</span></a>`;
}
// [label, lat, lng, keys]: keys are what a searcher might type, folded (no accents, lower case):
// "phoenix", "phoenix az", "phoenix arizona" / "bogota", "bogota colombia", "bogota co".
const foldKey = (s) => S.fold(s).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
function cityIndexFor(rides) {
  const cities = {};
  for (const r of rides) {
    const k = placeText(r);
    (cities[k] ||= { lat: 0, lng: 0, n: 0, r });
    cities[k].lat += r.lat; cities[k].lng += r.lng; cities[k].n += 1;
  }
  return Object.entries(cities).map(([k, v]) => {
    const r = v.r, c = foldKey(r.city);
    const alts = isUS(r) ? [r.state, stateName(r.state)] : [countryName(r.country), r.country, r.region, ...(S.COUNTRY_ALIASES[r.country] || [])];
    const keys = [...new Set([c, foldKey(k), ...alts.filter(Boolean).map((a) => `${c} ${foldKey(a)}`)])];
    return [k, +(v.lat / v.n).toFixed(4), +(v.lng / v.n).toFixed(4), keys];
  });
}
// [code, name, path, keys] for every country with a listed ride (the US points at /rides/united-states/)
function countryIndexFor(rides) {
  const ccs = [...new Set(rides.map((r) => r.country))];
  return ccs.map((cc) => [cc, countryName(cc), `/rides/${countrySlug(cc)}/`,
    [...new Set([foldKey(countryName(cc)), cc.toLowerCase(), ...(S.COUNTRY_ALIASES[cc] || []).map(foldKey)])]]);
}
function indexScript(rides, hubs) {
  const stateIndex = Object.entries(STATE_NAMES).map(([a, n]) => [a, n]);
  const hubIndex = hubs.map((h) => [h.state || h.country, h.city, h.path]);
  return `
<script id="gr-index" type="application/json">${JSON.stringify({ cities: cityIndexFor(rides), states: stateIndex, countries: countryIndexFor(rides), hubs: hubIndex })}</script>
<script src="/rides/rides.js" defer></script>`;
}

// ---------- directory (/rides/) ----------
// Pass 3 (Sept 28, 2026): search first, then a three-tap matcher, then browse — the order
// recovery.com uses — with behavioralhealthguide.org's counts, "how it's built" tiles and
// plain questions. The 402 cards no longer ship in this page's HTML: /rides/hub.js renders
// results from /rides/index.json on demand. Without JS the state, city and facet pages
// (full HTML) are one tap away.
function hubJson(rides) {
  return rides.map((r) => ({
    s: r.slug, n: r.name, ne: r.name_en || "", c: r.city, st: r.state || "", co: r.country, pl: placeText(r),
    rg: [r.region, isUS(r) ? null : countryName(r.country), ...(isUS(r) ? [] : S.COUNTRY_ALIASES[r.country] || [])].filter(Boolean).join(" "),
    h: r.neighborhood || "", la: r.lat, ln: r.lng, k: r.kind === "open-streets" ? "open-streets" : "",
    d: r.discipline, dl: discText(r), t: tagsOf(r), tl: cardTagLabels(r), dy: r.days, p: paceOf(r),
    w: cardWhen(r), x: cardStat(r), u: r.confidence === "low" ? 1 : 0, ho: r.host ? r.host.name : "",
    wt: { "no-drop": "waits", groups: "regroups", drop: "drops" }[r.drop_policy] || "",
    ck: cardChecked(r), cf: r._f && r._f.nudge ? 1 : 0,
    pc: X.paceText(r), lg: X.lengthText(r),   // Pass 22: the row's pace and length ("14–16 mph", "25 mi"; "" when not posted)
  }));
}
// /rides/live.json: the rides on the lists, with what /tonight/ and scripts/build-events.js need.
// (They used to read rides.json, which also holds rides we've taken off the lists.)
function liveJson(rides) {
  const keep = ["slug", "name", "kind", "city", "state", "country", "region", "neighborhood", "lat", "lng", "tz", "schedule", "days", "time_local",
    "start_hhmm", "start_times", "frequency", "monthly_rule", "season_months", "start_location", "distance_km", "distance_miles", "duration_min", "pace", "drop_policy",
    "discipline", "confidence"];
  // Oct 6, 2026: `status`; a ride on its seasonal break carries no start time (so /tonight/ never shows it rolling);
  // a monthly ride with no week rule carries the host's dates still ahead (`dates`) and `next` (ISO, or null).
  return rides.map((r) => ({ ...Object.fromEntries(keep.map((k) => [k, r[k] ?? null])),
    status: r.status || "active",
    ...(onBreak(r) ? { start_hhmm: null, start_times: null } : {}),
    dates: onBreak(r) ? [] : upcomingDates(r).map((d) => ({ date: d.ymd, start_hhmm: d.hhmm })),
    next: (() => { const n = nextOf(r); return n ? (n.allDay ? n.ymd : isoWithOffset(n.at, r.tz)) : null; })(),
    place: placeText(r), checked: r._f ? r._f.label_short : null,
    tags: tagsOf(r), pc: X.paceText(r), lg: X.lengthText(r),   // Pass 22: what the ride is made for, its pace and length
    hl: (r.refresh && r.refresh.watch_url) || (r.links && r.links.website) || (Array.isArray(r.sources) && r.sources[0] && (r.sources[0].url || r.sources[0])) || null }));   // the host's page, for /tonight/'s "Date on the host's calendar"
}
const FAQ = [
  ["What's a no-drop ride?", `The group waits for the slowest rider. If you come off the back on a hill, someone regroups with you. If it's your first group ride, <a href="/rides/no-drop/">start with one of these</a>.`],
  ["Do I need a road bike?", "No. Social rides and slow rolls take whatever bike you have. Road rides are easier on a road bike. Gravel and mountain bike rides need the tires for it. Every ride page says which bike it's for."],
  ["What do I bring?", "A helmet, water, a spare tube or patch kit, lights if it ends after dark, and a card for the coffee stop. Every ride page has a first-time checklist."],
  ["What if I can't keep up?", `Tell the leader you're new before you roll. Pick a no-drop or <a href="/rides/beginner/">beginner-friendly</a> ride the first time. If a drop ride leaves you, you ride home at your own pace. Nobody minds.`],
];
const lastCheckedOf = (rides) => rides.map((r) => (r._f && r._f.checked_on) || r.verified_on).filter(Boolean).sort().pop() || null;
const fmtDate = (d) => F.fmt(d, { today: TODAY }) || "";
// ---------- Pass 15 (Oct 1, 2026): step down, don't scroll ----------
// Robert, on his phone: "The words everywhere is very overwhelming … move them through more
// pages but less content. Like topic to subtopic, then that subtopic is where they find what
// they need." So every page in /rides/ asks one question and answers it with a few big picks:
//   /rides/  →  a place (city tiles, every US state, outside the US) or who's riding
//   a state or country  →  its cities (or, when it's small, the rides themselves)
//   a city  →  your bike · made for · which day   (each pick is its own short page)
//   the short page  →  rows  →  the ride
// A list never runs past LIST_MAX rows before the reader has picked something; above that the
// page shows doorways instead. Every doorway with one ride behind it goes straight to that
// ride. The explaining (how we check, the questions, why) lives on /rides/about/; the form on
// /rides/add/. The full list with every filter is still one tap away on each place's /all/.
const LIST_MAX = 12;
const LINKABLE = new Set();   // Search pass (Oct 5, 2026): the short pages that stay indexed; ride pages link up to them
const DISC_SLUG = { road:"road", gravel:"gravel", mtb:"mountain-bike", fixed:"fixed-gear", social:"social", cruiser:"cruiser", bmx:"bmx", track:"track", cyclocross:"cyclocross", ebike:"e-bike", mixed:"mixed" };
const DISC_H1 = { road:"Road", gravel:"Gravel", mtb:"Mountain bike", fixed:"Fixed-gear", social:"Social", cruiser:"Cruiser", bmx:"BMX", track:"Track", cyclocross:"Cyclocross", ebike:"E-bike-friendly", mixed:"Mixed-bike" };
const TAG_SLUG = { lgbtq:"lgbtq", wtf:"women-trans-femme", bipoc:"bipoc", beginner:"beginner", "no-drop":"no-drop", family:"family", adaptive:"adaptive", youth:"youth" };
const TAG_H1 = { lgbtq:"LGBTQ+", wtf:"Women, trans and femme", bipoc:"BIPOC", beginner:"Beginner-friendly", "no-drop":"No-drop", family:"Family-friendly", adaptive:"Adaptive", youth:"Youth" };
const FACET_MARK = { lgbtq:"lgbtq", "no-drop":"no-drop", beginner:"beginner", "women-trans-femme":"wtf", bipoc:"bipoc", family:"family", gravel:"gravel" };
const FACET_DOOR = { lgbtq:"LGBTQ+", "no-drop":"No-drop", beginner:"Beginners", "women-trans-femme":"Women, trans, femme", bipoc:"BIPOC", family:"Family", gravel:"Gravel" };
const FACET_TAG = { lgbtq:"lgbtq", "no-drop":"no-drop", beginner:"beginner", "women-trans-femme":"wtf", bipoc:"bipoc", family:"family" };
const plural = (n, one = "ride", many = one + "s") => `${n} ${n === 1 ? one : many}`;

// ---------- Pass 16 (Oct 2, 2026): drawn maps, ride buttons, photos ----------
// Robert: "even more custom buttons and graphics or even some photos." Three things, all drawn
// here so every place page gets them:
//  · maps — data/geo/outlines.json (tools/geo-outlines.js) holds each state's and country's
//    outline and the Mercator numbers to put a ride on it. A state or country page opens on its
//    map (a dot per ride, the cities you can tap); a city page shows where it sits, with the
//    cities around it; a ride page shows its dot. /rides/united-states/ is a map you tap.
//  · ride buttons — .gr-btn: a stamp holding the mark, the words, an arrow.
//  · photos — Robert's own, in the house grade, where they're true to the place: the crew on
//    /rides/ and the Arizona pages, the finish line on the who's-riding pages and /about/.
const GEO = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, "data", "geo", "outlines.json"), "utf8")); } catch (e) { return null; } })();
// Pass 18 (Oct 2, 2026): what's on the map besides the outline — terrain contours, lakes, rivers,
// the expressways (interstates by number). data/geo/detail.json, drawn by tools/geo-detail.js.
// Robert: the map "looks a little weird just being a blank slate like that." State and country
// maps show it as one picture, /rides/maps/detail/<key>.svg; the maps that zoom on a phone also
// carry roads and water as paths for the zoomed view. No detail file = the plain outline, as before.
const DETAIL = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, "data", "geo", "detail.json"), "utf8")); } catch (e) { return null; } })();
const DETAIL_OF = new Map();
if (GEO && DETAIL) {
  for (const [k, d] of Object.entries(DETAIL.states || {})) if (GEO.states[k]) DETAIL_OF.set(GEO.states[k], { ...d, file: k.toLowerCase() });
  for (const [k, d] of Object.entries(DETAIL.countries || {})) if (GEO.countries[k]) DETAIL_OF.set(GEO.countries[k], { ...d, file: `c-${k.toLowerCase()}` });
}
const roadsD = (det) => det.roads.map((r) => r[1]).join("");
// keep the pieces of a path ("M…L…Z" with "x y" pairs) whose box meets one of the boxes [x, y, w, h]
function pathIn(d, boxes) {
  if (!d) return "";
  return d.split("M").filter(Boolean).filter((part) => {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const q of part.replace(/Z/g, "").split("L")) { const [x, y] = q.split(" ").map(Number); if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    return boxes.some(([bx, by, bw, bh]) => x0 <= bx + bw && x1 >= bx && y0 <= by + bh && y1 >= by);
  }).map((part) => "M" + part).join("");
}
function detailSvg(shape, det) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${shape.w} ${shape.h}" preserveAspectRatio="none">`
    + (det.relief ? `<path d="${det.relief}" fill="none" stroke="#2A2E28" stroke-opacity=".14" stroke-width=".55" stroke-linejoin="round"/>` : "")
    + (det.lakes ? `<path d="${det.lakes}" fill="#E8DFD0" stroke="#C4B7A2" stroke-width=".6"/>` : "")
    + (det.rivers ? `<path d="${det.rivers}" fill="none" stroke="#C4B7A2" stroke-width=".85" stroke-linejoin="round"/>` : "")
    + (det.roads.length ? `<path d="${roadsD(det)}" fill="none" stroke="#2A2E28" stroke-opacity=".3" stroke-width=".8" stroke-linejoin="round" stroke-linecap="round"/>` : "")
    + `</svg>\n`;
}
const geoPlace = ([k, tx, ty, rot], lng, lat) => {
  const l = ((lng + rot + 540) % 360) - 180;
  return [tx + k * (l * Math.PI / 180), ty - k * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI / 180) / 2))];
};
const shapeOf = (st, cc) => (!GEO ? null : st ? GEO.states[st] || null : GEO.countries[cc] || null);
const n1 = (v) => Math.round(v * 10) / 10;
let mapUid = 0;
// labels: [{ lng, lat, text, n, href, strong }] — placed biggest first; one that would sit on
// another goes to the other side of its dot, or keeps only its ring (the tiles below name it).
function mapFigure(shape, { dots = [], dim = [], labels = [], focus = null, ringMiles = null, ringAt = null, title, caption = "", cls = "", zoom = null }) {
  if (!shape) return "";
  const id = `gm${++mapUid}`;
  const P = (o) => geoPlace(shape.p, o.lng, o.lat);
  const inBox = ([x, y]) => x >= -4 && y >= -4 && x <= shape.w + 4 && y <= shape.h + 4;
  const seen = new Set();
  const dotSvg = (list, c) => list.map(P).filter(inBox).map(([x, y]) => { const k = `${n1(x)},${n1(y)}`; if (seen.has(k)) return ""; seen.add(k); return `<circle class="${c}" cx="${n1(x)}" cy="${n1(y)}" r="3.4"/>`; }).join("");
  const FS = 16, CW = FS * 0.62;   // Space Mono: every character is 0.6em
  // every city's ring is in the way of every other city's name
  const boxes = labels.map(P).filter(inBox).map(([x, y]) => ({ x0: x - 6, x1: x + 6, y0: y - 6, y1: y + 6, ring: true }));
  if (focus) { const [x, y] = P(focus); boxes.push({ x0: x - 14, x1: x + 14, y0: y - 14, y1: y + 14 }); }
  const labelSvg = [...labels].sort((a, b) => (b.strong ? 1 : 0) - (a.strong ? 1 : 0) || (b.n || 0) - (a.n || 0)).map((l) => {
    const [x, y] = P(l); if (!inBox([x, y])) return "";
    const text = String(l.text).toUpperCase(), cnt = l.n != null ? ` ${l.n}` : "";
    const w = (text.length + cnt.length) * CW + 6;
    // right, left, above, below — the first that's clear of the edges, the rings and the names already placed
    const own = (b) => !(b.ring && Math.abs((b.x0 + b.x1) / 2 - x) < 0.5 && Math.abs((b.y0 + b.y1) / 2 - y) < 0.5);
    const clear = (b) => b.x0 >= 0 && b.x1 <= shape.w && b.y0 >= 0 && b.y1 <= shape.h && !boxes.some((o) => own(o) && b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0);
    const spots = { r: [x + 11, y + FS * 0.35, "start"], l: [x - 11, y + FS * 0.35, "end"], t: [x, y - 13, "middle"], b: [x, y + 13 + FS * 0.8, "middle"],
      tr: [x + 7, y - 11, "start"], br: [x + 7, y + 11 + FS * 0.8, "start"], tl: [x - 7, y - 11, "end"], bl: [x - 7, y + 11 + FS * 0.8, "end"] };
    const boxOf = ([tx, ty, a]) => ({ x0: a === "start" ? tx - 2 : a === "end" ? tx - w + 2 : tx - w / 2, x1: a === "start" ? tx + w - 2 : a === "end" ? tx + 2 : tx + w / 2, y0: ty - FS * 0.82, y1: ty + FS * 0.25 });
    let spot = null;
    for (const k of x > shape.w * 0.62 ? ["l", "r", "tl", "bl", "t", "b", "tr", "br"] : ["r", "l", "tr", "br", "t", "b", "tl", "bl"]) { const b = boxOf(spots[k]); if (clear(b)) { boxes.push(b); spot = spots[k]; break; } }
    const ring = `<circle class="gr-map-hub${l.strong ? " gr-map-hub--here" : ""}" cx="${n1(x)}" cy="${n1(y)}" r="${l.strong ? 7.5 : 6}"/>`;
    const label = spot ? `<text x="${n1(spot[0])}" y="${n1(spot[1])}" text-anchor="${spot[2]}"><tspan class="gr-map-name">${esc(text)}</tspan>${cnt ? `<tspan class="gr-map-n">${cnt}</tspan>` : ""}</text>` : "";
    const inner = ring + label;
    return l.href ? `<a href="${l.href}" aria-label="${attr(`${l.text}${l.n != null ? `, ${plural(l.n)}` : ""}`)}">${inner}</a>` : `<g>${inner}</g>`;
  }).join("");
  let ring = "";
  if (ringMiles && ringAt) {
    const [cx, cy] = P(ringAt), [, ty] = geoPlace(shape.p, ringAt.lng, ringAt.lat + ringMiles / 69.05);
    ring = `<circle class="gr-map-ring" cx="${n1(cx)}" cy="${n1(cy)}" r="${n1(Math.abs(cy - ty))}"/>`;
  }
  let here = "";
  if (focus) { const [x, y] = P(focus); if (inBox([x, y])) here = `<circle class="gr-map-halo" cx="${n1(x)}" cy="${n1(y)}" r="13"/><circle class="gr-map-here" cx="${n1(x)}" cy="${n1(y)}" r="6"/>`; }
  const zoomLayer = (d, boxes) => { const lk = pathIn(d.lakes, boxes), rv = pathIn(d.rivers, boxes), rd = pathIn(roadsD(d), boxes); return `<g class="gr-map-zlayer">${lk ? `<path class="gr-map-lake" d="${lk}"/>` : ""}${rv ? `<path class="gr-map-river" d="${rv}"/>` : ""}${rd ? `<path class="gr-map-road" d="${rd}"/>` : ""}</g>`; };
  // the detail, under everything and inside the outline: one picture (/rides/maps/detail/<key>.svg).
  // A map that zooms on a phone also carries its roads and water as paths, shown only while zoomed,
  // so they stay a hairline at 6x instead of growing with the picture.
  const det = DETAIL_OF.get(shape);
  const inline = det && /gr-map--area/.test(cls);
  const detailG = !det ? "" : `
          <clipPath id="${id}-clip"><use href="#${id}-land"/></clipPath>
          <g class="gr-map-detail" clip-path="url(#${id}-clip)" aria-hidden="true"><image class="gr-map-pic" href="/rides/maps/detail/${det.file}.svg" x="0" y="0" width="${shape.w}" height="${shape.h}" preserveAspectRatio="none"/>${inline && zoom ? zoomLayer(det, zoom.boxes) : ""}</g>
          <path class="gr-map-edge" d="${shape.d}"/>`;
  return `
      <figure class="gr-map ${cls}${zoom ? " gr-map--zoomable" : ""}">
        <svg class="gr-map-svg" viewBox="0 0 ${shape.w} ${shape.h}" role="img" aria-labelledby="${id}"><title id="${id}">${esc(title)}</title>
          <path class="gr-map-land" id="${id}-land" d="${shape.d}"/>${detailG}${ring}
          <g class="gr-map-dots">${dotSvg(dim, "gr-map-dot gr-map-dot--dim")}${dotSvg(dots, "gr-map-dot")}</g>${here}
          <g class="gr-map-labels">${labelSvg}</g>${zoom ? `
          <g class="gr-map-regions">${zoom.regionsSvg}</g>
          ${zoom.zooms}` : ""}
        </svg>${zoom ? `
        ${zoom.back}
        ${zoom.chips}` : ""}${caption ? `
        <figcaption>${caption}</figcaption>` : ""}
      </figure>`;
}
const hubLabel = (h, opts = {}) => ({ lng: h.lng, lat: h.lat, text: h.city, n: h.rides.length, href: opts.strong ? null : h.path, strong: !!opts.strong });

// ---------- Pass 17 (Oct 2, 2026): on a phone the area map zooms ----------
// Robert, on his phone at /rides/tx/: "the map on mobile is just a bit too small and not super
// easy to use and looks kind of funky … I don't want to rework everything … but make it more
// friendly." At phone width the labels fight for room and the placer drops some (Houston and
// Frisco went unnamed; Pearland's name sat on the Houston cluster). So on a phone, and only once
// /rides/map.js is running, the map trades its labels for one bubble per region — cities within
// REGION_MI of each other are one region, its number the rides in it counted once. A region of one
// city is a link to it (pale bubble); a region of several (dark bubble) zooms the same SVG in — the
// viewBox moves, no library — to its own layer of cities, laid out here at that zoom, and the
// "Pick a city" tiles narrow to them. Chips under the map do the same for a thumb. Desktop, and a
// phone without JS, get the map exactly as before.
const REGION_MI = 45;
function mapRegions(hubs) {
  const up = hubs.map((_, i) => i);
  const root = (i) => (up[i] === i ? i : (up[i] = root(up[i])));
  for (let i = 0; i < hubs.length; i++) for (let j = i + 1; j < hubs.length; j++) if (miles(hubs[i], hubs[j]) <= REGION_MI) up[root(i)] = root(j);
  const groups = {};
  hubs.forEach((h, i) => (groups[root(i)] ||= []).push(h));
  return Object.values(groups).map((hs) => {
    hs.sort((a, b) => b.rides.length - a.rides.length || a.city.localeCompare(b.city));
    const rides = [...new Map(hs.flatMap((h) => h.rides).map((r) => [r.slug, r])).values()];
    return { hubs: hs, rides, n: rides.length, name: hs.length > 1 ? `${hs[0].city} area` : hs[0].city, key: slugify(hs[0].city) };
  }).sort((a, b) => b.n - a.n || a.name.localeCompare(b.name));
}
// names around rings: right, left, above, below, then the corners — the first clear of the edges,
// every ring and the names already placed. items: [{ x, y, rr, text, n }] in canvas units.
function placeNames(items, W, H, FS, { fallback = false, small = null } = {}) {
  const boxes = items.map((it) => ({ x0: it.x - it.rr - 2, x1: it.x + it.rr + 2, y0: it.y - it.rr - 2, y1: it.y + it.rr + 2, it }));
  return [...items].sort((a, b) => (b.n || 0) - (a.n || 0)).map((it) => {
    const { x, y, rr } = it, text = String(it.text).toUpperCase(), cnt = it.n != null ? ` ${it.n}` : "", g = rr + 5;
    const order = x > W * 0.62 ? ["l", "r", "tl", "bl", "t", "b", "tr", "br"] : ["r", "l", "tr", "br", "t", "b", "tl", "bl"];
    const clear = (b) => b.x0 >= 0 && b.x1 <= W && b.y0 >= 0 && b.y1 <= H && !boxes.some((o) => o.it !== it && b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0);
    // the size it's drawn at first; a name with no room tries once more a size down
    let first = null;
    for (const fs of small ? [FS, small] : [FS]) {
      const w = (text.length + cnt.length) * fs * 0.62 + 6;
      const spots = { r: [x + g, y + fs * 0.35, "start"], l: [x - g, y + fs * 0.35, "end"], t: [x, y - g - 2, "middle"], b: [x, y + g + fs * 0.8, "middle"],
        tr: [x + g * 0.7, y - g * 0.7, "start"], br: [x + g * 0.7, y + g * 0.7 + fs * 0.8, "start"], tl: [x - g * 0.7, y - g * 0.7, "end"], bl: [x - g * 0.7, y + g * 0.7 + fs * 0.8, "end"] };
      const boxOf = ([tx, ty, a]) => ({ x0: a === "start" ? tx - 2 : a === "end" ? tx - w + 2 : tx - w / 2, x1: a === "start" ? tx + w - 2 : a === "end" ? tx + 2 : tx + w / 2, y0: ty - fs * 0.82, y1: ty + fs * 0.25 });
      first ||= spots[order[0]];
      for (const k of order) { const b = boxOf(spots[k]); if (clear(b)) { boxes.push({ ...b, it: null }); return { it, text, cnt, spot: spots[k], fs }; } }
    }
    return { it, text, cnt, spot: fallback ? first : null, fs: FS };
  });
}
// Pass 18: in a zoomed region, the interstates that run through it get a small tag ("I-35E") on a
// stretch clear of the cities, their names and the back button — up to five, longest first.
const LAND_RINGS = new Map();
function onLand(shape, x, y) {   // even-odd test against the outline (M/L/Z), in the map's own units
  let rings = LAND_RINGS.get(shape);
  if (!rings) LAND_RINGS.set(shape, (rings = shape.d.split("M").filter(Boolean).map((r) => r.replace(/Z/g, "").split("L").map((q) => q.split(",").map(Number)))));
  let inside = false;
  for (const r of rings) for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i], [xj, yj] = r[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function roadShields(det, rings, placed, toC, W, H, FS, dots = [], land = () => true) {
  if (!det || !det.roads.length) return [];
  const SF = 10.5, pad = 26;
  const taken = [{ x0: 0, y0: 0, x1: 120, y1: 58 }];   // the "← Texas" button
  for (const [x, y] of rings) taken.push({ x0: x - 14, y0: y - 14, x1: x + 14, y1: y + 14 });
  for (const [x, y] of dots) taken.push({ x0: x - 5, y0: y - 5, x1: x + 5, y1: y + 5 });   // never sit on a ride
  for (const { text, cnt, spot, fs } of placed) {
    if (!spot) continue;
    const w = (text.length + cnt.length) * fs * 0.62 + 6, [tx, ty, a] = spot;
    taken.push({ x0: a === "start" ? tx - 2 : a === "end" ? tx - w : tx - w / 2, x1: a === "start" ? tx + w : a === "end" ? tx + 2 : tx + w / 2, y0: ty - fs * 0.9, y1: ty + fs * 0.35 });
  }
  const runs = [];
  for (const [ref, d] of det.roads) {
    if (!ref) continue;
    const pts = [];   // points every ~10 canvas units along the route, inside the view
    for (const part of d.split("M").filter(Boolean)) {
      const line = part.split("L").map((q) => toC(q.split(" ").map(Number)));
      for (let i = 1; i < line.length; i++) {
        const [ax, ay] = line[i - 1], [bx, by] = line[i], n = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / 10));
        for (let k = 0; k < n; k++) { const x = ax + ((bx - ax) * k) / n, y = ay + ((by - ay) * k) / n; if (x > pad && x < W - pad && y > pad && y < H - pad && land(x, y)) pts.push([x, y]); }
      }
    }
    if (pts.length > 3) runs.push({ ref, pts });
  }
  runs.sort((a, b) => b.pts.length - a.pts.length);
  const out = [];
  for (const { ref, pts } of runs) {
    if (out.length >= 5) break;
    const bw = ref.length * SF * 0.62 + 9, bh = SF + 6;
    const ok = pts.filter(([x, y]) => { const b = { x0: x - bw / 2 - 3, x1: x + bw / 2 + 3, y0: y - bh / 2 - 3, y1: y + bh / 2 + 3 }; return !taken.some((o) => b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0); });
    if (!ok.length) continue;
    const [x, y] = ok[Math.floor(ok.length / 2)];   // the middle of what's clear: away from both ends
    taken.push({ x0: x - bw / 2 - 4, x1: x + bw / 2 + 4, y0: y - bh / 2 - 4, y1: y + bh / 2 + 4 });
    out.push({ ref, x, y, bw, bh, fs: SF });
  }
  return out;
}
function mapZoom(shape, hubsIn, areaWord) {
  if (!shape || hubsIn.length < 2) return null;
  const regions = mapRegions(hubsIn);
  if (!regions.some((g) => g.hubs.length > 1)) return null;
  const W = shape.w, H = shape.h, P = (o) => geoPlace(shape.p, o.lng, o.lat);
  // the overview: a bubble per region at its ride-weighted middle, nudged apart so none overlap
  const bubs = regions.map((g) => {
    const wt = g.hubs.reduce((s, h) => s + h.rides.length, 0) || 1;
    const pts = g.hubs.map((h) => [P(h), h.rides.length]);
    return { g, x: pts.reduce((s, [p, n]) => s + p[0] * n, 0) / wt, y: pts.reduce((s, [p, n]) => s + p[1] * n, 0) / wt, r: Math.min(32, 9 + 3.2 * Math.sqrt(g.n)) };
  });
  for (let pass = 0; pass < 80; pass++) {
    let moved = false;
    for (let i = 0; i < bubs.length; i++) for (let j = i + 1; j < bubs.length; j++) {
      const a = bubs[i], b = bubs[j], need = a.r + b.r + 4;
      let dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
      if (d >= need) continue;
      if (d < 0.01) { dx = 1; dy = 0.5; d = Math.hypot(dx, dy); }
      const push = (need - d) / 2, ux = dx / d, uy = dy / d;
      a.x -= ux * push; a.y -= uy * push; b.x += ux * push; b.y += uy * push; moved = true;
    }
    for (const b of bubs) { b.x = Math.min(W - b.r, Math.max(b.r, b.x)); b.y = Math.min(H - b.r, Math.max(b.r, b.y)); }
    if (!moved) break;
  }
  // on the map a dark bubble wears its biggest city's name (the dark says "and around"); the chip says "area"
  const NAME_FS = 13;
  const named = new Map(placeNames(bubs.map((b) => ({ x: b.x, y: b.y, rr: b.r, text: b.g.hubs[0].city, b })), W, H, NAME_FS, { small: 11 }).map((p) => [p.it.b, p]));
  const regionsSvg = bubs.map((b) => {
    const { g } = b, one = g.hubs.length === 1, p = named.get(b);
    const name = p && p.spot ? `<text class="gr-map-reg-name" x="${n1(p.spot[0])}" y="${n1(p.spot[1])}" text-anchor="${p.spot[2]}"${p.fs !== NAME_FS ? ` style="font-size:${p.fs}px"` : ""}>${esc(p.text)}</text>` : "";
    const inner = `<circle class="gr-map-reg-hit" cx="${n1(b.x)}" cy="${n1(b.y)}" r="${n1(Math.max(b.r + 4, 26))}"/><circle class="gr-map-reg-dot" cx="${n1(b.x)}" cy="${n1(b.y)}" r="${n1(b.r)}"/><text class="gr-map-reg-n" x="${n1(b.x)}" y="${n1(b.y + 5.2)}" text-anchor="middle">${g.n}</text>${name}`;
    return one
      ? `<a class="gr-map-reg gr-map-reg--one" href="${g.hubs[0].path}" aria-label="${attr(`${g.name}, ${plural(g.n)}`)}">${inner}</a>`
      : `<g class="gr-map-reg" data-reg="${g.key}" role="button" tabindex="0" aria-label="${attr(`${g.name}: ${plural(g.n)} in ${g.hubs.length} cities. Zoom in`)}">${inner}</g>`;
  }).join("");
  // a layer per region of several cities, drawn for its zoom: names placed on a canvas the size of
  // the map, then shrunk by the zoom so they come out the same size as on the overview
  const FS = 16, boxes = [];   // the zoomed views, so the roads and water drawn for them can stop there
  const zooms = regions.filter((g) => g.hubs.length > 1).map((g) => {
    const pts = g.hubs.map(P), xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const z = Math.max(1.6, Math.min(8, (W - 170) / Math.max(x1 - x0, 1), (H - 110) / Math.max(y1 - y0, 1)));
    const vb = [(x0 + x1) / 2 - W / (2 * z), (y0 + y1) / 2 - H / (2 * z), W / z, H / z];
    boxes.push(vb);
    const toC = ([x, y]) => [(x - vb[0]) * z, (y - vb[1]) * z], u = (v) => n1(v / z * 10) / 10;
    const at = (c, i) => n1((vb[i] + c / z) * 100) / 100;
    const dots = g.rides.map(P).map(([x, y]) => `<circle class="gr-map-dot" cx="${n1(x * 10) / 10}" cy="${n1(y * 10) / 10}" r="${u(3.4)}"/>`).join("");
    const placed = placeNames(g.hubs.map((h, i) => { const [cx, cy] = toC(pts[i]); return { x: cx, y: cy, rr: 7, text: h.city, n: h.rides.length, h, i }; }), W, H, FS, { fallback: true });
    const shields = roadShields(DETAIL_OF.get(shape), g.hubs.map((_, i) => toC(pts[i])), placed, toC, W, H, FS, g.rides.map((r) => toC(P(r))), (cx, cy) => onLand(shape, vb[0] + cx / z, vb[1] + cy / z)).map(({ ref, x, y, bw, bh, fs }) =>
      `<g class="gr-map-shield"><rect x="${at(x - bw / 2, 0)}" y="${at(y - bh / 2, 1)}" width="${u(bw)}" height="${u(bh)}"/><text x="${at(x, 0)}" y="${at(y + fs * 0.36, 1)}" text-anchor="middle" style="font-size:${u(fs)}px">${esc(ref)}</text></g>`).join("");
    const cities = placed.map(({ it, text, cnt, spot }) => {
      const [x, y] = pts[it.i];
      const label = spot ? `<text x="${at(spot[0], 0)}" y="${at(spot[1], 1)}" text-anchor="${spot[2]}" style="font-size:${u(FS)}px;stroke-width:${u(4)}px"><tspan class="gr-map-name">${esc(text)}</tspan><tspan class="gr-map-n">${cnt}</tspan></text>` : "";
      return `<a href="${it.h.path}" aria-label="${attr(`${it.h.city}, ${plural(it.h.rides.length)}`)}"><circle class="gr-map-zhit" cx="${n1(x * 10) / 10}" cy="${n1(y * 10) / 10}" r="${u(24)}"/><circle class="gr-map-hub" cx="${n1(x * 10) / 10}" cy="${n1(y * 10) / 10}" r="${u(7)}"/>${label}</a>`;
    }).join("");
    return `<g class="gr-map-zoom" data-reg="${g.key}" data-vb="${vb.map((v) => n1(v * 100) / 100).join(" ")}" data-paths="${attr(g.hubs.map((h) => h.path).join(" "))}">${shields}<g class="gr-map-zdots">${dots}</g>${cities}</g>`;
  }).join("");
  const multi = regions.filter((g) => g.hubs.length > 1);
  const chips = `<div class="gr-map-chips" role="group" aria-label="Zoom the map">
          <button type="button" class="gr-chip" data-reg="" aria-pressed="true">All ${esc(areaWord)}</button>${multi.map((g) => `
          <button type="button" class="gr-chip" data-reg="${g.key}" aria-pressed="false">${esc(g.name)} <span class="gr-map-chip-n">${g.n}</span></button>`).join("")}
        </div>`;
  return { regionsSvg, zooms, chips, boxes, back: `<button type="button" class="gr-chip gr-map-back" aria-label="${attr(`Back to all of ${areaWord}`)}">&larr; ${esc(areaWord)}</button>` };
}

// /rides/united-states/: tap a state. Shaded by how many rides it has.
function usMap(byState) {
  if (!GEO || !GEO.us) return "";
  const lvl = (n) => (n >= 40 ? 4 : n >= 15 ? 3 : n >= 5 ? 2 : n >= 1 ? 1 : 0);
  const shapes = Object.entries(GEO.us.states).map(([st, s]) => {
    const n = (byState[st] || []).length, L = lvl(n);
    const path = `<path class="gr-us-st gr-us-st--${L}" d="${s.d}"/>`;
    const label = s.a > 3400 ? `<text class="gr-us-code gr-us-code--${L}" x="${s.c[0]}" y="${s.c[1] + 8}" text-anchor="middle">${st}</text>` : "";
    return n ? `<a href="/rides/${st.toLowerCase()}/" aria-label="${attr(`${stateName(st)}, ${plural(n)}`)}">${path}${label}</a>` : `<g aria-hidden="true">${path}</g>`;
  }).join("\n          ");
  return `
      <figure class="gr-map gr-map--us">
        <svg class="gr-map-svg" viewBox="0 0 ${GEO.us.w} ${GEO.us.h}" role="group" aria-label="Map of the United States. Tap a state.">
          ${shapes}
        </svg>
        <figcaption class="gr-us-key"><span><i class="gr-us-sw gr-us-sw--1"></i>1–4</span><span><i class="gr-us-sw gr-us-sw--2"></i>5–14</span><span><i class="gr-us-sw gr-us-sw--3"></i>15–39</span><span><i class="gr-us-sw gr-us-sw--4"></i>40+ rides</span></figcaption>
      </figure>`;
}
// the two outline tiles on /rides/ (the US and the land), written as files the poster tiles can show
function outlineSvg(shape, { stroke = 1.3 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${shape.w} ${shape.h}" preserveAspectRatio="xMidYMid meet"><path d="${shape.d}" fill="none" stroke="#2A2E28" stroke-width="${stroke}" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>`;
}

// The ride button: the mark in a stamp, the words, an arrow. --ghost on paper; the solid one is
// the page's one primary.
function rideBtn({ href, text, markId, ghost = false, back = false, ext = false, attrs = "", cls = "" }) {
  return `<a class="gr-btn${ghost ? " gr-btn--ghost" : ""}${back ? " gr-btn--back" : ""} ${cls}" href="${href}"${ext ? ` rel="noopener nofollow"` : ""}${attrs}><span class="gr-btn-mk" aria-hidden="true">${mark(markId, "gr-btn-mark")}</span><span class="gr-btn-t">${text}</span><span class="gr-btn-go" aria-hidden="true">${back ? "&larr;" : ext ? "&#8599;" : "&rarr;"}</span></a>`;
}
// A photo band: Robert's photo, dissolving into the paper (Pass 7). Never the first thing on a phone
// (Pass 12): every caller puts it after the first set of picks. The photos, their alt text and the
// figure itself live in scripts/photos.js (Pass 25); `.ph` is styled in /chrome.css.
function photoBand(key, { line = "", cls = "", caption = true } = {}) {
  return PH.figure(key, { cls, line, caption });
}
// Pass 25 (Oct 4, 2026): the places Robert has a photo that is true to them (scripts/photos.js).
const HUB_PHOTO = {   // hub key → photo; desktop layout follows the photo's shape
  "az-phoenix": "phx-canal", "az-scottsdale": "pv-camelback-road", "az-sedona": "sedona-road",
  "ca-carlsbad": "encinitas-beach", "wa-seattle": "seattle-path",
  "id-boise": "boise-river-path",
};
const STATE_PHOTO = { AZ: ["crew", "ph--wide"], ID: ["sawtooth-lake", "ph--wide"] };
const FACET_PHOTO = { lgbtq: "people", "no-drop": "people", beginner: "people", "women-trans-femme": "people", gravel: "gravel-pines" };
// The short page's badge: the pick it stands for, drawn big (the mark, or the day's two letters).
function badge({ markId = null, day = null, sub = "" }) {
  return `<div class="gr-badge" aria-hidden="true">${day ? `<span class="gr-badge-day">${DAY_SHORT[day]}</span>` : mark(markId, "gr-badge-mark")}${sub ? `<span class="gr-badge-sub">${esc(sub)}</span>` : ""}</div>`;
}

// The subsets a place can be cut into, each with its own short page (2+ rides) or its one ride.
function subsetsOf(rides) {
  return {
    disc: Object.keys(DISC_LABEL).map((k) => ({ kind: "disc", key: k, slug: DISC_SLUG[k], name: DISC_LABEL[k], h1: `${DISC_H1[k]} group rides`, markId: MARK_OF[k] || "mixed", rides: rides.filter((r) => r.discipline.includes(k)) })).filter((x) => x.rides.length),
    tag: Object.keys(TAG_LABEL).map((k) => ({ kind: "tag", key: k, slug: TAG_SLUG[k], name: TILE_TAG[k], sub: TILE_SUB[k], h1: `${TAG_H1[k]} group rides`, markId: TAG_MARK[k] || "riders", rides: rides.filter((r) => tagsOf(r).includes(k)) })).filter((x) => x.rides.length),
    day: DAY_ORDER.map((d) => ({ kind: "day", key: d, slug: DAY_LONG[d].toLowerCase(), name: DAY_LONG[d], h1: `${DAY_LONG[d]} group rides`, rides: rides.filter((r) => r.days.includes(d)) })),
  };
}
const doorHref = (base, x) => (x.rides.length === 1 ? `/rides/${x.rides[0].slug}/` : x.rides.length ? `${base}${x.slug}/` : null);

// A doorway: the same tile as the filters (mark, name, count), but it goes somewhere.
function door({ href, name, n, markId, sub = null, cls = "" }) {
  const inner = `${mark(markId, "gr-tile-mark")}<span class="gr-tile-name">${esc(name)}</span>${sub ? `<span class="gr-tile-sub">${esc(sub)}</span>` : ""}<span class="gr-tile-n">${n}<span class="visually-hidden"> ${n === 1 ? "ride" : "rides"}</span></span>`;
  return href ? `<a class="gr-tile gr-door ${cls}" href="${href}">${inner}</a>` : `<span class="gr-tile gr-door ${cls}" aria-disabled="true">${inner}</span>`;
}
// The week as doorways: a bar per day, the day's page (or its one ride) behind it.
function weekDoors(days, base, hrefOf = (x) => doorHref(base, x)) {
  const max = Math.max(1, ...days.map((x) => x.rides.length));
  return `<div class="gr-week gr-week--doors">
            ${days.map((x) => {
              const n = x.rides.length, href = n ? hrefOf(x) : null;
              const inner = `<i class="gr-day-bar" aria-hidden="true"></i><span class="gr-day-l" aria-hidden="true">${DAY_SHORT[x.key]}</span><span class="visually-hidden">${x.name}s</span><span class="gr-day-n">${n}<span class="visually-hidden"> ${n === 1 ? "ride" : "rides"}</span></span>`;
              return href ? `<a class="gr-day" data-day="${x.key}" href="${href}" style="--h:${(n / max).toFixed(2)}">${inner}</a>` : `<span class="gr-day" data-day="${x.key}" aria-disabled="true" style="--h:0">${inner}</span>`;
            }).join("\n            ")}
          </div>`;
}
// "New to group rides?" and "Want to go fast?": the two rides most people are really asking for.
function picksBlock(rides) {
  const first = pickFirstRide(rides), fast = pickFastRide(rides);
  const pick = (r, k, markId) => `<a class="gr-pick" href="/rides/${r.slug}/">${mark(markId, "gr-pick-mark")}<span class="gr-pick-k">${k}</span><span class="gr-pick-name">${esc(r.name)}</span><span class="gr-pick-when">${esc(cardWhen(r))}${WAIT_OF[r.drop_policy] ? ` · ${WAIT_OF[r.drop_policy][1]}` : ""}</span><span class="gr-pick-go" aria-hidden="true">&rarr;</span></a>`;
  const out = [first ? pick(first, "New to group rides?", first.drop_policy === "no-drop" ? "no-drop" : "beginner") : "", fast && fast !== first ? pick(fast, "Want to go fast?", "fast") : ""].filter(Boolean);
  return out.length ? `
      <div class="gr-picks">
        ${out.join("\n        ")}
      </div>` : "";
}
// Pass 22: /rides/about/ is also where the first-ride questions live, so the link says both
const ABOUT_TEXT = "How we check rides, and first-ride questions";
const FIRST_HREF = "/rides/about/#first-ride";
const firstLink = (cls = "") => `<p class="gr-first-link ${cls}">${mark("beginner", "gr-first-link-mark")}<a href="${FIRST_HREF}">First group ride? Start here &rarr;</a></p>`;
const FOOTLINE = `
      <p class="gr-footline">${mark("checked", "gr-footline-mark")}<a href="/rides/about/">${ABOUT_TEXT}</a><i class="gr-dot" aria-hidden="true"> · </i><a href="/rides/add/">Add a ride we&rsquo;re missing</a></p>`;
const subLine = (rides, extra) => `<p class="gr-sub"><b>${rides.length.toLocaleString("en-US")}</b> ${rides.length === 1 ? "ride" : "rides"}${extra ? ` ${extra}` : ""}<i class="gr-dot" aria-hidden="true"> · </i>newest check ${esc(fmtDate(lastCheckedOf(rides)))}</p>`;
const itemList = (rides) => ({ "@type": "ItemList", numberOfItems: rides.length, itemListElement: rides.map((r, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/rides/${r.slug}/`, name: r.name })) });
const pageLd = (canonical, name, description, rides, crumbs) => ({ "@context": "https://schema.org", "@graph": [
  { "@type": "CollectionPage", "@id": canonical, name, description, url: canonical, dateModified: lastCheckedOf(rides), author: AUTHOR, publisher: PUBLISHER, breadcrumb: breadcrumbLd(crumbs), mainEntity: itemList(rides) },
] });
// Old shared links (?bike=gravel&day=sun) on a page that no longer filters go to its /all/ page.
const STEP_JS = `
<script src="/rides/step.js" defer></script>`;
// Pass 17: the area map's phone zoom (mapZoom)
const MAP_JS = `
<script src="/rides/map.js" defer></script>`;

// rows, in one grid or under city headings (Pass 22: no distance from the city centre on a row — it read as the ride's length)
function rowsHtml(rides) {
  return `
      <div id="gr-states">
      <section class="gr-state">
        <div class="gr-grid">
${rides.map((r) => card(r)).join("\n")}
        </div>
      </section>
      </div>`;
}
// collapse: towns with one ride share an "Other towns" group at the foot (a long list, fewer headings)
function townGroups(rides, collapse = false) {
  const byCity = {}; for (const r of rides) (byCity[r.city] ||= []).push(r);
  const cities = Object.keys(byCity).sort((a, b) => byCity[b].length - byCity[a].length || a.localeCompare(b));
  const big = collapse ? cities.filter((c) => byCity[c].length > 1) : cities;
  const rest = collapse ? cities.filter((c) => byCity[c].length === 1).flatMap((c) => byCity[c]) : [];
  return [...big.map((c) => ({ name: c, slug: S.slugify(c), rides: byCity[c], town: true })), ...(rest.length ? [{ name: "Other towns", slug: "other-towns", rides: rest, town: false }] : [])];
}
function groupedRows(rides, { hubOf = () => null, collapse = false } = {}) {
  return `
      <div id="gr-states">${townGroups(rides, collapse).map((g) => { const h = g.town ? hubOf(g.name) : null; return `
      <section class="gr-state" id="${g.slug}">
        <h2 class="gr-state-head">${h ? `<a href="${h.path}">${esc(g.name)}</a>` : esc(g.name)} <span class="gr-count">${g.rides.length}</span></h2>
        <div class="gr-grid">
${g.rides.map((r) => card(r)).join("\n")}
        </div>
      </section>`; }).join("")}
      </div>`;
}

// A long short page is cut by day: the week strip on top jumps to each day (a ride on two days
// shows under both — it's a schedule). Rides with no fixed weekday close the list.
const byTime = (a, b) => String(a.start_hhmm || "99").localeCompare(String(b.start_hhmm || "99"));
function dayGrouped(rides) {
  const groups = DAY_ORDER.map((d) => ({ key: d, slug: DAY_LONG[d].toLowerCase(), name: DAY_LONG[d], rides: rides.filter((r) => r.days.includes(d)).sort(byTime) }));
  const loose = rides.filter((r) => !r.days.length);
  const strip = weekDoors(groups, "", (x) => `#${x.slug}`);
  const html = `
      <div id="gr-states">${groups.filter((g) => g.rides.length).map((g) => `
      <section class="gr-state gr-day-group" id="${g.slug}">
        <h2 class="gr-state-head">${g.name}s <span class="gr-count">${g.rides.length}</span></h2>
        <div class="gr-grid">
${g.rides.map((r) => card(r)).join("\n")}
        </div>
      </section>`).join("")}${loose.length ? `
      <section class="gr-state gr-day-group" id="other-days">
        <h2 class="gr-state-head">Other days <span class="gr-count">${loose.length}</span></h2>
        <div class="gr-grid">
${loose.map((r) => card(r)).join("\n")}
        </div>
      </section>` : ""}
      </div>`;
  return { strip: `
  <nav class="gr-jumpweek wrap" aria-label="Jump to a day">
        ${strip}
  </nav>`, html };
}
// …and a long list across a state is cut by town, with the towns as a jump row on top.
function cityJump(rides) {
  return `
  <nav class="gr-near gr-jumprow wrap" aria-label="Jump to a town">
        <span class="gr-filter-label">Jump to</span>
        ${townGroups(rides, true).map((g) => `<a href="#${g.slug}">${esc(g.name)} <small>${g.rides.length}</small></a>`).join("\n        ")}
  </nav>`;
}

// ---------- /rides/ — where are you riding? ----------
function directory(rides, hubs, worldHubs = []) {
  const byState = {}; for (const r of rides) if (isUS(r)) (byState[r.state] ||= []).push(r);
  const byCountry = {}; for (const r of rides) (byCountry[r.country] ||= []).push(r);
  const worldCCs = Object.keys(byCountry).filter((cc) => cc !== "US");
  const nCountries = Object.keys(byCountry).length;
  const states = Object.keys(byState);
  const nStates = states.filter((x) => x !== "DC").length;
  const statesText = `${nStates} states${states.includes("DC") ? " and DC" : ""}`;
  const lastChecked = lastCheckedOf(rides);
  const description = `Find a group ride near you: ${rides.length.toLocaleString("en-US")} weekly bike rides in ${statesText}${worldCCs.length ? ` and ${worldCCs.length} more ${worldCCs.length === 1 ? "country" : "countries"}` : ""}. Day, time, start, pace, and when each was last checked.`;
  const crumbs = [["Cycle for Change", `${SITE}/`], ["Find a ride", `${SITE}/find-a-ride/`], ["Group rides", `${SITE}/rides/`]];
  const jsonld = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${SITE}/rides/`, name: "Find a group ride near you", description, url: `${SITE}/rides/`, dateModified: lastChecked, author: AUTHOR, publisher: PUBLISHER, breadcrumb: breadcrumbLd(crumbs) },
  ] };
  const home = hubs.find((h) => h.state === "AZ" && h.city === "Phoenix");
  // home base, then the biggest city in each other state (four Phoenix suburbs aren't "pick a place")
  const seenSt = new Set(home ? [home.state] : []);
  const top = [...(home ? [home] : []), ...hubs.filter((h) => h !== home).sort((a, b) => b.rides.length - a.rides.length || a.city.localeCompare(b.city)).filter((h) => !seenSt.has(h.state) && seenSt.add(h.state))].slice(0, 6);
  const worldN = rides.filter((r) => !isUS(r)).length;
  const facetDoors = FACETS.map((f) => { const n = rides.filter(f.pick).length; return n ? door({ href: `/rides/${f.slug}/`, name: FACET_DOOR[f.slug], n, markId: FACET_MARK[f.slug] }) : ""; }).join("\n          ");

  return head({ title: "Find a group ride near you", brand: true, description, canonical: `${SITE}/rides/`, jsonld }) + `
<main id="main" class="gr-dir gr-hub">
  <section class="gr-hero" aria-labelledby="gr-h1">
    <div class="wrap">
      ${crumbsHtml([["Cycle for Change", `${SITE}/`], ["Find a ride", `${SITE}/find-a-ride/`], ["Group rides", null]])}
      <p class="eyebrow">${rides.length.toLocaleString("en-US")} rides &middot; ${nCountries} ${nCountries === 1 ? "country" : "countries"} &middot; newest check ${esc(fmtDate(lastChecked))}</p>
      <h1 id="gr-h1">Find a group ride</h1>
      <form class="gr-search" role="search" id="gr-form" action="/rides/" method="get">
        <label class="visually-hidden" for="gr-q">Search by city, state, country or ride name</label>
        <span class="gr-field">${mark("search", "gr-field-mark")}<input id="gr-q" name="q" type="search" placeholder="City, country or ride name" autocomplete="off" list="gr-cities"></span>
        <datalist id="gr-cities">${cityIndexFor(rides).map(([k]) => `<option value="${attr(k)}">`).join("")}</datalist>
        <button type="button" class="btn btn--bone gr-geo" id="gr-geo">${mark("locate", "gr-geo-mark")}Near me</button>
      </form>
      <p class="gr-hero-alt"><a href="/rides/world/">${mark("globe", "gr-hero-alt-mk")}Outside the US &rarr;</a></p>
      <p class="gr-status" id="gr-status" aria-live="polite" data-total="${rides.length}"></p>
    </div>
  </section>
  <a class="gr-jump" id="gr-jump" href="#results" hidden><span class="gr-jump-n"></span><span class="gr-jump-go">See them &darr;</span></a>

  <section class="gr-results-wrap wrap" id="results" aria-label="Matching rides" hidden>
    <div class="gr-results-head"><p class="gr-results-count" id="gr-count"></p><button type="button" class="gr-clear" id="gr-clear">Clear</button></div>
    <div id="gr-results" class="gr-grid"></div>
    <p class="gr-more-row"><button type="button" class="btn btn--ghost" id="gr-show-more" hidden>Show more</button></p>
    <div class="gr-empty" id="gr-empty" hidden>
      <p>No rides match.</p>
      <p class="gr-empty-actions"><button type="button" class="gr-chip" id="gr-widen">Show the closest rides anyway</button> <button type="button" class="gr-chip" data-clear>Clear</button> <a class="gr-chip" href="/rides/add/">Add a ride we're missing</a></p>
    </div>
  </section>

  <div class="wrap gr-steps">
    <section class="gr-step" aria-labelledby="where-h">
      <h2 class="gr-filter-label" id="where-h">Where? Tap a state</h2>
      ${GEO && GEO.us ? usMap(byState) : posterTile({ href: "/rides/united-states/", name: "In the US", count: byCountry.US ? byCountry.US.length : 0, small: "rides", blurb: statesText, markId: "town", cls: "tile-p--country" })}
      <div class="gr-where-more">
        <a class="gr-wide-door" href="/rides/united-states/">${mark("list", "gr-wide-door-mk")}<span><b>Every state, as a list</b><span>${(byCountry.US ? byCountry.US.length : 0).toLocaleString("en-US")} rides in ${statesText}</span></span><i aria-hidden="true">&rarr;</i></a>
        ${worldN ? `<a class="gr-wide-door" href="/rides/world/">${mark("globe", "gr-wide-door-mk")}<span><b>Outside the US</b><span>${worldN} rides in ${worldCCs.length} ${worldCCs.length === 1 ? "country" : "countries"}</span></span><i aria-hidden="true">&rarr;</i></a>` : ""}
      </div>
      <p class="gr-jumpcities"><span class="gr-jumpcities-l">Or jump to</span>${top.map((h) => `<a class="gr-chip" href="${h.path}">${esc(h.city)}${h === home ? ` <span class="gr-chip-n">home</span>` : ""}</a>`).join("")}</p>
    </section>
${photoBand("crew", { cls: "ph--wide" })}

    <section class="gr-step" aria-labelledby="who-h">
      <h2 class="gr-filter-label" id="who-h">Or pick who&rsquo;s riding</h2>
      <div class="gr-tiles">
          ${facetDoors}
      </div>
    </section>
    <p class="gr-tonight-row"><a class="gr-tonight" href="/tonight/">${mark("live", "gr-tonight-mark")}What&rsquo;s rolling tonight &rarr;</a></p>
${FOOTLINE}
${CTA}
  </div>
</main>
<script id="gr-index" type="application/json">${JSON.stringify({ cities: cityIndexFor(rides), states: Object.entries(STATE_NAMES), countries: countryIndexFor(rides) })}</script>
` + foot(`
<script src="/rides/hub.js" defer></script>`);
}

// ---------- Pass 20 (Oct 2, 2026): Find a ride — the front door ----------
// Robert: "Find a ride … is that person looking for a group ride? Is that person looking for a gravel
// or a fundraising ride? … the next page needs to find out what's the ride … Once we have that
// established that they want to find a group ride we can find out … are they looking in the United
// States? Outside? … everything we build needs to be click friendly … we need that [content] for SEO
// but we need to find a better way to hide it behind stuff." So the journey is:
//   /find-a-ride/  What kind of ride?  → a group ride → /rides/ (Where? In the US / Outside the US)
//                                       → charity, fondo, tour, race, the six → their /events/2027/ page
//                                       → gravel → /find-a-ride/gravel/ (every week, or one big day?)
// The explaining sits folded under the picks (<details>: crawled, out of the way).
const CAL = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, "data", "calendar-2027.json"), "utf8")).events || []; } catch (e) { return []; } })();
const calN = (cat) => CAL.filter((e) => e.category === cat).length;
const stateRow = (byState) => (st) => `<a class="gr-row-st" href="/rides/${st.toLowerCase()}/"><b>${st}</b><span>${esc(stateName(st))}</span><i>${byState[st].length}</i></a>`;
function kindDoor({ href, name, sub, n = null, markId, cls = "" }) {
  return `<a class="gr-tile gr-door gr-kind ${cls}" href="${href}">${mark(markId, "gr-tile-mark")}<span class="gr-tile-name">${esc(name)}</span><span class="gr-tile-sub">${esc(sub)}</span>${n != null ? `<span class="gr-tile-n">${Number(n).toLocaleString("en-US")}</span>` : ""}</a>`;
}
function fold(summary, html) {
  return `
    <details class="gr-fold gr-about">
      <summary>${summary}</summary>
      <div class="gr-about-body">${html}</div>
    </details>`;
}
function findPage(rides) {
  const canonical = `${SITE}/find-a-ride/`;
  const nCountries = new Set(rides.map((r) => r.country || "US")).size;
  const gravelRides = rides.filter((r) => (r.discipline || []).includes("gravel")).length;
  const riding = CAL.filter((e) => e.riding).length;
  const title = "Find a bike ride: group rides, charity rides, gravel, races";
  const description = `Find a bike ride near you: ${rides.length.toLocaleString("en-US")} free weekly group rides in ${nCountries} countries, and ${CAL.length} charity rides, fondos, gravel races and tours for 2027.`;
  const crumbs = [["Cycle for Change", `${SITE}/`], ["Find a ride", canonical]];
  const kinds = [
    { href: "/rides/", name: "Group ride", sub: "Free, every week. Show up.", n: rides.length, markId: "riders", cls: "gr-kind--ink" },
    { href: "/tonight/", name: "Rolling tonight", sub: "What's on this evening", markId: "live" },
    { href: "/events/2027/charity-rides/", name: "Charity ride", sub: "Ride for a cause", n: calN("Charity ride"), markId: "pledge" },
    { href: "/find-a-ride/gravel/", name: "Gravel", sub: "Weekly rides and races", n: gravelRides + calN("Gravel"), markId: "gravel" },
    { href: "/events/2027/road/", name: "Fondo or century", sub: "A big organized road day", n: calN("Road"), markId: "hundred" },
    { href: "/events/2027/multi-day-tours/", name: "Multi-day tour", sub: "Days in a row", n: calN("Multi-day tour"), markId: "distance" },
    { href: "/events/2027/races/", name: "Race", sub: "Road, crit and stage races", n: calN("Race"), markId: "flag" },
    { href: "/events/2027/riding/", name: "Ride with me", sub: "The six I'm doing in 2027", n: riding, markId: "ride-day" },
  ].filter((k) => k.n == null || k.n > 0);
  const jsonld = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": canonical, name: "Find a ride", description, url: canonical, author: AUTHOR, publisher: PUBLISHER, breadcrumb: breadcrumbLd(crumbs) },
    { "@type": "ItemList", name: "Kinds of rides", itemListElement: kinds.map((k, i) => ({ "@type": "ListItem", position: i + 1, name: k.name, url: `${SITE}${k.href}` })) },
  ] };
  return head({ title, description, canonical, jsonld, brand: true }) + `
<main id="main" class="gr-dir gr-find">
  <header class="gr-head wrap">
      ${crumbsHtml(crumbs)}
      <h1>Find a ride</h1>
      <p class="gr-sub">Pick the kind. We&rsquo;ll take it from there.</p>
  </header>
  <div class="wrap gr-steps">
    <section class="gr-step" aria-labelledby="kind-h">
      <h2 class="gr-filter-label" id="kind-h">What kind of ride?</h2>
      <div class="gr-tiles gr-kinds">
          ${kinds.map(kindDoor).join("\n          ")}
      </div>
    </section>
    <p class="gr-all-link">${rideBtn({ href: "/events/2027/", text: `The whole 2027 calendar`, markId: "date", ghost: true })}</p>
    ${photoBand("robert-camelback")}
${fold("Group ride or organized ride?", `
        <p>A group ride is free and happens every week from the same spot: a shop, a caf&eacute;, a park. No sign-up. You show up and ride. We list ${rides.length.toLocaleString("en-US")} of them in ${nCountries} countries, and every one says when it was last checked at its source.</p>
        <p>An organized ride has a date, a sign-up and usually a fee or a fundraising minimum: charity rides, gran fondos, centuries, gravel races, multi-day tours. The <a href="/events/2027/">2027 calendar</a> has ${CAL.length} of them across the US, and says which dates the organizer has published.</p>
        <p>I&rsquo;m riding ${["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][riding] || riding} of those in 2027 as part of the 10,000 miles. Come ride one.</p>`)}
${FOOTLINE}
${CTA}
  </div>
</main>
` + foot();
}
function gravelPage(rides) {
  const canonical = `${SITE}/find-a-ride/gravel/`;
  const n1g = rides.filter((r) => (r.discipline || []).includes("gravel")).length, n2g = calN("Gravel");
  const crumbs = [["Cycle for Change", `${SITE}/`], ["Find a ride", `${SITE}/find-a-ride/`], ["Gravel", canonical]];
  const description = `Find a gravel ride: ${n1g} free weekly gravel group rides, and ${n2g} gravel races and events on the 2027 US calendar.`;
  return head({ title: "Find a gravel ride: weekly group rides and 2027 races", brand: true, description, canonical, jsonld: { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": canonical, name: "Find a gravel ride", description, url: canonical, author: AUTHOR, publisher: PUBLISHER, breadcrumb: breadcrumbLd(crumbs) } ] } }) + `
<main id="main" class="gr-dir gr-find">
  <header class="gr-head wrap">
      ${crumbsHtml(crumbs)}
      <h1>Find a gravel ride</h1>
      <p class="gr-sub">Every week, or one big day?</p>
  </header>
  <div class="wrap gr-steps">
    <section class="gr-step" aria-labelledby="g-h">
      <h2 class="gr-filter-label" id="g-h">Pick one</h2>
      <div class="gr-tiles gr-kinds gr-kinds--two">
          ${kindDoor({ href: "/rides/gravel/", name: "Every week", sub: "Free gravel group rides", n: n1g, markId: "riders", cls: "gr-kind--ink" })}
          ${kindDoor({ href: "/events/2027/gravel/", name: "One big day", sub: "Gravel races and events, 2027", n: n2g, markId: "gravel" })}
      </div>
    </section>
    ${photoBand("gravel-road")}
    <p class="back"><a href="/find-a-ride/">&larr; Every kind of ride</a></p>
${CTA}
  </div>
</main>
` + foot();
}

// ---------- /rides/about/ and /rides/add/ — the explaining, off the path ----------
function aboutPage(rides) {
  const canonical = `${SITE}/rides/about/`;
  const lastChecked = lastCheckedOf(rides);
  const nLow = rides.filter((r) => r.confidence === "low").length;
  const description = "How the Cycle for Change group ride list is built: every ride checked at its source and dated, nothing paid, and what to know before your first group ride.";
  const crumbs = [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], ["How it works", canonical]];
  const jsonld = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": canonical, url: canonical, name: "How the group ride list works", description, dateModified: lastChecked, author: AUTHOR, publisher: PUBLISHER, breadcrumb: breadcrumbLd(crumbs) },
    { "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } })) },
  ] };
  return head({ title: "How the group ride list works", brand: true, description, canonical, jsonld }) + `
<main id="main" class="gr-dir">
  <header class="gr-head wrap">
      ${crumbsHtml(crumbs)}
      <h1>How the group ride list works</h1>
      <p class="gr-sub">Checked at the source. Dated. Free.</p>
  </header>
  <div class="wrap">
${BLOCKS.BUILT([
    ["Checked", "At the source", "Every ride was confirmed where its host posts it: a club site, a shop calendar, a city program. Every card says when."],
    ["Dated", `Newest check ${esc(fmtDate(lastChecked))}`, `A ride we can't re-confirm within ${F.POLICY.HIDE_DAYS} days comes off the list on its own. Its page stays up and says why.`],
    ["Flagged", `${nLow} marked Unconfirmed`, "Found on one source, or a detail we couldn't pin down. The card tells you to confirm first."],
    ["Free", "No paid placement", "Nobody pays to be listed or to rank. Tell us when a ride is gone, changed, or still on."],
  ])}
    <section class="dir-faq" id="first-ride" aria-labelledby="faq-h">
      <h2 id="faq-h">First group ride? The questions people ask first</h2>
${FAQ.map(([q, a]) => `      <details><summary>${esc(q)}</summary><p>${a}</p></details>`).join("\n")}
    </section>
${photoBand("people", { cls: "ph--wide" })}
    <section class="gr-why">
      <h2>Why Cycle for Change keeps a group ride list</h2>
      <p>A group ride is the cheapest, most reliable way I know to get out of my own head and into a room of people who want you there. Nobody asks what you do. You just ride. In 2027 I&rsquo;m riding 10,000 miles, all on the bike, and a lot of them will be on rides like these. This list exists so anyone, anywhere, can find one this week.</p>
${CRISIS}
    </section>
    <p class="back"><a href="/rides/">&larr; Find a group ride</a> &middot; <a href="/rides/add/">Add a ride we&rsquo;re missing</a></p>
${CTA}
    <p class="gr-note">Always confirm with the host before you show up; schedules change with the seasons. This site isn't affiliated with any ride listed.</p>
  </div>
</main>
` + foot();
}
function addPage(rides) {
  const canonical = `${SITE}/rides/add/`;
  const description = "Add a group ride to the Cycle for Change list, fix one we got wrong, or tell us one is gone. Free to list. We check it at the source first.";
  const crumbs = [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], ["Add a ride", canonical]];
  const jsonld = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": canonical, url: canonical, name: "Add a group ride", description, author: AUTHOR, publisher: PUBLISHER, breadcrumb: breadcrumbLd(crumbs) }] };
  return head({ title: "Add a group ride, or fix one", brand: true, description, canonical, jsonld }) + `
<main id="main" class="gr-dir">
  <header class="gr-head wrap">
      ${crumbsHtml(crumbs)}
      <h1>Add a ride, or fix one</h1>
      <p class="gr-sub">Free to list. We check it at the source before it goes up.</p>
  </header>
  <div class="wrap">
${BLOCKS.REPORT({ thing: "ride", heading: "What should we know?", lede: "New ride, something changed, or it's gone. A link to where the host posts it helps most." })}
    <p class="back"><a href="/rides/">&larr; Find a group ride</a> &middot; <a href="/rides/about/">${ABOUT_TEXT}</a></p>
${CTA}
  </div>
</main>
` + foot();
}

// ---------- the countries outside the US, as one door ----------
function worldPage(rides, worldHubs) {
  const world = rides.filter((r) => !isUS(r));
  const byCountry = {}; for (const r of world) (byCountry[r.country] ||= []).push(r);
  const ccs = Object.keys(byCountry).sort((a, b) => byCountry[b].length - byCountry[a].length || countryName(a).localeCompare(countryName(b)));
  const canonical = `${SITE}/rides/world/`;
  const crumbs = [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], ["Outside the US", canonical]];
  const description = trunc(`${world.length} recurring group rides outside the US — ${ccs.map(countryName).join(", ")}. Day, local time, start point, and when each was last checked.`, 158);
  const topCities = (cc) => citiesByCount(byCountry[cc]).slice(0, 3).join(", ");   // Pass 22: London first, not A–Z
  return head({ title: `Group rides outside the US (${world.length} rides, ${ccs.length} countries)`, description, canonical, jsonld: pageLd(canonical, "Group rides outside the US", description, world, crumbs) }) + `
<main id="main" class="gr-dir">
  <header class="gr-head wrap">
      ${crumbsHtml(crumbs)}
      <h1>Group rides outside the US</h1>
      ${subLine(world, `in ${ccs.length} ${ccs.length === 1 ? "country" : "countries"}`)}
  </header>
  <div class="wrap gr-steps">
    <section class="gr-step" aria-labelledby="cc-h">
      <h2 class="gr-filter-label" id="cc-h">Pick a country</h2>
      <div class="tiles-p tiles-p--wide">
        ${ccs.map((cc) => posterTile({ href: `/rides/${countrySlug(cc)}/`, name: countryName(cc), count: byCountry[cc].length, small: byCountry[cc].length === 1 ? "ride" : "rides", blurb: topCities(cc), markId: "globe", cls: "tile-p--country" })).join("\n        ")}
      </div>
    </section>
    ${worldHubs.length ? `<section class="gr-step" aria-labelledby="wc-h">
      <h2 class="gr-filter-label" id="wc-h">Or a city</h2>
      <div class="tiles-p">
        ${worldHubs.map((h) => posterTile({ href: h.path, name: h.city, count: h.rides.length, small: `rides<br>${esc(countryName(h.country))}`, art: artFor(h.key) })).join("\n        ")}
      </div>
    </section>` : ""}
    <p class="back"><a href="/rides/">&larr; Find a group ride</a></p>
${FOOTLINE}
${CTA}
  </div>
</main>
` + foot();
}

// the cities in a list of rides, the busiest first (Pass 22: the UK tile said "Birmingham, Bristol, Cardiff")
function citiesByCount(rides) {
  const n = {}; for (const r of rides) n[r.city] = (n[r.city] || 0) + 1;
  return Object.keys(n).sort((a, b) => n[b] - n[a] || a.localeCompare(b));
}
// ---------- hub intro helpers ----------
function pickFirstRide(rides) {
  const score = (r) => (r.drop_policy === "no-drop" ? 3 : 0) + (r.inclusive_focus.includes("beginner") ? 2 : 0) + (r.discipline.includes("social") ? 1 : 0) + (r.confidence === "high" ? 1 : 0);
  // a Critical Mass or a city's open streets isn't a first group ride; a women/trans/femme ride isn't everyone's first one
  const open = rides.filter((r) => (!r.kind || r.kind === "group-ride") && !r.inclusive_focus.includes("wtf"));
  const group = open.length ? open : rides.filter((r) => !r.kind || r.kind === "group-ride");
  return [...(group.length ? group : rides)].sort((a, b) => score(b) - score(a))[0];
}
// top speed in mph from the pace text: "18-20 mph", or "28–30 km/h" outside the US
const topMph = (r) => {
  const t = String(r.pace || "");
  const m = t.match(/(\d{2})\s*(?:–|-|to)?\s*(\d{2})?\s*mph/i); if (m) return +(m[2] || m[1]);
  const k = t.match(/(\d{2})\s*(?:–|-|to)?\s*(\d{2})?\s*km\s*\/?\s*h/i); if (k) return Math.round(+(k[2] || k[1]) / 1.609344);
  return 0;
};
function pickFastRide(rides) {
  const easy = (r) => r.inclusive_focus.includes("beginner") || /intro|beginner|easy|social|slow|chat/i.test(`${r.name} ${r.pace || ""}`);
  const cands = rides.filter((r) => r.discipline.includes("road") && (!r.kind || r.kind === "group-ride") && !easy(r) && (r.drop_policy === "drop" || topMph(r) >= 18));
  return [...cands].sort((a, b) => topMph(b) - topMph(a))[0] || null;
}
// The meta description still says what's in the place (search engines and AI answers read it).
function placeSummary(rides, placeName) {
  const disc = {}; rides.forEach((r) => r.discipline.forEach((d) => { disc[d] = (disc[d] || 0) + 1; }));
  const top = Object.entries(disc).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([d, n]) => `${n} ${DISC_LABEL[d].toLowerCase()}`).join(", ");
  const first = pickFirstRide(rides);
  return `${plural(rides.length, "recurring group ride")} around ${placeName}: ${top}.${first ? ` New to group rides? Start with ${first.name}.` : ""}`;
}

// ---------- the full list, with every filter: /<place>/all/ ----------
function allPage({ title, h1, crumbs, canonical, description, rides, sections, hubs, upHref, upText, extraTop = "" }) {
  return head({ title, description, canonical, jsonld: pageLd(canonical, h1, description, rides, crumbs) }) + `
<main id="main" class="gr-dir gr-all-page">
  <header class="gr-head wrap">
      ${crumbsHtml(crumbs)}
      <h1>${esc(h1)}</h1>
      ${subLine(rides)}
  </header>
${searchUi(rides, { cityIndex: cityIndexFor(rides), placeholder: "City or ride name" })}
  <section class="gr-results-wrap" id="gr-list">
    <div class="wrap">
${extraTop}
      <div id="gr-nearby" class="gr-grid gr-nearby" hidden></div>${sections}
      <div class="gr-empty" id="gr-empty" hidden>
        <p>No rides match here.</p>
        <p class="gr-empty-actions"><button type="button" class="gr-chip" id="gr-widen">Show the closest rides anyway</button> <a class="gr-chip" href="/rides/">Search everywhere</a> <button type="button" class="gr-chip" data-clear>Clear</button></p>
      </div>
      <p class="back"><a href="${upHref}">&larr; ${esc(upText)}</a></p>
${FOOTLINE}
${CTA}
    </div>
  </section>
</main>
` + foot(indexScript(rides, hubs));
}

// ---------- a short page: one pick inside a place (Road in Phoenix, Saturday in Phoenix, No-drop in Arizona) ----------
function subPage({ title, h1, crumbs, canonical, description, rides, body, jump = "", upHref, upText, sideHref = null, sideText = null, badgeHtml = "", first = false, noindex = false }) {
  return head({ title, description, canonical, jsonld: pageLd(canonical, h1, description, rides, crumbs), noindex }) + `
<main id="main" class="gr-dir gr-sub-page">
  <header class="gr-head wrap${badgeHtml ? " gr-head--badge" : ""}">
      ${crumbsHtml(crumbs)}
      ${badgeHtml}
      <h1>${esc(h1)}</h1>
      ${subLine(rides)}
      ${first ? firstLink("gr-first-link--head") : ""}
  </header>
${jump}
  <section class="gr-results-wrap" id="gr-list">
    <div class="wrap">${body}
      <nav class="gr-btn-row" aria-label="Where next">
        ${rideBtn({ href: upHref, text: esc(upText), markId: "town", ghost: true, back: true })}
        ${sideHref ? rideBtn({ href: sideHref, text: esc(sideText), markId: "list", ghost: true }) : ""}
      </nav>
${FOOTLINE}
${CTA}
    </div>
  </section>
</main>
` + foot();
}

// ---------- a city (US metro hub or world city hub) ----------
// Small: the rides, closest first. Big: the picks, then your bike · made for · which day.
function cityPage(h, { pages, notes = null, others = [], areaRides = [], areaHubs = [] }) {
  const world = !h.state;
  const unit = world ? "km" : "mi";
  const dist = (r) => (world ? km(h, r) : miles(h, r));
  const rides = [...h.rides].sort((a, b) => dist(a) - dist(b));
  const name = world ? `${h.city}, ${countryName(h.country)}` : `${h.city}, ${h.state}`;
  const canonical = `${SITE}${h.path}`;
  const areaName = world ? countryName(h.country) : stateName(h.state);
  const areaPath = world ? `/rides/${countrySlug(h.country)}/` : `/rides/${h.state.toLowerCase()}/`;
  const crumbs = [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], [areaName, `${SITE}${areaPath}`], [h.city, canonical]];
  const radius = world ? `${WORLD_RADIUS_KM} km` : `${METRO_RADIUS} miles`;
  const description = trunc(`${placeSummary(rides, name)} Day, time, start point and when each was last checked.`, 158);
  const title = `Group rides in ${name} (${rides.length} rides)`;
  const h1 = world ? `Group rides in ${h.city}` : `Group rides in ${name}`;
  const step = rides.length > LIST_MAX;

  let body;
  if (step) {
    const sub = subsetsOf(rides);
    const base = h.path;
    // the short pages behind the doors
    const subCrumbs = (label, url) => [...crumbs, [label, url]];
    for (const x of [...sub.disc, ...sub.tag, ...sub.day]) {
      if (x.rides.length < 2) continue;
      const url = `${base}${x.slug}/`;
      const list = x.kind === "day" ? [...x.rides].sort((a, b) => byTime(a, b) || dist(a) - dist(b)) : x.rides;
      const xh1 = `${x.h1} in ${world ? h.city : name}`;
      const long = x.kind !== "day" && list.length > 8;
      const dg = long ? dayGrouped(list) : null;
      pages.push({ path: url, rides: x.rides, html: subPage({
        title: xh1, h1: xh1, crumbs: subCrumbs(x.name, `${SITE}${url}`), canonical: `${SITE}${url}`,
        description: trunc(`${plural(x.rides.length, x.kind === "day" ? `${x.name} group ride` : `${x.h1.replace(/ group rides$/, "").toLowerCase()} group ride`)} within ${radius} of ${name}: ${x.rides.slice(0, 3).map((r) => r.name).join(", ")}. Day, time, start and when each was checked.`, 158),
        rides: list, body: dg ? dg.html : rowsHtml(list), jump: dg ? dg.strip : "",
        badgeHtml: x.kind === "day" ? badge({ day: x.key, sub: h.city }) : badge({ markId: x.markId, sub: h.city }), first: x.kind === "tag" && (x.key === "beginner" || x.key === "no-drop"),
        upHref: base, upText: `Every kind of ride in ${h.city}`, sideHref: `${base}all/`, sideText: `All ${rides.length}, with filters`,
      }) });
    }
    pages.push({ path: `${base}all/`, rides, html: allPage({
      title: `All group rides in ${name} (${rides.length})`, h1: `All group rides in ${world ? h.city : name}`,
      crumbs: [...crumbs, ["All", `${SITE}${base}all/`]], canonical: `${SITE}${base}all/`,
      description: trunc(`Every recurring group ride within ${radius} of ${name}, ${rides.length} in all, with filters by bike, rider and day.`, 158),
      rides, sections: rowsHtml(rides), hubs: [], upHref: base, upText: `Group rides in ${h.city}`,
    }) });
    body = `${picksBlock(rides)}
      <section class="gr-step" aria-labelledby="bike-h">
        <h2 class="gr-filter-label" id="bike-h">Kind of ride</h2>
        <div class="gr-tiles">
          ${sub.disc.map((x) => door({ href: doorHref(base, x), name: x.name, n: x.rides.length, markId: x.markId })).join("\n          ")}
        </div>
      </section>
      ${sub.tag.length ? `<section class="gr-step" aria-labelledby="for-h">
        <h2 class="gr-filter-label" id="for-h">Made for</h2>
        <div class="gr-tiles">
          ${sub.tag.map((x) => door({ href: doorHref(base, x), name: x.name, n: x.rides.length, markId: x.markId, sub: x.sub })).join("\n          ")}
        </div>
      </section>` : ""}
      <section class="gr-step" aria-labelledby="day-h">
        <h2 class="gr-filter-label" id="day-h">Which day</h2>
          ${weekDoors(sub.day, base)}
      </section>
      <p class="gr-all-link">${rideBtn({ href: `${base}all/`, text: `All ${rides.length} rides, with filters`, markId: "list", ghost: true })}</p>`;
  } else {
    body = `
      <h2 class="gr-list-h">Closest to ${esc(h.city)} first</h2>${rowsHtml(rides)}`;
  }
  const town = world ? null : TOWNS.find({ city: h.city, state: h.state, lat: h.lat, lng: h.lng });
  // where it sits: the state (or country), the ring it covers, its rides dark, the rest of the state light,
  // the cities around it you can tap
  const inHub = new Set(rides.map((r) => r.slug));
  const where = mapFigure(shapeOf(h.state, h.country), {
    dots: rides, dim: areaRides.filter((r) => !inHub.has(r.slug)),
    labels: [hubLabel(h, { strong: true }), ...areaHubs.filter((x) => x !== h).map((x) => hubLabel(x))],
    ringMiles: world ? WORLD_RADIUS_KM / 1.609344 : METRO_RADIUS, ringAt: h,
    title: `Map of ${areaName}: the ${radius} around ${h.city}, a dot for each ride`,
    caption: `<span>${mark("town", "gr-map-cap-mark")}Where ${esc(h.city)} sits</span><span>Tap a city</span>`, cls: "gr-map--where" });
  const hubKey = world ? h.key : `${h.state.toLowerCase()}-${slugify(h.city)}`;
  const art = artFor(hubKey);
  const photo = HUB_PHOTO[hubKey] ? photoBand(HUB_PHOTO[hubKey]) : "";
  const near = others.length ? `
      <nav class="gr-near" aria-label="Nearby cities">
        <span class="gr-filter-label">Nearby</span>
        ${others.map(({ x, d }) => `<a href="${x.path}">${esc(x.city)} <small>${x.rides.length}</small></a>`).join("\n        ")}
      </nav>` : "";
  return head({ title, description, canonical, jsonld: pageLd(canonical, h1, description, rides, crumbs) }) + `
<main id="main" class="gr-dir gr-city${step ? " gr-city--step" : ""}"${step ? ` data-all="${h.path}all/"` : ""}>
  <header class="gr-head wrap${art ? " gr-head--art" : ""}">
      ${art ? `<img class="gr-head-art" src="${art}" alt="" width="200" height="200" decoding="async">` : ""}
      ${crumbsHtml(crumbs)}
      <h1>${esc(h1)}</h1>
      ${subLine(rides, `within ${radius}`)}
  </header>
  <div class="wrap gr-steps" id="gr-list">
${body}
${photo}
${world ? countryNotesBlock(h.country, notes) : ""}
${town ? TOWNS.strip(town, { compact: true, heading: `Coming to ${esc(town.name)} to ride?`, lede: "Routes, coffee, who fixes a bike, where to sleep with it." }) : ""}
${where}
${near}
      <p class="back"><a href="${areaPath}">&larr; All of ${esc(areaName)}</a></p>
${FOOTLINE}
${CTA}
  </div>
</main>
` + foot(step ? STEP_JS : "");
}

// ---------- a state or a country ----------
// Small: the rides, by town. Big: its cities, then who's riding, then the rides no city covers.
function areaPage({ rides, hubsIn, base, h1, title, crumbs, canonical, description, notes = "", world = false, pages, areaWord, st = null, cc = null }) {
  const step = rides.length > LIST_MAX && hubsIn.length > 0;
  const towns = new Set(rides.map((r) => r.city)).size;
  const hubOf = (c) => hubsIn.find((x) => x.city === c);
  // the facet short pages for this place (/rides/az/no-drop/): the national facet doors land here
  const facetN = {};
  for (const f of FACETS) {
    const list = rides.filter(f.pick);
    facetN[f.slug] = list;
    if (list.length < 2) continue;
    const url = `${base}${f.slug}/`;
    const xh1 = `${f.h1} in ${areaWord}`;
    pages.push({ path: url, rides: list, html: subPage({
      title: xh1, h1: xh1, crumbs: [...crumbs, [FACET_DOOR[f.slug], `${SITE}${url}`]], canonical: `${SITE}${url}`,
      description: trunc(`${plural(list.length, `${f.h1.replace(/ group rides$/, "").toLowerCase()} group ride`)} in ${areaWord}: ${list.slice(0, 3).map((r) => r.name).join(", ")}. ${f.intro}`, 158),
      rides: list, badgeHtml: badge({ markId: FACET_MARK[f.slug], sub: areaWord }), body: groupedRows(list, { hubOf, collapse: list.length > LIST_MAX }), jump: list.length > LIST_MAX && new Set(list.map((r) => r.city)).size > 2 ? cityJump(list) : "",
      upHref: base, upText: `All group rides in ${areaWord}`, sideHref: `/rides/${f.slug}/`, sideText: `${FACET_DOOR[f.slug]} rides everywhere`, first: f.slug === "beginner" || f.slug === "no-drop",
    }) });
  }
  // the place's own map: a dot per ride, its cities to tap
  const zoom = mapZoom(shapeOf(st, cc), hubsIn, areaWord);
  const areaMap = mapFigure(shapeOf(st, cc), { dots: rides, labels: hubsIn.map((x) => hubLabel(x)), title: `Map of ${areaWord}: a dot for each of the ${plural(rides.length)}${hubsIn.length ? ", its cities to tap" : ""}`, cls: "gr-map--area", zoom });
  let body;
  if (step) {
    const covered = new Set(hubsIn.flatMap((x) => x.rides.map((r) => r.slug)));
    const elsewhere = rides.filter((r) => !covered.has(r.slug)).sort((a, b) => a.city.localeCompare(b.city));
    const home = hubsIn.find((x) => x.state === "AZ" && x.city === "Phoenix");
    const cityList = [...(home ? [home] : []), ...hubsIn.filter((x) => x !== home).sort((a, b) => b.rides.length - a.rides.length || a.city.localeCompare(b.city))];
    const cityTile = (x) => posterTile({ href: x.path, name: x.city, count: x.rides.length, small: x === home ? "rides<br>home base" : "rides", art: artFor(x.state ? `${x.state.toLowerCase()}-${slugify(x.city)}` : x.key), cls: x === home ? "tile-p--ink" : "" });
    // the rides no city page covers: a few sit right here; more than that get their own short page
    const elsewhereDoor = elsewhere.length > 6;
    if (elsewhereDoor) pages.push({ path: `${base}other-towns/`, rides: elsewhere, html: subPage({
      title: `Group rides in smaller towns in ${areaWord} (${plural(elsewhere.length)})`, h1: `Group rides around ${areaWord}`,
      crumbs: [...crumbs, ["Other towns", `${SITE}${base}other-towns/`]], canonical: `${SITE}${base}other-towns/`,
      description: trunc(`${plural(elsewhere.length, "group ride")} in ${areaWord} outside its bigger cities: ${[...new Set(elsewhere.map((r) => r.city))].slice(0, 6).join(", ")}.`, 158),
      rides: elsewhere, body: groupedRows(elsewhere, { collapse: elsewhere.length > LIST_MAX }), jump: elsewhere.length > LIST_MAX ? cityJump(elsewhere) : "",
      upHref: base, upText: `Group rides in ${areaWord}`, sideHref: `${base}all/`, sideText: `All ${rides.length}, with filters`,
    }) });
    const facetDoors = FACETS.filter((f) => f.slug !== "gravel" && facetN[f.slug].length).map((f) => door({ href: doorHref(base, { slug: f.slug, rides: facetN[f.slug] }), name: FACET_DOOR[f.slug], n: facetN[f.slug].length, markId: FACET_MARK[f.slug] })).join("\n          ");
    pages.push({ path: `${base}all/`, rides, html: allPage({
      title: `All group rides in ${areaWord} (${rides.length})`, h1: `All group rides in ${areaWord}`,
      crumbs: [...crumbs, ["All", `${SITE}${base}all/`]], canonical: `${SITE}${base}all/`,
      description: trunc(`Every recurring group ride in ${areaWord}, ${rides.length} in all, with filters by bike, rider and day.`, 158),
      rides, sections: groupedRows(rides, { hubOf }), hubs: hubsIn, upHref: base, upText: `Group rides in ${areaWord}`,
    }) });
    body = `
      <section class="gr-step" aria-labelledby="city-h">
        <h2 class="gr-filter-label" id="city-h">Pick a city</h2>
        <div class="tiles-p">
          ${cityList.map(cityTile).join("\n          ")}
          ${elsewhereDoor ? posterTile({ href: `${base}other-towns/`, name: "Other towns", count: elsewhere.length, small: "rides", blurb: `${new Set(elsewhere.map((r) => r.city)).size} smaller towns`, markId: "town", cls: "tile-p--country" }) : ""}
        </div>${zoom ? `
        <button type="button" class="gr-chip gr-map-reset">Every city in ${esc(areaWord)}</button>` : ""}
      </section>${STATE_PHOTO[st] ? photoBand(STATE_PHOTO[st][0], { cls: STATE_PHOTO[st][1] }) : ""}
      ${facetDoors ? `<section class="gr-step" aria-labelledby="who-h">
        <h2 class="gr-filter-label" id="who-h">Or pick who&rsquo;s riding</h2>
        <div class="gr-tiles">
          ${facetDoors}
        </div>
      </section>` : ""}
      ${elsewhere.length && !elsewhereDoor ? `<section class="gr-step" aria-labelledby="else-h">
        <h2 class="gr-filter-label" id="else-h">Elsewhere in ${esc(areaWord)}</h2>${rowsHtml(elsewhere)}
      </section>` : ""}
      <p class="gr-all-link">${rideBtn({ href: `${base}all/`, text: `All ${rides.length} rides, with filters`, markId: "list", ghost: true })}</p>`;
  } else {
    body = groupedRows(rides, { hubOf }) + (STATE_PHOTO[st] ? photoBand(STATE_PHOTO[st][0], { cls: STATE_PHOTO[st][1] }) : "");
  }
  return head({ title, description, canonical, jsonld: pageLd(canonical, h1, description, rides, crumbs) }) + `
<main id="main" class="gr-dir gr-area${step ? " gr-area--step" : ""}"${step ? ` data-all="${base}all/"` : ""}>
  <header class="gr-head wrap${areaMap ? " gr-head--map" : ""}">
      <div class="gr-head-words">
      ${crumbsHtml(crumbs)}
      <h1>${esc(h1)}</h1>
      ${subLine(rides, `in ${plural(towns, "town")}`)}
      </div>${areaMap}
  </header>
  <div class="wrap gr-steps" id="gr-list">
${notes}
${body}
      <p class="back"><a href="${world ? "/rides/world/" : "/rides/united-states/"}">&larr; ${world ? "Other countries" : "Every US state"}</a></p>
${FOOTLINE}
${CTA}
  </div>
</main>
` + foot((step ? STEP_JS : "") + (zoom ? MAP_JS : ""));
}

function statePage(st, rides, hubs, pages) {
  const name = stateName(st);
  const canonical = `${SITE}/rides/${st.toLowerCase()}/`;
  const cities = citiesByCount(rides);
  return areaPage({
    rides, hubsIn: hubs.filter((h) => h.state === st), base: `/rides/${st.toLowerCase()}/`, pages, areaWord: name, st,
    title: `Group rides in ${name} (${plural(rides.length)}, ${plural(cities.length, "city", "cities")})`,
    h1: `Group rides in ${name}`,
    crumbs: [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], [name, canonical]],
    canonical,
    description: trunc(`${rides.length} recurring bicycle group rides in ${name} — ${cities.slice(0, 8).join(", ")}${cities.length > 8 ? " and more" : ""}. Day, time, start point and when each was last checked.`, 158),
  });
}

// ---------- the world (Sept 30, 2026): country pages, world city hubs, the US as a country ----------
function countryNotesBlock(cc, notes) {
  const n = notes && notes[cc];
  if (!n) return "";
  const rows = [["words", "What locals call it"], ["where", "Where rides are posted"], ["rhythm", "When they roll"], ["visitors", "If you're visiting"]]
    .filter(([k]) => n[k]).map(([k, h]) => `        <div><dt>${h}</dt><dd>${esc(n[k])}</dd></div>`).join("\n");
  if (!rows) return "";
  // Pass 15: folded — a tap away, not a wall above the rides
  return `
      <details class="gr-first gr-country-notes">
        <summary>Riding in ${esc(theCountry(cc))}: what to know</summary>
        <dl>
${rows}
        </dl>
      </details>`;
}
function countryPage(cc, rides, worldHubs, notes, pages) {
  const name = countryName(cc);
  const canonical = `${SITE}/rides/${countrySlug(cc)}/`;
  const cities = citiesByCount(rides);
  return areaPage({
    rides, hubsIn: worldHubs.filter((h) => h.country === cc), base: `/rides/${countrySlug(cc)}/`, pages, world: true, areaWord: theCountry(cc), cc,
    title: `Group rides in ${theCountry(cc)} (${plural(rides.length)}, ${plural(cities.length, "city", "cities")})`,
    h1: `Group rides in ${theCountry(cc)}`,
    crumbs: [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], ["Outside the US", `${SITE}/rides/world/`], [name, canonical]],
    canonical,
    description: trunc(`${plural(rides.length, "recurring bicycle group ride")} in ${theCountry(cc)} — ${cities.slice(0, 6).join(", ")}${cities.length > 6 ? " and more" : ""}. Day, time, start point, pace, and when each was last checked.`, 158),
    notes: countryNotesBlock(cc, notes),
  });
}
// /rides/united-states/: pick a state (the biggest cities under it, for the ones who know where they're going).
function usPage(usRides, hubs) {
  const byState = {}; for (const r of usRides) (byState[r.state] ||= []).push(r);
  const states = Object.keys(byState).sort((a, b) => byState[b].length - byState[a].length || stateName(a).localeCompare(stateName(b)));
  const nStates = states.filter((x) => x !== "DC").length;
  const canonical = `${SITE}/rides/united-states/`;
  const crumbs = [["Cycle for Change", `${SITE}/`], ["Find a ride", `${SITE}/find-a-ride/`], ["Group rides", `${SITE}/rides/`], ["United States", canonical]];
  const description = `${usRides.length.toLocaleString("en-US")} recurring bicycle group rides in ${nStates} states${states.includes("DC") ? " and DC" : ""}. Pick a state or a city: day, time, start point, pace, and when each was last checked.`;
  const jsonld = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": canonical, name: "Group rides in the United States", description, url: canonical, dateModified: lastCheckedOf(usRides), author: AUTHOR, publisher: PUBLISHER, breadcrumb: breadcrumbLd(crumbs) },
  ] };
  const home = hubs.find((h) => h.state === "AZ" && h.city === "Phoenix");
  const cityList = [...(home ? [home] : []), ...hubs.filter((h) => h !== home).sort((a, b) => b.rides.length - a.rides.length || a.city.localeCompare(b.city))].slice(0, 6);
  return head({ title: `Group rides in the United States (${usRides.length} rides)`, description, canonical, jsonld }) + `
<main id="main" class="gr-dir">
  <header class="gr-head wrap">
      ${crumbsHtml(crumbs)}
      <h1>Group rides in the United States</h1>
      ${subLine(usRides, `in ${nStates} states${states.includes("DC") ? " and DC" : ""}`)}
  </header>
  <div class="wrap gr-steps">
    ${GEO ? `<section class="gr-step" aria-labelledby="us-map-h">
      <h2 class="gr-filter-label" id="us-map-h">Tap a state</h2>${usMap(byState)}
    </section>` : ""}
    <section class="gr-step" aria-labelledby="us-state-h">
      <h2 class="gr-filter-label" id="us-state-h">${GEO ? "Or pick from the list" : "Pick a state"}</h2>
      <div class="gr-rows-st">
        ${states.slice(0, 10).map(stateRow(byState)).join("\n        ")}
      </div>
      ${states.length > 10 ? `<details class="gr-fold">
        <summary>All ${states.length}, A to Z</summary>
        <div class="gr-rows-st">
        ${states.slice().sort((a, b) => stateName(a).localeCompare(stateName(b))).map(stateRow(byState)).join("\n        ")}
        </div>
      </details>` : ""}
    </section>
    <section class="gr-step" aria-labelledby="us-city-h">
      <h2 class="gr-filter-label" id="us-city-h">Or one of the biggest cities</h2>
      <div class="tiles-p">
        ${cityList.map((h) => posterTile({ href: h.path, name: h.city, count: h.rides.length, small: h === home ? "rides<br>home base" : `rides<br>${h.state}`, art: artFor(`${h.state.toLowerCase()}-${slugify(h.city)}`), cls: h === home ? "tile-p--ink" : "" })).join("\n        ")}
      </div>
    </section>
    <p class="back"><a href="/rides/">&larr; Find a group ride</a></p>
${FOOTLINE}
${CTA}
  </div>
</main>
` + foot();
}

// ---------- facet pages (/rides/lgbtq/, /rides/no-drop/, …): pick a state ----------
function facetPage(f, all) {
  const rides = all.filter(f.pick);
  const byState = {}; for (const r of rides) if (isUS(r)) (byState[r.state] ||= []).push(r);
  const states = Object.keys(byState).sort((a, b) => byState[b].length - byState[a].length || stateName(a).localeCompare(stateName(b)));
  const byCountry = {}; for (const r of rides) if (!isUS(r)) (byCountry[r.country] ||= []).push(r);
  const ccs = Object.keys(byCountry).sort((a, b) => byCountry[b].length - byCountry[a].length || countryName(a).localeCompare(countryName(b)));
  const canonical = `${SITE}/rides/${f.slug}/`;
  const crumbs = [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], [FACET_DOOR[f.slug], canonical]];
  const where = `${plural(states.length, "state")}${ccs.length ? ` and ${plural(ccs.length, "more country", "more countries")}` : ""}`;
  const description = trunc(`${rides.length} ${lower1(f.h1)} in ${where}. ${f.intro}`, 158);
  const hrefFor = (list, base) => (list.length === 1 ? `/rides/${list[0].slug}/` : `${base}${f.slug}/`);
  const others = FACETS.filter((x) => x !== f).map((x) => { const n = all.filter(x.pick).length; return n ? door({ href: `/rides/${x.slug}/`, name: FACET_DOOR[x.slug], n, markId: FACET_MARK[x.slug] }) : ""; }).join("\n          ");
  return head({ title: `${f.h1} by state${ccs.length ? " and country" : ""}`, description, canonical, jsonld: pageLd(canonical, f.h1, description, rides, crumbs) }) + `
<main id="main" class="gr-dir gr-facet" data-all="/rides/" data-keep="${f.slug === "gravel" ? "bike=gravel" : `for=${FACET_TAG[f.slug]}`}">
  <header class="gr-head wrap gr-head--badge">
      ${crumbsHtml(crumbs)}
      ${badge({ markId: FACET_MARK[f.slug] })}
      <h1>${esc(f.h1)}</h1>
      ${subLine(rides, `in ${where}`)}
      <p class="gr-why-line">${esc(f.intro)}</p>
      ${f.slug === "beginner" || f.slug === "no-drop" ? firstLink("gr-first-link--head") : ""}
  </header>
  <div class="wrap gr-steps">
    <section class="gr-step" aria-labelledby="fs-h">
      <h2 class="gr-filter-label" id="fs-h">Pick a state</h2>
      <div class="tiles-p tiles-p--wide">
        ${states.map((st) => posterTile({ href: hrefFor(byState[st], `/rides/${st.toLowerCase()}/`), name: st, count: byState[st].length, small: byState[st].length === 1 ? "ride" : "rides", blurb: stateName(st), cls: "tile-p--wide tile-p--code" })).join("\n        ")}
      </div>
    </section>
${FACET_PHOTO[f.slug] ? photoBand(FACET_PHOTO[f.slug], { cls: FACET_PHOTO[f.slug] === "people" ? "ph--wide" : "" }) : ""}
    ${ccs.length ? `<section class="gr-step" aria-labelledby="fc-h">
      <h2 class="gr-filter-label" id="fc-h">Outside the US</h2>
      <div class="tiles-p tiles-p--wide">
        ${ccs.map((cc) => posterTile({ href: hrefFor(byCountry[cc], `/rides/${countrySlug(cc)}/`), name: countryName(cc), count: byCountry[cc].length, small: byCountry[cc].length === 1 ? "ride" : "rides", markId: "globe", cls: "tile-p--country" })).join("\n        ")}
      </div>
    </section>` : ""}
    <section class="gr-step" aria-labelledby="fo-h">
      <h2 class="gr-filter-label" id="fo-h">Other ways to look</h2>
      <div class="gr-tiles">
          ${others}
      </div>
    </section>
    <p class="back"><a href="/rides/">&larr; Find a group ride</a></p>
${FOOTLINE}
${CTA}
  </div>
</main>
` + foot(STEP_JS);
}

// ---------- ride page ----------
function firstTimeBlock(r, hostLabel) {
  const evening = r.start_hhmm && (+r.start_hhmm.slice(0, 2) >= 17 || +r.start_hhmm.slice(0, 2) < 7);
  const bring = ["a helmet", evening ? "front and rear lights (it's a dark-hours ride)" : "water", "a spare tube or patch kit", "a way to pay for the stop"];
  if (evening) bring.splice(2, 0, "water");
  const meet = r.time_local && /meet|gather/i.test(String(r.schedule || "")) ? "the meet time" : (fmtTime(r.start_hhmm) || "the start time");
  // Pass 22 (tools/lib/ride-facts.js): a ride with a slow or waiting group describes the easiest group the host
  // posted, never the fastest (PMBC Saturday said "Expect 20 mph: fast" on a beginner, no-drop ride); a casual
  // ride never gets "you'll breathe hard on the hills"
  const paceLine = esc(X.firstPace(r).text);
  const drop = { "no-drop": "It's no-drop: if you fall off the back, someone waits. That's the point of a group ride.",
    groups: "It splits into pace groups. Pick the slowest one your first time; you can move up next week.",
    drop: "It's a drop ride: if you can't hold the pace, you'll finish alone. Fine if you know your speed. Not a first ride." }[r.drop_policy] || "";
  // Pass 15: folded — four short answers a tap away. Pass 22: open on beginner and no-drop rides (it's what a
  // new rider acts on; the fold rule is for explaining), and "First group ride? Start here" beside it on every ride.
  const open = tagsOf(r).includes("beginner") || tagsOf(r).includes("no-drop");
  return `
    <details class="gr-first gr-fold"${open ? " open" : ""}>
      <summary><span id="gr-first-h">First time on this ride? Here&rsquo;s the drill</span></summary>
      <dl>
        <div><dt>Bring</dt><dd>${esc(bring.join(", "))}.</dd></div>
        <div><dt>Arrive</dt><dd>Ten or fifteen minutes before ${esc(meet)}. Tell whoever's leading that you're new.</dd></div>
        <div><dt>Pace</dt><dd>${paceLine}${drop ? " " + drop : ""}</dd></div>
        <div><dt>Check</dt><dd>${hostLabel ? `Look at ${hostLabel} the day of — that's where cancellations, weather calls and start changes get posted.` : "Check the links below the day of for cancellations and weather calls."}</dd></div>
      </dl>
    </details>
    ${firstLink("gr-first-link--ride")}`;
}
function ridePage(r, all, hubFor, hubs) {
  const url = `${SITE}/rides/${r.slug}/`;
  const f = r._f || F.assess(r, null, TODAY);     // freshness: what this page may promise
  const listed = f.listed;
  const disc = discLabel(r.discipline);
  const start = r.start_location;
  const startName = start ? [start.name, start.address].filter(Boolean).join(", ") : null;
  const mapQ = start && (start.address || start.name) ? encodeURIComponent([start.name, start.address].filter(Boolean).join(", ")) : `${r.lat},${r.lng}`;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQ}`;
  const L = r.links;
  const watchUrl = (r.refresh && r.refresh.watch_url) || null;
  const primary = L.website ? ["Host's website", L.website] : L.instagram ? [`${handle(L.instagram) || "Instagram"} on Instagram`, L.instagram] : L.facebook ? ["Host on Facebook", L.facebook] : L.strava ? ["Strava club", L.strava] : L.meetup ? ["Meetup group", L.meetup] : watchUrl ? ["Where it's posted", watchUrl] : r.sources[0] ? ["Where it's posted", r.sources[0]] : null;
  const hostLabel = L.instagram ? `<a href="${attr(L.instagram)}" rel="noopener nofollow">${esc(handle(L.instagram) || "their Instagram")}</a>` : L.facebook ? `<a href="${attr(L.facebook)}" rel="noopener nofollow">their Facebook page</a>` : L.website ? `<a href="${attr(L.website)}" rel="noopener nofollow">the host's website</a>` : L.strava ? `<a href="${attr(L.strava)}" rel="noopener nofollow">the Strava club</a>` : null;

  // schedule, next occurrence, calendar
  const dp = dayPhrase(r); const tm = fmtTime(r.start_hhmm);
  // no "next ride", Event or calendar file for a ride we can't vouch for, nor for one on its seasonal break
  const next = listed ? nextOccurrence(r) : null;                                   // by the ride's rule
  const dated = listed && !next && !onBreak(r) ? upcomingDates(r) : [];             // or the host's own dates still ahead
  const back = listed && onBreak(r) ? backOf(r) : null;
  const periods = next ? periodsOf(r, next) : [];
  const rule = periods.length ? periods[0].rule : null;
  // the host's coming start-time changes, said plainly under "When"
  const later = (Array.isArray(r.start_times) ? r.start_times : []).filter((e) => next && e.from > localYmd(next, r.tz));
  const laterText = later.length ? `Then ${later.map((e) => `${fmtTime(e.start_hhmm)} from ${F.fmt(e.from, { short: true, today: TODAY })}`).join(", ")}, by the host's own schedule.` : null;
  const ledeDiscs = (r.discipline.length > 1 ? r.discipline.filter((d) => d !== "mixed") : r.discipline).map((d) => (DISC_LABEL[d] || d).toLowerCase());
  const ledeDisc = ledeDiscs.length > 1 ? ledeDiscs.slice(0, -1).join(", ") + " and " + ledeDiscs.slice(-1) : ledeDiscs[0];
  const dist = distText(r, { long: true });
  let lede = r.kind === "open-streets" ? `${r.name} is an open-streets program in ${placeText(r)}: streets closed to cars and open to bikes.`
    : r.kind === "critical-mass" ? `${r.name} is a Critical Mass ride in ${placeText(r)}.`
    : r.kind === "training-series" ? `${r.name} is a series of ${ledeDisc} training rides in ${placeText(r)}.`
    : `${r.name} is a ${ledeDisc} group ride in ${placeText(r)}.`;
  if (dp && tm && r.kind === "open-streets") lede += ` It runs ${lower1(dp)} from ${tm}${isUS(r) ? "" : " local time"}.`;
  else if (dp && tm) lede += ` It rolls ${lower1(dp)} at ${tm}${isUS(r) ? "" : " local time"}${start && start.name ? ` from ${start.name}` : ""}.`;
  else if (r.schedule) lede += ` Schedule: ${r.schedule.replace(/\.$/, "")}${start && start.name ? `, from ${start.name}` : ""}.`;
  if (onBreak(r)) lede += " It's on its seasonal break now.";
  if (dist) lede += ` About ${dist}${r.pace ? `, ${lower1(r.pace)}` : ""}.`;
  else if (r.pace) lede += ` Pace: ${lower1(r.pace)}.`;
  if (r.drop_policy === "no-drop" && !/no-drop/i.test(lede)) lede += " No-drop.";
  const description = trunc(lede, 158);
  // Pass 15: the page shows the first sentence and the when; the facts below carry the rest
  const ledeShort = lede.split(/(?<=\.)\s+(?=About |Pace: |No-drop\.)/)[0];
  const title = rideTitle(r);

  const hub = hubFor[r.slug];
  const areaName = isUS(r) ? stateName(r.state) : countryName(r.country);
  const areaText = isUS(r) ? stateName(r.state) : theCountry(r.country);
  const areaPath = isUS(r) ? `/rides/${r.state.toLowerCase()}/` : `/rides/${countrySlug(r.country)}/`;
  const crumbs = [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], [areaName, `${SITE}${areaPath}`]];
  if (hub) crumbs.push([hub.city, `${SITE}${hub.path}`]);
  crumbs.push([r.name, url]);

  // nearby: only rides that are on the lists; km outside the US
  const nearby = all.filter((o) => o.slug !== r.slug).map((o) => ({ o, d: miles(r, o) })).sort((a, b) => a.d - b.d).slice(0, 4);
  const nearText = (d, o) => (d < 0.5 ? "same start" : isUS(r) ? `${Math.round(d)} mi` : `${Math.round(d * 1.609344)} km`);

  const facts = [
    ["When", dp && tm ? `${dp}, ${tm}${isUS(r) ? "" : " local time"}` : r.schedule, onBreak(r) ? `On its seasonal break now.${back ? " " + back.long : ""}` : laterText && dp && tm ? [laterText, r.season_months ? `Season: ${r.season || "seasonal"}.` : null].filter(Boolean).join(" ") : r.season_months ? `Season: ${r.season || "seasonal"}` : r.season === "year-round" ? "Year-round" : (dp && tm && r.schedule && r.schedule !== `${dp}, ${tm}` ? r.schedule : null)],
    ["Starts at", startName ? `${esc(startName)} <a class="gr-map" href="${attr(mapUrl)}" rel="noopener">Map ↗</a>` : null, null, true],
    ["Distance", dist, r.duration || (r.duration_min ? `about ${Math.round(r.duration_min / 60 * 10) / 10} hours` : null)],
    ["Pace", r.pace, r.drop_policy && r.drop_policy !== "unknown" ? { "no-drop": "No-drop: nobody gets left", drop: "Drop ride: keep up or get dropped", groups: "Splits into pace groups" }[r.drop_policy] : null],
    ["Hosted by", r.host ? r.host.name : null, r.host && r.host.type ? HOST_TYPE[r.host.type] : null],
    ["Started", r.founded_year ? String(r.founded_year) : null, r.founded_note],
    ["Cost", r.cost, null],
    ["Kind of ride", disc, kindLabel(r)],
    // Pass 22: only when the ride's own text states a rule (tools/lib/ride-facts.js ebikeOf); the host's words under it
    ["E-bikes", r._eb ? r._eb.label : null, r._eb ? r._eb.quote : null],
    ["Made for", cardTagLabels(r).filter((t) => t !== "No-drop").join(" · ") || null, null],
    ["Language", langLine(r) ? `Rides in ${langLine(r)}` : null, null],
  ].filter((x) => x[1]);
  // Pass 15: every fact carries its mark, like the event pages
  const FACT_MARK = { When: "date", "Starts at": "start", Distance: "distance", Pace: "fast", "Hosted by": "organizer", Started: "founded", Cost: "cost", "Kind of ride": MARK_OF[r.discipline[0]] || "mixed", "E-bikes": "ebike", "Made for": "riders", Language: "globe" };
  const factHtml = ([k, v, sub, raw]) =>
    `<div class="gr-fact">${mark(FACT_MARK[k] || "checked", "gr-fact-mark")}<dt>${k}</dt><dd>${raw ? v : esc(v)}${sub ? `<small>${esc(sub)}</small>` : ""}</dd></div>`;
  // Pass 22: the four a rider decides on (When / Starts at / Distance / Pace) sit on the first screen, above the
  // buttons; the rest follow the checked line
  const KEY = new Set(["When", "Starts at", "Distance", "Pace"]);
  const keyFactsHtml = facts.filter(([k]) => KEY.has(k)).map(factHtml).join("\n        ");
  const factsHtml = facts.filter(([k]) => !KEY.has(k)).map(factHtml).join("\n        ");

  const linkBtns = [
    L.website && ["Website", L.website],
    L.instagram && [handle(L.instagram) || "Instagram", L.instagram],
    L.facebook && ["Facebook", L.facebook],
    L.strava && ["Join the Strava club", L.strava],
    L.meetup && ["Meetup group", L.meetup],
    ...(L.other || []).map((u) => ["More", u]),
    watchUrl && ![L.website, L.instagram, L.facebook, L.strava, L.meetup, ...(L.other || [])].includes(watchUrl) && ["Where it's posted", watchUrl],
  ].filter(Boolean).map(([t, u]) => `<a class="btn ${/strava/i.test(t) ? "btn--ink" : "btn--ghost"}" href="${attr(u)}" rel="noopener nofollow">${esc(t)} ↗</a>`).join("\n        ");

  const tags = (r.confidence === "low" ? `<span class="gr-tag gr-tag-warn" title="We found this ride but couldn't confirm every detail">Unconfirmed — check with the host</span>` : "")
    + (r.host && r.host.claimed ? `<span class="gr-tag gr-tag-ok">Verified by the organizer</span>` : "");

  // JSON-LD: WebPage (dates, author, breadcrumb) + Event only when the schedule is computable
  // Search pass (Oct 5, 2026): no Event markup while the ride is flagged or found on one source only — the page itself
  // says "confirm with the host"; a ride we hand Google as scheduled has to be one we'd stand behind today.
  const eventOk = f.state !== "flagged" && r.confidence !== "low";
  const graph = [{
    "@type": "WebPage", "@id": url, url, name: title, description, dateModified: f.checked_on || r.verified_on, author: AUTHOR, publisher: PUBLISHER,
    breadcrumb: breadcrumbLd(crumbs), ...(eventOk && (next || dated.length) ? { mainEntity: { "@id": `${url}#event` } } : {}),
  }];
  const placeLd = { "@type": "Place", name: (start && start.name) || placeText(r),
    address: { "@type": "PostalAddress", ...(start && start.address ? { streetAddress: start.address } : {}), addressLocality: r.city, ...(r.state || r.region ? { addressRegion: r.state || r.region } : {}), addressCountry: r.country },
    geo: { "@type": "GeoCoordinates", latitude: r.lat, longitude: r.lng } };
  if (eventOk && !next && dated.length) {
    // posted date by date: the next date the host has posted, no repeating schedule
    const d = dated[0];
    graph.push({
      "@type": "Event", "@id": `${url}#event`, name: r.name, description, url,
      startDate: d.allDay ? d.ymd : isoWithOffset(d.at, r.tz),
      ...(!d.allDay && r.duration_min ? { endDate: isoWithOffset(new Date(d.at.getTime() + r.duration_min * 60000), r.tz) } : {}),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled",
      ...(/^free/i.test(r.cost || "") ? { isAccessibleForFree: true } : /\$\s?\d|membership|fee\b(?! stated)/i.test(r.cost || "") ? { isAccessibleForFree: false } : {}), location: placeLd,
      ...(r.host ? { organizer: { "@type": "Organization", name: r.host.name, ...(L.website || L.instagram || L.facebook ? { url: L.website || L.instagram || L.facebook } : {}) } } : {}),
      sameAs: [L.website, L.instagram, L.facebook, L.strava, L.meetup].filter(Boolean),
    });
  }
  if (next && eventOk) {
    const ev = {
      "@type": "Event", "@id": `${url}#event`, name: r.name, description, url,
      startDate: isoWithOffset(next, r.tz),
      ...(r.duration_min ? { endDate: isoWithOffset(new Date(next.getTime() + r.duration_min * 60000), r.tz) } : {}),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled",
      ...(/^free/i.test(r.cost || "") ? { isAccessibleForFree: true } : /\$\s?\d|membership|fee\b(?! stated)/i.test(r.cost || "") ? { isAccessibleForFree: false } : {}), image: OG_IMAGE,
      location: { "@type": "Place", name: (start && start.name) || placeText(r),
        address: { "@type": "PostalAddress", ...(start && start.address ? { streetAddress: start.address } : {}), addressLocality: r.city, ...(r.state || r.region ? { addressRegion: r.state || r.region } : {}), addressCountry: r.country },
        geo: { "@type": "GeoCoordinates", latitude: r.lat, longitude: r.lng } },
      eventSchedule: { "@type": "Schedule", scheduleTimezone: r.tz, startTime: r.start_hhmm,
        byDay: [...new Set((r.monthly_rule && r.monthly_rule.length ? r.monthly_rule.map((m) => m.day) : r.days).map((d) => "https://schema.org/" + DAY_LONG[d]))],
        // a monthly rule's weeks (schema.org byMonthWeek: 1–5; "last" has no number there, so it says only the day)
        ...(r.monthly_rule && r.monthly_rule.some((m) => m.ord > 0) ? { byMonthWeek: [...new Set(r.monthly_rule.filter((m) => m.ord > 0).map((m) => m.ord))] } : {}),
        repeatFrequency: { weekly: "P1W", biweekly: "P2W", monthly: "P1M", seasonal: "P1W" }[r.frequency] || "P1W" },
      ...(r.host ? { organizer: { "@type": "Organization", name: r.host.name, ...(L.website || L.instagram || L.facebook ? { url: L.website || L.instagram || L.facebook } : {}) } } : {}),
      sameAs: [L.website, L.instagram, L.facebook, L.strava, L.meetup].filter(Boolean),
    };
    graph.push(ev);
  }
  const jsonld = { "@context": "https://schema.org", "@graph": graph };

  const calBtns = next && rule ? `
        ${rideBtn({ href: `/rides/${r.slug}/ride.ics`, text: "Add to calendar", markId: "date", ghost: true, attrs: ` download="${attr(r.slug)}.ics"` })}
        <a class="gr-minor" href="${attr(gcalUrl(r, next, rule))}" rel="noopener">Google Calendar</a>`
    : dated.length ? `
        ${rideBtn({ href: `/rides/${r.slug}/ride.ics`, text: dated.length > 1 ? `Add the ${dated.length} dates to calendar` : "Add to calendar", markId: "date", ghost: true, attrs: ` download="${attr(r.slug)}.ics"` })}` : "";
  // Pass 16: where it is — the state (or country), this ride's dot, the city's ring, the rest of the area light
  const hubR = hubFor[r.slug];
  const locator = mapFigure(shapeOf(isUS(r) ? r.state : null, isUS(r) ? null : r.country), {
    focus: r, dim: all.filter((o) => o.slug !== r.slug && (isUS(r) ? o.state === r.state : o.country === r.country)),
    labels: hubR ? [hubLabel(hubR)] : [], ringMiles: hubR ? (isUS(r) ? METRO_RADIUS : WORLD_RADIUS_KM / 1.609344) : null, ringAt: hubR,
    title: `Map of ${isUS(r) ? stateName(r.state) : countryName(r.country)} with this ride's start`,
    caption: `<span>${mark("start", "gr-map-cap-mark")}${esc(placeText(r))}</span>${hubR ? `<a href="${hubR.path}">All rides near ${esc(hubR.city)} &rarr;</a>` : ""}`, cls: "gr-map--ride" });

  const watch = (r.refresh && r.refresh.watch_url) || r.sources[0] || L.website || null;
  const bannerHead = { ended: "This ride has ended", paused: "Paused", stale: "Not confirmed lately", flagged: "We're re-checking this ride" }[f.state] || "Check first";
  const banner = !listed && f.banner ? `
    <div class="gr-banner" role="note">
      <p><strong>${esc(bannerHead)}.</strong> ${esc(f.banner)}</p>
      <p><a class="link" href="#nearby">Rides near here we have checked</a></p>
    </div>` : listed && onBreak(r) ? `
    <div class="gr-banner gr-banner--break" role="note">
      <p><strong>On its seasonal break.</strong> No rides until it's back.${r.status_note ? " " + esc(r.status_note) : ""}${back ? " " + esc(back.long) : " We'll list the next date when the host posts it."}</p>
      <p><a class="link" href="#nearby">Rides near here that are rolling now</a></p>
    </div>` : "";
  const checkedBlock = listed ? `
    <aside class="gr-checked${f.nudge ? " gr-checked--look" : ""}" aria-label="When this ride was last checked">
      ${mark(f.nudge ? "flag" : "checked", "gr-checked-mark")}
      <div>
        <p class="gr-checked-line"><strong>${esc(f.label)}.</strong> ${f.checked_by === "feed" ? "The host's own calendar lists the next ride." : r.confidence === "high" ? "Confirmed on the host's own page." : (r.confidence === "low" ? "Found on one source, listed at the foot of this page." : "Confirmed against the sources at the foot of this page.")}${watch ? ` <a class="link" href="${attr(watch)}" rel="noopener nofollow">Check the host's page before you go</a>` : ""}</p>
        ${f.nudge ? `<p class="gr-checked-nudge">${esc(f.nudge)}</p>` : ""}
        ${r.evidence || (r.last_seen && r.last_seen !== f.checked_on) ? `<details class="gr-checked-more"><summary>How we know</summary>${r.evidence ? `<p class="gr-checked-ev">${esc(r.evidence)}</p>` : ""}${r.last_seen && r.last_seen !== f.checked_on ? `<p>Last seen happening ${esc(fmtDate(r.last_seen))}.</p>` : ""}</details>` : ""}
      </div>
    </aside>` : "";
  const visitBlock = r.visitor_notes ? `
    <section class="gr-visit" aria-labelledby="gr-visit-h">
      <h2 id="gr-visit-h">For visitors</h2>
      <p>${esc(r.visitor_notes)}</p>
    </section>` : "";

  return head({ title, description, canonical: url, jsonld, ogType: "article", noindex: !listed }) + `
<main id="main" class="wrap gr-ride">
  <article class="ride" data-ride
    data-tz="${attr(listed ? r.tz || "" : "")}" data-time="${attr(next ? r.start_hhmm || "" : "")}" data-days="${r.days.join(" ")}"
    data-dates="${attr(dated.length ? JSON.stringify(dated.map((d) => [d.at.toISOString(), d.allDay ? `${fmtDay(d.ymd)} · time on the host's page` : fmtNext(d.at, r.tz)])) : "")}"
    data-freq="${attr(r.frequency || "")}" data-season="${r.season_months ? `${r.season_months.start}-${r.season_months.end}` : ""}"
    data-monthly="${attr(r.monthly_rule ? JSON.stringify(r.monthly_rule) : "")}"
    data-times="${attr(listed && Array.isArray(r.start_times) && r.start_times.length ? JSON.stringify(r.start_times.map((e) => [e.from, e.start_hhmm])) : "")}">
    ${crumbsHtml(crumbs)}

    <h1>${esc(r.name)}</h1>
    ${r.name_en ? `<p class="gr-name-en">${esc(r.name_en)}</p>` : ""}
    <p class="gr-place">${esc(placeText(r))}${r.neighborhood ? ` · ${esc(r.neighborhood)}` : ""} · ${esc(discText(r))}</p>
    ${tags ? `<p class="gr-tags">${tags}</p>` : ""}
${banner}
    ${keyFactsHtml ? `<dl class="gr-facts gr-facts--key">
        ${keyFactsHtml}
    </dl>` : ""}

    ${listed ? "" : "<!-- off the lists: no next ride -->"}<div class="gr-next" id="gr-next" ${next || dated.length ? "" : "hidden"}${listed ? "" : " data-off"}>
      <span class="gr-next-label">Next ride</span>
      <time class="gr-next-when" data-next-text${next ? ` datetime="${isoWithOffset(next, r.tz)}"` : dated.length ? ` datetime="${dated[0].allDay ? dated[0].ymd : isoWithOffset(dated[0].at, r.tz)}"` : ""}>${next ? esc(fmtNext(next, r.tz)) : dated.length ? esc(dated[0].allDay ? `${fmtDay(dated[0].ymd)} · time on the host's page` : fmtNext(dated[0].at, r.tz)) : ""}</time>
      <span class="gr-next-rel" data-next-rel>${next && r.frequency === "biweekly" ? "every other week — confirm which week with the host" : ""}</span>
    </div>

    <div class="gr-actions">
      ${primary ? rideBtn({ href: attr(primary[1]), text: esc(primary[0]), markId: "organizer", ext: true, cls: "gr-primary" }) : ""}${calBtns}
      <button type="button" class="btn btn--ghost gr-save-btn" data-save="${r.slug}" aria-pressed="false"><span aria-hidden="true">☆</span> <span data-save-label>Save</span></button>
      <button type="button" class="btn btn--ghost" id="gr-share" data-title="${attr(r.name + " — " + placeText(r))}">Share</button>
      <span class="gr-share-alt" id="gr-share-alt" hidden><a href="sms:?&body=${encodeURIComponent(r.name + " — " + url)}">Text it</a> · <a href="https://wa.me/?text=${encodeURIComponent(r.name + " — " + url)}" rel="noopener">WhatsApp</a> · <a href="mailto:?subject=${encodeURIComponent("Group ride: " + r.name)}&body=${encodeURIComponent(url)}">Email</a></span>
      <span class="gr-toast" id="gr-toast" role="status" aria-live="polite"></span>
    </div>

${checkedBlock}
    ${factsHtml ? `<dl class="gr-facts">
        ${factsHtml}
    </dl>` : ""}
${locator}
${visitBlock}
${firstTimeBlock(r, hostLabel)}
    <div class="gr-about">
      <h2>About the ${esc(r.name)} group ride</h2>
      <p class="lede gr-about-lede">${esc(ledeShort)}</p>
      ${(r.description || "").split(/\n+/).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join("\n      ") || "<p>Details are on the host's page below.</p>"}
    </div>

    <div class="gr-links">
      <h2>Where to find them</h2>
      <div class="gr-linkrow">
        ${linkBtns}
      </div>
    </div>

${(() => { if (!isUS(r)) return ""; const town = TOWNS.find({ city: r.city, state: r.state, lat: r.lat, lng: r.lng }); return town ? TOWNS.strip(town, { compact: true, heading: `Riding ${esc(town.name)} from out of town?`, lede: `Where the routes are, who fixes or rents a bike, where to sleep with it, how to get it here.` }) : ""; })()}

    <p class="verified gr-verify">
      ${r.verified_on ? `Checked ${esc(fmtDate(r.verified_on))} against` : "Found on"} ${r.sources.length ? r.sources.map((s, i) => `<a href="${attr(s)}" rel="noopener nofollow">source ${i + 1}</a>`).join(", ") : "the links above"}.
      Schedules change. Confirm with the host before you go.
    </p>
${BLOCKS.REPORT({ thing: "ride", name: r.name, kind: "changed", compact: true, id: "fix", stillOn: listed })}
  </article>

  <nav class="related gr-related" id="nearby" aria-label="Nearby group rides">
    <h2>${listed ? "Nearby rides" : "Checked rides near here"}</h2>
    ${nearby.map(({ o, d }) => `<a href="/rides/${o.slug}/">${esc(o.name)} <small>· ${esc(placeText(o))} · ${esc(kindLabel(o) || DISC_LABEL[o.discipline[0]] || o.discipline[0])} · ${nearText(d, o)}</small></a>`).join("\n    ")}
    ${hub ? `<a href="${hub.path}">All rides near ${esc(hub.city)} →</a>` : ""}
    ${listed ? [...(hub ? [...tagsOf(r).map((t) => [TAG_SLUG[t], TAG_H1[t]]), ...r.discipline.map((d) => [DISC_SLUG[d], DISC_H1[d]])].filter(([s]) => s && LINKABLE.has(`${hub.path}${s}/`)).map(([s, h]) => `<a href="${hub.path}${s}/">${esc(h)} group rides in ${esc(hub.city)} →</a>`) : []), ...FACETS.filter((fc) => fc.pick(r) && LINKABLE.has(`${areaPath}${fc.slug}/`)).map((fc) => `<a href="${areaPath}${fc.slug}/">${esc(fc.h1)} in ${esc(areaText)} →</a>`)].join("\n    ") : ""}
    <a href="${areaPath}">All rides in ${esc(areaText)} →</a>
  </nav>

  <p class="back"><a href="/rides/">← Find another group ride</a></p>
${CTA}
</main>
` + foot(`
<script src="/rides/ride.js" defer></script>`);
}

// ---------- sitemap (lastmod = real verified dates, never "today") ----------
function sitemap(rides, states, hubs, worldCCs = [], worldHubs = [], steps = [], skip = new Set()) {
  // rides = the rides on the lists; lastmod = the last check, never "today"
  const maxOf = (list) => lastCheckedOf(list);
  const rows = [[`${SITE}/find-a-ride/`, maxOf(rides)], [`${SITE}/find-a-ride/gravel/`, maxOf(rides)], [`${SITE}/rides/`, maxOf(rides)], [`${SITE}/rides/about/`, maxOf(rides)]];
  if (rides.some((r) => !isUS(r))) rows.push([`${SITE}/rides/world/`, maxOf(rides.filter((r) => !isUS(r)))]);
  for (const pg of steps) rows.push([`${SITE}${pg.path}`, maxOf(pg.rides)]);
  const us = rides.filter(isUS);
  if (us.length) rows.push([`${SITE}/rides/united-states/`, maxOf(us)]);
  for (const st of states) rows.push([`${SITE}/rides/${st.toLowerCase()}/`, maxOf(rides.filter((r) => r.state === st))]);
  for (const h of hubs) rows.push([`${SITE}${h.path}`, maxOf(h.rides)]);
  for (const cc of worldCCs) rows.push([`${SITE}/rides/${countrySlug(cc)}/`, maxOf(rides.filter((r) => r.country === cc))]);
  for (const h of worldHubs) rows.push([`${SITE}${h.path}`, maxOf(h.rides)]);
  for (const f of FACETS) { const l = rides.filter(f.pick); if (l.length) rows.push([`${SITE}/rides/${f.slug}/`, maxOf(l)]); }
  for (const r of rides) rows.push([`${SITE}/rides/${r.slug}/`, (r._f && r._f.checked_on) || r.verified_on]);
  const kept = rows.filter(([u]) => !skip.has(u.replace(SITE, "")));   // Oct 6: no duplicates, no thin pages
  rows.length = 0; rows.push(...kept);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows.map(([u, d]) => `  <url><loc>${u}</loc><lastmod>${d}</lastmod></url>`).join("\n")}
</urlset>
`;
}

// ---------- duplicate and thin list pages (Oct 6, 2026, Search Lab) ----------
// The audit found 108 groups of list pages showing the very same rides (/rides/al/ and /rides/al/all/; the /mixed/
// pages of Phoenix, Scottsdale and Goodyear). Every page keeps working for people; for search:
//  - a short page (a pick inside a place, or its /all/ list) whose rides are exactly another list page's points its
//    canonical at that page: a place page (state, country, city) when one has the same rides, else the copy under
//    the biggest place (then the shortest path), and is left out of the sitemap;
//  - a city hub with exactly its state's or country's rides points at the state or country page;
//  - a short page or national facet page with 2 rides or fewer is `noindex, follow` and left out of the sitemap.
const THIN_MAX = 2;
function setCanonical(html, to) {
  return html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${attr(SITE + to)}">`);
}
const setNoindex = (html) => html.replace(/<meta name="robots" content="[^"]*">/, `<meta name="robots" content="noindex, follow">`);
function dedupePages(places, steps) {
  const sig = (rides) => rides.map((r) => r.slug).sort().join(" ");
  const size = new Map(places.map((p) => [p.path, p.rides.length]));
  const parentSize = (p) => size.get(p.path.replace(/[^/]+\/$/, "")) || 0;
  const groups = new Map();
  for (const pg of [...places, ...steps]) {
    if (!pg.rides.length) continue;
    const k = sig(pg.rides);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(pg);
  }
  const outOfSitemap = new Set();
  let canonical = 0, noindex = 0;
  for (const group of groups.values()) {
    if (group.length < 2) continue;
    const anchors = group.filter((p) => p.rank != null).sort((a, b) => a.rank - b.rank || a.path.length - b.path.length);
    const shorts = group.filter((p) => p.rank == null);
    const keep = anchors[0] || [...shorts].sort((a, b) => /\/all\/$/.test(a.path) - /\/all\/$/.test(b.path)
      || parentSize(b) - parentSize(a) || a.path.length - b.path.length || a.path.localeCompare(b.path))[0];
    // a city hub with exactly its state's or country's rides (/rides/dc/washington/ = /rides/dc/) points at that page
    const cities = keep.rank === 0 ? anchors.filter((p) => p.rank === 1 && p.path.startsWith(keep.path)) : [];
    for (const pg of [...shorts, ...cities]) {
      if (pg === keep || (pg.rank == null && pg.rides.length <= THIN_MAX)) continue;   // a thin short page is noindex below, never both signals
      pg.html = setCanonical(pg.html, keep.path); pg.canonicalTo = keep.path;
      outOfSitemap.add(pg.path); canonical++;
    }
  }
  for (const pg of [...steps, ...places.filter((p) => p.rank === 2)]) {
    if (pg.rides.length > THIN_MAX || /\/all\/$/.test(pg.path)) continue;
    pg.html = setNoindex(pg.html); pg.noindex = true;
    outOfSitemap.add(pg.path); noindex++;
  }
  return { outOfSitemap, canonical, noindex };
}

// ---------- hub URLs that vanish (Oct 6, 2026) ----------
// Hub names follow the data, so city hubs and their short pages come and go (a February 2027 test build dropped 206
// of them; /rides/tx/frisco/<pick>/ 404'd). data/rides-hubs-history.json keeps every list path this build has ever
// written; each one that isn't built any more gets a 301 — the path and everything under it — to the nearest page
// above it that is (the city, else the state or country, else /rides/). They go in a generated block of
// cfc-site/_redirects. Netlify reads _redirects before netlify.toml, so a path netlify.toml already sends somewhere
// is left to it (its subpaths follow the toml's target). The rules are not forced: a page that exists again wins.
const HISTORY_FILE = argOf("--history") ? path.resolve(argOf("--history")) : path.join(ROOT, "data", "rides-hubs-history.json");
const REDIRECTS_FILE = path.join(OUT, "..", "_redirects");
const TOML_FILE = path.join(ROOT, "netlify.toml");
// the committed history grows only on a real build; test builds (--out/--today/--data) read it and leave it alone,
// unless they pass their own --history file
const WRITE_HISTORY = !!argOf("--history") || (!argOf("--out") && !argOf("--today") && !argOf("--data") && !process.argv.includes("--no-history"));
const GEN_BEGIN = "# >>> generated by tools/build-rides.js — vanished rides hubs (data/rides-hubs-history.json). Edits here are overwritten.";
const GEN_END = "# <<< end generated by tools/build-rides.js";
function tomlRedirects() {
  const out = new Map();
  try {
    const t = fs.readFileSync(TOML_FILE, "utf8");
    for (const m of t.matchAll(/\[\[redirects\]\]([\s\S]*?)(?=\[\[|$)/g)) {
      const from = (m[1].match(/^\s*from\s*=\s*"([^"]+)"/m) || [])[1], to = (m[1].match(/^\s*to\s*=\s*"([^"]+)"/m) || [])[1];
      if (from && to) out.set(from, to);
    }
  } catch (e) { /* no toml: nothing to defer to */ }
  return out;
}
function hubRedirects(builtPaths) {
  const built = new Set(builtPaths);
  let hist = {};
  try { hist = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf8")).paths || {}; } catch (e) { hist = {}; }
  let added = 0;
  for (const p of built) if (!hist[p]) { hist[p] = TODAY; added++; }
  if (WRITE_HISTORY && added) {
    const sorted = Object.fromEntries(Object.keys(hist).sort().map((k) => [k, hist[k]]));
    fs.writeFileSync(HISTORY_FILE, JSON.stringify({ about: "Every rides list path (state, country, city hub, short page) tools/build-rides.js has built, with the day it first saw it. Paths that stop being built get a 301 in cfc-site/_redirects. Never remove a path.", paths: sorted }, null, 1) + "\n");
  }
  const toml = tomlRedirects();
  const up = (p) => { let q = p; while (q !== "/rides/") { q = q.replace(/[^/]+\/$/, ""); if (built.has(q)) return q; } return "/rides/"; };
  const vanished = Object.keys(hist).filter((p) => !built.has(p)).sort();
  const lines = []; let skipped = 0;
  const tomlSplats = [...toml.keys()].filter((k) => k.endsWith("*")).map((k) => k.slice(0, -1));
  for (const p of vanished) {
    if (tomlSplats.some((k) => p.startsWith(k))) { skipped++; continue; }           // netlify.toml sends it and all under it
    if (vanished.some((v) => v !== p && p.startsWith(v))) continue;                // a vanished parent's splat already sends it
    if (toml.has(p)) {   // keep the toml's target for its subpaths (or the page above it, once that target is gone too)
      const t = toml.get(p);
      lines.push(`${p}*  ${!t.startsWith("/rides/") || built.has(t) ? t : up(t)}  301`); skipped++; continue;
    }
    const to = up(p);
    lines.push(`${p}  ${to}  301`, `${p}*  ${to}  301`);
  }
  const block = [GEN_BEGIN, ...lines, GEN_END].join("\n");
  let cur = "";
  try { cur = fs.readFileSync(REDIRECTS_FILE, "utf8"); } catch (e) { cur = ""; }
  const i = cur.indexOf(GEN_BEGIN), j = cur.indexOf(GEN_END);
  const next = i > -1 && j > i ? cur.slice(0, i) + block + cur.slice(j + GEN_END.length) : (cur ? cur.replace(/\n*$/, "\n\n") : "") + block + "\n";
  if (next !== cur) write(REDIRECTS_FILE, next);
  return { known: Object.keys(hist).length, added, vanished: vanished.length, rules: lines.length, skipped };
}

// ---------- main ----------
function main() {
  const all = load();
  const health = loadHealth();
  const notes = loadCountryNotes();
  for (const r of all) r._f = F.assess(r, health[r.slug] || null, TODAY);
  // a host's table of start-time changes (start_times): cards, titles, JSON-LD and live.json show the time in
  // force at the next ride; the ride page (ride.js) and /tonight/ read the table for the dates after that
  for (const r of all) if (Array.isArray(r.start_times) && r.start_times.length && r.tz) {
    const n = nextOccurrence(r);
    const eff = n ? S.startOn(r, localYmd(n, r.tz)) : null;
    if (eff && eff !== r.start_hhmm) { r.start_hhmm = eff; r.time_local = fmtTime(eff); }
  }
  const rides = all.filter((r) => r._f.listed);                                   // on the lists
  const pages = all.filter((r) => !(r._f.state === "ended" && r._f.expired));     // every ride that still gets a page
  const states = [...new Set(rides.filter(isUS).map((r) => r.state))].sort();
  const { hubs, hubFor, gone: goneUS } = buildMetros(rides);
  const world = buildWorldHubs(rides);
  const worldCCs = [...new Set(rides.filter((r) => !isUS(r)).map((r) => r.country))].sort((a, b) => countryName(a).localeCompare(countryName(b)));
  const hubForAll = { ...hubFor, ...world.hubFor };

  // every folder directly under /rides/ must be unique: states, facets, countries, rides, art
  const top = new Map();
  const claim = (name, what) => { if (top.has(name)) { console.error(`/rides/${name}/ is claimed twice: ${top.get(name)} and ${what}`); process.exit(1); } top.set(name, what); };
  claim("art", "contour art"); claim("united-states", "the US page");
  claim("about", "how the list works"); claim("add", "the add-a-ride form"); claim("world", "outside the US"); claim("maps", "the outline tiles");
  for (const st of states) claim(st.toLowerCase(), `state ${st}`);
  for (const f of FACETS) claim(f.slug, `facet ${f.slug}`);
  for (const cc of worldCCs) claim(countrySlug(cc), `country ${cc}`);
  for (const r of pages) claim(r.slug, `ride ${r.slug}`);
  const clash = pages.filter((r) => /^[a-z]{2}$/.test(r.slug));
  if (clash.length) { console.error("ride slug looks like a state code: " + clash.map((r) => r.slug).join(", ")); process.exit(1); }

  fs.mkdirSync(OUT, { recursive: true });
  for (const ent of fs.readdirSync(OUT, { withFileTypes: true })) if (ent.isDirectory() && ent.name !== "art") rmrf(path.join(OUT, ent.name));   // art/ is drawn by tools/contour-art.js, never regenerated here
  // Pass 15: the place pages hand back their short pages (/rides/az/phoenix/road/, /rides/az/no-drop/,
  // …/all/) in `steps`; each gets its own folder, never on top of a city or another short page.
  const steps = [];
  if (GEO) { write(path.join(OUT, "maps", "us.svg"), outlineSvg(GEO.nation)); write(path.join(OUT, "maps", "world.svg"), outlineSvg(GEO.world)); }
  for (const [shape, det] of DETAIL_OF) write(path.join(OUT, "maps", "detail", `${det.file}.svg`), detailSvg(shape, det));   // Pass 18
  write(path.join(OUT, "index.html"), directory(rides, hubs, world.hubs));
  // Pass 20: the front door sits beside /rides/ (cfc-site/find-a-ride/), so it follows --out too
  write(path.join(OUT, "..", "find-a-ride", "index.html"), findPage(rides));
  write(path.join(OUT, "..", "find-a-ride", "gravel", "index.html"), gravelPage(rides));
  write(path.join(OUT, "about", "index.html"), aboutPage(rides));
  write(path.join(OUT, "add", "index.html"), addPage(rides));
  if (rides.some((r) => !isUS(r))) write(path.join(OUT, "world", "index.html"), worldPage(rides, world.hubs));
  if (rides.some(isUS)) write(path.join(OUT, "united-states", "index.html"), usPage(rides.filter(isUS), hubs));
  // Oct 6, 2026: the place pages are collected first (not written straight away) so duplicates and thin pages
  // can be marked before anything is written (dedupePages below).
  const places = [];   // { path, rides, html, rank } — rank: 0 state / country, 1 city, 2 national facet
  for (const st of states) { const list = rides.filter((r) => r.state === st); places.push({ path: `/rides/${st.toLowerCase()}/`, rides: list, rank: 0, html: statePage(st, list, hubs, steps) }); }
  const nearHubs = (h, list, dist, max) => list.filter((x) => x !== h && (x.state || x.country) === (h.state || h.country)).map((x) => ({ x, d: dist(h, x) })).filter((x) => x.d <= max).sort((a, b) => a.d - b.d).slice(0, 5);
  for (const h of hubs) places.push({ path: h.path, rides: h.rides, rank: 1, html: cityPage(h, { pages: steps, others: nearHubs(h, hubs, miles, 150), areaRides: rides.filter((r) => r.state === h.state), areaHubs: hubs.filter((x) => x.state === h.state) }) });
  for (const cc of worldCCs) { const list = rides.filter((r) => r.country === cc); places.push({ path: `/rides/${countrySlug(cc)}/`, rides: list, rank: 0, html: countryPage(cc, list, world.hubs, notes, steps) }); }
  for (const h of world.hubs) places.push({ path: h.path, rides: h.rides, rank: 1, html: cityPage(h, { pages: steps, notes, others: nearHubs(h, world.hubs, km, 400), areaRides: rides.filter((r) => r.country === h.country), areaHubs: world.hubs.filter((x) => x.country === h.country) }) });
  for (const f of FACETS) places.push({ path: `/rides/${f.slug}/`, rides: rides.filter(f.pick), rank: 2, html: facetPage(f, rides) });
  const taken = new Set([...hubs, ...world.hubs].map((h) => h.path));
  for (const pg of steps) {
    if (taken.has(pg.path)) { console.error(`${pg.path} is claimed twice (a short page on top of a city or another short page)`); process.exit(1); }
    taken.add(pg.path);
  }
  const marks = dedupePages(places, steps);
  for (const pg of steps) if (!pg.noindex && !pg.canonicalTo) LINKABLE.add(pg.path);   // ride pages link up only to pick pages that stay indexed
  for (const pg of [...places, ...steps]) write(path.join(OUT, ...pg.path.replace(/^\/rides\//, "").split("/").filter(Boolean), "index.html"), pg.html);
  write(path.join(OUT, "index.json"), JSON.stringify(hubJson(rides)));
  write(path.join(OUT, "live.json"), JSON.stringify(liveJson(rides)));
  // Pass 6: the hub centres, for tools/contour-art.js (one contour tile per city hub; world keys are <cc>-<city>)
  // Pass 22: + url (the hub's page) and guide (the town guide's path from scripts/towns.js, or null)
  const guideOf = (h) => { const t = h.state ? TOWNS.find({ city: h.city, state: h.state, lat: h.lat, lng: h.lng }) : null; return t ? t.url : null; };
  write(path.join(OUT, "hubs.json"), JSON.stringify([
    ...hubs.map((h) => ({ key: `${h.state.toLowerCase()}-${h.slug}`, city: h.city, state: h.state, country: "US", lat: +h.lat.toFixed(4), lng: +h.lng.toFixed(4), rides: h.rides.length, url: h.path, guide: guideOf(h) })),
    ...world.hubs.map((h) => ({ key: h.key, city: h.city, state: null, country: h.country, lat: +h.lat.toFixed(4), lng: +h.lng.toFixed(4), rides: h.rides.length, url: h.path, guide: null })),
  ]));
  let nIcs = 0, nEvent = 0, nBreak = 0;
  for (const r of pages) {
    write(path.join(OUT, r.slug, "index.html"), ridePage(r, rides, hubForAll, hubs));
    if (!r._f.listed) continue;
    // a rule: one VEVENT per start-time stretch; posted date by date: one per date still ahead; on a break: none
    const next = nextOccurrence(r); const periods = next ? periodsOf(r, next) : [];
    const dated = !next && !onBreak(r) ? upcomingDates(r) : [];
    if (next || dated.length) nEvent++;
    if (onBreak(r)) nBreak++;
    if (periods.length) { write(path.join(OUT, r.slug, "ride.ics"), ics(r, periods)); nIcs++; }
    else if (dated.length) { write(path.join(OUT, r.slug, "ride.ics"), icsDated(r, dated)); nIcs++; }
  }
  write(path.join(OUT, "sitemap.xml"), sitemap(rides, states, hubs, worldCCs, world.hubs, steps, marks.outOfSitemap));
  const redirects = hubRedirects([...places, ...steps].map((pg) => pg.path));
  const byState = {}; for (const r of all) byState[r._f.state] = (byState[r._f.state] || 0) + 1;
  console.log(`built ${steps.length} short pages (a pick inside a place, or its full list); ${pages.length} ride pages (${rides.length} on the lists; ${Object.entries(byState).map(([k, n]) => `${n} ${k}`).join(", ")}; ${nEvent} with a next ride, ${nIcs} with .ics, ${nBreak} on a seasonal break), ${states.length} state hubs, ${hubs.length} US city hubs, ${worldCCs.length} other countries, ${world.hubs.length} world city hubs → ${path.relative(ROOT, OUT) || OUT}/`);
  const gone = [...goneUS, ...world.gone];
  if (gone.length) console.log(`hubs dropped as copies of a bigger hub (each needs a 301 in netlify.toml): ${gone.map((g) => `${g.from} (${g.n}) → ${g.to} (${g.into})`).join(", ")}`);
  console.log(`list pages: ${marks.canonical} point their canonical at an identical page, ${marks.noindex} thin ones (≤2 rides) are noindex; ${marks.outOfSitemap.size} left out of the sitemap`);
  console.log(`hub history: ${redirects.known} list paths ever built${redirects.added ? ` (${redirects.added} new)` : ""}; ${redirects.vanished} gone → ${redirects.rules} redirects in ${path.relative(ROOT, REDIRECTS_FILE)}${redirects.skipped ? ` (${redirects.skipped} left to netlify.toml)` : ""}`);
  console.log("city hubs: " + [...hubs.map((h) => `${h.city} ${h.state} (${h.rides.length})`), ...world.hubs.map((h) => `${h.city} ${h.country} (${h.rides.length})`)].join(", "));
}
main();
