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

    node tools/build-rides.js [--data file] [--out dir] [--health file] [--today YYYY-MM-DD]

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
  bmx:"BMX", track:"Track", cyclocross:"Cyclocross", ebike:"E-bike", mixed:"Mixed" };
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
const discLabel = (d) => (d || []).map((x) => DISC_LABEL[x] || x).join(" · ");
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
const write = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const trunc = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…");
const lower1 = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const cleanDist = (d) => (d == null ? null : String(d).replace(/^[~≈]\s*/, "").replace(/\s*(mi|miles)$/i, ""));
// Filter tags: the data's inclusive_focus, plus "no-drop" whenever drop_policy says so
// (the two disagree on a handful of rides; the page counts and the chips use this).
const tagsOf = (r) => { const t = [...r.inclusive_focus]; if (r.drop_policy === "no-drop" && !t.includes("no-drop")) t.push("no-drop"); return t; };
// Pace class for the three-tap matcher: easy / steady / fast (a ride can be more than one).
function paceOf(r) {
  const m = String(r.pace || "").match(/(\d{1,2})\s*(?:–|-|to)?\s*(\d{1,2})?\s*mph/i);
  const top = m ? +(m[2] || m[1]) : null;
  const easy = r.inclusive_focus.includes("beginner") || (top != null && top <= 14) || /casual|easy|leisur|slow|party|social|mellow|chill|relaxed/i.test(r.pace || "") || (top == null && r.discipline.includes("social"));
  const fast = (top != null && top >= 18) || r.drop_policy === "drop" || /fast|race|spicy|advanced|drop ride/i.test(r.pace || "");
  const out = [];
  if (easy) out.push("easy");
  if (!easy && !fast || r.drop_policy === "groups" || (top != null && top >= 15 && top <= 17)) out.push("steady");
  if (fast) out.push("fast");
  return out.length ? out : ["steady"];
}
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
function isoWithOffset(date, tz) {
  const p = partsIn(date, tz);
  const local = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
  const off = Math.round((local - date.getTime()) / 60000);
  const sign = off >= 0 ? "+" : "-", a = Math.abs(off);
  return `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}T${String(p.hour).padStart(2, "0")}:${String(p.minute).padStart(2, "0")}:00${sign}${String(Math.floor(a / 60)).padStart(2, "0")}:${String(a % 60).padStart(2, "0")}`;
}
function fmtNext(date, tz) {
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(date);
}
function icsLocal(date, tz) { const p = partsIn(date, tz); return `${p.year}${String(p.month).padStart(2, "0")}${String(p.day).padStart(2, "0")}T${String(p.hour).padStart(2, "0")}${String(p.minute).padStart(2, "0")}00`; }

