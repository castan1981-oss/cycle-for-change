/*
  ride-calendars.js — community calendars: a local calendar, kept by riders in that place, that carries a ride we list.

  Nov 19, 2026. A maintainer of msp.bike (the Twin Cities' calendar) wrote to Robert: our pages linked msp.bike/events
  or Instagram instead of the event's own page, and our "Add to calendar" file was a copy of their calendar that never
  hears about their changes. Both true. Since then, for a ride a community calendar carries:

    - the page links that ride's own page on the calendar, by name (never the calendar's front page when the ride has
      a page of its own), and says whose calendar it is
    - we write no ride.ics and no Google Calendar link for it: "Add to calendar" goes to their page, where the
      calendar entry stays in step with their changes
    - the calendar is never called "the host": the host is whoever runs the ride

  data/ride-calendars.json
    { "calendars": { "<id>": { name, home, hosts: [hostname…], feeds?: [url…],
                               what?:  the words after "Listed on <name>," (only what the site or our dated notes say),
                               adds?:  true when its event pages carry their own add-to-calendar (the button says so),
                               first?: true when it is where a change shows up first (the credit line says so),
                               own_hosts?: [host names that run the site itself: their rides need no row] } },
      "rides":     { "<slug>": { calendar: "<id>", event: "<the ride's own page on it>" | null, checked: "YYYY-MM-DD" } } }

  `event` is null only when the calendar has no page for the ride right now; the page then links the calendar's `home`.
  check() fails the build when a ride leans on a calendar (a link or a source on one of its hosts, or its feed)
  and has no row, so a new ride from a calendar can't be listed without the credit.
*/
"use strict";

const hostOf = (u) => { try { return new URL(String(u)).hostname.replace(/^www\./, ""); } catch (e) { return null; } };
const isDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);

function urlsOf(r) {
  const L = r.links || {};
  return [L.website, ...(Array.isArray(L.other) ? L.other : []), r.refresh && r.refresh.watch_url, r.refresh && r.refresh.feed_url,
    ...(Array.isArray(r.sources) ? r.sources.map((s) => (s && s.url) || s) : [])].filter((u) => typeof u === "string" && u);
}

// A raw calendar feed is for a calendar app, never a button on a page (Nov 19, 2026).
const isFeed = (u) => /\.ics(\?|$)|calendar\.google\.com\/calendar\/(ical|embed)|[?&]ical=1\b|\/ical\/?(\?|$)|^webcal:/i.test(String(u || ""));

