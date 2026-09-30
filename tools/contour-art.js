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
const Z = 11, PATCH = 1, LEVELS = 10, SIZE = 200;   // SIZE = the SVG's viewBox; tiles scale it

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

// ---- contours ----
// Downsample the 768px patch to 256, smooth it twice (a 3x3 box), then marching squares at
// evenly spaced levels between the 3rd and 97th percentile. Segments are chained into
// polylines and short loops are dropped, so the file is small and the lines read as terrain
// rather than noise. Steep towns still get dense lines where the mountains are; that's the point.
function downsample(grid, W, f) {
  const w = Math.floor(W / f), out = new Float32Array(w * w);
  for (let y = 0; y < w; y++) for (let x = 0; x < w; x++) {
    let acc = 0;
    for (let j = 0; j < f; j++) for (let i = 0; i < f; i++) acc += grid[(y * f + j) * W + x * f + i];
    out[y * w + x] = acc / (f * f);
  }
  return { grid: out, W: w };
}
function blur(grid, W) {
  const out = new Float32Array(W * W);
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
    let acc = 0, n = 0;
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) { const yy = y + j, xx = x + i; if (yy < 0 || xx < 0 || yy >= W || xx >= W) continue; acc += grid[yy * W + xx]; n++; }
    out[y * W + x] = acc / n;
  }
  return out;
}
function segments(grid, W, level) {
  const segs = [];
  const at = (x, y) => grid[y * W + x];
  const lerp = (a, b, va, vb) => a + ((level - va) / (vb - va || 1e-9)) * (b - a);
  const T = { 1: [[3, 0]], 2: [[0, 1]], 3: [[3, 1]], 4: [[1, 2]], 5: [[3, 0], [1, 2]], 6: [[0, 2]], 7: [[3, 2]], 8: [[2, 3]], 9: [[0, 2]], 10: [[0, 1], [2, 3]], 11: [[1, 2]], 12: [[1, 3]], 13: [[0, 1]], 14: [[3, 0]] };
  for (let y = 0; y < W - 1; y++) for (let x = 0; x < W - 1; x++) {
    const v = [at(x, y), at(x + 1, y), at(x + 1, y + 1), at(x, y + 1)];
    const idx = (v[0] > level) | ((v[1] > level) << 1) | ((v[2] > level) << 2) | ((v[3] > level) << 3);
    if (idx === 0 || idx === 15) continue;
    const e = [[lerp(x, x + 1, v[0], v[1]), y], [x + 1, lerp(y, y + 1, v[1], v[2])], [lerp(x, x + 1, v[3], v[2]), y + 1], [x, lerp(y, y + 1, v[0], v[3])]];
    for (const [a, b] of T[idx]) segs.push([e[a], e[b]]);
  }
  return segs;
}
function chain(segs) {
  // join segments end to end in either direction (marching squares gives them no consistent orientation)
  const key = (p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`;
  const touch = new Map();
  const add = (k, s) => { const l = touch.get(k); if (l) l.push(s); else touch.set(k, [s]); };
  for (const s of segs) { add(key(s[0]), s); add(key(s[1]), s); }
  const used = new Set(); const lines = [];
  const next = (pt) => { const l = touch.get(key(pt)); if (!l) return null; const s = l.find((x) => !used.has(x)); if (!s) return null; used.add(s); return key(s[0]) === key(pt) ? s[1] : s[0]; };
  for (const s of segs) {
    if (used.has(s)) continue;
    used.add(s);
    const line = [s[0], s[1]];
    for (let guard = 0; guard < 100000; guard++) { const p = next(line[line.length - 1]); if (!p) break; line.push(p); }
    for (let guard = 0; guard < 100000; guard++) { const p = next(line[0]); if (!p) break; line.unshift(p); }
    lines.push(line);
  }
  return lines;
}
// Ramer–Douglas–Peucker: drop points that don't change the line (keeps mountain tiles under ~80 KB)
function simplify(line, eps) {
  if (line.length < 3) return line;
  const [ax, ay] = line[0], [bx, by] = line[line.length - 1];
  let maxD = -1, idx = 0;
  const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1e-9;
  for (let i = 1; i < line.length - 1; i++) {
    const [px, py] = line[i];
    const d = Math.abs(dy * px - dx * py + bx * ay - by * ax) / len;
    if (d > maxD) { maxD = d; idx = i; }
  }
  if (maxD <= eps) return [line[0], line[line.length - 1]];
  return simplify(line.slice(0, idx + 1), eps).slice(0, -1).concat(simplify(line.slice(idx), eps));
}
function svgFor(raw, rawW) {
  let { grid, W } = downsample(raw, rawW, 3);
  grid = blur(blur(grid, W), W);
  const sorted = Float32Array.from(grid).sort();
  const lo = sorted[Math.floor(sorted.length * 0.03)], hi = sorted[Math.floor(sorted.length * 0.97)];
  const s = SIZE / (W - 1);
  let d = "", n = 0;
  for (let i = 1; i <= LEVELS; i++) {
    const level = lo + ((hi - lo) * i) / (LEVELS + 1);
    for (const raw of chain(segments(grid, W, level))) {
      const closed = Math.hypot(raw[0][0] - raw[raw.length - 1][0], raw[0][1] - raw[raw.length - 1][1]) < 0.01;
      if (raw.length < (closed ? 5 : 10)) continue;   // small closed loops are the peaks; keep them
      const line = simplify(raw.map(([x, y]) => [x * s, y * s]), 0.45);
      d += "M" + line.map(([x, y], k) => `${k ? "L" : ""}${x.toFixed(1)} ${y.toFixed(1)}`).join("");
      n++;
    }
  }
  return { svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" preserveAspectRatio="xMidYMid slice"><path d="${d}" fill="none" stroke="#2A2E28" stroke-width=".65" stroke-linejoin="round" stroke-linecap="round"/></svg>\n`, lines: n };
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
      const { svg, lines } = svgFor(grid, W);
      fs.writeFileSync(out, svg);
      console.log(`  ✓ ${t.key}.svg  (${t.name}, ${lines} lines, ${Math.round(svg.length / 1024)} KB)`);
    } catch (e) { console.log(`  ✗ ${t.key}: ${e.message}`); }
  }
  if (!dry) console.log("Now: node tools/build-rides.js && node scripts/build-events.js");
})();
