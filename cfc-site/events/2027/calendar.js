/* Cycle for Change — /events/2027/ client script.
   Progressive enhancement only. The rows are already in the HTML (written by
   scripts/build-calendar.js); this script shows and hides them from the
   filters, keeps the counts honest, and remembers the filters in this browser.
   Without JS the page is the full list with native <details> for the facts. */
(function () {
  "use strict";
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var all = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var rows = all(".ev");
  if (!rows.length) return;

  var state = { q: "", m: {}, t: {}, r: {}, c: {}, conf: false, riding: false };
  try {
    var saved = JSON.parse(localStorage.getItem("cfc.cal27") || "null");
    if (saved) { state.m = saved.m || {}; state.t = saved.t || {}; state.r = saved.r || {}; state.c = saved.c || {}; state.conf = !!saved.conf; state.riding = !!saved.riding; }
  } catch (e) {}
  function persist() { try { localStorage.setItem("cfc.cal27", JSON.stringify({ m: state.m, t: state.t, r: state.r, c: state.c, conf: state.conf, riding: state.riding })); } catch (e) {} }
  var any = function (o) { for (var k in o) if (o[k]) return true; return false; };
  function anyFilter() { return state.q || any(state.m) || any(state.t) || any(state.r) || any(state.c) || state.conf || state.riding; }

  function matches(el) {
    if (state.q) {
      var hay = el.getAttribute("data-q") || "", terms = state.q.split(/\s+/);
      for (var i = 0; i < terms.length; i++) if (terms[i] && hay.indexOf(terms[i]) < 0) return false;
    }
    if (any(state.m) && !state.m[el.getAttribute("data-m")]) return false;
    if (any(state.t) && !state.t[el.getAttribute("data-t")]) return false;
    if (any(state.r) && !state.r[el.getAttribute("data-r")]) return false;
    if (any(state.c) && !state.c[el.getAttribute("data-c")]) return false;
    if (state.conf && el.getAttribute("data-s") !== "confirmed") return false;
    if (state.riding && el.getAttribute("data-y") !== "1") return false;
    return true;
  }

  function apply() {
    var shown = 0;
    all(".month").forEach(function (sec) {
      var n = 0;
      all(".ev", sec).forEach(function (el) { var ok = matches(el); el.hidden = !ok; if (ok) n++; });
      sec.hidden = n === 0;
      var c = $("[data-n]", sec); if (c) c.textContent = n;
      shown += n;
    });
    var count = $("#count");
    if (count) count.innerHTML = shown === rows.length ? "<b>" + rows.length + "</b> events" : "<b>" + shown + "</b> of " + rows.length;
    var empty = $("#empty"); if (empty) empty.hidden = shown !== 0;
    var clear = $("#clear"); if (clear) clear.hidden = !anyFilter();
    all(".mo").forEach(function (b) { b.setAttribute("aria-pressed", !!state.m[b.getAttribute("data-m")]); });
    all(".tag[data-set]").forEach(function (b) { b.setAttribute("aria-pressed", !!state[b.getAttribute("data-set")][b.getAttribute("data-v")]); });
    var tc = $("#tConf"), tr = $("#tRiding"); if (tc) tc.setAttribute("aria-pressed", state.conf); if (tr) tr.setAttribute("aria-pressed", state.riding);
    var on = 0; for (var k in state.r) if (state.r[k]) on++; for (var j in state.c) if (state.c[j]) on++;
    var mo = $("#moreOn"); if (mo) mo.textContent = on ? on + " on" : "";
    if (on && $("#moreF")) $("#moreF").open = true;
    persist();
  }
  function flip(o, k) { if (o[k]) delete o[k]; else o[k] = true; }

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
  var q = $("#q"), t;
  if (q) q.addEventListener("input", function () { clearTimeout(t); t = setTimeout(function () { state.q = q.value.trim().toLowerCase(); apply(); }, 120); });
  var clear = $("#clear");
  if (clear) clear.addEventListener("click", function () { state = { q: "", m: {}, t: {}, r: {}, c: {}, conf: false, riding: false }; if (q) q.value = ""; apply(); });

  // a hash link (/events/2027/#unbound-gravel) opens that event
  function openHash() { var id = location.hash.slice(1); if (!id) return; var el = document.getElementById(id); if (el && el.classList.contains("ev")) { el.open = true; el.hidden = false; } }
  window.addEventListener("hashchange", openHash);
  apply();
  openHash();
})();
