/* /rides/ hub — search first, three-tap matcher, results on demand.
   Pass 3 (Sept 28, 2026). The page ships no ride cards; this fetches /rides/index.json
   (written by tools/build-rides.js) the first time someone searches or filters, and
   renders the same card markup the generator writes. Filter state lives in the URL
   (?q=&bike=&for=&day=&pace=&saved=1) so a view can be shared. State, city and facet
   pages keep the full list in HTML (and /rides/rides.js), so nothing needs JS to reach.
   Oct 1, 2026: "More filters" is the same tile panel as the state and city pages
   (tools/build-rides.js filterPanel): live counts once the list has loaded, a tile that would
   leave nothing goes quiet, the week strip takes more than one day (?day=sat,sun; today,
   weekend and weekday still read), and a bar at the foot of the screen jumps to the results. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var idxEl = $("gr-index"), q = $("gr-q");
  if (!idxEl || !q) return;
  var idx = JSON.parse(idxEl.textContent);
  var cities = idx.cities, stateAbbr = {}, stateNames = {};
  idx.states.forEach(function (s) { stateAbbr[s[0]] = s[1]; stateNames[s[1].toLowerCase()] = s[0]; });
  // the world (Sept 30, 2026): [code, name, path, keys] for every country with a ride
  var countries = idx.countries || [], countryName = {};
  countries.forEach(function (c) { countryName[c[0]] = c[1]; });

  var form = $("gr-form"), geoBtn = $("gr-geo"), status = $("gr-status");
  var results = $("results"), grid = $("gr-results"), count = $("gr-count"), more = $("gr-show-more");
  var empty = $("gr-empty"), widenBtn = $("gr-widen"), clearBtn = $("gr-clear"), jump = $("gr-jump"), moreBox = document.querySelector(".gr-more");
  var chips = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  var RIDES = null, loading = null;
  var PAGE = 24, shown = PAGE;
  var origin = null, widened = false, RADIUS = 75;
  var f = { disc: [], tags: [], days: [], pace: "", saved: false };

  function load() {
    if (RIDES) return Promise.resolve(RIDES);
    if (!loading) loading = fetch("/rides/index.json").then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { RIDES = d; return d; })
      .catch(function (e) { loading = null; throw e; });
    return loading;
  }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  // fold accents so "Bogota" finds "Bogotá" and "Zürich" finds "Zurich"
  function fold(s) { s = String(s || ""); return s.normalize ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : s; }
  function norm(s) { return fold(s).toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9, ]+/g, " ").replace(/\s+/g, " ").trim(); }
  function miles(a, b) {
    var R = 3958.8, r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function matchCity(text) {
    var t = norm(text).replace(/,/g, " ").replace(/\s+/g, " ").trim(), best = null;
    if (!t) return null;
    cities.forEach(function (c) {
      var name = norm(c[0]).replace(/,/g, "");
      if (c[3]) { if (t === name || c[3].indexOf(t) > -1) { if (!best || t === name) best = c; } return; }
      var cityOnly = name.replace(/ [a-z]{2}$/, ""), st = name.slice(-2).toUpperCase();
      var full = cityOnly + " " + (stateAbbr[st] || st).toLowerCase();
      if (t === name || t === cityOnly || t === full) { if (!best || t === name) best = c; }
    });
    return best;
  }
  function matchCountry(text) {
    var t = norm(text).replace(/,/g, "").trim(), hit = null;
    if (!t) return null;
    countries.forEach(function (c) { if (!hit && (norm(c[1]) === t || c[3].indexOf(t) > -1)) hit = c[0]; });
    return hit;
  }
  function matchState(text) {
    var t = norm(text).replace(/,/g, "").trim();
    if (stateNames[t]) return stateNames[t];
    if (/^[a-z]{2}$/.test(t) && stateAbbr[t.toUpperCase()]) return t.toUpperCase();
    return null;
  }
  function todayKey() { return DAYS[new Date().getDay()]; }
  // a day, a list (sat,sun), or the words today / weekend / weekday
  function expandDay(day) {
    if (day === "today") return [todayKey()];
    if (day === "weekend") return ["sat", "sun"];
    if (day === "weekday") return ["mon", "tue", "wed", "thu", "fri"];
    return String(day || "").split(",").filter(function (d) { return DAYS.indexOf(d) > -1; });
  }
  function sameDays(a, b) { return a.length === b.length && a.every(function (d) { return b.indexOf(d) > -1; }); }
  function isDayKey(v) { return DAYS.indexOf(v) > -1; }
  function any() { return !!(f.disc.length || f.tags.length || f.days.length || f.pace || f.saved || q.value.trim() || origin); }

  var WAIT = { waits: "Waits for you", regroups: "Regroups", drops: "Drops" };
  /* Pass 6: the card carries its discipline's mark (cfc-site/rides/marks.svg); keep in step with tools/build-rides.js card() */
  var MARKS = { road: 1, gravel: 1, mtb: 1, fixed: 1, social: 1, cruiser: 1, bmx: 1, track: 1, cyclocross: 1, ebike: 1, mixed: 1 };
  function markOf(r) { var k = r.k === "open-streets" ? "open-streets" : (r.d && r.d[0]); return '<svg class="gr-mark" aria-hidden="true" focusable="false"><use href="/rides/marks.svg#m-' + (MARKS[k] || k === "open-streets" ? k : "mixed") + '"/></svg>'; }
  function card(r, d) {
    var tags = r.tl.map(function (t) { return '<span class="gr-tag">' + esc(t) + "</span>"; }).join("") + (r.u ? '<span class="gr-tag gr-tag-warn">Unconfirmed</span>' : "");
    return '<div class="gr-card" data-slug="' + r.s + '">' +
      '<span class="gr-card-top">' + markOf(r) + '<span class="gr-disc">' + esc(r.dl) + "</span>" + (d != null ? '<span class="gr-dist">' + Math.round(d) + " mi away</span>" : "") + "</span>" +
      '<a class="gr-card-name" href="/rides/' + r.s + '/">' + esc(r.n) + "</a>" +
      (r.ne ? '<span class="gr-card-en">' + esc(r.ne) + "</span>" : "") +
      '<span class="gr-card-place">' + esc(r.pl || (r.c + ", " + r.st)) + (r.h ? " · " + esc(r.h) : "") + "</span>" +
      '<span class="gr-card-when">' + esc(r.w) + "</span>" +
      (r.x || r.wt ? '<span class="gr-card-stat">' + esc(r.x) + (r.wt ? (r.x ? " · " : "") + '<em class="gr-wait gr-wait--' + r.wt + '">' + WAIT[r.wt] + "</em>" : "") + "</span>" : "") +
      (tags ? '<span class="gr-tags">' + tags + "</span>" : "") +
      (r.ck ? '<span class="gr-card-checked' + (r.cf ? " gr-card-checked--look" : "") + '">' + esc(r.ck) + "</span>" : "") +
      '<button type="button" class="gr-save" data-save="' + r.s + '" aria-pressed="false" aria-label="Save ' + esc(r.n) + '"><span aria-hidden="true">☆</span></button>' +
      "</div>";
  }
  // disc and days are "any of", made-for is "all of"; skip leaves one group out (for the tile counts)
  function passes(r, saved, skip) {
    if (skip !== "disc" && f.disc.length && !f.disc.some(function (d) { return r.d.indexOf(d) > -1; })) return false;
    if (f.tags.length && !f.tags.every(function (t) { return r.t.indexOf(t) > -1; })) return false;
    if (skip !== "days" && f.days.length && !f.days.some(function (d) { return r.dy.indexOf(d) > -1; })) return false;
    if (f.pace && r.p.indexOf(f.pace) < 0) return false;
    if (f.saved && saved.indexOf(r.s) < 0) return false;
    return true;
  }
  function textMatch(r, t) {
    if (!t) return true;
    var hay = norm([r.n, r.ne, r.c, r.st, stateAbbr[r.st], r.co, r.rg, r.ho, r.h, r.dl, r.tl.join(" ")].join(" "));
    return t.split(" ").every(function (w) { return hay.indexOf(w) > -1; });
  }
  function describe() {
    var bits = [];
    if (f.disc.length) bits.push(f.disc.map(function (d) { return { mtb: "mountain bike", ebike: "e-bike" }[d] || d; }).join(" or "));
    if (f.pace) bits.push({ easy: "easy pace", steady: "steady pace", fast: "fast" }[f.pace]);
    if (f.tags.length) bits.push(f.tags.map(function (t) { return { lgbtq: "made for LGBTQ+", wtf: "women/trans/femme", bipoc: "BIPOC", beginner: "beginner friendly", "no-drop": "no-drop", family: "family" }[t] || t; }).join(", "));
    if (f.days.length) {
      var W = { mon: "Mondays", tue: "Tuesdays", wed: "Wednesdays", thu: "Thursdays", fri: "Fridays", sat: "Saturdays", sun: "Sundays" };
      bits.push(sameDays(f.days, [todayKey()]) ? "today" : sameDays(f.days, expandDay("weekend")) ? "weekends" : sameDays(f.days, expandDay("weekday")) ? "weekdays"
        : DAYS.slice(1).concat("sun").filter(function (d) { return f.days.indexOf(d) > -1; }).map(function (d) { return W[d]; }).join(" or "));
    }
    if (f.saved) bits.push("saved");
    return bits.join(" · ");
  }
  function syncUrl() {
    var p = new URLSearchParams();
    if (q.value.trim() && !origin) p.set("q", q.value.trim());
    if (f.disc.length) p.set("bike", f.disc.join(","));
    if (f.tags.length) p.set("for", f.tags.join(","));
    if (f.days.length) p.set("day", f.days.join(","));
    if (f.pace) p.set("pace", f.pace);
    if (f.saved) p.set("saved", "1");
    var s = p.toString();
    history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
  }
  function syncChips() {
    chips.forEach(function (ch) {
      var k = ch.dataset.filter, v = ch.dataset.value, on;
      if (k === "disc") on = f.disc.indexOf(v) > -1;
      else if (k === "tag") on = f.tags.indexOf(v) > -1;
      else if (k === "day") on = isDayKey(v) ? f.days.indexOf(v) > -1 : f.days.length > 0 && sameDays(f.days, expandDay(v));
      else if (k === "saved") on = f.saved;
      ch.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (window.CFCSave) window.CFCSave.paint();
  }
  function plural(n) { return n + " ride" + (n === 1 ? "" : "s"); }

  // The tiles' counts: what you'd get with each one on, inside whatever place is typed.
  // Until the list has loaded they keep the whole directory's numbers from the HTML.
  function paintCounts(pool, saved) {
    chips.forEach(function (ch) {
      var k = ch.dataset.filter, v = ch.dataset.value, n = 0, el = ch.querySelector("[data-n]");
      if (!el) return;   // quick chips carry no count
      var skip = k === "disc" ? "disc" : k === "day" ? "days" : null;
      pool.forEach(function (r) { if (passes(r, saved, skip) && (k === "disc" ? r.d : k === "tag" ? r.t : r.dy).indexOf(v) > -1) n++; });
      el.textContent = n;
      if (n || ch.getAttribute("aria-pressed") === "true") ch.removeAttribute("aria-disabled"); else ch.setAttribute("aria-disabled", "true");
      ch._n = n;
    });
    var dayTiles = chips.filter(function (ch) { return ch.dataset.filter === "day" && isDayKey(ch.dataset.value) && ch.querySelector("[data-n]"); });
    var max = Math.max.apply(null, [1].concat(dayTiles.map(function (ch) { return ch._n; })));
    dayTiles.forEach(function (ch) { ch.style.setProperty("--h", (ch._n / max).toFixed(2)); });
  }
  function poolFor(o, st, cc, t) {
    return RIDES.filter(function (r) { return o ? miles(o, { lat: r.la, lng: r.ln }) <= RADIUS : st ? r.st === st : cc ? r.co === cc : textMatch(r, t); });
  }

  // The jump bar: while the results are below the fold.
  var jumpN = jump && jump.querySelector(".gr-jump-n"), nShown = 0, ticking = false;
  function paintJump() {
    if (!jump) return;
    var show = !results.hidden && nShown > 0 && results.getBoundingClientRect().top > window.innerHeight - 120;
    if (show) jumpN.textContent = plural(nShown);
    jump.hidden = !show;
  }
  window.addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; paintJump(); });
  }, { passive: true });
  window.addEventListener("resize", paintJump);
  if (jump) jump.addEventListener("click", function (e) {
    e.preventDefault();
    results.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });

  function render(opts) {
    opts = opts || {};
    syncChips(); syncUrl();
    if (!any()) { results.hidden = true; status.textContent = ""; nShown = 0; if (RIDES) paintCounts(RIDES, []); paintJump(); return; }
    results.hidden = false;
    if (!RIDES) {
      count.textContent = "Loading rides…";
      load().then(function () { render(opts); }).catch(function () {
        count.textContent = "The ride list didn't load. Pick a state below instead.";
      });
      return;
    }
    var saved = window.CFCSave ? window.CFCSave.read() : [];
    var text = q.value, o = origin, label = origin && origin.label;
    if (!o) { var c = matchCity(text); if (c) { o = { lat: c[1], lng: c[2] }; label = c[0]; } }
    var st = !o ? matchState(text) : null;
    var cc = !o && !st ? matchCountry(text) : null;
    var list, note = "", desc = describe();
    paintCounts(poolFor(o, st, cc, st || cc ? "" : norm(text)), saved);
    if (o) {
      var all = RIDES.filter(function (r) { return passes(r, saved); })
        .map(function (r) { return { r: r, d: miles(o, { lat: r.la, lng: r.ln }) }; })
        .sort(function (a, b) { return a.d - b.d; });
      list = all.filter(function (x) { return x.d <= RADIUS; });
      if (!list.length && widened && all.length) { list = all.slice(0, 12); note = " (nothing within " + RADIUS + " mi, so these are the closest)"; }
      count.textContent = list.length ? plural(list.length) + " within " + RADIUS + " mi of " + label + ", closest first" + note + (desc ? " · " + desc : "") : "No rides within " + RADIUS + " mi of " + label + (desc ? " · " + desc : "");
      widenBtn.hidden = list.length > 0 || !all.length;
    } else {
      var t = st || cc ? "" : norm(text);
      list = RIDES.filter(function (r) { return passes(r, saved) && (st ? r.st === st : cc ? r.co === cc : textMatch(r, t)); }).map(function (r) { return { r: r, d: null }; });
      count.textContent = plural(list.length) + (st ? " in " + stateAbbr[st] : cc ? " in " + countryName[cc] : text.trim() ? " matching “" + text.trim() + "”" : "") + (desc ? " · " + desc : "");
      widenBtn.hidden = true;
    }
    if (!opts.more) shown = PAGE;
    grid.innerHTML = list.slice(0, shown).map(function (x) { return card(x.r, x.d); }).join("");
    more.hidden = list.length <= shown;
    more.textContent = "Show " + Math.min(PAGE, list.length - shown) + " more";
    empty.hidden = list.length > 0;
    status.textContent = count.textContent;
    nShown = list.length; paintJump();
    if (window.CFCSave) window.CFCSave.paint(grid);
    if (opts.scroll) results.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  // —— search + chips ——
  var timer;
  q.addEventListener("input", function () { origin = null; widened = false; clearTimeout(timer); timer = setTimeout(render, 150); });
  if (form) form.addEventListener("submit", function (e) { e.preventDefault(); render({ scroll: true }); });
  chips.forEach(function (ch) {
    ch.addEventListener("click", function () {
      var k = ch.dataset.filter, v = ch.dataset.value, i, on = ch.getAttribute("aria-pressed") === "true";
      if (ch.getAttribute("aria-disabled") === "true" && !on) return;   // a tile that would leave nothing
      if (k === "disc") { i = f.disc.indexOf(v); if (i > -1) f.disc.splice(i, 1); else f.disc.push(v); }
      else if (k === "tag") { i = f.tags.indexOf(v); if (i > -1) f.tags.splice(i, 1); else f.tags.push(v); }
      else if (k === "day" && isDayKey(v)) { i = f.days.indexOf(v); if (i > -1) f.days.splice(i, 1); else f.days.push(v); }
      else if (k === "day") f.days = on ? [] : expandDay(v);   // the Today / This weekend chips
      else if (k === "saved") f.saved = !f.saved;
      render();
    });
  });
  function clearAll() { origin = null; widened = false; q.value = ""; f = { disc: [], tags: [], days: [], pace: "", saved: false }; resetMatch(); render(); }
  clearBtn.addEventListener("click", clearAll);
  Array.prototype.forEach.call(document.querySelectorAll("[data-clear]"), function (b) { b.addEventListener("click", clearAll); });
  widenBtn.addEventListener("click", function () { widened = true; render(); });
  more.addEventListener("click", function () { shown += PAGE; render({ more: true }); });
  document.addEventListener("cfc:saved", function () { if (f.saved) render({ more: true }); });
  if (geoBtn) geoBtn.addEventListener("click", function () {
    if (!navigator.geolocation) { status.textContent = "Your browser can't share location. Type a city instead."; return; }
    status.textContent = "Finding you…";
    navigator.geolocation.getCurrentPosition(function (pos) {
      origin = { lat: pos.coords.latitude, lng: pos.coords.longitude, label: "you" }; widened = false; q.value = "";
      render({ scroll: true });
    }, function () { status.textContent = "Couldn't get your location. Type a city instead."; }, { timeout: 8000, maximumAge: 600000 });
  });

  // —— three taps ——
  var groups = Array.prototype.slice.call(document.querySelectorAll(".gr-match fieldset[data-m]"));
  groups.forEach(function (g) {
    g.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-v]"); if (!b) return;
      Array.prototype.forEach.call(g.querySelectorAll("button[data-v]"), function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    });
  });
  function pick(m) { var b = document.querySelector('.gr-match fieldset[data-m="' + m + '"] button[aria-pressed="true"]'); return b ? b.dataset.v : ""; }
  function resetMatch() {
    groups.forEach(function (g) { Array.prototype.forEach.call(g.querySelectorAll("button[data-v]"), function (x) { x.setAttribute("aria-pressed", x.dataset.v === "" ? "true" : "false"); }); });
  }
  var go = $("gr-match-go");
  if (go) go.addEventListener("click", function () {
    var ride = pick("ride");
    f.disc = ride ? [ride] : [];
    f.pace = pick("pace");
    f.days = expandDay(pick("when"));
    f.tags = []; f.saved = false;
    render({ scroll: true });
  });

  // —— restore from the URL ——
  var p = new URLSearchParams(location.search);
  if (p.get("q")) q.value = p.get("q");
  f.disc = (p.get("bike") || "").split(",").filter(Boolean);
  f.tags = (p.get("for") || "").split(",").filter(Boolean);
  f.days = expandDay(p.get("day"));
  f.pace = p.get("pace") || "";
  f.saved = p.get("saved") === "1";
  // today wears a dot on the week strip
  chips.forEach(function (ch) {
    if (ch.dataset.filter === "day" && ch.dataset.value === todayKey()) { ch.classList.add("is-today"); ch.insertAdjacentHTML("beforeend", '<span class="visually-hidden"> (today)</span>'); }
  });
  render();
  // a shared link that picked something inside "More filters" opens it
  if (moreBox && moreBox.querySelector('[aria-pressed="true"]')) moreBox.open = true;
})();
