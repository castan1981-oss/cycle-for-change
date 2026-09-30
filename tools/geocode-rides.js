#!/usr/bin/env node
/*
  geocode-rides.js — fills lat / lng / geo_precision for rides that don't have them.

    node tools/geocode-rides.js [file.json …]      default: cfc-site/rides/rides.json
      --dry        print what it would do, write nothing
      --redo       re-geocode records that already have coordinates

  Scouts leave coordinates null (their fetches go to proof of life); this tool
  does them in one batch. For each ride: the start address, then "<start name>,
  <city>, <country>", then the city itself. A start point more than 40 km from
  the city centre is treated as a miss and the city centre is used instead
  (geo_precision "city"). OpenStreetMap Nominatim, one request a second, with a
  cache in data/geocode-cache.json so re-runs are free.
*/
"use strict";
const fs = require("fs");
const path = require("path");
const S = require("./lib/rides-schema.js");

const ROOT = path.join(__dirname, "..");
const CACHE_FILE = path.join(ROOT, "data", "geocode-cache.json");
const args = process.argv.slice(2);
const DRY = args.includes("--dry"), REDO = args.includes("--redo");
const files = args.filter((a) => !a.startsWith("--"));
if (!files.length) files.push(path.join(ROOT, "cfc-site", "rides", "rides.json"));

const cache = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE, "utf8")) : {};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let last = 0;

async function nominatim(q, cc) {
  const key = `${cc || ""}|${q}`.toLowerCase();
  if (key in cache) return cache[key];
  const wait = 1100 - (Date.now() - last);
  if (wait > 0) await sleep(wait);
  last = Date.now();
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=0&q=${encodeURIComponent(q)}${cc ? `&countrycodes=${cc.toLowerCase()}` : ""}`;
  let hit = null;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "cycleforchange.org ride directory geocoder (https://cycleforchange.org/rides/)", "Accept-Language": "en" } });
    if (res.ok) {
      const j = await res.json();
      if (j && j[0]) hit = { lat: +(+j[0].lat).toFixed(5), lng: +(+j[0].lon).toFixed(5), type: j[0].type || null, name: j[0].display_name || null };
    } else {
      console.warn(`  ! nominatim ${res.status} for "${q}"`);
      if (res.status === 429 || res.status >= 500) return null;   // don't cache a throttle
    }
  } catch (e) { console.warn(`  ! nominatim failed for "${q}": ${e.message}`); return null; }
  cache[key] = hit;
  return hit;
}

const km = (a, b) => {
  const R = 6371, t = (d) => (d * Math.PI) / 180;
  const x = Math.sin(t(b.lat - a.lat) / 2) ** 2 + Math.cos(t(a.lat)) * Math.cos(t(b.lat)) * Math.sin(t(b.lng - a.lng) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};

(async () => {
  for (const file of files) {
    const rides = JSON.parse(fs.readFileSync(file, "utf8"));
    let done = 0, city = 0, miss = 0;
    for (const r of rides) {
      if (!REDO && Number.isFinite(r.lat) && Number.isFinite(r.lng)) continue;
      const cc = r.country || "US";
      const place = [r.city, r.state || r.region, S.countryName(cc)].filter(Boolean).join(", ");
      const center = await nominatim(place, cc);
      const loc = r.start_location || {};
      let hit = null;
      for (const q of [loc.address, loc.name && `${loc.name}, ${place}`].filter(Boolean)) {
        const h = await nominatim(q, cc);
        if (h && (!center || km(center, h) <= 40)) { hit = h; break; }
      }
      if (hit) { r.lat = hit.lat; r.lng = hit.lng; r.geo_precision = "start"; done++; }
      else if (center) { r.lat = center.lat; r.lng = center.lng; r.geo_precision = "city"; city++; }
      else { miss++; console.warn(`  ? no coordinates for ${r.slug} (${place})`); continue; }
      console.log(`  ${r.geo_precision.padEnd(5)} ${r.slug}  ${r.lat},${r.lng}`);
    }
    if (!DRY) fs.writeFileSync(file, JSON.stringify(rides, null, 1) + "\n");
    console.log(`${path.relative(ROOT, file)}: ${done} start points, ${city} city centres, ${miss} not found${DRY ? " (dry run)" : ""}`);
  }
  if (!DRY) fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 1) + "\n");
})();
