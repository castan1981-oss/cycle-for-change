// The print and social kit (tools/cfc-kit/) draws the mark from the one drawing and uses the pink family.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const DIR = path.join(ROOT, "tools/cfc-kit");
const MARK = require(path.join(ROOT, "scripts/mark-2027.js"));
const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".py"));

test("the kit carries no copy of a mark and nothing retired", () => {
  assert.ok(files.length >= 5, "lib, make, social, printkit, kitpage");
  for (const f of files) {
    const s = fs.readFileSync(path.join(DIR, f), "utf8");
    assert.ok(!/M52 34 V24 Q52 8 36 8|M11 4 L30 68 L49 4/.test(s), `${f}: the Lane Paint stencil's letters are retired`);
    assert.ok(!/#A84C58|#8F3E4A|#D9B1AA|#B04A5B/i.test(s), `${f}: smeared rose, rose ink, powder rose and 7419 C are retired`);
    assert.ok(!/\bstencil\(/.test(s), `${f}: the mark is mark(), from scripts/mark-2027.js`);
  }
});

test("the weekly carousel tool draws the mark from the one drawing too", () => {
  const s = fs.readFileSync(path.join(ROOT, "tools/week-kit/make.py"), "utf8");
  assert.ok(!/M52 34 V24 Q52 8 36 8|M11 4 L30 68 L49 4/.test(s), "the Lane Paint stencil's letters are retired");
  assert.ok(!/#A84C58|#8F3E4A|#D9B1AA|#B04A5B/i.test(s), "smeared rose, rose ink, powder rose and 7419 C are retired");
  assert.ok(/scripts\/mark-2027\.js/.test(s) && s.includes(`PLATE = "${MARK.PINK}"`), "the mark and its pink come from scripts/mark-2027.js");
});

test("the kit's pinks are the site's", () => {
  const lib = fs.readFileSync(path.join(DIR, "lib.py"), "utf8");
  const css = fs.readFileSync(path.join(ROOT, "cfc-site/chrome.css"), "utf8");
  const tok = (name) => (css.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`)) || [])[1];
  const kit = (name) => (lib.match(new RegExp(`\\b${name}="(#[0-9A-Fa-f]{6})"`)) || [])[1];
  assert.strictEqual(kit("plate"), MARK.PINK, "plate is the mark's pink");
  assert.strictEqual(kit("plate").toUpperCase(), tok("plate").toUpperCase(), "plate is --plate");
  assert.strictEqual(kit("rose").toUpperCase(), tok("creosote").toUpperCase(), "rose is --creosote, the pink a step down");
  assert.strictEqual(kit("rose_ink").toUpperCase(), tok("creosote-ink").toUpperCase(), "rose_ink is --creosote-ink");
  assert.strictEqual(kit("powder").toUpperCase(), tok("creosote-lift").toUpperCase(), "powder is --creosote-lift, pink on dark");
  assert.ok(/scripts\/mark-2027\.js/.test(lib), "lib.py reads the mark from scripts/mark-2027.js");
});