// Human schedule from structured fields ("Every Tuesday", "Second Wednesday of the month")
function dayPhrase(r) {
  const names = r.days.map((d) => DAY_LONG[d]);
  if (r.monthly_rule && r.monthly_rule.length) return r.monthly_rule.map((m) => `${ORD_WORD[m.ord]} ${DAY_LONG[m.day]}`).join(" and ") + " of the month";
  if (!names.length) return null;
  if (r.frequency === "irregular") return "Some " + names.map((n) => n + "s").join(" and ");   // posted date by date: never "Every Monday"
  if (r.frequency === "biweekly") return "Every other " + names.join(" and ");
  if (r.frequency === "monthly") return "Monthly, on a " + names[0];
  if (names.length === 1) return "Every " + names[0];
  return names.map((n) => n + "s").join(" and ");
}
function shortWhen(r) {   // for <title>: "Tuesdays 8:30 pm" / "2nd Wednesdays" / "Last Fridays"
  if (r.frequency === "irregular") return null;
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
  const desc = [r.pace ? `Pace: ${r.pace}.` : null, r.drop_policy === "no-drop" ? "No-drop." : null, r.schedule ? `Schedule: ${r.schedule}.` : null, "Confirm with the host before you go.", url].filter(Boolean).join("\n");
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
    out.push({
      ...r, country, state: country === "US" ? String(r.state).toUpperCase() : null, lat, lng,
      discipline: Array.isArray(r.discipline) && r.discipline.length ? r.discipline : ["mixed"],
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
  const MAJOR = ["New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","Austin","Jacksonville","Fort Worth","San Jose","Columbus","Charlotte","Indianapolis","San Francisco","Seattle","Denver","Oklahoma City","Nashville","Washington","El Paso","Las Vegas","Boston","Portland","Louisville","Memphis","Detroit","Baltimore","Milwaukee","Albuquerque","Tucson","Fresno","Sacramento","Mesa","Kansas City","Atlanta","Omaha","Colorado Springs","Raleigh","Miami","Virginia Beach","Long Beach","Oakland","Minneapolis","Tulsa","Tampa","Arlington","New Orleans","Wichita","Cleveland","Bakersfield","Honolulu","Anaheim","Santa Ana","Riverside","Corpus Christi","Lexington","Henderson","Stockton","St. Paul","Cincinnati","St. Louis","Pittsburgh","Greensboro","Lincoln","Anchorage","Plano","Orlando","Irvine","Newark","Durham","Chula Vista","Toledo","Fort Wayne","St. Petersburg","Laredo","Jersey City","Chandler","Madison","Lubbock","Scottsdale","Reno","Buffalo","Gilbert","Glendale","North Las Vegas","Winston-Salem","Chesapeake","Norfolk","Fremont","Garland","Irving","Hialeah","Richmond","Boise","Spokane","Baton Rouge","Tacoma","San Bernardino","Modesto","Fontana","Des Moines","Moreno Valley","Santa Clarita","Fayetteville","Birmingham","Oxnard","Rochester","Port St. Lucie","Grand Rapids","Huntsville","Salt Lake City","Frisco","Yonkers","Amarillo","Glendale","Huntington Beach","McKinney","Montgomery","Augusta","Aurora","Akron","Little Rock","Tempe","Columbus","Overland Park","Grand Prairie","Tallahassee","Cape Coral","Mobile","Knoxville","Shreveport","Worcester","Ontario","Vancouver","Sioux Falls","Chattanooga","Brownsville","Fort Lauderdale","Providence","Newport News","Rancho Cucamonga","Santa Rosa","Peoria","Oceanside","Elk Grove","Salem","Pembroke Pines","Eugene","Garden Grove","Cary","Fort Collins","Corona","Springfield","Jackson","Alexandria","Hayward","Clarksville","Lakewood","Lancaster","Salinas","Palmdale","Hollywood","Springfield","Macon","Kansas City","Sunnyvale","Pomona","Killeen","Escondido","Pasadena","Naperville","Bellevue","Joliet","Murfreesboro","Midland","Rockford","Paterson","Savannah","Bridgeport","Torrance","McAllen","Syracuse","Surprise","Denton","Roseville","Thornton","Miramar","Pasadena","Mesquite","Olathe","Dayton","Carrollton","Waco","Orange","Fullerton","Charleston","West Valley City","Visalia","Hampton","Gainesville","Warren","Coral Springs","Cedar Rapids","Round Rock","Sterling Heights","Kent","Columbia","Santa Clara","New Haven","Stamford","Concord","Elizabeth","Athens","Thousand Oaks","Lafayette","Simi Valley","Topeka","Norman","Fargo","Wilmington","Abilene","Odessa","Pearland","Victorville","Hartford","Vallejo","Allentown","Berkeley","Richardson","Arvada","Ann Arbor","Rochester","Cambridge","Sugar Land","Lansing","Evansville","College Station","Fairfield","Clearwater","Beaumont","Independence","Provo","West Jordan","Murfreesboro","Palm Bay","El Monte","Carlsbad","Charleston","Temecula","Clovis","Springfield","Meridian","Westminster","Costa Mesa","High Point","Manchester","Pueblo","Lakeland","Pompano Beach","New Bedford","Portland","Boulder","Burlington","Missoula","Bozeman","Flagstaff","Sedona","Bentonville","Asheville","Santa Fe","Santa Cruz","Santa Barbara","Duluth","Traverse City","Bend","Ithaca","Portsmouth","Morgantown","Athens","Bloomington","Iowa City","Lawrence","Roanoke","Charlottesville","Harrisonburg","Kalamazoo","Green Bay","La Crosse","Montclair","Princeton","Frederick","Annapolis","Stowe","Ventura","Prescott","Laramie","Jackson","Las Cruces","Sparks","Kihei","Kapolei","Sanford","Coral Gables","Edmond","Germantown","Awendaw","Chesterfield","Sunrise","Middletown","Broomfield"];
  const rank = (city) => { const i = MAJOR.indexOf(city); return i < 0 ? 9999 : i; };
  const hubs = [];
  for (const c of list) {
    if (c.rides.length < METRO_MIN) continue;
    if (hubs.some((h) => h.state === c.state && miles(h, c) <= HUB_GAP)) continue;
    // best = most rides of its own, with a bonus for being a genuinely big city (top ~150)
    // the ten biggest cities hold their name against a busy suburb (Phoenix, not Scottsdale), so the
    // home city's hub URL doesn't move when a suburb gains a few rides
    const score = (o) => o.n + (rank(o.city) < 10 ? 8 : rank(o.city) < 120 ? 3 : 0);
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
  // each ride -> nearest hub in its state that covers it (or null)
  const hubFor = {};
  for (const r of rides) {
    const cands = hubs.filter((h) => h.state === r.state && miles(h, r) <= METRO_RADIUS).sort((a, b) => miles(a, r) - miles(b, r));
    hubFor[r.slug] = cands[0] || null;
  }
  return { hubs, hubFor };
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
  const hubFor = {};
  for (const r of rides) {
    const cands = hubs.filter((h) => h.country === r.country && km(h, r) <= WORLD_RADIUS_KM).sort((a, b) => km(a, r) - km(b, r));
    hubFor[r.slug] = cands[0] || null;
  }
  return { hubs, hubFor };
}

// ---------- shared chrome ----------
function head({ title, description, canonical, jsonld, ogType = "website", noindex = false }) {
  return `<!DOCTYPE html>
<!-- GENERATED by tools/build-rides.js from cfc-site/rides/rides.json — edit the data, not this file. -->
<html lang="en">
<head>
${CHROME.head({ title, description, url: canonical, ogType, styles: ["/events/events.css", "/rides/rides.css"], ld: [jsonld], ...(noindex ? { robots: "noindex, follow" } : {}) })}
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
const cardWhen = (r) => (dayPhrase(r) && r.start_hhmm ? `${dayPhrase(r)}, ${fmtTime(r.start_hhmm)}` : (r.schedule || "See the ride's page for schedule"));
const cardStat = (r) => [distText(r), r.pace ? trunc(r.pace, 34) : null].filter(Boolean).join(" · ");
// The freshness line every card carries: "Checked Sep 30", plus "Confirm first" when the policy wants a look.
const cardChecked = (r) => (r._f ? `${r._f.label_short}${r._f.nudge ? " · Confirm first" : ""}` : "");
const cardTagLabels = (r) => tagsOf(r).map((t) => TAG_LABEL[t] || t);
function card(r, opts = {}) {
  const tags = cardTagLabels(r).map((t) => `<span class="gr-tag">${esc(t)}</span>`).join("")
    + (r.confidence === "low" ? `<span class="gr-tag gr-tag-warn">Unconfirmed</span>` : "")
    + (r.host && r.host.claimed ? `<span class="gr-tag gr-tag-ok">Organizer-verified</span>` : "");
  const dist = opts.distance != null && r.geo_precision !== "city" ? `<span class="gr-dist">${Math.round(opts.distance)} ${opts.unit || "mi"} away</span>` : "";
  const stat = cardStat(r);
  const wait = { "no-drop": ["waits", "Waits for you"], groups: ["regroups", "Regroups"], drop: ["drops", "Drops"] }[r.drop_policy];
  const checked = cardChecked(r);
  return `<div class="gr-card" data-slug="${r.slug}"
   data-name="${attr(r.name)}" data-city="${attr(r.city)}" data-state="${r.state || ""}" data-country="${r.country}"
   data-place="${attr([r.region, isUS(r) ? null : countryName(r.country)].filter(Boolean).join(" "))}"
   data-lat="${r.lat}" data-lng="${r.lng}" data-disc="${r.discipline.join(" ")}"
   data-tags="${tagsOf(r).join(" ")}" data-days="${r.days.join(" ")}" data-pace="${paceOf(r).join(" ")}"
   data-host="${attr(r.host ? r.host.name : "")}" data-hood="${attr(r.neighborhood || "")}">
  <span class="gr-card-top">${discMark(r)}<span class="gr-disc">${esc(discText(r))}</span>${dist}</span>
  <a class="gr-card-name" href="/rides/${r.slug}/">${esc(r.name)}</a>
  ${r.name_en ? `<span class="gr-card-en">${esc(r.name_en)}</span>` : ""}
  <span class="gr-card-place">${esc(placeText(r))}${r.neighborhood ? " · " + esc(r.neighborhood) : ""}</span>
  <span class="gr-card-when">${esc(cardWhen(r))}</span>
  ${stat || wait ? `<span class="gr-card-stat">${esc(stat)}${wait ? `${stat ? " · " : ""}<em class="gr-wait gr-wait--${wait[0]}">${wait[1]}</em>` : ""}</span>` : ""}
  ${tags ? `<span class="gr-tags">${tags}</span>` : ""}
  ${checked ? `<span class="gr-card-checked${r._f && r._f.nudge ? " gr-card-checked--look" : ""}">${esc(checked)}</span>` : ""}
  <button type="button" class="gr-save" data-save="${r.slug}" aria-pressed="false" aria-label="Save ${attr(r.name)}"><span aria-hidden="true">☆</span></button>
</div>`;
}

// ---------- search UI (directory + state hubs share it) ----------
function searchUi(rides, { cityIndex, placeholder }) {
  const discChips = Object.entries(DISC_LABEL).filter(([k]) => rides.some((r) => r.discipline.includes(k)))
    .map(([k, v]) => `<button type="button" class="gr-chip" data-filter="disc" data-value="${k}" aria-pressed="false">${v}</button>`).join("\n          ");
  const tagChips = Object.entries(TAG_LABEL).filter(([k]) => rides.some((r) => tagsOf(r).includes(k)))
    .map(([k, v]) => `<button type="button" class="gr-chip" data-filter="tag" data-value="${k}" aria-pressed="false">${v}</button>`).join("\n          ");
  const dayOpts = Object.entries(DAY_LONG).map(([k, v]) => `<option value="${k}">${v}s</option>`).join("");
  return `
  <section class="gr-search-wrap">
    <div class="wrap">
      <form class="gr-search" role="search" id="gr-form" onsubmit="return false">
        <label class="visually-hidden" for="gr-q">Search by city, state or ride name</label>
        <input id="gr-q" type="search" placeholder="${attr(placeholder)}" autocomplete="off" list="gr-cities">
        <datalist id="gr-cities">${cityIndex.map(([k]) => `<option value="${attr(k)}">`).join("")}</datalist>
        <button type="button" class="btn btn--ink" id="gr-geo">Near me</button>
        <a class="gr-tonight" href="/tonight/">What&rsquo;s rolling tonight &rarr;</a>
      </form>
      <div class="gr-filters">
        <div class="gr-filter-row"><span class="gr-filter-label">Bike</span>
          ${discChips}
        </div>
        <div class="gr-filter-row"><span class="gr-filter-label">Made for</span>
          ${tagChips}
        </div>
        <div class="gr-filter-row"><span class="gr-filter-label">When</span>
          <select id="gr-day" aria-label="Day of week"><option value="">Any day</option><option value="today">Today</option><option value="weekend">This weekend</option>${dayOpts}</select>
          <button type="button" class="gr-clear" id="gr-clear" hidden>Clear all</button>
        </div>
      </div>
      <p class="gr-status" id="gr-status" aria-live="polite" data-total="${rides.length}">${rides.length} rides</p>
    </div>
  </section>`;
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
  }));
}
// /rides/live.json: the rides on the lists, with what /tonight/ and scripts/build-events.js need.
// (They used to read rides.json, which also holds rides we've taken off the lists.)
function liveJson(rides) {
  const keep = ["slug", "name", "kind", "city", "state", "country", "region", "neighborhood", "lat", "lng", "tz", "schedule", "days", "time_local",
    "start_hhmm", "start_times", "frequency", "monthly_rule", "season_months", "start_location", "distance_km", "distance_miles", "duration_min", "pace", "drop_policy",
    "discipline", "confidence"];
  return rides.map((r) => ({ ...Object.fromEntries(keep.map((k) => [k, r[k] ?? null])), place: placeText(r), checked: r._f ? r._f.label_short : null }));
}
const FAQ = [
  ["What's a no-drop ride?", `The group waits for the slowest rider. If you come off the back on a hill, someone regroups with you. If it's your first group ride, <a href="/rides/no-drop/">start with one of these</a>.`],
  ["Do I need a road bike?", "No. Social rides and slow rolls take whatever bike you have. Road rides are easier on a road bike. Gravel and mountain bike rides need the tires for it. Every ride page says which bike it's for."],
  ["What do I bring?", "A helmet, water, a spare tube or patch kit, lights if it ends after dark, and a card for the coffee stop. Every ride page has a first-time checklist."],
  ["What if I can't keep up?", `Tell the leader you're new before you roll. Pick a no-drop or <a href="/rides/beginner/">beginner-friendly</a> ride the first time. If a drop ride leaves you, you ride home at your own pace. Nobody minds.`],
];
const lastCheckedOf = (rides) => rides.map((r) => (r._f && r._f.checked_on) || r.verified_on).filter(Boolean).sort().pop() || null;
const fmtDate = (d) => F.fmt(d, { today: TODAY }) || "";
function directory(rides, hubs, worldHubs = []) {
  const byState = {};
  for (const r of rides) if (isUS(r)) (byState[r.state] ||= []).push(r);
  const byCountry = {};
  for (const r of rides) (byCountry[r.country] ||= []).push(r);
  const worldCCs = Object.keys(byCountry).filter((cc) => cc !== "US").sort((a, b) => byCountry[b].length - byCountry[a].length || countryName(a).localeCompare(countryName(b)));
  const nCountries = Object.keys(byCountry).length;
  const states = Object.keys(byState).sort((a, b) => byState[b].length - byState[a].length || stateName(a).localeCompare(stateName(b)));
  const nStates = states.filter((x) => x !== "DC").length;
  const statesText = `${nStates} states${states.includes("DC") ? " and DC" : ""}`;
  const nInclusive = rides.filter((r) => r.inclusive_focus.some((t) => ["lgbtq", "wtf", "bipoc"].includes(t))).length;
  const nNoDrop = rides.filter((r) => tagsOf(r).includes("no-drop")).length;
  const nLow = rides.filter((r) => r.confidence === "low").length;
  const lastChecked = lastCheckedOf(rides);
  const description = `Search ${rides.length} recurring bicycle group rides in ${statesText}${worldCCs.length ? ` and ${worldCCs.length} more ${worldCCs.length === 1 ? "country" : "countries"}` : ""} by city. Road, gravel, mountain bike and social rides — day, time, start point, pace, and when each was last checked.`;
  const jsonld = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${SITE}/rides/`, name: "Find a group ride near you", description, url: `${SITE}/rides/`,
      dateModified: lastChecked, author: AUTHOR, publisher: PUBLISHER, breadcrumb: breadcrumbLd([["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`]]) },
    { "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } })) },
  ] };
  const chip = (filter, value, label, extra = "") => `<button type="button" class="gr-chip" data-filter="${filter}" data-value="${value}" aria-pressed="false"${extra}>${label}</button>`;
  const discChips = Object.entries(DISC_LABEL).filter(([k]) => rides.some((r) => r.discipline.includes(k))).map(([k, v]) => chip("disc", k, v)).join("\n            ");
  const tagChips = Object.entries(TAG_LABEL).filter(([k]) => rides.some((r) => tagsOf(r).includes(k))).map(([k, v]) => chip("tag", k, v)).join("\n            ");
  const dayOpts = Object.entries(DAY_LONG).map(([k, v]) => `<option value="${k}">${v}s</option>`).join("");
  const FACET_MARK = { lgbtq:"lgbtq", "no-drop":"no-drop", beginner:"beginner", "women-trans-femme":"wtf", bipoc:"bipoc", family:"family", gravel:"gravel" };
  const facetTiles = FACETS.map((f) => posterTile({ href: `/rides/${f.slug}/`, name: f.label, count: rides.filter(f.pick).length, small: "rides", blurb: f.blurb, markId: FACET_MARK[f.slug] || "mixed", cls: "tile-p--facet" })).join("\n        ");
  const home = hubs.find((h) => h.state === "AZ" && h.city === "Phoenix");
  const allHubs = [...hubs, ...worldHubs];
  const cityList = [...(home ? [home] : []), ...allHubs.filter((h) => h !== home).sort((a, b) => b.rides.length - a.rides.length || a.city.localeCompare(b.city))];
  const cityTile = (h) => posterTile({ href: h.path, name: h.city, count: h.rides.length, small: h === home ? `rides<br>home base` : `rides<br>${h.state || esc(countryName(h.country))}`, art: artFor(h.state ? `${h.state.toLowerCase()}-${slugify(h.city)}` : h.key), cls: h === home ? "tile-p--ink" : "" });
  const topCities = (cc) => [...new Set(byCountry[cc].map((r) => r.city))].slice(0, 3).join(", ");
  const countryTile = (cc) => cc === "US"
    ? posterTile({ href: "/rides/united-states/", name: "United States", count: byCountry.US.length, small: "rides", blurb: statesText, markId: "globe", cls: "tile-p--country" })
    : posterTile({ href: `/rides/${countrySlug(cc)}/`, name: countryName(cc), count: byCountry[cc].length, small: byCountry[cc].length === 1 ? "ride" : "rides", blurb: topCities(cc), markId: "globe", cls: "tile-p--country" });
  // states: the postal code big (uniform across all 49; "MASSACHUSETTS" never fits a tile), the name small
  const stateTile = (s) => posterTile({ href: `/rides/${s.toLowerCase()}/`, name: s, count: byState[s].length, small: "rides", blurb: stateName(s), cls: "tile-p--wide tile-p--code" });

  return head({ title: "Find a group ride near you", description, canonical: `${SITE}/rides/`, jsonld }) + `
<main id="main" class="gr-dir gr-hub">
  <section class="gr-hero" aria-labelledby="gr-h1">
    <div class="wrap">
      ${crumbsHtml([["Cycle for Change", `${SITE}/`], ["Group rides", null]])}
      <p class="eyebrow">${rides.length} rides &middot; ${nCountries} ${nCountries === 1 ? "country" : "countries"} &middot; newest check ${esc(fmtDate(lastChecked))}</p>
      <h1 id="gr-h1">Find a group ride near you</h1>
      <p class="lede">${nNoDrop} are no-drop, so nobody gets left. ${nInclusive} are run by and for queer, women/trans/femme or BIPOC riders. Type a city or tap Near me.</p>
      <form class="gr-search" role="search" id="gr-form" action="/rides/" method="get">
        <label class="visually-hidden" for="gr-q">Search by city, state, country or ride name</label>
        <input id="gr-q" name="q" type="search" placeholder="City, country or ride name" autocomplete="off" list="gr-cities">
        <datalist id="gr-cities">${cityIndexFor(rides).map(([k]) => `<option value="${attr(k)}">`).join("")}</datalist>
        <button type="button" class="btn btn--bone" id="gr-geo">Near me</button>
      </form>
      <div class="gr-quick" aria-label="Quick filters">
        ${chip("day", "today", "Today")}
        ${chip("day", "weekend", "This weekend")}
        ${chip("tag", "no-drop", "No-drop")}
        ${chip("tag", "beginner", "Beginner friendly")}
        ${chip("tag", "lgbtq", "Made for LGBTQ+")}
        ${chip("disc", "gravel", "Gravel")}
        ${chip("saved", "1", "★ Saved <span data-saved-count></span>", " hidden")}
        <a class="gr-tonight" href="/tonight/">What&rsquo;s rolling tonight &rarr;</a>
      </div>
      <details class="gr-more">
        <summary>More filters</summary>
        <div class="gr-filters">
          <div class="gr-filter-row"><span class="gr-filter-label">Bike</span>
            ${discChips}
          </div>
          <div class="gr-filter-row"><span class="gr-filter-label">Made for</span>
            ${tagChips}
          </div>
          <div class="gr-filter-row"><span class="gr-filter-label">When</span>
            <select id="gr-day" aria-label="Day of week"><option value="">Any day</option><option value="today">Today</option><option value="weekend">This weekend</option><option value="weekday">Weekdays</option>${dayOpts}</select>
          </div>
        </div>
      </details>
      <p class="gr-status" id="gr-status" aria-live="polite" data-total="${rides.length}"></p>
    </div>
  </section>

  <section class="gr-results-wrap wrap" id="results" aria-label="Matching rides" hidden>
    <div class="gr-results-head"><p class="gr-results-count" id="gr-count"></p><button type="button" class="gr-clear" id="gr-clear">Clear all</button></div>
    <div id="gr-results" class="gr-grid"></div>
    <p class="gr-more-row"><button type="button" class="btn btn--ghost" id="gr-show-more" hidden>Show more</button></p>
    <div class="gr-empty" id="gr-empty" hidden>
      <p>No rides match.</p>
      <p class="gr-empty-actions"><button type="button" class="gr-chip" id="gr-widen">Show the closest rides anyway</button> <button type="button" class="gr-chip" data-clear>Clear filters</button> <a class="gr-chip" href="#add">Add a ride we're missing</a></p>
    </div>
  </section>

  <div class="wrap">
    <section class="gr-match" id="match" aria-labelledby="match-h">
      <div class="gr-match-head">
        <p class="eyebrow">Not sure what to type?</p>
        <h2 id="match-h">Three taps.</h2>
      </div>
      <div class="gr-match-grid">
        <fieldset data-m="ride"><legend>What do you ride?</legend>
          <button type="button" class="gr-chip" data-v="road" aria-pressed="false">Road</button>
          <button type="button" class="gr-chip" data-v="gravel" aria-pressed="false">Gravel</button>
          <button type="button" class="gr-chip" data-v="mtb" aria-pressed="false">Mountain</button>
          <button type="button" class="gr-chip" data-v="" aria-pressed="true">Anything</button>
        </fieldset>
        <fieldset data-m="pace"><legend>How fast?</legend>
          <button type="button" class="gr-chip" data-v="easy" aria-pressed="false">Easy, no-drop</button>
          <button type="button" class="gr-chip" data-v="steady" aria-pressed="false">Steady</button>
          <button type="button" class="gr-chip" data-v="fast" aria-pressed="false">Fast</button>
          <button type="button" class="gr-chip" data-v="" aria-pressed="true">Any pace</button>
        </fieldset>
        <fieldset data-m="when"><legend>When?</legend>
          <button type="button" class="gr-chip" data-v="weekday" aria-pressed="false">Weekdays</button>
          <button type="button" class="gr-chip" data-v="weekend" aria-pressed="false">Weekends</button>
          <button type="button" class="gr-chip" data-v="" aria-pressed="true">Any day</button>
        </fieldset>
      </div>
      <button type="button" class="btn btn--ink" id="gr-match-go">Show my rides</button>
      <p class="gr-match-note">Type your city up top first and the results sort by distance.</p>
    </section>

    <section class="dir-browse" aria-labelledby="who-h">
      <h2 id="who-h">By who's riding</h2>
      <div class="tiles-p tiles-p--facets">
        ${facetTiles}
      </div>
    </section>

    <section class="dir-browse" aria-labelledby="city-h">
      <h2 id="city-h">By city <span class="gr-count">${cityList.length} cities with a page of their own</span></h2>
      <div class="tiles-p">
        ${cityList.slice(0, 12).map(cityTile).join("\n        ")}
      </div>
      <details class="dir-all"><summary>All ${cityList.length} cities</summary>
        <div class="tiles-p">
        ${cityList.slice(12).map(cityTile).join("\n        ")}
        </div>
      </details>
    </section>

    <section class="dir-browse" aria-labelledby="country-h">
      <h2 id="country-h">By country <span class="gr-count">${nCountries}</span></h2>
      <div class="tiles-p tiles-p--wide">
        ${["US", ...worldCCs].filter((cc) => byCountry[cc]).map(countryTile).join("\n        ")}
      </div>
    </section>

    <section class="dir-browse" aria-labelledby="state-h">
      <h2 id="state-h">By state <span class="gr-count">${states.length}</span></h2>
      <div class="tiles-p tiles-p--wide">
        ${states.map(stateTile).join("\n        ")}
      </div>
    </section>
${BLOCKS.BUILT([
    ["Checked", "At the source", "Every ride was confirmed where its host posts it: a club site, a shop calendar, a city program. Every card says when."],
    ["Dated", `Newest check ${esc(fmtDate(lastChecked))}`, `A ride we can't re-confirm within ${F.POLICY.HIDE_DAYS} days comes off the list on its own. Its page stays up and says why.`],
    ["Flagged", `${nLow} marked Unconfirmed`, "Found on one source, or a detail we couldn't pin down. The card tells you to confirm first."],
    ["Free", "No paid placement", "Nobody pays to be listed or to rank. Tell us when a ride is gone, changed, or still on."],
  ])}

    <section class="dir-faq" aria-labelledby="faq-h">
      <h2 id="faq-h">The ones people ask first</h2>
