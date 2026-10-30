/* /fruitloop/tally/ (Oct 30, 2026): Robert's count for the Fruit Loop RSVP. The key comes from the link's hash
   (#k=…) and is kept in this browser so the page opens again without it. */
(function () {
  "use strict";
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var $ = function (s) { return document.querySelector(s); };
  function get(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { if (v == null) window.localStorage.removeItem(k); else window.localStorage.setItem(k, v); } catch (e) {} }
  function day(iso) {
    var d = new Date(iso + "T12:00:00Z");
    return isNaN(d) ? iso : DAYS[d.getUTCDay()] + ", " + MONTHS[d.getUTCMonth()] + " " + d.getUTCDate();
  }
  function added(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    var p = new Date(d.getTime() - 7 * 36e5);   // Phoenix
    return MONTHS[p.getUTCMonth()] + " " + p.getUTCDate();
  }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function link(href, text) { var a = el("a", null, text); a.href = href; return a; }
  function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }

  var m = /[#&]k=([A-Za-z0-9_-]{16,200})/.exec(window.location.hash || "");
  var key = m ? m[1] : get("fl-tally-k");
  if (m) put("fl-tally-k", m[1]);
  var status = $("[data-status]"), last = null;

  function say(t) { if (status) status.textContent = t; }
  function lock() { $("[data-lock]").hidden = false; $("[data-body]").hidden = true; }

  function load() {
    if (!key) return lock();
    say("Loading…");
    fetch("/api/rsvp", { headers: { "X-Tally-Key": key }, cache: "no-store" })
      .then(function (r) {
        if (r.status === 403) { put("fl-tally-k", null); lock(); throw new Error("key"); }
        return r.json();
      })
      .then(function (t) {
        if (!t || !t.ok) throw new Error("bad");
        last = t;
        render(t);
        var now = new Date(Date.now() - 7 * 36e5);
        var hh = now.getUTCHours(), mm = ("0" + now.getUTCMinutes()).slice(-2);
        say("Updated " + ((hh % 12) || 12) + ":" + mm + (hh < 12 ? " am" : " pm") + ".");
      })
      .catch(function (e) { if (e && e.message !== "key") say("Couldn’t load. Pull down or tap Refresh."); });
  }

  function render(t) {
    $("[data-lock]").hidden = true;
    $("[data-body]").hidden = false;
    $("[data-next]").textContent = day(t.next);
    ["going", "maybe", "not"].forEach(function (a) { $("[data-n='" + a + "']").textContent = String(t.nextCounts[a] || 0); });

    var dl = $("[data-dates]");
    dl.textContent = "";
    var dates = (t.dates || []).slice().reverse();
    $("[data-dempty]").hidden = dates.length > 0;
    dates.forEach(function (x) {
      var li = el("li");
      li.appendChild(el("p", "fl-tally-who", day(x.d) + (x.d === t.next ? " (next)" : "")));
      li.appendChild(el("p", "fl-tally-meta", x.going + " coming, " + x.maybe + " maybe, " + x.not + " can’t make it"));
      dl.appendChild(li);
    });

    var cl = $("[data-contacts]"), cs = t.contacts || [];
    cl.textContent = "";
    $("[data-ccount]").textContent = cs.length ? "(" + cs.length + ")" : "";
    $("[data-cempty]").hidden = cs.length > 0;
    $("[data-cacts]").hidden = cs.length === 0;
    cs.forEach(function (c) {
      var li = el("li");
      li.appendChild(el("p", "fl-tally-who", c.name || "No name"));
      if (c.email) { var pe = el("p"); pe.appendChild(link("mailto:" + c.email, c.email)); li.appendChild(pe); }
      if (c.phone) { var pp = el("p"); pp.appendChild(link("tel:" + c.phone.replace(/[^0-9+]/g, ""), c.phone)); li.appendChild(pp); }
      li.appendChild(el("p", "fl-tally-meta", "Maybe for " + day(c.d) + ". Added " + added(c.t) + "."));
      var acts = el("div", "fl-tally-row-acts");
      if (c.phone) { var tx = link("sms:" + c.phone.replace(/[^0-9+]/g, ""), "Text"); tx.className = "btn btn--ghost btn--sm"; acts.appendChild(tx); }
      if (c.email) { var em = link("mailto:" + c.email, "Email"); em.className = "btn btn--ghost btn--sm"; acts.appendChild(em); }
      var rm = el("button", "btn btn--ghost btn--sm", "Remove");
      rm.type = "button";
      var armed = null;
      rm.addEventListener("click", function () {
        if (!armed) {
          rm.textContent = "Tap again to remove";
          armed = setTimeout(function () { armed = null; rm.textContent = "Remove"; }, 4000);
          return;
        }
        clearTimeout(armed);
        rm.disabled = true;
        fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json", "X-Tally-Key": key }, body: JSON.stringify({ op: "remove", id: c.id }) })
          .then(function (r) { return r.json(); })
          .then(function (r) { if (r && r.ok) { say((c.name || "That one") + " is off the list."); load(); } else { rm.disabled = false; say("Couldn’t remove. Try again."); } })
          .catch(function () { rm.disabled = false; say("Couldn’t remove. Try again."); });
      });
      acts.appendChild(rm);
      li.appendChild(acts);
      cl.appendChild(li);
    });
  }

  function copy(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { say(done); }, function () { say(text); });
    } else say(text);
  }
  $("[data-refresh]").addEventListener("click", load);
  $("[data-copy-link]").addEventListener("click", function () { copy("https://cycleforchange.org/rsvp", "Copied cycleforchange.org/rsvp."); });
  Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"), function (b) {
    b.addEventListener("click", function () {
      if (!last) return;
      var f = b.getAttribute("data-copy");
      var list = last.contacts.map(function (c) { return c[f]; }).filter(Boolean);
      if (!list.length) return say(f === "email" ? "No emails yet." : "No numbers yet.");
      copy(list.join(", "), "Copied " + plural(list.length, f === "email" ? "email" : "number", f === "email" ? "emails" : "numbers") + ".");
    });
  });
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible" && key) load(); });
  window.addEventListener("hashchange", function () {
    var h = /[#&]k=([A-Za-z0-9_-]{16,200})/.exec(window.location.hash || "");
    if (h) { key = h[1]; put("fl-tally-k", key); load(); }
  });
  load();
})();
