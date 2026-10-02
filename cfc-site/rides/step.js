/* Step-down pages (Pass 15, Oct 1, 2026): a city, state or facet page that shows doorways
   instead of a filtered list. A link shared before then (?bike=gravel&day=sun) still lands on
   the filtered list: the page's /all/ (data-all), keeping the facet it was on (data-keep). */
(function () {
  "use strict";
  var m = document.querySelector("[data-all]");
  if (!m || !location.search) return;
  var p = new URLSearchParams(location.search);
  if (!["q", "bike", "for", "day", "pace", "saved"].some(function (k) { return p.has(k); })) return;
  var keep = new URLSearchParams(m.getAttribute("data-keep") || "");
  keep.forEach(function (v, k) { if (!p.has(k)) p.set(k, v); });
  location.replace(m.getAttribute("data-all") + "?" + p.toString() + location.hash);
})();
