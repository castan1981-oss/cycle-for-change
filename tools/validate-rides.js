#!/usr/bin/env node
/*
  validate-rides.js — the gate every rides.json change goes through (schema v3).

    node tools/validate-rides.js [--data file] [--json] [--strict] [--today YYYY-MM-DD] [--all]

  Errors (exit 1): the file isn't JSON or isn't an array; a required field is missing; a word
  outside the vocabularies (tools/lib/rides-schema.js); a bad or repeated slug; a country that
  isn't an ISO code; a US ride without a state, or a state outside the US; a time zone Intl
  doesn't know; a start time that isn't HH:MM; a date that isn't real or is after today; half a
  coordinate; a paused or ended ride with no status_since; an LGBTQ listing in a never-list
  country; a banned phrase in the copy.

  Warnings (exit 0, or 1 with --strict): a description under 60 or over 700 characters; no
  coordinates; low confidence; two records that look like the same ride; only social-media
  sources; a check older than the hide window; no refresh.watch_url.

  The rules are the contract in data/SCHEMA.md ("Group rides"). Used by tools/rides-apply.js,
  the rides-check workflow and the Netlify build.

    const { validateRide, validateAll } = require("./validate-rides.js");
*/
"use strict";
const fs = require("fs");
const path = require("path");
const S = require("./lib/rides-schema.js");
const F = require("./lib/rides-freshness.js");

const ROOT = path.join(__dirname, "..");
const DEFAULT_DATA = path.join(ROOT, "cfc-site", "rides", "rides.json");

// ---------- the rules ----------
const REQUIRED_TEXT = ["slug", "name", "kind", "status", "city", "country", "tz", "schedule", "frequency", "description", "verified_on", "confidence"];
const TEXT_FIELDS = ["name", "name_en", "schedule", "description", "visitor_notes", "evidence", "status_note", "pace", "founded_note"];
const BANNED = [
  [/\bleverag(?:e|es|ed|ing)\b/i, "leverage"], [/\bsynerg(?:y|ies|istic)\b/i, "synergy"],
  [/\bpassionate about\b/i, "passionate about"], [/\bthrilled to announce\b/i, "thrilled to announce"],
  [/\bexcited to share\b/i, "excited to share"], [/\bhidden gems?\b/i, "hidden gem"], [/\bmust[- ]visit\b/i, "must-visit"],
  [/\bvibrant\b/i, "vibrant"], [/\bbucket[- ]list\b/i, "bucket list"], [/\$\s?800\b/, "$800"], [/\btwo suitcases\b/i, "two suitcases"],
  [/\best\.?\s*2008\b/i, "est. 2008"], [/\byears? sober\b/i, "years sober"], [/\bsober since\b/i, "sober since"],
];
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/;
const NOT_COUNTRIES = new Set(["EU", "EZ", "UN", "ZZ", "QO", "AA"]);

const blank = (v) => v == null || (typeof v === "string" && !v.trim());
const isHttp = (u) => { try { return /^https?:$/.test(new URL(u).protocol); } catch (e) { return false; } };
function realDate(s) {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !isNaN(d) && d.toISOString().slice(0, 10) === s;
}
let REGION = null;
function isCountry(cc) {
  if (typeof cc !== "string" || !/^[A-Z]{2}$/.test(cc) || NOT_COUNTRIES.has(cc) || /^(Q[M-Z]|X[A-JL-Z])$/.test(cc)) return false;
  try { REGION = REGION || new Intl.DisplayNames(["en"], { type: "region" }); const n = REGION.of(cc); return !!n && n !== cc; } catch (e) { return false; }
}
const TZ_OK = new Map();
function isTz(z) {
  if (typeof z !== "string" || !z) return false;
  if (!TZ_OK.has(z)) { let ok; try { new Intl.DateTimeFormat("en-US", { timeZone: z }); ok = /\/|^UTC$/.test(z); } catch (e) { ok = false; } TZ_OK.set(z, ok); }
  return TZ_OK.get(z);
}
const toMin = (t) => (typeof t === "string" && HHMM.test(t) ? +t.slice(0, 2) * 60 + +t.slice(3) : null);
const STOP = new Set(["the", "and", "club", "cycling", "cycle", "cyclists", "bike", "bikes", "bicycle", "ride", "rides", "riding", "group", "team", "shop", "de", "la", "el", "le", "les", "du", "des", "der", "die", "das", "und", "of", "et", "y"]);
const words = (s) => new Set(S.fold(s).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)));
const overlap = (a, b) => { const A = words(a), B = words(b); if (!A.size || !B.size) return 0; let n = 0; for (const w of A) if (B.has(w)) n++; return n / Math.min(A.size, B.size); };

