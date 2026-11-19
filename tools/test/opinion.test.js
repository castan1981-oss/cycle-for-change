"use strict";
// The opinion series (Nov 18, 2026): a draft never reaches the live site, a ready piece goes live on its date,
// a piece that breaks a rule is held back, and the committed site never carries a preview.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs"), path = require("path"), os = require("os");
const O = require("../../scripts/build-opinion.js");

const ROOT = path.join(__dirname, "..", "..");
const piece = (over = {}, body = "The lede.\n\nA fact [1].\n\n## Sources\n1. A report, 2026 | https://example.org/a\n") => {
  const m = { title: "A plain title", slug: "a-plain-title", status: "ready", publish: "2026-12-01", dek: "One line for the card.",
    description: "Seventy characters or more of plain description so the check on length passes.", ...over };
  return `---\n${Object.entries(m).map(([k, v]) => `${k}: ${v}`).join("\n")}\n---\n${body}`;
};
function site(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cfc-opinion-"));
  const data = path.join(dir, "data"), out = path.join(dir, "site");
  fs.mkdirSync(data); fs.mkdirSync(path.join(out, "field-notes"), { recursive: true });
  fs.writeFileSync(path.join(out, "field-notes", "index.html"), '<main>\n      <div class="fn-cards">\n        <a class="fn-card" href="/field-notes/old/">old</a>\n      </div>\n</main>\n');
  fs.writeFileSync(path.join(out, "sitemap-pages.xml"), "<urlset>\n  <url>\n    <loc>https://cycleforchange.org/</loc>\n    <lastmod>2026-10-01</lastmod>\n  </url>\n</urlset>\n");
  for (const [name, text] of Object.entries(files)) fs.writeFileSync(path.join(data, name), text);
  const go = (today, preview = false) => O.run({ dataDir: data, siteDir: out, today, preview, log: () => {} });
  const read = (rel) => { try { return fs.readFileSync(path.join(out, rel), "utf8"); } catch { return null; } };
  return { go, read, data };
}

test("a draft is never written to the live site; a preview shows it, noindex, with a banner", () => {
  const s = site({ "a-plain-title.md": piece({ status: "draft", publish: "" }) });
  s.go("2027-01-01");
  assert.equal(s.read("field-notes/a-plain-title/index.html"), null);
  assert.equal(s.read("field-notes/opinion/index.html"), null);
  assert.ok(!/a-plain-title/.test(s.read("field-notes/index.html") + s.read("sitemap-pages.xml")));
  s.go("2027-01-01", true);
  const html = s.read("field-notes/a-plain-title/index.html");
  assert.match(html, /noindex, nofollow/);
  assert.match(html, /Draft\. Not published\./);
  assert.ok(!/a-plain-title/.test(s.read("sitemap-pages.xml")), "a preview never adds to the sitemap");
  s.go("2027-01-01");
  assert.equal(s.read("field-notes/a-plain-title/index.html"), null, "a normal build clears the preview");
});

test("a ready piece goes live on its publish date, not before", () => {
  const s = site({ "a-plain-title.md": piece() });
  s.go("2026-11-30");
  assert.equal(s.read("field-notes/a-plain-title/index.html"), null);
  s.go("2026-12-01");
  const html = s.read("field-notes/a-plain-title/index.html");
  assert.match(html, /index, follow/);
  assert.ok(!/fn-todo/.test(html));
  assert.match(html, /<span class="fn-chip">Opinion<\/span>/);
  assert.ok(html.includes(O.OPINION_LINE));
  assert.match(html, /<sup><a href="#src-1">1<\/a><\/sup>/);
  assert.match(html, /<li id="src-1"><a href="https:\/\/example.org\/a" rel="noopener">A report, 2026<\/a><\/li>/);
  assert.match(s.read("field-notes/index.html"), /opinion:cards[\s\S]*a-plain-title[\s\S]*\/opinion:cards[\s\S]*field-notes\/old/);
  assert.match(s.read("sitemap-pages.xml"), /field-notes\/opinion\/<\/loc>[\s\S]*field-notes\/a-plain-title\/<\/loc>\s*<lastmod>2026-12-01/);
  assert.match(s.read("field-notes/opinion/index.html"), /a-plain-title/);
});

