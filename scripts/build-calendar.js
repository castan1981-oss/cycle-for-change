#!/usr/bin/env node
/* Cycle for Change — 2027 ride calendar generator.
   Reads data/calendar-2027.json (every organized US ride and race we could pin
   down for 2027) and writes one static page plus a machine-readable feed into
   cfc-site/. No dependencies, no framework. Output is committed; Netlify just
   serves the files. Same chrome as scripts/build-events.js.

   Run:   node scripts/build-calendar.js      (or: npm run build:calendar)
   Docs:  data/SCHEMA.md  → "2027 calendar"

   URLs it produces:
     /events/2027/                     the calendar (static rows; calendar.js filters them)
     /events/2027/calendar-2027.json   machine-readable feed
     /sitemap-calendar.xml             listed in /sitemap.xml

   The page is styled by /events/events.css + /events/2027/calendar.css and
   enhanced by /events/events.js (mileage line) + /events/2027/calendar.js.
   Those three files are hand-written; this script does not touch them. */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data", "calendar-2027.json");
const OUT = path.join(ROOT, "cfc-site");
const SITE = "https://cycleforchange.org";
const URL = "/events/2027/";
const TODAY = new Date().toISOString().slice(0, 10);
// No forms on this page. Every call to action is a plain link (same as build-events.js).
const INSTAGRAM = "https://www.instagram.com/cycl_eforchange/";

// ——— guardrails from CLAUDE.md ———————————————————————————————————————
// Same list as build-events.js minus /Prescott/: here it is a place name in
// event data (Whiskey Off-Road runs there), not the retired origin line.
const BANNED = [
  /\bleverage\b/i, /\bsynergy\b/i, /\bjourney\b/i, /passionate about/i,
  /thrilled to announce/i, /excited to share/i, /\$800/, /two suitcases/i,
  /est\.? 2008/i, /years? sober\b/i, /sober since/i, /\brelapse/i, /7,?500[- ]mile/i,
];
function lintDeep(where, v) {
  if (typeof v === "string") { for (const re of BANNED) if (re.test(v)) throw new Error(`Banned phrase ${re} in ${where}: "${v.slice(0, 80)}"`); }
  else if (Array.isArray(v)) v.forEach((x, i) => lintDeep(`${where}[${i}]`, x));
  else if (v && typeof v === "object") Object.keys(v).forEach((k) => lintDeep(`${where}.${k}`, v[k]));
}

