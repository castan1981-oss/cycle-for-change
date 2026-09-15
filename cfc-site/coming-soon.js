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

  /* —— live miles since June 1 ——
     The count is a number first and text second: the open rolls it up from
     zero, the cover shows it, and the feed re-checks it every minute while
     the tab is visible. A ride that lands on Strava is on the cover within
     about a minute of the upload. */

  var POLL_MS = 60 * 1000;
  var polling = false;
  var tallyEl = document.querySelector("[data-cur]");
  var lastEl = document.getElementById("lastRide");
  var currentMiles = tallyEl ? parseInt(tallyEl.textContent.replace(/\D/g, ""), 10) || 0 : 0;
  var rolling = false;

  function fmt(n) { return Math.round(n).toLocaleString("en-US"); }

  function paint() {
    if (rolling || !tallyEl) return;
    tallyEl.textContent = fmt(currentMiles);
  }

  // roll a number element from `from` to whatever the target is by the time
  // each frame lands — the live fetch can arrive mid-roll and it converges
  function roll(el, from, target, ms, done) {
    if (!el) { if (done) done(); return; }
    var t0 = null;
    rolling = true;
    function frame(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / ms);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (target() - from) * e);
      if (p < 1) requestAnimationFrame(frame);
      else { rolling = false; el.textContent = fmt(target()); if (done) done(); }
    }
    requestAnimationFrame(frame);
  }

  function whenLabel(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    var now = new Date();
    var day = function (x) { return x.getFullYear() * 400 + x.getMonth() * 32 + x.getDate(); };
    var diff = day(now) - day(d);
    if (diff === 0) return d.getHours() < 12 ? "this morning" : "today";
    if (diff === 1) return "yesterday";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  function paintLast(d) {
    if (!lastEl || !d.recent || !d.recent.length) return;
    var r = d.recent[0];
    if (typeof r.miles !== "number") return;
    var when = whenLabel(r.date);
    lastEl.textContent = "Last ride " + (Math.round(r.miles * 10) / 10) + " mi" + (when ? " \u00b7 " + when : "");
  }

  function fetchMiles(i) {
    if (i >= ENDPOINTS.length) return Promise.resolve(); // leave the static count
    return fetch(ENDPOINTS[i], { headers: { Accept: "application/json" }, cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        return res.json();
      })
      .then(function (d) {
        if (!d || d.configured === false) return;   // keep the static count
        if (d.error) return;                          // a broken feed is not 0 miles
        var miles = typeof d.miles === "number" ? d.miles : d.totalMiles;
        if (typeof miles !== "number" || !isFinite(miles)) return;
        // zero miles with no rides behind it is a dead feed, not a number
        if (miles === 0 && (!d.recent || !d.recent.length)) return;
        currentMiles = miles;
        paint();
        paintLast(d);
      })
      .catch(function () {
        return fetchMiles(i + 1);
      });
  }

  function refreshMiles(force) {
    if (polling || (document.hidden && !force)) return;
    polling = true;
    fetchMiles(0).then(function () { polling = false; }, function () { polling = false; });
  }

  if (window.fetch) {
    refreshMiles(true);   // the first read always happens, even in a background tab
    setInterval(refreshMiles, POLL_MS);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) refreshMiles();
    });
  }

  /* —— the feed interrupt ——
     Sits still for 2.5s, then a stolen broadcast: jump cuts, dropouts, the
     designed page visible underneath on every OFF, the bed gated to match,
     one dump back to quiet at the end. One sequence. It never replays.

     Every HIT is a seek, not a scrub: the picture jumps to an in-point,
     runs for a few frames, and is cut. The feed file is our own cut (no
     captions, no chrome), so any in-point is safe. Its map, in seconds:
       0.00 road to Camelback   3.00 Robert riding, sky   5.20 the bridge
       7.20 the freeway fence   8.60 palms, the HAUS rider   9.02 lane lines
       9.28 Robert riding, low sun   11.28 the dome   11.41 road, trees (to 15.0)
     Robert is on camera in short bursts only; the road and the bridge
     carry the longer hits.

     The three 10000 punches are hard cuts *between* footage, not a fallback —
     the colour hits are part of the sequence, so they fire whether or not the
     feed file is there. */

    var BED_VOLUME = 0.55;

  // "hit" = footage from `at` seconds, "punch" = full-frame 10000, "off" = the page, untouched.
  var BEATS = [
    { k: "hit",   at: 0.10,  ms: 260 },   // road, Camelback ahead
    { k: "off",             ms: 60 },
    { k: "hit",   at: 5.30,  ms: 140 },   // the bridge
    { k: "off",             ms: 50 },
    { k: "punch",           ms: 160 },    // bone
    { k: "off",             ms: 70 },
    { k: "hit",   at: 1.20,  ms: 300 },   // road
    { k: "off",             ms: 40 },
    { k: "hit",   at: 8.62,  ms: 120 },   // palms
    { k: "off",             ms: 40 },
    { k: "hit",   at: 3.40,  ms: 180 },   // Robert, riding
    { k: "off",             ms: 90 },
    { k: "punch",           ms: 130 },    // creosote
    { k: "off",             ms: 50 },
    { k: "hit",   at: 7.30,  ms: 320 },   // the fence, the freeway below
    { k: "off",             ms: 40 },
    { k: "hit",   at: 11.60, ms: 110 },   // road, trees
    { k: "off",             ms: 60 },
    { k: "hit",   at: 9.05,  ms: 90 },    // lane lines
    { k: "off",             ms: 120 },
    { k: "punch",           ms: 110 },    // signal pink
    { k: "off",             ms: 50 },
    { k: "hit",   at: 6.10,  ms: 240 },   // the bridge again
    { k: "off",             ms: 40 },
    { k: "hit",   at: 9.60,  ms: 140 },   // Robert, low sun
    { k: "off",             ms: 30 },
    { k: "hit",   at: 11.30, ms: 80 },    // the dome
    { k: "off",             ms: 70 },
    { k: "hit",   at: 2.20,  ms: 150 },   // road
    { k: "off",             ms: 40 },
    { k: "hit",   at: 12.40, ms: 320 }    // road — holds, then the dump to quiet
  ];

  var reduce = window.matchMedia &&
               window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var blast = document.getElementById("blast");
  var vid = document.getElementById("blastVid");
  var bed = document.getElementById("bed");
  var punches = blast ? blast.querySelectorAll("[data-punch]") : [];
  var yearEl = document.querySelector(".year-one");

  var mode = "punch";       // "video" once we know a feed file is really there
  var bedOn = false;
  var running = false;
  var done = false;
  var punchIdx = 0;
  var timers = [];
  var endedHooked = false;

  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }

  function clearTimers() {
    for (var i = 0; i < timers.length; i++) clearTimeout(timers[i]);
    timers = [];
  }

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

  // play() rejects with AbortError when a cue() pauses it mid-start — that's
  // the cut working, not a block. Only NotAllowedError means no picture.
  function playVid() {
    var p = vid.play();
    if (p && p.catch) {
      p.catch(function (err) {
        if (err && err.name === "NotAllowedError") mode = "punch";
      });
    }
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
      if (vid.paused) playVid();
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
    running = false;
    clearTimers();
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
      bed.currentTime = 0;
      var p = bed.play();
      bedOn = true;
      if (p && p.catch) {
        p.catch(function () { bedOn = false; }); // autoplay blocked, no UI
      }
    } catch (e) {
      bedOn = false;
    }
  }

  var FEED_GRACE = 2500; // how long past the slam we'll wait for the feed file

  // Make sure the feed is actually loading, then call back once a frame is
  // decodable (or when the grace runs out). Phones fetch nothing for a video
  // until play() is called — a muted, playsinline play() is allowed everywhere,
  // and the picture stays hidden until the first HIT anyway.
  function armFeed(cb) {
    if (!vid || vid.readyState >= 2) { cb(); return; }
    var fired = false;
    function fin() { if (fired) return; fired = true; cb(); }
    vid.addEventListener("loadeddata", fin, { once: true });
    vid.addEventListener("canplay", fin, { once: true });
    try {
      if (vid.networkState === 0 || vid.networkState === 3) vid.load();
    } catch (e) { /* fine */ }
    var p = vid.play();
    if (p && p.catch) p.catch(function () { /* blocked: punch mode below */ });
    later(fin, FEED_GRACE);
  }

  function go() {
    if (done) return;
    mode = (vid && vid.readyState >= 2) ? "video" : "punch";

    if (mode === "video") {
      if (!endedHooked) {
        vid.addEventListener("ended", finish); // backstop; the beats land first
        endedHooked = true;
      }
      cue(BEATS[0].at);
      playVid();
    }

    if (!bedOn) startBed();
    runBeats();
  }

  function start(delay) {
    if (reduce || !blast || running) return;
    running = true;
    done = false;
    punchIdx = 0;
    clearTimers();
    later(function () { armFeed(go); }, delay);
  }

  /* —— the open ——
     First visit in a session: asphalt, the count rolls up, a beat of hold,
     then the slam straight into the feed and the settle into the cover.
     Later visits skip straight to the cover with a quick roll; tapping the
     year runs the sequence again (and that tap lets the bed play out loud). */

  var ROLL_MS = 1700;
  var HOLD_MS = 420;
  var openEl = document.getElementById("open");
  var openNum = document.getElementById("openNum");

  // the head script already hid the open for repeat visits and reduced motion
  var seen = /\bseen\b/.test(document.documentElement.className);

  function target() { return currentMiles; }

  if (!reduce && blast && openEl && !seen) {
    armFeed(function () { /* just get it downloading */ });
    startBed();
    roll(openNum, 0, target, ROLL_MS, function () {
      later(function () {
        openEl.classList.add("done");   // the slam: hard cut
        paint();
        try { sessionStorage.setItem("cfc-open", "1"); } catch (e) { /* fine */ }
        start(0);
      }, HOLD_MS);
    });
  } else {
    if (openEl) openEl.classList.add("done");
    if (!reduce && tallyEl) roll(tallyEl, 0, target, 900);
  }

  // The sequence runs once. Tapping the year runs it again — and the tap is
  // the user gesture that lets the bed play out loud on browsers that muted it
  // the first time.
  if (yearEl) {
    yearEl.addEventListener("click", function () { start(120); });
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
