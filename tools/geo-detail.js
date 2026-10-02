#!/usr/bin/env node
/* Cycle for Change — what's on the map besides the outline (Pass 18, Oct 2, 2026).
   Robert, on his phone after Pass 17: the map "needs to be more detailed. It looks a little weird
   just being a blank slate like that." So every state and country map gets four quiet layers,
   drawn here once and kept in data/geo/detail.json (tools/build-rides.js reads it):
     relief  — terrain contours, the same line the city tiles wear (AWS Terrain Tiles, terrarium)
     lakes   — Natural Earth 10m lakes (+ the North America and Europe supplements)
     rivers  — Natural Earth 10m rivers and lake centerlines (+ supplements)
     roads   — Natural Earth 10m roads: the expressways (in the US, the interstates), with their
               number ("I-35") so the zoomed map can name them
   Everything is projected onto the outline's own Mercator numbers (data/geo/outlines.json) and
   simplified, so the build needs no map library and no network.

     node tools/geo-detail.js                 # every state + every country with a listed ride
     node tools/geo-detail.js --only TX       # one (state code, or country code with --country)
     node tools/geo-detail.js --no-relief     # skip the terrain tiles (keeps relief already drawn)

   Needs the open internet (raw.githubusercontent.com for Natural Earth, s3.amazonaws.com for
   the terrain tiles) and pngjs: npm i --no-save pngjs. Behind a proxy, NODE_USE_ENV_PROXY=1.
   Re-run when outlines.json changes or a new country gets rides. */
const fs = require("fs");
const os = require("os");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "geo", "detail.json");
const CACHE = path.join(os.tmpdir(), "natural-earth");
const NE = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/";
const args = process.argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;
const onlyCountry = args.includes("--country");
const noRelief = args.includes("--no-relief");

const GEO = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "geo", "outlines.json"), "utf8"));
const RIDES = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site", "rides", "rides.json"), "utf8"));
const rideList = Array.isArray(RIDES) ? RIDES : RIDES.rides || [];

// ---------- projection (the outline's own Mercator: tools/geo-outlines.js) ----------
const place = ([k, tx, ty, rot], lng, lat) => {
  const l = ((lng + rot + 540) % 360) - 180;
  return [tx + k * (l * Math.PI / 180), ty - k * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI / 180) / 2))];
};
const unplace = ([k, tx, ty, rot], x, y) => {
  const l = ((x - tx) / k) * 180 / Math.PI;
  return [((l - rot + 540) % 360) - 180, (2 * Math.atan(Math.exp((ty - y) / k)) - Math.PI / 2) * 180 / Math.PI];
};