// ——— helpers —————————————————————————————————————————————————————————————
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const attr = esc;
const jsonld = (obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/<\//g, "<\\/")}\n</script>`;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CATS = ["Charity ride", "Road", "Gravel", "MTB", "Multi-day tour", "Ultra / bikepacking", "Race", "Hill climb"];
const REGIONS = ["Southwest", "California", "Pacific NW", "Mountain", "Texas & South Central", "Midwest", "Southeast", "Mid-Atlantic", "Northeast", "Alaska & Hawaii", "National / multiple"];
const CAUSE_ORDER = ["LGBTQ+", "HIV/AIDS", "Recovery", "Mental health", "Cancer", "MS", "Diabetes", "Heart", "Children", "Health", "Veterans", "Lung", "ALS", "Arthritis", "Autism", "Cystic fibrosis", "Alzheimer's", "Hunger", "Bike advocacy", "Environment", "Community", "Various charities", "Other"];

function day(iso) { const d = new Date(iso + "T12:00:00Z"); return { m: d.getUTCMonth() + 1, d: d.getUTCDate(), dow: DOW[d.getUTCDay()] }; }
function fmtLong(iso) { return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", weekday: "short", month: "long", day: "numeric", year: "numeric" }); }
function dateCell(e) {
  if (!e.start) return `<span class="d"><b>TBA</b></span>`;
  const a = day(e.start), b = day(e.end || e.start);
  const st = e.date_status === "confirmed" ? ` <span class="st ok" title="Date published by the organizer">✓</span>` : e.date_status === "projected" ? ` <span class="st" title="Projected from the 2026 edition">~</span>` : "";
  if (e.start === (e.end || e.start)) return `<span class="d">${a.dow} <b>${MONTHS[a.m - 1]} ${a.d}</b>${st}</span>`;
  if (a.m === b.m) return `<span class="d"><b>${MONTHS[a.m - 1]} ${a.d}–${b.d}</b>${st}</span>`;
  return `<span class="d"><b>${MONTHS[a.m - 1]} ${a.d}–${MONTHS[b.m - 1]} ${b.d}</b>${st}</span>`;
}
function place(e) {
  if (e.start_city && e.end_city && e.start_city !== e.end_city && e.days > 1) {
    const a = e.start_city.split("(")[0].trim(), b = e.end_city.split("(")[0].trim();
    if (a && b && a !== b) return `${a} → ${b}`;
  }
  const c = (e.city || "").replace(/\s*\(.*?\)\s*/g, " ").trim();
  return c ? `${c}${e.state && !c.includes(e.state) ? ", " + e.state : ""}` : (e.state || e.region);
}
function shortDist(s) { s = String(s || ""); return s.length > 60 ? s.slice(0, 58).replace(/[,;|(]?\s*\S*$/, "") + "…" : s; }
const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };

// ——— load + validate ————————————————————————————————————————————————————
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
const events = data.events || [];
const retired = data.retired || [];
for (const e of events) {
  for (const k of ["id", "slug", "name", "category", "date_status"]) if (e[k] == null || e[k] === "") throw new Error(`Event ${e.slug || e.name || "?"} missing ${k}`);
  if (e.start && !/^\d{4}-\d{2}-\d{2}$/.test(e.start)) throw new Error(`Event ${e.slug}: bad start ${e.start}`);
  if (!e.start && e.date_status !== "tba") throw new Error(`Event ${e.slug}: no start date but status ${e.date_status}`);
  if (!CATS.includes(e.category)) throw new Error(`Event ${e.slug}: unknown category ${e.category}`);
  e.month = e.start ? day(e.start).m : 0;
}
lintDeep("calendar-2027", data);
const slugs = new Set();
for (const e of events) { if (slugs.has(e.slug)) throw new Error(`Duplicate slug ${e.slug}`); slugs.add(e.slug); }
events.sort((a, b) => (a.start || "9999").localeCompare(b.start || "9999") || a.name.localeCompare(b.name));

const count = (fn) => { const m = new Map(); for (const e of events) { const k = fn(e); if (k === "" || k == null) continue; m.set(k, (m.get(k) || 0) + 1); } return m; };
const byMonth = count((e) => e.month), byCat = count((e) => e.category), byRegion = count((e) => e.region), byCause = count((e) => e.cause), byStatus = count((e) => e.date_status);
const nConf = byStatus.get("confirmed") || 0, nProj = byStatus.get("projected") || 0, nTba = byStatus.get("tba") || 0;
const riding = events.filter((e) => e.riding);
const updatedLong = new Date(data.updated + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", month: "long", day: "numeric", year: "numeric" });

// ——— chrome (mirrors build-events.js) —————————————————————————————————————
const MARK = `<svg class="mark-glyph" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path d="M98.45 71.03 A40 40 0 0 1 50.32 98.81" fill="none" stroke="#2A2E28" stroke-width="12" stroke-linecap="round"/>
      <path d="M31.23 87.79 A40 40 0 0 1 31.23 32.21" fill="none" stroke="#5C6B4A" stroke-width="12" stroke-linecap="round"/>
      <path d="M50.32 21.19 A40 40 0 0 1 98.45 48.97" fill="none" stroke="#C4B7A2" stroke-width="12" stroke-linecap="round"/>
      <circle cx="60" cy="60" r="6" fill="#2A2E28"/>
    </svg>`;

const title = "2027 bike rides and races in the US — the full calendar";
const description = `${events.length} organized US bike rides and races for 2027 — charity rides, gran fondos, gravel, multi-day tours, ultras and races — with ${nConf} organizer-confirmed dates, projected dates for the rest, distances, causes and sign-up links. Updated ${updatedLong}.`;

const ld = [
  { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: SITE + URL, dateModified: data.updated,
    isPartOf: { "@type": "WebSite", name: "Cycle for Change", url: SITE + "/" },
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".lede"] } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
    { "@type": "ListItem", position: 2, name: "Events", item: SITE + "/events/" },
    { "@type": "ListItem", position: 3, name: "2027 calendar", item: SITE + URL } ] },
  { "@context": "https://schema.org", "@type": "ItemList", name: "2027 US bike rides and races with confirmed dates", url: SITE + URL, numberOfItems: nConf,
    itemListElement: events.filter((e) => e.date_status === "confirmed").map((e, i) => ({ "@type": "ListItem", position: i + 1, name: e.name, url: SITE + URL + "#" + e.slug })) },
];