${FAQ.map(([q, a]) => `      <details><summary>${esc(q)}</summary><p>${a}</p></details>`).join("\n")}
    </section>
${BLOCKS.REPORT({ thing: "ride" })}

    <section class="gr-why">
      <h2>Why Cycle for Change keeps a group ride directory</h2>
      <p>A group ride is the cheapest, most reliable way I know to get out of my own head and into a room of people who want you there. Nobody asks what you do. You just ride. In 2027 I&rsquo;m riding 10,000 miles for queer communities, and a lot of them will be on rides like these. This directory exists so anyone, anywhere, can find one this week.</p>
${CRISIS}
    </section>
${CTA}
    <p class="gr-note">Always confirm with the host before you show up; schedules change with the seasons. This site isn't affiliated with any ride listed.</p>
  </div>
</main>
<script id="gr-index" type="application/json">${JSON.stringify({ cities: cityIndexFor(rides), states: Object.entries(STATE_NAMES), countries: countryIndexFor(rides) })}</script>
` + foot(`
<script src="/rides/hub.js" defer></script>`);
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
function hubIntro(rides, placeName) {
  const first = pickFirstRide(rides); const fast = pickFastRide(rides);
  const weeknight = rides.filter((r) => r.days.some((d) => ["mon", "tue", "wed", "thu"].includes(d))).length;
  const weekend = rides.filter((r) => r.days.some((d) => ["sat", "sun"].includes(d))).length;
  const disc = {}; rides.forEach((r) => r.discipline.forEach((d) => { disc[d] = (disc[d] || 0) + 1; }));
  const top = Object.entries(disc).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([d, n]) => `${n} ${DISC_LABEL[d].toLowerCase()}`).join(", ");
  const lines = [];
  lines.push(`${rides.length} recurring group ride${rides.length === 1 ? "" : "s"} around ${placeName}: ${top}. ${weeknight} roll${weeknight === 1 ? "s" : ""} on weeknights, ${weekend} on weekends.`);
  const nm = (r) => esc(r.name) + (r.name_en ? ` (${esc(r.name_en)})` : "");
  if (first) lines.push(`New to group rides? Start with <a href="/rides/${first.slug}/">${nm(first)}</a> in ${esc(first.city)}${first.drop_policy === "no-drop" ? " — it's no-drop, nobody gets left" : ""}.`);
  if (fast && fast !== first) lines.push(`Want to go fast? <a href="/rides/${fast.slug}/">${nm(fast)}</a>${fast.pace ? ` runs ${esc(lower1(fast.pace))}` : " is the quick one"}.`);
  return lines;
}
function eventsNear(events, origin, radius = 100) {
  return events.map((e) => ({ e, d: miles(origin, { lat: +e.lat, lng: +e.lon }) })).filter((x) => x.d <= radius).sort((a, b) => a.d - b.d).slice(0, 3);
}
function eventsBlock(list) {
  if (!list.length) return "";
  return `
      <section class="gr-events">
        <h2 class="gr-state-head">Big events within 100 miles</h2>
        <ul class="gr-event-list">
