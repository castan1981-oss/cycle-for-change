"use strict";
// Start times read out of a ride's own words (tools/lib/ride-time.js, Oct 6, 2026). Each case below was a live
// mistake on Oct 5, 2026: speeds and road names read as clock times, bare morning times made evenings.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const T = require("../lib/ride-time.js");

const start = (r) => T.chooseStart({ name: "X", ...r });

test("speeds, distances and road names are never clock times", () => {
  // Naples Velo: "at a controlled 19-20 mph" was 7 pm
  assert.equal(start({ schedule: "Every Monday, 7:00 am, from the side lot of Naples Cyclery. Four laps in Pelican Bay at a controlled 19-20 mph, about 20 miles.", time_local: "7:00 am" }), "07:00");
  // Delray B+: "leaves A1A" was 1 pm
  assert.equal(start({ schedule: "Every Thursday. Group leaves A1A and Atlantic at 7:15 am; many riders start earlier at A1A and E. Palmetto and meet there. B+ pace, 18-20 mph, 40 to 50 miles.", time_local: "7:15 am" }), "07:15");
  // Mellow Johnny's: "ride at 14–16 mph" was 2 pm
  assert.equal(start({ schedule: "Every Monday, 6:00 pm. A 15–25 mile city ride at 14–16 mph.", time_local: "6:00 pm" }), "18:00");
  // Seminole Cyclists: "chat ride at 18-20 mph" was 6 pm
  assert.equal(start({ schedule: "Every Tuesday, 6:30 pm from Reiter Park. A recovery chat ride at 18-20 mph.", time_local: "6:30 pm" }), "18:30");
  assert.deepEqual(T.tokens("US-1 to I-10, 40 km, 4 laps, 19-20 mph").map((t) => t.raw), []);
});

test("a bare time takes am/pm from its own text", () => {
  // TriScottsdale: "Rolls out sharp at 5:35" on a 5:35–7:00 am ride was 5:35 pm
  assert.equal(start({ schedule: "Every Tuesday, 5:35 to 7:00 am. Rolls out sharp at 5:35 from the Village Tavern parking lot.", time_local: "5:35 am" }), "05:35");
  // Bonesaw: "meet 6:30 pm, roll 7:00" was 7 am
  assert.equal(start({ schedule: "Last Tuesday of the month: April–September from CEPRO Park (meet 6:30 pm, roll 7:00).", time_local: "7:00 pm" }), "19:00");
  // ATX Full Moon: "roll between 11:30 and 11:59 pm" was 11:30 am
  assert.equal(start({ schedule: "Meet 11:00 pm at the Pfluger Pedestrian Bridge, roll between 11:30 and 11:59 pm.", time_local: "11:30 pm" }), "23:30");
  // with no time_local at all
  assert.equal(start({ schedule: "Every Thursday, meet 6:45 pm, roll 7:00" }), "19:00");
  assert.equal(start({ schedule: "Saturday mornings, roll 7:00 from the shop" }), "07:00");
  assert.equal(start({ schedule: "Tuesday night ride, roll 7:00" }), "19:00");
  assert.equal(start({ schedule: "Every Sunday, 5:35 to 7:20 am" }), "05:35");
  assert.equal(start({ schedule: "Fridays, 11:30 to 1:00 pm" }), "11:30");
});

test("roll beats meet; 24-hour times read as written", () => {
  assert.equal(start({ schedule: "Every Wednesday, meet 6:15 pm, roll 6:30 pm" }), "18:30");
  assert.equal(start({ schedule: "Every Saturday, meet 8:45 am, depart 9:00 am" }), "09:00");
  assert.equal(start({ schedule: "Every Saturday, kickstands up 7:45 pm" }), "19:45");
  assert.equal(start({ schedule: "Sábados, salida 07:30 desde la plaza; vuelta a las 13:00" }), "07:30");
  assert.equal(start({ schedule: "Every Sunday, 19:00 from the square" }), "19:00");
});

test("a hand-set time, or one the ride's own words state, is never overwritten", () => {
  // set by hand: kept even though the text would read otherwise
  assert.equal(start({ schedule: "Every Tuesday, 5:30 pm; a second lap leaves at 6:30 pm", time_local: "5:30 pm", start_hhmm: "18:30", start_hhmm_by_hand: true }), "18:30");
  // stated in the text ("7:00 or 8:00 am"): whichever was chosen stays
  assert.equal(start({ schedule: "Every Sunday morning; 7:00 or 8:00 am depending on the season", start_hhmm: "08:00" }), "08:00");
  assert.equal(start({ schedule: "Every Sunday morning; 7:00 or 8:00 am depending on the season", start_hhmm: "07:00" }), "07:00");
  // a stored time the text contradicts gets corrected
  assert.equal(start({ schedule: "Every Monday, 7:00 am", time_local: "7:00 am", start_hhmm: "19:00" }), "07:00");
  // no time in the text at all: whatever was there stays
  assert.equal(start({ schedule: "Saturdays; time on the club's Strava", start_hhmm: "08:00" }), "08:00");
});

test("derive-ride-fields keeps start_hhmm_by_hand and drops a false flag", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ride-time-"));
  const file = path.join(dir, "rides.json");
  const base = { name: "X", city: "Phoenix", state: "AZ", lat: 33.45, lng: -112.07, discipline: ["road"], frequency: "weekly", days: ["tue"], sources: ["https://example.org/"] };
  fs.writeFileSync(file, JSON.stringify([
    { ...base, slug: "a", schedule: "Every Tuesday, 5:30 pm; a faster lap leaves at 6:30 pm", time_local: "5:30 pm", start_hhmm: "06:30", start_hhmm_by_hand: true },
    { ...base, slug: "b", schedule: "Every Tuesday, 5:35 to 7:00 am. Rolls out sharp at 5:35.", time_local: "5:35 am", start_hhmm: "17:35", start_hhmm_by_hand: false },
  ]));
  execFileSync(process.execPath, [path.join(__dirname, "..", "derive-ride-fields.js"), "--data", file], { stdio: "pipe" });
  const out = JSON.parse(fs.readFileSync(file, "utf8"));
  const a = out.find((r) => r.slug === "a"), b = out.find((r) => r.slug === "b");
  assert.equal(a.start_hhmm, "06:30"); assert.equal(a.start_hhmm_by_hand, true);
  assert.equal(b.start_hhmm, "05:35"); assert.ok(!("start_hhmm_by_hand" in b));
});
