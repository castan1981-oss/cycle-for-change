#!/usr/bin/env node
/* Cycle for Change — /about/, "About me" (Oct 28, 2026). Writes cfc-site/about/index.html. Never hand-edit the page.

   The brief (Oct 28, 2026): a magazine feature in his own words, on the house's own mark, palette and type. His
   narrative is the source of truth and it lives in data/about.json, verbatim: Claude lays it out, never writes it
   (CLAUDE.md §5), and no recovery reference goes on this page. An empty list in that file is a slot: the page shows
   "his words go here" in its place and stays noindex until every slot is filled.

   The rooms, in order, and why:
     tar       the opening: a cold open (the title and his first lines on dark, nothing else), then his Camelback
               selfie as a letterbox band (2.39:1 on a wide screen, 4:5 on a phone) that opens as it comes into view
     tar → concrete   "Then came the bike." The page turns from night to day here: the heading on tar, his TSR film
               (riding over in the dark under his light, then the group at sunrise) straddling the seam, his words on
               concrete under it
     plaster   "The love bubble was real." AIDS/LifeCycle, a collage of his own photographs: prints laid on the grid,
               overlapping by a column, a plaster edge between them, numbered, the place · month under the set
     patina    the statement, type only: "I found a version of myself I actually liked hanging out with."
     tar       10,000. The year as a lane: twelve months, a powder-rose mark on every day of the 13 rides he's doing
               (outlined when the date is projected), the riding page's own key
     concrete  "My mission." His words, then the three orgs as a roll call (the homepage's checked lines), the help lines
     tar       the sign: CYCLE FOR + the blank, a visitor types and the plate takes it; the ways in
     bruise    the closing block, then the footer (its stencil hidden: the page ends on its own sign)

   Photos: only Robert recognisable, no cars, a place · month line under each (CLAUDE.md §10). The crops are
   tools/about-art.py's. Styles: /about/about.css (after /chrome.css). Behaviour: /about/about.js. */
