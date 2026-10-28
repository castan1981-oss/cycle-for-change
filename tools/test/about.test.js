"use strict";
// /about/ (Oct 28, 2026): his words only, the house's never-list, and noindex while a slot is still open.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs"), path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..", "..");
execFileSync("node", [path.join(ROOT, "scripts", "build-about.js")], { cwd: ROOT });
const html = fs.readFileSync(path.join(ROOT, "cfc-site", "about", "index.html"), "utf8");
const A = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "about.json"), "utf8"));
const visible = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ");
const main = visible.slice(visible.indexOf("About me"));

test("no recovery reference anywhere on the page (the brief)", () => {
  assert.ok(!/\b(recover(y|ing|ed)?|sober|sobriety|relapse|rehab|addict(ion|ed)?|twelve.step|12.step|the steps|sponsor)\b/i.test(visible),
    "a recovery word is on /about/");
});

test("the never-list (CLAUDE.md §4)", () => {
  assert.ok(!/\$800|two suitcases|Prescott|est\. 2008/i.test(visible));
  assert.ok(!/\b(leverage|synergy|passionate about|thrilled to announce|excited to share)\b/i.test(visible));
  assert.ok(!/\bjourney\b/i.test(visible));
  assert.ok(!/you decide who|pledge a mile|\bvote\b|the board\b|settle.up/i.test(visible));
  assert.ok(!/10,000 miles for queer/i.test(visible));
  assert.ok(!/\d[\d,]*\s*\/\s*10,000|of 10,000|% of/i.test(main), "miles shown against 10,000");
  assert.ok(!/years? old|\bage \d|\b4[0-9]\b-year/i.test(main), "his age");
});

test("a slot keeps the page out of search; a finished page is indexable", () => {
  const open = (A.cold && A.cold.waiting) || (A.sections || []).some((x) => x.waiting)
    || (A.photos || []).some((p) => !p.src || !p.where);
  if (open) {
    assert.match(html, /<meta name="robots" content="noindex, follow">/);
    assert.match(html, /class="[^"]*ab-slot|ab-p--empty/);
  } else {
    assert.ok(!/noindex/.test(html));
    assert.ok(!/ab-slot|ab-p--empty/.test(html), "a slot is still showing");
  }
});

test("his words are on the page as he wrote them (curly quotes only), in his order, under his headings", () => {
  const straight = (x) => x.replace(/&rsquo;|&lsquo;|’|‘/g, "'").replace(/&ldquo;|&rdquo;|“|”/g, '"').replace(/&amp;/g, "&").replace(/&nbsp;|\u00a0/g, " ");
  const page = straight(visible.replace(/\s+/g, " "));
  const flat = (b) => (b || []).flatMap((x) => (x && x.lines) || (x && x.list) || [x]);
  const all = [...((A.cold && A.cold.lines) || []), ...(A.sections || []).flatMap((x) => [x.heading, x.text, ...flat(x.body)])]
    .filter((p) => String(p || "").trim());
  let at = 0;
  for (const p of all) {
    const i = page.indexOf(straight(String(p).replace(/\s+/g, " ").trim()), at);
    assert.ok(i >= 0, `missing, changed or out of order: ${String(p).slice(0, 60)}`);
    at = i;
  }
});

test("curly quotes: a year keeps its apostrophe the right way round", () => {
  assert.ok(!/&lsquo;\d/.test(html), "an opening quote before a digit ('90s)");
});

test("one h1, a Person for the bylines, every picture described and sized", () => {
  assert.strictEqual((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /"@type":"Person","@id":"https:\/\/cycleforchange\.org\/about\/#robert","name":"Robert Castan"/);
  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    assert.match(img, /\balt="[^"]+"/, img);
    assert.match(img, /\bwidth="\d+" height="\d+"/, img);
  }
  assert.match(html, /tel:988/);
  assert.match(html, /1-866-488-7386/);
});

test("the film can always be stopped, and it never plays with sound", () => {
  assert.match(html, /<video class="ab-film-v" muted loop playsinline/);
  assert.match(html, /<button class="ab-play" type="button" aria-label="Play, \d+ seconds"/);
});
