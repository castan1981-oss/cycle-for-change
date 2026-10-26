"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { listLede } = require("../lib/list-lede.js");

let n = 0;
const ride = (o = {}) => ({ name: `Ride ${++n}`, days: ["sat"], start_hhmm: "07:00", frequency: "weekly", discipline: ["road"],
  kind: "group-ride", inclusive_focus: [], drop_policy: "drop", verified_on: "2026-10-01", ...o });

test("under two rides there's nothing to say", () => {
  assert.deepStrictEqual(listLede([]), []);
  assert.deepStrictEqual(listLede([ride()]), []);
});

test("one day for all of them, and both for two", () => {
  assert.match(listLede([ride(), ride(), ride()])[0], /^All 3 ride on Saturdays\.$/);
  assert.match(listLede([ride(), ride()])[0], /^Both ride on Saturdays\.$/);
});

test("a big day leads when it holds 40% or more", () => {
  const s = listLede([ride(), ride(), ride({ days: ["sun"] }), ride({ days: ["tue"] }), ride({ days: ["wed"] })])[0];
  assert.strictEqual(s, "Saturday is the big day: 2 of the 5 ride then.");
});

test("a spread week names the busiest day, and the one day with none", () => {
  const days = ["mon", "tue", "wed", "thu", "fri", "sat"];
  const rides = [...days.map((d) => ride({ days: [d] })), ...days.slice(0, 3).map((d) => ride({ days: [d] }))];
  assert.strictEqual(listLede(rides)[0], "They ride on 6 days of the week; Monday, Tuesday and Wednesday have the most, 2 each; only Sunday has none.");
});

test("one ride a day just lists the days", () => {
  assert.strictEqual(listLede([ride({ days: ["thu"] }), ride({ days: ["sat"] })])[0], "They ride on Thursdays and Saturdays.");
});

test("earliest and latest start by name, or just the times when a name runs long", () => {
  const s = listLede([ride({ name: "Dawn Patrol", start_hhmm: "05:30" }), ride({ name: "Taco Tuesday", start_hhmm: "18:30", days: ["tue"] }), ride()]);
  assert.ok(s.includes("The earliest start is Dawn Patrol at 5:30 am; the latest is Taco Tuesday at 6:30 pm."));
  const long = listLede([ride({ name: "A".repeat(50), start_hhmm: "05:30" }), ride({ start_hhmm: "09:00" })]);
  assert.ok(long.includes("Starts run from 5:30 am to 9:00 am."));
});

test("a day page leads with the times and never repeats the day", () => {
  const s = listLede([ride({ start_hhmm: "06:00" }), ride({ start_hhmm: "08:00" })], { focus: { day: "sat" } });
  assert.ok(!s.some((x) => /Saturday/.test(x)));
  assert.match(s[0], /^The earliest start/);
});

test("weekday evenings, and all of them when every one is after work", () => {
  const ev = (d) => ride({ days: [d], start_hhmm: "18:00" });
  assert.ok(listLede([ev("tue"), ev("wed"), ride(), ride()]).includes("After work, 2 roll on a weekday evening."));
  assert.ok(listLede([ev("tue"), ev("thu")]).includes("Both start at 5 pm or later, after work."));
  // a weekend evening isn't an after-work ride
  assert.ok(!listLede([ride({ start_hhmm: "18:00" }), ride({ start_hhmm: "19:00" })]).some((x) => /after work/.test(x)));
});

test("no-drop and beginners, and a no-drop page doesn't say no-drop again", () => {
  const rides = [ride({ drop_policy: "no-drop" }), ride({ inclusive_focus: ["beginner"] }), ride()];
  assert.ok(listLede(rides).includes("The group waits for everyone on 1 of them (no-drop), and beginners are welcome on 1."));
  const nd = [ride({ drop_policy: "no-drop" }), ride({ drop_policy: "no-drop", inclusive_focus: ["beginner"] })];
  assert.ok(listLede(nd).includes("Both are no-drop, so the group waits for everyone, and beginners are welcome on 1."));
  assert.ok(!listLede(nd, { focus: { tag: "no-drop" } }).some((x) => /no-drop/.test(x)));
});

