#!/usr/bin/env node
/* Cycle for Change — events directory generator.
   Reads data/events/*.json and data/towns/*.json and writes static HTML into
   cfc-site/. No dependencies, no framework. Output is committed; Netlify just
   serves the files.

   Run:   node scripts/build-events.js
   Docs:  data/SCHEMA.md

   URLs it produces:
     /events/                          index (upcoming + by state)
     /events/<slug>/                   one page per event
     /events/state/<state>/            events + towns in a state
     /towns/                           town index
     /towns/<state>/<town>/            town page (weather, events, resources)
     /towns/<state>/<town>/hotels/
     /towns/<state>/<town>/restaurants/
     /towns/<state>/<town>/bike-shops/
     /events/events.json               machine-readable feed
     /sitemap-events.xml               sitemap for everything above (listed in /sitemap.xml)
*/
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data");
const OUT = path.join(ROOT, "cfc-site");
const SITE = "https://cycleforchange.org";
const TODAY = new Date().toISOString().slice(0, 10);
// No forms on these pages. Every call to action is a plain link.
const INSTAGRAM = "https://www.instagram.com/cycl_eforchange/";

// ——— guardrails from CLAUDE.md ———————————————————————————————————————
const BANNED = [
  /\bleverage\b/i, /\bsynergy\b/i, /\bjourney\b/i, /passionate about/i,
  /thrilled to announce/i, /excited to share/i, /\$800/, /two suitcases/i,
  /\bPrescott\b/, /est\.? 2008/i, /years? sober\b/i, /sober since/i,
  /\brelapse/i, /7,?500[- ]mile/i,
];

function lint(where, text) {
  if (typeof text !== "string") return;
  for (const re of BANNED) {
    if (re.test(text)) throw new Error(`Banned phrase ${re} in ${where}: "${text.slice(0, 80)}"`);
  }
}
function lintDeep(where, v) {
  if (typeof v === "string") lint(where, v);
  else if (Array.isArray(v)) v.forEach((x, i) => lintDeep(`${where}[${i}]`, x));
  else if (v && typeof v === "object") Object.keys(v).forEach((k) => lintDeep(`${where}.${k}`, v[k]));
}

