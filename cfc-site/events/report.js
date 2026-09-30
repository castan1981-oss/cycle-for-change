/* The `ride-report` form (scripts/blocks.js): add a ride or event, fix one, say it's gone.
   Posts to Netlify Forms like the footer signup. Says "Got it" only after Netlify
   takes it (fetch resolves on 4xx/5xx, so the status is checked). Hand-written;
   build-events.js keeps this file when it clears /events/. */
(function () {
  "use strict";
  var forms = document.querySelectorAll("form[data-report]");
  Array.prototype.forEach.call(forms, function (form) {
    var page = form.querySelector("[data-page]");
    if (page) page.value = location.pathname;
    var ok = form.querySelector(".ok");
    var btn = form.querySelector("button[type=submit]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var what = form.querySelector("[name=ride]");
      if (!what || !what.value.trim()) { if (what) what.focus(); return; }
      btn.disabled = true;
      if (ok) ok.hidden = true;
      fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() })
        .then(function (res) {
          if (!res.ok) throw new Error("bad status");
          var keep = what.defaultValue;
          form.reset();
          what.value = keep;
          if (page) page.value = location.pathname;
          var kind = form.querySelector("[name=kind]:checked");
          if (ok) { ok.textContent = kind && kind.value === "still-on" ? "Thanks for telling us it's still on." : "Got it. We check it against the source, then it goes up."; ok.hidden = false; }
          btn.disabled = false;
        })
        .catch(function () {
          btn.disabled = false;
          if (ok) { ok.textContent = "That didn't send. Try again in a minute."; ok.hidden = false; }
        });
    });
  });
})();
