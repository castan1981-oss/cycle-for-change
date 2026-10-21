#!/usr/bin/env node
// tools/indexnow.js — send cycleforchange.org URLs to IndexNow by hand.
// The deploy does this on its own (netlify/functions/deploy-succeeded.js); this is for the first full
// submission and for checking what would go out.
//
//   node tools/indexnow.js --dry-run            what a deploy would send today (live sitemaps, last 2 days)
//   node tools/indexnow.js --all                every URL in the live sitemaps
//   node tools/indexnow.js --since 2026-10-15   URLs whose lastmod is on or after that date
//   add --local to read cfc-site/ sitemaps from disk instead of the live site
//
// Behind the session proxy, run node with NODE_USE_ENV_PROXY=1 so fetch uses it.
"use strict";
const fs = require("fs");
const path = require("path");
const IN = require("../netlify/functions/lib/indexnow");

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const value = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };

async function main() {
  const local = flag("--local");
  const site = path.join(__dirname, "..", "cfc-site");
  const getText = local
    ? async (url) => fs.readFileSync(path.join(site, new URL(url).pathname), "utf8")
    : async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${url}: ${res.status}`);
        return res.text();
      };

  const since = flag("--all") ? null : value("--since") || IN.daysAgo(2);
  const urls = IN.pick(await IN.collect(getText), { since });
  console.log(`${urls.length} URLs${since ? ` changed since ${since}` : " (all)"}`);

  if (flag("--dry-run")) {
    urls.slice(0, 20).forEach((u) => console.log("  " + u));
    if (urls.length > 20) console.log(`  … and ${urls.length - 20} more`);
    return;
  }
  const results = await IN.submit(urls);
  console.log(JSON.stringify(results));
  if (results.some((r) => r.status !== 200 && r.status !== 202)) process.exitCode = 1;
}

main().catch((err) => { console.error(err.message); process.exit(1); });
