#!/usr/bin/env node
"use strict";
/*
  build-about.js — writes cfc-site/about/index.html, "About me and my mission" (Oct 28, 2026).
  Run from the repo root:  node scripts/build-about.js
  The words: data/about.json, Robert's own, set word for word from his revised narrative. The page: cfc-site/about/
  about.css and about.js. The pictures: tools/about-art.py (plain crops of his files) and the photo registry.

  The brief (Robert, Oct 28, 2026): a signature editorial page, built like a feature in an independent cycling
  magazine. An intimate, cinematic opening; "Then came the bike" as the turn into movement and community; "The love
  bubble was real" as a collage of real AIDS/LifeCycle pictures; "I found a version of myself I actually liked hanging
  out with" set as type and nothing else; the 10,000 as the big visual moment; the mission in its own composition;
  the CYCLE FOR sign and the ways in at the end. Recovery stays off the page entirely. Nothing invented.

  The rooms run tar (the opening) · the hinge (tar into concrete, his film across the line) · concrete (the bike) ·
  plaster (the love bubble) · drained pool (the line) · tar (the 10,000) · patina (the mission) · tar (the sign), then
  the footer. The page ends on its own sign, like the homepage, so the footer's stencil is hidden here and the
  closing block isn't repeated under it (its two actions are the sign's first two).

  Drafts: a section with no words in data/about.json prints a slot that says whose words go there, the page is
  noindex, and /about/ stays out of sitemap-pages.xml. `ready: true` (every slot filled, Robert's go) indexes it.
*/
const fs = require("fs");
const path = require("path");
const CHROME = require("./chrome.js");
const PH = require("./photos.js");

const V = CHROME.CSS_V;
const ROOT = path.resolve(__dirname, "..");
const SITE_DIR = path.join(ROOT, "cfc-site");
const OUT = path.join(SITE_DIR, "about", "index.html");
const D = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "about.json"), "utf8"));
const esc = CHROME.esc, attr = CHROME.attr;
const url = "/about/";

/* —— counts, from the data (never typed) —— */
const live = (() => { try { const d = JSON.parse(fs.readFileSync(path.join(SITE_DIR, "rides", "live.json"), "utf8")); return Array.isArray(d) ? d.length : null; } catch (e) { return null; } })();
const RIDES_N = live == null ? null : live.toLocaleString("en-US");
const MY_RIDES_N = CHROME.RIDING.length;
const ride = (slug) => CHROME.RIDING.find((r) => r.slug === slug || (r.href || "").endsWith("#" + slug)) || null;

/* —— pictures —— */
const sib = (src, ext) => { const a = src.replace(/\.jpe?g$/i, "." + ext); return fs.existsSync(path.join(SITE_DIR, a)) ? a : null; };
function picture({ src, w, h, alt, eager = false, sizes = "" }) {
  const av = sib(src, "avif"), wp = sib(src, "webp");
  return `<picture>${av ? `<source type="image/avif" srcset="${av}">` : ""}${wp ? `<source type="image/webp" srcset="${wp}">` : ""}` +
    `<img src="${src}" alt="${attr(alt)}" width="${w}" height="${h}" ${eager ? `fetchpriority="high"` : `loading="lazy"`} decoding="async"${sizes ? ` sizes="${sizes}"` : ""}></picture>`;
}
const cap = (where) => where ? `<figcaption>${esc(where)}</figcaption>` : "";
const reg = (key) => { const p = PH.PHOTOS[key]; if (!p) throw new Error(`build-about: no registry photo "${key}"`); return p; };

/* —— his words, or the slot that holds their place —— */
const empty = [];
function words(list, where, cls = "") {
  if (Array.isArray(list) && list.length) return `<div class="ab-words${cls ? " " + cls : ""}">${list.map((p, i) => `<p${i === 0 ? ' class="ab-first"' : ""}>${esc(p)}</p>`).join("")}</div>`;
  empty.push(where);
  return `<div class="ab-slot${cls ? " " + cls : ""}" role="note"><p class="ab-slot-t">Robert&rsquo;s words go here: <b>${esc(where)}</b>, from his narrative, word for word.</p><span class="ab-slot-l" aria-hidden="true"></span><span class="ab-slot-l" aria-hidden="true"></span><span class="ab-slot-l" aria-hidden="true"></span><span class="ab-slot-l ab-slot-l--short" aria-hidden="true"></span></div>`;
}

