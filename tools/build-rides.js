#!/usr/bin/env node
/*
  build-rides.js — generates the Group Rides directory from one data file.

    node tools/build-rides.js            (or: npm run build:rides)

  Reads   cfc-site/rides/rides.json          (the database — edit this)
  Writes  cfc-site/rides/index.html          (search page, every ride listed)
          cfc-site/rides/<st>/index.html     (one hub per state)
          cfc-site/rides/<slug>/index.html   (one page per ride)
          cfc-site/rides/sitemap.xml         (rides-only sitemap)

  The output is plain static HTML that links /styles.css like every other
  page. Re-run after editing rides.json. Pages for rides that were removed
  from the data are deleted so the folder never drifts from the database.
*/
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "cfc-site", "rides");
const DATA = path.join(OUT, "rides.json");
const SITE = "https://cycleforchange.org";
const TODAY = new Date().toISOString().slice(0, 10);

const STATE_NAMES = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",
  DE:"Delaware",DC:"Washington, DC",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",
  IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",
  MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",
  NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",
  NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",
  RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",
  VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming",PR:"Puerto Rico"
};
const DAY_LONG = { mon:"Monday", tue:"Tuesday", wed:"Wednesday", thu:"Thursday", fri:"Friday", sat:"Saturday", sun:"Sunday" };
const DISC_LABEL = { road:"Road", gravel:"Gravel", mtb:"Mountain bike", fixed:"Fixed gear", social:"Social", cruiser:"Cruiser",
  bmx:"BMX", track:"Track", cyclocross:"Cyclocross", ebike:"E-bike", mixed:"Mixed" };
const TAG_LABEL = { lgbtq:"LGBTQ+", wtf:"Women / trans / femme", bipoc:"BIPOC", beginner:"Beginner friendly",
  "no-drop":"No-drop", family:"Family", adaptive:"Adaptive", youth:"Youth" };
const BANNED = /\b(leverage|synergy|passionate about|thrilled to announce|excited to share)\b/i;

