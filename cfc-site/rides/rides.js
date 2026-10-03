/* Group rides directory + hubs — search and filter over the cards already in the page.
   No fetch, no framework. Works without JS (every ride is in the HTML).
   Filter state lives in the URL (?q=&bike=&for=&day=) so a view can be shared.
   Oct 1, 2026: the filters are tiles (tools/build-rides.js filterPanel). Every tile says how
   many rides you'd get if you tapped it and goes quiet when that's none; the week is a bar
   strip you can tap more than one day on (day=sat,sun); the count of what's left sits big
   under the panel; and while the rides are out of sight a bar at the foot of the screen
   says how many and jumps to them.

   Pass 22 (Oct 2, 2026): ten riders tested the search box. It read the box as one literal string
   over the names: "queer chicago" found nothing, "fast" found breakfast rides, "tuesday" found 170
   rides starting in Anchorage, "Londres" and "85031" found nothing and said nothing useful. Now the
   box reads words, and every word has to land somewhere: a place (a town, state, country, region
   or neighbourhood, and a few other-language names), who it's for, the bike, the pace, the day or
   time, or a whole word of a ride's name or host. A town with its own page gives exactly that
   page's rides (25 miles; 40 km outside the US), so "dallas tuesday" is the Dallas Tuesday page.
   The words live in the first half of this file as window.CFCFind; /rides/hub.js loads this file
   for them on /rides/ (which has no cards, so the second half does nothing there). */

