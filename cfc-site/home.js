/* Cycle for Change — the homepage and the pledge page (Sept 2026).
   Loaded by cfc-site/index.html and cfc-site/pledge/index.html. No dependencies.
   Every block below checks for its own elements first, so the same file runs
   on both pages: the home page has the hero, the vote and the menu; the pledge
   page has the board, the vote, the rate chips, the ride log and the chart.

   It talks to the same back end the live homepage uses and changes none of it:
     /api/strava  →  /.netlify/functions/strava     miles, rides, last rides, chart
     /.netlify/functions/votes                       the ballot (GET + POST)
     /.netlify/functions/pledges                     names on the board
     /.netlify/functions/instagram                   profile link
     Netlify forms "pledges" and "waitlist"          the board and mile updates

   Every number in the HTML is a fallback. If a function is down or unconfigured
   the page keeps the fallback; a broken feed is never painted as 0 miles. */
(function () {
  "use strict";

  var GOAL = 10000;
  var SEASON_START = Date.UTC(2026, 5, 1, 7);   /* June 1 2026, midnight in Phoenix */
  var YEAR_START = Date.UTC(2027, 0, 1, 7);     /* Jan 1 2027, midnight in Phoenix */
  var DAY = 86400000;
  var POLL_MS = 60 * 1000;
  var STRAVA = ["/api/strava", "/.netlify/functions/strava"];
  var INSTAGRAM_URL = "https://www.instagram.com/cycl_eforchange";
  var GENERIC = /^(early morning|morning|afternoon|evening|lunch|night)\s+(ride|run|swim|walk)$/i;

  var reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var $ = function (id) { return document.getElementById(id); };
  var fmt = function (n) { return Math.round(n).toLocaleString("en-US"); };

  /* What the page shows until the feed answers: the function's own output on
     Oct 1 2026. x = how far through the ride list (0–100), y = cumulative miles. */
  var feed = {
    miles: 3359.5,
    rides: 92,
    updated: "2026-10-01T16:47:04.691Z",
    profileUrl: "https://www.strava.com/athletes/22899089",
    recent: [
      { discipline: "bike", title: "Somo Sunday", miles: 56, date: "2026-09-27T13:47:01Z" },
      { discipline: "bike", title: "Morning Ride", miles: 60.2, date: "2026-09-26T12:55:17Z" },
      { discipline: "bike", title: "Morning Ride", miles: 32.7, date: "2026-09-25T13:18:16Z" },
      { discipline: "bike", title: "Morning Ride", miles: 36.5, date: "2026-09-23T14:09:32Z" },
      { discipline: "bike", title: "Morning Ride", miles: 41.6, date: "2026-09-21T14:04:09Z" },
      { discipline: "bike", title: "Morning Ride", miles: 29, date: "2026-09-20T14:35:05Z" }
    ],
    chart: [[0, 35.2], [9, 278.6], [18, 564.5], [26, 864.8], [35, 1258.9], [44, 1528.7], [53, 1765.8], [62, 2050.5], [70, 2329], [79, 2618.6], [88, 2925.7], [97, 3210.6], [100, 3359.5]]
  };

  /* ————————————————————————————————————————————————
     the tally
     ———————————————————————————————————————————————— */

  var milesEls = document.querySelectorAll("[data-miles]");
  var shownMiles = feed.miles;
  var rolled = false, rolling = false;

  function paintMiles(n) {
    for (var i = 0; i < milesEls.length; i++) milesEls[i].textContent = fmt(n);
  }

  /* the last few miles roll in once, like a head unit settling */
  function rollTo(target) {
    shownMiles = target;
    if (rolling) return;                      /* the roll in flight converges on the new number */
    if (reduce || rolled || !window.requestAnimationFrame) { paintMiles(target); return; }
    rolled = true; rolling = true;
    var from = Math.max(0, target - 38), t0 = null;
    requestAnimationFrame(function frame(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / 1100), e = 1 - Math.pow(1 - k, 3);
      paintMiles(from + (shownMiles - from) * e);
      if (k < 1) requestAnimationFrame(frame); else { rolling = false; paintMiles(shownMiles); }
    });
  }

  function dayLabel(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "America/Phoenix" }).replace(",", "");
  }

  /* "this morning", "yesterday", "Sep 18" — same wording the live cover uses */
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

  function paintFeed() {
    rollTo(feed.miles);
    if (feed.rides && $("rideCount")) $("rideCount").textContent = fmt(feed.rides);

    var daysIn = Math.max(1, Math.floor((Date.parse(feed.updated) - SEASON_START) / DAY) + 1);
    if (isFinite(daysIn) && $("pace")) $("pace").textContent = (feed.miles / daysIn).toFixed(1);

    var rides = feed.recent.filter(function (r) { return !r.discipline || r.discipline === "bike"; });
    if (!rides.length) rides = feed.recent;

    var last = rides[0];
    if (last && typeof last.miles === "number" && $("lastRide")) {
      var w = whenLabel(last.date);
      $("lastRide").textContent = last.miles.toFixed(1) + " mi" + (w ? " · " + w : "");
      /* "Live" is a claim: only say it when the ride is from the last day and a half. Otherwise it is just the last ride. */
      var fresh = Date.now() - Date.parse(last.date) < 36 * 36e5;
      if ($("liveWord")) $("liveWord").textContent = fresh ? "Live" : "Last ride";
      if ($("live")) $("live").classList.toggle("is-live", fresh);
    }

    var log = $("log");
    var logMax = log && log.getAttribute("data-max") ? parseInt(log.getAttribute("data-max"), 10) || 5 : 5;
    if (log) { while (log.firstChild) log.removeChild(log.firstChild); }
    /* Pass 8: each row carries a bar, its length the ride's miles against the longest ride shown */
    var shown = rides.slice(0, logMax), longest = 0;
    shown.forEach(function (r) { longest = Math.max(longest, Number(r.miles) || 0); });
    if (log) shown.forEach(function (r) {
      var li = document.createElement("li");
      var when = document.createElement("span"); when.className = "when"; when.textContent = dayLabel(r.date);
      var title = String(r.title || "").trim();
      if (title && !GENERIC.test(title)) { var b = document.createElement("b"); b.textContent = title; when.appendChild(b); }
      var bar = document.createElement("span"); bar.className = "bar-mi"; bar.style.setProperty("--w", longest ? ((Number(r.miles) || 0) / longest).toFixed(2) : "0");
      var mi = document.createElement("span"); mi.className = "mi num"; mi.textContent = Number(r.miles).toFixed(1);
      var u = document.createElement("small"); u.textContent = "MI"; mi.appendChild(u);
      li.appendChild(when); li.appendChild(bar); li.appendChild(mi); log.appendChild(li);
    });

    if (feed.profileUrl) ["stravaLink", "footStrava"].forEach(function (id) { var a = $(id); if (a) a.href = feed.profileUrl; });
    buildPoints();
    draw();
  }

  function fetchFeed(i) {
    if (i >= STRAVA.length) return Promise.resolve();      /* keep the fallback */
    return fetch(STRAVA[i], { headers: { Accept: "application/json" }, cache: "no-store" })
      .then(function (res) { if (!res.ok) throw new Error("bad status"); return res.json(); })
      .then(function (d) {
        if (!d || d.configured === false || d.error) return;
        var miles = typeof d.miles === "number" ? d.miles : d.totalMiles;
        if (typeof miles !== "number" || !isFinite(miles)) return;
        if (miles === 0 && (!d.recent || !d.recent.length)) return;   /* a dead feed, not a number */
        /* nothing new since the last read: leave the page alone */
        var sig = miles + "|" + d.rides + "|" + (d.recent && d.recent[0] ? d.recent[0].date : "");
        if (sig === lastSig) return;
        lastSig = sig;
        feed.miles = miles;
        if (typeof d.rides === "number") feed.rides = d.rides;
        if (d.updated) feed.updated = d.updated;
        if (d.profileUrl) feed.profileUrl = d.profileUrl;
        if (d.recent && d.recent.length) feed.recent = d.recent;
        if (d.chartPoints && d.chartPoints.length > 1) feed.chart = d.chartPoints.map(function (p) { return [p.x, p.y]; });
        paintFeed();
      })
      .catch(function () { return fetchFeed(i + 1); });
  }

  var polling = false, lastSig = "";
  function refresh(force) {
    if (polling || (document.hidden && !force) || !window.fetch) return;
    polling = true;
    fetchFeed(0).then(function () { polling = false; }, function () { polling = false; });
  }

  if ($("daysTo")) $("daysTo").textContent = fmt(Math.max(0, Math.ceil((YEAR_START - Date.now()) / DAY)));

  /* ————————————————————————————————————————————————
     the chart: one series, the line; the last point is the live one
     ———————————————————————————————————————————————— */

  var chart = $("chart"), tip = $("tip"), NS = "http://www.w3.org/2000/svg";
  var pts = [], geo = null, cur = -1;

  function buildPoints() {
    if (!chart) return;
    pts = feed.chart.map(function (p) { return { ride: Math.round(1 + p[0] / 100 * (feed.rides - 1)), x: p[0], y: p[1] }; });
    var tb = document.querySelector("#chartTable tbody");
    while (tb.firstChild) tb.removeChild(tb.firstChild);
    pts.forEach(function (p) {
      var tr = document.createElement("tr"), a = document.createElement("td"), b = document.createElement("td");
      a.textContent = p.ride; b.textContent = p.y.toLocaleString("en-US"); tr.appendChild(a); tr.appendChild(b); tb.appendChild(tr);
    });
    chart.setAttribute("aria-label", "Line chart: cumulative miles over " + fmt(feed.rides) + " rides since June 1, rising to " + fmt(feed.miles) + " miles. Use the left and right arrow keys to read values.");
  }

  function el(name, attrs) { var n = document.createElementNS(NS, name); for (var k in attrs) n.setAttribute(k, attrs[k]); return n; }

  /* a round ceiling a step above the data, and four clean ticks under it */
  function scale(max) {
    var step = max > 8000 ? 2500 : max > 4000 ? 2000 : max > 1600 ? 1000 : max > 800 ? 500 : 250;
    var top = Math.ceil((max * 1.08) / step) * step, ticks = [];
    for (var v = 0; v <= top - step / 2; v += step) ticks.push(v);
    return { top: top + step * 0.18, ticks: ticks };
  }

  function draw() {
    if (!chart || !pts.length) return;
    var old = chart.querySelector("svg"); if (old) chart.removeChild(old);
    var W = Math.max(280, chart.clientWidth), H = Math.round(Math.min(340, Math.max(210, W * 0.52)));
    var pad = { t: 18, r: 18, b: 30, l: 48 }, sc = scale(pts[pts.length - 1].y);
    var X = function (x) { return pad.l + x / 100 * (W - pad.l - pad.r); };
    var Y = function (y) { return pad.t + (1 - y / sc.top) * (H - pad.t - pad.b); };
    var mono = "Space Mono, ui-monospace, monospace";
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, "aria-hidden": "true" });
    sc.ticks.forEach(function (v) {
      svg.appendChild(el("line", { x1: pad.l, x2: W - pad.r, y1: Y(v), y2: Y(v), stroke: "rgba(232,223,208,.16)", "stroke-width": 1 }));
      var t = el("text", { x: pad.l - 10, y: Y(v) + 4, "text-anchor": "end", fill: "#C4B7A2", "font-family": mono, "font-size": 10.5 });
      t.textContent = v.toLocaleString("en-US"); svg.appendChild(t);
    });
    var lx = el("text", { x: pad.l, y: H - 8, fill: "#C4B7A2", "font-family": mono, "font-size": 10.5, "letter-spacing": "1.2" }); lx.textContent = "RIDE 1"; svg.appendChild(lx);
    var rx = el("text", { x: W - pad.r, y: H - 8, "text-anchor": "end", fill: "#C4B7A2", "font-family": mono, "font-size": 10.5, "letter-spacing": "1.2" }); rx.textContent = "RIDE " + fmt(feed.rides); svg.appendChild(rx);
    var d = pts.map(function (p, i) { return (i ? "L" : "M") + X(p.x).toFixed(1) + " " + Y(p.y).toFixed(1); }).join(" ");
    svg.appendChild(el("path", { d: d + " L" + X(100).toFixed(1) + " " + Y(0) + " L" + X(0).toFixed(1) + " " + Y(0) + " Z", fill: "rgba(232,223,208,.1)", stroke: "none" }));
    svg.appendChild(el("path", { d: d, fill: "none", stroke: "#E8DFD0", "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }));
    var hair = el("line", { x1: 0, x2: 0, y1: pad.t, y2: H - pad.b, stroke: "rgba(232,223,208,.55)", "stroke-width": 1, visibility: "hidden" }); svg.appendChild(hair);
    var hov = el("circle", { r: 5, fill: "#E8DFD0", stroke: "#1A1D18", "stroke-width": 2, visibility: "hidden" }); svg.appendChild(hov);
    var end = pts[pts.length - 1];
    svg.appendChild(el("circle", { cx: X(end.x), cy: Y(end.y), r: 6, fill: "#C6FF00", stroke: "#1A1D18", "stroke-width": 2 }));
    var lab = el("text", { x: X(end.x) - 12, y: Y(end.y) - 12, "text-anchor": "end", fill: "#E8DFD0", "font-family": "Outfit, system-ui, sans-serif", "font-weight": 800, "font-size": 15 });
    lab.textContent = fmt(end.y) + " mi"; svg.appendChild(lab);
    chart.insertBefore(svg, tip);
    geo = { X: X, Y: Y, W: W, hair: hair, hov: hov };
    if (cur >= 0) show(Math.min(cur, pts.length - 1));
  }

  function show(i) {
    if (!geo || !pts[i]) return;
    cur = i; var p = pts[i], x = geo.X(p.x), y = geo.Y(p.y);
    geo.hair.setAttribute("x1", x); geo.hair.setAttribute("x2", x); geo.hair.setAttribute("visibility", "visible");
    geo.hov.setAttribute("cx", x); geo.hov.setAttribute("cy", y); geo.hov.setAttribute("visibility", i === pts.length - 1 ? "hidden" : "visible");
    $("tipV").textContent = p.y.toLocaleString("en-US", { maximumFractionDigits: 1 }) + " mi";
    $("tipK").textContent = "Ride " + p.ride + " of " + fmt(feed.rides);
    tip.hidden = false;
    var half = tip.offsetWidth / 2, left = Math.min(geo.W - half, Math.max(half, x));
    tip.style.left = left + "px"; tip.style.top = Math.max(tip.offsetHeight + 2, y - 14) + "px";
  }
  function hide() { cur = -1; tip.hidden = true; if (geo) { geo.hair.setAttribute("visibility", "hidden"); geo.hov.setAttribute("visibility", "hidden"); } }
  function nearest(clientX) {
    var r = chart.getBoundingClientRect(), x = clientX - r.left, best = 0, bd = Infinity;
    pts.forEach(function (p, i) { var dd = Math.abs(geo.X(p.x) - x); if (dd < bd) { bd = dd; best = i; } });
    return best;
  }
  if (chart) {
    chart.addEventListener("pointermove", function (e) { if (geo) show(nearest(e.clientX)); });
    chart.addEventListener("pointerdown", function (e) { if (geo) show(nearest(e.clientX)); });
    chart.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") hide(); });
    document.addEventListener("pointerdown", function (e) { if (!chart.contains(e.target)) hide(); });
    chart.addEventListener("blur", hide);
    chart.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      var i = cur < 0 ? pts.length - 1 : cur + (e.key === "ArrowRight" ? 1 : -1);
      show(Math.min(pts.length - 1, Math.max(0, i)));
    });
    var rz; window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(draw, 120); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  }

  /* first paint from the fallback, then the live read; re-check every minute
     while the tab is visible, the way the live cover does */
  paintFeed();
  refresh(true);
  setInterval(refresh, POLL_MS);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) refresh(); });

  /* ————————————————————————————————————————————————
     what's a mile worth?
     ———————————————————————————————————————————————— */

  function kitFor(total) {
    if (total >= 2000) return "Jersey and bibs";
    if (total >= 1000) return "Jersey";
    if (total >= 200) return "Socks";
    if (total >= 100) return "Two bottles";
    return "—";
  }
  var money = function (el) { return parseFloat(String(el ? el.value : "").replace(/[^0-9.]/g, "")) || 0; };
  /* the pledge as chosen right now: {flat, cents, total, cap, org} */
  function pledgeNow() {
    var r = document.querySelector('#calc input[name="rate"]:checked');
    var v = r ? r.value : "2", flat = v === "flat";
    var cents = flat ? 0 : (parseInt(v, 10) || 2);
    var total = flat ? money($("pflat")) : cents * GOAL / 100;
    var cap = flat ? 0 : money($("pcap"));
    var o = document.querySelector('.orgpick input[name="org"]:checked');
    return { flat: flat, cents: cents, total: total, cap: cap, org: o ? o.value : "later" };
  }
  function paintCalc() {
    var p = pledgeNow(), flatRow = $("flatRow"), capRow = $("capRow");
    if (flatRow) flatRow.hidden = !p.flat;
    if (capRow) capRow.hidden = p.flat;
    var pays = p.total, at = $("calcAt");
    /* Pass 22: the total is what the rate comes to AT 10,000 mi — a rider read "5¢ × 10,000 miles $500"
       as a fixed price. Say the rate, the total, and where that total comes from. */
    if (at) at.hidden = p.flat || !!(p.cap && p.cap < p.total);
    if (p.flat) {
      $("calcEq").textContent = "A flat pledge";
      $("calcTotal").textContent = p.total ? "$" + fmt(p.total) : "$—";
    } else if (p.cap && p.cap < p.total) {
      pays = p.cap;
      $("calcEq").textContent = p.cents + "¢ a mile, capped at";
      $("calcTotal").textContent = "$" + fmt(p.cap);
    } else {
      $("calcEq").textContent = p.cents + "¢ a mile";
      $("calcTotal").textContent = "$" + fmt(p.total);
    }
    var kit = kitFor(pays);
    $("calcKit").textContent = kit === "—" ? "the thank-you" : kit.toLowerCase();
  }
  if ($("calc")) {
    $("calc").addEventListener("change", paintCalc);
    if ($("pflat")) $("pflat").addEventListener("input", paintCalc);
    if ($("pcap")) $("pcap").addEventListener("input", paintCalc);
    paintCalc();
  }
  /* texts: none (Oct 3, 2026 — Robert: no texts) */

  /* ————————————————————————————————————————————————
     the board: the newest names, and yours going up as you type it
     ———————————————————————————————————————————————— */

  var names = [];           /* [{name, ago, org}], newest first, from the pledges function */
  var countKnown = true;    /* false while the function can't read names back (no NETLIFY_API_TOKEN) */
  var onBoard = false;
  var castVote = null;      /* set by the ballot block below; the pledge form calls it on submit */
  var ORG_NAMES = { onenten: "one⋅n⋅ten", lalgbtcenter: "Los Angeles LGBT Center", sfaf: "San Francisco AIDS Foundation" };
  var pname = $("pname"), slots = $("slots"), form = $("pledgeForm"), okmsg = $("okmsg");
  var pad2 = function (n) { return n < 10 ? "0" + n : String(n); };
  if (form && pname && slots) {

  function row(n, text, open, ago, id, org) {
    var li = document.createElement("li");
    var b = document.createElement("span"); b.className = "name" + (open ? " open" : ""); b.textContent = text; if (id) b.id = id;
    if (n === "") { li.className = "nobib"; }   /* the count is unknown: no bib number on the line (Pass 10) */
    else { var a = document.createElement("span"); a.className = "n"; a.textContent = pad2(n); li.appendChild(a); }
    li.appendChild(b);
    if (ago) { var c = document.createElement("span"); c.className = "ago"; c.textContent = ago; li.appendChild(c); }
    if (org && ORG_NAMES[org]) { var d = document.createElement("span"); d.className = "org"; d.textContent = "for " + ORG_NAMES[org]; li.appendChild(d); }
    return li;
  }

  function paintBoard() {
    var total = names.length + (onBoard ? 1 : 0);
    $("boardCount").textContent = fmt(total);
    /* pledges are saved either way, so an unknown count is hidden, never shown as 0 */
    $("boardCount").parentNode.hidden = !countKnown;
    while (slots.firstChild) slots.removeChild(slots.firstChild);
    var typed = pname.value.trim();
    if (!countKnown) {
      /* no numbers when we can't see who's already there; the open lines under yours stay unnumbered */
      slots.appendChild(row("", typed || "Your name here", !typed, onBoard ? "just now" : "", "slotYou"));
      for (var j = 0; j < 3; j++) slots.appendChild(row("", "Open", true));
      return;
    }
    /* your row sits on top, numbered as the next one up */
    slots.appendChild(row(names.length + 1, typed || "Your name here", !typed, onBoard ? "just now" : "", "slotYou"));
    if (!names.length) {
      /* nobody yet: the next three rows are open */
      for (var k = 2; k <= 4; k++) slots.appendChild(row(k, "Open", true));
      return;
    }
    /* newest first, counting down; the rest are one line */
    names.slice(0, 4).forEach(function (p, i) { slots.appendChild(row(names.length - i, p.name, false, p.ago, null, p.org)); });
    if (names.length > 4) {
      var more = document.createElement("li"); more.className = "more";
      more.textContent = "+ " + fmt(names.length - 4) + " more";
      slots.appendChild(more);
    }
  }

  pname.addEventListener("input", function () {
    if (onBoard) return;
    var you = $("slotYou"), v = pname.value.trim();
    you.textContent = v || "Your name here";
    you.classList.toggle("open", !v);
  });

  /* the pledge in one sentence, for the thank-you and the share line */
  function pledgeLine(p, orgId) {
    var to = ORG_NAMES[orgId] ? ORG_NAMES[orgId] : "the org you pick";
    if (p.flat) return (p.total ? "$" + fmt(p.total) + ", flat" : "A flat pledge") + ", to " + to + ".";
    var s = p.cents + "¢ a mile. If I ride all 10,000, that’s $" + fmt(p.total);
    if (p.cap && p.cap < p.total) s += ", capped at $" + fmt(p.cap) + ",";
    return s + " to " + to + ".";
  }

  function showDone(p, orgId) {
    var done = $("done");
    if (!done) { okmsg.textContent = "You’re on the board. See you out there."; okmsg.hidden = false; return; }
    var n = countKnown ? names.length + 1 : 0;
    $("doneH").textContent = (n ? "#" + n + ". " : "") + "See you out there.";
    $("doneLine").textContent = pledgeLine(p, orgId);
    form.hidden = true;
    done.hidden = false;
    drawCard(pname.value.trim(), p, orgId, n);
    try { done.focus({ preventScroll: false }); } catch (_) { done.focus(); }
  }

  /* ————————————————————————————————————————————————
     the card (Pass 10, Sept 30 2026): a 1080×1350 poster of the pledge, drawn once the
     pledge is in — the stack, I'M ON THE BOARD, the name, the pledge line, the link.
     Shown under the thank-you; the share button sends it as an image where the browser
     can (iOS/Android share sheet), "Save the card" downloads it. Bone, asphalt, creosote.
     ———————————————————————————————————————————————— */
  var cardBlob = null;
  function drawCard(name, p, orgId, bib) {
    var wrap = $("cardWrap"), img = $("cardImg"), save = $("cardSave");
    if (!wrap || !img || !document.createElement("canvas").getContext) return;
    var W = 1080, H = 1350, M = 72;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var BONE = "#E8DFD0", ASPHALT = "#2A2E28", CREOSOTE = "#4A5639", MUTE = "#5F5E56";
    var disp = function (px) { return "800 " + px + "px Outfit, 'Helvetica Neue', Arial, sans-serif"; };
    var mono = function (px) { return "400 " + px + "px 'Space Mono', Menlo, monospace"; };
    var spaced = function (t, x, y, tr) { /* letter-spaced mono, drawn by hand */
      var cx = x; for (var i = 0; i < t.length; i++) { g.fillText(t[i], cx, y); cx += g.measureText(t[i]).width + tr; } return cx; };
    var fit = function (t, max, px, floor) { g.font = disp(px); while (g.measureText(t).width > max && px > floor) { px -= 4; g.font = disp(px); } return px; };
    var paint = function () {
      g.fillStyle = BONE; g.fillRect(0, 0, W, H);
      g.textBaseline = "alphabetic"; g.textAlign = "left";
      /* the stack */
      g.font = disp(44); g.fillStyle = ASPHALT; g.fillText("CYCLE", M, M + 40);
      g.fillStyle = CREOSOTE; g.fillText("FOR", M, M + 84);
      g.fillStyle = ASPHALT; g.fillText("CHANGE", M, M + 128);
      /* the year, the bib */
      g.font = mono(26); g.fillStyle = ASPHALT; g.textAlign = "right";
      g.fillText("2027", W - M, M + 30);
      g.font = mono(18); g.fillStyle = CREOSOTE;
      g.fillText("10,000 MILES", W - M, M + 62); g.fillText("ALL ON THE BIKE", W - M, M + 88);
      if (bib) { g.font = disp(30); g.fillStyle = ASPHALT; var bt = "#" + bib, bw = g.measureText(bt).width + 36; g.lineWidth = 3; g.strokeStyle = ASPHALT; g.strokeRect(W - M - bw, M + 112, bw, 54); g.fillText(bt, W - M - 18, M + 152); }
      g.textAlign = "left";
      /* the line */
      g.fillStyle = ASPHALT; g.font = disp(152);
      g.fillText("I\u2019M ON", M - 6, 590); g.fillText("THE BOARD.", M - 6, 730);
      /* the name, fitted; two lines if it has to */
      var nm = String(name || "").toUpperCase(), px = fit(nm, W - 2 * M, 96, 56), y = 880;
      if (g.measureText(nm).width > W - 2 * M) {
        var words = nm.split(" "), a = "", b = "";
        for (var i = 0; i < words.length; i++) { var t = (a ? a + " " : "") + words[i]; if (g.measureText(t).width <= W - 2 * M || !a) a = t; else b = (b ? b + " " : "") + words[i]; }
        g.fillStyle = ASPHALT; g.fillText(a, M, y); if (b) { g.fillText(b, M, y + px * 1.02); y += px * 1.02; }
      } else { g.fillStyle = ASPHALT; g.fillText(nm, M, y); }
      /* the rule and the pledge */
      g.fillStyle = ASPHALT; g.fillRect(M, y + 48, W - 2 * M, 2);
      g.font = mono(24); g.fillStyle = ASPHALT;
      var line = p.flat ? ((p.total ? "$" + fmt(p.total) + " FLAT" : "A FLAT PLEDGE"))
        : (p.cap && p.cap < p.total) ? (p.cents + "\u00A2 A MILE \u00B7 CAPPED AT $" + fmt(p.cap))
        : (p.cents + "\u00A2 A MILE \u00B7 $" + fmt(p.total) + " IF HE RIDES ALL 10,000");
      spaced(line, M, y + 104, 3);
      g.fillStyle = CREOSOTE; spaced("FOR " + (ORG_NAMES[orgId] ? ORG_NAMES[orgId].toUpperCase() : "THE ORG YOU PICK"), M, y + 146, 3);
      /* the foot */
      g.font = mono(22); g.fillStyle = ASPHALT; spaced("CYCLEFORCHANGE.ORG/PLEDGE", M, H - M, 3);
      g.fillStyle = MUTE; g.textAlign = "right"; g.fillText("FREE TO JOIN. NO CARD.", W - M, H - M); g.textAlign = "left";
    };
    var show = function () {
      paint();
      try { img.src = cv.toDataURL("image/png"); } catch (_) { return; }
      img.alt = "Your pledge card: I\u2019m on the board. " + name + ". " + pledgeLine(p, orgId);
      wrap.hidden = false;
      if (save) { save.href = img.src; save.hidden = false; }
      if (cv.toBlob) cv.toBlob(function (b) { cardBlob = b; }, "image/png");
    };
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load(disp(100)), document.fonts.load(mono(24))]).then(show, show);
    } else show();
  }

  var shareBtn = $("shareBtn"), shareMsg = $("shareMsg");
  if (shareBtn) shareBtn.addEventListener("click", function () {
    var text = "I’m on the board. Robert rides 10,000 miles in 2027 for queer communities; you pledge a few cents a mile, free to start, and pick which org it goes to.";
    var url = "https://cycleforchange.org/pledge/";
    /* the card goes with it where the share sheet takes files (phones, mostly) */
    if (cardBlob && navigator.canShare && window.File) {
      try {
        var file = new File([cardBlob], "cycle-for-change-pledge.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) { navigator.share({ files: [file], title: "Cycle for Change", text: text + " " + url }).catch(function () {}); return; }
      } catch (_) {}
    }
    if (navigator.share) { navigator.share({ title: "Cycle for Change", text: text, url: url }).catch(function () {}); return; }
    var say = function (m) { if (shareMsg) { shareMsg.textContent = m; shareMsg.hidden = false; } };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text + " " + url).then(function () { say("Copied. Paste it anywhere."); }, function () { say(url); });
    else say(url);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var name = String(data.get("name") || "").trim().slice(0, 40);
    if (!name) { pname.focus(); return; }
    var email = String(data.get("email") || "").trim();
    if (!email || email.indexOf("@") < 1) { var pe = $("pemail"); if (pe) pe.focus(); return; }
    /* "OK to text me" needs a number to text */
    if (onBoard) return;
    var p = pledgeNow();
    if (!data.get("org")) data.set("org", "later");
    var btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data).toString() })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        onBoard = true;
        paintBoard();
        showDone(p, p.org);
        /* the pick in the form is the vote (one per browser); the ballot below is how you change it */
        if (castVote && ORG_NAMES[p.org]) castVote(p.org);
      })
      .catch(function () {
        btn.disabled = false;
        okmsg.textContent = "Hmm — try again in a moment.";
        okmsg.hidden = false;
      });
  });

  paintBoard();
  if (window.fetch) {
    fetch("/.netlify/functions/pledges")
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || d.configured === false || d.error || d.form === false) { countKnown = false; paintBoard(); return; }
        if (!d.names || !d.names.length) return;
        names = d.names.filter(function (p) { return p && p.name; });
        paintBoard();
      })
      .catch(function () { countKnown = false; paintBoard(); });
  }
  }

  /* ————————————————————————————————————————————————
     mile updates: the "waitlist" form, kept for real
     ———————————————————————————————————————————————— */

  var emailForm = $("emailForm"), emailOk = $("emailOk");
  if (emailForm && emailOk) emailForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = $("email");
    if (!f.value || f.value.indexOf("@") < 1) { f.focus(); return; }
    var btn = emailForm.querySelector("button[type=submit]");
    btn.disabled = true;
    emailOk.hidden = true;
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(emailForm)).toString() })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        emailForm.reset();
        emailOk.textContent = "You’re on the list.";
        emailOk.hidden = false;
        btn.disabled = false;
      })
      .catch(function () {
        btn.disabled = false;
        emailOk.textContent = "That didn’t send. Try again.";
        emailOk.hidden = false;
      });
  });

  /* The ballot is gone (Pass 26: nobody pledges or votes). The old block here fetched the votes
     function and redrew #orgs — which is now the whole section — as "Pick this one" buttons,
     wiping the heading, the ride dates and the open-door line. castVote stays null. */

  if (window.fetch) {
    fetch("/.netlify/functions/instagram")
      .then(function (r) { return r.json(); })
      .then(function (d) { var a = $("footInstagram"); if (a) a.href = (d && d.profileUrl) || INSTAGRAM_URL; })
      .catch(function () {});
  }

  /* ————————————————————————————————————————————————
     film (Pass 5): the phone gets the still. On desktop the film starts after
     the page has loaded, only without reduced motion, and can be paused —
     video above the ask is the best-documented conversion killer, and a
     moving hero needs a pause control (WCAG 2.2.2).
     ———————————————————————————————————————————————— */

  var vid = $("heroVid"), filmBtn = $("filmBtn");
  var wide = !!(window.matchMedia && matchMedia("(min-width: 900px)").matches);
  var filmOn = false;
  function setFilm(on) {
    filmOn = on;
    if (on) { var q = vid.play(); if (q && q.catch) q.catch(function () {}); } else vid.pause();
    if (filmBtn) { filmBtn.textContent = on ? "Pause the film" : "Play the film"; filmBtn.setAttribute("aria-pressed", on ? "false" : "true"); }
  }
  if (vid && !reduce && wide) {
    vid.muted = true;
    vid.addEventListener("error", function () { vid.hidden = true; if (filmBtn) filmBtn.hidden = true; }, true);
    /* Pass 24: the film comes up over the still only once frames are actually moving */
    vid.addEventListener("playing", function () { vid.setAttribute("data-on", "true"); if (vid.parentNode) vid.parentNode.setAttribute("data-film", "on"); });
    var startFilm = function () {
      vid.preload = "auto";
      setFilm(true);
      if (filmBtn) filmBtn.setAttribute("data-ready", "true");
      /* don't burn cycles on a film nobody can see */
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (es) {
          if (!filmOn) return;
          if (es[0].isIntersecting) { var q = vid.play(); if (q && q.catch) q.catch(function () {}); }
          else vid.pause();
        }, { threshold: 0.05 }).observe(vid);
      }
    };
    if (document.readyState === "complete") setTimeout(startFilm, 300);
    else window.addEventListener("load", function () { setTimeout(startFilm, 300); });
    if (filmBtn) filmBtn.addEventListener("click", function () { setFilm(!filmOn); });
  } else if (vid) { vid.removeAttribute("loop"); vid.removeAttribute("autoplay"); }

  /* ————————————————————————————————————————————————
     the road reel (Pass 24): on desktop, without reduced motion, it plays while it is on
     screen; on phones it waits for a tap (a still, not a film, on phones). Either way the
     button pauses and plays it. Nothing downloads until it's needed (preload="none").
     ———————————————————————————————————————————————— */

  var reel = $("roadVid"), reelBtn = $("roadBtn");
  if (reel && reelBtn) {
    reel.muted = true;
    var reelUser = null;   /* null = the page decides; true/false = the reader decided */
    var reelSeen = false;
    var paintReel = function () {
      var on = !reel.paused;
      reelBtn.textContent = on ? "Pause the reel" : "Play the reel";
      reelBtn.setAttribute("data-playing", on ? "true" : "false");
    };
    var playReel = function () { var q = reel.play(); if (q && q.catch) q.catch(function () {}); };
    reel.addEventListener("play", paintReel);
    reel.addEventListener("pause", paintReel);
    reel.addEventListener("error", function () { reelBtn.hidden = true; }, true);
    reelBtn.addEventListener("click", function () {
      if (reel.paused) { reelUser = true; reel.preload = "auto"; playReel(); }
      else { reelUser = false; reel.pause(); }
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        reelSeen = es[0].isIntersecting;
        if (!reelSeen) { if (!reel.paused) reel.pause(); return; }
        if (reelUser === true || (reelUser === null && wide && !reduce)) { reel.preload = "auto"; playReel(); }
      }, { threshold: 0.4 }).observe(reel);
    }
    paintReel();
  }

  /* ————————————————————————————————————————————————
     nav turns to bone past the film; the tally bar shows up with it
     ———————————————————————————————————————————————— */

  var nav = $("nav"), bar = $("bar"), hero = document.querySelector(".hero"), closeSec = document.querySelector(".close"), foot = document.querySelector(".foot");
  var pastHero = false, atClose = false, atFoot = false, scrollingDown = false;
  function paintBar() {
    if (!bar) return;
    var on = pastHero && !atClose && !atFoot && !scrollingDown;
    bar.setAttribute("data-on", on ? "true" : "false");
    bar.setAttribute("aria-hidden", on ? "false" : "true");
    var a = bar.querySelector("a"); if (a) a.tabIndex = on ? 0 : -1;
  }
  /* Pass 5: the bar steps aside while you scroll down and comes back when you scroll up */
  if (bar) {
    var lastY = window.pageYOffset || 0, ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.pageYOffset || 0, dy = y - lastY;
        if (Math.abs(dy) > 8) { scrollingDown = dy > 0; lastY = y; paintBar(); }
        ticking = false;
      });
    }, { passive: true });
  }
  if (hero && nav && "IntersectionObserver" in window) {
    /* Pass 23: the nav is clear while the hero photo is under it and bone once the photo has
       scrolled past; the phone bar still waits for the whole hero (its two actions) to leave. */
    var photo = hero.querySelector(".hero-media") || hero;
    new IntersectionObserver(function (es) {
      nav.setAttribute("data-solid", es[0].isIntersecting ? "false" : "true");
    }, { rootMargin: "-64px 0px 0px 0px" }).observe(photo);
    new IntersectionObserver(function (es) {
      pastHero = !es[0].isIntersecting;
      paintBar();
    }, { rootMargin: "-64px 0px 0px 0px" }).observe(hero);
    if (closeSec) new IntersectionObserver(function (es) { atClose = es[0].isIntersecting; paintBar(); }, { threshold: 0.25 }).observe(closeSec);
    if (foot) new IntersectionObserver(function (es) { atFoot = es[0].isIntersecting; paintBar(); }, { threshold: 0.2 }).observe(foot);
  } else if (nav) {
    nav.setAttribute("data-solid", "true");
  }

  /* ————————————————————————————————————————————————
     menu
     ———————————————————————————————————————————————— */

  var menu = $("menu"), menuBtn = $("menuBtn");
  if (menu && menuBtn) {
  function setMenu(open, refocus) {
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) $("menuClose").focus(); else if (refocus) menuBtn.focus();
  }
  menuBtn.addEventListener("click", function () { setMenu(true); });
  $("menuClose").addEventListener("click", function () { setMenu(false, true); });
  menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) setMenu(false, false); });
  document.addEventListener("keydown", function (e) {
    if (menu.hidden) return;
    if (e.key === "Escape") { setMenu(false, true); return; }
    if (e.key !== "Tab") return;
    /* keep focus inside the open menu */
    var f = menu.querySelectorAll("a[href],button"), first = f[0], lastF = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastF.focus(); }
    else if (!e.shiftKey && document.activeElement === lastF) { e.preventDefault(); first.focus(); }
  });
  }
})();

/* ————————————————————————————————————————————————
   Pass 26 (Oct 5, 2026): the sign. The plate under CYCLE FOR rotates through Robert's own answer
   until a visitor types; typing changes the sign; nothing is sent anywhere.
   ———————————————————————————————————————————————— */
(function () {
  var plate = document.getElementById("signPlate"), input = document.getElementById("who"), reset = document.getElementById("signReset");
  if (!plate || !input) return;
  var mine = ["me", "one⋅n⋅ten", "me", "change"], i = 0, typed = "";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function paint() { plate.textContent = typed ? typed : mine[i % mine.length]; if (reset) reset.hidden = !typed; }
  input.addEventListener("input", function () { typed = input.value.trim().slice(0, 28); paint(); });
  if (reset) reset.addEventListener("click", function () { typed = ""; input.value = ""; paint(); input.focus(); });
  if (!reduce) setInterval(function () { if (!typed) { i++; paint(); } }, 2400);
  paint();
})();
