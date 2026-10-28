/* Cycle for Change — /about/ (Oct 28, 2026). Markup: scripts/build-about.js. Four small things, each on its own:
   the letterbox opening as it comes into view, the statement word by word, the film (plays muted on screen, the disc
   always stops it), and the sign (a visitor types, the plate takes the word; nothing leaves the page).
   Nothing moves under reduced motion; the film stays still under Save-Data or a slow connection until the disc asks. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var io = "IntersectionObserver" in window;

  // —— arrive once: the letterbox and the statement ——
  function arrive(el, ratio, before) {
    if (!el) return;
    if (before) before(el);
    if (reduce || !io) { el.setAttribute("data-in", "true"); return; }
    el.setAttribute("data-in", "false");
    var ob = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { el.setAttribute("data-in", "true"); ob.disconnect(); } });
    }, { threshold: ratio });
    ob.observe(el);
  }
  arrive(document.querySelector(".ab-letter"), 0.25);
  arrive(document.querySelector(".ab-say-line[data-words]"), 0.35, function (p) {
    // wrap each word once; the spaces stay text, so the line reads the same to a screen reader
    var words = p.textContent.split(/(\s+)/), i = 0;
    p.textContent = "";
    words.forEach(function (w) {
      if (/^\s+$/.test(w) || !w) { p.appendChild(document.createTextNode(w)); return; }
      var s = document.createElement("span"); s.className = "w"; s.style.setProperty("--i", i++); s.textContent = w; p.appendChild(s);
    });
  });

  // —— the film: muted, on screen only, the disc always there ——
  var fig = document.querySelector(".ab-film"), v = fig && fig.querySelector("video"), btn = fig && fig.querySelector(".ab-play");
  if (fig && v && btn) {
    var conn = navigator.connection || {};
    var quiet = reduce || conn.saveData || /(^|-)2g|3g/.test(conn.effectiveType || "");
    var userStopped = false;
    var secs = btn.getAttribute("data-seconds") || "";
    function label() {
      var on = !v.paused;
      fig.setAttribute("data-playing", on ? "true" : "false");
      btn.setAttribute("aria-label", on ? "Pause the film" : "Play" + (secs ? ", " + secs + " seconds" : ""));
    }
    function play() { if (v.preload === "none") v.preload = "auto"; var p = v.play(); if (p && p.catch) p.catch(function () { label(); }); }
    v.addEventListener("play", label); v.addEventListener("pause", label);
    btn.addEventListener("click", function () { if (v.paused) { userStopped = false; play(); } else { userStopped = true; v.pause(); } });
    if (io) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && e.intersectionRatio > 0.4) { if (!quiet && !userStopped) play(); }
          else if (!v.paused) v.pause();
        });
      }, { threshold: [0, 0.4] }).observe(fig);
    }
    label();
  }

  // —— the sign: after CYCLE FOR there is only the blank until a visitor types; then their word sits on the plate ——
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
    each(inputs, function (f) { f.addEventListener("input", function () { typed = f.value.trim().slice(0, 22); paint(f); }); });
    each(resets, function (b) { b.addEventListener("click", function () { typed = ""; paint(null); inputs[0].focus(); }); });
    paint(null);
  }
})();
