#!/usr/bin/env node
/* Cycle for Change — the two files that tell machines what the site is.

   Oct 18, 2026 (growth plan, Phase 2 / the audit's "apply now" list):
     cfc-site/llms.txt   what cycleforchange.org is, in markdown, for AI search (the llms.txt convention:
                         an H1, a blockquote summary, then sections of links). The counts come from the data.
     cfc-site/feed.xml   RSS 2.0 of the hand-written and deep pages — guides, field notes, the journal, the
                         event pages, the town guides, the tools — newest first by the sitemaps' lastmod, with
                         each page's own title and description. Not the 1,400 ride pages; those have the
                         rides sitemap and the .ics files.

   Run by tools/build-rides.js at the end of every build (so the deploy keeps the counts current), or
   on its own: node scripts/build-signals.js. Reads only committed files; writes the two files. */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = path.join(ROOT, "cfc-site");
const ORIGIN = "https://cycleforchange.org";

const read = (p) => fs.readFileSync(p, "utf8");
const exists = (p) => fs.existsSync(p);
const json = (p) => JSON.parse(read(p));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmt = (n) => n.toLocaleString("en-US");
const decode = (s) => String(s).replace(/&rsquo;|&#8217;/g, "’").replace(/&lsquo;|&#8216;/g, "‘").replace(/&ldquo;|&#8220;/g, "“").replace(/&rdquo;|&#8221;/g, "”").replace(/&middot;/g, "·").replace(/&ndash;/g, "–").replace(/&mdash;/g, "—").replace(/&hellip;/g, "…").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

/* —— what the page says about itself —— */
function pageMeta(urlPath) {
  const file = path.join(SITE, urlPath.replace(/^\//, ""), "index.html");
  if (!exists(file)) return null;
  const html = read(file);
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) return null;
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/i) || [])[1] || "";
  const dateLd = (html.match(/"datePublished":\s*"(\d{4}-\d{2}-\d{2})/) || [])[1] || null;
  const modLd = (html.match(/"dateModified":\s*"(\d{4}-\d{2}-\d{2})/) || [])[1] || null;
  return { title: decode(title).replace(/\s+—\s+Cycle for Change$/, ""), desc: decode(desc), published: dateLd, modified: modLd };
}

/* —— the sitemaps' lastmod, the one date every page has —— */
function lastmods() {
  const out = new Map();
  for (const f of ["sitemap-pages.xml", "sitemap-events.xml"]) {
    const p = path.join(SITE, f);
    if (!exists(p)) continue;
    for (const m of read(p).matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) out.set(m[1].replace(ORIGIN, ""), m[2]);
  }
  return out;
}

/* —— the counts, from the data —— */
function counts() {
  const live = exists(path.join(SITE, "rides", "live.json")) ? json(path.join(SITE, "rides", "live.json")) : [];
  const hubs = exists(path.join(SITE, "rides", "hubs.json")) ? json(path.join(SITE, "rides", "hubs.json")) : [];
  const countries = new Set(live.map((r) => r.country));
  const cal = exists(path.join(ROOT, "data", "calendar-2027.json")) ? json(path.join(ROOT, "data", "calendar-2027.json")) : null;
  const events = cal ? (Array.isArray(cal) ? cal : cal.events || []).filter((e) => !e.retired) : [];
  const towns = exists(path.join(ROOT, "data", "towns")) ? fs.readdirSync(path.join(ROOT, "data", "towns")).filter((f) => f.endsWith(".json") && !f.startsWith("_")).length : 0;
  const guides = exists(path.join(SITE, "guides")) ? fs.readdirSync(path.join(SITE, "guides"), { withFileTypes: true }).filter((d) => d.isDirectory()).length : 0;
  return { rides: live.length, hubs: hubs.length, countries: countries.size, events: events.length, towns, guides };
}

/* —— llms.txt —— */
function llms(c) {
  const lines = [];
  lines.push("# Cycle for Change");
  lines.push("");
  lines.push(`> cycleforchange.org is a group-ride finder: ${fmt(c.rides)} weekly group rides in ${c.countries} countries, every one checked at its source and stamped with the date it was last checked; a 2027 calendar of ${fmt(c.events)} US rides and races; ${c.towns} town guides for riders traveling with a bike; a free ride briefing tool; and the story behind it — Robert Castan rides 10,000 miles in 2027, all on the bike.`);
  lines.push("");
  lines.push("How a ride gets listed and stays listed: the host's own page, feed or event listing is read and what it says is recorded — day, start time, start point, pace, whether the group waits — with the evidence and the date. A ride checked in the last 90 days is fresh. At 90 days the row says \"confirm with the host\"; at 150 it leaves the lists and its page says so. Nothing is listed from memory, and a ride nobody has checked is never stamped as checked. Rider reports and a weekly watcher flag rides whose pages changed or vanished. Every ride page says how it was checked, from what, and when.");
  lines.push("");
  lines.push("Money for the organizations Robert rides for goes through their own rides and donation pages, never through this site. Nothing on the site needs an account, and the ride briefing keeps your file in your browser.");
  lines.push("");
  lines.push("## Find a ride");
  lines.push("");
  lines.push(`- [Group rides](${ORIGIN}/rides/): ${fmt(c.rides)} weekly rides, by state, city, day and who they're for (no-drop, beginner, LGBTQ+, women/trans/femme, BIPOC, family, gravel, e-bike). ${c.hubs} city hubs.`);
  lines.push(`- [Find a ride by kind](${ORIGIN}/find-a-ride/): the front door — group rides, events, gravel, a ride briefing.`);
  lines.push(`- [Tonight](${ORIGIN}/tonight/): what's rolling near you in the next twelve hours, soonest first.`);
  lines.push(`- [How the list works](${ORIGIN}/rides/about/): the checking rules, the freshness clock, what the marks mean.`);
  lines.push(`- [Add a ride](${ORIGIN}/rides/add/): the form hosts and riders use.`);
  lines.push("");
  lines.push("## Events and the 2027 calendar");
  lines.push("");
  lines.push(`- [2027 calendar](${ORIGIN}/events/2027/): ${fmt(c.events)} US rides and races, by month and kind. A date is marked confirmed only when the organizer published it; otherwise it says projected and names the year it is projected from.`);
  lines.push(`- [Events](${ORIGIN}/events/): the deep event pages — route, weather, lodging, registration.`);
  lines.push(`- [The rides Robert is doing](${ORIGIN}/events/2027/riding/): Center Ride Out (Los Angeles LGBT Center, April 2027) and Cycle to Zero (San Francisco AIDS Foundation, May 2027).`);
  lines.push("");
  lines.push("## Towns");
  lines.push("");
  lines.push(`- [Town guides](${ORIGIN}/towns/): ${c.towns} towns for a rider arriving with a bike — shops, the rides, routes, coffee, where to sleep with the bike, how to get the bike there.`);
  lines.push("");
  lines.push("## Tools");
  lines.push("");
  lines.push(`- [Ride briefing](${ORIGIN}/brief/): drop a GPX, TCX or FIT file; get the climbs, the weather at each point at the hour you reach it, what to wear, how much water, and when you're back. Free, no account, nothing stored. Compare two routes on one chart.`);
  lines.push("");
  lines.push("## Guides and writing");
  lines.push("");
  lines.push(`- [Guides](${ORIGIN}/guides/): ${c.guides} guides — tires, wheels and hubs, and charity rides (picking one, getting ready, raising the money).`);
  lines.push(`- [Field notes](${ORIGIN}/field-notes/): routes and rides from the road, in Robert's words.`);
  lines.push(`- [Journal](${ORIGIN}/journal/): his raw writing.`);
  lines.push(`- [Resources](${ORIGIN}/resources/): queer mental-health resources. 988 Suicide & Crisis Lifeline; the Trevor Project 1-866-488-7386.`);
  lines.push("");
  lines.push("## The story");
  lines.push("");
  lines.push(`- [Home](${ORIGIN}/): Robert Castan rides 10,000 miles in 2027, all on the bike. The miles counted on the site are miles since June 1, 2026; the count restarts January 1, 2027. Cycling changed his life; he'd like to say he cycles for everyone else, and he's really cycling for himself. The organizations he rides for: one·n·ten (Phoenix), the Los Angeles LGBT Center, the San Francisco AIDS Foundation.`);
  lines.push(`- [What do you cycle for?](${ORIGIN}/cyclefor/): five seconds on video from riders he meets.`);
  lines.push(`- Instagram: https://www.instagram.com/cycl_eforchange/`);
  lines.push("");
  lines.push("## Trust");
  lines.push("");
  lines.push(`- [How rides are checked](${ORIGIN}/methodology/): the source-plus-date rule, the 90-and-150-day clock, the Monday watcher, what software does and what people do.`);
  lines.push(`- [Privacy](${ORIGIN}/privacy/): what the site keeps (analytics, five forms), where it goes, and how to take something back. No accounts, no email list, no ads.`);
  lines.push(`- [Contact](${ORIGIN}/contact/): Instagram DM; the domain takes no mail.`);
  lines.push("");
  lines.push("## Machine-readable");
  lines.push("");
  lines.push(`- [Sitemap index](${ORIGIN}/sitemap.xml)`);
  lines.push(`- [Feed](${ORIGIN}/feed.xml): guides, field notes, event and town pages, newest first.`);
  lines.push(`- Every ride page has an .ics file and Event JSON-LD when the next date is known; every event and town page has JSON-LD that matches the page.`);
  lines.push("");
  return lines.join("\n") + "\n";
}

/* —— feed.xml —— */
const FEED_PREFIXES = ["/guides/", "/field-notes/", "/journal/", "/events/", "/towns/", "/resources/", "/brief/", "/cyclefor/"];
const SKIP = new Set(["/guides/", "/field-notes/", "/journal/", "/events/", "/towns/", "/resources/", "/events/2027/"]);
function feedItems() {
  const mods = lastmods();
  const items = [];
  for (const [p, lastmod] of mods) {
    if (!FEED_PREFIXES.some((pre) => p.startsWith(pre))) continue;
    if (SKIP.has(p)) continue;
    if (/^\/events\/2027\//.test(p)) continue;                 // the calendar's month and kind pages are lists, not pieces
    if (/^\/events\/state\//.test(p)) continue;
    if (/^\/towns\/[^/]+\/[^/]+\/[^/]+\//.test(p)) continue;    // a town's sub-pages ride with the guide
    const m = pageMeta(p);
    if (!m || !m.title) continue;
    const date = m.modified || lastmod || m.published;
    items.push({ path: p, title: m.title, desc: m.desc, date, published: m.published });
  }
  items.sort((a, b) => (b.date || "").localeCompare(a.date || "") || a.path.localeCompare(b.path));
  return items.slice(0, 60);
}
function rfc822(ymd) { return new Date(`${ymd}T12:00:00Z`).toUTCString(); }
function feed(items, c) {
  const latest = items.length ? items[0].date : new Date().toISOString().slice(0, 10);
  const out = [];
  out.push('<?xml version="1.0" encoding="UTF-8"?>');
  out.push('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">');
  out.push("<channel>");
  out.push("<title>Cycle for Change</title>");
  out.push(`<link>${ORIGIN}/</link>`);
  out.push(`<atom:link href="${ORIGIN}/feed.xml" rel="self" type="application/rss+xml"/>`);
  out.push(`<description>${esc(`Guides, field notes, event and town pages from cycleforchange.org — the group-ride finder (${fmt(c.rides)} rides, checked at the source) and Robert Castan's 10,000 miles in 2027.`)}</description>`);
  out.push("<language>en-us</language>");
  out.push(`<lastBuildDate>${rfc822(latest)}</lastBuildDate>`);
  for (const it of items) {
    out.push("<item>");
    out.push(`<title>${esc(it.title)}</title>`);
    out.push(`<link>${ORIGIN}${it.path}</link>`);
    out.push(`<guid isPermaLink="true">${ORIGIN}${it.path}</guid>`);
    if (it.date) out.push(`<pubDate>${rfc822(it.date)}</pubDate>`);
    if (it.desc) out.push(`<description>${esc(it.desc)}</description>`);
    out.push("</item>");
  }
  out.push("</channel>");
  out.push("</rss>");
  return out.join("\n") + "\n";
}

function run({ quiet = false } = {}) {
  const c = counts();
  fs.writeFileSync(path.join(SITE, "llms.txt"), llms(c));
  const items = feedItems();
  fs.writeFileSync(path.join(SITE, "feed.xml"), feed(items, c));
  if (!quiet) console.log(`signals: llms.txt (${fmt(c.rides)} rides, ${fmt(c.events)} events, ${c.towns} towns, ${c.guides} guides), feed.xml (${items.length} items, newest ${items[0] ? items[0].date : "—"})`);
  return { counts: c, items };
}

module.exports = { run, llms, feed, feedItems, counts };
if (require.main === module) run();
