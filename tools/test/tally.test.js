// scripts/tally.js — the baked tally on the homepage: one number, the last rides, the JS fallback.
const test = require("node:test");
const assert = require("node:assert/strict");
const T = require("../../scripts/tally.js");

const HTML = `<p>Mile <b class="num" data-miles>3,573</b> of training</p>
<div class="num-tile"><b class="num" data-miles>3,573</b><span>miles since June 1</span></div>
      <ol class="log" id="log" data-max="4" aria-live="polite">
        <li><span class="when">Mon Oct 5</span><span class="bar-mi" style="--w:.57"></span><span class="mi num">35.7<small>mi</small></span></li>
      </ol>`;

const t = { miles: 3848.4, rides: 102, updated: "2026-10-19T01:15:09Z", profileUrl: "https://www.strava.com/athletes/22899089",
  recent: [
    { date: "2026-10-13T14:15:11Z", miles: 41.7, title: "Morning Ride" },
    { date: "2026-10-10T11:54:10Z", miles: 93, title: "TSR" },
  ], chart: [[0, 35.2], [100, 3848.4]] };

test("applyTally rewrites every data-miles number, the log rows and the baked JSON", () => {
  const out = T.applyTally(HTML, t);
  assert.equal((out.match(/data-miles>3,848</g) || []).length, 2);
  assert.doesNotMatch(out, /3,573/);
  assert.match(out, /<span class="when">Tue Oct 13<\/span>/);
  assert.match(out, /<span class="when">Sat Oct 10<b>TSR<\/b><\/span>/, "a real title shows; 'Morning Ride' doesn't");
  assert.match(out, /style="--w:1"/, "the longest ride fills the bar");
  assert.match(out, /93\.0<small>mi<\/small>/);
  assert.match(out, /<script type="application\/json" id="tallyData">\{"miles":3848\.4,"rides":102/);
  // idempotent: applying again replaces the baked block instead of adding a second one
  const again = T.applyTally(out, { ...t, miles: 3900 });
  assert.equal((again.match(/id="tallyData"/g) || []).length, 1);
  assert.match(again, /data-miles>3,900</);
});

test("a dead feed changes nothing", () => {
  assert.equal(T.applyTally(HTML, null), HTML);
  assert.equal(T.applyTally(HTML, { miles: 0, recent: [] }), HTML);
});

test("the number is never shown against 10,000", () => {
  const out = T.applyTally(HTML, t);
  assert.doesNotMatch(out, /of 10,000|\/ ?10,000|%/);
});
