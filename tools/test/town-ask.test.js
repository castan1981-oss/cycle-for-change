// Just ask on a town guide (cfc-site/events/ask.js): the question is matched to the guide's own places and questions.
const test = require("node:test");
const assert = require("node:assert");
const { match } = require("../../cfc-site/events/ask.js");

const data = {
  url: "/towns/california/ojai/",
  pages: [{ s: "coffee", k: "Coffee", b: "Coffee in Ojai", c: 2 }, { s: "hotels", k: "Sleep", b: "Hotels in Ojai", c: 2 }, { s: "bike-shops", k: "Fix", b: "Bike shops in Ojai", c: 1 }, { s: "routes", k: "Ride", b: "Rides in Ojai", c: 1 }],
  places: [
    { s: "coffee", n: "First Cup", l: "Opens before the rides.", h: "6 am daily" },
    { s: "coffee", n: "Late Cup", l: "A post-ride place." },
    { s: "hotels", n: "Plain Inn", l: "Rooms downtown." },
    { s: "hotels", n: "Bike Inn", l: "Rooms on the path.", b: "Loaner bikes for guests." },
    { s: "bike-shops", n: "The Shop", l: "Repairs and rentals.", f: ["repair", "rental"] },
    { s: "routes", n: "Valley Trail", l: "Paved rail trail.", f: ["path"] },
  ],
  faq: [{ q: "How long is the Valley Trail?", a: "Nine miles." }],
};
const names = (q) => match(data, q).places.map((e) => e.n);

test("coffee questions get coffee, the one with hours first when the question is about early", () => {
  assert.deepStrictEqual(names("Where can I get coffee early?"), ["First Cup", "Late Cup"]);
});
test("a hotel question with a bike in it puts the stated bike policy first, and is not a route question", () => {
  assert.deepStrictEqual(names("Where can I stay with a bike?"), ["Bike Inn", "Plain Inn"]);
});
test("a repair question gets the shop", () => { assert.deepStrictEqual(names("My derailleur is bent, who can fix it?"), ["The Shop"]); });
test("a place asked for by name comes first", () => { assert.strictEqual(names("is the valley trail paved")[0], "Valley Trail"); });
test("a guide question is answered from the guide's own answer", () => { assert.strictEqual(match(data, "How long is the Valley Trail?").faq.a, "Nine miles."); });
test("nothing that fits returns nothing, never a guess", () => {
  const r = match(data, "zzz qqq");
  assert.strictEqual(r.places.length, 0); assert.strictEqual(r.faq, null);
});
test("crisis words skip the search", () => {
  const r = match(data, "I want to die");
  assert.strictEqual(r.crisis, true); assert.strictEqual(r.places.length, 0);
});
test("same question, same answer", () => { assert.deepStrictEqual(match(data, "coffee"), match(data, "coffee")); });
