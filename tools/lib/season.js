/* Cycle for Change — which count the site is showing (Oct 26, 2026).

   Until midnight on January 1, 2027 in Phoenix the number is the training count: bike miles since June 1, 2026.
   From that moment it is the 2027 count: bike miles in 2027, starting from zero. One number, never a share of 10,000.

   Used by netlify/functions/strava.js (what gets counted), scripts/chrome.js and scripts/build-home.js (the words
   baked into pages), scripts/tally.js (keeps the homepage's words in step on every deploy), build-signals.js and
   strava-connect.js. The browser flips the words at the same instant without a rebuild: /chrome.js and /home.js
   carry the same Jan 1 constant and set `hidden` on every [data-season] element.

   Phoenix is UTC−7 all year (no daylight saving), so local midnight is 07:00 UTC. */
"use strict";

const TRAINING = { key: "training", start: Date.UTC(2026, 5, 1, 7), end: Date.UTC(2027, 0, 1, 7), since: "June 1, 2026" };
const YEAR = { key: "2027", start: Date.UTC(2027, 0, 1, 7), end: Date.UTC(2028, 0, 1, 7), since: "January 1, 2027" };

function seasonAt(now = Date.now()) {
  return now >= YEAR.start ? YEAR : TRAINING;
}

// Two spans, one shown: the training words and the 2027 words. `hidden` is set for the build moment; the browser
// re-sets it on load. Either side may be empty.
function seasonText(training, year, now = Date.now()) {
  const on = seasonAt(now).key;
  const span = (key, html) => `<span data-season="${key}"${on === key ? "" : " hidden"}>${html}</span>`;
  return span("training", training) + span("2027", year);
}

// Re-set `hidden` on every data-season span already in a page (the homepage is patched on every deploy).
function flipSeason(html, now = Date.now()) {
  const on = seasonAt(now).key;
  return html.replace(/<span data-season="(training|2027)"( hidden)?>/g, (m, key) => `<span data-season="${key}"${key === on ? "" : " hidden"}>`);
}

module.exports = { TRAINING, YEAR, seasonAt, seasonText, flipSeason };
