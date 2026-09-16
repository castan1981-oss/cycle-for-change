/* Cycle for Change — /next/ homepage only.
   One job: make the rides feed read like a log. main.js renders the rows
   (discipline, miles, Strava title); this adds the date in front and hides
   Strava's default names ("Morning Ride") so the line is date · miles. */
(function () {
  var list = document.getElementById("feedList");
  if (!list) return;
  var GENERIC = /^(early morning|morning|afternoon|evening|lunch|night)\s+(ride|run|swim|walk)$/i;
  var dates = null;

  function fmt(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }
  function apply() {
    var rows = list.querySelectorAll(".ride");
    for (var i = 0; i < rows.length; i++) {
      var h = rows[i].querySelector("h3");
      var top = rows[i].querySelector(".ride-top");
      if (h && GENERIC.test(h.textContent.trim())) h.classList.add("ride-generic");
      if (dates && dates[i] && top && !top.querySelector(".ride-date")) {
        var s = document.createElement("span");
        s.className = "ride-date";
        s.textContent = fmt(dates[i]);
        top.insertBefore(s, top.firstChild);
      }
    }
  }
  if ("MutationObserver" in window) {
    new MutationObserver(apply).observe(list, { childList: true });
  }
  fetch("/.netlify/functions/strava")
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (d && d.recent && d.recent.length) dates = d.recent.map(function (a) { return a.date; });
      apply();
    })
    .catch(function () {});
  apply();
})();
