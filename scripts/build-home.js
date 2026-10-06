/* Cycle for Change — the homepage, Pass 33 "direction A" (Oct 6, 2026): one photograph, one line, one button;
   then the numbers, the log, why, the orgs, next up, the finder, how, read. No stencil, no paint.
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
  <link rel="preload" as="image" href="/img/home-robert-phone.jpg" media="(max-width:759px)">
  <link rel="preload" as="image" href="/img/home-robert.jpg" media="(min-width:760px)">
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
${CHROME.HEADER.replace('<p class="tally-line">', '<p class="tally-line tally-line--home">').replace('<header class="nav site-head" id="nav">', '<header class="nav site-head" id="nav" data-solid="false">')}

<main id="main">

<!-- —— 1 · the picture. One photograph fills the first screen; one line; one button. —— -->
<section class="hero-a hero" id="top" aria-labelledby="hero-h">
  <picture class="hero-a-ph">
    <source media="(max-width:759px)" srcset="/img/home-robert-phone.jpg">
    <img src="/img/home-robert.jpg" width="1500" height="2000" alt="Robert on his bike on the bridge over the freeway in Phoenix, evening light." fetchpriority="high">
  </picture>
  <div class="hero-a-scrim" aria-hidden="true"></div>
  <div class="wrap hero-a-in">
    <h1 class="hero-a-h" id="hero-h">I ride because it changed me.</h1>
    <p class="hero-a-sub">10,000 miles in 2027, all on the bike. The money goes to three queer-serving orgs, through their own rides.</p>
    <div class="hero-a-acts">
      <a class="btn btn--bone" href="#ride">Ride with me</a>
      <a class="link link--bone" href="#log-s">The last ride</a>
    </div>
  </div>
</section>

<!-- —— 2 · the numbers —— -->
<section class="s nums-a" aria-label="The numbers">
  <div class="wrap nums-a-grid">
    <div class="num-tile"><b class="num" data-miles>3,573</b><span>miles since June 1</span></div>
    <div class="num-tile"><b class="num" id="rideCount">97</b><span>rides, <a id="stravaLink" href="https://www.strava.com/athletes/22899089" target="_blank" rel="noopener noreferrer">every one on Strava</a></span></div>
    <div class="num-tile num-tile--rose num-tile--wide"><b class="num">10,000</b><span>miles in 2027. The count restarts in <b class="num" id="daysTo">87</b> days. If I fall behind, this number says so.</span></div>
  </div>
</section>

<!-- —— 3 · the last rides —— -->
<section class="s s--tar road-a" id="log-s" aria-labelledby="road-h">
  <div class="wrap">
    <p class="eyebrow eyebrow--dust">From the road</p>
    <h2 class="h2" id="road-h">The last rides.</h2>
    <ol class="log" id="log" data-max="4" aria-live="polite">
      <li><span class="when">Mon Oct 5</span><span class="bar-mi" style="--w:.57"></span><span class="mi num">35.7<small>MI</small></span></li>
      <li><span class="when">Sun Oct 4</span><span class="bar-mi" style="--w:1"></span><span class="mi num">63.1<small>MI</small></span></li>
      <li><span class="when">Sat Oct 3</span><span class="bar-mi" style="--w:.67"></span><span class="mi num">42.3<small>MI</small></span></li>
      <li><span class="when">Fri Oct 2</span><span class="bar-mi" style="--w:.58"></span><span class="mi num">36.6<small>MI</small></span></li>
    </ol>
    <p class="road-a-note">Every ride gets a line, as long as the ride. The big ones get a page: the route, the town, who was there, the footage.</p>
    <a class="link link--bone" href="https://www.strava.com/athletes/22899089" target="_blank" rel="noopener noreferrer">Follow on Strava</a>
  </div>
</section>

<!-- —— 4 · why —— -->
<section class="s why-a" id="why" aria-labelledby="why-h">
  <div class="wrap stack16">
    <h2 class="h2" id="why-h">It always says cycling.</h2>
    <p class="why-a-p">Cycling changed my life. I&rsquo;d like to say I&rsquo;m cycling for other people. I&rsquo;m really cycling for myself. I&rsquo;m cycling because it changed me. That&rsquo;s the story.</p>
    <p class="why-a-p mute">So the word after &ldquo;for&rdquo; is up to whoever&rsquo;s riding.</p>
  </div>
</section>

<!-- —— 5 · the orgs —— -->
<section class="s orgs-a" id="orgs" aria-labelledby="orgs-h">
  <div class="wrap">
    <h2 class="h2" id="orgs-h">The orgs I ride for.</h2>
    <p class="lede w38">Three rides. You sign up or give on their page. None of it comes through me.</p>
    <ul class="orgs-a-list">
      <li><a href="https://runsignup.com/Race/AZ/Phoenix/c4ont" target="_blank" rel="noopener noreferrer"><span class="org-a-text"><b>one&middot;n&middot;ten</b><span>Cycling 4 one&middot;n&middot;ten, Phoenix. 20 or 62 miles.</span></span><span class="org-a-date">Nov 7</span></a></li>
      <li><a href="https://centerrideout.lalgbtcenter.org/en/" target="_blank" rel="noopener noreferrer"><span class="org-a-text"><b>Los Angeles LGBT Center</b><span>Center Ride Out, LA to Ojai and back. Three days.</span></span><span class="org-a-date">Apr 23</span></a></li>
      <li><a href="https://www.sfaf.org/get-involved/cycle-to-zero/" target="_blank" rel="noopener noreferrer"><span class="org-a-text"><b>San Francisco AIDS Foundation</b><span>Cycle to Zero, San Francisco. Three days.</span></span><span class="org-a-date">May 21</span></a></li>
    </ul>
    <p class="orgs-a-note">You don&rsquo;t have to be queer to ride with me. The rides raise money for queer-serving orgs. That&rsquo;s the point.</p>
    <p class="orgs-a-give">Give directly: <a href="https://onenten.org" target="_blank" rel="noopener noreferrer">one&middot;n&middot;ten</a> &middot; <a href="https://www.lalgbtcenter.org" target="_blank" rel="noopener noreferrer">the Center</a> &middot; <a href="https://www.sfaf.org" target="_blank" rel="noopener noreferrer">SFAF</a></p>
  </div>
</section>

<!-- —— 6 · next up —— -->
<section class="s s--paper next-a" id="ride" aria-labelledby="ride-h">
  <div class="wrap">
    <p class="eyebrow">Next up</p>
    <h2 class="h2" id="ride-h">Nov 7, I cycle for <span class="rose">one&middot;n&middot;ten</span>.</h2>
    <p class="lede w38">Cycling 4 one&middot;n&middot;ten, Bike Ride &amp; Block Party at Prisma Community Care, Phoenix.</p>
    <dl class="rows-a">
      <div><dt>62 miles</dt><dd>7:00 AM, $100</dd></div>
      <div><dt>20 miles</dt><dd>9:00 AM, $50</dd></div>
      <div><dt>Block party</dt><dd>10 AM to 2 PM</dd></div>
      <div><dt>Who</dt><dd>18+, no e-bikes, no fundraising minimum</dd></div>
      <div><dt>Sign up by</dt><dd>Thu Nov 5</dd></div>
    </dl>
    <a class="btn btn--ink btn--block" href="https://runsignup.com/Race/AZ/Phoenix/c4ont" target="_blank" rel="noopener noreferrer">Sign up on RunSignup</a>
    <p class="next-a-src">Details from RunSignup, checked Oct 5. <a class="link" href="/events/2027/riding/">All six rides I&rsquo;m doing in 2027</a></p>
  </div>
</section>

<!-- —— 7 · find a group ride —— -->
<section class="s find-a" id="find" aria-labelledby="find-h">
  <div class="wrap">
    <h2 class="h2" id="find-h">Find a group ride.</h2>
    <form class="find-a-form" action="/rides/" method="get" role="search">
      <label class="sr" for="findQ">Your town or a ride name</label>
      <input class="find-a-input" id="findQ" name="q" type="search" placeholder="Your town or a ride name" autocomplete="off">
      <button class="btn btn--ink" type="submit">Search rides</button>
    </form>
    <p class="find-a-quick"><a class="link" href="/rides/no-drop/">No-drop rides</a><a class="link" href="/rides/lgbtq/">Queer rides</a><a class="link" href="/tonight/">Tonight</a></p>
    <dl class="rows-a rows-a--counts">
      <div><dt>Group rides</dt><dd><a href="/rides/">${RIDES_N}</a></dd></div>
      <div><dt>On the 2027 calendar</dt><dd><a href="/events/2027/">640</a></dd></div>
      <div><dt>Town guides</dt><dd><a href="/towns/">12</a></dd></div>
      <div><dt>My 2027 rides</dt><dd><a href="/events/2027/riding/">Six, so far</a></dd></div>
    </dl>
    <p class="find-a-note">Every ride checked in the last 90 days. Every state, ${RN.abroad} more countries.</p>
  </div>
</section>

<!-- —— 8 · how this works —— -->
<section class="s s--paper how-a" id="how" aria-labelledby="how-h">
  <div class="wrap">
    <h2 class="h2" id="how-h">How this works.</h2>
    <ol class="steps-a">
      <li><span class="steps-a-n">1</span><h3 class="h3">I ride.</h3><p>10,000 miles in 2027. Every ride lands here from Strava.</p></li>
      <li><span class="steps-a-n">2</span><h3 class="h3">I write it down.</h3><p>Every ride gets a line. The big ones get a page.</p></li>
      <li><span class="steps-a-n">3</span><h3 class="h3">The money goes to the orgs.</h3><p>Through their own rides. Nothing here asks for a card.</p></li>
    </ol>
  </div>
</section>

<!-- —— 9 · read —— -->
<section class="s read" id="read" aria-labelledby="read-h">
  <div class="wrap">
    <h2 class="h2" id="read-h">Field notes, guides, the journal.</h2>
    <ul class="read-list">
      <li><a href="/field-notes/south-mountain-climb/"><b>South Mountain at sunset</b><span>Down Central from uptown, through downtown into South Phoenix, up the mountain as the light goes.</span></a></li>
      <li><a href="/field-notes/paradise-valley-loop/"><b>The Paradise Valley loop</b><span>The loop around Camelback and Mummy Mountain. Early, before the heat, with the whole valley below.</span></a></li>
      <li><a href="/journal/the-carrot-cake-theory/"><b>The carrot cake theory</b><span>On why the hard part of a long ride is never the ride.</span></a></li>
      <li><a href="/guides/"><b>All 12 guides</b><span>Your first charity ride, pledge-per-mile fundraising, the packing list, what happened to AIDS/LifeCycle.</span></a></li>
    </ul>
    <a class="link" href="/field-notes/">All field notes</a>
  </div>
</section>

</main>

${CHROME.FOOTER.replace('<script src="/chrome.js" defer></script>', '')}

<!-- —— the tally, everywhere (phone) —— -->
<div class="bar" id="bar" data-on="false" aria-hidden="true">
  <div class="bar-tally"><span class="dot dot--bone" aria-hidden="true"></span><b class="num" data-miles>3,573</b><span>mi since June 1</span></div>
  <a class="btn btn--bone" href="#ride" tabindex="-1">Ride with me</a>
</div>

<script src="/home.js" defer></script>
</body>
</html>
`;

fs.writeFileSync(OUT, page);
console.log("wrote", path.relative(process.cwd(), OUT), page.length, "bytes");