/*
  validateRide(r, ctx) → { errors: [{code, field, msg}], warnings: [...] }
    ctx.today   "YYYY-MM-DD" (default: today, UTC)
    ctx.slugs   a Map(slug → count) of the whole file, for the uniqueness check (optional)
*/
function validateRide(r, ctx = {}) {
  const today = ctx.today || new Date().toISOString().slice(0, 10);
  const errors = [], warnings = [];
  const err = (code, field, msg) => errors.push({ code, field, msg });
  const warn = (code, field, msg) => warnings.push({ code, field, msg });
  if (!r || typeof r !== "object" || Array.isArray(r)) { err("not-a-record", null, "not a ride record (an object)"); return { errors, warnings }; }

  // required
  for (const k of REQUIRED_TEXT) if (blank(r[k])) err("missing", k, `missing ${k}`);
  if (!Array.isArray(r.discipline) || !r.discipline.length) err("missing", "discipline", "discipline needs at least one");
  if (r.frequency !== "irregular" && (!Array.isArray(r.days) || !r.days.length)) err("missing", "days", "days needs at least one (unless frequency is irregular)");
  if (r.days != null && !Array.isArray(r.days)) err("type", "days", "days must be an array");
  const host = r.host && typeof r.host === "object" ? r.host : null;
  if (!host || blank(host.name)) err("missing", "host.name", "missing host.name");
  if (!host || blank(host.type)) err("missing", "host.type", "missing host.type");
  const sources = Array.isArray(r.sources) ? r.sources : [];
  if (!sources.some(isHttp)) err("missing", "sources", "sources needs at least one http(s) URL");
  const bad = sources.filter((u) => !isHttp(u));
  if (sources.length && bad.length && sources.some(isHttp)) warn("source-url", "sources", `not a URL in sources: ${bad.slice(0, 2).join(", ")}`);
  const refresh = r.refresh && typeof r.refresh === "object" ? r.refresh : null;
  if (!refresh || blank(refresh.method)) err("missing", "refresh.method", "missing refresh.method");

  // vocabularies
  const vocab = (field, value, list) => { if (!blank(value) && !list.includes(value)) err("vocab", field, `${field} "${value}" is not one of: ${list.join(", ")}`); };
  vocab("kind", r.kind, S.VOCAB.kind);
  vocab("status", r.status, S.VOCAB.status);
  vocab("frequency", r.frequency, S.VOCAB.frequency);
  vocab("confidence", r.confidence, S.VOCAB.confidence);
  if (r.drop_policy != null) vocab("drop_policy", r.drop_policy, S.VOCAB.drop_policy);
  if (r.geo_precision != null) vocab("geo_precision", r.geo_precision, S.VOCAB.geo_precision);
  if (host) vocab("host.type", host.type, S.VOCAB.host_type);
  if (refresh) vocab("refresh.method", refresh.method, S.VOCAB.refresh_method);
  for (const d of Array.isArray(r.discipline) ? r.discipline : []) vocab("discipline", d, S.VOCAB.discipline);
  for (const d of Array.isArray(r.days) ? r.days : []) vocab("days", d, S.VOCAB.days);
  if (r.inclusive_focus != null && !Array.isArray(r.inclusive_focus)) err("type", "inclusive_focus", "inclusive_focus must be an array");
  for (const t of Array.isArray(r.inclusive_focus) ? r.inclusive_focus : []) vocab("inclusive_focus", t, S.VOCAB.inclusive_focus);
  if (r.monthly_rule != null) {
    if (!Array.isArray(r.monthly_rule)) err("type", "monthly_rule", "monthly_rule must be an array or null");
    else for (const m of r.monthly_rule) {
      if (!m || ![1, 2, 3, 4, -1].includes(m.ord) || !S.VOCAB.days.includes(m.day)) err("vocab", "monthly_rule", `monthly_rule entry ${JSON.stringify(m)} needs ord 1–4 or -1 and a day`);
    }
  }
  if (r.season_months != null) {
    const sm = r.season_months, okM = (n) => Number.isInteger(n) && n >= 1 && n <= 12;
    if (typeof sm !== "object" || !okM(sm.start) || !okM(sm.end)) err("type", "season_months", "season_months must be {start, end} months 1–12, or null");
  }

  // slug
  if (!blank(r.slug)) {
    if (!SLUG.test(r.slug)) err("slug", "slug", `slug "${r.slug}" must be lowercase a-z 0-9 and single hyphens`);
    if (ctx.slugs && ctx.slugs.get(r.slug) > 1) err("slug-duplicate", "slug", `slug "${r.slug}" is used ${ctx.slugs.get(r.slug)} times`);
  }

  // where
  const cc = r.country;
  if (!blank(cc) && !isCountry(cc)) err("country", "country", `country "${cc}" is not an ISO 3166-1 alpha-2 code (uppercase)`);
  if (cc === "US") { if (!S.US_STATES[r.state]) err("state", "state", `US ride needs a state code (got ${JSON.stringify(r.state)})`); }
  else if (!blank(cc) && r.state != null) err("state", "state", `state must be null outside the US (got ${JSON.stringify(r.state)})`);
  if (!blank(r.tz) && !isTz(r.tz)) err("tz", "tz", `tz "${r.tz}" is not an IANA time zone`);

  // when
  if (r.start_hhmm != null && !HHMM.test(r.start_hhmm)) err("start_hhmm", "start_hhmm", `start_hhmm "${r.start_hhmm}" must be HH:MM (24-hour) or null`);
  if (r.start_times != null) {
    // the host's own table of start-time changes (tools/lib/rides-schema.js → startOn)
    if (!Array.isArray(r.start_times) || !r.start_times.length) err("start_times", "start_times", "start_times must be a non-empty list of { from, start_hhmm } or left out");
    else {
      let prev = null;
      r.start_times.forEach((e, i) => {
        if (!e || typeof e !== "object" || !realDate(e.from) || !HHMM.test(String(e.start_hhmm || ""))) { err("start_times", "start_times", `start_times[${i}] must be { "from": "YYYY-MM-DD", "start_hhmm": "HH:MM" }`); return; }
        if (prev && e.from <= prev) err("start_times", "start_times", `start_times must be oldest first, one entry per date (${e.from} after ${prev})`);
        prev = e.from;
      });
      if (blank(r.start_hhmm)) err("start_times", "start_times", "start_times needs start_hhmm (the time before the first change)");
    }
  }
  for (const k of ["verified_on", "last_seen", "status_since"]) {
    if (blank(r[k])) continue;
    if (!realDate(r[k])) err("date", k, `${k} "${r[k]}" is not a real YYYY-MM-DD date`);
    else if (r[k] > today) err("date-future", k, `${k} ${r[k]} is after today (${today})`);
  }
  if ((r.status === "paused" || r.status === "ended") && blank(r.status_since)) err("status_since", "status_since", `${r.status === "ended" ? "an" : "a"} ${r.status} ride needs status_since`);

  // coordinates
  const hasLat = r.lat != null, hasLng = r.lng != null;
  if (hasLat || hasLng) {
    const okLat = typeof r.lat === "number" && Number.isFinite(r.lat) && r.lat >= -90 && r.lat <= 90;
    const okLng = typeof r.lng === "number" && Number.isFinite(r.lng) && r.lng >= -180 && r.lng <= 180;
    if (!okLat || !okLng) err("latlng", "lat", `lat/lng must both be numbers in range or both null (got ${JSON.stringify(r.lat)}, ${JSON.stringify(r.lng)})`);
  } else warn("no-latlng", "lat", "no coordinates (the build skips rides without lat/lng; run tools/geocode-rides.js)");

  // distances: numbers, or display text in the US data ("10–12", "~29")
  for (const k of ["distance_km", "distance_miles"]) {
    const v = r[k];
    if (v != null && typeof v !== "number" && typeof v !== "string") err("type", k, `${k} must be a number, text or null`);
  }

  // safety + voice
  if (Array.isArray(r.inclusive_focus) && r.inclusive_focus.includes("lgbtq") && S.NO_LGBTQ_LISTING.has(cc)) err("lgbtq-never-list", "inclusive_focus", `LGBTQ listing in ${cc}, a never-list country`);
  const texts = TEXT_FIELDS.map((k) => [k, r[k]]).concat([["refresh.notes", refresh && refresh.notes]]);
  for (const [k, v] of texts) {
    if (typeof v !== "string") continue;
    for (const [re, label] of BANNED) if (re.test(v)) err("banned", k, `banned phrase "${label}" in ${k}`);
  }

  // warnings
  if (typeof r.description === "string" && r.description.trim()) {
    const n = r.description.trim().length;
    if (n < 60) warn("description-length", "description", `description is ${n} characters (under 60)`);
    if (n > 700) warn("description-length", "description", `description is ${n} characters (over 700)`);
  }
  if (r.confidence === "low") warn("low-confidence", "confidence", "low confidence: shown with an Unconfirmed line; re-check first");
  const httpSources = sources.filter(isHttp);
  if (httpSources.length && httpSources.every((u) => S.isSocial(u))) warn("social-only", "sources", "only social-media sources (the watcher can't read them)");
  if (realDate(r.verified_on) && F.daysBetween(r.verified_on, today) > F.POLICY.HIDE_DAYS) warn("stale", "verified_on", `last checked ${r.verified_on}, over ${F.POLICY.HIDE_DAYS} days ago (off the lists)`);
  if (!refresh || blank(refresh.watch_url)) warn("no-watch-url", "refresh.watch_url", "no refresh.watch_url (run tools/derive-ride-fields.js)");
  return { errors, warnings };
}

