/* Cycle for Change — events directory client script.
   1. Mileage line: reads the same /api/strava the homepage reads (see
      /coming-soon.js). Not a fork — only paints [data-cur] with miles.
   2. Countdown: [data-countdown="YYYY-MM-DD"] → "in 42 days".
   3. Weather: [data-weather] with data-lat/lon/tz and optional
      data-event-date. Fetches Open-Meteo (no key, free for non-commercial use)
      and paints a current reading plus a 7-day forecast, or up to 16 days when
      the event falls inside that window so the event day is highlighted. */
(function () {
  "use strict";

  // —— 1. mileage line ————————————————————————————————————————————————————
  var ENDPOINTS = ["/api/strava", "/.netlify/functions/strava"];
  function paintMiles(miles) {
    var n = Math.max(0, Math.round(Number(miles) || 0));
    document.querySelectorAll("[data-cur]").forEach(function (el) {
      el.textContent = n.toLocaleString("en-US");
    });
  }
  (function tryNext(i) {
    if (i >= ENDPOINTS.length) return;
    fetch(ENDPOINTS[i], { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        var miles = typeof d.miles === "number" ? d.miles : d.totalMiles;
        if (typeof miles === "number") paintMiles(miles); else tryNext(i + 1);
      })
      .catch(function () { tryNext(i + 1); });
  })(0);

  // —— 2. countdown ————————————————————————————————————————————————————————
  document.querySelectorAll("[data-countdown]").forEach(function (el) {
    var iso = el.getAttribute("data-countdown");
    if (!iso) return;
    var now = new Date(); now.setHours(0, 0, 0, 0);
    var then = new Date(iso + "T00:00:00");
    var days = Math.round((then - now) / 86400000);
    if (days > 1) el.textContent = "in " + days + " days";
    else if (days === 1) el.textContent = "tomorrow";
    else if (days === 0) el.textContent = "today";
    else el.textContent = "";
  });

  // —— 3. weather ——————————————————————————————————————————————————————————
  var WMO = {
    0: "Clear", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Fog", 51: "Drizzle", 53: "Drizzle", 55: "Drizzle",
    56: "Freezing drizzle", 57: "Freezing drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain",
    66: "Freezing rain", 67: "Freezing rain", 71: "Light snow", 73: "Snow", 75: "Heavy snow", 77: "Snow grains",
    80: "Showers", 81: "Showers", 82: "Heavy showers", 85: "Snow showers", 86: "Snow showers",
    95: "Thunderstorm", 96: "Thunderstorm, hail", 99: "Thunderstorm, hail"
  };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function dayLabel(iso, todayIso) {
    if (iso === todayIso) return "Today";
    var d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }
  function daysBetween(a, b) { return Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 86400000); }
  function localIso(tz) {
    try {
      var p = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
      return p; // en-CA gives YYYY-MM-DD
    } catch (e) { return new Date().toISOString().slice(0, 10); }
  }

  document.querySelectorAll("[data-weather]").forEach(function (box) {
    var lat = box.getAttribute("data-lat"), lon = box.getAttribute("data-lon"), tz = box.getAttribute("data-tz") || "auto";
    var eventDate = box.getAttribute("data-event-date");
    var eventEnd = box.getAttribute("data-event-end") || eventDate;
    var today = localIso(tz);
    var ahead = eventDate ? daysBetween(today, eventDate) : null;
    var days = 7;
    if (ahead != null && ahead >= 0 && ahead <= 15) days = Math.min(16, Math.max(7, daysBetween(today, eventEnd) + 1));

    var url = "https://api.open-meteo.com/v1/forecast?latitude=" + encodeURIComponent(lat) + "&longitude=" + encodeURIComponent(lon) +
      "&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code,relative_humidity_2m" +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset" +
      "&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=" + encodeURIComponent(tz) + "&forecast_days=" + days;

    fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
      var c = d.current || {}, dy = d.daily || {};
      var html = "";
      if (c.temperature_2m != null) {
        html += '<p class="wx-now"><b>' + Math.round(c.temperature_2m) + '°F</b><span>' + esc(WMO[c.weather_code] || "") +
          (c.apparent_temperature != null ? " · feels like " + Math.round(c.apparent_temperature) + "°" : "") +
          (c.wind_speed_10m != null ? " · wind " + Math.round(c.wind_speed_10m) + " mph" : "") +
          (c.relative_humidity_2m != null ? " · " + Math.round(c.relative_humidity_2m) + "% humidity" : "") + " · right now</span></p>";
      }
      if (dy.time && dy.time.length) {
        html += '<ul class="wx-days">';
        dy.time.forEach(function (iso, i) {
          var isEvent = eventDate && iso >= eventDate && iso <= eventEnd;
          html += '<li class="wx-day' + (isEvent ? " is-event" : "") + '">' +
            '<span class="d">' + esc(isEvent ? "Event · " + dayLabel(iso, today) : dayLabel(iso, today)) + "</span>" +
            '<span class="hi">' + Math.round(dy.temperature_2m_max[i]) + "°</span> <span class=\"lo\">/ " + Math.round(dy.temperature_2m_min[i]) + "°</span>" +
            '<span class="x">' + esc(WMO[dy.weather_code[i]] || "") + "</span>" +
            '<span class="x">' + (dy.precipitation_probability_max[i] != null ? dy.precipitation_probability_max[i] + "% rain" : "") +
            (dy.wind_speed_10m_max[i] != null ? " · " + Math.round(dy.wind_speed_10m_max[i]) + " mph" : "") + "</span>" +
            "</li>";
        });
        html += "</ul>";
      }
      if (eventDate) {
        if (ahead > 15) html += '<p class="wx-event-note">The event is ' + ahead + " days out. A day-by-day forecast for it opens about two weeks before. Until then the typical conditions above are the best guide.</p>";
        else if (ahead < 0 && daysBetween(today, eventEnd) < 0) html += '<p class="wx-event-note">This edition has passed. The forecast above is for today; the next date will be posted when the organizer announces it.</p>';
      }
      box.innerHTML = html || '<p class="wx-status">No forecast data returned.</p>';
    }).catch(function () {
      box.innerHTML = '<p class="wx-status">Forecast unavailable right now. Try <a href="https://forecast.weather.gov/MapClick.php?lat=' + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lon) + '" rel="noopener">weather.gov</a>.</p>';
    });
  });
})();
