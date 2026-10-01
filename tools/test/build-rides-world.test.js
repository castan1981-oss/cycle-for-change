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
// a Saturday ride whose host publishes a table of start-time changes (start_times)
const sat = rides.find((r) => r.country === "US" && r.slug !== us.slug && r.frequency === "weekly" && !r.monthly_rule && !r.season_months
  && JSON.stringify(r.days) === '["sat"]' && r.start_hhmm && r.verified_on >= "2026-09-15");
const TABLE = [{ from: "2026-10-10", start_hhmm: "07:00" }, { from: "2026-11-14", start_hhmm: "07:30" }];
const data = rides.map((r) => (r.slug === us.slug ? { ...r, verified_on: "2026-01-02" }    // make one ride stale
  : r.slug === sat.slug ? { ...r, start_hhmm: "06:30", time_local: "6:30 am", start_times: TABLE } : r));
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

test("a host's table of start times: the lists show the time in force, the page and the calendar know the rest", () => {
  // --today 2026-10-12: the next Saturday is Oct 17, after the Oct 10 change
  const live = JSON.parse(fs.readFileSync(path.join(out, "live.json"), "utf8")).find((r) => r.slug === sat.slug);
  assert.equal(live.start_hhmm, "07:00");
  assert.equal(live.time_local, "7:00 am");
  assert.deepEqual(live.start_times, TABLE);
  const page = read(sat.slug);
  assert.match(page, /data-times="\[\[&quot;2026-10-10&quot;,&quot;07:00&quot;\]/);
  assert.match(page, /Then 7:30 am from Nov 14/);
  const ics = fs.readFileSync(path.join(out, sat.slug, "ride.ics"), "utf8").replace(/\r\n /g, "");
  const events = ics.split("BEGIN:VEVENT").slice(1);
  assert.equal(events.length, 2, "one VEVENT per start time still ahead");
  assert.match(events[0], /DTSTART;TZID=America\/[A-Za-z_]+:20261017T070000/);
  assert.match(events[1], /DTSTART;TZID=America\/[A-Za-z_]+:20261114T073000/);
  assert.match(events[0], /UNTIL=20261114T\d{6}Z/, "the first stretch ends before the change");
  assert.match(events[1], new RegExp(`UID:${sat.slug}-from-2026-11-14@`));
});
