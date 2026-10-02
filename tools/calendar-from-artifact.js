#!/usr/bin/env node
/* Cycle for Change — bring the "2027 Ride Directory" artifact's data into the site (Oct 2, 2026).
   The twice-a-month "2027 Ride Directory refresh" scheduled task researches the calendar and
   republishes the artifact (https://claude.ai/artifact/1BhU7ywcW4SBYrg3GitPqC). Until now nothing
   carried that into data/calendar-2027.json, so /events/2027/ sat on the Sept 16 data. This turns
   the artifact's data block into the site's file; then the builds run as usual.

     node tools/calendar-from-artifact.js <artifact-data.json>
     node scripts/build-calendar.js && node scripts/build-events.js

   <artifact-data.json> is the JSON inside the artifact page's
   <script type="application/json" id="data"> block: {"updated":"October 1, 2026","events":[…],"defunct":[…]}.
   Mapping: on_list → riding; defunct → retired ({name, state, reason}); month and weekday are
   dropped (the build works them out); "updated" becomes an ISO date. An event keeps its slug by id
   (links and anchors never move); a new event gets one from its name, made unique. Ids are never
   reused. Prints what changed. Exits non-zero, writing nothing, when the data doesn't validate. */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const FILE = path.join(ROOT, "data", "calendar-2027.json");
const src = process.argv[2];
if (!src) { console.error("usage: node tools/calendar-from-artifact.js <artifact-data.json>"); process.exit(2); }

const CATS = ["Charity ride", "Road", "Gravel", "MTB", "Multi-day tour", "Ultra / bikepacking", "Race", "Hill climb"];
const FIELDS = ["id", "name", "category", "subtype", "start", "end", "date_status", "date_note", "city", "state", "region", "start_city", "end_city", "days", "distances", "elevation", "cause", "beneficiary", "fundraising_min", "organizer", "url", "reg_status", "lottery", "series", "cost", "qualification", "notes", "sources", "slug", "riding"];
const slugify = (s) => String(s).replace(/\s*\(.*?\)\s*/g, " ").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const iso = (s) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(s || ""))) return s;
  const d = new Date(String(s || "") + " 12:00 UTC");
  return isNaN(d) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
};

const art = JSON.parse(fs.readFileSync(src, "utf8"));
const old = JSON.parse(fs.readFileSync(FILE, "utf8"));
const byId = new Map(old.events.map((e) => [e.id, e]));
const used = new Set(old.events.map((e) => e.slug));   // a retired event's slug stays taken too
const problems = [];

const events = (art.events || []).map((a) => {
  const was = byId.get(a.id);
  let slug = was ? was.slug : slugify(a.name);
  if (!was) { const base = slug || `event-${a.id}`; let n = 2; slug = base; while (used.has(slug)) slug = `${base}-${n++}`; used.add(slug); }
  const e = {};
  for (const k of FIELDS) {
    if (k === "slug") e.slug = slug;
    else if (k === "riding") e.riding = !!(a.on_list ?? a.riding);
    else if (k === "sources") e.sources = Array.isArray(a.sources) ? a.sources : a.sources ? [a.sources] : [];
    else if (k === "days") e.days = Number(a.days) || 1;
    else e[k] = a[k] == null ? "" : a[k];
  }
  if (!e.name || !e.id) problems.push(`an event with no ${e.name ? "id" : "name"}`);
  if (!CATS.includes(e.category)) problems.push(`${e.name}: category "${e.category}"`);
  if (e.start && !/^\d{4}-\d{2}-\d{2}$/.test(e.start)) problems.push(`${e.name}: start "${e.start}"`);
  if (e.end && !/^\d{4}-\d{2}-\d{2}$/.test(e.end)) problems.push(`${e.name}: end "${e.end}"`);
  if (!e.start && e.date_status !== "tba") problems.push(`${e.name}: no start date but status ${e.date_status}`);
  if (e.start && !e.end) e.end = e.start;
  return e;
});
const ids = new Set();
for (const e of events) { if (ids.has(e.id)) problems.push(`id ${e.id} twice`); ids.add(e.id); }
if (events.length < old.events.length * 0.8) problems.push(`only ${events.length} events (the site has ${old.events.length}) — refusing to drop that many at once`);
if (problems.length) { console.error("Not written:\n  " + problems.slice(0, 30).join("\n  ")); process.exit(1); }

// retired: the artifact's list, plus any the site already had (never lose one), minus anything back on the calendar
const live = new Set(events.map((e) => e.name));
const retired = [...new Map([...(old.retired || []), ...(art.defunct || art.retired || []).map((r) => ({ name: r.name, state: r.state || "", reason: r.reason || r.note || "" }))]
  .filter((r) => r.name && !live.has(r.name)).map((r) => [r.name, r])).values()];
// an event that left the calendar without a word goes on the retired list, so nobody plans around it
const kept = new Set(events.map((e) => e.id)), named = new Set(retired.map((r) => r.name));
for (const e of old.events) if (!kept.has(e.id) && !named.has(e.name) && ![...named].some((n) => n.includes(e.name.split(" (")[0]))) retired.push({ name: e.name, state: e.state || "", reason: `Taken off the 2027 calendar ${iso(art.updated)}: couldn't confirm it still runs. ${String(e.date_note || "").split(/(?<=\.)\s/)[0]}`.trim() });
const out = { updated: iso(art.updated), source: old.source, events: events.sort((a, b) => (a.start || "9999").localeCompare(b.start || "9999") || a.name.localeCompare(b.name)), retired };

// what changed, in a few lines
const now = new Map(events.map((e) => [e.id, e]));
const added = events.filter((e) => !byId.has(e.id)), gone = old.events.filter((e) => !now.has(e.id));
const moved = events.filter((e) => byId.has(e.id) && (byId.get(e.id).start !== e.start || byId.get(e.id).date_status !== e.date_status));
fs.writeFileSync(FILE, JSON.stringify(out, null, 2) + "\n");
console.log(`data/calendar-2027.json: ${events.length} events (updated ${out.updated}); ${added.length} new, ${gone.length} gone, ${moved.length} with a new date or status, ${retired.length} retired.`);
for (const e of added.slice(0, 15)) console.log(`  + ${e.name} (${e.start || "TBA"})`);
for (const e of gone.slice(0, 15)) console.log(`  - ${e.name}`);
for (const e of moved.slice(0, 25)) { const w = byId.get(e.id); console.log(`  ~ ${e.name}: ${w.start || "TBA"} ${w.date_status} → ${e.start || "TBA"} ${e.date_status}`); }
