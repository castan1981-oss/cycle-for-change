/* /nov7/ — the film (Oct 8, 2026). Mirrors "From the ride" in /rides/ride.js: preload="none", phones wait
   for a tap, a wide screen without reduced motion plays it (muted) while half of it is on screen. The round
   button, the line under the picture and the picture itself all play and pause. Plays once; at the end the
   round button comes back. */
(function () {
  var fig = document.querySelector("[data-film]");
  var vid = fig && fig.querySelector("video");
  if (!vid) return;
  var fBtn = fig.querySelector("[data-film-btn]"), fPlay = fig.querySelector("[data-film-play]"), fLabel = fig.querySelector("[data-film-label]");
  var wide = window.matchMedia && matchMedia("(min-width: 900px) and (hover: hover)").matches;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var user = null, done = false;
  vid.muted = true;
  var paint = function () {
    var on = !vid.paused && !vid.ended;
    fig.setAttribute("data-playing", on ? "true" : "false");
    if (fBtn) fBtn.setAttribute("data-playing", on ? "true" : "false");
    if (fLabel) fLabel.textContent = on ? "Pause" : (vid.ended ? "Play again" : "Play");
  };
  var go = function () { vid.preload = "auto"; var q = vid.play(); if (q && q.catch) q.catch(function () {}); };
  var toggle = function () { if (vid.paused || vid.ended) { user = true; go(); } else { user = false; vid.pause(); } };
  vid.addEventListener("play", paint);
  vid.addEventListener("pause", paint);
  vid.addEventListener("ended", function () { done = true; paint(); });
  vid.addEventListener("error", function () { if (fBtn) fBtn.hidden = true; if (fPlay) fPlay.hidden = true; }, true);
  vid.addEventListener("click", toggle);
  if (fBtn) fBtn.addEventListener("click", toggle);
  if (fPlay) fPlay.addEventListener("click", function () { toggle(); if (fBtn) fBtn.focus({ preventScroll: true }); });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) { if (!vid.paused) vid.pause(); return; }
      if (done) return;
      if (user === true || (user === null && wide && !reduce)) go();
    }, { threshold: 0.5 }).observe(vid);
  }
  paint();
})();
