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
const CHROME = require("./chrome.js"); // shared header, footer, fonts
const BLOCKS = require("./blocks.js"); // the ride-report form (Pass 3)
const TOWNS = require("./towns.js");  // the town layer (Sept 30, 2026): a guide link on every row that has one, the strip in its details

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data", "calendar-2027.json");
const OUT = path.join(ROOT, "cfc-site");
const SITE = "https://cycleforchange.org";
const URL = "/events/2027/";
const TODAY = new Date().toISOString().slice(0, 10);
// One form on this page: `ride-report` (scripts/blocks.js), for a missing event or a changed date.

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
// Pass 9 (Sept 30, 2026): every row is a small poster — the day big, the rest of the date small,
// the category's mark beside it (cfc-site/rides/marks.svg).
const CAT_MARK = { "Charity ride": "hundred", Road: "road", Gravel: "gravel", MTB: "mtb", "Multi-day tour": "distance", "Ultra / bikepacking": "terrain", Race: "flag", "Hill climb": "climb" };
const mark = (id, cls = "mk") => `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="/rides/marks.svg#m-${id}"/></svg>`;
function dateCell(e) {
  const st = e.date_status === "confirmed" ? `<span class="st ok" title="Date published by the organizer">✓</span>` : e.date_status === "projected" ? `<span class="st" title="Projected from the 2026 edition">~</span>` : "";
  if (!e.start) return `<span class="d d--tba"><b class="dd">TBA</b><span class="dm">date to<br>come</span></span>`;
  const a = day(e.start), b = day(e.end || e.start);
  let small;
  if (e.start === (e.end || e.start)) small = `${a.dow}<br>${MONTHS[a.m - 1]}`;
  else if (a.m === b.m) small = `${MONTHS[a.m - 1]}<br>${a.d}–${b.d}`;
  else small = `${MONTHS[a.m - 1]} ${a.d}–<br>${MONTHS[b.m - 1]} ${b.d}`;
  return `<span class="d"><b class="dd num">${a.d}</b><span class="dm">${small}${st ? " " + st : ""}</span></span>`;
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

function head(pg = { title, description, url: URL, ld }) {
  return `<!DOCTYPE html>
<!-- Generated by scripts/build-calendar.js from data/calendar-2027.json. Edit the JSON, not this file. -->
<html lang="en">
<head>
${CHROME.head({ title: pg.title, description: pg.description, url: pg.url, styles: ["/events/events.css", "/events/2027/calendar.css"], ld: pg.ld })}
</head>
<body>
${CHROME.HEADER}
<main id="main" class="wrap">
`;
}
function foot({ filters = true, extra = "" } = {}) {
  return `
${CHROME.PLEDGE}
</main>
${CHROME.FOOTER}
<script src="/events/events.js" defer></script>
${filters ? `<script src="/events/2027/calendar.js" defer></script>\n` : ""}${BLOCKS.REPORT_JS}${extra}
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
  const town = TOWNS.find({ city: (e.city || "").replace(/\s*\(.*?\)\s*/g, " ").trim(), state: e.state });
  if (town) meta.push(TOWNS.link(town));
  return `<details class="ev${e.riding ? " you" : ""}" id="${attr(e.slug)}" data-m="${e.month}" data-t="${attr(e.category)}" data-r="${attr(e.region)}" data-c="${attr(e.cause)}" data-s="${attr(e.date_status)}" data-y="${e.riding ? 1 : 0}" data-q="${attr(q)}">
  <summary class="row">${mark(CAT_MARK[e.category] || "flag", "mk mk--row")}${dateCell(e)}<span class="nm"><span class="h">${esc(e.name)}${e.riding ? `<span class="you-tag">Riding</span>` : ""}</span><span class="meta">${meta.join(" &middot; ")}</span></span><span class="acts">Details</span></summary>
  <div class="det">
    <dl class="facts">${facts(e)}</dl>
    ${e.date_note ? `<p class="note"><b>Date</b>${esc(e.date_note)}</p>` : ""}
    ${e.notes ? `<p class="note"><b>Notes</b>${esc(e.notes)}</p>` : ""}
    <p class="det-links">${e.url ? `<a class="btn btn--ghost" href="${attr(e.url)}" rel="noopener" target="_blank">Event site</a>` : ""}${src ? `<span class="src">Sources: ${src}</span>` : ""}</p>
    ${town ? TOWNS.strip(town, { compact: true, heading: `Once you&rsquo;re in ${esc(town.name)}` }) : ""}
  </div>
</details>`;
}

// ——— Pass 19 (Oct 2, 2026): step down, like /rides/ ———————————————————————————
// Robert, on his phone at /events/2027/: "Should we clean this up too?" The first screen was all
// words (a two-line stats strip, the h1, a paragraph explaining ✓ and ~) and the filters ran off
// the side. So the calendar asks one question with a few big picks, the way /rides/ does since
// Pass 15: When? (a tile per month) or What? (a door per type, and the six he's riding). Each pick
// is a short page with just its rows; the full list with every filter is /events/2027/all/.
const MONTH_SLUG = MONTHS_LONG.map((m) => m.toLowerCase());
const monthPath = (m) => `${URL}${m ? MONTH_SLUG[m - 1] : "date-tba"}/`;
const CAT_SLUG = { "Charity ride": "charity-rides", Road: "road", Gravel: "gravel", MTB: "mountain-bike", "Multi-day tour": "multi-day-tours", "Ultra / bikepacking": "ultra-and-bikepacking", Race: "races", "Hill climb": "hill-climbs" };
const CAT_DOOR = { "Charity ride": "Charity rides", Road: "Road", Gravel: "Gravel", MTB: "Mountain bike", "Multi-day tour": "Multi-day tours", "Ultra / bikepacking": "Ultra & bikepacking", Race: "Races", "Hill climb": "Hill climbs" };
const CAT_H1 = { "Charity ride": "charity bike rides", Road: "road rides and fondos", Gravel: "gravel rides and races", MTB: "mountain bike rides and races", "Multi-day tour": "multi-day bike tours", "Ultra / bikepacking": "ultra and bikepacking races", Race: "bike races", "Hill climb": "hill climbs" };
const shortUpdated = new Date(data.updated + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", month: "short", day: "numeric" });
const crumbs = (...more) => `<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/events/">Events</a></li>${more.length ? `<li><a href="${URL}">2027 calendar</a></li>${more.map((m, i) => i === more.length - 1 ? `<li><span aria-current="page">${m}</span></li>` : `<li>${m}</li>`).join("")}` : `<li><span aria-current="page">2027 calendar</span></li>`}</ol></nav>`;
const crumbLd = (name, url) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
  { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" }, { "@type": "ListItem", position: 2, name: "Events", item: SITE + "/events/" },
  { "@type": "ListItem", position: 3, name: "2027 calendar", item: SITE + URL }, ...(name ? [{ "@type": "ListItem", position: 4, name, item: SITE + url }] : []) ] });
