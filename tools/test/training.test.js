"use strict";
// /training/ (Nov 23, 2026): the rules in netlify/functions/lib/training.js and the door in netlify/functions/training.js,
// against a store in memory — node --test tools/test/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const crypto = require("crypto");
const path = require("path");
const L = require("../../netlify/functions/lib/training.js");

const ICS = [
  "BEGIN:VCALENDAR", "VERSION:2.0",
  "BEGIN:VEVENT", "UID:a1", "DTSTART;VALUE=DATE:20261124", "DTEND;VALUE=DATE:20261125", "SUMMARY:Bike: Hard efforts",
  "DESCRIPTION:Planned Time: 1:30:00\\nWarm up 20 minutes\\, then 4 x 8 min hard.\\n4 min easy", "  between.", "END:VEVENT",
  "BEGIN:VEVENT", "UID:a2", "DTSTART:20261128T130000Z", "DTEND:20261128T160000Z", "SUMMARY:The Saturday Ride", "END:VEVENT",
  "BEGIN:VEVENT", "UID:a3", "DTSTART;TZID=America/Phoenix:20261123T060000", "SUMMARY:Easy spin 60 min", "END:VEVENT",
  "BEGIN:VEVENT", "UID:a4", "SUMMARY:No date, dropped", "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

test("the calendar reads into days, titles, the coach's own words and minutes", () => {
  const w = L.parseIcs(ICS);
  assert.deepStrictEqual(w.map((x) => [x.day, x.title, x.minutes]), [["2026-11-23", "Easy spin 60 min", 60], ["2026-11-24", "Bike: Hard efforts", 90], ["2026-11-28", "The Saturday Ride", 180]]);
  assert.match(w[1].desc, /Warm up 20 minutes, then 4 x 8 min hard\.\n4 min easy between\./);
  assert.strictEqual(L.parseIcs("not a calendar").length, 0);
});
test("a UTC stamp is read on Phoenix's clock, so a 6 am ride isn't filed under the wrong day", () => {
  const w = L.parseIcs("BEGIN:VEVENT\nDTSTART:20261129T020000Z\nSUMMARY:Evening spin\nEND:VEVENT");
  assert.strictEqual(w[0].day, "2026-11-28");
});
test("only a TrainingPeaks calendar link is taken", () => {
  assert.strictEqual(L.feedUrl("webcal://www.trainingpeaks.com/ical/ABC123.ics"), "https://www.trainingpeaks.com/ical/ABC123.ics");
  assert.ok(L.feedUrl("https://home.trainingpeaks.com/ical/x.ics"));
  for (const bad of ["https://www.trainingpeaks.com", "https://www.trainingpeaks.com/", "http://www.trainingpeaks.com/ical/x.ics", "https://trainingpeaks.com.evil.example/ical/x.ics",
    "https://eviltrainingpeaks.com/x.ics", "https://user:pw@www.trainingpeaks.com/x.ics", "https://www.trainingpeaks.com:8443/x.ics", "https://169.254.169.254/latest", "file:///etc/passwd", ""]) assert.strictEqual(L.feedUrl(bad), null, bad);
});
test("weeks start on Monday in Phoenix; a wild date falls back to this week", () => {
  const now = Date.parse("2026-11-23T15:00:00Z");
  assert.strictEqual(L.phxToday(Date.parse("2026-11-23T05:00:00Z")), "2026-11-22");
  assert.strictEqual(L.pickMonday(null, now), "2026-11-23");
  assert.strictEqual(L.pickMonday("2026-11-29", now), "2026-11-23");
  assert.strictEqual(L.pickMonday("2026-12-02", now), "2026-11-30");
  assert.strictEqual(L.pickMonday("1999-01-01", now), "2026-11-23");
  const week = L.weekOf("2026-11-23", L.parseIcs(ICS), [{ day: "2026-11-24", miles: 30 }]);
  assert.strictEqual(week.length, 7);
  assert.strictEqual(week[1].planned[0].title, "Bike: Hard efforts");
  assert.strictEqual(week[1].rides.length, 1);
  assert.strictEqual(week[3].planned.length, 0);
});
test("passwords are hashed, checked, and guessing is slowed", () => {
  const rec = L.hashPassword("correct horse battery");
  assert.ok(!JSON.stringify(rec).includes("correct"));
  assert.ok(L.checkPassword("correct horse battery", rec));
  assert.ok(!L.checkPassword("correct horse batterx", rec));
  assert.ok(!L.checkPassword("x", null));
  assert.ok(!L.passwordOk("short"));
  const now = 1e12;
  assert.ok(!L.locked([now - 1, now - 2], now));
  assert.ok(L.locked(Array(8).fill(now - 1000), now));
  assert.ok(!L.locked(Array(8).fill(now - 16 * 6e4), now));
});
test("an invite is only its SHA-256 in the repo, and no key is", () => {
  assert.strictEqual(L.inviteUser("nope"), null);
  assert.strictEqual(L.inviteUser("x".repeat(40)), null);
  for (const u of Object.values(L.USERS)) assert.match(u.invite, /^[0-9a-f]{64}$/);
  assert.notStrictEqual(L.USERS.robert.invite, L.USERS.john.invite);
});
test("a dropped ride keeps the day and four numbers, nothing else", () => {
  const c = L.cleanRide({ day: "2026-11-21", miles: 102.04, moving_s: 19000.7, gain_ft: 2890.4, name: "El Tour <b>", lat: 32.2, pts: [1, 2] });
  assert.ok(c.ok);
  assert.deepStrictEqual(Object.keys(c.ride).sort(), ["day", "gain_ft", "id", "miles", "moving_s", "name"]);
  assert.strictEqual(c.ride.miles, 102); assert.strictEqual(c.ride.moving_s, 19001); assert.ok(!/[<>]/.test(c.ride.name));
  assert.ok(!L.cleanRide({ day: "2026-13-40", miles: 10 }).ok);
  assert.ok(!L.cleanRide({ day: "2026-11-21", miles: 0 }).ok);
});

// ---- the door, with a store in memory ----
function memStore() {
  const m = new Map();
  return { m, async get(k, o) { if (!m.has(k)) return null; const v = m.get(k); return o && o.type === "json" ? JSON.parse(v) : v; },
    async set(k, v) { m.set(k, String(v)); }, async setJSON(k, v) { m.set(k, JSON.stringify(v)); }, async delete(k) { m.delete(k); },
    async list({ prefix }) { return { blobs: [...m.keys()].filter((k) => k.startsWith(prefix)).map((key) => ({ key })) }; } };
}
function door(store) {
  const blobsPath = path.join(__dirname, "..", "..", "netlify", "functions", "lib", "blobs.js");
  const fnPath = path.join(__dirname, "..", "..", "netlify", "functions", "training.js");
  delete require.cache[fnPath];
  require.cache[blobsPath] = { id: blobsPath, filename: blobsPath, loaded: true, exports: { connect() {}, store: () => store } };
  const fn = require(fnPath);
  delete require.cache[blobsPath];
  let cookie = "";
  const post = async (body, headers = {}) => {
    const res = await fn.handler({ httpMethod: "POST", headers: { origin: "https://cycleforchange.org", cookie, ...headers }, body: JSON.stringify(body) });
    if (res.headers["Set-Cookie"]) cookie = res.headers["Set-Cookie"].split(";")[0];
    return { status: res.statusCode, ...JSON.parse(res.body), setCookie: res.headers["Set-Cookie"] || "" };
  };
  return { post, fn, signOut: () => { cookie = ""; } };
}
test("the door: nothing without signing in, the coach reads and writes the note only, the link never comes back", async () => {
  const store = memStore();
  const d = door(store);
  assert.strictEqual((await d.post({ op: "week" })).status, 401);
  assert.strictEqual((await d.post({ op: "week" }, { origin: "https://evil.example" })).status, 403);
  assert.strictEqual((await d.post({ op: "set-password", k: "y".repeat(40), password: "long enough pw" })).status, 403);
  assert.strictEqual((await d.post({ op: "login", who: "robert", password: "anything at all" })).status, 403);

  // sign Robert in the way an invite would have left him
  await store.setJSON("pw/robert", L.hashPassword("robert's long password"));
  await store.setJSON("pw/john", L.hashPassword("john's long password"));
  const inR = await d.post({ op: "login", who: "robert", password: "robert's long password" });
  assert.strictEqual(inR.status, 200);
  assert.match(inR.setCookie, /HttpOnly; Secure; SameSite=Lax/);
  assert.ok(![...store.m.keys()].some((k) => inR.setCookie.includes(k.slice(2))), "the store keeps the session's hash, not the session");

  assert.strictEqual((await d.post({ op: "set-feed", url: "https://www.trainingpeaks.com" })).status, 400);
  await store.set("feed/robert", "https://www.trainingpeaks.com/ical/SECRET.ics");
  await store.setJSON("cache/robert", { t: Date.now(), list: L.parseIcs(ICS) });
  assert.strictEqual((await d.post({ op: "ride", day: "2026-11-24", miles: 31.2, moving_s: 6000, gain_ft: 800, name: "Morning" })).status, 200);
  assert.strictEqual((await d.post({ op: "note", monday: "2026-11-23", text: "hi" })).status, 403);
  const wk = await d.post({ op: "week", monday: "2026-11-23" });
  assert.strictEqual(wk.status, 200);
  assert.strictEqual(wk.days[1].planned[0].minutes, 90);
  assert.strictEqual(wk.days[1].rides[0].miles, 31.2);
  assert.ok(!JSON.stringify(wk).includes("SECRET"));

  d.signOut();
  assert.strictEqual((await d.post({ op: "login", who: "john", password: "john's long password" })).status, 200);
  assert.strictEqual((await d.post({ op: "ride", day: "2026-11-24", miles: 5 })).status, 403);
  assert.strictEqual((await d.post({ op: "set-feed", url: "https://www.trainingpeaks.com/ical/x.ics" })).status, 403);
  assert.strictEqual((await d.post({ op: "note", monday: "2026-11-25", text: "Easy week. Sleep." })).status, 200);
  const wj = await d.post({ op: "week", monday: "2026-11-23" });
  assert.strictEqual(wj.me.role, "coach"); assert.strictEqual(wj.athlete, "Robert");
  assert.strictEqual(wj.note.text, "Easy week. Sleep."); assert.strictEqual(wj.note.by, "John");
  assert.strictEqual((await d.post({ op: "logout" })).status, 200);
  assert.strictEqual((await d.post({ op: "week" })).status, 401);
});
test("eight wrong passwords and the door waits", async () => {
  const store = memStore(); const d = door(store);
  await store.setJSON("pw/robert", L.hashPassword("robert's long password"));
  for (let i = 0; i < 8; i++) assert.strictEqual((await d.post({ op: "login", who: "robert", password: "wrong " + i })).status, 403);
  assert.strictEqual((await d.post({ op: "login", who: "robert", password: "robert's long password" })).status, 429);
});
test("the page is built, private, and carries no invite or key", () => {
  const fs = require("fs");
  const root = path.join(__dirname, "..", "..");
  const html = fs.readFileSync(path.join(root, "cfc-site", "training", "index.html"), "utf8");
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  const inv = Object.values(L.USERS).map((u) => u.invite);
  for (const f of ["index.html", "training.js", "training.css"]) { const s = fs.readFileSync(path.join(root, "cfc-site", "training", f), "utf8"); for (const h of inv) assert.ok(!s.includes(h)); }
  assert.ok(!/strava-week|api\/strava-/.test(fs.readFileSync(path.join(root, "cfc-site", "training", "training.js"), "utf8")));
  assert.match(fs.readFileSync(path.join(root, "netlify.toml"), "utf8"), /from = "\/api\/training"/);
});