// Two records that look like the same ride: same country and city, a shared day, starts within
// 15 minutes, a similar host — unless their start points are clearly apart.
function likelySame(a, b) {
  if ((a.country || "US") !== (b.country || "US")) return false;
  const city = S.fold(a.city).toLowerCase();
  if (!city || city !== S.fold(b.city).toLowerCase()) return false;
  if (!(a.days || []).some((d) => (b.days || []).includes(d))) return false;
  const ta = toMin(a.start_hhmm), tb = toMin(b.start_hhmm);
  if (ta == null || tb == null || Math.abs(ta - tb) > 15) return false;
  const strip = (s) => S.fold(s || "").toLowerCase().split(city).join(" ");
  const ha = strip(a.host && a.host.name), hb = strip(b.host && b.host.name);
  const sameHost = (ha.trim() && ha.trim() === hb.trim()) || overlap(ha, hb) >= 0.6;
  if (!sameHost) return false;
  const la = a.start_location || {}, lb = b.start_location || {};
  if (la.address && lb.address && overlap(la.address, lb.address) < 0.5) return false;
  return true;
}

/*
  validateAll(rides, opts) → { rides, errors: [{slug, code, field, msg}], warnings: [...], counts }
    opts.today   "YYYY-MM-DD"
*/
function validateAll(rides, opts = {}) {
  const today = opts.today || new Date().toISOString().slice(0, 10);
  const errors = [], warnings = [];
  if (!Array.isArray(rides)) {
    errors.push({ slug: null, code: "not-array", field: null, msg: "rides.json must be a JSON array" });
    return { rides: 0, errors, warnings, counts: count(errors, warnings) };
  }
  const slugs = new Map();
  for (const r of rides) if (r && typeof r.slug === "string") slugs.set(r.slug, (slugs.get(r.slug) || 0) + 1);
  const dupReported = new Set();
  rides.forEach((r, i) => {
    const id = (r && r.slug) || `#${i}`;
    const v = validateRide(r, { today, slugs });
    for (const e of v.errors) {
      if (e.code === "slug-duplicate") { if (dupReported.has(r.slug)) continue; dupReported.add(r.slug); }
      errors.push({ slug: id, ...e });
    }
    for (const w of v.warnings) warnings.push({ slug: id, ...w });
  });
  // likely duplicates, city by city
  const byCity = new Map();
  for (const r of rides) {
    if (!r || typeof r !== "object" || !r.city) continue;
    const k = `${r.country || "US"}|${S.fold(r.city).toLowerCase()}`;
    if (!byCity.has(k)) byCity.set(k, []);
    byCity.get(k).push(r);
  }
  for (const list of byCity.values()) {
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
      if (list[i].slug !== list[j].slug && likelySame(list[i], list[j])) {
        warnings.push({ slug: list[i].slug, code: "duplicate", field: null, msg: `looks like the same ride as ${list[j].slug} (same city, a shared day, starts within 15 minutes, similar host)` });
      }
    }
  }
  return { rides: rides.length, errors, warnings, counts: count(errors, warnings) };
}
function count(errors, warnings) {
  const by = (list) => list.reduce((o, x) => ((o[x.code] = (o[x.code] || 0) + 1), o), {});
  return { errors: errors.length, warnings: warnings.length, error_codes: by(errors), warning_codes: by(warnings) };
}

