// The fundraising toolkit (cfc-site/toolkit/toolkit.js): the layouts are plain arithmetic, so they run here with a
// stand-in for the canvas's text measure. What these keep true: nothing runs off the picture, a Story keeps
// Instagram's bars clear, a giving link reads like a link, and miles are whole numbers.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const T = require("../../cfc-site/toolkit/toolkit.js");
const BW = require("../../cfc-site/brief/bw.js");

const measure = (t, w, s) => [...String(t)].length * s * (w >= 800 ? 0.6 : 0.54);   // wider than Overpass, so a pass here holds there
const M = 72;

test("a giving link reads the way a person would say it", () => {
  assert.strictEqual(T.showLink("https://www.give.example.org/fundraiser/123/?ref=ig#top"), "give.example.org/fundraiser/123");
  assert.strictEqual(T.showLink("  give.example.org/me  "), "give.example.org/me");
  assert.strictEqual(T.showLink("not a link"), "");
  assert.strictEqual(T.showLink(""), "");
});

test("the ask: every word stays inside the picture, at both sizes, with and without a photo", () => {
  const cases = [
    { who: "the Center", ride: "Center Ride Out", when: "Apr 23–25, 2027", link: "give.example.org/fundraiser/1234567" },
    { who: "San Francisco AIDS Foundation", ride: "Cycle to Zero", when: "May 21–23, 2027", link: "" },
    { who: "my brother, who taught me to ride a bike", ride: "A ride with a very long name that goes on for a while longer", when: "", link: "a-very-long-host-name.example.org/fundraising/pages/rider/first-last-2027" },
    { who: "", ride: "", when: "", link: "" },
  ];
  for (const size of ["post", "story"]) for (const photo of [null, {}]) for (const c of cases) {
    const S = T.SIZES[size], L = T.layoutAsk(measure, { ...c, photo }, size);
    const P = L.sign.plate;
    assert.ok(P.x + P.w <= S.W - M + 1, `plate runs off: ${size} "${c.who}"`);
    assert.ok(P.fs >= 30, "a word on the pink plate is 19px bold or bigger at a phone's size");
    for (const t of L.lines) assert.ok(t.x + measure(t.text, t.weight, t.size) <= S.W - M + 1, `line runs off: ${size} "${t.text}"`);
    assert.ok(L.bottom < L.footY - 30, `words reach the foot: ${size} "${c.who}" photo=${!!photo}`);
    assert.ok(L.sign.y >= L.photoH, "nothing sits on the photo");
    assert.ok(L.footY <= S.H - S.bot - M, "the foot is clear of a Story's bottom bar");
    if (!photo) assert.ok(L.sign.y >= S.top, "the sign is clear of a Story's top bar");
  }
});

test("the miles: one cell per ride, inside the picture, total as a whole number", () => {
  const ride = (mi) => ({ mi, pts: [[-112.1, 33.4], [-112.0, 33.5], [-111.9, 33.45]] });
  for (const size of ["post", "story"]) for (const n of [1, 2, 7, 23, 60]) {
    const rides = Array.from({ length: n }, (_, i) => ride(20.4 + i));
    const S = T.SIZES[size], L = T.layoutMiles(measure, { who: "the Center", rides }, size);
    assert.strictEqual(L.cells.length, n);
    for (const c of L.cells) {
      assert.ok(c.x >= M - 1 && c.x + c.w <= S.W - M + 1 && c.y + c.h <= L.sign.y, `cell outside: ${size} n=${n}`);
      for (const [x, y] of T.outline(rides[0].pts, c)) assert.ok(x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h, "outline outside its cell");
    }
    assert.match(L.head.num.text, /^[\d,]+$/);
    assert.ok(L.head.num.y - L.head.num.size * 0.8 >= S.top, "the number is clear of a Story's top bar");
  }
  assert.strictEqual(T.whole(1421.6), "1,422");
});

test("the page loads the mark and the file reader it draws with, and says what it does with your files", () => {
  const html = fs.readFileSync(path.join(__dirname, "../../cfc-site/toolkit/index.html"), "utf8");
  assert.ok(BW.MARK && BW.MARK.cycle.length && BW.MARK.for.length, "the mark's paths come from /brief/bw.js");
  for (const src of ["/brief/engine.js", "/brief/bw.js", "/toolkit/toolkit.js"]) assert.ok(html.includes(`src="${src}`), src);
  assert.match(html, /None of it is uploaded, stored or sent/);
  assert.ok(!/<form[\s>]/.test(html), "no form: nothing on this page is sent anywhere");
  const js = fs.readFileSync(path.join(__dirname, "../../cfc-site/toolkit/toolkit.js"), "utf8");
  for (const banned of ["fetch(", "XMLHttpRequest", "localStorage", "sessionStorage", "sendBeacon", "document.cookie"]) assert.ok(!js.includes(banned), `toolkit.js must not use ${banned}`);
});