// ---------- helpers ----------
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const attr = esc;
const num = (v) => (v == null || v === "" || isNaN(Number(v)) ? null : Number(v));
const miles = (a, b) => {
  const R = 3958.8, toR = (d) => (d * Math.PI) / 180;
  const dLat = toR(b.lat - a.lat), dLng = toR(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
const handle = (url) => {
  const m = String(url || "").match(/instagram\.com\/([A-Za-z0-9_.]+)/);
  return m ? "@" + m[1] : null;
};
const discLabel = (d) => (d || []).map((x) => DISC_LABEL[x] || x).join(" · ");
const placeText = (r) => `${r.city}, ${r.state}`;
const rmrf = (p) => fs.rmSync(p, { recursive: true, force: true });
const write = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };

// ---------- load + validate ----------
function load() {
  const raw = JSON.parse(fs.readFileSync(DATA, "utf8"));
  const seen = new Set();
  const out = [];
  const problems = [];
  for (const r of raw) {
    const id = r.slug || r.name;
    const links = r.links || {};
    if (!r.slug || !/^[a-z0-9-]+$/.test(r.slug)) { problems.push(`${id}: bad slug`); continue; }
    if (seen.has(r.slug)) { problems.push(`${id}: duplicate slug`); continue; }
    if (!r.name || !r.city || !r.state) { problems.push(`${id}: missing name/city/state`); continue; }
    if (!(links.website || links.instagram || links.facebook || links.strava)) { problems.push(`${id}: no verified link`); continue; }
    const lat = num(r.lat), lng = num(r.lng);
    if (lat == null || lng == null) { problems.push(`${id}: missing lat/lng`); continue; }
    const text = [r.name, r.description, r.schedule, r.founded_note].join(" ");
    if (BANNED.test(text)) problems.push(`${id}: banned word in copy (fix the data)`);
    seen.add(r.slug);
    out.push({
      ...r,
      state: String(r.state).toUpperCase(),
      lat, lng,
      discipline: Array.isArray(r.discipline) && r.discipline.length ? r.discipline : ["mixed"],
      days: Array.isArray(r.days) ? r.days : [],
      inclusive_focus: Array.isArray(r.inclusive_focus) ? r.inclusive_focus : [],
      sources: Array.isArray(r.sources) ? r.sources : [],
      links: { website: null, instagram: null, facebook: null, strava: null, meetup: null, other: [], ...links },
      host: r.host || null,
      start_location: r.start_location || null,
    });
  }
  if (problems.length) {
    console.error("rides.json problems:\n  " + problems.join("\n  "));
    if (problems.some((p) => !/banned word/.test(p))) process.exit(1);
  }
  out.sort((a, b) => a.state.localeCompare(b.state) || a.city.localeCompare(b.city) || a.name.localeCompare(b.name));
  return out;
}

// ---------- shared chrome ----------
function head({ title, description, canonical, jsonld, ogType = "website" }) {
  return `<!DOCTYPE html>
<!-- GENERATED by tools/build-rides.js from cfc-site/rides/rides.json — edit the data, not this file. -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${esc(title)} — Cycle for Change</title>
  <meta name="description" content="${attr(description)}">
  <link rel="canonical" href="${attr(canonical)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:title" content="${attr(title)} — Cycle for Change">
  <meta property="og:description" content="${attr(description)}">
  <meta property="og:url" content="${attr(canonical)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${attr(title)} — Cycle for Change">
  <meta name="twitter:description" content="${attr(description)}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Space+Grotesk:wght@400;500&family=Space+Mono&family=Anton&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
  <script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
  </script>
</head>
<body id="top">

<div class="util">
  <div class="wrap">
    <span><b><span data-cur>—</span> / 10,000</b> miles logged · all on the bike · 2027</span>
    <span>every mile for queer communities</span>
  </div>
</div>

<header>
  <div class="wrap nav">
    <a class="brand" href="/" aria-label="Cycle for Change home">
      <svg width="32" height="32" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M98.45 71.03 A40.00 40.00 0 0 1 50.32 98.81" stroke="#372C3C" stroke-width="12" stroke-linecap="round"/><path d="M31.23 87.79 A40.00 40.00 0 0 1 31.23 32.21" stroke="#E9E224" stroke-width="12" stroke-linecap="round"/><path d="M50.32 21.19 A40.00 40.00 0 0 1 98.45 48.97" stroke="#A99CB0" stroke-width="12" stroke-linecap="round"/><circle cx="60.00" cy="60.00" r="6.00" fill="#372C3C"/></svg>
      <span class="word">Cycle for Change</span>
    </a>
    <nav class="links" aria-label="Primary">
      <a href="/#tally">The tally</a>
      <a href="/field-notes/">Field Notes</a>
      <a href="/resources/">Resources</a>
      <a href="/rides/">Group rides</a>
      <a href="/#vote">Vote</a>
    </nav>
    <div class="nav-right">
      <a href="/#board" class="btn btn-dark">Pledge a mile →</a>
    </div>
  </div>
</header>
`;
}

const CTA = `
  <section class="fn-cta" aria-label="Follow the miles and give">
    <p class="fn-cta-num"><span data-cur>—</span><span class="of"> / 10,000 mi</span></p>
    <p>Every mile is logged live as I ride it. <a href="/#tally" style="color:var(--yellow);border-bottom:1px solid var(--yellow);">Follow the number →</a></p>
    <hr>
    <p class="give">Pledge a mile — it goes direct to queer-community orgs at year-end, by vote.</p>
    <div class="fn-cta-row">
      <a href="/#board" class="btn btn-y">Pledge a mile →</a>
      <a href="/#vote" class="btn btn-dark" style="border:1px solid rgba(255,255,255,.2);">See the orgs →</a>
    </div>
  </section>
`;

function foot(extraScript = "") {
  return `
<footer>
  <div class="wrap">
    <div class="foot-base"><span>Cycle for Change™</span><span>every mile for queer communities</span></div>
  </div>
</footer>

<script src="/field-notes/field-notes.js" defer></script>${extraScript}
</body>
</html>
`;
}

// ---------- ride card (used on directory + state pages) ----------
function card(r, opts = {}) {
  const tags = r.inclusive_focus.map((t) => `<span class="gr-tag">${esc(TAG_LABEL[t] || t)}</span>`).join("");
  const dist = opts.distance != null ? `<span class="gr-dist">${Math.round(opts.distance)} mi away</span>` : "";
  return `<a class="gr-card" href="/rides/${r.slug}/"
   data-name="${attr(r.name)}" data-city="${attr(r.city)}" data-state="${r.state}"
   data-lat="${r.lat}" data-lng="${r.lng}" data-disc="${r.discipline.join(" ")}"
   data-tags="${r.inclusive_focus.join(" ")}" data-days="${r.days.join(" ")}"
   data-host="${attr(r.host ? r.host.name : "")}" data-hood="${attr(r.neighborhood || "")}">
  <span class="gr-card-top"><span class="gr-disc">${esc(discLabel(r.discipline))}</span>${dist}</span>
  <span class="gr-card-name">${esc(r.name)}</span>
  <span class="gr-card-place">${esc(placeText(r))}${r.neighborhood ? " · " + esc(r.neighborhood) : ""}</span>
  <span class="gr-card-when">${esc(r.schedule || "See the ride's page for schedule")}</span>
  ${tags ? `<span class="gr-tags">${tags}</span>` : ""}
</a>`;
}

// ---------- directory ----------
function directory(rides) {
  const byState = {};
  for (const r of rides) (byState[r.state] ||= []).push(r);
  const states = Object.keys(byState).sort();
  const cities = {};
  for (const r of rides) {
    const k = `${r.city}, ${r.state}`;
    if (!cities[k]) cities[k] = { lat: 0, lng: 0, n: 0 };
    cities[k].lat += r.lat; cities[k].lng += r.lng; cities[k].n += 1;
  }
  const cityIndex = Object.entries(cities).map(([k, v]) => [k, +(v.lat / v.n).toFixed(4), +(v.lng / v.n).toFixed(4)]);
  const stateIndex = Object.entries(STATE_NAMES).map(([a, n]) => [a, n]);
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Find a group ride near you",
    description: `A searchable directory of ${rides.length} recurring bicycle group rides across ${states.length} US states — road, gravel, mountain bike, fixed gear and social rides, with day, time, start point and links.`,
    url: `${SITE}/rides/`,
    author: { "@type": "Person", name: "Robert Castan" },
    publisher: { "@type": "Organization", name: "Cycle for Change", url: `${SITE}/` },
  };
  const stateLinks = states.map((s) => `<a href="/rides/${s.toLowerCase()}/">${esc(STATE_NAMES[s] || s)} <small>${byState[s].length}</small></a>`).join("\n          ");
  const sections = states.map((s) => `
      <section class="gr-state" id="${s.toLowerCase()}" data-state="${s}">
        <h2 class="gr-state-head"><a href="/rides/${s.toLowerCase()}/">${esc(STATE_NAMES[s] || s)}</a> <span class="gr-count">${byState[s].length}</span></h2>
        <div class="gr-grid">
${byState[s].map((r) => card(r)).join("\n")}
        </div>
      </section>`).join("\n");

  const discChips = Object.entries(DISC_LABEL).filter(([k]) => rides.some((r) => r.discipline.includes(k)))
    .map(([k, v]) => `<button type="button" class="gr-chip" data-filter="disc" data-value="${k}" aria-pressed="false">${v}</button>`).join("\n          ");
  const tagChips = Object.entries(TAG_LABEL).filter(([k]) => rides.some((r) => r.inclusive_focus.includes(k)))
    .map(([k, v]) => `<button type="button" class="gr-chip" data-filter="tag" data-value="${k}" aria-pressed="false">${v}</button>`).join("\n          ");
  const dayOpts = Object.entries(DAY_LONG).map(([k, v]) => `<option value="${k}">${v}</option>`).join("");

  return head({
    title: "Find a group ride near you",
    description: `Search ${rides.length} recurring bicycle group rides in ${states.length} states by city or state. Road, gravel, mountain bike, fixed gear and social rides — day, time, start point, pace and links for each one.`,
    canonical: `${SITE}/rides/`,
    jsonld,
  }) + `
<main class="fn-pillar gr-dir">
  <header class="fn-pillar-head">
    <div class="wrap">
      <span class="eyebrow">Group rides · United States</span>
      <h1>Find a group ride near you</h1>
      <p class="fn-pillar-intro">
        ${rides.length} recurring group rides in ${states.length} states, each with its own page: when it rolls,
        where it starts, how far, how fast, who runs it. Type a city or state, or use your location.
        No sign-up. No account. Just show up.
      </p>
      <div class="fn-line" aria-hidden="true"><i data-line></i></div>
    </div>
  </header>

  <section class="gr-search-wrap">
    <div class="wrap">
      <form class="gr-search" role="search" id="gr-form" onsubmit="return false">
        <label class="visually-hidden" for="gr-q">Search by city, state or ride name</label>
        <input id="gr-q" type="search" placeholder="City, state, or ride name — e.g. Phoenix, AZ" autocomplete="off" list="gr-cities">
        <datalist id="gr-cities">${cityIndex.map(([k]) => `<option value="${attr(k)}">`).join("")}</datalist>
        <button type="button" class="btn btn-dark" id="gr-geo">Use my location</button>
      </form>
      <div class="gr-filters">
        <div class="gr-filter-row"><span class="gr-filter-label">Type</span>
          ${discChips}
        </div>
        <div class="gr-filter-row"><span class="gr-filter-label">Made for</span>
          ${tagChips}
        </div>
        <div class="gr-filter-row"><span class="gr-filter-label">Day</span>
          <select id="gr-day" aria-label="Day of week"><option value="">Any day</option>${dayOpts}</select>
          <button type="button" class="gr-clear" id="gr-clear" hidden>Clear all</button>
        </div>
      </div>
      <p class="gr-status" id="gr-status" aria-live="polite"></p>
    </div>
  </section>

  <section class="gr-results-wrap">
    <div class="wrap">
      <h2 class="fn-spokes-head">Group rides near you, by state</h2>
      <nav class="gr-states" aria-label="Jump to a state">
          ${stateLinks}
      </nav>
      <div id="gr-nearby" class="gr-grid gr-nearby" hidden></div>
      <div id="gr-states">${sections}
      </div>
      <p class="gr-empty" id="gr-empty" hidden>No rides match. Try a nearby city, or clear the filters. Know a ride we're missing? <a href="https://www.instagram.com/cycl_eforchange/">DM us on Instagram</a>.</p>
    </div>
  </section>

  <section class="gr-why">
    <div class="wrap">
      <h2>Why a group ride directory on a mental-health site</h2>
      <p>
        A group ride is the cheapest, most reliable way I know to get out of my own head and into a room
        of people who want you there. Nobody asks what you do. You just ride. This directory exists so
        that anyone, anywhere in the country, can find one this week. Every ride here is real, recurring,
        and checked against its own website or social page. If one has moved or died, tell me and I'll fix it.
      </p>
      <p>
        I'm riding 10,000 miles in 2027 for queer mental health. <a href="/#board">Pledge a mile</a> if
        you want to back it. Or just go find your ride.
      </p>
      <aside class="fn-crisis">
        <strong>If you're struggling:</strong> the <strong>988 Suicide &amp; Crisis Lifeline</strong>
        is free and 24/7 — call or text <strong>988</strong>. For LGBTQ youth, the
        <strong>Trevor Project</strong> is at <strong>1-866-488-7386</strong> (or text START to 678-678).
      </aside>
    </div>
  </section>

${CTA}

  <p class="fn-note" style="max-width:38rem;margin:24px auto 0;color:var(--mute);font-size:.9rem;line-height:1.6;">
    Rides are listed from public sources — club sites, shop pages, Instagram and Facebook — and last
    checked on the date shown on each ride's page. Always confirm with the host before you show up;
    schedules change with the seasons. This site isn't affiliated with any ride listed.
  </p>
</main>
` + foot(`
<script id="gr-index" type="application/json">${JSON.stringify({ cities: cityIndex, states: stateIndex })}</script>
<script src="/rides/rides.js" defer></script>`);
}

