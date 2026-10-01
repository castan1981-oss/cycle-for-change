"use strict";
// start_times: a host's own table of start-time changes (tools/lib/rides-schema.js → startOn).
const test = require("node:test");
const assert = require("node:assert");
const S = require("../lib/rides-schema.js");
const { validateRide } = require("../validate-rides.js");

const shootout = { start_hhmm: "06:30", start_times: [{ from: "2026-10-10", start_hhmm: "07:00" }, { from: "2026-11-14", start_hhmm: "07:30" }] };

test("startOn gives the time in force on a date", () => {
  assert.equal(S.startOn(shootout, "2026-10-03"), "06:30");
  assert.equal(S.startOn(shootout, "2026-10-10"), "07:00");
  assert.equal(S.startOn(shootout, "2026-11-13"), "07:00");
  assert.equal(S.startOn(shootout, "2027-01-02"), "07:30");
  assert.equal(S.startOn({ start_hhmm: "18:30" }, "2026-10-10"), "18:30");
  assert.equal(S.startOn({ start_hhmm: null }, "2026-10-10"), null);
  assert.deepEqual(S.startTimesAll(shootout), ["06:30", "07:00", "07:30"]);
});

test("the validator wants the table oldest first, real dates, 24-hour times and a base time", () => {
  const codes = (r) => {
    const out = validateRide(r, { today: "2026-10-01" });
    const list = Array.isArray(out) ? out : (out && (out.errors || out.issues)) || [];
    return list.filter((e) => (e.level || e.severity || "error") === "error").map((e) => e.code || e.rule || String(e));
  };
  const base = { slug: "x", name: "X", city: "Tucson", state: "AZ", country: "US", days: ["sat"], frequency: "weekly", start_hhmm: "06:30" };
  const has = (r) => codes(r).some((c) => /start_times/.test(String(c)));
  assert.equal(has({ ...base, start_times: shootout.start_times }), false);
  assert.equal(has({ ...base, start_times: [{ from: "2026-11-14", start_hhmm: "07:30" }, { from: "2026-10-10", start_hhmm: "07:00" }] }), true);
  assert.equal(has({ ...base, start_times: [{ from: "2026-02-30", start_hhmm: "07:00" }] }), true);
  assert.equal(has({ ...base, start_times: [{ from: "2026-10-10", start_hhmm: "7:00 am" }] }), true);
  assert.equal(has({ ...base, start_times: [] }), true);
  assert.equal(has({ ...base, start_hhmm: null, start_times: shootout.start_times }), true);
});
