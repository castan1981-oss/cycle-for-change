"use strict";
// Oct 30, 2026: the black-and-white poster on /brief/ (cfc-site/brief/bw.js) — where the line and the words go.
const test = require("node:test");
const assert = require("node:assert/strict");
const BW = require("../../cfc-site/brief/bw.js");

// a made-up out-and-back: 10 km north, then 6 km east (so the ends are far apart), every 25 m
function line(loop = false) {
  const s = [];
  for (let m = 0; m <= 10000; m += 25) s.push({ lat: 33.45 + m / 111320, lon: -112.07 });
  const k = Math.cos(33.5 * Math.PI / 180);
  for (let m = 25; m <= 6000; m += 25) s.push({ lat: 33.45 + 10000 / 111320, lon: -112.07 + m / (111320 * k) });
  if (loop) for (let m = 25; m <= 10000; m += 25) s.push({ lat: 33.45 + (10000 - m) / 111320, lon: -112.07 + 6000 / (111320 * k) - (m / 10000) * 6000 / (111320 * k) });
  return s;
}
const words = { title: "Somo sunday", side: "Route: 62 mi / 2,572 ft elevation", lines: ["Sunday, October 25, 2026", "Roll out: 6:31 am"], foot: "cycleforchange.org/brief" };

test("every word is in capitals, and the lines keep their order", () => {
  const L = BW.layout(line(), { ...BW.SIZES.post, ...words });
  assert.equal(L.title.text, "SOMO SUNDAY");
  assert.equal(L.side.text, "ROUTE: 62 MI / 2,572 FT ELEVATION");
  assert.deepEqual(L.lines.map((t) => t.text), ["SUNDAY, OCTOBER 25, 2026", "ROLL OUT: 6:31 AM"]);
  assert.equal(L.foot.text, "CYCLEFORCHANGE.ORG/BRIEF");
});

test("the line stays inside its box, clear of the words, in both sizes", () => {
  for (const size of ["post", "story"]) {
    const L = BW.layout(line(), { ...BW.SIZES[size], ...words });
    for (const [x, y] of L.line) {
      assert.ok(x >= L.box.x - 0.01 && x <= L.box.x + L.box.w + 0.01, `${size}: x ${x}`);
      assert.ok(y >= L.box.y - 0.01 && y <= L.box.y + L.box.h + 0.01, `${size}: y ${y}`);
    }
    assert.ok(L.box.y + L.box.h < L.logo.y, `${size}: the line ends above CYCLE FOR`);
    assert.ok(L.box.x + L.box.w < L.side.x - L.side.size, `${size}: the line stays left of the side words`);
  }
});

test("a Story keeps Instagram's top 200 and bottom 330 clear", () => {
  const L = BW.layout(line(), { ...BW.SIZES.story, ...words });
  assert.equal(L.H, 1920);
  const ys = [L.title.y - L.title.size, L.side.y, L.logo.y, ...L.lines.map((t) => t.y), L.foot.y, ...L.line.map((p) => p[1])];
  for (const y of ys) assert.ok(y >= 200 && y <= 1920 - 330, `y ${y}`);
});

test("two ends get two dots; a loop gets one", () => {
  assert.equal(BW.layout(line(), { ...BW.SIZES.post, ...words }).dots.length, 2);
  assert.equal(BW.layout(line(true), { ...BW.SIZES.post, ...words }).dots.length, 1);
});

test("with no lines and no foot, CYCLE FOR drops to the foot of the poster", () => {
  const L = BW.layout(line(), { ...BW.SIZES.post, title: "A ride" });
  assert.equal(L.foot, null);
  assert.equal(L.lines.length, 0);
  assert.ok(L.logo.y + L.logo.h <= L.bottom + 0.01);
  assert.ok(L.logo.y + L.logo.h > L.bottom - 60);
});
