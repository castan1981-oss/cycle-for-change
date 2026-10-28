/* /about/ (Oct 28, 2026): three small things, nothing sent anywhere.
   1. The film under "Then came the bike": plays muted and looped from 760px up once it's on screen, unless the
      visitor asked for less motion, Save-Data is on, or the connection is slow; on phones it's a still until the
      disc is tapped (CLAUDE.md §3: a still, not a film, on phones). The disc always pauses it (WCAG 2.2.2), and it
      pauses off screen.
   2. The line ("I found a version of myself…") arrives a word at a time when it scrolls in. Without the script, or
      with reduced motion, it's simply there.
   3. The sign: whatever a visitor types sits on the plate after CYCLE FOR. It never leaves the page. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var conn = navigator.connection || {};
  var slow = !!conn.saveData || /(^|-)2g|3g/.test(conn.effectiveType || "");

  /* 1. the film */
  var fig = document.querySelector("[data-film]");
  if (fig) {
    var v = fig.querySelector("video"), btn = fig.querySelector("[data-film-btn]");
    var wide = window.matchMedia("(min-width: 760px)");
    var userPaused = false, onScreen = false;
    var label = function (playing) {
      btn.setAttribute("aria-label", playing ? "Pause the film" : "Play the film, " + (v.duration ? Math.round(v.duration) : 11) + " seconds");
      fig.setAttribute("data-playing", playing ? "true" : "false");
    };
    var play = function () { v.preload = "auto"; var p = v.play(); if (p && p.catch) p.catch(function () { label(false); }); };
    v.addEventListener("play", function () { label(true); });
    v.addEventListener("pause", function () { label(false); });
    btn.addEventListener("click", function () {
      if (v.paused) { userPaused = false; play(); } else { userPaused = true; v.pause(); }
    });
    var auto = function () { return wide.matches && !reduce && !slow && !userPaused; };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        onScreen = es[0].isIntersecting;
        if (onScreen && auto() && v.paused) play();
        if (!onScreen && !v.paused) v.pause();
      }, { threshold: 0.35 }).observe(fig);
    }
    label(false);
  }

  /* 2. the line, a word at a time */
  var say = document.querySelector("[data-say]");
  if (say && !reduce && "IntersectionObserver" in window) {
    var words = say.textContent.trim().split(/\s+/);
    say.innerHTML = words.map(function (w, i) {
      var s = document.createElement("span"); s.className = "w"; s.style.setProperty("--i", i); s.textContent = w;
      return s.outerHTML;
    }).join(" ");
    var room = say.closest(".ab-say");
    room.classList.add("ab-say--armed");
    new IntersectionObserver(function (es, io) {
      if (es[0].isIntersecting) { room.classList.add("is-in"); io.disconnect(); }
    }, { threshold: 0.4 }).observe(say);
  }

  /* 2b. the road over his bars: on a wide screen the strip drifts sideways as the page scrolls past it (movement, the
     section's point). Reduced motion or no script: it stays a strip you scroll sideways. Nothing in it is focusable. */
  var bars = document.querySelector(".ab-bars"), list = bars && bars.querySelector(".ab-bars-list");
  var big = window.matchMedia("(min-width: 1024px)");
  if (bars && list && !reduce) {
    var ticking = false;
    var drift = function () {
      ticking = false;
      if (!big.matches) { bars.classList.remove("is-drift"); list.style.transform = ""; return; }
      bars.classList.add("is-drift");
      var r = bars.getBoundingClientRect(), vh = window.innerHeight || 800;
      var p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      var max = Math.max(0, list.scrollWidth - bars.clientWidth);
      list.style.transform = "translate3d(" + (-p * max).toFixed(1) + "px,0,0)";
    };
    var ask = function () { if (!ticking) { ticking = true; window.requestAnimationFrame(drift); } };
    window.addEventListener("scroll", ask, { passive: true });
    window.addEventListener("resize", ask);
    drift();
  }

  /* 3. the sign */
  var plates = document.querySelectorAll("[data-sign-plate]"), inputs = document.querySelectorAll("[data-sign-input]");
  var resets = document.querySelectorAll("[data-sign-reset]"), sr = document.querySelector("[data-sign-sr]");
  if (plates.length && inputs.length) {
    var typed = "";
    var paint = function (from) {
      for (var i = 0; i < plates.length; i++) { plates[i].textContent = typed; plates[i].setAttribute("data-empty", typed ? "false" : "true"); }
      for (var j = 0; j < inputs.length; j++) if (inputs[j] !== from) inputs[j].value = typed;
      if (sr) sr.textContent = "Cycle for" + (typed ? " " + typed : "");
      for (var k = 0; k < resets.length; k++) resets[k].hidden = !typed;
    };
    for (var a = 0; a < inputs.length; a++) (function (f) {
      f.addEventListener("input", function () { typed = f.value.trim().slice(0, 22); paint(f); });
    })(inputs[a]);
    for (var b = 0; b < resets.length; b++) resets[b].addEventListener("click", function () { typed = ""; paint(null); inputs[0].focus(); });
    paint(null);
  }
})();