function head() {
  return `<!DOCTYPE html>
<!-- Generated by scripts/build-calendar.js from data/calendar-2027.json. Edit the JSON, not this file. -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${esc(title)}</title>
  <meta name="description" content="${attr(description)}">
  <link rel="canonical" href="${SITE}${URL}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Cycle for Change">
  <meta property="og:url" content="${SITE}${URL}">
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
  <link rel="stylesheet" href="/events/2027/calendar.css">
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
    <p>This calendar is part of Cycle for Change. In 2027 I ride 10,000 miles, all on the bike, every one of them for queer communities, and this list is where the miles come from. You pick where the money goes. It starts January 1.</p>
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
<script src="/events/2027/calendar.js" defer></script>
</body>
</html>
`;
}

// ——— page pieces ————————————————————————————————————————————————————————
function facts(e) {
  const rows = [];
  const add = (k, v) => { if (v && String(v).trim()) rows.push(`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`); };
  add("Dates", e.start ? (e.start === (e.end || e.start) ? fmtLong(e.start) : `${fmtLong(e.start)} – ${fmtLong(e.end)}`) : "Not announced");
  add("Where", [e.city, e.state].filter(Boolean).join(", "));
  if (e.start_city && e.end_city && e.start_city !== e.end_city) add("Route", `${e.start_city} → ${e.end_city}`);
  add("Distances", e.distances); add("Elevation", e.elevation); add("Format", e.subtype);
  add("Cause", e.cause && e.beneficiary ? `${e.cause} — ${e.beneficiary}` : (e.beneficiary || e.cause));
  add("Min. fundraising", e.fundraising_min); add("Cost", e.cost); add("Organizer", e.organizer); add("Series", e.series);
  add("Registration", e.reg_status); add("Lottery", e.lottery); add("Qualification", e.qualification);
  return rows.join("");
}
function eventHtml(e) {
  const meta = [`<b>${esc(place(e))}</b>`, esc(e.category.toLowerCase())];
  if (e.cause) meta.push(esc(e.cause));
  if (e.days > 1) meta.push(`${e.days} days`);
  if (e.distances) meta.push(esc(shortDist(e.distances)));
  const q = [e.name, e.city, e.state, e.region, e.category, e.cause, e.beneficiary, e.organizer, e.series].join(" ").toLowerCase().replace(/\s+/g, " ").trim();
  const src = (e.sources || []).slice(0, 2).map((u) => `<a href="${attr(u)}" rel="noopener nofollow" target="_blank">${esc(host(u))}</a>`).join(" ");
  return `<details class="ev${e.riding ? " you" : ""}" id="${attr(e.slug)}" data-m="${e.month}" data-t="${attr(e.category)}" data-r="${attr(e.region)}" data-c="${attr(e.cause)}" data-s="${attr(e.date_status)}" data-y="${e.riding ? 1 : 0}" data-q="${attr(q)}">
  <summary class="row">${dateCell(e)}<span class="nm"><span class="h">${esc(e.name)}${e.riding ? `<span class="you-tag">Riding</span>` : ""}</span><span class="meta">${meta.join(" &middot; ")}</span></span><span class="acts">Details</span></summary>
  <div class="det">
    <dl class="facts">${facts(e)}</dl>
    ${e.date_note ? `<p class="note"><b>Date</b>${esc(e.date_note)}</p>` : ""}
    ${e.notes ? `<p class="note"><b>Notes</b>${esc(e.notes)}</p>` : ""}
    <p class="det-links">${e.url ? `<a class="btn" href="${attr(e.url)}" rel="noopener" target="_blank">Event site</a>` : ""}${src ? `<span class="src">Sources: ${src}</span>` : ""}</p>
  </div>
</details>`;
}

