/* Cycle for Change — the homepage. The editorial homepage (Oct 26, 2026): Robert and Cadence's approved direction,
   "a blend of MAAP's fashion-editorial energy and ASSOS's precision, original to Cycle for Change", built on the
   site's own mark, palette, type and data. The brief is the handoff Robert sent on Oct 26 (CLAUDE_START_HERE_CFC.md);
   what it changed in the house rules is in CLAUDE.md §3 ("The editorial homepage").

   Writes cfc-site/index.html from the shared chrome (header, menu, footer, the Ride with me bar) plus the page, in this
   order (Cadence's final notes, Oct 27, 2026: the rooms alternate light and dark, and the help lines come up sooner):
     1  #top    the film, full screen (tools/hero-film.py): the mark, who and what, one primary (Ride with me), two quiet links
     2  strip   the numbers on a lane: training miles (live), group rides, events
     3  #why    how this works (#how), then the story in his words and his photographs
     4  #road   10,000 (said once, big), the last rides from Strava (the log)
        #today  today I rode for (data/today.json)
     6  #orgs   the orgs I ride for, the line that says why, help lines
     5  #year   the 2027 rides I'm doing: where (data/geo/home-2027.json, tools/home-map.js) and when
        #ride   Center Ride Out (where the money goes)
     7  #find   find a group ride
     8  #read   field notes, guides, the journal
     9  #sign   CYCLE FOR + the blank: type and the sign changes (nothing is sent)
   (the numbers are the constants' names in this file; the page runs in the order listed)

   Run after any change to scripts/chrome.js, data/today.json, data/calendar-2027.json or data/ride-notes.json:
     node scripts/build-home.js
   Styles: /chrome.css (the frame and the system, shared with every page) then /home.css (this page, in
   @layer section, and the frame's homepage states unlayered at its foot). Behaviour: /home.js. Both carry
   CSS_V (scripts/chrome.js). Numbers in the markup are the fallback until the Strava feed answers. */
"use strict";

const fs = require("fs");
const path = require("path");
const CHROME = require("./chrome.js");
const PH = require("./photos.js");
// The words around the number switch at midnight Jan 1, 2027 in Phoenix (training count → the 2027 count). PR #211 adds
// that switch as tools/lib/season.js; until it lands this is the same markup, so either order of merging is safe.
let seasonText;
try { ({ seasonText } = require("../tools/lib/season.js")); } catch (e) {
  seasonText = (training, year, now = Date.now()) => {
    const on = now >= Date.UTC(2027, 0, 1, 7) ? "2027" : "training";
    const span = (key, html) => `<span data-season="${key}"${on === key ? "" : " hidden"}>${html}</span>`;
    return span("training", training) + span("2027", year);
  };
}

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "cfc-site", "index.html");
const V = CHROME.CSS_V;
const esc = (t) => String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const read = (rel) => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8")); } catch (e) { return null; } };

// —— the numbers, from the data (never typed) ——
const RN = (() => {
  const live = read("cfc-site/rides/live.json"), all = read("cfc-site/rides/rides.json");
  const rides = Array.isArray(live) ? live : Array.isArray(all) ? all : Array.isArray(all && all.rides) ? all.rides : [];
  const countries = new Set(rides.map((r) => r.country).filter((c) => c && c !== "US"));
  return { rides: rides.length || 1407, abroad: countries.size || 18 };
})();
const RIDES_N = RN.rides.toLocaleString("en-US");
const CAL = read("data/calendar-2027.json");
const CAL_N = CAL && Array.isArray(CAL.events) ? CAL.events.length.toLocaleString("en-US") : "640";
const TOWNS_N = fs.readdirSync(path.join(ROOT, "data", "towns")).filter((f) => f.endsWith(".json") && !f.startsWith("_")).length;
const GUIDES_N = fs.readdirSync(path.join(ROOT, "cfc-site", "guides"), { withFileTypes: true }).filter((d) => d.isDirectory()).length;
const TALLY = require("./tally.js");
const T0 = TALLY.loadTally();
const fmt = (n) => Math.round(n).toLocaleString("en-US");
// the days to Jan 1 the page is built on (home.js keeps it current)
const DAYS_TO = Math.max(0, Math.ceil((Date.UTC(2027, 0, 1, 7) - Date.now()) / 86400000));

// —— Ride with me: the next ride he's doing (scripts/chrome.js; /ridebar.js re-picks in the browser) ——
const NR = CHROME.NEXT_RIDE;
const RIDE_HREF = NR ? NR.href : CHROME.RIDE_HREF;

// his newest write-up (data/ride-notes.json): "Read the last ride", and the log row from that day links there
const NOTE = (() => {
  const all = read("data/ride-notes.json"); if (!all) return null;
  const list = Object.entries(all).flatMap(([slug, ns]) => (Array.isArray(ns) ? ns : []).filter((n) => n && /^\d{4}-\d{2}-\d{2}$/.test(n.date || "") && Array.isArray(n.paras) && n.paras.some((x) => String(x || "").trim())).map((n) => ({ slug, date: n.date })));
  list.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return list[0] ? { date: list[0].date, href: `/rides/${list[0].slug}/#robert` } : null;
})();

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const placeMonth = (where, ymd) => { const place = String(where || "").split(" · ")[0].trim(); const [y, m] = String(ymd || "").split("-").map(Number); return place && y && m ? `${place} · ${MON[m - 1]} ${y}` : String(where || ""); };

