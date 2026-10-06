/* Cycle for Change — behaviour for the shared chrome on every inner page.
   1. The tally line: paints [data-cur] from the same /api/strava the homepage
      reads (see /home.js). Not a fork of the mileage logic — a dead feed is
      never painted as 0; the dash stays.
   2. The mobile menu: same open/close/focus-trap as /home.js.
   3. "Mile updates": the waitlist form posts to Netlify without leaving the page,
      same copy as the homepage.
   4. Marks the current section in the nav.
   Markup: scripts/chrome.js. Styles: /chrome.css. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };

  /* —— 1. tally —— */
  var ENDPOINTS = ["/api/strava", "/.netlify/functions/strava"];
  function paintMiles(miles) {
    var n = Math.max(0, Math.round(Number(miles) || 0));
    document.querySelectorAll("[data-cur]").forEach(function (el) { el.textContent = n.toLocaleString("en-US"); });
  }
  if (document.querySelector("[data-cur]")) (function tryNext(i) {
    if (i >= ENDPOINTS.length) return;
    fetch(ENDPOINTS[i], { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        var miles = typeof d.miles === "number" ? d.miles : d.totalMiles;
        if (typeof miles === "number" && miles > 0) paintMiles(miles); else tryNext(i + 1);
      })
      .catch(function () { tryNext(i + 1); });
  })(0);

  /* —— 2. menu —— */
  var menu = $("menu"), menuBtn = $("menuBtn"), menuClose = $("menuClose");
  if (menu && menuBtn && menuClose) {
    var setMenu = function (open, refocus) {
      menu.hidden = !open;
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) menuClose.focus(); else if (refocus) menuBtn.focus();
    };
    menuBtn.addEventListener("click", function () { setMenu(true); });
    menuClose.addEventListener("click", function () { setMenu(false, true); });
    menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) setMenu(false, false); });
    document.addEventListener("keydown", function (e) {
      if (menu.hidden) return;
      if (e.key === "Escape") { setMenu(false, true); return; }
      if (e.key !== "Tab") return;
      var f = menu.querySelectorAll("a[href],button"), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* —— 3. mile updates —— */
  var emailForm = $("emailForm"), emailOk = $("emailOk");

  /* Key events for Google Analytics (the tag itself is Netlify snippet injection, G-DWNR81WXS3).
     sign_up = mile-updates signup; org_ride_click = a tap through to an org's ride or give page;
     ride_host_click = a tap through to a group ride host's page. No personal data is sent. */
  var ORG_HOSTS = /(^|\.)(runsignup\.com|onenten\.org|lalgbtcenter\.org|sfaf\.org)$/;
  function cfcTrack(name, params) { try { if (typeof window.gtag === "function") window.gtag("event", name, params || {}); } catch (e) {} }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href^='http']") : null;
    if (!a) return;
    var host; try { host = new URL(a.href).hostname; } catch (er) { return; }
    if (host === location.hostname) return;
    if (ORG_HOSTS.test(host)) cfcTrack("org_ride_click", { link_domain: host, link_url: a.href });
    else if (a.closest(".gr-btn, .ride-acts, [data-host-link]") || /\/rides\//.test(location.pathname)) cfcTrack("ride_host_click", { link_domain: host });
  }, true);

  if (emailForm && emailOk) emailForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = $("email");
    if (!f || !f.value || f.value.indexOf("@") < 1) { if (f) f.focus(); return; }
    var btn = emailForm.querySelector("button[type=submit]");
    btn.disabled = true;
    emailOk.hidden = true;
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(emailForm)).toString() })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        emailForm.reset();
        emailOk.textContent = "You’re on the list.";
        cfcTrack("sign_up", { method: "mile_updates" });
        emailOk.hidden = false;
        btn.disabled = false;
      })
      .catch(function () {
        btn.disabled = false;
        emailOk.textContent = "That didn’t send. Try again.";
        emailOk.hidden = false;
      });
  });

  /* —— 4. current section —— */
  var here = location.pathname;
  var SECTION = { "/find-a-ride/": /^\/(rides|tonight|find-a-ride)\//, "/field-notes/": /^\/(field-notes|guides|journal)\//, "/resources/": /^\/resources\//, "/events/2027/": /^\/events\//, "/towns/": /^\/towns\// };
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var rx = SECTION[a.getAttribute("href")];
    if (rx && rx.test(here)) a.setAttribute("aria-current", "page");
  });
})();
