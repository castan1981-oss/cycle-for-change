/* /brief/ — the ride briefing (Oct 17, 2026). Drop a GPX, get the climbs, the weather where you'll be when you
   get there, what to wear, when you're back. The maths is /brief/engine.js (window.BRIEF); this file is the page.
   Nothing leaves the browser except two requests to Open-Meteo (heights when the file has none; the forecast),
   and those carry only sample coordinates. No account, no cookies, no storage. */
(function () {
  "use strict";
  const B = window.BRIEF;
  const $ = (s, el) => (el || document).querySelector(s);
  const MI = B.MI, FT = B.FT;
  const WX = "https://api.open-meteo.com/v1/forecast";
  const ELEV = "https://api.open-meteo.com/v1/elevation";
  const HOUR = 3600;

  const el = {
    drop: $("#drop"), file: $("#file"), err: $("#err"), sample: $("#sampleP"), sampleLink: $("#sample"),
    plan: $("#plan"), name: $("#rideName"), start: $("#start"), speed: $("#speed"), units: $("#units"), go: $("#go"),
    out: $("#out"), head: $("#outHead"), stats: $("#stats"), map: $("#map"), prof: $("#prof"), brief: $("#brief"),
    wx: $("#wx"), wxNote: $("#wxNote"), climbs: $("#climbs"), climbsNone: $("#climbsNone"), wear: $("#wear"), water: $("#water"),
    share: $("#share"), shareOut: $("#shareOut"), gpx: $("#gpx"), verify: $("#verify"), top: $("#outTop"),
  };

  let ride = null;   // { name, pts, series, st, bins, climbs, t, source: "file"|"share", text }
  let units = "mi";

  // ---- plan defaults: tomorrow 6:30 if it's past 6:30 today, else today ----
  function defaultStart() {
    const now = new Date();
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 30);
    if (now > d) d.setDate(d.getDate() + 1);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  const pad = (n) => String(n).padStart(2, "0");
  el.start.value = defaultStart();
  el.start.min = defaultStart().slice(0, 10) + "T00:00";

  // ---- units ----
  const fmt = {
    dist: (m) => units === "mi" ? `${(m / MI).toFixed(m / MI < 10 ? 1 : 0)}` : `${(m / 1000).toFixed(m / 1000 < 10 ? 1 : 0)}`,
    distU: () => units === "mi" ? "mi" : "km",
    h: (m) => units === "mi" ? comma(Math.round(m / FT)) : comma(Math.round(m)),
    hU: () => units === "mi" ? "ft" : "m",
    speed: (mph) => units === "mi" ? `${mph} mph` : `${Math.round(mph * 1.609344)} km/h`,
    mile: (m) => units === "mi" ? `mile ${(m / MI).toFixed(1).replace(/\.0$/, "")}` : `km ${(m / 1000).toFixed(1).replace(/\.0$/, "")}`,
    temp: (f) => units === "mi" ? `${Math.round(f)}°` : `${Math.round(((f - 32) * 5) / 9)}°`,
    wind: (mph) => units === "mi" ? `${Math.round(mph)} mph` : `${Math.round(mph * 1.609344)} km/h`,
  };
  const comma = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const clock = (wall) => {           // wall = [y, m, d, h, min] → "6:30 am"
    const h = wall[3], mi = wall[4];
    return `${((h + 11) % 12) + 1}:${pad(mi)} ${h < 12 ? "am" : "pm"}`;
  };
  const hhmm = (sec) => { const h = Math.floor(sec / HOUR), m = Math.round((sec % HOUR) / 60); return h ? `${h}h${pad(m)}` : `${m} min`; };
  // wall-clock arithmetic without time zones: the start the rider typed is local to the ride
  function wallAt(startStr, sec) {
    const [date, time] = startStr.split("T");
    const [y, mo, d] = date.split("-").map(Number), [h, mi] = time.split(":").map(Number);
    const t = Date.UTC(y, mo - 1, d, h, mi) + Math.round(sec) * 1000;
    const x = new Date(t);
    return [x.getUTCFullYear(), x.getUTCMonth() + 1, x.getUTCDate(), x.getUTCHours(), x.getUTCMinutes()];
  }
  const iso = (w) => `${w[0]}-${pad(w[1])}-${pad(w[2])}T${pad(w[3])}:00`;
  const dayWord = (w) => new Date(Date.UTC(w[0], w[1] - 1, w[2])).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });

  // ---- loading a file ----
  function fail(msg) { el.err.textContent = msg; el.err.hidden = false; }
  function clearErr() { el.err.hidden = true; el.err.textContent = ""; }
  async function loadText(text, source) {
    clearErr();
    let parsed;
    try { parsed = B.parseGPX(text); } catch (e) { fail(e.message); return; }
    el.drop.classList.add("is-busy");
    try {
      await build(parsed.pts, { name: parsed.name, source, text });
    } catch (e) {
      fail(e.message || "Something went wrong reading that file.");
    } finally { el.drop.classList.remove("is-busy"); }
  }
  async function build(pts, meta) {
    let series = B.resample(pts, 25);
    let heightsFrom = "your file";
    if (series[0].ele === null) {
      series = await heights(series);
      heightsFrom = "Open-Meteo’s elevation model (90 m), since the file had no heights";
    }
    series = B.smooth(series, 5);
    const st = B.stats(series);
    ride = { name: meta.name || "Your ride", pts, series, st, bins: B.bins(series), climbs: B.climbs(series), source: meta.source, text: meta.text || null, heightsFrom };
    el.name.value = ride.name;
    if (meta.start) el.start.value = meta.start;
    if (meta.speed) el.speed.value = meta.speed;
    if (meta.units) { units = meta.units; el.units.value = units; }
    el.plan.hidden = false;
    render();
    el.out.hidden = false;
    if (meta.source === "file") el.top.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  // heights for a file without them: one point every 200 m, 100 per request, interpolated back onto the 25 m line
  async function heights(series) {
    const every = 8, keys = series.filter((_, i) => i % every === 0);
    if (keys[keys.length - 1] !== series[series.length - 1]) keys.push(series[series.length - 1]);
    const ele = [];
    for (let i = 0; i < keys.length; i += 100) {
      const chunk = keys.slice(i, i + 100);
      const r = await fetch(`${ELEV}?latitude=${chunk.map((p) => p.lat.toFixed(5)).join(",")}&longitude=${chunk.map((p) => p.lon.toFixed(5)).join(",")}`);
      if (!r.ok) throw new Error("Couldn’t get heights for this route. Export the GPX with elevation and try again.");
      const j = await r.json();
      ele.push(...j.elevation);
    }
    keys.forEach((p, i) => { p.ele = ele[i]; });
    const out = series.map((p) => ({ ...p }));
    for (let i = 0, k = 0; i < out.length; i++) {
      while (k < keys.length - 1 && keys[k + 1].d <= out[i].d) k++;
      const a = keys[k], b = keys[Math.min(keys.length - 1, k + 1)];
      out[i].ele = b.d === a.d ? a.ele : a.ele + ((b.ele - a.ele) * (out[i].d - a.d)) / (b.d - a.d);
    }
    return out;
  }

  // ---- the briefing ----
  let wxReq = 0;
  function render() {
    if (!ride) return;
    const mph = Math.min(30, Math.max(6, +el.speed.value || 15));
    el.speed.value = mph;
    const startStr = el.start.value || defaultStart();
    const t = B.timeline(ride.series, mph);
    const total = t[t.length - 1];
    const back = wallAt(startStr, total);
    const startW = wallAt(startStr, 0);
    const diff = B.difficulty(ride.st);
    const name = el.name.value.trim() || "Your ride";
    ride.name = name;
    document.title = `${name} — ride briefing`;

    el.head.innerHTML = `
      <p class="bf-kicker"><span>${esc(dayWord(startW))}, ${clock(startW)}</span><span class="bf-chip bf-chip--${diff}">${diff[0].toUpperCase() + diff.slice(1)}</span></p>
      <h2 class="bf-name">${esc(name)}</h2>
      <p class="bf-sub">${ride.st.loop ? "A loop" : "Point to point"} · ${fmt.speed(mph)} on the flats · back by ${clock(back)}</p>`;

    el.stats.innerHTML = [
      ["Distance", fmt.dist(ride.st.m), fmt.distU()],
      ["Climbing", fmt.h(ride.st.gain_m), fmt.hU()],
      ["Riding", hhmm(total), ""],
      ["Back by", clock(back), ""],
      ["Highest", fmt.h(ride.st.high_m), fmt.hU()],
      ["Climbs", String(ride.climbs.length), ""],
    ].map(([k, v, u]) => `<div><dt>${k}</dt><dd>${v}${u ? `<small>${u}</small>` : ""}</dd></div>`).join("");

    drawMap();
    drawProfile();
    renderClimbs(t, startStr);

    const bullets = [];
    bullets.push(`<li><b>${fmt.dist(ride.st.m)} ${fmt.distU()}, ${fmt.h(ride.st.gain_m)} ${fmt.hU()} of climbing.</b> About ${hhmm(total)} riding at ${fmt.speed(mph)} on the flats. Back around ${clock(back)}.</li>`);
    const big = [...ride.climbs].sort((a, b) => b.gain_m - a.gain_m).slice(0, 3).sort((a, b) => a.d0 - b.d0);
    for (const c of big) {
      const n = ride.climbs.indexOf(c) + 1;
      bullets.push(`<li><b>Climb ${n}, to ${fmt.h(c.top_m)} ${fmt.hU()}${c.cat ? ` (cat ${c.cat})` : ""}, from ${fmt.mile(c.d0)}:</b> ${fmt.dist(c.len_m)} ${fmt.distU()} at ${c.avg.toFixed(1)}%, up to ${Math.round(c.max)}%. You reach the foot about ${clock(wallAt(startStr, t[c.i0]))}.</li>`);
    }
    if (ride.climbs.length > 3) bullets.push(`<li>${ride.climbs.length - 3} more ${ride.climbs.length - 3 === 1 ? "climb" : "climbs"} on the route, below.</li>`);
    if (!ride.climbs.length) bullets.push(`<li>No climb worth the name. Nothing holds 3% for long.</li>`);
    el.brief.innerHTML = bullets.join("") + `<li id="wxBullet" class="bf-pending">Checking the weather on the road…</li>`;

    el.wear.innerHTML = `<p class="mute">Waiting on the forecast.</p>`;
    el.water.innerHTML = "";
    el.wx.innerHTML = "";
    el.wxNote.textContent = "";

    // the share link carries the line, the heights and the plan; the GPX is the file as it came
    const hash = B.encode(ride.series, { n: name, s: startStr, v: mph, u: units });
    const url = `${location.origin}${location.pathname}#${hash}`;
    el.shareOut.value = url;
    history.replaceState(null, "", `#${hash}`);
    el.gpx.href = gpxUrl();
    el.gpx.download = `${slug(name) || "ride"}.gpx`;

    el.verify.innerHTML = `Route from your GPX. Heights from ${esc(ride.heightsFrom)}. Times are estimates at your flat speed, slower on the climbs. <span id="wxVerify">Forecast: waiting.</span> Nothing was uploaded; the file stayed in your browser.`;

    forecast(t, startStr, ++wxReq, total);
  }

  // ---- weather on the road ----
  async function forecast(t, startStr, req, total) {
    const pts = B.plan(ride.series, ride.climbs);
    const startW = wallAt(startStr, 0);
    const now = new Date();
    const startLocal = new Date(startW[0], startW[1] - 1, startW[2], startW[3], startW[4]);
    const daysOut = (startLocal - now) / 86400000;
    const bullet = $("#wxBullet"), ver = $("#wxVerify");
    if (daysOut > 9) {
      bullet.className = ""; bullet.textContent = "Too far out for a forecast. Brief it again inside a week and the weather fills in.";
      ver.textContent = "No forecast: the ride is more than nine days out.";
      el.wear.innerHTML = `<p class="mute">Comes with the forecast, inside nine days of the ride.</p>`;
      return;
    }
    const q = new URLSearchParams({
      latitude: pts.map((p) => p.lat.toFixed(4)).join(","), longitude: pts.map((p) => p.lon.toFixed(4)).join(","),
      hourly: "temperature_2m,apparent_temperature,precipitation_probability,wind_speed_10m,wind_direction_10m,wind_gusts_10m",
      daily: "sunrise,sunset", temperature_unit: "fahrenheit", wind_speed_unit: "mph", timezone: "auto", forecast_days: "10",
    });
    let data;
    try {
      const r = await fetch(`${WX}?${q}`);
      if (!r.ok) throw new Error(String(r.status));
      data = await r.json();
      if (!Array.isArray(data)) data = [data];
    } catch (e) {
      if (req !== wxReq) return;
      bullet.className = ""; bullet.textContent = "The forecast didn’t load. Everything else above still stands; try again in a minute.";
      ver.textContent = "Forecast: didn’t load.";
      el.wear.innerHTML = `<p class="mute">Comes with the forecast.</p>`;
      return;
    }
    if (req !== wxReq) return;
    const rows = pts.map((p, i) => {
      const d = data[i], w = wallAt(startStr, t[p.i]);
      const key = iso(w), k = d.hourly.time.indexOf(key);
      if (k < 0) return { ...p, missing: true, wall: w };
      return {
        ...p, wall: w, temp: d.hourly.temperature_2m[k], feels: d.hourly.apparent_temperature[k], rain: d.hourly.precipitation_probability[k],
        wind: d.hourly.wind_speed_10m[k], from: d.hourly.wind_direction_10m[k], gust: d.hourly.wind_gusts_10m[k],
        word: B.windWord(p.bearing, d.hourly.wind_direction_10m[k]),
      };
    });
    const have = rows.filter((r) => !r.missing);
    const day = data[0].daily, dayKey = iso(startW).slice(0, 10), di = Math.max(0, day.time.indexOf(dayKey));
    const sunrise = day.sunrise[di] ? day.sunrise[di].slice(11) : null, sunset = day.sunset[di] ? day.sunset[di].slice(11) : null;
    const abbr = data[0].timezone_abbreviation || "";
    const tz = /^GMT[+-]/.test(abbr) || !abbr ? (data[0].timezone || abbr).replace(/_/g, " ") : abbr;

    el.wx.innerHTML = rows.map((r, i) => {
      const where = r.d === 0 ? "Start" : r.finish ? "Finish" : r.climb ? `Climb ${ride.climbs.indexOf(r.climb) + 1}` : fmt.mile(r.d).replace(/^\w/, (c) => c.toUpperCase());
      if (r.missing) return `<div class="bf-wx"><p class="bf-wx-when">${clock(r.wall)}</p><p class="bf-wx-where">${esc(where)}</p><p class="mute">No hour for this.</p></div>`;
      return `<div class="bf-wx">
        <p class="bf-wx-when">${clock(r.wall)}</p>
        <p class="bf-wx-where">${esc(where)}</p>
        <p class="bf-wx-temp">${fmt.temp(r.temp)}<small>feels ${fmt.temp(r.feels)}</small></p>
        <p class="bf-wx-line">${r.rain ? `${r.rain}% rain` : "Dry"} · ${fmt.wind(r.wind)}</p>
        <p class="bf-wx-wind bf-wx-wind--${r.word}">${r.word === "head" ? "Headwind" : r.word === "tail" ? "Tailwind" : "Crosswind"}</p>
      </div>`;
    }).join("");
    el.wxNote.textContent = `Forecast for each point at the time you reach it. ${sunrise ? `Sunrise ${clockStr(sunrise)}, sunset ${clockStr(sunset)}.` : ""} Times in the ride’s zone (${tz}).`;

    // the weather bullet
    if (have.length) {
      const t0 = have[0], peak = have.reduce((a, b) => (b.feels > a.feels ? b : a), have[0]);
      const heads = have.filter((r) => r.word === "head" && r.wind >= 8);
      let s = `<b>${fmt.temp(t0.temp)} at the start, ${fmt.temp(peak.temp)} by ${clock(peak.wall)}${peak.feels - peak.temp >= 4 ? ` (feels like ${fmt.temp(peak.feels)})` : ""}.</b>`;
      if (heads.length) s += ` Headwind of ${fmt.wind(Math.max(...heads.map((r) => r.wind)))} ${heads.length === 1 ? `around ${fmt.mile(heads[0].d)}` : `from ${fmt.mile(heads[0].d)} to ${fmt.mile(heads[heads.length - 1].d)}`}.`;
      else if (have.some((r) => r.word === "tail" && r.wind >= 8)) s += ` Tailwind for part of it.`;
      else s += ` Wind under ${fmt.wind(Math.max(8, ...have.map((r) => r.wind)))} the whole way.`;
      const wet = have.filter((r) => r.rain >= 30);
      if (wet.length) s += ` ${Math.max(...wet.map((r) => r.rain))}% chance of rain around ${fmt.mile(wet[0].d)}.`;
      if (sunrise && startW[3] * 60 + startW[4] < toMin(sunrise)) s += ` You start before sunrise (${clockStr(sunrise)}). Lights.`;
      bullet.className = ""; bullet.innerHTML = s;
    } else {
      bullet.className = ""; bullet.textContent = "No forecast hours matched the ride. Check the start date.";
    }
    const w = B.wear(have), wa = B.water(have, total / HOUR);
    el.wear.innerHTML = w ? `<dl class="bf-kv"><div><dt>Wear</dt><dd>${esc(w.wear)}</dd></div><div><dt>Carry</dt><dd>${w.carry.map(esc).join("<br>")}</dd></div></dl>` : "";
    el.water.innerHTML = wa ? `<p><b>${wa.bottles} ${wa.bottles === 1 ? "bottle" : "bottles"}</b> for the ride: ${perHourWords(wa.per_hour)}.${wa.note ? ` ${esc(wa.note)}` : ""}</p>` : "";
    const issued = data[0].generationtime_ms !== undefined ? new Date() : null;
    ver.textContent = `Forecast from Open-Meteo, read ${issued ? issued.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "now"}, hourly, ${tz}.`;
  }
  const perHourWords = (n) => n >= 2 ? "two an hour" : n >= 1.5 ? "one and a half an hour" : n >= 1 ? "a bottle an hour" : n >= 0.75 ? "a bottle every hour and a quarter" : "a bottle every hour and a half";
  const toMin = (hm) => { const [h, m] = hm.split(":").map(Number); return h * 60 + m; };
  const clockStr = (hm) => { const [h, m] = hm.split(":").map(Number); return clock([0, 0, 0, h, m]); };

  // ---- drawings ----
  const GRADE_CLASS = (g) => g < 2 ? "g0" : g < 4 ? "g1" : g < 7 ? "g2" : g < 10 ? "g3" : "g4";
  function drawProfile() {
    // the SVG stretches to the box (preserveAspectRatio none), so every word sits outside it in HTML
    const W = 1000, H = 200, L = 0, R = 0, T = 10, Bt = 2;
    const bins = ride.bins, total = ride.st.m;
    const lo = Math.floor(ride.st.low_m / 50) * 50, hi = Math.max(lo + 50, Math.ceil(ride.st.high_m / 50) * 50);
    const X = (d) => L + ((W - L - R) * d) / total, Y = (e) => T + (H - T - Bt) * (1 - (e - lo) / (hi - lo));
    const cols = bins.map((b) => `<rect class="bf-g ${GRADE_CLASS(b.grade)}" x="${X(b.d0).toFixed(1)}" y="${Y(Math.max(b.e0, b.e1)).toFixed(1)}" width="${(Math.max(0.8, X(b.d1) - X(b.d0)) + 0.6).toFixed(2)}" height="${(H - Bt - Y(Math.max(b.e0, b.e1))).toFixed(1)}"/>`).join("");
    const line = ride.series.filter((_, i) => i % 4 === 0).map((p, i) => `${i ? "L" : "M"}${X(p.d).toFixed(1)} ${Y(p.ele).toFixed(1)}`).join(" ");
    const unit = units === "mi" ? MI : 1000;
    const step = total / unit > 80 ? 20 : total / unit > 40 ? 10 : total / unit > 15 ? 5 : total / unit > 6 ? 2 : 1;
    const ticks = [];
    for (let m = 0; m + step * 0.4 <= total / unit; m += step) ticks.push(`<span style="left:${((X(m * unit) / W) * 100).toFixed(2)}%">${m}${m === 0 ? ` ${fmt.distU()}` : ""}</span>`);
    const marks = ride.climbs.map((c, i) => `<b class="bf-cn-chip" style="left:${((X(c.d1) / W) * 100).toFixed(2)}%;top:${((Y(c.top_m) / H) * 100).toFixed(2)}%">${i + 1}</b>`).join("");
    el.prof.innerHTML = `<p class="bf-prof-high">High ${fmt.h(ride.st.high_m)} ${fmt.hU()} · low ${fmt.h(ride.st.low_m)} ${fmt.hU()}</p>
      <div class="bf-prof-box"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Climb chart: ${fmt.h(ride.st.low_m)} to ${fmt.h(ride.st.high_m)} ${fmt.hU()} over ${fmt.dist(total)} ${fmt.distU()}, coloured by grade.">${cols}<path class="bf-pl" d="${line}"/></svg>${marks}</div>
      <p class="bf-prof-axis" aria-hidden="true">${ticks.join("")}</p>`;
  }
  function drawMap() {
    const s = ride.series, W = 1000;
    let minLat = Infinity, maxLat = -Infinity, minLon = Infinity, maxLon = -Infinity;
    for (const p of s) { minLat = Math.min(minLat, p.lat); maxLat = Math.max(maxLat, p.lat); minLon = Math.min(minLon, p.lon); maxLon = Math.max(maxLon, p.lon); }
    const k = Math.cos(((minLat + maxLat) / 2) * Math.PI / 180);
    const w = (maxLon - minLon) * k || 1e-6, h = (maxLat - minLat) || 1e-6;
    const pad = 0.08 * Math.max(w, h);
    const H = Math.round(W * Math.min(1.2, Math.max(0.45, (h + 2 * pad) / (w + 2 * pad))));
    const sx = (W - 0) / (w + 2 * pad), sy = H / (h + 2 * pad), sc = Math.min(sx, sy);
    const ox = (W - (w + 2 * pad) * sc) / 2, oy = (H - (h + 2 * pad) * sc) / 2;
    const X = (p) => ox + ((p.lon - minLon) * k + pad) * sc, Y = (p) => oy + (maxLat - p.lat + pad) * sc;
    const path = s.filter((_, i) => i % 2 === 0).map((p, i) => `${i ? "L" : "M"}${X(p).toFixed(1)} ${Y(p).toFixed(1)}`).join(" ");
    const a = s[0], z = s[s.length - 1];
    const feet = ride.climbs.map((c, i) => { const p = s[c.i0]; return `<b class="bf-cn-chip" style="left:${((X(p) / W) * 100).toFixed(2)}%;top:${((Y(p) / H) * 100).toFixed(2)}%">${i + 1}</b>`; }).join("");
    // a scale bar: a round number of miles or km that is about a fifth of the width
    const unit = units === "mi" ? MI : 1000, degPerM = 1 / 111195;
    const target = (W / 5) / sc / k * (1 / degPerM) / unit;
    const nice = [1, 2, 5, 10, 20, 50].reduce((b, n) => (Math.abs(n - target) < Math.abs(b - target) ? n : b), 1);
    const barPct = ((nice * unit * degPerM * k * sc) / W) * 100;
    el.map.innerHTML = `<div class="bf-map-box" style="aspect-ratio:${W}/${H}"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="The route drawn as a line${ride.st.loop ? ", a loop" : ""}. Numbered marks are the foot of each climb.">
      <path class="bf-rt" d="${path}"/></svg>
      <i class="bf-start" style="left:${((X(a) / W) * 100).toFixed(2)}%;top:${((Y(a) / H) * 100).toFixed(2)}%" title="Start"></i>
      ${ride.st.loop ? "" : `<i class="bf-finish" style="left:${((X(z) / W) * 100).toFixed(2)}%;top:${((Y(z) / H) * 100).toFixed(2)}%" title="Finish"></i>`}
      ${feet}
      <span class="bf-scale" style="width:${barPct.toFixed(2)}%">${nice} ${fmt.distU()}</span>
    </div>`;
  }
  function renderClimbs(t, startStr) {
    el.climbsNone.hidden = ride.climbs.length > 0;
    el.climbs.innerHTML = ride.climbs.map((c, i) => {
      const segs = ride.bins.filter((b) => b.d1 > c.d0 && b.d0 < c.d1);
      const bars = segs.map((b) => `<i class="${GRADE_CLASS(b.grade)}" style="height:${Math.min(100, Math.max(6, (Math.max(0, b.grade) / 15) * 100)).toFixed(0)}%" title="${b.grade.toFixed(1)}%"></i>`).join("");
      const mins = Math.round((t[c.i1] - t[c.i0]) / 60);
      return `<li class="bf-climb">
        <p class="bf-climb-head"><span class="bf-cn-chip">${i + 1}</span><b>Climb to ${fmt.h(c.top_m)} ${fmt.hU()}</b>${c.cat ? `<span class="bf-chip">Cat ${c.cat}</span>` : ""}</p>
        <p class="bf-climb-sub">${fmt.mile(c.d0)} to ${fmt.mile(c.d1).replace(/^(mile|km) /, "")} · foot ${clock(wallAt(startStr, t[c.i0]))}, top ${clock(wallAt(startStr, t[c.i1]))}</p>
        <dl class="bf-climb-nums"><div><dt>Length</dt><dd>${fmt.dist(c.len_m)}<small>${fmt.distU()}</small></dd></div><div><dt>Average</dt><dd>${c.avg.toFixed(1)}%</dd></div><div><dt>Max</dt><dd>${Math.round(c.max)}%</dd></div><div><dt>Gain</dt><dd>${fmt.h(c.gain_m)}<small>${fmt.hU()}</small></dd></div><div><dt>Time</dt><dd>${mins}<small>min</small></dd></div></dl>
        <div class="bf-climb-bars" aria-hidden="true">${bars}</div>
      </li>`;
    }).join("");
  }

  // ---- the file back out ----
  function gpxUrl() {
    if (el.gpx.href && el.gpx.href.startsWith("blob:")) URL.revokeObjectURL(el.gpx.href);
    let text = ride.text;
    if (!text) {
      text = `<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="cycleforchange.org/brief" xmlns="http://www.topografix.com/GPX/1/1">\n<trk><name>${esc(ride.name)}</name><trkseg>\n` +
        ride.pts.map((p) => `<trkpt lat="${p.lat.toFixed(6)}" lon="${p.lon.toFixed(6)}">${typeof p.ele === "number" ? `<ele>${p.ele.toFixed(1)}</ele>` : ""}</trkpt>`).join("\n") + `\n</trkseg></trk>\n</gpx>\n`;
    }
    return URL.createObjectURL(new Blob([text], { type: "application/gpx+xml" }));
  }
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  // ---- wiring ----
  el.file.addEventListener("change", () => { const f = el.file.files[0]; if (f) f.text().then((t) => loadText(t, "file")); });
  ["dragenter", "dragover"].forEach((ev) => el.drop.addEventListener(ev, (e) => { e.preventDefault(); el.drop.classList.add("is-over"); }));
  ["dragleave", "drop"].forEach((ev) => el.drop.addEventListener(ev, (e) => { e.preventDefault(); el.drop.classList.remove("is-over"); }));
  el.drop.addEventListener("drop", (e) => { const f = e.dataTransfer.files && e.dataTransfer.files[0]; if (f) f.text().then((t) => loadText(t, "file")); });
  el.drop.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.file.click(); } });
  el.go.addEventListener("click", render);
  el.units.addEventListener("change", () => { units = el.units.value; render(); });
  [el.start, el.speed].forEach((i) => i.addEventListener("change", render));
  el.name.addEventListener("change", render);
  el.share.addEventListener("click", async () => {
    const v = el.shareOut.value;
    try { await navigator.clipboard.writeText(v); el.share.textContent = "Copied"; }
    catch (e) { el.shareOut.hidden = false; el.shareOut.select(); el.share.textContent = "Copy it above"; }
    setTimeout(() => { el.share.textContent = "Copy the share link"; }, 2500);
  });
  // a sample ride, if one is on the server (Robert's own file; see scripts/build-brief.js)
  fetch("/brief/sample.gpx", { method: "HEAD" }).then((r) => { if (r.ok) el.sample.hidden = false; }).catch(() => {});
  el.sampleLink.addEventListener("click", (e) => { e.preventDefault(); fetch("/brief/sample.gpx").then((r) => r.text()).then((t) => loadText(t, "file")); });
  // a share link
  if (location.hash.length > 20) {
    try {
      const { pts, meta } = B.decodeShare(location.hash.slice(1));
      build(pts, { name: meta.n, start: meta.s, speed: meta.v, units: meta.u, source: "share" });
    } catch (e) { fail("That share link didn’t open. Ask for it again, or drop the GPX here."); }
  }
})();