const listLd = (name, url, list) => ({ "@context": "https://schema.org", "@type": "ItemList", name, url: SITE + url, numberOfItems: list.length,
  itemListElement: list.map((e, i) => ({ "@type": "ListItem", position: i + 1, name: e.name, url: SITE + monthPath(e.month) + "#" + e.slug })) });
const nConfOf = (list) => list.filter((e) => e.date_status === "confirmed").length;
const sub = (list, extra = "") => `<p class="cal-sub"><b>${list.length}</b> ${list.length === 1 ? "ride or race" : "rides and races"} &middot; <b>${nConfOf(list)}</b> with the organizer&rsquo;s date${extra}</p>`;
const KEY = `<p class="cal-key"><span class="key-conf">organizer&rsquo;s date</span><span class="key-proj">projected from 2026, check first</span></p>`;
// a short page opens the row its link points at (/events/2027/may/#unbound-gravel)
const OPEN_JS = `
<script>(function(){var h=decodeURIComponent(location.hash.slice(1));if(!h)return;var e=document.getElementById(h);if(!e||e.tagName!=="DETAILS")return;e.open=true;addEventListener("load",function(){requestAnimationFrame(function(){e.scrollIntoView({block:"start"});});});})();</script>`;
// old links (/events/2027/#slug, from before the step-down) go to the row on its month's page
const FIND_JS = `
<script>(function(){function go(){var h=decodeURIComponent(location.hash.slice(1));if(!h||document.getElementById(h))return;fetch("${URL}where.json").then(function(r){return r.json();}).then(function(w){location.replace((w[h]||"${URL}all/")+"#"+encodeURIComponent(h));}).catch(function(){location.replace("${URL}all/#"+encodeURIComponent(h));});}go();addEventListener("hashchange",go);})();</script>`;
const pages = [];   // [url, html] — every page this build writes, for the sitemap
function shortPage({ url, crumb, h1, title, description, list, byMonth: grouped = false, nav = "", lead = "" }) {
  let rows;
  if (grouped) {
    const ms = [...new Set(list.map((e) => e.month))].sort((a, b) => (a || 13) - (b || 13));
    rows = `${ms.length > 2 ? `<nav class="cal-jump" aria-label="Jump to a month">${ms.map((m) => `<a href="#m${m}">${m ? MONTHS[m - 1] : "TBA"}</a>`).join("")}</nav>` : ""}
${ms.map((m) => { const l = list.filter((e) => e.month === m); return `      <section class="month" id="m${m}">
        <div class="month-h"><h2>${m ? MONTHS_LONG[m - 1] : "Date to be announced"}</h2><span class="n">${l.length}</span></div>
${l.map(eventHtml).join("\n")}
      </section>`; }).join("\n")}`;
  } else rows = `      <section class="month">
${list.map(eventHtml).join("\n")}
      </section>`;
  const html = head({ title, description, url, ld: [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: SITE + url, dateModified: data.updated, isPartOf: { "@type": "WebSite", name: "Cycle for Change", url: SITE + "/" } },
    crumbLd(crumb, url), listLd(title, url, list) ] }) + `
  <article class="calendar cal-short">
    ${crumbs(crumb)}
    <h1>${h1}</h1>
    ${sub(list)}
    ${KEY}${lead}${nav}
    <div id="results">
${rows}
    </div>${nav}
    <p class="cal-back"><a href="${URL}">&larr; The 2027 calendar</a><a href="${URL}all/">All ${events.length}, with filters</a></p>
  </article>
` + foot({ filters: false, extra: OPEN_JS });
  pages.push([url, html]);
}

