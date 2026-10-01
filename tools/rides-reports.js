#!/usr/bin/env node
/*
  rides-reports.js — rider reports in from Netlify Forms.

    node tools/rides-reports.js [--since YYYY-MM-DD] [--dry]

  Needs NETLIFY_API_TOKEN and NETLIFY_SITE_ID in the environment (repo secrets in the Monday
  workflow). Without the token it says so and exits 0 — the watcher runs either way.

  Every ride page carries the `ride-report` form (scripts/blocks.js): kind new · changed · gone ·
  still-on, ride (name or link), details, email (optional), page (the path it was sent from).
  This reads every submission of that form and:
    - finds the ride: the page it came from (/rides/<slug>/) first, else the "ride" text — a
      cycleforchange.org/rides/<slug>/ link, the host's own link, or the ride's name (narrowed to
      the state or country of the hub page it came from)
    - gone / changed / still-on on a known ride → data/rides-health.json, rides.<slug>.reports[]
      as { id, date, type, note } (note = the details, 300 characters at most). Deduped by id.
      tools/lib/rides-freshness.js reads them: "gone" and "changed" put the ride first in the
      re-check queue and show a warning; "still-on" is a rider's word it's still happening.
    - new rides, and anything it can't match → data/rides-suggestions.json, deduped by id.
  Never stores an email address.
*/
"use strict";
const fs = require("fs");
const path = require("path");
const S = require("./lib/rides-schema.js");

const ROOT = path.join(__dirname, "..");
const API = "https://api.netlify.com/api/v1";
const FORM = "ride-report";
const RIDE_KEYS = ["feed_seen", "feed_next", "feed_via", "feed_src", "feed_candidate", "flags", "reports", "urls"];
const KEEP_REPORTS = 20;

const STOP = new Set("the and ride rides riding group bike bikes cycling cycle club weekly every night morning with from for this that our your a an of in on at to de la el le les du der die das".split(" "));
const words = (s) => S.fold(s || "").toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w));
function score(text, ride) {
  const want = new Set(words(text));
  if (!want.size) return 0;
  const have = new Set(words([ride.name, ride.name_en, ride.host && ride.host.name, ride.city].filter(Boolean).join(" ")));
  let n = 0;
  for (const w of want) if (have.has(w)) n++;
  return n / want.size;
}
const urlKey = (u) => { try { const x = new URL(u); return (x.hostname.replace(/^www\./, "") + x.pathname.replace(/\/+$/, "")).toLowerCase(); } catch (e) { return null; } };

