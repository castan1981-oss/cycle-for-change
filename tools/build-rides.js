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
          cfc-site/rides/thanks/index.html     (form landing page)
          cfc-site/rides/sitemap.xml           (rides-only sitemap, lastmod from verified_on)

  Plain static HTML that links /styles.css like every other page. Re-run after
  editing rides.json. Generated folders are wiped first so nothing drifts.
*/
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "cfc-site", "rides");
const DATA = path.join(OUT, "rides.json");
const EVENTS = path.join(ROOT, "cfc-site", "events", "events.json");
const SITE = "https://cycleforchange.org";
const TODAY = new Date().toISOString().slice(0, 10);
const NOW = new Date();
const OG_IMAGE = `${SITE}/og-cfc.png`;
const FORM_EDIT = "ride-edit";
const FORM_SUBMIT = "ride-submit";
const METRO_RADIUS = 25;   // miles — a city hub covers rides within this radius
const METRO_MIN = 3;       // rides needed before a city gets its own hub
const HUB_GAP = 15;        // miles — two hubs can't sit closer than this (Miami + Fort Lauderdale both survive; suburbs don't)

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
const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const miles = (a, b) => {
  const R = 3958.8, toR = (d) => (d * Math.PI) / 180;
  const dLat = toR(b.lat - a.lat), dLng = toR(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
const handle = (url) => { const m = String(url || "").match(/instagram\.com\/([A-Za-z0-9_.]+)/); return m ? "@" + m[1] : null; };
const discLabel = (d) => (d || []).map((x) => DISC_LABEL[x] || x).join(" · ");
const placeText = (r) => `${r.city}, ${r.state}`;
const stateName = (st) => STATE_NAMES[st] || st;
const rmrf = (p) => fs.rmSync(p, { recursive: true, force: true });
const write = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const trunc = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…");
const lower1 = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const cleanDist = (d) => (d == null ? null : String(d).replace(/^[~≈]\s*/, "").replace(/\s*(mi|miles)$/i, ""));

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
function nextOccurrence(r, from = NOW) {
  if (!r.start_hhmm || !r.tz || r.frequency === "irregular") return null;
  const [hh, mm] = r.start_hhmm.split(":").map(Number);
  const p = partsIn(from, r.tz);
  const y0 = p.year, mo0 = p.month, d0 = p.day;
  if (r.monthly_rule && r.monthly_rule.length) {
    for (let k = 0; k < 4; k++) {
      let y = y0, mo = mo0 + k; while (mo > 12) { mo -= 12; y += 1; }
      const cands = r.monthly_rule.map((m) => nthWeekdayOfMonth(y, mo, DAY_IDX[m.day], m.ord)).sort((a, b) => a - b);
      for (const d of cands) { const t = zoned(y, mo, d, hh, mm, r.tz); if (t > from && inSeason(mo, r.season_months)) return t; }
    }
    return null;
  }
  if (!r.days.length) return null;
  const want = new Set(r.days.map((d) => DAY_IDX[d]));
  for (let k = 0; k < 400; k++) {
    const dt = new Date(Date.UTC(y0, mo0 - 1, d0 + k));
    if (!want.has(dt.getUTCDay())) continue;
    const t = zoned(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate(), hh, mm, r.tz);
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
  if (r.frequency === "biweekly") return "Every other " + names.join(" and ");
  if (r.frequency === "monthly") return "Monthly, on a " + names[0];
  if (names.length === 1) return "Every " + names[0];
  return names.map((n) => n + "s").join(" and ");
}
function shortWhen(r) {   // for <title>: "Tuesdays 8:30 pm" / "2nd Wednesdays" / "Last Fridays"
  const t = fmtTime(r.start_hhmm);
  if (r.monthly_rule && r.monthly_rule.length) {
    const m = r.monthly_rule[0]; const o = { 1:"1st", 2:"2nd", 3:"3rd", 4:"4th", "-1":"Last" }[m.ord];
    return `${o} ${DAY_LONG[m.day]}s${t ? " " + t : ""}`;
  }
  if (r.days.length === 1) return `${DAY_LONG[r.days[0]]}s${t ? " " + t : ""}`;
  if (r.days.length > 1) return r.days.map((d) => DAY_LONG[d].slice(0, 3)).join("/") + (t ? " " + t : "");
  return null;
}
function rrule(r) {
  if (r.frequency === "irregular") return null;
  let rule;
  if (r.monthly_rule && r.monthly_rule.length) rule = "FREQ=MONTHLY;BYDAY=" + r.monthly_rule.map((m) => `${m.ord}${DAY_ICS[m.day]}`).join(",");
  else if (r.days.length) rule = `FREQ=WEEKLY${r.frequency === "biweekly" ? ";INTERVAL=2" : ""};BYDAY=` + r.days.map((d) => DAY_ICS[d]).join(",");
  else return null;
  if (r.season_months) {
    const p = partsIn(NOW, r.tz); let y = p.year; const s = r.season_months;
    if (s.start <= s.end ? p.month > s.end : false) y += 1;          // season over this year -> next year's run
    const endY = s.start <= s.end ? y : (p.month >= s.start ? y + 1 : y);
    const lastDay = new Date(Date.UTC(endY, s.end, 0)).getUTCDate();
    rule += `;UNTIL=${endY}${String(s.end).padStart(2, "0")}${String(lastDay).padStart(2, "0")}T235959Z`;
  }
  return rule;
}
function icsEscape(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n"); }
function foldLine(line) { const out = []; let s = line; while (Buffer.byteLength(s) > 73) { let cut = 73; while (Buffer.byteLength(s.slice(0, cut)) > 73) cut--; out.push(s.slice(0, cut)); s = " " + s.slice(cut); } out.push(s); return out.join("\r\n"); }
function ics(r, next, rule) {
  const url = `${SITE}/rides/${r.slug}/`;
  const dur = r.duration_min || 120;
  const end = new Date(next.getTime() + dur * 60000);
  const loc = r.start_location ? [r.start_location.name, r.start_location.address].filter(Boolean).join(", ") : placeText(r);
  const desc = [r.pace ? `Pace: ${r.pace}.` : null, r.drop_policy === "no-drop" ? "No-drop." : null, r.schedule ? `Schedule: ${r.schedule}.` : null, "Confirm with the host before you go.", url].filter(Boolean).join("\n");
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Cycle for Change//Group Rides//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${r.slug}@cycleforchange.org`,
    `DTSTAMP:${NOW.toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;TZID=${r.tz}:${icsLocal(next, r.tz)}`,
    `DTEND;TZID=${r.tz}:${icsLocal(end, r.tz)}`,
    `RRULE:${rule}`,
    `SUMMARY:${icsEscape(r.name + " — " + placeText(r))}`,
    `LOCATION:${icsEscape(loc)}`,
    `DESCRIPTION:${icsEscape(desc)}`,
    `URL:${url}`,
    "END:VEVENT", "END:VCALENDAR",
  ];
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
    if (!r.name || !r.city || !r.state) { problems.push(`${id}: missing name/city/state`); continue; }
    if (!(links.website || links.instagram || links.facebook || links.strava)) { problems.push(`${id}: no verified link`); continue; }
    const lat = num(r.lat), lng = num(r.lng);
    if (lat == null || lng == null) { problems.push(`${id}: missing lat/lng`); continue; }
    if (!r.tz) problems.push(`${id}: missing tz (calendar + next-ride disabled)`);
    if (BANNED.test([r.name, r.description, r.schedule, r.founded_note].join(" "))) problems.push(`${id}: banned word in copy (fix the data)`);
    seen.add(r.slug);
    out.push({
      ...r, state: String(r.state).toUpperCase(), lat, lng,
      discipline: Array.isArray(r.discipline) && r.discipline.length ? r.discipline : ["mixed"],
      days: Array.isArray(r.days) ? r.days : [],
      inclusive_focus: Array.isArray(r.inclusive_focus) ? r.inclusive_focus : [],
      sources: Array.isArray(r.sources) ? r.sources : [],
      links: { website: null, instagram: null, facebook: null, strava: null, meetup: null, other: [], ...links },
      host: r.host || null, start_location: r.start_location || null,
      verified_on: r.verified_on || TODAY,
    });
  }
  if (problems.length) {
    console.error("rides.json problems:\n  " + problems.join("\n  "));
    if (problems.some((p) => !/banned word|missing tz/.test(p))) process.exit(1);
  }
  out.sort((a, b) => a.state.localeCompare(b.state) || a.city.localeCompare(b.city) || a.name.localeCompare(b.name));
  return out;
}
function loadEvents() {
  try { const e = JSON.parse(fs.readFileSync(EVENTS, "utf8")); return (Array.isArray(e) ? e : e.events || []).filter((x) => x.lat && x.lon); } catch { return []; }
}

// ---------- metro hubs ----------
// A city gets a hub when ≥3 rides sit within 25 mi of it and no bigger hub already covers it.
function buildMetros(rides) {
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
    const score = (o) => o.n + (rank(o.city) < 120 ? 3 : 0);
    const covered = list.filter((o) => o.state === c.state && miles(c, o) <= METRO_RADIUS).sort((a, b) => score(b) - score(a) || rank(a.city) - rank(b.city));
    const best = covered[0] && score(covered[0]) > score(c) ? covered[0] : c;
    let center = { lat: best.lat, lng: best.lng }, name = best.city;
    let ridesIn = rides.filter((r) => r.state === c.state && miles(center, r) <= METRO_RADIUS);
    if (ridesIn.length < METRO_MIN) { center = { lat: c.lat, lng: c.lng }; name = c.city; ridesIn = c.rides; }
    if (hubs.some((h) => h.state === c.state && miles(h, center) <= HUB_GAP)) continue;
    const RENAME = { "Awendaw|SC": "Charleston", "Germantown|TN": "Memphis" };   // metro name when the big city has no ride of its own
    name = RENAME[`${name}|${c.state}`] || name;
    hubs.push({ ...c, ...center, city: name, rides: ridesIn, slug: slugify(name), path: `/rides/${c.state.toLowerCase()}/${slugify(name)}/` });
  }
  // each ride -> nearest hub in its state that covers it (or null)
  const hubFor = {};
  for (const r of rides) {
    const cands = hubs.filter((h) => h.state === r.state && miles(h, r) <= METRO_RADIUS).sort((a, b) => miles(a, r) - miles(b, r));
    hubFor[r.slug] = cands[0] || null;
  }
  return { hubs, hubFor };
}

// ---------- shared chrome ----------
function head({ title, description, canonical, jsonld, ogType = "website", titleHasBrand = true }) {
  return `<!DOCTYPE html>
<!-- GENERATED by tools/build-rides.js from cfc-site/rides/rides.json — edit the data, not this file. -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${esc(title)}${titleHasBrand ? " | Cycle for Change" : ""}</title>
  <meta name="description" content="${attr(description)}">
  <link rel="canonical" href="${attr(canonical)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="Cycle for Change">
  <meta property="og:title" content="${attr(title)}">
  <meta property="og:description" content="${attr(description)}">
  <meta property="og:url" content="${attr(canonical)}">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${attr(title)}">
  <meta name="twitter:description" content="${attr(description)}">
  <meta name="twitter:image" content="${OG_IMAGE}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Space+Grotesk:wght@400;500&family=Space+Mono&family=Anton&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
  <script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
  </script>
</head>
<body id="top">

<div class="util">
  <div class="wrap">
    <span><b><span data-cur>—</span> / 10,000</b> miles logged · all on the bike · 2027</span>
    <span>every mile for queer communities</span>
  </div>
</div>

<header>
  <div class="wrap nav">
    <a class="brand" href="/" aria-label="Cycle for Change home">
      <svg width="32" height="32" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M98.45 71.03 A40.00 40.00 0 0 1 50.32 98.81" stroke="#372C3C" stroke-width="12" stroke-linecap="round"/><path d="M31.23 87.79 A40.00 40.00 0 0 1 31.23 32.21" stroke="#E9E224" stroke-width="12" stroke-linecap="round"/><path d="M50.32 21.19 A40.00 40.00 0 0 1 98.45 48.97" stroke="#A99CB0" stroke-width="12" stroke-linecap="round"/><circle cx="60.00" cy="60.00" r="6.00" fill="#372C3C"/></svg>
      <span class="word">Cycle for Change</span>
    </a>
    <nav class="links" aria-label="Primary">
      <a href="/rides/">Group rides</a>
      <a href="/events/">Events</a>
      <a href="/rides/#submit">Add a ride</a>
    </nav>
    <div class="nav-right">
      <a href="/#board" class="btn btn-dark">Pledge a mile →</a>
    </div>
  </div>
</header>
`;
}
const PUBLISHER = { "@type": "Organization", name: "Cycle for Change", url: `${SITE}/`, logo: `${SITE}/favicon-512.png` };
const AUTHOR = { "@type": "Person", name: "Robert Castan", url: `${SITE}/` };
function breadcrumbLd(items) {
  return { "@type": "BreadcrumbList", itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, ...(url ? { item: url } : {}) })) };
}
function crumbsHtml(items) {
  return `<nav class="gr-crumbs" aria-label="Breadcrumb">${items.map(([n, u], i) => u && i < items.length - 1 ? `<a href="${attr(u.replace(SITE, ""))}">${esc(n)}</a>` : `<span aria-current="page">${esc(n)}</span>`).join('<span class="sep" aria-hidden="true">›</span>')}</nav>`;
}

