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
   Creosote house: Outfit + Space Mono only. Volt is not used in the chrome. */

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
const RIDE_COUNT = count("cfc-site/rides/rides.json", (d) => Array.isArray(d) ? d.length : null);
const CAL_COUNT = count("data/calendar-2027.json", (d) => Array.isArray(d.events) ? d.events.length : null);

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s) => esc(s).replace(/"/g, "&quot;");

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300..800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">`;

/* Everything a page's <head> needs besides its own title/description/canonical.
   `styles` = the page's stylesheets after /chrome.css. `ld` = JSON-LD objects. */
function head({ title, description, url, ogType = "website", styles = [], ld = [], extra = "", dark = false }) {
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
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
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

const MARK = `<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <path d="M98.45 71.03 A40 40 0 0 1 50.32 98.81" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
        <path d="M31.23 87.79 A40 40 0 0 1 31.23 32.21" fill="none" stroke="#5C6B4A" stroke-width="12" stroke-linecap="round"/>
        <path d="M50.32 21.19 A40 40 0 0 1 98.45 48.97" fill="none" stroke="#C4B7A2" stroke-width="12" stroke-linecap="round"/>
        <circle cx="60" cy="60" r="6" fill="currentColor"/>
      </svg>`;

const n = (v) => (v == null ? "" : `<span>${v}</span>`);

const HEADER = `<a class="skip" href="#main">Skip to content</a>
<header class="nav site-head" id="nav">
  <div class="wrap nav-in">
    <a class="brand" href="/" aria-label="Cycle for Change home">
      ${MARK}
      <span class="brand-word">Cycle <i>For</i> Change</span>
    </a>
    <nav class="nav-links" aria-label="Primary">
      <a href="/rides/">Ride</a>
      <a href="/field-notes/">Read</a>
      <a href="/resources/">Resources</a>
      <a href="/events/2027/">2027</a>
    </nav>
    <div class="nav-right">
      <a class="btn btn--sm" href="/#board">Pledge</a>
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
    <li><a href="/#board">Pledge a mile <span>Free</span></a></li>
    <li><a href="/rides/">Ride ${n(RIDE_COUNT)}</a></li>
    <li><a href="/events/2027/">2027 ${n(CAL_COUNT)}</a></li>
    <li><a href="/field-notes/">Read <span>Notes &middot; guides</span></a></li>
    <li><a href="/resources/">Resources <span>By age</span></a></li>
  </ul>
  <div class="menu-foot">
    <span class="eyebrow">If it&rsquo;s now</span>
    <span><b>988</b> call or text, any hour</span>
    <span><b>Trevor Project</b> <a href="tel:18664887386">1-866-488-7386</a></span>
  </div>
</div>
<p class="tally-line"><span class="wrap"><span class="dot" aria-hidden="true"></span><span class="tally-num" data-cur>&mdash;</span>&nbsp;miles since June 1 &middot; 10000 in 2027 &middot; all on the bike</span></p>`;

const FOOTER = `<footer class="foot site-foot">
  <div class="wrap">
    <p class="stack" aria-label="Cycle for Change"><span>Cycle</span><span class="for">For</span><span>Change</span></p>
    <div class="foot-grid">
      <div class="foot-col">
        <p class="eyebrow">Ride</p>
        <a href="/rides/">Group rides</a>
        <a href="/events/">Events</a>
        <a href="/events/2027/">2027 calendar</a>
        <a href="/towns/">Towns</a>
        <a href="/tonight/">Tonight</a>
        <a href="/#board">Pledge</a>
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
        <label class="lab" for="email">Email</label>
        <input class="field" id="email" type="email" name="email" required autocomplete="email" inputmode="email">
        <button class="btn btn--bone btn--sm" type="submit">Notify me</button>
        <p class="ok" id="emailOk" role="status" aria-live="polite" hidden></p>
      </form>
    </div>
    <div class="foot-crisis">
      <span class="eyebrow">If it&rsquo;s now</span>
      <span><b>988</b> call or text, any hour &middot; <b>Trevor Project</b> <a href="tel:18664887386">1-866-488-7386</a> or text START to 678-678</span>
    </div>
    <div class="foot-line"><span>Cycle for Change</span><span>Phoenix &middot; bike only</span></div>
  </div>
</footer>
<script src="/chrome.js" defer></script>`;

/* The pledge block that closes every inner page, right before the footer.
   One component, one copy, everywhere. `10000` is the story mark; prose says 10,000. */
const PLEDGE = `<section class="pledge" aria-labelledby="pledge-h">
  <p class="pledge-num" aria-hidden="true">10000</p>
  <h2 class="pledge-line" id="pledge-h">I do the miles. You decide who they&rsquo;re for.</h2>
  <p class="pledge-copy">In 2027 I ride 10,000 miles, all on the bike, every one of them for queer communities. You pledge a few cents a mile and vote where the money goes. It starts January 1.</p>
  <div class="cta-row"><a class="btn btn--bone" href="/#board">Pledge a mile</a><a class="btn btn--ghost" href="/#vote">See the orgs</a><a class="link" href="/">The live count</a></div>
</section>`;

module.exports = { SITE, INSTAGRAM, STRAVA, OG_IMAGE, FONTS, MARK, HEADER, FOOTER, PLEDGE, head, esc, attr };

if (require.main === module) {
  // `node scripts/chrome.js` -> the markup as JSON (apply-chrome.py reads it)
  // `node scripts/chrome.js head '{"title":…}'` -> one page's <head> contents
  if (process.argv[2] === "head") process.stdout.write(head(JSON.parse(process.argv[3])));
  else process.stdout.write(JSON.stringify({ FONTS, HEADER, FOOTER, PLEDGE, SITE, INSTAGRAM, OG_IMAGE }));
}
