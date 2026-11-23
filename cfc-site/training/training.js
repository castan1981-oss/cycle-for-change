/* /training/ (Nov 23, 2026). The page for Robert and his coach: sign in, the day's workout from the TrainingPeaks
   calendar, the week as bars, the coach's note, the next ride on the calendar. Talks only to /api/training
   (netlify/functions/training.js) and, for the mile count, /api/strava (the site's one count). A dropped ride file is
   read here with /brief/engine.js; only the day, miles, moving time and climbing are sent. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var API = "/api/training";
  var DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var LONG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var state = { week: null, pick: 0, me: null };

  function call(body) {
    return fetch(API, { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (res) { return res.json().then(function (j) { j.status = res.status; return j; }, function () { return { ok: false, error: "answer", status: res.status }; }); })
      .catch(function () { return { ok: false, error: "offline" }; });
  }
  function say(form, text, bad) {
    var p = form.classList.contains("t-say") ? form : form.querySelector(".t-say");
    if (!p) return;
    p.textContent = text; p.hidden = !text;
    if (bad) p.setAttribute("data-bad", ""); else p.removeAttribute("data-bad");
  }
  var WHY = { login: "That password didn’t match.", wait: "Too many tries. Wait fifteen minutes.", invite: "That invite link isn’t right. Ask Robert for it again.",
    password: "Ten characters or more.", offline: "No connection. Try again.", store: "That didn’t save. Try again in a minute.", feed: "That isn’t a TrainingPeaks calendar link. It’s under Settings, Account, Calendar.",
    role: "That one isn’t yours to change.", origin: "Open this page on cycleforchange.org.", signin: "Sign in again." };
  var why = function (r) { return WHY[r.error] || "That didn’t work. Try again."; };
  function show(which) {
    ["tInvite", "tSign", "tApp"].forEach(function (id) { $(id).hidden = id !== which; });
    $("tOut").hidden = which !== "tApp";
  }
  var hm = function (min) { return min ? Math.floor(min / 60) + ":" + ("0" + (min % 60)).slice(-2) : ""; };
  var dayNum = function (ymd) { return +ymd.slice(8, 10); };
  var dayText = function (ymd, i) { return LONG[i] + ", " + MON[+ymd.slice(5, 7) - 1] + " " + dayNum(ymd); };
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  // ---- the week ----
  function load(monday) {
    return call({ op: "week", monday: monday || null }).then(function (r) {
      if (!r.ok) { if (r.status === 401) show("tSign"); return; }
      var first = !state.week;
      state.week = r; state.me = r.me;
      var i = r.days.findIndex(function (d) { return d.day === r.today; });
      if (first || i > -1 || state.pick > 6) state.pick = i > -1 ? i : 0;
      show("tApp"); paint();
    });
  }
  function paint() {
    var w = state.week, d = w.days[state.pick], athlete = w.me.role === "athlete";
    var planned = d.planned, mins = planned.reduce(function (s, p) { return s + (p.minutes || 0); }, 0);
    $("tDayLabel").textContent = (d.day === w.today ? "Today, " : "") + dayText(d.day, state.pick) + (athlete ? "" : " · " + w.athlete + "’s week");
    $("tTitle").textContent = planned.length ? planned[0].title : w.hasFeed ? "Nothing planned" : "No plan yet";
    $("tDur").textContent = mins ? hm(mins) : planned.length ? "—" : "Off";
    var list = $("tPlanList"); list.textContent = "";
    planned.forEach(function (p, n) {
      if (!p.desc && n === 0) return;
      var box = el("div", "t-plan");
      if (n > 0) box.appendChild(el("b", null, p.title + (p.minutes ? " · " + hm(p.minutes) : "")));
      if (p.desc) box.appendChild(el("p", null, p.desc));
      list.appendChild(box);
    });
    if (!w.hasFeed) { var box = el("div", "t-plan"); box.appendChild(el("p", null, athlete ? "Paste your TrainingPeaks calendar link at the foot of this page and your coach’s plan shows here." : w.athlete + " hasn’t connected TrainingPeaks yet.")); list.appendChild(box); }

    var miles = d.rides.reduce(function (s, r) { return s + r.miles; }, 0);
    $("tDoneBox").hidden = !d.rides.length;
    $("tDone").innerHTML = ""; $("tDone").appendChild(document.createTextNode(String(Math.round(miles * 10) / 10))); $("tDone").appendChild(el("i", null, "mi"));
    $("tDrop").hidden = !athlete;
    var ul = $("tRides"); ul.textContent = "";
    d.rides.forEach(function (r) {
      var li = el("li"), span = el("span", null, r.miles + " miles");
      span.appendChild(el("small", null, [r.moving_s ? hm(Math.round(r.moving_s / 60)) + " moving" : null, r.gain_ft != null ? r.gain_ft.toLocaleString("en-US") + " ft" : null, r.name || null].filter(Boolean).join(", ")));
      li.appendChild(span);
      if (athlete) { var b = el("button", "t-quiet", "Take it off"); b.type = "button"; b.addEventListener("click", function () { b.disabled = true; call({ op: "ride-remove", day: r.day, id: r.id }).then(function () { load(w.monday); }); }); li.appendChild(b); }
      ul.appendChild(li);
    });

    var max = Math.max.apply(null, w.days.map(function (x) { return x.planned.reduce(function (s, p) { return s + (p.minutes || 0); }, 0); }).concat([60]));
    var total = 0, bars = $("tBars"); bars.textContent = "";
    w.days.forEach(function (x, i) {
      var m = x.planned.reduce(function (s, p) { return s + (p.minutes || 0); }, 0); total += m;
      var b = el("button", "t-bar"); b.type = "button";
      b.setAttribute("aria-pressed", i === state.pick ? "true" : "false");
      b.setAttribute("aria-label", dayText(x.day, i) + (x.planned.length ? ", " + x.planned[0].title + (m ? ", " + hm(m) : "") : ", nothing planned") + (x.rides.length ? ", ridden" : ""));
      if (x.rides.length) b.setAttribute("data-done", "");
      if (x.day === w.today) b.setAttribute("data-today", "");
      b.appendChild(el("span", "t-bar-t", m ? hm(m) : ""));
      var bar = el("span", "t-bar-b"); bar.style.height = (x.planned.length ? Math.max(10, Math.round(m / max * 120)) : 4) + "px"; b.appendChild(bar);
      var dd = el("span", "t-bar-d"); dd.appendChild(el("span", null, DAYS[i])); dd.appendChild(el("b", null, String(dayNum(x.day)))); b.appendChild(dd);
      b.addEventListener("click", function () { state.pick = i; paint(); });
      bars.appendChild(b);
    });
    var thisWeek = w.days.some(function (x) { return x.day === w.today; });
    $("tWeekH").textContent = thisWeek ? "This week" : "The week of " + MON[+w.monday.slice(5, 7) - 1] + " " + dayNum(w.monday);
    $("tWeekSum").textContent = total ? Math.floor(total / 60) + " h " + (total % 60) + " min planned" : "";
    $("tRead").textContent = !w.hasFeed ? "" : w.stale ? "TrainingPeaks didn’t answer just now. This is the last plan it gave." : w.read ? "Plan read from TrainingPeaks " + new Date(w.read).toLocaleString("en-US", { timeZone: "America/Phoenix", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) + "." : "";

    var note = $("tNote");
    note.textContent = w.note ? w.note.text : athlete ? "Nothing from your coach for this week yet." : "";
    note.hidden = !w.note && !athlete;
    $("tNoteH").textContent = athlete ? "From your coach" : "Your note to " + w.athlete;
    $("tNoteForm").hidden = athlete;
    if (!athlete && document.activeElement !== $("tNoteText")) $("tNoteText").value = w.note ? w.note.text : "";
    $("tSetup").hidden = !athlete;
    if (athlete && !w.hasFeed) $("tSetup").open = true;
    $("tSetup").querySelector("summary").textContent = w.hasFeed ? "Change the TrainingPeaks link" : "Connect TrainingPeaks";
  }
  function shift(n) { var w = state.week; if (!w) return; var t = new Date(Date.parse(w.monday + "T00:00:00Z") + n * 7 * 864e5).toISOString().slice(0, 10); state.pick = 0; load(t); }

  // ---- a dropped ride, read here ----
  function readRide(file) {
    var B = window.BRIEF;
    if (!B) return Promise.reject(new Error("The file reader didn’t load. Reload the page."));
    return B.parseAny(file).then(function (r) {
      var pts = r.pts, m = 0, moving = 0, timed = false;
      for (var i = 1; i < pts.length; i++) {
        var seg = B.dist(pts[i - 1], pts[i]); m += seg;
        if (pts[i].t && pts[i - 1].t) { var dt = (Date.parse(pts[i].t) - Date.parse(pts[i - 1].t)) / 1000; if (dt > 0 && dt <= 30 && seg / dt > 1) { moving += dt; timed = true; } }
      }
      var gain = null;
      if (pts.every(function (p) { return typeof p.ele === "number"; })) gain = B.stats(B.smooth(B.resample(pts))).gain_m * 3.28084;
      var day = pts[0].t ? new Date(Date.parse(pts[0].t) - 7 * 36e5).toISOString().slice(0, 10) : state.week.days[state.pick].day;
      return { op: "ride", day: day, miles: m / 1609.344, moving_s: timed ? moving : null, gain_ft: gain, name: r.name || "" };
    });
  }

  // ---- wiring ----
  $("tSignForm").addEventListener("submit", function (e) {
    e.preventDefault(); var f = e.target; say(f, "");
    call({ op: "login", who: $("tWho").value, password: $("tPw").value }).then(function (r) { if (!r.ok) return say(f, why(r), true); $("tPw").value = ""; load(); });
  });
  $("tOut").addEventListener("click", function () { call({ op: "logout" }).then(function () { state.week = null; show("tSign"); }); });
  $("tPrev").addEventListener("click", function () { shift(-1); });
  $("tNext").addEventListener("click", function () { shift(1); });
  $("tFile").addEventListener("change", function (e) {
    var file = e.target.files && e.target.files[0], out = $("tDropSay"); if (!file) return;
    say(out, "Reading it…");
    readRide(file).then(call).then(function (r) {
      e.target.value = "";
      if (!r.ok) return say(out, r.error === "miles" || r.error === "day" ? "That file doesn’t look like a ride." : why(r), true);
      say(out, "Saved: " + r.ride.miles + " miles, on " + MON[+r.ride.day.slice(5, 7) - 1] + " " + dayNum(r.ride.day) + ".");
      state.pick = 9;                                    // land on the ride's own day, in its own week
      load(r.ride.day).then(function () { var i = state.week.days.findIndex(function (d) { return d.day === r.ride.day; }); if (i > -1) { state.pick = i; paint(); } });
    }, function (err) { e.target.value = ""; say(out, (err && err.message) || "Couldn’t read that file.", true); });
  });
  $("tNoteForm").addEventListener("submit", function (e) {
    e.preventDefault(); var f = e.target;
    call({ op: "note", monday: state.week.monday, text: $("tNoteText").value }).then(function (r) { say(f, r.ok ? "Saved." : why(r), !r.ok); if (r.ok) load(state.week.monday); });
  });
  $("tFeedForm").addEventListener("submit", function (e) {
    e.preventDefault(); var f = e.target; say(f, "Checking it…");
    call({ op: "set-feed", url: $("tFeed").value }).then(function (r) {
      if (!r.ok) return say(f, why(r), true);
      $("tFeed").value = "";
      say(f, r.stale ? "Saved, but TrainingPeaks didn’t answer yet. Check back in a few minutes." : "Saved. " + r.found + " workouts found.");
      load(state.week && state.week.monday);
    });
  });

  // the next ride on the calendar, and the one mile count
  (function () {
    var list = []; try { list = JSON.parse($("tEvents").textContent) || []; } catch (e) { /* none */ }
    var today = new Date(Date.now() - 7 * 36e5).toISOString().slice(0, 10);
    var next = list.filter(function (x) { return x.status === "confirmed" && x.end >= today; })[0];
    if (next) {
      $("tEvent").hidden = false; $("tEvent").href = next.href;
      $("tEventName").textContent = next.name; $("tEventDate").textContent = next.date;
      $("tEventDays").textContent = String(Math.max(0, Math.round((Date.parse(next.start) - Date.parse(today)) / 864e5)));
    }
    if (today >= "2027-01-01") $("tMilesLab").textContent = "In 2027";
    fetch("/api/strava").then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { if (j && typeof j.miles === "number") $("tMiles").textContent = Math.round(j.miles).toLocaleString("en-US"); }).catch(function () {});
  })();

  // an invite link (#invite=…) sets a password; otherwise the week, or the sign-in
  var inv = (location.hash.match(/^#invite=([A-Za-z0-9_-]{24,200})$/) || [])[1];
  if (inv) {
    history.replaceState(null, "", location.pathname);   // the invite never sits in the address bar or the history
    call({ op: "invite", k: inv }).then(function (r) {
      if (!r.ok) { show("tSign"); return say($("tSignForm"), why(r), true); }
      $("tInviteName").textContent = r.name; show("tInvite");
      $("tInviteForm").addEventListener("submit", function (e) {
        e.preventDefault(); var f = e.target;
        call({ op: "set-password", k: inv, password: $("tNewPw").value }).then(function (x) { if (!x.ok) return say(f, why(x), true); inv = null; $("tNewPw").value = ""; load(); });
      });
    });
  } else load().then(function () { if (!state.week) show("tSign"); });
})();
