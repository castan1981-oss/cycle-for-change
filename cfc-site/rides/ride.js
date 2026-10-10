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
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  // A ride posted date by date (Oct 6, 2026): the build writes the host's dates still ahead as
  // data-dates = [[ISO instant, "label"], ...]; the first one still ahead is the next ride.
  var dated = []; try { dated = art.dataset.dates ? JSON.parse(art.dataset.dates) : []; } catch (e) { dated = []; }
  var datedLabel = null;
  function next() {
    if (dated.length) {
      for (var q = 0; q < dated.length; q++) { var at = new Date(dated[q][0]); if (at > new Date()) { datedLabel = dated[q][1]; return at; } }
      return null;
    }
    var tz = art.dataset.tz, time = art.dataset.time, freq = art.dataset.freq;
    if (!tz || !time || freq === "irregular") return null;
    // the host's table of start-time changes ([[from, "HH:MM"], ...], oldest first): the time in force that day
    var times = []; try { times = art.dataset.times ? JSON.parse(art.dataset.times) : []; } catch (e) { times = []; }
    function at(y, mo, d) {
      var t = time, ymd = y + "-" + pad(mo) + "-" + pad(d);
      for (var j = 0; j < times.length; j++) if (times[j][0] <= ymd) t = times[j][1];
      return zoned(y, mo, d, +t.split(":")[0], +t.split(":")[1], tz);
    }
    var season = art.dataset.season ? art.dataset.season.split("-").map(Number) : null;
    var monthly = art.dataset.monthly ? JSON.parse(art.dataset.monthly) : null;
    var days = art.dataset.days ? art.dataset.days.split(" ") : [];
    var now = new Date(), p = parts(now, tz), k, t;
    if (monthly && monthly.length) {
      for (k = 0; k < 4; k++) {
        var y = p.year, mo = p.month + k; while (mo > 12) { mo -= 12; y += 1; }
        var cands = monthly.map(function (m) { return nth(y, mo, DAY[m.day], m.ord); }).sort(function (a, b) { return a - b; });
        for (var i = 0; i < cands.length; i++) { t = at(y, mo, cands[i]); if (t > now && inSeason(mo, season)) return t; }
      }
      return null;
    }
    if (!days.length) return null;
    var want = {}; days.forEach(function (d) { want[DAY[d]] = true; });
    for (k = 0; k < 400; k++) {
      var dt = new Date(Date.UTC(p.year, p.month - 1, p.day + k));
      if (!want[dt.getUTCDay()]) continue;
      t = at(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
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
      var text = datedLabel || new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(t);
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
      return;
    }
    var alt = document.getElementById("gr-share-alt"); if (alt) alt.hidden = false;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data.url).then(function () { say("Link copied"); }, function () { say(data.url); });
    } else {
      say(data.url);
    }
  });

  /* Oct 8, 2026 — footage from the ride. Like the homepage reel: on a wide screen without reduced
     motion it plays while it's on screen; on phones it waits for a tap. Nothing downloads until it's
     needed (preload="none"). The round button, the line under it and the picture all play and pause. */
  var fig = document.querySelector("[data-film]");
  var vid = fig && fig.querySelector("video");
  if (vid) {
    var fBtn = fig.querySelector("[data-film-btn]"), fPlay = fig.querySelector("[data-film-play]"), fLabel = fig.querySelector("[data-film-label]");
    var wide = window.matchMedia && matchMedia("(min-width: 900px) and (hover: hover)").matches;
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var user = null;
    vid.muted = true;
    var paint = function () {
      var on = !vid.paused;
      fig.setAttribute("data-playing", on ? "true" : "false");
      if (fBtn) fBtn.setAttribute("data-playing", on ? "true" : "false");
      if (fLabel) fLabel.textContent = on ? "Pause" : "Play";
    };
    var go = function () { vid.preload = "auto"; var q = vid.play(); if (q && q.catch) q.catch(function () {}); };
    var toggle = function () { if (vid.paused) { user = true; go(); } else { user = false; vid.pause(); } };
    vid.addEventListener("play", paint);
    vid.addEventListener("pause", paint);
    vid.addEventListener("error", function () { if (fBtn) fBtn.hidden = true; if (fPlay) fPlay.hidden = true; }, true);
    vid.addEventListener("click", toggle);
    if (fBtn) fBtn.addEventListener("click", toggle);
    if (fPlay) fPlay.addEventListener("click", function () { toggle(); if (fBtn) fBtn.focus({ preventScroll: true }); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) { if (!vid.paused) vid.pause(); return; }
        if (user === true || (user === null && wide && !reduce)) go();
      }, { threshold: 0.5 }).observe(vid);
    }
    paint();
  }

  /* Oct 8, 2026 — rider reviews. "Review this ride" opens the form (a <details>, so it works without
     this script); a link to #review opens it straight away. Posts to Netlify Forms like the other
     forms and says thanks only after Netlify takes it. Nothing shows on the page until a person has
     read it (tools/reviews-pull.js → an issue → the "post" label → tools/reviews-post.js). */
  var write = document.getElementById("review");
  var form = write && write.querySelector("form[data-review]");
  function openWrite() {
    if (!write || location.hash !== "#review") return;
    write.open = true;
    var first = write.querySelector("input[name=again]");
    setTimeout(function () { write.scrollIntoView({ block: "start" }); if (first) first.focus({ preventScroll: true }); }, 60);
  }
  openWrite();
  window.addEventListener("hashchange", openWrite);
  if (form) {
    var send = form.querySelector("button[type=submit]"), ok = form.querySelector(".gr-rev-ok");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.checkValidity && !form.checkValidity()) { if (form.reportValidity) form.reportValidity(); return; }
      var body = new URLSearchParams();
      new FormData(form).forEach(function (v, k) { if (typeof v === "string") body.append(k, v); });
      send.disabled = true;
      if (ok) { ok.hidden = true; ok.removeAttribute("data-bad"); }
      fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() })
        .then(function (res) {
          if (!res.ok) throw new Error("bad status");
          form.reset();
          if (ok) { ok.textContent = "Got it, thank you. It goes up once we’ve read it."; ok.hidden = false; }
          send.disabled = false;
          if (window.cfcTrack) window.cfcTrack("review_sent", { ride: (form.querySelector("[name=ride]") || {}).value || "" });
        })
        .catch(function () {
          if (ok) { ok.textContent = "That didn’t go through. Try again in a minute."; ok.setAttribute("data-bad", ""); ok.hidden = false; }
          send.disabled = false;
        });
    });
  }

  /* Oct 9, 2026 — "Send us the route": for the people who run the ride. A file upload, so it posts as
     multipart (Netlify Forms takes files that way). tools/routes-pull.js → an issue labelled "route";
     nothing reaches the page until Robert has read it and built it (tools/route-build.py). */
  var rsend = document.getElementById("send-route");
  var rform = rsend && rsend.querySelector("form[data-route-send]");
  function openRoute() {
    if (!rsend || location.hash !== "#send-route") return;
    rsend.open = true;
    setTimeout(function () { rsend.scrollIntoView({ block: "start" }); }, 60);
  }
  openRoute();
  window.addEventListener("hashchange", openRoute);
  if (rform) {
    var rbtn = rform.querySelector("button[type=submit]"), rok = rform.querySelector(".gr-rev-ok");
    var say = function (t, bad) { if (!rok) return; rok.textContent = t; if (bad) rok.setAttribute("data-bad", ""); else rok.removeAttribute("data-bad"); rok.hidden = false; };
    rform.addEventListener("submit", function (e) {
      e.preventDefault();
      if (rform.checkValidity && !rform.checkValidity()) { if (rform.reportValidity) rform.reportValidity(); return; }
      var file = rform.querySelector("[name=route_file]"), link = rform.querySelector("[name=route_link]");
      var hasFile = file && file.files && file.files.length, hasLink = link && link.value.trim();
      if (!hasFile && !hasLink) { say("Add the route file or a link to it.", true); return; }
      if (hasFile && file.files[0].size > 7.5 * 1024 * 1024) { say("That file is over 7.5 MB. Send a link to the route instead.", true); return; }
      rbtn.disabled = true;
      if (rok) rok.hidden = true;
      fetch("/", { method: "POST", body: new FormData(rform) })
        .then(function (res) {
          if (!res.ok) throw new Error("bad status");
          rform.reset();
          say("Got it, thank you. Robert reads every route before it goes up.");
          rbtn.disabled = false;
          if (window.cfcTrack) window.cfcTrack("route_sent", { ride: (rform.querySelector("[name=ride]") || {}).value || "" });
        })
        .catch(function () { say("That didn’t go through. Try again in a minute.", true); rbtn.disabled = false; });
    });
  }
})();
