"use strict";
// derive-ride-fields.js reads seasons, monthly rules and start times out of the human text.
// These are the mistakes it used to make on real records (Sept 30, 2026).
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

function derive(records) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "derive-"));
  const file = path.join(dir, "rides.json");
  const base = { name: "X", city: "Phoenix", state: "AZ", lat: 33.45, lng: -112.07, discipline: ["road"], frequency: "weekly", days: ["sat"], sources: ["https://example.org/"] };
  fs.writeFileSync(file, JSON.stringify(records.map((r, i) => ({ ...base, slug: `ride-${i}`, ...r }))));
  execFileSync(process.execPath, [path.join(__dirname, "..", "derive-ride-fields.js"), "--data", file], { stdio: "pipe" });
  const out = JSON.parse(fs.readFileSync(file, "utf8"));
  return (i) => out.find((r) => r.slug === `ride-${i}`);
}

test("seasons: year-round means year-round, and dates or start-time tables are not seasons", () => {
  const got = derive([
    { season: "year-round", schedule: "Every Saturday morning. 6:30 am from the first Saturday of September, 7:00 am from the second Saturday of October." },
    { season: null, schedule: "Every Saturday, 7:00 am Apr–Nov, 8:00 am Dec–Mar." },
    { season: null, schedule: "Every Saturday, 9:00 am (summer) / 10:00 am (winter)" },
    { season: null, schedule: "Every Tuesday, 6:30 pm since Sept 22, 2026 (it was 7:15 pm through Sept 15)." },
    { season: null, schedule: "Every Tuesday, 9:00 am (8:00 am late May through mid-September)" },
    { season: null, schedule: "Every Friday. 7:00 am since Sept 25; it ran at 5:30 or 6:00 am from July to early September." },
    { season: null, schedule: "Every Thursday from Viewpoint Park (Coyote Springs Rd out and back)." },
    { season: null, schedule: "Every Sunday. Usual start by month: Jan-Feb 9:00 am, Mar 8:00, Apr 7:30." },
    { season: null, schedule: "Every Thursday, 8:00 am. Few riders from April to mid October, 4 to 8 from late October through March." },
    { season: null, schedule: "Every Saturday from Pike Place Market; the start may vary." },
  ]);
  for (let i = 0; i <= 9; i++) assert.equal(got(i).season_months, null, `record ${i}: ${got(i).schedule}`);
});

test("seasons that are seasons", () => {
  const got = derive([
    { season: "Apr–Oct" },
    { season: "May–fall" },
    { season: "spring–Sep" },
    { season: "summer" },
    { season: null, schedule: "Thursdays, 5:30 pm, spring and summer" },
    { season: "Oct 24 to Nov 21, 2026 (five-week program)" },
    { season: "Nov–Apr" },
  ]);
  assert.deepEqual(got(0).season_months, { start: 4, end: 10 });
  assert.deepEqual(got(1).season_months, { start: 5, end: 10 });
  assert.deepEqual(got(2).season_months, { start: 4, end: 9 });
  assert.deepEqual(got(3).season_months, { start: 4, end: 10 });
  assert.deepEqual(got(4).season_months, { start: 4, end: 9 });
  assert.deepEqual(got(5).season_months, { start: 10, end: 11 });
  assert.deepEqual(got(6).season_months, { start: 11, end: 4 });
});

test("a weekly ride that mentions a month in passing keeps every week", () => {
  const got = derive([
    { frequency: "weekly", schedule: "Every Saturday: A group rolls 8:15 am. On the first Saturday of the month the route runs in reverse." },
    { frequency: "monthly", schedule: "First Saturday of the month, 9:00 am" },
    { frequency: "biweekly", schedule: "1st and 3rd Tuesday of the month, meet 6:45 pm, roll 7:00 pm", days: ["tue"] },
  ]);
  assert.equal(got(0).monthly_rule, null);
  assert.deepEqual(got(1).monthly_rule, [{ ord: 1, day: "sat" }]);
  assert.deepEqual(got(2).monthly_rule, [{ ord: 1, day: "tue" }, { ord: 3, day: "tue" }]);
});

test("the start time: roll beats meet, and the time_local says the rest", () => {
  const got = derive([
    { schedule: "Every Wednesday evening: meet 6:15 pm, roll 6:30 pm from Oct 7, 2026 (Sept 30 was 7:00 pm).", time_local: "6:30 pm" },
    { schedule: "Every Saturday morning, 6:30 am from Oct 3, 2026 (it was 6:00 am).", time_local: "6:30 am" },
  ]);
  assert.equal(got(0).start_hhmm, "18:30");
  assert.equal(got(1).start_hhmm, "06:30");
});