// one page per month (and the dates nobody has announced)
for (let m = 0; m <= 12; m++) {
  const list = events.filter((e) => e.month === m);
  if (!list.length) continue;
  const prev = [...Array(m).keys()].reverse().find((k) => k >= 1 && byMonth.get(k)), next = [...Array(12).keys()].map((k) => k + 1).find((k) => k > m && byMonth.get(k));
  const nav = m ? `
    <nav class="mo-nav" aria-label="Other months">${prev ? `<a href="${monthPath(prev)}">&larr; ${MONTHS_LONG[prev - 1]}</a>` : "<span></span>"}${next ? `<a href="${monthPath(next)}">${MONTHS_LONG[next - 1]} &rarr;</a>` : "<span></span>"}</nav>` : "";
  const name = m ? `${MONTHS_LONG[m - 1]} 2027` : "Date to be announced";
  shortPage({ url: monthPath(m), crumb: m ? MONTHS_LONG[m - 1] : "Date TBA", list, nav,
    h1: m ? `${MONTHS_LONG[m - 1]} 2027 bike rides &amp; races` : "2027 rides with no date yet",
    title: m ? `${MONTHS_LONG[m - 1]} 2027 bike rides and races in the US` : "2027 bike rides with no date announced yet",
    description: m ? `${list.length} organized US bike rides and races in ${name}, ${nConfOf(list)} with organizer-confirmed dates: ${list.slice(0, 3).map((e) => e.name).join(", ")} and more. Dates, distances, causes and sign-up links.`
      : `${list.length} US bike rides and races that run every year but haven't put out a 2027 date yet: ${list.slice(0, 3).map((e) => e.name).join(", ")} and more.`,
    lead: m ? "" : `<p class="cal-lead">These run every year but haven&rsquo;t put out a 2026 or 2027 date we could confirm.</p>` });
}
// Pass 22 (Oct 3, 2026): the homepage's "Find a race" lands on Races, which is road, crit and stage
// only — so it points across to the other kinds of racing in one line. "Find a fundraiser" lands on
// Charity rides, which points back at the pledge.
const otherRaces = ["Gravel", "MTB", "Hill climb", "Ultra / bikepacking"].filter((c) => byCat.get(c));
const CAT_LEAD = {
  Race: otherRaces.length ? `<p class="cal-lead">Racing off the road? ${otherRaces.map((c) => `<a href="${URL}${CAT_SLUG[c]}/">${esc(CAT_DOOR[c])}</a>`).join(" &middot; ")}</p>` : "",
  "Charity ride": `<p class="cal-lead">Ride one for a cause, or <a href="/pledge/">pledge a mile</a> on mine.</p>`,
};
// one page per type, by month
for (const c of CATS) {
  const list = events.filter((e) => e.category === c);
  if (!list.length) continue;
  shortPage({ url: `${URL}${CAT_SLUG[c]}/`, crumb: CAT_DOOR[c], list, byMonth: true, lead: CAT_LEAD[c] || "",
    h1: `2027 ${CAT_H1[c]} in the US`, title: `2027 ${CAT_H1[c]} in the US`,
    description: `${list.length} ${CAT_H1[c]} in the US in 2027, ${nConfOf(list)} with organizer-confirmed dates, by month: ${list.slice(0, 3).map((e) => e.name).join(", ")} and more.` });
}
// the six Robert is riding
if (riding.length) shortPage({ url: `${URL}riding/`, crumb: "I&rsquo;m riding", list: riding,
  h1: "The 2027 rides I&rsquo;m doing", title: "The 2027 rides I'm doing for Cycle for Change",
  description: `The ${riding.length} organized rides Robert is riding in 2027 as part of the 10,000-mile pledge, with dates, distances and sign-up links.`,
  lead: `<p class="cal-lead">Part of the 10,000 miles. Come ride one. <a href="/pledge/">Pledge a mile</a>.</p>` });

