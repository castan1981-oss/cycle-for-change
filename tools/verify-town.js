#!/usr/bin/env node
/* Cycle for Change — town guide checker.
   Reads one or more data/towns/<id>.json files and reports what would embarrass
   the page: a dead URL, a missing required field, a value outside the vocabulary,
   a banned phrase, a price or fee with no date, a "queer-owned" entry whose note
   doesn't say where the business says so, a route with no route page.

   Run:   node tools/verify-town.js data/towns/los-angeles-ca.json [more.json …]
          node tools/verify-town.js --all            every town
          node tools/verify-town.js --no-fetch FILE  skip the network (schema + lint only)
   Exit:  0 when nothing failed, 1 otherwise. The summary is meant to be pasted
          into research/towns/<id>/verify.md by @town-verifier.

   It never edits a file. No dependencies; Node 18+ (global fetch).
*/
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const NO_FETCH = args.includes("--no-fetch");
const files = args.includes("--all")
  ? fs.readdirSync(path.join(ROOT, "data", "towns")).filter((f) => f.endsWith(".json") && !f.startsWith("_")).map((f) => path.join(ROOT, "data", "towns", f))
  : args.filter((a) => !a.startsWith("--"));
if (!files.length) { console.error("usage: node tools/verify-town.js data/towns/<id>.json | --all [--no-fetch]"); process.exit(2); }

