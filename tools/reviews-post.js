#!/usr/bin/env node
/*
  reviews-post.js — the review in a "review" issue Robert labelled "post" → data/ride-reviews.json.

    ISSUE_BODY="…" node tools/reviews-post.js     (prints the review id it added, or why not)

  Run by .github/workflows/ride-review-post.yml, which then commits to main; Netlify's deploy runs
  tools/build-rides.js, which puts the review on the ride page. Reads the review-json line the pull
  wrote, checks it against the same rules, never adds the same id twice.
*/
"use strict";
const fs = require("fs");
const path = require("path");
const RV = require("./lib/reviews.js");

const ROOT = path.join(__dirname, "..");
const FILE = path.join(ROOT, "data", "ride-reviews.json");

function post(body, file = FILE) {
  const m = String(body || "").match(/<!-- review-json: (\{.*\}) -->/);
  if (!m) return { ok: false, reason: "no review in this issue" };
  let raw;
  try { raw = JSON.parse(m[1].replace(/\\u002d/g, "-")); } catch (e) { return { ok: false, reason: "the review line isn't readable" }; }
  const rides = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site", "rides", "rides.json"), "utf8"));
  const rv = RV.valid(raw, new Set(rides.map((r) => r.slug)));
  if (!rv) return { ok: false, reason: "the review doesn't pass the rules" };
  const list = JSON.parse(fs.readFileSync(file, "utf8"));
  if (list.some((x) => x.id === rv.id)) return { ok: true, id: rv.id, slug: rv.slug, already: true };
  list.push({ ...rv, posted: new Date().toISOString().slice(0, 10) });
  list.sort(RV.byNewest);
  fs.writeFileSync(file, JSON.stringify(list, null, 2) + "\n");
  return { ok: true, id: rv.id, slug: rv.slug };
}

if (require.main === module) {
  const r = post(process.env.ISSUE_BODY);
  console.log(JSON.stringify(r));
  if (!r.ok) process.exit(1);
}
module.exports = { post };
