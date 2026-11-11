/* Cycle for Change — the homepage (the editorial homepage, Oct 26, 2026).
   Loaded by cfc-site/index.html (scripts/build-home.js). No dependencies. Every block checks for its own
   elements first, so a block whose markup isn't on the page does nothing.

   It talks to one thing: /api/strava → /.netlify/functions/strava (miles, rides, the last rides). Every number in
   the HTML is a fallback baked from the last read (scripts/tally.js); a broken feed is never painted as 0.

   Oct 26, 2026: the old page's dead code is gone (the chart, the waitlist form, the Instagram fetch nothing used,
   the hero film for a #heroVid that no longer existed, the phone tally bar). New: the hero film.
   Nov 11, 2026: the hero film and its Pause button are gone; the first screen has the opening instead (below).
   Oct 27, 2026: #today's film has one control, the disc on the poster (the Play / Pause line under it is gone). */
(function () {
  "use strict";

  var YEAR_START = Date.UTC(2027, 0, 1, 7);     /* Jan 1 2027, midnight in Phoenix */
  var DAY = 86400000;
  var POLL_MS = 60 * 1000;
  var STRAVA = ["/api/strava", "/.netlify/functions/strava"];
  var GENERIC = /^(early morning|morning|afternoon|evening|lunch|night)\s+(ride|run|swim|walk)$/i;

  var mq = function (q) { return !!(window.matchMedia && matchMedia(q).matches); };
  var reduce = mq("(prefers-reduced-motion: reduce)");
  var wide = mq("(min-width: 900px)");
  var $ = function (id) { return document.getElementById(id); };
  var fmt = function (n) { return Math.round(n).toLocaleString("en-US"); };

  /* the words around the number: training until midnight Jan 1, 2027 in Phoenix, then 2027 (build-home.js, PR #211) */
  var IN_2027 = Date.now() >= YEAR_START;
  document.querySelectorAll('[data-season="2027"], [data-season="training"]').forEach(function (el) { el.hidden = el.getAttribute("data-season") !== (IN_2027 ? "2027" : "training"); });

  /* —— the tally: what the page carries (#tallyData), then the live read —— */
  var feed = { miles: 0, rides: 0, updated: "", profileUrl: "https://www.strava.com/athletes/22899089", recent: [] };
  (function () {
    var el = $("tallyData");
    if (!el) return;
    try {
      var t = JSON.parse(el.textContent || "{}");
      if (typeof t.miles === "number" && t.miles > 0) feed.miles = t.miles;
      if (typeof t.rides === "number") feed.rides = t.rides;
      if (t.updated) feed.updated = t.updated;
      if (t.profileUrl) feed.profileUrl = t.profileUrl;
      if (t.recent && t.recent.length) feed.recent = t.recent;
    } catch (e) { /* the page keeps its baked numbers */ }
  })();

  var milesEls = document.querySelectorAll("[data-miles]");
  function dayLabel(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "America/Phoenix" }).replace(",", "");
  }
  function paintFeed() {
    if (feed.miles > 0) for (var i = 0; i < milesEls.length; i++) milesEls[i].textContent = fmt(feed.miles);
    if (feed.rides && $("roadRides")) $("roadRides").textContent = fmt(feed.rides);
    var rides = feed.recent.filter(function (r) { return !r.discipline || r.discipline === "bike"; });
    if (!rides.length) rides = feed.recent;
    var log = $("log");
    if (log && rides.length) {
      /* the row from the day of his newest write-up links to it (build-home.js puts the date and the page on #log) */
      var noteDay = log.getAttribute("data-note-date") || "", noteHref = log.getAttribute("data-note-href") || "";
      var phxDay = function (iso) { try { return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Phoenix" }).format(new Date(iso)); } catch (e) { return String(iso).slice(0, 10); } };
      var max = parseInt(log.getAttribute("data-max") || "4", 10) || 4;
      var shown = rides.slice(0, max), longest = 0;
      shown.forEach(function (r) { longest = Math.max(longest, Number(r.miles) || 0); });
      while (log.firstChild) log.removeChild(log.firstChild);
      shown.forEach(function (r) {
        var li = document.createElement("li");
        var when = document.createElement("span"); when.className = "when"; when.textContent = dayLabel(r.date);
        var title = String(r.title || "").trim();
        if (title && !GENERIC.test(title)) {
          var b = document.createElement("b");
          if (noteDay && noteHref && phxDay(r.date) === noteDay) { var a = document.createElement("a"); a.href = noteHref; a.textContent = title; b.appendChild(a); }
          else b.textContent = title;
          when.appendChild(b);
        }
        var bar = document.createElement("span"); bar.className = "bar-mi"; bar.style.setProperty("--w", longest ? ((Number(r.miles) || 0) / longest).toFixed(2) : "0");
        var mi = document.createElement("span"); mi.className = "mi num"; mi.textContent = Number(r.miles).toFixed(1);
        var u = document.createElement("small"); u.textContent = "mi"; mi.appendChild(u);
        li.appendChild(when); li.appendChild(bar); li.appendChild(mi); log.appendChild(li);
      });
    }
    if (feed.profileUrl && $("stravaLink")) $("stravaLink").href = feed.profileUrl;
  }
  var lastSig = "", polling = false;
  function fetchFeed(i) {
    if (i >= STRAVA.length) return Promise.resolve();
    return fetch(STRAVA[i], { headers: { Accept: "application/json" }, cache: "no-store" })
      .then(function (res) { if (!res.ok) throw new Error("bad status"); return res.json(); })
      .then(function (d) {
        if (!d || d.configured === false || d.error) return;
        var miles = typeof d.miles === "number" ? d.miles : d.totalMiles;
        if (typeof miles !== "number" || !isFinite(miles) || !(miles > 0)) return;   /* a dead feed is not a number */
        var sig = miles + "|" + d.rides + "|" + (d.recent && d.recent[0] ? d.recent[0].date : "");
        if (sig === lastSig) return;
        lastSig = sig;
        feed.miles = miles;
        if (typeof d.rides === "number") feed.rides = d.rides;
        if (d.updated) feed.updated = d.updated;
        if (d.profileUrl) feed.profileUrl = d.profileUrl;
        if (d.recent && d.recent.length) feed.recent = d.recent;
        paintFeed();
      })
      .catch(function () { return fetchFeed(i + 1); });
  }
  function refresh(force) {
    if (polling || (document.hidden && !force) || !window.fetch) return;
    polling = true;
    fetchFeed(0).then(function () { polling = false; }, function () { polling = false; });
  }
  if ($("daysTo")) {
    var left = Math.max(0, Math.ceil((YEAR_START - Date.now()) / DAY));
    $("daysTo").textContent = fmt(left);
    if ($("daysW")) $("daysW").textContent = left === 1 ? "day" : "days";
  }
  /* Strava's brand rules: data from their API carries their name. One quiet line under the log. */
  (function () {
    var log = $("log");
    if (!log || !log.parentNode || document.querySelector(".strava-attrib")) return;
    var p = document.createElement("p"); p.className = "strava-attrib";
    var a = document.createElement("a"); a.href = "https://www.strava.com"; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = "Powered by Strava";
    p.appendChild(a); log.parentNode.insertBefore(p, log.nextSibling);
  })();
  if (feed.miles > 0) paintFeed();
  refresh(true);
  setInterval(refresh, POLL_MS);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) refresh(); });

  /* —— analytics (the tag is Netlify snippet injection, G-DWNR81WXS3). No personal data in any event. —— */
  var ORG_HOSTS = /(^|\.)(runsignup\.com|onenten\.org|lalgbtcenter\.org|sfaf\.org)$/;
  function cfcTrack(name, params) { try { if (typeof window.gtag === "function") window.gtag("event", name, params || {}); } catch (e) {} }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href^='http']") : null;
    if (!a) return;
    var host; try { host = new URL(a.href).hostname; } catch (er) { return; }
    if (host === location.hostname) return;
    if (ORG_HOSTS.test(host)) cfcTrack("org_ride_click", { link_domain: host, link_url: a.href });
  }, true);
  /* which finder (the strip's Group rides / Events) gets used */
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest(".finder-tile") : null;
    if (t) cfcTrack("finder_click", { finder: /\/events\//.test(t.getAttribute("href") || "") ? "events" : "group_rides" });
  }, true);

  /* —— the opening (Nov 11, 2026; data/hero-open.json, scripts/build-home.js). Robert's reel, made of the page: his
     photos flick through as tiles on the hero's own ground, the count runs up on a pink plate, and the hero's picture
     cuts in. It is not a film: there is no <video>, so no phone can put a play button on it. It runs once, ends inside
     five seconds and never loops, so there is nothing to pause and no button (WCAG 2.2.2).
     The <head> decided before the first paint whether it runs (<html class="hero-opening">: never under reduced motion,
     Save-Data or a slow connection, never on a link to a section, once a visit unless the page is reloaded) and began
     fetching the tiles. This shows each [data-in] element from its second to its [data-out], counts the number up to
     the page's own tally, and at the end takes the class and the opening's markup away, which leaves the hero. If a
     tile is broken, the tiles aren't in two seconds after the <head> asked for them (its timer), the tab is in the
     background, or the screen has no room for tiles, it ends at once. —— */
  (function () {
    var root = document.documentElement, stage = $("heroOpen"), over = false;
    function end() {
      if (over) return; over = true;
      root.classList.remove("hero-opening");
      /* tiles still on their way are let go, so a reader who never sees the opening doesn't pay for the rest of it */
      (window.cfcOpen || []).forEach(function (im) { im.src = ""; });
      if (stage) [].forEach.call(stage.querySelectorAll("img[src]"), function (im) { im.removeAttribute("src"); });
      var wrap = stage && stage.parentNode, cover = document.querySelector(".hero-open");
      if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
      if (cover && cover.parentNode) cover.parentNode.removeChild(cover);
      window.cfcOpen = null;
    }
    if (!stage || !root.classList.contains("hero-opening")) return;
    if (!window.Promise || !window.requestAnimationFrame || !window.performance || document.hidden) return end();
    var END = parseFloat(stage.getAttribute("data-end")) || 0;
    var count = (stage.getAttribute("data-count") || "").split(" ").map(parseFloat);
    var num = $("heroOpenN"), card = stage.querySelector(".ho-card");
    var total = feed.miles > 0 ? Math.round(feed.miles) : 0;
    /* no count to show (the page carries none): stop where the card would have come in. Never a 0. */
    if (!total && card) END = Math.min(END, parseFloat(card.getAttribute("data-in")) || END);
    var beats = [].map.call(stage.querySelectorAll("[data-in]"), function (el) {
      var out = parseFloat(el.getAttribute("data-out"));
      return { el: el, t0: parseFloat(el.getAttribute("data-in")) || 0, t1: isNaN(out) ? Infinity : out, on: false };
    });
    var imgs = [].slice.call(stage.querySelectorAll("img[data-src]"));
    var ready = Promise.all(imgs.map(function (im) {
      im.src = im.getAttribute("data-src");
      if (im.decode) return im.decode();
      return new Promise(function (ok, no) { if (im.complete && im.naturalWidth) return ok(); im.onload = ok; im.onerror = no; });
    }));
    ready.then(function () {
      /* the <head>'s timer gave up, the tab went away, or there is no room for tiles on this screen (under 88px
         above the mark on a phone, under 200px beside the words on a wide one, or a hero taller than the screen) */
      var heroEl = document.querySelector(".hero");
      if (over || !END || !root.classList.contains("hero-opening") || document.hidden || stage.clientHeight < 88 || stage.clientWidth < 200 ||
          (heroEl && heroEl.offsetHeight > window.innerHeight + 80)) return end();
      window.cfcOpenGo = true;
      try { sessionStorage.setItem("cfc-open", "1"); } catch (e) {}
      /* a phone's second room for tiles: to the right of the mark, from the top of the strip to the foot of the mark
         (home.css, .ho-t--side). Measured once, here, in px from the stage's own box. */
      var mark = null, sr = stage.getBoundingClientRect();
      [].forEach.call(document.querySelectorAll(".hero-mark"), function (m) { if (m.getBoundingClientRect().width) mark = m; });
      if (mark) {
        var mr = mark.getBoundingClientRect();
        stage.style.setProperty("--side-l", Math.round(mr.right - sr.left + 24) + "px");
        stage.style.setProperty("--side-w", Math.max(0, Math.round(sr.right - mr.right - 24)) + "px");
        stage.style.setProperty("--side-d", Math.max(0, Math.round(mr.bottom - sr.bottom)) + "px");
        stage.style.setProperty("--mark-h", Math.round(mr.height) + "px");
      }
      var t0 = performance.now(), shown = -1;
      setTimeout(end, (END + 1) * 1000);          /* a tab put in the background stops drawing frames: this still ends it */
      (function frame(now) {
        if (over) return;
        var t = (now - t0) / 1000;
        if (t >= END) return end();
        for (var i = 0; i < beats.length; i++) {
          var b = beats[i], on = t >= b.t0 && t < b.t1;
          if (on !== b.on) { b.on = on; if (on) b.el.setAttribute("data-on", ""); else b.el.removeAttribute("data-on"); }
        }
        if (num && total && t >= count[0]) {
          /* the reel's count: it starts a third of the way up and eases onto the real number */
          var p = Math.min(1, (t - count[0]) / Math.max(.01, count[1] - count[0]));
          var n = Math.round(total * (.36 + .64 * (1 - Math.pow(1 - p, 3))));
          if (n !== shown) { shown = n; num.textContent = fmt(n); }
        }
        requestAnimationFrame(frame);
      })(t0);
    }, end);
  })();

  /* —— today's film (#today): a tap on phones, on screen on desktop. One control, the disc on the poster (Oct 27, 2026):
     it never hides; the figure's data-playing swaps its glyph (home.css) and its label says what it does next,
     "Pause" or "Play, N seconds" (WCAG 2.2.2). —— */
  /* the same player for his film under the 10,000 (#road, Oct 28, 2026) */
  function smallFilm(tv, tFig, tPlay) {
    if (!tv) return;
    tv.muted = true;
    var tUser = null;
    /* the hero's test: Save-Data or a slow connection keeps the still until the disc asks for the film */
    var tConn = navigator.connection || {};
    var tSlow = !!tConn.saveData || /(^|-)2g$|^3g$/.test(String(tConn.effectiveType || ""));
    var tSecs = tPlay ? tPlay.getAttribute("data-seconds") || "" : "";
    var tPaint = function () {
      var on = !tv.paused;
      if (tFig) tFig.setAttribute("data-playing", on ? "true" : "false");
      if (tPlay) tPlay.setAttribute("aria-label", on ? "Pause" : "Play" + (tSecs ? ", " + tSecs + " seconds" : ""));
    };
    var tGo = function () { tv.preload = "auto"; var q = tv.play(); if (q && q.catch) q.catch(function () {}); };
    var tToggle = function () { if (tv.paused) { tUser = true; tGo(); } else { tUser = false; tv.pause(); } };
    tv.addEventListener("play", tPaint); tv.addEventListener("pause", tPaint);
    tv.addEventListener("error", function () { if (tPlay) tPlay.hidden = true; }, true);
    tv.addEventListener("click", tToggle);
    if (tPlay) tPlay.addEventListener("click", tToggle);
    tPaint();
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) { if (!tv.paused) tv.pause(); return; }
      if (tUser === true || (tUser === null && wide && !reduce && !tSlow)) tGo();
    }, { threshold: 0.4 }).observe(tv);
  }
  smallFilm($("todayVid"), $("todayFig"), $("todayPlay"));
  smallFilm($("roadVid"), $("roadFig"), $("roadPlay"));

  /* —— the nav: clear over the film, solid once the film has scrolled under it —— */
  var nav = $("nav"), hero = document.querySelector(".hero");
  if (nav && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { nav.setAttribute("data-solid", es[0].isIntersecting ? "false" : "true"); }, { rootMargin: "-64px 0px 0px 0px" }).observe(hero);
  } else if (nav) nav.setAttribute("data-solid", "true");

  /* press states on touch (iOS only applies :active when a touch listener exists) */
  document.addEventListener("touchstart", function () {}, { passive: true });

  /* —— menu —— */
  var menu = $("menu"), menuBtn = $("menuBtn");
  if (menu && menuBtn) {
    var setMenu = function (open, refocus) {
      menu.hidden = !open;
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) $("menuClose").focus(); else if (refocus) menuBtn.focus();
    };
    menuBtn.addEventListener("click", function () { setMenu(true); });
    $("menuClose").addEventListener("click", function () { setMenu(false, true); });
    menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) setMenu(false, false); });
    document.addEventListener("keydown", function (e) {
      if (menu.hidden) return;
      if (e.key === "Escape") { setMenu(false, true); return; }
      if (e.key !== "Tab") return;
      var f = menu.querySelectorAll("a[href],button"), first = f[0], lastF = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastF.focus(); }
      else if (!e.shiftKey && document.activeElement === lastF) { e.preventDefault(); first.focus(); }
    });
  }
})();

