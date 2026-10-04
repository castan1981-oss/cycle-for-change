/* scripts/towns-map.js — the tap-a-town map on /towns/ (Oct 3, 2026)

   Robert, on his phone at /towns/: "we need … a better USA map showing a way to click on them."
   One map, every town on it, each one a link. Full guides are the solid rings; event towns are
   hollow. A state with towns is a link to its page (desktop only — on a phone the bubbles are the
   way in). Same canvas as /rides/united-states/ (data/geo/outlines.json → `us`, the Albers USA
   composite us-atlas draws at 975×610), so a town is placed by the same projection us-atlas used:
   d3.geoAlbersUsa().scale(1300).translate([487.5, 305]) — written out here, no library.

   On a phone (/rides/map.js, the Pass 17 pattern): the labels hide and the map shows one bubble per
   region (towns within REGION_MI of each other). A single town is a pale bubble that links to it; a
   region of several is a dark bubble that zooms the map in to its own layer of towns, laid out at
   that zoom. Chips under the map do the same for a thumb. Sizes on the overview are in viewBox
   units scaled by U (units per screen pixel at phone width), so a bubble is a 44px tap and its name
   is 12px on a 360px screen. Desktop, or without JS, is the plain labelled map.

   Exports: townsMap(towns) → the <figure> html, or "" without the geo file. */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const GEO = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, "data", "geo", "outlines.json"), "utf8")); } catch (e) { return null; } })();

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const attr = esc;
const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const n1 = (v) => Math.round(v * 10) / 10;
const n2 = (v) => Math.round(v * 100) / 100;
const rad = Math.PI / 180;

// ——— Albers USA, as d3 draws it ——————————————————————————————————————————
// conicEqualAreaRaw(φ0, φ1) from d3-geo, then d3's recenter: X = k·x + (tx − k·cx), Y = (ty + k·cy) − k·y,
// where (cx, cy) is the raw projection of `center` in the rotated frame (d3 centres after rotating).
function conic({ parallels: [p0, p1], rotate, center, scale: k, translate: [tx, ty] }) {
  const sy0 = Math.sin(p0 * rad), n = (sy0 + Math.sin(p1 * rad)) / 2;
  const c = 1 + sy0 * (2 * n - sy0), r0 = Math.sqrt(c) / n;
  const raw = (lam, phi) => { const r = Math.sqrt(c - 2 * n * Math.sin(phi)) / n, x = lam * n; return [r * Math.sin(x), r0 - r * Math.cos(x)]; };
  const [cx, cy] = raw(center[0] * rad, center[1] * rad);
  const dx = tx - k * cx, dy = ty + k * cy;
  return (lng, lat) => {
    const lam = (((lng + rotate) + 540) % 360) - 180;
    const [x, y] = raw(lam * rad, lat * rad);
    return [k * x + dx, dy - k * y];
  };
}
const K = 1300, TX = 487.5, TY = 305;
const lower48 = conic({ parallels: [29.5, 45.5], rotate: 96, center: [-0.6, 38.7], scale: K, translate: [TX, TY] });
const alaska = conic({ parallels: [55, 65], rotate: 154, center: [-2, 58.5], scale: K * 0.35, translate: [TX - 0.307 * K, TY + 0.201 * K] });
const hawaii = conic({ parallels: [8, 18], rotate: 157, center: [-3, 19.9], scale: K, translate: [TX - 0.205 * K, TY + 0.212 * K] });
function albersUsa(lng, lat) {
  if (lat > 50) return alaska(lng, lat);
  if (lat < 30 && lng < -140) return hawaii(lng, lat);
  return lower48(lng, lat);
}