// The same vocabulary and lint as scripts/build-events.js. Keep them in step.
const BANNED = [
  /\bleverage\b/i, /\bsynergy\b/i, /\bjourney\b/i, /passionate about/i,
  /thrilled to announce/i, /excited to share/i, /\$800/, /two suitcases/i,
  /\bPrescott\b/, /est\.? 2008/i, /years? sober\b/i, /sober since/i,
  /\brelapse/i, /7,?500[- ]mile/i,
];
const LISTICLE = /\b(hidden gem|must[- ]visit|must[- ]try|vibrant|eclectic|iconic|boasts|nestled|charming|cozy|foodie|bustling|world[- ]class|top[- ]notch|a haven|a mecca)\b/i;
const ENUM = {
  kind: ["event-host", "destination"],
  routeType: ["road", "gravel", "mtb", "path", "climb"],
  difficulty: ["easy", "moderate", "hard", "epic"],
  cultureKind: ["record-store", "bookstore", "gallery", "museum", "bar", "queer-owned", "venue", "market", "other"],
  linkKind: ["official", "affiliate"],
  services: ["repair", "same-day", "parts", "rental", "rental-road", "rental-gravel", "rental-mtb", "rental-ebike", "ship-to-shop", "fitting", "diy", "suspension", "box-storage", "box-rental", "shop-rides", "coffee"],
  focus: ["lgbtq", "no-drop", "beginner", "women-trans-femme", "bipoc", "family", "gravel"],
};
const DATED = /\((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\.? \d{4}\)|\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\.? \d{4}\b|\b(20\d\d)\b/;
const MONEY = /\$\s?\d/;

function walk(v, where, fn) {
  if (typeof v === "string") fn(where, v);
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${where}[${i}]`, fn));
  else if (v && typeof v === "object") Object.keys(v).forEach((k) => walk(v[k], where ? `${where}.${k}` : k, fn));
}
function collectUrls(v, where, out) {
  walk(v, where, (w, s) => { if (/^https?:\/\//i.test(s)) out.push({ where: w, url: s }); });
}

async function check(file) {
  const rel = path.relative(ROOT, file);
  const fails = [], warns = [], notes = [];
  let t;
  try { t = JSON.parse(fs.readFileSync(file, "utf8")); } catch (e) { return { rel, fails: [`bad JSON: ${e.message}`], warns, notes, urls: 0 }; }

  // required + shape
  for (const k of ["id", "name", "state", "state_code", "lat", "lon", "timezone", "summary"]) if (t[k] == null) fails.push(`missing ${k}`);
  if (t.id && path.basename(file, ".json") !== t.id) fails.push(`id "${t.id}" doesn't match the file name`);
  if (t.state_code && !/^[A-Z]{2}$/.test(t.state_code)) fails.push(`state_code "${t.state_code}" should be two capitals`);
  if (typeof t.lat === "number" && (Math.abs(t.lat) > 90 || Math.abs(t.lon) > 180)) fails.push("lat/lon out of range");
  if (t.summary && t.summary.split(/[.!?]\s/).length < 2) warns.push("summary is one sentence; the lede should be 2–4 an assistant can quote");
  if (t.tagline && t.tagline.length > 60) warns.push(`tagline is ${t.tagline.length} chars; keep it under 60`);
  if (t.kind != null && !ENUM.kind.includes(t.kind)) fails.push(`kind "${t.kind}"`);
  if (!t.verified) warns.push("no verified date on the town");
  else if ((Date.now() - new Date(t.verified)) / 864e5 > 183) warns.push(`verified ${t.verified} is more than six months old — refresh`);

  const named = ["hotels", "restaurants", "bike_shops", "coffee", "culture", "clubs", "routes"];
  for (const k of named) {
    const list = t[k];
    if (list != null && !Array.isArray(list)) { fails.push(`${k} should be an array`); continue; }
    (list || []).forEach((it, i) => {
      const w = `${k}[${i}]`;
      if (!it || !it.name) fails.push(`${w} has no name`);
      if (k !== "routes" && k !== "clubs" && !it.url && !it.address) warns.push(`${w} (${it && it.name}) has neither url nor address`);
      if (k === "bike_shops") (it.services || []).forEach((s) => { if (!ENUM.services.includes(s)) fails.push(`${w}.services "${s}" is not in the vocabulary (${ENUM.services.join(", ")})`); });
      if (k === "clubs") (it.inclusive_focus || []).forEach((s) => { if (!ENUM.focus.includes(s)) fails.push(`${w}.inclusive_focus "${s}" is not in the vocabulary`); });
      if (k === "culture") {
        if (!ENUM.cultureKind.includes(it.kind)) fails.push(`${w}.kind "${it.kind}"`);
        if (it.kind === "queer-owned" && !/say|says|said|states|bio|about page|their site|its site|own site|owner/i.test(it.note || "")) fails.push(`${w} (${it.name}) is queer-owned but the note doesn't say where the business says so`);
      }
      if (k === "routes") {
        if (!ENUM.routeType.includes(it.type)) fails.push(`${w}.type "${it.type}"`);
        if (!ENUM.difficulty.includes(it.difficulty)) fails.push(`${w}.difficulty "${it.difficulty}"`);
        if (!it.links || !Object.values(it.links).some(Boolean)) fails.push(`${w} (${it.name}) has no route page link`);
        if (it.miles == null) warns.push(`${w} (${it.name}) has no miles`);
        if (!it.hazards) warns.push(`${w} (${it.name}) has no hazards line — every route gets the honest sentence`);
        if (it.start && (it.start.lat == null || it.start.lon == null)) warns.push(`${w} start has no lat/lon`);
        if (!it.sources || !it.sources.length) fails.push(`${w} (${it.name}) has no sources`);
      }
      if (k === "hotels" && !it.bike_policy) warns.push(`${w} (${it.name}) has no bike_policy — say "No stated policy — ask" if that's the truth`);
    });
  }
  // the listed names must be unique inside a section
  for (const k of named) {
    const seen = new Set();
    (t[k] || []).forEach((it) => { const n = String((it && it.name) || "").toLowerCase(); if (n && seen.has(n)) fails.push(`${k} lists "${it.name}" twice`); seen.add(n); });
  }
  (t.travel_links || []).forEach((l, i) => { if (!ENUM.linkKind.includes(l.kind)) fails.push(`travel_links[${i}].kind "${l.kind}"`); if (!l.url) fails.push(`travel_links[${i}] has no url`); });
  (t.faq || []).forEach((f, i) => { if (!f.q || !f.a) fails.push(`faq[${i}] needs q and a`); });
  if (t.bring_your_bike) {
    const b = t.bring_your_bike;
    if (!b.summary) warns.push("bring_your_bike has no summary — the page needs the quotable answer");
    if (b.get_around && b.get_around.car_needed != null && typeof b.get_around.car_needed !== "boolean") fails.push("bring_your_bike.get_around.car_needed must be true or false");
    if (b.fly && b.fly.airline_note && !DATED.test(b.fly.airline_note)) fails.push("bring_your_bike.fly.airline_note has no date — airline fees change; write (Month YYYY)");
    for (const s of ["ship", "rent"]) ((b[s] && b[s].shops) || []).forEach((sh, i) => { if (!sh.url) fails.push(`bring_your_bike.${s}.shops[${i}] (${sh.name}) has no url — the shop's own page is the proof`); });
    if (!b.sources || !b.sources.length) warns.push("bring_your_bike has no sources");
  }

  // text rules
  walk(t, "", (w, s) => {
    for (const re of BANNED) if (re.test(s)) fails.push(`banned phrase ${re} in ${w}`);
    if (LISTICLE.test(s)) warns.push(`listicle word in ${w}: "${s.match(LISTICLE)[0]}"`);
    if (MONEY.test(s) && !DATED.test(s) && !/price_hint|booking_url|^url$/.test(w)) warns.push(`${w} has a price with no date: "${s.slice(0, 60)}"`);
    if (/\b(probably|likely|I think|should be|might)\b/i.test(s) && /note|description|summary/.test(w)) warns.push(`${w} hedges ("${s.match(/\b(probably|likely|I think|should be|might)\b/i)[0]}") — a guess isn't a listing`);
  });

  // urls
  const urls = [];
  collectUrls(t, "", urls);
  const uniq = [...new Map(urls.map((u) => [u.url, u])).values()];
  if (!NO_FETCH && typeof fetch === "function") {
    const results = await Promise.all(uniq.map(async (u) => {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 15000);
      try {
        let res = await fetch(u.url, { method: "HEAD", redirect: "follow", signal: ctl.signal, headers: { "user-agent": "Mozilla/5.0 (compatible; cycleforchange-verify/1.0; +https://cycleforchange.org)" } });
        if (res.status === 405 || res.status === 403 || res.status === 404) res = await fetch(u.url, { method: "GET", redirect: "follow", signal: ctl.signal, headers: { "user-agent": "Mozilla/5.0 (compatible; cycleforchange-verify/1.0; +https://cycleforchange.org)" } });
        return { ...u, status: res.status, final: res.url };
      } catch (e) { return { ...u, status: 0, error: e.name === "AbortError" ? "timeout" : e.message }; }
      finally { clearTimeout(timer); }
    }));
    for (const r of results) {
      if (r.status >= 200 && r.status < 400) {
        if (r.final && r.final.replace(/\/$/, "") !== r.url.replace(/\/$/, "") && new URL(r.final).hostname !== new URL(r.url).hostname) notes.push(`${r.where} redirects to ${r.final}`);
      } else if (r.status === 403 || r.status === 429) {
        warns.push(`${r.where} ${r.url} answered ${r.status} (bot wall) — verify by hand`);
      } else {
        fails.push(`${r.where} ${r.url} → ${r.status || r.error}`);
      }
    }
  } else if (!NO_FETCH) {
    warns.push("no fetch() in this Node; URLs not checked");
  }
  return { rel, fails, warns, notes, urls: uniq.length };
}

(async () => {
  let bad = 0;
  for (const f of files) {
    const r = await check(f);
    const status = r.fails.length ? "FAIL" : "ok";
    console.log(`\n${status}  ${r.rel}  (${r.urls} urls${NO_FETCH ? ", not fetched" : ""}, ${r.fails.length} fails, ${r.warns.length} warnings)`);
    for (const x of r.fails) console.log(`  ✗ ${x}`);
    for (const x of r.warns) console.log(`  ! ${x}`);
    for (const x of r.notes) console.log(`  · ${x}`);
    if (r.fails.length) bad++;
  }
  console.log(`\n${files.length} town${files.length === 1 ? "" : "s"} checked, ${bad} failed.`);
  process.exit(bad ? 1 : 0);
})();