// ---------- state hub ----------
function statePage(st, rides) {
  const name = STATE_NAMES[st] || st;
  const byCity = {};
  for (const r of rides) (byCity[r.city] ||= []).push(r);
  const cities = Object.keys(byCity).sort();
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Group rides in ${name}`,
    description: `${rides.length} recurring bicycle group rides in ${name}: ${cities.join(", ")}.`,
    url: `${SITE}/rides/${st.toLowerCase()}/`,
    publisher: { "@type": "Organization", name: "Cycle for Change", url: `${SITE}/` },
  };
  return head({
    title: `Group rides in ${name}`,
    description: `${rides.length} recurring bicycle group rides in ${name} — ${cities.slice(0, 8).join(", ")}${cities.length > 8 ? " and more" : ""}. Day, time, start point, pace and links for each.`,
    canonical: `${SITE}/rides/${st.toLowerCase()}/`,
    jsonld,
  }) + `
<main class="fn-pillar gr-dir">
  <header class="fn-pillar-head">
    <div class="wrap">
      <span class="eyebrow"><a href="/rides/">Group rides</a> · ${esc(name)}</span>
      <h1>Group rides in ${esc(name)}</h1>
      <p class="fn-pillar-intro">${rides.length} recurring group ride${rides.length === 1 ? "" : "s"} in ${esc(name)}, across ${cities.length} ${cities.length === 1 ? "city" : "cities"}. Each one has its own page with the day, time, start point and links.</p>
      <div class="fn-line" aria-hidden="true"><i data-line></i></div>
    </div>
  </header>
  <section class="gr-results-wrap">
    <div class="wrap">
      <h2 class="fn-spokes-head">Group rides in ${esc(name)}, by city</h2>
${cities.map((c) => `
      <section class="gr-state">
        <h3 class="gr-state-head">${esc(c)} <span class="gr-count">${byCity[c].length}</span></h3>
        <div class="gr-grid">
${byCity[c].map((r) => card(r)).join("\n")}
        </div>
      </section>`).join("\n")}
      <p class="fn-back"><a href="/rides/">← All states</a></p>
    </div>
  </section>
${CTA}
</main>
` + foot();
}

// ---------- ride page ----------
function ridePage(r, all) {
  const url = `${SITE}/rides/${r.slug}/`;
  const disc = discLabel(r.discipline);
  const start = r.start_location;
  const startName = start ? [start.name, start.address].filter(Boolean).join(", ") : null;
  const mapQ = start && (start.address || start.name) ? encodeURIComponent([start.name, start.address].filter(Boolean).join(", ")) : `${r.lat},${r.lng}`;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQ}`;
  // "Every Tuesday" -> "every Tuesday", but leave day names ("Tuesdays, 6 pm") capitalised
  const sched = r.schedule && r.schedule.length <= 70
    ? (/^(mon|tue|wed|thu|fri|sat|sun)/i.test(r.schedule) ? r.schedule : r.schedule.charAt(0).toLowerCase() + r.schedule.slice(1)).replace(/\.$/, "")
    : null;
  const ledeDiscs = (r.discipline.length > 1 ? r.discipline.filter((d) => d !== "mixed") : r.discipline).map((d) => (DISC_LABEL[d] || d).toLowerCase());
  const ledeDisc = ledeDiscs.length > 1 ? ledeDiscs.slice(0, -1).join(", ") + " and " + ledeDiscs.slice(-1) : ledeDiscs[0];
  const dist = r.distance_miles ? String(r.distance_miles).replace(/^[~≈]\s*/, "").replace(/\s*(mi|miles)$/i, "") : null;
  const lede = `${r.name} is a ${ledeDisc} group ride in ${placeText(r)}.` +
    (sched ? ` It meets ${sched}` : "") +
    (start && start.name ? `${sched ? "," : " It"} starting at ${start.name}.` : sched ? "." : "") +
    (dist ? ` Expect about ${dist} miles` : "") +
    (dist && r.pace ? `, ${r.pace}.` : dist ? "." : r.pace ? ` Pace: ${r.pace}.` : "");
  const description = lede.length > 300 ? lede.slice(0, 297) + "…" : lede;

  const nearby = all.filter((o) => o.slug !== r.slug)
    .map((o) => ({ o, d: miles(r, o) })).sort((a, b) => a.d - b.d).slice(0, 4);

  const facts = [
    ["When", r.schedule, r.season && r.season !== "year-round" ? `Season: ${r.season}` : r.season === "year-round" ? "Year-round" : null],
    ["Starts at", startName ? `${esc(startName)} <a class="gr-map" href="${attr(mapUrl)}" rel="noopener">Map ↗</a>` : null, null, true],
    ["Distance", r.distance_miles ? `${r.distance_miles} miles` : null, r.duration],
    ["Pace", r.pace, r.drop_policy && r.drop_policy !== "unknown" ? { "no-drop": "No-drop: nobody gets left", drop: "Drop ride: keep up or get dropped", groups: "Splits into pace groups" }[r.drop_policy] : null],
    ["Hosted by", r.host ? r.host.name : null, r.host && r.host.type ? { shop:"Bike shop", club:"Club", collective:"Collective", nonprofit:"Nonprofit", informal:"Informal / community-run", brand:"Brand", team:"Team" }[r.host.type] : null],
    ["Started", r.founded_year ? String(r.founded_year) : null, r.founded_note],
    ["Cost", r.cost, null],
    ["Bike", disc, null],
  ].filter((f) => f[1]);
  const factsHtml = facts.map(([k, v, sub, raw]) =>
    `<div class="gr-fact"><dt>${k}</dt><dd>${raw ? v : esc(v)}${sub ? `<small>${esc(sub)}</small>` : ""}</dd></div>`).join("\n        ");

  const L = r.links;
  const linkBtns = [
    L.website && ["Website", L.website],
    L.instagram && [handle(L.instagram) || "Instagram", L.instagram],
    L.facebook && ["Facebook", L.facebook],
    L.strava && ["Strava club", L.strava],
    L.meetup && ["Meetup", L.meetup],
    ...(L.other || []).map((u) => ["More", u]),
  ].filter(Boolean).map(([t, u]) => `<a class="btn btn-dark" href="${attr(u)}" rel="noopener nofollow">${esc(t)} ↗</a>`).join("\n        ");

  const tags = r.inclusive_focus.map((t) => `<span class="gr-tag">${esc(TAG_LABEL[t] || t)}</span>`).join("");

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: r.name,
    description,
    url,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    isAccessibleForFree: !r.cost || /^free/i.test(r.cost),
    location: {
      "@type": "Place",
      name: (start && start.name) || placeText(r),
      address: (start && start.address) || placeText(r),
      geo: { "@type": "GeoCoordinates", latitude: r.lat, longitude: r.lng },
    },
    organizer: r.host ? { "@type": "Organization", name: r.host.name, url: L.website || L.instagram || L.facebook || undefined } : undefined,
    sameAs: [L.website, L.instagram, L.facebook, L.strava, L.meetup].filter(Boolean),
  };
  if (r.days.length && r.frequency !== "irregular") {
    jsonld.eventSchedule = {
      "@type": "Schedule",
      byDay: r.days.map((d) => "https://schema.org/" + DAY_LONG[d]).filter((x) => !x.endsWith("undefined")),
      repeatFrequency: { weekly: "P1W", biweekly: "P2W", monthly: "P1M", seasonal: "P1W", annual: "P1Y" }[r.frequency] || "P1W",
      scheduleTimezone: "America/New_York",
    };
    const t = String(r.time_local || "").match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
    if (t) {
      let h = +t[1] % 12; if (/pm/i.test(t[3])) h += 12;
      jsonld.eventSchedule.startTime = `${String(h).padStart(2, "0")}:${t[2] || "00"}`;
    }
    delete jsonld.eventSchedule.scheduleTimezone;
  }
  Object.keys(jsonld).forEach((k) => jsonld[k] === undefined && delete jsonld[k]);

  return head({ title: `${r.name} — group ride in ${placeText(r)}`, description, canonical: url, jsonld, ogType: "article" }) + `
<main class="fn-post gr-ride">
  <article class="fn-article">
    <p class="fn-meta">
      <span class="fn-chip place"><a href="/rides/${r.state.toLowerCase()}/">${esc(STATE_NAMES[r.state] || r.state)}</a></span>
      <span class="dot">·</span>
      <span>${esc(disc)}</span>
      <span class="dot">·</span>
      <span>Checked ${esc(r.verified_on || TODAY)}</span>
    </p>

    <h1>${esc(r.name)}</h1>
    <p class="gr-place">${esc(placeText(r))}${r.neighborhood ? ` · ${esc(r.neighborhood)}` : ""}</p>
    ${tags ? `<p class="gr-tags">${tags}</p>` : ""}

    <p class="fn-lede">${esc(lede)}</p>

    <dl class="gr-facts">
        ${factsHtml}
    </dl>

    <div class="fn-body">
      <h2>About the ${esc(r.name)} group ride</h2>
      ${(r.description || "").split(/\n+/).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join("\n      ") || "<p>Details are on the host's page below.</p>"}
      ${r.drop_policy === "no-drop" ? `<p>It's a no-drop ride. If you're slower than the group, someone waits. That's the whole point of a group ride.</p>` : ""}
    </div>

    <div class="gr-links">
      <h2>Where to find them</h2>
      <div class="fn-cta-row">
        ${linkBtns}
      </div>
    </div>

    <p class="fn-note gr-verify">
      Last checked ${esc(r.verified_on || TODAY)} against ${r.sources.length ? r.sources.map((s, i) => `<a href="${attr(s)}" rel="noopener nofollow">source ${i + 1}</a>`).join(", ") : "the links above"}.
      Schedules change. Confirm with the host before you go. Wrong or gone?
      <a href="https://www.instagram.com/cycl_eforchange/">Tell us</a>.
    </p>
  </article>

  <nav class="fn-related" aria-label="Nearby group rides">
    <h2>Nearby rides</h2>
    ${nearby.map(({ o, d }) => `<a href="/rides/${o.slug}/">${esc(o.name)} <small>· ${esc(placeText(o))} · ${Math.round(d)} mi</small></a>`).join("\n    ")}
    <a href="/rides/${r.state.toLowerCase()}/">All rides in ${esc(STATE_NAMES[r.state] || r.state)} →</a>
  </nav>

