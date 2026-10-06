"use strict";
// What a ride page may promise (Oct 6, 2026 audit): a ride on its seasonal break shows no next ride, no Event and no
// calendar file; a monthly ride with no week-of-month rule is never shown weekly; a monthly rule is a monthly RRULE;
// the host's posted dates render only while they're ahead; duplicate and thin list pages; vanished hubs get 301s.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..", "..");
const rides = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site", "rides", "rides.json"), "utf8"));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "rides-schedule-"));
const out = path.join(tmp, "rides");
const TODAY = "2026-10-12";   // a Monday

// four fresh weekly Tuesday rides in the US to dress up as the cases
const pool = rides.filter((r) => r.country === "US" && r.status === "active" && r.frequency === "weekly" && !r.monthly_rule && !r.season_months
  && JSON.stringify(r.days) === '["tue"]' && r.start_hhmm && r.tz && !r.start_times && r.verified_on >= "2026-09-20");
const [brk, monthlyDated, monthlyBare, ruled, pastOnly] = pool;
const data = rides.map((r) => {
  if (r.slug === brk.slug) return { ...r, status: "seasonal-break", status_note: "Done for the season.", season_months: { start: 4, end: 9 }, season: "Apr–Sep" };
  if (r.slug === monthlyDated.slug) return { ...r, frequency: "monthly", monthly_rule: null, dates: [{ date: "2026-09-22", start_hhmm: "18:00" }, { date: "2026-11-17", start_hhmm: "18:00" }, { date: "2026-12-15", start_hhmm: null }] };
  if (r.slug === monthlyBare.slug) return { ...r, frequency: "monthly", monthly_rule: null, start_hhmm: null, time_local: null,
    schedule: "About once a month on a Tuesday evening. Next: Tue Oct 6, 2026. Later ones: Next: Nov 3, 10 and 17." };
  if (r.slug === ruled.slug) return { ...r, frequency: "monthly", monthly_rule: [{ ord: 3, day: "tue" }] };
  if (r.slug === pastOnly.slug) return { ...r, frequency: "irregular", dates: [{ date: "2026-09-18", start_hhmm: "18:00" }, { date: "2026-10-11", start_hhmm: null }] };
  return r;
});
fs.writeFileSync(path.join(tmp, "rides.json"), JSON.stringify(data));
// a history that remembers hubs that aren't built any more
const histFile = path.join(tmp, "history.json");
fs.writeFileSync(histFile, JSON.stringify({ paths: { "/rides/tx/frisco/": "2026-09-30", "/rides/tx/frisco/road/": "2026-09-30", "/rides/az/nowhere-city/": "2026-09-30", "/rides/az/nowhere-city/saturday/": "2026-09-30", "/rides/az/fountain-hills/road/": "2026-09-30", "/rides/zz/": "2026-09-30" } }));
fs.writeFileSync(path.join(tmp, "_redirects"), "/hand-made  /  302\n");
execFileSync(process.execPath, [path.join(ROOT, "tools", "build-rides.js"), "--data", path.join(tmp, "rides.json"), "--out", out,
  "--health", path.join(tmp, "none.json"), "--today", TODAY, "--history", histFile], { stdio: "pipe" });
const page = (slug) => fs.readFileSync(path.join(out, slug, "index.html"), "utf8");
const icsOf = (slug) => { const f = path.join(out, slug, "ride.ics"); return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null; };
const nextBox = (h) => (h.match(/<div class="gr-next" id="gr-next" ([^>]*)>[\s\S]*?<time[^>]*>([^<]*)<\/time>/) || []).slice(1);
const live = JSON.parse(fs.readFileSync(path.join(out, "live.json"), "utf8"));

test("a ride on its seasonal break: no next ride, no Event, no calendar file, and the page says so", () => {
  const h = page(brk.slug);
  const [attrs, text] = nextBox(h);
  assert.match(attrs, /hidden/); assert.equal(text, "");
  assert.doesNotMatch(h, /"@type":"Event"/);
  assert.doesNotMatch(h, /EventScheduled/);
  assert.equal(icsOf(brk.slug), null);
  assert.match(h, /On its seasonal break\./);
  assert.match(h, /look for it again in April 2027/);   // the season says when it's back
  assert.match(h, /data-time=""/);                        // ride.js can't compute one either
  const l = live.find((r) => r.slug === brk.slug);
  assert.equal(l.status, "seasonal-break"); assert.equal(l.start_hhmm, null); assert.equal(l.next, null);
});

