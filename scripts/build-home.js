/* Cycle for Change — the homepage, Pass 26 "Lane Paint" (Oct 5, 2026); Pass 27 "on the road" (Oct 6).
   Writes cfc-site/index.html from the shared chrome (header, menu, tally line, footer) plus the
   page below, so the homepage and every inner page come from one source. Run after any change to
   scripts/chrome.js:   node scripts/build-home.js
   Styles: /home.css (the Pass 26 block at the foot). Behaviour: /home.js (the tally, the log,
   the reel, the sign). Numbers in the markup are the fallback until the Strava feed answers. */
"use strict";

const fs = require("fs");
const path = require("path");
const CHROME = require("./chrome.js");

const OUT = path.join(__dirname, "..", "cfc-site", "index.html");

// The ride directory's numbers come from the data, like the menu count in chrome.js (Oct 5, 2026: the
// page said 1407 while the directory held 1422). Listed rides = live.json when it exists.
function rideNumbers() {
  const read = (rel) => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, "..", rel), "utf8")); } catch (e) { return null; } };
  const live = read("cfc-site/rides/live.json");
  const all = read("cfc-site/rides/rides.json");
  const rides = Array.isArray(live) ? live : Array.isArray(all) ? all : Array.isArray(all && all.rides) ? all.rides : [];
  const countries = new Set(rides.map((r) => r.country).filter((c) => c && c !== "US"));
  return { rides: rides.length || 1407, abroad: countries.size || 18 };
}
const RN = rideNumbers();
const RIDES_N = RN.rides.toLocaleString("en-US");

// The mark, stacked, as the page's headline. Same glyphs as the one-line mark in chrome.js.
const STACK = (cls = "") => `<svg class="sign-mark ${cls}" viewBox="-10 -10 370 350" aria-hidden="true" focusable="false">
        <g filter="url(#lpWorn)">
          <g clip-path="url(#lpRow)" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round">
            <use href="#lpC"/><use href="#lpY" transform="translate(74 0)"/><use href="#lpC" transform="translate(148 0)"/><use href="#lpL" transform="translate(222 0)"/><use href="#lpE" transform="translate(296 0)"/>
          </g>
          <g transform="translate(0 180)">
            <g clip-path="url(#lpRow)" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round">
              <use href="#lpF"/><use href="#lpO" transform="translate(74 0)"/><use href="#lpR" transform="translate(148 0)"/>
            </g>
          </g>
        </g>
      </svg>`;