// ---------- geometry helpers ----------
function simplify(line, eps) {   // Ramer–Douglas–Peucker, iterative
  if (line.length < 3) return line;
  const keep = new Uint8Array(line.length); keep[0] = keep[line.length - 1] = 1;
  const stack = [[0, line.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = line[a], [bx, by] = line[b], dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1e-9;
    let maxD = -1, idx = -1;
    const ring = Math.hypot(dx, dy) < 1e-9;   // a closed ring: measure from the shared end, not a line of no length
    for (let i = a + 1; i < b; i++) { const d = ring ? Math.hypot(line[i][0] - ax, line[i][1] - ay) : Math.abs(dy * line[i][0] - dx * line[i][1] + bx * ay - by * ax) / len; if (d > maxD) { maxD = d; idx = i; } }
    if (maxD > eps && idx > 0) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return line.filter((_, i) => keep[i]);
}
const lengthOf = (l) => l.reduce((s, p, i) => (i ? s + Math.hypot(p[0] - l[i - 1][0], p[1] - l[i - 1][1]) : 0), 0);
const areaOf = (r) => Math.abs(r.reduce((s, p, i) => { const q = r[(i + 1) % r.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2);
const f1 = (v) => (Math.round(v * 10) / 10).toString();
const pathD = (lines, close = false) => lines.map((l) => "M" + l.map(([x, y], i) => `${i ? "L" : ""}${f1(x)} ${f1(y)}`).join("") + (close ? "Z" : "")).join("");
// the runs of a line that come within the box, each with one point beyond so the clip-path cuts it clean
function runsIn(coords, box) {
  const inside = ([x, y]) => x >= box[0] && x <= box[2] && y >= box[1] && y <= box[3];
  const runs = []; let cur = null;
  for (let i = 0; i < coords.length; i++) {
    if (inside(coords[i])) {
      if (!cur) { cur = i > 0 ? [coords[i - 1]] : []; runs.push(cur); }
      cur.push(coords[i]);
    } else if (cur) { cur.push(coords[i]); cur = null; }
  }
  return runs;
}
const linesOf = (g) => (!g ? [] : g.type === "LineString" ? [g.coordinates] : g.type === "MultiLineString" ? g.coordinates : []);
const ringsOf = (g) => (!g ? [] : g.type === "Polygon" ? g.coordinates : g.type === "MultiPolygon" ? g.coordinates.flat() : []);

// ---------- Natural Earth ----------
async function ne(name) {
  fs.mkdirSync(CACHE, { recursive: true });
  const file = path.join(CACHE, `${name}.geojson`);
  if (!fs.existsSync(file)) {
    process.stdout.write(`  fetching ${name}… `);
    const r = await fetch(NE + name + ".geojson");
    if (!r.ok) throw new Error(`${r.status} ${name}`);
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
    console.log("ok");
  }
  return JSON.parse(fs.readFileSync(file, "utf8")).features;
}

// ---------- terrain ----------
let PNG = null;
const tileCache = new Map();
async function tile(z, x, y) {
  const key = `${z}/${x}/${y}`;
  if (tileCache.has(key)) return tileCache.get(key);
  const p = (async () => {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const r = await fetch(`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${key}.png`);
        if (r.status === 404) return null;
        if (!r.ok) throw new Error(String(r.status));
        const png = PNG.sync.read(Buffer.from(await r.arrayBuffer()));
        const e = new Float32Array(256 * 256);
        for (let i = 0; i < e.length; i++) e[i] = png.data[i * 4] * 256 + png.data[i * 4 + 1] + png.data[i * 4 + 2] / 256 - 32768;
        return e;
      } catch (err) { if (attempt === 2) throw err; await new Promise((res) => setTimeout(res, 800 * (attempt + 1))); }
    }
  })();
  tileCache.set(key, p);
  return p;
}
// which samples sit on the land: scanline even-odd fill of the outline (M/L/Z, absolute)
function landMask(d, nx, ny, step) {
  const rings = d.split("M").filter(Boolean).map((r) => r.replace(/Z/g, "").split("L").map((pt) => pt.split(",").map(Number)));
  const edges = [];
  for (const r of rings) for (let i = 0; i < r.length; i++) { const a = r[i], b = r[(i + 1) % r.length]; if (a[1] !== b[1]) edges.push(a[1] < b[1] ? [a, b] : [b, a]); }
  const mask = new Uint8Array(nx * ny);
  for (let j = 0; j < ny; j++) {
    const y = j * step, xs = [];
    for (const [a, b] of edges) if (y >= a[1] && y < b[1]) xs.push(a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]));
    xs.sort((m, n) => m - n);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const i0 = Math.max(0, Math.ceil(xs[k] / step)), i1 = Math.min(nx - 1, Math.floor(xs[k + 1] / step));
      for (let i = i0; i <= i1; i++) mask[j * nx + i] = 1;
    }
  }
  return mask;
}
async function relief(shape) {
  const { w, h, p } = shape;
  const STEP = Math.max(w, h) / 240;             // ~240 samples across the long side
  const nx = Math.ceil(w / STEP) + 1, ny = Math.ceil(h / STEP) + 1;
  // the tile zoom that gives at least one pixel per sample
  const [lng0] = unplace(p, 0, 0), [lng1] = unplace(p, w, 0);
  const span = ((lng1 - lng0 + 360) % 360) || 360;
  let z = Math.ceil(Math.log2((nx / span) * 360 / 256)) + 1;
  z = Math.max(2, Math.min(10, z));
  const n = 2 ** z;
  const want = [];
  const pix = new Array(nx * ny);
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const [lng, lat] = unplace(p, i * STEP, j * STEP);
    const la = Math.max(-85, Math.min(85, lat)) * Math.PI / 180;
    const fx = ((lng + 180) / 360) * n * 256, fy = ((1 - Math.log(Math.tan(la) + 1 / Math.cos(la)) / Math.PI) / 2) * n * 256;
    pix[j * nx + i] = [fx, fy];
    want.push(`${Math.floor(fx / 256)}/${Math.floor(fy / 256)}`);
  }
  const tiles = [...new Set(want)];
  const got = new Map();
  for (let i = 0; i < tiles.length; i += 8) {
    await Promise.all(tiles.slice(i, i + 8).map(async (t) => { const [x, y] = t.split("/").map(Number); got.set(t, await tile(z, ((x % n) + n) % n, y)); }));
  }
  const elev = (fx, fy) => {
    const tx = Math.floor(fx / 256), ty = Math.floor(fy / 256), t = got.get(`${tx}/${ty}`);
    if (!t) return 0;
    const px = Math.min(255, Math.max(0, Math.floor(fx - tx * 256))), py = Math.min(255, Math.max(0, Math.floor(fy - ty * 256)));
    return t[py * 256 + px];
  };
  let grid = new Float32Array(nx * ny);
  for (let i = 0; i < grid.length; i++) grid[i] = elev(...pix[i]);
  const blur = (g) => {
    const o = new Float32Array(g.length);
    for (let y = 0; y < ny; y++) for (let x = 0; x < nx; x++) {
      let a = 0, c = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= nx || yy >= ny) continue; a += g[yy * nx + xx]; c++; }
      o[y * nx + x] = a / c;
    }
    return o;
  };
  grid = blur(blur(grid));
  // levels: evenly spread over this place's own land (not its neighbours'), so flat states still
  // draw and mountain states don't fill in
  const mask = landMask(shape.d, nx, ny, STEP);
  const land = Array.from(grid).filter((v, i) => mask[i] && v > 0.5).sort((a, b) => a - b);
  if (land.length < 50) return "";
  const lo = land[Math.floor(land.length * 0.04)], hi = land[Math.floor(land.length * 0.985)];
  if (hi - lo < 15) return "";
  const LEVELS = 16, out = [];
  for (let L = 1; L <= LEVELS; L++) {
    const level = lo + ((hi - lo) * L) / (LEVELS + 1);
    for (const raw of chain(segments(grid, nx, ny, level))) {
      const closed = Math.hypot(raw[0][0] - raw[raw.length - 1][0], raw[0][1] - raw[raw.length - 1][1]) < 0.01;
      if (raw.length < (closed ? 6 : 8)) continue;
      if (!raw.some(([x, y]) => mask[Math.round(y) * nx + Math.round(x)])) continue;   // all of it over a neighbour: the clip would hide it anyway
      out.push(simplify(raw.map(([x, y]) => [x * STEP, y * STEP]), STEP * 0.35));
    }
  }
  return pathD(out);
}
function segments(g, nx, ny, level) {
  const segs = [], at = (x, y) => g[y * nx + x];
  const lerp = (a, b, va, vb) => a + ((level - va) / (vb - va || 1e-9)) * (b - a);
  const T = { 1: [[3, 0]], 2: [[0, 1]], 3: [[3, 1]], 4: [[1, 2]], 5: [[3, 0], [1, 2]], 6: [[0, 2]], 7: [[3, 2]], 8: [[2, 3]], 9: [[0, 2]], 10: [[0, 1], [2, 3]], 11: [[1, 2]], 12: [[1, 3]], 13: [[0, 1]], 14: [[3, 0]] };
  for (let y = 0; y < ny - 1; y++) for (let x = 0; x < nx - 1; x++) {
    const v = [at(x, y), at(x + 1, y), at(x + 1, y + 1), at(x, y + 1)];
    const idx = (v[0] > level) | ((v[1] > level) << 1) | ((v[2] > level) << 2) | ((v[3] > level) << 3);
    if (idx === 0 || idx === 15) continue;
    const e = [[lerp(x, x + 1, v[0], v[1]), y], [x + 1, lerp(y, y + 1, v[1], v[2])], [lerp(x, x + 1, v[3], v[2]), y + 1], [x, lerp(y, y + 1, v[0], v[3])]];
    for (const [a, b] of T[idx]) segs.push([e[a], e[b]]);
  }
  return segs;
}
function chain(segs) {
  const key = (p) => `${p[0].toFixed(3)},${p[1].toFixed(3)}`;
  const touch = new Map();
  for (const s of segs) for (const end of [s[0], s[1]]) { const k = key(end); (touch.get(k) || touch.set(k, []).get(k)).push(s); }
  const used = new Set(), lines = [];
  const next = (pt) => { const l = touch.get(key(pt)); const s = l && l.find((x) => !used.has(x)); if (!s) return null; used.add(s); return key(s[0]) === key(pt) ? s[1] : s[0]; };
  for (const s of segs) {
    if (used.has(s)) continue;
    used.add(s);
    const line = [s[0], s[1]];
    for (let p; (p = next(line[line.length - 1])); ) line.push(p);
    for (let p; (p = next(line[0])); ) line.unshift(p);
    lines.push(line);
  }
  return lines;
}

