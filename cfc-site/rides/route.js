/* route.js — the route on a ride page (Oct 9, 2026; tools/build-rides.js routeBlock).
   Keeps the map's marks the same size on any screen, lets you drag along the climb chart (or use the arrow
   keys) and see where that is on the map, taps a turn to show it, and zooms the map. The page reads fine
   without it: the map, the chart, the turns and the GPX are all in the HTML. */
(function () {
  "use strict";
  var sec = document.getElementById("route");
  var dataEl = sec && sec.querySelector("[data-route-json]");
  if (!sec || !dataEl) return;
  var D; try { D = JSON.parse(dataEl.textContent); } catch (e) { return; }
  var P = D.prof, max = D.max;
  var fig = sec.querySelector("[data-route-map]"), scroll = sec.querySelector("[data-route-scroll]");
  var svg = sec.querySelector("[data-route-svg]"), you = svg && svg.querySelector(".gr-rt-you");
  var prof = sec.querySelector("[data-route-prof]"), cursor = sec.querySelector("[data-route-cursor]");
  var readout = sec.querySelector("[data-route-readout]"), zoom = sec.querySelector("[data-route-zoom]");
  var cues = [].slice.call(sec.querySelectorAll("[data-cue]"));
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fmt = function (n) { return Number(n).toLocaleString("en-US"); };

  // marks drawn in screen pixels: --u = map units per screen pixel
  function rescale() { var w = svg.getBoundingClientRect().width; if (w) svg.style.setProperty("--u", (D.w / w).toFixed(3)); }
  rescale();
  window.addEventListener("resize", rescale);

  // the climb chart's own scale (viewBox 0 0 600 150, the build's PROF_* margins)
  var VW = 600, L = 4, R = 4;
  var X = function (m) { return L + (m / max) * (VW - L - R); };
  function nearest(m) { var best = 0; for (var i = 1; i < P.length; i++) if (Math.abs(P[i][0] - m) < Math.abs(P[best][0] - m)) best = i; return best; }

  function centerOn(x, y) {
    if (!fig.classList.contains("is-zoomed")) return;
    var k = scroll.scrollWidth / D.w;
    scroll.scrollTo({ left: x * k - scroll.clientWidth / 2, top: y * k - scroll.clientHeight / 2, behavior: reduce ? "auto" : "smooth" });
  }
  function show(x, y, mi, ft, follow) {
    you.setAttribute("transform", "translate(" + x + " " + y + ")");
    you.classList.add("is-on");
    cursor.setAttribute("x1", X(mi)); cursor.setAttribute("x2", X(mi)); cursor.classList.add("is-on");
    readout.textContent = "Mile " + mi.toFixed(1) + " · " + fmt(ft) + " ft";
    var on = -1; cues.forEach(function (b, i) { if (+b.getAttribute("data-mi") <= mi + 0.05) on = i; });
    cues.forEach(function (b, i) { b.parentNode.classList.toggle("is-on", i === on); });
    if (follow) centerOn(x, y);
  }
  function showIdx(i, follow) { var p = P[Math.max(0, Math.min(P.length - 1, i))]; show(p[2], p[3], p[0], p[1], follow); return i; }

  var idx = 0;
  function scrub(e) {
    var r = prof.getBoundingClientRect();
    var vx = (e.clientX - r.left) / r.width * VW;
    var m = Math.max(0, Math.min(max, (vx - L) / (VW - L - R) * max));
    idx = showIdx(nearest(m), false);
  }
  prof.addEventListener("pointerdown", function (e) { try { prof.setPointerCapture(e.pointerId); } catch (x) {} scrub(e); });
  prof.addEventListener("pointermove", function (e) { if (e.pointerType === "mouse" || e.buttons) scrub(e); });
  prof.addEventListener("keydown", function (e) {
    var step = { ArrowRight: 3, ArrowLeft: -3, End: 1e6, Home: -1e6 }[e.key];
    if (!step) return;
    e.preventDefault();
    idx = showIdx(Math.max(0, Math.min(P.length - 1, idx + step)), true);
  });

  function setZoom(on) {
    fig.classList.toggle("is-zoomed", on);
    zoom.setAttribute("aria-pressed", on ? "true" : "false");
    zoom.textContent = on ? "Zoom out" : "Zoom in";
    setTimeout(function () { rescale(); var t = you.getAttribute("transform"); var m = t && t.match(/translate\(([\d.]+) ([\d.]+)\)/); if (m) centerOn(+m[1], +m[2]); }, reduce ? 0 : 280);
  }
  zoom.addEventListener("click", function () { setZoom(!fig.classList.contains("is-zoomed")); });

  cues.forEach(function (b) {
    b.addEventListener("click", function () {
      var mi = +b.getAttribute("data-mi"), x = +b.getAttribute("data-x"), y = +b.getAttribute("data-y");
      idx = nearest(mi);
      show(x, y, mi, P[idx][1], true);
      if (!fig.classList.contains("is-zoomed")) setZoom(true);
      if (window.matchMedia && matchMedia("(max-width: 979px)").matches) fig.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  });

  var gpx = sec.querySelector("[data-route-gpx]");
  if (gpx) gpx.addEventListener("click", function () { if (window.cfcTrack) window.cfcTrack("route_gpx", { ride: (document.querySelector("[data-save]") || {}).getAttribute ? document.querySelector("[data-save]").getAttribute("data-save") : "" }); });
})();
