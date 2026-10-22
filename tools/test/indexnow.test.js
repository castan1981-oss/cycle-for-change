"use strict";
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs"), path = require("path");
const IN = require("../../netlify/functions/lib/indexnow.js");

const INDEX = `<?xml version="1.0"?><sitemapindex>
  <sitemap><loc>https://cycleforchange.org/sitemap-pages.xml</loc><lastmod>2026-10-06</lastmod></sitemap>
  <sitemap><loc>https://cycleforchange.org/rides/sitemap.xml</loc></sitemap>
</sitemapindex>`;
const PAGES = `<urlset><url><loc>https://cycleforchange.org/guides/</loc><lastmod>2026-10-19</lastmod></url>
  <url><loc>https://cycleforchange.org/privacy/</loc><lastmod>2026-10-01</lastmod></url></urlset>`;
const RIDES = `<urlset><url><loc>https://cycleforchange.org/rides/a/</loc><lastmod>2026-10-20T08:00:00Z</lastmod></url>
  <url><loc>https://cycleforchange.org/rides/b/</loc></url>
  <url><loc>https://example.com/not-ours/</loc><lastmod>2026-10-21</lastmod></url></urlset>`;
const FILES = { "https://cycleforchange.org/sitemap.xml": INDEX, "https://cycleforchange.org/sitemap-pages.xml": PAGES, "https://cycleforchange.org/rides/sitemap.xml": RIDES };
const getText = async (u) => { if (!(u in FILES)) throw new Error("404"); return FILES[u]; };

test("the key file is published and holds the key", () => {
  const file = path.join(__dirname, "..", "..", "cfc-site", IN.KEY + ".txt");
  assert.strictEqual(fs.readFileSync(file, "utf8").trim(), IN.KEY);
  assert.match(IN.KEY, /^[0-9a-f]{32}$/);
  assert.strictEqual(IN.KEY_LOCATION, `https://cycleforchange.org/${IN.KEY}.txt`);
});

test("reads the index and every child sitemap", async () => {
  const list = await IN.collect(getText);
  assert.deepStrictEqual(list.map((e) => e.loc), [
    "https://cycleforchange.org/guides/", "https://cycleforchange.org/privacy/",
    "https://cycleforchange.org/rides/a/", "https://cycleforchange.org/rides/b/", "https://example.com/not-ours/",
  ]);
  assert.strictEqual(list[2].lastmod, "2026-10-20");
});

test("a missing child sitemap is skipped, not fatal", async () => {
  const list = await IN.collect(async (u) => (u.endsWith("/sitemap.xml") && !u.includes("rides") ? INDEX.replace("rides/sitemap", "gone") : getText(u)));
  assert.deepStrictEqual(list.map((e) => e.loc), ["https://cycleforchange.org/guides/", "https://cycleforchange.org/privacy/"]);
});

test("picks only our own changed URLs, plus the always-list, once each", async () => {
  const urls = IN.pick(await IN.collect(getText), { since: "2026-10-19" });
  assert.deepStrictEqual(urls, [...IN.ALWAYS, "https://cycleforchange.org/guides/", "https://cycleforchange.org/rides/a/"]);
});

test("--all sends every URL we own, nothing of anyone else's", async () => {
  const urls = IN.pick(await IN.collect(getText), { since: null });
  assert.ok(urls.includes("https://cycleforchange.org/rides/b/"));
  assert.ok(!urls.some((u) => u.includes("example.com")));
  assert.strictEqual(new Set(urls).size, urls.length);
});

test("the request body follows the protocol and batches stay under 10,000", () => {
  const b = IN.body(["https://cycleforchange.org/"]);
  assert.deepStrictEqual(Object.keys(b), ["host", "key", "keyLocation", "urlList"]);
  assert.strictEqual(b.host, "cycleforchange.org");
  const big = Array.from({ length: 23001 }, (_, i) => `https://cycleforchange.org/x/${i}/`);
  assert.deepStrictEqual(IN.batches(big).map((x) => x.length), [10000, 10000, 3001]);
});

test("submit posts each batch and reports the status", async () => {
  const calls = [];
  const fake = async (url, opts) => { calls.push({ url, body: JSON.parse(opts.body) }); return { status: 202 }; };
  const res = await IN.submit(["https://cycleforchange.org/"], fake);
  assert.deepStrictEqual(res, [{ count: 1, status: 202 }]);
  assert.strictEqual(calls[0].url, "https://api.indexnow.org/indexnow");
  assert.strictEqual(calls[0].body.key, IN.KEY);
});

test("daysAgo is a plain date", () => {
  assert.strictEqual(IN.daysAgo(2, Date.parse("2026-10-21T15:00:00Z")), "2026-10-19");
});

test("the deploy function skips previews", async () => {
  const fn = require("../../netlify/functions/deploy-succeeded.js");
  const res = await fn.handler({ body: JSON.stringify({ payload: { context: "deploy-preview" } }) });
  assert.strictEqual(res.statusCode, 200);
  assert.match(res.body, /skipped deploy-preview/);
});
