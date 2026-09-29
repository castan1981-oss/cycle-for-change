#!/usr/bin/env node
/* Cycle for Change — route art (Pass 6, Sept 29 2026).
   Draws one topographic contour tile per town/city from real elevation data, one stroke,
   asphalt on nothing (the tile's background shows through). The generators pick the art
   up automatically: tools/build-rides.js looks in cfc-site/rides/art/<st>-<city>.svg,
   scripts/build-events.js in cfc-site/towns/art/<town-slug>.svg. No art = the type-only
   poster tile, so this is additive and safe to run any time.

   Run it on the Mac (it needs the open internet; the Cowork sandbox can't reach map servers):

     node tools/contour-art.js            # every city hub (58) + every event town (12)
     node tools/contour-art.js --only phoenix   # one, by slug substring
     node tools/contour-art.js --dry      # list what it would fetch

   Elevation: AWS Terrain Tiles (Mapzen "terrarium" PNGs, public, no key) at zoom 11,
   a 3x3 tile patch (~40 km square) centred on the town. Decoded with pngjs.
   Contours: marching squares at N levels between the patch's 2nd and 98th percentile,
   so flat towns (Long Beach) still draw something and mountain towns (Boulder) don't
   turn into a solid block. Re-run after data/rides.json gains a city — idempotent.
   Needs: npm i pngjs (once). */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const SITE = path.join(ROOT, "cfc-site");
const args = process.argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;
const dry = args.includes("--dry");
const Z = 11, PATCH = 1, LEVELS = 12, SIZE = 200;   // SIZE = the SVG's viewBox; tiles scale it

let PNG;
try { PNG = require("pngjs").PNG; } catch { console.error("npm i pngjs  (once), then run again"); process.exit(1); }

const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ---- targets: the 58 city hubs from rides.json + the 12 event towns from data/towns ----
function targets() {
  const out = [];
  // the city hubs, as tools/build-rides.js centred them (cfc-site/rides/hubs.json)
  const hubs = JSON.parse(fs.readFileSync(path.join(SITE, "rides", "hubs.json"), "utf8"));
  for (const h of hubs) out.push({ key: `rides/art/${h.key}`, lat: h.lat, lng: h.lng, name: `${h.city}, ${h.state}` });
  const townsDir = path.join(ROOT, "data", "towns");
  if (fs.existsSync(townsDir)) for (const f of fs.readdirSync(townsDir)) {
    if (!f.endsWith(".json")) continue;
    const t = JSON.parse(fs.readFileSync(path.join(townsDir, f), "utf8"));
    if (t.lat && (t.lon || t.lng)) out.push({ key: `towns/art/${slugify(t.name)}`, lat: +t.lat, lng: +(t.lon || t.lng), name: t.name });   // build-events.js slugs the name the same way
  }
  return out.filter((t) => !only || t.key.includes(only));
}

// ---- tiles ----
const lon2x = (lon, z) => Math.floor(((lon + 180) / 360) * 2 ** z);
const lat2y = (lat, z) => { const r = (lat * Math.PI) / 180; return Math.floor(((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z); };
function fetchPng(url) {
  return new Promise((res, rej) => {
    const req = https.get(url, { headers: { "User-Agent": "cycleforchange.org route art" } }, (r) => {
      if (r.statusCode !== 200) return rej(new Error(`${r.statusCode} ${url}`));
      const chunks = []; r.on("data", (c) => chunks.push(c)); r.on("end", () => res(PNG.sync.read(Buffer.concat(chunks))));
    });
    req.setTimeout(20000, () => { req.destroy(new Error("timed out (no route to the tile server?)")); });
    req.on("error", rej);
  });
}
async function elevationPatch(lat, lng) {
  const cx = lon2x(lng, Z), cy = lat2y(lat, Z), n = 2 * PATCH + 1, W = 256 * n;
  const grid = new Float32Array(W * W);
  for (let dy = -PATCH; dy <= PATCH; dy++) for (let dx = -PATCH; dx <= PATCH; dx++) {
    const png = await fetchPng(`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${Z}/${cx + dx}/${cy + dy}.png`);
    for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) {
      const i = (y * 256 + x) * 4;
      grid[(y + (dy + PATCH) * 256) * W + x + (dx + PATCH) * 256] = png.data[i] * 256 + png.data[i + 1] + png.data[i + 2] / 256 - 32768;
    }
  }
  return { grid, W };
}

// ---- marching squares ----
function contours(grid, W, level, step) {
  const segs = [];
  const at = (x, y) => grid[y * W + x];
  const lerp = (a, b, va, vb) => a + ((level - va) / (vb - va || 1e-9)) * (b - a);
  for (let y = 0; y < W - step; y += step) for (let x = 0; x < W - step; x += step) {
    const v = [at(x, y), at(x + step, y), at(x + step, y + step), at(x, y + step)];
    const idx = (v[0] > level) | ((v[1] > level) << 1) | ((v[2] > level) << 2) | ((v[3] > level) << 3);
    if (idx === 0 || idx === 15) continue;
    const e = [
      [lerp(x, x + step, v[0], v[1]), y],
      [x + step, lerp(y, y + step, v[1], v[2])],
      [lerp(x, x + step, v[3], v[2]), y + step],
      [x, lerp(y, y + step, v[0], v[3])],
    ];
    const T = { 1: [[3, 0]], 2: [[0, 1]], 3: [[3, 1]], 4: [[1, 2]], 5: [[3, 0], [1, 2]], 6: [[0, 2]], 7: [[3, 2]], 8: [[2, 3]], 9: [[0, 2]], 10: [[0, 1], [2, 3]], 11: [[1, 2]], 12: [[1, 3]], 13: [[0, 1]], 14: [[3, 0]] };
    for (const [a, b] of T[idx]) segs.push([e[a], e[b]]);
  }
  return segs;
}
function svgFor(grid, W) {
  const sorted = Float32Array.from(grid).sort();
  const lo = sorted[Math.floor(sorted.length * 0.02)], hi = sorted[Math.floor(sorted.length * 0.98)];
  const s = SIZE / W, step = 4;
  let d = "";
  for (let i = 1; i <= LEVELS; i++) {
    const level = lo + ((hi - lo) * i) / (LEVELS + 1);
    for (const [[x1, y1], [x2, y2]] of contours(grid, W, level, step)) d += `M${(x1 * s).toFixed(1)} ${(y1 * s).toFixed(1)}L${(x2 * s).toFixed(1)} ${(y2 * s).toFixed(1)}`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" preserveAspectRatio="xMidYMid slice"><path d="${d}" fill="none" stroke="#2A2E28" stroke-width=".9" stroke-linecap="round"/></svg>\n`;
}

(async () => {
  const list = targets();
  console.log(`${list.length} tiles${dry ? " (dry run)" : ""}`);
  for (const t of list) {
    const out = path.join(SITE, `${t.key}.svg`);
    if (dry) { console.log(`  ${t.key}  ${t.lat.toFixed(3)},${t.lng.toFixed(3)}`); continue; }
    try {
      const { grid, W } = await elevationPatch(t.lat, t.lng);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, svgFor(grid, W));
      console.log(`  ✓ ${t.key}.svg  (${t.name})`);
    } catch (e) { console.log(`  ✗ ${t.key}: ${e.message}`); }
  }
  if (!dry) console.log("Now: node tools/build-rides.js && node scripts/build-events.js");
})();