/*
  Shared sites (Nov 19, 2026, the audit after msp.bike). A site that carries rides for three or more different hosts
  is somebody's calendar, club network or roundup, and the ride page must not call it "the host's website": the
  button and the "check before you go" link carry the site's own name instead. That is true whoever runs the site,
  so it needs no list kept by hand. Places everyone posts (Strava, Meetup, Instagram…) are not sites in this sense.
  Which of these are community calendars like msp.bike, owed a credit line and no calendar copy, is a person's call:
  they go in data/ride-calendars.json one at a time. `node tools/audit-ride-sources.js` lists the candidates.
*/
const PLATFORM = /(^|\.)(strava\.com|meetup\.com|facebook\.com|fb\.me|instagram\.com|ridewithgps\.com|eventbrite\.[a-z.]+|google\.com|goo\.gl|linktr\.ee|linkin\.bio|x\.com|twitter\.com|youtube\.com|komoot\.[a-z]+|discord\.gg|discord\.com|clubexpress\.com|wildapricot\.org|bikereg\.com|runsignup\.com|tiktok\.com|threads\.net|apple\.com|whatsapp\.com|t\.me|criticalmass\.in|letsride\.co\.uk|britishcycling\.org\.uk|nextdoor\.com|wikipedia\.org|reddit\.com|squarespace\.com|githubusercontent\.com|wixsite\.com|wordpress\.com|blogspot\.com|substack\.com)$/i;
const SHARED_MIN = 3;
const hostKey = (r) => String((r.host && r.host.name) || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
function sharedSites(rides) {
  const by = new Map();
  for (const r of rides) {
    if (r.status === "ended") continue;
    for (const d of new Set(urlsOf(r).filter((u) => !isFeed(u)).map(hostOf).filter(Boolean))) {
      if (PLATFORM.test(d)) continue;
      if (!by.has(d)) by.set(d, { domain: d, rides: [], hosts: new Set() });
      const x = by.get(d); x.rides.push(r.slug); if (hostKey(r)) x.hosts.add(hostKey(r));
    }
  }
  return new Map([...by].filter(([, x]) => x.hosts.size >= SHARED_MIN).map(([d, x]) => [d, { domain: d, rides: x.rides, hosts: x.hosts.size }]));
}

function make(config) {
  const cals = (config && config.calendars) || {};
  const rows = (config && config.rides) || {};
  const onCal = (cal, u) => cal.hosts.includes(hostOf(u)) || (cal.feeds || []).includes(u);
  const calOfUrl = (u) => Object.keys(cals).find((id) => onCal(cals[id], u)) || null;

  // the calendar a ride is on, and where its link goes; null for every other ride
  function of(r) {
    const row = rows[r.slug];
    if (!row) return null;
    const cal = cals[row.calendar];
    return { id: row.calendar, name: cal.name, what: cal.what || null, adds: !!cal.adds, first: !!cal.first, home: cal.home, event: row.event || null, url: row.event || cal.home, checked: row.checked || null,
      mine: (u) => onCal(cal, u) };
  }

  // the ride's links with the calendar's taken out: it gets its own named link, and it isn't the host's website
  function links(r) {
    const c = of(r);
    const L = r.links || {};
    if (!c) return L;
    return { ...L, website: L.website && c.mine(L.website) ? null : L.website, other: (L.other || []).filter((u) => !c.mine(u)) };
  }

  // the sources line: the ride's page on the calendar once, by name, then everything that isn't the calendar
  function sources(r) {
    const c = of(r);
    const all = (r.sources || []).map((s) => (s && s.url) || s);
    if (!c) return all.map((url, i) => ({ url, text: `source ${i + 1}` }));
    const rest = all.filter((u) => !c.mine(u) && !isFeed(u));   // a calendar ride cites the calendar's page, never a raw feed
    return [{ url: c.url, text: c.name }, ...rest.map((url, i) => ({ url, text: `source ${i + 2}` }))];
  }

  // errors as strings; the build throws on any
  function check(rides) {
    const errors = [];
    const bySlug = new Map(rides.map((r) => [r.slug, r]));
    for (const [id, cal] of Object.entries(cals)) {
      for (const k of ["name", "home"]) if (!(typeof cal[k] === "string" && cal[k].trim())) errors.push(`calendar ${id}: ${k} is missing`);
      if (!Array.isArray(cal.hosts) || !cal.hosts.length) errors.push(`calendar ${id}: hosts is missing`);
      else if (!cal.hosts.includes(hostOf(cal.home))) errors.push(`calendar ${id}: home isn't on one of its hosts`);
    }
    for (const [slug, row] of Object.entries(rows)) {
      const cal = cals[row && row.calendar];
      if (!bySlug.has(slug)) { errors.push(`${slug}: no ride with this slug`); continue; }
      if (!cal) { errors.push(`${slug}: calendar "${row && row.calendar}" isn't defined`); continue; }
      if (row.event != null) {
        if (!cal.hosts.includes(hostOf(row.event))) errors.push(`${slug}: event isn't a page on ${cal.name}`);
        else if (row.event.replace(/\/$/, "") === cal.home.replace(/\/$/, "")) errors.push(`${slug}: event is the calendar's front page; give the ride's own page, or null`);
      }
      if (!isDate(row.checked)) errors.push(`${slug}: checked must be the YYYY-MM-DD the link was opened`);
    }
    for (const r of rides) {
      if (rows[r.slug] || r.status === "ended") continue;
      const id = urlsOf(r).map(calOfUrl).find(Boolean);
      if (id && (cals[id].own_hosts || []).includes((r.host && r.host.name) || "")) continue;   // the site's own ride
      if (id) errors.push(`${r.slug}: leans on ${cals[id].name} and has no row in data/ride-calendars.json`);
    }
    return errors;
  }

  return { of, links, sources, check, calendars: cals, rides: rows };
}

module.exports = { make, hostOf, isFeed, sharedSites, PLATFORM, SHARED_MIN };
