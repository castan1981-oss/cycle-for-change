/* Saved rides — one star per ride, per browser, no account (recovery.com's heart).
   Any [data-save="<slug>"] button toggles it. Stored under localStorage "cfc-week", the same
   list /tonight/ calls "My week", so a star here shows up there and the other way round.
   Loaded on every /rides/ page. hub.js re-renders cards and calls CFCSave.paint().

   Pass 22 (Oct 2, 2026): Jules saved a ride and had no idea where it went. Now the save says
   where: a labelled button (the ride page) reads "★ Saved" and a small separate link,
   "My week →" (/tonight/#weekSec), appears beside it once it's saved. A star on a card shows
   the same line for a few seconds at the foot of the screen. The toggle stays a button; the
   link is its own element. (The "★ Saved" chip this file used to promise never existed; the
   code for it is gone. hub.js still reads ?saved=1.) */
(function () {
  "use strict";
  var KEY = "cfc-week", WEEK = "/tonight/#weekSec";
  function read() { try { var v = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function write(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch (e) { return false; } }
  function has(slug) { return read().indexOf(slug) > -1; }
  function toggle(slug) {
    var list = read(), i = list.indexOf(slug);
    if (i > -1) list.splice(i, 1); else list.push(slug);
    write(list);
    return i < 0;
  }

  // styles live here so every page that loads the star gets them (tokens from /chrome.css)
  function css() {
    if (document.getElementById("cfc-save-css")) return;
    var s = document.createElement("style"); s.id = "cfc-save-css";
    s.textContent =
      ".cfc-week-link{display:inline-flex;align-items:center;min-height:44px;font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--creosote-ink);text-decoration:underline;text-underline-offset:4px}" +
      ".cfc-week-link[hidden]{display:none}" +
      ".cfc-week-link:focus-visible{outline:2px solid var(--asphalt);outline-offset:2px}" +
      ".cfc-save-toast{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:45;max-width:520px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:54px;padding:0 18px;background:var(--asphalt);color:var(--bone);font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase}" +
      ".cfc-save-toast[hidden]{display:none}" +
      ".cfc-save-toast a{color:var(--bone);display:inline-flex;align-items:center;min-height:44px;text-decoration:underline;text-underline-offset:4px}" +
      ".cfc-save-toast a:focus-visible{outline:2px solid var(--bone);outline-offset:2px}";
    document.head.appendChild(s);
  }
  // the link after a labelled save button (the ride page); icon-only stars on cards use the toast
  function linkFor(b) {
    if (!b.querySelector("[data-save-label]")) return null;
    var a = b.nextElementSibling;
    if (a && a.classList.contains("cfc-week-link")) return a;
    a = document.createElement("a");
    a.className = "cfc-week-link"; a.href = WEEK; a.hidden = true;
    a.textContent = "My week →";
    b.insertAdjacentElement("afterend", a);
    return a;
  }
  var toastEl = null, toastT = 0;
  function toast(b) {
    css();
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "cfc-save-toast"; toastEl.setAttribute("role", "status"); toastEl.hidden = true;
      toastEl.innerHTML = '<span>★ Saved</span><a href="' + WEEK + '">My week →</a>';
      document.body.appendChild(toastEl);
    }
    // sit above the "N rides · See them" bar when it's showing
    var jump = document.querySelector(".gr-jump");
    toastEl.style.bottom = jump && !jump.hidden && jump.offsetParent ? "calc(78px + env(safe-area-inset-bottom,0px))" : "";
    toastEl.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(function () { if (toastEl && !toastEl.contains(document.activeElement)) toastEl.hidden = true; }, 6000);
  }

  function paint(root) {
    var list = read();
    css();
    Array.prototype.forEach.call((root || document).querySelectorAll("[data-save]"), function (b) {
      var on = list.indexOf(b.getAttribute("data-save")) > -1;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      var icon = b.querySelector("[aria-hidden]"); if (icon) icon.textContent = on ? "★" : "☆";
      var label = b.querySelector("[data-save-label]"); if (label) label.textContent = on ? "Saved" : "Save";
      var a = linkFor(b); if (a) a.hidden = !on;
    });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-save]");
    if (!b) return;
    e.preventDefault();
    var on = toggle(b.getAttribute("data-save"));
    paint();
    if (on && !b.querySelector("[data-save-label]")) toast(b);
    else if (!on && toastEl) toastEl.hidden = true;
    document.dispatchEvent(new CustomEvent("cfc:saved"));
  });
  window.CFCSave = { read: read, has: has, toggle: toggle, paint: paint };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { paint(); });
  else paint();
})();
