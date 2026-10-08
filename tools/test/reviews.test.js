"use strict";
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs"), os = require("os"), path = require("path");
const RV = require("../lib/reviews.js");
const { issueBody } = require("../reviews-pull.js");

const SLUGS = new Set(["scottsdale-az-bicycle-haus-friday-shop-ride"]);
const sub = (data, extra = {}) => ({ id: "64f1a2b3c4d5e6f708192a3b", created_at: "2026-10-09T16:02:00.000Z", data: { ride: "scottsdale-az-bicycle-haus-friday-shop-ride", again: "yes", pace: "right", name: "Dana", from: "Tempe", words: "Nobody made me feel new. They waited at the top.", ...data }, ...extra });

test("a good review comes through as written", () => {
  const c = RV.clean(sub({}), SLUGS);
  assert.ok(c.ok);
  assert.deepStrictEqual(c.review, { id: "64f1a2b3c4d5e6f708192a3b", slug: "scottsdale-az-bicycle-haus-friday-shop-ride", name: "Dana", from: "Tempe", again: "yes", pace: "right", words: "Nobody made me feel new. They waited at the top.", date: "2026-10-09" });
  assert.deepStrictEqual(c.flags, []);
});
test("links, emails and phone numbers come out, and say so", () => {
  const c = RV.clean(sub({ words: "Great ride, see www.myshop.com or mail me a@b.com or call 480-555-1212 anytime" }), SLUGS);
  assert.ok(c.ok);
  assert.ok(!/myshop|@|555/.test(c.review.words), c.review.words);
  assert.ok(c.flags.some((f) => /link/.test(f)));
});
test("refuses what isn't a review", () => {
  assert.strictEqual(RV.clean(sub({ ride: "nope" }), SLUGS).ok, false);
  assert.strictEqual(RV.clean(sub({ again: "" }), SLUGS).ok, false);
  assert.strictEqual(RV.clean(sub({ words: "fun" }), SLUGS).ok, false);
  assert.strictEqual(RV.clean(sub({ name: "  " }), SLUGS).ok, false);
  assert.strictEqual(RV.clean(sub({ "bot-field": "x" }), SLUGS).ok, false);
});
test("a pace that isn't one of the three is dropped, not guessed", () => {
  assert.strictEqual(RV.clean(sub({ pace: "fast" }), SLUGS).review.pace, null);
});
test("mental-health words are flagged for a person, not removed", () => {
  const c = RV.clean(sub({ words: "This ride helped my anxiety more than anything else this year." }), SLUGS);
  assert.ok(c.ok);
  assert.match(c.review.words, /anxiety/);
  assert.ok(c.flags.some((f) => /mental-health/.test(f)));
});
test("summary: the pace most riders named, only when it's at least half", () => {
  const mk = (again, pace) => ({ again, pace });
  assert.deepStrictEqual(RV.summary([mk("yes", "right"), mk("yes", "right"), mk("no", "harder")]), { n: 3, yes: 2, pace: "right", paceN: 2, paceAll: 3 });
  assert.strictEqual(RV.summary([mk("yes", "right"), mk("yes", "harder")]).pace, null);
  assert.strictEqual(RV.againText(RV.summary([mk("yes"), mk("yes")])), "all 2 would ride it again");
  assert.strictEqual(RV.againText(RV.summary([mk("yes"), mk("no"), mk("yes")])), "2 of 3 would ride it again");
});
test("an issue round-trips into data/ride-reviews.json once", () => {
  const c = RV.clean(sub({ words: "Long ride -- worth it, waited at every turn." }), SLUGS);
  const body = issueBody(c.review, { name: "Friday Shop Ride", city: "Scottsdale" }, c.flags);
  assert.ok(!/-->[\s\S]*-->[\s\S]*-->/.test(body.split("review-json")[1] || "") );
  const { post } = require("../reviews-post.js");
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "rv-")), "r.json");
  fs.writeFileSync(file, "[]");
  const a = post(body, file), b = post(body, file);
  assert.ok(a.ok && !a.already && b.already);
  const list = JSON.parse(fs.readFileSync(file, "utf8"));
  assert.strictEqual(list.length, 1);
  assert.strictEqual(list[0].words, "Long ride -- worth it, waited at every turn.");
});