test("a monthly ride posted date by date: the host's next date, never weekly, never a past date", () => {
  const h = page(monthlyDated.slug);
  const [attrs, text] = nextBox(h);
  assert.doesNotMatch(attrs, /hidden/);
  assert.match(text, /^Tue, Nov 17/);                     // not Oct 13 (weekly) and not Sep 22 (past)
  assert.match(h, /"startDate":"2026-11-17T18:00:00/);
  assert.match(h, /Some Tuesdays \(about once a month\)/);
  const cal = icsOf(monthlyDated.slug);
  assert.doesNotMatch(cal, /RRULE/);
  assert.match(cal, /DTSTART;TZID=[^:]+:20261117T180000/);
  assert.match(cal, /DTSTART;VALUE=DATE:20261215/);
  assert.doesNotMatch(cal, /20260922/);
  assert.deepEqual(live.find((r) => r.slug === monthlyDated.slug).dates.map((d) => d.date), ["2026-11-17", "2026-12-15"]);
});

test("a monthly ride with no rule and no dates promises nothing", () => {
  const h = page(monthlyBare.slug);
  assert.match(nextBox(h)[0], /hidden/);
  assert.doesNotMatch(h, /"@type":"Event"/);
  assert.equal(icsOf(monthlyBare.slug), null);
  assert.doesNotMatch(h, /Every Tuesday/);
  // a "Next: <date>" that has passed reads "Last listed"; a list with dates still ahead is left alone
  assert.match(h, /Last listed: Tue Oct 6, 2026/);
  assert.doesNotMatch(h, /Next: Tue Oct 6/);
  assert.match(h, /Next: Nov 3, 10 and 17/);
});

test("a monthly rule: the right Tuesday, a monthly RRULE with the week, byMonthWeek in the schema", () => {
  const h = page(ruled.slug);
  assert.match(nextBox(h)[1], /^Tue, Oct 20/);           // third Tuesday of October 2026
  assert.match(icsOf(ruled.slug), /RRULE:FREQ=MONTHLY;BYDAY=3TU/);
  assert.match(h, /"byMonthWeek":\[3\]/);
  assert.match(h, /"repeatFrequency":"P1M"/);
});

test("only past dates: nothing upcoming anywhere", () => {
  const h = page(pastOnly.slug);
  assert.match(nextBox(h)[0], /hidden/);
  assert.doesNotMatch(h, /"@type":"Event"/);
  assert.equal(icsOf(pastOnly.slug), null);
});

test("no Event on any page starts before the build day", () => {
  for (const r of data.slice(0, 400)) {
    const f = path.join(out, r.slug, "index.html");
    if (!fs.existsSync(f)) continue;
    for (const m of fs.readFileSync(f, "utf8").matchAll(/"startDate":"(\d{4}-\d{2}-\d{2})/g)) assert.ok(m[1] >= TODAY, `${r.slug} has an Event on ${m[1]}`);
  }
});

test("titles drop the site name and fit 60 characters on ride pages", () => {
  for (const r of data.slice(0, 300)) {
    const f = path.join(out, r.slug, "index.html");
    if (!fs.existsSync(f)) continue;
    const h = fs.readFileSync(f, "utf8");
    const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    assert.doesNotMatch(t, /Cycle for Change/, r.slug);
    assert.ok(t.length <= 60 || t === r.name, `${r.slug}: ${t.length} "${t}"`);
    assert.match(h, /<meta property="og:title" content="[^"]+ — Cycle for Change">/);
  }
});

test("an /all/ page canonicals to its place when the rides are the same; thin pages are noindex and out of the sitemap", () => {
  const all = fs.readFileSync(path.join(out, "az", "all", "index.html"), "utf8");
  assert.match(all, /<link rel="canonical" href="https:\/\/cycleforchange.org\/rides\/az\/">/);
  const sitemap = fs.readFileSync(path.join(out, "sitemap.xml"), "utf8");
  assert.doesNotMatch(sitemap, /\/rides\/az\/all\//);
  assert.match(sitemap, /\/rides\/az\/<\/loc>/);
  // every short page with 2 rides or fewer is noindex and not in the sitemap
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).filter((e) => e.isDirectory()).flatMap((e) => [path.join(d, e.name), ...walk(path.join(d, e.name))]);
  let thin = 0;
  for (const d of walk(path.join(out, "az"))) {
    const f = path.join(d, "index.html"); if (!fs.existsSync(f)) continue;
    const h = fs.readFileSync(f, "utf8");
    if (!/gr-sub-page/.test(h)) continue;
    const n = +((h.match(/"numberOfItems":(\d+)/) || [])[1]);
    if (n > 2) continue;
    thin++;
    assert.match(h, /<meta name="robots" content="noindex, follow">/, d);
    assert.ok(!sitemap.includes(`/rides/${path.relative(out, d)}/</loc>`), d);
  }
  assert.ok(thin > 0, "expected a thin short page in Arizona");
});

test("vanished hubs get 301s to the nearest page above them, in a generated block that keeps hand rules", () => {
  const red = fs.readFileSync(path.join(tmp, "_redirects"), "utf8");
  assert.match(red, /^\/hand-made {2}\/ {2}302$/m);                                  // hand content kept
  assert.match(red, /# >>> generated by tools\/build-rides\.js/);
  assert.match(red, /^\/rides\/az\/nowhere-city\/ {2}\/rides\/az\/ {2}301$/m);
  assert.match(red, /^\/rides\/az\/nowhere-city\/\* {2}\/rides\/az\/ {2}301$/m);
  assert.doesNotMatch(red, /nowhere-city\/saturday/);                               // the parent's splat covers it
  assert.match(red, /^\/rides\/tx\/frisco\/\* {2}\/rides\/tx\/plano\/ {2}301$/m);   // netlify.toml sends /frisco/ to Plano; its pages follow
  assert.doesNotMatch(red, /^\/rides\/tx\/frisco\/ /m);                             // the exact path is left to netlify.toml
  assert.doesNotMatch(red, /fountain-hills/);                                        // netlify.toml already splats it
  assert.match(red, /^\/rides\/zz\/ {2}\/rides\/ {2}301$/m);
  // built pages never get a rule
  assert.doesNotMatch(red, /^\/rides\/az\/ /m);
  // the history learned every page this build wrote
  const hist = JSON.parse(fs.readFileSync(histFile, "utf8")).paths;
  assert.ok(hist["/rides/az/"] && hist["/rides/az/all/"]);
  // running again changes nothing in the block
  execFileSync(process.execPath, [path.join(ROOT, "tools", "build-rides.js"), "--data", path.join(tmp, "rides.json"), "--out", out,
    "--health", path.join(tmp, "none.json"), "--today", TODAY, "--history", histFile], { stdio: "pipe" });
  assert.equal(fs.readFileSync(path.join(tmp, "_redirects"), "utf8"), red);
});