const WORN_DEFS = `<svg aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">
  <defs>
    <filter id="lpWorn" x="-10%" y="-10%" width="120%" height="120%">
      <!-- Pass 27: worn along the tire line — long horizontal streaks and small chips, not blobs -->
      <feTurbulence type="fractalNoise" baseFrequency=".012 .11" numOctaves="3" seed="11" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.9" result="m"/>
      <feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="2" seed="3" result="c"/>
      <feColorMatrix in="c" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3 0 0 0 2.6" result="chips"/>
      <feComposite in="m" in2="chips" operator="arithmetic" k2="1" k3="1" result="mask"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" result="edge"/>
      <feComposite in="edge" in2="mask" operator="in"/>
    </filter>
    <filter id="lpGrain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    <!-- Pass 27: paint worn along the tire line (long streaks), a roller's drag, and the sprayed mark -->
    <filter id="lpWornSoft" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency=".02 .14" numOctaves="3" seed="5" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -5 0 0 0 4.1" result="m"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="edge"/>
      <feComposite in="edge" in2="m" operator="in"/>
    </filter>
    <filter id="lpRoller" x="-5%" y="-30%" width="110%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency=".02 .5" numOctaves="2" seed="21" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency=".03 .3" numOctaves="2" seed="8" result="w"/>
      <feColorMatrix in="w" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -4 0 0 0 3.6" result="m"/>
      <feComposite in="d" in2="m" operator="in"/>
    </filter>
    <filter id="lpSpray" x="-30%" y="-30%" width="160%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="5" result="d"/>
      <feGaussianBlur in="d" stdDeviation="2.2" result="halo"/>
      <feColorMatrix in="halo" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .55 0" result="h2"/>
      <feMerge><feMergeNode in="h2"/><feMergeNode in="d"/></feMerge>
    </filter>
    <!-- the marks a city paints: the lane bicycle, the diamond, the painter's mark -->
    <symbol id="lpBike" viewBox="0 0 240 160">
      <g fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="52" cy="112" r="38"/><circle cx="188" cy="112" r="38"/>
        <path d="M52 112 L92 44 H138 L188 112 M92 44 L120 112 H52 M138 44 L126 24 H150 M80 44 H104"/>
      </g>
    </symbol>
    <symbol id="lpDiamond" viewBox="0 0 60 100"><path d="M30 4 L56 50 L30 96 L4 50 Z" fill="none" stroke="currentColor" stroke-width="9" stroke-linejoin="round"/></symbol>
    <symbol id="lpOrgs" viewBox="0 0 190 100"><g fill="currentColor"><path d="M30 50 L58 10 L86 50 L58 90 Z"/><path d="M80 50 L108 10 L136 50 L108 90 Z" opacity=".75"/><path d="M130 50 L158 10 L186 50 L158 90 Z" opacity=".5"/></g></symbol>
    <symbol id="lpStroke" viewBox="0 0 190 100"><g filter="url(#lpRoller)"><rect x="8" y="38" width="174" height="26" fill="currentColor"/></g></symbol>
    <symbol id="lpMark" viewBox="0 0 150 150">
      <g fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round"><path d="M118 46 V34 Q118 18 102 18 H96 M84 18 H52 Q22 18 22 48 V102 Q22 132 52 132 H84 M96 132 H102 Q118 132 118 116 V104"/></g>
      <rect x="62" y="66" width="70" height="20" fill="#D9B1AA"/>
    </symbol>
  </defs>
</svg>`;

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>Cycle for Change — 10,000 miles in 2027, all on the bike, written down ride by ride</title>
  <meta name="description" content="Cycle for Change. Robert rides 10,000 miles in 2027, all on the bike, and writes every ride down: the route, the town, who he met. The money goes through the orgs' own rides. Group rides, a 2027 calendar, town guides and LGBTQ mental health resources.">
  <link rel="canonical" href="https://cycleforchange.org/">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Cycle for Change">
  <meta property="og:url" content="https://cycleforchange.org/">
  <meta property="og:title" content="Cycle for Change — 10,000 miles in 2027, all on the bike">
  <meta property="og:description" content="Cycling changed my life. I ride 10,000 miles in 2027 and write every one down. The money goes through the orgs' own rides.">
  <meta property="og:image" content="https://cycleforchange.org/og-cfc.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Cycle for Change — 10,000 miles in 2027, all on the bike">
  <meta name="twitter:description" content="Cycling changed my life. I ride 10,000 miles in 2027 and write every one down.">
  <meta name="twitter:image" content="https://cycleforchange.org/og-cfc.png">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/favicon-180.png">
  ${CHROME.FONTS}
  <link rel="preload" as="image" href="/img/sign-print-3-phone.jpg" media="(max-width:759px)">
  <link rel="preload" as="image" href="/img/sign-print-3.jpg" media="(min-width:760px)">
  <link rel="stylesheet" href="/home.css">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cycle for Change",
    "url": "https://cycleforchange.org/",
    "logo": "https://cycleforchange.org/og-cfc.png",
    "sameAs": ["https://www.instagram.com/cycl_eforchange", "https://www.strava.com/athletes/22899089"],
    "description": "One rider, Robert Castan, in Phoenix, riding 10,000 miles on a bicycle in 2027, every ride written up on cycleforchange.org. The rides raise money for queer-serving organizations through their own events: Cycling 4 one·n·ten, the Center Ride Out and Cycle to Zero. The site also holds a directory of group rides, a 2027 ride calendar and town guides."
  }
  </script>
</head>
<body class="home">
${WORN_DEFS}
${CHROME.HEADER.replace('<p class="tally-line">', '<p class="tally-line tally-line--home">')}

<main id="main">

<!-- —— the sign (Pass 26). The mark is the headline; the plate is the blank. /home.js rotates it and
     lets a visitor type into it. Nothing is collected. —— -->
