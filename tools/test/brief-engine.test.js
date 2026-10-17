"use strict";
// Oct 17, 2026: the ride briefing engine (cfc-site/brief/engine.js) — the maths behind /brief/.
const test = require("node:test");
const assert = require("node:assert/strict");
const B = require("../../cfc-site/brief/engine.js");

// A made-up ride, due north from Phoenix: 4 km flat, a 5 km climb at 6 %, 5 km down at 6 %, 4 km flat. 18 km.
function gpx({ ele = true, tag = "trkpt" } = {}) {
  const pts = [];
  const lat0 = 33.45, lon = -112.07;
  for (let m = 0; m <= 18000; m += 50) {
    let e = 340;
    if (m > 4000 && m <= 9000) e = 340 + (m - 4000) * 0.06;
    else if (m > 9000 && m <= 14000) e = 640 - (m - 9000) * 0.06;
    const lat = lat0 + m / 111320;
    pts.push(`<${tag} lat="${lat.toFixed(6)}" lon="${lon}">${ele ? `<ele>${e.toFixed(1)}</ele>` : ""}<time>2026-10-17T13:00:00Z</time></${tag}>`);
  }
  const wrap = tag === "trkpt" ? `<trk><name>North &amp; back</name><trkseg>${pts.join("")}</trkseg></trk>` : `<rte><name>Planned</name>${pts.join("")}</rte>`;
  return `<?xml version="1.0"?><gpx version="1.1" creator="test">${wrap}</gpx>`;
}

test("parseGPX reads track points and route points, the name, and refuses other files", () => {
  const t = B.parseGPX(gpx());
  assert.equal(t.name, "North & back");
  assert.equal(t.pts.length, 361);
  assert.equal(t.pts[0].ele, 340);
  assert.equal(t.pts[0].t, "2026-10-17T13:00:00Z");
  const r = B.parseGPX(gpx({ tag: "rtept" }));
  assert.equal(r.name, "Planned");
  assert.equal(r.pts.length, 361);
  assert.throws(() => B.parseGPX("<html></html>"), /isn’t a GPX/);
  assert.throws(() => B.parseGPX('<gpx><trk><trkseg><trkpt lat="1" lon="1"/></trkseg></trk></gpx>'), /No track/);
});

test("resample puts a point every 25 m and keeps the distance; no heights → null", () => {
  const s = B.resample(B.parseGPX(gpx()).pts);
  assert.ok(Math.abs(s[s.length - 1].d - 18000) < 40, `distance ${s[s.length - 1].d}`);   // 1° of latitude is 111,195 m on this earth, the fixture used 111,320
  assert.ok(Math.abs(s[1].d - 25) < 0.01);
  assert.equal(typeof s[100].ele, "number");
  const n = B.resample(B.parseGPX(gpx({ ele: false })).pts);
  assert.equal(n[10].ele, null);
});

test("stats: 300 m up, 300 m down, out and back isn't a loop", () => {
  const s = B.smooth(B.resample(B.parseGPX(gpx()).pts));
  const st = B.stats(s);
  assert.ok(Math.abs(st.gain_m - 300) < 8, `gain ${st.gain_m}`);   // the 5-sample smoothing shaves the summit
  assert.ok(Math.abs(st.loss_m - 300) < 8, `loss ${st.loss_m}`);
  assert.ok(Math.abs(st.high_m - 640) < 4);
  assert.equal(st.loop, false);
  assert.equal(B.difficulty(st), "moderate");   // 11 mi at 87 ft/mi: moderate (hard starts at 100 ft/mi, or 40 mi at 60)
});

