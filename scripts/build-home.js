/* Cycle for Change — the homepage, Pass 26 "Lane Paint" (Oct 5, 2026).
   Writes cfc-site/index.html from the shared chrome (header, menu, tally line, footer) plus the
   page below, so the homepage and every inner page come from one source. Run after any change to
   scripts/chrome.js:   node scripts/build-home.js
   Styles: /home.css (the Pass 26 block at the foot). Behaviour: /home.js (the tally, the log,
   the reel, the sign). Numbers in the markup are the fallback until the Strava feed answers. */
"use strict";

const fs = require("fs");
const path = require("path");
const CHROME = require("./chrome.js");

// one⋅n⋅ten is written with U+22C5 (&#8901;), not &middot;: Overpass treats U+00B7 as the Catalan
// l·l mark and swallows it between other letters, so "one·n·ten" set in Overpass reads "onenten".
const OUT = path.join(__dirname, "..", "cfc-site", "index.html");

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
      <feTurbulence type="fractalNoise" baseFrequency=".14 .03" numOctaves="4" seed="7" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -6 0 0 0 4.3" result="m"/>
      <feComposite in="SourceGraphic" in2="m" operator="in"/>
    </filter>
    <filter id="lpGrain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
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
  <link rel="preload" as="image" href="/img/home-hero.jpg" media="(max-width:899px)">
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
<section class="sign" id="top" aria-labelledby="sign-h">
  <svg class="sign-grain" aria-hidden="true" focusable="false"><rect width="100%" height="100%" filter="url(#lpGrain)"/></svg>
  <div class="wrap sign-in">
    <div class="sign-left">
      <p class="sign-kicker">Robert. Phoenix. <a id="stravaLink" href="https://www.strava.com/athletes/22899089" target="_blank" rel="noopener noreferrer">Mile <b class="num" data-miles>3,360</b> of training, on Strava.</a> The 10,000 start Jan 1.</p>
      <h1 class="sign-h" id="sign-h">
        ${STACK()}
        <span class="sign-plate" id="signPlate">me</span>
        <span class="sr">Cycle for me</span>
      </h1>
    </div>
    <div class="sign-right">
      <label class="sign-q" for="who">Who do you cycle for?</label>
      <input class="sign-input" id="who" type="text" maxlength="28" autocomplete="off" placeholder="Type it. The sign changes.">
      <p class="sign-note">Mine changes too. Nothing to pay, nothing to join. <button class="sign-reset" id="signReset" type="button" hidden>Back to mine</button></p>
      <p class="sign-line">I&rsquo;d like to say I ride for everyone else. I ride because it changed me.</p>
      <div class="sign-acts">
        <a class="btn btn--plate" href="#ride">Ride with me</a>
        <a class="link link--bone" href="#road">Read the last ride</a>
      </div>
      <p class="sign-note">The money goes through the orgs&rsquo; own rides. It never touches me.</p>
    </div>
  </div>
</section>

<!-- —— the numbers —— -->
<section class="s s--paper nums" aria-label="The numbers">
  <div class="wrap nums-in">
    <div class="num-tile"><b class="num" data-miles>3,360</b><span>miles since June 1</span></div>
    <div class="num-tile"><b class="num" id="rideCount">92</b><span>rides, <a href="https://www.strava.com/athletes/22899089" target="_blank" rel="noopener noreferrer">every one on Strava</a></span></div>
    <div class="num-tile num-tile--rose"><b class="num">10,000</b><span>miles in 2027. The count restarts in <b class="num" id="daysTo">88</b> days. If I fall behind, this number says so.</span></div>
  </div>
</section>

<!-- —— the last ride: the reel, the log —— -->
<section class="s s--tar" id="road" aria-labelledby="road-h">
  <div class="wrap road">
    <div>
      <div class="s-head"><div class="stack16"><p class="eyebrow">From the road</p><h2 class="h2" id="road-h">The last rides.</h2></div></div>
      <ol class="log" id="log" data-max="4" aria-live="polite">
        <li><span class="when">Sun Sep 27<b>Somo Sunday</b></span><span class="bar-mi" style="--w:.93"></span><span class="mi num">56.0<small>MI</small></span></li>
        <li><span class="when">Sat Sep 26</span><span class="bar-mi" style="--w:1"></span><span class="mi num">60.2<small>MI</small></span></li>
        <li><span class="when">Fri Sep 25</span><span class="bar-mi" style="--w:.54"></span><span class="mi num">32.7<small>MI</small></span></li>
        <li><span class="when">Wed Sep 23</span><span class="bar-mi" style="--w:.61"></span><span class="mi num">36.5<small>MI</small></span></li>
      </ol>
      <p class="road-note">Every ride gets a line. The big ones get a page: the route, the town, who was there, the footage. The first pages land here this month.</p>
    </div>
    <div class="road-side">
      <figure class="road-film">
        <video id="roadVid" muted loop playsinline disablepictureinpicture preload="none" poster="/film/road-film.jpg" width="864" height="1080" aria-label="Eighteen seconds of this year's rides: the road over the bars, a drone overhead, the desert, riders up ahead.">
          <source src="/film/road-film.mp4" type="video/mp4">
        </video>
        <button class="road-film-btn" id="roadBtn" type="button">Play the reel</button>
      </figure>
      <p class="road-tally"><b class="num">92</b> rides since June 1. The count starts over on January 1.</p>
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
      <p class="plates"><span class="plate">me</span><span class="plate">one&#8901;n&#8901;ten, on Nov 7</span><span class="plate">change</span></p>
    </div>
  </div>