/* —— the stencil word, drawn from the header mark's defs (#lpC …), never a font —— */
const LETTERS = `<use href="#lpC"/><use href="#lpY" transform="translate(74 0)"/><use href="#lpC" transform="translate(148 0)"/><use href="#lpL" transform="translate(222 0)"/><use href="#lpE" transform="translate(296 0)"/><use href="#lpF" transform="translate(414 0)"/><use href="#lpO" transform="translate(488 0)"/><use href="#lpR" transform="translate(562 0)"/>`;
const MARK_WORD = (cls) => `<svg class="${cls}" viewBox="0 0 626 150" aria-hidden="true" focusable="false"><g clip-path="url(#lpRow)" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round">${LETTERS}</g></svg>`;

/* —— 1. the opening: one face, close, on tar. The picture opens like a film frame (about.js / about.css). —— */
const O = D.opening;
const OPEN = `<section class="ab-open" aria-labelledby="ab-h1">
  <div class="wrap ab-open-in">
    <figure class="ab-open-ph">${picture({ ...O.photo, eager: true })}${cap(O.photo.where)}</figure>
    <div class="ab-open-words">
      <p class="ab-label">${esc(O.label)}</p>
      <h1 class="ab-h1" id="ab-h1">${esc(O.h1)}</h1>
      <p class="ab-by">Robert Castan &middot; Phoenix</p>
    </div>
  </div>
  <div class="wrap ab-col">${words(O.paras, "the opening", "ab-words--lede")}</div>
</section>`;

/* —— 2. then came the bike: the turn. The heading on tar, his film straddling tar and concrete, then the road over
   his bars, again and again (the typology strip). —— */
const B = D.bike, F = B.film;
const filmSrc = (ext) => fs.existsSync(path.join(SITE_DIR, F.src + "." + ext)) ? `<source src="${F.src}.${ext}" type="video/${ext}">` : "";
const poster = (sib(F.poster + ".jpg", "webp") || F.poster + ".jpg");
const BARS = B.bars.map((k) => { const p = reg(k); return `<li><figure class="ab-bar">${picture({ src: p.src, w: p.w, h: p.h, alt: p.alt })}${cap(p.where)}</figure></li>`; }).join("\n        ");
const BIKE = `<section class="ab-bike" aria-labelledby="ab-bike-h">
  <div class="ab-hinge">
    <div class="wrap ab-hinge-in">
      <h2 class="ab-chap ab-chap--turn" id="ab-bike-h">${esc(B.head)}</h2>
      <figure class="ab-film" data-film data-playing="false">
        <video class="ab-film-v" width="${F.w}" height="${F.h}" muted playsinline loop preload="none" poster="${poster}" aria-label="${attr(F.alt)}">${filmSrc("webm")}${filmSrc("mp4")}</video>
        <button class="ab-play" type="button" data-film-btn aria-label="Play the film, ${F.seconds} seconds"><svg class="ab-play-i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="ab-play-p" d="M8 5.5v13l10.5-6.5z"/><path class="ab-play-s" d="M7.5 5h3v14h-3zM13.5 5h3v14h-3z"/></svg></button>
        ${cap(F.where)}
      </figure>
    </div>
  </div>
  <div class="wrap ab-col ab-col--bike">${words(B.paras, "then came the bike")}</div>
  <div class="ab-bars" role="group" aria-label="Over the bars">
    <ul class="ab-bars-list">
        ${BARS}
    </ul>
  </div>
</section>`;

/* —— 3. the love bubble: the collage. Real AIDS/LifeCycle pictures only; type sits in the grid beside them, never
   on them. —— */
const U = D.bubble;
const tile = (p, cls) => `<figure class="ab-tile ab-tile--${cls}" data-key="${attr(p.key)}">${picture(p)}</figure>`;
const byKey = (k) => U.photos.find((p) => p.key === k);
// the mosaic: the finish on the right, its three details stacked on the left; any more ALC photos Robert sends run
// in a row of their own under it (data/about.json order)
const DETAILS = ["alc-hands", "alc-banner", "alc-umbrella"].map(byKey).filter(Boolean);
const MORE = U.photos.filter((p) => !["alc-finish", "alc-hands", "alc-banner", "alc-umbrella"].includes(p.key));
const TILES = `<div class="ab-stack">${DETAILS.map((p) => tile(p, p.key.replace("alc-", ""))).join("")}</div>
      ${byKey("alc-finish") ? tile(byKey("alc-finish"), "finish") : ""}${MORE.length ? `\n      <div class="ab-more">${MORE.map((p) => tile(p, "more")).join("")}</div>` : ""}`;
const BUBBLE = `<section class="ab-bubble" aria-labelledby="ab-bubble-h">
  <div class="wrap ab-bubble-in">
    <h2 class="ab-chap ab-chap--bubble" id="ab-bubble-h">${esc(U.head)}</h2>
    <div class="ab-collage">
      ${TILES}
    </div>
    ${U.where ? `<p class="ab-cap ab-bubble-cap">${esc(U.where)}</p>` : ""}
    <div class="ab-col ab-col--bubble">${words(U.paras, "the love bubble was real")}</div>
  </div>
</section>`;

