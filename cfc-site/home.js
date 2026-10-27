/* Cycle for Change — the homepage (the editorial homepage, Oct 26, 2026).
   Loaded by cfc-site/index.html (scripts/build-home.js). No dependencies. Every block checks for its own
   elements first, so a block whose markup isn't on the page does nothing.

   It talks to one thing: /api/strava → /.netlify/functions/strava (miles, rides, the last rides). Every number in
   the HTML is a fallback baked from the last read (scripts/tally.js); a broken feed is never painted as 0.

   Oct 26, 2026: the old page's dead code is gone (the chart, the waitlist form, the Instagram fetch nothing used,
   the hero film for a #heroVid that no longer existed, the phone tally bar). New: the hero film. */
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
  if ($("daysTo")) $("daysTo").textContent = fmt(Math.max(0, Math.ceil((YEAR_START - Date.now()) / DAY)));
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

  /* —— the hero film (Oct 26, 2026). The poster is on screen first and is the page's largest paint. After the page has
     loaded, the film for this screen's shape loads and plays muted, inline, on a loop — on phones too (Robert's
     approved direction) — unless the reader asked for less motion or Save-Data is on. The button always stops it
     (WCAG 2.2.2); a stop is kept for the visit. Off screen it pauses. If anything fails, the still stays. —— */
  (function () {
    var hero = document.querySelector(".hero"), v = $("heroFilm"), btn = $("heroPause");
    if (!hero || !v || !btn || !v.canPlayType) return;
    var label = btn.querySelector(".hp-label");
    var saveData = !!(navigator.connection && navigator.connection.saveData);
    var KEY = "cfc-film-off", stopped = false;
    try { stopped = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
    var wideQ = v.getAttribute("data-wide-q"), shape = "";
    function srcFor() {
      var s = mq(wideQ) ? "wide" : "phone";
      var mp4 = v.getAttribute("data-" + s + "-mp4"), webm = v.getAttribute("data-" + s + "-webm");
      return { shape: s, src: v.canPlayType('video/mp4; codecs="avc1.640028"') ? mp4 : v.canPlayType('video/webm; codecs="vp9"') ? webm : "" };
    }
    function paint() {
      var on = !v.paused && hero.getAttribute("data-film") === "on";
      btn.setAttribute("aria-pressed", on ? "false" : "true");
      if (label) label.textContent = on ? "Pause the film" : "Play the film";
      hero.setAttribute("data-playing", on ? "true" : "false");
    }
    function go() { var q = v.play(); if (q && q.catch) q.catch(function () { paint(); }); }
    function load() {
      var s = srcFor(); if (!s.src) return false;
      if (s.shape === shape) return true;
      shape = s.shape; v.src = s.src; v.preload = "auto"; v.load(); return true;
    }
    v.addEventListener("playing", function () { hero.setAttribute("data-film", "on"); paint(); });
    v.addEventListener("pause", paint);
    v.addEventListener("error", function () { hero.setAttribute("data-film", "off"); btn.hidden = true; }, true);
    btn.addEventListener("click", function () {
      if (v.paused) { stopped = false; try { sessionStorage.removeItem(KEY); } catch (e) {} if (load()) go(); }
      else { stopped = true; try { sessionStorage.setItem(KEY, "1"); } catch (e) {} v.pause(); }
      paint();
    });
    var inView = true;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) {
      inView = es[0].isIntersecting;
      if (!inView) { if (!v.paused) v.pause(); }
      else if (!stopped && v.src && hero.getAttribute("data-auto") === "true") go();
    }, { threshold: 0.15 }).observe(hero);
    /* a phone turned on its side gets the other film */
    if (window.matchMedia) { var m = matchMedia(wideQ); var swap = function () { if (!v.src) return; var was = !v.paused; if (load() && was) go(); }; if (m.addEventListener) m.addEventListener("change", swap); else if (m.addListener) m.addListener(swap); }
    btn.hidden = false;
    paint();
    if (reduce || saveData || stopped) return;          /* the still stays; the button plays it */
    function start() { if (!load()) { btn.hidden = true; return; } hero.setAttribute("data-auto", "true"); if (inView) go(); }
    if (document.readyState === "complete") setTimeout(start, 250);
    else window.addEventListener("load", function () { setTimeout(start, 250); });
  })();

  /* —— today's film (#today): a tap on phones, on screen on desktop; Play / Pause under it (WCAG 2.2.2) —— */
  var tv = $("todayVid"), tFig = $("todayFig"), tPlay = $("todayPlay"), tBtn = $("todayBtn"), tLabel = $("todayBtnLabel");
  if (tv) {
    tv.muted = true;
    var tUser = null;
    var tPaint = function () {
      var on = !tv.paused;
      if (tFig) tFig.setAttribute("data-playing", on ? "true" : "false");
      if (tBtn) tBtn.setAttribute("data-playing", on ? "true" : "false");
      if (tLabel) tLabel.textContent = on ? "Pause" : "Play";
    };
    var tGo = function () { tv.preload = "auto"; var q = tv.play(); if (q && q.catch) q.catch(function () {}); };
    var tToggle = function () { if (tv.paused) { tUser = true; tGo(); } else { tUser = false; tv.pause(); } };
    tv.addEventListener("play", tPaint); tv.addEventListener("pause", tPaint);
    tv.addEventListener("error", function () { if (tPlay) tPlay.hidden = true; if (tBtn) tBtn.hidden = true; }, true);
    tv.addEventListener("click", tToggle);
    if (tPlay) tPlay.addEventListener("click", function () { tToggle(); if (tBtn) tBtn.focus({ preventScroll: true }); });
    if (tBtn) tBtn.addEventListener("click", tToggle);
    tPaint();
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) { if (!tv.paused) tv.pause(); return; }
      if (tUser === true || (tUser === null && wide && !reduce)) tGo();
    }, { threshold: 0.4 }).observe(tv);
  }

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