// —— the mark. The letters are the header's defs (#lpC …, scripts/chrome.js), so every copy is the one drawing ——
const LETTERS = (row2) => `<use href="#lpC"/><use href="#lpY" transform="translate(74 0)"/><use href="#lpC" transform="translate(148 0)"/><use href="#lpL" transform="translate(222 0)"/><use href="#lpE" transform="translate(296 0)"/>${row2 ? `</g><g transform="translate(0 180)"><g clip-path="url(#lpRow)" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round"><use href="#lpF"/><use href="#lpO" transform="translate(74 0)"/><use href="#lpR" transform="translate(148 0)"/></g>` : `<use href="#lpF" transform="translate(414 0)"/><use href="#lpO" transform="translate(488 0)"/><use href="#lpR" transform="translate(562 0)"/>`}`;
// one line, with the blank (the logo as the header draws it)
const MARK_LINE = (cls, worn) => `<svg class="${cls}" viewBox="0 0 760 150" aria-hidden="true" focusable="false"><g${worn ? ` filter="url(#lpWorn)"` : ""}><g clip-path="url(#lpRow)" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round">${LETTERS(false)}</g><rect class="lp-bar" x="652" y="114" width="98" height="36"/></g></svg>`;
// stacked, CYCLE over FOR, the blank after the R
const MARK_STACK = (cls) => `<svg class="${cls}" viewBox="-10 -10 370 350" aria-hidden="true" focusable="false"><g><g clip-path="url(#lpRow)" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round">${LETTERS(true)}</g><rect class="lp-bar" x="238" y="294" width="98" height="36"/></g></svg>`;
// one line, no bar: the plate after it is HTML (it carries a word)
const MARK_WORD = (cls) => `<svg class="${cls}" viewBox="0 0 626 150" aria-hidden="true" focusable="false"><g clip-path="url(#lpRow)" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round">${LETTERS(false)}</g></svg>`;

// —— the house marks on the homepage (24 grid, one 1.7 stroke, round caps), inlined so no sprite request ——
const DEFS = `<svg aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">
  <defs>
    <symbol id="mkPhx" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 14h20"/><path d="M7.5 14a4.5 4.5 0 0 1 9 0"/><path d="M12 6.5V4.5M6.2 8.7 4.8 7.3M17.8 8.7l1.4-1.4"/><path d="M9.5 20.5 11 14M14.5 20.5 13 14"/></g></symbol>
    <symbol id="mkOjai" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 16.5 7.5 8l3.5 5.5 3-4.5L22 16.5"/><path d="M3 20.5h18"/></g></symbol>
    <symbol id="mkSF" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20V4M17 20V4"/><path d="M5.5 7h3M15.5 7h3"/><path d="M2 15h20"/><path d="M7 4.5q5 9 10 0"/><path d="M1 14q4-1 6-9.5M23 14q-4-1-6-9.5"/><path d="M12 11v4"/></g></symbol>
    <symbol id="mkRide" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M4 7c0 4 1 6.5 3.5 6.5"/><path d="M20 7c0 4-1 6.5-3.5 6.5"/><path d="M12 7v9"/></g></symbol>
    <symbol id="mkWrite" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z"/><path d="M5 17a2 2 0 0 1 2-2h11"/><path d="M9 8h5"/></g></symbol>
    <symbol id="mkOrgs" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="6.5" cy="8" r="2.2"/><circle cx="12" cy="6.5" r="2.2"/><circle cx="17.5" cy="8" r="2.2"/><path d="M2.5 19a4 4 0 0 1 8 0M8 19a4 4 0 0 1 8 0M13.5 19a4 4 0 0 1 8 0"/></g></symbol>
    <symbol id="mkGroup" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 21 8.6 3M20.5 21 15.4 3"/><path d="M12 3v2.2M12 8.2v2.2" opacity=".55"/></g><g fill="currentColor"><circle cx="9.6" cy="17.2" r="1.8"/><circle cx="14.4" cy="17.2" r="1.8"/><circle cx="12" cy="13.2" r="1.5"/></g></symbol>
    <symbol id="mkFinish" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V4M20 21V4"/><path d="M4 5h16v5H4z"/></g><g fill="currentColor"><rect x="4" y="5" width="4" height="2.5"/><rect x="12" y="5" width="4" height="2.5"/><rect x="8" y="7.5" width="4" height="2.5"/><rect x="16" y="7.5" width="4" height="2.5"/></g></symbol>
    <symbol id="mkSearch" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></g></symbol>
  </defs>
</svg>`;

