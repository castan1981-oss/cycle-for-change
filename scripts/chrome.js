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
// Studio pass 1 (Oct 21, 2026): ONE version for every stylesheet link on the site (and /chrome.js). head() puts it on
// /chrome.css and every section sheet a generator passes (any old ?v= is replaced), apply-chrome.py gets it through
// head(), build-home.js puts it on /home.css. Bump it whenever a stylesheet or /chrome.js changes and regenerate in the
// §2 order: a page must never pair an old /chrome.css with new section sheets (they share cascade layers).
const CSS_V = 52;
const ver = (href) => `${href.split("?")[0]}?v=${CSS_V}`;

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
// `image` / `imageAlt` / `ogTitle` (Oct 8, 2026): a page that gets shared on its own (/nov7/) carries its own
// card; apply-chrome.py keeps a page's own og:image and og:title when they differ from the defaults.
function head({ title, description, url, ogType = "website", styles = [], ld = [], extra = "", dark = false, robots = "index, follow, max-snippet:-1, max-image-preview:large", image = OG_IMAGE, imageAlt = "", ogTitle = "" }) {
  // Search pass (Oct 5, 2026): Google cuts titles near 60 characters and shows the site name on its own line. The
  // <title> carries the brand only when the whole title fits; share cards (og:/twitter:title) always carry it.
  const branded = /Cycle for Change/.test(title) ? title : `${title} — Cycle for Change`;
  const full = ogTitle || branded;
  const img = /^https?:/.test(image) ? image : SITE + image;
  const shown = /Cycle for Change/.test(title) || title.length > 41 ? title : branded;
  const canonical = /^https?:/.test(url) ? url : SITE + url;
  const sheets = ["/chrome.css", ...styles].map((h) => `  <link rel="stylesheet" href="${ver(h)}">`).join("\n");
  const json = ld.map((o) => `  <script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n");
  return `  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="${dark ? "dark" : "light"}">
  <title>${esc(shown)}</title>
  <meta name="description" content="${attr(description)}">
  <link rel="canonical" href="${attr(canonical)}">
  <link rel="alternate" type="application/rss+xml" title="Cycle for Change" href="${SITE}/feed.xml">
  <meta name="robots" content="${attr(robots)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="Cycle for Change">
  <meta property="og:url" content="${attr(canonical)}">
  <meta property="og:title" content="${attr(full)}">
  <meta property="og:description" content="${attr(description)}">
  <meta property="og:image" content="${attr(img)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">${imageAlt ? `\n  <meta property="og:image:alt" content="${attr(imageAlt)}">` : ""}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${attr(full)}">
  <meta name="twitter:description" content="${attr(description)}">
  <meta name="twitter:image" content="${attr(img)}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/favicon-180.png">
  ${FONTS}
${sheets}
${json}${extra ? "\n" + extra : ""}`;
}

/* Pass 23d (Oct 3, 2026): the wheel sits in an asphalt square (.brand-sq); on phones the square is the
   bar's corner. Same drawing as the homepage's. */
const MARK = `<svg class="brand-mark" viewBox="0 0 760 150" aria-hidden="true" focusable="false">
        <defs>
          <path id="lpC" d="M52 34 V24 Q52 8 36 8 H33 M27 8 H24 Q8 8 8 24 V126 Q8 142 24 142 H27 M33 142 H36 Q52 142 52 126 V116"/>
          <path id="lpY" d="M11 4 L30 68 L49 4 M30 68 V150"/>
          <path id="lpL" d="M8 0 V150 M22 142 H54"/>
          <path id="lpE" d="M8 0 V150 M22 8 H54 M22 75 H47 M22 142 H54"/>
          <path id="lpF" d="M8 0 V150 M22 8 H54 M22 75 H47"/>
          <path id="lpO" d="M27 8 H24 Q8 8 8 24 V126 Q8 142 24 142 H27 M33 8 H36 Q52 8 52 24 V126 Q52 142 36 142 H33"/>
          <path id="lpR" d="M8 0 V150 M22 8 H36 Q52 8 52 24 V58 Q52 74 36 74 H22 M33 90 L50 150"/>
          <clipPath id="lpRow"><rect x="-20" y="0" width="900" height="150"/></clipPath>
        </defs>
        <g clip-path="url(#lpRow)" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round">
          <use href="#lpC"/><use href="#lpY" transform="translate(74 0)"/><use href="#lpC" transform="translate(148 0)"/><use href="#lpL" transform="translate(222 0)"/><use href="#lpE" transform="translate(296 0)"/>
          <use href="#lpF" transform="translate(414 0)"/><use href="#lpO" transform="translate(488 0)"/><use href="#lpR" transform="translate(562 0)"/>
        </g>
        <rect class="lp-bar" x="652" y="114" width="98" height="36" fill="#A84C58"/>
      </svg>`;

// Pass 36 (Oct 6, 2026): Robert: "a thing as you scroll down every single page and the homepage above the
// fold that says ride with me and that essentially gets you to the next event that I'm doing". One list,
// in date order; everything that says "Ride with me" points at the first one still ahead (`until` is its
// last day, Phoenix time). /ridebar.js re-picks in the browser, so a page nobody rebuilt never shows a
// ride that's over. When the list runs out, "Ride with me" goes back to the 2027 list.
// Oct 15, 2026: Cycling 4 one·n·ten (Nov 7, 2026) is off this list (Robert). Nothing links to /nov7/ any more.
// Oct 21, 2026 (studio pass 1): each href opens that ride's row on the riding page (/events/2027/riding/#<slug>;
// the calendar's OPEN_JS opens a hashed row). Tour de Palm Springs comes first: it's his next ride (Robert, Oct 21).
// Oct 25, 2026: the list is read from the calendar (data/calendar-2027.json, `riding: true`, date order), so the
// homepage's "The 2027 rides I'm doing" and the bar can never disagree. The bar only ever carries a date the
// organizer published (`date_status: "confirmed"`); projected and TBA rides are on the homepage list and the riding
// page, never on the bar. SHORT and WHERE are the house phrasings for the bar and the homepage; everything else is
// the calendar's own text (`place()` mirrors scripts/build-calendar.js).
const SHORT = { "life-time-sea-otter-classic": "Sea Otter Classic", "life-time-unbound-gravel": "Unbound Gravel", "seattle-to-portland-bicycle-classic": "Seattle to Portland", "recovery-ride": "Recovery Ride" };
const WHERE = { "center-ride-out": "LA to Ojai and back", "cycle-to-zero": "SF to the Russian River", "friends-for-life-bike-rally": "Toronto to Montr\u00e9al", "seattle-to-portland-bicycle-classic": "206 miles, one or two days", "recovery-ride": "Sausalito to Guerneville and back" };
const MON3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ymd = (iso) => String(iso || "").split("-").map(Number);
// "Feb 6", "Apr 23\u201325", "Sep 30\u2013Oct 2"; "" when there is no date
function dateText(start, end) {
  const [, m1, d1] = ymd(start); if (!m1) return "";
  const [, m2, d2] = ymd(end || start);
  if (m1 === m2 && d1 === d2) return `${MON3[m1 - 1]} ${d1}`;
  return m1 === m2 ? `${MON3[m1 - 1]} ${d1}\u2013${d2}` : `${MON3[m1 - 1]} ${d1}\u2013${MON3[m2 - 1]} ${d2}`;
}
function place(e) {
  if (e.start_city && e.end_city && e.start_city !== e.end_city && e.days > 1) {
    const a = e.start_city.split("(")[0].trim(), b = e.end_city.split("(")[0].trim();
    if (a && b && a !== b) return `${a} to ${b}`;
  }
  const c = (e.city || "").replace(/\s*\(.*?\)/g, "").replace(/\s+/g, " ").trim();
  return c ? `${c}${e.state && !c.includes(e.state) ? ", " + e.state : ""}` : (e.state || e.region || "");
}
const RIDES_LIST = "/events/2027/riding/";
// every ride on the calendar Robert is doing, date order, TBA last \u2014 the homepage list reads this
const RIDING = (count("data/calendar-2027.json", (d) => (d.events || []).filter((e) => e.riding)) || [])
  .sort((a, b) => (a.start || "9999").localeCompare(b.start || "9999") || a.name.localeCompare(b.name))
  .map((e) => ({
    slug: e.slug, name: SHORT[e.slug] || e.name.replace(/\s*\(.*?\)\s*/g, " ").trim(), full: e.name,
    start: e.start || "", end: e.end || e.start || "", status: e.date_status || "", date: dateText(e.start, e.end),
    where: WHERE[e.slug] || place(e), category: e.category || "", days: Number(e.days) || 1, cause: e.cause || "",
    href: `${RIDES_LIST}#${e.slug}`,
  }));