// Which ride is this submission about? → slug or null
function matchRide(sub, rides) {
  const bySlug = new Map(rides.map((r) => [r.slug, r]));
  const page = String(sub.page || "").trim();
  let m = page.match(/^(?:https?:\/\/[^/]+)?\/rides\/([a-z0-9-]+)\/?(?:[?#].*)?$/);
  if (m && bySlug.has(m[1])) return { slug: m[1], how: "page" };
  const text = String(sub.ride || "");
  m = text.match(/cycleforchange\.org\/rides\/([a-z0-9-]+)/i);
  if (m && bySlug.has(m[1].toLowerCase())) return { slug: m[1].toLowerCase(), how: "link" };
  // a link to the host's own page
  for (const u of text.match(/https?:\/\/[^\s"'<>]+/g) || []) {
    const k = urlKey(u);
    if (!k) continue;
    const hit = rides.find((r) => [r.links && r.links.website, r.links && r.links.instagram, r.links && r.links.facebook, r.links && r.links.meetup, r.links && r.links.strava,
      ...((r.links && r.links.other) || []), ...(r.sources || []), r.refresh && r.refresh.watch_url].filter(Boolean).some((x) => urlKey(x) === k));
    if (hit) return { slug: hit.slug, how: "host-link" };
  }
  // the name, among the rides of the page it came from (a state, a country, a city hub)
  let pool = rides;
  const parts = page.replace(/^https?:\/\/[^/]+/, "").split("/").filter(Boolean);
  if (parts[0] === "rides" && parts[1]) {
    const st = parts[1].toUpperCase();
    if (/^[a-z]{2}$/.test(parts[1]) && S.US_STATES[st]) pool = rides.filter((r) => r.state === st);
    else { const cc = [...new Set(rides.map((r) => r.country))].find((c) => S.countrySlug(c) === parts[1]); if (cc) pool = rides.filter((r) => r.country === cc); }
    if (parts[2] && pool.length) { const city = pool.filter((r) => S.slugify(r.city) === parts[2]); if (city.length) pool = city; }
  }
  const ranked = pool.map((r) => ({ r, s: score(text, r) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s);
  if (ranked.length && ranked[0].s >= 0.6 && (!ranked[1] || ranked[0].s - ranked[1].s >= 0.15)) return { slug: ranked[0].r.slug, how: "name" };
  return null;
}

async function api(fetchFn, token, url) {
  const res = await fetchFn(url, { headers: { authorization: `Bearer ${token}`, "user-agent": "cycleforchange.org rides-reports" } });
  if (!res.ok) { const e = new Error(`Netlify API ${res.status} for ${url.replace(API, "")}`); e.status = res.status; throw e; }
  return res.json();
}

/*
  run({ token, siteId, fetch, dataFile, healthFile, suggestionsFile, since, today, dry, log })
  → { submissions, reports, still_on, suggestions, unmatched, skipped }
*/
async function run(o = {}) {
  const log = o.log || console.log;
  const fetchFn = o.fetch || globalThis.fetch;
  const today = o.today || new Date().toISOString().slice(0, 10);
  const dataFile = o.dataFile || path.join(ROOT, "cfc-site", "rides", "rides.json");
  const healthFile = o.healthFile || path.join(ROOT, "data", "rides-health.json");
  const suggestionsFile = o.suggestionsFile || path.join(ROOT, "data", "rides-suggestions.json");
  const rides = JSON.parse(fs.readFileSync(dataFile, "utf8"));

  const forms = await api(fetchFn, o.token, `${API}/sites/${encodeURIComponent(o.siteId)}/forms`);
  const form = (forms || []).find((f) => f.name === FORM);
  if (!form) { log(`rides-reports: no "${FORM}" form on the site yet (no submissions), nothing to do`); return { submissions: 0, reports: 0, still_on: 0, suggestions: 0, unmatched: 0 }; }
  const subs = [];
  for (let page = 1; page < 200; page++) {
    const batch = await api(fetchFn, o.token, `${API}/forms/${form.id}/submissions?per_page=100&page=${page}`);
    if (!Array.isArray(batch) || !batch.length) break;
    subs.push(...batch);
    if (batch.length < 100) break;
  }
  let health = { rides: {} };
  try { health = JSON.parse(fs.readFileSync(healthFile, "utf8")); if (!health.rides) health.rides = {}; } catch (e) { /* first run */ }
  let suggestions = [];
  try { suggestions = JSON.parse(fs.readFileSync(suggestionsFile, "utf8")); if (!Array.isArray(suggestions)) suggestions = []; } catch (e) { /* none yet */ }
  const seenSuggestion = new Set(suggestions.map((x) => x.id));
  const seenReport = new Set();
  for (const h of Object.values(health.rides)) for (const r of h.reports || []) if (r.id) seenReport.add(r.id);

  const out = { submissions: subs.length, reports: 0, still_on: 0, suggestions: 0, unmatched: 0, already: 0 };
  for (const s of subs) {
    const d = s.data || {};
    const date = String(s.created_at || "").slice(0, 10) || today;
    if (o.since && date < o.since) continue;
    const id = String(s.id || s.number || "");
    if (!id) continue;
    const kind = String(d.kind || "").toLowerCase().trim();
    const note = String(d.details || "").replace(/\s+/g, " ").trim().slice(0, 300);
    const hit = kind === "new" ? null : matchRide({ page: d.page, ride: d.ride }, rides);
    if (hit && ["gone", "changed", "still-on"].includes(kind)) {
      if (seenReport.has(id)) { out.already++; continue; }
      const h = health.rides[hit.slug] || (health.rides[hit.slug] = {});
      h.reports = [...(h.reports || []), { id, date, type: kind, ...(note ? { note } : {}) }].sort((a, b) => a.date.localeCompare(b.date)).slice(-KEEP_REPORTS);
      health.rides[hit.slug] = order(h);
      seenReport.add(id);
      if (kind === "still-on") out.still_on++; else out.reports++;
      continue;
    }
    if (seenSuggestion.has(id)) { out.already++; continue; }
    suggestions.push({ id, date, kind: kind || null, ride: String(d.ride || "").trim().slice(0, 300), details: String(d.details || "").trim().slice(0, 1200) || null, page: d.page || null,
      ...(kind !== "new" ? { unmatched: true } : {}) });
    seenSuggestion.add(id);
    if (kind === "new") out.suggestions++; else out.unmatched++;
  }
  suggestions.sort((a, b) => a.date.localeCompare(b.date) || String(a.id).localeCompare(String(b.id)));
  if (!o.dry) {
    const sorted = {};
    for (const slug of Object.keys(health.rides).sort()) sorted[slug] = health.rides[slug];
    health.rides = sorted;
    fs.mkdirSync(path.dirname(healthFile), { recursive: true });
    fs.writeFileSync(healthFile, JSON.stringify(health, null, 1) + "\n");
    fs.writeFileSync(suggestionsFile, JSON.stringify(suggestions, null, 1) + "\n");
  }
  log(`rides-reports: ${out.submissions} submissions on the "${FORM}" form — ${out.reports} new reports on listed rides (gone/changed), ${out.still_on} "still on", ` +
    `${out.suggestions} new-ride suggestions, ${out.unmatched} we couldn't match to a ride, ${out.already} already in.${o.dry ? " (dry run, nothing written)" : ""}`);
  return out;
}
function order(h) {
  const out = {};
  for (const k of RIDE_KEYS) if (h[k] !== undefined) out[k] = h[k];
  for (const k of Object.keys(h)) if (!(k in out)) out[k] = h[k];
  return out;
}

async function main() {
  const args = process.argv.slice(2);
  const val = (n) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : null; };
  const token = process.env.NETLIFY_API_TOKEN, siteId = process.env.NETLIFY_SITE_ID;
  if (!token) { console.log("rides-reports: no NETLIFY_API_TOKEN, skipped"); return; }
  if (!siteId) { console.log("rides-reports: no NETLIFY_SITE_ID, skipped"); return; }
  try {
    await run({ token, siteId, since: /^\d{4}-\d{2}-\d{2}$/.test(val("--since") || "") ? val("--since") : null, dry: args.includes("--dry") });
  } catch (e) {
    if (e.status === 401 || e.status === 403) console.error(`rides-reports: Netlify refused the token (${e.status}). Make a new personal access token and update the NETLIFY_API_TOKEN secret.`);
    else console.error(`rides-reports: ${e.message}`);
    process.exit(1);
  }
}

module.exports = { run, matchRide };
if (require.main === module) {
  if ((process.env.HTTPS_PROXY || process.env.https_proxy) && !process.env.NODE_USE_ENV_PROXY && process.env.NETLIFY_API_TOKEN) {
    const r = require("child_process").spawnSync(process.execPath, ["--disable-warning=UNDICI-EHPA", ...process.argv.slice(1)], { stdio: "inherit", env: { ...process.env, NODE_USE_ENV_PROXY: "1" } });
    process.exit(r.status == null ? 1 : r.status);
  }
  main();
}