<section class="sign sign--print" id="top" aria-labelledby="sign-h">
  <picture class="sign-ph">
    <source media="(max-width:759px)" srcset="/img/sign-print-3-phone.jpg">
    <img src="/img/sign-print-3.jpg" width="2000" height="1428" alt="Robert and Caleb with their bikes on a desert road at sunset." fetchpriority="high">
  </picture>
  <div class="sign-scrim" aria-hidden="true"></div>
  <svg class="sign-grain" aria-hidden="true" focusable="false"><rect width="100%" height="100%" filter="url(#lpGrain)"/></svg>
  <svg class="sign-sig" viewBox="0 0 150 150" aria-hidden="true" focusable="false"><use href="#lpMark"/></svg>
  <div class="wrap sign-in">
    <div class="sign-left">
      <p class="sign-kicker">Robert. Phoenix. <a id="stravaLink" href="https://www.strava.com/athletes/22899089" target="_blank" rel="noopener noreferrer">Mile <b class="num" data-miles>3,573</b> of training, on Strava.</a> The 10,000 start Jan 1.</p>
      <h1 class="sign-h" id="sign-h">
        ${STACK()}
        <span class="sign-plate sign-plate--blank" id="signPlate" data-empty="true"></span>
        <span class="sr">Cycle for</span>
      </h1>
    </div>
    <div class="sign-right">
      <label class="sign-q" for="who">Who do you cycle for?</label>
      <input class="sign-input" id="who" type="text" maxlength="22" autocomplete="off" placeholder="Type it. The sign changes.">
      <p class="sign-note">Nothing to pay, nothing to join. <button class="sign-reset" id="signReset" type="button" hidden>Clear the sign</button></p>
      <p class="sign-line">I&rsquo;d like to say I ride for everyone else. I ride because it changed me.</p>
      <div class="sign-acts">
        <a class="btn btn--plate" href="#ride">Ride with me</a>
        <a class="link link--bone" href="#road">Read the last ride</a>
      </div>
    </div>
  </div>
</section>

<!-- —— the numbers —— -->
<section class="s s--tar nums nums--bar" aria-label="The numbers">
  <div class="wrap">
  <svg class="stopbar" viewBox="0 0 1200 70" preserveAspectRatio="none" aria-hidden="true" focusable="false"><g filter="url(#lpRoller)"><rect x="0" y="12" width="1200" height="46" fill="#EFEDEA"/></g></svg>
  <div class="nums-in">
    <div class="num-tile"><b class="num" data-miles>3,573</b><span>miles since June 1</span></div>
    <div class="num-tile"><b class="num" id="rideCount">97</b><span>rides, <a href="https://www.strava.com/athletes/22899089" target="_blank" rel="noopener noreferrer">every one on Strava</a></span></div>
    <div class="num-tile num-tile--rose"><b class="num">10,000</b><span>miles in 2027. The count restarts in <b class="num" id="daysTo">88</b> days. If I fall behind, this number says so.</span></div>
  </div>
  </div>
</section>

<!-- —— the last ride: the reel, the log —— -->
<section class="s s--tar" id="road" aria-labelledby="road-h">
  <div class="wrap road">
    <div>
      <div class="s-head"><div class="stack16"><p class="eyebrow">From the road</p><h2 class="h2" id="road-h">The last rides.</h2></div></div>
      <ol class="log" id="log" data-max="4" aria-live="polite">
        <li><span class="when">Mon Oct 5</span><span class="bar-mi" style="--w:.57"></span><span class="mi num">35.7<small>MI</small></span></li>
        <li><span class="when">Sun Oct 4</span><span class="bar-mi" style="--w:1"></span><span class="mi num">63.1<small>MI</small></span></li>
        <li><span class="when">Sat Oct 3</span><span class="bar-mi" style="--w:.67"></span><span class="mi num">42.3<small>MI</small></span></li>
        <li><span class="when">Fri Oct 2</span><span class="bar-mi" style="--w:.58"></span><span class="mi num">36.6<small>MI</small></span></li>
      </ol>
      <p class="road-note">Every ride gets a stroke, as long as the ride. The big ones get a page: the route, the town, who was there, the footage.</p>
    </div>
    <div class="road-side">
      <figure class="road-film">
        <video id="roadVid" muted loop playsinline disablepictureinpicture preload="none" poster="/film/road-film.jpg" width="864" height="1080" aria-label="Eighteen seconds of this year's rides: the road over the bars, a drone overhead, the desert, riders up ahead.">
          <source src="/film/road-film.mp4" type="video/mp4">
        </video>
        <button class="road-film-btn" id="roadBtn" type="button">Watch the last ride</button>
      </figure>
      <p class="road-tally"><b class="num" id="roadRides">97</b> rides since June 1. The count starts over on January 1.</p>
      <a class="link" href="https://www.strava.com/athletes/22899089" target="_blank" rel="noopener noreferrer">Follow on Strava</a>
    </div>
  </div>
