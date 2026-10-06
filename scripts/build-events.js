#!/usr/bin/env node
/* Cycle for Change — events directory generator.
   Reads data/events/*.json and data/towns/*.json and writes static HTML into
   cfc-site/. No dependencies, no framework. Output is committed; Netlify just
   serves the files.

   Run:   node scripts/build-events.js
   Docs:  data/SCHEMA.md

   URLs it produces:
     /events/                          index (upcoming + by state)
     /events/<slug>/                   one page per event
     /events/state/<state>/            events + towns in a state
     /towns/                           town index
     /towns/<state>/<town>/            town page (weather, events, resources)
     /towns/<state>/<town>/hotels/
     /towns/<state>/<town>/restaurants/
     /towns/<state>/<town>/bike-shops/
     /towns/<state>/<town>/routes/          } only when the town carries the
     /towns/<state>/<town>/coffee/          } guide fields (data/SCHEMA.md,
     /towns/<state>/<town>/culture/         } "Town guide fields") — the
     /towns/<state>/<town>/bring-your-bike/ } destination layer, Sept 30, 2026
     /events/events.json               machine-readable feed
     /sitemap-events.xml               sitemap for everything above (listed in /sitemap.xml)
*/
"use strict";

const fs = require("fs");
const path = require("path");
const CHROME = require("./chrome.js"); // shared header, footer, fonts
const BLOCKS = require("./blocks.js"); // how-it's-built tiles + the ride-report form (Pass 3)
const TOWNS = require("./towns.js");   // the town layer: the strip every event, calendar row and ride page carries (Sept 30, 2026)
const { townsMap } = require("./towns-map.js");   // the tap-a-town US map on /towns/ (Oct 3, 2026)
const PH = require("./photos.js");     // Pass 25: Robert's photos (alt text, place, the figure)
// Pass 25 (Oct 4, 2026): a town guide carries Robert's photo when he has one from the town or right by it
// (the caption says where it was really taken: Del Mar's is Encinitas, a few miles up the coast).
const TOWN_PHOTO = { "seattle-wa": "seattle-path", "del-mar-ca": "encinitas-beach" };

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data");
// CFC_OUT=<dir> writes the pages somewhere else (an editor reading a draft guide while another build runs); the
// art, rides and calendar are still read from the repo. The real build never sets it.
const OUT = process.env.CFC_OUT ? path.resolve(process.env.CFC_OUT) : path.join(ROOT, "cfc-site");
const SITE = "https://cycleforchange.org";
const TODAY = new Date().toISOString().slice(0, 10);
// One form on these pages: `ride-report` (scripts/blocks.js), for adding or fixing a listing.

// ——— guardrails from CLAUDE.md ———————————————————————————————————————
const BANNED = [
  /\bleverage\b/i, /\bsynergy\b/i, /\bjourney\b/i, /passionate about/i,
  /thrilled to announce/i, /excited to share/i, /\$800/, /two suitcases/i,
  /\bPrescott\b/, /est\.? 2008/i, /years? sober\b/i, /sober since/i,
  /\brelapse/i, /7,?500[- ]mile/i,
];

function lint(where, text) {
  if (typeof text !== "string") return;
  for (const re of BANNED) {
    if (re.test(text)) throw new Error(`Banned phrase ${re} in ${where}: "${text.slice(0, 80)}"`);
  }
}
function lintDeep(where, v) {
  if (typeof v === "string") lint(where, v);
  else if (Array.isArray(v)) v.forEach((x, i) => lintDeep(`${where}[${i}]`, x));
  else if (v && typeof v === "object") Object.keys(v).forEach((k) => lintDeep(`${where}.${k}`, v[k]));
}

