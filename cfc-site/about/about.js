/* Cycle for Change — /about/ (Oct 28, 2026). Markup: scripts/build-about.js. Three small things, each on its own:
   the letterbox opening as it arrives, the film, and the sign.
   The film plays muted on a wide screen (900 and up) when it's in view; never under reduced motion, Save-Data or a slow
   connection; on a phone it's a still until the disc asks (CLAUDE.md §3). The disc always stops it (WCAG 2.2.2). */
(function () {
  "use strict";
  var mm = function (q) { return window.matchMedia && window.matchMedia(q).matches; };
  var reduce = mm("(prefers-reduced-motion: reduce)");
  var io = "IntersectionObserver" in window;

  // —— the letterbox: the bars part once, as soon as the frame shows (its top edge is on the first screen) ——
  var lb = document.querySelector(".ab-letter");
  if (lb) {
    if (reduce || !io) lb.setAttribute("data-in", "true");
    else {
      var ob = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { lb.setAttribute("data-in", "true"); ob.disconnect(); } });
      }, { threshold: 0.08 });
      ob.observe(lb);
    }
  }

  // —— the film ——
  var fig = document.querySelector(".ab-film"), v = fig && fig.querySelector("video"), btn = fig && fig.querySelector(".ab-play");
  if (fig && v && btn) {
    var conn = navigator.connection || {};
    var quiet = reduce || conn.saveData || /(^|-)2g|3g/.test(conn.effectiveType || "");
    var wide = mm("(min-width: 900px)");
    var userPlayed = false, userStopped = false;
    var secs = btn.getAttribute("data-seconds") || "";
    var label = function () {
      var on = !v.paused;
      fig.setAttribute("data-playing", on ? "true" : "false");
      btn.setAttribute("aria-label", on ? "Pause the film" : "Play" + (secs ? ", " + secs + " seconds" : ""));
    };
    var play = function () { if (v.preload === "none") v.preload = "auto"; var p = v.play(); if (p && p.catch) p.catch(label); };
    v.addEventListener("play", label); v.addEventListener("pause", label);
    btn.addEventListener("click", function () {
      if (v.paused) { userPlayed = true; userStopped = false; play(); } else { userStopped = true; v.pause(); }
    });
    if (io) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && e.intersectionRatio > 0.4) { if (!userStopped && (userPlayed || (wide && !quiet))) play(); }
          else if (!v.paused) v.pause();
        });
      }, { threshold: [0, 0.4] }).observe(fig);
    }
    label();
  }

  // —— the sign: after CYCLE FOR there is only the blank until a visitor types; then their word sits on the plate.
  //    The plate is the field's label, so tapping the blank puts the cursor in the field. Enter just closes the keyboard. ——
  var plates = document.querySelectorAll("[data-sign-plate]"), inputs = document.querySelectorAll("[data-sign-input]"), resets = document.querySelectorAll("[data-sign-reset]");
  if (plates.length && inputs.length) {
    var typed = "";
    var each = function (list, fn) { for (var k = 0; k < list.length; k++) fn(list[k]); };
    var paint = function (from) {
      each(plates, function (pl) { pl.textContent = typed; pl.setAttribute("data-empty", typed ? "false" : "true"); });
      each(inputs, function (f) { if (f !== from) f.value = typed; });
      var sr = document.getElementById("signSr");
      if (sr) sr.textContent = "Cycle for" + (typed ? " " + typed : "");
      each(resets, function (b) { b.hidden = !typed; });
    };
    each(inputs, function (f) {
      f.addEventListener("input", function () { typed = f.value.trim().slice(0, 22); paint(f); });
      f.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); f.blur(); } });
    });
    each(resets, function (b) { b.addEventListener("click", function () { typed = ""; paint(null); inputs[0].focus(); }); });
    paint(null);
  }
})();
