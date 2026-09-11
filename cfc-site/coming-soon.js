/* Cycle for Change — coming-soon page only.
   Three jobs: paint the live mile count, run the feed interrupt once (jump
   cuts, dropouts, three punches, bed gated to the picture), and submit the
   waitlist quietly.

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
     Sits still for 2.5s, then a stolen broadcast: jump cuts, dropouts, the
     designed page visible underneath on every OFF, the bed gated to match,
     one dump back to quiet at the end. One sequence. It never replays.

     Every HIT is a seek, not a scrub: the picture jumps to an in-point,
     runs for a few frames, and is cut. The in-points only land inside the
     clean windows of the feed file (scanned at 0.05s), so the burned-in
     caption lines, the handwritten title cards and the training-load gauge
     are never on screen. Clean windows, in seconds:
       0.02–0.14 · 0.21–0.63 · 1.03–1.14 · 1.31–1.49 · 1.56–1.64 · 1.76–1.84
       1.96–2.19 · 2.31–2.44 · 2.66–2.89 · 2.96–3.09 · 3.21–4.13 · 4.26–4.63
     If the feed file is ever re-cut, re-scan and rewrite BEATS.

     The three 10000 punches are hard cuts *between* footage, not a fallback —
     the colour hits are part of the sequence, so they fire whether or not the
     feed file is there. */

  var SLAM = 2500;
  var BED_VOLUME = 0.55;

  // "hit" = footage from `at` seconds, "punch" = full-frame 10000, "off" = the page, untouched.
  var BEATS = [
    { k: "hit",   at: 0.22, ms: 220 },   // palms, then the rider
    { k: "off",            ms: 60 },
    { k: "hit",   at: 3.38, ms: 120 },   // bibs, close
    { k: "off",            ms: 50 },
    { k: "punch",          ms: 160 },    // bone
    { k: "off",            ms: 70 },
    { k: "hit",   at: 3.57, ms: 260 },   // lane lines, mountain road
    { k: "off",            ms: 40 },
    { k: "hit",   at: 0.04, ms: 90 },    // marina, the face
    { k: "off",            ms: 40 },
    { k: "hit",   at: 4.28, ms: 180 },   // rider, hand
    { k: "off",            ms: 90 },
    { k: "punch",          ms: 130 },    // creosote
    { k: "off",            ms: 50 },
    { k: "hit",   at: 1.97, ms: 220 },   // road, rider, house
    { k: "off",            ms: 40 },
    { k: "hit",   at: 2.67, ms: 110 },   // street
    { k: "off",            ms: 60 },
    { k: "hit",   at: 1.32, ms: 90 },    // riders on the road
    { k: "off",            ms: 120 },
    { k: "punch",          ms: 110 },    // signal pink
    { k: "off",            ms: 50 },
    { k: "hit",   at: 3.86, ms: 240 },   // the wig, the standing figure, the road
    { k: "off",            ms: 40 },
    { k: "hit",   at: 2.32, ms: 120 },   // the dome
    { k: "off",            ms: 30 },
    { k: "hit",   at: 1.57, ms: 70 },    // sunset
    { k: "off",            ms: 70 },
    { k: "hit",   at: 4.47, ms: 150 },   // the crowd, the rider
    { k: "off",            ms: 40 },
    { k: "hit",   at: 3.21, ms: 300 }    // road, street, bibs — holds, then the dump to quiet
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

  // park the picture on the next in-point while the page is showing, so the
  // cut lands on the right frame the instant the HIT starts
  function cue(at) {
    if (mode !== "video" || !vid || at == null) return;
    try {
      vid.pause();
      vid.currentTime = at;
    } catch (e) { /* not seekable — the cut just runs on */ }
  }

  function nextHitAt(i) {
    for (var j = i + 1; j < BEATS.length; j++) {
      if (BEATS[j].k === "hit") return BEATS[j].at;
    }
    return null;
  }

  function setBeat(b, i) {
    if (done) return;
    var k = b.k;
    if (k === "off") {
      blast.classList.remove("on");
      blast.classList.remove("video-mode");
      hidePunches();
      cue(nextHitAt(i));
    } else if (k === "punch" || mode !== "video") {
      blast.classList.remove("video-mode");
      showPunch();
      blast.classList.add("on");
      if (k === "punch") cue(nextHitAt(i));
    } else {
      hidePunches();
      if (vid.paused) {
        var p = vid.play();
        if (p && p.catch) p.catch(function () { /* fine */ });
      }
      blast.classList.add("video-mode");
      blast.classList.add("on");
    }
    // the bed is gated to the feed: sound only while the picture is on
    if (bedOn && bed) bed.muted = (k === "off");
  }

  function runBeats() {
    var i = 0;
    (function step() {
      if (done) return;
      if (i >= BEATS.length) { finish(); return; }
      var b = BEATS[i];
      setBeat(b, i);
      later(function () { i++; step(); }, b.ms);
    })();
  }

  function cutBed() {
    if (!bed || !bedOn) return;
    var start = bed.volume, n = 0, steps = 6;
    var iv = setInterval(function () {
      n++;
      bed.volume = Math.max(0, start * (1 - n / steps));
      if (n >= steps) {
        clearInterval(iv);
        bed.pause();
        bedOn = false;
      }
    }, 20); // 6 x 20ms = 120ms: a dump, not a fade
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
    cutBed();
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
        vid.addEventListener("ended", finish); // backstop; the beats land first
        cue(BEATS[0].at);
        var p = vid.play();
        if (p && p.catch) {
          p.catch(function () { mode = "punch"; }); // fall back mid-run
        }
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