</section>

<!-- —— why —— -->
<section class="s why" id="why" aria-labelledby="why-h">
  <div class="wrap why-in">
    <h2 class="h2 why-h" id="why-h">It always says cycling.</h2>
    <div class="why-copy">
      <p class="lede">Cycling changed my life. I&rsquo;d like to say I&rsquo;m cycling for other people. I&rsquo;m really cycling for myself. I&rsquo;m cycling because it changed me. That&rsquo;s the story.</p>
      <p class="lede">So the sign changes. What comes after the word is up to whoever&rsquo;s riding.</p>
      <p class="plates"><span class="plate">me</span><span class="plate">one&middot;n&middot;ten, on Nov 7</span><span class="plate">change</span></p>
    </div>
  </div>
</section>

<!-- —— the orgs. Pass 28 (Oct 5, evening): a painted map with the coast on it, and one painted ride
     badge per org — the route as a roller stroke, a diamond at the start, the date on a plate. Road paint only. —— -->
<section class="s s--paper orgs-s" id="orgs" aria-labelledby="orgs-h">
  <div class="wrap">
    <div class="orgs-top">
      <div class="stack16"><h2 class="h2" id="orgs-h">The orgs I ride for.</h2><p class="lede w38">Three rides. You sign up or give on their page. None of it comes through me.</p></div>
      <svg class="route-map" viewBox="0 0 700 560" role="img" aria-label="The three rides on a map of the West: Cycling 4 one·n·ten in Phoenix on Nov 7, the Center Ride Out in Los Angeles in April, Cycle to Zero in San Francisco in May">
        <!-- the coast and the state lines, painted thin -->
        <g fill="none" stroke="var(--dust)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#lpWornSoft)">
          <path d="M40 -10 C 58 30, 86 48, 112 60 C 128 110, 132 170, 158 232 C 182 270, 210 300, 246 322 L 262 338"/>
          <path d="M262 338 C 340 352, 430 372, 520 402 C 580 422, 640 452, 700 478"/>
          <path d="M330 -10 L 330 150 L 500 330"/>
          <path d="M500 330 C 520 300, 560 270, 580 230 L 600 -10"/>
        </g>
        <!-- the ride, a roller stroke home from SF -->
        <g fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" filter="url(#lpRoller)">
          <path d="M118 62 C 112 110, 120 170, 158 232 C 250 262, 360 320, 470 392 C 510 416, 540 430, 560 440"/>
        </g>
        <g fill="none" stroke="var(--paper)" stroke-width="2.5" stroke-dasharray="14 12">
          <path d="M118 62 C 112 110, 120 170, 158 232 C 250 262, 360 320, 470 392 C 510 416, 540 430, 560 440"/>
        </g>
        <g filter="url(#lpWornSoft)" style="color:var(--creosote)">
          <use href="#lpDiamond" x="104" y="36" width="30" height="52"/><use href="#lpDiamond" x="144" y="206" width="30" height="52"/><use href="#lpDiamond" x="546" y="414" width="30" height="52"/>
        </g>
        <g font-weight="900" fill="currentColor">
          <text x="150" y="60" font-size="44">SF</text><rect x="150" y="72" width="122" height="46" fill="var(--creosote)"/><text x="162" y="106" font-size="30" font-weight="800" fill="var(--paper)">SFAF</text>
          <text x="150" y="134" font-size="24" font-weight="700" fill="var(--mute)">May 21 to 23</text>
          <text x="24" y="296" font-size="44">LA</text><rect x="24" y="308" width="188" height="46" fill="var(--creosote)"/><text x="36" y="342" font-size="30" font-weight="800" fill="var(--paper)">the Center</text>
          <text x="24" y="382" font-size="24" font-weight="700" fill="var(--mute)">Apr 23 to 25</text>
          <text x="440" y="492" font-size="44">PHX</text><rect x="440" y="504" width="212" height="46" fill="var(--creosote)"/><text x="452" y="538" font-size="30" font-weight="800" fill="var(--paper)">one&middot;n&middot;ten</text>
          <text x="590" y="492" font-size="24" font-weight="700" fill="var(--mute)">Nov 7</text>
        </g>
      </svg>
    </div>
    <div class="orgs">
      <article class="org">
        <svg class="org-badge" viewBox="0 0 300 200" role="img" aria-label="Cycling 4 one·n·ten: a loop out of Phoenix, 20 or 62 miles, Saturday November 7">
          <g fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="round" filter="url(#lpWornSoft)">
            <path d="M36 140 C 20 96, 44 44, 96 40 C 140 36, 158 70, 150 104 C 142 140, 108 160, 76 152"/>
          </g>
          <g filter="url(#lpWornSoft)" style="color:var(--creosote)"><use href="#lpDiamond" x="22" y="118" width="28" height="48"/></g>
          <g font-weight="900" fill="currentColor"><text x="176" y="92" font-size="56">20</text><text x="176" y="146" font-size="56">62</text><text x="246" y="146" font-size="18" font-weight="700" fill="var(--mute)">MI</text><text x="246" y="92" font-size="18" font-weight="700" fill="var(--mute)">MI</text><text x="176" y="42" font-size="16" font-weight="700" fill="var(--mute)">ONE DAY</text></g>
          <rect x="170" y="158" width="118" height="34" fill="var(--creosote)"/><text x="229" y="183" font-size="20" font-weight="800" fill="var(--paper)" text-anchor="middle">Sat Nov 7</text>
        </svg>
        <div class="org-text">
          <h3 class="h3">one&middot;n&middot;ten</h3>
          <p>Phoenix nonprofit for LGBTQ+ youth ages 11 to 24. Safe spaces, housing, leadership.</p>
          <p class="org-ride">Cycling 4 one&middot;n&middot;ten, Sat Nov 7, Phoenix</p>
          <div class="org-acts"><a class="link" href="https://runsignup.com/Race/AZ/Phoenix/c4ont" target="_blank" rel="noopener noreferrer">Ride it with me</a><a class="link" href="https://onenten.org" target="_blank" rel="noopener noreferrer">Give to one&middot;n&middot;ten</a></div>
        </div>
      </article>
      <article class="org">
        <svg class="org-badge" viewBox="0 0 300 200" role="img" aria-label="Center Ride Out: Los Angeles to Ojai and back, three days, April 23 to 25">
          <g fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="round" filter="url(#lpWornSoft)">
            <path d="M34 168 C 90 160, 150 146, 210 124 C 236 114, 256 108, 272 106"/>
            <path d="M272 118 C 250 124, 224 134, 196 146 C 150 164, 96 178, 44 182"/>
          </g>
          <g filter="url(#lpWornSoft)" style="color:var(--creosote)"><use href="#lpDiamond" x="20" y="150" width="28" height="48"/><use href="#lpDiamond" x="262" y="80" width="28" height="48"/></g>
          <g font-weight="900" fill="currentColor"><text x="22" y="64" font-size="56">3<tspan font-size="22" font-weight="700" fill="var(--mute)"> days</tspan></text><text x="22" y="94" font-size="16" font-weight="700" fill="var(--mute)">LA TO OJAI AND BACK</text></g>
          <rect x="162" y="18" width="126" height="34" fill="var(--creosote)"/><text x="225" y="43" font-size="20" font-weight="800" fill="var(--paper)" text-anchor="middle">Apr 23 to 25</text>
        </svg>
        <div class="org-text">
          <h3 class="h3">Los Angeles LGBT Center</h3>
          <p>Health, housing and advocacy for LGBTQ+ people.</p>
          <p class="org-ride">Center Ride Out, Apr 23 to 25, 2027</p>
          <div class="org-acts"><a class="link" href="https://centerrideout.lalgbtcenter.org/en/" target="_blank" rel="noopener noreferrer">Ride it with me</a><a class="link" href="https://www.lalgbtcenter.org" target="_blank" rel="noopener noreferrer">Give to the Center</a></div>
        </div>
      </article>
      <article class="org">
        <svg class="org-badge" viewBox="0 0 300 200" role="img" aria-label="Cycle to Zero: three days out of San Francisco, May 21 to 23">
          <g fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="round" filter="url(#lpWornSoft)">
            <path d="M34 92 C 60 80, 84 84, 100 104"/>
            <path d="M118 112 C 140 128, 166 124, 186 102"/>
            <path d="M204 96 C 224 78, 248 74, 272 84"/>
          </g>
          <g filter="url(#lpWornSoft)" style="color:var(--creosote)"><use href="#lpDiamond" x="20" y="70" width="28" height="48"/><use href="#lpDiamond" x="96" y="92" width="28" height="48"/><use href="#lpDiamond" x="180" y="84" width="28" height="48"/></g>
          <g font-weight="900" fill="currentColor"><text x="22" y="178" font-size="56">3<tspan font-size="22" font-weight="700" fill="var(--mute)"> days</tspan></text><text x="150" y="176" font-size="16" font-weight="700" fill="var(--mute)">SAN FRANCISCO</text></g>
          <rect x="162" y="18" width="126" height="34" fill="var(--creosote)"/><text x="225" y="43" font-size="20" font-weight="800" fill="var(--paper)" text-anchor="middle">May 21 to 23</text>
        </svg>
        <div class="org-text">
          <h3 class="h3">San Francisco AIDS Foundation</h3>
          <p>No-cost HIV, harm-reduction and LGBTQ+ health services.</p>
          <p class="org-ride">Cycle to Zero, May 21 to 23, 2027</p>
          <div class="org-acts"><a class="link" href="https://www.sfaf.org/get-involved/cycle-to-zero/" target="_blank" rel="noopener noreferrer">Ride it with me</a><a class="link" href="https://www.sfaf.org" target="_blank" rel="noopener noreferrer">Give to SFAF</a></div>
        </div>
      </article>
    </div>
    <p class="lede w38 open-door">You don&rsquo;t have to be queer to ride with me. The rides raise money for queer-serving orgs. That&rsquo;s the point.</p>
  </div>
</section>

<!-- —— ride with me: Nov 7, then the finder —— -->
<section class="s ridewith" id="ride" aria-labelledby="ride-h">
  <div class="wrap">
    <h2 class="h2" id="ride-h">Ride with me.</h2>
    <div class="ride-in">
      <div class="ride-next">
        <p class="eyebrow">Next up, a one&middot;n&middot;ten fundraiser</p>
        <h3 class="h2 ride-h3">Nov 7, I cycle for <span class="plate plate--big">one&middot;n&middot;ten</span></h3>
        <p>Cycling 4 one&middot;n&middot;ten, Bike Ride &amp; Block Party at Prisma Community Care, Phoenix.</p>
        <dl class="facts-dl">
          <div><dt>62 miles</dt><dd>7:00 AM, $100</dd></div>
          <div><dt>20 miles</dt><dd>9:00 AM, $50</dd></div>
          <div><dt>Block party</dt><dd>10 AM to 2 PM</dd></div>
          <div><dt>Who</dt><dd>18+, no e-bikes, no fundraising minimum</dd></div>
          <div><dt>Sign up by</dt><dd>Thu Nov 5</dd></div>
        </dl>
        <a class="btn btn--ink" href="https://runsignup.com/Race/AZ/Phoenix/c4ont" target="_blank" rel="noopener noreferrer">Sign up on RunSignup</a>
        <p class="note-sm">Details from RunSignup, checked Oct 5.</p>
      </div>
      <div class="ride-find">
        <p class="eyebrow">Group rides</p>
        <h3 class="h2 ride-h3">Find a group ride.</h3>
        <form class="find" action="/rides/" method="get" role="search">
          <label class="sr" for="q">Your town or a ride name</label>
          <input class="find-field" id="q" name="q" type="search" placeholder="Your town or a ride name" autocomplete="off">
          <button class="btn btn--ink" type="submit">Search rides</button>
        </form>
        <p class="find-links"><a class="link" href="/rides/no-drop/">No-drop rides</a><a class="link" href="/rides/lgbtq/">Queer rides</a><a class="link" href="/tonight/">Tonight</a></p>
        <div class="find-count"><b class="num">${RIDES_N}</b><span>group rides in the directory, each one checked in the last 90 days. Every state, ${RN.abroad} more countries. Shop rides, no-drop rides, queer rides.</span></div>
        <svg class="lane-dash" viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true" focusable="false"><g filter="url(#lpWornSoft)" fill="var(--paper)" stroke="var(--mute)" stroke-width="2"><rect x="0" y="14" width="56" height="8"/><rect x="88" y="14" width="56" height="8"/><rect x="176" y="14" width="56" height="8"/><rect x="264" y="14" width="56" height="8"/><rect x="352" y="14" width="56" height="8"/><rect x="440" y="14" width="56" height="8"/><rect x="528" y="14" width="56" height="8"/></g></svg>
        <dl class="facts-dl">
          <div><dt>Group rides</dt><dd><a href="/rides/">${RIDES_N}</a></dd></div>
          <div><dt>On the 2027 calendar</dt><dd><a href="/events/2027/">640</a></dd></div>
          <div><dt>Town guides</dt><dd><a href="/towns/">12</a></dd></div>
          <div><dt>My 2027 rides</dt><dd><a href="/events/2027/riding/">Six, so far</a></dd></div>
        </dl>
      </div>
    </div>
  </div>
</section>

<!-- —— how this works —— -->
<section class="s s--paper how" id="how" aria-labelledby="how-h">
  <div class="wrap">
    <h2 class="h2" id="how-h">How this works.</h2>
    <svg class="bike-lane" viewBox="0 0 1200 170" aria-hidden="true" focusable="false">
      <g filter="url(#lpWornSoft)" fill="var(--mute)">
        <rect x="0" y="128" width="1200" height="12"/>
        <g fill="var(--paper)" stroke="var(--mute)" stroke-width="2">
          <rect x="0" y="80" width="70" height="8"/><rect x="110" y="80" width="70" height="8"/><rect x="220" y="80" width="70" height="8"/><rect x="330" y="80" width="70" height="8"/>
          <rect x="440" y="80" width="70" height="8"/><rect x="550" y="80" width="70" height="8"/><rect x="660" y="80" width="70" height="8"/><rect x="770" y="80" width="70" height="8"/>
          <rect x="880" y="80" width="70" height="8"/><rect x="990" y="80" width="70" height="8"/><rect x="1100" y="80" width="70" height="8"/>
        </g>
      </g>
      <g style="color:var(--asphalt)" filter="url(#lpWornSoft)">
        <use href="#lpBike" x="40" y="0" width="150" height="100" style="color:var(--creosote)"/>
        <use href="#lpStroke" x="440" y="0" width="190" height="100"/>
        <use href="#lpOrgs" x="840" y="0" width="190" height="100"/>
      </g>
    </svg>
    <ol class="steps3 steps3--lane">
      <li><h3 class="h3">I ride.</h3><p>10,000 miles in 2027. Every ride lands here from Strava.</p></li>
      <li><h3 class="h3">I write it down.</h3><p>Every ride gets a stroke. The big ones get a page.</p></li>
      <li><h3 class="h3">The money goes to the orgs.</h3><p>Through their own rides. Nothing here asks for a card.</p></li>
    </ol>
  </div>
</section>

<!-- —— read —— -->
<section class="s read" id="read" aria-labelledby="read-h">
  <div class="wrap">
    <div class="s-head"><div class="stack16"><p class="eyebrow">Read</p><h2 class="h2" id="read-h">Field notes, guides, the journal.</h2></div><a class="link" href="/field-notes/">All field notes</a></div>
    <ul class="read-list">
      <li><a href="/field-notes/south-mountain-climb/"><b>South Mountain at sunset</b><span>Down Central from uptown, through downtown into South Phoenix, up the mountain as the light goes.</span></a></li>
      <li><a href="/field-notes/paradise-valley-loop/"><b>The Paradise Valley loop</b><span>The loop around Camelback and Mummy Mountain. Early, before the heat, with the whole valley below.</span></a></li>
      <li><a href="/journal/the-carrot-cake-theory/"><b>The carrot cake theory</b><span>On why the hard part of a long ride is never the ride.</span></a></li>
      <li><a href="/guides/"><b>All 12 guides</b><span>Your first charity ride, pledge-per-mile fundraising, the packing list, what happened to AIDS/LifeCycle.</span></a></li>
    </ul>
  </div>
</section>

</main>

${CHROME.FOOTER.replace('<script src="/chrome.js" defer></script>', '')}

<!-- —— the tally, everywhere (phone) —— -->
<div class="bar" id="bar" data-on="false" aria-hidden="true">
  <div class="bar-tally"><span class="dot dot--bone" aria-hidden="true"></span><b class="num" data-miles>3,573</b><span>mi since<br>June 1</span></div>
  <a class="btn btn--bone" href="#ride" tabindex="-1">Ride with me</a>
</div>

<script src="/home.js" defer></script>
</body>
</html>
`;

fs.writeFileSync(OUT, page);
console.log("wrote", path.relative(process.cwd(), OUT), page.length, "bytes");
