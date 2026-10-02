#!/usr/bin/env node
/*
  geo-outlines.js — draws the map outlines the rides pages use, once, into data/geo/outlines.json.
  Pass 16 (Oct 2, 2026). Robert: "even more custom buttons and graphics." The state, country and
  ride pages carry a drawn map (the outline, a dot per ride, the cities you can tap), and
  /rides/united-states/ is a map of the states you can tap. tools/build-rides.js reads this
  file and places the dots itself (plain Mercator, below), so the build needs no map library.

  Run by hand when the outlines need redrawing (they don't change with the rides):
    npm i --no-save us-atlas world-atlas topojson-client d3-geo i18n-iso-countries
    node tools/geo-outlines.js

  What it writes, per state and per country:
    { w, h, d, p: [k, tx, ty, rot] }   d = the outline as an SVG path in a w×h box;
    a point (lng, lat) lands at  x = tx + k·λ,  y = ty − k·ln(tan(π/4 + φ/2)),
    λ = (lng + rot) in radians wrapped to ±π, φ = lat in radians  (d3's geoMercator, fitted).
  And: us = the states in one 975×610 box (Albers USA, Alaska and Hawaii inset) with each
  state's label point; nation = the US outline (the tile art); world = the land (tile art).
*/
"use strict";
const fs = require("fs");
const path = require("path");
const topo = require("topojson-client");
const d3 = require("d3-geo");
const iso = require("i18n-iso-countries");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "geo", "outlines.json");
const W = 400, PAD = 8;

const FIPS = { "01":"AL","02":"AK","04":"AZ","05":"AR","06":"CA","08":"CO","09":"CT","10":"DE","11":"DC","12":"FL","13":"GA","15":"HI","16":"ID","17":"IL","18":"IN","19":"IA","20":"KS","21":"KY","22":"LA","23":"ME","24":"MD","25":"MA","26":"MI","27":"MN","28":"MS","29":"MO","30":"MT","31":"NE","32":"NV","33":"NH","34":"NJ","35":"NM","36":"NY","37":"NC","38":"ND","39":"OH","40":"OK","41":"OR","42":"PA","44":"RI","45":"SC","46":"SD","47":"TN","48":"TX","49":"UT","50":"VT","51":"VA","53":"WA","54":"WV","55":"WI","56":"WY","72":"PR" };

