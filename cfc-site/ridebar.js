/* Cycle for Change — the "Ride with me" bar (Pass 36, Oct 6, 2026).
   Robert: "a thing as you scroll down every single page and the homepage above the fold that says ride
   with me and that essentially gets you to the next event that I'm doing."
   The markup comes from scripts/chrome.js (inside the footer, so every page has it). This script:
   1. picks the next ride from the bar's list by today's date in Phoenix, and points every
      [data-ride-next] link at it (so a page nobody rebuilt never sends people to a ride that's over);
   2. shows the bar once you scroll (on the homepage, once the first-screen "Ride with me" tile is gone),
      and tucks it away while the page's own "Ride with me" (the closing block, #ride, the footer) is in view;
   3. lets you hide it for the visit. */
(function () {
  "use strict";
  var bar = document.getElementById("rideBar");
  var rides = [];
  try { rides = JSON.parse(bar ? bar.getAttribute("data-rides") : "[]") || []; } catch (e) { rides = []; }
  var today;
  try { today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Phoenix" }).format(new Date()); }
  catch (e) { today = new Date().toISOString().slice(0, 10); }
  var next = null;
  for (var i = 0; i < rides.length; i++) { if (rides[i].until >= today) { next = rides[i]; break; } }
  if (bar && !rides.length) return;   // no list on this page: leave the links as built

  var href = next ? next.href : "/events/2027/riding/";
  // Oct 8, 2026: the next ride has its own page (/nov7/). On that page the links say where you are and the bar stays away.
  var here = location.pathname === href || location.pathname + "/" === href;
  document.querySelectorAll("[data-ride-next]").forEach(function (a) {
    a.setAttribute("href", href);
    if (here) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  var hero = document.getElementById("heroRide");
  if (hero) {
    hero.setAttribute("href", next && next.href === "/#ride" ? "#ride" : href);
    var hd = hero.querySelector(".ridebar-d"), hs = hero.querySelector(".finder-s");
    if (next) { if (hd) hd.textContent = next.date; if (hs) hs.textContent = next.name + ", " + next.where; }
    else { if (hd) hd.remove(); if (hs) hs.textContent = "The rides I\u2019m doing in 2027"; }
  }
  if (!bar) return;
  // never on the help pages: they keep the 988 bar at the foot of a phone, and nothing else
  if (!next || here || document.querySelector(".help-bar") || /^\/resources\//.test(location.pathname)) { bar.remove(); return; }
  if (bar.getAttribute("data-cur") !== next.until) {
    bar.querySelector(".ridebar-d").textContent = next.date;
    bar.querySelector(".ridebar-n").textContent = next.name + ", " + next.where;
  }
  var KEY = "cfc-ridebar-hidden";
  try { if (sessionStorage.getItem(KEY) === next.until) { bar.remove(); return; } } catch (e) {}

  bar.hidden = false;
  if (getComputedStyle(bar).position !== "fixed") { bar.hidden = true; return; }   // an old stylesheet in the cache

  var heroInView = !!hero, blockers = 0;
  function paint() {
    var on = (hero ? !heroInView : window.scrollY > 160) && blockers === 0;
    bar.classList.toggle("is-on", on);
  }
  if ("IntersectionObserver" in window) {
    if (hero) new IntersectionObserver(function (es) { heroInView = es[0].isIntersecting; paint(); }).observe(hero);
    var seen = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) seen.add(e.target); else seen.delete(e.target); });
      blockers = seen.size; paint();
    }, { rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".pledge, #ride, .site-foot > .wrap").forEach(function (el) { io.observe(el); });
  }
  window.addEventListener("scroll", paint, { passive: true });
  paint();

  bar.querySelector(".ridebar-x").addEventListener("click", function () {
    try { sessionStorage.setItem(KEY, next.until); } catch (e) {}
    bar.remove();
  });
  bar.querySelector(".ridebar-a").addEventListener("click", function () {
    if (typeof window.gtag === "function") window.gtag("event", "ride_bar_click", { ride: next.name });
  });
})();
