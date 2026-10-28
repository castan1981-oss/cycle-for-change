/* Cycle for Change — the tally, baked into the homepage.

   Oct 18, 2026 (growth audit): the homepage HTML said "3,573 miles … last ride Oct 5" to every crawler,
   while /home.js painted the live number for people. Crawlers and AI answers read the HTML. So:

     fetchTally()        reads the site's own tally, /api/strava (the one place the site may read Strava, §10),
                         and keeps a copy in data/tally.json for builds without a network.
     loadTally()         the copy.
     applyTally(html, t) rewrites what the homepage bakes: every [data-miles] number and the four rows of
                         "The last rides" (the same rows /home.js draws: day, title when it isn't "Morning Ride",
                         a bar against the longest ride shown, the miles). Nothing else on the page changes.
     refreshHome()       fetch + apply to cfc-site/index.html; tools/build-rides.js runs it last on every deploy,
                         so the baked number follows the daily rebuild.

   The number is one number, bike miles since June 1, 2026, then from Jan 1, 2027 the 2027 count (tools/lib/season.js);
   never a share of 10,000 (§4). */
"use strict";
const fs = require("fs");
const path = require("path");

const { flipSeason } = require("../tools/lib/season.js");
const ROOT = path.join(__dirname, "..");
const HOME = path.join(ROOT, "cfc-site", "index.html");
const FILE = path.join(ROOT, "data", "tally.json");
const API = "https://cycleforchange.org/api/strava";
const GENERIC = /^(early morning|morning|afternoon|evening|lunch|night)\s+(ride|run|swim|walk)$/i;
const esc = (t) => String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmt = (n) => Math.round(n).toLocaleString("en-US");

function dayLabel(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "America/Phoenix" }).replace(",", "");
}

function shape(d) {
  const miles = typeof d.miles === "number" ? d.miles : d.totalMiles;
  if (typeof miles !== "number" || !(miles > 0)) return null;        // a dead feed is not a number (same rule as home.js)
  let recent = Array.isArray(d.recent) ? d.recent.filter((r) => !r.discipline || r.discipline === "bike") : [];
  if (!recent.length && Array.isArray(d.recent)) recent = d.recent;
  return {
    miles: Math.round(miles * 10) / 10,
    rides: typeof d.rides === "number" ? d.rides : null,
    recent: recent.slice(0, 6).map((r) => ({ date: r.date, miles: Number(r.miles) || 0, title: String(r.title || "").trim() })),
    chart: Array.isArray(d.chartPoints) ? d.chartPoints.map((pt) => [Number(pt.x), Number(pt.y)]).filter((pt) => pt.every(Number.isFinite)) : [],
    profileUrl: d.profileUrl || "https://www.strava.com/athletes/22899089",
    updated: d.updated || new Date().toISOString(),
    fetched: new Date().toISOString().slice(0, 10),
  };
}

async function fetchTally({ timeoutMs = 8000, save = true } = {}) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const res = await fetch(API, { signal: ctl.signal, headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`tally: ${res.status} from ${API}`);
    const t = shape(await res.json());
    if (!t) throw new Error("tally: the feed had no miles");
    if (save) { fs.mkdirSync(path.dirname(FILE), { recursive: true }); fs.writeFileSync(FILE, JSON.stringify(t, null, 2) + "\n"); }
    return t;
  } finally { clearTimeout(timer); }
}

function loadTally() {
  try { return JSON.parse(fs.readFileSync(FILE, "utf8")); } catch (e) { return null; }
}

function logRows(recent, max = 4) {
  const shown = recent.slice(0, max);
  const longest = shown.reduce((m, r) => Math.max(m, r.miles), 0);
  return shown.map((r) => {
    const title = r.title && !GENERIC.test(r.title) ? `<b>${esc(r.title)}</b>` : "";
    const w = longest ? (r.miles / longest).toFixed(2).replace(/^0/, "").replace(/\.?0+$/, "") || "0" : "0";
    return `        <li><span class="when">${esc(dayLabel(r.date))}${title}</span><span class="bar-mi" style="--w:${w}"></span><span class="mi num">${r.miles.toFixed(1)}<small>mi</small></span></li>`;
  }).join("\n");
}

function applyTally(html, t) {
  if (!t || !(t.miles > 0)) return html;
  let out = html.replace(/(<b class="num" data-miles>)[^<]*(<\/b>)/g, `$1${fmt(t.miles)}$2`);
  if (t.recent && t.recent.length) {
    const m = out.match(/(<ol class="log" id="log"[^>]*>)\n[\s\S]*?(\n\s*<\/ol>)/);
    if (m) out = out.replace(m[0], `${m[1]}\n${logRows(t.recent)}${m[2]}`);
  }
  // what /home.js paints until the live feed answers (it used to carry its own copy from Oct 5)
  const baked = { miles: t.miles, rides: t.rides, updated: t.updated, profileUrl: t.profileUrl, recent: t.recent, chart: t.chart || [] };
  const tag = `<script type="application/json" id="tallyData">${JSON.stringify(baked).replace(/</g, "\\u003c")}</script>`;
  out = /<script type="application\/json" id="tallyData">/.test(out) ? out.replace(/<script type="application\/json" id="tallyData">[\s\S]*?<\/script>/, tag) : out.replace(/<ol class="log" id="log"/, `${tag}\n      <ol class="log" id="log"`);
  return out;
}

async function refreshHome({ quiet = false } = {}) {
  let t = null, how = "live";
  try { t = await fetchTally(); } catch (e) { t = loadTally(); how = t ? `data/tally.json (${e.message})` : null; }
  if (!t) { if (!quiet) console.log("tally: no feed and no copy — the homepage keeps its number"); return false; }
  const html = fs.readFileSync(HOME, "utf8");
  // the words around the number follow the date too (training until Jan 1, 2027 in Phoenix, then 2027): the homepage
  // isn't rebuilt on deploy, so the deploy's tally pass is what flips them for crawlers
  const next = flipSeason(applyTally(html, t));
  if (next !== html) fs.writeFileSync(HOME, next);
  if (!quiet) console.log(`tally: ${fmt(t.miles)} miles, last ride ${t.recent[0] ? dayLabel(t.recent[0].date) : "—"} (${how}); homepage ${next !== html ? "updated" : "unchanged"}`);
  return true;
}

module.exports = { fetchTally, loadTally, applyTally, logRows, refreshHome, dayLabel, GENERIC };
if (require.main === module) refreshHome().catch((e) => { console.error(e.message); process.exitCode = 1; });
