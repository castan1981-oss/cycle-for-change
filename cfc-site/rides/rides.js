/* Group rides directory + hubs — search and filter over the cards already in the page.
   No fetch, no framework. Works without JS (every ride is in the HTML).
   Filter state lives in the URL (?q=&bike=&for=&day=) so a view can be shared. */
(function () {
  "use strict";
  var idxEl = document.getElementById("gr-index");
  if (!idxEl) return;
  var idx = JSON.parse(idxEl.textContent);
  var cities = idx.cities;         // [["Phoenix, AZ", lat, lng], ...]
  var hubs = idx.hubs || [];       // [["AZ","Phoenix","/rides/az/phoenix/"], ...]
  var stateNames = {};             // "arizona" -> "AZ"
  var stateAbbr = {};              // "AZ" -> "Arizona"
  idx.states.forEach(function (s) { stateNames[s[1].toLowerCase()] = s[0]; stateAbbr[s[0]] = s[1]; });

  var q = document.getElementById("gr-q");
  var geoBtn = document.getElementById("gr-geo");
  var daySel = document.getElementById("gr-day");
  var clearBtn = document.getElementById("gr-clear");
  var status = document.getElementById("gr-status");
  var nearby = document.getElementById("gr-nearby");
  var statesWrap = document.getElementById("gr-states");
  var empty = document.getElementById("gr-empty");
  var widenBtn = document.getElementById("gr-widen");
  var emptyState = document.getElementById("gr-empty-state");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".gr-chip[data-filter]"));
  var cards = Array.prototype.slice.call(document.querySelectorAll(".gr-card"));
  var sections = Array.prototype.slice.call(document.querySelectorAll(".gr-state"));
  var total = +(status && status.dataset.total) || cards.length;
  if (!q || !statesWrap) return;

  cards.forEach(function (c) { c._home = c.parentNode; });

  var origin = null;      // {lat,lng,label} in "near" mode
  var RADIUS = 75;        // miles
  var widened = false;

  function miles(a, b) {
    var R = 3958.8, r = Math.PI / 180;
    var dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function norm(s) { return (s || "").toLowerCase().replace(/[^a-z0-9, ]+/g, " ").replace(/\s+/g, " ").trim(); }

  function matchCity(text) {
    var t = norm(text).replace(/,/g, " ").replace(/\s+/g, " ").trim();
    if (!t) return null;
    var best = null;
    cities.forEach(function (c) {
      var name = norm(c[0]).replace(/,/g, "");           // "phoenix az"
      var cityOnly = name.replace(/ [a-z]{2}$/, "");     // "phoenix"
      var st = name.slice(-2).toUpperCase();
      var full = cityOnly + " " + (stateAbbr[st] || st).toLowerCase();
      if (t === name || t === cityOnly || t === full) { if (!best || t === name) best = c; }
    });
    return best;
  }
  function matchState(text) {
    var t = norm(text).replace(/,/g, "").trim();
    if (stateNames[t]) return stateNames[t];
    if (/^[a-z]{2}$/.test(t) && stateAbbr[t.toUpperCase()]) return t.toUpperCase();
    return null;
  }
  function todayKey() { return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][new Date().getDay()]; }

  function activeFilters() {
    var disc = [], tags = [];
    chips.forEach(function (ch) { if (ch.getAttribute("aria-pressed") === "true") (ch.dataset.filter === "disc" ? disc : tags).push(ch.dataset.value); });
    var day = daySel ? daySel.value : "";
    var days = day === "today" ? [todayKey()] : day === "weekend" ? ["sat", "sun"] : day ? [day] : [];
    return { disc: disc, tags: tags, day: day, days: days };
  }
  function has(list, v) { return (" " + list + " ").indexOf(" " + v + " ") > -1; }
  function passesFilters(card, f) {
    if (f.disc.length && !f.disc.some(function (d) { return has(card.dataset.disc, d); })) return false;
    if (f.tags.length && !f.tags.every(function (t) { return has(card.dataset.tags, t); })) return false;
    if (f.days.length && !f.days.some(function (d) { return has(card.dataset.days, d); })) return false;
    return true;
  }
  function textMatch(card, t) {
    if (!t) return true;
    var hay = norm([card.dataset.name, card.dataset.city, card.dataset.state, card.dataset.host, card.dataset.hood, card.dataset.disc, card.dataset.tags].join(" "));
    return t.split(" ").every(function (w) { return hay.indexOf(w) > -1; });
  }
  function reset() {
    cards.forEach(function (c) {
      c.hidden = false;
      var d = c.querySelector(".gr-dist[data-live]"); if (d) d.remove();
      if (c.parentNode !== c._home) c._home.appendChild(c);
    });
    nearby.hidden = true; nearby.innerHTML = "";
    statesWrap.hidden = false;
    sections.forEach(function (s) { s.hidden = false; });
    empty.hidden = true;
    if (emptyState) emptyState.hidden = true;
  }
  function syncUrl(f) {
    var p = new URLSearchParams();
    if (q.value.trim() && !origin) p.set("q", q.value.trim());
    if (f.disc.length) p.set("bike", f.disc.join(","));
    if (f.tags.length) p.set("for", f.tags.join(","));
    if (f.day) p.set("day", f.day);
    var s = p.toString();
    history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
  }
  function plural(n) { return n + " ride" + (n === 1 ? "" : "s"); }

  function render() {
    var f = activeFilters();
    var text = q.value;
    var anyFilter = f.disc.length || f.tags.length || f.day || text.trim() || origin;
    clearBtn.hidden = !anyFilter;
    reset();
    syncUrl(f);
    if (!anyFilter) { status.textContent = plural(total); return; }

    var o = origin, label = origin && origin.label;
    if (!o) { var c = matchCity(text); if (c) { o = { lat: c[1], lng: c[2] }; label = c[0]; } }
    var st = !o ? matchState(text) : null;
    var shown = 0;

    if (o) {
      var all = cards.map(function (card) { return { card: card, d: miles(o, { lat: +card.dataset.lat, lng: +card.dataset.lng }) }; })
        .filter(function (x) { return passesFilters(x.card, f); }).sort(function (a, b) { return a.d - b.d; });
      var list = all.filter(function (x) { return x.d <= RADIUS; });
      var note = "";
      if (!list.length && (widened || !all.length)) { list = all.slice(0, 12); note = " — nothing within " + RADIUS + " mi, showing the closest"; }
      statesWrap.hidden = true;
      nearby.hidden = false;
      list.forEach(function (x) {
        var tag = document.createElement("span");
        tag.className = "gr-dist"; tag.setAttribute("data-live", ""); tag.textContent = Math.round(x.d) + " mi away";
        x.card.querySelector(".gr-card-top").appendChild(tag);
        nearby.appendChild(x.card);
      });
      shown = list.length;
      status.textContent = shown ? plural(shown) + " within " + RADIUS + " mi of " + label + ", closest first" + note : "No rides within " + RADIUS + " mi of " + label;
      if (!shown && widenBtn) widenBtn.hidden = !all.length;
    } else {
      var t = st ? "" : norm(text);
      cards.forEach(function (card) {
        var ok = passesFilters(card, f) && (st ? card.dataset.state === st : textMatch(card, t));
        card.hidden = !ok; if (ok) shown++;
      });
      sections.forEach(function (s) { s.hidden = !s.querySelector(".gr-card:not([hidden])"); });
      status.textContent = plural(shown) + (st ? " in " + (stateAbbr[st] || st) : text.trim() ? " matching “" + text.trim() + "”" : "");
      if (widenBtn) widenBtn.hidden = true;
      if (!shown && st && emptyState) { emptyState.href = "/rides/" + st.toLowerCase() + "/"; emptyState.hidden = false; }
    }
    empty.hidden = shown > 0;
  }

  var timer;
  q.addEventListener("input", function () { origin = null; widened = false; clearTimeout(timer); timer = setTimeout(render, 120); });
  q.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); render(); } });
  chips.forEach(function (ch) {
    ch.addEventListener("click", function () { ch.setAttribute("aria-pressed", ch.getAttribute("aria-pressed") === "true" ? "false" : "true"); render(); });
  });
  if (daySel) daySel.addEventListener("change", render);
  function clearAll() {
    origin = null; widened = false; q.value = ""; if (daySel) daySel.value = "";
    chips.forEach(function (ch) { ch.setAttribute("aria-pressed", "false"); });
    render();
  }
  clearBtn.addEventListener("click", clearAll);
  Array.prototype.forEach.call(document.querySelectorAll("[data-clear]"), function (b) { b.addEventListener("click", clearAll); });
  if (widenBtn) widenBtn.addEventListener("click", function () { widened = true; render(); });
  if (geoBtn) geoBtn.addEventListener("click", function () {
    if (!navigator.geolocation) { status.textContent = "Your browser can't share location. Type a city instead."; return; }
    status.textContent = "Finding you…";
    navigator.geolocation.getCurrentPosition(function (pos) {
      origin = { lat: pos.coords.latitude, lng: pos.coords.longitude, label: "you" }; widened = false;
      q.value = ""; render();
    }, function () { status.textContent = "Couldn't get your location. Type a city instead."; }, { timeout: 8000, maximumAge: 600000 });
  });

  // restore state from the URL
  var params = new URLSearchParams(location.search);
  if (params.get("q")) q.value = params.get("q");
  (params.get("bike") || "").split(",").concat((params.get("for") || "").split(",")).forEach(function (v) {
    chips.forEach(function (ch) { if (v && ch.dataset.value === v) ch.setAttribute("aria-pressed", "true"); });
  });
  if (daySel && params.get("day")) daySel.value = params.get("day");
  render();
})();
