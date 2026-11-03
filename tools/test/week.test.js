"use strict";
// /rides/az/phoenix/this-week/ (Nov 3, 2026): the seven days of rides the weekly carousel links to. tools/lib/week.js asks
// the ride pages' own schedule code (tools/lib/schedule.js), so these are the same rules a ride page keeps.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const W = require("../lib/week.js");

const WED = "2026-11-04";   // a Wednesday; the week runs Wed, Nov 4 – Tue, Nov 10
let n = 0;
const ride = (o = {}) => ({ slug: `test-ride-${++n}`, name: `Ride ${n}`, state: "AZ", country: "US", lat: 33.45, lng: -112.07,
  tz: "America/Phoenix", frequency: "weekly", days: ["sat"], start_hhmm: "07:00", status: "active", ...o });
const daysOf = (week, slug) => week.filter((d) => d.rides.some((e) => e.ride.slug === slug)).map((d) => d.ymd);

test("the window is the seven days from the start, in order, every day present", () => {
  const wk = W.weekOf([], WED, 7);
  assert.deepEqual(wk.map((d) => d.ymd), ["2026-11-04", "2026-11-05", "2026-11-06", "2026-11-07", "2026-11-08", "2026-11-09", "2026-11-10"]);
  assert.ok(wk.every((d) => Array.isArray(d.rides) && d.rides.length === 0));
  assert.deepEqual(W.weekOf([], "2026-11-28", 7).map((d) => d.ymd).slice(-2), ["2026-12-03", "2026-12-04"]);   // across a month
});

test("a weekly ride shows once a week, on its day, at its time", () => {
  const r = ride({ days: ["sat"], start_hhmm: "07:00" });
  const wk = W.weekOf([r], WED, 7);
  assert.deepEqual(daysOf(wk, r.slug), ["2026-11-07"]);
  const e = wk[3].rides[0];
  assert.equal(e.at.toISOString(), "2026-11-07T14:00:00.000Z");   // 7:00 am MST
  assert.equal(e.hhmm, "07:00");
  assert.equal(e.allDay, false);
  assert.deepEqual(daysOf(W.weekOf([r], WED, 14), r.slug), ["2026-11-07", "2026-11-14"]);
  // two days a week: one row on each
  const tt = ride({ days: ["tue", "thu"], start_hhmm: "05:30" });
  assert.deepEqual(daysOf(W.weekOf([tt], WED, 7), tt.slug), ["2026-11-05", "2026-11-10"]);
});

test("a ride rolling at midnight on the first day still counts; one after the last day doesn't", () => {
  const r = ride({ days: ["wed"], start_hhmm: "00:00" });
  assert.deepEqual(daysOf(W.weekOf([r], WED, 7), r.slug), ["2026-11-04"]);
  const t = ride({ days: ["wed"], start_hhmm: "06:00" });
  assert.deepEqual(daysOf(W.weekOf([t], "2026-11-05", 6), t.slug), []);   // Thu–Tue: no Wednesday
});

test("a biweekly ride with a posted date shows only on its weeks", () => {
  // the host posted Sat, Oct 31: so Nov 14 and 28, never Nov 7 or 21
  const r = ride({ frequency: "biweekly", days: ["sat"], dates: [{ date: "2026-10-31", start_hhmm: "07:00" }] });
  assert.deepEqual(daysOf(W.weekOf([r], WED, 7), r.slug), []);
  assert.deepEqual(daysOf(W.weekOf([r], WED, 28), r.slug), ["2026-11-14", "2026-11-28"]);
  // a posted date inside the window is the same ride at the same instant: one row, not two
  const p = ride({ frequency: "biweekly", days: ["sat"], dates: [{ date: "2026-11-14", start_hhmm: "07:00" }] });
  const wk = W.weekOf([p], "2026-11-11", 7);
  assert.deepEqual(daysOf(wk, p.slug), ["2026-11-14"]);
  assert.equal(wk.find((d) => d.ymd === "2026-11-14").rides.length, 1);
  // with no posted week the schedule can't tell which week: it shows every week (the page adds the host caveat)
  const q = ride({ frequency: "biweekly", days: ["sat"] });
  assert.deepEqual(daysOf(W.weekOf([q], WED, 14), q.slug), ["2026-11-07", "2026-11-14"]);
});