// ——— helpers —————————————————————————————————————————————————————————————
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const attr = esc;
const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const jsonld = (obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/<\//g, "<\\/")}\n</script>`;
const domain = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };
const paras = (arr, cls) => (arr || []).map((p) => `<p${cls ? ` class="${cls}"` : ""}>${esc(p)}</p>`).join("\n");
const truncate = (s, n) => { s = String(s || "").trim(); return s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…"; };

function fmtDate(iso, opts) {
  if (!iso) return null;
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("en-US", Object.assign({ timeZone: "UTC", weekday: "long", year: "numeric", month: "long", day: "numeric" }, opts || {}));
}
function fmtRange(a, b) {
  if (!a) return null;
  if (!b || b === a) return fmtDate(a);
  const da = new Date(a + "T12:00:00Z"), db = new Date(b + "T12:00:00Z");
  if (da.getUTCMonth() === db.getUTCMonth()) {
    return `${da.toLocaleDateString("en-US", { timeZone: "UTC", month: "long", day: "numeric" })}–${db.getUTCDate()}, ${db.getUTCFullYear()}`;
  }
  return `${fmtDate(a, { weekday: undefined })} – ${fmtDate(b, { weekday: undefined })}`;
}
function haversineMi(a, b) {
  const R = 3958.8, toR = (x) => (x * Math.PI) / 180;
  const dLat = toR(b.lat - a.lat), dLon = toR(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
const TYPE_LABEL = { road: "Road", gravel: "Gravel", mtb: "Mountain bike", tour: "Tour", hillclimb: "Hill climb", charity: "Charity ride", "multi-day": "Multi-day" };

function readDir(dir) {
  // Files starting with "_" are templates and notes (data/towns/_template.json), not records.
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json") && !f.startsWith("_")).map((f) => {
    const p = path.join(dir, f);
    try { return JSON.parse(fs.readFileSync(p, "utf8")); }
    catch (e) { throw new Error(`Bad JSON in ${p}: ${e.message}`); }
  });
}
function write(rel, html) {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
  return rel;
}

// ——— load + validate ————————————————————————————————————————————————————
const towns = readDir(path.join(DATA, "towns"));
const events = readDir(path.join(DATA, "events"));

// Group rides near each event town come from the rides directory; the six rides
// Robert is doing in 2027 come from the calendar (riding: true). Both optional.
function readJson(p) { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch (e) { return null; } }
// The rides on the directory's lists: tools/build-rides.js writes live.json (Sept 30, 2026) — rides we
// can't vouch for any more (stale, paused, ended) stay off event and town pages too. Run build-rides first.
const RIDES = readJson(path.join(ROOT, "cfc-site", "rides", "live.json"))
  || (readJson(path.join(ROOT, "cfc-site", "rides", "rides.json")) || []).filter((r) => !["ended", "paused"].includes(r.status));
const RIDING = ((readJson(path.join(ROOT, "data", "calendar-2027.json")) || {}).events || []).filter((e) => e.riding).map((e) => String(e.name).replace(/\s*\(.*?\)\s*/g, "").toLowerCase());
const norm = (n) => String(n || "").toLowerCase().replace(/^(the|td)\s+/, "").replace(/\s*\(.*?\)\s*/g, "").trim();
const isRiding = (e) => RIDING.some((n) => norm(n) === norm(e.name) || norm(n).startsWith(norm(e.name)) || norm(e.name).startsWith(norm(n)));
function ridesNear(e, radius = 30, max = 4) {
  return RIDES.map((r) => ({ r, d: haversineMi(e, { lat: r.lat, lon: r.lng }) })).filter((x) => x.d <= radius).sort((a, b) => a.d - b.d).slice(0, max);
}
// The 2027 calendar (one row per organized ride) and the rides-directory hubs
// (cfc-site/rides/hubs.json, written by tools/build-rides.js) feed the town page:
// "Organized rides in <town> in 2027" and the link to /rides/<st>/<city>/.
const CALENDAR = (readJson(path.join(ROOT, "data", "calendar-2027.json")) || {}).events || [];
const HUBS = readJson(path.join(ROOT, "cfc-site", "rides", "hubs.json")) || [];
function hubFor(t) {
  const h = HUBS.find((x) => slugify(x.city) === t.slug && String(x.state).toUpperCase() === t.state_code);
  return h ? { path: `/rides/${t.state_code.toLowerCase()}/${t.slug}/`, rides: h.rides } : null;
}
function calendarIn(t, max = 8) {
  const city = String(t.name).toLowerCase();
  return CALENDAR.filter((e) => e.start && String(e.city || "").toLowerCase() === city && String(e.state || "").toUpperCase() === t.state_code)
    .filter((e) => !t.events.some((x) => norm(x.name) === norm(e.name)))
    .sort((a, b) => a.start.localeCompare(b.start)).slice(0, max);
}
const townById = Object.fromEntries(towns.map((t) => [t.id, t]));

// ——— Pass 22 (Oct 2, 2026): a guide names a ride by its slug, never by hand-typed day and time ———
// A rider read "the Saturday Nichols Canyon ride" on the LA guide; the ride's own page said Sunday, and
// the link 404'd. Now guide text writes `{ride:<slug>|label}` (several slugs: `{ride:a,b,c|label}`) and
// entries carry `ride_slug` (data/SCHEMA.md, "Town guide fields"). The day, time and link come from
// cfc-site/rides/rides.json here, at build time. A slug that isn't in rides.json stops the build; a ride
// that's off the lists (stale, paused, ended) renders as its label with no link and a warning.
const ALL_RIDES = readJson(path.join(ROOT, "cfc-site", "rides", "rides.json")) || [];
const RIDE_BY_SLUG = new Map(ALL_RIDES.map((r) => [r.slug, r]));
const LIVE_BY_SLUG = new Map(RIDES.map((r) => [r.slug, r]));
const RIDE_TOKEN = TOWNS.RIDE_TOKEN;
const DAY_LONG = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
const ORD_SHORT = { 1: "1st", 2: "2nd", 3: "3rd", 4: "4th", 5: "5th", "-1": "Last" };
const andList = (a) => a.length <= 1 ? (a[0] || "") : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`;
function fmtHhmm(hhmm) {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "pm" : "am"}`;
}
// The same words as the ride's own page (tools/build-rides.js dayPhrase): never "Every Monday" for a ride posted date by date.
function rideDays(r) {
  if (r.monthly_rule && r.monthly_rule.length) return r.monthly_rule.map((m) => `${ORD_SHORT[m.ord]} ${DAY_LONG[m.day]}`).join(" and ") + " of the month";
  const names = (r.days || []).map((d) => DAY_LONG[d]);
  if (!names.length) return null;
  if (r.frequency === "irregular") return "Some " + andList(names.map((n) => n + "s"));
  if (r.frequency === "biweekly") return "Every other " + names.join(" and ");
  if (r.frequency === "monthly") return "Monthly, on a " + names[0];
  return andList(names.map((n) => n + "s"));
}
const rideTime = (r) => (r.time_local || fmtHhmm(r.start_hhmm) || "").replace(/\s*\(([^)]*)\)/g, ", $1") || null; // "8:00 am (usually)" → "8:00 am, usually": it sits inside parentheses
const rideWhen = (r) => [rideDays(r), rideTime(r)].filter(Boolean).join(", ");
function rideLookup(slug, where) {
  const r = RIDE_BY_SLUG.get(slug);
  if (!r) throw new Error(`${where}: ride "${slug}" is not in cfc-site/rides/rides.json — fix the slug (the ride's URL is /rides/<slug>/)`);
  const live = LIVE_BY_SLUG.get(slug);
  if (!live) console.warn(`WARNING ${where}: ride "${slug}" is off the lists (${r.status}${r.verified_on ? `, checked ${r.verified_on}` : ""}); it renders as plain text with no link`);
  return live ? Object.assign({}, r, live, { listed: true }) : Object.assign({}, r, { listed: false });
}
const slugsOf = (v) => (Array.isArray(v) ? v : String(v || "").split(",")).map((s) => String(s).trim()).filter(Boolean);
const rideA = (r, text) => r.listed ? `<a class="ride-ref" href="/rides/${r.slug}/">${text}</a>` : text;
// One ride: "label (Sundays, 8:00 am)". Several on one clock: "label (Tue, Wed, Thu and Fri, 6:30 am)", each day its own link.
function rideRefHtml(slugs, label, where) {
  const rs = slugsOf(slugs).map((s) => rideLookup(s, where));
  if (rs.length === 1) {
    const r = rs[0], w = r.listed ? rideWhen(r) : "";
    return `${rideA(r, esc(label || r.name))}${w ? ` <span class="ride-when">(${esc(w)})</span>` : ""}`;
  }
  const live = rs.filter((r) => r.listed);
  const oneClock = live.length && live.every((r) => r.frequency === "weekly" && (r.days || []).length === 1 && rideTime(r) === rideTime(live[0]));
  if (label && oneClock) return `${esc(label)} <span class="ride-when">(${andList(live.map((r) => rideA(r, esc(DAY_LONG[r.days[0]].slice(0, 3)))))}, ${esc(rideTime(live[0]))})</span>`;
  const each = rs.map((r) => `${rideA(r, esc(r.name))}${r.listed && rideWhen(r) ? ` <span class="ride-when">(${esc(rideWhen(r))})</span>` : ""}`).join("; ");
  return label ? `${esc(label)}: ${each}` : each;
}
function rideRefPlain(slugs, label, where) {
  const rs = slugsOf(slugs).map((s) => rideLookup(s, where));
  if (rs.length === 1) return `${label || rs[0].name}${rs[0].listed && rideWhen(rs[0]) ? ` (${rideWhen(rs[0])})` : ""}`;
  const live = rs.filter((r) => r.listed);
  const oneClock = live.length && live.every((r) => r.frequency === "weekly" && (r.days || []).length === 1 && rideTime(r) === rideTime(live[0]));
  if (label && oneClock) return `${label} (${andList(live.map((r) => DAY_LONG[r.days[0]].slice(0, 3)))}, ${rideTime(live[0])})`;
  const each = rs.map((r) => `${r.name}${r.listed && rideWhen(r) ? ` (${rideWhen(r)})` : ""}`).join("; ");
  return label ? `${label}: ${each}` : each;
}
// Phone numbers in text become tap-to-call (a rider on a phone, Pass 22). US forms only: (310) 376-7786, 310-376-7786.
const PHONE = /(\(\d{3}\)\s?\d{3}-\d{4}|\b\d{3}-\d{3}-\d{4}\b)/g;
const telHref = (p) => `tel:+1${String(p).replace(/\D/g, "").slice(-10)}`;
const telify = (escaped) => escaped.replace(PHONE, (m) => `<a class="tel" href="${telHref(m)}">${m}</a>`);
const telLink = (p) => p ? `<a class="tel" href="${telHref(p)}">${esc(p)}</a>` : "";
// rich(): guide text → HTML (escaped, ride refs rendered, phones tappable). plain(): the same text for JSON-LD and meta.
function rich(s, where = "text") {
  s = String(s == null ? "" : s);
  let out = "", last = 0;
  for (const m of s.matchAll(RIDE_TOKEN)) {
    out += telify(esc(s.slice(last, m.index))) + rideRefHtml(m[1], m[2], where);
    last = m.index + m[0].length;
  }
  return out + telify(esc(s.slice(last)));
}
const plain = (s, where = "text") => String(s == null ? "" : s).replace(RIDE_TOKEN, (m, slugs, label) => rideRefPlain(slugs, label, where));
// every ride a guide names (tokens + ride_slug / ride fields) — checked here, so a bad slug fails the build up front
function guideRideRefs(t) {
  const refs = new Set();
  const walk = (v, where) => {
    if (typeof v === "string") { for (const m of v.matchAll(RIDE_TOKEN)) slugsOf(m[1]).forEach((s) => { rideLookup(s, where); refs.add(s); }); }
    else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${where}[${i}]`));
    else if (v && typeof v === "object") for (const k of Object.keys(v)) {
      if ((k === "ride_slug" || k === "ride") && v[k]) slugsOf(v[k]).forEach((s) => { rideLookup(s, `${where}.${k}`); refs.add(s); });
      else walk(v[k], `${where}.${k}`);
    }
  };
  walk(t, `towns/${t.id}`);
  return refs;
}
const entryRides = (it) => slugsOf(it && (it.ride_slug || it.ride));

// Guide-field vocabularies (data/SCHEMA.md). The build fails on a value outside them,
// so chips, filters and JSON-LD always agree.
const ENUM = {
  kind: ["event-host", "destination"],
  routeType: ["road", "gravel", "mtb", "path", "climb"],
  difficulty: ["easy", "moderate", "hard", "epic"],
  cultureKind: ["record-store", "bookstore", "gallery", "museum", "bar", "queer-owned", "venue", "market", "other"],
  linkKind: ["official", "affiliate"],
};
const inEnum = (where, v, list) => { if (v != null && !list.includes(v)) throw new Error(`${where}: "${v}" is not one of ${list.join(", ")}`); };

for (const t of towns) {
  for (const k of ["id", "name", "state", "state_code", "lat", "lon", "timezone", "summary"]) {
    if (t[k] == null) throw new Error(`Town ${t.id || "?"} missing ${k}`);
  }
  t.state_slug = slugify(t.state);
  t.slug = slugify(t.name);
  t.url = `/towns/${t.state_slug}/${t.slug}/`;
  t.events = [];
  t.kind = t.kind || "event-host";
  inEnum(`towns/${t.id}.kind`, t.kind, ENUM.kind);
  (t.routes || []).forEach((r, i) => {
    if (!r.name) throw new Error(`towns/${t.id}.routes[${i}] has no name`);
    inEnum(`towns/${t.id}.routes[${i}].type`, r.type, ENUM.routeType);
    inEnum(`towns/${t.id}.routes[${i}].difficulty`, r.difficulty, ENUM.difficulty);
    if (!r.links || !Object.values(r.links).some(Boolean)) throw new Error(`towns/${t.id}.routes[${i}] (${r.name}) has no route link — a route needs a public route page`);
  });
  (t.culture || []).forEach((c, i) => inEnum(`towns/${t.id}.culture[${i}].kind`, c.kind, ENUM.cultureKind));
  (t.travel_links || []).forEach((l, i) => inEnum(`towns/${t.id}.travel_links[${i}].kind`, l.kind, ENUM.linkKind));
  for (const k of ["hotels", "restaurants", "bike_shops", "coffee", "culture", "clubs", "routes"]) {
    (t[k] || []).forEach((it, i) => { if (!it.name) throw new Error(`towns/${t.id}.${k}[${i}] has no name`); });
  }
  lintDeep(`towns/${t.id}`, t);
  t.rideRefs = guideRideRefs(t); // Pass 22: throws on a slug that isn't in rides.json
}
for (const e of events) {
  for (const k of ["slug", "name", "type", "town", "website", "summary"]) {
    if (e[k] == null) throw new Error(`Event ${e.slug || "?"} missing ${k}`);
  }
  lintDeep(`events/${e.slug}`, e); // before refs are wired (they are circular)
  const t = townById[e.town];
  if (!t) throw new Error(`Event ${e.slug} references unknown town ${e.town}`);
  e.townRef = t;
  e.url = `/events/${e.slug}/`;
  e.lat = e.start_lat != null ? e.start_lat : t.lat;
  e.lon = e.start_lon != null ? e.start_lon : t.lon;
  t.events.push(e);
}

const states = {};
for (const t of towns) {
  const s = (states[t.state_slug] ||= { name: t.state, code: t.state_code, slug: t.state_slug, towns: [], events: [] });
  s.towns.push(t);
  s.events.push(...t.events);
}
const stateList = Object.values(states).sort((a, b) => a.name.localeCompare(b.name));
const byDate = (a, b) => (a.next_date || "9999").localeCompare(b.next_date || "9999") || a.name.localeCompare(b.name);
events.sort(byDate);
for (const s of stateList) { s.events.sort(byDate); s.towns.sort((a, b) => a.name.localeCompare(b.name)); }

// ——— shared chrome ————————————————————————————————————————————————————————

function head({ title, description, url, ld, ogType }) {
  return `<!DOCTYPE html>
<!-- Generated by scripts/build-events.js from data/. Edit the JSON, not this file. -->
<html lang="en">
<head>
${CHROME.head({ title, description, url, ogType, styles: ["/events/events.css"], ld })}
</head>
<body>
${CHROME.HEADER}
<main id="main" class="wrap">
`;
}

function foot(pledgeHtml) {
  return `
${pledgeHtml || CHROME.PLEDGE}
</main>
${CHROME.FOOTER}
<script src="/events/events.js" defer></script>
${BLOCKS.REPORT_JS}
</body>
</html>
`;
}

function breadcrumb(items) {
  const html = `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map((it, i) =>
    `<li>${i < items.length - 1 ? `<a href="${it.url}">${esc(it.name)}</a>` : `<span aria-current="page">${esc(it.name)}</span>`}</li>`
  ).join("")}</ol></nav>`;
  const ld = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: SITE + it.url })),
  };
  return { html, ld };
}

function weatherBlock(place, opts) {
  const o = opts || {};
  return `
  <section class="weather" id="weather" aria-labelledby="weather-h">
    <h2 id="weather-h">${mark("weather", "mk mk--h2")}${esc(o.heading || `Weather in ${place.name}`)}</h2>
    ${o.note ? `<p class="weather-note">${esc(o.note)}</p>` : ""}
    <div class="wx" data-weather data-lat="${place.lat}" data-lon="${place.lon}" data-tz="${attr(place.timezone)}"${o.date ? ` data-event-date="${o.date}"` : ""}${o.endDate ? ` data-event-end="${o.endDate}"` : ""} aria-live="polite">
      <p class="wx-status">Loading the forecast for ${esc(place.name)}&hellip;</p>
    </div>
    <p class="wx-credit">Live forecast from <a href="https://open-meteo.com/" rel="noopener">Open-Meteo</a>. Times are local to ${esc(place.name)}.</p>
  </section>`;
}

// Pass 8 (Sept 30, 2026): every fact carries its mark (cfc-site/rides/marks.svg)
const MARK_FOR = { "Next edition": "date", Usually: "ride-day", Start: "start", Distances: "distance", Terrain: "terrain", Climbing: "climb",
  Riders: "riders", Cost: "cost", Founded: "founded", Organizer: "organizer", "Sign-up": "signup", Registration: "signup", Cause: "hundred",
  Benefits: "hundred", Beneficiary: "hundred", Elevation: "climb", Population: "riders", "Nearest airport": "airport", County: "town", Timezone: "founded" };
const mark = (id, cls = "mk") => `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="/rides/marks.svg#m-${id}"/></svg>`;
function facts(rows) {
  return `<dl class="facts">${rows.filter((r) => r[1]).map(([k, v]) => `<div>${mark(MARK_FOR[k] || "flag")}<dt>${esc(k)}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
}

// Pass 7 (Sept 30, 2026): events are posters. The date as a big numeral (MM.DD), the town's
// name filling the width, the specs as scannable mono lines (the SYN flyer Robert saved).
// The town's contour (tools/contour-art.js → cfc-site/towns/art/<slug>.svg) sits behind it once drawn.
const posterDate = (e) => e.next_date ? `${e.next_date.slice(5, 7)}.${e.next_date.slice(8, 10)}` : "TBA";
const townArt = (t) => (fs.existsSync(path.join(OUT, "towns", "art", `${t.slug}.svg`)) ? `<img class="tile-art" src="/towns/art/${t.slug}.svg" alt="" loading="lazy" decoding="async" width="200" height="200">` : "");
const longestWordOf = (name) => Math.max(...String(name).split(/[\s-]+/).map((w) => w.length), 4);
function eventCard(e, opts) {
  const o = opts || {};
  const t = e.townRef;
  const when = e.next_date ? fmtRange(e.next_date, e.end_date) : (e.typical_timing || "Date to be announced");
  const dist = e.distances && e.distances.length ? e.distances.map((d) => d.label).join(" / ") : "";
  const art = townArt(t);
  return `<li class="tile-p tile-p--event${art ? " tile-p--art" : ""}" style="--l:${longestWordOf(t.name)}">${art}
    <a class="ev-link" href="${e.url}"><span class="d num">${posterDate(e)}</span><span class="t">${esc(t.name)}</span><span class="ev-name">${esc(e.name)}</span></a>
    <span class="ev-spec">${esc(TYPE_LABEL[e.type] || e.type)} &middot; ${esc(when)}${o.distance != null ? ` &middot; ${Math.round(o.distance)} mi away` : ""}${dist ? `<br>${esc(dist)}` : ""}</span>
  </li>`;
}

function sourcesList(srcs) {
  if (!srcs || !srcs.length) return "";
  // Pass 22: folded (a rider's phone scrolled ~8,700px of links on the LA page). Crawled, one tap.
  return `<details class="dir-fold sources"><summary>Sources &middot; ${srcs.length} page${srcs.length === 1 ? "" : "s"} we read</summary><ul>${srcs.map((u) => `<li><a href="${attr(u)}" rel="noopener nofollow">${esc(domain(u))}</a> <span class="src-url">${esc(u)}</span></li>`).join("")}</ul></details>`;
}

// ——— event page ————————————————————————————————————————————————————————
function eventPage(e) {
  const t = e.townRef;
  const when = e.next_date ? fmtRange(e.next_date, e.end_date) : null;
  const title = `${e.name} — ${t.name}, ${t.state_code}: ${e.next_date ? fmtDate(e.next_date, { weekday: undefined }) : e.typical_timing || "dates"}, routes, sign-up`;
  const description = truncate(e.summary, 155);
  const crumbs = breadcrumb([{ name: "Events", url: "/events/" }, { name: t.state, url: `/events/state/${t.state_slug}/` }, { name: e.name, url: e.url }]);

  const ld = {
    "@context": "https://schema.org",
    "@type": ["Event", "SportsEvent"],
    name: e.name,
    alternateName: e.short_name && e.short_name !== e.name ? e.short_name : undefined,
    description: e.summary,
    sport: "Cycling",
    url: SITE + e.url,
    sameAs: e.website,
    startDate: e.next_date || undefined,
    endDate: e.end_date || e.next_date || undefined,
    eventStatus: e.status === "on-hold" ? "https://schema.org/EventPostponed" : e.status === "cancelled" ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: e.start_location || `${t.name}, ${t.state_code}`,
      address: { "@type": "PostalAddress", addressLocality: t.name, addressRegion: t.state_code, addressCountry: "US" },
      geo: { "@type": "GeoCoordinates", latitude: e.lat, longitude: e.lon },
    },
    organizer: e.organizer && e.organizer.name ? { "@type": "Organization", name: e.organizer.name, url: e.organizer.url || undefined } : undefined,
    offers: e.register_url ? { "@type": "Offer", url: e.register_url, availability: "https://schema.org/InStock", price: undefined, priceCurrency: "USD" } : undefined,
    image: SITE + "/og-cfc.png",
  };
  const faqLd = e.faq && e.faq.length ? {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: e.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } : null;
  const pageLd = {
    "@context": "https://schema.org", "@type": "WebPage",
    url: SITE + e.url, name: title, description,
    dateModified: e.verified || TODAY,
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".lede", ".facts"] },
    publisher: { "@type": "Organization", name: "Cycle for Change", url: SITE + "/" },
    author: { "@type": "Person", name: "Robert Castan" },
  };

  const nearby = events.filter((x) => x !== e).map((x) => ({ e: x, d: haversineMi(e, x) })).sort((a, b) => a.d - b.d).slice(0, 3);

  const art = townArt(t);
  const specLines = (e.distances && e.distances.length ? e.distances : []).slice(0, 4).map((d) => `<li><b>${esc(d.label)}</b>${d.note ? `<span>${esc(d.note)}</span>` : ""}</li>`).join("");
  const body = `
  ${crumbs.html}
  <section class="ev-poster${art ? " tile-p--art" : ""}" style="--l:${longestWordOf(t.name)}" aria-label="${attr(e.name)}, at a glance">${art}
    <div class="ev-poster-top">
      <span class="ev-poster-date num">${posterDate(e)}</span>
      <span class="ev-poster-town">${esc(t.name)}</span>
    </div>
    <div class="ev-poster-info">
      <p class="ev-poster-kind">${esc(TYPE_LABEL[e.type] || e.type)}${e.founded ? ` &middot; since ${e.founded}` : ""}</p>
      <p class="ev-poster-when">${when ? esc(when) : esc(e.date_note || e.typical_timing || "Next date to be announced")}${e.start_location ? ` <span>@ ${esc(e.start_location)}</span>` : ""}</p>
      ${specLines ? `<ul class="ev-poster-spec">${specLines}</ul>` : ""}
      ${e.elevation_gain_ft ? `<p class="ev-poster-climb">${Number(e.elevation_gain_ft).toLocaleString("en-US")} ft of climbing on the longest route</p>` : ""}
    </div>
  </section>
  <article class="event">
    <p class="eyebrow">${esc(TYPE_LABEL[e.type] || e.type)} &middot; <a href="${t.url}">${esc(t.name)}, ${esc(t.state)}</a>${e.founded ? ` &middot; since ${e.founded}` : ""}</p>
    <h1>${esc(e.name)}</h1>
    ${when ? `<p class="date-line"><time datetime="${e.next_date}">${esc(when)}</time><span class="countdown" data-countdown="${e.next_date}"></span></p>` : `<p class="date-line">${esc(e.date_note || e.typical_timing || "Next date to be announced")}</p>`}
    ${e.date_note && when ? `<p class="date-note">${esc(e.date_note)}</p>` : ""}
    ${e.status === "on-hold" ? `<p class="status-flag">On hold. Check the organizer before planning around this one.</p>` : e.status === "cancelled" ? `<p class="status-flag">Cancelled by the organizer.</p>` : ""}

    <h2 class="visually-hidden">What is the ${esc(e.name)}?</h2>
    <p class="lede">${esc(e.summary)}</p>

    <div class="ev-signup">
      ${e.register_url ? `<a class="btn btn--ink" href="${attr(e.register_url)}" rel="noopener">Sign up for ${esc(e.short_name || e.name)}</a>` : ""}
      <a class="btn btn--ghost" href="${attr(e.website)}" rel="noopener">Official site (${esc(domain(e.website))})</a>
      ${e.registration_note ? `<p class="ev-signup-note">${esc(e.registration_note)}</p>` : ""}
    </div>

    ${facts([
      ["Next edition", when ? `<time datetime="${e.next_date}">${esc(when)}</time>` : esc(e.typical_timing || "TBA")],
      ["Usually", e.typical_timing ? esc(e.typical_timing) : null],
      ["Start", `${e.start_location ? esc(e.start_location) + "<br>" : ""}<a href="${t.url}">${esc(t.name)}, ${esc(t.state)}</a>`],
      ["Distances", e.distances && e.distances.length ? `<ul class="dist">${e.distances.map((d) => `<li><b>${esc(d.label)}</b>${d.note ? ` — ${esc(d.note)}` : ""}</li>`).join("")}</ul>` : null],
      ["Terrain", e.terrain ? esc(e.terrain) : null],
      ["Climbing", e.elevation_gain_ft ? `${Number(e.elevation_gain_ft).toLocaleString("en-US")} ft on the longest route` : null],
      ["Riders", e.participants ? esc(e.participants) : null],
      ["Cost", e.cost ? esc(e.cost) : null],
      ["Founded", e.founded ? `${e.founded}${e.founded_by ? ` by ${esc(e.founded_by)}` : ""}` : null],
      ["Organizer", e.organizer && e.organizer.name ? (e.organizer.url ? `<a href="${attr(e.organizer.url)}" rel="noopener">${esc(e.organizer.name)}</a>` : esc(e.organizer.name)) : null],
    ])}

    ${e.history && e.history.length ? `<section><h2>How the ${esc(e.name)} started</h2>${paras(e.history)}</section>` : ""}
    ${e.what_to_expect && e.what_to_expect.length ? `<section><h2>What to expect on the day</h2>${paras(e.what_to_expect)}</section>` : ""}

    ${weatherBlock(t, { heading: `Weather in ${t.name} for the ${e.name}`, note: e.weather_note, date: e.next_date, endDate: e.end_date })}

    ${(() => { const tg = TOWNS.find({ city: t.name, state: t.state_code }); return tg ? TOWNS.strip(tg, { heading: tg.kind === "destination" ? "Ride, sleep, eat, fix the bike." : "Sleep, eat, fix the bike.", lede: t.getting_there ? esc(plain(t.getting_there, `towns/${t.id}.getting_there`)) : "" }) : ""; })()}
${(() => { const near = ridesNear(e); if (!near.length) return ""; return `
    <section class="local-rides" aria-labelledby="local-h">
      <h2 id="local-h">Group rides around ${esc(t.name)}</h2>
      <p class="mute">Free, recurring, open to anyone. Ride with locals the day before, or the week after.</p>
      <ul class="rows">
${near.map(({ r, d }) => `        <li><a href="/rides/${r.slug}/"><span class="row-name">${esc(r.name)}</span><span class="row-meta">${esc(r.city)}, ${esc(r.state)} &middot; ${esc(r.schedule || "")}${d >= 1 ? ` &middot; ${Math.round(d)} mi from the start` : ""}</span></a></li>`).join("\n")}
      </ul>
      <p class="town-more"><a href="/rides/${t.state_code.toLowerCase()}/">All group rides in ${esc(t.state)} &rarr;</a></p>
    </section>`; })()}

    ${e.faq && e.faq.length ? `<section class="faq"><h2>${esc(e.name)} FAQ</h2>${e.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</section>` : ""}

    ${sourcesList(e.sources)}
    <p class="verified">Facts checked ${esc(fmtDate(e.verified || TODAY, { weekday: undefined }))}. Dates and prices come from the organizer and change. Confirm on the official site before you book anything.</p>
${BLOCKS.REPORT({ thing: "event", name: e.name, kind: "changed", compact: true, id: "fix" })}
  </article>

  ${nearby.length ? `<section class="related"><h2>Nearby events</h2><ul class="tiles-p tiles-p--events">${nearby.map((n) => eventCard(n.e, { distance: n.d })).join("")}</ul></section>` : ""}
  <p class="back"><a href="/events/">All events</a> &middot; <a href="/events/state/${t.state_slug}/">Events in ${esc(t.state)}</a></p>
`;
  // Oct 6, 2026: an Event needs a startDate. With no published date the page carries no Event block
  // (the date is never guessed); the WebPage, breadcrumbs and FAQ still go out.
  const lds = [e.next_date ? ld : null, crumbs.ld, pageLd].concat(faqLd ? [faqLd] : []).filter(Boolean).map(stripUndef);
  const pledgeHtml = isRiding(e) ? CHROME.pledge({ line: "I&rsquo;m riding this one. Come with me.", copy: `${esc(e.short_name || e.name)} is one of the six rides on my 2027 calendar. Every mile of it counts toward the 10,000, and the money goes through the ride&rsquo;s own sign-up, never through me.` }) : CHROME.PLEDGE;
  return head({ title, description, url: e.url, ld: lds, ogType: "article" }) + body + foot(pledgeHtml);
}

function stripUndef(o) { return JSON.parse(JSON.stringify(o)); }

// ——— town page + resource pages ————————————————————————————————————————
// Which resource pages a town gets: the three legacy pages always (Sleep / Eat / Fix),
// the guide pages only when their data exists. Order on the town page follows the kind:
// a destination leads with the riding, an event host with the bed.
function guidePages(t) {
  const all = Object.values(RESOURCE);
  const has = (r) => r.always || (r.key === "bring_your_bike" ? !!(t.bring_your_bike && t.bring_your_bike.summary) : Array.isArray(t[r.key]) && t[r.key].length > 0);
  const order = t.kind === "destination" ? ["routes", "coffee", "bike-shops", "hotels", "restaurants", "culture", "bring-your-bike"] : ["hotels", "restaurants", "bike-shops", "routes", "coffee", "culture", "bring-your-bike"];
  return order.map((seg) => all.find((r) => r.seg === seg)).filter((r) => r && has(r));
}
const count = (t, r) => r.key === "bring_your_bike" ? null : (t[r.key] || []).length;

// Pass 22 (Oct 2, 2026): the group rides on a town page come from the directory, grouped by day, so the
// weekend is always there (a rider found no Saturday ride under "somebody's Saturday ride"). In each day:
// the rides the guide itself names first, then weekly rides, nearest first; then the rest.
const DAY_GROUPS = [["sat", "Saturday"], ["sun", "Sunday"], ["wk", "During the week"]];
const PER_DAY = 5;
function ridesByDay(t, radius = 30) {
  const named = t.rideRefs || new Set();
  const all = RIDES.map((r) => ({ r, d: haversineMi(t, { lat: r.lat, lon: r.lng }) })).filter((x) => x.d <= radius);
  const rank = (x) => [named.has(x.r.slug) ? 0 : 1, x.r.frequency === "weekly" ? 0 : x.r.frequency === "biweekly" ? 1 : 2, x.d];
  const cmp = (a, b) => { const A = rank(a), B = rank(b); for (let i = 0; i < A.length; i++) if (A[i] !== B[i]) return A[i] - B[i]; return 0; };
  const used = new Set();
  return DAY_GROUPS.map(([key, label]) => {
    const pick = all.filter((x) => key === "wk" ? (x.r.days || []).some((d) => !["sat", "sun"].includes(d)) && !used.has(x.r.slug) : (x.r.days || []).includes(key))
      .sort(cmp).slice(0, PER_DAY);
    if (key !== "wk") pick.forEach((x) => used.add(x.r.slug));
    return { key, label, rides: pick, total: all.filter((x) => key === "wk" ? (x.r.days || []).some((d) => !["sat", "sun"].includes(d)) : (x.r.days || []).includes(key)).length };
  }).filter((g) => g.rides.length);
}
const rideRow = ({ r, d }) => `        <li><a href="/rides/${r.slug}/"><span class="row-name">${esc(r.name)}</span><span class="row-meta">${esc(rideWhen(r) || r.schedule || "")}${r.place ? ` &middot; ${esc(r.place)}` : ""}${d >= 1 ? ` &middot; ${Math.round(d)} mi out` : ""}</span></a></li>`;
// "The ride: Nichols Canyon Ride (Sundays, 8:00 am) →" under a club, route or place that names one (`ride_slug`)
function rideLine(it, where, lead) {
  const slugs = entryRides(it);
  if (!slugs.length) return "";
  const rs = slugs.map((s) => rideLookup(s, where)).filter((r) => r.listed);
  if (!rs.length) return "";
  return `<p class="place-meta ride-line">${esc(lead || (rs.length === 1 ? "The ride" : "The rides"))}: ${rs.map((r) => `<a href="/rides/${r.slug}/">${esc(r.name)}</a>${rideWhen(r) ? ` <span class="ride-when">(${esc(rideWhen(r))})</span>` : ""}`).join("; ")} &rarr;</p>`;
}
// The house fold (Pass 15/21): crawled, one tap for a person.
const fold = (summary, html, cls = "") => `<details class="dir-fold town-fold${cls ? " " + cls : ""}"><summary>${summary}</summary><div class="town-fold-body">${html}</div></details>`;

function townPage(t) {
  const dest = t.kind === "destination";
  // Oct 4, 2026 (search pass): titles under 60 characters with the suffix, the query in the title and the h1
  const title = dest ? `Cycling in ${t.name}, ${t.state_code}: the guide` : `${t.name}, ${t.state_code} for cyclists`;
  const W = `towns/${t.id}`;
  const description = truncate(plain(t.summary, W), 155);
  const crumbs = breadcrumb([{ name: "Towns", url: "/towns/" }, { name: t.state, url: `/events/state/${t.state_slug}/` }, { name: t.name, url: t.url }]);
  const hub = hubFor(t);
  const days = ridesByDay(t, 30);
  const cal = calendarIn(t);
  const ld = stripUndef({
    "@context": "https://schema.org", "@type": "City",
    name: t.name, url: SITE + t.url, sameAs: t.official_url || undefined, description: plain(t.summary, W),
    address: { "@type": "PostalAddress", addressLocality: t.name, addressRegion: t.state_code, addressCountry: "US" },
    geo: { "@type": "GeoCoordinates", latitude: t.lat, longitude: t.lon },
    containedInPlace: { "@type": "State", name: t.state },
    // Oct 6, 2026: only events with a published date, each with its place (an Event needs both)
    event: t.events.some((e) => e.next_date) ? t.events.filter((e) => e.next_date).map((e) => ({ "@type": "SportsEvent", name: e.name, url: SITE + e.url, startDate: e.next_date, endDate: e.end_date || e.next_date,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: e.start_location || `${t.name}, ${t.state_code}`, address: { "@type": "PostalAddress", addressLocality: t.name, addressRegion: t.state_code, addressCountry: "US" } } })) : undefined,
  });
  const pageLd = {
    "@context": "https://schema.org", "@type": "WebPage", url: SITE + t.url, name: title, description,
    dateModified: t.verified || TODAY,
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".lede"] },
    publisher: { "@type": "Organization", name: "Cycle for Change", url: SITE + "/" },
    author: { "@type": "Person", name: "Robert Castan" },
  };
  const faqLd = t.faq && t.faq.length ? {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: t.faq.map((f) => ({ "@type": "Question", name: plain(f.q, W), acceptedAnswer: { "@type": "Answer", text: plain(f.a, W) } })),
  } : null;
  const pages = guidePages(t);
  // Pass 22: the card lines are counted from the data (scripts/towns.js) — no "bike-friendly" without a policy in writing.
  const CARD = {
    hotels: () => [`Stay`, `Hotels in ${t.name}`, TOWNS.hotelLine(t)],
    restaurants: (n) => [`Eat`, `Restaurants in ${t.name}`, `${n} places for the night before and after`],
    "bike-shops": () => [`Fix`, `Bike shops in ${t.name}`, TOWNS.shopLine(t)],
    routes: (n) => [`Ride`, `Rides in ${t.name}`, `${n} routes with a route page each`],
    coffee: () => [`Coffee`, `Coffee in ${t.name}`, TOWNS.coffeeLine(t)],
    culture: (n) => [`Off the bike`, `${t.name} off the bike`, `${n} places for the afternoon after`],
    "bring-your-bike": () => [`Bring the bike`, `Getting your bike to ${t.name}`, `Fly, ship or rent. Getting around. The rules.`],
  };
  const MARK_SEG = { routes: "road", coffee: "ride-day", "bike-shops": "fix", hotels: "sleep", restaurants: "eat", culture: "town", "bring-your-bike": "airport" };
  const ridesTotal = days.length ? new Set(days.flatMap((g) => g.rides.map((x) => x.r.slug))).size : 0;
  const explain = [
    t.about && t.about.length ? `<h3>About ${esc(t.name)}</h3>${t.about.map((p) => `<p>${rich(p, W + ".about")}</p>`).join("")}` : "",
    t.riding && t.riding.length ? `<h3>Riding in ${esc(t.name)}</h3>${t.riding.map((p) => `<p>${rich(p, W + ".riding")}</p>`).join("")}${t.routes && t.routes.length ? `<p class="town-more"><a href="${t.url}routes/">The ${t.routes.length} routes, with maps &rarr;</a></p>` : ""}` : "",
    t.getting_there ? `<h3>Getting to ${esc(t.name)}</h3><p>${rich(t.getting_there, W + ".getting_there")}</p>${t.bring_your_bike && t.bring_your_bike.summary ? `<p class="town-more"><a href="${t.url}bring-your-bike/">Bringing the bike: fly, ship or rent &rarr;</a></p>` : ""}` : "",
  ].filter(Boolean).join("\n");
  const body = `
  ${crumbs.html}
  <article class="town">
    <p class="eyebrow">${esc(t.county ? t.county + " · " : "")}${esc(t.state)}${t.elevation_ft ? ` · ${Number(t.elevation_ft).toLocaleString("en-US")} ft` : ""}</p>
    <h1>${dest ? `Cycling in ${esc(t.name)}` : `${esc(t.name)}, ${esc(t.state)}`}</h1>
    ${t.tagline ? `<p class="tagline">${esc(t.tagline)}</p>` : ""}

    <nav class="res-grid" aria-label="${dest ? "The guide" : "Travel resources"}">
      ${pages.map((r) => { const [k, b, s] = CARD[r.seg](count(t, r)); return `<a class="res-card" href="${t.url}${r.seg}/">${mark(MARK_SEG[r.seg], "mk mk--res")}<span class="res-k">${esc(k)}</span><b>${esc(b)}</b><span>${esc(s)}</span></a>`; }).join("\n      ")}
    </nav>

    <p class="lede">${rich(t.summary, W + ".summary")}</p>

    ${facts([
      ["Best months", t.best_months ? rich(t.best_months, W) : null],
      ["Nearest airport", t.nearest_airport && t.nearest_airport.name ? `${esc(t.nearest_airport.name)}${t.nearest_airport.code ? ` (${esc(t.nearest_airport.code)})` : ""}${t.nearest_airport.miles ? `, ${t.nearest_airport.miles} mi` : ""}` : null],
      ["Major airport", t.major_airport && t.major_airport.name && (!t.nearest_airport || t.major_airport.code !== t.nearest_airport.code) ? `${esc(t.major_airport.name)}${t.major_airport.code ? ` (${esc(t.major_airport.code)})` : ""}${t.major_airport.miles ? `, ${t.major_airport.miles} mi` : ""}` : null],
      ["Group rides", hub ? `<a href="${hub.path}">${hub.rides} weekly ride${hub.rides === 1 ? "" : "s"} listed</a>` : null],
    ])}${TOWN_PHOTO[t.id] ? `\n    ${PH.figure(TOWN_PHOTO[t.id])}` : ""}

    ${days.length ? `<section class="local-rides" aria-labelledby="local-h">
      <h2 id="local-h">Group rides around ${esc(t.name)}</h2>
      <p class="mute">Free, recurring, open to anyone. The fastest way into a town is somebody's Saturday ride.</p>
${days.map((g) => `      <h3 class="ride-day-h" id="rides-${g.key}">${esc(g.label)}${g.total > g.rides.length ? ` <span class="count">${g.rides.length} of ${g.total}</span>` : ""}</h3>
      <ul class="rows">
${g.rides.map(rideRow).join("\n")}
      </ul>`).join("\n")}
      <p class="town-more"><a href="${hub ? hub.path : `/rides/${t.state_code.toLowerCase()}/`}">${hub ? `All ${hub.rides} group rides in ${esc(t.name)}` : `All group rides in ${esc(t.state)}`} &rarr;</a></p>
    </section>` : ""}

    ${t.events.length || !cal.length ? `<section><h2>Bike events in ${esc(t.name)}</h2>
      ${t.events.length ? `<ul class="tiles-p tiles-p--events">${t.events.map((e) => eventCard(e)).join("")}</ul>` : `<p>No events with their own page here yet.</p>`}
    </section>` : ""}
    ${cal.length ? `<section class="local-rides" aria-labelledby="cal-h">
      <h2 id="cal-h">Organized rides in ${esc(t.name)} in 2027</h2>
      <p class="mute">From the 2027 calendar. Dates marked projected follow last year's weekend; check the organizer.</p>
      <ul class="rows">
${cal.map((e) => `        <li><a href="/events/2027/${e.start ? ["january","february","march","april","may","june","july","august","september","october","november","december"][+e.start.slice(5, 7) - 1] : "date-tba"}/#${attr(e.slug)}"><span class="row-name">${esc(e.name)}</span><span class="row-meta">${esc(e.end && e.end !== e.start ? fmtRange(e.start, e.end) : fmtDate(e.start, { weekday: undefined }))}${e.date_status === "projected" ? " (projected)" : ""} &middot; ${esc(e.category)}${e.cause ? ` &middot; ${esc(e.cause)}` : ""}</span></a></li>`).join("\n")}
      </ul>
      <p class="town-more"><a href="/events/2027/">The whole 2027 calendar &rarr;</a></p>
    </section>` : ""}

    ${t.clubs && t.clubs.length ? `<section aria-labelledby="clubs-h"><h2 id="clubs-h">Clubs and collectives in ${esc(t.name)}</h2>
      <ol class="places">${t.clubs.map((c, i) => `<li class="place">
        <h3>${c.url ? `<a href="${attr(c.url)}" rel="noopener">${esc(c.name)}</a>` : esc(c.name)}</h3>
        ${focusChips(c.inclusive_focus)}
        ${c.note ? `<p>${rich(c.note, `${W}.clubs[${i}].note`)}</p>` : ""}
        ${rideLine(c, `${W}.clubs[${i}]`, "In the directory")}
      </li>`).join("")}</ol>
    </section>` : ""}

    ${explain ? fold(`How ${esc(t.name)} rides: the zones, getting here`, explain, "town-about") : ""}
    ${weatherBlock(t)}
    ${t.faq && t.faq.length ? `<section class="faq"><h2>Questions about riding in ${esc(t.name)}</h2>${t.faq.map((f, i) => `<details><summary>${esc(plain(f.q, W))}</summary><p>${rich(f.a, `${W}.faq[${i}]`)}</p></details>`).join("")}</section>` : ""}
    ${moreFacts(t)}
    ${sourcesList(t.sources)}
    ${affiliateNote(t)}
    <p class="verified">Checked ${esc(fmtDate(t.verified || TODAY, { weekday: undefined }))}. Businesses open and close. Call before you count on anyone.</p>
${BLOCKS.REPORT({ thing: "place", name: t.name, kind: "changed", compact: true, id: "fix" })}
  </article>
  <p class="back"><a href="/towns/">All towns</a> &middot; <a href="/events/state/${t.state_slug}/">${esc(t.state)}</a></p>
`;
  return head({ title, description, url: t.url, ld: [ld, crumbs.ld, pageLd].concat(faqLd ? [faqLd] : []) }) + body + foot();
}
// the rest of the old fact box, folded at the foot (Pass 22: the top box keeps the four a visitor plans by)
function moreFacts(t) {
  const rows = [
    ["Population", t.population ? esc(t.population) : null],
    ["Time zone", esc(t.timezone.replace(/_/g, " "))],
    ["Official site", t.official_url ? `<a href="${attr(t.official_url)}" rel="noopener">${esc(domain(t.official_url))}</a>` : null],
    ["Visitor info", t.visitor_url ? `<a href="${attr(t.visitor_url)}" rel="noopener">${esc(domain(t.visitor_url))}</a>` : null],
  ];
  return fold(`${esc(t.name)}: the town`, facts(rows), "town-more-facts");
}

// Affiliate links (travel_links[].kind === "affiliate") get the disclosure printed by the
// build, once, on every page of the town that carries them. Nobody pays to be listed.
function hasAffiliate(t) { return (t.travel_links || []).some((l) => l.kind === "affiliate"); }
function affiliateNote(t) {
  return hasAffiliate(t) ? `<p class="verified">Some booking links on these pages pay Cycle for Change a small commission at no cost to you. That money goes to the orgs I ride for. It never decides who's listed.</p>` : "";
}
const affiliateUrls = (t) => new Set((t.travel_links || []).filter((l) => l.kind === "affiliate").map((l) => l.url));
const outLink = (t, url, text) => `<a href="${attr(url)}" rel="${affiliateUrls(t).has(url) ? "sponsored noopener" : "noopener"}">${text}</a>`;

const RESOURCE = {
  hotels: { key: "hotels", seg: "hotels", always: true, h: (t) => `Hotels in ${t.name} for cyclists`, title: (t) => `Hotels in ${t.name}, ${t.state_code} for cyclists`, type: "LodgingBusiness", verb: "stay", intro: (t) => `Places to stay in ${t.name} when you are in town to ride. Picked for being near the riding, easy with a bike, or cheap. Book early for event weekends. Rooms go first.` },
  restaurants: { key: "restaurants", seg: "restaurants", always: true, h: (t) => `Restaurants in ${t.name} for cyclists`, title: (t) => `Restaurants in ${t.name}, ${t.state_code} for cyclists`, type: "Restaurant", verb: "eat", intro: (t) => `Where to eat in ${t.name} the night before a ride and the afternoon after. Nothing fancy. Real food, real portions, places that are open when you need them.` },
  "bike-shops": { key: "bike_shops", seg: "bike-shops", always: true, h: (t) => `Bike shops in ${t.name}: repairs, parts, rentals`, title: (t) => `Bike shops in ${t.name}, ${t.state_code}: repair, rentals`, type: "BikeStore", verb: "fix", intro: (t) => `Bike shops in ${t.name} that do repairs. If something breaks in transit or the night before, start here. Call ahead on event weekends. Mechanics get slammed.` },
  coffee: { key: "coffee", seg: "coffee", h: (t) => `Coffee in ${t.name} for cyclists`, title: (t) => `Coffee in ${t.name}, ${t.state_code} for cyclists`, type: "CafeOrCoffeeShop", verb: "coffee", intro: (t) => `Where riders in ${t.name} start the day and finish the ride. Open early, near the routes, fine with a table of people in bibs. The ones marked ride-out sit at a group ride's start; the note says which ride and when.` },
  culture: { key: "culture", seg: "culture", h: (t) => `${t.name} off the bike: record stores, bookshops, bars`, title: (t) => `${t.name}, ${t.state_code} off the bike`, type: "LocalBusiness", verb: "off the bike", intro: (t) => `What to do in ${t.name} with the afternoon after the ride and the evening before it. A short list, not a city guide: the record store, the bookshop, the bar, the market.` },
  routes: { key: "routes", seg: "routes", h: (t) => `Bike routes in ${t.name}`, title: (t) => `Bike routes in ${t.name}, ${t.state_code}`, verb: "ride", intro: (t) => `The rides locals in ${t.name} actually do, each with a public route page you can load on your computer. Real miles, real feet, where it starts, where the water is, and the line about what will get you hurt.` },
  "bring-your-bike": { key: "bring_your_bike", seg: "bring-your-bike", h: (t) => `Should you bring your bike to ${t.name}?`, title: (t) => `Bringing your bike to ${t.name}, ${t.state_code}`, verb: "bring the bike", intro: (t) => `` },
};

const FOCUS_LABEL = { lgbtq: "LGBTQ+", "no-drop": "No-drop", beginner: "Beginner friendly", "women-trans-femme": "Women / trans / femme", bipoc: "BIPOC", family: "Family", gravel: "Gravel" };
const focusChips = (list) => list && list.length ? `<p class="place-tags">${list.map((s) => `<span><a href="/rides/${attr(s)}/">${esc(FOCUS_LABEL[s] || s)}</a></span>`).join("")}</p>` : "";
const CULTURE_LABEL = { "record-store": "Record store", bookstore: "Bookstore", gallery: "Gallery", museum: "Museum", bar: "Bar", "queer-owned": "Queer-owned", venue: "Venue", market: "Market", other: "" };
const CULTURE_TYPE = { "record-store": "MusicStore", bookstore: "BookStore", gallery: "ArtGallery", museum: "Museum", bar: "BarOrPub", venue: "EventVenue", market: "LocalBusiness", "queer-owned": "LocalBusiness", other: "LocalBusiness" };

function resourcePage(t, r) {
  const items = t[r.key] || [];
  const url = `${t.url}${r.seg}/`;
  const title = r.title(t);
  const description = truncate(`${r.intro(t)} ${items.length} listed.`, 155);
  const crumbs = breadcrumb([{ name: "Towns", url: "/towns/" }, { name: t.name, url: t.url }, { name: r.h(t), url }]);
  const ld = stripUndef({
    "@context": "https://schema.org", "@type": "ItemList", name: r.h(t), url: SITE + url, numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1,
      item: {
        "@type": r.key === "culture" ? (CULTURE_TYPE[it.kind] || "LocalBusiness") : r.type, name: it.name, url: it.url || undefined, telephone: it.phone || undefined,
        address: it.address ? { "@type": "PostalAddress", streetAddress: it.address, addressLocality: t.name, addressRegion: t.state_code, addressCountry: "US" } : undefined,
        servesCuisine: it.cuisine || undefined, priceRange: it.price_hint || undefined,
      },
    })),
  });
  const meta = (it) => [
    r.key === "culture" ? CULTURE_LABEL[it.kind] : null,
    it.cuisine, it.price_hint, it.address, it.hours_hint,
  ].filter(Boolean).map(esc).concat(it.phone ? [telLink(it.phone)] : []).join(" &middot; ");
  const tags = (it) => {
    const list = [];
    if (it.services && it.services.length) list.push(...it.services);
    if (it.ride_out) list.push("ride-out");
    return list.length ? `<p class="place-tags">${list.map((s) => `<span>${esc(s)}</span>`).join("")}</p>` : "";
  };
  const extra = (it, i) => [
    r.key === "hotels" ? `<p class="bike-policy${TOWNS.hasBikePolicy(it) ? " bike-policy--yes" : ""}"><b>Bike:</b> ${it.bike_policy ? rich(it.bike_policy, `towns/${t.id}.hotels[${i}].bike_policy`) : "No stated policy — ask when you book"}</p>` : (it.bike_policy ? `<p><b>Bike:</b> ${rich(it.bike_policy)}</p>` : ""),
    rideLine(it, `towns/${t.id}.${r.key}[${i}]`, r.key === "coffee" ? "The ride from here" : "Nearby ride"),
    it.booking_url ? `<p class="place-meta">${outLink(t, it.booking_url, "Book")} &middot; ${it.url ? `<a href="${attr(it.url)}" rel="noopener">${esc(domain(it.url))}</a>` : ""}</p>` : "",
  ].join("");
  const body = `
  ${crumbs.html}
  <article class="resource">
    <p class="eyebrow"><a href="${t.url}">${esc(t.name)}, ${esc(t.state)}</a> &middot; ${esc(r.verb)}</p>
    <h1>${esc(r.h(t))}</h1>
    <p class="lede">${esc(r.intro(t))}</p>
    ${t.events.length ? `<p class="for-events">For: ${t.events.map((e) => `<a href="${e.url}">${esc(e.name)}</a>`).join(", ")}.</p>` : ""}
    <h2 class="visually-hidden">${esc(r.h(t))}, listed</h2>
    ${r.key === "hotels" && items.length ? `<p class="for-events">${esc(TOWNS.hotelLine(t))}. A hotel's bike rule counts here only when it's on the hotel's own page.</p>` : ""}
    ${items.length ? `<ol class="places">${items.map((it, i) => `<li class="place">
        <h3>${it.url ? `<a href="${attr(it.url)}" rel="noopener">${esc(it.name)}</a>` : esc(it.name)}</h3>
        <p class="place-meta">${meta(it)}</p>
        ${tags(it)}
        ${it.note ? `<p>${rich(it.note, `towns/${t.id}.${r.key}[${i}].note`)}</p>` : ""}
        ${extra(it, i)}
      </li>`).join("")}</ol>` : `<p>Nothing listed yet for ${esc(t.name)}. Check the <a href="${attr(t.visitor_url || t.official_url || "#")}" rel="noopener">local visitor site</a>.</p>`}
    ${resourceNav(t, r)}
    ${affiliateNote(t)}
    <p class="verified">Checked ${esc(fmtDate(t.verified || TODAY, { weekday: undefined }))}. No paid placements. Businesses open and close; call before you count on anyone.</p>