test("a batch released a few days apart comes out one at a time, newest first, and links to each other", () => {
  const s = site({ "one.md": piece({ slug: "one", title: "One", publish: "2026-12-01" }), "two.md": piece({ slug: "two", title: "Two", publish: "2026-12-03" }), "three.md": piece({ slug: "three", title: "Three", publish: "2026-12-05" }) });
  assert.deepEqual(s.go("2026-12-01").live.map((p) => p.meta.slug), ["one"]);
  assert.deepEqual(s.go("2026-12-04").live.map((p) => p.meta.slug), ["two", "one"]);
  assert.deepEqual(s.go("2026-12-05").live.map((p) => p.meta.slug), ["three", "two", "one"]);
  assert.match(s.read("field-notes/one/index.html"), /Keep reading[\s\S]*field-notes\/three\/[\s\S]*field-notes\/two\//);
  const before = s.read("field-notes/index.html") + s.read("sitemap-pages.xml");
  s.go("2026-12-05");
  assert.equal(s.read("field-notes/index.html") + s.read("sitemap-pages.xml"), before, "a second run changes nothing");
});

test("a ready piece that breaks a rule is held back, and says why", () => {
  const bad = {
    "banned word": piece({}, "The lede about my journey.\n\nBody.\n"),
    "sober time": piece({}, "The lede.\n\nTen years sober and riding.\n"),
    "a citation with no source": piece({}, "The lede.\n\nA fact [2].\n\n## Sources\n1. A report | https://example.org/a\n"),
    "a source with no link": piece({}, "The lede.\n\nA fact [1].\n\n## Sources\n1. A report\n"),
    "a placeholder": piece({}, "The lede.\n\nTODO finish this.\n"),
    "no publish date": piece({ publish: "" }),
    "a long description": piece({ description: "x".repeat(170) }),
  };
  for (const [why, text] of Object.entries(bad)) {
    const s = site({ "a-plain-title.md": text });
    const r = s.go("2027-01-01");
    assert.equal(r.pieces[0].state, why === "no publish date" ? "held" : "held", why);
    assert.ok(r.pieces[0].lint.errors.length, why);
    assert.equal(s.read("field-notes/a-plain-title/index.html"), null, why);
  }
});

test("it never writes over a page it did not make", () => {
  const s = site({ "old.md": piece({ slug: "old", title: "Old" }) });
  fs.mkdirSync(path.join(s.data, "..", "site", "field-notes", "old"));
  fs.writeFileSync(path.join(s.data, "..", "site", "field-notes", "old", "index.html"), "<p>a hand page</p>");
  assert.throws(() => s.go("2027-01-01"), /did not write it/);
});

test("the pieces in the repo: no ready piece is failing, and the committed site carries no preview", () => {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Phoenix" }).format(new Date());
  const pieces = O.load(path.join(ROOT, "data", "opinion"), { photos: require("../../scripts/photos.js").PHOTOS, today });
  for (const p of pieces) {
    if (p.meta.status === "ready") assert.deepEqual(p.lint.errors, [], p.meta.slug);
    const page = path.join(ROOT, "cfc-site", "field-notes", String(p.meta.slug), "index.html");
    if (p.state !== "live" && fs.existsSync(page)) assert.fail(`${p.meta.slug} is ${p.state} and its page is in cfc-site/ (a --preview run was left in)`);
  }
  const index = fs.readFileSync(path.join(ROOT, "cfc-site", "field-notes", "index.html"), "utf8");
  assert.ok(!/Opinion &middot; (draft|held|scheduled)/.test(index), "a preview card is on /field-notes/");
});

test("the graphic: a piece with files gets its own share card; photo: graphic without files is held back", () => {
  const s = site({ "a-plain-title.md": piece({ photo: "graphic" }) });
  assert.equal(s.go("2027-01-01").pieces[0].state, "held");
  const op = path.join(s.data, "..", "site", "img", "op");
  fs.mkdirSync(op, { recursive: true });
  fs.writeFileSync(path.join(op, "a-plain-title-og-1.png"), ""); fs.writeFileSync(path.join(op, "a-plain-title-1.jpg"), "");
  assert.equal(s.go("2027-01-01").pieces[0].state, "live");
  const html = s.read("field-notes/a-plain-title/index.html");
  assert.match(html, /og:image" content="https:\/\/cycleforchange.org\/img\/op\/a-plain-title-og-1.png"/);
  assert.match(html, /<figure class="ph ph--l"><img src="\/img\/op\/a-plain-title-og-1.png" alt="One line for the card\."/);
  assert.match(s.read("field-notes/index.html"), /<figure><img src="\/img\/op\/a-plain-title-1.jpg"/);
});