</section>

<!-- —— the orgs —— -->
<section class="s s--paper orgs-s" id="orgs" aria-labelledby="orgs-h">
  <div class="wrap">
    <div class="s-head"><div class="stack16"><h2 class="h2" id="orgs-h">The orgs I ride for.</h2><p class="lede w38">Each one has a ride. That&rsquo;s where the money goes: you sign up or give on their page, and it never touches me.</p></div></div>
    <div class="orgs">
      <article class="org">
        <h3 class="h3">one&#8901;n&#8901;ten</h3>
        <p>Phoenix nonprofit for LGBTQ+ youth ages 11 to 24. Safe spaces, housing, leadership.</p>
        <p class="org-ride">Cycling 4 one&#8901;n&#8901;ten, Sat Nov 7, Phoenix</p>
        <div class="org-acts"><a class="link" href="https://runsignup.com/Race/AZ/Phoenix/c4ont" target="_blank" rel="noopener noreferrer">Ride it with me</a><a class="link" href="https://onenten.org" target="_blank" rel="noopener noreferrer">Give to one&#8901;n&#8901;ten</a></div>
      </article>
      <article class="org">
        <h3 class="h3">Los Angeles LGBT Center</h3>
        <p>Health, housing and advocacy for LGBTQ+ people.</p>
        <p class="org-ride">Center Ride Out, Apr 23 to 25, 2027</p>
        <div class="org-acts"><a class="link" href="https://centerrideout.lalgbtcenter.org/en/" target="_blank" rel="noopener noreferrer">Ride it with me</a><a class="link" href="https://www.lalgbtcenter.org" target="_blank" rel="noopener noreferrer">Give to the Center</a></div>
      </article>
      <article class="org">
        <h3 class="h3">San Francisco AIDS Foundation</h3>
        <p>No-cost HIV, harm-reduction and LGBTQ+ health services.</p>
        <p class="org-ride">Cycle to Zero, May 21 to 23, 2027</p>
        <div class="org-acts"><a class="link" href="https://www.sfaf.org/get-involved/cycle-to-zero/" target="_blank" rel="noopener noreferrer">Ride it with me</a><a class="link" href="https://www.sfaf.org" target="_blank" rel="noopener noreferrer">Give to SFAF</a></div>
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
        <p class="eyebrow">Next up, a one&#8901;n&#8901;ten fundraiser</p>
        <h3 class="h2 ride-h3">Nov 7, I cycle for <span class="plate plate--big">one&#8901;n&#8901;ten</span></h3>
        <p>Cycling 4 one&#8901;n&#8901;ten, Bike Ride &amp; Block Party at Prisma Community Care, Phoenix.</p>
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
        <p class="eyebrow">Any day, anywhere</p>
        <h3 class="h2 ride-h3">Find a group ride.</h3>
        <p>1,407 group rides. Every state, and 18 more countries. Shop rides, no-drop rides, queer rides.</p>
        <form class="find" action="/rides/" method="get" role="search">
          <label class="sr" for="q">Your town or a ride name</label>
          <input class="find-field" id="q" name="q" type="search" placeholder="Your town or a ride name" autocomplete="off">
          <button class="btn btn--ink" type="submit">Search rides</button>
        </form>
        <p class="find-links"><a class="link" href="/rides/no-drop/">No-drop rides</a><a class="link" href="/rides/lgbtq/">Queer rides</a><a class="link" href="/tonight/">Tonight, near you</a></p>
        <dl class="facts-dl">
          <div><dt>Group rides</dt><dd><a href="/rides/">1,407</a></dd></div>
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
    <ol class="steps3">
      <li><h3 class="h3">I ride.</h3><p>10,000 miles in 2027, all on the bike. Group rides, charity rides, the Tuesday ride in whatever town I&rsquo;m in. Every ride logs to Strava and lands here within the hour.</p></li>
      <li><h3 class="h3">I write it down.</h3><p>Every ride gets a line. The big ones get a page: the route, the town, who I met, my own footage. If you&rsquo;re riding somewhere new, start there.</p></li>
      <li><h3 class="h3">The money goes through the orgs.</h3><p>one&#8901;n&#8901;ten, the Center and SFAF each run a ride. You sign up or give on their page. Nothing here asks for a card, and nothing touches me.</p></li>
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
  <div class="bar-tally"><span class="dot dot--bone" aria-hidden="true"></span><b class="num" data-miles>3,360</b><span>mi since<br>June 1</span></div>
  <a class="btn btn--bone" href="#ride" tabindex="-1">Ride with me</a>
</div>

<script src="/home.js" defer></script>
</body>
</html>
`;

fs.writeFileSync(OUT, page);
console.log("wrote", path.relative(process.cwd(), OUT), page.length, "bytes");
