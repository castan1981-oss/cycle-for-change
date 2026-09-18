/* Cycle for Change — /tonight/
   Reads the same /rides/rides.json the directory is built from. Nothing is
   sent anywhere: location stays in the browser, "My week" lives in
   localStorage, and the only outside call is Open-Meteo for the forecast at
   roll-out for the rides on the wall. */
(function () {
  "use strict";

  var DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var DAY_LABEL = { sun: "Sun", mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat" };
  var state = { rides: [], here: null, windowH: 12, radius: 40, noDrop: false };
  var $ = function (id) { return document.getElementById(id); };

  /* —— storage —— */
  function load(key, fallback) { try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode */ } }
  var week = load("cfc-week", []);

  /* —— time, in the ride's own zone —— */
  function partsIn(tz, date) {
    var out = {};
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })
        .formatToParts(date).forEach(function (p) { out[p.type] = p.value; });
    } catch (e) { return null; }
    return {
      dow: DAYS.indexOf(String(out.weekday).toLowerCase().slice(0, 3)),
      y: +out.year, m: +out.month, d: +out.day,
      mins: ((+out.hour) % 24) * 60 + (+out.minute)
    };
  }
  function daysInMonth(y, m) { return new Date(y, m, 0).getDate(); }

  function inSeason(r, month) {
    var s = r.season_months;
    if (!s || s.start == null || s.end == null) return true;
    return s.start <= s.end ? (month >= s.start && month <= s.end) : (month >= s.start || month <= s.end);
  }
  function monthlyMatch(r, p) {
    if (!Array.isArray(r.monthly_rule) || !r.monthly_rule.length) return null; // unknown
    return r.monthly_rule.some(function (rule) {
      if (DAYS.indexOf(rule.day) !== p.dow) return false;
      if (rule.ord === -1) return p.d + 7 > daysInMonth(p.y, p.m);
      return Math.ceil(p.d / 7) === rule.ord;
    });
  }

  // next start within `horizonH` hours, or null. Returns minutes from now + a caveat.
  function nextStart(r, horizonH) {
    if (!r.start_hhmm || !Array.isArray(r.days) || !r.days.length || !r.tz) return null;
    var hm = r.start_hhmm.split(":"), start = (+hm[0]) * 60 + (+hm[1]);
    var now = new Date();
    var today = partsIn(r.tz, now);
    if (!today || today.dow < 0) return null;
    var maxOffset = Math.ceil(horizonH / 24) + 1;
    for (var off = 0; off <= maxOffset; off++) {
      var p = off === 0 ? today : partsIn(r.tz, new Date(now.getTime() + off * 86400000));
      if (!p || r.days.indexOf(DAYS[p.dow]) < 0) continue;
      var mins = off * 1440 + start - today.mins;
      if (mins < -20 || mins > horizonH * 60) continue;
      if (!inSeason(r, p.m)) continue;
      var caveat = "";
      if (r.frequency === "monthly") {
        var mm = monthlyMatch(r, p);
        if (mm === false) continue;
        if (mm === null) caveat = "Monthly. Check the date.";
      } else if (r.frequency === "biweekly") caveat = "Every other week. Check first.";
      else if (r.frequency === "irregular") caveat = "Irregular. Check first.";
      else if (r.frequency === "seasonal" && !r.season_months) caveat = "Seasonal. Check first.";
      return { mins: mins, off: off, p: p, caveat: caveat };
    }
    return null;
  }

  /* —— distance —— */
  function miles(a, b) {
    var R = 3958.8, toR = Math.PI / 180;
    var dLat = (b.lat - a.lat) * toR, dLng = (b.lng - a.lng) * toR;
    var s = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(s));
  }

  /* —— small helpers —— */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function timeParts(r) {
    var t = r.time_local || "";
    var m = /^(\d{1,2}:\d{2})\s*(am|pm)?/i.exec(t);
    return m ? { big: m[1], small: (m[2] || "").toLowerCase() } : { big: t, small: "" };
  }
  function when(n) {
    if (n.mins <= 0) return "Rolling now";
    if (n.mins < 60) return "Rolling in " + n.mins + " min";
    if (n.mins < 12 * 60) return "Rolling in " + Math.round(n.mins / 60) + " h";
    return n.off === 1 ? "Tomorrow" : DAY_LABEL[DAYS[n.p.dow]];
  }
  function dropLabel(r) {
    return { "no-drop": "No-drop", "groups": "Groups by pace", "drop": "Drop ride" }[r.drop_policy] || "";
  }
  function metaLine(r, dist) {
    var bits = [];
    var spot = r.start_location && r.start_location.name;
    bits.push(esc(r.city) + (spot && spot !== r.city ? " &middot; " + esc(spot) : ""));
    var second = [];
    if (r.distance_miles) second.push(esc(r.distance_miles) + " mi");
    if (r.pace) second.push(esc(r.pace));
    var d = dropLabel(r); if (d && !/no-drop/i.test(r.pace || "")) second.push(d);
    if (dist != null) second.push(Math.max(1, Math.round(dist)) + " mi away");
    return bits.join("") + (second.length ? "<br>" + second.join(" &middot; ") : "");
  }
  function inWeek(slug) { return week.indexOf(slug) >= 0; }

  /* —— render —— */
  function flyer(item, i) {
    var r = item.r, t = timeParts(r);
    return '<article class="flyer' + (i === 0 ? " next" : "") + '" data-slug="' + esc(r.slug) + '">' +
      '<div class="flyer-top"><span>' + esc(when(item.n)) + '</span><span>' + DAY_LABEL[DAYS[item.n.p.dow]] + '</span></div>' +
      '<div><div class="flyer-time">' + esc(t.big) + (t.small ? '<small>' + esc(t.small) + '</small>' : '') + '</div>' +
      '<h3 class="flyer-name"><a href="/rides/' + esc(r.slug) + '/">' + esc(r.name) + '</a></h3>' +
      '<p class="flyer-meta">' + metaLine(r, item.dist) + (item.n.caveat ? '<br><span class="flag">' + esc(item.n.caveat) + '</span>' : '') + '</p></div>' +
      '<div class="flyer-bot"><span class="flyer-acts">' +
        '<button class="act" type="button" data-week="' + esc(r.slug) + '">' + (inWeek(r.slug) ? "In my week" : "My week +") + '</button>' +
        '<button class="act" type="button" data-flyer="' + esc(r.slug) + '">Flyer</button></span>' +
      '<span class="wx" data-wx="' + esc(r.slug) + '"></span></div></article>';
  }
  function row(item) {
    var r = item.r, t = timeParts(r), soon = item.n.mins < 12 * 60 && item.n.off === 0;
    var lead = soon ? t.big : DAY_LABEL[DAYS[item.n.p.dow]];
    var tail = soon ? t.small : (t.big + (t.small ? " " + t.small : ""));
    return '<div class="row" data-slug="' + esc(r.slug) + '">' +
      '<div class="row-time">' + esc(lead) + '<small>' + esc(tail) + '</small></div>' +
      '<h3 class="row-name"><a href="/rides/' + esc(r.slug) + '/">' + esc(r.name) + '</a></h3>' +
      '<p class="row-meta">' + metaLine(r, item.dist) + (item.n.caveat ? '<br>' + esc(item.n.caveat) : '') + '</p>' +
      '<div class="row-acts"><button class="act" type="button" data-week="' + esc(r.slug) + '">' + (inWeek(r.slug) ? "In my week" : "My week +") + '</button>' +
      '<button class="act" type="button" data-flyer="' + esc(r.slug) + '">Flyer</button></div></div>';
  }

  function nearby(horizonH) {
    var out = [];
    state.rides.forEach(function (r) {
      if (r.lat == null || r.lng == null) return;
      if (state.noDrop && r.drop_policy !== "no-drop") return;
      var dist = miles(state.here, r);
      if (dist > state.radius) return;
      var n = nextStart(r, horizonH);
      if (n) out.push({ r: r, n: n, dist: dist });
    });
    out.sort(function (a, b) { return a.n.mins - b.n.mins || a.dist - b.dist; });
    return out;
  }

  function render() {
    if (!state.here) return;
    var windowItems = nearby(state.windowH);
    var wall = windowItems.slice(0, 3), rest = windowItems.slice(3);
    var later = [];
    if (windowItems.length < 8) {
      var seen = {}; windowItems.forEach(function (i) { seen[i.r.slug] = 1; });
      later = nearby(7 * 24).filter(function (i) { return !seen[i.r.slug]; }).slice(0, 12);
    }

    $("controls").hidden = false;
    $("wallSec").hidden = false;
    $("lineupSec").hidden = false;
    var span = state.windowH === 12 ? "the next 12 hours" : "the next 2 days";
    $("wallNote").textContent = windowItems.length + (windowItems.length === 1 ? " ride" : " rides") + " in " + span + " within " + state.radius + " mi";
    $("wall").innerHTML = wall.length ? wall.map(flyer).join("") :
      '<p class="empty">Nothing on the list rolls near here in ' + span + '. The lineup below is what&rsquo;s coming up this week.</p>';

    var list = rest.concat(later);
    $("lineup-head").textContent = rest.length ? "The lineup" : "Later this week";
    $("lineupNote").textContent = list.length ? "Soonest first" : "";
    $("lineup").innerHTML = list.length ? list.map(row).join("") :
      '<p class="empty">No more rides within ' + state.radius + ' miles this week. Try a wider circle, or <a href="/rides/">see every ride</a>.</p>';

    renderWeek();
    ticker(windowItems);
    forecast(wall);
  }

  function renderWeek() {
    var items = [];
    week.forEach(function (slug) {
      var r = state.rides.filter(function (x) { return x.slug === slug; })[0];
      if (!r) return;
      var n = nextStart(r, 8 * 24);
      if (n) items.push({ r: r, n: n, dist: state.here ? miles(state.here, r) : null });
    });
    items.sort(function (a, b) { return a.n.mins - b.n.mins; });
    $("weekSec").hidden = !week.length;
    $("week").innerHTML = items.length ? items.map(row).join("") : '<p class="empty">Saved rides with no date in the next week will show up here when they come round.</p>';
  }

  function ticker(items) {
    var label = state.here.label || "near you";
    var bits = ["Tonight " + (state.here.label ? "in " + label : "near you")];
    items.slice(0, 5).forEach(function (i) { bits.push(i.r.name + " " + (i.r.time_local || "")); });
    if (!items.length) bits.push("nothing rolling in the next " + state.windowH + " hours");
    var s = bits.join("  \u00b7  ") + "  \u00b7  ";
    $("ticker").textContent = s + s;
  }

  /* —— forecast at roll-out, for the wall only —— */
  function forecast(wall) {
    wall.forEach(function (item) {
      var r = item.r, p = item.n.p, hh = r.start_hhmm.split(":")[0];
      var stamp = p.y + "-" + ("0" + p.m).slice(-2) + "-" + ("0" + p.d).slice(-2) + "T" + hh + ":00";
      var url = "https://api.open-meteo.com/v1/forecast?latitude=" + r.lat.toFixed(2) + "&longitude=" + r.lng.toFixed(2) +
        "&hourly=temperature_2m,precipitation_probability,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=" + encodeURIComponent(r.tz) + "&forecast_days=3";
      fetch(url).then(function (res) { return res.ok ? res.json() : null; }).then(function (d) {
        if (!d || !d.hourly) return;
        var i = d.hourly.time.indexOf(stamp);
        if (i < 0) return;
        var temp = Math.round(d.hourly.temperature_2m[i]), rain = d.hourly.precipitation_probability[i] || 0, wind = Math.round(d.hourly.wind_speed_10m[i] || 0);
        var call = (rain >= 60 || wind >= 25 || temp >= 108 || temp <= 25) ? "no-go" : (rain >= 30 || wind >= 18 || temp >= 100 || temp <= 34) ? "maybe" : "go";
        var why = rain >= 30 ? rain + "% rain" : wind >= 18 ? wind + " mph wind" : "clear enough";
        var el = document.querySelector('[data-wx="' + r.slug + '"]');
        if (el) el.textContent = temp + "° · " + why + " · " + call;
      }).catch(function () { /* no forecast, no call */ });
    });
  }

  /* —— the flyer: a story-sized image anyone can post —— */
  function wrapText(ctx, text, maxW) {
    var words = text.split(/\s+/), lines = [], line = "";
    words.forEach(function (w) {
      var test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; } else line = test;
    });
    if (line) lines.push(line);
    return lines;
  }
  function makeFlyer(r) {
    var fonts = document.fonts && document.fonts.load ? Promise.all([document.fonts.load('800 200px Outfit'), document.fonts.load('700 40px "Space Mono"')]) : Promise.resolve();
    return fonts.then(function () {
      var W = 1080, H = 1920, c = document.createElement("canvas"); c.width = W; c.height = H;
      var x = c.getContext("2d"), t = timeParts(r), n = nextStart(r, 8 * 24);
      x.fillStyle = "#2A2E28"; x.fillRect(0, 0, W, H);
      x.fillStyle = "#C6FF00"; x.fillRect(0, 0, W, 150);
      x.fillStyle = "#2A2E28"; x.font = '700 40px "Space Mono", monospace'; x.textBaseline = "middle"; track(x, 7);
      var dayWord = n ? (n.off === 0 ? "TONIGHT" : DAY_LABEL[DAYS[n.p.dow]].toUpperCase()) : (r.days || []).map(function (d) { return DAY_LABEL[d].toUpperCase(); }).join(" / ");
      x.fillText(dayWord + "  \u00b7  FREE  \u00b7  ALL WELCOME", 70, 78);
      x.textBaseline = "alphabetic";
      // time, off register
      track(x, -12);
      x.font = "800 330px Outfit, sans-serif";
      x.fillStyle = "#C6FF00"; x.fillText(t.big, 84, 560);
      x.fillStyle = "#E8DFD0"; x.fillText(t.big, 66, 544);
      if (t.small) { x.font = "800 90px Outfit, sans-serif"; x.fillText(t.small, 72 + measure(x, t.big, "800 330px Outfit, sans-serif") + 20, 544); }
      // name
      track(x, -3);
      x.fillStyle = "#E8DFD0"; x.font = "800 118px Outfit, sans-serif";
      var lines = wrapText(x, r.name.toUpperCase(), W - 140).slice(0, 5), y = 760;
      lines.forEach(function (l) { x.fillText(l, 66, y); y += 116; });
      // facts
      track(x, 6);
      x.font = '400 40px "Space Mono", monospace'; x.fillStyle = "#C4B7A2"; y += 50;
      var spot = r.start_location && r.start_location.name;
      [spot, r.city + ", " + r.state, [r.distance_miles ? r.distance_miles + " mi" : "", r.pace || ""].filter(Boolean).join(" · "), dropLabel(r)].filter(Boolean).forEach(function (f) {
        wrapText(x, String(f).toUpperCase(), W - 140).slice(0, 2).forEach(function (l) { x.fillText(l, 70, y); y += 62; });
      });
      // foot
      x.fillStyle = "#E8DFD0"; x.fillRect(66, H - 210, W - 132, 3);
      x.font = '700 38px "Space Mono", monospace'; x.fillText("CYCLEFORCHANGE.ORG/TONIGHT", 70, H - 130);
      x.fillStyle = "#C4B7A2"; x.font = '400 32px "Space Mono", monospace'; x.fillText("EVERY MILE FOR QUEER COMMUNITIES", 70, H - 76);
      return new Promise(function (res) { c.toBlob(function (b) { res(b); }, "image/png"); });
    });
  }
  function track(ctx, px) { if ("letterSpacing" in ctx) ctx.letterSpacing = px + "px"; }
  function measure(ctx, text, font) { var f = ctx.font; ctx.font = font; var w = ctx.measureText(text).width; ctx.font = f; return w; }

  function shareFlyer(r, btn) {
    var old = btn.textContent; btn.textContent = "Making…";
    makeFlyer(r).then(function (blob) {
      btn.textContent = old;
      if (!blob) return;
      var file = new File([blob], r.slug + "-flyer.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        return navigator.share({ files: [file], title: r.name, text: r.name + " · " + (r.time_local || "") + " · cycleforchange.org/rides/" + r.slug + "/" }).catch(function () {});
      }
      var url = URL.createObjectURL(blob), a = document.createElement("a");
      a.href = url; a.download = r.slug + "-flyer.png"; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    }).catch(function () { btn.textContent = old; });
  }

  /* —— place —— */
  function setHere(here) {
    state.here = here;
    save("cfc-here", here);
    $("whereLabel").textContent = here.label || "Near you";
    $("changePlace").hidden = false;
    $("place").hidden = true;
    render();
  }
  function buildPlaces() {
    var byTown = {};
    state.rides.forEach(function (r) {
      if (r.lat == null) return;
      var k = r.city + ", " + r.state;
      (byTown[k] = byTown[k] || { label: k, n: 0, lat: 0, lng: 0 });
      byTown[k].n++; byTown[k].lat += r.lat; byTown[k].lng += r.lng;
    });
    var towns = Object.keys(byTown).map(function (k) { var t = byTown[k]; t.lat /= t.n; t.lng /= t.n; return t; });
    towns.slice().sort(function (a, b) { return b.n - a.n || a.label.localeCompare(b.label); }).slice(0, 14).forEach(function (t) {
      var b = document.createElement("button"); b.type = "button"; b.textContent = t.label;
      b.addEventListener("click", function () { setHere({ lat: t.lat, lng: t.lng, label: t.label }); });
      $("metros").appendChild(b);
    });
    var sel = $("allTowns");
    towns.sort(function (a, b) { return a.label.split(", ")[1].localeCompare(b.label.split(", ")[1]) || a.label.localeCompare(b.label); }).forEach(function (t, i) {
      var o = document.createElement("option"); o.value = String(i); o.textContent = t.label.split(", ").reverse().join(" · "); sel.appendChild(o);
    });
    sel.addEventListener("change", function () { var t = towns[+sel.value]; if (sel.value !== "" && t) setHere({ lat: t.lat, lng: t.lng, label: t.label }); });
  }

  /* —— events —— */
  $("useLocation").addEventListener("click", function () {
    if (!navigator.geolocation) { $("placeMsg").textContent = "This browser won't share a location. Pick a town."; return; }
    $("placeMsg").textContent = "Finding you…";
    navigator.geolocation.getCurrentPosition(function (pos) {
      $("placeMsg").textContent = "";
      setHere({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: "" });
    }, function () { $("placeMsg").textContent = "No location. Pick a town instead."; }, { maximumAge: 600000, timeout: 10000 });
  });
  $("changePlace").addEventListener("click", function () { $("place").hidden = false; $("place").scrollIntoView({ block: "start" }); });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.window) { state.windowH = +b.dataset.window; press(b); render(); }
    else if (b.dataset.radius) { state.radius = +b.dataset.radius; press(b); render(); }
    else if (b.id === "noDrop") { state.noDrop = !state.noDrop; b.setAttribute("aria-pressed", String(state.noDrop)); render(); }
    else if (b.dataset.week) {
      var slug = b.dataset.week, i = week.indexOf(slug);
      if (i >= 0) week.splice(i, 1); else week.push(slug);
      save("cfc-week", week); render();
    } else if (b.dataset.flyer) {
      var r = state.rides.filter(function (x) { return x.slug === b.dataset.flyer; })[0];
      if (r) shareFlyer(r, b);
    }
  });
  function press(b) {
    Array.prototype.forEach.call(b.parentNode.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", String(x === b)); });
  }

  /* —— boot —— */
  fetch("/rides/rides.json").then(function (r) { return r.json(); }).then(function (rides) {
    state.rides = rides;
    buildPlaces();
    var here = load("cfc-here", null);
    if (here && typeof here.lat === "number") setHere(here); else renderWeek();
  }).catch(function () {
    $("placeMsg").textContent = "The ride list didn't load. Try again in a minute.";
  });
})();
