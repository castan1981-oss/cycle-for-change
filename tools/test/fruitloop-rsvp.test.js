"use strict";
// The Fruit Loop RSVP (Oct 30, 2026): netlify/functions/lib/fruitloop-rsvp.js and the /api/rsvp door.
const test = require("node:test");
const assert = require("node:assert");
const L = require("../../netlify/functions/lib/fruitloop-rsvp.js");
const blobs = require("../../netlify/functions/lib/blobs.js");

function memStore() {
  const m = new Map();
  return {
    m,
    async set(k, v) { m.set(k, String(v)); },
    async setJSON(k, v) { m.set(k, JSON.stringify(v)); },
    async get(k, o) { if (!m.has(k)) return null; return o && o.type === "json" ? JSON.parse(m.get(k)) : m.get(k); },
    async delete(k) { m.delete(k); },
    async list(o) { const p = (o && o.prefix) || ""; return { blobs: [...m.keys()].filter((k) => k.startsWith(p)).map((key) => ({ key, etag: "x" })), directories: [] }; },
  };
}
const at = (iso) => Date.parse(iso);

test("the next ride is Fri, Dec 11 until that ride's coffee is done, then the Friday after", () => {
  assert.strictEqual(L.nextRide(at("2026-10-30T12:00:00Z")), "2026-12-11");
  assert.strictEqual(L.nextRide(at("2026-12-12T03:44:00Z")), "2026-12-11");   // 8:44 pm Phoenix, Dec 11
  assert.strictEqual(L.nextRide(at("2026-12-12T03:45:00Z")), "2026-12-18");   // 8:45 pm
  assert.strictEqual(L.nextRide(at("2027-01-02T12:00:00Z")), "2027-01-08");
});

test("the page's Friday is kept when it's a ride day ahead, else it's the next ride", () => {
  const now = at("2026-10-30T12:00:00Z");
  assert.strictEqual(L.pickDate("2026-12-11", now), "2026-12-11");
  assert.strictEqual(L.pickDate("2026-12-18", now), "2026-12-18");
  assert.strictEqual(L.pickDate("2026-12-04", now), "2026-12-11");   // before the first ride
  assert.strictEqual(L.pickDate("2026-12-12", now), "2026-12-11");   // a Saturday
  assert.strictEqual(L.pickDate("2027-03-05", now), "2026-12-11");   // more than eight weeks past the next
  assert.strictEqual(L.pickDate("2026-02-30", now), "2026-12-11");
  assert.strictEqual(L.pickDate(undefined, now), "2026-12-11");
  assert.strictEqual(L.pickDate("2026-12-11", at("2026-12-12T04:00:00Z")), "2026-12-18");   // a tab left open past the ride
});

test("yes and no carry nothing about the person; maybe needs a name and an email or a phone", () => {
  const yes = L.clean({ a: "going", id: "abcDEF123_-x", name: "Sam", email: "s@x.co" });
  assert.deepStrictEqual(yes, { ok: true, a: "going", id: "abcDEF123_-x", bot: false, contact: null });
  assert.strictEqual(L.clean({ a: "yes" }).a, "going");
  assert.strictEqual(L.clean({ a: "no" }).a, "not");
  assert.ok(/^[A-Za-z0-9_-]{20}$/.test(L.clean({ a: "not", id: "bad id!" }).id));
  assert.deepStrictEqual(L.clean({ a: "sure" }), { ok: false, error: "answer" });
  assert.deepStrictEqual(L.clean({ a: "maybe", email: "a@b.co" }), { ok: false, error: "name" });
  assert.deepStrictEqual(L.clean({ a: "maybe", name: "Sam" }), { ok: false, error: "contact" });
  assert.deepStrictEqual(L.clean({ a: "maybe", name: "Sam", email: "nope" }), { ok: false, error: "email" });
  assert.deepStrictEqual(L.clean({ a: "maybe", name: "Sam", phone: "12" }), { ok: false, error: "phone" });
  const m = L.clean({ a: "maybe", id: "abcdefgh", name: "  Sam <b>  R ", email: " Sam@X.co ", phone: "(602) 555-0100 ext" });
  assert.deepStrictEqual(m.contact, { name: "Sam b R", email: "sam@x.co", phone: "(602) 555-0100" });
  assert.strictEqual(L.clean({ a: "going", website: "http://spam" }).bot, true);
});

test("only the site's own pages can post", () => {
  assert.ok(L.originOk({ origin: "https://cycleforchange.org" }));
  assert.ok(L.originOk({ referer: "https://www.cycleforchange.org/fruitloop/rsvp/" }));
  assert.ok(L.originOk({ origin: "https://deploy-preview-230--cycleforchange.netlify.app" }));
  assert.ok(!L.originOk({ origin: "https://evil.example" }));
  assert.ok(!L.originOk({}));
});

