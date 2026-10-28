/* Cycle for Change: the homepage's 2027 map (Oct 26, 2026, the editorial homepage).

   Where the rides Robert is doing in 2027 are, on one map: the lower 48 (data/geo/outlines.json, the Albers USA
   states the tap-a-state map already uses), whole, with room above the border for the Toronto to Montréal rally, and
   a dot for each ride's town in date order. (v3, Oct 27: Canada's fill is gone; any box cuts it with a straight
   edge somewhere, and the critic read the cut as a cropped image. The Toronto dot sits where Toronto is.) It is not a route. Nothing is drawn between the dots, and a point-to-point
   ride gets its start and its finish, never the road between them (CLAUDE.md §6: never a route we drew).

   Writes data/geo/home-2027.json, which scripts/build-home.js reads. Run it when a ride is added to or dropped
   from the list (data/calendar-2027.json, riding: true), or when a ride moves town:

     npm i --no-save d3-geo      (or CFC_GEO_MODULES=<dir with it>)
     node tools/home-map.js

   Places are town centres (Wikipedia infoboxes, read Oct 26, 2026), checked by the fact desk (research/events/2026-10-26-homepage-facts.md).
   A ride whose town isn't in PLACES stops the script, so a new ride can't land on the map in the wrong place. */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const MODS = process.env.CFC_GEO_MODULES || path.join(ROOT, "node_modules");
const need = (m) => require(path.join(MODS, m));
const d3 = need("d3-geo");

// town centres, [lat, lng]
const PLACES = {
  phoenix: ["Phoenix", 33.45, -112.07],
  "palm-springs": ["Palm Springs", 33.83, -116.55],
  "fountain-hills": ["Fountain Hills", 33.60, -111.72],
  stillwater: ["Stillwater", 36.12, -97.06],
  monterey: ["Monterey", 36.60, -121.89],
  "los-angeles": ["Los Angeles", 34.05, -118.25],
  "san-francisco": ["San Francisco", 37.78, -122.42],
  sausalito: ["Sausalito", 37.86, -122.49],
  emporia: ["Emporia", 38.40, -96.19],
  seattle: ["Seattle", 47.60, -122.33],
  portland: ["Portland", 45.52, -122.68],
  toronto: ["Toronto", 43.65, -79.38],
  montreal: ["Montréal", 45.51, -73.55],
  "new-york": ["New York", 40.71, -74.01],
  "chino-valley": ["Chino Valley", 34.76, -112.42],
  tucson: ["Tucson", 32.22, -110.97],
};
// each ride: its start town, and its finish town when the ride ends somewhere else
const RIDE_PLACE = {
  "tour-de-palm-springs": ["palm-springs"],
  "belgian-waffle-ride-arizona": ["fountain-hills"],
  "the-mid-south": ["stillwater"],
  "life-time-sea-otter-classic": ["monterey"],
  "center-ride-out": ["los-angeles"],
  "cycle-to-zero": ["san-francisco"],
  "life-time-unbound-gravel": ["emporia"],
  "seattle-to-portland-bicycle-classic": ["seattle", "portland"],
  "friends-for-life-bike-rally": ["toronto", "montreal"],
  "cycle-for-the-cause": ["new-york"],
  "chino-grinder": ["chino-valley"],
  "el-tour-de-tucson": ["tucson"],
  "recovery-ride": ["sausalito"],
};

// the projection the us-atlas Albers states were drawn in (geoAlbersUsa, scale 1300, translate 487.5 305);
// its lower-48 part, so a town just over the border in Canada lands where it is
const lower48 = d3.geoConicEqualArea().parallels([29.5, 45.5]).rotate([96, 0]).center([-0.6, 38.7]).scale(1300).translate([487.5, 305]);
const P = (lat, lng) => lower48([lng, lat]).map((v) => Math.round(v * 10) / 10);

const outlines = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "geo", "outlines.json"), "utf8"));
const states = Object.entries(outlines.us.states).filter(([k]) => k !== "AK" && k !== "HI").map(([, s]) => s.d);

// the box: the whole lower 48 (its outline runs x 18.5–957.1, y 14.4–605.9 in the atlas's own units) with a margin, so
// no state is cut at the edge
const xy = states.join("").match(/-?\d+(\.\d+)?/g).map(Number);
const xs = xy.filter((_, i) => i % 2 === 0), ys = xy.filter((_, i) => i % 2 === 1);
const M = 14;
const BOX = { x: Math.floor(Math.min(...xs) - M), y: Math.floor(Math.min(...ys) - M) };
BOX.w = Math.ceil(Math.max(...xs) + M - BOX.x); BOX.h = Math.ceil(Math.max(...ys) + M - BOX.y);

const cal = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "calendar-2027.json"), "utf8"));
const riding = cal.events.filter((e) => e.riding);
const rides = {};
for (const e of riding) {
  const keys = RIDE_PLACE[e.slug];
  if (!keys) throw new Error(`tools/home-map.js: no town for ${e.slug}; add it to RIDE_PLACE`);
  rides[e.slug] = keys.map((k) => { const p = PLACES[k]; if (!p) throw new Error(`no place ${k}`); return { town: p[0], xy: P(p[1], p[2]) }; });
}
const out = {
  _: "Written by tools/home-map.js from data/geo/outlines.json (us-atlas, Albers USA), world-atlas (Natural Earth, public domain) and the town table in the script. Don't edit by hand.",
  box: BOX,
  states: states.join(""),
  home: { town: "Phoenix", xy: P(PLACES.phoenix[1], PLACES.phoenix[2]) },
  rides,
};
fs.writeFileSync(path.join(ROOT, "data", "geo", "home-2027.json"), JSON.stringify(out) + "\n");
console.log("wrote data/geo/home-2027.json", Object.keys(rides).length, "rides", (JSON.stringify(out).length / 1024).toFixed(1) + " KB");
