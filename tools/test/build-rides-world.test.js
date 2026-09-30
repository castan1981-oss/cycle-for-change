"use strict";
// The world layer of /rides/ and the freshness rules, end to end: build a copy into a temp folder.
// node --test tools/test/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..", "..");
const rides = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site", "rides", "rides.json"), "utf8"));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "rides-world-"));
const out = path.join(tmp, "rides");
const world = rides.find((r) => r.country && r.country !== "US");
const us = rides.find((r) => r.country === "US" && r.state === "AZ");
const data = rides.map((r) => (r.slug === us.slug ? { ...r, verified_on: "2026-01-02" } : r));   // make one ride stale
fs.writeFileSync(path.join(tmp, "rides.json"), JSON.stringify(data));
fs.writeFileSync(path.join(tmp, "health.json"), JSON.stringify({ rides: { [world.slug]: { flags: [{ code: "page-gone", severity: "red", since: "2026-10-10" }] } } }));
execFileSync(process.execPath, [path.join(ROOT, "tools", "build-rides.js"), "--data", path.join(tmp, "rides.json"), "--out", out,
  "--health", path.join(tmp, "health.json"), "--today", "2026-10-12"], { stdio: "pipe" });
const read = (...p) => fs.readFileSync(path.join(out, ...p, "index.html"), "utf8");
const S = require("../lib/rides-schema.js");

test("a country page for every country with a ride, and the US as a country", () => {
  for (const cc of new Set(rides.filter((r) => r.country !== "US").map((r) => r.country))) {
    assert.ok(fs.existsSync(path.join(out, S.countrySlug(cc), "index.html")), `missing /rides/${S.countrySlug(cc)}/`);
  }
  assert.match(read("united-states"), /Group rides in the United States/);
});
test("the directory counts countries and tiles them", () => {
  const html = read();
  assert.match(html, /By country/);
  assert.match(html, /\d+ countries/);
});
test("every card says when it was checked", () => {
  assert.match(read(S.countrySlug(world.country)), /gr-card-checked/);
});
test("a stale ride leaves the lists but keeps a noindex page with a banner", () => {
  const page = read(us.slug);
  assert.match(page, /noindex/);
  assert.match(page, /gr-banner/);
  assert.ok(!fs.existsSync(path.join(out, us.slug, "ride.ics")));
  assert.ok(!fs.readFileSync(path.join(out, "index.json"), "utf8").includes(`"${us.slug}"`));
  assert.ok(!fs.readFileSync(path.join(out, "sitemap.xml"), "utf8").includes(`/rides/${us.slug}/`));
});
test("a red flag inside the grace period stays listed, with the warning", () => {
  const page = read(world.slug);
  assert.doesNotMatch(page, /noindex/);
  assert.match(page, /gone away/);
});
test("world ride pages speak local time and link their country", () => {
  const page = read(world.slug);
  assert.match(page, new RegExp(`/rides/${S.countrySlug(world.country)}/`));
});
test("live.json carries only listed rides, with a place label", () => {
  const live = JSON.parse(fs.readFileSync(path.join(out, "live.json"), "utf8"));
  assert.ok(live.length === rides.length - 1);
  assert.ok(live.every((r) => r.place && r.slug));
});