${list.map(({ e, d }) => `          <li><a href="${attr(e.url)}">${esc(e.name)}</a> <small>· ${esc(e.town)}, ${esc(e.state)} · ${Math.round(d)} mi${e.next_date ? " · " + esc(e.next_date) : ""}</small></li>`).join("\n")}
        </ul>
      </section>`;
}
function hubPage({ title, h1, crumbs, canonical, description, intro, rides, sections, extra, hubs, eyebrow }) {
  const lastChecked = lastCheckedOf(rides);
  const jsonld = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": canonical, name: h1, description, url: canonical, dateModified: lastChecked, author: AUTHOR, publisher: PUBLISHER, breadcrumb: breadcrumbLd(crumbs) },
  ] };
  return head({ title, description, canonical, jsonld }) + `
<main id="main" class="gr-dir">
  <header class="gr-head wrap">
      ${crumbsHtml(crumbs)}
      <p class="eyebrow">${rides.length} ride${rides.length === 1 ? "" : "s"} &middot; newest check ${esc(fmtDate(lastChecked))}</p>
      <h1>${esc(h1)}</h1>
      <p class="lede">${intro.join(" ")}</p>
  </header>
${searchUi(rides, { cityIndex: cityIndexFor(rides), placeholder: "City or ride name" })}
  <section class="gr-results-wrap">
    <div class="wrap">
${extra.top || ""}
      <div id="gr-nearby" class="gr-grid gr-nearby" hidden></div>
      <div id="gr-states">${sections}
      </div>
      <div class="gr-empty" id="gr-empty" hidden>
        <p>No rides match here.</p>
        <p class="gr-empty-actions"><button type="button" class="gr-chip" id="gr-widen">Show the closest rides anyway</button> <a class="gr-chip" href="/rides/">Search everywhere</a> <button type="button" class="gr-chip" data-clear>Clear filters</button></p>
      </div>
${extra.bottom || ""}
      <p class="gr-hub-foot">Every ride here says when we last checked it at the source; one we can't re-confirm within ${F.POLICY.HIDE_DAYS} days comes off the list. Nobody pays to be listed. Rides marked Unconfirmed are ones we couldn't fully pin down.</p>
${BLOCKS.REPORT({ thing: "ride" })}
      <p class="back"><a href="/rides/">← Find a ride anywhere</a></p>
${CTA}
    </div>
  </section>