const NEXT_RIDES = RIDING.filter((r) => r.status === "confirmed" && r.end).map((r) => ({ until: r.end, date: r.date, name: r.name, where: r.where, href: r.href }));
const phxToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Phoenix" }).format(new Date());
const NEXT_RIDE = NEXT_RIDES.find((r) => r.until >= phxToday()) || null;
const RIDE_HREF = NEXT_RIDE ? NEXT_RIDE.href : RIDES_LIST;
const escH = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// the bar: hidden until /ridebar.js shows it (and only once /chrome.css or /home.css has placed it).
// data-until (studio pass 1): the bar's last day. It was data-cur, which /chrome.js also paints the tally into.
const RIDE_BAR = NEXT_RIDE ? `<aside class="ridebar" id="rideBar" aria-label="Ride with me" data-until="${NEXT_RIDE.until}" data-rides="${escH(JSON.stringify(NEXT_RIDES))}" hidden>
    <a class="ridebar-a" href="${NEXT_RIDE.href}" data-ride-next><span class="ridebar-d">${escH(NEXT_RIDE.date)}</span><span class="ridebar-t"><b>Ride with me</b><span class="ridebar-n">${escH(NEXT_RIDE.name)}, ${escH(NEXT_RIDE.where)}</span></span><span class="ridebar-go" aria-hidden="true">&rarr;</span></a>
    <button class="ridebar-x" type="button" aria-label="Hide this for now"></button>
  </aside>
  <script src="/ridebar.js?v=39" defer></script>` : "";

