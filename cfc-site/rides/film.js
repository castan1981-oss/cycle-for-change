/* Ride films (Oct 8, 2026; moved out of ride.js Oct 31, 2026 so /rides/about/ can use it too).
   Every [data-film] on the page gets one player: the round button, the line under it and the picture all play and
   pause. Like the homepage reel, the ride's own film plays on a wide screen without reduced motion while it's on
   screen, and waits for a tap on phones. A figure with data-film-tap (How we ride: over a minute of words on screen)
   waits for a tap everywhere and plays once through. Nothing downloads until it's needed (preload="none"). */
(function () {
  "use strict";
  /* Oct 31, 2026 — every [data-film] on the page gets the player (the ride's own film at the top, and How we ride
     further down). A figure with data-film-tap waits for a tap on every screen (it's words on screen for over a
     minute) and plays once through; the ride's own film still plays on a wide screen while it's on screen. */
  Array.prototype.forEach.call(document.querySelectorAll("[data-film]"), function (fig) {
    var vid = fig.querySelector("video");
    if (!vid) return;
    var fBtn = fig.querySelector("[data-film-btn]"), fPlay = fig.querySelector("[data-film-play]"), fLabel = fig.querySelector("[data-film-label]");
    var wide = window.matchMedia && matchMedia("(min-width: 900px) and (hover: hover)").matches;
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var tapOnly = fig.hasAttribute("data-film-tap");
    var user = null;
    vid.muted = true;
    var paint = function () {
      var on = !vid.paused;
      fig.setAttribute("data-playing", on ? "true" : "false");
      if (fBtn) fBtn.setAttribute("data-playing", on ? "true" : "false");
      if (fLabel) fLabel.textContent = on ? "Pause" : (vid.ended ? "Play again" : "Play");
    };
    var go = function () { vid.preload = "auto"; var q = vid.play(); if (q && q.catch) q.catch(function () {}); };
    var toggle = function () { if (vid.paused) { user = true; go(); } else { user = false; vid.pause(); } };
    vid.addEventListener("play", paint);
    vid.addEventListener("pause", paint);
    vid.addEventListener("ended", paint);
    vid.addEventListener("error", function () { if (fBtn) fBtn.hidden = true; if (fPlay) fPlay.hidden = true; }, true);
    vid.addEventListener("click", toggle);
    if (fBtn) fBtn.addEventListener("click", toggle);
    if (fPlay) fPlay.addEventListener("click", function () { toggle(); if (fBtn) fBtn.focus({ preventScroll: true }); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) { if (!vid.paused) vid.pause(); return; }
        if (user === true || (user === null && wide && !reduce && !tapOnly)) go();
      }, { threshold: 0.5 }).observe(vid);
    }
    paint();
  });

})();