/* —— 4. the line: type and nothing else, on drained pool —— */
const S = D.statement;
const SAY = `<section class="ab-say" aria-labelledby="ab-say-h">
  <div class="wrap ab-say-in">
    <h2 class="ab-say-line" id="ab-say-h" data-say>${esc(S.line)}</h2>
    ${S.paras && S.paras.length ? `<div class="ab-col">${words(S.paras, "after the line")}</div>` : ""}
  </div>
</section>`;

/* —— 5. the 10,000: the number at the width of the screen, a lane line under it, the road —— */
const C = D.challenge, CP = reg(C.photo);
// the road: its own 2.4:1 band from 760px (tools/about-art.py "road-w"), the registry's 4:3 on phones
function roadPicture() {
  const W = "/img/about/road-w-1.jpg";
  const wide = ["avif", "webp"].map((x) => sib(W, x) ? `<source media="(min-width:760px)" type="image/${x}" srcset="${sib(W, x)}">` : "").join("") + `<source media="(min-width:760px)" srcset="${W}">`;
  return picture({ src: CP.src, w: CP.w, h: CP.h, alt: CP.alt }).replace("<picture>", "<picture>" + wide);
}
const TEN = `<section class="ab-ten" aria-labelledby="ab-ten-h">
  <div class="wrap ab-ten-in">
    <h2 class="ab-ten-h" id="ab-ten-h"><span class="ab-ten-num">10,000</span><span class="ab-ten-unit">miles in 2027.</span></h2>
    <div class="ab-lane" aria-hidden="true"></div>
    <ul class="ab-facts">${C.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
    <div class="ab-col ab-col--ten">${words(C.paras, "the 10,000-mile challenge")}</div>
    <p class="ab-ten-more"><a class="link link--bone" href="/events/2027/riding/">The 2027 rides I&rsquo;m doing</a><span class="ab-ten-n">${MY_RIDES_N}, so far</span></p>
  </div>
  <figure class="ab-road">${roadPicture()}${cap(CP.where)}</figure>
</section>`;

/* —— 6. the mission: his sentence in two weights, his picture with Caleb, the orgs and their rides —— */
const M = D.mission;
const cro = ride("center-ride-out"), ctz = ride("cycle-to-zero");
const rideLine = (r) => r ? `<p class="ab-org-ride"><a href="${r.href}">${esc(r.name)}</a> <span>${esc(r.date)}, 2027 &middot; ${esc(r.where)}</span></p>` : "";
const ORGS = [
  { name: "one&middot;n&middot;ten", line: "Phoenix nonprofit for LGBTQ+ youth ages 11 to 24. Safe spaces, housing, leadership.", give: ["https://onenten.org", "Give to one&middot;n&middot;ten"], ride: null },
  { name: "Los Angeles LGBT Center", line: "Health, housing and advocacy for LGBTQ+ people.", give: ["https://www.lalgbtcenter.org", "Give to the Center"], ride: cro },
  { name: "San Francisco AIDS Foundation", line: "HIV, sexual health and <span class=\"nowrap\">harm-reduction</span> services.", give: ["https://www.sfaf.org", "Give to SFAF"], ride: ctz },
];
const MISSION = `<section class="ab-mission" id="mission" aria-labelledby="ab-mission-h">
  <div class="wrap ab-mission-in">
    <h2 class="ab-mission-h" id="ab-mission-h"><span class="ab-m1">${esc(M.lines[0])}</span> <span class="ab-m2">${esc(M.lines[1])}</span></h2>
    <figure class="ab-mission-ph">${picture(M.photo)}${cap(M.photo.where)}</figure>
    <div class="ab-mission-words">
      ${words(M.paras, "the mission")}
      <h3 class="ab-orgs-h">The orgs I ride for.</h3>
      <p class="ab-orgs-lede">You sign up or give on their page. None of it comes through me.</p>
      <ul class="ab-orgs">
        ${ORGS.map((o) => `<li class="ab-org"><h4 class="ab-org-n">${o.name}</h4><p class="ab-org-l">${o.line}</p>${rideLine(o.ride)}<p class="ab-org-give"><a class="link" href="${o.give[0]}" target="_blank" rel="noopener noreferrer">${o.give[1]}</a></p></li>`).join("\n        ")}
      </ul>
      <div class="ab-help">
        <span class="eyebrow">If it&rsquo;s now</span>
        <span><a href="tel:988"><b>988</b> call or text</a>, any hour &middot; <span class="nowrap"><b>Trevor Project</b> <a href="tel:18664887386">1-866-488-7386</a></span> or text START to <span class="nowrap">678-678</span></span>
        <a class="link" href="/resources/">Help lines, by age</a>
      </div>
    </div>
  </div>
</section>`;

