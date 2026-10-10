"use strict";
/*
  routes.js — the route on a ride page (Oct 9, 2026). One place that decides what a ride page may say
  about its route, so build-rides.js and the tests agree.

  data/ride-routes.json: { "<slug>": { gpx, posted, from, by, for_date?, pace_mph?, drop?, regroup?, cues?, note? } }
    gpx       data/routes/<slug>/<file>.gpx — the file the host sent (or Robert's ride, with the host's OK)
    posted    YYYY-MM-DD the host sent it
    from      "host" | "robert"
    by        who to credit on the page ("TSR", "Bicycle Haüs")
    for_date  YYYY-MM-DD when the route is one week's only (rides whose route changes weekly); null = the standing route
    pace_mph  [lo, hi] on the flats, in the host's words
    drop      "drop" | "regroup" | "no-drop" — what happens if you come off
    regroup   where the group waits, in the host's words
    cues      [{ mi, t, s?, k? }] the host's turns (k: start · turn · regroup · finish)
  python3 tools/route-build.py <slug> turns it into cfc-site/rides/routes/<slug>/route-<posted>.json,
  which is all the build reads. Routes only from the people who run the ride; never from Strava's API.
*/
const fs = require("fs");
const path = require("path");

const isDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
const FROM = new Set(["host", "robert"]);
const DROP = new Set(["drop", "regroup", "no-drop"]);

function problems(slug, e, built) {
  const out = [];
  if (!e || typeof e !== "object") return ["not an object"];
  if (!isDate(e.posted)) out.push("posted must be YYYY-MM-DD");
  if (!FROM.has(e.from)) out.push('from must be "host" or "robert"');
  if (!e.by || typeof e.by !== "string") out.push("by (who to credit) is required");
  if (e.for_date != null && !isDate(e.for_date)) out.push("for_date must be YYYY-MM-DD or null");
  if (e.pace_mph != null && !(Array.isArray(e.pace_mph) && e.pace_mph.length === 2 && e.pace_mph.every((n) => typeof n === "number" && n > 4 && n < 40) && e.pace_mph[0] <= e.pace_mph[1])) out.push("pace_mph must be [lo, hi] in mph");
  if (e.drop != null && !DROP.has(e.drop)) out.push('drop must be "drop", "regroup" or "no-drop"');
  if (!built) out.push(`no built route — run python3 tools/route-build.py ${slug}`);
  else {
    if (!Array.isArray(built.path) || built.path.length < 2) out.push("built route has no line");
    if (!Array.isArray(built.prof) || built.prof.length < 2) out.push("built route has no climb chart");
    if (!(built.mi > 0)) out.push("built route has no distance");
  }
  return out;
}

function load(root, slugs) {
  const file = path.join(root, "data", "ride-routes.json");
  let data = {};
  try { data = JSON.parse(fs.readFileSync(file, "utf8")); } catch (e) { return new Map(); }
  const out = new Map();
  for (const [slug, e] of Object.entries(data)) {
    if (slug.startsWith("_")) continue;
    if (slugs && !slugs.has(slug)) { console.warn(`WARNING data/ride-routes.json: ${slug} isn't a ride; skipped`); continue; }
    let built = null;
    try { built = JSON.parse(fs.readFileSync(path.join(root, "cfc-site", "rides", "routes", slug, `route-${e && e.posted}.json`), "utf8")); } catch (err) { built = null; }
    const bad = problems(slug, e, built);
    if (bad.length) { console.warn(`WARNING data/ride-routes.json: ${slug} skipped (${bad.join("; ")})`); continue; }
    out.set(slug, { ...e, built });
  }
  return out;
}

// A one-week route is "this week's" up to and including its date; after that the page says whose week it was
function weekState(route, today) {
  if (!route.for_date) return "standing";
  return today <= route.for_date ? "current" : "past";
}

const mph = (p) => (p ? (p[0] === p[1] ? `${p[0]}` : `${p[0]}–${p[1]}`) : null);
const comma = (n) => Number(n).toLocaleString("en-US");

// Where riders find the route today, when nobody has sent us one: the host's own route pages first
function whereRoutesLive(r) {
  const all = [...Object.values(r.links || {}).flat(), ...(r.sources || [])].filter((u) => typeof u === "string");
  const rw = all.find((u) => /ridewithgps\.com/i.test(u));
  if (rw) return { label: "Ride with GPS", url: rw, line: "The host posts routes on Ride with GPS." };
  const km = all.find((u) => /komoot\.(com|de)/i.test(u));
  if (km) return { label: "Komoot", url: km, line: "The host posts routes on Komoot." };
  const st = (r.links && r.links.strava) || all.find((u) => /strava\.com\/clubs\//i.test(u));
  if (st) return { label: "the Strava club", url: st, line: "Routes go up in the host's Strava club. Ask to join there to see them." };
  return null;
}

module.exports = { load, problems, weekState, mph, comma, whereRoutesLive };