</main>
` + foot(indexScript(rides, hubs));
}

// ---------- state hub ----------
function statePage(st, rides, hubs, events) {
  const name = stateName(st);
  const byCity = {}; for (const r of rides) (byCity[r.city] ||= []).push(r);
  const cities = Object.keys(byCity).sort();
  const stHubs = hubs.filter((h) => h.state === st);
  const canonical = `${SITE}/rides/${st.toLowerCase()}/`;
  const cityLinks = cities.map((c) => { const h = stHubs.find((x) => x.city === c); return `<a href="${h ? h.path : "#" + slugify(c)}">${esc(c)} <small>${byCity[c].length}</small></a>`; }).join("\n          ");
  const sections = cities.map((c) => `
      <section class="gr-state" id="${slugify(c)}">
        <h2 class="gr-state-head">${stHubs.find((x) => x.city === c) ? `<a href="${stHubs.find((x) => x.city === c).path}">${esc(c)}</a>` : esc(c)} <span class="gr-count">${byCity[c].length}</span></h2>
        <div class="gr-grid">
${byCity[c].map((r) => card(r)).join("\n")}
        </div>
      </section>`).join("\n");
  const centroid = { lat: rides.reduce((s, r) => s + r.lat, 0) / rides.length, lng: rides.reduce((s, r) => s + r.lng, 0) / rides.length };
  const near = eventsNear(events, centroid, 150);
  return hubPage({
    title: `Group rides in ${name} (${rides.length} ride${rides.length === 1 ? "" : "s"}, ${cities.length} ${cities.length === 1 ? "city" : "cities"})`,
    h1: `Group rides in ${name}`,
    crumbs: [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], [name, canonical]],
    canonical,
    description: trunc(`${rides.length} recurring bicycle group rides in ${name} — ${cities.slice(0, 8).join(", ")}${cities.length > 8 ? " and more" : ""}. Day, time, start point, pace and what to bring for each.`, 158),
    intro: hubIntro(rides, name),
    rides, sections, hubs,
    extra: {
      top: `      <h2>Group rides in ${esc(name)}, by city</h2>
      <nav class="gr-states" aria-label="Jump to a city">
          ${cityLinks}
      </nav>`,
      bottom: eventsBlock(near),
    },
  });
}

// ---------- metro hub ----------
function metroPage(h, hubs, events) {
  const name = `${h.city}, ${h.state}`;
  const rides = [...h.rides].sort((a, b) => miles(h, a) - miles(h, b));
  const canonical = `${SITE}${h.path}`;
  const byCity = {}; for (const r of rides) (byCity[r.city] ||= []).push(r);
  const cities = Object.keys(byCity).sort((a, b) => (a === h.city ? -1 : b === h.city ? 1 : a.localeCompare(b)));
  const sections = cities.map((c) => `
      <section class="gr-state" id="${slugify(c)}">
        <h2 class="gr-state-head">${esc(c)} <span class="gr-count">${byCity[c].length}</span></h2>
        <div class="gr-grid">
${byCity[c].map((r) => card(r, { distance: miles(h, r) })).join("\n")}
        </div>
      </section>`).join("\n");
  const others = hubs.filter((x) => x !== h).map((x) => ({ x, d: miles(h, x) })).filter((x) => x.d <= 150).sort((a, b) => a.d - b.d).slice(0, 5);
  const town = TOWNS.find({ city: h.city, state: h.state, lat: h.lat, lng: h.lng });
  const bottom = (town ? TOWNS.strip(town, { heading: `Coming to ${esc(town.name)} to ride?` }) : "") + (others.length ? `
      <section class="gr-events">
        <h2 class="gr-state-head">Nearby cities with group rides</h2>
        <ul class="gr-event-list">
${others.map(({ x, d }) => `          <li><a href="${x.path}">${esc(x.city)}, ${x.state}</a> <small>· ${x.rides.length} rides · ${Math.round(d)} mi</small></li>`).join("\n")}
        </ul>
      </section>` : "") + eventsBlock(eventsNear(events, h));
  return hubPage({
    title: `Group rides in ${name} (${rides.length} rides)`,
    h1: `Group rides in ${name}`,
    crumbs: [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], [stateName(h.state), `${SITE}/rides/${h.state.toLowerCase()}/`], [h.city, canonical]],
    canonical,
    description: trunc(`${rides.length} recurring bicycle group rides within ${METRO_RADIUS} miles of ${name}: ${[...new Set(rides.map((r) => r.name))].slice(0, 4).join(", ")}. Day, time, start point, pace and what to bring.`, 158),
    intro: hubIntro(rides, name),
    rides, sections, hubs,
    extra: { top: `      <h2>Group rides within ${METRO_RADIUS} miles of ${esc(name)}, closest first</h2>`, bottom },
  });
}

// ---------- the world (Sept 30, 2026): country pages, world city hubs, the US as a country ----------
function countryNotesBlock(cc, notes) {
  const n = notes && notes[cc];
  if (!n) return "";
  const rows = [["words", "What locals call it"], ["where", "Where rides are posted"], ["rhythm", "When they roll"], ["visitors", "If you're visiting"]]
    .filter(([k]) => n[k]).map(([k, h]) => `        <div><dt>${h}</dt><dd>${esc(n[k])}</dd></div>`).join("\n");
  if (!rows) return "";
  return `
      <section class="gr-first gr-country-notes" aria-labelledby="cn-h">
        <h2 id="cn-h">Riding in ${esc(theCountry(cc))}: what to know</h2>
        <dl>
${rows}
        </dl>
      </section>`;
}
function countryPage(cc, rides, worldHubs, allLive, notes) {
  const name = countryName(cc);
  const slug = countrySlug(cc);
  const canonical = `${SITE}/rides/${slug}/`;
  const byCity = {}; for (const r of rides) (byCity[r.city] ||= []).push(r);
  const cities = Object.keys(byCity).sort((a, b) => byCity[b].length - byCity[a].length || a.localeCompare(b));
  const cHubs = worldHubs.filter((h) => h.country === cc);
  const hubOf = (c) => cHubs.find((h) => h.city === c);
  const cityLinks = cities.map((c) => `<a href="${hubOf(c) ? hubOf(c).path : "#" + S.slugify(c)}">${esc(c)} <small>${byCity[c].length}</small></a>`).join("\n          ");
  const sections = cities.map((c) => `
      <section class="gr-state" id="${S.slugify(c)}">
        <h2 class="gr-state-head">${hubOf(c) ? `<a href="${hubOf(c).path}">${esc(c)}</a>` : esc(c)} <span class="gr-count">${byCity[c].length}</span></h2>
        <div class="gr-grid">
${byCity[c].map((r) => card(r)).join("\n")}
        </div>
      </section>`).join("\n");
  const others = [...new Set(allLive.filter((r) => !isUS(r) && r.country !== cc).map((r) => r.country))]
    .map((x) => [x, allLive.filter((r) => r.country === x).length]).sort((a, b) => b[1] - a[1]).slice(0, 12);
  return hubPage({
    title: `Group rides in ${theCountry(cc)} (${rides.length} ride${rides.length === 1 ? "" : "s"}, ${cities.length} ${cities.length === 1 ? "city" : "cities"})`,
    h1: `Group rides in ${theCountry(cc)}`,
    crumbs: [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], [name, canonical]],
    canonical,
    description: trunc(`${rides.length} recurring bicycle group ride${rides.length === 1 ? "" : "s"} in ${theCountry(cc)} — ${cities.slice(0, 6).join(", ")}${cities.length > 6 ? " and more" : ""}. Day, time, start point, pace, and when each was last checked.`, 158),
    intro: hubIntro(rides, theCountry(cc)),
    rides, sections, hubs: worldHubs,
    extra: {
      top: `      <h2>Group rides in ${esc(theCountry(cc))}, by city</h2>
      <nav class="gr-states" aria-label="Jump to a city">
          ${cityLinks}
      </nav>${countryNotesBlock(cc, notes)}`,
      bottom: others.length ? `
      <section class="gr-events">
        <h2 class="gr-state-head">Group rides in other countries</h2>
        <nav class="gr-states" aria-label="Other countries">
          <a href="/rides/united-states/">United States</a>
          ${others.map(([x, n]) => `<a href="/rides/${countrySlug(x)}/">${esc(countryName(x))} <small>${n}</small></a>`).join("\n          ")}
        </nav>
      </section>` : "",
    },
  });
}
function worldCityPage(h, worldHubs, notes) {
  const name = `${h.city}, ${countryName(h.country)}`;
  const rides = [...h.rides].sort((a, b) => km(h, a) - km(h, b));
  const canonical = `${SITE}${h.path}`;
  const byCity = {}; for (const r of rides) (byCity[r.city] ||= []).push(r);
  const cities = Object.keys(byCity).sort((a, b) => (a === h.city ? -1 : b === h.city ? 1 : a.localeCompare(b)));
  const sections = cities.map((c) => `
      <section class="gr-state" id="${S.slugify(c)}">
        <h2 class="gr-state-head">${esc(c)} <span class="gr-count">${byCity[c].length}</span></h2>
        <div class="gr-grid">
${byCity[c].map((r) => card(r, { distance: km(h, r), unit: "km" })).join("\n")}
        </div>
      </section>`).join("\n");
  const others = worldHubs.filter((x) => x !== h && x.country === h.country).map((x) => ({ x, d: km(h, x) })).sort((a, b) => a.d - b.d).slice(0, 5);
  const countryUrl = `${SITE}/rides/${countrySlug(h.country)}/`;
  return hubPage({
    title: `Group rides in ${name} (${rides.length} rides)`,
    h1: `Group rides in ${h.city}`,
    crumbs: [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], [countryName(h.country), countryUrl], [h.city, canonical]],
    canonical,
    description: trunc(`${rides.length} recurring bicycle group rides within ${WORLD_RADIUS_KM} km of ${name}: ${[...new Set(rides.map((r) => r.name))].slice(0, 4).join(", ")}. Day, time, start point, pace, and when each was last checked.`, 158),
    intro: hubIntro(rides, name),
    rides, sections, hubs: worldHubs,
    extra: {
      top: `      <h2>Group rides within ${WORLD_RADIUS_KM} km of ${esc(name)}, closest first</h2>${countryNotesBlock(h.country, notes)}`,
      bottom: `
      <section class="gr-events">
        <h2 class="gr-state-head">More in ${esc(theCountry(h.country))}</h2>
        <ul class="gr-event-list">
${others.map(({ x, d }) => `          <li><a href="${x.path}">${esc(x.city)}</a> <small>· ${x.rides.length} rides · ${Math.round(d)} km</small></li>`).join("\n")}
          <li><a href="/rides/${countrySlug(h.country)}/">All group rides in ${esc(theCountry(h.country))} →</a></li>
        </ul>
      </section>`,
    },
  });
}
// /rides/united-states/: the US as one of the countries — its states and cities, no cards (the state pages carry those).
function usPage(usRides, hubs) {
  const byState = {}; for (const r of usRides) (byState[r.state] ||= []).push(r);
  const states = Object.keys(byState).sort((a, b) => byState[b].length - byState[a].length || stateName(a).localeCompare(stateName(b)));
  const nStates = states.filter((x) => x !== "DC").length;
  const canonical = `${SITE}/rides/united-states/`;
  const crumbs = [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], ["United States", canonical]];
  const description = `${usRides.length} recurring bicycle group rides in ${nStates} states${states.includes("DC") ? " and DC" : ""}. Pick a state or a city: day, time, start point, pace, and when each was last checked.`;
  const jsonld = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": canonical, name: "Group rides in the United States", description, url: canonical, dateModified: lastCheckedOf(usRides), author: AUTHOR, publisher: PUBLISHER, breadcrumb: breadcrumbLd(crumbs) },
  ] };
  const home = hubs.find((h) => h.state === "AZ" && h.city === "Phoenix");
  const cityList = [...(home ? [home] : []), ...hubs.filter((h) => h !== home).sort((a, b) => b.rides.length - a.rides.length || a.city.localeCompare(b.city))];
  return head({ title: `Group rides in the United States (${usRides.length} rides)`, description, canonical, jsonld }) + `
<main id="main" class="gr-dir">
  <header class="gr-head wrap">
      ${crumbsHtml(crumbs)}
      <p class="eyebrow">${usRides.length} rides &middot; ${nStates} states${states.includes("DC") ? " and DC" : ""} &middot; newest check ${esc(fmtDate(lastCheckedOf(usRides)))}</p>
      <h1>Group rides in the United States</h1>
      <p class="lede">Pick a state, or a city with a page of its own. To search by distance, use <a href="/rides/">the ride finder</a>.</p>
  </header>
  <div class="wrap">
    <section class="dir-browse" aria-labelledby="us-state-h">
      <h2 id="us-state-h">By state <span class="gr-count">${states.length}</span></h2>
      <div class="tiles-p tiles-p--wide">
        ${states.map((st) => posterTile({ href: `/rides/${st.toLowerCase()}/`, name: st, count: byState[st].length, small: "rides", blurb: stateName(st), cls: "tile-p--wide tile-p--code" })).join("\n        ")}
      </div>
    </section>
    <section class="dir-browse" aria-labelledby="us-city-h">
      <h2 id="us-city-h">By city <span class="gr-count">${cityList.length}</span></h2>
      <div class="tiles-p">
        ${cityList.map((h) => posterTile({ href: h.path, name: h.city, count: h.rides.length, small: h === home ? "rides<br>home base" : `rides<br>${h.state}`, art: artFor(`${h.state.toLowerCase()}-${slugify(h.city)}`), cls: h === home ? "tile-p--ink" : "" })).join("\n        ")}
      </div>
    </section>
    <p class="back"><a href="/rides/">← Find a ride anywhere</a></p>
${CTA}
  </div>
</main>
` + foot();
}

