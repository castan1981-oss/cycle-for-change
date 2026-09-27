/* Cycle for Change — shared page chrome for every page that is NOT the homepage.
   One header, one footer, one font link. Imported by:
     scripts/build-events.js   (/events/, /towns/)
     scripts/build-calendar.js (/events/2027/)
     tools/build-rides.js      (/rides/)
   The hand-written content pages (/guides/, /field-notes/, /resources/,
   /journal/, /tonight/) carry the same markup, pasted from the output of
   `node scripts/chrome.js` — change it here, then re-run the generators and
   re-paste (scripts/apply-chrome.py does the paste).
   Styled by /events/events.css (.site-head, .site-nav, .site-foot).
   Creosote house: Outfit + Space Mono only. Volt is not used in the chrome. */

"use strict";

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400..800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">`;

const MARK = `<svg class="mark-glyph" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <path d="M98.45 71.03 A40 40 0 0 1 50.32 98.81" fill="none" stroke="#2A2E28" stroke-width="12" stroke-linecap="round"/>
        <path d="M31.23 87.79 A40 40 0 0 1 31.23 32.21" fill="none" stroke="#5C6B4A" stroke-width="12" stroke-linecap="round"/>
        <path d="M50.32 21.19 A40 40 0 0 1 98.45 48.97" fill="none" stroke="#C4B7A2" stroke-width="12" stroke-linecap="round"/>
        <circle cx="60" cy="60" r="6" fill="#2A2E28"/>
      </svg>`;

const INSTAGRAM = "https://www.instagram.com/cycl_eforchange";

const HEADER = `<a class="skip" href="#main">Skip to content</a>
<header class="site-head">
  <div class="wrap">
    <a class="mark" href="/" aria-label="Cycle for Change home">
      ${MARK}
      <span class="wordmark">Cycle <span class="for">For</span> Change</span>
    </a>
    <nav class="site-nav" aria-label="Primary">
      <a href="/rides/">Rides</a>
      <a href="/events/2027/">2027</a>
      <a href="/field-notes/">Read</a>
      <a href="/resources/">Resources</a>
      <a href="/#board" class="btn btn-solid">Pledge</a>
    </nav>
  </div>
  <p class="tally-line wrap"><span class="tally-num" data-cur>—</span>&nbsp;miles since June 1 &middot; 10000 in 2027 &middot; all on the bike</p>
</header>`;

const FOOTER = `<footer class="site-foot">
  <div class="wrap">
    <p class="foot-stack" aria-label="Cycle for Change"><span>Cycle</span><span class="for">For</span><span>Change</span></p>
    <nav class="foot-grid" aria-label="Footer">
      <p><span class="foot-h">Ride</span><a href="/rides/">Group rides</a><a href="/events/">Events</a><a href="/events/2027/">2027 calendar</a><a href="/towns/">Towns</a><a href="/tonight/">Tonight</a></p>
      <p><span class="foot-h">Read</span><a href="/field-notes/">Field notes</a><a href="/guides/">Guides</a><a href="/journal/the-carrot-cake-theory/">Journal</a><a href="/resources/">Resources</a></p>
      <p><span class="foot-h">The pledge</span><a href="/">Home</a><a href="/#board">Get on the board</a><a href="/#vote">Where it goes</a><a href="${INSTAGRAM}" rel="noopener">Instagram</a></p>
    </nav>
    <p class="foot-crisis"><span class="foot-h">If it&rsquo;s now</span><span><b>988</b> call or text, any hour &middot; <b>Trevor Project</b> <a href="tel:18664887386">1-866-488-7386</a> or text START to 678-678</span></p>
    <p class="foot-base"><span>Cycle for Change&trade;</span><span>Phoenix &middot; bike only</span></p>
  </div>
</footer>`;

module.exports = { FONTS, MARK, HEADER, FOOTER, INSTAGRAM };

if (require.main === module) {
  process.stdout.write(JSON.stringify({ FONTS, HEADER, FOOTER }));
}