"use strict";
const fs = require("fs");
const path = require("path");
const CHROME = require("./chrome.js");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "cfc-site", "about", "index.html");
const V = CHROME.CSS_V;
const A = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "about.json"), "utf8"));
const esc = CHROME.esc;
const read = (rel) => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8")); } catch { return null; } };
// his words: curly quotes and apostrophes in visible text (CLAUDE.md §4), nothing else touched
const curl = (s) => esc(String(s))
  .replace(/(^|[\s(\[—–-])"/g, "$1&ldquo;").replace(/"/g, "&rdquo;")
  .replace(/(^|[\s(\[—–-])'/g, "$1&lsquo;").replace(/'/g, "&rsquo;");

// —— slots: where his words haven't landed yet ——
const SLOTS = [];
function words(list, name, cls = "ab-words") {
  const paras = (Array.isArray(list) ? list : []).map((p) => String(p || "").trim()).filter(Boolean);
  if (!paras.length) {
    SLOTS.push(name);
    return `<div class="${cls} ab-slot" role="note"><p>Robert&rsquo;s words go here: ${esc(name)}.</p></div>`;
  }
  return `<div class="${cls}">${paras.map((p) => `<p>${curl(p)}</p>`).join("\n")}</div>`;
}

// —— the stencil: CYCLE FOR, one line, no bar (the plate after it is HTML). The letter paths are the header mark's
//    defs (#lpC …), on every page ——
const LETTERS = `<use href="#lpC"/><use href="#lpY" transform="translate(74 0)"/><use href="#lpC" transform="translate(148 0)"/><use href="#lpL" transform="translate(222 0)"/><use href="#lpE" transform="translate(296 0)"/><use href="#lpF" transform="translate(414 0)"/><use href="#lpO" transform="translate(488 0)"/><use href="#lpR" transform="translate(562 0)"/>`;
const MARK_WORD = (cls) => `<svg class="${cls}" viewBox="0 0 626 150" aria-hidden="true" focusable="false"><g clip-path="url(#lpRow)" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round">${LETTERS}</g></svg>`;

// his newest write-up (data/ride-notes.json), as on the homepage
const NOTE = (() => {
  const all = read("data/ride-notes.json"); if (!all) return null;
  const list = Object.entries(all).flatMap(([slug, ns]) => (Array.isArray(ns) ? ns : []).filter((n) => n && /^\d{4}-\d{2}-\d{2}$/.test(n.date || "") && Array.isArray(n.paras) && n.paras.some((x) => String(x || "").trim())).map((n) => ({ slug, date: n.date })));
  list.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return list[0] ? { date: list[0].date, href: `/rides/${list[0].slug}/#robert` } : null;
})();

// —— 1. the opening ——
const OPEN_IMG = {
  wide: { base: "/img/about/open-w-1", w: 2400, h: 1004 },
  phone: { base: "/img/about/open-p-1", w: 1200, h: 1500 },
  alt: "Robert mid-ride in a red helmet and a purple jersey, grinning into the camera, Camelback Mountain and a big sky behind him.",
  where: "Paradise Valley, AZ · Oct 2025",
};
const WIDE = "(min-width: 760px)";
const lines = (A.open && A.open.lines) || [];
const OPEN = `<!-- —— 1. the opening: a cold open on dark (the title, his first lines, nothing else), then the letterbox —— -->
<section class="ab-open" aria-labelledby="ab-h1">
  <div class="wrap ab-open-in">
    <h1 class="ab-h1" id="ab-h1">${esc(A.title || "About me")}</h1>
    ${lines.length ? `<div class="ab-cold">${lines.map((l) => `<p class="ab-cold-line">${curl(l)}</p>`).join("")}</div>` : words([], "the opening lines", "ab-cold")}
  </div>
  <figure class="ab-letter" data-in="false">
    <div class="ab-letter-frame">
      <picture>
        <source media="${WIDE}" type="image/avif" srcset="${OPEN_IMG.wide.base}.avif">
        <source media="${WIDE}" type="image/webp" srcset="${OPEN_IMG.wide.base}.webp">
        <source media="${WIDE}" srcset="${OPEN_IMG.wide.base}.jpg">
        <source type="image/avif" srcset="${OPEN_IMG.phone.base}.avif">
        <source type="image/webp" srcset="${OPEN_IMG.phone.base}.webp">
        <img src="${OPEN_IMG.phone.base}.jpg" width="${OPEN_IMG.phone.w}" height="${OPEN_IMG.phone.h}" alt="${esc(OPEN_IMG.alt)}" decoding="async">
      </picture>
    </div>
    <figcaption class="wrap">${esc(OPEN_IMG.where)}</figcaption>
  </figure>
  <div class="wrap ab-open-body">
    ${words(A.open && A.open.body, "the opening")}
  </div>
</section>
`;

// —— 2. then came the bike: the page turns from night to day ——
// his first TSR (Oct 10, 2026), recut for this page from /film/tsr-1.mp4: its first 1.6 s carried the retired halftone
// print, so the cut starts on the group at sunrise and drops the black tail (ffmpeg -ss 1.6 -t 9.1, CRF 28, + a VP9 copy)
const TSR = {
  src: "/film/about-bike-1.mp4", webm: "/film/about-bike-1.webm", poster: "/film/about-bike-1.webp", width: 864, height: 1080, seconds: 9,
  caption: "Scottsdale · Oct 2026",
  alt: "Nine seconds from Robert’s first TSR, October 10, 2026: the group in a line along the bike lane at sunrise, the road over his bars, his selfie in kit, riding over in the dark under his bike light.",
};
const posterOf = (p) => p;
const PLAY = `<svg class="abp-play" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.2v13.6L19 12z"/></svg><svg class="abp-pause" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z"/></svg>`;
const FILM = TSR ? `<figure class="ab-film" data-playing="false">
      <div class="ab-film-frame">
        <video class="ab-film-v" muted loop playsinline disablepictureinpicture preload="none" poster="${esc(posterOf(TSR.poster))}" width="${TSR.width}" height="${TSR.height}" aria-label="${esc(TSR.alt)}">
          <source src="${esc(TSR.webm)}" type="video/webm">
          <source src="${esc(TSR.src)}" type="video/mp4">
        </video>
        <button class="ab-play" type="button" aria-label="Play, ${TSR.seconds} seconds" data-seconds="${TSR.seconds}">${PLAY}</button>
      </div>
      <figcaption>${esc(TSR.caption)}</figcaption>
    </figure>` : "";
const BIKE = `<!-- —— 2. then came the bike. The heading on tar, his film across the seam, his words on concrete: the page turns
     from night to day here. The film plays muted when it's on screen (never under reduced motion or Save-Data) and the
     disc always stops it (WCAG 2.2.2). —— -->
<section class="ab-bike" aria-labelledby="ab-bike-h">
  <div class="ab-bike-top">
    <div class="wrap ab-bike-head">
      <h2 class="ab-h2" id="ab-bike-h">${esc(A.bike.heading)}</h2>
    </div>
  </div>
  <div class="ab-bike-low">
    <div class="wrap ab-bike-in">
      ${FILM}
      ${words(A.bike.body, "Then came the bike", "ab-words ab-bike-words")}
    </div>
  </div>
</section>
`;

// —— 3. the love bubble: AIDS/LifeCycle, his photographs as a collage ——
const PHOTOS = (A.bubble && A.bubble.photos) || [];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function print(p, i) {
  const n = i + 1;
  if (!p.src) {
    SLOTS.push(`AIDS/LifeCycle photo ${n}`);
    return `<figure class="ab-c ab-c--${p.slot} ab-c--empty"><div class="ab-c-frame"><p>${esc(p.want)}</p></div><span class="ab-c-n" aria-hidden="true">${n}</span></figure>`;
  }
  const av = String(p.src).replace(/\.jpe?g$/i, ".avif"), wb = String(p.src).replace(/\.jpe?g$/i, ".webp");
  const has = (f) => fs.existsSync(path.join(ROOT, "cfc-site", f));
  return `<figure class="ab-c ab-c--${p.slot}"><div class="ab-c-frame"><picture>${has(av) ? `<source type="image/avif" srcset="${esc(av)}">` : ""}${has(wb) ? `<source type="image/webp" srcset="${esc(wb)}">` : ""}<img src="${esc(p.src)}"${p.width ? ` width="${p.width}" height="${p.height}"` : ""} alt="${esc(p.alt)}" loading="lazy" decoding="async"></picture></div><span class="ab-c-n" aria-hidden="true">${n}</span></figure>`;
}
const BUBBLE = `<!-- —— 3. the love bubble. His AIDS/LifeCycle photographs, laid on the grid like prints on a table: they overlap by a
     column, a plaster edge between them, a number on each, the place · month for each under the set. —— -->
<section class="ab-bubble" aria-labelledby="ab-bubble-h">
  <div class="wrap ab-bubble-in">
    <h2 class="ab-h2" id="ab-bubble-h">${esc(A.bubble.heading)}</h2>
    ${words(A.bubble.body, "The love bubble was real", "ab-words ab-bubble-words")}
    <div class="ab-collage">
      ${PHOTOS.map(print).join("\n      ")}
    </div>
    <ol class="ab-c-index">
      ${PHOTOS.map((p, i) => `<li><span class="ab-c-in num">${i + 1}</span>${esc(p.where || p.want)}</li>`).join("\n      ")}
    </ol>
  </div>
</section>
`;

// —— 4. the statement: type only ——
const SAY = `<!-- —— 4. the statement. One line of his, as big as the screen allows, on patina. Nothing else in the room. —— -->
<section class="ab-say" aria-label="In my words">
  <div class="wrap">
    <p class="ab-say-line" data-words>${curl(A.statement)}</p>
  </div>
</section>
`;

// —— 5. 10,000: the year as a lane ——
const RIDING = CHROME.RIDING || [];
const dayOfYear = (ymd) => { const [y, m, d] = ymd.split("-").map(Number); return (Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 86400000; };
const dated = RIDING.filter((r) => /^2027-\d{2}-\d{2}$/.test(r.start));
// a ride with no 2027 date yet isn't on the lane, and isn't named here: no recovery reference on this page (the brief)
const marks = dated.map((r) => {
  const a = dayOfYear(r.start), b = dayOfYear(r.end && /^2027/.test(r.end) ? r.end : r.start) + 1;
  const proj = r.status !== "confirmed";
  return `<i class="ab-lane-mark${proj ? " ab-lane-mark--proj" : ""}" style="--a:${(a / 365 * 100).toFixed(3)}%;--b:${(b / 365 * 100).toFixed(3)}%"></i>`;
}).join("");
// each month's label at its first day, so the marks and the months line up (a short label on a phone)
const months = MON.map((m, i) => `<span class="ab-lane-m" style="--a:${(dayOfYear(`2027-${String(i + 1).padStart(2, "0")}-01`) / 365 * 100).toFixed(3)}%"><span class="l">${m}</span><span class="s">${m[0]}</span></span>`).join("");
const TEN = `<!-- —— 5. 10,000. The number once, as wide as the screen; under it the year as a lane, a powder-rose mark on every day of
     his 2027 rides that have a date (outlined: the date is placed on the 2026 weekend). The training count stays in the tally line,
     never next to the 10,000 (CLAUDE.md §1). —— -->
<section class="ab-ten" aria-labelledby="ab-ten-h">
  <div class="wrap ab-ten-in">
    <h2 class="ab-ten-h" id="ab-ten-h"><span class="ab-ten-n num">10,000</span> <span class="ab-ten-t">miles in 2027, all on the bike.</span></h2>
    ${A.miles && A.miles.heading ? `<p class="ab-ten-say">${curl(A.miles.heading)}</p>` : ""}
    <figure class="ab-lane" aria-label="The 2027 rides I&rsquo;m doing, across the year">
      <div class="ab-lane-road" aria-hidden="true">${marks}</div>
      <div class="ab-lane-months" aria-hidden="true">${months}</div>
      <figcaption class="ab-lane-key"><span><i class="ab-k"></i>The organizer&rsquo;s date</span><span><i class="ab-k ab-k--proj"></i>Placed on the 2026 weekend</span></figcaption>
    </figure>
    <p class="ab-ten-acts"><a class="link link--bone" href="/events/2027/riding/">All my 2027 rides</a></p>
    ${words(A.miles && A.miles.body, "the 10,000-mile year", "ab-words ab-ten-words")}
  </div>
</section>
`;

// —— 6. the mission ——
const ORGS = [
  { name: "one&middot;n&middot;ten", line: "Phoenix nonprofit for LGBTQ+ youth ages 11 to 24. Safe spaces, housing, leadership.", href: "https://onenten.org", act: "Give to one&middot;n&middot;ten" },
  { name: "Los Angeles LGBT Center", line: "Health, housing and advocacy for LGBTQ+ people.", href: "https://www.lalgbtcenter.org", act: "Give to the Center" },
  { name: "San Francisco AIDS Foundation", line: "HIV, sexual health and <span class=\"nowrap\">harm-reduction</span> services.", href: "https://www.sfaf.org", act: "Give to SFAF" },
];
const MISSION = `<!-- —— 6. the mission. His words beside the head, then the orgs as a roll call: the homepage's checked lines (research/
     events/2026-10-26-homepage-facts.md), the money through their own pages, the help lines in the room. —— -->
<section class="ab-mission" aria-labelledby="ab-mission-h">
  <div class="wrap ab-mission-in">
    <h2 class="ab-h2 ab-mission-h" id="ab-mission-h">${esc(A.mission.heading)}</h2>
    <div class="ab-mission-body">
      ${words(A.mission.body, "My mission", "ab-words ab-mission-words")}
      <div class="ab-roll">
        <p class="eyebrow ab-roll-k">The orgs I ride for.</p>
        <ul class="ab-roll-list">
          ${ORGS.map((o) => `<li class="ab-org"><h3 class="ab-org-h">${o.name}</h3><p class="ab-org-p">${o.line}</p><a class="link" href="${o.href}" target="_blank" rel="noopener noreferrer">${o.act}</a></li>`).join("\n          ")}
        </ul>
        <p class="ab-roll-note">You sign up or give on their page. None of it comes through me.</p>
        <div class="ab-help">
          <span class="eyebrow">If it&rsquo;s now</span>
          <span><a href="tel:988"><b>988</b> call or text</a>, any hour &middot; <span class="nowrap"><b>Trevor Project</b> <a href="tel:18664887386">1-866-488-7386</a></span> or text START to <span class="nowrap">678-678</span></span>
          <a class="link" href="/resources/">Help lines, by age</a>
        </div>
      </div>
    </div>
  </div>
</section>
`;

// —— 7. the sign and the ways in ——
const WAYS = [
  { href: "/cyclefor/", t: "Say it on video. Five seconds." },
  { href: CHROME.INSTAGRAM, t: "Follow on Instagram", ext: true },
  NOTE ? { href: NOTE.href, t: "Read the last ride" } : null,
  { href: "/events/2027/riding/", t: "All my 2027 rides" },
].filter(Boolean);
const SIGN = `<!-- —— 7. CYCLE FOR + the blank. A visitor types and the plate takes the word; nothing leaves the page. Then the ways in;
     the closing block under it carries Ride with me and Find a group ride. —— -->
<section class="ab-sign" aria-labelledby="ab-sign-h">
  <div class="wrap ab-sign-in">
    <h2 class="ab-sign-h" id="ab-sign-h">${MARK_WORD("ab-sign-mark")}<span class="ab-sign-plate" data-empty="true" data-sign-plate aria-hidden="true"></span><span class="sr" id="signSr">Cycle for</span></h2>
    <div class="ab-sign-form">
      <label class="ab-sign-q" for="who">Who do you cycle for?</label>
      <input class="ab-sign-input" id="who" type="text" maxlength="22" autocomplete="off" placeholder="Type it. The sign changes." data-sign-input>
      <p class="ab-sign-note">Nothing to pay, nothing to join. <button class="ab-sign-reset" type="button" data-sign-reset hidden>Clear the sign</button></p>
    </div>
    <ul class="ab-ways">
      ${WAYS.map((w) => `<li><a class="ab-way" href="${esc(w.href)}"${w.ext ? ' target="_blank" rel="noopener noreferrer"' : ""}><span>${w.t}</span><span class="ab-way-go" aria-hidden="true">&rarr;</span></a></li>`).join("\n      ")}
    </ul>
  </div>
</section>
`;

const LD = [
  { "@context": "https://schema.org", "@type": "AboutPage", name: "About me", url: "https://cycleforchange.org/about/", mainEntity: { "@id": "https://cycleforchange.org/about/#robert" }, isPartOf: { "@type": "WebSite", name: "Cycle for Change", url: "https://cycleforchange.org/" } },
  { "@context": "https://schema.org", "@type": "Person", "@id": "https://cycleforchange.org/about/#robert", name: "Robert Castan", url: "https://cycleforchange.org/about/", homeLocation: { "@type": "Place", name: "Phoenix, Arizona" }, sameAs: [CHROME.INSTAGRAM, CHROME.STRAVA] },
];

const body = `${OPEN}
${BIKE}
${BUBBLE}
${SAY}
${TEN}
${MISSION}
${SIGN}`;

const noindex = SLOTS.length > 0;
const head = CHROME.head({
  title: "About me",
  description: "Robert Castan, in his own words: how the bike changed his life, the AIDS/LifeCycle years, the 10,000 miles in 2027 and the rides he does them for.",
  url: "/about/",
  ogType: "profile",
  styles: ["/about/about.css"],
  ld: LD,
  robots: noindex ? "noindex, follow" : undefined,
  extra: `  <meta name="theme-color" content="#141218">\n  <script>document.documentElement.className+=" js"</script>`,
});

const page = `<!DOCTYPE html>
<html lang="en">
<head>
${head}
</head>
<body class="ab-page">
<!-- /about/ is generated by scripts/build-about.js from data/about.json (his words, verbatim). Never hand-edit it.${noindex ? `
     Not finished: ${SLOTS.length} slot(s) still waiting on Robert (${SLOTS.join("; ")}), so the page is noindex. -->` : " -->"}
${CHROME.HEADER}

<main id="main">
${body}
${CHROME.PLEDGE}
</main>

${CHROME.FOOTER}
<script src="/about/about.js?v=${V}" defer></script>
</body>
</html>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, page);
console.log("wrote", path.relative(process.cwd(), OUT), page.length, "bytes", noindex ? `(noindex: ${SLOTS.length} slots waiting)` : "");
