// Oct 31, 2026: the season switch in /chrome.js and /home.js must only touch the two wording spans.
// Ride pages (<article data-ride data-season="4-10">) and ride rows carry their own data-season; a bare
// "[data-season]" selector hid the whole ride article on every ride page (Oct 28–31, 2026).
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..");
for (const f of ["cfc-site/chrome.js", "cfc-site/home.js"]) {
  test(`${f} only toggles the season wording`, () => {
    const src = fs.readFileSync(path.join(ROOT, f), "utf8");
    assert.ok(!/querySelectorAll\(\s*["']\[data-season\]["']\s*\)/.test(src), "bare [data-season] selector");
    assert.ok(src.includes(`[data-season="2027"], [data-season="training"]`), "the two wordings, by value");
  });
}