// ---------- facet pages (/rides/lgbtq/, /rides/no-drop/, …) ----------
function facetPage(f, all, hubs) {
  const rides = all.filter(f.pick);
  const byState = {}; for (const r of rides) if (isUS(r)) (byState[r.state] ||= []).push(r);
  const states = Object.keys(byState).sort((a, b) => stateName(a).localeCompare(stateName(b)));
  const byCountry = {}; for (const r of rides) if (!isUS(r)) (byCountry[r.country] ||= []).push(r);
  const ccs = Object.keys(byCountry).sort((a, b) => countryName(a).localeCompare(countryName(b)));
  const canonical = `${SITE}/rides/${f.slug}/`;
  const stateLinks = [...states.map((s) => `<a href="#${s.toLowerCase()}">${esc(stateName(s))} <small>${byState[s].length}</small></a>`),
    ...ccs.map((cc) => `<a href="#${countrySlug(cc)}">${esc(countryName(cc))} <small>${byCountry[cc].length}</small></a>`)].join("\n          ");
  const sections = states.map((s) => `
      <section class="gr-state" id="${s.toLowerCase()}" data-state="${s}">
        <h2 class="gr-state-head"><a href="/rides/${s.toLowerCase()}/">${esc(stateName(s))}</a> <span class="gr-count">${byState[s].length}</span></h2>
        <div class="gr-grid">
${byState[s].map((r) => card(r)).join("\n")}
        </div>
      </section>`).join("\n") + ccs.map((cc) => `
      <section class="gr-state" id="${countrySlug(cc)}" data-country="${cc}">
        <h2 class="gr-state-head"><a href="/rides/${countrySlug(cc)}/">${esc(countryName(cc))}</a> <span class="gr-count">${byCountry[cc].length}</span></h2>
        <div class="gr-grid">
${byCountry[cc].map((r) => card(r)).join("\n")}
        </div>
      </section>`).join("\n");
  const others = FACETS.filter((x) => x !== f).map((x) => `<a href="/rides/${x.slug}/">${esc(x.label)} <small>${all.filter(x.pick).length}</small></a>`).join("\n          ");
  const where = `${states.length} state${states.length === 1 ? "" : "s"}${ccs.length ? ` and ${ccs.length} more ${ccs.length === 1 ? "country" : "countries"}` : ""}`;
  return hubPage({
    title: ccs.length ? `${f.h1} (${rides.length} rides, US and ${ccs.length} more ${ccs.length === 1 ? "country" : "countries"})` : `${f.h1} in the US (${rides.length} rides, ${states.length} states)`,
    h1: f.h1,
    crumbs: [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], [f.label, canonical]],
    canonical,
    description: trunc(`${rides.length} ${f.h1.charAt(0).toLowerCase() + f.h1.slice(1)} in ${where}. ${f.intro}`, 158),
    intro: [`${rides.length} rides in ${where}.`, esc(f.intro)],
    rides, sections, hubs,
    extra: {
      top: `      <h2>${esc(f.h1)}, by ${ccs.length ? "place" : "state"}</h2>
      <nav class="gr-states" aria-label="Jump to a state">
          ${stateLinks}
      </nav>`,
      bottom: `
      <section class="gr-events">
        <h2 class="gr-state-head">Other ways to look</h2>
        <nav class="gr-states" aria-label="Other ride lists">
          ${others}
        </nav>
      </section>`,
    },
  });
}

