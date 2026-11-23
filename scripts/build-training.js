// node scripts/build-training.js → cfc-site/training/index.html (Nov 23, 2026). The training page: a private tool with
// its own sign-in, no site chrome (like /ride/). Rules and storage: netlify/functions/lib/training.js. The only thing
// built in is the list of the rides Robert is doing (chrome.js RIDING, from data/calendar-2027.json), so the "next on
// the calendar" row rolls with the calendar; build-calendar.js runs this at its end. Bump V when training.css or
// training.js changes.
"use strict";
const fs = require("fs");
const path = require("path");
const C = require("./chrome.js");
const M = require("./mark-2027.js");
const V = 1;
const events = C.RIDING.filter((r) => r.start).map((r) => ({ name: r.name, start: r.start, end: r.end, date: r.date, status: r.status, href: r.href }));
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>Training — Cycle for Change</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" href="/favicon.svg?v=${C.ICON_V}" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/favicon-180.png?v=${C.ICON_V}">
  <link rel="preload" href="/fonts/overpass-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/training/training.css?v=${V}">
</head>
<body>
<header class="t-head">
  <a class="t-mark" href="/" aria-label="Cycle for Change, home">${M.LINE("t-mark-svg", true)}</a>
  <span class="t-where">Training</span>
  <button type="button" class="t-quiet" id="tOut" hidden>Sign out</button>
</header>
<main id="main">
  <noscript><p class="t-pad">Training needs JavaScript turned on.</p></noscript>

  <section class="t-pad t-door" id="tInvite" hidden aria-labelledby="tInviteH">
    <h1 id="tInviteH">Hi, <span id="tInviteName"></span>.</h1>
    <p class="t-lede">Pick a password. Ten characters or more.</p>
    <form id="tInviteForm">
      <label class="t-lab" for="tNewPw">Password</label>
      <input class="t-field" id="tNewPw" type="password" autocomplete="new-password" minlength="10" maxlength="200" required>
      <button class="t-btn t-btn--ink" type="submit">Save it and sign in</button>
      <p class="t-say" role="status" aria-live="polite" hidden></p>
    </form>
  </section>

  <section class="t-pad t-door" id="tSign" hidden aria-labelledby="tSignH">
    <h1 id="tSignH">Training</h1>
    <p class="t-lede">For Robert and his coach. Sign in.</p>
    <form id="tSignForm">
      <label class="t-lab" for="tWho">Who you are</label>
      <select class="t-field" id="tWho" autocomplete="username"><option value="robert">Robert</option><option value="john">John</option></select>
      <label class="t-lab" for="tPw">Password</label>
      <input class="t-field" id="tPw" type="password" autocomplete="current-password" maxlength="200" required>
      <button class="t-btn t-btn--ink" type="submit">Sign in</button>
      <p class="t-say" role="status" aria-live="polite" hidden></p>
    </form>
    <p class="t-small">No password yet? Open the invite link Robert sent you.</p>
  </section>

  <div id="tApp" hidden>
    <section class="t-pad t-day" aria-live="polite">
      <p class="t-lab" id="tDayLabel"></p>
      <h1 id="tTitle"></h1>
      <div class="t-nums"><div><span class="t-lab">How long</span><b class="t-big" id="tDur"></b></div><div id="tDoneBox" hidden><span class="t-lab">Rode</span><b class="t-big" id="tDone"></b></div></div>
      <div id="tPlanList"></div>
      <div class="t-acts" id="tDrop" hidden>
        <label class="t-btn t-btn--ink" for="tFile">Done? Drop the ride</label>
        <input id="tFile" type="file" accept=".fit,.gpx,.tcx,.zip" class="t-file">
        <p class="t-small">The file off your Garmin: FIT, GPX or TCX. It’s read on this phone. Only the day, miles, time and climbing are saved.</p>
        <p class="t-say" id="tDropSay" role="status" aria-live="polite" hidden></p>
      </div>
      <ul class="t-rides" id="tRides"></ul>
    </section>

    <section class="t-week" aria-labelledby="tWeekH">
      <div class="t-week-head"><h2 id="tWeekH">This week</h2><span class="t-week-sum" id="tWeekSum"></span></div>
      <p class="t-small">Tap a day. Taller means longer. A day fills in when a ride is dropped.</p>
      <div class="t-bars" id="tBars"></div>
      <div class="t-week-nav"><button type="button" class="t-quiet" id="tPrev">The week before</button><button type="button" class="t-quiet" id="tNext">The week after</button></div>
      <p class="t-small" id="tRead"></p>
    </section>

    <section class="t-pad" aria-labelledby="tNoteH">
      <h2 class="t-lab" id="tNoteH">From your coach</h2>
      <p class="t-note" id="tNote"></p>
      <form id="tNoteForm" hidden>
        <label class="t-lab" for="tNoteText">Your note for this week</label>
        <textarea class="t-field" id="tNoteText" rows="4" maxlength="600"></textarea>
        <button class="t-btn t-btn--ghost" type="submit">Save the note</button>
        <p class="t-say" role="status" aria-live="polite" hidden></p>
      </form>
    </section>

    <section class="t-pad t-rows">
      <a class="t-row" id="tEvent" hidden><span><span class="t-lab">Next on the calendar</span><b id="tEventName"></b><small id="tEventDate"></small></span><b class="t-big"><span id="tEventDays"></span><i>days</i></b></a>
      <div class="t-row"><span><span class="t-lab" id="tMilesLab">Since June 1</span></span><b class="t-big"><span id="tMiles">—</span><i>miles</i></b></div>
    </section>

    <details class="t-pad t-setup" id="tSetup" hidden>
      <summary>The TrainingPeaks link</summary>
      <p>In TrainingPeaks: Settings, then Account, then Calendar. Copy the calendar link and paste it here. It’s kept on the site’s server and never shown again.</p>
      <form id="tFeedForm">
        <label class="t-lab" for="tFeed">Calendar link</label>
        <input class="t-field" id="tFeed" type="url" inputmode="url" autocomplete="off" placeholder="webcal://…" required>
        <button class="t-btn t-btn--ghost" type="submit">Save the link</button>
        <p class="t-say" role="status" aria-live="polite" hidden></p>
      </form>
    </details>
  </div>
</main>
<script type="application/json" id="tEvents">${JSON.stringify(events).replace(/</g, "\\u003c")}</script>
<script src="/brief/engine.js" defer></script>
<script src="/training/training.js?v=${V}" defer></script>
</body>
</html>
`;
function run() {
  const out = path.join(__dirname, "..", "cfc-site", "training", "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  return events.length;
}
module.exports = { run };
if (require.main === module) console.log(`Built /training/ (${run()} rides on the calendar row)`);
