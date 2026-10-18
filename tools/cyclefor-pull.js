#!/usr/bin/env node
/*
  cyclefor-pull.js — the OKs from /cyclefor/ ("What do you cycle for?", the Netlify form "cycle-for") → one
  GitHub issue each, labelled "release", for Robert to review before a clip goes in a reel, a boosted post or
  on the site.

    NETLIFY_API_TOKEN=… NETLIFY_SITE_ID=… GH_TOKEN=… GITHUB_REPOSITORY=owner/repo node tools/cyclefor-pull.js [--dry]

  Runs hourly beside the reviews (.github/workflows/ride-reviews.yml). An issue carries <!-- release-id: … -->
  so an OK is opened once. Where the record lives:
    - the OK itself (every answer, the time, the clip): Netlify → Forms → cycle-for. That's the record to keep.
    - the words people agreed to: data/releases/cyclefor-v1.md (never edited; a new wording is v2).
    - this issue: what Robert needs to match the clip to the person. This repo is public, so the issue never
      carries an email, the clip, or a link to it. First name, Instagram handle and the answer are fine: those
      are what the person said we can post.
  Robert labels the issue "cleared" when he's checked the clip; close it to drop it. Nothing here posts anything.
  An OK missing any of the three boxes, or from the honeypot, opens nothing.
*/
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DRY = process.argv.includes("--dry");
const NETLIFY = "https://api.netlify.com/api/v1", GH = "https://api.github.com";
const FORMS_PAGE = "https://app.netlify.com/projects/cycleforchange/forms";
const FORM = "cycle-for";
const { NETLIFY_API_TOKEN: NT, NETLIFY_SITE_ID: SITE_ID, GH_TOKEN: GT, GITHUB_REPOSITORY: REPO } = process.env;