${BLOCKS.REPORT({ thing: "place", name: `${r.h(t)}`, kind: "changed", compact: true, id: "fix" })}
  </article>
  <p class="back"><a href="${t.url}">Back to ${esc(t.name)}</a></p>
`;
  return head({ title, description, url, ld: [ld, crumbs.ld] }) + body + foot();
}

function resourceNav(t, r) {
  return `<nav class="res-links-row" aria-label="Other resources">
      ${guidePages(t).filter((x) => x.seg !== r.seg).map((x) => `<a href="${t.url}${x.seg}/">${esc(x.h(t))}</a>`).join("")}
    </nav>`;
}

// ——— routes page ——————————————————————————————————————————————————————————
const ROUTE_LABEL = { road: "Road", gravel: "Gravel", mtb: "Mountain bike", path: "Path", climb: "Climb" };
const LINK_LABEL = { rwgps: "RideWithGPS", strava: "Strava", komoot: "Komoot", gpx: "GPX", other: "Route page" };
function routesPage(t) {
  const r = RESOURCE.routes;
  const items = t.routes || [];
  const url = `${t.url}routes/`;
  const title = r.title(t);
  const description = truncate(`${items.length} bike routes in ${t.name}: ${items.map((x) => x.name).join(", ")}. Miles, climbing, where each starts, water, hazards, and a map link for every one.`, 155);
  const crumbs = breadcrumb([{ name: "Towns", url: "/towns/" }, { name: t.name, url: t.url }, { name: r.h(t), url }]);
  const firstLink = (x) => x.links ? Object.keys(LINK_LABEL).map((k) => x.links[k]).find(Boolean) : null;
  const ld = stripUndef({
    "@context": "https://schema.org", "@type": "ItemList", name: r.h(t), url: SITE + url, numberOfItems: items.length,
    itemListElement: items.map((x, i) => ({
      "@type": "ListItem", position: i + 1,
      item: {
        "@type": "Trip", name: x.name, description: x.description ? plain(x.description, `towns/${t.id}.routes`) : undefined, url: firstLink(x) || undefined,
        itinerary: x.start && x.start.lat != null ? { "@type": "Place", name: x.start.name || undefined, address: x.start.address || undefined, geo: { "@type": "GeoCoordinates", latitude: x.start.lat, longitude: x.start.lon } } : undefined,
      },
    })),
  });
  const num = (n) => Number(n).toLocaleString("en-US");
  const body = `
  ${crumbs.html}
  <article class="resource routes">
    <p class="eyebrow"><a href="${t.url}">${esc(t.name)}, ${esc(t.state)}</a> &middot; ride</p>
    <h1>${esc(r.h(t))}</h1>
    <p class="lede">${esc(r.intro(t))}</p>
    ${t.best_months ? `<p class="for-events">Best months: ${esc(t.best_months)}</p>` : ""}
    <h2 class="visually-hidden">Bike routes in ${esc(t.name)}, listed</h2>
    ${items.length ? `<ol class="places">${items.map((x) => `<li class="place">
        <h3>${esc(x.name)}</h3>
        <p class="place-meta">${[ROUTE_LABEL[x.type], x.miles != null ? `${num(x.miles)} mi` : null, x.elevation_gain_ft != null ? `${num(x.elevation_gain_ft)} ft` : null, x.difficulty, x.surface].filter(Boolean).map(esc).join(" &middot; ")}</p>
        ${x.links ? `<p class="place-tags">${Object.keys(LINK_LABEL).filter((k) => x.links[k]).map((k) => `<span><a href="${attr(x.links[k])}" rel="noopener">${LINK_LABEL[k]}</a></span>`).join("")}</p>` : ""}
        ${x.description ? `<p>${rich(x.description, `towns/${t.id}.routes.description`)}</p>` : ""}
        ${x.start && (x.start.name || x.start.address) ? `<p><b>Start:</b> ${esc([x.start.name, x.start.address].filter(Boolean).join(", "))}</p>` : ""}
        ${x.water ? `<p><b>Water:</b> ${rich(x.water)}</p>` : ""}
        ${x.hazards ? `<p><b>Watch:</b> ${rich(x.hazards)}</p>` : ""}
        ${rideLine(x, `towns/${t.id}.routes`, "Ride it with the group")}
      </li>`).join("")}</ol>` : `<p>No routes listed yet for ${esc(t.name)}.</p>`}
    ${resourceNav(t, r)}
    <p class="verified">Checked ${esc(fmtDate(t.verified || TODAY, { weekday: undefined }))}. Roads close, trails wash out, and the numbers are the route page's. Ride your own ride.</p>