// —— 1. the hero: the film, the mark, who and what, one primary ——
// the two films carry their own numbers (tools/hero-film.py --n / --wide-n); bump the one that was recut
const FILM = {
  phone: { mp4: "/film/hero-phone-8.mp4", webm: "/film/hero-phone-8.webm", poster: "/film/hero-phone-8", w: 608, h: 1080 },
  wide: { mp4: "/film/hero-wide-9.mp4", webm: "/film/hero-wide-9.webm", poster: "/film/hero-wide-9", w: 1620, h: 960 },
};
// the two-panel film on a landscape screen at 760 and up; the one-frame film on phones and portrait tablets
const WIDE_Q = "(min-width: 760px) and (min-aspect-ratio: 1/1)";
const PHONE_Q = "(max-width: 759px), (max-aspect-ratio: 1/1)";
const heroRide = `<a class="hero-ride" id="heroRide" href="${esc(RIDE_HREF)}"${NR ? " data-ride-next" : ""}>${NR ? `<span class="ridebar-d">${esc(NR.date)}</span>` : ""}<span class="hero-ride-t"><span class="finder-t">Ride with me</span><span class="finder-s">${NR ? `${esc(NR.name)}, ${esc(NR.where)}` : "The rides I&rsquo;m doing in 2027"}</span></span><span class="ridebar-go" aria-hidden="true">&rarr;</span></a>`;
const HERO = `<!-- —— 1. the film. Robert's own footage, cut car-free (tools/hero-film.py): one frame on a phone, two panels on a wide
     screen (the words sit inside the wide one, the gutter clear of the nav). One primary and two quiet links: Find a group ride, and Read the last ride
     when there is one (his newest write-up, never the riding page; CLAUDE.md §3). The poster is the film's first frame and the page's largest paint; /home.js
     starts the film after load, never under reduced motion or Save-Data, and the button always stops it. Over it only the
     stencil and one caption (Robert and Cadence, Oct 27, 2026: "10,000 miles. One year. All on the bike."); his sentence
     moved to the story, #why. —— -->
<section class="hero" id="top" aria-labelledby="hero-h" data-film="off">
  <div class="hero-media">
    <picture class="hero-poster">
      <source media="${WIDE_Q}" type="image/avif" srcset="${FILM.wide.poster}.avif">
      <source media="${WIDE_Q}" type="image/webp" srcset="${FILM.wide.poster}.webp">
      <source media="${WIDE_Q}" srcset="${FILM.wide.poster}.jpg">
      <source type="image/avif" srcset="${FILM.phone.poster}.avif">
      <source type="image/webp" srcset="${FILM.phone.poster}.webp">
      <img src="${FILM.phone.poster}.jpg" width="${FILM.phone.w}" height="${FILM.phone.h}" alt="Robert riding at the camera in a yellow helmet and a pink print jersey, railroad tracks behind him." fetchpriority="high">
    </picture>
    <video class="hero-film" id="heroFilm" muted loop playsinline disablepictureinpicture preload="none" aria-hidden="true" tabindex="-1"
      data-phone-mp4="${FILM.phone.mp4}" data-phone-webm="${FILM.phone.webm}" data-wide-mp4="${FILM.wide.mp4}" data-wide-webm="${FILM.wide.webm}" data-wide-q="${WIDE_Q}"></video>
    <div class="hero-scrim" aria-hidden="true"></div>
  </div>
  <div class="wrap hero-in">
    <h1 class="hero-h" id="hero-h">${MARK_LINE("hero-mark hero-mark--line", false)}${MARK_STACK("hero-mark hero-mark--stack")}<span class="sr">Cycle for Change</span></h1>
    <p class="hero-cap"><span class="nowrap">10,000 miles.</span> <span class="nowrap">One year.</span> <span class="nowrap">All on the bike.</span></p>
    <div class="hero-acts">
      ${heroRide}
      <p class="hero-links"><a class="link link--bone" href="/rides/">Find a group ride</a>${NOTE ? `<a class="link link--bone" href="${esc(NOTE.href)}">Read the last ride</a>` : ""}</p>
    </div>
  </div>
  <button class="hero-pause" id="heroPause" type="button" hidden><svg class="hp-pause" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z"/></svg><svg class="hp-play" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.2v13.6L19 12z"/></svg><span class="hp-label">Pause the film</span></button>
</section>
`;

// —— 2. the strip: the numbers on a lane ——
const STRIP = `<!-- —— 2. the numbers, on a lane. One number for the miles (since June 1); the 10,000 is said once, in #road, never next to it. —— -->
<section class="strip" aria-label="The numbers">
  <div class="wrap strip-in">
    <p class="strip-cell strip-cell--miles"><span class="strip-n"><b class="num" data-miles>${T0 ? fmt(T0.miles) : "&mdash;"}</b></span><span class="strip-l"><b>${seasonText("training miles since June 1", "miles in 2027")}</b>, <a id="stravaLink" href="https://www.strava.com/athletes/22899089" target="_blank" rel="noopener noreferrer">on Strava</a>.${seasonText(` The count restarts in <b class="num" id="daysTo">${DAYS_TO}</b> <span id="daysW">${DAYS_TO === 1 ? "day" : "days"}</span>.`, "")}</span></p>
    <a class="strip-cell finder-tile" href="/rides/"><span class="strip-n num">${RIDES_N}</span><span class="strip-l">group rides worldwide</span></a>
    <a class="strip-cell finder-tile" href="/events/2027/"><span class="strip-n num">${CAL_N}</span><span class="strip-l">events in 2027</span></a>
  </div>
</section>
`;

