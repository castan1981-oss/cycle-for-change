#!/usr/bin/env node
/*
  merge-ride-research.js — moves scout research into cfc-site/rides/rides.json, through the gates.

    node tools/merge-ride-research.js research/rides/world/*.json [--dry] [--today YYYY-MM-DD]

  Scouts (research/rides/world/BRIEF.md, .claude/agents/ride-scout.md) write one JSON array per
  region. A record gets in only if:
    - confidence is high or medium
    - its newest dated evidence (last_seen) is under 12 months old
    - it isn't medium on a news article alone with no date at all
    - it has a name, city, country, at least one day, a source and a verified_on date
    - its slug is new, and it isn't the same ride as one already listed (same city, a shared day,
      a start within 30 minutes, the same host)
    - it isn't an LGBTQ listing in a country on the never-list (tools/lib/rides-schema.js)
  Then: coordinates (tools/geocode-rides.js), derived fields (tools/derive-ride-fields.js).
  Prints what went in and what didn't, and why. Run tools/build-rides.js after.
*/
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const S = require("./lib/rides-schema.js");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "cfc-site", "rides", "rides.json");
const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const ti = args.indexOf("--today");
const TODAY = ti > -1 ? args[ti + 1] : new Date().toISOString().slice(0, 10);
const files = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--today" && !path.basename(a).startsWith("_"));

const daysAgo = (d) => Math.round((Date.parse(TODAY) - Date.parse(d)) / 86400000);
const isDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
const toMin = (hhmm) => (hhmm && /^\d{2}:\d{2}$/.test(hhmm) ? +hhmm.slice(0, 2) * 60 + +hhmm.slice(3) : null);
const words = (s) => new Set(S.fold(s).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 2 && !["the", "and", "club", "cycling", "cycle", "bike", "bikes", "ride", "rides"].includes(w)));
const overlap = (a, b) => { const A = words(a), B = words(b); if (!A.size || !B.size) return 0; let n = 0; for (const w of A) if (B.has(w)) n++; return n / Math.min(A.size, B.size); };
const BANNED = /\b(leverage|synergy|passionate about|thrilled to announce|excited to share|hidden gem|must-visit|vibrant|bucket list)\b/i;

function sameRide(a, b) {
  if ((a.country || "US") !== (b.country || "US")) return false;
  if (S.fold(a.city).toLowerCase() !== S.fold(b.city).toLowerCase()) return false;
  const days = (a.days || []).some((d) => (b.days || []).includes(d));
  const ta = toMin(a.start_hhmm), tb = toMin(b.start_hhmm);
  const time = ta == null || tb == null || Math.abs(ta - tb) <= 30;
  // the city's own name says nothing ("Rapha London" vs "Cycle Club London")
  const city = S.fold(a.city).toLowerCase();
  const strip = (s) => S.fold(s || "").toLowerCase().split(city).join(" ");
  const host = overlap(strip(a.host && a.host.name), strip(b.host && b.host.name)) >= 0.6 || overlap(strip(a.name), strip(b.name)) >= 0.7;
  // one host, two different starts = two rides (a Tuesday from Polanco and a Tuesday from Coyoacán)
  const la = a.start_location || {}, lb = b.start_location || {};
  const hostWords = (x) => S.fold((x.host && x.host.name) || "").toLowerCase();
  const nameA = la.name && S.fold(la.name).toLowerCase().split(hostWords(a)).join(" "), nameB = lb.name && S.fold(lb.name).toLowerCase().split(hostWords(b)).join(" ");
  const apart = (la.address && lb.address && overlap(la.address, lb.address) < 0.5) || (nameA && nameB && nameA.trim() && nameB.trim() && overlap(nameA, nameB) < 0.5);
  return days && time && host && !apart;
}