const CTA = `
  <section class="fn-cta" aria-label="Follow the miles and give">
    <p class="fn-cta-num"><span data-cur>—</span><span class="of"> / 10,000 mi</span></p>
    <p>Every mile is logged live as I ride it. <a href="/#tally" style="color:var(--yellow);border-bottom:1px solid var(--yellow);">Follow the number →</a></p>
    <hr>
    <p class="give">Pledge a mile — it goes direct to queer-community orgs at year-end, by vote.</p>
    <div class="fn-cta-row">
      <a href="/#board" class="btn btn-y">Pledge a mile →</a>
      <a href="/#vote" class="btn btn-dark" style="border:1px solid rgba(255,255,255,.2);">See the orgs →</a>
    </div>
  </section>
`;
function foot(extraScript = "") {
  return `
<footer>
  <div class="wrap">
    <div class="foot-base"><span>Cycle for Change™</span><span>every mile for queer communities</span></div>
  </div>
</footer>

<script src="/field-notes/field-notes.js" defer></script>${extraScript}
</body>
</html>
`;
}

// ---------- forms (Netlify Forms: static HTML, honeypot, hidden slug) ----------
function editForm(r) {
  return `
    <section class="gr-form-wrap" id="edit" aria-labelledby="gr-form-h">
      <h2 id="gr-form-h">Is this right?</h2>
      <p class="gr-form-intro">Schedules move. If something here is wrong, gone, or you run this ride, tell us and we'll fix the page. No account needed.</p>
      <form name="${FORM_EDIT}" method="POST" action="/rides/thanks/" data-netlify="true" netlify-honeypot="bot-field" class="gr-form">
        <input type="hidden" name="form-name" value="${FORM_EDIT}">
        <input type="hidden" name="slug" value="${attr(r.slug)}">
        <input type="hidden" name="ride" value="${attr(r.name + " — " + placeText(r))}">
        <input type="hidden" name="subject" value="${attr(`[rides] ${r.slug}`)}">
        <p class="gr-hp" aria-hidden="true"><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <fieldset class="gr-form-kind">
          <legend class="visually-hidden">What is this about?</legend>
          <label><input type="radio" name="kind" value="edit" checked> Suggest an edit</label>
          <label><input type="radio" name="kind" value="claim"> I organize this ride</label>
          <label><input type="radio" name="kind" value="inactive"> This ride has stopped</label>
        </fieldset>
        <label class="gr-field">What should the page say?
          <textarea name="message" rows="4" required placeholder="e.g. We moved to 6:30 pm in October. Start is now the coffee shop on Main."></textarea></label>
        <label class="gr-field">Your email <small>(optional — so we can confirm a claim)</small>
          <input type="email" name="email" autocomplete="email"></label>
        <button type="submit" class="btn btn-dark">Send it</button>
      </form>
    </section>`;
}
function submitForm() {
  return `
  <section class="gr-form-wrap gr-submit" id="submit" aria-labelledby="gr-submit-h">
    <div class="wrap">
      <h2 id="gr-submit-h">Know a ride that isn't here?</h2>
      <p class="gr-form-intro">Send it. We check every ride against its own site or social page before it goes up, usually within a week.</p>
      <form name="${FORM_SUBMIT}" method="POST" action="/rides/thanks/" data-netlify="true" netlify-honeypot="bot-field" class="gr-form gr-form-grid">
        <input type="hidden" name="form-name" value="${FORM_SUBMIT}">
        <input type="hidden" name="subject" value="[rides] new ride submission">
        <p class="gr-hp" aria-hidden="true"><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <label class="gr-field">Ride name <input name="name" required></label>
        <label class="gr-field">City, state <input name="place" required placeholder="Phoenix, AZ"></label>
        <label class="gr-field">When <input name="when" required placeholder="Every Tuesday, 6:30 pm"></label>
        <label class="gr-field">Website, Instagram, Facebook or Strava link <input name="link" type="url" required placeholder="https://"></label>
        <label class="gr-field gr-span">Anything else <small>(start point, distance, pace, who it's for)</small><textarea name="message" rows="3"></textarea></label>
        <label class="gr-field">Your email <small>(optional)</small><input type="email" name="email" autocomplete="email"></label>
        <label class="gr-field gr-check"><input type="checkbox" name="organizer" value="yes"> I organize this ride</label>
        <div class="gr-span"><button type="submit" class="btn btn-dark">Send the ride</button></div>
      </form>
    </div>
  </section>`;
}