// —— 3. the story: his words, his photographs, how this works ——
const fig = (key, cls) => PH.figure(key, { cls: "" }).replace('<figure class="ph ', `<figure class="ph ${cls} `);
const STORY = `<!-- —— 3. why. How this works first (the mechanics before the photographs, Pass 37), then his words only (CLAUDE.md §4)
     beside his photographs, clean-edged, the place · month line under each. —— -->
<section class="story" id="why" aria-labelledby="why-h">
  <div class="wrap how" id="how">
    <h2 class="how-h">How this works.</h2>
    <ol class="how-steps">
      <li><svg class="how-mk" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#mkRide"/></svg><h3 class="how-t">I ride.</h3><p>10,000 miles in 2027. Every ride lands here from Strava.</p></li>
      <li><svg class="how-mk" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#mkWrite"/></svg><h3 class="how-t">I write it down.</h3><p>Every ride gets a stroke. The big ones get a page.</p></li>
      <li><svg class="how-mk" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#mkOrgs"/></svg><h3 class="how-t">The money goes to the orgs.</h3><p>Through their own rides. Nothing here asks for a card.</p></li>
    </ol>
  </div>
  <div class="wrap story-in">
    <div class="story-words">
      <h2 class="story-h" id="why-h">It always says cycling.</h2>
      <p class="story-say">I&rsquo;d like to say I ride for everyone else. I ride because it changed me.</p>
      <p class="story-lede">Cycling changed my life. I&rsquo;d like to say I&rsquo;m cycling for other people. I&rsquo;m really cycling for myself. I&rsquo;m cycling because it changed me. That&rsquo;s the story.</p>
      <p class="story-more">So the sign changes. What comes after the word is up to whoever&rsquo;s riding.</p>
    </div>
    <div class="story-photos">
      ${fig("robert-boise", "story-ph story-ph--a")}
      ${fig("pv-shadow", "story-ph story-ph--b")}
    </div>
  </div>
</section>
`;

// —— today I rode for (data/today.json): his day, his line, his pictures ——
function todaySection() {
  const T = read("data/today.json");
  if (!T || !T.for || !T.photo) return "";
  const d = new Date(T.date + "T12:00:00Z");
  const day = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });
  const avifPair = (p) => { const a = (f) => String(f || "").replace(/\.jpe?g$/i, ".avif"); const big = a(p.src), small = a(p.small); return big !== p.src && small !== p.small && fs.existsSync(path.join(ROOT, "cfc-site", big)) && fs.existsSync(path.join(ROOT, "cfc-site", small)) ? { big, small } : null; };
  const img = (p, sizes) => {
    const tag = `<img src="${esc(p.src)}" srcset="${esc(p.small)} 800w, ${esc(p.src)} ${p.width}w" sizes="${sizes}" width="${p.width}" height="${p.height}" alt="${esc(p.alt)}" loading="lazy" decoding="async">`;
    const av = avifPair(p);
    return av ? `<picture><source type="image/avif" srcset="${esc(av.small)} 800w, ${esc(av.big)} ${p.width}w" sizes="${sizes}">${tag}</picture>` : tag;
  };
  const where = T.photo.where ? placeMonth(T.photo.where, T.date) : "";
  const F = T.film;
  const poster = F ? (fs.existsSync(path.join(ROOT, "cfc-site", String(F.poster).replace(/\.jpe?g$/i, ".webp"))) ? String(F.poster).replace(/\.jpe?g$/i, ".webp") : F.poster) : "";
  // one control, the disc on the poster (the site's film control; home.css draws it): a play glyph and a pause glyph,
  // the figure's data-playing picks one; /home.js keeps the label saying what the button does next (WCAG 2.2.2)
  const film = F ? `<figure class="today-film" id="todayFig" data-playing="false">
      <div class="today-film-frame">
        <video id="todayVid" muted loop playsinline disablepictureinpicture preload="none" poster="${esc(poster)}" width="${F.width}" height="${F.height}" aria-label="${esc(F.alt)}">
          ${F.webm ? `<source src="${esc(F.webm)}" type="video/webm">` : ""}
          <source src="${esc(F.mp4)}" type="video/mp4">
        </video>
        <button class="today-play" id="todayPlay" type="button" aria-label="Play, ${F.seconds} seconds" data-seconds="${F.seconds}"><svg class="tp-play" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.2v13.6L19 12z"/></svg><svg class="tp-pause" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z"/></svg></button>
      </div>
      ${F.where ? `<figcaption>${esc(placeMonth(F.where, T.date))}</figcaption>` : ""}
    </figure>` : "";
  return `<!-- —— today: who I rode for (data/today.json). The lead (the day, the sign), what he said (his line, the ask), then his
     pictures: the photo and the film side by side, a place · month line under each. —— -->
<section class="today" id="today" aria-labelledby="today-h">
  <div class="wrap today-in">
    <div class="today-lead">
      <p class="eyebrow">The ride on ${esc(day)}.</p>
      <h2 class="today-sign" id="today-h">${MARK_WORD("today-mark")}<span class="plate today-plate" aria-hidden="true">${esc(T.for)}</span><span class="sr">I rode for ${esc(T.for)}</span></h2>
    </div>
    <div class="today-say">
      <p class="today-line">${esc(T.line)}</p>
      <p class="today-ask"><a class="link" href="/cyclefor/">What do you cycle for? Say it on video</a></p>
    </div>
    ${film}
    <figure class="today-ph">
      ${img(T.photo, "(min-width: 1024px) 50vw, 100vw")}
      ${where ? `<figcaption>${esc(where)}</figcaption>` : ""}
    </figure>
  </div>
</section>
`;
}

