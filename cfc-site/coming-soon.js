/* Cycle for Change — coming-soon page only.
   Three jobs: paint the live mile count, run the feed interrupt once, and
   submit the waitlist quietly.

   Mileage logic is not forked — this reads the same /api/strava the site has
   always read, and only uses `miles` / `totalMiles`. It ignores `goal` and
   `pct`: 10000 is 2027, not the current denominator. */

(function () {
  "use strict";

  var ENDPOINTS = ["/api/strava", "/.netlify/functions/strava"];

  /* —— live miles since June 1 —— */

  function paint(text) {
    var els = document.querySelectorAll("[data-cur]");
    for (var i = 0; i < els.length; i++) els[i].textContent = text;
  }

  function fetchMiles(i) {
    if (i >= ENDPOINTS.length) return; // leave the static fallback in the HTML
    fetch(ENDPOINTS[i], { headers: { Accept: "application/json" } })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        return res.json();
      })
      .then(function (d) {
        if (!d || d.configured === false) {
          paint("—"); // a dash, not a broken layout
          return;
        }
        var miles = typeof d.miles === "number" ? d.miles : d.totalMiles;
        if (typeof miles !== "number" || !isFinite(miles)) {
          paint("—");
          return;
        }
        paint(Math.round(miles).toLocaleString("en-US"));
      })
      .catch(function () {
        fetchMiles(i + 1);
      });
  }

  if (window.fetch) fetchMiles(0);

  /* —— the feed interrupt ——
     Sits still for 2.5s, then a stolen broadcast: hard opacity cuts, the page
     visible underneath on every OFF, the bed gated to match, and one dump back
     to quiet when the picture ends. One sequence. It never replays. */

  var SLAM = 2500;
  var CUTS = [280, 70, 180, 90, 420, 60, 140, 80, 500, 70]; // ON, OFF, ON, ...
  var NO_VIDEO_MS = 4870;  // matches the cut we ship, for the CSS-only path
  var BED_VOLUME = 0.55;

  var reduce = window.matchMedia &&
               window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var blast = document.getElementById("blast");
  var vid = document.getElementById("blastVid");
  var bed = document.getElementById("bed");
  var punches = blast ? blast.querySelectorAll("[data-punch]") : [];

  var mode = "punch";       // "video" once we know a feed file is really there
  var bedOn = false;
  var done = false;
  var punchIdx = 0;
  var timers = [];

  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }

  function hidePunches() {
    for (var i = 0; i < punches.length; i++) punches[i].classList.remove("live");
  }

  function showPunch() {
    hidePunches();
    if (!punches.length) return;
    punches[punchIdx % punches.length].classList.add("live");
    punchIdx++;
  }

  function setOn(on) {
    if (done) return;
    if (on) {
      if (mode === "video") blast.classList.add("video-mode");
      else showPunch();
      blast.classList.add("on");
    } else {
      blast.classList.remove("on");
      if (mode !== "video") hidePunches();
    }
    if (bedOn && bed) bed.muted = !on;
  }

  function runCuts() {
    var i = 0;
    (function step() {
      if (done) return;
      if (i >= CUTS.length) { setOn(true); return; } // final ON, until it ends
      setOn(i % 2 === 0);
      later(function () { i++; step(); }, CUTS[i]);
    })();
  }

  function fadeBed() {
    if (!bed || !bedOn) return;
    var start = bed.volume, n = 0, steps = 10;
    var iv = setInterval(function () {
      n++;
      bed.volume = Math.max(0, start * (1 - n / steps));
      if (n >= steps) {
        clearInterval(iv);
        bed.pause();
        bedOn = false;
      }
    }, 20); // 10 × 20ms = 200ms
  }

  function finish() {
    if (done) return;
    done = true;
    for (var i = 0; i < timers.length; i++) clearTimeout(timers[i]);
    blast.classList.remove("on");
    blast.classList.remove("video-mode");
    hidePunches();
    if (vid) {
      try { vid.pause(); vid.currentTime = 0; } catch (e) { /* fine */ }
    }
    fadeBed();
  }

  function startBed() {
    if (!bed || bed.readyState < 2) return; // missing or not ready — skip it
    try {
      bed.volume = BED_VOLUME;
      bed.muted = false;
      var p = bed.play();
      bedOn = true;
      if (p && p.catch) {
        p.catch(function () { bedOn = false; }); // autoplay blocked, no UI
      }
    } catch (e) {
      bedOn = false;
    }
  }

  if (!reduce && blast) {
    later(function () {
      mode = (vid && vid.readyState >= 2) ? "video" : "punch";

      if (mode === "video") {
        vid.addEventListener("ended", finish);
        var p = vid.play();
        if (p && p.catch) {
          p.catch(function () { mode = "punch"; }); // fall back mid-run
        }
        var dur = (vid.duration && isFinite(vid.duration)) ? vid.duration * 1000 : NO_VIDEO_MS;
        later(finish, dur + 600); // belt and braces if "ended" never lands
      } else {
        later(finish, NO_VIDEO_MS);
      }

      startBed();
      runCuts();
    }, SLAM);
  }

  /* —— waitlist —— */

  var form = document.getElementById("waitlistForm");
  var msg = document.getElementById("wlMsg");

  if (form && msg && window.fetch) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var btn = form.querySelector(".wl-btn");
      if (btn) btn.disabled = true;
      msg.textContent = "";

      var body = new URLSearchParams(new FormData(form)).toString();

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body
      })
        .then(function (res) {
          if (!res.ok) throw new Error("bad status");
          form.reset();
          msg.textContent = "You're on the list.";
        })
        .catch(function () {
          if (btn) btn.disabled = false;
          msg.textContent = "That didn't send. Try again.";
        });
    });
  }
})();