/* ———— CFCFind: what a search means ———— */
(function () {
  "use strict";
  if (window.CFCFind) return;
  var DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var DAY_SAY = { mon: "Mondays", tue: "Tuesdays", wed: "Wednesdays", thu: "Thursdays", fri: "Fridays", sat: "Saturdays", sun: "Sundays" };
  var KM = 1.609344;
  var CITY_MI = 25, WORLD_KM = 40;   // a city page's reach: METRO_RADIUS and WORLD_RADIUS_KM in tools/build-rides.js

  function fold(s) { s = String(s == null ? "" : s); return s.normalize ? s.normalize("NFD").replace(/[̀-ͯ]/g, "") : s; }
  // "St. Louis" → "st louis", "Coeur d'Alene" → "coeur dalene", "LGBTQ+" → "lgbtq", "e-bike" → "e bike"
  function norm(s) { return fold(s).toLowerCase().replace(/[’'.+]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
  function miles(a, b) {
    var R = 3958.8, r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  // "3 mi away" — a distance only ever says where a ride is from the reader or the place they searched
  function away(d, km) { var v = km ? d * KM : d; return (v < 1 ? "Under 1" : Math.round(v)) + (km ? " km" : " mi") + " away"; }
  function has(l, v) { return !!l && l.indexOf(v) > -1; }
  function set(s) { var o = {}; s.split(" ").forEach(function (w) { if (w) o[w] = 1; }); return o; }
  function dayKey(plus) { return DAYS[(new Date().getDay() + (plus || 0)) % 7]; }
  // the start hour off the row's "when" ("Every Tuesday, 6:30 pm" → 18.5); null when it isn't posted
  function hourOf(r) {
    var w = String(r.w || ""), m = /(\d{1,2})(?::(\d\d))?\s*([ap])\.?\s?m\b/i.exec(w);
    if (m) return (+m[1] % 12) + (m[3].toLowerCase() === "p" ? 12 : 0) + (+m[2] || 0) / 60;
    return /\bnoon\b/i.test(w) ? 12 : null;
  }
  function nameHas(r, list) {
    if (r._nm == null) r._nm = " " + norm((r.n || "") + " " + (r.ne || "")) + " ";
    for (var i = 0; i < list.length; i++) if (r._nm.indexOf(" " + list[i] + " ") > -1) return true;
    return false;
  }

  // —— the words a search can carry. g = its group: one group's words are "any of" (road or gravel,
  // Tuesday or Thursday), different groups all have to hold (queer + beginner). pre/post say it in a
  // sentence ("No fast gravel rides on Tuesdays …"), say says it on the count line.
  var FACET = {};
  function fac(words, f) { words.split("|").forEach(function (w) { FACET[w] = f; }); }
  function tag(t, pre, say) { return { g: "tag:" + t, o: 2, tag: t, pre: pre, say: say || pre, test: function (r) { return has(r.t, t); } }; }
  function disc(d, pre, say) { return { g: "disc", o: 4, disc: d, pre: pre, say: say || pre, test: function (r) { return has(r.d, d); } }; }
  function pace(p, pre, say) { return { g: "pace", o: 1, pre: pre, say: say || pre, test: function (r) { return has(r.p, p); } }; }
  function days(list, say, post) {
    var fn = typeof list === "function" ? list : function () { return list; };
    return { g: "day", days: fn, say: say, post: post || "on " + say,
      test: function (r) { var l = fn(); for (var i = 0; i < l.length; i++) if (has(r.dy, l[i])) return true; return false; } };
  }
  function hours(lo, hi, say, post, names) {
    return { g: "time", say: say, post: post, test: function (r) { var h = hourOf(r); return h == null ? nameHas(r, names) : h >= lo && h < hi; } };
  }
  fac("lgbtq|lgbt|lgbtqia|lgbtqi|lgbtqiap|glbt|2slgbtq|2slgbtqi|2slgbtqia|queer|queers|gay|gays|lesbian|lesbians|bisexual|pride", tag("lgbtq", "LGBTQ+"));
  fac("trans|transgender|trans riders|trans folks", { g: "tag:trans", o: 2, pre: "trans-inclusive", say: "trans-inclusive", test: function (r) { return has(r.t, "lgbtq") || has(r.t, "wtf"); } });
  fac("women|woman|womens|womxn|wxmn|womyn|ladies|lady|femme|femmes|wtf|wtnb|wtnbf|ftw|nonbinary|non binary|enby|enbies|girls|female", tag("wtf", "women, trans and femme", "women, trans, femme"));
  fac("bipoc|poc|people of color|people of colour", tag("bipoc", "BIPOC"));
  fac("black|black riders|latino|latina|latinx|latine|latinos|latinas|asian|indigenous|native", tag("bipoc", "BIPOC"));
  var newbie = function (r) { return has(r.t, "beginner") || has(r.p, "easy"); };
  fac("beginner|beginners|newbie|newbies|novice|novices|new|new rider|new riders|first timer|first timers|first time|first ride|intro|introductory|starter|learn|learning",
    { g: "tag:beginner", o: 2, pre: "beginner-friendly", say: "beginners", test: newbie });
  fac("easy|easier|easy pace|easygoing|easy going", { g: "tag:beginner", o: 2, pre: "easy", say: "easy", test: newbie });
  fac("casual|chill|chilled|mellow|slow|slower|leisurely|leisure|relaxed|cruisy|party pace|social pace|conversational|no stress|gentle", pace("easy", "easy", "easy pace"));
  fac("steady|moderate|intermediate|medium|tempo|mid pace", pace("steady", "steady-pace", "steady pace"));
  fac("fast|faster|fastest|hammer|hammerfest|race|races|racing|racer|racers|race pace|spicy|hard|harder|quick|speedy|advanced|competitive|drop ride|chaingang|chain gang|paceline|pace line|smash",
    pace("fast", "fast"));
  fac("no drop|nodrop|no drops|no dropping|waits for you|wait for you|we wait|nobody dropped|no rider left behind", tag("no-drop", "no-drop"));
  fac("family|families|kids|kid|children|child|kid friendly|family friendly|toddler|toddlers", tag("family", "family-friendly", "family"));
  fac("youth|teen|teens|teenager|teenagers|junior|juniors", tag("youth", "youth"));
  fac("adaptive|handcycle|handcycles|hand cycle|para cycling|paracycling|disabled|disability|accessible", tag("adaptive", "adaptive"));
  fac("ebike|ebikes|e bike|e bikes|ebiking|electric|electric bike|electric bikes|pedal assist|pedelec", disc("ebike", "e-bike-friendly", "e-bikes welcome"));
  fac("road|roads|roadie|roadies|road bike|road bikes|road ride|road rides|road riding|road cycling", disc("road", "road"));
  fac("gravel|gravel bike|gravel bikes|gravel ride|gravel rides|gravel riding|grinder", disc("gravel", "gravel"));
  fac("mtb|mountain bike|mountain bikes|mountain biking|mountain biker|mountain bikers|singletrack|single track", disc("mtb", "mountain bike"));
  fac("social|socials|social ride|social rides", disc("social", "social"));
  fac("cruiser|cruisers|beach cruiser|beach cruisers", disc("cruiser", "cruiser"));
  fac("fixed|fixie|fixies|fixed gear|fixed gears|fixedgear", disc("fixed", "fixed-gear", "fixed gear"));
  fac("bmx", disc("bmx", "BMX"));
  fac("track|velodrome|track cycling", disc("track", "track"));
  fac("cyclocross|cx|cyclo cross", disc("cyclocross", "cyclocross"));
  fac("open streets|open street|ciclovia|ciclovias|car free|carfree|car free day|paseo dominical",
    { g: "kind", o: 3, pre: "open-streets", say: "open streets", test: function (r) { return r.k === "open-streets"; } });
  var DAYW = {
    mon: "monday|mondays|mon|lunes|lundi|montag|lunedi", tue: "tuesday|tuesdays|tue|tues|martes|mardi|dienstag|martedi",
    wed: "wednesday|wednesdays|wed|weds|miercoles|mercredi|mittwoch|mercoledi", thu: "thursday|thursdays|thu|thur|thurs|jueves|jeudi|donnerstag|giovedi",
    fri: "friday|fridays|fri|viernes|vendredi|freitag|venerdi", sat: "saturday|saturdays|sat|sats|sabado|samedi|samstag|sabato",
    sun: "sunday|sundays|sun|domingo|dimanche|sonntag|domenica",
  };
  Object.keys(DAYW).forEach(function (d) { fac(DAYW[d], days([d], DAY_SAY[d])); });
  fac("weekend|weekends|this weekend|saturday and sunday|sat and sun", days(["sat", "sun"], "weekends"));
  fac("weekday|weekdays|weeknight|weeknights|during the week|midweek|mid week", days(["mon", "tue", "wed", "thu", "fri"], "weekdays"));
  fac("today|tonight|this evening|this morning", days(function () { return [dayKey(0)]; }, "today", "today"));
  fac("tomorrow|tomorrow night|tomorrow morning", days(function () { return [dayKey(1)]; }, "tomorrow", "tomorrow"));
  fac("morning|mornings|am|early|early morning|dawn|sunrise|before work", hours(0, 12, "mornings", "in the morning", ["morning", "mornings", "dawn", "sunrise", "early"]));
  fac("lunch|lunchtime|noon|midday|lunch ride", hours(11, 14, "around noon", "around noon", ["lunch", "noon", "midday"]));
  fac("afternoon|afternoons", hours(12, 17, "afternoons", "in the afternoon", ["afternoon"]));
  fac("evening|evenings|night|nights|pm|after work|sunset|nighttime|night ride|night rides|twilight", hours(16, 24, "evenings", "in the evening", ["evening", "night", "sunset", "twilight"]));

  // words that only hold a sentence together; two-letter ones that are also a state or country code
  // count as the code only when typed in capitals or alone ("AZ", "fast az"), never "in", "or", "me"
  var STOP = set("a an the and or in at on of for to from near nearby around by with my me i im we us our you your ride rides riding rider riders group groups cycling cyclist cyclists bike bikes biking bicycle bicycles cycle club clubs find show any all area local best good some looking want what where when which who is are there this that these those please weekly every each list");
  var STOP2 = set("in or me hi ok oh de la al pa ma mo id ne co us at it is be no by to so do go my an as if on up we he el es se un il le du da di");

  // other names for places we list, and the London boroughs with no ride of their own (they get London's)
  var ALIAS = {
    "londres": "london", "londra": "london", "londen": "london",
    "munchen": "munich", "muenchen": "munich", "munique": "munich", "monaco di baviera": "munich",
    "ciudad de mexico": "mexico city", "cdmx": "mexico city", "mexico df": "mexico city", "cidade do mexico": "mexico city",
    "koeln": "koln", "cologne": "koln", "wien": "vienna", "viena": "vienna", "vienne": "vienna", "zuerich": "zurich", "zurigo": "zurich",
    "tokio": "tokyo", "hamburgo": "hamburg", "francfort": "frankfurt", "frankfurt am main": "frankfurt", "berlino": "berlin",
    "sidney": "sydney", "singapur": "singapore", "abu dabi": "abu dhabi", "abou dabi": "abu dhabi", "ciudad de panama": "panama city",
    "ciudad del cabo": "cape town", "kapstadt": "cape town", "dublino": "dublin", "barcelone": "barcelona",
    "mallorca": "palma", "majorca": "palma", "palma de mallorca": "palma",
    "nueva york": "new york", "nyc": "new york", "new york city": "new york", "sf": "san francisco", "san fran": "san francisco",
    "philly": "philadelphia", "vegas": "las vegas", "nola": "new orleans", "slc": "salt lake city", "okc": "oklahoma city",
    "phx": "phoenix", "pdx": "portland or", "atx": "austin", "dfw": "dallas", "htx": "houston", "chi town": "chicago", "chitown": "chicago",
    "saint": "st", "st paul": "minneapolis", "twin cities": "minneapolis", "hackney wick": "london", "london fields": "london",
    "inglaterra": "england", "angleterre": "england", "reino unido": "united kingdom", "royaume uni": "united kingdom",
    "alemania": "germany", "allemagne": "germany", "germania": "germany", "estados unidos": "united states", "eeuu": "united states",
    "etats unis": "united states", "japon": "japan", "giappone": "japan", "irlanda": "ireland", "irlande": "ireland",
    "espagne": "spain", "spagna": "spain", "spanien": "spain", "mexique": "mexico", "messico": "mexico", "mexiko": "mexico",
    "autriche": "austria", "suiza": "switzerland", "sudafrica": "south africa", "afrique du sud": "south africa",
    "nueva zelanda": "new zealand", "kanada": "canada", "australie": "australia", "colombie": "colombia", "ruanda": "rwanda",
    "hackney": "london", "shoreditch": "london", "hoxton": "london", "dalston": "london", "stoke newington": "london",
    "brixton": "london", "peckham": "london", "camden": "london", "camden town": "london", "bethnal green": "london",
    "whitechapel": "london", "clapham": "london", "battersea": "london", "lambeth": "london", "hammersmith": "london",
    "fulham": "london", "wandsworth": "london", "walthamstow": "london", "tottenham": "london", "lewisham": "london",
    "hampstead": "london", "soho": "london", "notting hill": "london", "bermondsey": "london", "tower hamlets": "london",
    "haringey": "london", "canary wharf": "london", "deptford": "london", "streatham": "london", "balham": "london", "tooting": "london",
  };
  var ALIAS_KEYS = Object.keys(ALIAS).sort(function (a, b) { return b.length - a.length; });
  var WHOLE = { la: "los angeles", "l a": "los angeles", kc: "kansas city mo", dc: "washington dc" };   // only when it's the whole search
  // London's own postcode districts (E8, N16, SW11, WC1) are London; other codes we can't place yet
  var LONDON_POST = /^(e|ec|n|nw|se|sw|w|wc)\d{1,2}[a-z]?$/;
  var ZIP = /^\d{5}(\d{4})?$/;
  // a UK or Canadian postcode, or half of one: E8, N16, SW1A, 1AB, M5V, 2T6
  function isPost(t) { return /^[a-z]{1,2}\d[a-z\d]?$/.test(t) || /^\d[a-z]{2}$/.test(t) || /^[a-z]\d[a-z]$/.test(t) || /^\d[a-z]\d$/.test(t); }
  // edits between two words, a swapped pair counting as one ("tuscon", "bosie"); stops early past cap
  function lev(a, b, cap) {
    if (Math.abs(a.length - b.length) > cap) return cap + 1;
    var pp = null, prev = [], cur, i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i]; var lo = i;
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (pp && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) cur[j] = Math.min(cur[j], pp[j - 2] + 1);
        if (cur[j] < lo) lo = cur[j];
      }
      if (lo > cap) return cap + 1;
      pp = prev; prev = cur;
    }
    return prev[b.length];
  }

  // ctx: { cities: [[label, lat, lng, keys]], states: [[abbr, name]], countries: [[cc, name, path, keys]],
  //        hubs: /rides/hubs.json (optional: the city pages, so a town search is its page's list) }
  function make(ctx) {
    ctx = ctx || {};
    var PL = {}, stateName = {}, ccName = {}, ccOf = {}, CC2 = {}, hubs = ctx.hubs || [], cities = [];
    function add(k, v) { if (!k) return; var l = PL[k] || (PL[k] = []); if (l.indexOf(v) < 0) l.push(v); }
    (ctx.states || []).forEach(function (s) { stateName[s[0]] = s[1]; add(norm(s[1]), { type: "state", st: s[0], label: s[1] }); });
    (ctx.countries || []).forEach(function (c) {
      ccName[c[0]] = c[1]; ccOf[c[1]] = c[0];
      var v = { type: "country", cc: c[0], label: c[1], path: c[2] };
      [c[1]].concat(c[3] || []).forEach(function (k) { k = norm(k); if (k.length > 2) add(k, v); else if (k.length === 2) CC2[k] = v; });
    });
    function hubOf(c) {
      for (var i = 0; i < hubs.length; i++) { var h = hubs[i]; if (norm(h.city) === norm(c.city) && (c.st ? h.state === c.st : !h.state && h.country === c.cc)) return h; }
      return null;
    }
    (ctx.cities || []).forEach(function (c) {
      var parts = String(c[0]).split(", "), tail = parts.slice(1).join(", ");
      var o = { type: "city", label: c[0], city: parts[0], lat: c[1], lng: c[2] };
      if (stateName[tail]) { o.st = tail; o.cc = "US"; } else o.cc = ccOf[tail] || "";
      o.hub = hubOf(o);
      cities.push(o);
      (c[3] && c[3].length ? c[3] : [c[0]]).forEach(function (k) { add(norm(k), o); });
    });
    hubs.forEach(function (h) {   // a city page named for a town with no ride of its own (Charleston, SC)
      if (cities.some(function (c) { return c.hub === h; })) return;
      var o = { type: "city", label: h.city + ", " + (h.state || ccName[h.country] || h.country), city: h.city, lat: h.lat, lng: h.lng, st: h.state || null, cc: h.state ? "US" : h.country, hub: h };
      cities.push(o);
      [h.city, h.city + " " + (h.state || h.country), h.city + " " + (h.state ? stateName[h.state] : ccName[h.country])].forEach(function (k) { add(norm(k), o); });
    });

    function wordsOf(r) {
      if (!r._ws) r._ws = norm([r.n, r.ne, r.ho, r.h, r.c, r.pl, r.rg, stateName[r.st], ccName[r.co]].join(" ")).split(" ");
      return r._ws;
    }
    function wordHit(r, t) {
      var ws = wordsOf(r), w = t.w;
      if (t.phrase) { if (r._wj == null) r._wj = " " + ws.join(" ") + " "; return r._wj.indexOf(" " + w + " ") > -1; }
      for (var i = 0; i < ws.length; i++) {
        var x = ws[i];
        if (x === w || x === w + "s" || w === x + "s" || x === w + "es" || (t.last && w.length > 1 && x.indexOf(w) === 0)) return true;
      }
      return false;
    }
    // every word we list, and the neighbourhoods as phrases ("richmond park" is a park, not Richmond, VA)
    function lexicon(rides) {
      if (!rides) return { w: {}, ph: {} };
      if (!rides._lex) {
        var o = {}, ph = {};
        rides.forEach(function (r) {
          wordsOf(r).forEach(function (w) { o[w] = 1; });
          String(r.h || "").split(/[,;/()·]| and | to | from /).forEach(function (s) { s = norm(s); if (s.indexOf(" ") > 0) ph[s] = 1; });
        });
        rides._lex = { w: o, ph: ph };
      }
      return rides._lex;
    }
    function weight(c, rides) {
      if (c.hub) return 100000 + c.hub.rides;
      var n = 0; if (rides) rides.forEach(function (r) { if (r.pl === c.label) n++; });
      return n;
    }
    // one phrase, more than one place: Portland (OR, ME), New York (the city, the state)
    var PREFER_STATE = { washington: 1 };
    function pick(ph, list, P, rides) {
      var cs = list.filter(function (x) { return x.type === "city"; }), ss = list.filter(function (x) { return x.type === "state"; });
      var xs = list.filter(function (x) { return x.type === "country"; });
      if (ss.length && (PREFER_STATE[ph] || !cs.length)) { P.alts = P.alts.concat(cs.slice(0, 3)); return ss[0]; }
      if (cs.length) {
        cs = cs.map(function (c) { return { c: c, w: weight(c, rides) }; }).sort(function (a, b) { return b.w - a.w; }).map(function (x) { return x.c; });
        P.alts = P.alts.concat(cs.slice(1, 4), ss);
        return cs[0];
      }
      return xs[0];
    }

    function parse(raw, rides) {
      var P = { raw: String(raw == null ? "" : raw).trim(), places: [], facets: [], words: [], codes: [], alts: [], groups: {} };
      var q = norm(P.raw);
      if (!q) return P;
      if (WHOLE[q]) q = WHOLE[q];
      q = " " + q + " ";
      ALIAS_KEYS.forEach(function (k) { if (q.indexOf(" " + k + " ") > -1) q = q.split(" " + k + " ").join(" " + ALIAS[k] + " "); });
      var toks = q.trim().split(/\s+/), n = toks.length, open = !/\s$/.test(String(raw)), lex = lexicon(rides);
      var caps = P.raw !== P.raw.toUpperCase();
      for (var i = 0; i < n;) {
        var took = 0;
        for (var len = Math.min(6, n - i); len >= 1; len--) {
          var ph = toks.slice(i, i + len).join(" ");
          // a second town that's also a word we read ("phoenix sunrise") is the word
          if (PL[ph] && !(FACET[ph] && P.places.length)) { var pl = pick(ph, PL[ph], P, rides); if (P.places.indexOf(pl) < 0) P.places.push(pl); took = len; break; }
          if (FACET[ph]) { P.facets.push({ f: FACET[ph], ph: ph }); took = len; break; }
          if (len > 1 && lex.ph[ph]) { P.words.push({ w: ph, phrase: true }); took = len; break; }
        }
        if (took) { i += took; continue; }
        var t = toks[i], T = t.toUpperCase();
        i++;
        if (t.length === 2 && (n === 1 || !STOP2[t] || (caps && new RegExp("(^|[^A-Za-z])" + T + "([^A-Za-z]|$)").test(P.raw)))) {
          if (stateName[T]) { P.places.push({ type: "state", st: T, label: stateName[T] }); continue; }
          if (CC2[t]) { P.places.push(CC2[t]); continue; }
        }
        if (STOP[t] || STOP2[t]) continue;
        if (lex.w[t]) { P.words.push({ w: t }); continue; }   // a whole word we list ("taco") never grows into another ("tacoma")
        if (LONDON_POST.test(t) && PL.london) { var ln = pick("london", PL.london, P, rides); if (P.places.indexOf(ln) < 0) P.places.push(ln); continue; }
        if (ZIP.test(t)) { P.codes.push({ t: t, kind: "zip" }); continue; }
        if (/^\d{3,}$/.test(t) || isPost(t)) { P.codes.push({ t: t, kind: "post" }); continue; }
        P.words.push({ w: t, last: i === n && open });
      }
      P.facets.forEach(function (x) { (P.groups[x.f.g] = P.groups[x.f.g] || []).push(x.f); });
      return P;
    }
    function blank(P) { return !P.places.length && !P.facets.length && !P.words.length; }

    function inPlace(p, r) {
      if (p.type === "state") return r.st === p.st;
      if (p.type === "country") return r.co === p.cc;
      if (p.type === "city") {
        var c = p.hub ? { lat: p.hub.lat, lng: p.hub.lng } : p;
        return (p.st ? r.st === p.st : r.co === p.cc) && miles(c, { lat: r.la, lng: r.ln }) <= (p.st ? CITY_MI : WORLD_KM / KM);
      }
      return true;
    }
    // where we're looking, before any other word: near the reader, a city (its page's reach), a state or country
    function scope(P, rides, opts) {
      opts = opts || {};
      var S = { kind: "all", center: null, R: null, world: false, label: "", area: null, hub: null };
      var city = null, rest = [];
      P.places.forEach(function (p) { if (p.type === "city" && !city && !opts.origin) city = p; else rest.push(p); });
      if (opts.origin) { S.kind = "near"; S.center = opts.origin; S.R = opts.radius || 75; S.label = opts.origin.label || "you"; }
      else if (city) {
        S.kind = "city"; S.city = city; S.hub = city.hub || null; S.world = !city.st; S.label = city.label;
        S.center = S.hub ? { lat: S.hub.lat, lng: S.hub.lng } : { lat: city.lat, lng: city.lng };
        S.R = S.world ? WORLD_KM / KM : CITY_MI;
      } else if (rest.length === 1) { S.kind = rest[0].type; S.area = rest[0]; S.label = rest[0].label; }
      if (!S.center && rest.length > 1) S.label = rest.map(function (p) { return p.label; }).join(" and ");
      var items = rides.map(function (r) { return { r: r, d: S.center ? miles(S.center, { lat: r.la, lng: r.ln }) : null }; });
      if (S.center) items.sort(function (a, b) { return a.d - b.d; });
      if (S.kind === "near") S.world = !!items.length && items[0].r.co !== "US";
      S.all = items;
      S.pool = items.filter(function (x) {
        if (S.kind === "near" && x.d > S.R) return false;
        if (S.kind === "city" && (x.d > S.R || (city.st ? x.r.st !== city.st : x.r.co !== city.cc))) return false;
        for (var i = 0; i < rest.length; i++) if (!inPlace(rest[i], x.r)) return false;
        return true;
      });
      return S;
    }
    function passes(P, r) {
      for (var g in P.groups) {
        var fs = P.groups[g], ok = false;
        for (var i = 0; i < fs.length && !ok; i++) ok = fs[i].test(r);
        if (!ok) return false;
      }
      for (var j = 0; j < P.words.length; j++) if (!wordHit(r, P.words[j])) return false;
      return true;
    }
    // "within 25 miles of Dallas, TX" · "within 75 miles of you" · "in Texas" — the radius said plainly
    function where(S) {
      if (S.kind === "near") return "within " + (S.world ? Math.round(S.R * KM / 10) * 10 + " km" : S.R + " miles") + " of " + S.label;
      if (S.kind === "city") return "within " + (S.world ? WORLD_KM + " km" : CITY_MI + " miles") + " of " + S.label;
      return S.label ? "in " + S.label : "";
    }
    function uniq(l) { return l.filter(function (x, i) { return x && l.indexOf(x) === i; }); }
    function describe(P) {
      var fs = P.facets.map(function (x) { return x.f; }).sort(function (a, b) { return (a.o || 9) - (b.o || 9); });
      return uniq(fs.map(function (f) { return f.say; })).join(" · ");
    }
    function wordsText(P) { return P.words.length ? "matching “" + P.words.map(function (w) { return w.w; }).join(" ") + "”" : ""; }
    // the plain line for an empty list: "No fast gravel rides on Tuesdays within 25 miles of Dallas, TX."
    function sentence(P, S, extra) {
      extra = extra || {};
      var fs = P.facets.map(function (x) { return x.f; }).sort(function (a, b) { return (a.o || 9) - (b.o || 9); });
      var pre = uniq(fs.map(function (f) { return f.pre; }).concat(extra.pre || []));
      var post = uniq(fs.map(function (f) { return f.post; }).concat(extra.post || []).concat([wordsText(P)]));
      var w = where(S) || extra.here || "";
      return "No " + (pre.length ? pre.join(" ") + " " : "") + "rides" + (post.length ? " " + post.join(" ") : "") + (w ? " " + w : "") + ".";
    }
    // words nothing we list carries at all
    function unknown(P, rides) {
      return P.words.filter(function (t) { return !rides.some(function (r) { return wordHit(r, t); }); }).map(function (t) { return t.w; });
    }
    // towns whose names look like what was typed (a typo, half a name): city pages first
    function suggest(words, max) {
      var qs = uniq([words.join(" ")].concat(words)).filter(function (s) { return s.length > 2; }), out = [];
      cities.forEach(function (c) {
        var name = norm(c.city), best = 99;
        qs.forEach(function (s) {
          var cap = s.length <= 5 ? 1 : 2;
          var d = name.indexOf(s) === 0 ? 0 : lev(s, name, cap);
          if (d <= cap && d < best) best = d;
        });
        if (best < 99) out.push({ c: c, d: best });
      });
      out.sort(function (a, b) { return a.d - b.d || (b.c.hub ? b.c.hub.rides : 0) - (a.c.hub ? a.c.hub.rides : 0); });
      var seen = {};
      return out.filter(function (x) { var k = x.c.hub ? x.c.hub.url : x.c.label; if (seen[k]) return false; seen[k] = 1; return true; }).slice(0, max || 3).map(function (x) { return x.c; });
    }
    // the city page that covers a point (25 miles in the US, 40 km elsewhere), closest first
    function covering(pt, st) {
      var best = null;
      hubs.forEach(function (h) {
        if (st && h.state !== st) return;
        var d = miles(pt, h);
        if (d <= (h.state ? CITY_MI : WORLD_KM / KM) && (!best || d < best.d)) best = { h: h, d: d };
      });
      return best && best.h;
    }
    return { parse: parse, blank: blank, scope: scope, passes: passes, where: where, describe: describe, wordsText: wordsText,
      sentence: sentence, unknown: unknown, suggest: suggest, covering: covering, hubs: hubs, stateName: stateName, ccName: ccName };
  }

  // Pass 22: at 150% text the placeholder clipped to "C". Say less when the box is narrow: the longest
  // that fits, measured in the box itself (the list arrow and the clear button take room on the right).
  function fitPlaceholder(input, list) {
    if (!input || !input.setAttribute) return function () {};
    list = [input.getAttribute("placeholder") || ""].concat(list || []).filter(Boolean);
    function fit() {
      if (input.value || document.activeElement === input || !input.clientWidth) return;
      var pick = list[list.length - 1];
      for (var i = 0; i < list.length; i++) {
        input.value = list[i];
        var ok = input.scrollWidth <= input.clientWidth + 1;
        input.value = "";
        if (ok) { pick = list[i]; break; }
      }
      input.setAttribute("placeholder", pick);
    }
    fit();
    window.addEventListener("resize", fit);
    input.addEventListener("blur", fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    return fit;
  }

  window.CFCFind = { make: make, norm: norm, miles: miles, away: away, fitPlaceholder: fitPlaceholder, KM: KM, CITY_MI: CITY_MI, WORLD_KM: WORLD_KM };
})();

/* ———— the /all/ pages: the cards already in the page ———— */
(function () {
  "use strict";
  // Pass 15: a short page carries only the day strip — no search box, no index, no "near me"
  var idxEl = document.getElementById("gr-index");
  var idx = idxEl ? JSON.parse(idxEl.textContent) : { cities: [], states: [], countries: [] };
  var stateAbbr = {};              // "AZ" -> "Arizona"
  idx.states.forEach(function (s) { stateAbbr[s[0]] = s[1]; });
  var countryName = {};
  (idx.countries || []).forEach(function (c) { countryName[c[0]] = c[1]; });

  var $ = function (id) { return document.getElementById(id); };
  var slice = function (l) { return Array.prototype.slice.call(l); };
  var q = $("gr-q"), geoBtn = $("gr-geo"), clearBtn = $("gr-clear"), status = $("gr-status"), bigN = $("gr-n");
  var nearby = $("gr-nearby"), statesWrap = $("gr-states"), empty = $("gr-empty"), widenBtn = $("gr-widen");
  var emptyState = $("gr-empty-state"), list = $("gr-list"), jump = $("gr-jump");
  var tiles = slice(document.querySelectorAll("#gr-filters [data-filter]"));
  var cards = slice(document.querySelectorAll(".gr-card"));
  var sections = slice(document.querySelectorAll(".gr-state"));
  var total = +(status && status.dataset.total) || cards.length;
  if (!statesWrap || !tiles.length || !window.CFCFind) return;
  if (!q) q = { value: "", addEventListener: function () {} };
  var F = window.CFCFind;
  var E = F.make({ cities: idx.cities, states: idx.states, countries: idx.countries || [] });

  // each card as a ride record the search words can read
  function words(s) { return String(s || "").split(" ").filter(Boolean); }
  var RECS = cards.map(function (c) {
    var ds = c.dataset, when = c.querySelector(".gr-card-when"), en = c.querySelector(".gr-card-en"), use = c.querySelector(".gr-mark use");
    c._home = c.parentNode;
    return { s: ds.slug, n: ds.name || "", ne: en ? en.textContent : "", c: ds.city || "", st: ds.state || "", co: ds.country || "US",
      pl: (ds.city || "") + ", " + (ds.state || countryName[ds.country] || ""), rg: ds.place || "", h: ds.hood || "", ho: ds.host || "",
      la: +ds.lat, ln: +ds.lng, d: words(ds.disc), t: words(ds.tags), dy: words(ds.days), p: words(ds.pace),
      w: when ? when.textContent : "", k: use && /open-streets$/.test(use.getAttribute("href") || "") ? "open-streets" : "", card: c };
  });

  var origin = null;      // {lat,lng,label} in "near" mode
  var RADIUS = 75;        // miles, for Near me
  var widened = false;
  var DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var shown = 0;

  function todayKey() { return DAYS[new Date().getDay()]; }
  // ?day= takes a day, a list (sat,sun), or the old words: today, weekend, weekday
  function expandDay(v) {
    if (v === "today") return [todayKey()];
    if (v === "weekend") return ["sat", "sun"];
    if (v === "weekday") return ["mon", "tue", "wed", "thu", "fri"];
    return String(v || "").split(",").filter(function (d) { return DAYS.indexOf(d) > -1; });
  }

  function pressed(t) { return t.getAttribute("aria-pressed") === "true"; }
  function activeFilters() {
    var f = { disc: [], tags: [], days: [] };
    tiles.forEach(function (t) { if (pressed(t)) f[{ disc: "disc", tag: "tags", day: "days" }[t.dataset.filter]].push(t.dataset.value); });
    return f;
  }
  function has(list, v) { return (" " + list + " ").indexOf(" " + v + " ") > -1; }
  // disc and day are "any of", made-for is "all of" (a no-drop beginner ride is both)
  function passes(card, f, skip) {
    if (skip !== "disc" && f.disc.length && !f.disc.some(function (d) { return has(card.dataset.disc, d); })) return false;
    if (skip !== "tags" && f.tags.length && !f.tags.every(function (t) { return has(card.dataset.tags, t); })) return false;
    if (skip !== "days" && f.days.length && !f.days.some(function (d) { return has(card.dataset.days, d); })) return false;
    return true;
  }
  function anyFilter(f) { return !!(f.disc.length || f.tags.length || f.days.length || q.value.trim() || origin); }

  // Where we're looking and what the words ask, before any tile: near the reader, a town (its page's
  // reach), a state or country, who it's for, the day, whole words of a name.
  function scopeOf(text) {
    var P = E.parse(origin ? "" : text, RECS);
    var code = !origin && P.codes.length && !P.places.length ? P.codes[0].kind : null;
    var S = E.scope(P, RECS, origin ? { origin: origin, radius: RADIUS } : {});
    var ok = function (x) { return !code && E.passes(P, x.r); };
    var hits = S.pool.filter(ok);
    return { P: P, S: S, code: code, near: !!S.center,
      all: S.all.filter(ok).map(function (x) { return { card: x.r.card, d: x.d, co: x.r.co }; }),
      hits: hits.map(function (x) { return { card: x.r.card, d: x.d, co: x.r.co }; }),
      pool: hits.map(function (x) { return x.r.card; }) };
  }

  // Each tile's count = what you'd get with it on, everything else as it is.
  function paintCounts(pool, f) {
    var dayN = {}, max = 1;
    tiles.forEach(function (t) {
      var k = t.dataset.filter, v = t.dataset.value, n = 0, field = { disc: "disc", tag: "tags", day: "days" }[k];
      // an "any of" group counts as if its own picks were off; made-for ("all of") keeps them
      pool.forEach(function (card) { if (passes(card, f, field === "tags" ? null : field) && has(card.dataset[field], v)) n++; });
      var el = t.querySelector("[data-n]"); if (el) el.textContent = n;
      if (n || pressed(t)) t.removeAttribute("aria-disabled"); else t.setAttribute("aria-disabled", "true");
      if (k === "day") { dayN[v] = n; if (n > max) max = n; }
    });
    tiles.forEach(function (t) { if (t.dataset.filter === "day") t.style.setProperty("--h", (dayN[t.dataset.value] / max).toFixed(2)); });
  }

  function reset() {
    cards.forEach(function (c) {
      c.hidden = false;
      Array.prototype.forEach.call(c.querySelectorAll("[data-live]"), function (d) { d.remove(); });
      if (c.parentNode !== c._home) c._home.appendChild(c);
    });
    if (nearby) { nearby.hidden = true; nearby.innerHTML = ""; }
    statesWrap.hidden = false;
    sections.forEach(function (s) { s.hidden = false; });
    if (empty) empty.hidden = true;
    if (emptyState) emptyState.hidden = true;
  }
  function syncUrl(f) {
    var p = new URLSearchParams();
    if (q.value.trim() && !origin) p.set("q", q.value.trim());
    if (f.disc.length) p.set("bike", f.disc.join(","));
    if (f.tags.length) p.set("for", f.tags.join(","));
    if (f.days.length) p.set("day", f.days.join(","));
    var s = p.toString();
    history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
  }
  function rides(n) { return "ride" + (n === 1 ? "" : "s"); }
  function sayAll(kind, joiner) {
    return tiles.filter(function (t) { return t.dataset.filter === kind && pressed(t); }).map(function (t) { return t.dataset.say; }).join(joiner);
  }
  function describe(f) {
    var bits = [];
    if (f.disc.length) bits.push(sayAll("disc", " or "));
    if (f.tags.length) bits.push(sayAll("tag", " + "));
    if (f.days.length) {
      var d = f.days.slice().sort().join(",");
      bits.push(d === "sat,sun" ? "weekends" : d === "fri,mon,thu,tue,wed" ? "weekdays" : sayAll("day", " or "));
    }
    return bits.join(" · ");
  }
  function say(n, text) {
    if (bigN) { bigN.hidden = n == null; if (n != null) bigN.textContent = n; }
    status.textContent = text;
  }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  // Nothing left: say plainly what didn't match, and the ways on (the whole directory, Near me).
  var emptyWhy = empty && empty.querySelector("p"), everywhere = empty && empty.querySelector('a[href^="/rides/"]');
  if (everywhere) everywhere._label = everywhere.textContent;
  function paintEmpty(sc, f, text) {
    if (!empty || !emptyWhy) return;
    var why;
    if (sc.code) why = "<b>We can&rsquo;t look up " + (sc.code === "zip" ? "zip codes" : "postcodes") + " yet.</b> Try your town or Near me.";
    else {
      var gone = E.unknown(sc.P, RECS);
      var tilesPre = [], tilesPost = [];
      if (f.tags.length) tilesPre.push(sayAll("tag", " "));
      if (f.disc.length) tilesPre.push(sayAll("disc", " or "));
      if (f.days.length) tilesPost.push("on " + sayAll("day", " or "));
      why = "<b>" + esc(E.sentence(sc.P, sc.S, { pre: tilesPre, post: tilesPost, here: "here" })) + "</b>"
        + (gone.length ? " " + gone.map(function (w) { return "“" + esc(w) + "”"; }).join(" or ") + (gone.length > 1 ? " aren&rsquo;t" : " isn&rsquo;t") + " on this page." : "");
    }
    emptyWhy.innerHTML = why;
    if (everywhere) {
      var t = text.trim();
      everywhere.href = t && !sc.code ? "/rides/?q=" + encodeURIComponent(t) : "/rides/";
      everywhere.textContent = t && !sc.code ? "Search every ride for “" + t + "” →" : everywhere._label;
    }
    if (geoBtn && !empty.querySelector("[data-geo]")) {
      var acts = empty.querySelector(".gr-empty-actions");
      if (acts) acts.insertAdjacentHTML("afterbegin", '<button type="button" class="gr-chip gr-chip--mk" data-geo><svg class="gr-chip-mark" aria-hidden="true" focusable="false"><use href="/rides/marks.svg#m-locate"/></svg>Near me</button> ');
    }
  }

  function render() {
    var f = activeFilters();
    var text = q.value;
    var on = anyFilter(f);
    if (clearBtn) clearBtn.hidden = !on;
    reset();
    syncUrl(f);
    var sc = scopeOf(text);
    paintCounts(sc.pool, f);
    var desc = [E.describe(sc.P), describe(f)].filter(Boolean).join(" · "), tail = desc ? " · " + desc : "";
    var wordsLine = E.wordsText(sc.P), place = E.where(sc.S);
    if (!on) { shown = total; say(total, rides(total)); paintJump(); return; }

    if (sc.near) {
      var hits = sc.hits.filter(function (x) { return passes(x.card, f); });
      var wide = false;
      if (!hits.length && widened) {
        hits = sc.all.filter(function (x) { return passes(x.card, f); }).slice(0, 12);
        wide = hits.length > 0;
      }
      statesWrap.hidden = true;
      nearby.hidden = false;
      hits.forEach(function (x) {
        // Pass 22: "3 mi away" (km outside the US), first on the row's line
        var tag = document.createElement("span");
        tag.className = "gr-dist"; tag.setAttribute("data-live", ""); tag.textContent = F.away(x.d, sc.S.world || x.co !== "US");
        var meta = x.card.querySelector(".gr-card-meta");
        if (meta) meta.insertBefore(tag, meta.firstChild);
        nearby.appendChild(x.card);
      });
      shown = hits.length;
      say(shown, (wide ? rides(shown) + ", the closest · nothing " + place + (wordsLine ? " " + wordsLine : "")
        : rides(shown) + " " + place + (wordsLine ? " " + wordsLine : "") + (shown > 1 ? ", closest first" : "")) + tail);
      if (widenBtn) widenBtn.hidden = !!shown || widened || !sc.all.some(function (x) { return passes(x.card, f); });
    } else {
      shown = 0;
      cards.forEach(function (card) {
        var ok = sc.pool.indexOf(card) > -1 && passes(card, f);
        card.hidden = !ok; if (ok) shown++;
      });
      sections.forEach(function (s) { s.hidden = !s.querySelector(".gr-card:not([hidden])"); });
      say(shown, rides(shown) + (place ? " " + place : "") + (wordsLine ? " " + wordsLine : "") + tail);
      if (widenBtn) widenBtn.hidden = true;
      if (!shown && sc.S.area && sc.S.area.type === "state" && emptyState) { emptyState.href = "/rides/" + sc.S.area.st.toLowerCase() + "/"; emptyState.hidden = false; }
    }
    if (empty) { empty.hidden = shown > 0; if (!shown) paintEmpty(sc, f, text); }
    paintJump();
  }

  // The jump bar: only while something's picked, there's something to see, and the count is below the
  // fold. Pass 22: it also steps aside while the week strip is on screen — at the foot of a phone it sat
  // on Tuesday and Wednesday (the strip at y 749–844, the bar from 778) — and once the count line shows.
  var jumpN = jump && jump.querySelector(".gr-jump-n"), line = document.querySelector(".gr-result"), ticking = false;
  var week = document.querySelector("#gr-filters .gr-week");
  function onScreen(el) { if (!el) return false; var r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight; }
  function paintJump() {
    if (!jump || !list || !line) return;
    var below = line.getBoundingClientRect().top >= window.innerHeight && list.getBoundingClientRect().top > 0;
    var show = clearBtn && !clearBtn.hidden && shown > 0 && below && !onScreen(week);
    if (show) jumpN.textContent = shown + " " + rides(shown);
    jump.hidden = !show;
  }
  window.addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; paintJump(); });
  }, { passive: true });
  window.addEventListener("resize", paintJump);
  if (jump) jump.addEventListener("click", function (e) {
    e.preventDefault();
    list.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });

  var timer;
  q.addEventListener("input", function () { origin = null; widened = false; clearTimeout(timer); timer = setTimeout(render, 120); });
  q.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); clearTimeout(timer); render(); } });
  tiles.forEach(function (t) {
    t.addEventListener("click", function () {
      if (t.getAttribute("aria-disabled") === "true" && !pressed(t)) return;   // a tile that would leave nothing
      t.setAttribute("aria-pressed", pressed(t) ? "false" : "true");
      render();
    });
  });
  function clearAll() {
    origin = null; widened = false; q.value = "";
    tiles.forEach(function (t) { t.setAttribute("aria-pressed", "false"); });
    render();
  }
  function locate() {
    if (!navigator.geolocation) { say(null, "Your browser can't share location. Type a town instead."); return; }
    say(null, "Finding you…");
    navigator.geolocation.getCurrentPosition(function (pos) {
      origin = { lat: pos.coords.latitude, lng: pos.coords.longitude, label: "you" }; widened = false;
      q.value = ""; render();
    }, function () { say(null, "Couldn't get your location. Type a town instead."); }, { timeout: 8000, maximumAge: 600000 });
  }
  if (clearBtn) clearBtn.addEventListener("click", clearAll);
  if (widenBtn) widenBtn.addEventListener("click", function () { widened = true; render(); });
  if (geoBtn) geoBtn.addEventListener("click", locate);
  // the empty block's buttons (Clear, Near me) — some are written after load
  if (empty) empty.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-clear],[data-geo]");
    if (!b) return;
    if (b.hasAttribute("data-geo")) locate(); else clearAll();
  });

  if (q.nodeType) F.fitPlaceholder(q, ["Town or ride", "Town", "Search"]);

  // today wears a dot on the week strip
  tiles.forEach(function (t) {
    if (t.dataset.filter === "day" && t.dataset.value === todayKey()) {
      t.classList.add("is-today");
      t.insertAdjacentHTML("beforeend", '<span class="visually-hidden"> (today)</span>');
    }
  });

  // restore state from the URL
  var params = new URLSearchParams(location.search);
  if (params.get("q")) q.value = params.get("q");
  var want = { disc: (params.get("bike") || "").split(","), tag: (params.get("for") || "").split(","), day: expandDay(params.get("day")) };
  tiles.forEach(function (t) { if (want[t.dataset.filter].indexOf(t.dataset.value) > -1) t.setAttribute("aria-pressed", "true"); });
  render();
})();
