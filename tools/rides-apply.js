#!/usr/bin/env node
/*
  rides-apply.js — applies a re-check batch to cfc-site/rides/rides.json. The only way an agent's
  re-check reaches the data, so the freshness clock (verified_on) moves only on a real check.

    node tools/rides-apply.js research/rides/upkeep/2026-10-05.json [--dry]
      [--data file] [--health file] [--changelog file] [--today YYYY-MM-DD] [--no-geocode]

  The batch is a JSON array (or { "entries": [...] }), one entry per ride:
    { "slug", "outcome", "checked_on": "YYYY-MM-DD", "last_seen"?, "evidence", "sources"?,
      "changes"?, "record"?, "promote_feed"?, "status_note"?, "status_since"?, "note"? }

  outcome
    confirmed       still on as listed: verified_on = checked_on; last_seen, evidence, sources (merged)
    changed         the same, plus `changes` — only these fields: name, name_en, schedule, days,
                    time_local, start_hhmm, start_times, frequency, monthly_rule, season, season_months,
                    start_location, distance_km, distance_miles, duration, pace, drop_policy, host,
                    cost, language, visitor_notes, description, links, inclusive_focus, discipline,
                    refresh, lat, lng, geo_precision, neighborhood, kind, confidence
                    (host, links, refresh and start_location merge into what's there)
    seasonal-break  status, status_since (default checked_on), status_note (required), verified_on
    paused          the same
    ended           the same — only when the host says so, or the page is dead and nothing anywhere for months
    unreachable     nothing changes but the changelog: verified_on is the clock and nobody confirmed anything
    new             `record` is a whole ride (schema v3); it must pass validateRide and have a new slug
  evidence is required for every outcome except unreachable. promote_feed: true (the watcher's
  feed_candidate) or a URL → refresh.feed_url.

  Then derive-ride-fields runs on a temp copy, the whole file is validated, and only if nothing
  new is wrong does it write: rides.json, data/rides-health.json (flags raised on or before the
  check are resolved, by "re-check") and data/rides-changelog.json. It prints a markdown summary
  for the PR body. On any error it writes nothing and exits 1.
*/
"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const S = require("./lib/rides-schema.js");
const { validateRide, validateAll } = require("./validate-rides.js");

const ROOT = path.join(__dirname, "..");
const OUTCOMES = ["confirmed", "changed", "seasonal-break", "paused", "ended", "unreachable", "new"];
const STATUS_OF = { "seasonal-break": "seasonal-break", paused: "paused", ended: "ended" };
const CHANGEABLE = ["name", "name_en", "schedule", "days", "time_local", "start_hhmm", "start_times", "frequency", "monthly_rule", "season", "season_months",
  "start_location", "distance_km", "distance_miles", "duration", "pace", "drop_policy", "host", "cost", "language", "visitor_notes", "description",
  "links", "inclusive_focus", "discipline", "refresh", "lat", "lng", "geo_precision", "neighborhood", "kind", "confidence"];
const MERGE = new Set(["host", "links", "refresh", "start_location"]);
const isDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(`${s}T00:00:00Z`).toISOString().slice(0, 10) === s;
const maxDate = (a, b) => (isDate(a) && isDate(b) ? (a > b ? a : b) : isDate(a) ? a : isDate(b) ? b : null);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const show = (v) => (v == null ? "—" : typeof v === "object" ? JSON.stringify(v) : String(v));
const clip = (s, n) => { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length <= n ? s : s.slice(0, n - 1) + "…"; };

