"use strict";
// tools/rides-reports.js with a mocked Netlify API — node --test tools/test/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const R = require("../rides-reports.js");

const rides = [
  { slug: "tempe-az-bean-cafe-saturday-social", name: "Bean Café Saturday Social", city: "Tempe", state: "AZ", country: "US", host: { name: "Bean Café" },
    links: { website: "https://beancafe.example/rides" }, sources: ["https://beancafe.example/rides"], refresh: { watch_url: "https://beancafe.example/rides" } },
  { slug: "phoenix-az-desert-dawn-ride", name: "Desert Dawn Ride", city: "Phoenix", state: "AZ", country: "US", host: { name: "Saguaro Cycles" }, links: {}, sources: [], refresh: {} },
  { slug: "barcelona-es-rapha-saturday", name: "Saturday Club Ride", city: "Barcelona", state: null, country: "ES", host: { name: "Rapha Barcelona" }, links: {}, sources: [], refresh: {} },
];
const sub = (id, data, created = "2026-10-01T15:00:00Z") => ({ id, number: 1, created_at: created, email: data.email || null, data });
function mockFetch(submissions, { perPage = 100 } = {}) {
  const calls = [];
  const fn = async (url, opts) => {
    calls.push({ url, auth: opts && opts.headers && opts.headers.authorization });
    const ok = (body) => ({ ok: true, status: 200, json: async () => body });
    if (/\/sites\/site-1\/forms$/.test(url)) return ok([{ id: "f-signup", name: "waitlist" }, { id: "f-rr", name: "ride-report" }]);
    const m = url.match(/\/forms\/f-rr\/submissions\?per_page=(\d+)&page=(\d+)/);
    if (m) { const page = +m[2]; return ok(submissions.slice((page - 1) * perPage, page * perPage)); }
    return { ok: false, status: 404, json: async () => ({}) };
  };
  fn.calls = calls;
  return fn;
}
function files() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "rides-reports-"));
  const p = (n) => path.join(dir, n);
  fs.writeFileSync(p("rides.json"), JSON.stringify(rides));
  fs.writeFileSync(p("health.json"), JSON.stringify({ generated_at: "2026-09-30T09:00:00Z", rides: { "tempe-az-bean-cafe-saturday-social": { feed_seen: "2026-09-28", urls: [{ url: "https://beancafe.example/rides", role: "watch", class: "ok" }] } } }, null, 1));
  return { dataFile: p("rides.json"), healthFile: p("health.json"), suggestionsFile: p("suggestions.json"), p };
}
const go = (f, fetch, extra = {}) => R.run({ token: "tok", siteId: "site-1", fetch, today: "2026-10-05", log: () => {}, ...f, ...extra });

