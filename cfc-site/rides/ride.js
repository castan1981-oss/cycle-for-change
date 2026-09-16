/* Ride page: live "next ride" in the ride's own time zone, and a share button.
   Reads the data-* attributes the generator puts on <article data-ride>. */
(function () {
  "use strict";
  var art = document.querySelector("[data-ride]");
  if (!art) return;
  var DAY = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };

  function parts(date, tz) {
    var o = {};
    new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })
      .formatToParts(date).forEach(function (p) { if (p.type !== "literal") o[p.type] = +p.value; });
    return o;
  }
  function zoned(y, mo, d, hh, mm, tz) {           // wall clock in tz -> Date
    var guess = Date.UTC(y, mo - 1, d, hh, mm);
    var p = parts(new Date(guess), tz);
    var asIf = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
    return new Date(guess - (asIf - guess));
  }
  function inSeason(month, s) {
    if (!s) return true;
    return s[0] <= s[1] ? month >= s[0] && month <= s[1] : month >= s[0] || month <= s[1];
  }
  function nth(y, mo, dow, ord) {
    if (ord > 0) { var first = new Date(Date.UTC(y, mo - 1, 1)).getUTCDay(); return 1 + ((dow - first + 7) % 7) + (ord - 1) * 7; }
    var last = new Date(Date.UTC(y, mo, 0)); return last.getUTCDate() - ((last.getUTCDay() - dow + 7) % 7);
  }
  function next() {
    var tz = art.dataset.tz, time = art.dataset.time, freq = art.dataset.freq;
    if (!tz || !time || freq === "irregular") return null;
    var hh = +time.split(":")[0], mm = +time.split(":")[1];
    var season = art.dataset.season ? art.dataset.season.split("-").map(Number) : null;
    var monthly = art.dataset.monthly ? JSON.parse(art.dataset.monthly) : null;
    var days = art.dataset.days ? art.dataset.days.split(" ") : [];
    var now = new Date(), p = parts(now, tz), k, t;
    if (monthly && monthly.length) {
      for (k = 0; k < 4; k++) {
        var y = p.year, mo = p.month + k; while (mo > 12) { mo -= 12; y += 1; }
        var cands = monthly.map(function (m) { return nth(y, mo, DAY[m.day], m.ord); }).sort(function (a, b) { return a - b; });
        for (var i = 0; i < cands.length; i++) { t = zoned(y, mo, cands[i], hh, mm, tz); if (t > now && inSeason(mo, season)) return t; }
      }
      return null;
    }
    if (!days.length) return null;
    var want = {}; days.forEach(function (d) { want[DAY[d]] = true; });
    for (k = 0; k < 400; k++) {
      var dt = new Date(Date.UTC(p.year, p.month - 1, p.day + k));
      if (!want[dt.getUTCDay()]) continue;
      t = zoned(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate(), hh, mm, tz);
      if (t > now && inSeason(dt.getUTCMonth() + 1, season)) return t;
    }
    return null;
  }
  function rel(t) {
    var ms = t - Date.now(), h = Math.round(ms / 36e5), d = Math.round(ms / 864e5);
    if (h < 1) return "starting now";
    if (h < 24) return "in " + h + " hour" + (h === 1 ? "" : "s");
    if (d === 1) return "tomorrow";
    if (d < 14) return "in " + d + " days";
    return "in " + Math.round(d / 7) + " weeks";
  }
  var box = document.getElementById("gr-next");
  var t = next();
  if (box) {
    if (t) {
      var tz = art.dataset.tz;
      var text = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(t);
      var el = box.querySelector("[data-next-text]"); if (el) { el.textContent = text; el.setAttribute("datetime", t.toISOString()); }
      var r = box.querySelector("[data-next-rel]"); if (r) r.textContent = rel(t) + (art.dataset.freq === "biweekly" ? " \u00b7 every other week, confirm which with the host" : "");
      box.hidden = false;
    } else {
      box.hidden = true;
    }
  }

  // Share: Web Share where it exists, copy-link everywhere else
  var btn = document.getElementById("gr-share"), toast = document.getElementById("gr-toast");
  function say(msg) { if (!toast) return; toast.textContent = msg; clearTimeout(say.t); say.t = setTimeout(function () { toast.textContent = ""; }, 2500); }
  if (btn) btn.addEventListener("click", function () {
    var data = { title: btn.dataset.title, text: "Group ride: " + btn.dataset.title, url: location.href.split("#")[0] };
    if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
      navigator.share(data).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(data.url).then(function () { say("Link copied"); }, function () { say(data.url); });
    } else {
      say(data.url);
    }
  });
})();
