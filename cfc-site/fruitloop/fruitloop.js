/* /fruitloop/ (Oct 23, 2026): the next ride's date, the loop drawing itself, one place at a time.
   Without this script the page still works: every place's story is in the list, in order. */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("fl-js");

  /* —— the next ride: the first Friday of the month, 6:00 pm in Phoenix (UTC−7 all year), from Dec 4, 2026 —— */
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var HOUR = 36e5, DAY = 864e5;
  function firstFriday(y, m) {
    var dow = new Date(Date.UTC(y, m, 1)).getUTCDay();
    return 1 + ((5 - dow + 7) % 7);
  }
  function nextRide(now) {
    var y = 2026, m = 11;   // December 2026: the first one
    for (var k = 0; k < 36; k++) {
      var d = firstFriday(y, m);
      var roll = Date.UTC(y, m, d, 18 + 7, 0);   // 6:00 pm Phoenix = 01:00 UTC the next day
      if (roll + 2.75 * HOUR > now) return { y: y, m: m, d: d, roll: roll };
      m += 1; if (m > 11) { m = 0; y += 1; }
    }
    return null;
  }
  var next = nextRide(Date.now());
  var nextEl = document.querySelector("[data-fl-next]"), countEl = document.querySelector("[data-fl-count]");
  if (next && nextEl) {
    nextEl.textContent = "Fri, " + MONTHS[next.m] + " " + next.d;
    if (countEl) {
      var today = Math.floor((Date.now() - 7 * HOUR) / DAY), rideDay = Math.floor(Date.UTC(next.y, next.m, next.d) / DAY);
      var n = rideDay - today;
      countEl.textContent = n <= 0 ? "Tonight." : n === 1 ? "Tomorrow night." : "In " + n + " days.";
      countEl.hidden = false;
    }
  }

  /* —— the loop draws itself once it's on screen (instantly under reduced motion: chrome.css's guard) —— */
  var map = document.querySelector(".fl-map");
  if (map) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { map.classList.add("is-drawn"); io.disconnect(); } });
      }, { threshold: 0.25 });
      io.observe(map);
    } else map.classList.add("is-drawn");
  }

  /* —— one place at a time: the numbers on the loop, previous and next —— */
  var list = document.querySelector("[data-fl-list]");
  if (!list) return;
  var items = Array.prototype.slice.call(list.querySelectorAll(".fl-stop"));
  var plates = Array.prototype.slice.call(document.querySelectorAll(".fl-plate"));
  var total = items.length, cur = 1;

  var step = document.createElement("div");
  step.className = "fl-step";
  var of = document.createElement("p"); of.className = "fl-step-of"; of.setAttribute("aria-live", "polite");
  var prev = document.createElement("button"); prev.type = "button"; prev.className = "btn btn--ghost btn--sm"; prev.textContent = "Previous";
  var nxt = document.createElement("button"); nxt.type = "button"; nxt.className = "btn btn--bone btn--sm"; nxt.textContent = "Next";
  step.appendChild(of); step.appendChild(prev); step.appendChild(nxt);
  list.parentNode.insertBefore(step, list.nextSibling);

  function show(n, from) {
    cur = Math.max(1, Math.min(total, n));
    items.forEach(function (li) { li.hidden = Number(li.getAttribute("data-stop")) !== cur; });
    plates.forEach(function (b) {
      var on = Number(b.getAttribute("data-stop")) === cur;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    of.textContent = cur + " of " + total;
    prev.disabled = cur === 1;
    nxt.textContent = cur === total ? "Back to the start" : "Next";
    if (from === "plate" && window.matchMedia("(max-width: 899px)").matches) {
      var target = items[cur - 1];
      if (target && target.scrollIntoView) target.scrollIntoView({ block: "nearest" });
    }
  }
  plates.forEach(function (b) {
    b.addEventListener("click", function () { show(Number(b.getAttribute("data-stop")), "plate"); });
  });
  prev.addEventListener("click", function () { show(cur - 1); });
  nxt.addEventListener("click", function () { show(cur === total ? 1 : cur + 1); });
  var m = /^#stop-(\d)$/.exec(location.hash || "");
  show(m ? Number(m[1]) : 1);
})();
