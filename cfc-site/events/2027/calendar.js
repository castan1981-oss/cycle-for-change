/* Cycle for Change — /events/2027/all/ client script.
   Progressive enhancement only. The rows are already in the HTML (written by
   scripts/build-calendar.js); this script shows and hides them from the
   filters, keeps the counts honest, and remembers the filters.
   Pass 22 (Oct 2, 2026): the filters live in the URL too —
     /events/2027/all/?type=gravel&far=200   ?type=charity-rides&month=6,7,8&region=northeast&cause=cancer
   so a shortlist can be bookmarked or sent to a phone. The category and month pages link here
   with their pick already on. A URL with filters wins over what this browser remembered.
   Without JS the page is the full list with native <details> for the facts. */
(function () {
  "use strict";
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var all = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var rows = all(".ev");
  if (!rows.length) return;

  // set → URL key; the buttons carry their URL value in data-k (a slug), their match value in data-v
  var KEYS = { t: "type", r: "region", c: "cause", f: "far" };
  var MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  function blank() { return { q: "", m: {}, t: {}, r: {}, c: {}, f: {}, conf: false, riding: false }; }
  var state = blank();

  function fromUrl() {
    var p;
    try { p = new URLSearchParams(location.search); } catch (e) { return false; }
    var found = false, s = blank();
    var list = function (k) { return (p.get(k) || "").toLowerCase().split(",").map(function (x) { return x.trim(); }).filter(Boolean); };
    list("month").forEach(function (v) {
      var n = v === "tba" ? 0 : /^\d+$/.test(v) ? +v : MONTHS.indexOf(v) + 1 || MONTHS.map(function (m) { return m.slice(0, 3); }).indexOf(v.slice(0, 3)) + 1;
      if (n >= 0 && n <= 12 && (n || v === "tba" || v === "0")) { s.m[n] = true; found = true; }
    });
    Object.keys(KEYS).forEach(function (set) {
      list(KEYS[set]).forEach(function (v) {
        var b = $('.tag[data-set="' + set + '"][data-k="' + v.replace(/[^a-z0-9-]/g, "") + '"]');
        if (b) { s[set][b.getAttribute("data-v")] = true; found = true; }
      });
    });
    if (p.get("conf") === "1") { s.conf = true; found = true; }
    if (p.get("riding") === "1") { s.riding = true; found = true; }
    var q = (p.get("q") || "").trim().toLowerCase();
    if (q) { s.q = q; found = true; }
    if (found) state = s;
    return found;
  }
  function fromStore() {
    try {
      var saved = JSON.parse(localStorage.getItem("cfc.cal27") || "null");
      if (saved) { state.m = saved.m || {}; state.t = saved.t || {}; state.r = saved.r || {}; state.c = saved.c || {}; state.f = saved.f || {}; state.conf = !!saved.conf; state.riding = !!saved.riding; }
    } catch (e) {}
  }
  function persist() { try { localStorage.setItem("cfc.cal27", JSON.stringify({ m: state.m, t: state.t, r: state.r, c: state.c, f: state.f, conf: state.conf, riding: state.riding })); } catch (e) {} }
  function toUrl() {
    var parts = [];
    var ms = Object.keys(state.m).filter(function (k) { return state.m[k]; }).map(Number).sort(function (a, b) { return (a || 13) - (b || 13); });
    if (ms.length) parts.push("month=" + ms.map(function (n) { return n ? n : "tba"; }).join(","));
    Object.keys(KEYS).forEach(function (set) {
      var ks = [];
      all('.tag[data-set="' + set + '"]').forEach(function (b) { if (state[set][b.getAttribute("data-v")]) ks.push(b.getAttribute("data-k")); });
      if (ks.length) parts.push(KEYS[set] + "=" + ks.join(","));
    });
    if (state.conf) parts.push("conf=1");
    if (state.riding) parts.push("riding=1");
    if (state.q) parts.push("q=" + encodeURIComponent(state.q));
    try { history.replaceState(history.state, "", location.pathname + (parts.length ? "?" + parts.join("&") : "") + location.hash); } catch (e) {}
  }

  var any = function (o) { for (var k in o) if (o[k]) return true; return false; };
  function anyFilter() { return state.q || any(state.m) || any(state.t) || any(state.r) || any(state.c) || any(state.f) || state.conf || state.riding; }

  function matches(el) {
    if (state.q) {
      var hay = el.getAttribute("data-q") || "", terms = state.q.split(/\s+/);
      for (var i = 0; i < terms.length; i++) if (terms[i] && hay.indexOf(terms[i]) < 0) return false;
    }
    if (any(state.m) && !state.m[el.getAttribute("data-m")]) return false;
    if (any(state.t) && !state.t[el.getAttribute("data-t")]) return false;
    if (any(state.r) && !state.r[el.getAttribute("data-r")]) return false;
    if (any(state.c) && !state.c[el.getAttribute("data-c")]) return false;
    if (any(state.f)) { // "any of"; a row with no distance to read only matches when no distance is picked
      var fs = (el.getAttribute("data-f") || "").split(" "), hit = false;
      for (var j = 0; j < fs.length; j++) if (fs[j] && state.f[fs[j]]) hit = true;
      if (!hit) return false;
    }
    if (state.conf && el.getAttribute("data-s") !== "confirmed") return false;
    if (state.riding && el.getAttribute("data-y") !== "1") return false;
    return true;
  }

  // the picks in words beside the count: "Gravel · 200+"
  function pickedWords() {
    var w = [];
    all(".mo").forEach(function (b) { if (state.m[b.getAttribute("data-m")]) w.push(($(".n", b) || b).textContent.trim()); });
    all(".tag[data-set]").forEach(function (b) {
      if (!state[b.getAttribute("data-set")][b.getAttribute("data-v")]) return;
      var c = b.cloneNode(true), n = $(".c", c); if (n) n.remove();
      w.push(c.textContent.trim());
    });
    if (state.conf) w.push("Confirmed only");
    if (state.riding) w.push("Robert’s rides");
    if (state.q) w.push("“" + state.q + "”");
    return w.join(" · ");
  }

  function apply(write) {
    var shown = 0;
    all(".month").forEach(function (sec) {
      var n = 0;
      all(".ev", sec).forEach(function (el) { var ok = matches(el); el.hidden = !ok; if (ok) n++; });
      sec.hidden = n === 0;
      var c = $("[data-n]", sec); if (c) c.textContent = n;
      shown += n;
    });
    var count = $("#count");
    if (count) {
      var words = pickedWords();
      count.innerHTML = (shown === rows.length && !words ? "<b>" + rows.length + "</b> events" : "<b>" + shown + "</b> of " + rows.length);
      var pk = $("#picked"); if (pk) { pk.textContent = words; pk.hidden = !words; }
    }
    var empty = $("#empty"); if (empty) empty.hidden = shown !== 0;
    var clear = $("#clear"); if (clear) clear.hidden = !anyFilter();
    all(".mo").forEach(function (b) { b.setAttribute("aria-pressed", !!state.m[b.getAttribute("data-m")]); });
    all(".tag[data-set]").forEach(function (b) { b.setAttribute("aria-pressed", !!state[b.getAttribute("data-set")][b.getAttribute("data-v")]); });
    var tc = $("#tConf"), tr = $("#tRiding"); if (tc) tc.setAttribute("aria-pressed", state.conf); if (tr) tr.setAttribute("aria-pressed", state.riding);
    var on = 0; for (var k in state.r) if (state.r[k]) on++; for (var j in state.c) if (state.c[j]) on++;
    var mo = $("#moreOn"); if (mo) mo.textContent = on ? on + " on" : "";
    if (on && $("#moreF")) $("#moreF").open = true;
    persist();
    if (write !== false) toUrl();
  }
  function flip(o, k) { if (o[k]) delete o[k]; else o[k] = true; }

  var fromLink = fromUrl();
  if (!fromLink) fromStore();
  var q = $("#q"), t;
  if (q && state.q) q.value = state.q;

  var months = $("#months");
  if (months) months.addEventListener("click", function (ev) { var b = ev.target.closest(".mo"); if (!b) return; flip(state.m, b.getAttribute("data-m")); apply(); });
  all(".frow").forEach(function (row) {
    row.addEventListener("click", function (ev) {
      var b = ev.target.closest(".tag"); if (!b) return;
      var set = b.getAttribute("data-set");
      if (set) flip(state[set], b.getAttribute("data-v"));
      else if (b.id === "tConf") state.conf = !state.conf;
      else if (b.id === "tRiding") state.riding = !state.riding;
      apply();
    });
  });
  if (q) q.addEventListener("input", function () { clearTimeout(t); t = setTimeout(function () { state.q = q.value.trim().toLowerCase(); apply(); }, 120); });
  var clear = $("#clear");
  if (clear) clear.addEventListener("click", function () { state = blank(); if (q) q.value = ""; apply(); });

  // a hash link (/events/2027/all/#unbound-gravel) opens that event
  function openHash() { var id = location.hash.slice(1); if (!id) return; var el = document.getElementById(id); if (el && el.classList.contains("ev")) { el.open = true; el.hidden = false; } }
  window.addEventListener("hashchange", openHash);
  apply(!fromLink);   // a link's own URL stays as it came; remembered picks get written up
  openHash();
})();