// even-odd test against a state's outline ("M x,y L x,y … Z"), so the build can prove a town sits in its state
const RINGS = new Map();
function inside(d, x, y) {
  let rings = RINGS.get(d);
  if (!rings) RINGS.set(d, (rings = d.split("M").filter(Boolean).map((r) => r.replace(/Z/g, "").split("L").map((q) => q.split(",").map(Number)))));
  let hit = false;
  for (const r of rings) for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i], [xj, yj] = r[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const miles = (a, b) => {
  const toR = (v) => v * rad, dLat = toR(b.lat - a.lat), dLon = toR(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * 3958.8 * Math.asin(Math.sqrt(h));
};

// names around rings: right, left, above, below, then the corners — the first clear of the edges, every
// ring and the names already placed (the placer from tools/build-rides.js, Pass 17). items: [{ x, y, rr, text, n }]
function placeNames(items, W, H, FS, { fallback = false, small = null } = {}) {
  const boxes = items.map((it) => ({ x0: it.x - it.rr - 2, x1: it.x + it.rr + 2, y0: it.y - it.rr - 2, y1: it.y + it.rr + 2, it }));
  return [...items].sort((a, b) => (b.n || 0) - (a.n || 0)).map((it) => {
    const { x, y, rr } = it, text = String(it.text).toUpperCase(), cnt = it.n != null ? ` ${it.n}` : "", g = rr + 5;
    const order = x > W * 0.62 ? ["l", "r", "tl", "bl", "t", "b", "tr", "br"] : ["r", "l", "tr", "br", "t", "b", "tl", "bl"];
    const clear = (b) => b.x0 >= 0 && b.x1 <= W && b.y0 >= 0 && b.y1 <= H && !boxes.some((o) => o.it !== it && b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0);
    let first = null;
    for (const fs of small ? [FS, small] : [FS]) {
      const w = (text.length + cnt.length) * fs * 0.62 + 6;
      const spots = { r: [x + g, y + fs * 0.35, "start"], l: [x - g, y + fs * 0.35, "end"], t: [x, y - g - 2, "middle"], b: [x, y + g + fs * 0.8, "middle"],
        tr: [x + g * 0.7, y - g * 0.7, "start"], br: [x + g * 0.7, y + g * 0.7 + fs * 0.8, "start"], tl: [x - g * 0.7, y - g * 0.7, "end"], bl: [x - g * 0.7, y + g * 0.7 + fs * 0.8, "end"] };
      const boxOf = ([tx, ty, a]) => ({ x0: a === "start" ? tx - 2 : a === "end" ? tx - w + 2 : tx - w / 2, x1: a === "start" ? tx + w - 2 : a === "end" ? tx + 2 : tx + w / 2, y0: ty - fs * 0.82, y1: ty + fs * 0.25 });
      first ||= spots[order[0]];
      for (const k of order) { const b = boxOf(spots[k]); if (clear(b)) { boxes.push({ ...b, it: null }); return { it, text, cnt, spot: spots[k], fs }; } }
    }
    return { it, text, cnt, spot: fallback ? first : null, fs: FS };
  });
}

// towns within REGION_MI of each other are one region (a chain counts: A–B and B–C makes A–B–C)
const REGION_MI = 160;
function regionsOf(towns) {
  const up = towns.map((_, i) => i);
  const root = (i) => (up[i] === i ? i : (up[i] = root(up[i])));
  for (let i = 0; i < towns.length; i++) for (let j = i + 1; j < towns.length; j++) if (miles(towns[i], towns[j]) <= REGION_MI) up[root(i)] = root(j);
  const groups = {};
  towns.forEach((t, i) => (groups[root(i)] ||= []).push(t));
  return Object.values(groups).map((ts) => {
    ts.sort((a, b) => (b.full ? 1 : 0) - (a.full ? 1 : 0) || a.name.localeCompare(b.name));
    const oneState = ts.every((t) => t.state === ts[0].state);
    return { towns: ts, n: ts.length, name: ts.length === 1 ? ts[0].name : oneState ? ts[0].state : `${ts[0].name} area`, key: slugify(ts.length > 1 && oneState ? ts[0].state : ts[0].name) };
  }).sort((a, b) => b.n - a.n || a.name.localeCompare(b.name));
}

const kindWord = (t) => (t.full ? "full guide" : "event town");

function townsMap(townsIn) {
  if (!GEO || !GEO.us || !GEO.nation) return "";
  const W = GEO.us.w, H = GEO.us.h;
  const U = W / 360;   // viewBox units per screen pixel on a 360px phone: the overview's sizes are in these
  const towns = townsIn.map((t) => {
    const [x, y] = albersUsa(t.lon, t.lat);
    const st = GEO.us.states[t.state_code];
    if (st && !inside(st.d, x, y)) throw new Error(`towns-map: ${t.id} (${t.lat}, ${t.lon}) does not land inside ${t.state_code} on the map — check its lat/lon`);
    return { id: t.id, name: t.name, state: t.state, code: t.state_code, slug: t.state_slug, url: t.url, lat: t.lat, lng: t.lon, x, y, full: t.kind === "destination" };
  });
  const byState = {};
  for (const t of towns) (byState[t.code] ||= []).push(t);

  // the states: every outline, the ones with towns a shade deeper and a link to their page
  const states = Object.entries(GEO.us.states).map(([code, s]) => {
    const ts = byState[code];
    const p = `<path class="tw-st${ts ? " tw-st--on" : ""}" d="${s.d}"/>`;
    return ts ? `<a href="/events/state/${ts[0].slug}/" aria-label="${attr(`${ts[0].state}: ${ts.length === 1 ? "1 town" : `${ts.length} towns`}`)}">${p}</a>` : p;
  }).join("\n          ");

  // the towns, labelled (desktop): full guides placed first so they keep the best spots
  const FS = 14;
  const placed = placeNames(towns.map((t) => ({ x: t.x, y: t.y, rr: t.full ? 7.5 : 6, text: t.name, n: t.full ? 1 : 0, t })), W, H, FS, { small: 12 });
  const labels = placed.map(({ it, text, spot, fs }) => {
    const t = it.t;
    const ring = `<circle class="gr-map-hub${t.full ? " gr-map-hub--here" : ""}" cx="${n1(t.x)}" cy="${n1(t.y)}" r="${t.full ? 7.5 : 6}"/>`;
    const label = spot ? `<text x="${n1(spot[0])}" y="${n1(spot[1])}" text-anchor="${spot[2]}"${fs !== FS ? ` style="font-size:${fs}px"` : ""}><tspan class="gr-map-name">${esc(text)}</tspan></text>` : "";
    return `<a href="${t.url}" aria-label="${attr(`${t.name}, ${t.state} — ${kindWord(t)}`)}">${ring}${label}</a>`;
  }).join("");

  // the phone: a bubble per region, nudged apart so none overlap (by their tap circles, not just the drawn dot)
  const regions = regionsOf(towns);
  const HIT = 22 * U, NAME_FS = 12.5 * U, NUM_FS = 15 * U;
  const bubs = regions.map((g) => ({
    g, x: g.towns.reduce((s, t) => s + t.x, 0) / g.n, y: g.towns.reduce((s, t) => s + t.y, 0) / g.n,
    r: U * (g.n > 1 ? 12 + 2.4 * Math.sqrt(g.n) : 9), hit: HIT,
  }));
  for (let pass = 0; pass < 80; pass++) {
    let moved = false;
    for (let i = 0; i < bubs.length; i++) for (let j = i + 1; j < bubs.length; j++) {
      const a = bubs[i], b = bubs[j], need = a.hit + b.hit + 2 * U;
      let dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
      if (d >= need) continue;
      if (d < 0.01) { dx = 1; dy = 0.5; d = Math.hypot(dx, dy); }
      const push = (need - d) / 2, ux = dx / d, uy = dy / d;
      a.x -= ux * push; a.y -= uy * push; b.x += ux * push; b.y += uy * push; moved = true;
    }
    for (const b of bubs) { b.x = Math.min(W - b.hit, Math.max(b.hit, b.x)); b.y = Math.min(H - b.hit, Math.max(b.hit, b.y)); }
    if (!moved) break;
  }
  const named = new Map(placeNames(bubs.map((b) => ({ x: b.x, y: b.y, rr: b.r, text: b.g.name, n: b.g.n, b })), W, H, NAME_FS, { small: 11 * U }).map((p) => [p.it.b, p]));
  const regionsSvg = bubs.map((b) => {
    const { g } = b, one = g.n === 1, p = named.get(b);
    const name = p && p.spot ? `<text class="gr-map-reg-name" x="${n1(p.spot[0])}" y="${n1(p.spot[1])}" text-anchor="${p.spot[2]}"${p.fs !== NAME_FS ? ` style="font-size:${n1(p.fs)}px"` : ""}>${esc(p.text)}</text>` : "";
    const num = one ? "" : `<text class="gr-map-reg-n" x="${n1(b.x)}" y="${n1(b.y + NUM_FS * 0.35)}" text-anchor="middle">${g.n}</text>`;
    const inner = `<circle class="gr-map-reg-hit" cx="${n1(b.x)}" cy="${n1(b.y)}" r="${n1(b.hit)}"/><circle class="gr-map-reg-dot${one && g.towns[0].full ? " gr-map-reg-dot--full" : ""}" cx="${n1(b.x)}" cy="${n1(b.y)}" r="${n1(b.r)}"/>${num}${name}`;
    return one
      ? `<a class="gr-map-reg gr-map-reg--one" href="${g.towns[0].url}" aria-label="${attr(`${g.towns[0].name}, ${g.towns[0].state} — ${kindWord(g.towns[0])}`)}">${inner}</a>`
      : `<g class="gr-map-reg" data-reg="${g.key}" role="button" tabindex="0" aria-label="${attr(`${g.name}: ${g.n} towns. Zoom in`)}">${inner}</g>`;
  }).join("");

  // a layer per region of several towns, drawn for its zoom: names placed on a canvas the size of the
  // map, then shrunk by the zoom so they come out the same size on screen as on the overview
  const ZFS = 12.5 * U;
  const zooms = regions.filter((g) => g.n > 1).map((g) => {
    const xs = g.towns.map((t) => t.x), ys = g.towns.map((t) => t.y);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const z = Math.max(2, Math.min(9, (W * 0.5) / Math.max(x1 - x0, 1), (H * 0.5) / Math.max(y1 - y0, 1)));
    const vb = [(x0 + x1) / 2 - W / (2 * z), (y0 + y1) / 2 - H / (2 * z), W / z, H / z];
    const toC = ([x, y]) => [(x - vb[0]) * z, (y - vb[1]) * z], u = (v) => n2(v / z);
    const at = (c, i) => n2(vb[i] + c / z);
    const placedZ = placeNames(g.towns.map((t, i) => { const [cx, cy] = toC([t.x, t.y]); return { x: cx, y: cy, rr: 9 * U, text: t.name, n: t.full ? 1 : 0, t, i }; }), W, H, ZFS, { fallback: true });
    const items = placedZ.map(({ it, text, spot }) => {
      const t = it.t;
      const label = spot ? `<text x="${at(spot[0], 0)}" y="${at(spot[1], 1)}" text-anchor="${spot[2]}" style="font-size:${u(ZFS)}px;stroke-width:${u(4 * U)}px"><tspan class="gr-map-name">${esc(text)}</tspan><tspan class="gr-map-n"> ${t.full ? "full guide" : "event"}</tspan></text>` : "";
      return `<a href="${t.url}" aria-label="${attr(`${t.name}, ${t.state} — ${kindWord(t)}`)}"><circle class="gr-map-zhit" cx="${n1(t.x)}" cy="${n1(t.y)}" r="${u(HIT)}"/><circle class="gr-map-hub${t.full ? " gr-map-hub--here" : ""}" cx="${n1(t.x)}" cy="${n1(t.y)}" r="${u((t.full ? 8 : 6.5) * U)}"/>${label}</a>`;
    }).join("");
    return `<g class="gr-map-zoom" data-reg="${g.key}" data-vb="${vb.map(n2).join(" ")}" data-paths="${attr(g.towns.map((t) => t.url).join(" "))}">${items}</g>`;
  }).join("");
  const multi = regions.filter((g) => g.n > 1);
  const chips = `<div class="gr-map-chips" role="group" aria-label="Zoom the map">
          <button type="button" class="gr-chip" data-reg="" aria-pressed="true">Every town</button>${multi.map((g) => `
          <button type="button" class="gr-chip" data-reg="${g.key}" aria-pressed="false">${esc(g.name)} <span class="gr-map-chip-n">${g.n}</span></button>`).join("")}
        </div>`;

  const full = towns.filter((t) => t.full).length;
  return `
      <figure class="gr-map gr-map--us gr-map--towns${multi.length ? " gr-map--zoomable" : ""}">
        <svg class="gr-map-svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="towns-map-t"><title id="towns-map-t">Map of the United States: ${towns.length} towns with a guide, ${full} of them full guides. Tap a town.</title>
          <g class="tw-states">
          ${states}
          </g>
          <path class="gr-map-edge" d="${GEO.nation.d}"/>
          <g class="gr-map-labels">${labels}</g>
          <g class="gr-map-regions">${regionsSvg}</g>
          ${zooms}
        </svg>
        <button type="button" class="gr-chip gr-map-back" aria-label="Back to every town">&larr; Every town</button>
        ${chips}
        <figcaption class="tw-key"><span><i class="tw-sw tw-sw--full"></i>Full guide</span><span><i class="tw-sw"></i>Event town</span><span class="tw-key-hint tw-key-ph">Tap a town</span><span class="tw-key-hint tw-key-desk">Tap a town, or a state for its towns</span></figcaption>
      </figure>`;
}

module.exports = { townsMap, albersUsa, regionsOf, REGION_MI };