test("a first_ride after the window shows nothing; from that day on it shows", () => {
  const r = ride({ days: ["fri"], start_hhmm: "18:00", first_ride: "2026-12-11" });
  assert.deepEqual(daysOf(W.weekOf([r], WED, 7), r.slug), []);
  assert.deepEqual(daysOf(W.weekOf([r], "2026-12-02", 7), r.slug), []);           // Fri, Dec 4 is before the first ride
  assert.deepEqual(daysOf(W.weekOf([r], "2026-12-09", 7), r.slug), ["2026-12-11"]);
});

test("the Fruit Loop (the real record) never shows before Fri, Dec 11, 2026", () => {
  const all = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "cfc-site", "rides", "rides.json"), "utf8"));
  const fl = (Array.isArray(all) ? all : all.rides).find((r) => r.slug === "phoenix-az-cycle-for-change-fruit-loop");
  assert.ok(fl, "the Fruit Loop is in rides.json");
  for (const start of ["2026-11-04", "2026-11-27", "2026-12-04"]) assert.deepEqual(daysOf(W.weekOf([fl], start, 7), fl.slug), [], start);
  assert.deepEqual(daysOf(W.weekOf([fl], "2026-12-08", 7), fl.slug), ["2026-12-11"]);
});

test("a monthly-rule ride shows only on its date", () => {
  const first = ride({ frequency: "monthly", days: ["sat"], monthly_rule: [{ ord: 1, day: "sat" }] });
  const third = ride({ frequency: "monthly", days: ["sat"], monthly_rule: [{ ord: 3, day: "sat" }] });
  const last = ride({ frequency: "monthly", days: ["fri"], monthly_rule: [{ ord: -1, day: "fri" }], start_hhmm: "18:30" });
  const wk = W.weekOf([first, third, last], WED, 28);   // Nov 4 – Dec 1
  assert.deepEqual(daysOf(wk, first.slug), ["2026-11-07"]);
  assert.deepEqual(daysOf(wk, third.slug), ["2026-11-21"]);
  assert.deepEqual(daysOf(wk, last.slug), ["2026-11-27"]);
  // a monthly ride posted date by date (no rule) has no computable time: only its posted dates show
  const bare = ride({ frequency: "monthly", days: ["sat"], monthly_rule: null, dates: [{ date: "2026-11-21", start_hhmm: null }] });
  assert.equal(W.computable(bare), false);
  const wb = W.weekOf([bare], WED, 28);
  assert.deepEqual(daysOf(wb, bare.slug), ["2026-11-21"]);
  const e = wb.find((d) => d.ymd === "2026-11-21").rides[0];
  assert.equal(e.allDay, true); assert.equal(e.hhmm, null);
});

test("breaks, seasons and the host's start_times are the ride page's", () => {
  // a seasonal break promises nothing, not even a date the host posted for its return (the ride page's nextOf)
  const brk = ride({ status: "seasonal-break", dates: [{ date: "2026-11-07", start_hhmm: "07:00" }] });
  assert.deepEqual(daysOf(W.weekOf([brk], WED, 7), brk.slug), []);
  const summer = ride({ season_months: { start: 4, end: 9 } });
  assert.deepEqual(daysOf(W.weekOf([summer], WED, 7), summer.slug), []);
  // 7:30 until the host's change on Sun, Nov 8, then 8:00
  const t = ride({ days: ["sat", "sun"], start_hhmm: "07:30", start_times: [{ from: "2026-11-08", start_hhmm: "08:00" }] });
  const wk = W.weekOf([t], WED, 7);
  assert.equal(wk[3].rides[0].hhmm, "07:30");
  assert.equal(wk[4].rides[0].hhmm, "08:00");
  assert.equal(wk[4].rides[0].at.toISOString(), "2026-11-08T15:00:00.000Z");
});