// the calendar's own page: two questions, then the deep pages and the full list
{
  const mx = Math.max(...MONTHS.map((_, i) => byMonth.get(i + 1) || 0), 1);
  const tiles = MONTHS.map((m, i) => { const n = byMonth.get(i + 1) || 0; return n
    ? `<a class="mo-tile" href="${monthPath(i + 1)}" style="--h:${(n / mx).toFixed(2)}"><span class="mo-n">${m}</span><b class="mo-c">${n}</b><i class="mo-bar" aria-hidden="true"></i></a>`
    : `<span class="mo-tile" aria-disabled="true" style="--h:0"><span class="mo-n">${m}</span><b class="mo-c">0</b><i class="mo-bar" aria-hidden="true"></i></span>`; }).join("\n          ");
  const door = (href, name, n, markId, cls = "") => `<a class="cal-door${cls}" href="${href}">${mark(markId, "mk cal-door-mk")}<span class="cal-door-name">${name}</span><span class="cal-door-n">${n}</span></a>`;
  const doors = [riding.length ? door(`${URL}riding/`, "I&rsquo;m riding", riding.length, "ride-day", " cal-door--you") : "",
    ...CATS.filter((c) => byCat.get(c)).map((c) => door(`${URL}${CAT_SLUG[c]}/`, esc(CAT_DOOR[c]), byCat.get(c), CAT_MARK[c] || "flag"))].join("\n          ");
  let home = head({ title, description, url: URL, ld: [ld[0], ld[1], { ...ld[2], itemListElement: ld[2].itemListElement.map((x, i) => ({ ...x, url: SITE + monthPath(events.filter((e) => e.date_status === "confirmed")[i].month) + "#" + events.filter((e) => e.date_status === "confirmed")[i].slug })) }] }) + `
  <article class="calendar cal-home">
    ${crumbs()}
    <h1>2027 bike rides &amp; races in the US</h1>
    <p class="cal-sub lede"><b>${events.length}</b> rides and races &middot; <b>${nConf}</b> with the organizer&rsquo;s date &middot; updated ${esc(shortUpdated)}</p>

    <section class="cal-step" aria-labelledby="when-h">
      <h2 class="cal-q" id="when-h">When?</h2>
      <div class="mo-tiles">
          ${tiles}
      </div>
      ${byMonth.get(0) ? `<p class="cal-tba"><a href="${monthPath(0)}">${byMonth.get(0)} more with no date yet &rarr;</a></p>` : ""}
    </section>

    <section class="cal-step" aria-labelledby="what-h">
      <h2 class="cal-q" id="what-h">Or pick what</h2>
      <div class="cal-doors">
          ${doors}
      </div>
    </section>
`;
  home += DEEP_HTML();
  home += `
    <p class="cal-all"><a class="btn btn--ghost" href="${URL}all/">All ${events.length}, with filters &rarr;</a></p>
${BLOCKS.REPORT({ thing: "event", heading: "Missing an event, or a date changed?", lede: "Tell us and we'll check it against the organizer's page. Confirmed dates only go up once the organizer publishes them." })}
  </article>
` + foot({ filters: false, extra: FIND_JS });
  pages.unshift([URL, home]);
}