test("previews never write to the real tally", () => {
  assert.strictEqual(L.storeName({ host: "cycleforchange.org" }), "fruitloop-rsvp");
  assert.strictEqual(L.storeName({ "x-forwarded-host": "www.cycleforchange.org" }), "fruitloop-rsvp");
  assert.strictEqual(L.storeName({ "x-nf-deploy-context": "production", host: "x.netlify.app" }), "fruitloop-rsvp");
  assert.strictEqual(L.storeName({ "x-nf-deploy-context": "deploy-preview", host: "deploy-preview-9--x.netlify.app" }), "fruitloop-rsvp-preview");
  assert.strictEqual(L.storeName({ host: "localhost:8888" }), "fruitloop-rsvp-preview");
});

test("the key is checked against its hash, never stored", () => {
  assert.ok(!L.keyOk("short"));
  assert.ok(!L.keyOk("x".repeat(32)));
  assert.ok(!L.keyOk(undefined));
});

test("a second tap from the same browser changes the answer instead of adding one", async () => {
  const s = memStore(), now = at("2026-10-30T12:00:00Z");
  await L.record(s, "2026-12-11", L.clean({ a: "going", id: "aaaaaaaa" }), now);
  await L.record(s, "2026-12-11", L.clean({ a: "going", id: "bbbbbbbb" }), now);
  await L.record(s, "2026-12-11", L.clean({ a: "not", id: "cccccccc" }), now);
  await L.record(s, "2026-12-11", L.clean({ a: "not", id: "aaaaaaaa" }), now);   // changed their mind
  await L.record(s, "2026-12-11", L.clean({ a: "maybe", id: "dddddddd", name: "Jo", phone: "602-555-0100" }), now);
  await L.record(s, "2026-12-18", L.clean({ a: "going", id: "bbbbbbbb" }), now);
  const t = await L.tally(s, now);
  assert.strictEqual(t.next, "2026-12-11");
  assert.deepStrictEqual(t.nextCounts, { going: 1, maybe: 1, not: 2 });
  assert.deepStrictEqual(t.dates.map((x) => [x.d, x.going, x.maybe, x.not]), [["2026-12-11", 1, 1, 2], ["2026-12-18", 1, 0, 0]]);
  assert.strictEqual(t.contacts.length, 1);
  assert.deepStrictEqual({ ...t.contacts[0], t: "" }, { id: "dddddddd", name: "Jo", email: "", phone: "602-555-0100", d: "2026-12-11", t: "" });
  assert.ok(await L.removeContact(s, "dddddddd"));
  assert.strictEqual((await L.tally(s, now)).contacts.length, 0);
});

test("the door: JSON from the page, a plain form without the script, the tally behind the key", async () => {
  const s = memStore();
  const realStore = blobs.store;
  blobs.store = (name) => { s.name = name; return s; };
  try {
    const { handler } = require("../../netlify/functions/rsvp.js");
    const page = { origin: "https://cycleforchange.org", host: "cycleforchange.org" };

    let r = await handler({ httpMethod: "POST", headers: { ...page, "content-type": "application/json" }, body: JSON.stringify({ a: "going", id: "zzzzzzzz" }) });
    assert.strictEqual(r.statusCode, 200);
    assert.strictEqual(JSON.parse(r.body).a, "going");
    assert.strictEqual(s.name, "fruitloop-rsvp");

    r = await handler({ httpMethod: "POST", headers: { ...page, "content-type": "application/x-www-form-urlencoded" }, body: "a=not&d=2026-12-11" });
    assert.strictEqual(r.statusCode, 303);
    assert.strictEqual(r.headers.Location, "/fruitloop/");

    r = await handler({ httpMethod: "POST", headers: { ...page, "content-type": "application/x-www-form-urlencoded" }, body: "a=maybe&name=Jo" });
    assert.strictEqual(r.statusCode, 303);
    assert.strictEqual(r.headers.Location, "/fruitloop/rsvp/?missing=contact#posted");

    r = await handler({ httpMethod: "POST", headers: { origin: "https://evil.example", "content-type": "application/json" }, body: '{"a":"going"}' });
    assert.strictEqual(r.statusCode, 403);

    r = await handler({ httpMethod: "POST", headers: { ...page, "content-type": "application/json" }, body: '{"a":"going","website":"x"}' });
    assert.strictEqual(r.statusCode, 200);   // the bot is told yes and nothing is kept

    assert.strictEqual([...s.m.keys()].filter((k) => k.startsWith("r/")).length, 2);
    r = await handler({ httpMethod: "GET", headers: { ...page, "x-tally-key": "not-the-key-at-all" } });
    assert.strictEqual(r.statusCode, 403);
    r = await handler({ httpMethod: "POST", headers: { ...page, "content-type": "application/json" }, body: '{"op":"remove","id":"zzzzzzzz"}' });
    assert.strictEqual(r.statusCode, 403);
  } finally {
    blobs.store = realStore;
  }
});