test("each day runs in start-time order; a ride with no time that day goes last", () => {
  const late = ride({ name: "Evening", start_hhmm: "18:30" });
  const early = ride({ name: "Dawn", start_hhmm: "05:30" });
  const b = ride({ name: "Bravo", start_hhmm: "07:00" });
  const a = ride({ name: "Alpha", start_hhmm: "07:00" });
  const untimed = ride({ name: "Aardvark", frequency: "irregular", start_hhmm: null, dates: [{ date: "2026-11-07", start_hhmm: null }] });
  const sat = W.weekOf([late, untimed, b, early, a], WED, 7)[3];
  assert.equal(sat.ymd, "2026-11-07");
  assert.deepEqual(sat.rides.map((e) => e.ride.name), ["Dawn", "Alpha", "Bravo", "Evening", "Aardvark"]);
});

test("the 45-mile cut: inside the Valley in Arizona, nothing past 45 miles, nothing in another state", () => {
  const hub = W.PHOENIX_WEEK;
  assert.deepEqual([hub.lat, hub.lng, hub.miles], [33.4771, -112.0445, 45]);
  const deg = 180 / (Math.PI * 3958.8);   // degrees of latitude per mile
  const at44 = ride({ lat: hub.lat + 44 * deg, lng: hub.lng });
  const at46 = ride({ lat: hub.lat + 46 * deg, lng: hub.lng });
  assert.ok(Math.abs(W.milesBetween(hub, at44) - 44) < 0.01);
  assert.ok(W.inArea(at44));
  assert.ok(!W.inArea(at46));
  assert.ok(!W.inArea({ ...at44, state: "CA" }));
  assert.ok(!W.inArea(ride({ lat: null, lng: null })));
  // Tucson is not the Valley; Scottsdale and Chandler are
  assert.ok(!W.inArea(ride({ lat: 32.2226, lng: -110.9747 })));
  assert.ok(W.inArea(ride({ lat: 33.4942, lng: -111.9261 })) && W.inArea(ride({ lat: 33.3062, lng: -111.8413 })));
});

test("the build writes the page after the wipe: seven days, no Event markup, in the sitemap, linked from the hub", () => {
  const os = require("os");
  const { execFileSync } = require("child_process");
  const ROOT = path.join(__dirname, "..", "..");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "rides-week-"));
  const out = path.join(tmp, "rides");
  fs.mkdirSync(path.join(out, "az", "phoenix", "this-week"), { recursive: true });
  fs.writeFileSync(path.join(out, "az", "phoenix", "this-week", "index.html"), "stale");   // the wipe takes this; the build writes it again
  fs.copyFileSync(path.join(ROOT, "cfc-site", "rides", "hubs.json"), path.join(out, "hubs.json"));
  execFileSync(process.execPath, [path.join(ROOT, "tools", "build-rides.js"), "--out", out, "--today", WED, "--no-history"], { stdio: "pipe" });
  const h = fs.readFileSync(path.join(out, "az", "phoenix", "this-week", "index.html"), "utf8");
  assert.match(h, /<title>Phoenix group rides this week<\/title>/);
  assert.match(h, /<h1>Phoenix group rides this week<\/h1>/);
  assert.match(h, /<h2 class="gr-list-h">Phoenix group rides this week, day by day<\/h2>/);
  assert.match(h, /<link rel="canonical" href="https:\/\/cycleforchange\.org\/rides\/az\/phoenix\/this-week\/">/);
  assert.deepEqual([...h.matchAll(/data-ymd="([^"]+)"/g)].map((m) => m[1]), ["2026-11-04", "2026-11-05", "2026-11-06", "2026-11-07", "2026-11-08", "2026-11-09", "2026-11-10"]);
  assert.match(h, /"@type":"CollectionPage"/);
  assert.doesNotMatch(h, /"@type":"Event"/);
  assert.doesNotMatch(h, /phoenix-az-cycle-for-change-fruit-loop/);   // not before Dec 11
  assert.match(h, /<p class="gr-sub">Group rides in the Valley, Nov 4–10: <b>\d+<\/b> of them\./);
  assert.match(fs.readFileSync(path.join(out, "sitemap.xml"), "utf8"), /<loc>https:\/\/cycleforchange\.org\/rides\/az\/phoenix\/this-week\/<\/loc>/);
  assert.match(fs.readFileSync(path.join(out, "az", "phoenix", "index.html"), "utf8"), /href="\/rides\/az\/phoenix\/this-week\/">This week, day by day/);
});