${BLOCKS.REPORT({ thing: "place", name: `Routes in ${t.name}`, kind: "changed", compact: true, id: "fix" })}
  </article>
  <p class="back"><a href="${t.url}">Back to ${esc(t.name)}</a></p>
`;
  return head({ title, description, url, ld: [ld, crumbs.ld] }) + body + foot();
}

// ——— bring-your-bike page ————————————————————————————————————————————————
function bringYourBikePage(t) {
  const r = RESOURCE["bring-your-bike"];
  const b = t.bring_your_bike;
  const url = `${t.url}bring-your-bike/`;
  const title = r.title(t);
  const description = truncate(plain(b.summary), 155);
  const crumbs = breadcrumb([{ name: "Towns", url: "/towns/" }, { name: t.name, url: t.url }, { name: r.h(t), url }]);
  const pageLd = {
    "@context": "https://schema.org", "@type": "WebPage", url: SITE + url, name: title, description,
    dateModified: t.verified || TODAY,
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".lede"] },
    publisher: { "@type": "Organization", name: "Cycle for Change", url: SITE + "/" },
    author: { "@type": "Person", name: "Robert Castan" },
  };
  const shopList = (list) => list && list.length ? `<ol class="places">${list.map((s) => `<li class="place"><h3>${s.url ? `<a href="${attr(s.url)}" rel="noopener">${esc(s.name)}</a>` : esc(s.name)}</h3>${s.phone ? `<p class="place-meta">${telLink(s.phone)}</p>` : ""}${s.note ? `<p>${rich(s.note)}</p>` : ""}</li>`).join("")}</ol>` : "";
  const fly = b.fly || {}, ship = b.ship || {}, rent = b.rent || {}, go = b.get_around || {};
  const body = `
  ${crumbs.html}
  <article class="resource byb">
    <p class="eyebrow"><a href="${t.url}">${esc(t.name)}, ${esc(t.state)}</a> &middot; bring the bike</p>
    <h1>${esc(r.h(t))}</h1>
    <p class="lede">${rich(b.summary)}</p>
    ${PH.figure("hood-from-air")}

    ${fly.airports && fly.airports.length ? `<section><h2>Flying to ${esc(t.name)} with a bike</h2>
      ${facts(fly.airports.map((a) => [`${a.name}${a.code ? ` (${a.code})` : ""}`, `${a.miles != null ? `${esc(a.miles)} mi` : ""}${a.note ? `${a.miles != null ? " &middot; " : ""}${rich(a.note)}` : ""}`]))}
      ${fly.airline_note ? `<p>${rich(fly.airline_note)}</p>` : ""}
    </section>` : ""}

    ${ship.note || (ship.shops && ship.shops.length) ? `<section><h2>Shipping your bike to ${esc(t.name)}</h2>
      ${ship.note ? `<p>${rich(ship.note)}</p>` : ""}
      ${shopList(ship.shops)}
    </section>` : ""}

    ${rent.note || (rent.shops && rent.shops.length) ? `<section><h2>Renting a bike in ${esc(t.name)}</h2>
      ${rent.note ? `<p>${rich(rent.note)}</p>` : ""}
      ${shopList(rent.shops)}
    </section>` : ""}

    ${go.note || go.transit_bike_rules || (go.bike_share && go.bike_share.name) ? `<section><h2>Getting around ${esc(t.name)} with a bike</h2>
      ${go.car_needed != null ? `<p><b>${go.car_needed ? "You'll want a car." : "You can skip the car."}</b> ${rich(go.note || "")}</p>` : go.note ? `<p>${rich(go.note)}</p>` : ""}
      ${go.transit_bike_rules ? `<p><b>Transit:</b> ${rich(go.transit_bike_rules)}</p>` : ""}
      ${go.bike_share && go.bike_share.name ? `<p><b>Bike share:</b> ${go.bike_share.url ? `<a href="${attr(go.bike_share.url)}" rel="noopener">${esc(go.bike_share.name)}</a>` : esc(go.bike_share.name)}${go.bike_share.note ? `. ${rich(go.bike_share.note)}` : ""}</p>` : ""}
    </section>` : ""}

    ${b.rules_and_safety ? `<section><h2>The rules on the road in ${esc(t.state)}</h2><p>${rich(b.rules_and_safety)}</p></section>` : ""}
    ${(t.bike_shops || []).length ? `<p class="town-more"><a href="${t.url}bike-shops/">Every bike shop in ${esc(t.name)} &rarr;</a></p>` : ""}
    ${sourcesList(b.sources)}
    ${resourceNav(t, r)}
    <p class="verified">Checked ${esc(fmtDate(t.verified || TODAY, { weekday: undefined }))}. Airline fees and transit rules change without telling anyone. The date next to each one is the day we read it.</p>
