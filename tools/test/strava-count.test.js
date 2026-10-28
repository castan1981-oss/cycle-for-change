// netlify/functions/strava.js — what the number counts (Oct 26, 2026): rides only, and the right season.
// Training = bike miles from June 1, 2026 (Phoenix midnight) until Jan 1, 2027 (Phoenix midnight); 2027 = from zero.
// Every activity here is made up; no Strava data is read.
const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("path");
const S = require("../lib/season.js");

const FN = path.join(__dirname, "..", "..", "netlify", "functions", "strava.js");
const AUTH = path.join(__dirname, "..", "..", "netlify", "functions", "lib", "strava-auth.js");
const METRES_PER_MILE = 1609.344;

function act(id, type, isoStart, miles, extra = {}) {
  return { id, type, sport_type: type, name: `${type} ${id}`, start_date: isoStart, distance: miles * METRES_PER_MILE, visibility: "everyone", ...extra };
}

// Load strava.js against a fake auth/blob store and a fake fetch. `blob` is what the store holds before the call.
function load({ activities, blob = null, env = {} }) {
  delete require.cache[FN];
  const store = { value: blob, get: async () => store.value, setJSON: async (_k, v) => { store.value = v; } };
  require.cache[AUTH] = { id: AUTH, filename: AUTH, loaded: true, exports: {
    configured: () => true, getAccessToken: async () => "token", store: () => store } };
  const calls = [];
  global.fetch = async (url) => {
    calls.push(String(url));
    if (/\/athlete\/activities/.test(url)) {
      const page = Number(new URL(url).searchParams.get("page"));
      return { ok: true, json: async () => (page === 1 ? activities : []) };
    }
    return { ok: true, json: async () => ({ id: 1 }) };
  };
  for (const k of ["MANUAL_BONUS_MILES", "MANUAL_BONUS_MILES_2027"]) delete process.env[k];
  Object.assign(process.env, env);
  const fn = require(FN);
  return { fn, store, calls };
}

async function at(iso, opts) {
  const real = Date.now;
  Date.now = () => Date.parse(iso);
  try {
    const { fn, store, calls } = load(opts);
    const res = await fn.handler({ httpMethod: "GET", headers: {} });
    return { body: JSON.parse(res.body), store, calls };
  } finally {
    Date.now = real;
  }
}

const SET = [
  act(1, "Ride", "2026-07-01T13:00:00Z", 30),
  act(2, "GravelRide", "2026-09-12T13:00:00Z", 20),
  act(3, "Run", "2026-08-01T13:00:00Z", 6),
  act(4, "Swim", "2026-08-02T13:00:00Z", 1),
  act(5, "Ride", "2026-08-03T13:00:00Z", 15, { visibility: "followers_only" }),
  act(6, "Ride", "2026-06-01T02:00:00Z", 12),   // 7 pm May 31 in Phoenix: before the training count starts
  act(7, "Ride", "2027-01-01T15:00:00Z", 40),   // the first 2027 ride
  act(8, "Run", "2027-01-02T15:00:00Z", 5),
];

test("season boundaries are Phoenix midnight", () => {
  assert.equal(S.seasonAt(Date.parse("2027-01-01T06:59:59Z")).key, "training");
  assert.equal(S.seasonAt(Date.parse("2027-01-01T07:00:00Z")).key, "2027");
  assert.equal(new Date(S.TRAINING.start).toISOString(), "2026-06-01T07:00:00.000Z");
});

test("training count: public rides since June 1 (Phoenix) only — no runs, swims, private rides or 2027 rides", async () => {
  const { body } = await at("2026-10-26T16:00:00Z", { activities: SET });
  assert.equal(body.season.key, "training");
  assert.equal(body.rides, 2);
  assert.equal(body.totalMiles, 50);
  assert.ok(body.recent.every((r) => r.discipline === "bike"));
});

test("2027 count starts from zero at midnight and never serves the training total, even from a fresh cache", async () => {
  const cached = { ts: Date.parse("2027-01-01T06:55:00Z"), dirty: false, data: { totalMiles: 999, miles: 999, rides: 9, season: { key: "training" } } };
  const { body, calls } = await at("2027-01-01T07:05:00Z", { activities: SET, blob: cached });
  assert.ok(calls.some((u) => /after=1798786800/.test(u)), "asks Strava for activities after Jan 1, 2027 (Phoenix)");
  assert.equal(body.season.key, "2027");
  assert.equal(body.rides, 1);
  assert.equal(body.totalMiles, 40);
  assert.notEqual(body.cached, true);
});

test("an old record without a season (before this change) is recomputed, not served", async () => {
  const cached = { ts: Date.parse("2026-10-26T15:59:00Z"), dirty: false, data: { totalMiles: 999, miles: 999, rides: 9 } };
  const { body } = await at("2026-10-26T16:00:00Z", { activities: SET, blob: cached });
  assert.equal(body.totalMiles, 50);
});

test("the manual training offset never carries into 2027", async () => {
  const t = await at("2026-10-26T16:00:00Z", { activities: SET, env: { MANUAL_BONUS_MILES: "10" } });
  assert.equal(t.body.totalMiles, 60);
  const y = await at("2027-03-01T16:00:00Z", { activities: SET, env: { MANUAL_BONUS_MILES: "10" } });
  assert.equal(y.body.totalMiles, 40);
});

test("seasonText and flipSeason keep one side visible", () => {
  const before = S.seasonText("a", "b", Date.parse("2026-12-31T12:00:00Z"));
  assert.equal(before, '<span data-season="training">a</span><span data-season="2027" hidden>b</span>');
  const after = S.flipSeason(before, Date.parse("2027-01-01T08:00:00Z"));
  assert.equal(after, '<span data-season="training" hidden>a</span><span data-season="2027">b</span>');
});