// ---------- ride page ----------
function firstTimeBlock(r, hostLabel) {
  const evening = r.start_hhmm && (+r.start_hhmm.slice(0, 2) >= 17 || +r.start_hhmm.slice(0, 2) < 7);
  const bring = ["a helmet", evening ? "front and rear lights (it's a dark-hours ride)" : "water", "a spare tube or patch kit", "a way to pay for the stop"];
  if (evening) bring.splice(2, 0, "water");
  const meet = r.time_local && /meet|gather/i.test(String(r.schedule || "")) ? "the meet time" : (fmtTime(r.start_hhmm) || "the start time");
  const mph = String(r.pace || "").match(/(\d{1,2})\s*(?:–|-|to)?\s*(\d{1,2})?\s*mph/);
  let paceLine;
  if (mph) {
    const top = +(mph[2] || mph[1]);
    const feel = top <= 12 ? "you can talk the whole way" : top <= 16 ? "steady — you'll breathe hard on the hills" : top <= 19 ? "brisk — you'll want some fitness" : "fast — for riders who race or train";
    paceLine = `Expect ${esc(mph[0])}: ${feel}.`;
  } else if (r.pace) paceLine = `Pace: ${esc(lower1(r.pace))}.`;
  else paceLine = "Pace isn't posted. Ask the host before you go, or say you're new when you arrive.";
  const drop = { "no-drop": "It's no-drop: if you fall off the back, someone waits. That's the point of a group ride.",
    groups: "It splits into pace groups. Pick the slowest one your first time; you can move up next week.",
    drop: "It's a drop ride: if you can't hold the pace, you'll finish alone. Fine if you know your speed. Not a first ride." }[r.drop_policy] || "";
  return `
    <section class="gr-first" aria-labelledby="gr-first-h">
      <h2 id="gr-first-h">First time? Here's the drill</h2>
      <dl>
        <div><dt>Bring</dt><dd>${esc(bring.join(", "))}.</dd></div>
        <div><dt>Arrive</dt><dd>Ten or fifteen minutes before ${esc(meet)}. Tell whoever's leading that you're new.</dd></div>
        <div><dt>Pace</dt><dd>${paceLine}${drop ? " " + drop : ""}</dd></div>
        <div><dt>Check</dt><dd>${hostLabel ? `Look at ${hostLabel} the day of — that's where cancellations, weather calls and start changes get posted.` : "Check the links below the day of for cancellations and weather calls."}</dd></div>
      </dl>
    </section>`;
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
  const next = listed ? nextOccurrence(r) : null;   // no "next ride", Event or calendar file for a ride we can't vouch for
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
  if (dist) lede += ` About ${dist}${r.pace ? `, ${lower1(r.pace)}` : ""}.`;
  else if (r.pace) lede += ` Pace: ${lower1(r.pace)}.`;
  if (r.drop_policy === "no-drop" && !/no-drop/i.test(lede)) lede += " No-drop.";
  const description = trunc(lede, 158);
  const sw = shortWhen(r);
  let title = `${r.name} — ${placeText(r)} group ride${sw ? `, ${sw}` : ""}`;
  if (title.length > 66 && sw) title = `${r.name} — ${placeText(r)} group ride`;
  if (title.length > 66) title = `${r.name} — ${placeText(r)}`;

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
    ["When", dp && tm ? `${dp}, ${tm}${isUS(r) ? "" : " local time"}` : r.schedule, laterText && dp && tm ? [laterText, r.season_months ? `Season: ${r.season || "seasonal"}.` : null].filter(Boolean).join(" ") : r.season_months ? `Season: ${r.season || "seasonal"}` : r.season === "year-round" ? "Year-round" : (dp && tm && r.schedule && r.schedule !== `${dp}, ${tm}` ? r.schedule : null)],
    ["Starts at", startName ? `${esc(startName)} <a class="gr-map" href="${attr(mapUrl)}" rel="noopener">Map ↗</a>` : null, null, true],
    ["Distance", dist, r.duration || (r.duration_min ? `about ${Math.round(r.duration_min / 60 * 10) / 10} hours` : null)],
    ["Pace", r.pace, r.drop_policy && r.drop_policy !== "unknown" ? { "no-drop": "No-drop: nobody gets left", drop: "Drop ride: keep up or get dropped", groups: "Splits into pace groups" }[r.drop_policy] : null],
    ["Hosted by", r.host ? r.host.name : null, r.host && r.host.type ? HOST_TYPE[r.host.type] : null],
    ["Started", r.founded_year ? String(r.founded_year) : null, r.founded_note],
    ["Cost", r.cost, null],
    ["Bike", disc, kindLabel(r)],
    ["Language", langLine(r) ? `Rides in ${langLine(r)}` : null, null],
  ].filter((x) => x[1]);
  const factsHtml = facts.map(([k, v, sub, raw]) =>
    `<div class="gr-fact"><dt>${k}</dt><dd>${raw ? v : esc(v)}${sub ? `<small>${esc(sub)}</small>` : ""}</dd></div>`).join("\n        ");

  const linkBtns = [
    L.website && ["Website", L.website],
    L.instagram && [handle(L.instagram) || "Instagram", L.instagram],
    L.facebook && ["Facebook", L.facebook],
    L.strava && ["Join the Strava club", L.strava],
    L.meetup && ["Meetup group", L.meetup],
    ...(L.other || []).map((u) => ["More", u]),
    watchUrl && ![L.website, L.instagram, L.facebook, L.strava, L.meetup, ...(L.other || [])].includes(watchUrl) && ["Where it's posted", watchUrl],
  ].filter(Boolean).map(([t, u]) => `<a class="btn ${/strava/i.test(t) ? "btn--ink" : "btn--ghost"}" href="${attr(u)}" rel="noopener nofollow">${esc(t)} ↗</a>`).join("\n        ");

  const tags = cardTagLabels(r).map((t) => `<span class="gr-tag">${esc(t)}</span>`).join("")
    + (r.confidence === "low" ? `<span class="gr-tag gr-tag-warn" title="We found this ride but couldn't confirm every detail">Unconfirmed — check with the host</span>` : "")
    + (r.host && r.host.claimed ? `<span class="gr-tag gr-tag-ok">Verified by the organizer</span>` : "");

  // JSON-LD: WebPage (dates, author, breadcrumb) + Event only when the schedule is computable
  const graph = [{
    "@type": "WebPage", "@id": url, url, name: title, description, dateModified: f.checked_on || r.verified_on, author: AUTHOR, publisher: PUBLISHER,
    breadcrumb: breadcrumbLd(crumbs), ...(next ? { mainEntity: { "@id": `${url}#event` } } : {}),
  }];
  if (next) {
    const ev = {
      "@type": "Event", "@id": `${url}#event`, name: r.name, description, url,
      startDate: isoWithOffset(next, r.tz),
      ...(r.duration_min ? { endDate: isoWithOffset(new Date(next.getTime() + r.duration_min * 60000), r.tz) } : {}),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled",
      isAccessibleForFree: !r.cost || /^free/i.test(r.cost),
      location: { "@type": "Place", name: (start && start.name) || placeText(r),
        address: { "@type": "PostalAddress", ...(start && start.address ? { streetAddress: start.address } : {}), addressLocality: r.city, ...(r.state || r.region ? { addressRegion: r.state || r.region } : {}), addressCountry: r.country },
        geo: { "@type": "GeoCoordinates", latitude: r.lat, longitude: r.lng } },
      eventSchedule: { "@type": "Schedule", scheduleTimezone: r.tz, startTime: r.start_hhmm,
        byDay: [...new Set(r.days.map((d) => "https://schema.org/" + DAY_LONG[d]))],
        repeatFrequency: { weekly: "P1W", biweekly: "P2W", monthly: "P1M", seasonal: "P1W" }[r.frequency] || "P1W" },
      ...(r.host ? { organizer: { "@type": "Organization", name: r.host.name, ...(L.website || L.instagram || L.facebook ? { url: L.website || L.instagram || L.facebook } : {}) } } : {}),
      sameAs: [L.website, L.instagram, L.facebook, L.strava, L.meetup].filter(Boolean),
    };
    graph.push(ev);
  }
  const jsonld = { "@context": "https://schema.org", "@graph": graph };

  const calBtns = next && rule ? `
        <a class="btn btn--ghost" href="/rides/${r.slug}/ride.ics" download="${attr(r.slug)}.ics">Add to calendar</a>
        <a class="gr-minor" href="${attr(gcalUrl(r, next, rule))}" rel="noopener">Google Calendar</a>` : "";

  const watch = (r.refresh && r.refresh.watch_url) || r.sources[0] || L.website || null;
  const bannerHead = { ended: "This ride has ended", paused: "Paused", stale: "Not confirmed lately", flagged: "We're re-checking this ride" }[f.state] || "Check first";
  const banner = !listed && f.banner ? `
    <div class="gr-banner" role="note">
      <p><strong>${esc(bannerHead)}.</strong> ${esc(f.banner)}</p>
      <p><a class="link" href="#nearby">Rides near here we have checked</a></p>
    </div>` : "";
  const checkedBlock = listed ? `
    <aside class="gr-checked${f.nudge ? " gr-checked--look" : ""}" aria-label="When this ride was last checked">
      ${mark(f.nudge ? "flag" : "checked", "gr-checked-mark")}
      <div>
        <p class="gr-checked-line"><strong>${esc(f.label)}.</strong> ${f.checked_by === "feed" ? "The host's own calendar lists the next ride." : r.confidence === "high" ? "Confirmed on the host's own page." : "Confirmed against the sources at the foot of this page."}${r.last_seen && r.last_seen !== f.checked_on ? ` Last seen happening ${esc(fmtDate(r.last_seen))}.` : ""}</p>
        ${r.evidence ? `<p class="gr-checked-ev">${esc(r.evidence)}</p>` : ""}
        ${f.nudge ? `<p class="gr-checked-nudge">${esc(f.nudge)}</p>` : ""}
        ${watch ? `<p class="gr-checked-go"><a class="link" href="${attr(watch)}" rel="noopener nofollow">Check the host's page before you go</a></p>` : ""}
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
    data-tz="${attr(listed ? r.tz || "" : "")}" data-time="${attr(listed ? r.start_hhmm || "" : "")}" data-days="${r.days.join(" ")}"
    data-freq="${attr(r.frequency || "")}" data-season="${r.season_months ? `${r.season_months.start}-${r.season_months.end}` : ""}"
    data-monthly="${attr(r.monthly_rule ? JSON.stringify(r.monthly_rule) : "")}"
    data-times="${attr(listed && Array.isArray(r.start_times) && r.start_times.length ? JSON.stringify(r.start_times.map((e) => [e.from, e.start_hhmm])) : "")}">
    ${crumbsHtml(crumbs)}

    <h1>${esc(r.name)}</h1>
    ${r.name_en ? `<p class="gr-name-en">${esc(r.name_en)}</p>` : ""}
    <p class="gr-place">${esc(placeText(r))}${r.neighborhood ? ` · ${esc(r.neighborhood)}` : ""} · ${esc(discText(r))}</p>
    ${tags ? `<p class="gr-tags">${tags}</p>` : ""}
