#!/usr/bin/env node
/*
  reviews-pull.js — new rider reviews from the Netlify "ride-review" form → one GitHub issue each,
  for Robert to read. Nothing reaches a page from here.

    NETLIFY_API_TOKEN=… NETLIFY_SITE_ID=… GH_TOKEN=… GITHUB_REPOSITORY=owner/repo node tools/reviews-pull.js [--dry]

  Runs hourly (.github/workflows/ride-reviews.yml). A submission gets an issue once: the issue body
  carries <!-- review-id: … -->, and every "review" issue (open or closed) is read before anything is
  opened. Submissions that aren't reviews (no ride, too short, bot field) are logged and skipped.
  To post one: add the label "post" (tools/reviews-post.js runs). To drop it: close the issue.
  The reviewer's email stays in Netlify; it never goes in an issue or the repo.
*/
"use strict";
const fs = require("fs");
const path = require("path");
const RV = require("./lib/reviews.js");

const ROOT = path.join(__dirname, "..");
const DRY = process.argv.includes("--dry");
const NETLIFY = "https://api.netlify.com/api/v1", GH = "https://api.github.com";
const { NETLIFY_API_TOKEN: NT, NETLIFY_SITE_ID: SITE_ID, GH_TOKEN: GT, GITHUB_REPOSITORY: REPO } = process.env;

async function get(url, token, ua) {
  const res = await fetch(url, { headers: { authorization: `Bearer ${token}`, "user-agent": ua, accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res.json();
}
async function gh(method, p, body) {
  const res = await fetch(GH + p, { method, headers: { authorization: `Bearer ${GT}`, "user-agent": "cfc reviews", accept: "application/vnd.github+json", "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok && !(method === "POST" && p.endsWith("/labels") && res.status === 422)) throw new Error(`GitHub ${res.status} ${method} ${p}: ${(await res.text()).slice(0, 200)}`);
  return res.status === 204 ? null : res.json().catch(() => null);
}

function issueBody(rv, ride, flags) {
  const tags = [rv.again === "yes" ? "Would ride it again" : "Wouldn't ride it again", rv.pace ? `Pace ${RV.PACE_TEXT[rv.pace]}` : null].filter(Boolean).join(" · ");
  return [
    `**${ride.name}** (${ride.city}) · [the ride page](https://cycleforchange.org/rides/${rv.slug}/#reviews)`,
    "",
    `> ${rv.words}`,
    "",
    `— **${rv.name}**${rv.from ? `, ${rv.from}` : ""} · ${rv.date} · ${tags}`,
    "",
    ...(flags.length ? ["**Look first:**", ...flags.map((f) => `- ${f}`), ""] : []),
    "**To post it:** add the label `post`. It's on the page a few minutes later.",
    "**To drop it:** close this issue.",
    "",
    "If they left an email, it's in Netlify (Forms → ride-review), never here.",
    "",
    `<!-- review-id: ${rv.id} -->`,
    `<!-- review-json: ${JSON.stringify(rv).replace(/--/g, "\\u002d\\u002d")} -->`,
  ].join("\n");
}

async function main() {
  if (!NT || !SITE_ID) { console.log("reviews-pull: skipped (no NETLIFY_API_TOKEN / NETLIFY_SITE_ID)"); return; }
  if (!DRY && (!GT || !REPO)) { console.log("reviews-pull: skipped (no GH_TOKEN / GITHUB_REPOSITORY)"); return; }
  const rides = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site", "rides", "rides.json"), "utf8"));
  const bySlug = new Map(rides.map((r) => [r.slug, r]));
  const slugs = new Set(bySlug.keys());

  const forms = await get(`${NETLIFY}/sites/${encodeURIComponent(SITE_ID)}/forms`, NT, "cfc reviews");
  const form = (forms || []).find((f) => f.name === "ride-review");
  if (!form) { console.log('reviews-pull: no "ride-review" form yet (no submissions)'); return; }
  const subs = [];
  for (let page = 1; page < 100; page++) {
    const batch = await get(`${NETLIFY}/forms/${form.id}/submissions?per_page=100&page=${page}`, NT, "cfc reviews");
    if (!Array.isArray(batch) || !batch.length) break;
    subs.push(...batch);
    if (batch.length < 100) break;
  }

  const seen = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, "data", "ride-reviews.json"), "utf8")).map((r) => r.id));
  if (!DRY) {
    await gh("POST", `/repos/${REPO}/labels`, { name: "review", color: "A84C58", description: "A rider review waiting to be read" });
    await gh("POST", `/repos/${REPO}/labels`, { name: "post", color: "2C4F55", description: "Post this review on the ride page" });
    for (let page = 1; page < 50; page++) {
      const list = await gh("GET", `/repos/${REPO}/issues?labels=review&state=all&per_page=100&page=${page}`);
      if (!Array.isArray(list) || !list.length) break;
      for (const is of list) { const m = String(is.body || "").match(/<!-- review-id: ([a-z0-9]+) -->/i); if (m) seen.add(m[1]); }
      if (list.length < 100) break;
    }
  }

  let opened = 0, skipped = 0;
  for (const sub of subs.sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)))) {
    if (seen.has(String(sub.id))) continue;
    const c = RV.clean(sub, slugs);
    if (!c.ok) { skipped++; console.log(`skip ${sub.id}: ${c.reason}`); continue; }
    const ride = bySlug.get(c.review.slug);
    const title = `Review: ${ride.name} — ${c.review.name}`.slice(0, 120);
    if (DRY) { console.log(`would open: ${title}\n${issueBody(c.review, ride, c.flags)}\n`); opened++; continue; }
    await gh("POST", `/repos/${REPO}/issues`, { title, body: issueBody(c.review, ride, c.flags), labels: ["review"] });
    seen.add(c.review.id);
    opened++;
  }
  console.log(`reviews-pull: ${subs.length} submissions, ${opened} new review${opened === 1 ? "" : "s"} opened, ${skipped} skipped`);
}

if (require.main === module) main().catch((e) => { console.error(e.message); process.exit(1); });
module.exports = { issueBody };
