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
test("the directory counts countries; the world page tiles them", () => {
  assert.match(read(), /\d+ countries/);
  assert.match(read(), /href="\/rides\/world\/"/);
  const html = read("world");
  assert.match(html, /Pick a country/);
  for (const cc of new Set(rides.filter((r) => r.country !== "US").map((r) => r.country))) assert.match(html, new RegExp(`href="/rides/${S.countrySlug(cc)}/"`));
});

// Pass 15 (Oct 1, 2026): step down, don't scroll.
const LIST_MAX = 12;
const pagesUnder = (dir, depth = 0) => fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory())
  .flatMap((e) => { const d = path.join(dir, e.name); return [...(fs.existsSync(path.join(d, "index.html")) ? [d] : []), ...(depth < 2 ? pagesUnder(d, depth + 1) : [])]; });
const allPages = [out, ...pagesUnder(out)];
const html = (d) => fs.readFileSync(path.join(d, "index.html"), "utf8");
test("no place page shows more than LIST_MAX rides before the reader picks something", () => {
  for (const d of allPages) {
    const h = html(d);
    if (/gr-sub-page|gr-all-page|class="wrap gr-ride"/.test(h)) continue;   // a pick was made, or it's a ride
    const n = (h.match(/<div class="gr-card"/g) || []).length;
    assert.ok(n <= LIST_MAX, `${path.relative(out, d) || "/rides/"} shows ${n} rows`);
  }
});
test("a big city is doorways: your bike, made for, which day, and the full list", () => {
  const big = JSON.parse(fs.readFileSync(path.join(out, "hubs.json"), "utf8")).find((h) => h.country === "US" && h.rides > LIST_MAX);
  const dir = path.join(out, big.state.toLowerCase(), big.key.slice(3));
  const h = html(dir);
  assert.match(h, /Your bike/); assert.match(h, /Which day/); assert.match(h, /class="gr-tile gr-door/);
  assert.ok(fs.existsSync(path.join(dir, "all", "index.html")));
  assert.match(html(path.join(dir, "all")), /id="gr-q"/, "the full list keeps search and filters");
});
test("every link inside /rides/ leads to a page that exists", () => {
  const missing = new Set();
  for (const d of allPages) {
    for (const m of html(d).matchAll(/href="(\/rides\/[^"#?]*)/g)) {
      const u = m[1];
      if (/\.(svg|css|js|json|xml|ics|png)$/.test(u)) continue;
      const p = path.join(out, u.replace(/^\/rides\//, ""));
      if (!fs.existsSync(path.join(p, "index.html"))) missing.add(`${u} (on ${path.relative(out, d) || "/rides/"})`);
    }
  }
  assert.deepEqual([...missing].slice(0, 10), []);
});
test("the explaining and the form live on their own pages", () => {
  assert.match(read("about"), /FAQPage/);
  assert.match(read("add"), /name="ride-report"/);
  assert.doesNotMatch(read(), /name="ride-report"/);
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