${CTA}

  <p class="fn-back"><a href="/rides/">← Find another group ride</a></p>
</main>
` + foot();
}

// ---------- sitemap ----------
function sitemap(rides, states) {
  const urls = [`${SITE}/rides/`, ...states.map((s) => `${SITE}/rides/${s.toLowerCase()}/`), ...rides.map((r) => `${SITE}/rides/${r.slug}/`)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq></url>`).join("\n")}
</urlset>
`;
}

// ---------- main ----------
function main() {
  const rides = load();
  const states = [...new Set(rides.map((r) => r.state))].sort();

  // wipe generated folders (anything under /rides/ except the data + js)
  for (const ent of fs.readdirSync(OUT, { withFileTypes: true })) {
    if (ent.isDirectory()) rmrf(path.join(OUT, ent.name));
  }
  write(path.join(OUT, "index.html"), directory(rides));
  for (const st of states) write(path.join(OUT, st.toLowerCase(), "index.html"), statePage(st, rides.filter((r) => r.state === st)));
  for (const r of rides) write(path.join(OUT, r.slug, "index.html"), ridePage(r, rides));
  write(path.join(OUT, "sitemap.xml"), sitemap(rides, states));
  console.log(`built ${rides.length} ride pages, ${states.length} state pages, 1 directory → cfc-site/rides/`);
}
main();