${BLOCKS.REPORT({ thing: "place", name: `Bringing a bike to ${t.name}`, kind: "changed", compact: true, id: "fix" })}
  </article>
  <p class="back"><a href="${t.url}">Back to ${esc(t.name)}</a></p>
`;
  return head({ title, description, url, ld: [pageLd, crumbs.ld] }) + body + foot();
}

// ——— indexes ————————————————————————————————————————————————————————————
function eventsIndex() {
  const url = "/events/";
  const title = "US cycling events directory — dates, routes, sign-up, weather, where to stay";
  const description = `Every bike event we have checked, state by state: ${events.length} rides in ${stateList.length} states. Dates, distances, how each one started, the sign-up link, live weather, and a page for the town.`;
  const upcoming = events.filter((e) => e.next_date && e.next_date >= TODAY).slice(0, 12);
  const ld = {
    "@context": "https://schema.org", "@type": "ItemList", name: "US cycling events", url: SITE + url, numberOfItems: events.length,
    itemListElement: events.map((e, i) => ({ "@type": "ListItem", position: i + 1, url: SITE + e.url, name: e.name })),
  };
  const body = `
  <article class="index">
    <p class="eyebrow">${events.length} events &middot; ${stateList.length} states &middot; updated ${esc(fmtDate(TODAY, { weekday: undefined }))}</p>
    <h1>US cycling events directory</h1>
    <p class="lede">The big rides, one page each: the date, the sign-up, the weather, and where to sleep and eat. <a href="/events/2027/">Everything else is on the 2027 calendar.</a></p>

    <section><h2>Coming up</h2>
      ${upcoming.length ? `<ul class="tiles-p tiles-p--events">${upcoming.map((e) => eventCard(e)).join("")}</ul>` : `<p>Dates for the next editions are still being announced. Browse by state below.</p>`}
    </section>
    ${PH.figure("pv-morning-road", { cls: "ph--wide" })}

    <section class="by-state"><h2>Cycling events by state</h2>
      ${stateList.map((s) => `<h3 id="${s.slug}"><a href="/events/state/${s.slug}/">${esc(s.name)}</a> <span class="count">${s.events.length}</span></h3>
      <ul class="rows">${s.events.map((e) => `<li><span class="row-date">${e.next_date ? `<time datetime="${e.next_date}">${esc(fmtDate(e.next_date, { weekday: "short", month: "short" }))}</time>` : esc(e.typical_timing || "TBA")}</span><a href="${e.url}">${esc(e.name)}</a><span class="row-meta">${esc(e.townRef.name)} &middot; ${esc(TYPE_LABEL[e.type] || e.type)}</span></li>`).join("")}</ul>`).join("")}
    </section>

