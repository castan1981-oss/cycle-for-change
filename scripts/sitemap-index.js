#!/usr/bin/env node
/* Cycle for Change — the sitemap index (cfc-site/sitemap.xml), written from its children.

   Oct 25, 2026 (the 500K plan, architecture F-7): the index was hand-written and said lastmod 2026-10-06 for
   every child while the children changed daily. Search engines read the index's lastmod to decide whether to
   re-read a child, so each child's lastmod here is now the newest <lastmod> inside it — never "today".

   Called at the end of tools/build-rides.js (through scripts/build-signals.js), scripts/build-events.js and
   scripts/build-calendar.js, so whichever generator ran last, the index matches what's on disk. On its own:
   node scripts/sitemap-index.js. Tests: tools/test/sitemap-index.test.js. */
"use strict";
const fs = require("fs");
const path = require("path");

const SITE = path.join(__dirname, "..", "cfc-site");
const ORIGIN = "https://cycleforchange.org";

/* the children, in the index's order, with what writes each one */
const CHILDREN = [
  ["sitemap-pages.xml", "hand-listed pages (home, field notes, guides, journal, resources)"],
  ["sitemap-events.xml", "/events/ and /towns/, written by scripts/build-events.js"],
  ["rides/sitemap.xml", "/rides/, written by tools/build-rides.js"],
  ["sitemap-calendar.xml", "/events/2027/, written by scripts/build-calendar.js"],
];

/* the newest YYYY-MM-DD lastmod in a urlset, or null */
function newestLastmod(xml) {
  let best = null;
  for (const m of String(xml).matchAll(/<lastmod>\s*(\d{4}-\d{2}-\d{2})[^<]*<\/lastmod>/g)) if (!best || m[1] > best) best = m[1];
  return best;
}

function indexXml(entries) {
  const pad = Math.max(...CHILDREN.map(([f]) => f.length));
  const out = ['<?xml version="1.0" encoding="UTF-8"?>'];
  out.push("<!-- Sitemap index, written by scripts/sitemap-index.js from its children (each lastmod = the newest");
  out.push("     lastmod inside that child). Don't hand-edit; run any generator, or node scripts/sitemap-index.js.");
  for (const [f, what] of CHILDREN) out.push(`     - ${f.padEnd(pad)}  ${what}`);
  out[out.length - 1] += " -->";
  out.push('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  for (const e of entries) {
    out.push("  <sitemap>");
    out.push(`    <loc>${ORIGIN}/${e.file}</loc>`);
    if (e.lastmod) out.push(`    <lastmod>${e.lastmod}</lastmod>`);
    out.push("  </sitemap>");
  }
  out.push("</sitemapindex>");
  return out.join("\n") + "\n";
}

function run({ site = SITE, quiet = false } = {}) {
  const entries = [];
  for (const [file] of CHILDREN) {
    const p = path.join(site, file);
    if (!fs.existsSync(p)) continue;
    entries.push({ file, lastmod: newestLastmod(fs.readFileSync(p, "utf8")) });
  }
  const xml = indexXml(entries);
  const dest = path.join(site, "sitemap.xml");
  const before = fs.existsSync(dest) ? fs.readFileSync(dest, "utf8") : "";
  if (before !== xml) fs.writeFileSync(dest, xml);
  if (!quiet) console.log(`sitemap index: ${entries.map((e) => `${e.file} ${e.lastmod || "—"}`).join(", ")}`);
  return entries;
}

module.exports = { run, newestLastmod, indexXml, CHILDREN };
if (require.main === module) run();
