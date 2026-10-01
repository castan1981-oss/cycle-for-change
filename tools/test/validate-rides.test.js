"use strict";
// tools/validate-rides.js — node --test tools/test/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const V = require("../validate-rides.js");

const T = "2026-09-30";
const ride = (o = {}) => ({
  slug: "tempe-az-bean-cafe-saturday-social", name: "Bean Café Saturday Social", name_en: null, kind: "group-ride", status: "active",
  status_note: null, status_since: null, city: "Tempe", neighborhood: null, region: "Arizona", state: "AZ", country: "US",
  lat: 33.42, lng: -111.94, geo_precision: "start", tz: "America/Phoenix", discipline: ["road"],
  schedule: "Every Saturday, roll 7:00 am", days: ["sat"], time_local: "7:00 am", start_hhmm: "07:00", frequency: "weekly",
  monthly_rule: null, season: "year-round", season_months: null, start_location: { name: "Bean Café", address: "1 Mill Ave, Tempe, AZ" },
  distance_km: null, distance_miles: "25–30", duration: "~2 hours", duration_min: 120, pace: "16–18 mph", drop_policy: "no-drop",
  host: { name: "Bean Café", type: "cafe" }, founded_year: null, founded_note: null, cost: "free", language: ["en"], visitor_notes: null,
  description: "A no-drop Saturday road ride from the café, out along the canal paths and back for coffee. Everyone welcome.",
  links: { website: "https://example.org/rides", instagram: null, facebook: null, strava: null, meetup: null, other: [] },
  inclusive_focus: ["no-drop"], sources: ["https://example.org/rides"], verified_on: "2026-09-15", last_seen: null, evidence: null,
  confidence: "high", refresh: { method: "static-page", watch_url: "https://example.org/rides", feed_url: null, notes: null }, ...o,
});
const codes = (r, today = T) => V.validateRide(r, { today }).errors.map((e) => e.code);
const warns = (r, today = T) => V.validateRide(r, { today }).warnings.map((e) => e.code);

