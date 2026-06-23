/* Field Notes — masthead mileage counter.
   Reuses the same data source and [data-cur]/[data-pct] contract as the
   homepage (see /main.js paintTally). Do NOT fork the mileage logic — this
   only reads the existing strava function and paints the masthead + line. */
(function () {
  "use strict";

  var GOAL = 7500;

  function paint(miles, pct) {
    var m = Math.max(0, Number(miles) || 0);
    var p = pct != null ? Number(pct) : Math.min(100, (m / GOAL) * 100);
    var rounded = Math.round(m);

    document.querySelectorAll("[data-cur]").forEach(function (el) {
      el.textContent = rounded.toLocaleString("en-US");
    });
    document.querySelectorAll("[data-pct]").forEach(function (el) {
      el.textContent = p.toFixed(1) + "%";
    });
    // "the line is the log" — fill the route line to the current percentage
    document.querySelectorAll("[data-line]").forEach(function (el) {
      el.style.width = Math.min(100, p).toFixed(2) + "%";
    });
  }

  fetch("/.netlify/functions/strava")
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var miles = d.totalMiles != null ? d.totalMiles : (d.miles || 0);
      paint(miles, d.pct);
    })
    .catch(function () { paint(0, 0); });
})();