${BLOCKS.BUILT([
      ["Checked", "At the organizer", "Each event page is checked against the organizer's own site and lists its sources."],
      ["Direct", "Sign-up goes to them", "Dates and prices change, so the sign-up link always goes to the organizer, never through us."],
      ["Live", "Weather for the town", "Every event page carries a live forecast for the host town."],
      ["Free", "No paid placement", "Nobody pays to be listed. Town pages list only places we could confirm are open."],
    ], { heading: "How this directory works", fold: true })}
${BLOCKS.REPORT({ thing: "event", compact: true })}
  </article>
`;
  return head({ title, description, url, ld: [ld] }) + body + foot();
}

function statePage(s) {
  const url = `/events/state/${s.slug}/`;
  const title = `Cycling events in ${s.name} — bike rides, races and tours with dates and sign-up`;
  const description = truncate(`${s.events.length} cycling events in ${s.name}: ${s.events.map((e) => e.name).join(", ")}. Dates, distances, sign-up links, weather and town guides.`, 155);
  const crumbs = breadcrumb([{ name: "Events", url: "/events/" }, { name: s.name, url }]);
  const ld = { "@context": "https://schema.org", "@type": "ItemList", name: `Cycling events in ${s.name}`, url: SITE + url, numberOfItems: s.events.length, itemListElement: s.events.map((e, i) => ({ "@type": "ListItem", position: i + 1, url: SITE + e.url, name: e.name })) };
  const body = `
  ${crumbs.html}
  <article class="index">
    <p class="eyebrow">${s.events.length} events &middot; ${s.towns.length} towns</p>
    <h1>Cycling events in ${esc(s.name)}</h1>
    <p class="lede">${esc(s.events.length)} bike events in ${esc(s.name)} with a page each: ${esc(s.events.map((e) => e.name).join(", "))}. Every page has the date, the routes, the sign-up link, live weather and a guide to the host town.</p>
    <section><h2>Bike events in ${esc(s.name)}</h2><ul class="tiles-p tiles-p--events">${s.events.map((e) => eventCard(e)).join("")}</ul></section>
    <section><h2>Towns in ${esc(s.name)} that host rides</h2><ul class="rows">${s.towns.map((t) => `<li><a href="${t.url}">${esc(t.name)}</a><span class="row-meta">${t.events.length} event${t.events.length === 1 ? "" : "s"}</span></li>`).join("")}</ul></section>
  </article>
  <p class="back"><a href="/events/">All events</a></p>
