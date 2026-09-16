/* Cycle for Change — rides pages mileage line.
   Reads the same /api/strava the homepage and /events/ read (see /coming-soon.js,
   /events/events.js). Not a fork of the mileage logic — only paints [data-cur]. */
(function () {
  "use strict";
  var ENDPOINTS = ["/api/strava", "/.netlify/functions/strava"];
  function paint(miles) {
    var n = Math.max(0, Math.round(Number(miles) || 0));
    document.querySelectorAll("[data-cur]").forEach(function (el) { el.textContent = n.toLocaleString("en-US"); });
  }
  (function tryNext(i) {
    if (i >= ENDPOINTS.length) return;
    fetch(ENDPOINTS[i], { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        var miles = typeof d.miles === "number" ? d.miles : d.totalMiles;
        if (typeof miles === "number") paint(miles); else tryNext(i + 1);
      })
      .catch(function () { tryNext(i + 1); });
  })(0);
})();