test("climbs: one climb, 5 km at 6 %, cat 3 by the length × grade rule", () => {
  const s = B.smooth(B.resample(B.parseGPX(gpx()).pts));
  const c = B.climbs(s);
  assert.equal(c.length, 1);
  const k = c[0];
  assert.ok(Math.abs(k.len_m - 5000) < 300, `length ${k.len_m}`);
  assert.ok(Math.abs(k.avg - 6) < 0.5, `avg ${k.avg}`);
  assert.ok(Math.abs(k.top_m - 640) < 5);
  assert.equal(k.cat, "3");   // 5000 × 6 = 30,000 → cat 3 (cat 2 starts at 32,000)
  assert.equal(B.category(9900, 3.2), "3");
  assert.equal(B.category(2000, 8.4), "3");
  assert.equal(B.category(1000, 3), null);
  assert.equal(B.category(20000, 5), "HC");
});

test("timeline: slower uphill, faster down, the flat at the flat speed", () => {
  const s = B.smooth(B.resample(B.parseGPX(gpx()).pts));
  const t = B.timeline(s, 15);
  const flatEnd = B.eleAt(s, 4000) && t[160];       // sample 160 = 4,000 m
  assert.ok(Math.abs(flatEnd - 4000 / (15 * B.MI / 3600)) < 5, `flat time ${flatEnd}`);
  const climbTime = t[360] - t[160], descentTime = t[560] - t[360];
  assert.ok(climbTime > descentTime * 1.5, `climb ${climbTime} descent ${descentTime}`);
});

test("plan: the start, the climb's foot and the finish, at most 8 points", () => {
  const s = B.smooth(B.resample(B.parseGPX(gpx()).pts));
  const p = B.plan(s, B.climbs(s));
  assert.equal(p[0].d, 0);
  assert.ok(p.some((x) => x.climb), "a point at the climb");
  assert.equal(p[p.length - 1].finish, true);
  assert.ok(p.length <= 8);
  assert.ok(Math.abs(p[0].bearing - 0) < 1, `bearing north ${p[0].bearing}`);
});

test("windWord: from ahead is a headwind, from behind a tailwind", () => {
  assert.equal(B.windWord(0, 0), "head");
  assert.equal(B.windWord(0, 180), "tail");
  assert.equal(B.windWord(0, 90), "cross");
  assert.equal(B.windWord(350, 20), "head");
  assert.equal(B.windWord(90, 250), "tail");
});

test("wear and water follow the house table", () => {
  const cold = B.wear([{ temp: 38 }, { temp: 45 }]);
  assert.match(cold.wear, /Winter kit/);
  const warm = B.wear([{ temp: 64, rain: 40, gust: 25 }, { temp: 82 }]);
  assert.match(warm.wear, /Arm warmers to start/);
  assert.ok(warm.carry.some((c) => /Rain jacket/.test(c)));
  assert.ok(warm.carry.some((c) => /Gusts to 25/.test(c)));
  assert.equal(warm.carry[warm.carry.length - 1], "Spare tube, pump, multitool.");
  assert.equal(B.wear([]), null);
  const w = B.water([{ temp: 95 }], 3);
  assert.equal(w.per_hour, 1.5);
  assert.equal(w.bottles, 5);
  assert.match(B.water([{ temp: 101 }], 1).note, /Not a ride for the afternoon/);
});

test("the share link round-trips the line and the heights", () => {
  const s = B.smooth(B.resample(B.parseGPX(gpx()).pts));
  const hash = B.encode(s, { n: "North & back", s: "2026-10-18T06:30", v: 15, u: "mi" });
  assert.ok(hash.length < 6000, `hash ${hash.length}`);
  const back = B.decodeShare(hash);
  assert.equal(back.meta.n, "North & back");
  assert.equal(back.meta.v, 15);
  assert.ok(back.pts.length >= 300 && back.pts.length <= 602);
  assert.ok(Math.abs(back.pts[0].lat - 33.45) < 1e-5);
  const st = B.stats(B.smooth(B.resample(back.pts)));
  assert.ok(Math.abs(st.m - 18000) < 60);
  assert.ok(Math.abs(st.gain_m - 300) < 12, `gain after share ${st.gain_m}`);
});