function gate(r) {
  if (!r || typeof r !== "object") return "not a record";
  if (!r.slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.slug)) return "bad slug";
  if (!["high", "medium"].includes(r.confidence)) return `confidence ${r.confidence || "missing"}`;
  if (!r.name || !r.city) return "no name or city";
  const cc = String(r.country || "").toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return "no country";
  if (cc === "US" && !S.US_STATES[String(r.state || "").toUpperCase()]) return "US ride without a state";
  if (!Array.isArray(r.days) || !r.days.length) return "no day";
  if (!Array.isArray(r.sources) || !r.sources.some((u) => /^https?:\/\//.test(u))) return "no source";
  if (!isDate(r.verified_on)) return "no verified_on";
  if (isDate(r.last_seen) && daysAgo(r.last_seen) > 365) return `newest evidence ${r.last_seen} is over a year old`;
  const method = r.refresh && r.refresh.method;
  if (!isDate(r.last_seen) && r.confidence === "medium" && method === "news") return "medium on a news page with no date";
  if ((r.inclusive_focus || []).includes("lgbtq") && S.NO_LGBTQ_LISTING.has(cc)) return "LGBTQ listing in a never-list country";
  const text = [r.name, r.description, r.visitor_notes, r.schedule, r.evidence].join(" ");
  if (BANNED.test(text)) return `banned phrase: ${text.match(BANNED)[0]}`;
  return null;
}

const rides = JSON.parse(fs.readFileSync(DATA, "utf8"));
const slugs = new Set(rides.map((r) => r.slug));
const accepted = [], rejected = [];
for (const file of files) {
  let list;
  try { list = JSON.parse(fs.readFileSync(file, "utf8")); } catch (e) { console.error(`${file}: not JSON (${e.message})`); process.exitCode = 1; continue; }
  if (!Array.isArray(list)) { console.error(`${file}: not an array`); continue; }
  for (const raw of list) {
    const why = gate(raw);
    const r = { ...raw, country: String(raw.country || "US").toUpperCase() };
    if (r.country === "US") r.state = String(r.state).toUpperCase(); else r.state = null;
    let reason = why;
    if (!reason && slugs.has(r.slug)) reason = "slug already listed";
    if (!reason) { const twin = [...rides, ...accepted].find((o) => sameRide(o, r)); if (twin) reason = `same ride as ${twin.slug}`; }
    if (reason) { rejected.push({ file: path.basename(file), slug: raw && raw.slug, reason }); continue; }
    // coordinates get filled below; the scouts leave them null
    for (const k of ["lat", "lng"]) if (typeof r[k] !== "number") r[k] = null;
    if (r.lat == null || r.lng == null) r.geo_precision = null;
    slugs.add(r.slug);
    accepted.push(r);
  }
}

const by = {};
for (const r of accepted) { const k = r.country === "US" ? `US-${r.state}` : r.country; by[k] = (by[k] || 0) + 1; }
console.log(`accepted ${accepted.length}: ${Object.entries(by).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(", ")}`);
if (rejected.length) console.log(`rejected ${rejected.length}:\n` + rejected.map((x) => `  ${x.file}  ${x.slug}: ${x.reason}`).join("\n"));
if (DRY || !accepted.length) process.exit(0);

// geocode the new ones on their own copy, then append, derive, done
const tmp = path.join(require("os").tmpdir(), `ride-merge-${process.pid}.json`);
fs.writeFileSync(tmp, JSON.stringify(accepted, null, 1));
execFileSync(process.execPath, [path.join(__dirname, "geocode-rides.js"), tmp], { stdio: "inherit" });
const placed = JSON.parse(fs.readFileSync(tmp, "utf8")).filter((r) => {
  if (typeof r.lat === "number" && typeof r.lng === "number") return true;
  console.log(`  left out ${r.slug}: no coordinates`); return false;
});
fs.writeFileSync(DATA, JSON.stringify([...rides, ...placed], null, 1) + "\n");
execFileSync(process.execPath, [path.join(__dirname, "derive-ride-fields.js")], { stdio: "inherit" });
fs.unlinkSync(tmp);
console.log(`merged ${placed.length} rides into ${path.relative(ROOT, DATA)}; now run: node tools/build-rides.js`);
