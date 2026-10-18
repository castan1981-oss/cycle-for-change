/*
  card.js — the route card (Oct 18, 2026). The route drawn as one line with its points named: start and finish, each
  climb with its height and mile, the host's regroup and coffee stops. Robert's reference: Eat Sleep Cycle Nice's
  "route of the month" post (a line over a photo, points with leader lines). Ours is Lane Paint: Overpass, sentence
  case, square plates, hairline leaders, nothing painted or grained.

  One layout, two painters:
    layout(series, climbs, opts)  → the projected line, the labelled points with their placed labels, the scale bar
    svg(L, theme)                 → markup for a page (the ride pages; the page's own Overpass applies)
    paint(ctx, L, theme, fonts)   → onto a canvas (the /brief/ poster, exported as a PNG)

  opts: { W, H, pad, units ("mi"|"km"), title, sub, date, cues: [{ m, t, k }], photo: bool }
  Runs in node (build-rides.js) as module.exports and in the browser as window.CARD.
*/
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.CARD = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const MI = 1609.344, FT = 0.3048;
  const comma = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function layout(series, climbs, opts = {}) {
    const W = opts.W || 1080, H = opts.H || 1350, pad = opts.pad || Math.round(W * 0.11);
    const units = opts.units || "mi";
    const unit = units === "mi" ? MI : 1000;
    const hU = units === "mi" ? "ft" : "m", hv = (m) => comma(units === "mi" ? m / FT : m);
    const mileWord = (m) => `${units === "mi" ? "mile" : "km"} ${(m / unit).toFixed(1).replace(/\.0$/, "")}`;
    // the drawing area leaves room for the title block at the top and the foot line at the bottom
    const top = opts.title ? Math.round(H * 0.22) : pad, bottom = opts.date || opts.foot ? Math.round(H * 0.1) : pad;
    let minLat = Infinity, maxLat = -Infinity, minLon = Infinity, maxLon = -Infinity;
    for (const p of series) { minLat = Math.min(minLat, p.lat); maxLat = Math.max(maxLat, p.lat); minLon = Math.min(minLon, p.lon); maxLon = Math.max(maxLon, p.lon); }
    const k = Math.cos(((minLat + maxLat) / 2) * Math.PI / 180);
    const w = (maxLon - minLon) * k || 1e-6, h = (maxLat - minLat) || 1e-6;
    const boxW = W - 2 * pad, boxH = H - top - bottom;
    const sc = Math.min(boxW / w, boxH / h);
    const ox = pad + (boxW - w * sc) / 2, oy = top + (boxH - h * sc) / 2;
    const X = (p) => ox + (p.lon - minLon) * k * sc, Y = (p) => oy + (maxLat - p.lat) * sc;
    const step = Math.max(1, Math.floor(series.length / 1500));
    const line = [];
    for (let i = 0; i < series.length; i += step) line.push([X(series[i]), Y(series[i])]);
    const last = series[series.length - 1];
    if (line[line.length - 1][0] !== X(last) || line[line.length - 1][1] !== Y(last)) line.push([X(last), Y(last)]);

    // the points worth naming
    const a = series[0], z = last;
    const loop = Math.hypot(X(a) - X(z), Y(a) - Y(z)) < W * 0.02;
    const pts = [];
    pts.push({ kind: "start", x: X(a), y: Y(a), lines: [loop ? "Start and finish" : "Start"] });
    if (!loop) pts.push({ kind: "finish", x: X(z), y: Y(z), lines: ["Finish"] });
    climbs.forEach((c, i) => {
      const p = series[c.i1];   // the top is the point people know
      pts.push({ kind: "climb", n: i + 1, x: X(p), y: Y(p), lines: [`Climb ${i + 1}`, `${hv(c.top_m)} ${hU} · ${mileWord(c.d1)}`] });
    });
    for (const cue of opts.cues || []) {
      if (!cue || typeof cue.m !== "number" || !cue.t || cue.k === "start" || cue.k === "finish" || cue.k === "turn") continue;
      const d = cue.m * unit;
      let lo = 0, hi = series.length - 1;
      while (lo < hi) { const mid = (lo + hi) >> 1; if (series[mid].d < d) lo = mid + 1; else hi = mid; }
      const p = series[lo];
      const head = cue.k === "regroup" ? "Regroup" : "Stop";
      const text = String(cue.t).replace(new RegExp(`^${head}\\b[:,]?\\s*`, "i"), "").slice(0, 40);   // "Regroup at 136th St" → "at 136th St"
      pts.push({ kind: cue.k || "stop", x: X(p), y: Y(p), lines: text ? [head, text] : [head] });
    }
    // place each label away from the line and from the labels already placed
    const fs = Math.round(W / 42), lh = fs * 1.3, padX = fs * 0.7;
    const charW = fs * 0.56;
    const placed = [];
    const dirs = [[1, -1], [1, 1], [-1, -1], [-1, 1], [1, 0], [-1, 0], [0, -1], [0, 1]];
    const reach = Math.round(W * 0.07);
    const cxAll = line.reduce((t, q) => t + q[0], 0) / line.length, cyAll = line.reduce((t, q) => t + q[1], 0) / line.length;
    const yMin = opts.title ? top - fs : pad * 0.4, yMax = opts.date || opts.foot ? H - bottom - fs * 2.2 : H - bottom * 0.5;   // never into the title block or the foot
    for (const pt of pts) {
      const bw = Math.max(...pt.lines.map((l) => l.length)) * charW + padX * 2, bh = pt.lines.length * lh + padX;
      let best = null;
      for (const mult of [1, 1.9]) for (const [dx, dy] of dirs) {
        const cx = pt.x + dx * reach * mult, cy = pt.y + dy * reach * mult;
        const bx = dx > 0 ? cx : dx < 0 ? cx - bw : cx - bw / 2, by = dy > 0 ? cy : dy < 0 ? cy - bh : cy - bh / 2;
        if (bx < pad * 0.4 || by < yMin || bx + bw > W - pad * 0.4 || by + bh > yMax) continue;
        let score = 0;
        // clear of the line: the nearest sampled point to the box, capped
        let near = Infinity;
        for (let i = 0; i < line.length; i += 6) { const [lx, ly] = line[i]; if (lx > bx - 10 && lx < bx + bw + 10 && ly > by - 10 && ly < by + bh + 10) { near = 0; break; } near = Math.min(near, Math.hypot(Math.max(bx - lx, 0, lx - bx - bw), Math.max(by - ly, 0, ly - by - bh))); }
        score += Math.min(near, 80);
        // outside the shape reads better than inside it
        const away = (dx * (pt.x - cxAll) + dy * (pt.y - cyAll)) / Math.max(1, Math.hypot(pt.x - cxAll, pt.y - cyAll));
        score += away * 25;
        score -= (mult - 1) * 30;   // nearer is better, all else equal
        for (const q of placed) { const ov = Math.max(0, Math.min(bx + bw, q.bx + q.bw) - Math.max(bx, q.bx) + 12) * Math.max(0, Math.min(by + bh, q.by + q.bh) - Math.max(by, q.by) + 12); score -= ov / 2; }
        if (best === null || score > best.score) best = { score, bx, by, bw, bh, lx: dx > 0 ? bx : dx < 0 ? bx + bw : bx + bw / 2, ly: dy > 0 ? by : dy < 0 ? by + bh : by + bh / 2 };
      }
      if (!best) best = { score: 0, bx: Math.min(W - pad * 0.4 - bw, pt.x + reach), by: Math.max(yMin, Math.min(yMax - bh, pt.y - bh / 2)), bw, bh, lx: pt.x + reach, ly: pt.y };
      pt.label = best;
      placed.push(best);
    }
    // a scale bar: a round number of miles or km about a fifth of the drawing's width
    const degPerM = 1 / 111195;
    const target = (boxW / 5) / sc / k / degPerM / unit;
    const nice = [1, 2, 5, 10, 20, 50].reduce((b, n) => (Math.abs(n - target) < Math.abs(b - target) ? n : b), 1);
    return { W, H, pad, top, bottom, fs, lh, padX, line, pts, loop, units, scale: { px: nice * unit * degPerM * k * sc, text: `${nice} ${units === "mi" ? "mi" : "km"}` }, title: opts.title || "", sub: opts.sub || "", date: opts.date || "", foot: opts.foot || "", photo: !!opts.photo };
  }

  const THEMES = {
    // plaster ground, asphalt line: the ride pages and the plain poster
    plaster: { bg: "#EFEDEA", line: "#1C1A22", lineW: 6, point: "#1C1A22", pointFg: "#EFEDEA", plate: "#EFEDEA", plateLine: "#1C1A22", text: "#1C1A22", mute: "#4A4E55", leader: "#1C1A22", accent: "#A84C58" },
    // over a photo: plaster line, plates on asphalt
    photo: { bg: "#1C1A22", line: "#EFEDEA", lineW: 7, point: "#EFEDEA", pointFg: "#1C1A22", plate: "#1C1A22", plateLine: "#EFEDEA", text: "#EFEDEA", mute: "#A9BDB8", leader: "#EFEDEA", accent: "#D9B1AA" },
  };

  function svg(L, themeName) {
    const T = THEMES[themeName || (L.photo ? "photo" : "plaster")];
    const d = L.line.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
    const out = [];
    out.push(`<svg viewBox="0 0 ${L.W} ${L.H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(L.title ? `${L.title}: the route, with its climbs marked` : "The route, with its climbs marked")}" style="font-family:Overpass,system-ui,sans-serif">`);
    if (!L.photo) out.push(`<rect width="${L.W}" height="${L.H}" fill="${T.bg}"/>`);
    out.push(`<path d="${d}" fill="none" stroke="${T.line}" stroke-width="${T.lineW}" stroke-linejoin="round" stroke-linecap="round"/>`);
    for (const p of L.pts) {
      const lb = p.label;
      out.push(`<line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${lb.lx.toFixed(1)}" y2="${lb.ly.toFixed(1)}" stroke="${T.leader}" stroke-width="2" stroke-dasharray="6 6"/>`);
      if (p.kind === "start") out.push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${L.fs * 0.5}" fill="${T.point}" stroke="${T.pointFg}" stroke-width="3"/>`);
      else if (p.kind === "climb") out.push(`<rect x="${(p.x - L.fs * 0.55).toFixed(1)}" y="${(p.y - L.fs * 0.55).toFixed(1)}" width="${L.fs * 1.1}" height="${L.fs * 1.1}" fill="${T.plate}" stroke="${T.plateLine}" stroke-width="3"/><text x="${p.x.toFixed(1)}" y="${(p.y + L.fs * 0.33).toFixed(1)}" text-anchor="middle" font-size="${L.fs * 0.9}" font-weight="800" fill="${T.text}">${p.n}</text>`);
      else out.push(`<rect x="${(p.x - L.fs * 0.45).toFixed(1)}" y="${(p.y - L.fs * 0.45).toFixed(1)}" width="${L.fs * 0.9}" height="${L.fs * 0.9}" fill="${T.point}" stroke="${T.pointFg}" stroke-width="3"/>`);
      out.push(`<rect x="${lb.bx.toFixed(1)}" y="${lb.by.toFixed(1)}" width="${lb.bw.toFixed(1)}" height="${lb.bh.toFixed(1)}" fill="${T.plate}" stroke="${T.plateLine}" stroke-width="2"/>`);
      p.lines.forEach((t, i) => out.push(`<text x="${(lb.bx + L.padX).toFixed(1)}" y="${(lb.by + L.padX * 0.55 + L.lh * (i + 0.8)).toFixed(1)}" font-size="${L.fs}" font-weight="${i === 0 ? 800 : 600}" fill="${i === 0 ? T.text : T.mute}">${esc(t)}</text>`));
    }
    // scale bar, bottom left of the drawing
    const sx = L.pad, sy = L.H - L.bottom - L.fs;
    out.push(`<g stroke="${T.line}" stroke-width="3"><line x1="${sx}" y1="${sy}" x2="${(sx + L.scale.px).toFixed(1)}" y2="${sy}"/><line x1="${sx}" y1="${sy - 10}" x2="${sx}" y2="${sy + 10}"/><line x1="${(sx + L.scale.px).toFixed(1)}" y1="${sy - 10}" x2="${(sx + L.scale.px).toFixed(1)}" y2="${sy + 10}"/></g><text x="${(sx + L.scale.px / 2).toFixed(1)}" y="${sy - 14}" text-anchor="middle" font-size="${L.fs * 0.9}" font-weight="700" fill="${T.mute}">${L.scale.text}</text>`);
    if (L.title) {
      const ts = Math.round(L.W / 12);
      out.push(`<text x="${L.pad}" y="${L.pad + ts * 0.9}" font-size="${ts}" font-weight="900" fill="${T.text}" letter-spacing="-0.02em">${esc(L.title)}</text>`);
      if (L.sub) out.push(`<text x="${L.pad}" y="${L.pad + ts * 0.9 + L.fs * 2}" font-size="${L.fs * 1.4}" font-weight="700" fill="${T.mute}">${esc(L.sub)}</text>`);
    }
    if (L.date || L.foot) {
      const fy = L.H - L.bottom * 0.45;
      out.push(`<line x1="${L.pad}" y1="${(fy - L.fs * 1.6).toFixed(1)}" x2="${L.W - L.pad}" y2="${(fy - L.fs * 1.6).toFixed(1)}" stroke="${T.line}" stroke-width="2"/>`);
      if (L.date) out.push(`<text x="${L.pad}" y="${fy}" font-size="${L.fs * 1.6}" font-weight="900" fill="${T.text}">${esc(L.date)}</text>`);
      if (L.foot) out.push(`<text x="${L.W - L.pad}" y="${fy}" text-anchor="end" font-size="${L.fs}" font-weight="700" fill="${T.mute}">${esc(L.foot)}</text>`);
    }
    out.push("</svg>");
    return out.join("");
  }

  // onto a canvas. `fonts` is the family string; call document.fonts.load first so Overpass is there.
  function paint(ctx, L, themeName, fonts = "Overpass, system-ui, sans-serif") {
    const T = THEMES[themeName || (L.photo ? "photo" : "plaster")];
    if (!L.photo) { ctx.fillStyle = T.bg; ctx.fillRect(0, 0, L.W, L.H); }
    ctx.lineJoin = "round"; ctx.lineCap = "round";
    ctx.strokeStyle = T.line; ctx.lineWidth = T.lineW;
    ctx.beginPath(); L.line.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke();
    for (const p of L.pts) {
      const lb = p.label;
      ctx.setLineDash([6, 6]); ctx.strokeStyle = T.leader; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(lb.lx, lb.ly); ctx.stroke(); ctx.setLineDash([]);
      if (p.kind === "start") { ctx.fillStyle = T.point; ctx.strokeStyle = T.pointFg; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(p.x, p.y, L.fs * 0.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
      else if (p.kind === "climb") { ctx.fillStyle = T.plate; ctx.strokeStyle = T.plateLine; ctx.lineWidth = 3; ctx.fillRect(p.x - L.fs * 0.55, p.y - L.fs * 0.55, L.fs * 1.1, L.fs * 1.1); ctx.strokeRect(p.x - L.fs * 0.55, p.y - L.fs * 0.55, L.fs * 1.1, L.fs * 1.1); ctx.fillStyle = T.text; ctx.font = `800 ${L.fs * 0.9}px ${fonts}`; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic"; ctx.fillText(String(p.n), p.x, p.y + L.fs * 0.33); }
      else { ctx.fillStyle = T.point; ctx.strokeStyle = T.pointFg; ctx.lineWidth = 3; ctx.fillRect(p.x - L.fs * 0.45, p.y - L.fs * 0.45, L.fs * 0.9, L.fs * 0.9); ctx.strokeRect(p.x - L.fs * 0.45, p.y - L.fs * 0.45, L.fs * 0.9, L.fs * 0.9); }
      ctx.fillStyle = T.plate; ctx.strokeStyle = T.plateLine; ctx.lineWidth = 2; ctx.fillRect(lb.bx, lb.by, lb.bw, lb.bh); ctx.strokeRect(lb.bx, lb.by, lb.bw, lb.bh);
      ctx.textAlign = "left";
      p.lines.forEach((t, i) => { ctx.fillStyle = i === 0 ? T.text : T.mute; ctx.font = `${i === 0 ? 800 : 600} ${L.fs}px ${fonts}`; ctx.fillText(t, lb.bx + L.padX, lb.by + L.padX * 0.55 + L.lh * (i + 0.8)); });
    }
    const sx = L.pad, sy = L.H - L.bottom - L.fs;
    ctx.strokeStyle = T.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + L.scale.px, sy); ctx.moveTo(sx, sy - 10); ctx.lineTo(sx, sy + 10); ctx.moveTo(sx + L.scale.px, sy - 10); ctx.lineTo(sx + L.scale.px, sy + 10); ctx.stroke();
    ctx.fillStyle = T.mute; ctx.font = `700 ${L.fs * 0.9}px ${fonts}`; ctx.textAlign = "center"; ctx.fillText(L.scale.text, sx + L.scale.px / 2, sy - 14);
    if (L.title) {
      const ts = Math.round(L.W / 12);
      ctx.textAlign = "left"; ctx.fillStyle = T.text; ctx.font = `900 ${ts}px ${fonts}`; ctx.fillText(L.title, L.pad, L.pad + ts * 0.9);
      if (L.sub) { ctx.fillStyle = T.mute; ctx.font = `700 ${L.fs * 1.4}px ${fonts}`; ctx.fillText(L.sub, L.pad, L.pad + ts * 0.9 + L.fs * 2); }
    }
    if (L.date || L.foot) {
      const fy = L.H - L.bottom * 0.45;
      ctx.strokeStyle = T.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(L.pad, fy - L.fs * 1.6); ctx.lineTo(L.W - L.pad, fy - L.fs * 1.6); ctx.stroke();
      if (L.date) { ctx.textAlign = "left"; ctx.fillStyle = T.text; ctx.font = `900 ${L.fs * 1.6}px ${fonts}`; ctx.fillText(L.date, L.pad, fy); }
      if (L.foot) { ctx.textAlign = "right"; ctx.fillStyle = T.mute; ctx.font = `700 ${L.fs}px ${fonts}`; ctx.fillText(L.foot, L.W - L.pad, fy); }
    }
  }

  return { layout, svg, paint, THEMES };
});
