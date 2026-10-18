/*
  engine.js — the ride briefing engine (Oct 17, 2026). Pure functions, no DOM, no network.
  Runs in the browser as window.BRIEF (for /brief/brief.js) and in node for tools/test/brief-engine.test.js.

  What it does, in order:
    parseGPX(text)            → { name, pts: [{lat, lon, ele?, t?}] }           the rider's file, read as text
    resample(pts, step)       → [{lat, lon, ele, d}]                           one point every `step` metres along the line
    smooth(series, n)         → the elevation series averaged over n samples    (barometer and SRTM noise both go)
    stats(series)             → { m, gain_m, loss_m, low_m, high_m, loop }      distance, climbing, the bounds
    bins(series, bin_m)       → [{ d0, d1, e0, e1, grade }]                     the climb chart's columns
    climbs(series)            → [{ i0, i1, d0, d1, len_m, gain_m, avg, max, top_m, cat }]
    timeline(series, mph)     → [seconds at each sample]                        your flat speed, slower up, faster down
    plan(series, climbs, opts)→ the sample points to ask the forecast for, each with a bearing and an arrival time
    windWord(bearing, from)   → "head" | "cross" | "tail"
    wear(forecast)            → { wear, carry[] }                               the house table, temperature bands
    water(forecast, hours)    → { per_hour, bottles, note }                     Phoenix rules
    difficulty(stats)         → "easy" | "moderate" | "hard"                    hard: 60+ mi, or 100+ ft/mi, or 40+ mi at 60+ ft/mi; moderate: 25+ mi or 50+ ft/mi
    encode / decode           → the share link (a Google-style polyline of the line and of the heights)

  Rules the page states, so they live here in one place:
    CLIMB_MIN_GRADE  3 %   — a climb starts where the rolling grade over 200 m reaches 3 %
    CLIMB_MIN_GAIN   30 m  — anything smaller is a rise, not a climb (about 100 ft)
    CAT              Strava's rule: length (m) × average grade (%) → 8,000 cat 4 · 16,000 cat 3 · 32,000 cat 2 · 64,000 cat 1 · 80,000 HC
    SPEED            v = flat ÷ (1 + 0.12 × grade%) uphill; v = flat × min(1.35, 1 + 0.04 × |grade%|) below −2 %. An estimate.
*/
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.BRIEF = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const R = 6371008.8;                 // earth radius, metres (IUGG mean)
  const MI = 1609.344, FT = 0.3048;
  const rad = (x) => (x * Math.PI) / 180, deg = (x) => (x * 180) / Math.PI;

  function dist(a, b) {                // haversine, metres
    const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  }
  function bearing(a, b) {             // degrees from north, 0–360
    const y = Math.sin(rad(b.lon - a.lon)) * Math.cos(rad(b.lat));
    const x = Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) - Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(rad(b.lon - a.lon));
    return (deg(Math.atan2(y, x)) + 360) % 360;
  }

  // ---- the file ----
  // GPX from a bike computer, Strava, Ride with GPS, Komoot, Garmin: <trkpt> (a recorded ride) or <rtept> (a planned
  // route). Read with a regex so the same code runs in node; a GPX is simple enough for it.
  function parseGPX(text) {
    if (typeof text !== "string" || !/<gpx[\s>]/i.test(text)) throw new Error("That isn’t a GPX file.");
    const nameM = text.match(/<trk>[\s\S]*?<name>([^<]*)<\/name>/i) || text.match(/<rte>[\s\S]*?<name>([^<]*)<\/name>/i) || text.match(/<metadata>[\s\S]*?<name>([^<]*)<\/name>/i);
    const name = nameM ? decode(nameM[1].trim()) : "";
    const pts = [];
    const re = /<(trkpt|rtept)\b([^>]*)>([\s\S]*?)<\/\1>|<(trkpt|rtept)\b([^>]*)\/>/gi;
    let m;
    while ((m = re.exec(text))) {
      const attrs = m[2] || m[5] || "", inner = m[3] || "";
      const lat = +(attrs.match(/lat="([^"]+)"/) || [])[1], lon = +(attrs.match(/lon="([^"]+)"/) || [])[1];
      if (!isFinite(lat) || !isFinite(lon)) continue;
      const ele = (inner.match(/<ele>([^<]+)<\/ele>/) || [])[1];
      const t = (inner.match(/<time>([^<]+)<\/time>/) || [])[1];
      const p = { lat, lon };
      if (ele !== undefined && isFinite(+ele)) p.ele = +ele;
      if (t) p.t = t;
      pts.push(p);
    }
    if (pts.length < 2) throw new Error("No track in that file. Export the route as a GPX with the track in it.");
    return { name, pts };
  }
  // TCX (Garmin's older export, Training Center XML): <Trackpoint><Time/><Position><LatitudeDegrees/><LongitudeDegrees/></Position><AltitudeMeters/>
  function parseTCX(text) {
    if (typeof text !== "string" || !/<TrainingCenterDatabase[\s>]/i.test(text)) throw new Error("That isn’t a TCX file.");
    const name = decode(((text.match(/<Name>([^<]*)<\/Name>/i) || [])[1] || "").trim());
    const pts = [];
    const re = /<Trackpoint>([\s\S]*?)<\/Trackpoint>/gi;
    let m;
    while ((m = re.exec(text))) {
      const inner = m[1];
      const lat = +(inner.match(/<LatitudeDegrees>([^<]+)</) || [])[1], lon = +(inner.match(/<LongitudeDegrees>([^<]+)</) || [])[1];
      if (!isFinite(lat) || !isFinite(lon)) continue;
      const p = { lat, lon };
      const ele = (inner.match(/<AltitudeMeters>([^<]+)</) || [])[1];
      if (ele !== undefined && isFinite(+ele)) p.ele = +ele;
      const t = (inner.match(/<Time>([^<]+)</) || [])[1];
      if (t) p.t = t;
      pts.push(p);
    }
    if (pts.length < 2) throw new Error("No track in that file.");
    return { name, pts };
  }
  // FIT, the binary file a Garmin, Wahoo or Hammerhead records. Only the record messages (global 20) are read:
  // position_lat (0) and position_long (1) in semicircles, altitude (2, ÷5 − 500 m) or enhanced_altitude (78, same
  // scale), timestamp (253, seconds since 1989-12-31 UTC). Developer fields are skipped. The CRC is not checked: a
  // file off the unit is the rider's own, and a bad one shows as a bad line, not a crash.
  function parseFIT(buf) {
    const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
    if (u8.length < 14 || String.fromCharCode(u8[8], u8[9], u8[10], u8[11]) !== ".FIT") throw new Error("That isn’t a FIT file.");
    const headerLen = u8[0];
    const dataLen = dv.getUint32(4, true);
    const end = Math.min(u8.length, headerLen + dataLen);
    const SIZES = { 0: 1, 1: 1, 2: 1, 131: 2, 132: 2, 133: 4, 134: 4, 136: 4, 137: 8, 7: 1, 10: 1, 139: 2, 140: 4, 13: 1, 142: 8, 143: 8, 144: 8 };
    const defs = {};
    const pts = [];
    let name = "";
    let i = headerLen, lastTs = 0;
    const rd = (t, at, le, size) => {
      switch (t) {
        case 0: case 2: case 7: case 10: case 13: return u8[at];
        case 1: return dv.getInt8(at);
        case 131: return dv.getInt16(at, le);
        case 132: case 139: return dv.getUint16(at, le);
        case 133: return dv.getInt32(at, le);
        case 134: case 140: return dv.getUint32(at, le);
        case 136: return dv.getFloat32(at, le);
        case 137: return dv.getFloat64(at, le);
        default: return null;
      }
    };
    while (i < end) {
      const h = u8[i++];
      if (h & 0x80) {                       // compressed timestamp header: the low 5 bits are seconds since the last timestamp
        const local = (h >> 5) & 3, d = defs[local];
        if (!d) throw new Error("FIT file out of order.");
        lastTs = (lastTs & ~0x1f) + (h & 0x1f) + ((h & 0x1f) < (lastTs & 0x1f) ? 0x20 : 0);
        i = readData(d, i, lastTs);
        continue;
      }
      const local = h & 0x0f;
      if (h & 0x40) {                       // definition message
        const le = u8[i + 1] === 0;          // architecture: 0 little-endian
        const global = le ? dv.getUint16(i + 2, true) : dv.getUint16(i + 2, false);
        const n = u8[i + 4];
        let j = i + 5;
        const fields = [];
        for (let k = 0; k < n; k++, j += 3) fields.push({ num: u8[j], size: u8[j + 1], type: u8[j + 2] });
        let devBytes = 0;
        if (h & 0x20) { const dn = u8[j]; j += 1; for (let k = 0; k < dn; k++, j += 3) devBytes += u8[j + 1]; }
        defs[local] = { global, le, fields, size: fields.reduce((t, f) => t + f.size, 0) + devBytes };
        i = j;
      } else {
        const d = defs[local];
        if (!d) throw new Error("FIT file out of order.");
        i = readData(d, i, null);
      }
    }
    function readData(d, at, ts) {
      if (d.global === 20) {
        let lat = null, lon = null, ele = null, t = ts;
        let o = at;
        for (const f of d.fields) {
          const sz = SIZES[f.type] || f.size;
          if (f.num === 0 || f.num === 1 || f.num === 2 || f.num === 78 || f.num === 253) {
            const v = rd(f.type, o, d.le, sz);
            if (v !== null) {
              if (f.num === 0 && v !== 0x7fffffff) lat = v * (180 / 2147483648);
              else if (f.num === 1 && v !== 0x7fffffff) lon = v * (180 / 2147483648);
              else if (f.num === 2 && v !== 0xffff) ele = v / 5 - 500;
              else if (f.num === 78 && v !== 0xffffffff) ele = v / 5 - 500;
              else if (f.num === 253 && v !== 0xffffffff) { t = v; lastTs = v; }
            }
          }
          o += f.size;
        }
        if (lat !== null && lon !== null) {
          const p = { lat, lon };
          if (ele !== null) p.ele = ele;
          if (t) p.t = new Date((t + 631065600) * 1000).toISOString();
          pts.push(p);
        }
      } else if (d.global === 18 && !name) {   // session: sport names the ride if nothing else does
        // nothing worth reading here without the profile tables; the name comes from the file name
      }
      return at + d.size;
    }
    if (pts.length < 2) throw new Error("No GPS track in that FIT file.");
    return { name, pts };
  }
  // Garmin Connect's "Export original" is a zip holding one .fit. A browser can inflate it with DecompressionStream;
  // in node, zlib. Returns the first entry's bytes.
  async function unzipFirst(buf) {
    const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
    if (dv.getUint32(0, true) !== 0x04034b50) throw new Error("That isn’t a zip file.");
    const method = dv.getUint16(8, true), csize = dv.getUint32(18, true), nameLen = dv.getUint16(26, true), extraLen = dv.getUint16(28, true);
    const start = 30 + nameLen + extraLen;
    const entryName = String.fromCharCode(...u8.subarray(30, 30 + nameLen));
    let data = u8.subarray(start, csize ? start + csize : undefined);
    if (method === 8) {
      if (typeof DecompressionStream !== "undefined") {
        const ds = new DecompressionStream("deflate-raw");
        const out = await new Response(new Blob([data]).stream().pipeThrough(ds)).arrayBuffer();
        data = new Uint8Array(out);
      } else if (typeof require === "function") {
        data = new Uint8Array(require("zlib").inflateRawSync(Buffer.from(data)));
      } else throw new Error("Can’t open zip files in this browser. Unzip it first.");
    } else if (method !== 0) throw new Error("That zip uses a compression this page can’t read. Unzip it first.");
    return { name: entryName, data };
  }
  // one door for every file: GPX, TCX, FIT, or a zip with one of those inside. `file` is { name, text() | arrayBuffer() }
  async function parseAny(file) {
    const fname = (file.name || "").toLowerCase();
    let buf = new Uint8Array(await file.arrayBuffer());
    let inner = file.name || "";
    if (fname.endsWith(".zip") || (buf[0] === 0x50 && buf[1] === 0x4b)) { const z = await unzipFirst(buf); buf = z.data; inner = z.name; }
    if (buf.length > 12 && String.fromCharCode(buf[8], buf[9], buf[10], buf[11]) === ".FIT") {
      const r = parseFIT(buf);
      if (!r.name) r.name = (inner.split("/").pop() || "").replace(/\.fit$/i, "").replace(/[_-]+/g, " ").trim();
      return r;
    }
    const text = new TextDecoder("utf-8").decode(buf);
    if (/<TrainingCenterDatabase[\s>]/i.test(text)) return parseTCX(text);
    return parseGPX(text);
  }
  function decode(s) { return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'"); }

  // ---- the line ----
  // One point every `step` metres (default 25). Elevation interpolated where the file has it; null where it doesn't,
  // so the page knows to ask for heights.
  function resample(pts, step = 25) {
    const out = [];
    const hasEle = pts.every((p) => typeof p.ele === "number");
    let d = 0, carry = 0;
    out.push({ lat: pts[0].lat, lon: pts[0].lon, ele: hasEle ? pts[0].ele : null, d: 0 });
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], seg = dist(a, b);
      if (seg === 0) continue;
      let pos = step - carry;                                   // distance along this segment to the next sample
      while (pos <= seg) {
        const f = pos / seg;
        out.push({ lat: a.lat + (b.lat - a.lat) * f, lon: a.lon + (b.lon - a.lon) * f, ele: hasEle ? a.ele + (b.ele - a.ele) * f : null, d: d + pos });
        pos += step;
      }
      carry = seg - (pos - step);
      d += seg;
    }
    const last = pts[pts.length - 1];
    if (out[out.length - 1].d < d - 1) out.push({ lat: last.lat, lon: last.lon, ele: hasEle ? last.ele : null, d });
    return out;
  }
  function smooth(series, n = 5) {         // centred moving average of ele, in place-safe copy
    const h = Math.floor(n / 2), out = series.map((p) => ({ ...p }));
    for (let i = 0; i < series.length; i++) {
      let s = 0, c = 0;
      for (let j = Math.max(0, i - h); j <= Math.min(series.length - 1, i + h); j++) { s += series[j].ele; c++; }
      out[i].ele = s / c;
    }
    return out;
  }
  function stats(series) {
    let gain = 0, loss = 0, lo = Infinity, hi = -Infinity;
    let ref = series[0].ele;                                   // 2 m hysteresis: a wobble isn't a climb
    for (const p of series) {
      lo = Math.min(lo, p.ele); hi = Math.max(hi, p.ele);
      const dv = p.ele - ref;
      if (dv >= 2) { gain += dv; ref = p.ele; } else if (dv <= -2) { loss -= dv; ref = p.ele; }
    }
    const a = series[0], b = series[series.length - 1];
    return { m: series[series.length - 1].d, gain_m: gain, loss_m: loss, low_m: lo, high_m: hi, loop: dist(a, b) < 500 };
  }
  // the climb chart: one column per `bin_m` of road, coloured by its grade
  function bins(series, bin_m = 160.9344) {
    const out = [];
    const total = series[series.length - 1].d;
    for (let d0 = 0; d0 < total; d0 += bin_m) {
      const d1 = Math.min(total, d0 + bin_m);
      const e0 = eleAt(series, d0), e1 = eleAt(series, d1);
      out.push({ d0, d1, e0, e1, grade: d1 > d0 ? ((e1 - e0) / (d1 - d0)) * 100 : 0 });
    }
    return out;
  }
  function eleAt(series, d) {
    let lo = 0, hi = series.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (series[mid].d < d) lo = mid + 1; else hi = mid; }
    const b = series[lo], a = series[Math.max(0, lo - 1)];
    if (b.d === a.d) return b.ele;
    const f = (d - a.d) / (b.d - a.d);
    return a.ele + (b.ele - a.ele) * Math.min(1, Math.max(0, f));
  }
  function gradeAt(series, i, win = 200) {   // rolling grade over `win` metres centred on i, in %
    const d = series[i].d;
    const e0 = eleAt(series, Math.max(0, d - win / 2)), e1 = eleAt(series, Math.min(series[series.length - 1].d, d + win / 2));
    const span = Math.min(series[series.length - 1].d, d + win / 2) - Math.max(0, d - win / 2);
    return span > 0 ? ((e1 - e0) / span) * 100 : 0;
  }
  const CLIMB_MIN_GRADE = 3, CLIMB_MIN_GAIN = 30, CLIMB_GAP_M = 300;
  const CAT = [[80000, "HC"], [64000, "1"], [32000, "2"], [16000, "3"], [8000, "4"]];
  function category(len_m, avg) { const score = len_m * avg; for (const [n, c] of CAT) if (score >= n) return c; return null; }
  function climbs(series) {
    const g = series.map((_, i) => gradeAt(series, i));
    const runs = [];
    let i = 0;
    while (i < series.length) {
      if (g[i] >= CLIMB_MIN_GRADE) {
        let j = i;
        while (j < series.length && g[j] >= CLIMB_MIN_GRADE) j++;
        runs.push([i, j - 1]);
        i = j;
      } else i++;
    }
    // join runs separated by a short flat or a short dip (under CLIMB_GAP_M that doesn't fall more than 2 %)
    const joined = [];
    for (const r of runs) {
      const last = joined[joined.length - 1];
      if (last) {
        const gap = series[r[0]].d - series[last[1]].d;
        const drop = (series[r[0]].ele - series[last[1]].ele) / Math.max(1, gap) * 100;
        if (gap <= CLIMB_GAP_M && drop > -2) { last[1] = r[1]; continue; }
      }
      joined.push([r[0], r[1]]);
    }
    const out = [];
    for (const [i0, i1] of joined) {
      const a = series[i0], b = series[i1];
      const len = b.d - a.d, gain = b.ele - a.ele;
      if (gain < CLIMB_MIN_GAIN || len <= 0) continue;
      const avg = (gain / len) * 100;
      let max = 0;
      for (let k = i0; k <= i1; k++) max = Math.max(max, gradeAt(series, k, 100));
      out.push({ i0, i1, d0: a.d, d1: b.d, len_m: len, gain_m: gain, avg, max, top_m: b.ele, cat: category(len, avg) });
    }
    return out;
  }
  // seconds from the start at each sample, at `mph` on the flat
  function timeline(series, mph) {
    const flat = (mph * MI) / 3600;                            // m/s
    const t = [0];
    for (let i = 1; i < series.length; i++) {
      const seg = series[i].d - series[i - 1].d;
      const grade = seg > 0 ? ((series[i].ele - series[i - 1].ele) / seg) * 100 : 0;
      let v = flat;
      if (grade > 0) v = flat / (1 + 0.12 * grade);
      else if (grade < -2) v = flat * Math.min(1.35, 1 + 0.04 * -grade);
      t.push(t[i - 1] + seg / Math.max(0.5, v));
    }
    return t;
  }
  // where to ask the forecast: the start, every ~`every_m`, each climb's foot, the finish — at most `max` points
  function plan(series, cl, { every_m = 12 * MI, max = 8 } = {}) {
    const total = series[series.length - 1].d;
    const wanted = [0];
    for (let d = every_m; d < total - every_m / 2; d += every_m) wanted.push(d);
    for (const c of cl) wanted.push(c.d0);
    wanted.push(total);
    const uniq = [...new Set(wanted.map((d) => Math.round(d / 1000)))].sort((a, b) => a - b).map((k) => k * 1000);
    let picks = uniq.filter((d, i) => i === 0 || d - uniq[i - 1] >= 3000);
    if (!picks.includes(0)) picks.unshift(0);
    while (picks.length > max) {       // drop the point nearest its neighbours, never the start or the finish
      let worst = 1, gap = Infinity;
      for (let i = 1; i < picks.length - 1; i++) { const g = Math.min(picks[i] - picks[i - 1], picks[i + 1] - picks[i]); if (g < gap) { gap = g; worst = i; } }
      picks.splice(worst, 1);
    }
    return picks.map((d) => {
      const i = indexAt(series, d), j = Math.min(series.length - 1, i + 20);   // bearing over the next ~500 m
      const climb = cl.find((c) => Math.abs(c.d0 - d) < 1500);
      return { d, i, lat: series[i].lat, lon: series[i].lon, bearing: j > i ? bearing(series[i], series[j]) : 0, climb: climb || null, finish: d >= total };
    });
  }
  function indexAt(series, d) { let lo = 0, hi = series.length - 1; while (lo < hi) { const mid = (lo + hi) >> 1; if (series[mid].d < d) lo = mid + 1; else hi = mid; } return lo; }
  // the wind is reported as the direction it blows FROM; a wind from where you're heading is in your face
  function windWord(travel, from) {
    const diff = Math.abs(((from - travel) % 360 + 540) % 360 - 180);  // 0 = wind from straight ahead … 180 = from behind
    if (diff <= 45) return "head";
    if (diff >= 135) return "tail";
    return "cross";
  }
  // ---- wear, carry, water (the house table; °F, mph) ----
  function wear(points) {
    const temps = points.map((p) => p.temp).filter((x) => typeof x === "number");
    if (!temps.length) return null;
    const start = temps[0], peak = Math.max(...temps), low = Math.min(...temps);
    const rain = Math.max(0, ...points.map((p) => p.rain || 0));
    const gust = Math.max(0, ...points.map((p) => p.gust || 0));
    let w;
    if (low < 40) w = "Winter kit: thermal jacket, tights, winter gloves, shoe covers.";
    else if (low < 50) w = "Thermal jacket or a long-sleeve jersey with a vest, knee warmers, full-finger gloves.";
    else if (low < 60) w = "Long sleeves or arm warmers, knee warmers to start.";
    else if (low < 70) w = peak >= 78 ? "Arm warmers to start, off within the hour." : "Arm warmers, maybe a vest for the first descent.";
    else if (peak < 90) w = "Summer kit. Nothing extra.";
    else w = "Summer kit and sun sleeves. Start as early as you can.";
    const carry = [];
    if (rain >= 30) carry.push(`Rain jacket (${rain}% chance of rain on the way).`);
    if (peak - start >= 15 && low < 70) carry.push("Somewhere to stow the warmers; it warms up a lot.");
    if (gust >= 20) carry.push(`Gusts to ${Math.round(gust)} mph. Hold your line on the open stretches.`);
    carry.push("Spare tube, pump, multitool.");
    return { wear: w, carry };
  }
  function water(points, hours) {
    const temps = points.map((p) => p.feels ?? p.temp).filter((x) => typeof x === "number");
    if (!temps.length || !(hours > 0)) return null;
    const peak = Math.max(...temps);
    let per = 0.75, note = "";
    if (peak >= 100) { per = 2; note = "Over 100° on the road. Not a ride for the afternoon. Start at first light or ride it another day."; }
    else if (peak >= 90) { per = 1.5; note = "Hot. Refill every chance you get; don’t pass a tap."; }
    else if (peak >= 80) { per = 1; note = "Warm. Two bottles, and know where the refill is."; }
    else if (peak >= 70) { per = 0.75; }
    else { per = 0.6; }
    return { per_hour: per, bottles: Math.max(1, Math.ceil(per * hours)), note };
  }
  function difficulty(st) {
    const mi = st.m / MI, perMi = (st.gain_m / FT) / Math.max(1, mi);
    if (mi >= 60 || perMi >= 100 || (mi >= 40 && perMi >= 60)) return "hard";
    if (mi >= 25 || perMi >= 50) return "moderate";
    return "easy";
  }
  // ---- the share link: a Google-style polyline of the line (5 decimals) and of the heights (metres, whole) ----
  function encodeNums(nums, scale) {
    let out = "", prev = 0;
    for (const n of nums) {
      let v = Math.round(n * scale) - prev; prev += v;
      v = v < 0 ? ~(v << 1) : v << 1;
      while (v >= 0x20) { out += String.fromCharCode((0x20 | (v & 0x1f)) + 63); v >>= 5; }
      out += String.fromCharCode(v + 63);
    }
    return out;
  }
  function decodeNums(str, scale) {
    const out = []; let i = 0, prev = 0;
    while (i < str.length) {
      let b, shift = 0, res = 0;
      do { b = str.charCodeAt(i++) - 63; res |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
      prev += res & 1 ? ~(res >> 1) : res >> 1;
      out.push(prev / scale);
    }
    return out;
  }
  // Douglas–Peucker on (d, ele) and on (lat, lon) is overkill for a share link: keep every k-th sample so the chart
  // survives, up to `n` points. 600 samples of a 60-mile ride = one every 160 m.
  function thin(series, n = 600) {
    const k = Math.max(1, Math.ceil(series.length / n));
    const out = series.filter((_, i) => i % k === 0);
    if (out[out.length - 1] !== series[series.length - 1]) out.push(series[series.length - 1]);
    return out;
  }
  function packLine(series) {
    const s = thin(series);
    const flat = []; for (const p of s) { flat.push(p.lat, p.lon); }
    return { p: encodeNums(flat, 1e5), e: encodeNums(s.map((p) => p.ele), 1) };
  }
  function unpackLine(o) {
    const flat = decodeNums(o.p, 1e5), ele = decodeNums(o.e, 1);
    const pts = [];
    for (let i = 0; i < flat.length; i += 2) pts.push({ lat: flat[i], lon: flat[i + 1], ele: ele[i / 2] });
    return pts;
  }
  // `second` (optional): the ride being compared with, { series, name }
  function encode(series, meta, second) {
    const o = { ...meta, ver: 1, ...packLine(series) };
    if (second) o.b = { n: second.name || "", ...packLine(second.series) };
    return btoa64(JSON.stringify(o));
  }
  function decodeShare(hash) {
    const o = JSON.parse(atob64(hash));
    if (o.ver !== 1) throw new Error("share link version");
    const pts = unpackLine(o);
    const { p, e, ver, b, ...meta } = o;
    const second = b ? { name: b.n, pts: unpackLine(b) } : null;
    return { pts, meta, second };
  }
  // ---- compare: two rides on one scale, the difference said in a sentence (the Bike Insights idea) ----
  function compare(a, b, mph) {
    const mi = (x) => x.st.m / MI, ft = (x) => x.st.gain_m / FT;
    const perMi = (x) => ft(x) / Math.max(1, mi(x));
    const big = (x) => x.climbs.reduce((m, c) => (c.gain_m > (m ? m.gain_m : -1) ? c : m), null);
    const t = (x) => { const tl = timeline(x.series, mph); return tl[tl.length - 1]; };
    const steep = (x) => x.bins.reduce((m, bn) => Math.max(m, bn.grade), 0);
    const r = (n) => Math.round(n);
    const pct = (x, y) => Math.round(((x - y) / Math.max(1e-9, y)) * 100);
    const lines = [];
    const dm = pct(mi(b), mi(a)), dg = pct(ft(b), ft(a));
    if (Math.abs(dm) < 5 && Math.abs(dg) < 5) lines.push(`${b.name} and ${a.name} are the same ride on paper: within 5% on distance and climbing.`);
    else {
      const dist = Math.abs(dm) < 5 ? "about the same distance" : `${Math.abs(dm)}% ${dm > 0 ? "longer" : "shorter"}`;
      const gain = Math.abs(dg) < 5 ? "about the same climbing" : `${Math.abs(dg)}% ${dg > 0 ? "more" : "less"} climbing`;
      lines.push(`${b.name} is ${dist} with ${gain}.`);
    }
    const pa = perMi(a), pb = perMi(b);
    if (Math.abs(pa - pb) >= 10) lines.push(`${pb > pa ? b.name : a.name} is the hillier ride: ${r(Math.max(pa, pb))} ft a mile against ${r(Math.min(pa, pb))}.`);
    const sa = steep(a), sb = steep(b);
    if (Math.abs(sa - sb) >= 1.5) lines.push(`The steepest stretch is on ${sb > sa ? b.name : a.name}, ${Math.max(sa, sb).toFixed(0)}% against ${Math.min(sa, sb).toFixed(0)}%.`);
    const ba = big(a), bb = big(b);
    if (ba && bb) lines.push(`Biggest climb: ${r(ba.gain_m / FT).toLocaleString("en-US")} ft on ${a.name}, ${r(bb.gain_m / FT).toLocaleString("en-US")} ft on ${b.name}.`);
    else if (ba || bb) lines.push(`${ba ? a.name : b.name} has a climb worth the name; ${ba ? b.name : a.name} doesn't.`);
    const ta = t(a), tb = t(b);
    lines.push(`At ${mph} mph on the flats: ${a.name} ${hm(ta)}, ${b.name} ${hm(tb)}.`);
    return { lines, a: { mi: mi(a), ft: ft(a), perMi: pa, sec: ta, steep: sa, climbs: a.climbs.length, high_m: a.st.high_m }, b: { mi: mi(b), ft: ft(b), perMi: pb, sec: tb, steep: sb, climbs: b.climbs.length, high_m: b.st.high_m } };
  }
  function hm(sec) { const h = Math.floor(sec / 3600), m = Math.round((sec % 3600) / 60); return h ? `${h}h${String(m).padStart(2, "0")}` : `${m} min`; }
  function btoa64(s) { const b = typeof Buffer !== "undefined" ? Buffer.from(s, "utf8").toString("base64") : btoa(unescape(encodeURIComponent(s))); return b.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  function atob64(s) { const b = s.replace(/-/g, "+").replace(/_/g, "/"); return typeof Buffer !== "undefined" ? Buffer.from(b, "base64").toString("utf8") : decodeURIComponent(escape(atob(b))); }

  return { MI, FT, dist, bearing, compare, parseGPX, parseTCX, parseFIT, parseAny, unzipFirst, resample, smooth, stats, bins, eleAt, gradeAt, climbs, category, timeline, plan, windWord, wear, water, difficulty, encode, decodeShare, encodeNums, decodeNums, thin, CLIMB_MIN_GRADE, CLIMB_MIN_GAIN };
});
