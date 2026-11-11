// Nov 11, 2026: the homepage hero's opening (data/hero-open.json -> scripts/build-home.js -> /home.js, /home.css).
// Robert asked for his reel on the homepage with no play button, nothing that looks like a video. These are the rules
// that keep it that way, and keep it safe to watch:
//   - it ends inside five seconds and nothing on the first screen loops, so nothing needs a pause control (WCAG 2.2.2);
//   - no more than three tiles change in any one second (WCAG 2.3.1);
//   - every tile is a photo from the registry (cleared for cars and faces), and its file is in the repo;
//   - the hero carries no <video> and no pause button, and the count on the plate is the page's own, never typed.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const spec = JSON.parse(fs.readFileSync(path.join(ROOT, "data/hero-open.json"), "utf8"));
const { PHOTOS } = require("../../scripts/photos.js");
const home = fs.readFileSync(path.join(ROOT, "cfc-site/index.html"), "utf8");
const js = fs.readFileSync(path.join(ROOT, "cfc-site/home.js"), "utf8");
const css = fs.readFileSync(path.join(ROOT, "cfc-site/home.css"), "utf8");
const hero = home.slice(home.indexOf('<section class="hero"'), home.indexOf("</section>", home.indexOf('<section class="hero"')));
const all = spec.tiles.concat([spec.card]);

test("the opening ends inside five seconds", () => {
  assert.ok(spec.end > 0 && spec.end <= 5, `end is ${spec.end}`);
  for (const t of spec.tiles) assert.ok(t.in >= 0 && t.out > t.in && t.out <= spec.end, `${t.id}: ${t.in} to ${t.out}`);
  assert.ok(spec.card.in < spec.count[0] + 0.001 && spec.count[0] < spec.count[1] && spec.count[1] <= spec.card.label && spec.card.label < spec.end, "the card comes in, the count runs, the words land, then it holds");
  assert.ok(spec.end - spec.card.label >= 0.8, "the landed number holds long enough to read");
});

test("no more than three tiles change in any one second", () => {
  const starts = all.map((t) => t.in).sort((a, b) => a - b);
  // the five small tiles come in as one beat (each a sixth of a second after the last, all out together): count the beat once
  const beats = starts.filter((s, i) => i === 0 || s - starts[i - 1] >= 0.2);
  for (const s of beats) assert.ok(beats.filter((x) => x >= s && x < s + 1).length <= 3, `more than three beats start in the second after ${s}`);
  for (const t of spec.tiles) assert.ok(t.out - t.in >= 0.2, `${t.id} is on screen for under a fifth of a second`);
});

test("every tile is a registry photo and its file is there", () => {
  for (const t of all) {
    assert.ok(PHOTOS[t.photo], `${t.photo} is not in scripts/photos.js`);
    assert.ok(fs.existsSync(path.join(ROOT, "cfc-site/img/home/open", `${t.id}-${spec.n}.webp`)), `${t.id}-${spec.n}.webp is missing: python3 tools/hero-open.py`);
  }
  const files = fs.readdirSync(path.join(ROOT, "cfc-site/img/home/open")).filter((f) => f.endsWith(".webp"));
  assert.deepStrictEqual(files.sort(), all.map((t) => `${t.id}-${spec.n}.webp`).sort(), "no old tiles left in cfc-site/img/home/open/");
  assert.ok(files.reduce((n, f) => n + fs.statSync(path.join(ROOT, "cfc-site/img/home/open", f)).size, 0) < 330 * 1024, "the tiles together stay under 330 KB");
});

test("the page carries the tiles the data lists, as plain images that wait for the script", () => {
  for (const t of all) assert.ok(hero.includes(`data-src="/img/home/open/${t.id}-${spec.n}.webp"`), `${t.id} is not in the hero: node scripts/build-home.js`);
  assert.ok(!/<img[^>]*class="ho-[^"]*"[^>]*\ssrc=/.test(hero), "a tile has a src: it would load for readers who never see the opening");
  assert.ok(hero.includes(`data-end="${spec.end}"`), "the stage carries the data's end");
  assert.ok(/class="wrap ho-wrap" aria-hidden="true"/.test(hero) && /class="hero-open" aria-hidden="true"/.test(hero), "the opening is hidden from assistive tech");
});

test("no video and no pause button on the first screen", () => {
  assert.ok(!/<video/i.test(hero), "a <video> in the hero");
  assert.ok(!/hero-pause|heroPause|hp-play|hp-pause/.test(hero + js + css), "a pause button in the hero");
  assert.ok(!/<button/i.test(hero), "a button in the hero");
  assert.ok(!/animation[^;{}]*infinite/.test(css.slice(css.indexOf("the opening (Nov 11"), css.indexOf("under 700px tall"))), "something in the opening loops");
});

test("the count on the plate is the page's own", () => {
  assert.ok(/<b class="ho-n num" id="heroOpenN"><\/b>/.test(hero), "the plate's number is typed into the page");
  assert.ok(/feed\.miles/.test(js.slice(js.indexOf("the opening (Nov 11"), js.indexOf("today's film (#today)"))), "the opening reads the page's tally");
  assert.ok(hero.includes('<span data-season="training"') && hero.includes('<span data-season="2027"'), "the words under the number switch with the season");
});

test("the <head> decides before the first paint, and gives up by itself", () => {
  const head = home.slice(0, home.indexOf("</head>"));
  const m = head.match(/<script>\(function\(d,c\)\{[\s\S]*?<\/script>/);
  assert.ok(m, "the inline script is in <head>");
  for (const need of ["prefers-reduced-motion: reduce", "saveData", "hero-opening", "cfcOpenGo", "setTimeout", "location.hash", "back_forward"]) assert.ok(m[0].includes(need), `the <head> script lost ${need}`);
  assert.ok(head.indexOf(m[0]) < head.indexOf('href="/home.css'), "the decision comes before the stylesheet paints");
});
