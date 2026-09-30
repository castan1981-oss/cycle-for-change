"use strict";
// node --test tools/test/
const test = require("node:test");
const assert = require("node:assert");
const F = require("../lib/rides-freshness.js");
const T = "2026-10-01";
const ride = (o = {}) => ({ slug: "x", name: "X", city: "C", status: "active", confidence: "high", verified_on: "2026-09-20", ...o });

test("fresh within 90 days", () => {
  const a = F.assess(ride(), null, T);
  assert.equal(a.state, "fresh"); assert.equal(a.listed, true); assert.equal(a.label_short, "Checked Sep 20"); assert.equal(a.label, "Checked Sep 20, 2026");
});
test("due between 90 and 150 days, still listed with a nudge", () => {
  const a = F.assess(ride({ verified_on: "2026-06-01" }), null, T);
  assert.equal(a.state, "due"); assert.equal(a.listed, true); assert.match(a.nudge, /Last checked 122 days ago/);
});
test("stale past 150 days: off the lists, noindex, banner", () => {
  const a = F.assess(ride({ verified_on: "2026-04-01" }), null, T);
  assert.equal(a.state, "stale"); assert.equal(a.listed, false); assert.equal(a.indexable, false); assert.match(a.banner, /Apr 1, 2026/);
});
test("a recent feed hit keeps an old ride fresh", () => {
  const a = F.assess(ride({ verified_on: "2026-03-01" }), { feed_seen: "2026-09-28" }, T);
  assert.equal(a.state, "fresh"); assert.equal(a.checked_by, "feed"); assert.equal(a.checked_on, "2026-09-28");
});
test("an old feed hit does not count", () => {
  const a = F.assess(ride({ verified_on: "2026-03-01" }), { feed_seen: "2026-08-01" }, T);
  assert.equal(a.state, "stale");
});
test("red flag: listed with warning during grace, hidden after", () => {
  const h = { flags: [{ code: "page-gone", severity: "red", since: "2026-09-25", detail: "404" }] };
  let a = F.assess(ride(), h, T);
  assert.equal(a.state, "flagged"); assert.equal(a.listed, true); assert.equal(a.priority, F.QUEUE.red); assert.match(a.nudge, /gone away/);
  a = F.assess(ride(), h, "2026-10-20");
  assert.equal(a.listed, false); assert.ok(a.banner);
});
test("a flag older than the last check is resolved", () => {
  const h = { flags: [{ code: "page-gone", severity: "red", since: "2026-09-10" }] };
  assert.equal(F.assess(ride(), h, T).state, "fresh");
});
test("a feed hit does not clear a red flag", () => {
  const h = { feed_seen: "2026-09-30", flags: [{ code: "end-words", severity: "red", since: "2026-09-26" }] };
  assert.equal(F.assess(ride({ verified_on: "2026-09-01" }), h, T).state, "flagged");
});
test("rider report outranks everything", () => {
  const h = { reports: [{ date: "2026-09-29", type: "gone", note: "nobody showed" }] };
  const a = F.assess(ride(), h, T);
  assert.equal(a.priority, F.QUEUE.report); assert.match(a.nudge, /may have stopped/);
});
test("still-on report is not a bad report", () => {
  const h = { reports: [{ date: "2026-09-29", type: "still-on" }] };
  assert.equal(F.assess(ride(), h, T).state, "fresh");
});
test("amber flag keeps listing, asks to confirm", () => {
  const h = { flags: [{ code: "schedule-text-changed", severity: "amber", since: "2026-09-28" }] };
  const a = F.assess(ride(), h, T);
  assert.equal(a.state, "flagged"); assert.equal(a.listed, true); assert.match(a.nudge, /changed their page on Sep 28/);
});
test("paused and ended are unlisted", () => {
  assert.equal(F.assess(ride({ status: "paused", status_since: "2026-09-01" }), null, T).listed, false);
  const e = F.assess(ride({ status: "ended", status_since: "2025-08-01" }), null, T);
  assert.equal(e.state, "ended"); assert.equal(e.expired, true);
});
test("low confidence is listed but queued ahead of fresh", () => {
  const a = F.assess(ride({ confidence: "low" }), null, T);
  assert.equal(a.listed, true); assert.equal(a.priority, F.QUEUE.low);
});
test("never checked is stale", () => {
  assert.equal(F.assess(ride({ verified_on: null }), null, T).state, "stale");
});
test("queue order", () => {
  const rides = [ride({ slug: "fresh" }), ride({ slug: "due", verified_on: "2026-06-01" }), ride({ slug: "stale", verified_on: "2026-01-01" }), ride({ slug: "rep" })];
  const q = F.queue(rides, { rep: { reports: [{ date: "2026-09-30", type: "changed" }] } }, T);
  assert.deepEqual(q.map((x) => x.slug), ["rep", "due", "stale", "fresh"]);
});
test("short label shows the year once it is old", () => {
  assert.equal(F.fmt("2025-12-01", { short: true, today: "2026-09-30" }), "Dec 2025");
  assert.equal(F.fmt("2026-03-01", { short: true, today: "2026-09-30" }), "Mar 1");
});