// ——— helpers —————————————————————————————————————————————————————————————
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const attr = esc;
const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const jsonld = (obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/<\//g, "<\\/")}\n</script>`;
const domain = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };
const paras = (arr, cls) => (arr || []).map((p) => `<p${cls ? ` class="${cls}"` : ""}>${esc(p)}</p>`).join("\n");
const truncate = (s, n) => { s = String(s || "").trim(); return s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…"; };

function fmtDate(iso, opts) {
  if (!iso) return null;
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("en-US", Object.assign({ timeZone: "UTC", weekday: "long", year: "numeric", month: "long", day: "numeric" }, opts || {}));
}
function fmtRange(a, b) {
  if (!a) return null;
  if (!b || b === a) return fmtDate(a);
  const da = new Date(a + "T12:00:00Z"), db = new Date(b + "T12:00:00Z");
  if (da.getUTCMonth() === db.getUTCMonth()) {
    return `${da.toLocaleDateString("en-US", { timeZone: "UTC", month: "long", day: "numeric" })}–${db.getUTCDate()}, ${db.getUTCFullYear()}`;
  }
  return `${fmtDate(a, { weekday: undefined })} – ${fmtDate(b, { weekday: undefined })}`;
}
function haversineMi(a, b) {
  const R = 3958.8, toR = (x) => (x * Math.PI) / 180;
  const dLat = toR(b.lat - a.lat), dLon = toR(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
const TYPE_LABEL = { road: "Road", gravel: "Gravel", mtb: "Mountain bike", tour: "Tour", hillclimb: "Hill climb", charity: "Charity ride", "multi-day": "Multi-day" };

function readDir(dir) {
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => {
    const p = path.join(dir, f);
    try { return JSON.parse(fs.readFileSync(p, "utf8")); }
    catch (e) { throw new Error(`Bad JSON in ${p}: ${e.message}`); }
  });
}
function write(rel, html) {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
  return rel;
}

// ——— load + validate ————————————————————————————————————————————————————
const towns = readDir(path.join(DATA, "towns"));
const events = readDir(path.join(DATA, "events"));
const townById = Object.fromEntries(towns.map((t) => [t.id, t]));

for (const t of towns) {
  for (const k of ["id", "name", "state", "state_code", "lat", "lon", "timezone", "summary"]) {
    if (t[k] == null) throw new Error(`Town ${t.id || "?"} missing ${k}`);
  }
  t.state_slug = slugify(t.state);
  t.slug = slugify(t.name);
  t.url = `/towns/${t.state_slug}/${t.slug}/`;
  t.events = [];
  lintDeep(`towns/${t.id}`, t);
}
for (const e of events) {
  for (const k of ["slug", "name", "type", "town", "website", "summary"]) {
    if (e[k] == null) throw new Error(`Event ${e.slug || "?"} missing ${k}`);
  }
  lintDeep(`events/${e.slug}`, e); // before refs are wired (they are circular)
  const t = townById[e.town];
  if (!t) throw new Error(`Event ${e.slug} references unknown town ${e.town}`);
  e.townRef = t;
  e.url = `/events/${e.slug}/`;
  e.lat = e.start_lat != null ? e.start_lat : t.lat;
  e.lon = e.start_lon != null ? e.start_lon : t.lon;
  t.events.push(e);
}

const states = {};
for (const t of towns) {
  const s = (states[t.state_slug] ||= { name: t.state, code: t.state_code, slug: t.state_slug, towns: [], events: [] });
  s.towns.push(t);
  s.events.push(...t.events);
}
const stateList = Object.values(states).sort((a, b) => a.name.localeCompare(b.name));
const byDate = (a, b) => (a.next_date || "9999").localeCompare(b.next_date || "9999") || a.name.localeCompare(b.name);
events.sort(byDate);
for (const s of stateList) { s.events.sort(byDate); s.towns.sort((a, b) => a.name.localeCompare(b.name)); }

// ——— shared chrome ————————————————————————————————————————————————————————
const MARK = `<svg class="mark-glyph" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path d="M98.45 71.03 A40 40 0 0 1 50.32 98.81" fill="none" stroke="#2A2E28" stroke-width="12" stroke-linecap="round"/>
      <path d="M31.23 87.79 A40 40 0 0 1 31.23 32.21" fill="none" stroke="#5C6B4A" stroke-width="12" stroke-linecap="round"/>
      <path d="M50.32 21.19 A40 40 0 0 1 98.45 48.97" fill="none" stroke="#C4B7A2" stroke-width="12" stroke-linecap="round"/>
      <circle cx="60" cy="60" r="6" fill="#2A2E28"/>
    </svg>`;

function head({ title, description, url, ld, ogType }) {
  return `<!DOCTYPE html>
<!-- Generated by scripts/build-events.js from data/. Edit the JSON, not this file. -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${esc(title)}</title>
  <meta name="description" content="${attr(description)}">
  <link rel="canonical" href="${SITE}${url}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta property="og:type" content="${ogType || "website"}">
  <meta property="og:site_name" content="Cycle for Change">
  <meta property="og:url" content="${SITE}${url}">
  <meta property="og:title" content="${attr(title)}">
  <meta property="og:description" content="${attr(description)}">
  <meta property="og:image" content="${SITE}/og-cfc.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${attr(title)}">
  <meta name="twitter:description" content="${attr(description)}">
  <meta name="twitter:image" content="${SITE}/og-cfc.png">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/favicon-180.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=Space+Grotesk:wght@400;500&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/events/events.css">
${ld.map(jsonld).join("\n")}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-head">
  <div class="wrap">
    <a class="mark" href="/" aria-label="Cycle for Change home">
      ${MARK}
      <span class="wordmark">Cycle <span class="for">For</span> Change</span>
    </a>
    <nav class="site-nav" aria-label="Primary">
      <a href="/rides/">Rides</a>
      <a href="/events/">Events</a>
      <a href="/towns/">Towns</a>
      <a href="/" class="btn btn-solid">The 10000</a>
    </nav>
  </div>
  <p class="tally-line wrap"><span class="tally-num" data-cur>—</span>&nbsp;miles since June 1 &middot; 10000 in 2027 &middot; all on the bike</p>
</header>
<main id="main" class="wrap">
`;
}

function foot() {
  return `
  <section class="pledge" aria-label="The pledge">
    <p class="pledge-num">10000</p>
    <p class="pledge-line">I do the miles. You decide who they&rsquo;re for.</p>
    <p>This directory is part of Cycle for Change. In 2027 I ride 10,000 miles, all on the bike, every one of them for queer communities. You pick where the money goes. It starts January 1.</p>
    <p class="pledge-links"><a class="btn btn-solid" href="/">See the project</a> <a class="btn" href="${INSTAGRAM}" rel="noopener">Follow on Instagram</a></p>
  </section>
</main>
<footer class="site-foot">
  <div class="wrap">
    <p><span>Cycle for Change&trade;</span><span>every mile for queer communities</span></p>
    <p class="foot-links"><a href="/rides/">Rides</a> <a href="/events/">Events</a> <a href="/towns/">Towns</a> <a href="/">Home</a></p>
  </div>
</footer>
<script src="/events/events.js" defer></script>
</body>
</html>
`;
}

function breadcrumb(items) {
  const html = `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map((it, i) =>
    `<li>${i < items.length - 1 ? `<a href="${it.url}">${esc(it.name)}</a>` : `<span aria-current="page">${esc(it.name)}</span>`}</li>`
  ).join("")}</ol></nav>`;
  const ld = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: SITE + it.url })),
  };
  return { html, ld };
}

