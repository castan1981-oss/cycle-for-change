// How we ride, the group-ride film (tools/how-we-ride/): its words are the page's words, its plate is the mark's pink,
// it carries no drawing of the mark of its own, and the files the ride pages name are there.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const film = fs.readFileSync(path.join(ROOT, "tools/how-we-ride/film.html"), "utf8");
const build = fs.readFileSync(path.join(ROOT, "tools/build-rides.js"), "utf8");
const MARK = require(path.join(ROOT, "scripts/mark-2027.js"));

test("the film's nine are the nine on /rides/about/ (HOW_STEPS)", () => {
  const chapters = [...film.matchAll(/\{ id: "\w+",\s+dur: [\d.]+, n: \d, name: "[^"]*",\s+q: "([^"]*)",\s+a: "([^"]*)",\s+why: "([^"]*)"/g)]
    .map((m) => [m[1], m[2], m[3]]);
  assert.strictEqual(chapters.length, 9, "nine numbered chapters in film.html");
  const from = build.indexOf("const HOW_STEPS = [");
  const steps = [...build.slice(from, build.indexOf("];", from)).matchAll(/\["([^"]*)", "([^"]*)", "([^"]*)"\]/g)].map((m) => [m[1], m[2], m[3]]);
  assert.strictEqual(steps.length, 9, "nine steps in build-rides.js");
  chapters.forEach(([q, a, why], i) => {
    assert.strictEqual(steps[i][0], q, `question ${i + 1}`);
    assert.strictEqual(steps[i][1], a, `answer ${i + 1}`);
    // the page's line may say more (the four hand signals are spelled out there); it starts with the film's line
    assert.ok(steps[i][2].startsWith(why), `why ${i + 1}: "${steps[i][2]}" should start with "${why}"`);
  });
});

test("the plate is the mark's pink; the mark comes from scripts/mark-2027.js; nothing retired is left", () => {
  assert.ok(film.includes(`--plate:${MARK.PINK};`), "film.html --plate is mark-2027.js PINK");
  assert.strictEqual(film.split("{{MARK}}").length - 1, 2, "one {{MARK}} in the head comment, one in the page");
  assert.ok(!/id="lp[A-Z]"|#lpRow/.test(film), "the Lane Paint stencil is retired");
  assert.ok(!/#D9B1AA|#A84C58|#8F3E4A|#B04A5B/i.test(film), "smeared rose, powder rose and 7419 C are retired");
  assert.ok(!/ of 9`/.test(film), 'no "3 of 9" over a chapter');
});

test("the film and its posters are where the ride pages point", () => {
  const m = build.match(/ride: \{ src: "(\/film\/how-we-ride-(\d+)\.mp4)", poster: "(\/film\/how-we-ride-\d+\.jpg)"/);
  assert.ok(m, "HOW_FILMS.ride in build-rides.js");
  assert.strictEqual(m[3], m[1].replace(/\.mp4$/, ".jpg"), "the poster carries the film's number");
  for (const ext of [".mp4", ".jpg", ".webp", ".avif"]) {
    assert.ok(fs.existsSync(path.join(ROOT, "cfc-site", m[1].replace(/\.mp4$/, ext))), `cfc-site${m[1].replace(/\.mp4$/, ext)}`);
  }
  const others = fs.readdirSync(path.join(ROOT, "cfc-site/film")).filter((f) => /^how-we-ride-\d+\./.test(f) && !f.startsWith(`how-we-ride-${m[2]}.`));
  assert.deepStrictEqual(others, [], "an older cut's files are deleted when the number moves");
});
