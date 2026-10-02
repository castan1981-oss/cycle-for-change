/* Pass 17 (Oct 2, 2026): on a phone the area map zooms (tools/build-rides.js → mapZoom).
   Up to 640px wide the map trades its city labels for a bubble per region. A dark bubble (several
   cities) or its chip moves the viewBox in to that region's own layer of cities and narrows the
   "Pick a city" tiles to them; "← <place>", the "All" chip, Escape or the button under the tiles
   go back. A pale bubble is a plain link to its city. Wider than 640px, or before this runs, the
   map is exactly what the build drew. */
(function () {
  "use strict";
  var fig = document.querySelector(".gr-map--zoomable");
  if (!fig || !window.matchMedia || !window.requestAnimationFrame) return;
  var svg = fig.querySelector(".gr-map-svg");
  if (!svg) return;
  var phone = window.matchMedia("(max-width: 640px)");
  var still = window.matchMedia("(prefers-reduced-motion: reduce)");
  var FULL = svg.getAttribute("viewBox");
  var full = FULL.split(/\s+/).map(Number);
  var cur = full.slice();
  var active = "";
  var raf = 0;
  var back = fig.querySelector(".gr-map-back");
  var chips = [].slice.call(fig.querySelectorAll(".gr-map-chips [data-reg]"));
  var layers = [].slice.call(fig.querySelectorAll(".gr-map-zoom"));
  var head = document.getElementById("city-h");
  var section = head ? head.closest("section") : null;
  var tiles = section ? [].slice.call(section.querySelectorAll(".tiles-p > a")) : [];
  var reset = section ? section.querySelector(".gr-map-reset") : null;
  var title = svg.querySelector("title");

  function layer(k) { for (var i = 0; i < layers.length; i++) if (layers[i].getAttribute("data-reg") === k) return layers[i]; return null; }
  function setBox(v) { svg.setAttribute("viewBox", v.map(function (n) { return Math.round(n * 100) / 100; }).join(" ")); }

  // centre moves straight; width and height move by ratio, so the zoom feels even
  function move(to, done) {
    cancelAnimationFrame(raf);
    var from = cur.slice();
    if (still.matches) { cur = to.slice(); setBox(cur); if (done) done(); return; }
    var t0 = 0;
    var fx = from[0] + from[2] / 2, fy = from[1] + from[3] / 2, tx = to[0] + to[2] / 2, ty = to[1] + to[3] / 2;
    function step(now) {
      if (!t0) t0 = now;
      var t = Math.min(1, (now - t0) / 420), e = 1 - Math.pow(1 - t, 3);
      var w = from[2] * Math.pow(to[2] / from[2], e), h = from[3] * Math.pow(to[3] / from[3], e);
      var cx = fx + (tx - fx) * e, cy = fy + (ty - fy) * e;
      cur = [cx - w / 2, cy - h / 2, w, h];
      setBox(cur);
      if (t < 1) raf = requestAnimationFrame(step); else { cur = to.slice(); setBox(cur); if (done) done(); }
    }
    raf = requestAnimationFrame(step);
  }

  function show(k, opts) {
    opts = opts || {};
    var L = k ? layer(k) : null;
    if (k && !L) return;
    active = k || "";
    fig.classList.toggle("is-zoomed", !!active);
    layers.forEach(function (x) { x.classList.remove("is-on"); });
    chips.forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-reg") === active ? "true" : "false"); });
    var paths = L ? (L.getAttribute("data-paths") || "").split(" ") : null;
    tiles.forEach(function (a) { a.hidden = !!paths && paths.indexOf(a.getAttribute("href")) < 0; });
    if (reset) reset.classList.toggle("is-on", !!active);
    var to = L ? L.getAttribute("data-vb").split(/\s+/).map(Number) : full;
    move(to, function () {
      if (L && active === k) {
        L.classList.add("is-on");
        if (opts.keys) { var first = L.querySelector("a"); if (first) first.focus({ preventScroll: true }); }
      }
    });
  }

  function onRegion(e) {
    var g = e.target.closest && e.target.closest(".gr-map-reg[data-reg]");
    if (!g) return;
    if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    show(g.getAttribute("data-reg"), { keys: e.type === "keydown" });
  }

  function live(on) {
    cancelAnimationFrame(raf);
    fig.classList.toggle("is-live", on);
    if (on) {
      svg.setAttribute("role", "group");
      if (title) svg.setAttribute("aria-label", title.textContent + ". Tap a region to zoom in.");
    } else {
      show("");
      cancelAnimationFrame(raf);
      cur = full.slice();
      svg.setAttribute("viewBox", FULL);
      svg.setAttribute("role", "img");
      svg.removeAttribute("aria-label");
    }
  }

  svg.addEventListener("click", onRegion);
  svg.addEventListener("keydown", onRegion);
  chips.forEach(function (c) { c.addEventListener("click", function () { show(c.getAttribute("data-reg")); }); });
  if (back) back.addEventListener("click", function () { show(""); var c = chips[0]; if (c) c.focus({ preventScroll: true }); });
  if (reset) reset.addEventListener("click", function () { show(""); });
  fig.addEventListener("keydown", function (e) { if (e.key === "Escape" && active) show(""); });

  live(phone.matches);
  var flip = function () { live(phone.matches); };
  if (phone.addEventListener) phone.addEventListener("change", flip); else if (phone.addListener) phone.addListener(flip);
})();
