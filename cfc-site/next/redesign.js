/* Cycle for Change — the redesigned homepage (/next/ preview).
   Loaded by cfc-site/next/index.html and nothing else. No dependencies.

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
     Sept 21 2026. x = how far through the ride list (0–100), y = cumulative miles. */
  var feed = {
    miles: 3066.8,
    rides: 85,
    updated: "2026-09-21T13:18:18Z",
    profileUrl: "https://www.strava.com/athletes/22899089",
    recent: [
      { discipline: "bike", title: "Morning Ride", miles: 32.4, date: "2026-09-18T13:14:29Z" },
      { discipline: "bike", title: "Morning Ride", miles: 35.9, date: "2026-09-17T12:49:23Z" },
      { discipline: "bike", title: "New bike day", miles: 37, date: "2026-09-16T13:00:48Z" },
      { discipline: "bike", title: "Morning Ride", miles: 35.8, date: "2026-09-15T13:16:15Z" },
      { discipline: "bike", title: "Morning Ride", miles: 41.2, date: "2026-09-14T13:29:06Z" },
      { discipline: "bike", title: "Church", miles: 40, date: "2026-09-13T12:48:51Z" }
    ],
    chart: [[0, 35.2], [10, 278.6], [19, 564.5], [29, 864.8], [38, 1258.9], [48, 1528.7], [57, 1765.8], [67, 2050.5], [76, 2329], [86, 2618.6], [95, 2925.7], [100, 3066.8]]
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
    if (feed.rides) $("rideCount").textContent = fmt(feed.rides);

    var daysIn = Math.max(1, Math.floor((Date.parse(feed.updated) - SEASON_START) / DAY) + 1);
    if (isFinite(daysIn)) $("pace").textContent = (feed.miles / daysIn).toFixed(1);

    var rides = feed.recent.filter(function (r) { return !r.discipline || r.discipline === "bike"; });
    if (!rides.length) rides = feed.recent;

    var last = rides[0];
    if (last && typeof last.miles === "number") {
      var w = whenLabel(last.date);
      $("lastRide").textContent = "last ride " + last.miles.toFixed(1) + " mi" + (w ? " · " + w : "");
    }

    var log = $("log");
    while (log.firstChild) log.removeChild(log.firstChild);
    rides.slice(0, 5).forEach(function (r) {
      var li = document.createElement("li");
      var when = document.createElement("span"); when.className = "when"; when.textContent = dayLabel(r.date);
      var title = String(r.title || "").trim();
      if (title && !GENERIC.test(title)) { var b = document.createElement("b"); b.textContent = title; when.appendChild(b); }
      var mi = document.createElement("span"); mi.className = "mi num"; mi.textContent = Number(r.miles).toFixed(1);
      var u = document.createElement("small"); u.textContent = "MI"; mi.appendChild(u);
      li.appendChild(when); li.appendChild(mi); log.appendChild(li);
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

  $("daysTo").textContent = fmt(Math.max(0, Math.ceil((YEAR_START - Date.now()) / DAY)));

  /* ————————————————————————————————————————————————
     the chart: one series, the line; the last point is the live one
     ———————————————————————————————————————————————— */

  var chart = $("chart"), tip = $("tip"), NS = "http://www.w3.org/2000/svg";
  var pts = [], geo = null, cur = -1;

  function buildPoints() {
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
    if (!pts.length) return;
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
  function paintCalc() {
    var r = document.querySelector('#calc input[name="rate"]:checked');
    var cents = r ? parseInt(r.value, 10) : 5;
    var total = cents * GOAL / 100;
    $("calcEq").textContent = cents + "¢ × 10,000 miles";
    $("calcTotal").textContent = "$" + fmt(total);
    $("calcKit").textContent = kitFor(total);
  }
  $("calc").addEventListener("change", paintCalc);
  $("calc").addEventListener("submit", function (e) { e.preventDefault(); });
  paintCalc();

  /* ————————————————————————————————————————————————
     the board: the newest names, and yours going up as you type it
     ———————————————————————————————————————————————— */

  var names = [];           /* [{name, ago}], newest first, from the pledges function */
  var countKnown = true;    /* false while the function can't read names back (no NETLIFY_API_TOKEN) */
  var onBoard = false;
  var pname = $("pname"), slots = $("slots"), form = $("pledgeForm"), okmsg = $("okmsg");
  var pad2 = function (n) { return n < 10 ? "0" + n : String(n); };

  function row(n, text, open, ago, id) {
    var li = document.createElement("li");
    var a = document.createElement("span"); a.className = "n"; a.textContent = n === "" ? "" : pad2(n);
    var b = document.createElement("span"); b.className = "name" + (open ? " open" : ""); b.textContent = text; if (id) b.id = id;
    li.appendChild(a); li.appendChild(b);
    if (ago) { var c = document.createElement("span"); c.className = "ago"; c.textContent = ago; li.appendChild(c); }
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
      /* no numbers and no "open" rows when we can't see who's already there */
      slots.appendChild(row("", typed || "Your name here", !typed, onBoard ? "just now" : "", "slotYou"));
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
    names.slice(0, 4).forEach(function (p, i) { slots.appendChild(row(names.length - i, p.name, false, p.ago)); });
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

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var name = String(data.get("name") || "").trim().slice(0, 40);
    if (!name) { pname.focus(); return; }
    if (onBoard) return;
    var btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data).toString() })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        onBoard = true;
        paintBoard();
        okmsg.textContent = "You’re on the board. See you out there.";
        okmsg.hidden = false;
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
        if (!d || d.configured === false || d.error) { countKnown = false; paintBoard(); return; }
        if (!d.names || !d.names.length) return;
        names = d.names.filter(function (p) { return p && p.name; });
        paintBoard();
      })
      .catch(function () { countKnown = false; paintBoard(); });
  }

  /* ————————————————————————————————————————————————
     mile updates: the "waitlist" form, kept for real
     ———————————————————————————————————————————————— */

  var emailForm = $("emailForm"), emailOk = $("emailOk");
  emailForm.addEventListener("submit", function (e) {
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

  /* ————————————————————————————————————————————————
     the ballot: one vote per browser, same keys the live homepage uses
     ———————————————————————————————————————————————— */

  var orgsEl = $("orgs"), voteMsg = $("voteMsg");
  var votedOrg = null, fingerprint = null;
  try {
    fingerprint = localStorage.getItem("cfc-vote-fp");
    if (!fingerprint) { fingerprint = "fp_" + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem("cfc-vote-fp", fingerprint); }
    votedOrg = localStorage.getItem("cfc-voted-org");
  } catch (_) { fingerprint = fingerprint || "session_" + Date.now(); }

  function paintVotes() {
    var btns = orgsEl.querySelectorAll("[data-vote]");
    for (var i = 0; i < btns.length; i++) {
      var mine = votedOrg && btns[i].getAttribute("data-vote") === votedOrg;
      btns[i].disabled = !!votedOrg && !mine;
      btns[i].setAttribute("aria-pressed", mine ? "true" : "false");
      btns[i].textContent = mine ? "Your pick ✓" : "Vote";
    }
  }

  function renderOrgs(list) {
    if (!list || !list.length) return;
    while (orgsEl.firstChild) orgsEl.removeChild(orgsEl.firstChild);
    list.forEach(function (o) {
      var art = document.createElement("article"); art.className = "org"; art.setAttribute("data-id", o.id);
      var h = document.createElement("h3"); h.className = "h3"; h.textContent = o.name;
      var p = document.createElement("p"); p.textContent = o.desc || "";
      var acts = document.createElement("div"); acts.className = "org-acts";
      var a = document.createElement("a"); a.className = "link"; a.textContent = "Visit site";
      if (/^https?:\/\//i.test(o.url || "")) { a.href = o.url; a.target = "_blank"; a.rel = "noopener noreferrer"; }
      var b = document.createElement("button"); b.className = "btn btn--ghost btn--sm"; b.type = "button"; b.setAttribute("data-vote", o.id); b.textContent = "Vote";
      acts.appendChild(a); acts.appendChild(b);
      art.appendChild(h); art.appendChild(p); art.appendChild(acts);
      orgsEl.appendChild(art);
    });
    paintVotes();
  }

  function orgName(id) {
    var art = orgsEl.querySelector('[data-id="' + id + '"] .h3');
    return art ? art.textContent : "";
  }

  function setVoted(id, announce) {
    votedOrg = id;
    try { localStorage.setItem("cfc-voted-org", id); } catch (_) {}
    paintVotes();
    if (announce) {
      var n = orgName(id);
      voteMsg.textContent = n ? "You voted for " + n + ". Final tally closes at year-end." : "Vote recorded.";
      voteMsg.hidden = false;
    }
  }

  orgsEl.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest("[data-vote]") : null;
    if (!btn || votedOrg || btn.disabled) return;
    var id = btn.getAttribute("data-vote");
    btn.disabled = true;
    fetch("/.netlify/functions/votes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orgId: id, fingerprint: fingerprint }) })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.error === "already voted") { setVoted(d.votedFor || id, false); return; }
        if (d && d.error) { btn.disabled = false; return; }
        if (d && d.orgs) renderOrgs(d.orgs);
        setVoted(id, true);
      })
      .catch(function () { btn.disabled = false; });
  });

  paintVotes();
  if (window.fetch) {
    fetch("/.netlify/functions/votes")
      .then(function (r) { return r.json(); })
      .then(function (d) { if (d && d.orgs) renderOrgs(d.orgs); })
      .catch(function () {});

    fetch("/.netlify/functions/instagram")
      .then(function (r) { return r.json(); })
      .then(function (d) { var a = $("footInstagram"); if (a) a.href = (d && d.profileUrl) || INSTAGRAM_URL; })
      .catch(function () {});
  }

  /* ————————————————————————————————————————————————
     film: plays if the phone lets it, the poster holds if not
     ———————————————————————————————————————————————— */

  var vid = $("heroVid");
  if (vid && !reduce) {
    vid.muted = true;
    var pl = vid.play();
    if (pl && pl.catch) pl.catch(function () {});
    vid.addEventListener("error", function () { vid.hidden = true; }, true);
    /* don't burn battery on a film nobody can see */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { var q = vid.play(); if (q && q.catch) q.catch(function () {}); }
        else vid.pause();
      }, { threshold: 0.05 }).observe(vid);
    }
  } else if (vid) { vid.removeAttribute("loop"); }

  /* ————————————————————————————————————————————————
     nav turns to bone past the film; the tally bar shows up with it
     ———————————————————————————————————————————————— */

  var nav = $("nav"), bar = $("bar"), hero = document.querySelector(".hero"), boardSec = $("board"), foot = document.querySelector(".foot");
  var pastHero = false, atBoard = false, atFoot = false;
  function paintBar() {
    var on = pastHero && !atBoard && !atFoot;
    bar.setAttribute("data-on", on ? "true" : "false");
    bar.setAttribute("aria-hidden", on ? "false" : "true");
    var a = bar.querySelector("a"); if (a) a.tabIndex = on ? 0 : -1;
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      pastHero = !es[0].isIntersecting;
      nav.setAttribute("data-solid", pastHero ? "true" : "false");
      paintBar();
    }, { rootMargin: "-64px 0px 0px 0px" }).observe(hero);
    new IntersectionObserver(function (es) { atBoard = es[0].isIntersecting; paintBar(); }, { threshold: 0.25 }).observe(boardSec);
    new IntersectionObserver(function (es) { atFoot = es[0].isIntersecting; paintBar(); }, { threshold: 0.2 }).observe(foot);
  } else {
    nav.setAttribute("data-solid", "true");
  }

  /* ————————————————————————————————————————————————
     menu
     ———————————————————————————————————————————————— */

  var menu = $("menu"), menuBtn = $("menuBtn");
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
})();