// ---------- ride card (directory + hubs) ----------
function card(r, opts = {}) {
  const tags = r.inclusive_focus.map((t) => `<span class="gr-tag">${esc(TAG_LABEL[t] || t)}</span>`).join("")
    + (r.confidence === "low" ? `<span class="gr-tag gr-tag-warn">Unconfirmed</span>` : "")
    + (r.host && r.host.claimed ? `<span class="gr-tag gr-tag-ok">Organizer-verified</span>` : "");
  const dist = opts.distance != null ? `<span class="gr-dist">${Math.round(opts.distance)} mi away</span>` : "";
  const when = dayPhrase(r) && r.start_hhmm ? `${dayPhrase(r)}, ${fmtTime(r.start_hhmm)}` : (r.schedule || "See the ride's page for schedule");
  const stat = [cleanDist(r.distance_miles) ? `${cleanDist(r.distance_miles)} mi` : null, r.pace ? trunc(r.pace, 34) : null].filter(Boolean).join(" · ");
  return `<a class="gr-card" href="/rides/${r.slug}/"
   data-name="${attr(r.name)}" data-city="${attr(r.city)}" data-state="${r.state}"
   data-lat="${r.lat}" data-lng="${r.lng}" data-disc="${r.discipline.join(" ")}"
   data-tags="${r.inclusive_focus.join(" ")}" data-days="${r.days.join(" ")}"
   data-host="${attr(r.host ? r.host.name : "")}" data-hood="${attr(r.neighborhood || "")}">
  <span class="gr-card-top"><span class="gr-disc">${esc(discLabel(r.discipline))}</span>${dist}</span>
  <span class="gr-card-name">${esc(r.name)}</span>
  <span class="gr-card-place">${esc(placeText(r))}${r.neighborhood ? " · " + esc(r.neighborhood) : ""}</span>
  <span class="gr-card-when">${esc(when)}</span>
  ${stat ? `<span class="gr-card-stat">${esc(stat)}</span>` : ""}
  ${tags ? `<span class="gr-tags">${tags}</span>` : ""}
</a>`;
}

