/* Cycle for Change — the town layer, shared by the three generators.
   Sept 30, 2026 (Robert: "this needs to be everywhere we post races, fundraising
   rides and group rides").

   Every event page (scripts/build-events.js), every row of the 2027 calendar
   (scripts/build-calendar.js) and every group-ride page (tools/build-rides.js)
   asks this module one question: is there a town guide for where this happens?
   If there is, the page gets the strip — the guide's pages, in the order that
   matters for a visitor — and a link to the guide. If there isn't, nothing.

   Reads data/towns/*.json directly (not the built pages), so the three builds can
   run in any order.

     const TOWNS = require("./towns.js");
     const t = TOWNS.find({ city: "Redondo Beach", state: "CA", lat, lng });
     if (t) html += TOWNS.strip(t, { heading: "Once you're in Los Angeles" });

   Matching, in order: the town's own name + state · a name in the town's `covers[]`
   (the cities a big guide speaks for: Santa Monica → Los Angeles) · the nearest
   full guide (`kind: "destination"`) within RADIUS miles, when lat/lng are given.
   An event-host town (Emporia, Leadville) only matches by name, so a ride 20 miles
   from Emporia doesn't get told to sleep there. */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "data", "towns");
const RADIUS = 25; // miles — same as the rides directory's metro radius

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const norm = (s) => String(s || "").toLowerCase().replace(/\s*\(.*?\)\s*/g, " ").replace(/\s+/g, " ").trim();
function miles(a, b) {
  const R = 3958.8, toR = (x) => (x * Math.PI) / 180;
  const dLat = toR(b.lat - a.lat), dLon = toR(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// The guide pages a town has, in visitor order. Mirrors guidePages() in build-events.js.
// Pass 8 marks (cfc-site/rides/marks.svg) on each card, like the event page's strip.
const mark = (id) => `<svg class="mk mk--strip" aria-hidden="true" focusable="false"><use href="/rides/marks.svg#m-${id}"/></svg>`;
const PAGES = [
  { seg: "routes", key: "routes", mark: "road", k: "Ride", b: (t) => `Rides in ${t.name}`, s: (n) => `${n} route${n === 1 ? "" : "s"} with maps` },
  { seg: "coffee", key: "coffee", mark: "ride-day", k: "Coffee", b: (t) => `Coffee in ${t.name}`, s: (n) => `${n} place${n === 1 ? "" : "s"} riders roll out from` },
  { seg: "bike-shops", key: "bike_shops", mark: "fix", k: "Fix", b: (t) => `Bike shops in ${t.name}`, s: (n) => n ? `${n} shop${n === 1 ? "" : "s"}: repairs, rentals` : "Open the day before", always: true },
  { seg: "hotels", key: "hotels", mark: "sleep", k: "Sleep", b: (t) => `Hotels in ${t.name}`, s: (n) => n ? `${n} pick${n === 1 ? "" : "s"}, bike-friendly first` : "Hotels near the start", always: true },
  { seg: "restaurants", key: "restaurants", mark: "eat", k: "Eat", b: (t) => `Restaurants in ${t.name}`, s: (n) => n ? `${n} pick${n === 1 ? "" : "s"}, night before and after` : "Carb night, post-ride, early coffee", always: true },
  { seg: "culture", key: "culture", mark: "town", k: "Off the bike", b: (t) => `${t.name} off the bike`, s: (n) => `${n} place${n === 1 ? "" : "s"} for the afternoon after` },
  { seg: "bring-your-bike", key: "bring_your_bike", mark: "airport", k: "Bring the bike", b: (t) => `Getting your bike to ${t.name}`, s: () => "Fly, ship or rent. The rules." },
];

let cache = null;
function load() {
  if (cache) return cache;
  cache = [];
  if (!fs.existsSync(DIR)) return cache;
  for (const f of fs.readdirSync(DIR)) {
    if (!f.endsWith(".json") || f.startsWith("_")) continue;
    let t;
    try { t = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")); } catch { continue; }
    if (!t.name || !t.state || !t.state_code) continue;
    t.kind = t.kind || "event-host";
    t.state_slug = slugify(t.state);
    t.slug = slugify(t.name);
    t.url = `/towns/${t.state_slug}/${t.slug}/`;
    t.covers_norm = new Set((t.covers || []).map(norm));
    t.pages = PAGES.filter((p) => p.always || (p.key === "bring_your_bike" ? !!(t.bring_your_bike && t.bring_your_bike.summary) : Array.isArray(t[p.key]) && t[p.key].length > 0));
    if (t.kind !== "destination") { // an event host leads with the bed; a destination with the riding
      const order = ["hotels", "restaurants", "bike-shops", "routes", "coffee", "culture", "bring-your-bike"];
      t.pages.sort((a, b) => order.indexOf(a.seg) - order.indexOf(b.seg));
    }
    cache.push(t);
  }
  return cache;
}

/* { city, state, lat, lng|lon } → town or null */
function find({ city, state, lat, lng, lon } = {}) {
  const towns = load();
  const st = String(state || "").toUpperCase();
  const c = norm(city);
  if (c && st) {
    const exact = towns.find((t) => t.state_code === st && norm(t.name) === c);
    if (exact) return exact;
    const covered = towns.find((t) => t.state_code === st && t.covers_norm.has(c));
    if (covered) return covered;
  }
  const y = lat, x = lng != null ? lng : lon;
  if (typeof y === "number" && typeof x === "number") {
    let best = null, d0 = RADIUS;
    for (const t of towns) {
      if (t.kind !== "destination") continue;
      const d = miles({ lat: y, lon: x }, { lat: t.lat, lon: t.lon });
      if (d <= d0) { best = t; d0 = d; }
    }
    if (best) return best;
  }
  return null;
}

/* The strip. opts.heading overrides "Once you're in <town>"; opts.lede adds a line under it;
   opts.compact drops the town's summary (calendar rows, ride pages). Styles: .town-box / .town-strip
   in /events/events.css, which every directory loads. */
function strip(t, opts = {}) {
  const heading = opts.heading || `Once you&rsquo;re in ${esc(t.name)}`;
  const cards = t.pages.map((p) => {
    const n = p.key === "bring_your_bike" ? null : (t[p.key] || []).length;
    return `        <a href="${t.url}${p.seg}/">${mark(p.mark)}<span class="eyebrow">${esc(p.k)}</span><b>${esc(p.b(t))}</b><span>${esc(p.s(n))}</span></a>`;
  }).join("\n");
  return `
    <section class="town-box" aria-labelledby="town-h">
      <p class="eyebrow">${t.kind === "destination" ? "The town guide" : "The town"}</p>
      <h2 id="town-h">${heading}</h2>
      ${opts.compact ? "" : `<p>${esc(t.summary)}</p>`}
      ${opts.lede ? `<p>${opts.lede}</p>` : ""}
      <div class="town-strip">
${cards}
      </div>
      <p class="town-more"><a href="${t.url}">The ${esc(t.name)} town guide &rarr;</a></p>
    </section>`;
}

/* One line for a list row: "· Los Angeles guide →" */
function link(t, text) {
  return `<a class="town-link" href="${t.url}">${text || `${esc(t.name)} guide`} &rarr;</a>`;
}

module.exports = { load, find, strip, link, PAGES, RADIUS };