// ---- path helpers: parse d3's "M…L…Z" back into rings, simplify in screen space, write 1 decimal ----
function rings(d) {
  const out = [];
  for (const part of String(d || "").split(/(?=M)/)) {
    const nums = part.replace(/[MLZ]/g, " ").trim().split(/[\s,]+/).map(Number);
    const pts = []; for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
    if (pts.length) out.push(pts);
  }
  return out;
}
function dp(pts, tol) {   // Douglas–Peucker
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop(); let max = 0, at = -1;
    const [x1, y1] = pts[a], [x2, y2] = pts[b], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    for (let i = a + 1; i < b; i++) { const dd = Math.abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / L; if (dd > max) { max = dd; at = i; } }
    if (max > tol && at > -1) { keep[at] = 1; stack.push([a, at], [at, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const f1 = (n) => (Math.round(n * 10) / 10).toString();
function pathOf(rs, tol, minArea = 0.6) {
  return rs.map((r) => dp(r, tol)).filter((r) => r.length > 2 && Math.abs(area(r)) >= minArea)
    .map((r) => "M" + r.map(([x, y]) => `${f1(x)},${f1(y)}`).join("L") + "Z").join("");
}
function area(r) { let s = 0; for (let i = 0; i < r.length; i++) { const [x1, y1] = r[i], [x2, y2] = r[(i + 1) % r.length]; s += x1 * y2 - x2 * y1; } return s / 2; }

// Far-flung parts (French Guiana, Svalbard, the Dutch Caribbean) would shrink the mainland to a
// speck. Keep the biggest polygon and whatever sits near it.
function mainland(feature) {
  const g = feature.geometry;
  if (!g || g.type !== "MultiPolygon" || g.coordinates.length < 2) return feature;
  const polys = g.coordinates.map((c) => ({ c, a: d3.geoArea({ type: "Polygon", coordinates: c }), b: d3.geoBounds({ type: "Polygon", coordinates: c }) }));
  const big = polys.reduce((m, p) => (p.a > m.a ? p : m));
  const [[x0, y0], [x1, y1]] = big.b, ex = Math.max(8, (x1 - x0)), ey = Math.max(6, (y1 - y0));
  const near = (p) => p.b[1][0] >= x0 - ex && p.b[0][0] <= x1 + ex && p.b[1][1] >= y0 - ey && p.b[0][1] <= y1 + ey;
  return { ...feature, geometry: { type: "MultiPolygon", coordinates: polys.filter((p) => p === big || near(p)).map((p) => p.c) } };
}

// One outline fitted to W wide, with the Mercator numbers build-rides needs to place a dot.
function fitted(feature) {
  const rot = -d3.geoCentroid(feature)[0];
  const proj = d3.geoMercator().rotate([rot, 0]).fitWidth(W - PAD * 2, feature);
  const [[bx0, by0], [bx1, by1]] = d3.geoPath(proj).bounds(feature);
  proj.translate([proj.translate()[0] - bx0 + PAD, proj.translate()[1] - by0 + PAD]);
  const h = Math.ceil(by1 - by0 + PAD * 2);
  const k = proj.scale(), [tx, ty] = proj.translate();
  // check our own formula against d3 at the centroid
  const c = d3.geoCentroid(feature), mine = place([k, tx, ty, rot], c[0], c[1]), theirs = proj(c);
  if (Math.hypot(mine[0] - theirs[0], mine[1] - theirs[1]) > 0.05) throw new Error("projection mismatch");
  return { w: W, h, d: pathOf(rings(d3.geoPath(proj)(feature)), 0.55), p: [+k.toFixed(4), +tx.toFixed(3), +ty.toFixed(3), +rot.toFixed(5)] };
}
function place([k, tx, ty, rot], lng, lat) {
  let l = ((lng + rot + 540) % 360) - 180;
  const lam = (l * Math.PI) / 180, phi = (lat * Math.PI) / 180;
  return [tx + k * lam, ty - k * Math.log(Math.tan(Math.PI / 4 + phi / 2))];
}

function main() {
  const out = { _: "Drawn by tools/geo-outlines.js from us-atlas and world-atlas (Natural Earth, public domain). Don't edit by hand.", states: {}, countries: {}, us: { w: 975, h: 610, states: {} } };
  // states, each fitted on its own
  const st = require("us-atlas/states-10m.json");
  for (const f of topo.feature(st, st.objects.states).features) { const code = FIPS[f.id]; if (code) out.states[code] = fitted(code === "AK" ? mainland(f) : f); }
  // the states together, Albers USA (already projected in the atlas), for the tap-a-state map
  const sa = require("us-atlas/states-albers-10m.json");
  const flat = d3.geoPath();
  for (const f of topo.feature(sa, sa.objects.states).features) {
    const code = FIPS[f.id]; if (!code) continue;
    const c = flat.centroid(f);
    out.us.states[code] = { d: pathOf(rings(flat(f)), 0.6, 0.3), c: [+c[0].toFixed(1), +c[1].toFixed(1)], a: Math.round(flat.area(f)) };
  }
  out.nation = { w: 975, h: 610, d: pathOf(rings(flat(topo.feature(sa, sa.objects.nation))), 1.2, 4) };
  // countries
  const wc = require("world-atlas/countries-50m.json");
  for (const f of topo.feature(wc, wc.objects.countries).features) {
    const a2 = iso.numericToAlpha2(String(f.id).padStart(3, "0"));
    if (!a2 || !f.geometry || a2 === "AQ") continue;
    try { out.countries[a2] = fitted(mainland(f)); } catch (e) { /* a sliver d3 can't fit: no map, the page does without */ }
  }
  // the land, for the "Outside the US" tile (Equal Earth, 400 wide)
  const land = require("world-atlas/land-110m.json");
  const lf = topo.feature(land, land.objects.land);
  const eq = d3.geoEqualEarth().fitWidth(W, lf);
  const [[, ly0], [, ly1]] = d3.geoPath(eq).bounds(lf);
  out.world = { w: W, h: Math.ceil(ly1 - ly0), d: pathOf(rings(d3.geoPath(eq.translate([eq.translate()[0], eq.translate()[1] - ly0]))(lf)), 0.6, 2) };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out));
  const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
  console.log(`wrote ${path.relative(ROOT, OUT)}: ${Object.keys(out.states).length} states, ${Object.keys(out.countries).length} countries, the US map, the nation and the land — ${kb} KB`);
}
module.exports = { place };
if (require.main === module) main();