test("who else they're made for, in one sentence, never the page's own tag", () => {
  const rides = [ride({ inclusive_focus: ["lgbtq"] }), ride({ inclusive_focus: ["wtf"] }), ride({ inclusive_focus: ["wtf"] })];
  assert.ok(listLede(rides).includes("There's one ride made for LGBTQ+ riders and 2 for women, trans and femme riders."));
  assert.ok(listLede(rides, { focus: { tag: "lgbtq" } }).includes("There are 2 rides made for women, trans and femme riders."));
});

test("bikes: all one kind, a mix, Critical Mass on the side, and other bikes on a gravel page", () => {
  assert.ok(listLede([ride(), ride(), ride()]).includes("All 3 are road rides."));
  const mix = [ride(), ride(), ride({ discipline: ["gravel"] }), ride({ discipline: ["mtb"], kind: "critical-mass" })];
  assert.ok(listLede(mix).includes("By bike: 2 road, 1 gravel and 1 mountain bike, plus a Critical Mass."));
  const gravel = [ride({ discipline: ["gravel", "road"] }), ride({ discipline: ["gravel"] })];
  assert.ok(listLede(gravel, { focus: { disc: "gravel" } }).includes("Some are listed for other bikes too: 1 road."));
});

test("how often: every week, once a month, or a mix", () => {
  assert.ok(listLede([ride(), ride(), ride()]).includes("All 3 run every week."));
  assert.ok(listLede([ride({ frequency: "monthly" }), ride({ frequency: "monthly" })]).includes("Both run once a month."));
  const mix = [ride(), ride({ frequency: "biweekly" }), ride({ frequency: "monthly" })];
  assert.ok(listLede(mix).includes("They run 1 every week, 1 every other week and 1 once a month."));
});

test("the check comes last, as a window, and it's the build's own date, not the clock", () => {
  const s = listLede([ride({ verified_on: "2026-09-15" }), ride({ _f: { checked_on: "2026-10-19" } }), ride({ verified_on: "2026-10-01" })]);
  assert.strictEqual(s[s.length - 1], "Each one was checked at its source between Sep 15 and Oct 19, 2026.");
  const same = listLede([ride(), ride()]);
  assert.strictEqual(same[same.length - 1], "Both were checked at the source on Oct 1, 2026.");
});

test("never more than six sentences, no sentence opens on a number, nothing undefined", () => {
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const rides = days.flatMap((d, i) => [ride({ days: [d], start_hhmm: i % 2 ? "18:00" : "06:00", drop_policy: i % 3 ? "drop" : "no-drop",
    inclusive_focus: i % 2 ? ["beginner", "wtf"] : ["lgbtq"], discipline: [["road", "gravel", "mtb"][i % 3]], frequency: i % 4 ? "weekly" : "monthly" }), ride({ days: [d] })]);
  const s = listLede(rides);
  assert.ok(s.length <= 6);
  for (const x of s) {
    assert.doesNotMatch(x, /^\d/);
    assert.doesNotMatch(x, /undefined|null|NaN|\s{2}|\.\./);
    assert.match(x, /\.$/);
  }
});

test("the same rides always write the same words", () => {
  const a = [ride({ name: "X" }), ride({ name: "Y", days: ["sun"] })];
  assert.deepStrictEqual(listLede(a), listLede(a.slice().reverse()));
});

test("a kind hub doesn't count its own kind", () => {
  const cm = [ride({ kind: "critical-mass", discipline: ["social"] }), ride({ kind: "critical-mass", discipline: ["social"] })];
  assert.ok(listLede(cm).some((x) => /Critical Mass/.test(x)));
  assert.ok(!listLede(cm, { focus: { kind: "critical-mass" } }).some((x) => /Critical Mass/.test(x)));
});
