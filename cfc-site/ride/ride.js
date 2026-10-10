/* /ride/ — the ride check-in (Oct 9, 2026).
   Find the ride (location or name), check in with one tap, report a change, add photos or a clip,
   leave a review. Everything goes to Netlify Forms and reaches Robert as a GitHub issue
   (tools/checkins-pull.js, tools/reviews-pull.js). Nothing here writes to the site.
     /ride/            find my ride
     /ride/?r=<slug>   a ride's own code (a sticker at the start)
   Location is used once to find rides and never sent; a check-in carries only how far from the start
   it was made, rounded. Photos are re-drawn on a canvas before upload, which drops their location data.
   Reads /rides/live.json (the same feed as /tonight/). Schedule logic follows tonight.js. */
(function () {
  "use strict";

  var DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var DAY_NAME = { sun: "Sunday", mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday" };
  var MAX_BYTES = 7.5 * 1024 * 1024;   // Netlify Forms takes 8 MB a request
  var NEAR_MI = 1.5, AREA_MI = 12;

  function $(s, root) { return (root || document).querySelector(s); }
  function $$(s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? "" : s).replace(/(\w)'(\w)/g, "$1\u2019$2").replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function get(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function put(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }

  var params = new URLSearchParams(location.search);
  var FIXED_NOW = params.get("now") ? new Date(params.get("now")) : null;   // for testing only
  function now() { return FIXED_NOW && !isNaN(FIXED_NOW) ? new Date(FIXED_NOW.getTime()) : new Date(); }

  var rides = null, loading = null, here = null, cur = null, scanned = false;
  var media = { photos: [], video: null };
  var trail = [], current = "home";

  /* —— data —— */
  function load() {
    if (rides) return Promise.resolve(rides);
    if (!loading) loading = fetch("/rides/live.json", { cache: "default" }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    }).then(function (list) { rides = Array.isArray(list) ? list : []; return rides; })
      .catch(function (e) { loading = null; throw e; });
    return loading;
  }
  function bySlug(slug) { for (var i = 0; i < rides.length; i++) if (rides[i].slug === slug) return rides[i]; return null; }

  /* —— time, in the ride's own zone (tonight.js) —— */
  function partsIn(tz, date) {
    var out = {};
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })
        .formatToParts(date).forEach(function (p) { out[p.type] = p.value; });
    } catch (e) { return null; }
    return { dow: DAYS.indexOf(String(out.weekday).toLowerCase().slice(0, 3)), y: +out.year, m: +out.month, d: +out.day, mins: ((+out.hour) % 24) * 60 + (+out.minute) };
  }
  function ymd(p) { return p.y + "-" + (p.m < 10 ? "0" : "") + p.m + "-" + (p.d < 10 ? "0" : "") + p.d; }
  function daysInMonth(y, m) { return new Date(y, m, 0).getDate(); }
  function inSeason(r, month) {
    var s = r.season_months;
    if (!s || s.start == null || s.end == null) return true;
    return s.start <= s.end ? (month >= s.start && month <= s.end) : (month >= s.start || month <= s.end);
  }
  function monthlyMatch(r, p) {
    if (!Array.isArray(r.monthly_rule) || !r.monthly_rule.length) return null;
    return r.monthly_rule.some(function (rule) {
      if (DAYS.indexOf(rule.day) !== p.dow) return false;
      if (rule.ord === -1) return p.d + 7 > daysInMonth(p.y, p.m);
      return Math.ceil(p.d / 7) === rule.ord;
    });
  }
  function startOn(r, p) {
    var t = r.start_hhmm, d = ymd(p);
    (Array.isArray(r.start_times) ? r.start_times : []).forEach(function (e) { if (e && e.from <= d && e.start_hhmm) t = e.start_hhmm; });
    if (!t) return null;
    var hm = t.split(":"); return (+hm[0]) * 60 + (+hm[1]);
  }
  function runsOn(r, p) {
    if (!p || !Array.isArray(r.days) || r.days.indexOf(DAYS[p.dow]) < 0) return false;
    if (!inSeason(r, p.m)) return false;
    if (r.frequency === "monthly" && monthlyMatch(r, p) === false) return false;
    return true;
  }
  function caveat(r) {
    if (r.frequency === "monthly" && !(r.monthly_rule || []).length) return "Monthly. Check the date with the host.";
    if (r.frequency === "biweekly") return "Every other week. Check first.";
    if (r.frequency === "irregular") return "Not every week. Check first.";
    return "";
  }
  // "now" (from 75 min before the start to 30 after), "after" (until 6 hours after), or "later" + the next one
  function timing(r) {
    var t = now(), p = r.tz ? partsIn(r.tz, t) : null;
    if (p && runsOn(r, p)) {
      var s = startOn(r, p);
      if (s != null) {
        var d = p.mins - s;
        if (d >= -75 && d <= 30) return { mode: "now", start: s, mins: -d };
        if (d > 30 && d <= 360) return { mode: "after", start: s, mins: -d };
      }
    }
    return { mode: "later", next: nextOne(r) };
  }
  function nextOne(r) {
    if (!r.tz || !r.start_hhmm) return null;
    var t = now(), today = partsIn(r.tz, t);
    if (!today) return null;
    for (var off = 0; off <= 40; off++) {
      var p = off === 0 ? today : partsIn(r.tz, new Date(t.getTime() + off * 86400000));
      if (!runsOn(r, p)) continue;
      var s = startOn(r, p);
      if (s == null || (off === 0 && s <= today.mins)) continue;
      return { off: off, p: p, start: s, mins: off * 1440 + s - today.mins };
    }
    return null;
  }
  function clock(mins) {
    var h = Math.floor(mins / 60) % 24, m = mins % 60, ap = h < 12 ? "am" : "pm", hh = h % 12 || 12;
    return hh + ":" + (m < 10 ? "0" : "") + m + " " + ap;
  }
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function whenNext(n) {
    if (!n) return "";
    if (n.off === 0) return "Today, " + clock(n.start);
    if (n.off === 1) return "Tomorrow, " + clock(n.start);
    var day = DAY_NAME[DAYS[n.p.dow]];
    return (n.off < 7 ? day : day.slice(0, 3) + ", " + MONTHS[n.p.m - 1] + " " + n.p.d) + ", " + clock(n.start);
  }
  function daysPhrase(r) {
    var d = (r.days || []).map(function (x) { return DAY_NAME[x] + "s"; });
    if (!d.length) return "";
    var s = d.length === 1 ? d[0] : d.slice(0, -1).join(", ") + " and " + d[d.length - 1];
    if (r.frequency === "monthly") s = "Some " + s;
    return s;
  }

  /* —— distance —— */
  function miles(a, b) {
    var R = 3958.8, toR = Math.PI / 180;
    var dLat = (b.lat - a.lat) * toR, dLng = (b.lng - a.lng) * toR;
    var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  function distText(mi) {
    if (mi == null) return "";
    if (mi < 0.15) return "Right here";
    return (mi < 10 ? mi.toFixed(1) : Math.round(mi)) + " mi away";
  }

  /* —— screens —— */
  var screens = $$("[data-screen]");
  function show(name, push) {
    if (push !== false && name !== current) trail.push(current);
    current = name;
    screens.forEach(function (s) { s.hidden = s.getAttribute("data-screen") !== name; });
    var el = $('[data-screen="' + name + '"]');
    window.scrollTo(0, 0);
    if (el) el.focus({ preventScroll: true });
  }
  function back() { show(trail.length ? trail.pop() : "home", false); }

  /* —— home: location —— */
  var locBtn = $("[data-locate]"), locNote = $("[data-locate-note]");
  var locText = locNote.textContent;
  locBtn.addEventListener("click", function () {
    if (!("geolocation" in navigator)) { locNote.textContent = "This phone won’t share a location. Type the ride’s name instead."; $("[data-q]").focus(); return; }
    locBtn.disabled = true;
    locBtn.lastChild.textContent = "Finding you…";
    locNote.textContent = locText;
    navigator.geolocation.getCurrentPosition(function (pos) {
      here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      load().then(function () { pick(); }).catch(function () { locNote.textContent = "Couldn’t load the rides. Check your signal and try again."; })
        .then(function () { locBtn.disabled = false; locBtn.lastChild.textContent = "Find my ride"; });
    }, function (err) {
      locBtn.disabled = false; locBtn.lastChild.textContent = "Find my ride";
      locNote.textContent = err && err.code === 1
        ? "Location is off for this site. Type the ride’s name instead, or allow location in your browser’s settings."
        : "Couldn’t get your location just now. Type the ride’s name instead.";
      $("[data-q]").focus();
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
  });

  /* —— home: search —— */
  var q = $("[data-q]"), results = $("[data-results]"), qTimer;
  function fold(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function hay(r) { return fold([r.name, r.name_en, r.city, r.place, r.neighborhood, r.start_location && r.start_location.name, r.host && r.host.name].join(" ")); }
  q.addEventListener("input", function () {
    clearTimeout(qTimer);
    qTimer = setTimeout(search, 120);
  });
  q.addEventListener("focus", function () { load().catch(function () {}); }, { once: true });
  function search() {
    var words = fold(q.value).split(/\s+/).filter(Boolean);
    if (!words.length) { results.innerHTML = ""; return; }
    load().then(function () {
      var hits = rides.filter(function (r) { var h = hay(r); return words.every(function (w) { return h.indexOf(w) > -1; }); });
      if (here) hits.forEach(function (r) { r._d = miles(here, r); }); else hits.forEach(function (r) { r._d = null; });
      hits.sort(function (a, b) {
        var aa = a.state === "AZ" ? 0 : 1, bb = b.state === "AZ" ? 0 : 1;   // home first
        if (a._d != null && b._d != null) return a._d - b._d;
        return aa - bb || a.name.localeCompare(b.name);
      });
      results.innerHTML = hits.length
        ? hits.slice(0, 8).map(function (r) { return rowHTML(r, timing(r)); }).join("")
        : '<p class="empty">Nothing by that name. Try a shop or a town, or tell me about it below.</p>';
    }).catch(function () { results.innerHTML = '<p class="empty">Couldn’t load the rides. Check your signal.</p>'; });
  }

  function rowHTML(r, t) {
    var live = t.mode !== "later";
    var right = t.mode === "now" ? clock(t.start) + "<small>" + (r._d != null ? distText(r._d) : (t.mins > 0 ? "In " + t.mins + " min" : "Rolling")) + "</small>"
      : t.mode === "after" ? clock(t.start) + "<small>Rolled today</small>"
      : (t.next ? whenNext(t.next).replace(", ", "<small>") + "</small>" : "<small>No date</small>");
    var where = [r.start_location && r.start_location.name, r.place || r.city].filter(Boolean)[0] || "";
    return '<button class="row' + (live ? " row--now" : "") + '" type="button" data-open="' + esc(r.slug) + '">' +
      '<span><span class="row__name">' + esc(r.name) + '</span><span class="row__where">' + esc(where) + (r._d != null && t.mode === "later" ? " · " + esc(distText(r._d)) : "") + "</span></span>" +
      '<span class="row__when">' + right + "</span></button>";
  }

  /* —— pick: rides near you —— */
  function pick() {
    rides.forEach(function (r) { r._d = (typeof r.lat === "number" && typeof r.lng === "number") ? miles(here, r) : 9999; });
    var near = rides.filter(function (r) { return r._d <= NEAR_MI; });
    var live = near.map(function (r) { return { r: r, t: timing(r) }; }).filter(function (x) { return x.t.mode !== "later"; })
      .sort(function (a, b) { return (a.t.mode === "now" ? 0 : 1) - (b.t.mode === "now" ? 0 : 1) || a.r._d - b.r._d; });
    var seen = {}; live.forEach(function (x) { seen[x.r.slug] = 1; });
    var later = rides.filter(function (r) { return r._d <= AREA_MI && !seen[r.slug]; })
      .map(function (r) { return { r: r, t: timing(r) }; })
      .filter(function (x) { return x.t.next && x.t.next.mins <= 7 * 1440; })
      .sort(function (a, b) { return Math.round(a.r._d * 2) - Math.round(b.r._d * 2) || a.t.next.mins - b.t.next.mins; })
      .slice(0, 6);
    $("[data-pick-sub]").textContent = live.length ? "Rolling around now, near you." : "Nothing on the list is rolling right where you are.";
    $("[data-pick-now]").innerHTML = live.length
      ? '<p class="lab">Around now</p>' + live.map(function (x) { return rowHTML(x.r, x.t); }).join("")
      : '<p class="empty">If you’re at a ride, it isn’t listed yet. Tell me about it and I’ll add it.</p>';
    $("[data-pick-later]").innerHTML = later.length ? '<p class="lab">Coming up nearby</p>' + later.map(function (x) { return rowHTML(x.r, x.t); }).join("") : "";
    show("pick");
  }

  /* —— a ride —— */
  function plateText(r) {
    var m = String(r.name).match(/\(([^)]{2,14})\)\s*$/);
    if (m) return m[1];
    return r.name.length <= 26 ? r.name.replace(/^the\s+/i, "the ") : "";
  }
  function fact(mark, html) { return '<div class="fact"><svg class="mk" aria-hidden="true"><use href="/rides/marks.svg#' + mark + '"/></svg><span>' + html + "</span></div>"; }
  function today(r) { var p = partsIn(r.tz || "America/Phoenix", now()); return p ? ymd(p) : ""; }

  function openRide(r, viaCode) {
    cur = r; scanned = !!viaCode;
    var t = timing(r);
    $("[data-hello]").textContent = viaCode && t.mode === "now" ? "You’re here. Thanks for scanning." : "";
    var plate = plateText(r), sign = $("[data-sign]"), name = $("[data-name]");
    sign.hidden = !plate;
    $("[data-plate]").textContent = plate;
    $("[data-plate]").className = "plate" + (plate.length > 14 ? " plate--long" : "");
    name.textContent = r.name;
    name.className = "ride-name" + (plate && plate === r.name ? " sr" : "");
    if (plate && plate === r.name) name.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)"; else name.style.cssText = "";

    var f = [];
    var when = [daysPhrase(r), r.time_local].filter(Boolean).join(", ");
    if (when) f.push(fact("m-clock", "<b>" + esc(when) + "</b>"));
    var sl = r.start_location || {};
    if (sl.name || sl.address) f.push(fact("m-start", esc(sl.name || sl.address)));
    var pace = r.pace && r.pace.length < 90 ? r.pace : r.pc;
    var dist = r.distance_miles ? "About " + r.distance_miles + " miles." : (r.lg || "");
    var line = [pace, dist].filter(Boolean).join(". ").replace(/\.\./g, ".");
    if (line) f.push(fact("m-distance", esc(line)));
    if (r.drop_policy === "no-drop") f.push(fact("m-no-drop", "Nobody gets dropped."));
    else if (r.drop_policy === "drop") f.push(fact("m-effort", "A drop ride. Know your way home."));
    else if (r.drop_policy === "groups") f.push(fact("m-group", "Splits into groups by pace."));
    $("[data-facts]").innerHTML = f.join("");
    $("[data-checked]").innerHTML = r.checked ? '<svg class="mk" aria-hidden="true"><use href="/rides/marks.svg#m-checked"/></svg>' + esc(r.checked) : "";

    var done = get("cfc-ci:" + r.slug, "") === today(r);
    var ask = "";
    if (t.mode === "now" || t.mode === "after") {
      if (t.mode === "after") ask += '<div class="note"><span class="lab">Today</span><span class="note__big">Rolled at ' + clock(t.start) + "</span></div>";
      if (done) {
        ask += '<p class="hello">You checked in today. Thank you.</p>' +
          '<button class="btn" type="button" data-go="review">Review this ride</button>' +
          '<button class="btn btn--ghost" type="button" data-go="done" data-done-mode="again">Add photos or a clip</button>';
      } else {
        ask += "<h2>" + (t.mode === "now" ? "Is it how the page says?" : "Were you on it? Was it how the page says?") + "</h2>" +
          '<button class="btn" type="button" data-yes>' + (t.mode === "now" ? "Yes, it’s rolling" : "Yes, it rolled") + "</button>" +
          '<button class="btn btn--ghost" type="button" data-go="changed">Something changed</button>' +
          '<p class="small center err" data-ride-err role="alert"></p>';
      }
      ask += '<button class="link" type="button" data-restart>Not this ride?</button>';
    } else {
      var n = t.next, cv = caveat(r);
      ask += '<div class="note"><span class="lab">Not rolling right now. Next one</span><span class="note__big">' + esc(n ? whenNext(n) : "No date posted") + "</span>" + (cv ? "<p>" + esc(cv) + "</p>" : "") + "</div>" +
        '<a class="btn" href="/rides/' + encodeURIComponent(r.slug) + '/ride.ics">Put it in my calendar</a>' +
        '<button class="btn btn--ghost" type="button" data-go="review">Ridden it? Review it</button>' +
        '<button class="link" type="button" data-go="changed">Something’s wrong with this ride</button>';
    }
    $("[data-ride-ask]").innerHTML = ask;
    $("[data-rev-ride]").textContent = r.name;
    $("[data-ride-page]").href = "/rides/" + encodeURIComponent(r.slug) + "/";
    show("ride");
  }

  /* —— sending —— */
  function stamp() {
    var d = now(), off = -d.getTimezoneOffset(), sign = off >= 0 ? "+" : "-", a = Math.abs(off);
    function z(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate()) + "T" + z(d.getHours()) + ":" + z(d.getMinutes()) + sign + z(Math.floor(a / 60)) + ":" + z(a % 60);
  }
  function nearText() {
    if (!here || !cur || typeof cur.lat !== "number") return "no location";
    var mi = miles(here, cur);
    return mi < 0.15 ? "at the start" : (mi < 10 ? mi.toFixed(1) : Math.round(mi)) + " mi from the start";
  }
  function postForm(name, fields, files) {
    var fd = new FormData();
    fd.append("form-name", name);
    Object.keys(fields).forEach(function (k) { fd.append(k, fields[k] == null ? "" : String(fields[k])); });
    fd.append("bot-field", "");
    var body, headers = {};
    if (files && files.length) {
      files.forEach(function (f) { fd.append(f.field, f.blob, f.name); });
      body = fd;
    } else {
      body = new URLSearchParams(fd).toString();
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    return fetch("/", { method: "POST", headers: headers, body: body }).then(function (r) { if (!r.ok) throw new Error(r.status); return r; });
  }
  function checkin(status, what, note, files) {
    return postForm("ride-checkin", {
      ride: cur.slug, status: status, what: what || "", note: note || "", at: stamp(),
      page: location.pathname + (scanned ? "?r=" + cur.slug : "") + " · " + nearText()
    }, files);
  }
  function busy(btn, on, text) {
    if (!btn) return;
    if (on) { btn.setAttribute("data-label", btn.textContent); btn.textContent = text || "Sending…"; btn.disabled = true; }
    else { btn.textContent = btn.getAttribute("data-label") || btn.textContent; btn.disabled = false; }
  }

  /* —— clicks —— */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, a");
    if (!t) return;

    if (t.hasAttribute("data-open")) {
      var r = bySlug(t.getAttribute("data-open"));
      if (r) openRide(r, false);
      return;
    }
    if (t.hasAttribute("data-back")) { back(); return; }
    if (t.hasAttribute("data-restart")) { trail = []; cur = null; resetMedia(); show("home", false); return; }

    if (t.hasAttribute("data-yes")) {
      var err = $("[data-ride-err]");
      if (err) err.textContent = "";
      busy(t, true);
      checkin("rolling").then(function () {
        put("cfc-ci:" + cur.slug, today(cur));
        doneScreen("Got it.", "Logged for today. That’s what keeps " + (plateText(cur) || "this ride") + " honest for the next rider.");
      }).catch(function () {
        busy(t, false);
        if (err) err.textContent = "That didn’t go through. Check your signal and tap again.";
      });
      return;
    }

    if (t.hasAttribute("data-what")) {
      $$("[data-what]").forEach(function (c) { c.setAttribute("aria-pressed", c === t ? "true" : "false"); });
      return;
    }
    if (t.hasAttribute("data-send-change")) {
      var sel = $('[data-what][aria-pressed="true"]'), cerr = $("[data-err]");
      cerr.textContent = "";
      if (!sel) { cerr.textContent = "Tap what changed first."; $("[data-what]").focus(); return; }
      busy(t, true);
      checkin("changed", sel.textContent, $("#chg-note").value.trim()).then(function () {
        busy(t, false);
        $("#chg-note").value = "";
        $$("[data-what]").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        doneScreen("Sent. Thank you.", "Robert checks it before the ride page changes. Until then it stays as it is.");
      }).catch(function () { busy(t, false); cerr.textContent = "That didn’t go through. Check your signal and tap again."; });
      return;
    }

    if (t.hasAttribute("data-again") || t.hasAttribute("data-pace")) {
      var attr = t.hasAttribute("data-again") ? "data-again" : "data-pace";
      var on = t.getAttribute("aria-pressed") !== "true";
      $$("[" + attr + "]").forEach(function (c) { c.setAttribute("aria-pressed", c === t && on ? "true" : "false"); });
      return;
    }

    if (t.hasAttribute("data-send-media")) { sendMedia(t); return; }
    if (t.hasAttribute("data-send-ride")) { sendRide(t); return; }

    var go = t.getAttribute("data-go");
    if (go) {
      if (go === "done" && t.getAttribute("data-done-mode") === "again") doneScreen("Add to today’s check-in.", "Photos and clips go to Robert first.");
      else if (go === "end") endScreen("That’s it. Go ride.", "");
      else if (go === "review" && !cur) { show("home"); return; }
      else if (go === "notlisted") { $("[data-nl-pin]").hidden = !here; show(go); }
      else show(go);
    }
  });

  function doneScreen(h, p) {
    $("[data-done-h]").textContent = h;
    $("[data-done-p]").textContent = p;
    $("[data-media-ok]").textContent = "";
    show("done");
  }
  function endScreen(h, p) {
    $("[data-end-h]").textContent = h;
    $("[data-end-p]").textContent = p;
    $("[data-ride-page]").hidden = !cur;
    var standalone = window.navigator.standalone || (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches);
    $("[data-tip]").hidden = !!standalone;
    show("end");
  }

  /* —— photos and a clip —— */
  function shrink(file) {
    return new Promise(function (resolve) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        try {
          var w = img.naturalWidth, h = img.naturalHeight, k = Math.min(1, 1600 / Math.max(w, h));
          var c = document.createElement("canvas");
          c.width = Math.round(w * k); c.height = Math.round(h * k);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          c.toBlob(function (b) { URL.revokeObjectURL(url); resolve(b && b.size ? b : null); }, "image/jpeg", 0.82);
        } catch (e) { URL.revokeObjectURL(url); resolve(null); }
      };
      img.onerror = function () { URL.revokeObjectURL(url); resolve(null); };
      img.src = url;
    });
  }
  function mediaBytes() { return media.photos.reduce(function (a, p) { return a + p.blob.size; }, 0) + (media.video ? media.video.size : 0); }
  function mb(n) { return (n / 1048576).toFixed(n < 10485760 ? 1 : 0) + " MB"; }
  function drawThumbs() {
    var box = $("[data-thumbs]");
    box.innerHTML = "";
    media.photos.forEach(function (p) { var i = document.createElement("img"); i.src = p.url; i.alt = "Your photo"; box.appendChild(i); });
    if (media.video) { var v = document.createElement("video"); v.src = media.video.url; v.muted = true; v.playsInline = true; v.setAttribute("aria-label", "Your clip"); box.appendChild(v); }
    var any = media.photos.length || media.video;
    box.hidden = !any;
    var send = $("[data-send-media]");
    send.hidden = !any;
    send.textContent = "Send " + [media.photos.length ? media.photos.length + (media.photos.length === 1 ? " photo" : " photos") : "", media.video ? "the clip" : ""].filter(Boolean).join(" and ") + " to Robert";
  }
  function resetMedia() {
    media.photos.forEach(function (p) { URL.revokeObjectURL(p.url); });
    if (media.video) URL.revokeObjectURL(media.video.url);
    media = { photos: [], video: null };
    drawThumbs();
    $("[data-media-err]").textContent = "";
  }
  $("[data-photos]").addEventListener("change", function (e) {
    var files = Array.prototype.slice.call(e.target.files || []);
    e.target.value = "";
    var err = $("[data-media-err]");
    err.textContent = "";
    $("[data-media-ok]").textContent = "";
    var room = 4 - media.photos.length;
    if (files.length > room) err.textContent = room ? "Four photos at most. Took the first " + room + "." : "Four photos at most.";
    files = files.slice(0, Math.max(0, room));
    var label = e.target.closest("label");
    label.style.opacity = ".6";
    Promise.all(files.map(shrink)).then(function (blobs) {
      label.style.opacity = "";
      blobs.forEach(function (b) {
        if (!b) { err.textContent = "One photo couldn’t be read. Try a different one."; return; }
        if (mediaBytes() + b.size > MAX_BYTES) { err.textContent = "That’s as much as fits in one send."; return; }
        media.photos.push({ blob: b, url: URL.createObjectURL(b) });
      });
      drawThumbs();
    });
  });
  $("[data-video]").addEventListener("change", function (e) {
    var f = e.target.files && e.target.files[0];
    e.target.value = "";
    var err = $("[data-media-err]");
    err.textContent = "";
    $("[data-media-ok]").textContent = "";
    if (!f) return;
    var room = MAX_BYTES - mediaBytes() + (media.video ? media.video.size : 0);
    if (f.size > room) {
      err.textContent = "That clip is " + mb(f.size) + ". For now it has to be under " + mb(Math.max(0, room)) + ". Trim it to a few seconds, or send it to Robert another way.";
      return;
    }
    if (media.video) URL.revokeObjectURL(media.video.url);
    media.video = { file: f, size: f.size, url: URL.createObjectURL(f) };
    drawThumbs();
  });
  function sendMedia(btn) {
    if (!cur) return;
    var files = media.photos.map(function (p, i) { return { field: "photo" + (i + 1), blob: p.blob, name: "photo" + (i + 1) + ".jpg" }; });
    if (media.video) { var ext = (media.video.file.name.split(".").pop() || "mp4").toLowerCase().slice(0, 4); files.push({ field: "video", blob: media.video.file, name: "clip." + ext }); }
    if (!files.length) return;
    var err = $("[data-media-err]");
    err.textContent = "";
    busy(btn, true, "Sending " + mb(mediaBytes()) + "…");
    checkin("media", "", "", files).then(function () {
      busy(btn, false);
      resetMedia();
      $("[data-media-ok]").textContent = "Sent. Robert has them.";
    }).catch(function () { busy(btn, false); err.textContent = "That didn’t go through. On a weak signal, try fewer photos, or tap again in a minute."; });
  }

  /* —— review —— */
  var rvForm = $("[data-review]"), rvWords = $("#rv-words"), rvCount = $("[data-count]");
  $("#rv-name").value = get("cfc-name", "");
  $("#rv-from").value = get("cfc-from", "");
  rvWords.addEventListener("input", function () {
    var n = rvWords.value.trim().length;
    rvCount.textContent = n < 20 ? (20 - n) + " more characters, at least." : n + " / 600";
  });
  rvForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var err = $("[data-rev-err]"), btn = rvForm.querySelector("button[type=submit]");
    err.textContent = "";
    var again = $('[data-again][aria-pressed="true"]'), pace = $('[data-pace][aria-pressed="true"]');
    var words = rvWords.value.trim(), name = $("#rv-name").value.trim(), from = $("#rv-from").value.trim();
    if (!again) { err.textContent = "Would you ride it again? Tap yes or no."; $("[data-again]").focus(); return; }
    if (words.length < 20) { err.textContent = "A little more, please. At least 20 characters."; rvWords.focus(); return; }
    if (!name) { err.textContent = "Your first name, please."; $("#rv-name").focus(); return; }
    put("cfc-name", name); put("cfc-from", from);
    busy(btn, true);
    postForm("ride-review", { ride: cur.slug, again: again.getAttribute("data-again"), pace: pace ? pace.getAttribute("data-pace") : "", words: words, name: name, from: from, email: "" })
      .then(function () {
        busy(btn, false);
        rvWords.value = ""; rvCount.textContent = "At least 20 characters.";
        $$("[data-again],[data-pace]").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        endScreen("Thanks, " + name + ".", "Robert reads every review. Yours goes on the ride page once he has.");
      })
      .catch(function () { busy(btn, false); err.textContent = "That didn’t go through. Check your signal and tap again. Your words are still here."; });
  });

  /* —— a ride that isn't listed (the directory's own report form) —— */
  function sendRide(btn) {
    var err = $("[data-nl-err]"), nm = $("#nl-name").value.trim();
    err.textContent = "";
    if (!nm) { err.textContent = "What’s the ride called? Even a rough name works."; $("#nl-name").focus(); return; }
    var where = $("#nl-where").value.trim();
    if (!where && here) where = "Where the rider was standing: " + here.lat.toFixed(4) + ", " + here.lng.toFixed(4);
    var who = $("#nl-who").value.trim();
    busy(btn, true);
    postForm("ride-report", {
      kind: "new", ride: nm, time: $("#nl-when").value.trim(), start: where,
      details: (who ? "Who runs it: " + who + ". " : "") + "Sent from the check-in at cycleforchange.org/ride.",
      link: "", email: "", role: "", page: "/ride/"
    }).then(function () {
      busy(btn, false);
      ["#nl-name", "#nl-when", "#nl-where", "#nl-who"].forEach(function (s) { $(s).value = ""; });
      cur = null;
      endScreen("Got it. Thank you.", "Robert checks it, then it goes on the map with today’s date.");
    }).catch(function () { busy(btn, false); err.textContent = "That didn’t go through. Check your signal and tap again."; });
  }

  /* —— start: a ride's own code, or find —— */
  var slug = params.get("r");
  if (slug) {
    load().then(function () {
      var r = bySlug(slug);
      if (r) { trail = ["home"]; openRide(r, true); }
      else { $("[data-locate-note]").textContent = "That code’s ride isn’t on the list right now. Find yours below."; }
    }).catch(function () { $("[data-locate-note]").textContent = "Couldn’t load the rides. Check your signal and reload."; });
  } else {
    load().catch(function () {});   // warm it while they read
  }
})();
