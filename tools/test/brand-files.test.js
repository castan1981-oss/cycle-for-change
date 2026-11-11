// The files that carry the mark with no page around them (tools/brand-files.py). Every address that has ever served
// a logo or a share card serves the current one, so a link from last year never shows a retired mark.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const SITE = path.join(ROOT, "cfc-site");
const MARK = require(path.join(ROOT, "scripts/mark-2027.js"));
const read = (f) => fs.readFileSync(path.join(SITE, f));
const tool = fs.readFileSync(path.join(ROOT, "tools/brand-files.py"), "utf8");
const list = (name) => JSON.parse((tool.match(new RegExp(`^${name} = (\\[[^\\]]*\\])`, "m")) || [])[1] || "[]");

test("the icon is the mark on its pink plate", () => {
  const icon = read("favicon.svg").toString();
  assert.ok(icon.includes(MARK.PINK), "the plate is the mark's pink");
  assert.ok(!/#A84C58|#8F3E4A|#D9B1AA|#B04A5B/i.test(icon), "nothing retired");
});

test("the retired marks' addresses serve the icon", () => {
  const names = list("OLD_MARKS");
  assert.deepStrictEqual(names, ["mark.svg", "assets/logo.svg"], "the wheel's and the three strokes' addresses");
  for (const f of names) {
    assert.ok(read(f).equals(read("favicon.svg")), `${f} is the icon (python3 tools/brand-files.py)`);
    assert.ok(!/swim|#5C6B4A|#E9E224/i.test(read(f).toString()), `${f}: no retired mark, no retired framing`);
  }
});

test("the old share cards' addresses serve the current card", () => {
  const chrome = fs.readFileSync(path.join(ROOT, "scripts/chrome.js"), "utf8");
  const card = (chrome.match(/const OG_IMAGE = `\$\{SITE\}\/(og-cfc-\d+\.png)`/) || [])[1];
  assert.ok(card, "chrome.js names the share card");
  const names = list("OLD_CARDS");
  assert.ok(names.includes("og-cfc.png") && names.includes("og-image.png"));
  for (const f of names) assert.ok(read(f).equals(read(card)), `${f} is ${card}`);
});
