/* /fruitloop/rsvp/ (Oct 30, 2026): one tap. Yes or no → counted → the ride page. Maybe → the keep-posted form → the
   ride page. A random id stays in this browser so a second tap changes the answer instead of adding one; nothing else
   about a yes or a no is sent. Without this script the page still works (plain form posts, see the page's note). */
(function () {
  "use strict";
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var HOUR = 36e5, DAY = 864e5;
  var FIRST = Date.UTC(2026, 11, 12, 1, 0);   // Fri, Dec 11, 2026, 6:00 pm Phoenix (UTC−7): same clock as fruitloop.js
  var RIDE = "/fruitloop/";
  function nextRide(now) {
    var roll = FIRST;
    while (roll + 2.75 * HOUR <= now) roll += 7 * DAY;
    var d = new Date(roll - 7 * HOUR);
    return { iso: d.toISOString().slice(0, 10), text: "Fri, " + MONTHS[d.getUTCMonth()] + " " + d.getUTCDate() };
  }
  function get(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  var next = nextRide(Date.now());
  each("[data-fl-next]", function (el) { el.textContent = next.text; });
  each("[data-fl-d]", function (el) { el.value = next.iso; });

  var id = get("fl-rsvp-id");
  if (!id || !/^[A-Za-z0-9_-]{8,64}$/.test(id)) {
    var abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_", out = "", bytes = new Uint8Array(20);
    if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(bytes);
    else for (var i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
    for (var j = 0; j < bytes.length; j++) out += abc.charAt(bytes[j] & 63);
    id = out;
    put("fl-rsvp-id", id);
  }

  /* —— a second visit: say what they said last time for this Friday —— */
  var SAID = { going: "You said you’re coming. Tap again to change it.", not: "You said you can’t make it. Tap again to change it.", maybe: "You asked me to keep you posted." };
  var said = null;
  try { said = JSON.parse(get("fl-rsvp") || "null"); } catch (e) {}
  var saidEl = document.querySelector("[data-fl-said]");
  if (saidEl && said && said.d === next.iso && SAID[said.a]) { saidEl.textContent = SAID[said.a]; saidEl.hidden = false; }

  function send(body) {
    body.id = id;
    body.d = next.iso;
    return fetch("/api/rsvp", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      credentials: "same-origin", keepalive: true
    }).then(function (r) {
      return r.json().catch(function () { return { ok: false }; });
    }, function () { return { ok: false, error: "network" }; });
  }
  function wait(ms) { return new Promise(function (res) { setTimeout(function () { res({ ok: false, error: "slow" }); }, ms); }); }
  function done(a) {
    put("fl-rsvp", JSON.stringify({ d: next.iso, a: a }));
    window.location.assign(RIDE);
  }

  /* —— yes / can't: count it, say so for a beat, go to the ride page (never stuck here if the network is slow) —— */
  var busy = false;
  each("[data-fl-pick] button[name='a']", function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (busy) return;
      busy = true;
      var a = btn.value;
      btn.setAttribute("aria-busy", "true");
      btn.textContent = a === "going" ? "See you there" : "Got it";
      Promise.race([send({ a: a }), wait(2500)]).then(function () {
        setTimeout(function () { done(a); }, 250);
      });
    });
  });

  /* —— maybe: open the form —— */
  var posted = document.querySelector("[data-fl-posted]");
  var form = document.querySelector("[data-fl-form]");
  var err = document.querySelector("[data-fl-err]");
  var MSG = {
    name: "Add your first name.",
    contact: "Add an email or a phone number. One is enough.",
    email: "That email doesn’t look right.",
    phone: "That phone number doesn’t look right.",
    other: "That didn’t go through. Try again, or DM @cycl_eforchange."
  };
  function open(focus) {
    if (!posted) return;
    posted.classList.add("is-open");
    if (posted.scrollIntoView) posted.scrollIntoView({ block: "start", behavior: "smooth" });
    if (focus) { var f = form && form.querySelector("#fl-name"); if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 300); }
  }
  function showErr(code) {
    if (!err) return;
    err.textContent = MSG[code] || MSG.other;
    err.hidden = false;
    var bad = { name: ["fl-name"], contact: ["fl-email", "fl-phone"], email: ["fl-email"], phone: ["fl-phone"] }[code] || [];
    each(".fl-rsvp-f .field", function (f) { f.setAttribute("aria-invalid", bad.indexOf(f.id) >= 0 ? "true" : "false"); });
    if (bad[0]) document.getElementById(bad[0]).focus();
  }
  var missing = (/[?&]missing=([a-z]+)/.exec(window.location.search) || [])[1];
  if (posted && (missing || window.location.hash === "#posted")) posted.classList.add("is-open");
  if (missing) showErr(missing);

  var maybe = document.querySelector("[data-fl-maybe]");
  if (maybe) maybe.addEventListener("click", function (e) { e.preventDefault(); open(true); });

  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (busy) return;
    var v = function (n) { return (form.elements[n] && form.elements[n].value || "").trim(); };
    var name = v("name"), email = v("email"), phone = v("phone");
    if (!name) return showErr("name");
    if (!email && !phone) return showErr("contact");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return showErr("email");
    if (phone && (phone.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 15)) return showErr("phone");
    busy = true;
    var btn = form.querySelector("button[type='submit']");
    btn.setAttribute("aria-busy", "true");
    btn.textContent = "Sending";
    send({ a: "maybe", name: name, email: email, phone: phone, website: v("website") }).then(function (r) {
      if (r && r.ok) { btn.textContent = "Got it"; setTimeout(function () { done("maybe"); }, 250); return; }
      busy = false;
      btn.removeAttribute("aria-busy");
      btn.textContent = "Keep me posted";
      showErr(r && r.error);
    });
  });
})();