${banner}

    <p class="lede">${esc(lede)}</p>

    ${listed ? "" : "<!-- off the lists: no next ride -->"}<div class="gr-next" id="gr-next" ${next ? "" : "hidden"}${listed ? "" : " data-off"}>
      <span class="gr-next-label">Next ride</span>
      <time class="gr-next-when" data-next-text${next ? ` datetime="${isoWithOffset(next, r.tz)}"` : ""}>${next ? esc(fmtNext(next, r.tz)) : ""}</time>
      <span class="gr-next-rel" data-next-rel>${next && r.frequency === "biweekly" ? "every other week — confirm which week with the host" : ""}</span>
    </div>

    <div class="gr-actions">
      ${primary ? `<a class="btn btn--ink gr-primary" href="${attr(primary[1])}" rel="noopener nofollow">${esc(primary[0])} ↗</a>` : ""}${calBtns}
      <button type="button" class="btn btn--ghost gr-save-btn" data-save="${r.slug}" aria-pressed="false"><span aria-hidden="true">☆</span> <span data-save-label>Save</span></button>
      <button type="button" class="btn btn--ghost" id="gr-share" data-title="${attr(r.name + " — " + placeText(r))}">Share</button>
      <span class="gr-share-alt" id="gr-share-alt" hidden><a href="sms:?&body=${encodeURIComponent(r.name + " — " + url)}">Text it</a> · <a href="https://wa.me/?text=${encodeURIComponent(r.name + " — " + url)}" rel="noopener">WhatsApp</a> · <a href="mailto:?subject=${encodeURIComponent("Group ride: " + r.name)}&body=${encodeURIComponent(url)}">Email</a></span>
      <span class="gr-toast" id="gr-toast" role="status" aria-live="polite"></span>
    </div>

${checkedBlock}
    <dl class="gr-facts">
        ${factsHtml}
    </dl>
${visitBlock}
${firstTimeBlock(r, hostLabel)}
    <div class="gr-about">
      <h2>About the ${esc(r.name)} group ride</h2>
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
    <a href="${areaPath}">All rides in ${esc(areaText)} →</a>
  </nav>

  <p class="back"><a href="/rides/">← Find another group ride</a></p>
${CTA}
</main>
` + foot(`
<script src="/rides/ride.js" defer></script>`);
}

// ---------- sitemap (lastmod = real verified dates, never "today") ----------
function sitemap(rides, states, hubs, worldCCs = [], worldHubs = []) {
  // rides = the rides on the lists; lastmod = the last check, never "today"
  const maxOf = (list) => lastCheckedOf(list);
  const rows = [[`${SITE}/rides/`, maxOf(rides)]];
  const us = rides.filter(isUS);
  if (us.length) rows.push([`${SITE}/rides/united-states/`, maxOf(us)]);
  for (const st of states) rows.push([`${SITE}/rides/${st.toLowerCase()}/`, maxOf(rides.filter((r) => r.state === st))]);
  for (const h of hubs) rows.push([`${SITE}${h.path}`, maxOf(h.rides)]);
  for (const cc of worldCCs) rows.push([`${SITE}/rides/${countrySlug(cc)}/`, maxOf(rides.filter((r) => r.country === cc))]);
  for (const h of worldHubs) rows.push([`${SITE}${h.path}`, maxOf(h.rides)]);
  for (const f of FACETS) { const l = rides.filter(f.pick); if (l.length) rows.push([`${SITE}/rides/${f.slug}/`, maxOf(l)]); }
  for (const r of rides) rows.push([`${SITE}/rides/${r.slug}/`, (r._f && r._f.checked_on) || r.verified_on]);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows.map(([u, d]) => `  <url><loc>${u}</loc><lastmod>${d}</lastmod></url>`).join("\n")}
</urlset>
`;
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
  const events = loadEvents();
  const states = [...new Set(rides.filter(isUS).map((r) => r.state))].sort();
  const { hubs, hubFor } = buildMetros(rides);
  const world = buildWorldHubs(rides);
  const worldCCs = [...new Set(rides.filter((r) => !isUS(r)).map((r) => r.country))].sort((a, b) => countryName(a).localeCompare(countryName(b)));
  const hubForAll = { ...hubFor, ...world.hubFor };

  // every folder directly under /rides/ must be unique: states, facets, countries, rides, art
  const top = new Map();
  const claim = (name, what) => { if (top.has(name)) { console.error(`/rides/${name}/ is claimed twice: ${top.get(name)} and ${what}`); process.exit(1); } top.set(name, what); };
  claim("art", "contour art"); claim("united-states", "the US page");
  for (const st of states) claim(st.toLowerCase(), `state ${st}`);
  for (const f of FACETS) claim(f.slug, `facet ${f.slug}`);
  for (const cc of worldCCs) claim(countrySlug(cc), `country ${cc}`);
  for (const r of pages) claim(r.slug, `ride ${r.slug}`);
  const clash = pages.filter((r) => /^[a-z]{2}$/.test(r.slug));
  if (clash.length) { console.error("ride slug looks like a state code: " + clash.map((r) => r.slug).join(", ")); process.exit(1); }

  fs.mkdirSync(OUT, { recursive: true });
  for (const ent of fs.readdirSync(OUT, { withFileTypes: true })) if (ent.isDirectory() && ent.name !== "art") rmrf(path.join(OUT, ent.name));   // art/ is drawn by tools/contour-art.js, never regenerated here
  write(path.join(OUT, "index.html"), directory(rides, hubs, world.hubs));
  if (rides.some(isUS)) write(path.join(OUT, "united-states", "index.html"), usPage(rides.filter(isUS), hubs));
  for (const st of states) write(path.join(OUT, st.toLowerCase(), "index.html"), statePage(st, rides.filter((r) => r.state === st), hubs, events));
  for (const h of hubs) write(path.join(OUT, h.state.toLowerCase(), h.slug, "index.html"), metroPage(h, hubs, events));
  for (const cc of worldCCs) write(path.join(OUT, countrySlug(cc), "index.html"), countryPage(cc, rides.filter((r) => r.country === cc), world.hubs, rides, notes));
  for (const h of world.hubs) write(path.join(OUT, countrySlug(h.country), h.slug, "index.html"), worldCityPage(h, world.hubs, notes));
  for (const f of FACETS) write(path.join(OUT, f.slug, "index.html"), facetPage(f, rides, [...hubs, ...world.hubs]));
  write(path.join(OUT, "index.json"), JSON.stringify(hubJson(rides)));
  write(path.join(OUT, "live.json"), JSON.stringify(liveJson(rides)));
  // Pass 6: the hub centres, for tools/contour-art.js (one contour tile per city hub; world keys are <cc>-<city>)
  write(path.join(OUT, "hubs.json"), JSON.stringify([
    ...hubs.map((h) => ({ key: `${h.state.toLowerCase()}-${h.slug}`, city: h.city, state: h.state, country: "US", lat: +h.lat.toFixed(4), lng: +h.lng.toFixed(4), rides: h.rides.length })),
    ...world.hubs.map((h) => ({ key: h.key, city: h.city, state: null, country: h.country, lat: +h.lat.toFixed(4), lng: +h.lng.toFixed(4), rides: h.rides.length })),
  ]));
  let nIcs = 0, nEvent = 0;
  for (const r of pages) {
    write(path.join(OUT, r.slug, "index.html"), ridePage(r, rides, hubForAll, hubs));
    if (!r._f.listed) continue;
    const next = nextOccurrence(r); const periods = next ? periodsOf(r, next) : [];
    if (next) nEvent++;
    if (periods.length) { write(path.join(OUT, r.slug, "ride.ics"), ics(r, periods)); nIcs++; }
  }
  write(path.join(OUT, "sitemap.xml"), sitemap(rides, states, hubs, worldCCs, world.hubs));
  const byState = {}; for (const r of all) byState[r._f.state] = (byState[r._f.state] || 0) + 1;
  console.log(`built ${pages.length} ride pages (${rides.length} on the lists; ${Object.entries(byState).map(([k, n]) => `${n} ${k}`).join(", ")}; ${nEvent} with a computed next ride, ${nIcs} with .ics), ${states.length} state hubs, ${hubs.length} US city hubs, ${worldCCs.length} other countries, ${world.hubs.length} world city hubs → ${path.relative(ROOT, OUT) || OUT}/`);
  console.log("city hubs: " + [...hubs.map((h) => `${h.city} ${h.state} (${h.rides.length})`), ...world.hubs.map((h) => `${h.city} ${h.country} (${h.rides.length})`)].join(", "));
}
main();