// ---------- search UI (directory + state hubs share it) ----------
function searchUi(rides, { cityIndex, placeholder }) {
  const discChips = Object.entries(DISC_LABEL).filter(([k]) => rides.some((r) => r.discipline.includes(k)))
    .map(([k, v]) => `<button type="button" class="gr-chip" data-filter="disc" data-value="${k}" aria-pressed="false">${v}</button>`).join("\n          ");
  const tagChips = Object.entries(TAG_LABEL).filter(([k]) => rides.some((r) => r.inclusive_focus.includes(k)))
    .map(([k, v]) => `<button type="button" class="gr-chip" data-filter="tag" data-value="${k}" aria-pressed="false">${v}</button>`).join("\n          ");
  const dayOpts = Object.entries(DAY_LONG).map(([k, v]) => `<option value="${k}">${v}s</option>`).join("");
  return `
  <section class="gr-search-wrap">
    <div class="wrap">
      <form class="gr-search" role="search" id="gr-form" onsubmit="return false">
        <label class="visually-hidden" for="gr-q">Search by city, state or ride name</label>
        <input id="gr-q" type="search" placeholder="${attr(placeholder)}" autocomplete="off" list="gr-cities">
        <datalist id="gr-cities">${cityIndex.map(([k]) => `<option value="${attr(k)}">`).join("")}</datalist>
        <button type="button" class="btn btn-dark" id="gr-geo">Near me</button>
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
function cityIndexFor(rides) {
  const cities = {};
  for (const r of rides) { const k = `${r.city}, ${r.state}`; (cities[k] ||= { lat: 0, lng: 0, n: 0 }); cities[k].lat += r.lat; cities[k].lng += r.lng; cities[k].n += 1; }
  return Object.entries(cities).map(([k, v]) => [k, +(v.lat / v.n).toFixed(4), +(v.lng / v.n).toFixed(4)]);
}
function indexScript(rides, hubs) {
  const stateIndex = Object.entries(STATE_NAMES).map(([a, n]) => [a, n]);
  const hubIndex = hubs.map((h) => [h.state, h.city, h.path]);
  return `
<script id="gr-index" type="application/json">${JSON.stringify({ cities: cityIndexFor(rides), states: stateIndex, hubs: hubIndex })}</script>
<script src="/rides/rides.js" defer></script>`;
}

// ---------- directory ----------
function directory(rides, hubs) {
  const byState = {};
  for (const r of rides) (byState[r.state] ||= []).push(r);
  const states = Object.keys(byState).sort();
  const nInclusive = rides.filter((r) => r.inclusive_focus.some((t) => ["lgbtq", "wtf", "bipoc"].includes(t))).length;
  const nNoDrop = rides.filter((r) => r.drop_policy === "no-drop").length;
  const lastChecked = rides.map((r) => r.verified_on).sort().pop();
  const description = `Search ${rides.length} recurring bicycle group rides in ${states.length} states by city or state. Road, gravel, mountain bike and social rides — day, time, start point, pace and links for each. No account, just show up.`;
  const jsonld = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${SITE}/rides/`, name: "Find a group ride near you", description, url: `${SITE}/rides/`,
      dateModified: lastChecked, author: AUTHOR, publisher: PUBLISHER, breadcrumb: breadcrumbLd([["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`]]) },
  ] };
  const stateLinks = states.map((s) => `<a href="/rides/${s.toLowerCase()}/">${esc(stateName(s))} <small>${byState[s].length}</small></a>`).join("\n          ");
  const sections = states.map((s) => `
      <section class="gr-state" id="${s.toLowerCase()}" data-state="${s}">
        <h2 class="gr-state-head"><a href="/rides/${s.toLowerCase()}/">${esc(stateName(s))}</a> <span class="gr-count">${byState[s].length}</span></h2>
        <div class="gr-grid">
${byState[s].map((r) => card(r)).join("\n")}
        </div>
      </section>`).join("\n");

  return head({ title: "Find a group ride near you", description, canonical: `${SITE}/rides/`, jsonld }) + `
<main class="fn-pillar gr-dir">
  <header class="fn-pillar-head">
    <div class="wrap">
      ${crumbsHtml([["Cycle for Change", `${SITE}/`], ["Group rides", null]])}
      <h1>Find a group ride near you</h1>
      <p class="fn-pillar-intro">
        ${rides.length} recurring group rides in ${states.length} states. ${nNoDrop} are no-drop, so nobody gets left behind.
        ${nInclusive} are run by and for queer, women/trans/femme or BIPOC riders. Each ride has its own page:
        when it rolls, where it starts, how far, how fast, what to bring. Type a city or tap Near me.
      </p>
      <div class="fn-line" aria-hidden="true"><i data-line></i></div>
    </div>
  </header>
${searchUi(rides, { cityIndex: cityIndexFor(rides), placeholder: "City, state, or ride name — e.g. Phoenix, AZ" })}
  <section class="gr-results-wrap">
    <div class="wrap">
      <h2 class="fn-spokes-head">Group rides near you, by state</h2>
      <nav class="gr-states" aria-label="Jump to a state">
          ${stateLinks}
      </nav>
      <div id="gr-nearby" class="gr-grid gr-nearby" hidden></div>
      <div id="gr-states">${sections}
      </div>
      <div class="gr-empty" id="gr-empty" hidden>
        <p>No rides match.</p>
        <p class="gr-empty-actions"><button type="button" class="gr-chip" id="gr-widen">Show the closest rides anyway</button> <a class="gr-chip" id="gr-empty-state" href="/rides/" hidden>See the whole state</a> <button type="button" class="gr-chip" data-clear>Clear filters</button></p>
        <p>Know a ride we're missing? <a href="#submit">Add it below</a>.</p>
      </div>
    </div>
  </section>

  <section class="gr-why">
    <div class="wrap">
      <h2>Why a group ride directory on a mental-health site</h2>
      <p>
        A group ride is the cheapest, most reliable way I know to get out of my own head and into a room
        of people who want you there. Nobody asks what you do. You just ride. This directory exists so
        that anyone, anywhere in the country, can find one this week.
      </p>
      <p>
        <strong>How this list is built.</strong> Every ride is real and recurring, checked against its own website,
        Instagram, Facebook or Strava page. Each page shows the date it was last checked and the sources.
        Rides we couldn't fully confirm are marked "Unconfirmed". Organizers can claim their ride from its page.
        Last checked: ${esc(lastChecked)}.
      </p>
      <p>
        I'm riding 10,000 miles in 2027 for queer mental health. <a href="/#board">Pledge a mile</a> if
        you want to back it. Or just go find your ride.
      </p>
      <aside class="fn-crisis">
        <strong>If you're struggling:</strong> the <strong>988 Suicide &amp; Crisis Lifeline</strong>
        is free and 24/7 — call or text <strong>988</strong>. For LGBTQ youth, the
        <strong>Trevor Project</strong> is at <strong>1-866-488-7386</strong> (or text START to 678-678).
      </aside>
    </div>
  </section>
${submitForm()}
${CTA}

  <p class="fn-note" style="max-width:38rem;margin:24px auto 0;color:var(--mute);font-size:.9rem;line-height:1.6;">
    Always confirm with the host before you show up; schedules change with the seasons. This site isn't
    affiliated with any ride listed.
  </p>
</main>
` + foot(indexScript(rides, hubs));
}

// ---------- hub intro helpers ----------
function pickFirstRide(rides) {
  const score = (r) => (r.drop_policy === "no-drop" ? 3 : 0) + (r.inclusive_focus.includes("beginner") ? 2 : 0) + (r.discipline.includes("social") ? 1 : 0) + (r.confidence === "high" ? 1 : 0);
  return [...rides].sort((a, b) => score(b) - score(a))[0];
}
function pickFastRide(rides) {
  const mph = (r) => { const m = String(r.pace || "").match(/(\d{2})\s*(?:–|-|to)?\s*(\d{2})?\s*mph/); return m ? +(m[2] || m[1]) : 0; };
  const cands = rides.filter((r) => r.discipline.includes("road") && (r.drop_policy === "drop" || r.drop_policy === "groups" || mph(r) >= 17));
  return [...cands].sort((a, b) => mph(b) - mph(a))[0] || null;
}
function hubIntro(rides, placeName) {
  const first = pickFirstRide(rides); const fast = pickFastRide(rides);
  const weeknight = rides.filter((r) => r.days.some((d) => ["mon", "tue", "wed", "thu"].includes(d))).length;
  const weekend = rides.filter((r) => r.days.some((d) => ["sat", "sun"].includes(d))).length;
  const disc = {}; rides.forEach((r) => r.discipline.forEach((d) => { disc[d] = (disc[d] || 0) + 1; }));
  const top = Object.entries(disc).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([d, n]) => `${n} ${DISC_LABEL[d].toLowerCase()}`).join(", ");
  const lines = [];
  lines.push(`${rides.length} recurring group ride${rides.length === 1 ? "" : "s"} around ${placeName}: ${top}. ${weeknight} roll on weeknights, ${weekend} on weekends.`);
  if (first) lines.push(`New to group rides? Start with <a href="/rides/${first.slug}/">${esc(first.name)}</a> in ${esc(first.city)}${first.drop_policy === "no-drop" ? " — it's no-drop, nobody gets left" : ""}.`);
  if (fast && fast !== first) lines.push(`Want to go fast? <a href="/rides/${fast.slug}/">${esc(fast.name)}</a>${fast.pace ? ` runs ${esc(lower1(fast.pace))}` : " is the quick one"}.`);
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
  const lastChecked = rides.map((r) => r.verified_on).sort().pop();
  const jsonld = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": canonical, name: h1, description, url: canonical, dateModified: lastChecked, author: AUTHOR, publisher: PUBLISHER, breadcrumb: breadcrumbLd(crumbs) },
  ] };
  return head({ title, description, canonical, jsonld }) + `
<main class="fn-pillar gr-dir">
  <header class="fn-pillar-head">
    <div class="wrap">
      ${crumbsHtml(crumbs)}
      <h1>${esc(h1)}</h1>
      <p class="fn-pillar-intro">${intro.join(" ")}</p>
      <div class="fn-line" aria-hidden="true"><i data-line></i></div>
    </div>
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
        <p class="gr-empty-actions"><button type="button" class="gr-chip" id="gr-widen">Show the closest rides anyway</button> <a class="gr-chip" href="/rides/">Search the whole country</a> <button type="button" class="gr-chip" data-clear>Clear filters</button></p>
      </div>
${extra.bottom || ""}
      <p class="gr-hub-foot">Rides here were last checked ${esc(lastChecked)}. Wrong or gone? Use "Is this right?" on the ride's page. Know one we're missing? <a href="/rides/#submit">Add it</a>.</p>
      <p class="fn-back"><a href="/rides/">← All states</a></p>
    </div>
  </section>
${CTA}
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
      top: `      <h2 class="fn-spokes-head">Group rides in ${esc(name)}, by city</h2>
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
  const bottom = (others.length ? `
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
    extra: { top: `      <h2 class="fn-spokes-head">Group rides within ${METRO_RADIUS} miles of ${esc(name)}, closest first</h2>`, bottom },
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
  const disc = discLabel(r.discipline);
  const start = r.start_location;
  const startName = start ? [start.name, start.address].filter(Boolean).join(", ") : null;
  const mapQ = start && (start.address || start.name) ? encodeURIComponent([start.name, start.address].filter(Boolean).join(", ")) : `${r.lat},${r.lng}`;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQ}`;
  const L = r.links;
  const primary = L.website ? ["Host's website", L.website] : L.instagram ? [`${handle(L.instagram) || "Instagram"} on Instagram`, L.instagram] : L.facebook ? ["Host on Facebook", L.facebook] : L.strava ? ["Strava club", L.strava] : L.meetup ? ["Meetup group", L.meetup] : null;
  const hostLabel = L.instagram ? `<a href="${attr(L.instagram)}" rel="noopener nofollow">${esc(handle(L.instagram) || "their Instagram")}</a>` : L.facebook ? `<a href="${attr(L.facebook)}" rel="noopener nofollow">their Facebook page</a>` : L.website ? `<a href="${attr(L.website)}" rel="noopener nofollow">the host's website</a>` : L.strava ? `<a href="${attr(L.strava)}" rel="noopener nofollow">the Strava club</a>` : null;

  // schedule, next occurrence, calendar
  const dp = dayPhrase(r); const tm = fmtTime(r.start_hhmm);
  const next = nextOccurrence(r);
  const rule = next ? rrule(r) : null;
  const ledeDiscs = (r.discipline.length > 1 ? r.discipline.filter((d) => d !== "mixed") : r.discipline).map((d) => (DISC_LABEL[d] || d).toLowerCase());
  const ledeDisc = ledeDiscs.length > 1 ? ledeDiscs.slice(0, -1).join(", ") + " and " + ledeDiscs.slice(-1) : ledeDiscs[0];
  const dist = cleanDist(r.distance_miles);
  let lede = `${r.name} is a ${ledeDisc} group ride in ${placeText(r)}.`;
  if (dp && tm) lede += ` It rolls ${lower1(dp)} at ${tm}${start && start.name ? ` from ${start.name}` : ""}.`;
  else if (r.schedule) lede += ` Schedule: ${r.schedule.replace(/\.$/, "")}${start && start.name ? `, from ${start.name}` : ""}.`;
  if (dist) lede += ` About ${dist} miles${r.pace ? `, ${lower1(r.pace)}` : ""}.`;
  else if (r.pace) lede += ` Pace: ${lower1(r.pace)}.`;
  if (r.drop_policy === "no-drop" && !/no-drop/i.test(lede)) lede += " No-drop.";
  const description = trunc(lede, 158);
  const sw = shortWhen(r);
  let title = `${r.name} — ${placeText(r)} group ride${sw ? `, ${sw}` : ""}`;
  if (title.length > 66 && sw) title = `${r.name} — ${placeText(r)} group ride`;
  if (title.length > 66) title = `${r.name} — ${placeText(r)}`;

  const hub = hubFor[r.slug];
  const crumbs = [["Cycle for Change", `${SITE}/`], ["Group rides", `${SITE}/rides/`], [stateName(r.state), `${SITE}/rides/${r.state.toLowerCase()}/`]];
  if (hub) crumbs.push([hub.city, `${SITE}${hub.path}`]);
  crumbs.push([r.name, url]);

  const nearby = all.filter((o) => o.slug !== r.slug).map((o) => ({ o, d: miles(r, o) })).sort((a, b) => a.d - b.d).slice(0, 4);

  const facts = [
    ["When", dp && tm ? `${dp}, ${tm}` : r.schedule, r.season_months ? `Season: ${r.season || "seasonal"}` : r.season === "year-round" ? "Year-round" : (dp && tm && r.schedule && r.schedule !== `${dp}, ${tm}` ? r.schedule : null)],
    ["Starts at", startName ? `${esc(startName)} <a class="gr-map" href="${attr(mapUrl)}" rel="noopener">Map ↗</a>` : null, null, true],
    ["Distance", dist ? `${dist} miles` : null, r.duration || (r.duration_min ? `about ${Math.round(r.duration_min / 60 * 10) / 10} hours` : null)],
    ["Pace", r.pace, r.drop_policy && r.drop_policy !== "unknown" ? { "no-drop": "No-drop: nobody gets left", drop: "Drop ride: keep up or get dropped", groups: "Splits into pace groups" }[r.drop_policy] : null],
    ["Hosted by", r.host ? r.host.name : null, r.host && r.host.type ? HOST_TYPE[r.host.type] : null],
    ["Started", r.founded_year ? String(r.founded_year) : null, r.founded_note],
    ["Cost", r.cost, null],
    ["Bike", disc, null],
  ].filter((f) => f[1]);
  const factsHtml = facts.map(([k, v, sub, raw]) =>
    `<div class="gr-fact"><dt>${k}</dt><dd>${raw ? v : esc(v)}${sub ? `<small>${esc(sub)}</small>` : ""}</dd></div>`).join("\n        ");

  const linkBtns = [
    L.website && ["Website", L.website],
    L.instagram && [handle(L.instagram) || "Instagram", L.instagram],
    L.facebook && ["Facebook", L.facebook],
    L.strava && ["Join the Strava club", L.strava],
    L.meetup && ["Meetup group", L.meetup],
    ...(L.other || []).map((u) => ["More", u]),
  ].filter(Boolean).map(([t, u]) => `<a class="btn ${/strava/i.test(t) ? "btn-y" : "btn-dark"}" href="${attr(u)}" rel="noopener nofollow">${esc(t)} ↗</a>`).join("\n        ");

  const tags = r.inclusive_focus.map((t) => `<span class="gr-tag">${esc(TAG_LABEL[t] || t)}</span>`).join("")
    + (r.confidence === "low" ? `<span class="gr-tag gr-tag-warn" title="We found this ride but couldn't confirm every detail">Unconfirmed — check with the host</span>` : "")
    + (r.host && r.host.claimed ? `<span class="gr-tag gr-tag-ok">Verified by the organizer</span>` : "");

  // JSON-LD: WebPage (dates, author, breadcrumb) + Event only when the schedule is computable
  const graph = [{
    "@type": "WebPage", "@id": url, url, name: title, description, dateModified: r.verified_on, author: AUTHOR, publisher: PUBLISHER,
    breadcrumb: breadcrumbLd(crumbs), ...(next ? { mainEntity: { "@id": `${url}#event` } } : {}),
  }];
  if (next) {
    const ev = {
      "@type": "Event", "@id": `${url}#event`, name: r.name, description, url,
      startDate: isoWithOffset(next, r.tz),
      ...(r.duration_min ? { endDate: isoWithOffset(new Date(next.getTime() + r.duration_min * 60000), r.tz) } : {}),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled",
      isAccessibleForFree: !r.cost || /^free/i.test(r.cost),
      location: { "@type": "Place", name: (start && start.name) || placeText(r), address: (start && start.address) || placeText(r), geo: { "@type": "GeoCoordinates", latitude: r.lat, longitude: r.lng } },
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
        <a class="btn btn-dark" href="/rides/${r.slug}/ride.ics" download="${attr(r.slug)}.ics">Add to calendar</a>
        <a class="gr-minor" href="${attr(gcalUrl(r, next, rule))}" rel="noopener">Google Calendar</a>` : "";

  return head({ title, description, canonical: url, jsonld, ogType: "article", titleHasBrand: false }) + `
<main class="fn-post gr-ride">
  <article class="fn-article" data-ride
    data-tz="${attr(r.tz || "")}" data-time="${attr(r.start_hhmm || "")}" data-days="${r.days.join(" ")}"
    data-freq="${attr(r.frequency || "")}" data-season="${r.season_months ? `${r.season_months.start}-${r.season_months.end}` : ""}"
    data-monthly="${attr(r.monthly_rule ? JSON.stringify(r.monthly_rule) : "")}">
    ${crumbsHtml(crumbs)}

    <h1>${esc(r.name)}</h1>
    <p class="gr-place">${esc(placeText(r))}${r.neighborhood ? ` · ${esc(r.neighborhood)}` : ""} · ${esc(disc)}</p>
    ${tags ? `<p class="gr-tags">${tags}</p>` : ""}

    <p class="fn-lede">${esc(lede)}</p>

    <div class="gr-next" id="gr-next" ${next ? "" : "hidden"}>
      <span class="gr-next-label">Next ride</span>
      <time class="gr-next-when" data-next-text${next ? ` datetime="${isoWithOffset(next, r.tz)}"` : ""}>${next ? esc(fmtNext(next, r.tz)) : ""}</time>
      <span class="gr-next-rel" data-next-rel>${next && r.frequency === "biweekly" ? "every other week — confirm which week with the host" : ""}</span>
    </div>

    <div class="gr-actions">
      ${primary ? `<a class="btn btn-y gr-primary" href="${attr(primary[1])}" rel="noopener nofollow">${esc(primary[0])} ↗</a>` : ""}${calBtns}
      <button type="button" class="btn btn-dark" id="gr-share" data-title="${attr(r.name + " — " + placeText(r))}">Share</button>
      <span class="gr-share-alt"><a href="sms:?&body=${encodeURIComponent(r.name + " — " + url)}">Text it</a> · <a href="https://wa.me/?text=${encodeURIComponent(r.name + " — " + url)}" rel="noopener">WhatsApp</a> · <a href="mailto:?subject=${encodeURIComponent("Group ride: " + r.name)}&body=${encodeURIComponent(url)}">Email</a></span>
      <span class="gr-toast" id="gr-toast" role="status" aria-live="polite"></span>
    </div>

    <dl class="gr-facts">
        ${factsHtml}
    </dl>
${firstTimeBlock(r, hostLabel)}
    <div class="fn-body">
      <h2>About the ${esc(r.name)} group ride</h2>
      ${(r.description || "").split(/\n+/).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join("\n      ") || "<p>Details are on the host's page below.</p>"}
    </div>

    <div class="gr-links">
      <h2>Where to find them</h2>
      <div class="fn-cta-row">
        ${linkBtns}
      </div>
    </div>

    <p class="fn-note gr-verify">
      Last checked ${esc(r.verified_on)} against ${r.sources.length ? r.sources.map((s, i) => `<a href="${attr(s)}" rel="noopener nofollow">source ${i + 1}</a>`).join(", ") : "the links above"}.
      Schedules change. Confirm with the host before you go.
    </p>
${editForm(r)}
  </article>

  <nav class="fn-related" aria-label="Nearby group rides">
    <h2>Nearby rides</h2>
    ${nearby.map(({ o, d }) => `<a href="/rides/${o.slug}/">${esc(o.name)} <small>· ${esc(placeText(o))} · ${esc(DISC_LABEL[o.discipline[0]] || o.discipline[0])} · ${d < 0.5 ? "same start" : Math.round(d) + " mi"}</small></a>`).join("\n    ")}
    ${hub ? `<a href="${hub.path}">All rides near ${esc(hub.city)} →</a>` : ""}
    <a href="/rides/${r.state.toLowerCase()}/">All rides in ${esc(stateName(r.state))} →</a>
  </nav>

${CTA}

  <p class="fn-back"><a href="/rides/">← Find another group ride</a></p>
</main>
` + foot(`
<script src="/rides/ride.js" defer></script>`);
}

// ---------- thanks page ----------
function thanksPage() {
  const jsonld = { "@context": "https://schema.org", "@type": "WebPage", name: "Thanks", url: `${SITE}/rides/thanks/`, publisher: PUBLISHER };
  return head({ title: "Thanks — we got it", description: "Your note about a group ride was received. We check every change against the ride's own page before it goes up.", canonical: `${SITE}/rides/thanks/`, jsonld }) + `
<main class="fn-post gr-ride">
  <article class="fn-article">
    <h1>Got it. Thank you.</h1>
    <p class="fn-lede">We read every one of these. Edits and new rides usually show up within a week, after we check them against the ride's own page.</p>
    <p>If you said you organize the ride and left an email, we'll reply from there to confirm before marking the page "Verified by the organizer".</p>
    <p class="fn-back"><a href="/rides/">← Back to the directory</a></p>
  </article>
</main>
` + foot();
}

// ---------- sitemap (lastmod = real verified dates, never "today") ----------
function sitemap(rides, states, hubs) {
  const maxOf = (list) => list.map((r) => r.verified_on).sort().pop();
  const rows = [[`${SITE}/rides/`, maxOf(rides)]];
  for (const st of states) rows.push([`${SITE}/rides/${st.toLowerCase()}/`, maxOf(rides.filter((r) => r.state === st))]);
  for (const h of hubs) rows.push([`${SITE}${h.path}`, maxOf(h.rides)]);
  for (const r of rides) rows.push([`${SITE}/rides/${r.slug}/`, r.verified_on]);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows.map(([u, d]) => `  <url><loc>${u}</loc><lastmod>${d}</lastmod></url>`).join("\n")}
</urlset>
`;
}

// ---------- main ----------
function main() {
  const rides = load();
  const events = loadEvents();
  const states = [...new Set(rides.map((r) => r.state))].sort();
  const { hubs, hubFor } = buildMetros(rides);

  for (const ent of fs.readdirSync(OUT, { withFileTypes: true })) if (ent.isDirectory()) rmrf(path.join(OUT, ent.name));
  write(path.join(OUT, "index.html"), directory(rides, hubs));
  write(path.join(OUT, "thanks", "index.html"), thanksPage());
  for (const st of states) write(path.join(OUT, st.toLowerCase(), "index.html"), statePage(st, rides.filter((r) => r.state === st), hubs, events));
  for (const h of hubs) write(path.join(OUT, h.state.toLowerCase(), h.slug, "index.html"), metroPage(h, hubs, events));
  let nIcs = 0, nEvent = 0;
  for (const r of rides) {
    write(path.join(OUT, r.slug, "index.html"), ridePage(r, rides, hubFor, hubs));
    const next = nextOccurrence(r); const rule = next ? rrule(r) : null;
    if (next) nEvent++;
    if (next && rule) { write(path.join(OUT, r.slug, "ride.ics"), ics(r, next, rule)); nIcs++; }
  }
  write(path.join(OUT, "sitemap.xml"), sitemap(rides, states, hubs));
  console.log(`built ${rides.length} ride pages (${nEvent} with a computed next ride, ${nIcs} with .ics), ${states.length} state hubs, ${hubs.length} city hubs, 1 directory → cfc-site/rides/`);
  console.log("city hubs: " + hubs.map((h) => `${h.city} ${h.state} (${h.rides.length})`).join(", "));
}
main();