const squash = (s) => String(s == null ? "" : s).replace(/[\u0000-\u0008\u000b-\u001f\u007f<>\[\]`*_|]/g, "").replace(/\s+/g, " ").trim();
// what people typed goes in a public issue: links, emails and phone numbers come out
const strip = (s) => squash(String(s == null ? "" : s)
  .replace(/[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}/gi, " ")
  .replace(/\b(?:https?:\/\/|www\.)\S+/gi, " ")
  .replace(/(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\b\d{3})[\s.-]?\d{3}[\s.-]?\d{4}\b/g, " "));

function handle(s) {
  s = String(s || "").trim();
  const m = s.match(/instagram\.com\/([A-Za-z0-9._]{1,30})/i);
  if (m) s = m[1];
  s = s.replace(/^@+/, "");
  return /^[A-Za-z0-9._]{1,30}$/.test(s) ? s : "";
}
// only an Instagram post/reel link goes in the issue
function postLink(s) {
  const m = String(s || "").trim().match(/^(?:https?:\/\/)?(?:www\.)?instagram\.com\/((?:[A-Za-z0-9._]{1,30}\/)?(?:p|reel|reels|stories\/[A-Za-z0-9._]{1,30})\/[A-Za-z0-9_-]{4,40})/i);
  return m ? `https://www.instagram.com/${m[1]}/` : "";
}
const hasClip = (d) => !!(d.video && (typeof d.video === "object" ? d.video.url || d.video.filename : String(d.video).trim()));
const ticked = (v) => /^(yes|on|true)$/i.test(String(v == null ? "" : v).trim());

function phoenix(iso) {
  const t = new Date(iso);
  if (isNaN(t)) return "";
  return t.toLocaleString("en-US", { timeZone: "America/Phoenix", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }) + " Phoenix time";
}

// → { title, body } or null (an OK that isn't complete)
function issueFor(sub) {
  const d = sub.data || {};
  if (String(d["bot-field"] || "").trim()) return null;
  if (!ticked(d.age_ok) || !ticked(d.people_ok) || !ticked(d.use_ok)) return null;
  const name = strip(d.name).slice(0, 30) || "Someone";
  const answer = strip(d.cycle_for).slice(0, 40);
  if (!answer) return null;
  const ig = handle(d.instagram), link = postLink(d.post_link), clip = hasClip(d);
  if (!ig && !clip) return null;
  const release = /^cyclefor-v\d+$/.test(String(d.release || "").trim()) ? String(d.release).trim() : "cyclefor-v1";
  const when = phoenix(sub.created_at) || phoenix(d.agreed_at) || String(sub.created_at || "");
  const where = [
    clip ? `**Clip:** sent with the OK. Watch it in [Netlify → Forms → ${FORM}](${FORMS_PAGE}) (signed in). It isn't linked here because this repo is public.`
         : `**Clip:** not sent here. It should be on their Instagram${ig ? ` (@${ig})` : ""}, tagged @cycl_eforchange.`,
    link ? `**Their post:** ${link}` : "",
  ].filter(Boolean);
  return {
    title: `OK: ${name} cycles for ${answer.toLowerCase()}${ig ? ` (@${ig})` : ""}`.slice(0, 120),
    body: [
      `**${name}** cycles for **${answer}**.`,
      "",
      ig ? `**Instagram:** [@${ig}](https://www.instagram.com/${ig}/)` : "**Instagram:** not given",
      ...where,
      "",
      `**The OK:** 18 or older ✓ · in the video, anyone else in it said OK ✓ · we can use it ✓`,
      `Agreed to [${release}](https://github.com/${REPO || "castan1981-oss/cycle-for-change"}/blob/main/data/releases/${release}.md), ${when}. The full record (and their email, if they gave one) stays in Netlify.`,
      "",
      "**Before you use it:**",
      "- [ ] The clip is theirs: it came with this OK, or it's on the handle above.",
      "- [ ] Everyone in it looks 18 or older. If anyone doesn't, don't use it.",
      "- [ ] Nobody else you can recognize is in it, or they're fine with it.",
      "",
      "Good to go: add the label **cleared**. Not using it: close this.",
      "If they ask to take it back (a DM): within 7 days, delete our posts with it, take it off the site, stop any boost, and close this.",
      "",
      `<!-- release-id: ${sub.id} -->`,
    ].join("\n"),
  };
}

async function get(url) {
  const res = await fetch(url, { headers: { authorization: `Bearer ${NT}`, "user-agent": "cfc cyclefor", accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res.json();
}
async function gh(method, p, body) {
  const res = await fetch(GH + p, { method, headers: { authorization: `Bearer ${GT}`, "user-agent": "cfc cyclefor", accept: "application/vnd.github+json", "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok && !(method === "POST" && p.endsWith("/labels") && res.status === 422)) throw new Error(`GitHub ${res.status} ${method} ${p}: ${(await res.text()).slice(0, 200)}`);
  return res.status === 204 ? null : res.json().catch(() => null);
}

async function main() {
  if (!NT || !SITE_ID) { console.log("cyclefor-pull: skipped (no NETLIFY_API_TOKEN / NETLIFY_SITE_ID)"); return; }
  if (!DRY && (!GT || !REPO)) { console.log("cyclefor-pull: skipped (no GH_TOKEN / GITHUB_REPOSITORY)"); return; }
  const forms = await get(`${NETLIFY}/sites/${encodeURIComponent(SITE_ID)}/forms`);
  const form = (forms || []).find((x) => x.name === FORM);
  if (!form) { console.log(`cyclefor-pull: no "${FORM}" form yet`); return; }
  const subs = [];
  for (let page = 1; page < 100; page++) {
    const batch = await get(`${NETLIFY}/forms/${form.id}/submissions?per_page=100&page=${page}`);
    if (!Array.isArray(batch) || !batch.length) break;
    subs.push(...batch);
    if (batch.length < 100) break;
  }

  const seen = new Set();
  if (!DRY) {
    await gh("POST", `/repos/${REPO}/labels`, { name: "release", color: "A84C58", description: "A video OK from /cyclefor/ to review" });
    await gh("POST", `/repos/${REPO}/labels`, { name: "cleared", color: "2C4F55", description: "Robert checked the clip: OK to use" });
    for (let page = 1; page < 50; page++) {
      const list = await gh("GET", `/repos/${REPO}/issues?labels=release&state=all&per_page=100&page=${page}`);
      if (!Array.isArray(list) || !list.length) break;
      for (const is of list) { const m = String(is.body || "").match(/<!-- release-id: ([a-z0-9]+) -->/i); if (m) seen.add(m[1]); }
      if (list.length < 100) break;
    }
  }

  let opened = 0, skipped = 0;
  for (const sub of subs.sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)))) {
    if (seen.has(String(sub.id))) continue;
    const is = issueFor(sub);
    if (!is) { skipped++; continue; }
    if (DRY) { console.log(`would open: ${is.title}\n${is.body}\n`); opened++; continue; }
    await gh("POST", `/repos/${REPO}/issues`, { title: is.title, body: is.body, labels: ["release"] });
    seen.add(String(sub.id));
    opened++;
  }
  console.log(`cyclefor-pull: ${subs.length} OKs, ${opened} new issue${opened === 1 ? "" : "s"}, ${skipped} incomplete or spam`);
}

if (require.main === module) main().catch((e) => { console.error(e.message); process.exit(1); });
module.exports = { issueFor, handle, postLink };
