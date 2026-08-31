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
     Sits still for 2.5s, then a stolen broadcast: hard cuts, the designed page
     visible underneath on every OFF, the bed gated to match, one dump back to
     quiet when the picture ends. One sequence. It never replays.

     The three 10000 punches are hard cuts *between* footage, not a fallback —
     the colour hits are part of the sequence, so they fire whether or not the
     feed file is there. */

  var SLAM = 2500;
  var TAIL_TRIM = 0.23;    // seconds trimmed off the tail so the training-load
                           // overlay at the end of the cut never lands on screen
  var NO_VIDEO_MS = 4640;  // matches the trimmed picture, for the CSS-only path
  var BED_VOLUME = 0.55;

  // "hit" = footage, "punch" = full-frame 10000, "off" = the page, untouched.
  var BEATS = [
    { k: "hit",   ms: 280 },
    { k: "off",   ms: 70 },
    { k: "punch", ms: 180 },
    { k: "off",   ms: 90 },
    { k: "hit",   ms: 420 },
    { k: "off",   ms: 60 },
    { k: "punch", ms: 140 },
    { k: "off",   ms: 80 },
    { k: "hit",   ms: 500 },
    { k: "off",   ms: 70 },
    { k: "punch", ms: 120 },
    { k: "off",   ms: 60 },
    { k: "hit",   ms: null }  // runs until the picture ends
  ];

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

  function setBeat(k) {
    if (done) return;
    if (k === "off") {
      blast.classList.remove("on");
      blast.classList.remove("video-mode");
      hidePunches();
    } else if (k === "punch" || mode !== "video") {
      blast.classList.remove("video-mode");
      showPunch();
      blast.classList.add("on");
    } else {
      hidePunches();
      blast.classList.add("video-mode");
      blast.classList.add("on");
    }
    if (bedOn && bed) bed.muted = (k === "off");
  }

  function runBeats() {
    var i = 0;
    (function step() {
      if (done || i >= BEATS.length) return;
      var b = BEATS[i];
      setBeat(b.k);
      if (b.ms == null) return; // the last hit holds until finish()
      later(function () { i++; step(); }, b.ms);
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
    }, 20); // 10 x 20ms = 200ms
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
        var dur = (vid.duration && isFinite(vid.duration)) ? vid.duration : NO_VIDEO_MS / 1000;
        var endAt = Math.max(0.5, dur - TAIL_TRIM);
        vid.addEventListener("ended", finish); // backstop; the timer lands first
        var p = vid.play();
        if (p && p.catch) {
          p.catch(function () { mode = "punch"; }); // fall back mid-run
        }
        later(finish, endAt * 1000);
      } else {
        later(finish, NO_VIDEO_MS);
      }

      startBed();
      runBeats();
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
