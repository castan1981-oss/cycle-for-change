/* Group rides directory — search + filter over the cards already in the page.
   No fetch, no framework. Works without JS (every ride is in the HTML). */
(function () {
  "use strict";
  var idx = JSON.parse(document.getElementById("gr-index").textContent);
  var cities = idx.cities;         // [["Phoenix, AZ", lat, lng], ...]
  var stateNames = {};             // "arizona" -> "AZ"
  idx.states.forEach(function (s) { stateNames[s[1].toLowerCase()] = s[0]; });

  var q = document.getElementById("gr-q");
  var geoBtn = document.getElementById("gr-geo");
  var daySel = document.getElementById("gr-day");
  var clearBtn = document.getElementById("gr-clear");
  var status = document.getElementById("gr-status");
  var nearby = document.getElementById("gr-nearby");
  var statesWrap = document.getElementById("gr-states");
  var empty = document.getElementById("gr-empty");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".gr-chip"));
  var cards = Array.prototype.slice.call(document.querySelectorAll(".gr-card"));
  var sections = Array.prototype.slice.call(document.querySelectorAll(".gr-state"));

  // remember where each card lives so "clear" can put it back
  cards.forEach(function (c) { c._home = c.parentNode; });

  var origin = null;      // {lat,lng,label} when in "near" mode
  var RADIUS = 75;        // miles shown in near mode

  function miles(a, b) {
    var R = 3958.8, r = Math.PI / 180;
    var dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function norm(s) { return (s || "").toLowerCase().replace(/[^a-z0-9, ]+/g, " ").replace(/\s+/g, " ").trim(); }

  // "phoenix", "phoenix az", "phoenix, arizona" -> city entry or null
  function matchCity(text) {
    var t = norm(text).replace(/,/g, " ").replace(/\s+/g, " ");
    if (!t) return null;
    var best = null;
    cities.forEach(function (c) {
      var name = norm(c[0]).replace(/,/g, "");           // "phoenix az"
      var cityOnly = name.replace(/ [a-z]{2}$/, "");     // "phoenix"
      var st = name.slice(-2);
      var full = cityOnly + " " + (Object.keys(stateNames).filter(function (k) { return stateNames[k] === st.toUpperCase(); })[0] || st);
      if (t === name || t === cityOnly || t === full) {
        if (!best || t === name) best = c;
      }
    });
    return best;
  }
  function matchState(text) {
    var t = norm(text).replace(/,/g, "").trim();
    if (stateNames[t]) return stateNames[t];
    if (/^[a-z]{2}$/.test(t) && idx.states.some(function (s) { return s[0].toLowerCase() === t; })) return t.toUpperCase();
    return null;
  }

  function activeFilters() {
    var disc = [], tags = [];
    chips.forEach(function (ch) {
      if (ch.getAttribute("aria-pressed") === "true") (ch.dataset.filter === "disc" ? disc : tags).push(ch.dataset.value);
    });
    return { disc: disc, tags: tags, day: daySel.value };
  }
  function passesFilters(card, f) {
    if (f.disc.length && !f.disc.some(function (d) { return (" " + card.dataset.disc + " ").indexOf(" " + d + " ") > -1; })) return false;
    if (f.tags.length && !f.tags.every(function (t) { return (" " + card.dataset.tags + " ").indexOf(" " + t + " ") > -1; })) return false;
    if (f.day && (" " + card.dataset.days + " ").indexOf(" " + f.day + " ") === -1) return false;
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
      var d = c.querySelector(".gr-dist"); if (d) d.remove();
      if (c.parentNode !== c._home) c._home.appendChild(c);
    });
    nearby.hidden = true; nearby.innerHTML = "";
    statesWrap.hidden = false;
    sections.forEach(function (s) { s.hidden = false; });
    empty.hidden = true;
  }

  function render() {
    var f = activeFilters();
    var text = q.value;
    var anyFilter = f.disc.length || f.tags.length || f.day || text || origin;
    clearBtn.hidden = !anyFilter;
    reset();
    if (!anyFilter) { status.textContent = ""; return; }

    // near mode: explicit origin, or the text is a known city
    var o = origin, label = origin && origin.label;
    if (!o) {
      var c = matchCity(text);
      if (c) { o = { lat: c[1], lng: c[2] }; label = c[0]; }
    }
    var st = !o ? matchState(text) : null;
    var shown = 0;

    if (o) {
      var list = cards.map(function (card) {
        return { card: card, d: miles(o, { lat: +card.dataset.lat, lng: +card.dataset.lng }) };
      }).filter(function (x) { return x.d <= RADIUS && passesFilters(x.card, f); })
        .sort(function (a, b) { return a.d - b.d; });
      if (!list.length) {
        // widen once so a thin state still shows something
        list = cards.map(function (card) { return { card: card, d: miles(o, { lat: +card.dataset.lat, lng: +card.dataset.lng }) }; })
          .filter(function (x) { return passesFilters(x.card, f); })
          .sort(function (a, b) { return a.d - b.d; }).slice(0, 12);
      }
      statesWrap.hidden = true;
      nearby.hidden = false;
      list.forEach(function (x) {
        var tag = document.createElement("span");
        tag.className = "gr-dist"; tag.textContent = Math.round(x.d) + " mi away";
        x.card.querySelector(".gr-card-top").appendChild(tag);
        nearby.appendChild(x.card);
      });
      shown = list.length;
      status.textContent = shown ? shown + " ride" + (shown === 1 ? "" : "s") + " near " + label + ", closest first" : "";
    } else {
      var t = st ? "" : norm(text);
      cards.forEach(function (card) {
        var ok = passesFilters(card, f) && (st ? card.dataset.state === st : textMatch(card, t));
        card.hidden = !ok; if (ok) shown++;
      });
      sections.forEach(function (s) {
        s.hidden = !s.querySelector(".gr-card:not([hidden])");
      });
      status.textContent = shown + " ride" + (shown === 1 ? "" : "s") + (st ? " in " + st : text ? " matching “" + text.trim() + "”" : "");
    }
    empty.hidden = shown > 0;
  }

  var timer;
  q.addEventListener("input", function () { origin = null; clearTimeout(timer); timer = setTimeout(render, 120); });
  q.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); render(); } });
  chips.forEach(function (ch) {
    ch.addEventListener("click", function () {
      ch.setAttribute("aria-pressed", ch.getAttribute("aria-pressed") === "true" ? "false" : "true");
      render();
    });
  });
  daySel.addEventListener("change", render);
  clearBtn.addEventListener("click", function () {
    origin = null; q.value = ""; daySel.value = "";
    chips.forEach(function (ch) { ch.setAttribute("aria-pressed", "false"); });
    render();
  });
  geoBtn.addEventListener("click", function () {
    if (!navigator.geolocation) { status.textContent = "Your browser can't share location. Type a city instead."; return; }
    status.textContent = "Finding you…";
    navigator.geolocation.getCurrentPosition(function (pos) {
      origin = { lat: pos.coords.latitude, lng: pos.coords.longitude, label: "you" };
      q.value = "";
      render();
    }, function () {
      status.textContent = "Couldn't get your location. Type a city instead.";
    }, { timeout: 8000, maximumAge: 600000 });
  });

  // ?q=phoenix or #az deep links
  var params = new URLSearchParams(location.search);
  if (params.get("q")) { q.value = params.get("q"); render(); }
})();
