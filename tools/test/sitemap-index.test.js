"use strict";
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const SI = require("../../scripts/sitemap-index.js");

test("newestLastmod takes the latest date and ignores times", () => {
  const xml = "<url><lastmod>2026-10-01</lastmod></url><url><lastmod>2026-10-19T08:00:00Z</lastmod></url><url><lastmod>2026-09-30</lastmod></url>";
  assert.strictEqual(SI.newestLastmod(xml), "2026-10-19");
  assert.strictEqual(SI.newestLastmod("<urlset></urlset>"), null);
});

test("the index lists each child that exists with its newest lastmod, never today", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "si-"));
  fs.mkdirSync(path.join(dir, "rides"));
  fs.writeFileSync(path.join(dir, "sitemap-pages.xml"), "<urlset><url><loc>x</loc><lastmod>2026-10-23</lastmod></url></urlset>");
  fs.writeFileSync(path.join(dir, "rides", "sitemap.xml"), "<urlset><url><loc>a</loc><lastmod>2026-10-01</lastmod></url><url><loc>b</loc><lastmod>2026-10-25</lastmod></url></urlset>");
  fs.writeFileSync(path.join(dir, "sitemap-calendar.xml"), "<urlset><url><loc>c</loc></url></urlset>");
  const entries = SI.run({ site: dir, quiet: true });
  assert.deepStrictEqual(entries, [
    { file: "sitemap-pages.xml", lastmod: "2026-10-23" },
    { file: "rides/sitemap.xml", lastmod: "2026-10-25" },
    { file: "sitemap-calendar.xml", lastmod: null },
  ]);
  const xml = fs.readFileSync(path.join(dir, "sitemap.xml"), "utf8");
  assert.match(xml, /<loc>https:\/\/cycleforchange\.org\/rides\/sitemap\.xml<\/loc>\n    <lastmod>2026-10-25<\/lastmod>/);
  assert.match(xml, /<loc>https:\/\/cycleforchange\.org\/sitemap-calendar\.xml<\/loc>\n  <\/sitemap>/);
  assert.doesNotMatch(xml, /sitemap-events\.xml<\/loc>/);
  // running again on the same children changes nothing
  const mtime = fs.statSync(path.join(dir, "sitemap.xml")).mtimeMs;
  SI.run({ site: dir, quiet: true });
  assert.strictEqual(fs.statSync(path.join(dir, "sitemap.xml")).mtimeMs, mtime);
});

test("the live index matches its children", () => {
  const site = path.join(__dirname, "..", "..", "cfc-site");
  const xml = fs.readFileSync(path.join(site, "sitemap.xml"), "utf8");
  for (const [file] of SI.CHILDREN) {
    const p = path.join(site, file);
    if (!fs.existsSync(p)) continue;
    const want = SI.newestLastmod(fs.readFileSync(p, "utf8"));
    const re = new RegExp(`<loc>https://cycleforchange\\.org/${file.replace(/[./]/g, "\\$&")}</loc>\\n    <lastmod>([^<]+)</lastmod>`);
    assert.strictEqual((xml.match(re) || [])[1], want, file);
  }
});
