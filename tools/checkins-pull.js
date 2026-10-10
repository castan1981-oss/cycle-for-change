#!/usr/bin/env node
/*
  checkins-pull.js — ride check-ins from /ride/ (the Netlify "ride-checkin" form) → one GitHub issue
  each, for Robert, when there's something to read: a "something changed" report, or photos / a clip.
  A plain "yes, it's rolling" opens nothing (it stays in Netlify → Forms → ride-checkin).

    NETLIFY_API_TOKEN=… NETLIFY_SITE_ID=… GH_TOKEN=… GITHUB_REPOSITORY=owner/repo node tools/checkins-pull.js [--dry]

  Runs hourly beside reviews-pull.js (.github/workflows/ride-reviews.yml). An issue carries
  <!-- checkin-id: … --> so a submission is opened once. This repo is public, so issues never carry
  the photos, links to them, or a rider's location: only the ride, the time, how far from the start
  (rounded, as the page sent it), the change and the rider's line. The photos stay in Netlify.
  Nothing here changes a ride page; a change is for Robert to confirm (the rides upkeep does the rest).
*/
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DRY = process.argv.includes("--dry");
const NETLIFY = "https://api.netlify.com/api/v1", GH = "https://api.github.com";
const FORMS_PAGE = "https://app.netlify.com/projects/cycleforchange/forms";
const { NETLIFY_API_TOKEN: NT, NETLIFY_SITE_ID: SITE_ID, GH_TOKEN: GT, GITHUB_REPOSITORY: REPO } = process.env;

const squash = (s) => String(s == null ? "" : s).replace(/[\u0000-\u0008\u000b-\u001f\u007f<>]/g, "").replace(/\s+/g, " ").trim();
// the rider's line goes in a public issue: links, emails and phone numbers come out
const strip = (s) => squash(String(s == null ? "" : s)
  .replace(/[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}/gi, " ")
  .replace(/\b(?:https?:\/\/|www\.)\S+/gi, " ")
  .replace(/(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\b\d{3})[\s.-]?\d{3}[\s.-]?\d{4}\b/g, " "));