/*
  apply(batch, opts) → { ok, errors: [], rides, health, changelog, summary (markdown), counts }
  Pure apart from derive (a temp file) and geocoding new records; writing is the caller's job.
*/
function apply(batch, opts = {}) {
  const today = opts.today || new Date().toISOString().slice(0, 10);
  const entries = Array.isArray(batch) ? batch : batch && Array.isArray(batch.entries) ? batch.entries : null;
  const errors = [];
  if (!entries) return { ok: false, errors: ["the batch must be a JSON array of entries (or { \"entries\": [...] })"] };
  const rides = JSON.parse(JSON.stringify(opts.rides));
  const bySlug = new Map(rides.map((r) => [r.slug, r]));
  const health = opts.health ? JSON.parse(JSON.stringify(opts.health)) : null;
  const seen = new Set();

  // 1. check the entries
  entries.forEach((e, i) => {
    const at = `entry ${i + 1}${e && e.slug ? ` (${e.slug})` : ""}`;
    if (!e || typeof e !== "object") { errors.push(`${at}: not an object`); return; }
    if (!OUTCOMES.includes(e.outcome)) errors.push(`${at}: outcome "${e.outcome}" is not one of ${OUTCOMES.join(", ")}`);
    if (!isDate(e.checked_on)) errors.push(`${at}: checked_on must be a real YYYY-MM-DD date`);
    else if (e.checked_on > today) errors.push(`${at}: checked_on ${e.checked_on} is after today (${today})`);
    if (e.last_seen != null && !isDate(e.last_seen)) errors.push(`${at}: last_seen must be YYYY-MM-DD or left out`);
    else if (isDate(e.last_seen) && e.last_seen > today) errors.push(`${at}: last_seen ${e.last_seen} is after today`);
    if (e.outcome !== "unreachable" && !(typeof e.evidence === "string" && e.evidence.trim())) errors.push(`${at}: evidence is required (one sentence: what the source showed, and its date)`);
    if (e.sources != null && (!Array.isArray(e.sources) || e.sources.some((u) => !/^https?:\/\//.test(String(u))))) errors.push(`${at}: sources must be a list of http(s) URLs`);
    if (STATUS_OF[e.outcome] && !(typeof e.status_note === "string" && e.status_note.trim())) errors.push(`${at}: ${e.outcome} needs status_note (what the host said, in plain words)`);
    if (e.status_since != null && !isDate(e.status_since)) errors.push(`${at}: status_since must be YYYY-MM-DD`);
    if (e.changes != null && e.outcome !== "changed") errors.push(`${at}: changes are only for outcome "changed"`);
    if (e.outcome === "changed") {
      if (!e.changes || typeof e.changes !== "object" || !Object.keys(e.changes).length) errors.push(`${at}: changed needs a changes object`);
      else for (const k of Object.keys(e.changes)) if (!CHANGEABLE.includes(k)) errors.push(`${at}: "${k}" can't be changed by a re-check (allowed: ${CHANGEABLE.join(", ")})`);
    }
    if (e.outcome === "new") {
      if (!e.record || typeof e.record !== "object") errors.push(`${at}: new needs a record`);
      else {
        // the whole record is validated after derive-ride-fields fills its defaults (step 4)
        const slug = e.record.slug;
        if (e.slug && e.slug !== slug) errors.push(`${at}: slug and record.slug differ`);
        if (bySlug.has(slug)) errors.push(`${at}: slug ${slug} is already listed`);
        const v = validateRide(e.record, { today });
        for (const x of v.errors.filter((x) => ["slug", "country", "state", "lgbtq-never-list", "banned"].includes(x.code))) errors.push(`${at}: record — ${x.msg}`);
      }
    } else if (!bySlug.has(e.slug)) errors.push(`${at}: no ride with slug "${e.slug}"`);
    const key = e.outcome === "new" ? e.record && e.record.slug : e.slug;
    if (key) { if (seen.has(key)) errors.push(`${at}: ${key} appears twice in the batch`); seen.add(key); }
    if (e.promote_feed != null && e.promote_feed !== true && !/^https?:\/\//.test(String(e.promote_feed))) errors.push(`${at}: promote_feed is true or a feed URL`);
    if (e.promote_feed === true && !(health && health.rides && health.rides[e.slug] && health.rides[e.slug].feed_candidate)) errors.push(`${at}: promote_feed: true but the watcher has no feed_candidate for this ride (give the URL)`);
  });
  if (errors.length) return { ok: false, errors };

  // 2. apply
  const changelog = [];
  const applied = [];
  const changedFields = new Map();
  for (const e of entries) {
    if (e.outcome === "new") {
      const r = { ...e.record };
      rides.push(r); bySlug.set(r.slug, r);
      applied.push({ e, r, fields: ["(new ride)"], before: null });
      continue;
    }
    const r = bySlug.get(e.slug);
    const before = JSON.parse(JSON.stringify(r));
    const fields = [];
    const setF = (k, v) => { if (!same(r[k], v)) { r[k] = v; fields.push(k); } };
    if (e.outcome !== "unreachable") {
      const v = maxDate(r.verified_on, e.checked_on);
      setF("verified_on", v);
      if (isDate(e.last_seen)) setF("last_seen", maxDate(r.last_seen, e.last_seen));
      setF("evidence", e.evidence.trim());
      if (Array.isArray(e.sources) && e.sources.length) setF("sources", [...new Set([...(r.sources || []), ...e.sources])]);
    }
    if (e.outcome === "changed") {
      for (const [k, v] of Object.entries(e.changes)) setF(k, MERGE.has(k) && v && typeof v === "object" && !Array.isArray(v) ? { ...(r[k] || {}), ...v } : v);
    }
    if (e.outcome === "confirmed" || e.outcome === "changed") {
      if (r.status === "seasonal-break" || r.status === "paused") { setF("status", "active"); setF("status_note", null); setF("status_since", null); }
    }
    if (STATUS_OF[e.outcome]) {
      setF("status", STATUS_OF[e.outcome]);
      setF("status_since", e.status_since || (r.status === STATUS_OF[e.outcome] && r.status_since) || e.checked_on);
      setF("status_note", e.status_note.trim());
    }
    if (e.promote_feed) {
      const url = e.promote_feed === true ? health.rides[e.slug].feed_candidate.url : String(e.promote_feed);
      setF("refresh", { ...(r.refresh || {}), feed_url: url });
    }
    changedFields.set(r.slug, fields);
    applied.push({ e, r, fields, before });
  }

  // 3. coordinates for new rides (the build skips rides without them)
  const newOnes = applied.filter((x) => x.e.outcome === "new" && !(Number.isFinite(x.r.lat) && Number.isFinite(x.r.lng)));
  if (newOnes.length) {
    if (opts.geocode === false) return { ok: false, errors: newOnes.map((x) => `${x.r.slug}: no coordinates (run without --no-geocode, or give lat/lng)`) };
    const tmp = path.join(os.tmpdir(), `ride-apply-geo-${process.pid}-${Date.now()}.json`);
    fs.writeFileSync(tmp, JSON.stringify(newOnes.map((x) => x.r), null, 1));
    try { execFileSync(process.execPath, [path.join(__dirname, "geocode-rides.js"), tmp], { stdio: "pipe" }); } catch (err) { /* reported below */ }
    const placed = JSON.parse(fs.readFileSync(tmp, "utf8"));
    fs.rmSync(tmp, { force: true });
    for (const p of placed) {
      const r = bySlug.get(p.slug);
      if (Number.isFinite(p.lat) && Number.isFinite(p.lng)) Object.assign(r, { lat: p.lat, lng: p.lng, geo_precision: p.geo_precision });
      else errors.push(`${p.slug}: geocoding found no coordinates (give lat/lng in the record)`);
    }
    if (errors.length) return { ok: false, errors };
  }

  // 4. derive on a temp copy, then validate everything
  const tmp = path.join(os.tmpdir(), `ride-apply-${process.pid}-${Date.now()}.json`);
  fs.writeFileSync(tmp, JSON.stringify(rides, null, 1) + "\n");
  try { execFileSync(process.execPath, [path.join(__dirname, "derive-ride-fields.js"), "--data", tmp], { stdio: "pipe" }); }
  catch (err) { fs.rmSync(tmp, { force: true }); return { ok: false, errors: [`derive-ride-fields failed: ${String(err.stderr || err.message).trim()}`] }; }
  const derived = JSON.parse(fs.readFileSync(tmp, "utf8"));
  fs.rmSync(tmp, { force: true });
  const dBySlug = new Map(derived.map((r) => [r.slug, r]));
  for (const { e, r } of applied) {
    if (e.outcome === "changed" && e.changes.start_hhmm && dBySlug.get(r.slug).start_hhmm !== e.changes.start_hhmm) {
      errors.push(`${r.slug}: derive-ride-fields reads ${dBySlug.get(r.slug).start_hhmm} from the schedule text, not ${e.changes.start_hhmm} — put the new time in schedule and time_local too`);
    }
  }
  const key = (x) => `${x.slug}|${x.code}|${x.field}|${x.msg}`;
  const baseErrors = new Set(validateAll(opts.rides, { today }).errors.map(key));
  const result = validateAll(derived, { today });
  // anything this batch made wrong blocks it; problems a ride already had are listed, not blocking
  const touched = new Set(applied.map((x) => x.r.slug));
  for (const x of result.errors) if (!baseErrors.has(key(x))) errors.push(`${x.slug}: ${x.msg}`);
  const preexisting = result.errors.filter((x) => baseErrors.has(key(x)));
  const stillWrong = preexisting.filter((x) => touched.has(x.slug)).map((x) => `${x.slug}: ${x.msg}`);
  if (errors.length) return { ok: false, errors };

  // 5. health: a person looked, so flags raised on or before the check are resolved
  let resolved = 0;
  if (health && health.rides) {
    for (const { e, r } of applied) {
      if (e.outcome === "unreachable" || e.outcome === "new") continue;
      const h = health.rides[r.slug];
      if (!h || !Array.isArray(h.flags)) continue;
      for (const f of h.flags) if (!f.resolved && (!isDate(f.since) || f.since <= e.checked_on)) { Object.assign(f, { resolved: true, resolved_at: e.checked_on, resolved_by: "re-check" }); resolved++; }
    }
  }

  // 6. the changelog and the summary
  for (const { e, r, fields, before } of applied) {
    const what = e.outcome === "unreachable" ? `couldn't confirm${e.note ? `: ${e.note}` : ""}`
      : e.outcome === "new" ? `added: ${e.evidence}`
      : e.outcome === "changed" ? Object.keys(e.changes).map((k) => (["start_hhmm", "days", "time_local", "frequency", "status"].includes(k) ? `${k} ${show(before[k])} → ${show(r[k])}` : k)).join("; ") + ` — ${e.evidence}`
      : STATUS_OF[e.outcome] ? `${e.outcome}: ${e.status_note}` : e.evidence;
    changelog.push({ date: e.checked_on, slug: r.slug, outcome: e.outcome, summary: clip(what, 400), fields: fields.filter((f) => f !== "(new ride)" || e.outcome === "new") });
  }
  const counts = {};
  for (const { e } of applied) counts[e.outcome] = (counts[e.outcome] || 0) + 1;
  const summary = markdown(applied, counts, { resolved, warnings: result.warnings.length, preexisting: preexisting.length, stillWrong, today, dBySlug });
  return { ok: true, errors: [], rides: derived, health, changelog, summary, counts, resolved, still_wrong: stillWrong };
}

const LABEL = { confirmed: "confirmed", changed: "changed", "seasonal-break": "seasonal break", paused: "paused", ended: "ended", unreachable: "couldn't confirm", new: "new" };
function markdown(applied, counts, { resolved, warnings, preexisting, stillWrong, today, dBySlug }) {
  const order = ["changed", "ended", "paused", "seasonal-break", "new", "unreachable", "confirmed"];
  const L = [];
  L.push(`## Ride re-check — ${today}`, "");
  L.push(`${applied.length} ride${applied.length === 1 ? "" : "s"} re-checked at the source: ${order.filter((o) => counts[o]).map((o) => `${counts[o]} ${LABEL[o]}`).join(" · ")}.`, "");
  L.push("| Outcome | Ride | What the source showed |", "|---|---|---|");
  for (const o of order) for (const { e, r, fields, before } of applied.filter((x) => x.e.outcome === o)) {
    const d = dBySlug.get(r.slug) || r;
    const place = (d.country || "US") === "US" ? `${d.city}, ${d.state}` : `${d.city}, ${S.countryName(d.country)}`;
    let what = e.outcome === "unreachable" ? (e.note || "No page or post we could read confirmed it; verified_on unchanged.") : e.evidence;
    if (e.outcome === "changed") what = `${Object.keys(e.changes).map((k) => (["start_hhmm", "days", "time_local", "frequency"].includes(k) ? `${k}: ${show(before[k])} → ${show(d[k])}` : k)).join("; ")}. ${e.evidence}`;
    if (STATUS_OF[e.outcome]) what = `${e.status_note} ${e.evidence}`;
    if (e.promote_feed) what += ` Feed promoted: ${d.refresh && d.refresh.feed_url}.`;
    L.push(`| ${LABEL[o]} | [${String(d.name).replace(/\|/g, "/")}](https://cycleforchange.org/rides/${r.slug}/) · ${place} | ${clip(what, 300).replace(/\|/g, "/")} |`);
  }
  L.push("");
  L.push(`Flags resolved by this re-check: ${resolved}. \`node tools/validate-rides.js\`: no new errors${preexisting ? ` (${preexisting} older errors in the file)` : ""}, ${warnings} warnings.`);
  if (stillWrong.length) L.push("", "Already wrong before this re-check (fix with an outcome \"changed\" entry next time):", "", ...stillWrong.slice(0, 20).map((x) => `- ${x}`));
  L.push("", "`verified_on` moved only on rides confirmed at their source; \"couldn't confirm\" rides keep their old date and age off the lists on schedule.");
  return L.join("\n") + "\n";
}

function main() {
  const args = process.argv.slice(2);
  const val = (n) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : null; };
  const file = args.find((a, i) => !a.startsWith("--") && !["--data", "--health", "--changelog", "--today"].includes(args[i - 1]));
  if (!file) { console.error("usage: node tools/rides-apply.js <batch.json> [--dry] [--data file] [--health file] [--changelog file] [--today YYYY-MM-DD] [--no-geocode]"); process.exit(1); }
  const DATA = val("--data") ? path.resolve(val("--data")) : path.join(ROOT, "cfc-site", "rides", "rides.json");
  const HEALTH = val("--health") ? path.resolve(val("--health")) : path.join(ROOT, "data", "rides-health.json");
  const CHANGELOG = val("--changelog") ? path.resolve(val("--changelog")) : path.join(ROOT, "data", "rides-changelog.json");
  const today = isDate(val("--today")) ? val("--today") : new Date().toISOString().slice(0, 10);
  let batch;
  try { batch = JSON.parse(fs.readFileSync(file, "utf8")); } catch (e) { console.error(`rides-apply: ${file} is not readable JSON (${e.message})`); process.exit(1); }
  const rides = JSON.parse(fs.readFileSync(DATA, "utf8"));
  let health = null;
  try { health = JSON.parse(fs.readFileSync(HEALTH, "utf8")); } catch (e) { /* no health yet */ }
  const res = apply(batch, { rides, health, today, geocode: !args.includes("--no-geocode") });
  if (!res.ok) {
    console.error(`rides-apply: nothing written — ${res.errors.length} problem${res.errors.length === 1 ? "" : "s"}:`);
    for (const e of res.errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  if (args.includes("--dry")) { process.stdout.write(res.summary); console.error("(dry run: nothing written)"); return; }
  fs.writeFileSync(DATA, JSON.stringify(res.rides, null, 1) + "\n");
  if (res.health) fs.writeFileSync(HEALTH, JSON.stringify(res.health, null, 1) + "\n");
  let log = [];
  try { log = JSON.parse(fs.readFileSync(CHANGELOG, "utf8")); if (!Array.isArray(log)) log = []; } catch (e) { /* first entry */ }
  fs.writeFileSync(CHANGELOG, JSON.stringify([...log, ...res.changelog], null, 1) + "\n");
  process.stdout.write(res.summary);
}

module.exports = { apply, CHANGEABLE, OUTCOMES };
if (require.main === module) main();