// ---------- CLI ----------
function main() {
  const args = process.argv.slice(2);
  const argOf = (n) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : null; };
  const file = argOf("--data") ? path.resolve(argOf("--data")) : DEFAULT_DATA;
  const JSON_OUT = args.includes("--json"), STRICT = args.includes("--strict"), ALL = args.includes("--all");
  const today = /^\d{4}-\d{2}-\d{2}$/.test(argOf("--today") || "") ? argOf("--today") : new Date().toISOString().slice(0, 10);
  const rel = path.relative(process.cwd(), file) || file;
  let rides, result;
  try { rides = JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (e) {
    result = { rides: 0, errors: [{ slug: null, code: "json", field: null, msg: `${rel} is not valid JSON: ${e.message}` }], warnings: [] };
    result.counts = count(result.errors, result.warnings);
  }
  if (!result) result = validateAll(rides, { today });
  const failed = result.errors.length > 0 || (STRICT && result.warnings.length > 0);
  if (JSON_OUT) {
    process.stdout.write(JSON.stringify({ file: rel, today, ...result }, null, 1) + "\n");
    process.exit(failed ? 1 : 0);
  }
  const fmtCodes = (o) => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(" · ");
  console.log(`validate-rides: ${result.rides} rides · ${result.errors.length} error${result.errors.length === 1 ? "" : "s"} · ${result.warnings.length} warning${result.warnings.length === 1 ? "" : "s"} (${rel})`);
  if (result.errors.length) {
    console.log(`errors: ${fmtCodes(result.counts.error_codes)}`);
    for (const e of result.errors) console.log(`  ✗ ${e.slug || "(file)"}: ${e.msg}`);
  }
  if (result.warnings.length) {
    console.log(`warnings: ${fmtCodes(result.counts.warning_codes)}`);
    const shown = {};
    for (const w of result.warnings) {
      shown[w.code] = (shown[w.code] || 0) + 1;
      if (!ALL && shown[w.code] > 8) continue;
      console.log(`  · ${w.slug}: ${w.msg}`);
    }
    const hidden = Object.entries(shown).filter(([, n]) => !ALL && n > 8).map(([k, n]) => `${n - 8} more ${k}`);
    if (hidden.length) console.log(`  (${hidden.join(", ")} — --all lists every one)`);
  }
  if (failed && !result.errors.length) console.log("--strict: warnings count as failures");
  process.exit(failed ? 1 : 0);
}

module.exports = { validateRide, validateAll, likelySame, isCountry, isTz, BANNED };
if (require.main === module) main();
