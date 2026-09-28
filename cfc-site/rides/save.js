/* Saved rides — one star per ride, per browser, no account (recovery.com's heart).
   Any [data-save="<slug>"] button toggles it. Stored under localStorage "cfc-week", the same
   list /tonight/ calls "My week", so a star here shows up there and the other way round.
   Loaded on every /rides/ page. hub.js re-renders cards and calls CFCSave.paint().
   The /rides/ hub's "★ Saved" chip filters to this list. */
(function () {
  "use strict";
  var KEY = "cfc-week";
  function read() { try { var v = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function write(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch (e) { return false; } }
  function has(slug) { return read().indexOf(slug) > -1; }
  function toggle(slug) {
    var list = read(), i = list.indexOf(slug);
    if (i > -1) list.splice(i, 1); else list.push(slug);
    write(list);
    return i < 0;
  }
  function paint(root) {
    var list = read();
    Array.prototype.forEach.call((root || document).querySelectorAll("[data-save]"), function (b) {
      var on = list.indexOf(b.getAttribute("data-save")) > -1;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      var icon = b.querySelector("[aria-hidden]"); if (icon) icon.textContent = on ? "★" : "☆";
      var label = b.querySelector("[data-save-label]"); if (label) label.textContent = on ? "Saved" : "Save";
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-saved-count]"), function (el) {
      el.textContent = list.length ? "(" + list.length + ")" : "";
      var chip = el.closest("[data-filter=saved]");
      if (chip) chip.hidden = !list.length && chip.getAttribute("aria-pressed") !== "true";
    });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-save]");
    if (!b) return;
    e.preventDefault();
    toggle(b.getAttribute("data-save"));
    paint();
    document.dispatchEvent(new CustomEvent("cfc:saved"));
  });
  window.CFCSave = { read: read, has: has, toggle: toggle, paint: paint };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { paint(); });
  else paint();
})();
