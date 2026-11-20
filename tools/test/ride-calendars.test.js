// Community calendars (Nov 19, 2026): a ride a local calendar carries links its own page there by name, and gets no
// calendar file from us. Run: node --test tools/test/ride-calendars.test.js
"use strict";
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const RC = require("../lib/ride-calendars.js");

const ROOT = path.join(__dirname, "..", "..");
const FEED = "https://calendar.google.com/calendar/ical/abc%40group.calendar.google.com/public/basic.ics";
const config = {
  calendars: { town: { name: "town.bike", what: "the town's calendar", home: "https://town.bike/events", hosts: ["town.bike"], feeds: [FEED] } },
  rides: { a: { calendar: "town", event: "https://town.bike/events/a-ride-1234", checked: "2026-11-19" }, b: { calendar: "town", event: null, checked: "2026-11-19" } },
};
const ride = (slug, over = {}) => ({ slug, links: { website: null, instagram: null, other: [] }, sources: [], refresh: {}, ...over });

test("a ride on a calendar links its own page there; without one, the calendar's front page", () => {
  const C = RC.make(config);
  assert.strictEqual(C.of(ride("a")).url, "https://town.bike/events/a-ride-1234");
  assert.strictEqual(C.of(ride("b")).url, "https://town.bike/events");
  assert.strictEqual(C.of(ride("zzz")), null);
});

test("the calendar is never the host's website, and its front page and raw feed leave the link row", () => {
  const C = RC.make(config);
  const L = C.links(ride("a", { links: { website: "https://town.bike/groups", instagram: "https://www.instagram.com/host/", other: [FEED, "https://town.bike/events", "https://host.example/rides"] } }));
  assert.strictEqual(L.website, null);
  assert.deepStrictEqual(L.other, ["https://host.example/rides"]);
  assert.strictEqual(L.instagram, "https://www.instagram.com/host/");
  const own = { website: "https://host.example/", other: [] };
  assert.strictEqual(C.links(ride("a", { links: own })).website, "https://host.example/");
  assert.strictEqual(C.links(ride("zzz", { links: own })), own);
});

test("the sources line names the calendar once and keeps every other source", () => {
  const C = RC.make(config);
  const s = C.sources(ride("a", { sources: ["https://town.bike/events", FEED, "https://host.example/", "https://town.bike/events/a-ride-1234"] }));
  assert.deepStrictEqual(s, [{ url: "https://town.bike/events/a-ride-1234", text: "town.bike" }, { url: "https://host.example/", text: "source 2" }]);
  assert.deepStrictEqual(C.sources(ride("zzz", { sources: ["https://x.example/"] })), [{ url: "https://x.example/", text: "source 1" }]);
});

test("check: a ride leaning on a calendar needs a row; a row needs a real ride, the ride's own page and a date", () => {
  const C = RC.make(config);
  assert.deepStrictEqual(C.check([ride("a"), ride("b")]), []);
  assert.match(C.check([ride("a"), ride("b"), ride("c", { sources: ["https://town.bike/events/c"] })]).join("\n"), /c: leans on town\.bike/);
  assert.match(C.check([ride("a"), ride("b"), ride("d", { refresh: { feed_url: FEED } })]).join("\n"), /d: leans on town\.bike/);
  assert.match(C.check([ride("a")]).join("\n"), /b: no ride with this slug/);
  const front = RC.make({ ...config, rides: { a: { calendar: "town", event: "https://town.bike/events/", checked: "2026-11-19" } } });
  assert.match(front.check([ride("a")]).join("\n"), /front page/);
  const off = RC.make({ ...config, rides: { a: { calendar: "town", event: "https://elsewhere.example/a", checked: "nope" } } });
  assert.match(off.check([ride("a")]).join("\n"), /isn't a page on town\.bike[\s\S]*checked must be/);
});

test("the site's own data passes, and no built page of a calendar ride offers our calendar file", () => {
  const C = RC.make(JSON.parse(fs.readFileSync(path.join(ROOT, "data", "ride-calendars.json"), "utf8")));
  const rides = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site", "rides", "rides.json"), "utf8"));
  assert.deepStrictEqual(C.check(rides), []);
  for (const slug of Object.keys(C.rides)) {
    const dir = path.join(ROOT, "cfc-site", "rides", slug);
    assert.ok(!fs.existsSync(path.join(dir, "ride.ics")), `${slug}: ride.ics is ours; the calendar entry is theirs`);
    const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
    assert.ok(!html.includes("/ride.ics"), `${slug}: links our calendar file`);
    assert.ok(!/calendar\.google\.com\/calendar\/(ical|render)/.test(html), `${slug}: links a raw feed or our Google Calendar copy`);
    assert.ok(html.includes(`href="${C.of({ slug }).url}"`), `${slug}: doesn't link its page on the calendar`);
    assert.ok(/Listed on <a [^>]*>msp\.bike<\/a>/.test(html), `${slug}: no credit line`);
  }
});
