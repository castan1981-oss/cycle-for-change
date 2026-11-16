/* Just ask (Nov 15, 2026): a question box on a town guide. It answers from the guide's own checked facts, which the
   build writes into the page (#askData: the places, their facts, the guide's questions). Nothing is sent anywhere:
   no request, no storage, no tracking of what was typed. The rules live in match() and are tested in
   tools/test/town-ask.test.js. A question with crisis words gets 988 and the Trevor Project first (CLAUDE.md §4). */
(function (root) {
  "use strict";
  var STOP = "a an and are at be before can do does for from get have how i in is it me my near of on or should the there this to what when where which who with you your any some good best after about off open".split(" ");
  // words every place on a cycling guide shares: they pick nothing (a "bike" in the question isn't a vote for "Bike Depot")
  var GENERIC = "bike bikes bicycle bicycles cycling cyclist cyclists ride rides riding town place places".split(" ");
  var INTENT = {
    coffee: /\b(coffee|cafe|café|espresso|latte|pastr\w*|caffeine)\b/,
    hotels: /\b(hotel|hotels|motel|inn|stay|staying|sleep|room|rooms|bed|lodging|book)\b/,
    "bike-shops": /\b(shop|shops|fix|fixed|repair|repairs|mechanic|tube|tubes|tire|tires|flat|derailleur|chain|brake|brakes|rent|rental|rentals|box|part|parts|tune)\b/,
    restaurants: /\b(eat|eating|food|dinner|lunch|breakfast|brunch|restaurant|restaurants|burrito|pizza|taco|tacos|hungry|meal)\b/,
    routes: /\b(ride|rides|riding|route|routes|climb|climbs|gravel|trail|trails|loop|path|miles|mtb|road)\b/,
    culture: /\b(to do|see|afternoon|bookstore|books|record|records|museum|gallery|bar|bars|market|music|off the bike)\b/,
    "bring-your-bike": /\b(fly|flying|airport|ship|shipping|bikeflights|bus|train|transit|parking|park|drive|car|(get|getting|bring|bringing) (my|a|the) bike)\b/
  };
  var CRISIS = /\b(suicid\w*|kill myself|end my life|want to die|self[- ]harm|hurt myself|overdos\w*)\b/;
  var EARLY = /\b(early|open|opens|before|morning|5|6|5am|6am|sunrise)\b/;
  var BIKE = /\b(bike|bikes|bicycle|bicycles|loaner|storage)\b/;

  function words(q) {
    return String(q || "").toLowerCase().replace(/[^a-z0-9é\s-]/g, " ").split(/\s+/).filter(function (w) { return w && STOP.indexOf(w) < 0 && GENERIC.indexOf(w) < 0; });
  }
  function hay(e) { return (e.n + " " + (e.l || "") + " " + (e.f || []).join(" ")).toLowerCase(); }

  /* match(data, question) → { crisis, faq, places[], segs[] }. Pure: same data and question, same answer.
     A question that names a kind of place (coffee, a room, a repair) only gets that kind, plus any place it names. */
  function match(data, question) {
    var q = String(question || "").toLowerCase();
    if (CRISIS.test(q)) return { crisis: true, faq: null, places: [], segs: [] };
    var town = words(data.town || ""), w = words(q).filter(function (x) { return town.indexOf(x) < 0; }), segs = [];
    Object.keys(INTENT).forEach(function (s) { if (INTENT[s].test(q)) segs.push(s); });
    // a question about a room, a café or a meal isn't a route question because it says "ride" or "bike"
    if (segs.length > 1 && segs.indexOf("routes") >= 0 && !/\b(route|routes|climb|climbs|gravel|trail|trails|loop|mtb)\b/.test(q)) segs.splice(segs.indexOf("routes"), 1);
    var scored = (data.places || []).map(function (e, i) {
      var h = hay(e), name = e.n.toLowerCase(), s = 0, named = false, inSeg = segs.indexOf(e.s) >= 0;
      if (inSeg) s += 3;
      w.forEach(function (x) { if (x.length > 2 && name.indexOf(x) >= 0) { s += 3; named = true; } else if (x.length > 3 && h.indexOf(x) >= 0) s += 1; });
      if (segs.length && !inSeg && !named) s = 0;
      if (s > 0 && EARLY.test(q) && e.h) s += 1;
      if (s > 0 && e.s === "hotels" && BIKE.test(q) && e.b) s += 2;
      return { e: e, s: s, i: i };
    }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s || a.i - b.i; });
    var faq = null, best = 1;
    (data.faq || []).forEach(function (f) {
      var fw = words(f.q), n = 0;
      w.forEach(function (x) { if (x.length > 2 && fw.indexOf(x) >= 0) n += 1; });
      if (n > best) { best = n; faq = f; }
    });
    return { crisis: false, faq: faq, places: scored.slice(0, 4).map(function (x) { return x.e; }), segs: segs };
  }

  if (typeof module !== "undefined" && module.exports) { module.exports = { match: match, words: words }; return; }

  var box = document.querySelector("[data-ask]"), src = document.getElementById("askData");
  if (!box || !src) return;
  var data; try { data = JSON.parse(src.textContent); } catch (e) { return; }
  var form = box.querySelector("form"), input = box.querySelector("input"), out = box.querySelector(".ask-out");
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var segOf = function (s) { for (var i = 0; i < data.pages.length; i++) if (data.pages[i].s === s) return data.pages[i]; return null; };

  function show(question) {
    var r = match(data, question), html = "";
    if (r.crisis) {
      html = '<p class="ask-a"><b>If you&rsquo;re thinking about hurting yourself, talk to someone now.</b></p>' +
        '<p class="ask-a">Call or text <a href="tel:988">988</a>, the Suicide &amp; Crisis Lifeline. LGBTQ young people can call the Trevor Project at <a href="tel:+18664887386">1-866-488-7386</a>.</p>';
    } else {
      if (r.faq) html += '<p class="ask-a">' + esc(r.faq.a) + "</p>";
      if (r.places.length) {
        html += '<ul class="rows ask-rows">' + r.places.map(function (e) {
          var p = segOf(e.s), facts = [e.h, e.b].filter(Boolean).map(esc).join(" &middot; ");
          return '<li><a href="' + esc(data.url + e.s + "/") + '"><span class="row-name">' + esc(e.n) + '</span><span class="row-meta">' + esc(p ? p.k : "") + (e.l ? " &middot; " + esc(e.l) : "") + (facts ? "<br>" + facts : "") + "</span></a></li>";
        }).join("") + "</ul>";
        var first = segOf(r.places[0].s);
        if (first) html += '<p class="town-more"><a href="' + esc(data.url + first.s + "/") + '">' + esc(first.b) + (first.c ? ", all " + first.c : "") + " &rarr;</a></p>";
      }
      var bare = r.segs.filter(function (sg) { var p = segOf(sg); return p && !r.places.some(function (e) { return e.s === sg; }); });
      if (bare.length) html += '<ul class="rows ask-rows">' + bare.map(function (sg) { var p = segOf(sg); return '<li><a href="' + esc(data.url + p.s + "/") + '"><span class="row-name">' + esc(p.b) + "</span></a></li>"; }).join("") + "</ul>";
      if (!r.faq && !r.places.length && !bare.length) {
        html = '<p class="ask-a">Nothing in this guide answers that yet. Here is what it does have.</p><ul class="rows ask-rows">' + data.pages.map(function (p) {
          return '<li><a href="' + esc(data.url + p.s + "/") + '"><span class="row-name">' + esc(p.b) + "</span></a></li>";
        }).join("") + "</ul>";
      }
    }
    out.innerHTML = html; out.hidden = false;
  }
  form.addEventListener("submit", function (ev) { ev.preventDefault(); if (input.value.trim()) show(input.value); });
  box.querySelectorAll("[data-q]").forEach(function (a) {
    a.addEventListener("click", function (ev) { ev.preventDefault(); input.value = a.getAttribute("data-q"); show(input.value); });
  });
})(this);
