#!/usr/bin/env node
/* Cycle for Change — /about/, "About me" (Oct 28, 2026). Writes cfc-site/about/index.html. Never hand-edit the page.

   The brief (Oct 28, 2026): a magazine feature in his own words, on the house's own mark, palette and type. His
   narrative is the source of truth and it lives in data/about.json, verbatim: Claude lays it out, never writes it
   (CLAUDE.md §5), and no recovery reference goes on this page (a line of his that reads as one is flagged to him, never
   cut or reworded quietly). His sections render in HIS order, under his own headings; each names the room it sits in.
   A section marked waiting is a slot: the page shows "his words go here" and stays noindex until none is left.

   The rooms (the Wrenches, Oct 28: night at the start, day through the middle, dusk at the sign):
     tar       the cold open: "About me", his name, his first lines, nothing else; then his Camelback selfie as a
               letterbox (2.39:1 wide, 4:5 on a phone) whose top edge shows on the first screen and opens as it arrives;
               then the opening
     tar → concrete   bike: the page turns from night to day. The heading on tar, his first-TSR film across the seam,
               his words on concrete
     plaster   bubble: his AIDS/LifeCycle photographs as a staggered set on the grid (no overlap, nothing over a picture,
               a place · month line under each), then his words, so the statement lands straight off them
     patina    statement: one line of his, type only
     plaster   ten: 10,000 as wide as the grid, and the year as a lane, a smeared-rose mark on every day of his dated
               2027 rides (outlined when projected; a ride with no date isn't named here)
     concrete  mission: his words beside the head, then the orgs as a roll call (the homepage's checked lines), help lines
     tar       the sign: CYCLE FOR + the blank, a visitor types and the plate takes it; one way in under it
     bruise    the closing block, then the footer (its stencil hidden: the page ends on its own sign)
     plain     a section of his the layout has no room for: a plain concrete room, his heading and words

   Photos: only Robert recognisable, no cars, a place · month line under each (CLAUDE.md §10). Crops: tools/about-art.py.
   Styles: /about/about.css (after /chrome.css). Behaviour: /about/about.js. */
"use strict";
const fs = require("fs");
const path = require("path");
const CHROME = require("./chrome.js");

const ROOT = path.join(__dirname, "..");
// ABOUT_DATA / ABOUT_OUT: a test run with filler text into a scratch copy (never committed); the page itself reads data/about.json
const OUT = process.env.ABOUT_OUT || path.join(ROOT, "cfc-site", "about", "index.html");
const V = CHROME.CSS_V;
const A = JSON.parse(fs.readFileSync(process.env.ABOUT_DATA || path.join(ROOT, "data", "about.json"), "utf8"));
const esc = CHROME.esc;
const read = (rel) => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8")); } catch { return null; } };
const has = (rel) => rel && fs.existsSync(path.join(ROOT, "cfc-site", rel));

