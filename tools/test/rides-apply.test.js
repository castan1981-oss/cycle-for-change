"use strict";
// tools/rides-apply.js — node --test tools/test/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const A = require("../rides-apply.js");

const T = "2026-10-05";
const ride = (o = {}) => ({
  slug: "tempe-az-bean-cafe-saturday-social", name: "Bean Café Saturday Social", name_en: null, kind: "group-ride", status: "active",
  status_note: null, status_since: null, city: "Tempe", neighborhood: null, region: "Arizona", state: "AZ", country: "US",
  lat: 33.42, lng: -111.94, geo_precision: "start", tz: "America/Phoenix", discipline: ["road"],
  schedule: "Every Saturday, roll 7:00 am", days: ["sat"], time_local: "7:00 am", start_hhmm: "07:00", frequency: "weekly",
  monthly_rule: null, season: "year-round", season_months: null, start_location: { name: "Bean Café", address: "1 Mill Ave, Tempe, AZ" },
  distance_km: null, distance_miles: "25", duration: "~2 hours", duration_min: 120, pace: "16–18 mph", drop_policy: "no-drop",
  host: { name: "Bean Café", type: "cafe" }, founded_year: null, founded_note: null, cost: "free", language: ["en"], visitor_notes: null,
  description: "A no-drop Saturday road ride from the café, out along the canal paths and back for coffee.",
  links: { website: "https://example.org/rides", instagram: null, facebook: null, strava: null, meetup: null, other: [] },
  inclusive_focus: [], sources: ["https://example.org/rides"], verified_on: "2026-08-01", last_seen: "2026-07-26", evidence: "Old.",
  confidence: "high", refresh: { method: "static-page", watch_url: "https://example.org/rides", feed_url: null, notes: null }, ...o,
});
const other = ride({ slug: "tempe-az-mill-night-roll", name: "Mill Avenue Night Roll", days: ["wed"], schedule: "Every Wednesday, roll 7:30 pm", time_local: "7:30 pm", start_hhmm: "19:30" });
const health = () => ({ generated_at: "2026-10-05T09:00:00Z", rides: {
  [ride().slug]: { flags: [{ code: "page-gone", severity: "red", since: "2026-10-05", detail: "404" }, { code: "schedule-text-changed", severity: "amber", since: "2026-10-12", detail: "later" }],
    feed_candidate: { url: "https://example.org/events/?ical=1", found: "2026-10-05", next: "2026-10-10" } },
} });
const run = (entries, o = {}) => A.apply(entries, { rides: [ride(), other], health: health(), today: T, geocode: false, ...o });
const get = (res, slug = ride().slug) => res.rides.find((r) => r.slug === slug);

test("confirmed: the clock moves, evidence and sources update, flags up to the check resolve", () => {
  const res = run([{ slug: ride().slug, outcome: "confirmed", checked_on: "2026-10-05", last_seen: "2026-10-04", evidence: "The café's page lists the ride for Sat Oct 10, 2026 (fetched Oct 5, 2026).", sources: ["https://example.org/rides", "https://example.org/events"] }]);
  assert.ok(res.ok, res.errors.join("\n"));
  const r = get(res);
  assert.equal(r.verified_on, "2026-10-05");
  assert.equal(r.last_seen, "2026-10-04");
  assert.match(r.evidence, /Sat Oct 10/);
  assert.deepEqual(r.sources, ["https://example.org/rides", "https://example.org/events"]);
  const flags = res.health.rides[ride().slug].flags;
  assert.equal(flags[0].resolved, true);
  assert.equal(flags[0].resolved_by, "re-check");
  assert.equal(flags[1].resolved, undefined, "a flag raised after the check stays open");
  assert.equal(res.changelog[0].outcome, "confirmed");
  assert.match(res.summary, /1 confirmed/);
  assert.equal(get(res, other.slug).verified_on, "2026-08-01", "other rides untouched");
});