async function get(url) {
  const res = await fetch(url, { headers: { authorization: `Bearer ${NT}`, "user-agent": "cfc checkins", accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res.json();
}
async function gh(method, p, body) {
  const res = await fetch(GH + p, { method, headers: { authorization: `Bearer ${GT}`, "user-agent": "cfc checkins", accept: "application/vnd.github+json", "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok && !(method === "POST" && p.endsWith("/labels") && res.status === 422)) throw new Error(`GitHub ${res.status} ${method} ${p}: ${(await res.text()).slice(0, 200)}`);
  return res.status === 204 ? null : res.json().catch(() => null);
}

// a file field in a Netlify submission is an object ({ filename, type, size, url }) or a URL string
function files(d) {
  const out = { photos: 0, clip: false };
  ["photo1", "photo2", "photo3", "photo4"].forEach((k) => { if (d[k] && (typeof d[k] === "object" ? d[k].url || d[k].filename : String(d[k]).trim())) out.photos++; });
  if (d.video && (typeof d.video === "object" ? d.video.url || d.video.filename : String(d.video).trim())) out.clip = true;
  return out;
}

function when(at, created) {
  const m = String(at || "").match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return String(created || "").slice(0, 16).replace("T", " ") + " UTC";
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const h = +m[4], ap = h < 12 ? "am" : "pm";
  return `${MON[+m[2] - 1]} ${+m[3]}, ${h % 12 || 12}:${m[5]} ${ap}`;
}

// → { title, body } or null when there's nothing for a person to do
function issueFor(sub, ride) {
  const d = sub.data || {};
  const status = squash(d.status).toLowerCase();
  const f = files(d);
  const what = strip(d.what).slice(0, 60), note = strip(d.note).slice(0, 400);
  const short = (ride.name.match(/\(([^)]{2,14})\)\s*$/) || [])[1] || ride.name;
  const at = when(d.at, sub.created_at);
  const page = squash(d.page).replace(/^\/ride\/(\?r=\S+)?\s*·\s*/, "");   // "at the start", "0.4 mi from the start", "no location"
  const via = /\?r=/.test(String(d.page)) ? "Scanned the ride’s code" : "Found it on /ride/";
  const head = [`**${ride.name}** (${ride.city}) · [the ride page](https://cycleforchange.org/rides/${ride.slug}/)`, "", `${at} · ${via} · ${page || "no location"}`, ""];
  const tail = ["", `<!-- checkin-id: ${sub.id} -->`];

  if (status === "changed") {
    return {
      title: `Changed? ${short}: ${what.toLowerCase() || "something"}`.slice(0, 120),
      body: [...head,
        !what ? "A rider says **something changed**." : /^it/i.test(what) ? `A rider says **${what.toLowerCase()}**.` : `A rider says **${what.toLowerCase()}** changed.`, "",
        note ? `> ${note}` : "_No note._", "",
        "**If it's right:** fix the ride (`/rides check " + ride.slug + "` or edit the source) and close this.",
        "**If it isn't:** close this. One report never changes the page on its own.",
        ...tail].join("\n"),
    };
  }
  if (f.photos || f.clip) {
    const bits = [f.photos ? `${f.photos} photo${f.photos === 1 ? "" : "s"}` : "", f.clip ? "a clip" : ""].filter(Boolean).join(" and ");
    return {
      title: `Photos: ${short}, ${bits}`.slice(0, 120),
      body: [...head,
        `A rider sent **${bits}** from the ride.`, "",
        `**See them:** [Netlify → Forms → ride-checkin](${FORMS_PAGE}) (signed in). They're not linked here because this repo is public.`, "",
        "Nothing goes on the site from here. Close this when you've looked.",
        ...tail].join("\n"),
    };
  }
  return null;   // a plain yes
}

async function main() {
  if (!NT || !SITE_ID) { console.log("checkins-pull: skipped (no NETLIFY_API_TOKEN / NETLIFY_SITE_ID)"); return; }
  if (!DRY && (!GT || !REPO)) { console.log("checkins-pull: skipped (no GH_TOKEN / GITHUB_REPOSITORY)"); return; }
  const rides = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site", "rides", "rides.json"), "utf8"));
  const bySlug = new Map(rides.map((r) => [r.slug, r]));

  const forms = await get(`${NETLIFY}/sites/${encodeURIComponent(SITE_ID)}/forms`);
  const form = (forms || []).find((x) => x.name === "ride-checkin");
  if (!form) { console.log('checkins-pull: no "ride-checkin" form yet'); return; }
  const subs = [];
  for (let page = 1; page < 100; page++) {
    const batch = await get(`${NETLIFY}/forms/${form.id}/submissions?per_page=100&page=${page}`);
    if (!Array.isArray(batch) || !batch.length) break;
    subs.push(...batch);
    if (batch.length < 100) break;
  }

  const seen = new Set();
  if (!DRY) {
    await gh("POST", `/repos/${REPO}/labels`, { name: "checkin", color: "2C4F55", description: "A rider's check-in from /ride/ that needs a look" });
    for (let page = 1; page < 50; page++) {
      const list = await gh("GET", `/repos/${REPO}/issues?labels=checkin&state=all&per_page=100&page=${page}`);
      if (!Array.isArray(list) || !list.length) break;
      for (const is of list) { const m = String(is.body || "").match(/<!-- checkin-id: ([a-z0-9]+) -->/i); if (m) seen.add(m[1]); }
      if (list.length < 100) break;
    }
  }

  let opened = 0, plain = 0, skipped = 0;
  for (const sub of subs.sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)))) {
    if (seen.has(String(sub.id))) continue;
    const d = sub.data || {};
    if (String(d["bot-field"] || "").trim()) { skipped++; continue; }
    const ride = bySlug.get(String(d.ride || "").trim());
    if (!ride) { skipped++; console.log(`skip ${sub.id}: not a ride we list`); continue; }
    const is = issueFor(sub, ride);
    if (!is) { plain++; continue; }
    if (DRY) { console.log(`would open: ${is.title}\n${is.body}\n`); opened++; continue; }
    await gh("POST", `/repos/${REPO}/issues`, { title: is.title, body: is.body, labels: ["checkin"] });
    seen.add(String(sub.id));
    opened++;
  }
  console.log(`checkins-pull: ${subs.length} check-ins, ${opened} new issue${opened === 1 ? "" : "s"}, ${plain} plain yes (no issue), ${skipped} skipped`);
}

if (require.main === module) main().catch((e) => { console.error(e.message); process.exit(1); });
module.exports = { issueFor, files };
