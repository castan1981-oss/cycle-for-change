/*
  bw.js — the black-and-white poster (Oct 30, 2026). Robert's pick from a Ventum × Society of Cyclist pop-up ride
  post ("goes over a picture well"): the rider's photo in black and white, the route as one white line with a dot at
  each end, the ride's name top left, the distance and climbing up the right edge, CYCLE FOR over the day and the
  roll-out time bottom right, the link bottom left.

  The one place the site's words sit on a photo and run in spaced capitals: inside this picture, never on a page
  (Robert's OK, Oct 30, 2026; CLAUDE.md §12). Everything else is the house's: Overpass, the stencil from chrome.js,
  powder rose for the blank, no wash, no grain, no shadow.

    layout(series, opts) → the line, the dots and where every word goes, for one size (no canvas needed: tested in node)
    paint(ctx, L, photo) → onto a canvas; photo is a canvas from gray(), or null for the plain tar ground
    gray(img)            → the rider's photo as a black-and-white canvas, at most 2400 px on the long side

  opts: { W, H, safeTop, safeBot, title, side, lines: [], foot }
  Sizes: a feed post is 1080 × 1350; a Story is 1080 × 1920 with the top 200 and bottom 330 left clear for Instagram's
  bars (as the print and social kit does).
  Runs in node as module.exports and in the browser as window.BW.
*/
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.BW = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const WHITE = "#FFFFFF", TAR = "#141218", ROSE = "#D9B1AA";   // powder rose: the blank on a dark ground
  const DIM = 0.22;                                               // the photo under a flat 22% tar so white words read
  const CAP = 0.7;                                                // Overpass cap height, in em
  const SIZES = { post: { W: 1080, H: 1350, safeTop: 0, safeBot: 0 }, story: { W: 1080, H: 1920, safeTop: 200, safeBot: 330 } };

  // the stencil's letter paths, as chrome.js draws them (MARK): CYCLE FOR on a 150-high grid, then the blank
  const LP = {
    C: "M52 34 V24 Q52 8 36 8 H33 M27 8 H24 Q8 8 8 24 V126 Q8 142 24 142 H27 M33 142 H36 Q52 142 52 126 V116",
    Y: "M11 4 L30 68 L49 4 M30 68 V150",
    L: "M8 0 V150 M22 142 H54",
    E: "M8 0 V150 M22 8 H54 M22 75 H47 M22 142 H54",
    F: "M8 0 V150 M22 8 H54 M22 75 H47",
    O: "M27 8 H24 Q8 8 8 24 V126 Q8 142 24 142 H27 M33 8 H36 Q52 8 52 24 V126 Q52 142 36 142 H33",
    R: "M8 0 V150 M22 8 H36 Q52 8 52 24 V58 Q52 74 36 74 H22 M33 90 L50 150",
  };
  const ROW = [["C", 0], ["Y", 74], ["C", 148], ["L", 222], ["E", 296], ["F", 414], ["O", 488], ["R", 562]];
  const STENCIL_W = 750;   // the stencil and its bar, in the 150-high drawing

  const up = (s) => String(s || "").trim().toUpperCase();

  function layout(series, opts = {}) {
    const W = opts.W || 1080, H = opts.H || 1350, M = 54;
    const top = (opts.safeTop || 0) + M, bottom = H - (opts.safeBot || 0) - M;
    const foot = up(opts.foot), lines = (opts.lines || []).map(up).filter(Boolean);
    const SP = { size: 22, lh: 31, track: 0.05 }, IN = { size: 30, lh: 42, track: 0.04 };
    const footTop = foot ? bottom - SP.size * CAP : bottom;
    const infoLast = foot ? footTop - 66 : bottom;                       // baseline of the last info line
    const infoTop = lines.length ? infoLast - (lines.length - 1) * IN.lh - IN.size * CAP : infoLast + 34;
    const logoH = 44, logoTop = infoTop - 36 - logoH;
    const box = { x: M + 4, y: top + 84, w: W - 2 * M - 70, h: logoTop - 52 - (top + 84) };

    // the line: lat/lon onto the page, fitted to the box and centred in it
    let minLat = Infinity, maxLat = -Infinity, minLon = Infinity, maxLon = -Infinity;
    for (const p of series) { minLat = Math.min(minLat, p.lat); maxLat = Math.max(maxLat, p.lat); minLon = Math.min(minLon, p.lon); maxLon = Math.max(maxLon, p.lon); }
    const k = Math.cos(((minLat + maxLat) / 2) * Math.PI / 180);
    const w = (maxLon - minLon) * k || 1e-6, h = (maxLat - minLat) || 1e-6;
    const sc = Math.min(box.w / w, box.h / h) * 0.94;
    const ox = box.x + (box.w - w * sc) / 2, oy = box.y + (box.h - h * sc) / 2;
    const X = (p) => ox + (p.lon - minLon) * k * sc, Y = (p) => oy + (maxLat - p.lat) * sc;
    const step = Math.max(1, Math.floor(series.length / 2500));
    const line = [];
    for (let i = 0; i < series.length; i += step) line.push([X(series[i]), Y(series[i])]);
    const z = series[series.length - 1];
    line.push([X(z), Y(z)]);
    const lineW = 7, dot = 14;
    const a = line[0], b = line[line.length - 1];
    const dots = [a];
    if (Math.hypot(a[0] - b[0], a[1] - b[1]) > dot * 6) dots.push(b);   // a loop gets one dot

    return {
      W, H, M, top, bottom, box, line, lineW, dots, dot,
      title: { text: up(opts.title), x: M, y: top + 30 * CAP, size: 30, track: 0.06, maxW: W - 2 * M },
      side: { text: up(opts.side), x: W - M, y: top + 70, size: 26, track: 0.06, maxW: logoTop - 40 - (top + 70) },
      logo: { x: W - M - STENCIL_W * logoH / 150, y: logoTop, h: logoH },
      lines: lines.map((t, i) => ({ text: t, x: W - M, y: infoTop + IN.size * CAP + i * IN.lh, size: IN.size, track: IN.track, maxW: W - 2 * M })),
      foot: foot ? { text: foot, x: M, y: footTop + SP.size * CAP, size: SP.size, track: SP.track, maxW: W - 2 * M } : null,
    };
  }

  // ---- canvas ----
  const FONTS = "Overpass, system-ui, sans-serif";
  function widthOf(ctx, text, size, track) {
    ctx.font = `400 ${size}px ${FONTS}`;
    let w = 0; const ch = [...text];
    for (const c of ch) w += ctx.measureText(c).width;
    return w + track * size * Math.max(0, ch.length - 1);
  }
  // spaced capitals, one letter at a time; a "|" is drawn as a clean rule at cap height, not the font's long bar
  function words(ctx, T, align) {
    let size = T.size;
    for (let i = 0; i < 6; i++) { const w = widthOf(ctx, T.text, size, T.track); if (w <= T.maxW) break; size = Math.max(15, size * T.maxW / w * 0.995); }
    const total = widthOf(ctx, T.text, size, T.track);
    let x = align === "right" ? -total : 0;
    ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
    for (const c of T.text) {
      const cw = ctx.measureText(c).width;
      if (c === "|") { const lw = Math.max(2, size * 0.065); ctx.fillRect(x + cw / 2 - lw / 2, -size * CAP, lw, size * CAP); }
      else ctx.fillText(c, x, 0);
      x += cw + T.track * size;
    }
  }
  function at(ctx, T, align, rotate) {
    ctx.save(); ctx.translate(T.x, T.y); if (rotate) ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = WHITE; words(ctx, T, align); ctx.restore();
  }
  let P2 = null;
  function stencil(ctx, x, y, h) {
    if (!P2) { P2 = {}; for (const k in LP) P2[k] = new Path2D(LP[k]); }
    const k = h / 150;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    ctx.beginPath(); ctx.rect(-20, 0, 900, 150); ctx.clip();
    ctx.strokeStyle = WHITE; ctx.lineWidth = 18; ctx.lineJoin = "round"; ctx.lineCap = "butt";   // stroke 18 under 120px
    for (const [l, dx] of ROW) { ctx.save(); ctx.translate(dx, 0); ctx.stroke(P2[l]); ctx.restore(); }
    ctx.fillStyle = ROSE; ctx.fillRect(652, 114, 98, 36);
    ctx.restore();
  }

  function paint(ctx, L, photo) {
    const { W, H } = L;
    ctx.fillStyle = TAR; ctx.fillRect(0, 0, W, H);
    if (photo) {
      const r = Math.max(W / photo.width, H / photo.height), pw = photo.width * r, ph = photo.height * r;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(photo, (W - pw) / 2, (H - ph) / 2, pw, ph);
      ctx.fillStyle = `rgba(20,18,24,${DIM})`; ctx.fillRect(0, 0, W, H);
    }
    ctx.strokeStyle = WHITE; ctx.lineWidth = L.lineW; ctx.lineJoin = "round"; ctx.lineCap = "round";
    ctx.beginPath(); L.line.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke();
    ctx.fillStyle = WHITE;
    for (const [x, y] of L.dots) { ctx.beginPath(); ctx.arc(x, y, L.dot, 0, Math.PI * 2); ctx.fill(); }
    if (L.title.text) at(ctx, L.title, "left");
    if (L.side.text) at(ctx, L.side, "right", true);
    stencil(ctx, L.logo.x, L.logo.y, L.logo.h);
    for (const T of L.lines) at(ctx, T, "right");
    if (L.foot) at(ctx, L.foot, "left");
  }

  function gray(img) {
    const MAX = 2400, k = Math.min(1, MAX / Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height));
    const w = Math.round((img.naturalWidth || img.width) * k), h = Math.round((img.naturalHeight || img.height) * k);
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    const x = c.getContext("2d"); x.imageSmoothingQuality = "high"; x.drawImage(img, 0, 0, w, h);
    const d = x.getImageData(0, 0, w, h), a = d.data;
    for (let i = 0; i < a.length; i += 4) { const y = 0.2126 * a[i] + 0.7152 * a[i + 1] + 0.0722 * a[i + 2]; a[i] = a[i + 1] = a[i + 2] = y; }
    x.putImageData(d, 0, 0);
    return c;
  }

  return { layout, paint, gray, SIZES };
});