// —— 4. the miles: 10,000, the last rides (Strava), the bike ——
const logRows = T0 && T0.recent && T0.recent.length ? TALLY.logRows(T0.recent) : `        <li><span class="when">&mdash;</span><span class="bar-mi" style="--w:0"></span><span class="mi num">&mdash;</span></li>`;
const ROAD = `<!-- —— 4. the miles. The 10,000 is the year, said once at this size; the training count lives in the strip, away from
     it. The log is the four last rides from Strava, each a painted stroke as long as the ride. —— -->
<section class="miles" id="road" aria-labelledby="road-h">
  <div class="wrap miles-in">
    <p class="miles-big" aria-hidden="true"><span class="num">10,000</span></p>
    <p class="miles-sub">miles in 2027, all on the bike.</p>
    <div class="miles-grid">
      <div class="miles-log">
        <p class="eyebrow miles-k">From the road</p>
        <h2 class="miles-h" id="road-h">The last rides.</h2>
        <ol class="log" id="log" data-max="4" aria-live="polite"${NOTE ? ` data-note-date="${NOTE.date}" data-note-href="${NOTE.href}"` : ""}>
${logRows}
        </ol>
      </div>
      <div class="miles-side">
        <p class="miles-rides"><b class="num" id="roadRides">${T0 && T0.rides ? fmt(T0.rides) : "&mdash;"}</b> <span class="miles-rides-l">${seasonText("rides since June 1.", "rides in 2027.")}</span></p>
        <p class="miles-acts"><a class="link link--bone" href="${NOTE ? NOTE.href : "/events/2027/riding/"}">Read the last ride</a><a class="link link--bone" href="https://www.strava.com/athletes/22899089" target="_blank" rel="noopener noreferrer">Follow on Strava</a></p>
      </div>
    </div>
  </div>
</section>
`;

