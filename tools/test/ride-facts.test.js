"use strict";
// tools/lib/ride-facts.js: what a rider reads off a ride before opening it (Pass 22, Oct 2, 2026).
// Every case here is a real record, or the rider complaint that found the bug.
// node --test tools/test/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const X = require("../lib/ride-facts.js");

const ride = (o) => ({ country: "US", discipline: ["road"], inclusive_focus: [], drop_policy: "unknown", pace: null, ...o });

test("a posted average wins over keywords and over the same group's flats speed", () => {
  // GDB Downtown Gelato Ride, Dallas: was tagged fast; the text says about 13 mph average and no-drop
  const gelato = ride({ pace: "14–18 mph on the flats, about 13 mph average", drop_policy: "no-drop", inclusive_focus: ["no-drop"] });
  assert.deepEqual(X.paceOf(gelato), ["easy"]);
  assert.equal(X.paceText(gelato), "13 mph avg");
  // "fast" in the words never overrides a posted average of 14 mph or less
  assert.ok(!X.paceOf(ride({ pace: "Fast-ish social ride, 12–14 mph average" })).includes("fast"));
  assert.deepEqual(X.paceOf(ride({ pace: "rolling 14–17 mph, ~13 mph average" })), ["easy"]);
  // with several groups each average counts
  assert.deepEqual(X.paceOf(ride({ pace: "Two groups: the 3s average 15–16 mph, the 4s average 11–13 mph", drop_policy: "groups" })), ["easy", "steady"]);
});
test("a drop ride stays fast; posted speeds sort the rest", () => {
  assert.ok(X.paceOf(ride({ pace: "social pace", drop_policy: "drop" })).includes("fast"));
  assert.deepEqual(X.paceOf(ride({ pace: "20 mph or faster average" })), ["fast"]);
  assert.deepEqual(X.paceOf(ride({ pace: "C 13–15, B 16–18, A 19–21 mph", drop_policy: "groups" })), ["easy", "steady", "fast"]);
  assert.deepEqual(X.paceOf(ride({ pace: "Race pace" })), ["fast"]);
  // words that say it isn't fast
  assert.ok(!X.paceOf(ride({ pace: "Not competitive, not particularly fast" })).includes("fast"));
  assert.ok(!X.paceOf(ride({ pace: "Friendly and a bit slower than race or e-bike speeds" })).includes("fast"));
});
test("numbers that aren't speeds are left alone", () => {
  const sun = ride({ pace: "30 to 50+ miles depending on the time of year. Average 13 to 15 mph on the club's schedule page, and 12.5 to 13.5 mph in the RideWithGPS event text." });
  assert.ok(X.speedsOf(sun.pace).every((t) => t.lo >= 12));
  assert.deepEqual(X.speedsOf("no-drop, intermediate, 1.5–2 hours, finishes after dark").length, 0);
  assert.deepEqual(X.speedsOf("Leisurely 10-12 mph; a faster group of 14-16 mph leaves at 9:30").map((t) => t.hi), [12, 16]);
  assert.deepEqual(X.speedsOf("L3+ and L2; frequent regroups").length, 0);
});
test("the row's pace: the posted range, km/h first outside the US, else a plain word", () => {
  assert.equal(X.paceText(ride({ pace: "14-16 mph" })), "14–16 mph");
  assert.equal(X.paceText(ride({ pace: "A 22+ mph, B 18+ mph, C 15+ mph", drop_policy: "groups" })), "15–22+ mph");
  assert.equal(X.paceText(ride({ country: "GB", pace: "13–15 mph / 21–23 km/h" })), "21–23 km/h");
  assert.equal(X.paceText(ride({ country: "ES", pace: "Easy: 23 to 25 km/h on the flat, 18 to 23 km/h on climbs" })), "18–25 km/h");
  assert.equal(X.paceText(ride({ pace: "party pace" })), "Easy pace");
  assert.equal(X.paceText(ride({ pace: "Intermediate" })), "Steady pace");
  assert.equal(X.paceText(ride({ pace: "race pace" })), "Fast");
  assert.equal(X.paceText(ride({ pace: null })), "");
  // PMBC Saturday Cycling: the only number is the fast riders'; it isn't the ride's pace
  const pmbc = ride({ pace: "Standard route is no-drop with a sweep rider; faster riders go around 20 mph", drop_policy: "no-drop", inclusive_focus: ["no-drop", "beginner"] });
  assert.equal(X.paceText(pmbc), "Easy pace");
});
test("the row's length: mi in the US, km outside it", () => {
  assert.equal(X.lengthText(ride({ distance_miles: "25–30" })), "25–30 mi");
  assert.equal(X.lengthText(ride({ distance_miles: 25, distance_km: 40.2 })), "25 mi");
  assert.equal(X.lengthText(ride({ distance_miles: "~20" })), "20 mi");
  assert.equal(X.lengthText(ride({ distance_miles: "under 20" })), "Up to 20 mi");
  assert.equal(X.lengthText(ride({ distance_miles: "21.5 (A and B routes), 18.5 (C route)" })), "18.5–21.5 mi");
  assert.equal(X.lengthText(ride({ country: "GB", distance_miles: 25, distance_km: 40 })), "40 km");
  assert.equal(X.lengthText(ride({ distance_miles: null })), "");
});
test("the first-time checklist describes the easiest group the host posted, never the fastest", () => {
  // PMBC Saturday Cycling, Tempe: "Beginner friendly" + "Waits for you" said "Expect 20 mph: fast"
  const pmbc = ride({ pace: "Standard route is no-drop with a sweep rider; faster riders go around 20 mph", drop_policy: "no-drop", inclusive_focus: ["no-drop", "beginner"] });
  const p = X.firstPace(pmbc).text;
  assert.doesNotMatch(p, /Expect 20 mph|race or train/);
  assert.match(p, /not the fast one/);
  const groups = X.firstPace(ride({ pace: "A 20+ mph, B 16–20, C 14–16", drop_policy: "groups" })).text;
  assert.match(groups, /easiest pace the host lists is 14–16 mph/);
  assert.match(X.firstPace(ride({ pace: "Regular ride: 10 to 14 mph. Casual ride: 8 to 10 mph over 8 to 10 miles.", drop_policy: "no-drop", inclusive_focus: ["beginner"] })).text, /8–10 mph/);
  // a fast ride with no slow group still says fast
  assert.match(X.firstPace(ride({ pace: "20 mph or faster average" })).text, /race or train/);
});
test("casual and social rides never get 'you'll breathe hard on the hills'", () => {
  // Bear Claw Ride, Peoria: "strictly social and very casual"
  const bear = ride({ discipline: ["social"], pace: "Average 10 to 13 mph. The host calls it a strictly social ride and very casual." });
  assert.doesNotMatch(X.firstPace(bear).text, /breathe hard/);
  assert.doesNotMatch(X.firstPace(ride({ pace: "relaxed social pace, 14–16 mph" })).text, /breathe hard/);
  assert.match(X.firstPace(ride({ pace: "14–16 mph" })).text, /breathe hard/);
});
test("e-bikes: only the ride's own words, never the host's name", () => {
  const eb = (o) => X.ebikeOf(ride(o));
  // Global Bikes & E-Bikes: the shop's name says nothing about the ride
  assert.equal(eb({ host: { name: "Global Bikes & E-Bikes" }, description: "A Saturday shop ride with three pace groups." }), null);
  // The Bike Lane AZ
  assert.equal(eb({ visitor_notes: "The Meetup page says no current cycling experience is needed and that many members ride e-bikes." }).k, "welcome");
  // Sun City Tuesday Casual
  const sc = eb({ visitor_notes: "A certified helmet is required. Class 2 and throttle e-bikes are not allowed. Rain cancels." });
  assert.equal(sc.k, "limited"); assert.equal(sc.ok, true);
  assert.equal(eb({ description: "Only Class 1 e-bikes are allowed." }).label, "Class 1 only");
  assert.equal(eb({ description: "Class 1 e-bikes only." }).label, "Class 1 only");
  assert.equal(eb({ visitor_notes: "No e-bikes, earbuds, aero bars or flashing lights." }).k, "no");
  assert.equal(eb({ visitor_notes: "The group asks that you leave e-bikes at home." }).k, "no");
  assert.equal(eb({ visitor_notes: "E-bikes not recommended." }).k, "discouraged");
  assert.equal(eb({ description: "E-bikes and regular bikes both welcome, and the shop rents e-bikes." }).k, "welcome");
  // a separate e-bike ride, rentals or a speed comparison isn't this ride's rule
  assert.equal(eb({ description: "PMBA also runs an e-bike ride the same day at 9:00 am from Pioneer Park." }), null);
  assert.equal(eb({ description: "E-bike rentals are available." }), null);
  assert.equal(eb({ pace: "Friendly and a bit slower than race or e-bike speeds" }), null);
  // the strictest thing said wins
  assert.equal(eb({ description: "E-bikes welcome.", visitor_notes: "Class 2 and throttle e-bikes are not allowed." }).k, "limited");
});
