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

test("a share link can carry a second ride, and compare says the difference in plain words", () => {
  const s = B.smooth(B.resample(B.parseGPX(gpx()).pts));
  const flat = B.smooth(B.resample(B.parseGPX(gpx().replace(/<ele>[^<]*<\/ele>/g, "<ele>340</ele>")).pts));
  const hash = B.encode(s, { n: "Hilly", v: 15, u: "mi" }, { name: "Flat", series: flat });
  const back = B.decodeShare(hash);
  assert.equal(back.second.name, "Flat");
  assert.ok(back.second.pts.length > 300);
  const A = { name: "Hilly", series: s, st: B.stats(s), bins: B.bins(s), climbs: B.climbs(s) };
  const Bf = { name: "Flat", series: flat, st: B.stats(flat), bins: B.bins(flat), climbs: B.climbs(flat) };
  const c = B.compare(A, Bf, 15);
  assert.match(c.lines[0], /Flat is about the same distance with 100% less climbing/);
  assert.ok(c.lines.some((l) => /Hilly is the hillier ride/.test(l)));
  assert.ok(c.lines.some((l) => /Hilly has a climb worth the name; Flat doesn/.test(l)));
  assert.match(c.lines[c.lines.length - 1], /At 15 mph on the flats: Hilly \d+ min, Flat \d+ min/);
  assert.ok(c.a.sec > c.b.sec);
});

test("the route card names the start, each climb's top and the host's stops, and keeps labels inside the frame", () => {
  const CARD = require("../../cfc-site/brief/card.js");
  const s = B.smooth(B.resample(B.parseGPX(gpx()).pts));
  const L = CARD.layout(s, B.climbs(s), { W: 1000, H: 700, pad: 64, units: "mi", cues: [{ m: 2.5, t: "Regroup at the gas station", k: "regroup" }, { m: 0, t: "Start", k: "start" }] });
  const kinds = L.pts.map((p) => p.kind);
  assert.deepEqual(kinds, ["start", "finish", "climb", "regroup"]);
  assert.match(L.pts[2].lines[1], /^2,0\d\d ft · mile 5\.\d$/);
  assert.deepEqual(L.pts[3].lines, ["Regroup", "at the gas station"]);   // the head word isn’t said twice
  for (const p of L.pts) { const b = p.label; assert.ok(b.bx >= 0 && b.by >= 0 && b.bx + b.bw <= 1000 && b.by + b.bh <= 700, `label inside for ${p.kind}`); }
  const svg = CARD.svg(L, "plaster");
  assert.match(svg, /^<svg viewBox="0 0 1000 700"/);
  assert.ok(svg.includes("Climb 1") && svg.includes("Start") && svg.includes("Regroup"));
  assert.ok(!svg.includes("<image"));
  const poster = CARD.layout(s, B.climbs(s), { W: 1080, H: 1350, units: "mi", title: "North & back", sub: "11 mi", date: "Sun, Oct 18", foot: "cycleforchange.org/brief" });
  for (const p of poster.pts) assert.ok(p.label.by >= poster.top - poster.fs, "labels stay out of the title block");
  assert.ok(CARD.svg(poster).includes("North &amp; back"));
});