// ——— the full list, with every filter: /events/2027/all/ ———————————————————————
const ALL = URL + "all/";
let body = head({ title: `All ${events.length} 2027 bike rides and races, with filters`, description, url: ALL, ld: [{ ...ld[0], url: SITE + ALL }, crumbLd("All", ALL)] });
body += `
  <article class="calendar">
    ${crumbs("All")}
    <p class="eyebrow" id="eyebrow">${events.length} events &middot; <b>${nConf} confirmed</b> &middot; ${nProj} projected &middot; ${nTba} tba &middot; updated ${esc(updatedLong)}</p>
    <h1>All 2027 bike rides &amp; races</h1>
    <p class="lede">Every organized ride and race in the US next year that we could pin down: ${events.length} events, ${nConf} with dates published by the organizer. <span class="k key-conf">Confirmed</span> means the organizer has published the 2027 date. <span class="k key-proj">Projected</span> means it is placed on the same weekend as the 2026 edition — check before you register.</p>

    <section class="controls" aria-label="Filters">
      <div class="search">
        <label for="q">Search</label>
        <input type="search" id="q" placeholder="Event, city, state, cause, organizer" autocomplete="off">
      </div>
      <div class="months" id="months" role="group" aria-label="Month">
${(() => { const mx = Math.max(...MONTHS.map((_, i) => byMonth.get(i + 1) || 0), 1); return MONTHS.map((m, i) => `        <button class="mo" type="button" data-m="${i + 1}" aria-pressed="false" style="--h:${((byMonth.get(i + 1) || 0) / mx).toFixed(2)}"><i class="mo-bar" aria-hidden="true"></i><span class="n">${m}</span><span class="c">${byMonth.get(i + 1) || 0}</span></button>`).join("\n"); })()}
        <button class="mo mo--tba" type="button" data-m="0" aria-pressed="false" style="--h:0"><i class="mo-bar" aria-hidden="true"></i><span class="n">TBA</span><span class="c">${byMonth.get(0) || 0}</span></button>
      </div>
      <div class="frow scroll" role="group" aria-label="Type"><span class="lab">Type</span>
${CATS.map((c) => `        <button class="tag tag--mk" type="button" data-set="t" data-v="${attr(c)}" aria-pressed="false">${mark(CAT_MARK[c] || "flag", "mk mk--tag")}${esc(c)}<span class="c">${byCat.get(c) || 0}</span></button>`).join("\n")}
      </div>
      <div class="frow" role="group" aria-label="Show"><span class="lab">Show</span>
        <button class="tag" type="button" id="tConf" aria-pressed="false">Confirmed only<span class="c">${nConf}</span></button>
        <button class="tag you" type="button" id="tRiding" aria-pressed="false">I&rsquo;m riding<span class="c">${riding.length}</span></button>
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

${""}`;
function DEEP_HTML() {
  let deep = null;
  try { deep = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site", "events", "events.json"), "utf8")); } catch (e) { return ""; }
  const list = Array.isArray(deep) ? deep : (deep && deep.events) || [];
  if (!list.length) return "";
  const longestWord = (name) => Math.max(...String(name).split(/[\s-]+/).map((w) => w.length), 4);
  const norm = (x) => String(x || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  const tile = (d) => {
    // the 2027 date comes from this calendar (matched by name); the events feed's next_date may still be 2026
    const cal = events.find((e) => norm(e.name) === norm(d.name) || norm(e.name) === norm(d.short_name) || (d.website && e.url && host(e.url) === host(d.website)));
    const dt = cal && cal.start ? `${cal.start.slice(5, 7)}.${cal.start.slice(8, 10)}` : "TBA";
    const slug = String(d.town || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const art = fs.existsSync(path.join(ROOT, "cfc-site", "towns", "art", `${slug}.svg`)) ? `<img class="tile-art" src="/towns/art/${slug}.svg" alt="" loading="lazy" decoding="async" width="200" height="200">` : "";
    return `<a class="tile-p tile-p--deep${art ? " tile-p--art" : ""}" href="${attr(String(d.url || "").replace(SITE, ""))}" style="--l:${longestWord(d.town || d.name)}">${art}<span class="dd">${esc(dt)}${cal && cal.date_status === "confirmed" ? `<span class="st ok" title="Date published by the organizer">✓</span>` : cal && cal.date_status === "projected" ? `<span class="st" title="Projected from the 2026 edition">~</span>` : ""}</span><span class="t">${esc(d.town || "")}</span><span class="b">${esc(d.short_name || d.name)}</span></a>`;
  };
  return `
    <aside class="deep" aria-labelledby="deep-h">
      <p class="eyebrow" id="deep-h">${list.length} events with their own page</p>
      <p class="deep-note">Dates, routes, sign-up, weather, and where to sleep, eat and get the bike fixed.</p>
      <div class="tiles-p tiles-p--deep">${list.map(tile).join("")}</div>
    </aside>`;
}
body += `
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
      <p>${esc(data.source || "")} Confirm with the organizer before booking travel. <a href="/events/2027/calendar-2027.json">JSON feed</a>.</p>
    </div>
${BLOCKS.REPORT({ thing: "event", heading: "Missing an event, or a date changed?", lede: "Tell us and we'll check it against the organizer's page. Confirmed dates only go up once the organizer publishes them." })}
  </article>
`;
body += foot();
pages.push([ALL, body]);

function write(rel, s) { const p = path.join(OUT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); return rel; }
for (const [u, html] of pages) write(u.replace(/^\//, "") + "index.html", html);
// where each event's row lives now, for old /events/2027/#slug links (FIND_JS)
write("events/2027/where.json", JSON.stringify(Object.fromEntries(events.map((e) => [e.slug, monthPath(e.month)]))));
write("events/2027/calendar-2027.json", JSON.stringify({ updated: data.updated, source: data.source, generated: TODAY, url: SITE + URL, events: events.map((e) => { const o = Object.assign({}, e); delete o.month; return o; }), retired }, null, 1));
write("sitemap-calendar.xml", `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/build-calendar.js. Listed in the sitemap index at /sitemap.xml. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([u]) => `  <url><loc>${SITE}${u}</loc><lastmod>${data.updated}</lastmod><changefreq>weekly</changefreq><priority>${u === URL ? "0.8" : "0.6"}</priority></url>`).join("\n")}
</urlset>
`);
console.log(`Built /events/2027/ (+ ${pages.length - 1} short pages): ${events.length} events (${nConf} confirmed, ${nProj} projected, ${nTba} tba), ${retired.length} retired. Data updated ${data.updated}.`);