const n = (v) => (v == null ? "" : `<span>${v}</span>`);

const HEADER = `<a class="skip" href="#main">Skip to content</a>
<header class="nav site-head" id="nav">
  <div class="wrap nav-in">
    <a class="brand" href="/" aria-label="Cycle for Change home">
      ${MARK}
      <span class="sr">Cycle for Change</span>
    </a>
    <!-- Studio pass 1: one nav list. Guides replaces Field notes (Field notes stays in the footer and on /guides/). -->
    <nav class="nav-links" aria-label="Primary">
      <a href="/find-a-ride/">Find a ride</a>
      <a href="/events/2027/">2027 calendar</a>
      <a href="/towns/">Towns</a>
      <a href="/guides/">Guides</a>
      <a href="/resources/">Resources</a>
    </nav>
    <div class="nav-right">
      <a class="btn btn--sm" href="${RIDE_HREF}" data-ride-next>Ride with me</a>
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
    <li><a href="${RIDE_HREF}" data-ride-next>Ride with me <span>The next ride I&rsquo;m doing</span></a></li>
    <li><a href="/find-a-ride/">Find a ride ${n(RIDE_COUNT == null ? null : RIDE_COUNT.toLocaleString("en-US"))}</a></li>
    <li><a href="/events/2027/">2027 calendar ${n(CAL_COUNT)}</a></li>
    <li><a href="/towns/">Towns <span>Riding somewhere new</span></a></li>
    <li><a href="/guides/">Guides <span>Notes &middot; journal</span></a></li>
    <li><a href="/resources/">Resources <span>Help lines, by age</span></a></li>
  </ul>
  <div class="menu-foot">
    <span class="eyebrow">If it&rsquo;s now</span>
    <span><a href="tel:988"><b>988</b> call or text</a>, any hour</span>
    <span><b>Trevor Project</b> <a href="tel:18664887386">1-866-488-7386</a></span>
  </div>
</div>
<p class="tally-line"><span class="wrap"><a href="/#road"><span class="tally-num" data-cur>&mdash;</span>&nbsp;training miles since June 1. The 10,000 start Jan 1.</a></span></p>`;

