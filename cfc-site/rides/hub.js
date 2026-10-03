/* /rides/ hub — search first, results on demand.
   Pass 3 (Sept 28, 2026). The page ships no ride cards; this fetches /rides/index.json
   (written by tools/build-rides.js) the first time someone searches, and renders the same row
   the generator writes (card() in tools/build-rides.js — keep the two in step). Filter state
   lives in the URL (?q=, and the old ?bike=&for=&day=&pace=&saved=1) so a view can be shared.
   State, city and facet pages keep the full list in HTML, so nothing needs JS to reach.

   Pass 22 (Oct 2, 2026), after ten riders tried the box:
   - What a search means lives in /rides/rides.js (window.CFCFind, loaded from here): every word
     has to land somewhere — a place, who it's for, the bike, the pace, the day, a whole word of a
     name. "queer chicago", "dallas tuesday", "Londres", "Hackney", "E8" all find their rides now.
   - A town with its own page gives that page's rides (25 miles; 40 km outside the US) and says so,
     with "Narrow these →" (its /all/ page, the picks carried over) and its town guide.
   - The row matches the generator's: waits · pace · length · checked, and a distance only from the
     reader or the town they typed ("3 mi away"; km outside the US).
   - Nothing found is never a dead end: what didn't match, Near me, towns with a name like it,
     Outside the US, Every state. A zip code gets told plainly we can't read those yet. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var idxEl = $("gr-index"), q = $("gr-q");
  if (!idxEl || !q) return;
  var idx = JSON.parse(idxEl.textContent);
  var countryPath = {};
  (idx.countries || []).forEach(function (c) { countryPath[c[0]] = c[2]; });

  var form = $("gr-form"), geoBtn = $("gr-geo"), status = $("gr-status");
  var results = $("results"), grid = $("gr-results"), count = $("gr-count"), more = $("gr-show-more");
  var empty = $("gr-empty"), clearBtn = $("gr-clear"), jump = $("gr-jump");
  var head = results && results.querySelector(".gr-results-head");
  var DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  var RIDES = null, E = null, F = null, loading = null;
  var PAGE = 24, shown = PAGE;
  var origin = null, widened = false, RADIUS = 75;
  var f = { disc: [], tags: [], days: [], pace: "", saved: false };   // the old URL picks (?bike=&for=&day=&pace=&saved=)

  // the words live in /rides/rides.js; on /rides/ it finds no cards, so only that part runs
  function script(src) {
    return new Promise(function (ok, no) {
      if (window.CFCFind) return ok();
      var s = document.createElement("script"); s.src = src; s.onload = function () { window.CFCFind ? ok() : no(new Error("no CFCFind")); }; s.onerror = no;
      document.head.appendChild(s);
    });
  }
  function json(u) { return fetch(u).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); }
  function load() {
    if (E) return Promise.resolve();
    if (!loading) loading = Promise.all([script("/rides/rides.js"), json("/rides/index.json"), json("/rides/hubs.json").catch(function () { return []; })])
      .then(function (a) {
        F = window.CFCFind; RIDES = a[1];
        // hubs.json carries each city page's url and town guide (Pass 22); an older file is read from its key
        var hubs = (Array.isArray(a[2]) ? a[2] : []).map(function (h) {
          if (!h.url) h.url = h.state ? "/rides/" + h.state.toLowerCase() + "/" + h.key.slice(3) + "/" : (countryPath[h.country] || "/rides/world/") + h.key.slice(3) + "/";
          return h;
        });
        E = F.make({ cities: idx.cities, states: idx.states, countries: idx.countries || [], hubs: hubs });
      })
      .catch(function (e) { loading = null; throw e; });
    return loading;
  }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function todayKey() { return DAYS[new Date().getDay()]; }
  // a day, a list (sat,sun), or the words today / weekend / weekday
  function expandDay(day) {
    if (day === "today") return [todayKey()];
    if (day === "weekend") return ["sat", "sun"];
    if (day === "weekday") return ["mon", "tue", "wed", "thu", "fri"];
    return String(day || "").split(",").filter(function (d) { return DAYS.indexOf(d) > -1; });
  }
  function anyF() { return !!(f.disc.length || f.tags.length || f.days.length || f.pace || f.saved); }
  function any() { return !!(anyF() || q.value.trim() || origin); }
  function plural(n) { return n + " ride" + (n === 1 ? "" : "s"); }

  var WAIT = { waits: "Waits for you", regroups: "Pace groups", drops: "Drops" };
  /* Pass 6: the card carries its discipline's mark (cfc-site/rides/marks.svg); keep in step with tools/build-rides.js card() */
  var MARKS = { road: 1, gravel: 1, mtb: 1, fixed: 1, social: 1, cruiser: 1, bmx: 1, track: 1, cyclocross: 1, ebike: 1, mixed: 1 };
  function markOf(r) { var k = r.k === "open-streets" ? "open-streets" : (r.d && r.d[0]); return '<svg class="gr-mark" aria-hidden="true" focusable="false"><use href="/rides/marks.svg#m-' + (MARKS[k] || k === "open-streets" ? k : "mixed") + '"/></svg>'; }
  // Pass 22: the row — keep in step with card() in tools/build-rides.js (waits · pace · length · checked).
  // A distance only ever says how far the ride is from the reader or the town they searched.
  function card(r, d, km) {
    var meta = [
      d != null ? '<span class="gr-dist">' + F.away(d, km) + "</span>" : "",
      r.wt ? '<em class="gr-wait gr-wait--' + r.wt + '">' + WAIT[r.wt] + "</em>" : "",
      r.pc ? '<span class="gr-card-pc">' + esc(r.pc) + "</span>" : "",
      r.lg ? '<span class="gr-card-lg">' + esc(r.lg) + "</span>" : "",
      r.u ? '<span class="gr-card-warn">Unconfirmed</span>' : "",
      r.ck ? '<span class="gr-card-checked' + (r.cf ? " gr-card-checked--look" : "") + '">' + esc(r.ck) + "</span>" : "",
    ].join("");
    return '<div class="gr-card" data-slug="' + r.s + '">' + markOf(r) +
      '<a class="gr-card-name" href="/rides/' + r.s + '/">' + esc(r.n) + '<span class="visually-hidden">, ' + esc(r.dl) + "</span></a>" +
      (r.ne ? '<span class="gr-card-en">' + esc(r.ne) + "</span>" : "") +
      '<span class="gr-card-when">' + esc(r.w) + '<i class="gr-dot" aria-hidden="true"> · </i>' + esc(r.c + (r.h ? " · " + r.h : "")) + "</span>" +
      '<span class="gr-card-meta">' + meta + "</span>" +
      '<button type="button" class="gr-save" data-save="' + r.s + '" aria-pressed="false" aria-label="Save ' + esc(r.n) + '"><span aria-hidden="true">☆</span></button>' +
      "</div>";
  }
  // the old URL picks: disc and days are "any of", made-for is "all of"
  function passesF(r, saved) {
    if (f.disc.length && !f.disc.some(function (d) { return r.d.indexOf(d) > -1; })) return false;
    if (f.tags.length && !f.tags.every(function (t) { return r.t.indexOf(t) > -1; })) return false;
    if (f.days.length && !f.days.some(function (d) { return r.dy.indexOf(d) > -1; })) return false;
    if (f.pace && r.p.indexOf(f.pace) < 0) return false;
    if (f.saved && saved.indexOf(r.s) < 0) return false;
    return true;
  }
  var DAY_SAY = { mon: "Mondays", tue: "Tuesdays", wed: "Wednesdays", thu: "Thursdays", fri: "Fridays", sat: "Saturdays", sun: "Sundays" };
  function describeF() {
    var bits = [];
    if (f.disc.length) bits.push(f.disc.map(function (d) { return { mtb: "mountain bike", ebike: "e-bikes welcome" }[d] || d; }).join(" or "));
    if (f.pace) bits.push({ easy: "easy pace", steady: "steady pace", fast: "fast" }[f.pace]);
    if (f.tags.length) bits.push(f.tags.map(function (t) { return { lgbtq: "LGBTQ+", wtf: "women, trans, femme", bipoc: "BIPOC", beginner: "beginners", "no-drop": "no-drop", family: "family" }[t] || t; }).join(" · "));
    if (f.days.length) bits.push(DAYS.slice(1).concat("sun").filter(function (d) { return f.days.indexOf(d) > -1; }).map(function (d) { return DAY_SAY[d]; }).join(" or "));
    if (f.saved) bits.push("saved");
    return bits.join(" · ");
  }
  function syncUrl() {
    var p = new URLSearchParams();
    if (q.value.trim() && !origin) p.set("q", q.value.trim());
    if (f.disc.length) p.set("bike", f.disc.join(","));
    if (f.tags.length) p.set("for", f.tags.join(","));
    if (f.days.length) p.set("day", f.days.join(","));
    if (f.pace) p.set("pace", f.pace);
    if (f.saved) p.set("saved", "1");
    var s = p.toString();
    history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
  }
  // the line under the box is for screen readers once the results say the same thing on screen
  function tell(text, onScreen) { status.textContent = text; status.classList.toggle("visually-hidden", !onScreen); }

  // —— the links above the rows: the town's own page, its guide, the other towns with that name ——
  var links = document.createElement("div");
  links.className = "gr-links"; links.id = "gr-links"; links.hidden = true;
  if (head) head.insertAdjacentElement("afterend", links);
  var NEAR_BTN = '<button type="button" class="gr-chip gr-chip--mk" data-geo><svg class="gr-chip-mark" aria-hidden="true" focusable="false"><use href="/rides/marks.svg#m-locate"/></svg>Near me</button>';
  function townOf(h) { return h.city + (h.state ? ", " + h.state : ""); }
  function guideName(h) {
    var seg = String(h.guide).replace(/\/$/, "").split("/").pop();
    if (seg === F.norm(h.city).replace(/ /g, "-")) return h.city;
    return seg.split("-").map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(" ");
  }
  // "Narrow these →" opens the town's /all/ page with the picks that are tiles there; the rest ride along as words
  function narrowHref(P, h) {
    var p = new URLSearchParams(), days = [], tags = [], bikes = [], rest = [];
    P.facets.forEach(function (x) {
      var g = x.f.g;
      if (g === "day") days = days.concat(x.f.days());
      else if (x.f.tag) tags.push(x.f.tag);
      else if (x.f.disc) bikes.push(x.f.disc);
      else rest.push(x.ph);
    });
    P.words.forEach(function (w) { rest.push(w.w); });
    bikes = bikes.concat(f.disc); tags = tags.concat(f.tags); days = days.concat(f.days);
    if (f.pace) rest.push(f.pace);
    var u = function (l) { return l.filter(function (x, i) { return l.indexOf(x) === i; }); };
    if (rest.length) p.set("q", u(rest).join(" "));
    if (bikes.length) p.set("bike", u(bikes).join(","));
    if (tags.length) p.set("for", u(tags).join(","));
    if (days.length) p.set("day", u(days).join(","));
    var s = p.toString();
    return h.url + "all/" + (s ? "?" + s : "");
  }
  function placeLinks(P, S, none) {
    var out = [], h = S.hub, picks = P.facets.length || P.words.length || anyF();
    if (S.kind === "near") h = E.covering(S.center);   // the city page that covers the reader, if one does
    if (h) {
      if (none) out.push('<a href="' + esc(h.url) + '">Every ride in ' + esc(h.city) + " (" + h.rides + ") &rarr;</a>");
      else if (h.rides > 12 && S.kind === "city") out.push('<a href="' + esc(narrowHref(P, h)) + '">' + (picks ? "Narrow these" : "Narrow these by bike, rider and day") + " &rarr;</a>");
      else out.push('<a href="' + esc(h.url) + '">The ' + esc(h.city) + " page &rarr;</a>");
      if (h.guide) out.push('<a href="' + esc(h.guide) + '">' + esc(guideName(h)) + " town guide &rarr;</a>");
    } else if (S.kind === "state" && S.area) out.push('<a href="/rides/' + S.area.st.toLowerCase() + '/">The ' + esc(S.area.label) + " page &rarr;</a>");
    else if (S.kind === "country" && S.area && countryPath[S.area.cc]) out.push('<a href="' + esc(countryPath[S.area.cc]) + '">The ' + esc(S.area.label) + " page &rarr;</a>");
    var alts = P.alts.filter(function (a) { return a.type === "city"; }).slice(0, 2);
    alts.forEach(function (a) { out.push('<a href="' + esc(a.hub ? a.hub.url : "/rides/?q=" + encodeURIComponent(a.label)) + '">Or ' + esc(a.label) + " &rarr;</a>"); });
    return out;
  }

  // —— nothing found: what didn't match, and every way on ——
  function paintEmpty(P, S, code, canWiden) {
    var why, acts = [NEAR_BTN];
    if (code) {
      why = "<b>We can&rsquo;t look up " + (code === "zip" ? "zip codes" : "postcodes") + " yet.</b> Try your town or Near me.";
    } else {
      var fPre = [], fPost = [];
      if (f.tags.length || f.disc.length || f.pace) fPre.push(describeF().split(" · ").filter(function (b) { return !/day|saved/.test(b); }).join(" "));
      if (f.days.length) fPost.push("on " + DAYS.slice(1).concat("sun").filter(function (d) { return f.days.indexOf(d) > -1; }).map(function (d) { return DAY_SAY[d]; }).join(" or "));
      if (f.saved) fPost.push("in your saved list");
      why = "<b>" + esc(E.sentence(P, S, { pre: fPre, post: fPost })) + "</b>";
      // a word nothing we list carries anywhere (said only when the line above doesn't already say it)
      var gone = E.unknown(P, RIDES);
      if (gone.length && (P.places.length || P.facets.length || P.words.length > gone.length || anyF())) why += " Nothing we list says " + gone.map(function (w) { return "&ldquo;" + esc(w) + "&rdquo;"; }).join(" or ") + ".";
      if (canWiden) acts.push('<button type="button" class="gr-chip" data-widen>Show the closest rides anyway</button>');
      acts = acts.concat(placeLinks(P, S, true).map(function (a) { return a.replace("<a ", '<a class="gr-chip" '); }));
      // a word that looks like a town we list (a typo, half a name)
      if (!P.places.length && P.words.length) {
        var near = E.suggest(P.words.map(function (w) { return w.w; }), 3);
        if (near.length) why += " Did you mean " + near.map(function (c) { return esc(c.hub ? townOf(c.hub) : c.label); }).join(" or ") + "?";
        near.forEach(function (c) { acts.push('<a class="gr-chip" href="' + esc(c.hub ? c.hub.url : "/rides/?q=" + encodeURIComponent(c.label)) + '">' + esc(c.hub ? townOf(c.hub) : c.label) + " &rarr;</a>"); });
      }
    }
    acts.push('<a class="gr-chip" href="/rides/world/">Outside the US &rarr;</a>', '<a class="gr-chip" href="/rides/united-states/">Every state &rarr;</a>');
    empty.innerHTML = '<p class="gr-empty-why">' + why + '</p><p class="gr-empty-actions">' + acts.join(" ") +
      '</p><p class="gr-empty-add"><a href="/rides/add/">Add a ride we&rsquo;re missing</a></p>';
    if (window.CFCSave) window.CFCSave.paint(empty);
    return why.replace(/<[^>]+>/g, "").replace(/&rsquo;/g, "’").replace(/&ldquo;/g, "“").replace(/&rdquo;/g, "”");
  }

  // The jump bar: while the count line is below the fold.
  var jumpN = jump && jump.querySelector(".gr-jump-n"), nShown = 0, ticking = false;
  function paintJump() {
    if (!jump) return;
    var show = !results.hidden && nShown > 0 && (head || results).getBoundingClientRect().top > window.innerHeight - 40;
    if (show) jumpN.textContent = plural(nShown);
    jump.hidden = !show;
  }
  window.addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; paintJump(); });
  }, { passive: true });
  window.addEventListener("resize", paintJump);
  if (jump) jump.addEventListener("click", function (e) {
    e.preventDefault();
    results.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });

  function render(opts) {
    opts = opts || {};
    syncUrl();
    if (!any()) { results.hidden = true; tell("", false); nShown = 0; paintJump(); return; }
    results.hidden = false;
    if (!E) {
      count.textContent = "Loading rides…";
      load().then(function () { render(opts); }).catch(function () {
        count.textContent = "The ride list didn't load. Tap a state below instead.";
      });
      return;
    }
    var saved = window.CFCSave ? window.CFCSave.read() : [];
    var P = E.parse(origin ? "" : q.value, RIDES);
    var code = !origin && P.codes.length && !P.places.length ? P.codes[0].kind : null;
    var S = E.scope(P, RIDES, origin ? { origin: origin, radius: RADIUS } : {});
    var ok = function (x) { return !code && E.passes(P, x.r) && passesF(x.r, saved); };
    var list = S.pool.filter(ok), note = "";
    var canWiden = !!S.center && !widened && S.all.some(ok);
    if (!list.length && widened && S.center) {
      list = S.all.filter(ok).slice(0, 12);
      if (list.length) note = "widened";
    }
    var n = list.length, where = E.where(S), words = E.wordsText(P);
    var desc = (E.describe(P) + " · " + describeF()).split(" · ").filter(function (b, i, a) { return b && a.indexOf(b) === i; }).join(" · ");
    var said;
    if (n) {
      said = note ? "Nothing " + where + (words ? " " + words : "") + ", so here are the " + plural(n).replace(/ rides?$/, "") + " closest"
        : plural(n) + (where ? " " + where : "") + (words ? " " + words : "") + (S.center && n > 1 ? ", closest first" : "");
      said += desc ? " · " + desc : "";
      count.textContent = said;
      var ls = placeLinks(P, S);
      if (!S.center && !S.area && !P.places.length) ls.unshift('<span class="gr-links-hint">That&rsquo;s everywhere. Add a town, or</span> ' + NEAR_BTN);
      links.innerHTML = ls.join("");
      links.hidden = !ls.length;
      empty.hidden = true;
    } else {
      count.textContent = "";
      links.hidden = true;
      said = paintEmpty(P, S, code, canWiden);
      empty.hidden = false;
    }
    if (!opts.more) shown = PAGE;
    grid.innerHTML = list.slice(0, shown).map(function (x) { return card(x.r, S.center ? x.d : null, S.world || x.r.co !== "US"); }).join("");
    more.hidden = n <= shown;
    more.textContent = "Show " + Math.min(PAGE, n - shown) + " more";
    tell(said, false);
    nShown = n; paintJump();
    if (window.CFCSave) window.CFCSave.paint(grid);
    if (opts.scroll) results.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  // —— search ——
  var timer;
  q.addEventListener("input", function () { origin = null; widened = false; clearTimeout(timer); timer = setTimeout(render, 150); });
  if (form) form.addEventListener("submit", function (e) { e.preventDefault(); clearTimeout(timer); render({ scroll: true }); });
  function clearAll() { origin = null; widened = false; q.value = ""; f = { disc: [], tags: [], days: [], pace: "", saved: false }; render(); q.focus({ preventScroll: true }); }
  clearBtn.addEventListener("click", clearAll);
  more.addEventListener("click", function () { shown += PAGE; render({ more: true }); });
  document.addEventListener("cfc:saved", function () { if (f.saved) render({ more: true }); });
  function locate() {
    if (!navigator.geolocation) { tell("Your browser can't share location. Type a town instead.", true); return; }
    tell("Finding you…", true);
    navigator.geolocation.getCurrentPosition(function (pos) {
      origin = { lat: pos.coords.latitude, lng: pos.coords.longitude, label: "you" }; widened = false; q.value = "";
      render({ scroll: true });
    }, function () { tell("Couldn't get your location. Type a town instead.", true); }, { timeout: 8000, maximumAge: 600000 });
  }
  if (geoBtn) geoBtn.addEventListener("click", locate);
  // the buttons written into the results (Near me, Show the closest, Clear)
  results.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-geo],[data-widen],[data-clear]");
    if (!b) return;
    if (b.hasAttribute("data-geo")) locate();
    else if (b.hasAttribute("data-widen")) { widened = true; render(); }
    else clearAll();
  });

  // Pass 22: a rider from outside the US met a full US map first; a quiet way out sits by the box
  if (form && !document.querySelector(".gr-hero-alt")) {
    form.insertAdjacentHTML("afterend", '<p class="gr-hero-alt"><a href="/rides/world/"><svg class="gr-hero-alt-mk" aria-hidden="true" focusable="false"><use href="/rides/marks.svg#m-globe"/></svg>Outside the US &rarr;</a></p>');
  }
  // Pass 22: at 150% text the long placeholder clipped to "C"; it says less when the box is narrow (once rides.js is here)
  var PH = ["Town, country or ride", "Town or ride name", "Town or ride", "Search"];
  script("/rides/rides.js").then(function () { window.CFCFind.fitPlaceholder(q, PH); }).catch(function () {});

  // —— restore from the URL ——
  var p = new URLSearchParams(location.search);
  if (p.get("q")) q.value = p.get("q");
  f.disc = (p.get("bike") || "").split(",").filter(Boolean);
  f.tags = (p.get("for") || "").split(",").filter(Boolean);
  f.days = expandDay(p.get("day"));
  f.pace = p.get("pace") || "";
  f.saved = p.get("saved") === "1";
  render();
})();