test("changed: only whitelisted fields, objects merge, derive runs, the summary says what moved", () => {
  const res = run([{ slug: ride().slug, outcome: "changed", checked_on: "2026-10-05", evidence: "The page now says roll 7:30 am from Oct 3 (fetched Oct 5, 2026).",
    changes: { schedule: "Every Saturday, roll 7:30 am", time_local: "7:30 am", start_hhmm: "07:30", links: { instagram: "https://www.instagram.com/beancafe/" } } }]);
  assert.ok(res.ok, res.errors.join("\n"));
  const r = get(res);
  assert.equal(r.start_hhmm, "07:30");
  assert.equal(r.links.website, "https://example.org/rides", "links merged, not replaced");
  assert.equal(r.links.instagram, "https://www.instagram.com/beancafe/");
  assert.equal(r.verified_on, "2026-10-05");
  assert.match(res.summary, /start_hhmm: 07:00 → 07:30/);
  const bad = run([{ slug: ride().slug, outcome: "changed", checked_on: "2026-10-05", evidence: "x", changes: { verified_on: "2026-10-05", slug: "new-slug" } }]);
  assert.equal(bad.ok, false);
  assert.ok(bad.errors.some((e) => /"verified_on" can't be changed/.test(e)));
});

test("a new time the schedule text doesn't carry is refused (derive reads the text)", () => {
  const res = run([{ slug: ride().slug, outcome: "changed", checked_on: "2026-10-05", evidence: "x", changes: { start_hhmm: "07:30" } }]);
  assert.equal(res.ok, false);
  assert.ok(res.errors.some((e) => /derive-ride-fields reads 07:00/.test(e)));
});

test("seasonal-break, paused and ended need a status note and set the status", () => {
  let res = run([{ slug: ride().slug, outcome: "paused", checked_on: "2026-10-05", evidence: "The café says rides are off while they renovate." }]);
  assert.equal(res.ok, false);
  assert.ok(res.errors.some((e) => /status_note/.test(e)));
  res = run([{ slug: ride().slug, outcome: "seasonal-break", checked_on: "2026-10-05", evidence: "The club's page says the series ends Oct 1 and returns in April.", status_note: "Back in April." }]);
  assert.ok(res.ok, res.errors.join("\n"));
  assert.equal(get(res).status, "seasonal-break");
  assert.equal(get(res).status_since, "2026-10-05");
  assert.equal(get(res).verified_on, "2026-10-05");
  res = run([{ slug: ride().slug, outcome: "ended", checked_on: "2026-10-05", status_since: "2026-09-01", evidence: "The café posted on Sept 1, 2026 that the ride is over.", status_note: "The café stopped the ride in September 2026." }]);
  assert.ok(res.ok, res.errors.join("\n"));
  assert.equal(get(res).status, "ended");
  assert.equal(get(res).status_since, "2026-09-01");
});

test("unreachable changes nothing but the changelog", () => {
  const res = run([{ slug: ride().slug, outcome: "unreachable", checked_on: "2026-10-05", note: "the page is behind a bot wall; no dated post found" }]);
  assert.ok(res.ok, res.errors.join("\n"));
  assert.deepEqual(get(res), { ...ride() });
  assert.equal(res.health.rides[ride().slug].flags[0].resolved, undefined, "nobody confirmed anything");
  assert.equal(res.changelog[0].outcome, "unreachable");
});

test("evidence is required, dates can't be in the future, slugs must exist, no ride twice", () => {
  const res = run([
    { slug: ride().slug, outcome: "confirmed", checked_on: "2026-10-05" },
    { slug: "nope", outcome: "confirmed", checked_on: "2026-10-05", evidence: "x" },
    { slug: other.slug, outcome: "confirmed", checked_on: "2026-10-09", evidence: "x" },
    { slug: other.slug, outcome: "bogus", checked_on: "2026-10-05", evidence: "x" },
  ]);
  assert.equal(res.ok, false);
  assert.ok(res.errors.some((e) => /evidence is required/.test(e)));
  assert.ok(res.errors.some((e) => /no ride with slug "nope"/.test(e)));
  assert.ok(res.errors.some((e) => /after today/.test(e)));
  assert.ok(res.errors.some((e) => /appears twice/.test(e)));
  assert.ok(res.errors.some((e) => /outcome "bogus"/.test(e)));
});

test("new: a whole record that passes the validator, with a new slug", () => {
  const rec = ride({ slug: "tempe-az-new-sunday-spin", name: "Sunday Spin", days: ["sun"], schedule: "Every Sunday, roll 8:00 am", time_local: "8:00 am", start_hhmm: "08:00", verified_on: "2026-10-05", last_seen: "2026-10-04", evidence: "Listed on the shop's page for Sun Oct 11 (fetched Oct 5, 2026)." });
  let res = run([{ slug: rec.slug, outcome: "new", checked_on: "2026-10-05", evidence: rec.evidence, record: rec }]);
  assert.ok(res.ok, res.errors.join("\n"));
  assert.ok(get(res, rec.slug));
  res = run([{ slug: ride().slug, outcome: "new", checked_on: "2026-10-05", evidence: "x", record: ride() }]);
  assert.equal(res.ok, false);
  assert.ok(res.errors.some((e) => /already listed/.test(e)));
  res = run([{ slug: "tempe-az-x", outcome: "new", checked_on: "2026-10-05", evidence: "x", record: { ...rec, slug: "tempe-az-x", kind: "race" } }]);
  assert.equal(res.ok, false);
  assert.ok(res.errors.some((e) => /kind "race"/.test(e)));
});

test("promote_feed puts the watcher's candidate in refresh.feed_url", () => {
  const res = run([{ slug: ride().slug, outcome: "confirmed", checked_on: "2026-10-05", evidence: "The feed lists Sat Oct 10.", promote_feed: true }]);
  assert.ok(res.ok, res.errors.join("\n"));
  assert.equal(get(res).refresh.feed_url, "https://example.org/events/?ical=1");
  const no = run([{ slug: other.slug, outcome: "confirmed", checked_on: "2026-10-05", evidence: "x", promote_feed: true }]);
  assert.equal(no.ok, false);
});

test("an error a ride already had doesn't block the batch; a new one does", () => {
  // derive fixes some old values on its own (frequency "seasonal" -> "weekly"), so the old problem is one it can't fix
  const broken = ride({ slug: "tempe-az-old-problem", drop_policy: "sometimes" });
  const res = A.apply([{ slug: broken.slug, outcome: "confirmed", checked_on: "2026-10-05", evidence: "Still on." }], { rides: [ride(), broken], health: null, today: T, geocode: false });
  assert.ok(res.ok, res.errors.join("\n"));
  assert.match(res.summary, /Already wrong before this re-check/);
  const res2 = run([{ slug: ride().slug, outcome: "changed", checked_on: "2026-10-05", evidence: "x", changes: { drop_policy: "sometimes" } }]);
  assert.equal(res2.ok, false);
});

test("the CLI writes rides.json, the health file and the changelog — or nothing at all", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "rides-apply-"));
  const p = (n) => path.join(dir, n);
  fs.writeFileSync(p("rides.json"), JSON.stringify([ride(), other], null, 1));
  fs.writeFileSync(p("health.json"), JSON.stringify(health(), null, 1));
  const cli = (batch, ...a) => { fs.writeFileSync(p("batch.json"), JSON.stringify(batch)); return spawnSync(process.execPath, [path.join(__dirname, "..", "rides-apply.js"), p("batch.json"), "--data", p("rides.json"), "--health", p("health.json"), "--changelog", p("changelog.json"), "--today", T, "--no-geocode", ...a], { encoding: "utf8" }); };
  const before = fs.readFileSync(p("rides.json"), "utf8");
  let r = cli([{ slug: ride().slug, outcome: "confirmed", checked_on: "2026-10-05" }]);
  assert.equal(r.status, 1);
  assert.equal(fs.readFileSync(p("rides.json"), "utf8"), before, "nothing written on error");
  assert.ok(!fs.existsSync(p("changelog.json")));
  r = cli([{ slug: ride().slug, outcome: "confirmed", checked_on: "2026-10-05", evidence: "Listed for Sat Oct 10." }], "--dry");
  assert.equal(r.status, 0);
  assert.equal(fs.readFileSync(p("rides.json"), "utf8"), before, "--dry writes nothing");
  r = cli([{ slug: ride().slug, outcome: "confirmed", checked_on: "2026-10-05", evidence: "Listed for Sat Oct 10." }]);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /## Ride re-check/);
  assert.equal(JSON.parse(fs.readFileSync(p("rides.json"), "utf8")).find((x) => x.slug === ride().slug).verified_on, "2026-10-05");
  assert.equal(JSON.parse(fs.readFileSync(p("changelog.json"), "utf8")).length, 1);
  assert.equal(JSON.parse(fs.readFileSync(p("health.json"), "utf8")).rides[ride().slug].flags[0].resolved_by, "re-check");
});
