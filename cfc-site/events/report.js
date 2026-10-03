/* The `ride-report` form (scripts/blocks.js): add a ride or event, fix one, say it's gone.
   Posts to Netlify Forms like the footer signup. Says "Got it" only after Netlify
   takes it (fetch resolves on 4xx/5xx, so the status is checked). Hand-written;
   build-events.js keeps this file when it clears /events/.

   Pass 22 (Oct 2, 2026): on a ride form, picking a kind reveals that kind's short fields
   ([data-show="new"] / [data-show="changed"]); the rest stay hidden and are left out of the
   post. Checkbox chips (days, for) go as one value ("mon, wed") — Netlify keeps only the
   last of a repeated name. "I run this ride" swaps the email hint. */
(function () {
  "use strict";
  var forms = document.querySelectorAll("form[data-report]");
  Array.prototype.forEach.call(forms, function (form) {
    var page = form.querySelector("[data-page]");
    if (page) page.value = location.pathname;
    var ok = form.querySelector(".ok");
    var btn = form.querySelector("button[type=submit]");
    var groups = form.querySelectorAll("[data-show]");
    var role = form.querySelector("[data-role]");
    var emailHint = form.querySelector("[data-hint-host]");
    var detailsHint = form.querySelector("[data-hint-new]");
    var emailText = emailHint ? emailHint.textContent : "";
    var detailsText = detailsHint ? detailsHint.textContent : "";

    function kind() { var k = form.querySelector("[name=kind]:checked"); return k ? k.value : ""; }
    function sync() {
      var k = kind();
      Array.prototype.forEach.call(groups, function (g) {
        var on = g.getAttribute("data-show") === k;
        g.hidden = !on;
        Array.prototype.forEach.call(g.querySelectorAll("input,select,textarea"), function (el) { el.disabled = !on; });
      });
      if (detailsHint) detailsHint.textContent = k === "new" && form.getAttribute("data-thing") === "ride" ? detailsHint.getAttribute("data-hint-new") : detailsText;
      if (emailHint) emailHint.textContent = role && role.checked ? emailHint.getAttribute("data-hint-host") : emailText;
    }
    form.addEventListener("change", function (e) {
      if (e.target.name === "kind" || e.target === role) sync();
    });
    sync();

    // the body: disabled (hidden) fields are already out of FormData; repeated chips become one value
    function body() {
      var fd = new FormData(form), out = new URLSearchParams(), multi = {};
      fd.forEach(function (v, k) {
        if (typeof v !== "string") return;
        if (k === "days" || k === "for") { (multi[k] = multi[k] || []).push(v); return; }
        out.append(k, v);
      });
      Object.keys(multi).forEach(function (k) { out.append(k, multi[k].join(", ")); });
      return out.toString();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var what = form.querySelector("[name=ride]");
      if (!what || !what.value.trim()) { if (what) what.focus(); return; }
      btn.disabled = true;
      if (ok) ok.hidden = true;
      var k = kind(), host = role && role.checked;
      var email = form.querySelector("[name=email]");
      var gaveEmail = email && email.value.trim();
      fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body() })
        .then(function (res) {
          if (!res.ok) throw new Error("bad status");
          var keep = what.defaultValue;
          form.reset();
          what.value = keep;
          if (page) page.value = location.pathname;
          sync();
          if (ok) {
            var first = "Got it. A person checks it, usually within a week.";
            ok.textContent = k === "still-on" ? "Thanks for telling us it's still on."
              : k === "new" ? first + (gaveEmail ? " We'll tell you when it's live." : " Leave your email and we'll tell you when it's live.")
              : host && gaveEmail ? first + " We'll reply to confirm it with you before the page changes."
              : first + (gaveEmail ? " We'll tell you when the page is fixed." : "");
            ok.hidden = false;
          }
          btn.disabled = false;
        })
        .catch(function () {
          btn.disabled = false;
          if (ok) { ok.textContent = "That didn't send. Try again in a minute."; ok.hidden = false; }
        });
    });
  });
})();
