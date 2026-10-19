// scripts/build-signals.js — llms.txt and feed.xml say what the site is, from the data, in the house voice.
const test = require("node:test");
const assert = require("node:assert/strict");
const S = require("../../scripts/build-signals.js");

const BANNED = /leverage|synergy|journey|passionate about|thrilled to announce|excited to share|canceled|cancelled|Nov(ember)? 7|pledge a mile|you decide/i;

test("llms.txt carries the counts and none of the banned words", () => {
  const c = S.counts();
  assert.ok(c.rides > 1000, "rides counted from live.json");
  assert.ok(c.events > 100, "events counted from the 2027 calendar");
  const txt = S.llms(c);
  assert.match(txt, /^# Cycle for Change\n/);
  assert.match(txt, /^> cycleforchange\.org is a group-ride finder/m);
  assert.ok(txt.includes(c.rides.toLocaleString("en-US")), "the ride count is in the summary");
  assert.doesNotMatch(txt, BANNED);
  assert.doesNotMatch(txt, /10,000 miles for queer/i);
  assert.doesNotMatch(txt, /\b\d{1,3}(,\d{3})? of 10,000\b/, "miles are never shown against 10,000");
  assert.match(txt, /988/);
});

test("feed.xml lists the pieces, newest first, and never a ride page or a noindex page", () => {
  const items = S.feedItems();
  assert.ok(items.length >= 20 && items.length <= 60);
  for (let i = 1; i < items.length; i++) assert.ok((items[i - 1].date || "") >= (items[i].date || ""), "newest first");
  for (const it of items) {
    assert.doesNotMatch(it.path, /^\/rides\//);
    assert.doesNotMatch(it.path, /^\/nov7\//);
    assert.doesNotMatch(it.path, /^\/events\/2027\//);
    assert.ok(it.title && !/— Cycle for Change$/.test(it.title), `title without the brand suffix: ${it.title}`);
  }
  const xml = S.feed(items, S.counts());
  assert.match(xml, /<rss version="2.0"/);
  assert.equal((xml.match(/<item>/g) || []).length, items.length);
  assert.doesNotMatch(xml, BANNED);
});