/* —— 7. the sign and the ways in. Nothing typed leaves the page. —— */
const NR = CHROME.NEXT_RIDE;
const SIGN = `<section class="ab-sign" id="sign" aria-labelledby="ab-sign-h">
  <div class="wrap ab-sign-in">
    <h2 class="ab-sign-h" id="ab-sign-h">${MARK_WORD("ab-sign-mark")}<span class="ab-plate" data-empty="true" data-sign-plate aria-hidden="true"></span><span class="sr" data-sign-sr>Cycle for</span></h2>
    <div class="ab-sign-form">
      <label class="ab-sign-q" for="ab-who">Who do you cycle for?</label>
      <input class="ab-sign-input" id="ab-who" type="text" maxlength="22" autocomplete="off" placeholder="Type it. The sign changes." data-sign-input>
      <p class="ab-sign-note">Nothing to pay, nothing to join. <button class="ab-sign-reset" type="button" data-sign-reset hidden>Clear the sign</button></p>
    </div>
    <div class="ab-ways">
      <a class="ab-ride" href="${CHROME.RIDE_HREF}" data-ride-next>${NR ? `<span class="ab-ride-d">${esc(NR.date)}</span>` : ""}<span class="ab-ride-t"><b>Ride with me</b>${NR ? `<span>${esc(NR.name)}, ${esc(NR.where)}</span>` : `<span>The rides I&rsquo;m doing in 2027</span>`}</span></a>
      <ul class="ab-ways-list">
        <li><a href="/rides/"><b>Find a group ride</b>${RIDES_N ? `<span>${RIDES_N} group rides worldwide</span>` : ""}</a></li>
        <li><a href="/cyclefor/"><b>Say it on video. Five seconds.</b><span>What do you cycle for?</span></a></li>
        <li><a href="${CHROME.INSTAGRAM}" target="_blank" rel="noopener noreferrer"><b>@cycl_eforchange</b><span>The miles, the rides, where I went.</span></a></li>
        <li><a href="#mission"><b>The orgs I ride for</b><span>Give on their page.</span></a></li>
      </ul>
    </div>
  </div>
</section>`;

const body = [OPEN, BIKE, BUBBLE, SAY, TEN, MISSION, SIGN].join("\n\n");
const ready = D.ready === true && empty.length === 0;
if (D.ready === true && empty.length) throw new Error(`build-about: ready is true but these sections have no words yet: ${empty.join(", ")}`);

const ld = [{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: D.title,
  url: CHROME.SITE + url,
  description: D.description,
  dateModified: D.updated,
  isPartOf: { "@type": "WebSite", name: "Cycle for Change", url: CHROME.SITE + "/" },
  mainEntity: { "@type": "Person", name: "Robert Castan", url: CHROME.SITE + url, homeLocation: { "@type": "Place", name: "Phoenix, Arizona" }, sameAs: [CHROME.INSTAGRAM, CHROME.STRAVA] },
}];

const page = `<!DOCTYPE html>
<!-- Generated by scripts/build-about.js from data/about.json. Edit those, not this file. -->
<html lang="en">
<head>
${CHROME.head({ title: D.title, description: D.description, url, ld, styles: ["/about/about.css"], robots: ready ? undefined : "noindex, follow" })}
</head>
<body class="ab">
${CHROME.HEADER}
<main id="main" class="ab-main">

${body}

</main>
${CHROME.FOOTER}
<script src="/about/about.js?v=${V}" defer></script>
</body>
</html>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, page);

/* the pages sitemap carries /about/ only once it's ready */
const SM = path.join(SITE_DIR, "sitemap-pages.xml");
let sm = fs.readFileSync(SM, "utf8");
const entry = `  <url>\n    <loc>${CHROME.SITE}${url}</loc>\n    <lastmod>${D.updated}</lastmod>\n  </url>\n`;
const had = sm.includes(`<loc>${CHROME.SITE}${url}</loc>`);
sm = sm.replace(new RegExp(`  <url>\\s*<loc>${(CHROME.SITE + url).replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}</loc>[\\s\\S]*?</url>\\n`), "");
if (ready) sm = sm.replace("</urlset>", entry + "</urlset>");
if (ready || had) { fs.writeFileSync(SM, sm); require("./sitemap-index.js").run({ quiet: true }); }

console.log(`wrote ${path.relative(ROOT, OUT)} (${ready ? "ready, indexed" : `draft, noindex: ${empty.length} section${empty.length === 1 ? "" : "s"} waiting for Robert's words: ${empty.join(", ")}`})`);