// his words: curly quotes and apostrophes in visible text (CLAUDE.md §4), nothing else touched. An apostrophe before a
// digit is a closing one ('90s → ’90s), as is one inside a word (don't); an opening one follows a space or a bracket.
const curl = (s) => esc(String(s))
  .replace(/(^|[\s(\[—–-])"/g, "$1&ldquo;").replace(/"/g, "&rdquo;")
  .replace(/'(?=\d)/g, "&rsquo;")
  .replace(/(^|[\s(\[—–-])'/g, "$1&lsquo;").replace(/'/g, "&rsquo;");

// —— slots: where his words haven't landed yet ——
const SLOTS = [];
const slot = (name, cls = "ab-words") => { SLOTS.push(name); return `<div class="${cls} ab-slot" role="note"><p>Robert&rsquo;s words go here: ${esc(name)}.</p></div>`; };
// one item of his body: a paragraph, his own line breaks, or a list. Never split, merged or reordered.
function item(x) {
  if (x && typeof x === "object" && Array.isArray(x.lines)) return `<p>${x.lines.map(curl).join("<br>")}</p>`;
  if (x && typeof x === "object" && Array.isArray(x.list)) return `<ul class="ab-list">${x.list.map((l) => `<li>${curl(l)}</li>`).join("")}</ul>`;
  const t = String(x || "").trim();
  return t ? `<p>${curl(t)}</p>` : "";
}
function words(sec, name, cls = "ab-words") {
  if (!sec || sec.waiting) return slot(name, cls);
  const out = (sec.body || []).map(item).filter(Boolean);
  return out.length ? `<div class="${cls}">${out.join("\n")}</div>` : "";
}
const headingOf = (sec, fallback = "") => (sec && sec.heading ? curl(sec.heading) : fallback);

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

// ———————————————————————— the rooms ————————————————————————

// —— the opening: the cold open, the letterbox, his first words ——
const OPEN_IMG = {
  wide: { base: "/img/about/open-w-3", w: 1800, h: 753 },
  phone: { base: "/img/about/open-p-3", w: 1200, h: 1500 },
  alt: "Robert mid-ride in a red helmet and a purple jersey, grinning into the camera, Camelback Mountain and a big sky behind him.",
  where: "Paradise Valley, AZ · Oct 2025",
};
const WIDE = "(min-width: 760px)";
const cold = A.cold || {};
const coldLines = (cold.lines || []).map((l) => String(l || "").trim()).filter(Boolean);
function openRoom(sec) {
  return `<!-- —— the opening: a cold open on dark ("About me", his name, his first lines), then the letterbox, then his words —— -->
<section class="ab-open" aria-labelledby="ab-h1">
  <div class="wrap ab-open-in">
    <div class="ab-kick">
      <h1 class="ab-h1" id="ab-h1">${esc(A.title || "About me")}</h1>
      <p class="ab-by">Robert Castan, Phoenix</p>
    </div>
    ${!cold.waiting && coldLines.length ? `<div class="ab-cold">${coldLines.map((l) => `<p class="ab-cold-line">${curl(l)}</p>`).join("")}</div>` : slot("the opening lines", "ab-cold")}
  </div>
  <figure class="ab-letter" data-in="false">
    <div class="ab-letter-frame">
      <picture>
        <source media="${WIDE}" type="image/avif" srcset="${OPEN_IMG.wide.base}.avif">
        <source media="${WIDE}" type="image/webp" srcset="${OPEN_IMG.wide.base}.webp">
        <source media="${WIDE}" srcset="${OPEN_IMG.wide.base}.jpg">
        <source type="image/avif" srcset="${OPEN_IMG.phone.base}.avif">
        <source type="image/webp" srcset="${OPEN_IMG.phone.base}.webp">
        <img src="${OPEN_IMG.phone.base}.jpg" width="${OPEN_IMG.phone.w}" height="${OPEN_IMG.phone.h}" alt="${esc(OPEN_IMG.alt)}" fetchpriority="high" decoding="async">
      </picture>
    </div>
    <figcaption class="wrap">${esc(OPEN_IMG.where)}</figcaption>
  </figure>
  ${sec ? `<div class="wrap ab-open-body">
    ${sec.heading ? `<h2 class="ab-h2 ab-open-h">${headingOf(sec)}</h2>` : ""}
    ${words(sec, "the opening")}
  </div>` : ""}
</section>
`;
}

// —— bike: the page turns from night to day ——
// his first TSR (Oct 10, 2026), recut from /film/tsr-1.mp4 (ffmpeg -ss 1.7, 110 frames, CRF 26, + a VP9 copy):
//   - its first 1.7 s carried the retired halftone print (frame 0 checked clean);
//   - from 3.6 s his edit cuts between night and day every 5–7 frames, about three flashes a second at the loop, the
//     WCAG 2.3.1 limit (the access desk): this cut is the calm part, a dip to black about once a second, and it ends on
//     the night shot, so every loop goes night to day;
//   - the poster (3b) is his selfie at 1.9 s: the group and road frames have a vehicle far off, which a still can't
//     carry (§10; the photo editor), and the night frame read as noise on a phone (the critic, round 2).
const FILM = {
  mp4: "/film/about-bike-3.mp4", webm: "/film/about-bike-3.webm", poster: "/film/about-bike-3b.webp", w: 864, h: 1080, seconds: 4,
  where: "Scottsdale · Oct 2026",
  alt: "Four seconds from Robert’s first TSR, October 10, 2026: the group in a line along the bike lane at sunrise, the road over his bars, his selfie in kit, then riding in the dark under his bike light.",
};
const PLAY = `<svg class="abp-play" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.2v13.6L19 12z"/></svg><svg class="abp-pause" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z"/></svg>`;
function bikeRoom(sec) {
  return `<!-- —— bike: the heading on tar, his film across the seam, his words on concrete. The film plays muted on a wide screen
     when it's in view (never under reduced motion, Save-Data or a slow connection); on a phone it's a still until the
     disc asks (§3). The disc always stops it (WCAG 2.2.2). —— -->
<section class="ab-bike" aria-labelledby="ab-bike-h">
  <div class="ab-bike-top">
    <div class="wrap ab-bike-head">
      <h2 class="ab-h2" id="ab-bike-h">${headingOf(sec)}</h2>
    </div>
  </div>
  <div class="ab-bike-low">
    <div class="wrap ab-bike-in">
      <figure class="ab-film" data-playing="false">
        <div class="ab-film-frame">
          <video class="ab-film-v" muted loop playsinline disablepictureinpicture preload="none" poster="${FILM.poster}" width="${FILM.w}" height="${FILM.h}" aria-label="${esc(FILM.alt)}">
            <source src="${FILM.webm}" type="video/webm">
            <source src="${FILM.mp4}" type="video/mp4">
          </video>
          <button class="ab-play" type="button" aria-label="Play, ${FILM.seconds} seconds" data-seconds="${FILM.seconds}" hidden>${PLAY}</button>
        </div>
        <figcaption>${esc(FILM.where)}</figcaption>
      </figure>
      ${words(sec, "Then Came the Bike", "ab-words ab-bike-words")}
    </div>
  </div>
</section>
`;
}

// —— bubble: AIDS/LifeCycle, his photographs as a staggered set: two columns on a wide screen (1 and 5 on the left; 2 and the pair
//    3 and 4 on the right), each stepping down on its own, then 6, the finish, across the page; one grid in his order on a phone ——
const PHOTOS = A.photos || [];
const SLOT_IDS = ["a", "b", "c", "d", "e", "f"];
function print(p, i) {
  const id = SLOT_IDS[i] || "x";
  if (!p.src || !p.where || !has(p.src)) {
    SLOTS.push(`AIDS/LifeCycle photo ${i + 1}`);
    return `<figure class="ab-p ab-p--${id} ab-p--empty"><div class="ab-p-frame"><p>${esc(p.want)}</p></div></figure>`;
  }
  const av = String(p.src).replace(/\.jpe?g$/i, ".avif"), wb = String(p.src).replace(/\.jpe?g$/i, ".webp");
  return `<figure class="ab-p ab-p--${id}"><div class="ab-p-frame"><picture>${has(av) ? `<source type="image/avif" srcset="${esc(av)}">` : ""}${has(wb) ? `<source type="image/webp" srcset="${esc(wb)}">` : ""}<img src="${esc(p.src)}"${p.width ? ` width="${p.width}" height="${p.height}"` : ""} alt="${esc(p.alt)}" loading="lazy" decoding="async"></picture></div><figcaption>${esc(p.where)}</figcaption></figure>`;
}
function bubbleRoom(sec) {
  return `<!-- —— bubble: his AIDS/LifeCycle photographs as a staggered set on the grid, each with its own place · month line, then his
     words, so the statement after this room lands straight off them. Nothing laid over a picture (§3). —— -->
<section class="ab-bubble" aria-labelledby="ab-bubble-h">
  <div class="wrap ab-bubble-in">
    <h2 class="ab-h2" id="ab-bubble-h">${headingOf(sec)}</h2>
    <div class="ab-set">
      <div class="ab-set-col ab-set-col--l">${[0, 4].map((i) => PHOTOS[i] ? print(PHOTOS[i], i) : "").join("")}</div>
      <div class="ab-set-col ab-set-col--r">${PHOTOS[1] ? print(PHOTOS[1], 1) : ""}<div class="ab-set-pair">${[2, 3].map((i) => PHOTOS[i] ? print(PHOTOS[i], i) : "").join("")}</div></div>
      ${PHOTOS[5] ? print(PHOTOS[5], 5) : ""}
    </div>
    ${words(sec, "The Love Bubble Was Real", "ab-words ab-bubble-words")}
  </div>
</section>
`;
}

// —— statement: one line of his, type only. A one-letter word keeps the next word with it on the line ("I actually") ——
function statementRoom(sec) {
  const t = curl(String(sec.text || "").trim()).replace(/(^|\s)(I|a|A) /g, "$1$2&nbsp;");
  return `<!-- —— the statement. One line of his, as big as the screen allows, on patina. Nothing else in the room. —— -->
<section class="ab-say">
  <div class="wrap">
    <p class="ab-say-line">${t}</p>
  </div>
</section>
`;
}

// —— ten: 10,000 and the year as a lane ——
const RIDING = CHROME.RIDING || [];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayOfYear = (ymd) => { const [y, m, d] = ymd.split("-").map(Number); return (Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 86400000; };
// a ride with no 2027 date yet isn't on the lane and isn't named here (no recovery reference on this page)
const dated = RIDING.filter((r) => /^2027-\d{2}-\d{2}$/.test(r.start));
const pct = (d) => (d / 365 * 100).toFixed(3) + "%";
const marks = dated.map((r) => {
  const a = dayOfYear(r.start), b = dayOfYear(r.end && /^2027/.test(r.end) ? r.end : r.start) + 1;
  return `<i class="ab-lane-mark${r.status !== "confirmed" ? " ab-lane-mark--proj" : ""}" style="--a:${pct(a)};--b:${pct(b)}"></i>`;
}).join("");
const months = MON.map((m, i) => `<span class="ab-lane-m" style="--a:${pct(dayOfYear(`2027-${String(i + 1).padStart(2, "0")}-01`))}"><span class="l">${m}</span><span class="s">${m[0]}</span></span>`).join("");
const rideList = dated.map((r) => `<li>${esc(r.name)}, ${esc(r.date)}${r.status !== "confirmed" ? " (placed on the 2026 weekend)" : ""}</li>`).join("");
function tenRoom(sec) {
  return `<!-- —— ten. The number once, as wide as the grid; under it the year as a lane, a mark on every day of his dated 2027 rides
     (outlined: placed on the 2026 weekend). The training count stays in the tally line, never next to the 10,000 (§1). —— -->
<section class="ab-ten" aria-labelledby="ab-ten-h">
  <div class="wrap ab-ten-in">
    <h2 class="ab-ten-h" id="ab-ten-h"><span class="ab-ten-n num">10,000</span> <span class="ab-ten-t">miles in 2027, all on the bike.</span></h2>
    ${sec && sec.heading ? `<p class="ab-ten-say">${headingOf(sec)}</p>` : ""}
    <figure class="ab-lane">
      <div class="ab-lane-road" aria-hidden="true">${marks}</div>
      <div class="ab-lane-months" aria-hidden="true">${months}</div>
      <ul class="sr">${rideList}</ul>
      <figcaption class="ab-lane-key"><span class="sr">The 2027 rides I&rsquo;m doing. </span><span aria-hidden="true"><i class="ab-k"></i>The organizer&rsquo;s date</span><span aria-hidden="true"><i class="ab-k ab-k--proj"></i>Placed on the 2026 weekend</span></figcaption>
    </figure>
    <p class="ab-ten-acts"><a class="link" href="/events/2027/riding/">All my 2027 rides</a>${NOTE ? `<a class="link" href="${esc(NOTE.href)}">Read the last ride</a>` : ""}</p>
    ${sec ? words(sec, "the 10,000-mile year", "ab-words ab-ten-words") : ""}
  </div>
</section>
`;
}

// —— mission: his words beside the head, then the orgs as a roll call ——
const ORGS = [
  { name: "one&middot;n&middot;ten", line: "Phoenix nonprofit for LGBTQ+ youth ages 11 to 24. Safe spaces, housing, leadership.", acts: [["https://onenten.org", "Give to one&middot;n&middot;ten"]] },
  { name: "Los Angeles LGBT Center", line: "Health, housing and advocacy for LGBTQ+ people.", acts: [["https://centerrideout.lalgbtcenter.org/en/", "Sign up with the Center"], ["https://www.lalgbtcenter.org", "Give to the Center"]] },
  { name: "San Francisco AIDS Foundation", line: "HIV, sexual health and <span class=\"nowrap\">harm-reduction</span> services.", acts: [["https://www.sfaf.org", "Give to SFAF"]] },
];
function missionRoom(sec) {
  return `<!-- —— mission. His words beside the head, then the orgs as a roll call: the homepage's checked lines (research/events/
     2026-10-26-homepage-facts.md), the money through their own pages (Center Ride Out first, §5), the help lines. —— -->
<section class="ab-mission" aria-labelledby="ab-mission-h">
  <div class="wrap ab-mission-in">
    <h2 class="ab-h2 ab-mission-h" id="ab-mission-h">${headingOf(sec)}</h2>
    ${words(sec, "My Mission", "ab-words ab-mission-words")}
    <div class="ab-roll">
      <p class="eyebrow ab-roll-k">The orgs I ride for.</p>
      <ul class="ab-roll-list">
        ${ORGS.map((o) => `<li class="ab-org"><h3 class="ab-org-h">${o.name}</h3><div class="ab-org-b"><p class="ab-org-p">${o.line}</p><p class="ab-org-acts">${o.acts.map(([h, t]) => `<a class="link" href="${h}" target="_blank" rel="noopener noreferrer">${t}</a>`).join("")}</p></div></li>`).join("\n        ")}
      </ul>
      <div class="ab-roll-foot">
        <p class="ab-roll-note">You sign up or give on their page. None of it comes through me.</p>
        <div class="ab-help">
          <span class="eyebrow">If it&rsquo;s now</span>
          <span class="ab-help-l"><a href="tel:988"><b>988</b> call or text</a>, any hour</span>
          <span class="ab-help-l"><b>Trevor Project</b> <a class="nowrap" href="tel:18664887386">1-866-488-7386</a> or text START to <span class="nowrap">678-678</span></span>
          <a class="link" href="/resources/">Help lines, by age</a>
        </div>
      </div>
    </div>
  </div>
</section>
`;
}

// —— a section of his the layout has no room for ——
function plainRoom(sec, i) {
  return `<section class="ab-plain"${sec.heading ? ` aria-labelledby="ab-plain-${i}"` : ""}>
  <div class="wrap ab-plain-in">
    ${sec.heading ? `<h2 class="ab-h2" id="ab-plain-${i}">${headingOf(sec)}</h2>` : ""}
    ${words(sec, sec.heading || "a section")}
  </div>
</section>
`;
}

// —— the sign: CYCLE FOR + the blank, and one way in. Tapping the blank puts the cursor in the field ——
const SIGN = `<!-- —— the sign. A visitor types and the plate takes the word; nothing leaves the page. One way in under it (what the sign
     asks, on video); the closing block under the room carries Ride with me and Find a group ride. —— -->
<section class="ab-sign" aria-labelledby="ab-sign-h">
  <div class="wrap ab-sign-in">
    <h2 class="ab-sign-h" id="ab-sign-h">${MARK_WORD("ab-sign-mark")}<label class="ab-sign-plate" for="who" data-empty="true" data-sign-plate aria-hidden="true"></label><span class="sr" id="signSr">Cycle for</span></h2>
    <div class="ab-sign-form">
      <label class="ab-sign-q" for="who">Who do you cycle for?</label>
      <input class="ab-sign-input" id="who" type="text" maxlength="22" autocomplete="off" enterkeyhint="done" placeholder="Type it. The sign changes." data-sign-input>
      <p class="ab-sign-note">Nothing to pay, nothing to join. <button class="ab-sign-reset" type="button" data-sign-reset hidden>Clear the sign</button></p>
      <p class="ab-sign-more"><a class="link" href="/cyclefor/">Say it on video. Five seconds.</a></p>
    </div>
  </div>
</section>
`;

// ———————————————————————— the page ————————————————————————
const ROOMS = { open: null, bike: bikeRoom, bubble: bubbleRoom, statement: statementRoom, ten: tenRoom, mission: missionRoom };
const secs = Array.isArray(A.sections) ? A.sections : [];
const openSec = secs.find((s) => s.room === "open") || null;
let body = openRoom(openSec);
let tenDone = false;
secs.forEach((s, i) => {
  if (s.room === "open") return;
  if (s.room === "ten") tenDone = true;
  body += "\n" + (ROOMS[s.room] ? ROOMS[s.room](s, i) : plainRoom(s, i));
});
if (!tenDone) body += "\n" + tenRoom(null);   // the 10,000 is on the page whether or not he writes a section for it
body += "\n" + SIGN;

const LD = [
  { "@context": "https://schema.org", "@type": "AboutPage", name: "About me", url: "https://cycleforchange.org/about/", mainEntity: { "@id": "https://cycleforchange.org/about/#robert" }, isPartOf: { "@type": "WebSite", name: "Cycle for Change", url: "https://cycleforchange.org/" } },
  { "@context": "https://schema.org", "@type": "Person", "@id": "https://cycleforchange.org/about/#robert", name: "Robert Castan", url: "https://cycleforchange.org/about/", homeLocation: { "@type": "Place", name: "Phoenix, Arizona" }, sameAs: [CHROME.INSTAGRAM, CHROME.STRAVA] },
];

const noindex = SLOTS.length > 0;
const head = CHROME.head({
  title: "About Robert Castan",
  // the homepage's share line, word for word (the brand gate: nothing invented)
  description: "Cycling changed my life. I ride 10,000 miles in 2027 and write every ride down. The money goes through the orgs’ own rides.",
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
