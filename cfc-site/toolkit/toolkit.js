/*
  toolkit.js — the fundraising toolkit (Nov 24, 2026). Robert: a page any charity rider can use to make the post that
  asks for them. Two pictures, both drawn in the browser:

    the ask     cycle for + a plate carrying who they ride for, their ride, when, their giving link, under their photo
    the miles   every ride file they drop, drawn as its outline with its miles, the total on top

  Nothing is uploaded, stored or sent. The mark's paths come from /brief/bw.js (BW.MARK, the same copy the poster
  uses; tools/test/brief-bw.test.js keeps it identical to scripts/mark-2027.js). Ride files are read by /brief/engine.js
  (BRIEF.parseAny). A photo and a solid field sit one above the other: no words on the photo.

  layoutAsk() and layoutMiles() are plain arithmetic so they can be tested in node (tools/test/toolkit.test.js).
*/
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.TOOLKIT = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const TAR = "#141218", PLASTER = "#EFEDEA", PINK = "#C2557F", PATINA = "#A9BDB8";
  const FONTS = "Overpass, system-ui, sans-serif";
  const SIZES = { post: { W: 1080, H: 1350, top: 0, bot: 0 }, story: { W: 1080, H: 1920, top: 200, bot: 330 } };
  const M = 72;                       // the margin every word keeps
  const MARK_W = 514, MARK_H = 97;    // the mark's drawing
  const WORDS_W = 404;                // where "cycle for" ends on it; the plate starts at 418
  const PLATE_X = 418;
  const FOOT = "cycleforchange.org/toolkit";

  const clean = (s, n) => String(s || "").replace(/\s+/g, " ").trim().slice(0, n);
  // a giving link as a person would read it: no scheme, no www, no query, no trailing slash
  function showLink(s) {
    let t = clean(s, 200);
    if (!t) return "";
    t = t.replace(/^[a-z]+:\/\//i, "").replace(/^www\./i, "").replace(/[?#].*$/, "").replace(/\/+$/, "");
    return /^[^\s/]+\.[^\s/]+/.test(t) ? t : "";
  }
  const whole = (mi) => Math.round(mi).toLocaleString("en-US");

  // ---- the ask: where everything goes ----
  // measure(text, weight, size) → width in px. In the browser it is the canvas; in a test, any stand-in.
  function fit(measure, text, weight, size, maxW, min) {
    let s = size;
    for (let i = 0; i < 8; i++) { const w = measure(text, weight, s); if (w <= maxW) break; s = Math.max(min, Math.floor(s * maxW / w)); if (s === min) break; }
    return s;
  }
  // a name that won't fit one line at a readable size breaks in two at the space nearest its middle
  function wrap2(measure, text, weight, size, maxW, min) {
    const one = fit(measure, text, weight, size, maxW, min);
    if (measure(text, weight, one) <= maxW && one >= size * 0.72) return { lines: [text], size: one };
    const sp = []; for (let i = 0; i < text.length; i++) if (text[i] === " ") sp.push(i);
    if (!sp.length) return { lines: [cut(measure, text, weight, one, maxW)], size: one };
    const mid = text.length / 2, at = sp.reduce((a, b) => (Math.abs(b - mid) < Math.abs(a - mid) ? b : a));
    const two = [text.slice(0, at), text.slice(at + 1)];
    const s2 = Math.min(fit(measure, two[0], weight, size, maxW, min), fit(measure, two[1], weight, size, maxW, min));
    return { lines: two.map((t) => cut(measure, t, weight, s2, maxW)), size: s2 };
  }
  // the last resort: shorten with an ellipsis so nothing ever runs off the picture
  function cut(measure, text, weight, size, maxW) {
    if (measure(text, weight, size) <= maxW) return text;
    let t = text;
    while (t.length > 1 && measure(t + "…", weight, size) > maxW) t = t.slice(0, -1);
    return t.replace(/[\s/.-]+$/, "") + "…";
  }
  function layoutSign(measure, word, x, y, h, maxW) {
    const k = h / MARK_H, wordsW = WORDS_W * k;
    const plate = { h: Math.round(h * 0.66), pad: Math.round(h * 0.22) };
    let fs = Math.round(h * 0.58);
    const room = maxW - PLATE_X * k;
    let tw = measure(word, 900, fs);
    const inline = tw + plate.pad * 2 <= room;
    if (!inline) { fs = fit(measure, word, 900, fs, maxW - plate.pad * 2, 30); word = cut(measure, word, 900, fs, maxW - plate.pad * 2); tw = measure(word, 900, fs); }
    const px = inline ? x + PLATE_X * k : x;
    const top = inline ? y + h * 0.78 - plate.h - h * 0.07 : y + h * 1.12;
    return {
      x, y, h, k, wordsW, inline,
      plate: { x: px, y: top, w: Math.round(tw + plate.pad * 2), h: plate.h, fs, text: word, tx: px + plate.pad },
      bottom: inline ? y + h : top + plate.h,
    };
  }
  function layoutAsk(measure, state, sizeName) {
    const S = SIZES[sizeName] || SIZES.post, W = S.W, H = S.H;
    const maxW = W - M * 2;
    const word = clean(state.who, 40) || "who?";
    const ride = clean(state.ride, 60), when = clean(state.when, 40), link = showLink(state.link);
    const hasPhoto = !!state.photo;
    let photoH = hasPhoto ? (sizeName === "story" ? 1000 : 700) : 0;
    const z = hasPhoto ? 1 : 1.3;                    // no photo: the words are the picture, so they run bigger
    const signH = Math.round(104 * z);
    // heights of the block under the photo (or centred on the field when there is none)
    const rideW = ride ? wrap2(measure, ride, 800, Math.round(58 * z), maxW, 32) : { lines: [], size: 0 };
    const rideFs = rideW.size, rideH = rideW.lines.length ? rideFs + (rideW.lines.length - 1) * Math.round(rideFs * 1.18) : 0;
    const linkFs = link ? fit(measure, link, 700, Math.round(36 * z), maxW, 24) : 0;
    const linkT = link ? cut(measure, link, 700, linkFs, maxW) : "";
    const whenFs = Math.round(36 * z);
    const dry = layoutSign(measure, word, M, 0, signH, maxW);
    let blockH = dry.bottom;
    if (ride) blockH += 64 + rideH;
    if (when) blockH += 22 + whenFs;
    if (link) blockH += 54 + 26 + 14 + linkFs;
    const footY = H - S.bot - M;
    if (hasPhoto) photoH = Math.max(Math.round(H * 0.28), Math.min(photoH, footY - 60 - 64 - blockH));   // a long ask takes room from the photo, never the other way
    const fieldTop = hasPhoto ? photoH : S.top;
    const free = footY - 60 - fieldTop - blockH;
    let y = fieldTop + Math.max(64, hasPhoto ? Math.min(96, free / 2) : free / 2);
    const sign = layoutSign(measure, word, M, y, signH, maxW);
    y = sign.bottom;
    const lines = [];
    if (ride) { y += 64 + rideFs; rideW.lines.forEach((t, i) => { if (i) y += Math.round(rideFs * 1.18); lines.push({ text: t, weight: 800, size: rideFs, color: PLASTER, x: M, y }); }); }
    if (when) { y += 22 + whenFs; lines.push({ text: when, weight: 500, size: whenFs, color: PATINA, x: M, y }); }
    if (link) {
      y += 54 + 26; lines.push({ text: "Give here", weight: 700, size: 26, color: PATINA, x: M, y });
      y += 14 + linkFs; lines.push({ text: linkT, weight: 700, size: linkFs, color: PLASTER, x: M, y });
    }
    return { W, H, photoH, sign, lines, foot: { text: FOOT, weight: 600, size: 24, color: PATINA, x: M, y: footY }, bottom: y, footY };
  }

  // ---- the miles: where everything goes ----
  function layoutMiles(measure, state, sizeName) {
    const S = SIZES[sizeName] || SIZES.post, W = S.W, H = S.H;
    const maxW = W - M * 2;
    const rides = state.rides || [];
    const total = rides.reduce((a, r) => a + r.mi, 0);
    const word = clean(state.who, 40);
    const top = S.top + M;
    const numFs = 190;
    const head = { num: { text: whole(total), weight: 900, size: numFs, color: PLASTER, x: M, y: top + numFs * 0.76 } };
    const numW = measure(head.num.text, 900, numFs);
    head.unit = { text: Math.round(total) === 1 ? "mile" : "miles", weight: 800, size: 54, color: PLASTER, x: M + numW + 20, y: head.num.y };
    head.sub = { text: rides.length + (rides.length === 1 ? " ride" : " rides"), weight: 500, size: 34, color: PATINA, x: M, y: head.num.y + 58 };
    const footY = H - S.bot - M;
    const signH = 84;
    const sign = word ? layoutSign(measure, word, M, 0, signH, maxW) : null;
    const signTop = sign ? footY - 64 - sign.bottom : footY - 40;
    const signAt = sign ? layoutSign(measure, word, M, signTop, signH, maxW) : null;
    const gridTop = head.sub.y + 48, gridBot = signTop - 40;
    const gw = maxW, gh = Math.max(120, gridBot - gridTop);
    const n = Math.max(1, rides.length);
    let cols = Math.max(1, Math.round(Math.sqrt(n * gw / gh)));
    let rows = Math.ceil(n / cols);
    while (cols > 1 && (cols - 1) * rows >= n) cols--;
    const cw = gw / cols, ch = gh / rows;
    const label = ch > 150 ? 24 : 0;                 // miles under each outline only while there is room to read them
    const cells = rides.map((r, i) => {
      const c = i % cols, rr = Math.floor(i / cols);
      return { x: M + c * cw, y: gridTop + rr * ch, w: cw, h: ch, pad: Math.min(26, cw * 0.14), label, mi: whole(r.mi) + " mi" };
    });
    return { W, H, head, cells, cols, rows, sign: signAt, foot: { text: FOOT, weight: 600, size: 24, color: PATINA, x: M, y: footY }, total };
  }

  // a ride's points as an outline inside a box, north up, the same scale both ways
  function outline(pts, box) {
    let a = Infinity, b = -Infinity, c = Infinity, d = -Infinity;
    for (const p of pts) { if (p[0] < a) a = p[0]; if (p[0] > b) b = p[0]; if (p[1] < c) c = p[1]; if (p[1] > d) d = p[1]; }
    const kx = Math.cos(((c + d) / 2) * Math.PI / 180);
    const w = Math.max(1e-9, (b - a) * kx), h = Math.max(1e-9, d - c);
    const iw = box.w - box.pad * 2, ih = box.h - box.pad * 2 - (box.label ? box.label + 14 : 0);
    const s = Math.min(iw / w, ih / h);
    const ox = box.x + box.pad + (iw - w * s) / 2, oy = box.y + box.pad + (ih - h * s) / 2;
    return pts.map((p) => [ox + (p[0] - a) * kx * s, oy + (d - p[1]) * s]);
  }
  // keep at most `max` points of a line, evenly
  function thin(pts, max) {
    if (pts.length <= max) return pts;
    const out = [], step = (pts.length - 1) / (max - 1);
    for (let i = 0; i < max; i++) out.push(pts[Math.round(i * step)]);
    return out;
  }

  // ---- the canvas ----
  function measurer(ctx) { return (t, w, s) => { ctx.font = `${w} ${s}px ${FONTS}`; return ctx.measureText(t).width; }; }
  function text(ctx, T) { ctx.font = `${T.weight} ${T.size}px ${FONTS}`; ctx.fillStyle = T.color; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.fillText(T.text, T.x, T.y); }
  let P2 = null;
  function drawSign(ctx, S, MARK) {
    if (!P2) P2 = MARK.cycle.concat(MARK.for).map((d) => new Path2D(d));
    ctx.save(); ctx.translate(S.x, S.y); ctx.scale(S.k, S.k); ctx.fillStyle = PLASTER; for (const p of P2) ctx.fill(p); ctx.restore();
    const P = S.plate;
    ctx.save(); ctx.translate(P.x, P.y + P.h); ctx.rotate(-2.5 * Math.PI / 180);          // 2.5° off square, turned on its bottom-left corner
    const r = P.fs * 0.07;
    ctx.fillStyle = PINK; ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(0, -P.h, P.w, P.h, r); else ctx.rect(0, -P.h, P.w, P.h);
    ctx.fill();
    ctx.font = `900 ${P.fs}px ${FONTS}`; ctx.fillStyle = PLASTER; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
    ctx.fillText(P.text, P.tx - P.x, -(P.h - P.fs * 0.7) / 2);
    ctx.restore();
  }
  function paintAsk(ctx, L, photo, MARK) {
    ctx.fillStyle = TAR; ctx.fillRect(0, 0, L.W, L.H);
    if (photo && L.photoH) {
      const pw = photo.naturalWidth || photo.width, ph = photo.naturalHeight || photo.height;
      const r = Math.max(L.W / pw, L.photoH / ph), w = pw * r, h = ph * r;
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, L.W, L.photoH); ctx.clip();
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(photo, (L.W - w) / 2, (L.photoH - h) * 0.3, w, h);                   // a little high: faces sit in the top of a photo
      ctx.restore();
    }
    drawSign(ctx, L.sign, MARK);
    for (const T of L.lines) text(ctx, T);
    text(ctx, L.foot);
  }
  function paintMiles(ctx, L, rides, MARK) {
    ctx.fillStyle = TAR; ctx.fillRect(0, 0, L.W, L.H);
    text(ctx, L.head.num); text(ctx, L.head.unit); text(ctx, L.head.sub);
    ctx.strokeStyle = PLASTER; ctx.lineJoin = "round"; ctx.lineCap = "round";
    L.cells.forEach((box, i) => {
      const line = outline(rides[i].pts, box);
      ctx.lineWidth = Math.max(2, Math.min(4, box.w / 70));
      ctx.beginPath(); line.forEach(([x, y], j) => (j ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke();
      if (box.label) {
        ctx.font = `600 ${box.label}px ${FONTS}`; ctx.fillStyle = PATINA; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
        ctx.fillText(box.mi, box.x + box.w / 2, box.y + box.h - box.pad);
      }
    });
    if (L.sign) drawSign(ctx, L.sign, MARK);
    text(ctx, L.foot);
  }

  const api = { SIZES, FOOT, showLink, whole, fit, wrap2, cut, layoutSign, layoutAsk, layoutMiles, outline, thin, measurer, paintAsk, paintMiles };
  if (typeof document === "undefined") return api;

  // ---- the page ----
  const $ = (s, el) => (el || document).querySelector(s);
  function start() {
    const BW = self.BW, E = self.BRIEF;
    const rootEl = $("[data-toolkit]");
    if (!rootEl || !BW || !BW.MARK) return;
    rootEl.classList.add("is-on");
    const state = { who: "", ride: "", when: "", link: "", photo: null, rides: [] };
    const ask = $("[data-tk-ask]"), miles = $("[data-tk-miles]");
    const askCv = $("canvas", ask), milesCv = $("canvas", miles);
    const say = $("[data-tk-say]"), milesBtns = miles.querySelectorAll("[data-tk-save]");

    function render(cv, kind, size) {
      const S = SIZES[size]; cv.width = S.W; cv.height = S.H;
      const ctx = cv.getContext("2d"), m = measurer(ctx);
      if (kind === "ask") paintAsk(ctx, layoutAsk(m, state, size), state.photo, BW.MARK);
      else paintMiles(ctx, layoutMiles(m, state, size), state.rides, BW.MARK);
    }
    function redraw() {
      render(askCv, "ask", "post");
      const who = state.who || "who?";
      askCv.setAttribute("aria-label", "Your post: cycle for " + who + (state.ride ? ". " + state.ride : "") + (state.when ? ", " + state.when : "") + ".");
      if (state.rides.length) {
        render(milesCv, "miles", "post");
        const t = whole(state.rides.reduce((a, r) => a + r.mi, 0));
        milesCv.setAttribute("aria-label", "Your post: " + t + " miles across " + state.rides.length + " rides, each route drawn.");
      }
      miles.classList.toggle("has-rides", state.rides.length > 0);
      milesBtns.forEach((b) => { b.disabled = !state.rides.length; });
    }

    rootEl.addEventListener("input", (e) => {
      const k = e.target.getAttribute && e.target.getAttribute("data-tk-field");
      if (k) { state[k] = e.target.value; redraw(); }
    });
    $("[data-tk-photo]").addEventListener("change", (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) { state.photo = null; redraw(); return; }
      const img = new Image(), url = URL.createObjectURL(f);
      img.onload = () => { URL.revokeObjectURL(url); state.photo = img; redraw(); };
      img.onerror = () => { URL.revokeObjectURL(url); state.photo = null; redraw(); };
      img.src = url;
    });
    $("[data-tk-files]").addEventListener("change", async (e) => {
      const files = [...(e.target.files || [])].slice(0, 60);
      if (!files.length) return;
      say.textContent = "Reading " + files.length + (files.length === 1 ? " file…" : " files…");
      const rides = []; let bad = 0;
      for (const f of files) {
        try {
          const r = await E.parseAny(f);
          const pts = (r.pts || []).filter((p) => isFinite(p.lat) && isFinite(p.lon));
          if (pts.length < 2) { bad++; continue; }
          let m = 0; for (let i = 1; i < pts.length; i++) m += E.dist(pts[i - 1], pts[i]);
          if (m < 200) { bad++; continue; }
          rides.push({ mi: m / E.MI, pts: thin(pts.map((p) => [p.lon, p.lat]), 500) });
        } catch (err) { bad++; }
      }
      state.rides = rides;
      const t = whole(rides.reduce((a, r) => a + r.mi, 0));
      say.textContent = rides.length
        ? rides.length + (rides.length === 1 ? " ride, " : " rides, ") + t + " miles." + (bad ? " " + bad + (bad === 1 ? " file" : " files") + " couldn’t be read." : "")
        : "None of those could be read. This takes GPX, TCX and FIT files, or Garmin’s zip.";
      redraw();
    });

    const touch = self.matchMedia && self.matchMedia("(pointer:coarse)").matches;
    rootEl.addEventListener("click", (e) => {
      const b = e.target.closest && e.target.closest("[data-tk-save]");
      if (!b || b.disabled) return;
      const [kind, size] = b.getAttribute("data-tk-save").split(":");
      const cv = document.createElement("canvas");
      render(cv, kind, size);
      const name = "cycle-for-" + kind + "-" + size + ".png";
      cv.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], name, { type: "image/png" });
        if (touch && navigator.canShare && navigator.canShare({ files: [file] })) {
          try { await navigator.share({ files: [file] }); return; } catch (err) { if (err && err.name === "AbortError") return; }
        }
        const a = document.createElement("a"), url = URL.createObjectURL(blob);
        a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
      }, "image/png");
    });

    const ready = document.fonts && document.fonts.load
      ? Promise.all([500, 600, 700, 800, 900].map((w) => document.fonts.load(w + " 40px Overpass"))).catch(() => {})
      : Promise.resolve();
    ready.then(redraw);
    redraw();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
  return api;
});