/* —— the sign (#sign): after CYCLE FOR there is only the blank, a rose bar, until a visitor types; then their word sits
   on the plate. Nothing is sent anywhere. Every [data-sign-plate] shows the one word. —— */
(function () {
  var plates = document.querySelectorAll("[data-sign-plate]"), inputs = document.querySelectorAll("[data-sign-input]"), resets = document.querySelectorAll("[data-sign-reset]");
  if (!plates.length || !inputs.length) return;
  var typed = "";
  var each = function (list, fn) { for (var i = 0; i < list.length; i++) fn(list[i]); };
  function paint(from) {
    each(plates, function (p) { p.textContent = typed; p.setAttribute("data-empty", typed ? "false" : "true"); });
    each(inputs, function (f) { if (f !== from) f.value = typed; });
    var sr = document.getElementById("signSr");
    if (sr) sr.textContent = "Cycle for" + (typed ? " " + typed : "");
    each(resets, function (b) { b.hidden = !typed; });
  }
  each(inputs, function (f) { f.addEventListener("input", function () { typed = f.value.trim().slice(0, 22); paint(f); }); });
  each(resets, function (b) { b.addEventListener("click", function () { typed = ""; paint(null); for (var i = 0; i < inputs.length; i++) if (inputs[i].offsetParent) { inputs[i].focus(); break; } }); });
  paint(null);
})();
