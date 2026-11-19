/* /contact/ (Nov 19, 2026). The form works without this script (a plain post, then back here at #sent).
   With it: the message sends in place, the listing hint shows for that topic, and a link like
   /contact/?about=listing&page=/rides/<slug>/ arrives with the topic picked and the page noted.
   Nothing typed is tracked or stored in the browser. */
(function () {
  "use strict";
  var form = document.querySelector("[data-contact]");
  if (!form) return;
  var ok = document.getElementById("sent");
  var err = form.querySelector("[data-ct-err]");
  var hint = form.querySelector("[data-ct-listing]");
  var page = form.querySelector("[data-ct-page]");
  var btn = form.querySelector("button[type=submit]");
  var TOPICS = { "ride-with-me": 1, listing: 1, "host-or-org": 1, "press-brands": 1, hi: 1 };

  function showHint() {
    var t = form.querySelector("input[name=topic]:checked");
    if (hint) hint.hidden = !(t && t.value === "listing");
  }
  form.addEventListener("change", function (e) { if (e.target && e.target.name === "topic") showHint(); });

  try {
    var q = new URLSearchParams(location.search);
    var about = q.get("about");
    if (about && TOPICS[about]) {
      var r = form.querySelector('input[name=topic][value="' + about + '"]');
      if (r) r.checked = true;
    }
    var from = q.get("page") || "";
    if (page && /^\/[a-z0-9\/_-]{0,160}$/i.test(from)) page.value = from;
  } catch (_) {}
  showHint();

  function done() {
    if (!ok) return;
    ok.classList.add("is-on");
    ok.focus();
    ok.scrollIntoView({ block: "center" });
  }

  form.addEventListener("submit", function (e) {
    if (!window.fetch || !window.FormData || !window.URLSearchParams) return;
    e.preventDefault();
    if (btn.disabled) return;
    btn.disabled = true;
    if (err) err.hidden = true;
    var body = new URLSearchParams(new FormData(form)).toString();
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body })
      .then(function (res) { if (!res.ok) throw new Error(res.status); form.reset(); showHint(); done(); })
      .catch(function () { if (err) err.hidden = false; })
      .then(function () { btn.disabled = false; });
  });
})();