// —— 5. the 2027 rides: where, and when ——
const RIDING = CHROME.RIDING || [];
const FOR = { "center-ride-out": "the Center", "cycle-to-zero": "SFAF" };   // the plate after CYCLE FOR (CLAUDE.md §1)
const MAP = read("data/geo/home-2027.json");
const BYSLUG = Object.fromEntries(((CAL && CAL.events) || []).map((e) => [e.slug, e]));
// where a ride's square sits on the map when two towns would touch (the square moves, a hairline goes back to the town), in map units
// (Oct 27, 2026: solved, not placed by eye: at 1440 (the map 824px wide) no two centres closer than 40px; at 1024 (618px)
// no two 24px squares touch; no leader crosses another leader or a square; no square covers another town or Phoenix;
// every square's centre on land (4 and 13, on the coast, hang half over the Pacific). Sea Otter sits on Monterey; Recovery Ride goes north-west of Sausalito, Cycle to Zero east of SF)
const NUDGE = { "recovery-ride": [-11, -24], "cycle-to-zero": [34, -13], "tour-de-palm-springs": [14, 6], "belgian-waffle-ride-arizona": [30, -4], "chino-grinder": [-6, -14], "el-tour-de-tucson": [6, 10] };
function yearSection() {
  if (!RIDING.length) return "";
  const kind = (r) => (r.category === "Charity ride" ? `${r.days} days` : r.category.toLowerCase());
  const W = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  const word = (n) => (n >= 1 && n <= 20 ? W[n] : String(n));
  const lottery = (r) => /^yes/i.test(String((BYSLUG[r.slug] || {}).lottery || ""));
  const rows = RIDING.map((r, i) => {
    const note = r.status === "projected" ? "date projected" : r.status === "tba" ? "2027 dates to come" : lottery(r) ? "entry by lottery" : "";
    const line = [r.where, kind(r), note].filter(Boolean).join(" · ");
    const [, m1, d1] = String(r.start || "").split("-").map(Number);
    const [, m2, d2] = String(r.end || "").split("-").map(Number);
    const days = !m1 ? "" : m1 === m2 && d1 !== d2 ? `${d1}&ndash;${d2}` : m1 === m2 ? `${d1}` : `${d1}&ndash;${MON[m2 - 1]} ${d2}`;
    const plate = m1 ? `<span class="date-m">${MON[m1 - 1]}</span><span class="date-d num">${days}</span>` : `<span class="date-m">2027</span><span class="date-d">TBA</span>`;
    return `      <li class="yr${r.status !== "confirmed" ? " yr--soft" : ""}"><a href="${esc(r.href)}"><span class="yr-i num" aria-hidden="true">${i + 1}</span><span class="date${r.status !== "confirmed" ? " date--soft" : ""}">${plate}</span><span class="yr-n"><b>${esc(r.name)}</b>${FOR[r.slug] ? ` <span class="plate yr-plate">${esc(FOR[r.slug])}</span>` : ""}<span class="yr-l">${esc(line)}</span></span></a></li>`;
  }).join("\n");
  const nProj = RIDING.filter((r) => r.status === "projected").length, nTba = RIDING.filter((r) => r.status === "tba").length;
  const dated = RIDING.length - nProj - nTba;
  const bits = [];
  if (nProj) bits.push(`${word(nProj)} ${nProj === 1 ? "sits" : "sit"} on the 2026 weekend until the organizer posts 2027`);
  if (nTba) bits.push(`${word(nTba)} ${nTba === 1 ? "hasn&rsquo;t" : "haven&rsquo;t"} put out 2027 dates yet`);
  const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
  const note = `${cap(word(dated))} with dates from the organizer${bits.length ? "; " + bits.join("; ") : ""}.`;
  // the map: the whole lower 48, a small square for home, a numbered square per ride at its start town (home.css
  // .mp-dot: 24px ink, dashed when projected or TBA), nothing drawn
  // between (never a route we drew). The numbers are HTML placed by percent (no words in a stretched SVG); the list is the link.
  let map = "";
  if (MAP) {
    const B = MAP.box;
    const pct = (xy) => [((xy[0] - B.x) / B.w * 100).toFixed(2), ((xy[1] - B.y) / B.h * 100).toFixed(2)];
    const dots = [], leaders = [], ends = [];
    RIDING.forEach((r, i) => {
      const pts = MAP.rides[r.slug]; if (!pts) return;
      const n = NUDGE[r.slug] || [0, 0];
      const at = [pts[0].xy[0] + n[0], pts[0].xy[1] + n[1]];
      if (n[0] || n[1]) leaders.push(`<path d="M${pts[0].xy[0]} ${pts[0].xy[1]}L${at[0]} ${at[1]}"/>`);
      ends.push(`<circle cx="${pts[0].xy[0]}" cy="${pts[0].xy[1]}" r="2.6"/>`);
      const [x, y] = pct(at);
      dots.push(`<span class="mp-dot${r.status !== "confirmed" ? " mp-dot--soft" : ""}" style="left:${x}%;top:${y}%"><span class="num">${i + 1}</span></span>`);
    });
    // the drawing is a file (it's 40 KB of outline the HTML doesn't need to carry); After Hours values, as card.js does
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${B.x} ${B.y} ${B.w} ${B.h}" width="${B.w}" height="${B.h}">${MAP.canada ? `<path d="${MAP.canada}" fill="#D7D5D0" stroke="#687F7C" stroke-width=".7" stroke-linejoin="round"/>` : ""}<path d="${MAP.states}" fill="#EFEDEA" stroke="#687F7C" stroke-width=".7" stroke-linejoin="round"/><g fill="none" stroke="#1C1A22" stroke-width="1.2">${leaders.join("")}</g><g fill="#1C1A22">${ends.join("")}</g><rect x="${MAP.home.xy[0] - 5}" y="${MAP.home.xy[1] - 5}" width="10" height="10" fill="#1C1A22"/></svg>\n`;
    fs.mkdirSync(path.join(ROOT, "cfc-site", "img", "home"), { recursive: true });
    fs.writeFileSync(path.join(ROOT, "cfc-site", "img", "home", "map-2027.svg"), svg);
    const hash = require("crypto").createHash("sha1").update(svg).digest("hex").slice(0, 8);
    map = `<figure class="yr-map" aria-hidden="true">
        <div class="yr-map-in">
          <img class="yr-map-svg" src="/img/home/map-2027.svg?v=${hash}" width="${B.w}" height="${B.h}" alt="" loading="lazy" decoding="async">
          ${dots.join("\n          ")}
        </div>
      </figure>`;
  }
  return `<!-- —— 5. the 2027 rides (data/calendar-2027.json, riding: true, through chrome.js): where on the map, when in the
     list. Dates are the organizers'; projected and TBA say so; the rows open the ride on the riding page; the map's squares carry the rows' numbers and open nothing. —— -->
<section class="year" id="year" aria-labelledby="year-h">
  <div class="wrap">
    <p class="rule"><span class="rule-l">${RIDING.length} rides</span></p>
    <div class="year-head"><h2 class="year-h" id="year-h">The 2027 rides I&rsquo;m doing.</h2><p class="year-lede">Part of the 10,000 miles. Come ride one.</p></div>
    <div class="year-grid">
      ${map}
      <div class="year-aside">${map ? `<p class="yr-key" aria-hidden="true"><i></i>Phoenix</p>` : ""}<p class="note-sm">${note}</p><a class="link" href="/events/2027/riding/">All my 2027 rides, with sign-up links</a></div>
      <ol class="year-list">
${rows}
      </ol>
    </div>
  </div>
</section>
`;
}