// ---------- one shape ----------
function vectors(shape, src) {
  const { w, h, p } = shape, m = Math.max(w, h) * 0.04;
  const box = [-m, -m, w + m, h + m];
  // a quick lng/lat window to skip features nowhere near
  const corners = [[0, 0], [w, 0], [0, h], [w, h], [w / 2, 0], [w / 2, h]].map(([x, y]) => unplace(p, x, y));
  const lats = corners.map((c) => c[1]);
  const latLo = Math.min(...lats) - 1, latHi = Math.max(...lats) + 1;
  const near = (coords) => coords.some(([, lat]) => lat >= latLo && lat <= latHi);
  const proj = (coords) => coords.map(([lng, lat]) => place(p, lng, lat));

  // roads: expressways; in the US the interstates by number. One entry per route.
  const roads = new Map();
  for (const f of src.roads) {
    const q = f.properties;
    const us = q.sov_a3 === "USA", interstate = us && q.level === "Interstate";
    if (!interstate && !((q.type === "Major Highway" || q.type === "Beltway") && q.expressway === 1)) continue;
    const num = q.name ? String(q.name).trim() : "";
    const ref = interstate && /^\d{1,3}[A-Z]?$/.test(num) ? `I-${num}` : !us && /^[A-Z]{1,2}-?\d{1,4}$/.test(num) ? num : "";
    for (const c of linesOf(f.geometry)) {
      if (!near(c)) continue;
      for (const run of runsIn(proj(c), box)) {
        const s = simplify(run, 0.22);
        if (s.length < 2 || lengthOf(s) < 1.2) continue;
        (roads.get(ref) || roads.set(ref, []).get(ref)).push(s);
      }
    }
  }
  const rivers = [];
  for (const f of src.rivers) {
    const rank = f.properties.scalerank ?? f.properties.min_zoom ?? 0;
    if (rank > 9) continue;
    for (const c of linesOf(f.geometry)) {
      if (!near(c)) continue;
      for (const run of runsIn(proj(c), box)) { const s = simplify(run, 0.3); if (s.length >= 2 && lengthOf(s) >= 5) rivers.push(s); }
    }
  }
  const lakes = [];
  const seen = new Set();
  for (const f of src.lakes) {
    for (const ring of ringsOf(f.geometry)) {
      if (!near(ring)) continue;
      const pr = proj(ring);
      if (!pr.some(([x, y]) => x >= box[0] && x <= box[2] && y >= box[1] && y <= box[3])) continue;
      const s = simplify(pr, 0.18);
      if (s.length < 4 || areaOf(s) < 0.35) continue;
      const k = s.slice(0, 3).map(([x, y]) => `${Math.round(x)},${Math.round(y)}`).join("|");   // the supplements repeat some lakes
      if (seen.has(k)) continue; seen.add(k);
      lakes.push(s);
    }
  }
  return {
    roads: [...roads.entries()].sort((a, b) => (a[0] ? 0 : 1) - (b[0] ? 0 : 1) || a[0].localeCompare(b[0])).map(([ref, ls]) => [ref, pathD(ls)]),
    rivers: pathD(rivers),
    lakes: pathD(lakes, true),
  };
}

