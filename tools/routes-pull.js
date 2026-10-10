#!/usr/bin/env node
/*
  routes-pull.js — routes the people who run a ride send from its page (the Netlify "ride-route" form,
  "Send us the route") → one GitHub issue each, labelled "route", for Robert. Nothing reaches a page from here.

    NETLIFY_API_TOKEN=… NETLIFY_SITE_ID=… GH_TOKEN=… GITHUB_REPOSITORY=owner/repo node tools/routes-pull.js [--dry]

  Runs hourly beside reviews-pull.js (.github/workflows/ride-reviews.yml). An issue carries
  <!-- route-id: … --> so a submission is opened once. This repo is public, so an issue never carries the
  sender's email or a link to the uploaded file: the file stays in Netlify (Forms → ride-route). A link to a
  route is copied only when it's on a route site (Ride with GPS, Strava, Komoot, Garmin, Plotaroute).

  To put a route up: download the file from Netlify, save it as data/routes/<slug>/<posted>.gpx, add the
  ride's entry to data/ride-routes.json (fields in tools/lib/routes.js), run
  python3 tools/route-build.py <slug> and node tools/build-rides.js, open a PR. Or ask Claude to do it
  from the issue. Close the issue to drop it.
*/
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DRY = process.argv.includes("--dry");
const NETLIFY = "https://api.netlify.com/api/v1", GH = "https://api.github.com";
const FORMS_PAGE = "https://app.netlify.com/projects/cycleforchange/forms";
const { NETLIFY_API_TOKEN: NT, NETLIFY_SITE_ID: SITE_ID, GH_TOKEN: GT, GITHUB_REPOSITORY: REPO } = process.env;
const ROUTE_SITES = /^https:\/\/(www\.)?(ridewithgps\.com|strava\.com|komoot\.(com|de)|connect\.garmin\.com|plotaroute\.com|mapmyride\.com)\//i;

const squash = (s) => String(s == null ? "" : s).replace(/[\u0000-\u0008\u000b-\u001f\u007f<>]/g, "").replace(/\s+/g, " ").trim();
// typed words go in a public issue: links, emails and phone numbers come out
const strip = (s) => squash(String(s == null ? "" : s)
  .replace(/[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}/gi, " ")
  .replace(/\b(?:https?:\/\/|www\.)\S+/gi, " ")
  .replace(/(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\b\d{3})[\s.-]?\d{3}[\s.-]?\d{4}\b/g, " "));