test("reports land on the ride they came from; new rides and strangers go to suggestions; no email kept", async () => {
  const f = files();
  const long = "Nobody showed up at 7. ".repeat(30);
  const fetch = mockFetch([
    sub("s1", { kind: "gone", ride: "Bean Café Saturday Social", details: long, email: "rider@example.com", page: "/rides/tempe-az-bean-cafe-saturday-social/" }),
    sub("s2", { kind: "still-on", ride: "Bean Café Saturday Social", details: "Rode it Saturday, 20 people", page: "/rides/tempe-az-bean-cafe-saturday-social/" }),
    sub("s3", { kind: "new", ride: "Tuesday Tacos Ride", details: "Tuesdays 6pm from Taco Shop, Mesa", email: "host@example.com", page: "/rides/az/" }),
    sub("s4", { kind: "changed", ride: "Desert Dawn", details: "Now 6:30 am, not 6", page: "/rides/az/phoenix/" }),
    sub("s5", { kind: "changed", ride: "the long one on sundays", details: "?", page: "/rides/" }),
    sub("s6", { kind: "gone", ride: "https://cycleforchange.org/rides/barcelona-es-rapha-saturday/", details: "Shop closed", page: "/rides/spain/" }),
  ]);
  const out = await go(f, fetch);
  assert.equal(fetch.calls[0].auth, "Bearer tok");
  assert.deepEqual({ reports: out.reports, still: out.still_on, sugg: out.suggestions, unmatched: out.unmatched }, { reports: 3, still: 1, sugg: 1, unmatched: 1 });
  const h = JSON.parse(fs.readFileSync(f.healthFile, "utf8"));
  const bean = h.rides["tempe-az-bean-cafe-saturday-social"];
  assert.equal(bean.feed_seen, "2026-09-28", "the watcher's fields are kept");
  assert.deepEqual(bean.reports.map((r) => [r.id, r.type, r.date]), [["s1", "gone", "2026-10-01"], ["s2", "still-on", "2026-10-01"]]);
  assert.ok(bean.reports[0].note.length <= 300);
  assert.deepEqual(Object.keys(bean), ["feed_seen", "reports", "urls"], "key order kept");
  assert.equal(h.rides["phoenix-az-desert-dawn-ride"].reports[0].type, "changed", "matched by name within the hub's state");
  assert.equal(h.rides["barcelona-es-rapha-saturday"].reports[0].note, "Shop closed", "matched by its cycleforchange.org link");
  const s = JSON.parse(fs.readFileSync(f.suggestionsFile, "utf8"));
  assert.deepEqual(s.map((x) => [x.id, x.kind, !!x.unmatched]), [["s3", "new", false], ["s5", "changed", true]]);
  const all = fs.readFileSync(f.healthFile, "utf8") + fs.readFileSync(f.suggestionsFile, "utf8");
  assert.doesNotMatch(all, /@example\.com/, "never an email address");
});

test("a second run adds nothing twice; --since skips older submissions; pages are followed", async () => {
  const f = files();
  const many = Array.from({ length: 101 }, (_, i) => sub(`n${i}`, { kind: "new", ride: `Ride ${i}`, details: "", page: "/rides/" }, i === 100 ? "2026-10-04T10:00:00Z" : "2026-09-01T10:00:00Z"));
  let out = await go(f, mockFetch(many));
  assert.equal(out.submissions, 101, "two pages read");
  assert.equal(out.suggestions, 101);
  out = await go(f, mockFetch(many));
  assert.equal(out.suggestions, 0);
  assert.equal(out.already, 101);
  const f2 = files();
  out = await go(f2, mockFetch(many), { since: "2026-10-01" });
  assert.equal(out.suggestions, 1);
});

test("no form yet is not an error; no token skips cleanly", async () => {
  const f = files();
  const fetch = async () => ({ ok: true, status: 200, json: async () => [{ id: "f-signup", name: "waitlist" }] });
  const out = await go(f, fetch);
  assert.equal(out.submissions, 0);
  const env = { ...process.env }; delete env.NETLIFY_API_TOKEN; delete env.HTTPS_PROXY; delete env.https_proxy;
  const r = spawnSync(process.execPath, [path.join(__dirname, "..", "rides-reports.js")], { encoding: "utf8", env });
  assert.equal(r.status, 0);
  assert.match(r.stdout, /rides-reports: no NETLIFY_API_TOKEN, skipped/);
});

test("matching: page first, then links, then the name", () => {
  assert.equal(R.matchRide({ page: "/rides/tempe-az-bean-cafe-saturday-social/", ride: "whatever" }, rides).slug, "tempe-az-bean-cafe-saturday-social");
  assert.equal(R.matchRide({ page: "/rides/", ride: "https://beancafe.example/rides/" }, rides).slug, "tempe-az-bean-cafe-saturday-social");
  assert.equal(R.matchRide({ page: "/rides/spain/barcelona/", ride: "Saturday club ride Rapha" }, rides).slug, "barcelona-es-rapha-saturday");
  assert.equal(R.matchRide({ page: "/rides/", ride: "a ride" }, rides), null);
});