(async () => {
  if (!noRelief) { try { PNG = require("pngjs").PNG; } catch { console.error("npm i --no-save pngjs  (once), or run with --no-relief"); process.exit(1); } }
  const keep = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : { states: {}, countries: {} };
  const ccs = new Set(rideList.filter((r) => r.country && r.country !== "US").map((r) => r.country));
  const jobs = [
    ...Object.keys(GEO.states).map((k) => ["states", k]),
    ...[...ccs].filter((cc) => GEO.countries[cc]).map((cc) => ["countries", cc]),
  ].filter(([kind, k]) => !only || (k === only && (kind === "countries") === onlyCountry));
  console.log(`${jobs.length} maps`);
  const src = {
    roads: await ne("ne_10m_roads"),
    rivers: [...(await ne("ne_10m_rivers_lake_centerlines")), ...(await ne("ne_10m_rivers_north_america")), ...(await ne("ne_10m_rivers_europe"))],
    lakes: [...(await ne("ne_10m_lakes")), ...(await ne("ne_10m_lakes_north_america")), ...(await ne("ne_10m_lakes_europe"))],
  };
  const out = { _: "Drawn by tools/geo-detail.js from Natural Earth (public domain) and AWS Terrain Tiles. Don't edit by hand.", states: keep.states || {}, countries: keep.countries || {} };
  for (const [kind, k] of jobs) {
    const shape = GEO[kind][k];
    const v = vectors(shape, src);
    let r = (out[kind][k] || {}).relief || "";
    if (!noRelief) { try { r = await relief(shape); } catch (e) { console.log(`  ! ${k} relief: ${e.message}`); } }
    out[kind][k] = { ...v, relief: r };
    const kb = Math.round(JSON.stringify(out[kind][k]).length / 1024);
    console.log(`  ✓ ${kind === "states" ? k : k + " (country)"}  ${v.roads.length} routes, ${kb} KB`);
  }
  fs.writeFileSync(OUT, JSON.stringify(out));
  console.log(`wrote ${path.relative(ROOT, OUT)} (${Math.round(fs.statSync(OUT).size / 1024)} KB). Now: node tools/build-rides.js`);
})();