const FOOTER = `<footer class="foot site-foot">
  ${RIDE_BAR}
  <div class="wrap">
    <!-- the footer answers the sign: the stencil (clean, no wear — it's under big print) and "change" on the plate.
         The letter paths are the header mark's defs (#lpC …), on every page. No wordmark in a font (the Oct 6 panel). -->
    <div class="foot-sign" role="img" aria-label="Cycle for change">
      <svg class="foot-stencil" viewBox="-10 -10 370 350" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round">
          <use href="#lpC"/><use href="#lpY" transform="translate(74 0)"/><use href="#lpC" transform="translate(148 0)"/><use href="#lpL" transform="translate(222 0)"/><use href="#lpE" transform="translate(296 0)"/>
          <use href="#lpF" transform="translate(0 180)"/><use href="#lpO" transform="translate(74 180)"/><use href="#lpR" transform="translate(148 180)"/>
        </g>
      </svg>
      <span class="foot-plate">change</span>
    </div>
    <div class="foot-grid">
      <div class="foot-col">
        <p class="eyebrow">Ride</p>
        <a href="/rides/">Group rides</a>
        <a href="/events/2027/">2027 calendar</a>
        <a href="/towns/">Towns</a>
        <a href="/tonight/">Tonight</a>
        <a href="/brief/">Brief a ride</a>
        <a href="/events/2027/riding/">My 2027 rides</a>
        <a href="/#orgs">The orgs I ride for</a>
      </div>
      <div class="foot-col">
        <p class="eyebrow">Read</p>
        <a href="/field-notes/">Field notes</a>
        <a href="/guides/">Guides</a>
        <a href="/journal/">Journal</a>
        <a href="/resources/">Resources</a>
      </div>
      <div class="foot-col">
        <p class="eyebrow">Follow</p>
        <a href="${INSTAGRAM}" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="${STRAVA}" target="_blank" rel="noopener noreferrer">Strava</a>
      </div>
      <div class="foot-col signup" aria-label="Mile updates">
        <p class="eyebrow">Mile updates</p>
        <p class="note">The miles, the rides, where I went. They go up on Instagram.</p>
        <a class="link" href="${INSTAGRAM}" target="_blank" rel="noopener noreferrer">@cycl_eforchange</a>
      </div>
    </div>
    <div class="foot-crisis">
      <span class="eyebrow">If it&rsquo;s now</span>
      <span><a href="tel:988"><b>988</b> call or text</a>, any hour &middot; <b>Trevor Project</b> <a href="tel:18664887386">1-866-488-7386</a> or text START to 678-678</span>
    </div>
    <div class="foot-line"><span>Cycle for Change</span><span class="foot-trust"><a href="/methodology/">How rides are checked</a><a href="/privacy/">Privacy</a><a href="/contact/">Contact</a></span><span>Phoenix. Bike only.</span></div>
  </div>
</footer>
<script src="/chrome.js?v=${CSS_V}" defer></script>`;
// the footer's script tag, for the homepage (it loads /home.js instead)
const CHROME_JS = `<script src="/chrome.js?v=${CSS_V}" defer></script>`;

/* The pledge block that closes every inner page, right before the footer.
   One component, one copy, everywhere. No "10000" mark (retired); prose says 10,000.
   Studio pass 1: two actions. "The live count" went: the tally line under the header is that link now. Nothing in
   <main> comes after this block (apply-chrome.py moves a hand page's back link and notes above it). */
function pledge({ line, copy } = {}) {
  return `<section class="pledge" aria-labelledby="pledge-h">
  <h2 class="pledge-line" id="pledge-h">${line || "I&rsquo;d like to say I ride for everyone else. I ride because it changed me."}</h2>
  <p class="pledge-copy">${copy || "In 2027 I ride 10,000 miles, all on the bike, and every ride gets written down. The money goes through the orgs&rsquo; own rides. It never touches me."}</p>
  <div class="cta-row"><a class="btn btn--bone" href="${RIDE_HREF}" data-ride-next>Ride with me</a><a class="btn btn--ghost" href="/rides/">Find a group ride</a></div>
</section>`;
}
const PLEDGE = pledge();

module.exports = { RIDING, NEXT_RIDES, NEXT_RIDE, RIDE_HREF, SITE, INSTAGRAM, STRAVA, OG_IMAGE, FONTS, MARK, HEADER, FOOTER, CHROME_JS, PLEDGE, pledge, head, esc, attr, CSS_V };

if (require.main === module) {
  // `node scripts/chrome.js` -> the markup as JSON (apply-chrome.py reads it)
  // `node scripts/chrome.js head '{"title":…}'` -> one page's <head> contents
  if (process.argv[2] === "head") process.stdout.write(head(JSON.parse(process.argv[3])));
  else process.stdout.write(JSON.stringify({ FONTS, HEADER, FOOTER, PLEDGE, SITE, INSTAGRAM, OG_IMAGE, CSS_V }));
}
