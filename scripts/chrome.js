/* Cycle for Change — shared page chrome for every page that is NOT the homepage.
   One head block, one header (+ mobile menu), one tally line, one footer.
   Mirrors cfc-site/index.html + home.css exactly, so the site reads as one thing.

   Imported by:
     scripts/build-events.js   (/events/, /towns/)
     scripts/build-calendar.js (/events/2027/)
     tools/build-rides.js      (/rides/)
   The hand-written content pages (/guides/, /field-notes/, /resources/, /journal/,
   /tonight/, /404.html) get the same markup from `python3 scripts/apply-chrome.py`.
   Styled by /chrome.css. Behaviour (menu, tally, signup) in /chrome.js.

   Change the chrome here, then: run the three generators + apply-chrome.py.
   Lane Paint (Oct 5, 2026): Overpass only; the mark is the drawn CYCLE FOR with its rose bar. */

"use strict";

const fs = require("fs");
const path = require("path");

const SITE = "https://cycleforchange.org";
const INSTAGRAM = "https://www.instagram.com/cycl_eforchange";
const STRAVA = "https://www.strava.com/athletes/22899089";
const OG_IMAGE = `${SITE}/og-cfc.png`;

// Counts shown in the mobile menu, same as the homepage. Read from the data so
// they never go stale here (the homepage keeps its own by hand).
function count(rel, pick) {
  try { return pick(JSON.parse(fs.readFileSync(path.join(__dirname, "..", rel), "utf8"))); }
  catch (e) { return null; }
}
// rides on the lists (live.json, written by tools/build-rides.js) — rides we can't vouch for aren't counted
const RIDE_COUNT = count("cfc-site/rides/live.json", (d) => Array.isArray(d) ? d.length : null) ?? count("cfc-site/rides/rides.json", (d) => Array.isArray(d) ? d.length : null);
const CAL_COUNT = count("data/calendar-2027.json", (d) => Array.isArray(d.events) ? d.events.length : null);

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s) => esc(s).replace(/"/g, "&quot;");

/* Overpass is self-hosted (cfc-site/fonts/, OFL): Google's build classes the middot (·) as a combining mark,
   so "one·n·ten" rendered as "onenten" and every " · " separator hugged the next word. The latin file has
   that one glyph reclassified (Oct 5, 2026); the @font-face rules live in /chrome.css and /home.css. */
const FONTS = `<link rel="preload" href="/fonts/overpass-latin.woff2" as="font" type="font/woff2" crossorigin>`;

/* Everything a page's <head> needs besides its own title/description/canonical.
   `styles` = the page's stylesheets after /chrome.css. `ld` = JSON-LD objects. */
function head({ title, description, url, ogType = "website", styles = [], ld = [], extra = "", dark = false, robots = "index, follow, max-snippet:-1, max-image-preview:large" }) {
  const full = /Cycle for Change/.test(title) ? title : `${title} — Cycle for Change`;
  const canonical = /^https?:/.test(url) ? url : SITE + url;
  const sheets = ["/chrome.css", ...styles].map((h) => `  <link rel="stylesheet" href="${h}">`).join("\n");
  const json = ld.map((o) => `  <script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n");
  return `  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="${dark ? "dark" : "light"}">
  <title>${esc(full)}</title>
  <meta name="description" content="${attr(description)}">
  <link rel="canonical" href="${attr(canonical)}">
  <meta name="robots" content="${attr(robots)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="Cycle for Change">
  <meta property="og:url" content="${attr(canonical)}">
  <meta property="og:title" content="${attr(full)}">
  <meta property="og:description" content="${attr(description)}">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${attr(full)}">
  <meta name="twitter:description" content="${attr(description)}">
  <meta name="twitter:image" content="${OG_IMAGE}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/favicon-180.png">
  ${FONTS}
${sheets}
${json}${extra ? "\n" + extra : ""}`;
}

/* Pass 23d (Oct 3, 2026): the wheel sits in an asphalt square (.brand-sq); on phones the square is the
   bar's corner. Same drawing as the homepage's. */
// Pass 33 (Oct 6, 2026): the wordmark is plain type — Overpass 800, sentence case. The stencil is retired.
const MARK = `<span class="brand-word">Cycle for Change</span>`;

const n = (v) => (v == null ? "" : `<span>${v}</span>`);

const HEADER = `<a class="skip" href="#main">Skip to content</a>
<header class="nav site-head" id="nav">
  <div class="wrap nav-in">
    <a class="brand" href="/" aria-label="Cycle for Change home">
      ${MARK}
    </a>
    <nav class="nav-links" aria-label="Primary">
      <a href="/find-a-ride/">Find a ride</a>
      <a href="/events/2027/">2027 calendar</a>
      <a href="/towns/">Towns</a>
      <a href="/field-notes/">Field notes</a>
      <a href="/resources/">Resources</a>
    </nav>
    <div class="nav-right">
      <a class="btn btn--sm" href="/events/2027/riding/">Ride with me</a>
      <button class="menu-btn" id="menuBtn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><i></i></button>
    </div>
  </div>
</header>
<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>
  <div class="menu-top">
    <span class="eyebrow">Cycle for Change</span>
    <button class="menu-close" id="menuClose" type="button" aria-label="Close menu"></button>
  </div>
  <ul class="menu-list">
    <li><a href="/events/2027/riding/">Ride with me <span>The 2027 rides</span></a></li>
    <li><a href="/find-a-ride/">Find a ride ${n(RIDE_COUNT)}</a></li>
    <li><a href="/events/2027/">2027 calendar ${n(CAL_COUNT)}</a></li>
    <li><a href="/towns/">Town guides <span>Riding somewhere new</span></a></li>
    <li><a href="/guides/">Guides <span>Notes &middot; journal</span></a></li>
    <li><a href="/resources/">Resources <span>Help lines, by age</span></a></li>
  </ul>
  <div class="menu-foot">
    <span class="eyebrow">If it&rsquo;s now</span>
    <span><b>988</b> call or text, any hour</span>
    <span><b>Trevor Project</b> <a href="tel:18664887386">1-866-488-7386</a></span>
  </div>
</div>
<p class="tally-line"><span class="wrap"><span class="dot" aria-hidden="true"></span><span class="tally-num" data-cur>&mdash;</span>&nbsp;training miles since June 1. The 10,000 start Jan 1.</span></p>`;

const FOOTER = `<footer class="foot site-foot">
  <div class="wrap">
    <p class="foot-word">Cycle for Change</p>
    <div class="foot-grid">
      <div class="foot-col">
        <p class="eyebrow">Ride</p>
        <a href="/rides/">Group rides</a>
        <a href="/events/">Events</a>
        <a href="/events/2027/">2027 calendar</a>
        <a href="/towns/">Towns</a>
        <a href="/tonight/">Tonight</a>
        <a href="/events/2027/riding/">Ride with me</a>
        <a href="/#orgs">The orgs I ride for</a>
      </div>
      <div class="foot-col">
        <p class="eyebrow">Read</p>
        <a href="/field-notes/">Field notes</a>
        <a href="/guides/">Guides</a>
        <a href="/journal/the-carrot-cake-theory/">Journal</a>
        <a href="/resources/">Resources</a>
      </div>
      <div class="foot-col">
        <p class="eyebrow">Follow</p>
        <a href="${INSTAGRAM}" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="${STRAVA}" target="_blank" rel="noopener noreferrer">Strava</a>
      </div>
      <form class="foot-col signup" name="waitlist" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field" id="emailForm" aria-label="Email signup">
        <input type="hidden" name="form-name" value="waitlist">
        <p class="hp" hidden><label>Leave this empty: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <p class="eyebrow">Mile updates</p>
        <p class="note">About once a month. The miles, the rides, where I went.</p>
        <label class="lab" for="email">Email</label>
        <input class="field" id="email" type="email" name="email" required autocomplete="email" inputmode="email">
        <button class="btn btn--bone btn--sm" type="submit">Send me mile updates</button>
        <p class="ok" id="emailOk" role="status" aria-live="polite" hidden></p>
      </form>
    </div>
    <div class="foot-crisis">
      <span class="eyebrow">If it&rsquo;s now</span>
      <span><b>988</b> call or text, any hour &middot; <b>Trevor Project</b> <a href="tel:18664887386">1-866-488-7386</a> or text START to 678-678</span>
    </div>
    <div class="foot-line"><span>Cycle for Change</span><span>Phoenix. Bike only.</span></div>
  </div>
</footer>
<script src="/chrome.js" defer></script>`;

/* The pledge block that closes every inner page, right before the footer.
   One component, one copy, everywhere. `10000` is the story mark; prose says 10,000. */
function pledge({ line, copy } = {}) {
  return `<section class="pledge" aria-labelledby="pledge-h">
  <p class="pledge-num" aria-hidden="true">10000</p>
  <h2 class="pledge-line" id="pledge-h">${line || "I&rsquo;d like to say I ride for everyone else. I ride because it changed me."}</h2>
  <p class="pledge-copy">${copy || "In 2027 I ride 10,000 miles, all on the bike, and every ride gets written down. The money goes through the orgs&rsquo; own rides. It never touches me."}</p>
  <div class="cta-row"><a class="btn btn--bone" href="/events/2027/riding/">Ride with me</a><a class="btn btn--ghost" href="/rides/">Find a group ride</a><a class="link" href="/">The live count</a></div>
</section>`;
}
const PLEDGE = pledge();

module.exports = { SITE, INSTAGRAM, STRAVA, OG_IMAGE, FONTS, MARK, HEADER, FOOTER, PLEDGE, pledge, head, esc, attr };

if (require.main === module) {
  // `node scripts/chrome.js` -> the markup as JSON (apply-chrome.py reads it)
  // `node scripts/chrome.js head '{"title":…}'` -> one page's <head> contents
  if (process.argv[2] === "head") process.stdout.write(head(JSON.parse(process.argv[3])));
  else process.stdout.write(JSON.stringify({ FONTS, HEADER, FOOTER, PLEDGE, SITE, INSTAGRAM, OG_IMAGE }));
}