function weatherBlock(place, opts) {
  const o = opts || {};
  return `
  <section class="weather" id="weather" aria-labelledby="weather-h">
    <h2 id="weather-h">${esc(o.heading || `Weather in ${place.name}`)}</h2>
    ${o.note ? `<p class="weather-note">${esc(o.note)}</p>` : ""}
    <div class="wx" data-weather data-lat="${place.lat}" data-lon="${place.lon}" data-tz="${attr(place.timezone)}"${o.date ? ` data-event-date="${o.date}"` : ""}${o.endDate ? ` data-event-end="${o.endDate}"` : ""} aria-live="polite">
      <p class="wx-status">Loading the forecast for ${esc(place.name)}&hellip;</p>
    </div>
    <p class="wx-credit">Live forecast from <a href="https://open-meteo.com/" rel="noopener">Open-Meteo</a>. Times are local to ${esc(place.name)}.</p>
  </section>`;
}

function facts(rows) {
  return `<dl class="facts">${rows.filter((r) => r[1]).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
}

function eventCard(e, opts) {
  const o = opts || {};
  const t = e.townRef;
  const when = e.next_date ? fmtRange(e.next_date, e.end_date) : (e.typical_timing || "Date to be announced");
  return `<li class="card">
    <p class="card-eyebrow">${esc(TYPE_LABEL[e.type] || e.type)} &middot; ${esc(when)}</p>
    <h3><a href="${e.url}">${esc(e.name)}</a></h3>
    <p>${esc(t.name)}, ${esc(t.state_code)}${o.distance != null ? ` &middot; ${Math.round(o.distance)} mi away` : ""}${e.distances && e.distances.length ? ` &middot; ${esc(e.distances.map((d) => d.label).join(" / "))}` : ""}</p>
  </li>`;
}

function sourcesList(srcs) {
  if (!srcs || !srcs.length) return "";
  return `<section class="sources"><h2>Sources</h2><ul>${srcs.map((u) => `<li><a href="${attr(u)}" rel="noopener nofollow">${esc(domain(u))}</a> <span class="src-url">${esc(u)}</span></li>`).join("")}</ul></section>`;
}

// ——— event page ————————————————————————————————————————————————————————
function eventPage(e) {
  const t = e.townRef;
  const when = e.next_date ? fmtRange(e.next_date, e.end_date) : null;
  const title = `${e.name} — ${t.name}, ${t.state_code}: ${e.next_date ? fmtDate(e.next_date, { weekday: undefined }) : e.typical_timing || "dates"}, routes, sign-up`;
  const description = truncate(e.summary, 155);
  const crumbs = breadcrumb([{ name: "Events", url: "/events/" }, { name: t.state, url: `/events/state/${t.state_slug}/` }, { name: e.name, url: e.url }]);

  const ld = {
    "@context": "https://schema.org",
    "@type": ["Event", "SportsEvent"],
    name: e.name,
    alternateName: e.short_name && e.short_name !== e.name ? e.short_name : undefined,
    description: e.summary,
    sport: "Cycling",
    url: SITE + e.url,
    sameAs: e.website,
    startDate: e.next_date || undefined,
    endDate: e.end_date || e.next_date || undefined,
    eventStatus: e.status === "on-hold" ? "https://schema.org/EventPostponed" : e.status === "cancelled" ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: e.start_location || `${t.name}, ${t.state_code}`,
      address: { "@type": "PostalAddress", addressLocality: t.name, addressRegion: t.state_code, addressCountry: "US" },
      geo: { "@type": "GeoCoordinates", latitude: e.lat, longitude: e.lon },
    },
    organizer: e.organizer && e.organizer.name ? { "@type": "Organization", name: e.organizer.name, url: e.organizer.url || undefined } : undefined,
    offers: e.register_url ? { "@type": "Offer", url: e.register_url, availability: "https://schema.org/InStock", price: undefined, priceCurrency: "USD" } : undefined,
    image: SITE + "/og-cfc.png",
  };
  const faqLd = e.faq && e.faq.length ? {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: e.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } : null;
  const pageLd = {
    "@context": "https://schema.org", "@type": "WebPage",
    url: SITE + e.url, name: title, description,
    dateModified: e.verified || TODAY,
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".lede", ".facts"] },
    publisher: { "@type": "Organization", name: "Cycle for Change", url: SITE + "/" },
    author: { "@type": "Person", name: "Robert Castan" },
  };

  const nearby = events.filter((x) => x !== e).map((x) => ({ e: x, d: haversineMi(e, x) })).sort((a, b) => a.d - b.d).slice(0, 3);

  const body = `
  ${crumbs.html}
  <article class="event">
    <p class="eyebrow">${esc(TYPE_LABEL[e.type] || e.type)} &middot; <a href="${t.url}">${esc(t.name)}, ${esc(t.state)}</a>${e.founded ? ` &middot; since ${e.founded}` : ""}</p>
    <h1>${esc(e.name)}</h1>
    ${when ? `<p class="date-line"><time datetime="${e.next_date}">${esc(when)}</time><span class="countdown" data-countdown="${e.next_date}"></span></p>` : `<p class="date-line">${esc(e.date_note || e.typical_timing || "Next date to be announced")}</p>`}
    ${e.date_note && when ? `<p class="date-note">${esc(e.date_note)}</p>` : ""}
    ${e.status === "on-hold" ? `<p class="status-flag">On hold. Check the organizer before planning around this one.</p>` : e.status === "cancelled" ? `<p class="status-flag">Cancelled by the organizer.</p>` : ""}

    <h2 class="visually-hidden">What is the ${esc(e.name)}?</h2>
    <p class="lede">${esc(e.summary)}</p>

    <div class="signup">
      ${e.register_url ? `<a class="btn btn-solid btn-lg" href="${attr(e.register_url)}" rel="noopener">Sign up for ${esc(e.short_name || e.name)}</a>` : ""}
      <a class="btn" href="${attr(e.website)}" rel="noopener">Official site (${esc(domain(e.website))})</a>
      ${e.registration_note ? `<p class="signup-note">${esc(e.registration_note)}</p>` : ""}
    </div>

    ${facts([
      ["Next edition", when ? `<time datetime="${e.next_date}">${esc(when)}</time>` : esc(e.typical_timing || "TBA")],
      ["Usually", e.typical_timing ? esc(e.typical_timing) : null],
      ["Start", `${e.start_location ? esc(e.start_location) + "<br>" : ""}<a href="${t.url}">${esc(t.name)}, ${esc(t.state)}</a>`],
      ["Distances", e.distances && e.distances.length ? `<ul class="dist">${e.distances.map((d) => `<li><b>${esc(d.label)}</b>${d.note ? ` — ${esc(d.note)}` : ""}</li>`).join("")}</ul>` : null],
      ["Terrain", e.terrain ? esc(e.terrain) : null],
      ["Climbing", e.elevation_gain_ft ? `${Number(e.elevation_gain_ft).toLocaleString("en-US")} ft on the longest route` : null],
      ["Riders", e.participants ? esc(e.participants) : null],
      ["Cost", e.cost ? esc(e.cost) : null],
      ["Founded", e.founded ? `${e.founded}${e.founded_by ? ` by ${esc(e.founded_by)}` : ""}` : null],
      ["Organizer", e.organizer && e.organizer.name ? (e.organizer.url ? `<a href="${attr(e.organizer.url)}" rel="noopener">${esc(e.organizer.name)}</a>` : esc(e.organizer.name)) : null],
    ])}

    ${e.history && e.history.length ? `<section><h2>How the ${esc(e.name)} started</h2>${paras(e.history)}</section>` : ""}
    ${e.what_to_expect && e.what_to_expect.length ? `<section><h2>What to expect on the day</h2>${paras(e.what_to_expect)}</section>` : ""}

    ${weatherBlock(t, { heading: `Weather in ${t.name} for the ${e.name}`, note: e.weather_note, date: e.next_date, endDate: e.end_date })}

    <section class="town-box" aria-labelledby="town-h">
      <h2 id="town-h">Getting to ${esc(t.name)}</h2>
      <p>${esc(t.summary)}</p>
      ${t.getting_there ? `<p>${esc(t.getting_there)}</p>` : ""}
      <ul class="res-links">
        <li><a href="${t.url}">About ${esc(t.name)}</a></li>
        <li><a href="${t.url}hotels/">Where to stay in ${esc(t.name)}</a>${t.hotels ? ` <span class="count">${t.hotels.length}</span>` : ""}</li>
        <li><a href="${t.url}restaurants/">Where to eat in ${esc(t.name)}</a>${t.restaurants ? ` <span class="count">${t.restaurants.length}</span>` : ""}</li>
        <li><a href="${t.url}bike-shops/">Bike shops and repairs in ${esc(t.name)}</a>${t.bike_shops ? ` <span class="count">${t.bike_shops.length}</span>` : ""}</li>
      </ul>
    </section>

    ${e.faq && e.faq.length ? `<section class="faq"><h2>${esc(e.name)} FAQ</h2>${e.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</section>` : ""}

    ${sourcesList(e.sources)}
    <p class="verified">Facts checked ${esc(fmtDate(e.verified || TODAY, { weekday: undefined }))}. Dates and prices come from the organizer and change. Confirm on the official site before you book anything.</p>
  </article>

  ${nearby.length ? `<section class="related"><h2>Nearby events</h2><ul class="cards">${nearby.map((n) => eventCard(n.e, { distance: n.d })).join("")}</ul></section>` : ""}
  <p class="back"><a href="/events/">All events</a> &middot; <a href="/events/state/${t.state_slug}/">Events in ${esc(t.state)}</a></p>
`;
  const lds = [ld, crumbs.ld, pageLd].concat(faqLd ? [faqLd] : []).map(stripUndef);
  return head({ title, description, url: e.url, ld: lds, ogType: "article" }) + body + foot();
}

function stripUndef(o) { return JSON.parse(JSON.stringify(o)); }

// ——— town page + resource pages ————————————————————————————————————————
function townPage(t) {
  const title = `${t.name}, ${t.state_code} for cyclists — bike events, weather, where to stay, bike shops`;
  const description = truncate(t.summary, 155);
  const crumbs = breadcrumb([{ name: "Towns", url: "/towns/" }, { name: t.state, url: `/events/state/${t.state_slug}/` }, { name: t.name, url: t.url }]);
  const ld = stripUndef({
    "@context": "https://schema.org", "@type": "City",
    name: t.name, url: SITE + t.url, sameAs: t.official_url || undefined, description: t.summary,
    address: { "@type": "PostalAddress", addressLocality: t.name, addressRegion: t.state_code, addressCountry: "US" },
    geo: { "@type": "GeoCoordinates", latitude: t.lat, longitude: t.lon },
    containedInPlace: { "@type": "State", name: t.state },
    event: t.events.map((e) => ({ "@type": "SportsEvent", name: e.name, url: SITE + e.url, startDate: e.next_date || undefined })),
  });
  const pageLd = {
    "@context": "https://schema.org", "@type": "WebPage", url: SITE + t.url, name: title, description,
    dateModified: t.verified || TODAY,
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".lede"] },
    publisher: { "@type": "Organization", name: "Cycle for Change", url: SITE + "/" },
  };
  const body = `
  ${crumbs.html}
  <article class="town">
    <p class="eyebrow">${esc(t.county ? t.county + " · " : "")}${esc(t.state)}${t.elevation_ft ? ` · ${Number(t.elevation_ft).toLocaleString("en-US")} ft` : ""}</p>
    <h1>${esc(t.name)}, ${esc(t.state)}</h1>
    <h2 class="visually-hidden">Cycling in ${esc(t.name)}</h2>
    <p class="lede">${esc(t.summary)}</p>

    ${facts([
      ["Population", t.population ? esc(t.population) : null],
      ["Nearest airport", t.nearest_airport ? `${esc(t.nearest_airport.name)}${t.nearest_airport.code ? ` (${esc(t.nearest_airport.code)})` : ""}${t.nearest_airport.miles ? `, ${t.nearest_airport.miles} mi` : ""}` : null],
      ["Major airport", t.major_airport && (!t.nearest_airport || t.major_airport.code !== t.nearest_airport.code) ? `${esc(t.major_airport.name)}${t.major_airport.code ? ` (${esc(t.major_airport.code)})` : ""}${t.major_airport.miles ? `, ${t.major_airport.miles} mi` : ""}` : null],
      ["Time zone", esc(t.timezone.replace(/_/g, " "))],
      ["Official site", t.official_url ? `<a href="${attr(t.official_url)}" rel="noopener">${esc(domain(t.official_url))}</a>` : null],
      ["Visitor info", t.visitor_url ? `<a href="${attr(t.visitor_url)}" rel="noopener">${esc(domain(t.visitor_url))}</a>` : null],
    ])}

    <section class="res-grid" aria-label="Travel resources">
      <a class="res-card" href="${t.url}hotels/"><span class="res-k">Stay</span><b>Hotels in ${esc(t.name)}</b><span>${t.hotels ? t.hotels.length : 0} places, picked for riders</span></a>
      <a class="res-card" href="${t.url}restaurants/"><span class="res-k">Eat</span><b>Restaurants in ${esc(t.name)}</b><span>${t.restaurants ? t.restaurants.length : 0} places for the night before and after</span></a>
      <a class="res-card" href="${t.url}bike-shops/"><span class="res-k">Fix</span><b>Bike shops in ${esc(t.name)}</b><span>${t.bike_shops ? t.bike_shops.length : 0} shops for repairs, parts, rentals</span></a>
    </section>

    <section><h2>Bike events in ${esc(t.name)}</h2>
      ${t.events.length ? `<ul class="cards">${t.events.map((e) => eventCard(e)).join("")}</ul>` : `<p>No events listed here yet.</p>`}
    </section>

    ${t.about && t.about.length ? `<section><h2>About ${esc(t.name)}</h2>${paras(t.about)}</section>` : ""}
    ${t.riding && t.riding.length ? `<section><h2>Riding in ${esc(t.name)}</h2>${paras(t.riding)}</section>` : ""}
    ${t.getting_there ? `<section><h2>Getting to ${esc(t.name)}</h2><p>${esc(t.getting_there)}</p></section>` : ""}

    ${weatherBlock(t)}
    ${sourcesList(t.sources)}
    <p class="verified">Checked ${esc(fmtDate(t.verified || TODAY, { weekday: undefined }))}. Businesses open and close. Call before you count on anyone.</p>
  </article>
  <p class="back"><a href="/towns/">All towns</a> &middot; <a href="/events/state/${t.state_slug}/">${esc(t.state)}</a></p>
`;
  return head({ title, description, url: t.url, ld: [ld, crumbs.ld, pageLd] }) + body + foot();
}

const RESOURCE = {
  hotels: { key: "hotels", seg: "hotels", h: (t) => `Hotels in ${t.name} for cyclists`, title: (t) => `Hotels in ${t.name}, ${t.state_code} for cyclists — where to stay for bike events`, type: "LodgingBusiness", verb: "stay", intro: (t) => `Places to stay in ${t.name} when you are in town to ride. Picked for being near the start, easy with a bike, or cheap. Book early for event weekends. Rooms go first.` },
  restaurants: { key: "restaurants", seg: "restaurants", h: (t) => `Restaurants in ${t.name} for cyclists`, title: (t) => `Restaurants in ${t.name}, ${t.state_code} — where to eat before and after a ride`, type: "Restaurant", verb: "eat", intro: (t) => `Where to eat in ${t.name} the night before a ride and the afternoon after. Nothing fancy. Real food, real portions, places that are open when you need them.` },
  "bike-shops": { key: "bike_shops", seg: "bike-shops", h: (t) => `Bike shops in ${t.name}: repairs, parts, rentals`, title: (t) => `Bike shops in ${t.name}, ${t.state_code} — bike repair, parts and rentals near the event`, type: "BikeStore", verb: "fix", intro: (t) => `Bike shops in ${t.name} that do repairs. If something breaks in transit or the night before, start here. Call ahead on event weekends. Mechanics get slammed.` },
};

function resourcePage(t, r) {
  const items = t[r.key] || [];
  const url = `${t.url}${r.seg}/`;
  const title = r.title(t);
  const description = truncate(`${r.intro(t)} ${items.length} listed.`, 155);
  const crumbs = breadcrumb([{ name: "Towns", url: "/towns/" }, { name: t.name, url: t.url }, { name: r.h(t), url }]);
  const ld = stripUndef({
    "@context": "https://schema.org", "@type": "ItemList", name: r.h(t), url: SITE + url, numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1,
      item: {
        "@type": r.type, name: it.name, url: it.url || undefined, telephone: it.phone || undefined,
        address: it.address ? { "@type": "PostalAddress", streetAddress: it.address, addressLocality: t.name, addressRegion: t.state_code, addressCountry: "US" } : undefined,
        servesCuisine: it.cuisine || undefined, priceRange: it.price_hint || undefined,
      },
    })),
  });
  const body = `
  ${crumbs.html}
  <article class="resource">
    <p class="eyebrow"><a href="${t.url}">${esc(t.name)}, ${esc(t.state)}</a> &middot; ${esc(r.verb)}</p>
    <h1>${esc(r.h(t))}</h1>
    <p class="lede">${esc(r.intro(t))}</p>
    ${t.events.length ? `<p class="for-events">For: ${t.events.map((e) => `<a href="${e.url}">${esc(e.name)}</a>`).join(", ")}.</p>` : ""}
    <h2 class="visually-hidden">${esc(r.h(t))}, listed</h2>
    ${items.length ? `<ol class="places">${items.map((it) => `<li class="place">
        <h3>${it.url ? `<a href="${attr(it.url)}" rel="noopener">${esc(it.name)}</a>` : esc(it.name)}</h3>
        <p class="place-meta">${[it.cuisine, it.price_hint, it.address, it.phone].filter(Boolean).map(esc).join(" &middot; ")}</p>
        ${it.services && it.services.length ? `<p class="place-tags">${it.services.map((s) => `<span>${esc(s)}</span>`).join("")}</p>` : ""}
        ${it.note ? `<p>${esc(it.note)}</p>` : ""}
      </li>`).join("")}</ol>` : `<p>Nothing listed yet for ${esc(t.name)}. Check the <a href="${attr(t.visitor_url || t.official_url || "#")}" rel="noopener">local visitor site</a>.</p>`}
    <nav class="res-links-row" aria-label="Other resources">
      ${Object.values(RESOURCE).filter((x) => x.seg !== r.seg).map((x) => `<a href="${t.url}${x.seg}/">${esc(x.h(t))}</a>`).join("")}
    </nav>
    <p class="verified">Checked ${esc(fmtDate(t.verified || TODAY, { weekday: undefined }))}. No paid placements. If a place has closed or should be here, <a href="${INSTAGRAM}" rel="noopener">message us on Instagram</a>.</p>
  </article>
  <p class="back"><a href="${t.url}">Back to ${esc(t.name)}</a></p>
`;
  return head({ title, description, url, ld: [ld, crumbs.ld] }) + body + foot();
}

// ——— indexes ————————————————————————————————————————————————————————————
function eventsIndex() {
  const url = "/events/";
  const title = "US cycling events directory — dates, routes, sign-up, weather, where to stay";
  const description = `Every bike event we have checked, state by state: ${events.length} rides in ${stateList.length} states. Dates, distances, how each one started, the sign-up link, live weather, and a page for the town.`;
  const upcoming = events.filter((e) => e.next_date && e.next_date >= TODAY).slice(0, 12);
  const ld = {
    "@context": "https://schema.org", "@type": "ItemList", name: "US cycling events", url: SITE + url, numberOfItems: events.length,
    itemListElement: events.map((e, i) => ({ "@type": "ListItem", position: i + 1, url: SITE + e.url, name: e.name })),
  };
  const body = `
  <article class="index">
    <p class="eyebrow">${events.length} events &middot; ${stateList.length} states &middot; updated ${esc(fmtDate(TODAY, { weekday: undefined }))}</p>
    <h1>US cycling events directory</h1>
    <p class="lede">Bike events across the United States, one page each. Where it is, when it runs, how it started, how to sign up, what the weather is doing, and where to sleep, eat and get your bike fixed once you are there.</p>

    <section><h2>Coming up</h2>
      ${upcoming.length ? `<ul class="cards">${upcoming.map((e) => eventCard(e)).join("")}</ul>` : `<p>Dates for the next editions are still being announced. Browse by state below.</p>`}
    </section>

    <section class="by-state"><h2>Cycling events by state</h2>
      ${stateList.map((s) => `<h3 id="${s.slug}"><a href="/events/state/${s.slug}/">${esc(s.name)}</a> <span class="count">${s.events.length}</span></h3>
      <ul class="rows">${s.events.map((e) => `<li><span class="row-date">${e.next_date ? `<time datetime="${e.next_date}">${esc(fmtDate(e.next_date, { weekday: "short", month: "short" }))}</time>` : esc(e.typical_timing || "TBA")}</span><a href="${e.url}">${esc(e.name)}</a><span class="row-meta">${esc(e.townRef.name)} &middot; ${esc(TYPE_LABEL[e.type] || e.type)}</span></li>`).join("")}</ul>`).join("")}
    </section>

    <section><h2>How this directory works</h2>
      <p>Each event page is checked against the organizer's site and lists its sources. Dates and prices change, so the sign-up link always goes to the organizer. Weather is a live forecast for the host town. Town pages list hotels, restaurants and bike shops we could confirm are open. Nothing here is paid placement.</p>
      <p>Missing an event? <a href="${INSTAGRAM}" rel="noopener">Message us on Instagram</a> and we will add it.</p>
    </section>
  </article>
`;
  return head({ title, description, url, ld: [ld] }) + body + foot();
}

function statePage(s) {
  const url = `/events/state/${s.slug}/`;
  const title = `Cycling events in ${s.name} — bike rides, races and tours with dates and sign-up`;
  const description = truncate(`${s.events.length} cycling events in ${s.name}: ${s.events.map((e) => e.name).join(", ")}. Dates, distances, sign-up links, weather and town guides.`, 155);
  const crumbs = breadcrumb([{ name: "Events", url: "/events/" }, { name: s.name, url }]);
  const ld = { "@context": "https://schema.org", "@type": "ItemList", name: `Cycling events in ${s.name}`, url: SITE + url, numberOfItems: s.events.length, itemListElement: s.events.map((e, i) => ({ "@type": "ListItem", position: i + 1, url: SITE + e.url, name: e.name })) };
  const body = `
  ${crumbs.html}
  <article class="index">
    <p class="eyebrow">${s.events.length} events &middot; ${s.towns.length} towns</p>
    <h1>Cycling events in ${esc(s.name)}</h1>
    <p class="lede">${esc(s.events.length)} bike events in ${esc(s.name)} with a page each: ${esc(s.events.map((e) => e.name).join(", "))}. Every page has the date, the routes, the sign-up link, live weather and a guide to the host town.</p>
    <section><h2>Bike events in ${esc(s.name)}</h2><ul class="cards">${s.events.map((e) => eventCard(e)).join("")}</ul></section>
    <section><h2>Towns in ${esc(s.name)} that host rides</h2><ul class="rows">${s.towns.map((t) => `<li><a href="${t.url}">${esc(t.name)}</a><span class="row-meta">${t.events.length} event${t.events.length === 1 ? "" : "s"}</span></li>`).join("")}</ul></section>
  </article>
  <p class="back"><a href="/events/">All events</a></p>
`;
  return head({ title, description, url, ld: [ld, crumbs.ld] }) + body + foot();
}

function townsIndex() {
  const url = "/towns/";
  const title = "Bike event towns — travel guides for cyclists: hotels, food, bike shops, weather";
  const description = `Town guides for ${towns.length} places that host bike events. Where to stay, where to eat, who can fix your bike, and what the weather is doing.`;
  const body = `
  <article class="index">
    <p class="eyebrow">${towns.length} towns &middot; ${stateList.length} states</p>
    <h1>Bike event towns</h1>
    <p class="lede">A guide for every town that hosts a ride in the directory. Each one has live weather, the events held there, and pages for hotels, restaurants and bike shops we could confirm.</p>
    <section class="by-state"><h2>Towns by state</h2>
    ${stateList.map((s) => `<h3><a href="/events/state/${s.slug}/">${esc(s.name)}</a></h3><ul class="rows">${s.towns.map((t) => `<li><a href="${t.url}">${esc(t.name)}</a><span class="row-meta">${esc(t.events.map((e) => e.name).join(", "))}</span></li>`).join("")}</ul>`).join("")}
    </section>
  </article>
`;
  return head({ title, description, url, ld: [] }) + body + foot();
}

// ——— build ————————————————————————————————————————————————————————————————
// Clear stale output first. Everything under events/ and towns/ is generated
// except events.css and events.js.
const KEEP = new Set(["events.css", "events.js"]);
const evDir = path.join(OUT, "events");
if (fs.existsSync(evDir)) for (const f of fs.readdirSync(evDir)) if (!KEEP.has(f)) fs.rmSync(path.join(evDir, f), { recursive: true, force: true });
fs.rmSync(path.join(OUT, "towns"), { recursive: true, force: true });

const written = [];
written.push(write("events/index.html", eventsIndex()));
written.push(write("towns/index.html", townsIndex()));
for (const s of stateList) written.push(write(`events/state/${s.slug}/index.html`, statePage(s)));
for (const e of events) written.push(write(`events/${e.slug}/index.html`, eventPage(e)));
for (const t of towns) {
  written.push(write(`${t.url.slice(1)}index.html`, townPage(t)));
  for (const r of Object.values(RESOURCE)) written.push(write(`${t.url.slice(1)}${r.seg}/index.html`, resourcePage(t, r)));
}

// machine-readable feed
write("events/events.json", JSON.stringify({
  generated: TODAY, source: SITE + "/events/",
  events: events.map((e) => ({ name: e.name, url: SITE + e.url, type: e.type, town: e.townRef.name, state: e.townRef.state_code, next_date: e.next_date, end_date: e.end_date, distances: (e.distances || []).map((d) => d.label), website: e.website, register_url: e.register_url, lat: e.lat, lon: e.lon })),
}, null, 2));

// sitemap
const urls = written.map((rel) => "/" + rel.replace(/index\.html$/, ""));
write("sitemap-events.xml", `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/build-events.js. Listed in the sitemap index at /sitemap.xml. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${TODAY}</lastmod><changefreq>${u === "/events/" ? "weekly" : "monthly"}</changefreq><priority>${u.split("/").length <= 3 ? "0.8" : "0.6"}</priority></url>`).join("\n")}
</urlset>
`);

console.log(`Built ${written.length} pages: ${events.length} events, ${towns.length} towns, ${stateList.length} states.`);