// —— 6. the orgs (ORGS_S), and where the money goes (RIDE_S: Center Ride Out until it has passed, CLAUDE.md §1). Two
//    sections, two constants: the 2027 rides sit between them in the page (Oct 27, 2026) ——
const ORGS_S = `<!-- —— 6. the orgs. One line each from the site's checked copy (research/events/2026-10-26-homepage-facts.md); the
     money goes through their own pages. The help lines sit here because the orgs' work comes up here. —— -->
<section class="orgs" id="orgs" aria-labelledby="orgs-h">
  <div class="wrap">
    <div class="orgs-head"><h2 class="orgs-h" id="orgs-h">The orgs I ride for.</h2><p class="orgs-lede">You sign up or give on their page. None of it comes through me.</p></div>
    <div class="orgs-list">
      <article class="org">
        <svg class="org-mk" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#mkPhx"/></svg>
        <h3 class="org-h">one&middot;n&middot;ten</h3>
        <p>Phoenix nonprofit for LGBTQ+ youth ages 11 to 24. Safe spaces, housing, leadership.</p>
        <p class="org-acts"><a class="link" href="https://onenten.org" target="_blank" rel="noopener noreferrer">Give to one&middot;n&middot;ten</a></p>
      </article>
      <article class="org">
        <svg class="org-mk" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#mkOjai"/></svg>
        <h3 class="org-h">Los Angeles LGBT Center</h3>
        <p>Health, housing and advocacy for LGBTQ+ people.</p>
        <p class="org-acts"><a class="link" href="https://www.lalgbtcenter.org" target="_blank" rel="noopener noreferrer">Give to the Center</a></p>
      </article>
      <article class="org">
        <svg class="org-mk" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#mkSF"/></svg>
        <h3 class="org-h">San Francisco AIDS Foundation</h3>
        <p>HIV, sexual health and <span class="nowrap">harm-reduction</span> services.</p>
        <p class="org-acts"><a class="link" href="https://www.sfaf.org" target="_blank" rel="noopener noreferrer">Give to SFAF</a></p>
      </article>
    </div>
    <p class="orgs-door">You don&rsquo;t have to be queer to ride with me. The rides raise money for <span class="nowrap">queer-serving</span> orgs. That&rsquo;s the point.</p>
    <div class="orgs-help">
      <span class="eyebrow">If it&rsquo;s now</span>
      <span><a href="tel:988"><b>988</b> call or text</a>, any hour &middot; <span class="nowrap"><b>Trevor Project</b> <a href="tel:18664887386">1-866-488-7386</a></span> or text START to <span class="nowrap">678-678</span></span>
      <a class="link" href="/resources/">Help lines, by age</a>
    </div>
  </div>
</section>
`;

const RIDE_S = `<!-- —— ride with me: the org ride (Center Ride Out) —— -->
<section class="ridewith" id="ride" aria-labelledby="ride-h">
  <div class="wrap ridewith-in">
    ${PH.figure("robert-desert", { cls: "" }).replace('<figure class="ph ', '<figure class="ph ridewith-ph ')}
    <div class="ridewith-words">
      <p class="eyebrow">A Los Angeles LGBT Center fundraiser</p>
      <h2 class="ridewith-big" id="ride-h"><span class="nowrap">April 23&ndash;25,</span> I cycle for <span class="plate plate--big">the Center</span></h2>
      <p>Center Ride Out. Los Angeles to Ojai, camp, then back along the coast to a finish by the ocean.</p>
      <dl class="facts">
        <div><dt>3 days</dt><dd>200+ miles, <span class="nowrap">Apr 23&ndash;25, 2027</span></dd></div>
        <div><dt>1 day</dt><dd>Day 2 only</dd></div>
        <div><dt>Money</dt><dd>You raise it on the Center&rsquo;s page</dd></div>
      </dl>
      <p class="ridewith-acts"><a class="btn btn--ink" href="https://centerrideout.lalgbtcenter.org/en/" target="_blank" rel="noopener noreferrer">Sign up with the Center</a><a class="link" href="/events/2027/riding/">All my 2027 rides</a></p>
      <p class="note-sm">Details from the Center, checked Oct 26.</p>
    </div>
  </div>
</section>
`;

// —— 7. find a group ride ——
const FIND = `<!-- —— 7. find a group ride —— -->
<section class="find-s" id="find" aria-labelledby="find-h">
  <div class="wrap find-in">
    <p class="rule find-rule"><span class="rule-l">Group rides</span></p>
    <div class="find-words">
      <h2 class="find-h" id="find-h">Find a group ride.</h2>
      <p class="find-count"><b class="num">${RIDES_N}</b> <span>group rides in the directory, each with the date it was last checked. Every state, ${RN.abroad} more countries. Shop rides, no-drop rides, queer rides.</span></p>
    </div>
    <div class="find-tools">
      <form class="find" action="/rides/" method="get" role="search">
        <label class="find-lab" for="q">Your town or a ride name</label>
        <div class="find-row"><svg class="find-mk" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#mkSearch"/></svg><input class="find-field" id="q" name="q" type="search" autocomplete="off"><button class="btn" type="submit">Search rides</button></div>
      </form>
      <p class="find-links"><a class="link" href="/rides/no-drop/">No-drop rides</a><a class="link" href="/rides/lgbtq/">Queer rides</a><a class="link" href="/tonight/">Tonight</a></p>
    </div>
  </div>
</section>
`;

// —— 8. read ——
const READ = `<!-- —— 8. read —— -->
<section class="read" id="read" aria-labelledby="read-h">
  <div class="wrap">
    <p class="rule"><span class="rule-l">Read</span></p>
    <div class="read-head"><h2 class="read-h" id="read-h">Field notes, guides, the journal.</h2><a class="link" href="/field-notes/">All field notes</a></div>
    <ul class="read-list">
      <li><a href="/field-notes/south-mountain-climb/"><b>South Mountain at sunset</b><span>Down Central from uptown, through downtown into South Phoenix, up the mountain as the light goes.</span></a></li>
      <li><a href="/field-notes/paradise-valley-loop/"><b>The Paradise Valley loop</b><span>The loop around Camelback and Mummy Mountain. Early, before the heat, with the whole valley below.</span></a></li>
      <li><a href="/journal/the-carrot-cake-theory/"><b>The carrot cake theory</b><span>Why the handmade thing is the honest thing.</span></a></li>
      <li><a href="/guides/"><b>All ${GUIDES_N} guides</b><span>Your first charity ride, the packing list, hitting your fundraising minimum, what happened to AIDS/LifeCycle.</span></a></li>
    </ul>
  </div>
</section>
`;

