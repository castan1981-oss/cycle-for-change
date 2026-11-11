/*
  bw.js — the black-and-white poster (Oct 30, 2026). Robert's pick from a Ventum × Society of Cyclist pop-up ride
  post ("goes over a picture well"): the rider's photo in black and white, the route as one white line with a dot at
  each end, the ride's name top left, the distance and climbing up the right edge, the mark (cycle for and its plate)
  over the day and the roll-out time bottom right, the link bottom left.

  The one place the site's words sit on a photo and run in spaced capitals: inside this picture, never on a page
  (Robert's OK, Oct 30, 2026; CLAUDE.md §12). Everything else is the house's: Overpass, the mark from
  scripts/mark-2027.js with its pink plate (Nov 11, 2026; it was the caps stencil with a powder-rose bar), no wash, no
  grain, no shadow.

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
  const WHITE = "#FFFFFF", TAR = "#141218", PINK = "#C2557F";   // the pink: the mark's plate, on a light ground or a dark one
  const DIM = 0.22;                                               // the photo under a flat 22% tar so white words read
  const CAP = 0.7;                                                // Overpass cap height, in em
  const SIZES = { post: { W: 1080, H: 1350, safeTop: 0, safeBot: 0 }, story: { W: 1080, H: 1920, safeTop: 200, safeBot: 330 } };

  // the mark's paths, as scripts/mark-2027.js draws them (traced from the ASSOS proof; never a font): "cycle", "for",
  // then the plate, on a 514 × 97 drawing. tools/test/brief-bw.test.js keeps this copy the same as that file's.
  const MARK = {
    w: 514, h: 97,
    cycle: [
      "M 202.2 48L 225 47.9C 222.5 38.5 212 33.9 203.4 38C 194.5 42.2 191.8 53.4 197.6 61.2C 203.4 69.1 215 69.7 221.7 62.3C 223.3 60.5 226.1 60.7 227.6 62.4C 229.2 64.1 228.9 66.4 227.3 68.2C 219.5 76.5 206.9 78 197.4 71.9C 187.8 65.8 183.8 53.7 188.3 43C 192.6 32.6 203.7 26.5 215 28.9C 225.7 31.2 233.8 40.7 233.7 52.1C 233.6 54.3 231.8 56 229.5 56L 202.2 56C 200 56 198.4 54 198.3 52.1C 198.3 50.1 199.8 48 202.2 48",
      "M 140.1 40.6C 133.8 35 124.4 35.1 118.5 40.9C 112.5 46.8 112.4 56.5 118.1 62.6C 124 68.9 133.6 69.2 140 63.4C 141.7 61.9 144.3 62.4 145.6 64C 147.2 65.8 146.7 68.2 144.9 69.8C 135.3 78.2 121 77.3 112.3 68.2C 103.6 59.1 103.7 44.7 112.4 35.6C 121.2 26.5 135.7 25.9 145.2 34.5C 146.9 36 146.9 38.3 145.6 40C 144.5 41.4 141.9 42.2 140.1 40.6",
      "M 36.6 40.6C 30.2 35 20.8 35.1 14.8 41.1C 9 47 8.9 56.6 14.6 62.7C 20.4 68.7 29.9 69.2 36.4 63.5C 38.1 62 40.6 62.3 42 64C 43.5 65.7 43.3 68.1 41.5 69.7C 31.9 78.2 17.5 77.4 8.8 68.3C 0.1 59.1 0.1 44.7 8.9 35.5C 17.7 26.5 32.3 25.9 41.7 34.5C 43.4 36 43.4 38.3 42.1 40C 41 41.4 38.4 42.2 36.6 40.6",
      "M 174.8 67.5C 177.2 67.5 179 69.4 179 71.5C 179 73.7 177.3 75.6 175 75.6L 169.7 75.6C 163.5 75.6 157.8 70.5 157.8 63.9L 157.8 4C 157.8 1.6 159.9 -0 161.8 0C 164.1 0.1 165.8 1.8 165.8 4.2L 165.8 63.4C 165.8 65.8 167.8 67.5 170 67.5L 174.8 67.5",
      "M 69.8 93.7C 68.8 95.8 66.2 96.2 64.6 95.5C 62.6 94.6 61.5 92.3 62.5 90.2L 90.5 31C 91.6 28.8 93.9 27.8 96 28.8C 98.2 29.9 98.9 32.2 97.8 34.5L 69.8 93.7",
      "M 73.9 56.6C 75 59 74.2 61.3 72.1 62.4C 70 63.4 67.6 62.3 66.6 60.1L 54.7 34.3C 53.7 32.2 54.5 29.8 56.5 28.8C 58.5 27.9 61 28.6 62 30.8L 73.9 56.6",
    ],
    for: [
      "M 326.1 37.2C 319.6 39.4 315.3 45.2 315.3 51.8C 315.2 58.6 319.4 64.5 325.9 66.8C 328.2 67.6 329.1 70.1 328.2 72.1C 327.2 74.2 325 75 322.8 74.2C 313.4 70.8 307.2 61.9 307.2 52C 307.2 42.1 313.4 33.1 322.8 29.7C 324.5 29.2 325.9 29.5 327.3 30.4C 328.1 29.3 329.2 28.4 330.8 28.4C 342.4 28.3 352.3 36.8 354.1 48.2C 356 59.4 349.4 70.7 338.4 74.3C 336.4 75 334.2 74 333.4 72.1C 332.7 70.3 333.3 67.6 335.5 66.9C 342.8 64.3 347.3 57.4 346.2 49.7C 345.1 42.4 338.9 36.7 331.2 36.5C 330.1 36.5 329 36 328 35.4C 327.6 36 326.9 36.9 326.1 37.2",
      "M 370 71.7C 370 74.2 367.7 75.6 365.9 75.6C 363.7 75.5 361.9 73.8 361.9 71.4L 361.9 32.2C 361.9 29.9 364 28.4 366.1 28.4C 367.8 28.4 370 29.9 370 32.3L 370 71.7",
      "M 279.3 14.8L 279.2 19.7C 279.2 21.9 277.4 23.5 275.4 23.6C 273.2 23.6 271.2 22 271.2 19.7L 271.2 14.4C 271.2 6.7 277.5 0.3 285.3 0.1L 295.7 0C 297.9 0 299.6 1.8 299.7 3.8C 299.8 6 298.1 8 295.8 8L 286.4 8.1C 282.6 8.1 279.4 10.7 279.3 14.8",
      "M 279.2 71.6C 279.2 73.9 277.3 75.5 275.4 75.6C 273.3 75.6 271.2 74 271.2 71.7L 271.2 45.2C 271.2 42.8 273.2 41.2 275.4 41.2C 277.6 41.3 279.3 43.1 279.3 45.4L 279.2 71.6",
      "M 395.9 40.6C 391.6 36.4 385.6 35.4 380.1 37.5C 378 38.4 375.7 37.1 375 35.1C 374.3 33.1 375.2 30.9 377.3 30C 385.7 26.6 395.1 28.6 401.6 34.9C 403.3 36.5 403.3 39 401.7 40.7C 400.2 42.2 397.7 42.3 395.9 40.6",
      "M 287.4 36.4L 265.8 36.4C 263.5 36.4 261.8 34.4 261.8 32.3C 261.9 30.1 263.7 28.4 266 28.4L 287.5 28.4C 289.7 28.4 291.4 30.4 291.4 32.3C 291.4 34.4 289.8 36.4 287.4 36.4",
    ],
    plate: "M 420.2 42.3L 419.6 35.8L 419.1 30.4L 418.6 24.1C 418.2 19.6 420.9 15.3 425.5 14.9L 432.1 14.3L 437.9 13.8L 443.7 13.3L 448.9 12.8L 455.1 12.3L 460.6 11.8L 466.6 11.3L 471.9 10.8L 477.9 10.3L 483.9 9.8L 489.4 9.3L 494.9 8.8L 497.6 8.5C 501.8 8.1 506.5 10.6 506.9 15.3L 510.4 53.4L 510.9 60.1L 511.4 65.8C 512.2 71 508.9 75.2 503.6 75.6L 498.5 76L 491.9 76.6L 481.2 77.5L 474.6 78.1L 469.1 78.6L 435.8 81.5L 433 81.8C 430.4 82 427.8 81.8 425.9 80C 424.4 78.6 423.2 77 423.1 74.9L 422.2 64.9L 421.6 58.3L 420.2 42.3",
  };

  const up = (s) => String(s || "").trim().toUpperCase();

  function layout(series, opts = {}) {
    const W = opts.W || 1080, H = opts.H || 1350, M = 54;
    const top = (opts.safeTop || 0) + M, bottom = H - (opts.safeBot || 0) - M;
    const foot = up(opts.foot), lines = (opts.lines || []).map(up).filter(Boolean);
    const SP = { size: 22, lh: 31, track: 0.05 }, IN = { size: 30, lh: 42, track: 0.04 };
    const footTop = foot ? bottom - SP.size * CAP : bottom;
    const infoLast = foot ? footTop - 66 : bottom;                       // baseline of the last info line
    const infoTop = lines.length ? infoLast - (lines.length - 1) * IN.lh - IN.size * CAP : infoLast + 34;
    const logoH = 58, logoTop = infoTop - 36 - logoH;   // the mark is lowercase: 58 tall puts its x-height near the lines' capitals
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
      logo: { x: W - M - MARK.w * logoH / MARK.h, y: logoTop, h: logoH },
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
  function mark(ctx, x, y, h) {
    if (!P2) P2 = { word: MARK.cycle.concat(MARK.for).map((d) => new Path2D(d)), plate: new Path2D(MARK.plate) };
    const k = h / MARK.h;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    ctx.fillStyle = WHITE; for (const p of P2.word) ctx.fill(p);
    ctx.fillStyle = PINK; ctx.fill(P2.plate);
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
    mark(ctx, L.logo.x, L.logo.y, L.logo.h);
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

  return { layout, paint, gray, SIZES, MARK };
});