async function get(url) {
  const res = await fetch(url, { headers: { authorization: `Bearer ${NT}`, "user-agent": "cfc routes", accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res.json();
}
async function gh(method, p, body) {
  const res = await fetch(GH + p, { method, headers: { authorization: `Bearer ${GT}`, "user-agent": "cfc routes", accept: "application/vnd.github+json", "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok && !(method === "POST" && p.endsWith("/labels") && res.status === 422)) throw new Error(`GitHub ${res.status} ${method} ${p}: ${(await res.text()).slice(0, 200)}`);
  return res.status === 204 ? null : res.json().catch(() => null);
}

// a file field in a Netlify submission is an object ({ filename, type, size, url }) or a URL string
function fileOf(v) {
  if (!v) return null;
  if (typeof v === "object") return v.url || v.filename ? { name: squash(v.filename || "route file").slice(0, 80), size: v.size || null } : null;
  const s = String(v).trim();
  return s ? { name: squash(decodeURIComponent(s.split("?")[0].split("/").pop() || "route file")).slice(0, 80), size: null } : null;
}
const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) && n > 4 && n < 40 ? n : null; };
const DROP = { drop: "They ride back alone (drop)", regroup: "We wait at a regroup", "no-drop": "Nobody gets left (no-drop)" };

// → { title, body } or null when it isn't a route (no ride, no file and no link, bot field)
function issueFor(sub, ride) {
  const d = sub.data || sub;
  if (d["bot-field"]) return null;
  const file = fileOf(d.route_file);
  const link = ROUTE_SITES.test(String(d.route_link || "").trim()) ? String(d.route_link).trim().split(/\s/)[0] : null;
  const linkOther = !link && String(d.route_link || "").trim() ? true : false;
  if (!file && !link && !linkOther) return null;
  const lo = num(d.pace_lo), hi = num(d.pace_hi);
  const pace = lo && hi ? (lo <= hi ? `${lo}–${hi} mph` : `${hi}–${lo} mph`) : lo || hi ? `${lo || hi} mph` : null;
  const name = strip(d.name).slice(0, 40) || "Someone";
  const role = strip(d.role).slice(0, 60);
  const regroup = strip(d.regroup).slice(0, 80);
  const weekly = d.weekly === "once" ? "Just for the next ride (a one-week route)" : d.weekly === "every" ? "The route every time" : null;
  const posted = String(sub.created_at || "").slice(0, 10) || new Date().toISOString().slice(0, 10);
  const lines = [
    `**${ride.name}** (${ride.city}) · [the ride page](https://cycleforchange.org/rides/${ride.slug}/#route)`,
    "",
    `From **${name}**${role ? `, ${role}` : ""} · ${posted}`,
    "",
    file ? `- Route file: **${file.name}**${file.size ? ` (${Math.round(file.size / 1024)} KB)` : ""} — download it from [Netlify → Forms → ride-route](${FORMS_PAGE})` : null,
    link ? `- Link: ${link}` : linkOther ? `- A link to somewhere other than a route site — it's in Netlify (Forms → ride-route)` : null,
    pace ? `- Pace on the flats: ${pace}` : null,
    DROP[d.drop] ? `- If someone comes off: ${DROP[d.drop]}` : null,
    regroup ? `- Regroup: ${regroup}` : null,
    weekly ? `- ${weekly}` : null,
    "",
    "**To put it up:** save the file as `data/routes/" + ride.slug + "/" + posted + ".gpx`, add the ride to `data/ride-routes.json` " +
      "(posted " + posted + ", from \"host\", by \"" + name.replace(/"/g, "") + "\"" + (lo && hi ? `, pace_mph [${Math.min(lo, hi)}, ${Math.max(lo, hi)}]` : "") + (d.weekly === "once" ? ", for_date = the ride's date" : "") + "), run `python3 tools/route-build.py " + ride.slug + "` and `node tools/build-rides.js`, open a PR. Or ask Claude to do it from this issue.",
    "**To drop it:** close this issue.",
    "",
    "If they left an email, it's in Netlify, never here.",
    "",
    `<!-- route-id: ${sub.id} -->`,
  ].filter((x) => x !== null);
  return { title: `Route: ${ride.name} — ${name}`.slice(0, 120), body: lines.join("\n") };
}

async function main() {
  if (!NT || !SITE_ID) { console.log("routes-pull: skipped (no NETLIFY_API_TOKEN / NETLIFY_SITE_ID)"); return; }
  if (!DRY && (!GT || !REPO)) { console.log("routes-pull: skipped (no GH_TOKEN / GITHUB_REPOSITORY)"); return; }
  const rides = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site", "rides", "rides.json"), "utf8"));
  const bySlug = new Map(rides.map((r) => [r.slug, r]));
  const forms = await get(`${NETLIFY}/sites/${encodeURIComponent(SITE_ID)}/forms`);
  const form = (forms || []).find((f) => f.name === "ride-route");
  if (!form) { console.log('routes-pull: no "ride-route" form yet (no submissions)'); return; }
  const subs = [];
  for (let page = 1; page < 100; page++) {
    const batch = await get(`${NETLIFY}/forms/${form.id}/submissions?per_page=100&page=${page}`);
    if (!Array.isArray(batch) || !batch.length) break;
    subs.push(...batch);
    if (batch.length < 100) break;
  }
  const seen = new Set();
  if (!DRY) {
    await gh("POST", `/repos/${REPO}/labels`, { name: "route", color: "A84C58", description: "A ride's route, sent by the people who run it" });
    for (let page = 1; page < 50; page++) {
      const list = await gh("GET", `/repos/${REPO}/issues?labels=route&state=all&per_page=100&page=${page}`);
      if (!Array.isArray(list) || !list.length) break;
      for (const is of list) { const m = String(is.body || "").match(/<!-- route-id: ([a-z0-9]+) -->/i); if (m) seen.add(m[1]); }
      if (list.length < 100) break;
    }
  }
  let opened = 0, skipped = 0;
  for (const sub of subs.sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)))) {
    if (seen.has(String(sub.id))) continue;
    const d = sub.data || {};
    const ride = bySlug.get(String(d.ride || "").trim());
    const it = ride ? issueFor(sub, ride) : null;
    if (!it) { skipped++; console.log(`skip ${sub.id}: ${ride ? "no file or link" : "no such ride"}`); continue; }
    if (DRY) { console.log(`would open: ${it.title}\n${it.body}\n`); opened++; continue; }
    await gh("POST", `/repos/${REPO}/issues`, { title: it.title, body: it.body, labels: ["route"] });
    seen.add(String(sub.id));
    opened++;
  }
  console.log(`routes-pull: ${subs.length} submissions, ${opened} new route${opened === 1 ? "" : "s"} opened, ${skipped} skipped`);
}

if (require.main === module) main().catch((e) => { console.error(e.message); process.exit(1); });
module.exports = { issueFor };