`;
  return head({ title, description, url, ld: [ld, crumbs.ld] }) + body + foot();
}

function townsIndex() {
  const url = "/towns/";
  const title = "Town guides for cyclists — rides, bike shops, coffee, where to stay, bringing your bike";
  const description = `Town guides for ${towns.length} places: where to ride, where the ride-out coffee is, who fixes or rents a bike, where to sleep with it, and how to get the bike there. Live weather on every page.`;
  // Pass 6 (Sept 29, 2026): every town is a poster tile — the name fills the tile, the count sits
  // at the foot, the town's contour (tools/contour-art.js → cfc-site/towns/art/<slug>.svg) behind it
  // once it has been drawn. Same tile family as /rides/ (styles in events.css).
  // Sept 30, 2026: a destination town counts its routes instead of its events and shows its tagline.
  const artDir = path.join(OUT, "towns", "art");
  const longestWord = (name) => Math.max(...String(name).split(/[\s-]+/).map((w) => w.length), 4);
  const townTile = (t) => {
    const slug = t.url.split("/").filter(Boolean).pop();
    const art = fs.existsSync(path.join(artDir, `${slug}.svg`)) ? `<img class="tile-art" src="/towns/art/${slug}.svg" alt="" loading="lazy" decoding="async" width="200" height="200">` : "";
    const dest = t.kind === "destination" || (!t.events.length && t.routes && t.routes.length);
    const n = dest ? (t.routes || []).length : t.events.length;
    const small = dest ? `route${n === 1 ? "" : "s"}` : `event${n === 1 ? "" : "s"}`;
    const blurb = dest ? (t.tagline || "") : t.events.map((e) => e.name).join(", ");
    return `<a class="tile-p${art ? " tile-p--art" : ""}" href="${t.url}" style="--l:${longestWord(t.name)}">${art}<span class="t">${esc(t.name)}</span><span class="b">${esc(blurb)}</span><span class="c"><b class="n num">${n}</b><span class="s">${small}<br>${esc(t.state_code)}</span></span></a>`;
  };
  const sorted = [...towns].sort((a, b) => a.state.localeCompare(b.state) || a.name.localeCompare(b.name));
  const destinations = towns.filter((t) => t.kind === "destination").length;
  // Pass 22: a traveller finds a town fast — the full guides first, then by state, then a plain A–Z list
  const guides = sorted.filter((t) => t.kind === "destination");
  const az = [...towns].sort((a, b) => a.name.localeCompare(b.name));
  // Oct 3, 2026 — Robert: "a better USA map showing a way to click on them." The map is the first pick:
  // every town on it is a link (scripts/towns-map.js); on a phone it zooms by region (/rides/map.js).
  const map = townsMap(towns);
  const body = `
  <article class="index">
    <p class="eyebrow">${towns.length} towns &middot; ${stateList.length} states${destinations ? ` &middot; ${destinations} full guide${destinations === 1 ? "" : "s"}` : ""}</p>
    <h1>Town guides for cyclists</h1>
    <p class="lede">Where to ride, sleep, eat and get the bike fixed in every town we list.</p>
    <nav class="towns-jump" aria-label="Find a town">${map ? `<a href="#map">On the map</a>` : ""}${guides.length ? `<a href="#guides">Full guides</a>` : ""}<a href="#by-state">By state</a><a href="#az">A to Z</a></nav>
    ${map ? `<section class="tw-map" aria-labelledby="map"><h2 id="map">Where are you going? Tap a town</h2>${map}
    </section>` : ""}
    ${guides.length ? `<section aria-labelledby="guides"><h2 id="guides">The full guides</h2>
      <p class="mute">Routes, the ride-out coffee, who fixes or rents a bike, where to sleep with it, how to get it there.</p>
      <div class="tiles-p tiles-p--towns">
        ${guides.map(townTile).join("\n        ")}
      </div>
    </section>` : ""}
    ${PH.figure("stanley-dock")}
    <section class="by-state" aria-labelledby="by-state"><h2 id="by-state">Every town, by state</h2>
      <div class="tiles-p tiles-p--towns">
        ${sorted.map(townTile).join("\n        ")}
      </div>
    </section>
    <section aria-labelledby="az"><h2 id="az">Every town, A to Z</h2>
      <ul class="towns-az">
        ${az.map((t) => `<li><a href="${t.url}"><span>${esc(t.name)}, ${esc(t.state_code)}</span><span class="row-meta">${t.kind === "destination" ? "full guide" : esc(t.events.map((e) => e.short_name || e.name).join(", ")) || "town"}</span></a></li>`).join("\n        ")}
      </ul>
      <p class="town-more">${stateList.map((s) => `<a href="/events/state/${s.slug}/">${esc(s.name)}</a>`).join(" &middot; ")}</p>
    </section>