// ---- FIT, TCX, zip (Oct 18, 2026) ----
function fitFile({ dev = false, compressed = false } = {}) {
  // a little-endian FIT with one record definition (timestamp, lat, lon, altitude) and the north-and-back ride in it
  const recs = [];
  const def = [0x40 | 0, 0, 0, 20, 0, 4, 253, 4, 134, 0, 4, 133, 1, 4, 133, 2, 2, 132];
  if (dev) { def[0] |= 0x20; def.push(1, 0, 2, 0); }   // one developer field, 2 bytes, skipped
  recs.push(...def);
  const t0 = Math.floor((Date.UTC(2026, 9, 17, 13, 5) - 631065600000) / 1000);
  for (let m = 0; m <= 18000; m += 50) {
    let e = 340;
    if (m > 4000 && m <= 9000) e = 340 + (m - 4000) * 0.06; else if (m > 9000 && m <= 14000) e = 640 - (m - 9000) * 0.06;
    const lat = 33.45 + m / 111320, lon = -112.07;
    const b = Buffer.alloc(4 + 4 + 4 + 2 + (dev ? 2 : 0));
    b.writeUInt32LE(t0 + Math.round(m / 7), 0);
    b.writeInt32LE(Math.round(lat / (180 / 2147483648)), 4);
    b.writeInt32LE(Math.round(lon / (180 / 2147483648)), 8);
    b.writeUInt16LE(Math.round((e + 500) * 5), 12);
    recs.push(0x00, ...b);
  }
  const data = Buffer.from(recs);
  const head = Buffer.alloc(14); head[0] = 14; head[1] = 0x20; head.writeUInt16LE(2100, 2); head.writeUInt32LE(data.length, 4); head.write(".FIT", 8);
  return Buffer.concat([head, data, Buffer.alloc(2)]);
}
test("parseFIT reads a Garmin record stream: positions, heights, times; developer fields are skipped", () => {
  for (const dev of [false, true]) {
    const r = B.parseFIT(fitFile({ dev }));
    assert.equal(r.pts.length, 361);
    assert.ok(Math.abs(r.pts[0].lat - 33.45) < 1e-6 && Math.abs(r.pts[0].lon + 112.07) < 1e-6);
    assert.ok(Math.abs(r.pts[0].ele - 340) < 0.3);
    assert.equal(r.pts[0].t, "2026-10-17T13:05:00.000Z");
    const s = B.smooth(B.resample(r.pts));
    assert.ok(Math.abs(B.stats(s).gain_m - 300) < 8);
  }
  assert.throws(() => B.parseFIT(Buffer.from("not a fit file at all")), /isn’t a FIT/);
});
test("parseAny opens GPX, TCX, FIT and a zipped FIT the same way", async () => {
  const file = (name, buf) => ({ name, arrayBuffer: async () => Uint8Array.from(buf).buffer });
  const g = await B.parseAny(file("ride.gpx", Buffer.from(gpx())));
  assert.equal(g.pts.length, 361);
  const tcx = `<?xml version="1.0"?><TrainingCenterDatabase><Activities><Activity Sport="Biking"><Id>x</Id><Lap><Track>` +
    [0, 1, 2].map((i) => `<Trackpoint><Time>2026-10-17T13:0${i}:00Z</Time><Position><LatitudeDegrees>${33.45 + i / 1000}</LatitudeDegrees><LongitudeDegrees>-112.07</LongitudeDegrees></Position><AltitudeMeters>${340 + i}</AltitudeMeters></Trackpoint>`).join("") +
    `</Track></Lap></Activity></Activities></TrainingCenterDatabase>`;
  const t = await B.parseAny(file("ride.tcx", Buffer.from(tcx)));
  assert.equal(t.pts.length, 3); assert.equal(t.pts[2].ele, 342);
  const f = await B.parseAny(file("2026-10-17-shop_ride.fit", fitFile()));
  assert.equal(f.pts.length, 361); assert.equal(f.name, "2026 10 17 shop ride");
  // a zip with the FIT inside, deflated, the way Garmin Connect exports the original
  const raw = fitFile(), comp = require("zlib").deflateRawSync(raw), nm = Buffer.from("123456_ACTIVITY.fit");
  const lh = Buffer.alloc(30); lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(8, 8); lh.writeUInt32LE(comp.length, 18); lh.writeUInt32LE(raw.length, 22); lh.writeUInt16LE(nm.length, 26);
  const z = await B.parseAny(file("123456.zip", Buffer.concat([lh, nm, comp])));
  assert.equal(z.pts.length, 361); assert.equal(z.name, "123456 ACTIVITY");
});