// ——— assemble ————————————————————————————————————————————————————————————
let body = head();
body += `
  <article class="calendar">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/events/">Events</a></li><li><span aria-current="page">2027 calendar</span></li></ol></nav>
    <p class="eyebrow" id="eyebrow">${events.length} events &middot; <b>${nConf} confirmed</b> &middot; ${nProj} projected &middot; ${nTba} tba &middot; updated ${esc(updatedLong)}</p>
    <h1>2027 bike rides &amp; races in the US</h1>
    <p class="lede">Every organized ride and race in the US next year that we could pin down: ${events.length} events, ${nConf} with dates published by the organizer. <span class="k key-conf">Confirmed</span> means the organizer has published the 2027 date. <span class="k key-proj">Projected</span> means it is placed on the same weekend as the 2026 edition — check before you register.</p>

    <section class="controls" aria-label="Filters">
      <div class="search">
        <label for="q">Search</label>
        <input type="search" id="q" placeholder="Event, city, state, cause, organizer" autocomplete="off">
      </div>
      <div class="months" id="months" role="group" aria-label="Month">
${MONTHS.map((m, i) => `        <button class="mo" type="button" data-m="${i + 1}" aria-pressed="false"><span class="n">${m}</span><span class="c">${byMonth.get(i + 1) || 0}</span></button>`).join("\n")}
        <button class="mo" type="button" data-m="0" aria-pressed="false"><span class="n">TBA</span><span class="c">${byMonth.get(0) || 0}</span></button>
      </div>
      <div class="frow scroll" role="group" aria-label="Type"><span class="lab">Type</span>
${CATS.map((c) => `        <button class="tag" type="button" data-set="t" data-v="${attr(c)}" aria-pressed="false">${esc(c)}<span class="c">${byCat.get(c) || 0}</span></button>`).join("\n")}
      </div>
      <div class="frow" role="group" aria-label="Show"><span class="lab">Show</span>
        <button class="tag" type="button" id="tConf" aria-pressed="false">Confirmed only<span class="c">${nConf}</span></button>
        <button class="tag you" type="button" id="tRiding" aria-pressed="false">Riding<span class="c">${riding.length}</span></button>
      </div>
      <details class="more-f" id="moreF">
        <summary>More filters <span class="on" id="moreOn"></span></summary>
        <div class="frow scroll" role="group" aria-label="Region"><span class="lab">Region</span>
${REGIONS.filter((r) => byRegion.has(r)).map((r) => `          <button class="tag" type="button" data-set="r" data-v="${attr(r)}" aria-pressed="false">${esc(r)}<span class="c">${byRegion.get(r)}</span></button>`).join("\n")}
        </div>
        <div class="frow scroll" role="group" aria-label="Cause"><span class="lab">Cause</span>
${CAUSE_ORDER.filter((c) => byCause.has(c)).map((c) => `          <button class="tag" type="button" data-set="c" data-v="${attr(c)}" aria-pressed="false">${esc(c)}<span class="c">${byCause.get(c)}</span></button>`).join("\n")}
        </div>
      </details>
    </section>

    <div class="bar">
      <p class="count" id="count"><b>${events.length}</b> events</p>
      <button class="clear" id="clear" type="button" hidden>Clear all</button>
    </div>

    <div id="results">
`;
for (let m = 1; m <= 13; m++) {
  const mm = m === 13 ? 0 : m;
  const list = events.filter((e) => e.month === mm);
  if (!list.length) continue;
  body += `      <section class="month" data-m="${mm}">
        <div class="month-h"><h2>${mm ? MONTHS_LONG[mm - 1] : "Date to be announced"}</h2><span class="n" data-n>${list.length}</span></div>
${list.map(eventHtml).join("\n")}
      </section>
`;
}
body += `      <p class="empty" id="empty" hidden>Nothing matches. Clear a filter.</p>
    </div>

    <details class="retired" id="retired">
      <summary>Retired, paused or unverified <span>${retired.length}</span></summary>
      <ul>
${retired.slice().sort((a, b) => a.name.localeCompare(b.name)).map((r) => `        <li><b>${esc(r.name)}${r.state ? ` <span>&middot; ${esc(r.state)}</span>` : ""}</b><span>${esc(r.reason || "")}</span></li>`).join("\n")}
      </ul>
    </details>

    <div class="method">
      <p>Dates marked ✓ are published by the organizer. Dates marked ~ are placed on the same weekend as the 2026 edition; the date note under each event says how. TBA means the event exists but has not put out a 2026 or 2027 date. US only; virtual-only and indoor-only events are left out.</p>
      <p>${esc(data.source || "")} Confirm with the organizer before booking travel. Missing an event, or a date changed? <a href="${INSTAGRAM}" rel="noopener">Message us on Instagram</a>. <a href="/events/2027/calendar-2027.json">JSON feed</a>.</p>
    </div>
  </article>
`;
body += foot();

function write(rel, s) { const p = path.join(OUT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); return rel; }
write("events/2027/index.html", body);
write("events/2027/calendar-2027.json", JSON.stringify({ updated: data.updated, source: data.source, generated: TODAY, url: SITE + URL, events: events.map((e) => { const o = Object.assign({}, e); delete o.month; return o; }), retired }, null, 1));
write("sitemap-calendar.xml", `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/build-calendar.js. Listed in the sitemap index at /sitemap.xml. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}${URL}</loc><lastmod>${data.updated}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
</urlset>
`);
console.log(`Built /events/2027/: ${events.length} events (${nConf} confirmed, ${nProj} projected, ${nTba} tba), ${retired.length} retired. Data updated ${data.updated}.`);