${BLOCKS.REPORT({ thing: "place", compact: true })}
  </article>
${map ? `<script src="/rides/map.js" defer></script>` : ""}
`;
  return head({ title, description, url, ld: [] }) + body + foot();
}

// ——— build ————————————————————————————————————————————————————————————————
// Clear stale output first. Everything under events/ and towns/ is generated
// except events.css, events.js and 2027/ (the calendar, owned by
// scripts/build-calendar.js, holds hand-written calendar.css and calendar.js).
const KEEP = new Set(["events.css", "events.js", "report.js", "2027"]);
const evDir = path.join(OUT, "events");
if (fs.existsSync(evDir)) for (const f of fs.readdirSync(evDir)) if (!KEEP.has(f)) fs.rmSync(path.join(evDir, f), { recursive: true, force: true });
// towns/art/ is drawn by tools/contour-art.js and survives the rebuild
const townsDir = path.join(OUT, "towns");
if (fs.existsSync(townsDir)) for (const f of fs.readdirSync(townsDir)) if (f !== "art") fs.rmSync(path.join(townsDir, f), { recursive: true, force: true });

const written = [];
written.push(write("events/index.html", eventsIndex()));
written.push(write("towns/index.html", townsIndex()));
for (const s of stateList) written.push(write(`events/state/${s.slug}/index.html`, statePage(s)));
for (const e of events) written.push(write(`events/${e.slug}/index.html`, eventPage(e)));
for (const t of towns) {
  written.push(write(`${t.url.slice(1)}index.html`, townPage(t)));
  for (const r of guidePages(t)) {
    const html = r.seg === "routes" ? routesPage(t) : r.seg === "bring-your-bike" ? bringYourBikePage(t) : resourcePage(t, r);
    written.push(write(`${t.url.slice(1)}${r.seg}/index.html`, html));
  }
}

// machine-readable feed
write("events/events.json", JSON.stringify({
  generated: TODAY, source: SITE + "/events/",
  events: events.map((e) => ({ name: e.name, url: SITE + e.url, type: e.type, town: e.townRef.name, state: e.townRef.state_code, next_date: e.next_date, end_date: e.end_date, distances: (e.distances || []).map((d) => d.label), website: e.website, register_url: e.register_url, lat: e.lat, lon: e.lon })),
}, null, 2));

// sitemap
const urls = written.map((rel) => "/" + rel.replace(/index\.html$/, ""));
write("sitemap-events.xml", `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/build-events.js. Listed in the sitemap index at /sitemap.xml. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${TODAY}</lastmod><changefreq>${u === "/events/" ? "weekly" : "monthly"}</changefreq><priority>${u.split("/").length <= 3 ? "0.8" : "0.6"}</priority></url>`).join("\n")}
</urlset>
`);

console.log(`Built ${written.length} pages: ${events.length} events, ${towns.length} towns, ${stateList.length} states.`);
