"use strict";
// Oct 9, 2026: the route on a ride page (tools/lib/routes.js) and the "Send us the route" issues (tools/routes-pull.js)
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const RT = require("../lib/routes.js");
const { issueFor } = require("../routes-pull.js");

const ENTRY = { gpx: "data/routes/x/2026-10-10.gpx", posted: "2026-10-08", from: "host", by: "TSR", for_date: "2026-10-10", pace_mph: [19, 21], drop: "regroup", regroup: "136th St" };
const BUILT = { path: [[0, 0], [10, 10]], prof: [[0, 1300, 0, 0], [1, 1320, 10, 10]], mi: 1 };

test("a route needs its built file, a date, who sent it and who to credit", () => {
  assert.deepEqual(RT.problems("x", ENTRY, BUILT), []);
  assert.match(RT.problems("x", ENTRY, null).join(), /route-build\.py x/);
  assert.match(RT.problems("x", { ...ENTRY, from: "strava" }, BUILT).join(), /from must be/);
  assert.match(RT.problems("x", { ...ENTRY, by: "" }, BUILT).join(), /by \(who to credit\)/);
  assert.match(RT.problems("x", { ...ENTRY, pace_mph: [21, 19] }, BUILT).join(), /pace_mph/);
  assert.match(RT.problems("x", { ...ENTRY, pace_mph: [190, 210] }, BUILT).join(), /pace_mph/);
  assert.match(RT.problems("x", { ...ENTRY, drop: "maybe" }, BUILT).join(), /drop must be/);
});

test("load skips entries for rides that don't exist or aren't built, and the readme key", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "routes-"));
  fs.mkdirSync(path.join(root, "data"), { recursive: true });
  fs.mkdirSync(path.join(root, "cfc-site", "rides", "routes", "a"), { recursive: true });
  fs.writeFileSync(path.join(root, "cfc-site", "rides", "routes", "a", "route-2026-10-08.json"), JSON.stringify(BUILT));
  fs.writeFileSync(path.join(root, "data", "ride-routes.json"), JSON.stringify({ _readme: "x", a: ENTRY, b: ENTRY, gone: ENTRY }));
  const warn = console.warn; const said = []; console.warn = (m) => said.push(m);
  try {
    const m = RT.load(root, new Set(["a", "b"]));
    assert.deepEqual([...m.keys()], ["a"]);
    assert.equal(m.get("a").built.mi, 1);
    assert.equal(said.length, 2);   // b isn't built; gone isn't a ride
  } finally { console.warn = warn; }
});

test("a one-week route is this week's through its date, then says whose week it was", () => {
  assert.equal(RT.weekState(ENTRY, "2026-10-09"), "current");
  assert.equal(RT.weekState(ENTRY, "2026-10-10"), "current");
  assert.equal(RT.weekState(ENTRY, "2026-10-11"), "past");
  assert.equal(RT.weekState({ ...ENTRY, for_date: null }, "2027-01-01"), "standing");
});

test("pace reads as one number or an en-dash range", () => {
  assert.equal(RT.mph([19, 21]), "19–21");
  assert.equal(RT.mph([18, 18]), "18");
  assert.equal(RT.mph(null), null);
});

test("with no route sent, the page points at where the host posts routes", () => {
  assert.equal(RT.whereRoutesLive({ links: { website: "https://club.org", other: ["https://ridewithgps.com/clubs/1/events"] } }).label, "Ride with GPS");
  assert.equal(RT.whereRoutesLive({ links: { strava: "https://www.strava.com/clubs/620243" } }).label, "the Strava club");
  assert.equal(RT.whereRoutesLive({ links: { website: "https://club.org" }, sources: [] }), null);
});

test("a sent route becomes an issue with no email and no file link; junk is skipped", () => {
  const ride = { slug: "tsr", name: "The Saturday Ride (TSR)", city: "Scottsdale" };
  const sub = { id: "abc123", created_at: "2026-10-10T15:00:00Z", data: { ride: "tsr", route_file: { filename: "og-bos.gpx", size: 40960, url: "https://netlify/secret" }, pace_lo: "19", pace_hi: "21", drop: "regroup", regroup: "Rio Verde", weekly: "once", name: "Dave dave@x.com", email: "dave@x.com" } };
  const it = issueFor(sub, ride);
  assert.match(it.title, /^Route: The Saturday Ride \(TSR\) — Dave$/);
  assert.match(it.body, /og-bos\.gpx\*\* \(40 KB\)/);
  assert.match(it.body, /19–21 mph/);
  assert.match(it.body, /route-id: abc123/);
  assert.doesNotMatch(it.body, /dave@x\.com|netlify\/secret/);
  // a link only when it's a route site
  assert.match(issueFor({ id: "1", data: { ride: "tsr", route_link: "https://ridewithgps.com/routes/123", name: "A" } }, ride).body, /ridewithgps\.com\/routes\/123/);
  assert.doesNotMatch(issueFor({ id: "2", data: { ride: "tsr", route_link: "https://spam.example/x", name: "A" } }, ride).body, /spam\.example/);
  assert.equal(issueFor({ id: "3", data: { ride: "tsr", name: "A" } }, ride), null);
  assert.equal(issueFor({ id: "4", data: { ride: "tsr", route_link: "https://ridewithgps.com/routes/1", "bot-field": "x" } }, ride), null);
});
