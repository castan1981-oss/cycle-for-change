/* Cycle for Change — coming-soon page only.
   Two jobs: paint the live mile count, and submit the waitlist quietly.
   Mileage logic is not forked — this reads the same /api/strava the site
   has always read, and only uses `miles` / `totalMiles`. It ignores
   `goal` and `pct`: 10000 is 2027, not the current denominator. */

(function () {
  "use strict";

  var ENDPOINTS = ["/api/strava", "/.netlify/functions/strava"];

  /* —— live miles since June 1 —— */

  function paint(text) {
    var els = document.querySelectorAll("[data-cur]");
    for (var i = 0; i < els.length; i++) els[i].textContent = text;
  }

  function fetchMiles(i) {
    if (i >= ENDPOINTS.length) return; // leave the static fallback in the HTML
    fetch(ENDPOINTS[i], { headers: { Accept: "application/json" } })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        return res.json();
      })
      .then(function (d) {
        if (!d || d.configured === false) {
          paint("—"); // a dash, not a broken layout
          return;
        }
        var miles = typeof d.miles === "number" ? d.miles : d.totalMiles;
        if (typeof miles !== "number" || !isFinite(miles)) {
          paint("—");
          return;
        }
        paint(Math.round(miles).toLocaleString("en-US"));
      })
      .catch(function () {
        fetchMiles(i + 1);
      });
  }

  if (window.fetch) fetchMiles(0);

  /* —— waitlist —— */

  var form = document.getElementById("waitlistForm");
  var msg = document.getElementById("wlMsg");

  if (form && msg && window.fetch) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var btn = form.querySelector(".wl-btn");
      if (btn) btn.disabled = true;
      msg.textContent = "";

      var body = new URLSearchParams(new FormData(form)).toString();

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body
      })
        .then(function (res) {
          if (!res.ok) throw new Error("bad status");
          form.reset();
          msg.textContent = "You're on the list.";
        })
        .catch(function () {
          if (btn) btn.disabled = false;
          msg.textContent = "That didn't send. Try again.";
        });
    });
  }
})();