// —— 9. the sign: type, and the blank fills. Nothing is collected; /cyclefor/ is where an answer goes out, with the OK ——
const SIGN = `<!-- —— 9. CYCLE FOR + the blank. A visitor types and the plate takes the word; nothing leaves the page. —— -->
<section class="sign" id="sign" aria-labelledby="sign-h">
  <div class="wrap sign-in">
    <h2 class="sign-h" id="sign-h">${MARK_WORD("sign-mark")}<span class="plate sign-plate" id="signPlate" data-empty="true" data-sign-plate aria-hidden="true"></span><span class="sr" id="signSr">Cycle for</span></h2>
    <div class="sign-form">
      <label class="sign-q" for="who">Who do you cycle for?</label>
      <input class="sign-input" id="who" type="text" maxlength="22" autocomplete="off" placeholder="Type it. The sign changes." data-sign-input>
      <p class="sign-note">Nothing to pay, nothing to join. <button class="sign-reset" id="signReset" type="button" data-sign-reset hidden>Clear the sign</button></p>
      <p class="sign-more"><a class="link link--bone" href="/cyclefor/">Say it on video. Five seconds.</a></p>
    </div>
  </div>
</section>
`;

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="light">
  <title>Cycle for Change: Robert Castan rides 10,000 miles in 2027</title>
  <meta name="description" content="Robert Castan rides 10,000 miles in 2027, all on the bike, and writes every ride down. The money goes through the orgs’ own rides. Find a group ride.">
  <link rel="canonical" href="https://cycleforchange.org/">
  <link rel="alternate" type="application/rss+xml" title="Cycle for Change" href="https://cycleforchange.org/feed.xml">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Cycle for Change">
  <meta property="og:url" content="https://cycleforchange.org/">
  <meta property="og:title" content="Cycle for Change — 10,000 miles in 2027, all on the bike">
  <meta property="og:description" content="Cycling changed my life. I ride 10,000 miles in 2027 and write every ride down. The money goes through the orgs’ own rides.">
  <meta property="og:image" content="https://cycleforchange.org/og-cfc.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Cycle for Change — 10,000 miles in 2027, all on the bike">
  <meta name="twitter:description" content="Cycling changed my life. I ride 10,000 miles in 2027 and write every ride down.">
  <meta name="twitter:image" content="https://cycleforchange.org/og-cfc.png">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/favicon-180.png">
  <meta name="theme-color" content="#141218">
  <script>document.documentElement.className+=" js"</script>
  ${CHROME.FONTS}
  <link rel="preload" as="image" type="image/avif" imagesrcset="${FILM.phone.poster}.avif" media="${PHONE_Q}" fetchpriority="high">
  <link rel="preload" as="image" type="image/avif" imagesrcset="${FILM.wide.poster}.avif" media="${WIDE_Q}" fetchpriority="high">
  <link rel="stylesheet" href="/chrome.css?v=${V}">
  <link rel="stylesheet" href="/home.css?v=${V}">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cycle for Change",
    "url": "https://cycleforchange.org/",
    "logo": "https://cycleforchange.org/favicon-512.png",
    "sameAs": ["https://www.instagram.com/cycl_eforchange", "https://www.strava.com/athletes/22899089"],
    "description": "One rider, Robert Castan, in Phoenix, riding 10,000 miles on a bicycle in 2027. Every ride gets a stroke on cycleforchange.org; the big ones get a page. The rides raise money for queer-serving organizations (one·n·ten, the Los Angeles LGBT Center and San Francisco AIDS Foundation) through their own events, like the Center Ride Out and Cycle to Zero. The site also holds a directory of group rides, a 2027 ride calendar and town guides."
  }
  </script>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"Cycle for Change","alternateName":"cycleforchange.org","url":"https://cycleforchange.org/"}</script>
</head>
<body class="home">
${DEFS}
${CHROME.HEADER.replace('<header class="nav site-head" id="nav">', '<header class="nav site-head" id="nav" data-solid="false">').replace('<p class="tally-line">', '<p class="tally-line tally-line--home">')}

<main id="main">

${HERO}
${STRIP}
${STORY}
${ROAD}
${todaySection()}${ORGS_S}
${yearSection()}${RIDE_S}
${FIND}
${READ}
${SIGN}
</main>

${CHROME.FOOTER.replace(CHROME.CHROME_JS, "")}

<script src="/home.js?v=${V}" defer></script>
</body>
</html>
`;

// the baked tally (every [data-miles], the four "last rides" rows, #tallyData) from data/tally.json, the last fetch
// of /api/strava (scripts/tally.js); the deploy refreshes it on every rides build. Never a typed number.
fs.writeFileSync(OUT, TALLY.applyTally(page, T0));
console.log("wrote", path.relative(process.cwd(), OUT), page.length, "bytes");
