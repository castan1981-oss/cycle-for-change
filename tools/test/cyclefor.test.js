"use strict";
// /cyclefor/: the OK → issue, and the page saying exactly what the release file says.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs"), path = require("path");
const { issueFor, handle, postLink } = require("../cyclefor-pull.js");

const ROOT = path.join(__dirname, "..", "..");
const sub = (data, extra = {}) => ({ id: "6a0b1c2d3e4f5061728394a5", created_at: "2026-10-12T15:04:00.000Z", data: {
  cycle_for: "my mom", name: "Sam", instagram: "@sam.rides", post_link: "", email: "sam@example.com",
  age_ok: "yes", people_ok: "yes", use_ok: "yes", release: "cyclefor-v1", ...data }, ...extra });

test("a full OK opens an issue with what Robert needs and no email", () => {
  const is = issueFor(sub({}));
  assert.ok(is);
  assert.match(is.title, /^OK: Sam cycles for my mom \(@sam\.rides\)$/);
  assert.match(is.body, /\*\*Sam\*\* cycles for \*\*my mom\*\*/);
  assert.match(is.body, /instagram\.com\/sam\.rides\//);
  assert.match(is.body, /cyclefor-v1/);
  assert.match(is.body, /Oct 12, 2026, 8:04 AM Phoenix time/);
  assert.match(is.body, /<!-- release-id: 6a0b1c2d3e4f5061728394a5 -->/);
  assert.ok(!/example\.com|sam@/.test(is.body), "no email in a public issue");
});
test("a missing box, the honeypot, or no way to find the video opens nothing", () => {
  assert.strictEqual(issueFor(sub({ age_ok: "" })), null);
  assert.strictEqual(issueFor(sub({ people_ok: undefined })), null);
  assert.strictEqual(issueFor(sub({ use_ok: "no" })), null);
  assert.strictEqual(issueFor(sub({ "bot-field": "x" })), null);
  assert.strictEqual(issueFor(sub({ instagram: "" })), null);
  assert.strictEqual(issueFor(sub({ cycle_for: " " })), null);
});
test("a clip sent with the OK is pointed at Netlify, never linked", () => {
  const is = issueFor(sub({ instagram: "", video: { filename: "clip.mp4", url: "https://netlify-forms.example/secret" } }));
  assert.ok(is);
  assert.match(is.body, /sent with the OK/);
  assert.ok(!/secret/.test(is.body));
});
test("links, emails and phones come out of what people typed", () => {
  const is = issueFor(sub({ cycle_for: "my kids www.spam.com 480-555-1212", name: "Jo a@b.co" }));
  assert.ok(!/spam|555|a@b/.test(is.title + is.body), is.title);
});
test("handles and post links are read the way people paste them", () => {
  assert.strictEqual(handle("@sam.rides"), "sam.rides");
  assert.strictEqual(handle("https://www.instagram.com/sam.rides/?hl=en"), "sam.rides");
  assert.strictEqual(handle("not a handle!"), "");
  assert.strictEqual(postLink("instagram.com/reel/C9xYz123AbC/?igsh=1"), "https://www.instagram.com/reel/C9xYz123AbC/");
  assert.strictEqual(postLink("https://evil.example/p/abc"), "");
});
test("the page says exactly what data/releases/cyclefor-v1.md says", () => {
  const text = (s) => s.replace(/<[^>]+>/g, " ").replace(/^\s*-\s+/gm, " ").replace(/\s+/g, " ").trim();
  const md = fs.readFileSync(path.join(ROOT, "data/releases/cyclefor-v1.md"), "utf8").split("<!-- release:start -->")[1].split("<!-- release:end -->")[0];
  const html = fs.readFileSync(path.join(ROOT, "cfc-site/cyclefor/index.html"), "utf8");
  const body = html.match(/<div class="cf-release-body" data-release="cyclefor-v1">([\s\S]*?)<\/div>/)[1];
  assert.strictEqual(text(body), text(md));
  assert.match(html, /name="release" value="cyclefor-v1"/);
});
test("the Netlify form names every field the page sends", () => {
  const html = fs.readFileSync(path.join(ROOT, "cfc-site/cyclefor/index.html"), "utf8");
  const form = html.match(/<form[^>]*name="cycle-for"[\s\S]*?<\/form>/)[0];
  for (const f of ["release", "agreed_at", "page", "cycle_for", "name", "instagram", "post_link", "email", "video", "age_ok", "people_ok", "use_ok", "bot-field"])
    assert.match(form, new RegExp(`name="${f}"`), f);
});
