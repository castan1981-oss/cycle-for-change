/* Group rides directory + hubs — search and filter over the cards already in the page.
   No fetch, no framework. Works without JS (every ride is in the HTML).
   Filter state lives in the URL (?q=&bike=&for=&day=) so a view can be shared.
   Oct 1, 2026: the filters are tiles (tools/build-rides.js filterPanel). Every tile says how
   many rides you'd get if you tapped it and goes quiet when that's none; the week is a bar
   strip you can tap more than one day on (day=sat,sun); the count of what's left sits big
   under the panel; and while the rides are out of sight a bar at the foot of the screen
   says how many and jumps to them. */
(function () {
  "use strict";
  // Pass 15: a short page carries only the day strip — no search box, no index, no "near me"
  var idxEl = document.getElementById("gr-index");
  var idx = idxEl ? JSON.parse(idxEl.textContent) : { cities: [], states: [], countries: [] };
  var cities = idx.cities;         // [["Phoenix, AZ", lat, lng], ...]
  var stateNames = {};             // "arizona" -> "AZ"
  var stateAbbr = {};              // "AZ" -> "Arizona"
  idx.states.forEach(function (s) { stateNames[s[1].toLowerCase()] = s[0]; stateAbbr[s[0]] = s[1]; });
  var countries = idx.countries || [], countryName = {};   // the world (Sept 30, 2026): [code, name, path, keys]
  countries.forEach(function (c) { countryName[c[0]] = c[1]; });

  var $ = function (id) { return document.getElementById(id); };
  var slice = function (l) { return Array.prototype.slice.call(l); };
  var q = $("gr-q"), geoBtn = $("gr-geo"), clearBtn = $("gr-clear"), status = $("gr-status"), bigN = $("gr-n");
  var nearby = $("gr-nearby"), statesWrap = $("gr-states"), empty = $("gr-empty"), widenBtn = $("gr-widen");
  var emptyState = $("gr-empty-state"), list = $("gr-list"), jump = $("gr-jump");
  var tiles = slice(document.querySelectorAll("#gr-filters [data-filter]"));
  var cards = slice(document.querySelectorAll(".gr-card"));
  var sections = slice(document.querySelectorAll(".gr-state"));
  var total = +(status && status.dataset.total) || cards.length;
  if (!statesWrap || !tiles.length) return;
  if (!q) q = { value: "", addEventListener: function () {} };

  cards.forEach(function (c) { c._home = c.parentNode; });

  var origin = null;      // {lat,lng,label} in "near" mode
  var RADIUS = 75;        // miles
  var widened = false;
  var DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var shown = 0;

  function miles(a, b) {
    var R = 3958.8, r = Math.PI / 180;
    var dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function fold(s) { s = String(s || ""); return s.normalize ? s.normalize("NFD").replace(/[̀-ͯ]/g, "") : s; }
  function norm(s) { return fold(s).toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9, ]+/g, " ").replace(/\s+/g, " ").trim(); }

  function matchCity(text) {
    var t = norm(text).replace(/,/g, " ").replace(/\s+/g, " ").trim();
    if (!t) return null;
    var best = null;
    cities.forEach(function (c) {
      var name = norm(c[0]).replace(/,/g, "");           // "phoenix az"
      if (c[3]) { if (t === name || c[3].indexOf(t) > -1) { if (!best || t === name) best = c; } return; }   // keys: "bogota", "bogota colombia"…
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
  function matchCountry(text) {
    var t = norm(text).replace(/,/g, "").trim(), hit = null;
    if (!t) return null;
    countries.forEach(function (c) { if (!hit && (norm(c[1]) === t || c[3].indexOf(t) > -1)) hit = c[0]; });
    return hit;
  }
  function todayKey() { return DAYS[new Date().getDay()]; }
  // ?day= takes a day, a list (sat,sun), or the old words: today, weekend, weekday
  function expandDay(v) {
    if (v === "today") return [todayKey()];
    if (v === "weekend") return ["sat", "sun"];
    if (v === "weekday") return ["mon", "tue", "wed", "thu", "fri"];
    return String(v || "").split(",").filter(function (d) { return DAYS.indexOf(d) > -1; });
  }

  function pressed(t) { return t.getAttribute("aria-pressed") === "true"; }
  function activeFilters() {
    var f = { disc: [], tags: [], days: [] };
    tiles.forEach(function (t) { if (pressed(t)) f[{ disc: "disc", tag: "tags", day: "days" }[t.dataset.filter]].push(t.dataset.value); });
    return f;
  }
  function has(list, v) { return (" " + list + " ").indexOf(" " + v + " ") > -1; }
  // disc and day are "any of", made-for is "all of" (a no-drop beginner ride is both)
  function passes(card, f, skip) {
    if (skip !== "disc" && f.disc.length && !f.disc.some(function (d) { return has(card.dataset.disc, d); })) return false;
    if (skip !== "tags" && f.tags.length && !f.tags.every(function (t) { return has(card.dataset.tags, t); })) return false;
    if (skip !== "days" && f.days.length && !f.days.some(function (d) { return has(card.dataset.days, d); })) return false;
    return true;
  }
  function textMatch(card, t) {
    if (!t) return true;
    var hay = norm([card.dataset.name, card.dataset.city, card.dataset.state, card.dataset.country, card.dataset.place, card.dataset.host, card.dataset.hood, card.dataset.disc, card.dataset.tags].join(" "));
    return t.split(" ").every(function (w) { return hay.indexOf(w) > -1; });
  }
  function anyFilter(f) { return !!(f.disc.length || f.tags.length || f.days.length || q.value.trim() || origin); }

  // Where we're looking, before any tile: a place (origin), a state, a country, or words.
  function scopeOf(text) {
    var o = origin, label = origin && origin.label;
    if (!o) { var c = matchCity(text); if (c) { o = { lat: c[1], lng: c[2] }; label = c[0]; } }
    if (o) {
      var all = cards.map(function (card) { return { card: card, d: miles(o, { lat: +card.dataset.lat, lng: +card.dataset.lng }) }; })
        .sort(function (a, b) { return a.d - b.d; });
      return { near: true, label: label, all: all, pool: all.filter(function (x) { return x.d <= RADIUS; }).map(function (x) { return x.card; }) };
    }
    var st = matchState(text), cc = !st ? matchCountry(text) : null, t = st || cc ? "" : norm(text);
    return { near: false, st: st, cc: cc, pool: cards.filter(function (card) { return st ? card.dataset.state === st : cc ? card.dataset.country === cc : textMatch(card, t); }) };
  }

  // Each tile's count = what you'd get with it on, everything else as it is.
  function paintCounts(pool, f) {
    var dayN = {}, max = 1;
    tiles.forEach(function (t) {
      var k = t.dataset.filter, v = t.dataset.value, n = 0, field = { disc: "disc", tag: "tags", day: "days" }[k];
      // an "any of" group counts as if its own picks were off; made-for ("all of") keeps them
      pool.forEach(function (card) { if (passes(card, f, field === "tags" ? null : field) && has(card.dataset[field], v)) n++; });
      var el = t.querySelector("[data-n]"); if (el) el.textContent = n;
      if (n || pressed(t)) t.removeAttribute("aria-disabled"); else t.setAttribute("aria-disabled", "true");
      if (k === "day") { dayN[v] = n; if (n > max) max = n; }
    });
    tiles.forEach(function (t) { if (t.dataset.filter === "day") t.style.setProperty("--h", (dayN[t.dataset.value] / max).toFixed(2)); });
  }

  function reset() {
    cards.forEach(function (c) {
      c.hidden = false;
      Array.prototype.forEach.call(c.querySelectorAll("[data-live]"), function (d) { d.remove(); });
      var st = c.querySelector(".gr-dist"); if (st) st.hidden = false;
      if (c.parentNode !== c._home) c._home.appendChild(c);
    });
    if (nearby) { nearby.hidden = true; nearby.innerHTML = ""; }
    statesWrap.hidden = false;
    sections.forEach(function (s) { s.hidden = false; });
    if (empty) empty.hidden = true;
    if (emptyState) emptyState.hidden = true;
  }
  function syncUrl(f) {
    var p = new URLSearchParams();
    if (q.value.trim() && !origin) p.set("q", q.value.trim());
    if (f.disc.length) p.set("bike", f.disc.join(","));
    if (f.tags.length) p.set("for", f.tags.join(","));
    if (f.days.length) p.set("day", f.days.join(","));
    var s = p.toString();
    history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
  }
  function rides(n) { return "ride" + (n === 1 ? "" : "s"); }
  function sayAll(kind, joiner) {
    return tiles.filter(function (t) { return t.dataset.filter === kind && pressed(t); }).map(function (t) { return t.dataset.say; }).join(joiner);
  }
  function describe(f) {
    var bits = [];
    if (f.disc.length) bits.push(sayAll("disc", " or "));
    if (f.tags.length) bits.push(sayAll("tag", " + "));
    if (f.days.length) {
      var d = f.days.slice().sort().join(",");
      bits.push(d === "sat,sun" ? "weekends" : d === "fri,mon,thu,tue,wed" ? "weekdays" : sayAll("day", " or "));
    }
    return bits.join(" · ");
  }
  function say(n, text) {
    if (bigN) { bigN.hidden = n == null; if (n != null) bigN.textContent = n; }
    status.textContent = text;
  }

  function render() {
    var f = activeFilters();
    var text = q.value;
    var on = anyFilter(f);
    if (clearBtn) clearBtn.hidden = !on;
    reset();
    syncUrl(f);
    var sc = scopeOf(text);
    paintCounts(sc.pool, f);
    var desc = describe(f), tail = desc ? " · " + desc : "";
    if (!on) { shown = total; say(total, rides(total)); paintJump(); return; }

    if (sc.near) {
      var all = sc.all.filter(function (x) { return passes(x.card, f); });
      var hits = all.filter(function (x) { return x.d <= RADIUS; });
      var note = "";
      if (!hits.length && (widened || !all.length)) { hits = all.slice(0, 12); note = " — nothing within " + RADIUS + " mi, showing the closest"; }
      statesWrap.hidden = true;
      nearby.hidden = false;
      hits.forEach(function (x) {
        var tag = document.createElement("span");
        tag.className = "gr-dist"; tag.setAttribute("data-live", ""); tag.textContent = Math.round(x.d) + " mi";
        // the distance from you replaces the distance from the city centre
        var meta = x.card.querySelector(".gr-card-meta"), st = meta.querySelector(".gr-dist");
        if (st) st.hidden = true;
        meta.insertBefore(tag, meta.firstChild);
        nearby.appendChild(x.card);
      });
      shown = hits.length;
      say(shown, rides(shown) + " within " + RADIUS + " mi of " + sc.label + (shown ? ", closest first" : "") + note + tail);
      if (!shown && widenBtn) widenBtn.hidden = !all.length;
    } else {
      shown = 0;
      cards.forEach(function (card) {
        var ok = sc.pool.indexOf(card) > -1 && passes(card, f);
        card.hidden = !ok; if (ok) shown++;
      });
      sections.forEach(function (s) { s.hidden = !s.querySelector(".gr-card:not([hidden])"); });
      say(shown, rides(shown) + (sc.st ? " in " + (stateAbbr[sc.st] || sc.st) : sc.cc ? " in " + (countryName[sc.cc] || sc.cc) : text.trim() ? " matching “" + text.trim() + "”" : "") + tail);
      if (widenBtn) widenBtn.hidden = true;
      if (!shown && sc.st && emptyState) { emptyState.href = "/rides/" + sc.st.toLowerCase() + "/"; emptyState.hidden = false; }
    }
    if (empty) empty.hidden = shown > 0;
    paintJump();
  }

  // The jump bar: only while something's picked, there's something to see, and it's below the fold.
  // Once the big number is on screen the bar steps aside (it would only say the same thing).
  var jumpN = jump && jump.querySelector(".gr-jump-n"), line = document.querySelector(".gr-result"), ticking = false;
  function paintJump() {
    if (!jump || !list || !line) return;
    var below = line.getBoundingClientRect().bottom > window.innerHeight && list.getBoundingClientRect().top > 0;
    var show = clearBtn && !clearBtn.hidden && shown > 0 && below;
    if (show) jumpN.textContent = shown + " " + rides(shown);
    jump.hidden = !show;
  }
  window.addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; paintJump(); });
  }, { passive: true });
  window.addEventListener("resize", paintJump);
  if (jump) jump.addEventListener("click", function (e) {
    e.preventDefault();
    list.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });

  var timer;
  q.addEventListener("input", function () { origin = null; widened = false; clearTimeout(timer); timer = setTimeout(render, 120); });
  q.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); render(); } });
  tiles.forEach(function (t) {
    t.addEventListener("click", function () {
      if (t.getAttribute("aria-disabled") === "true" && !pressed(t)) return;   // a tile that would leave nothing
      t.setAttribute("aria-pressed", pressed(t) ? "false" : "true");
      render();
    });
  });
  function clearAll() {
    origin = null; widened = false; q.value = "";
    tiles.forEach(function (t) { t.setAttribute("aria-pressed", "false"); });
    render();
  }
  if (clearBtn) clearBtn.addEventListener("click", clearAll);
  slice(document.querySelectorAll("[data-clear]")).forEach(function (b) { b.addEventListener("click", clearAll); });
  if (widenBtn) widenBtn.addEventListener("click", function () { widened = true; render(); });
  if (geoBtn) geoBtn.addEventListener("click", function () {
    if (!navigator.geolocation) { say(null, "Your browser can't share location. Type a city instead."); return; }
    say(null, "Finding you…");
    navigator.geolocation.getCurrentPosition(function (pos) {
      origin = { lat: pos.coords.latitude, lng: pos.coords.longitude, label: "you" }; widened = false;
      q.value = ""; render();
    }, function () { say(null, "Couldn't get your location. Type a city instead."); }, { timeout: 8000, maximumAge: 600000 });
  });

  // today wears a dot on the week strip
  tiles.forEach(function (t) {
    if (t.dataset.filter === "day" && t.dataset.value === todayKey()) {
      t.classList.add("is-today");
      t.insertAdjacentHTML("beforeend", '<span class="visually-hidden"> (today)</span>');
    }
  });

  // restore state from the URL
  var params = new URLSearchParams(location.search);
  if (params.get("q")) q.value = params.get("q");
  var want = { disc: (params.get("bike") || "").split(","), tag: (params.get("for") || "").split(","), day: expandDay(params.get("day")) };
  tiles.forEach(function (t) { if (want[t.dataset.filter].indexOf(t.dataset.value) > -1) t.setAttribute("aria-pressed", "true"); });
  render();
})();