test("a good record has no errors and no warnings", () => {
  const v = V.validateRide(ride(), { today: T });
  assert.deepEqual(v.errors, []);
  assert.deepEqual(v.warnings, []);
});
test("missing required fields", () => {
  for (const k of ["slug", "name", "kind", "status", "city", "country", "tz", "schedule", "frequency", "description", "verified_on", "confidence"]) {
    assert.ok(codes(ride({ [k]: "" })).includes("missing"), `blank ${k}`);
  }
  assert.ok(codes(ride({ discipline: [] })).includes("missing"));
  assert.ok(codes(ride({ days: [] })).includes("missing"));
  assert.ok(!codes(ride({ days: [], frequency: "irregular" })).includes("missing"), "irregular rides may have no day");
  assert.ok(codes(ride({ host: { name: "", type: "cafe" } })).includes("missing"));
  assert.ok(codes(ride({ host: { name: "X" } })).includes("missing"));
  assert.ok(codes(ride({ sources: ["not a url"] })).includes("missing"));
  assert.ok(codes(ride({ refresh: { watch_url: "https://x.org" } })).includes("missing"));
});
test("vocabularies", () => {
  assert.ok(codes(ride({ kind: "race" })).includes("vocab"));
  assert.ok(codes(ride({ frequency: "seasonal" })).includes("vocab"));
  assert.ok(codes(ride({ days: ["saturday"] })).includes("vocab"));
  assert.ok(codes(ride({ discipline: ["road", "unicycle"] })).includes("vocab"));
  assert.ok(codes(ride({ host: { name: "X", type: "bar" } })).includes("vocab"));
  assert.ok(codes(ride({ inclusive_focus: ["queer"] })).includes("vocab"));
  assert.ok(codes(ride({ refresh: { method: "rss", watch_url: "https://x.org" } })).includes("vocab"));
  assert.ok(codes(ride({ monthly_rule: [{ ord: 5, day: "fri" }] })).includes("vocab"));
});
test("slug format and uniqueness", () => {
  assert.ok(codes(ride({ slug: "Tempe--Ride" })).includes("slug"));
  const res = V.validateAll([ride(), ride()], { today: T });
  assert.equal(res.errors.filter((e) => e.code === "slug-duplicate").length, 1);
});
test("country, state, time zone, start time", () => {
  assert.ok(codes(ride({ country: "XX" })).includes("country"));
  assert.ok(codes(ride({ country: "EU" })).includes("country"));
  assert.ok(codes(ride({ state: "ZZ" })).includes("state"));
  assert.ok(codes(ride({ country: "GB", state: "AZ", tz: "Europe/London" })).includes("state"));
  assert.deepEqual(codes(ride({ country: "GB", state: null, tz: "Europe/London", region: "England" })), []);
  assert.ok(codes(ride({ tz: "Mars/Olympus" })).includes("tz"));
  assert.ok(codes(ride({ start_hhmm: "7:00" })).includes("start_hhmm"));
  assert.ok(codes(ride({ start_hhmm: "24:10" })).includes("start_hhmm"));
  assert.deepEqual(codes(ride({ start_hhmm: null })), []);
});
test("dates: real, and not after today", () => {
  assert.ok(codes(ride({ verified_on: "2026-02-30" })).includes("date"));
  assert.ok(codes(ride({ verified_on: "2026-10-02" })).includes("date-future"));
  assert.ok(codes(ride({ last_seen: "2027-01-01" })).includes("date-future"));
});
test("coordinates both or neither", () => {
  assert.ok(codes(ride({ lat: 33.4, lng: null })).includes("latlng"));
  assert.ok(codes(ride({ lat: 133.4, lng: -111 })).includes("latlng"));
  assert.ok(codes(ride({ lat: "33.4", lng: "-111.9" })).includes("latlng"));
  assert.deepEqual(codes(ride({ lat: null, lng: null })), []);
  assert.ok(warns(ride({ lat: null, lng: null })).includes("no-latlng"));
});
test("paused and ended need status_since", () => {
  assert.ok(codes(ride({ status: "paused" })).includes("status_since"));
  assert.ok(codes(ride({ status: "ended" })).includes("status_since"));
  assert.deepEqual(codes(ride({ status: "ended", status_since: "2026-09-01" })), []);
});
test("never an LGBTQ listing in a never-list country", () => {
  assert.ok(codes(ride({ country: "RU", state: null, tz: "Europe/Moscow", inclusive_focus: ["lgbtq"] })).includes("lgbtq-never-list"));
  assert.deepEqual(codes(ride({ inclusive_focus: ["lgbtq"] })), []);
});
test("banned phrases in the copy", () => {
  for (const bad of ["A vibrant ride", "riders passionate about coffee", "a hidden gem", "a must-visit loop", "bucket list climb", "$800 and two suitcases", "est. 2008", "ten years sober", "sober since 2010", "we leverage synergy"]) {
    assert.ok(codes(ride({ description: `${bad} — then coffee after the ride, every week, all paces.` })).includes("banned"), bad);
  }
  assert.ok(codes(ride({ visitor_notes: "Thrilled to announce winter hours" })).includes("banned"));
});
test("distances may be numbers or display text", () => {
  assert.deepEqual(codes(ride({ distance_miles: "~29" })), []);
  assert.deepEqual(codes(ride({ distance_km: 40, distance_miles: 25 })), []);
  assert.ok(codes(ride({ distance_miles: { a: 1 } })).includes("type"));
});
test("warnings", () => {
  assert.ok(warns(ride({ description: "Short." })).includes("description-length"));
  assert.ok(warns(ride({ description: "x".repeat(701) })).includes("description-length"));
  assert.ok(warns(ride({ confidence: "low" })).includes("low-confidence"));
  assert.ok(warns(ride({ sources: ["https://www.instagram.com/beancafe/"] })).includes("social-only"));
  assert.ok(warns(ride({ verified_on: "2026-03-01" })).includes("stale"));
  assert.ok(warns(ride({ refresh: { method: "static-page", watch_url: null } })).includes("no-watch-url"));
  const res = V.validateAll([ride(), ride({ slug: "tempe-az-bean-cafe-saturday-social-2", start_hhmm: "07:10" })], { today: T });
  assert.equal(res.warnings.filter((w) => w.code === "duplicate").length, 1);
  const apart = V.validateAll([ride(), ride({ slug: "tempe-az-bean-other", start_location: { name: "Park", address: "99 Rural Rd, Chandler" } })], { today: T });
  assert.equal(apart.warnings.filter((w) => w.code === "duplicate").length, 0, "different start points are different rides");
});
test("the CLI: errors exit 1, warnings exit 0 unless --strict, bad JSON exits 1", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "validate-rides-"));
  const file = (name, data) => { const p = path.join(dir, name); fs.writeFileSync(p, typeof data === "string" ? data : JSON.stringify(data)); return p; };
  const cli = (...a) => spawnSync(process.execPath, [path.join(__dirname, "..", "validate-rides.js"), "--today", T, ...a], { encoding: "utf8" });
  assert.equal(cli("--data", file("ok.json", [ride()])).status, 0);
  assert.equal(cli("--data", file("warn.json", [ride({ confidence: "low" })])).status, 0);
  assert.equal(cli("--data", file("warn2.json", [ride({ confidence: "low" })]), "--strict").status, 1);
  assert.equal(cli("--data", file("err.json", [ride({ kind: "race" })])).status, 1);
  assert.equal(cli("--data", file("bad.json", "{ nope")).status, 1);
  assert.equal(cli("--data", file("obj.json", { rides: [] })).status, 1);
  const j = JSON.parse(cli("--data", file("err2.json", [ride({ kind: "race" })]), "--json").stdout);
  assert.equal(j.errors[0].code, "vocab");
  assert.equal(j.counts.errors, 1);
});
