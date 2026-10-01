"use strict";
/*
  rides-freshness.js — the freshness policy for group rides. One module, three users:

    tools/build-rides.js   what a ride page and card say ("Checked Sep 30"), what drops off the lists
    tools/rides-watch.js   what goes in the re-check queue, and in what order
    the ride-verifier      (.claude/agents/ride-verifier.md) which rides to re-check first

  The promise to a rider: a ride on the lists was confirmed at its source in the last
  HIDE_DAYS days, and anything we've seen go wrong with it is either fixed or said out loud.

  Inputs
    ride    a record from cfc-site/rides/rides.json (verified_on, last_seen, status, confidence…)
    health  that ride's entry in data/rides-health.json (written by tools/rides-watch.js), or null
    today   "YYYY-MM-DD" (defaults to now, UTC)

  assess(ride, health, today) returns
    state       fresh | due | flagged | stale | paused | ended
    listed      true = on the directory, hubs, search index, sitemap
    indexable   true = no noindex on the ride page
    checked_on  the latest check: verified_on, or a feed that showed the next ride (health.feed_seen)
    checked_by  "person" (an agent or a person read the host's page) | "feed" (the host's own calendar feed)
    age_days    days since checked_on
    label       "Checked Sep 30, 2026"        (ride page)
    label_short "Checked Sep 30" / "Checked Mar 2025"  (cards)
    nudge       one line for listed rides that need a look, else null
    banner      one line for unlisted rides (stale / paused / ended), else null
    flags       open red/amber flags newer than the last check
    priority    lower = re-check sooner (see QUEUE)
    reasons     why it's where it is, for the queue
*/

const POLICY = {
  FRESH_DAYS: 90,       // checked within 90 days: fresh
  HIDE_DAYS: 150,       // not checked for 150 days: off the lists (the page stays, says so, and is noindex)
  FEED_FRESH_DAYS: 21,  // the host's own feed showed an upcoming ride within 21 days: counts as a check
  FLAG_GRACE_DAYS: 14,  // an open red flag (page gone, "cancelled" on the page, a rider says it's gone) hides the ride after 14 days
  ENDED_KEEP_DAYS: 365, // an ended ride keeps its page (noindex, pointing to rides nearby) for a year, then the build drops it
};

// Queue order: rider reports, red flags, amber flags, visible-and-aging, low confidence, hidden, then the oldest fresh ones.
const QUEUE = { report: 0, red: 1, amber: 2, due: 3, low: 4, stale: 5, paused: 6, fresh: 7, ended: 9 };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const isDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
const toDay = (s) => Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10));
const daysBetween = (a, b) => Math.round((toDay(b) - toDay(a)) / 86400000);   // b - a
const todayUTC = () => new Date().toISOString().slice(0, 10);
const maxDate = (...ds) => ds.filter(isDate).sort().pop() || null;

function fmt(d, { short = false, today = todayUTC() } = {}) {
  if (!isDate(d)) return null;
  const y = d.slice(0, 4), m = MONTHS[+d.slice(5, 7) - 1], day = +d.slice(8, 10);
  if (!short) return `${m} ${day}, ${y}`;
  return y === today.slice(0, 4) || daysBetween(d, today) < 200 ? `${m} ${day}` : `${m} ${y}`;
}

// Open flags: raised after the last check. A re-check (verified_on moving past the flag) resolves it.
function openFlags(health, checkedOn) {
  const flags = (health && Array.isArray(health.flags)) ? health.flags : [];
  return flags.filter((f) => f && !f.resolved && (!checkedOn || !isDate(f.since) || f.since > checkedOn));
}
// Rider / organizer reports that came in after the last check.
function openReports(health, checkedOn) {
  const reps = (health && Array.isArray(health.reports)) ? health.reports : [];
  return reps.filter((r) => r && (!checkedOn || !isDate(r.date) || r.date > checkedOn));
}

function assess(ride, health = null, today = todayUTC()) {
  const status = ride.status || "active";
  const verified = isDate(ride.verified_on) ? ride.verified_on : null;
  const feedSeen = health && isDate(health.feed_seen) && daysBetween(health.feed_seen, today) <= POLICY.FEED_FRESH_DAYS
    ? health.feed_seen : null;
  const checkedOn = maxDate(verified, feedSeen);
  const checkedBy = checkedOn && checkedOn === verified ? "person" : (checkedOn ? "feed" : null);
  const age = checkedOn ? daysBetween(checkedOn, today) : Infinity;
  const flags = openFlags(health, verified);          // a feed hit doesn't clear a red flag; a person has to look
  const reports = openReports(health, verified);
  const red = flags.filter((f) => f.severity === "red");
  const amber = flags.filter((f) => f.severity !== "red");
  const badReports = reports.filter((r) => r.type === "gone" || r.type === "changed");
  const reasons = [];

  const out = {
    state: "fresh", listed: true, indexable: true,
    checked_on: checkedOn, checked_by: checkedBy, age_days: Number.isFinite(age) ? age : null,
    label: checkedOn ? `Checked ${fmt(checkedOn, { today })}` : "Not yet checked",
    label_short: checkedOn ? `Checked ${fmt(checkedOn, { short: true, today })}` : "Unchecked",
    nudge: null, banner: null, flags, reports, priority: QUEUE.fresh, reasons,
  };

  if (status === "ended") {
    Object.assign(out, { state: "ended", listed: false, indexable: false, priority: QUEUE.ended,
      banner: `This ride has ended${ride.status_since ? ` (${fmt(ride.status_since, { today })})` : ""}.${ride.status_note ? " " + ride.status_note : ""}` });
    out.expired = ride.status_since ? daysBetween(ride.status_since, today) > POLICY.ENDED_KEEP_DAYS
      : (verified ? daysBetween(verified, today) > POLICY.ENDED_KEEP_DAYS : false);
    reasons.push("ended");
    return out;
  }
  if (status === "paused") {
    Object.assign(out, { state: "paused", listed: false, indexable: false, priority: QUEUE.paused,
      banner: `The host has paused this ride${ride.status_since ? ` (since ${fmt(ride.status_since, { today })})` : ""}.${ride.status_note ? " " + ride.status_note : ""} We list it again when it's back.` });
    reasons.push("paused by the host");
    return out;
  }

  // Red flags and bad reports: listed with a warning during the grace period, then off the lists.
  const oldestRed = [...red.map((f) => f.since), ...badReports.map((r) => r.date)].filter(isDate).sort()[0];
  if (red.length || badReports.length) {
    const graceOver = oldestRed && daysBetween(oldestRed, today) > POLICY.FLAG_GRACE_DAYS;
    const what = badReports.length
      ? (badReports.some((r) => r.type === "gone") ? "A rider told us this ride may have stopped" : "A rider told us something about this ride changed")
      : (red.some((f) => f.code === "page-gone") ? "The host's page for this ride has gone away" : "The host's page may say this ride is cancelled or changed");
    Object.assign(out, {
      state: "flagged", priority: badReports.length ? QUEUE.report : QUEUE.red,
      listed: !graceOver, indexable: !graceOver,
      nudge: `${what}. We're re-checking it. Confirm with the host before you go.`,
      banner: graceOver ? `${what}, and we haven't been able to confirm it since ${fmt(checkedOn || verified, { today }) || "then"}.` : null,
    });
    reasons.push(...badReports.map((r) => `rider report: ${r.type}${r.note ? ` (${r.note})` : ""}`), ...red.map((f) => `${f.code}: ${f.detail || ""}`.trim()));
    return out;
  }

  if (!checkedOn || age > POLICY.HIDE_DAYS) {
    Object.assign(out, { state: "stale", listed: false, indexable: false, priority: QUEUE.stale,
      banner: `We haven't been able to confirm this ride since ${fmt(checkedOn, { today }) || "we listed it"}. It may have changed or stopped.` });
    reasons.push(checkedOn ? `last checked ${age} days ago` : "never checked");
    return out;
  }

  if (amber.length) {
    // the line says what the watcher actually saw (tools/rides-watch.js flag codes)
    const codes = new Set(amber.map((f) => f.code));
    const when = fmt(amber.map((f) => f.since).filter(isDate).sort().pop(), { today }) || "a recent check";
    const nudge = codes.has("schedule-text-changed") || codes.has("time-missing") ? `The host changed their page on ${when}. Confirm the day and time with them before you go.`
      : codes.has("moved") ? `The host's page moved on ${when}. Confirm the day and time with them before you go.`
      : codes.has("event-date-past") || codes.has("next-date-far") ? "The host's page doesn't show an upcoming date for this ride. Confirm with them before you go."
      : codes.has("unreachable") ? "We haven't been able to load the host's page lately. Confirm with them before you go."
      : `The host changed their page on ${when}. Confirm the day and time with them before you go.`;
    Object.assign(out, { state: "flagged", priority: QUEUE.amber, nudge });
    reasons.push(...amber.map((f) => `${f.code}: ${f.detail || ""}`.trim()));
    return out;
  }

  if (age > POLICY.FRESH_DAYS) {
    Object.assign(out, { state: "due", priority: QUEUE.due,
      nudge: `Last checked ${age} days ago. Confirm with the host before you go.` });
    reasons.push(`due: last checked ${age} days ago`);
    return out;
  }

  if (ride.confidence === "low") {
    out.priority = QUEUE.low;
    out.nudge = "We found this ride on one source only. Confirm with the host before you go.";
    reasons.push("low confidence");
  }
  return out;
}

// Re-check queue: every non-ended ride, soonest first. Within a level, the oldest check goes first.
function queue(rides, healthBySlug = {}, today = todayUTC()) {
  return rides
    .map((r) => ({ ride: r, a: assess(r, healthBySlug[r.slug] || null, today) }))
    .filter((x) => x.a.state !== "ended")
    .sort((x, y) => x.a.priority - y.a.priority || (y.a.age_days ?? 1e9) - (x.a.age_days ?? 1e9) || x.ride.slug.localeCompare(y.ride.slug))
    .map(({ ride, a }) => ({ slug: ride.slug, name: ride.name, city: ride.city, country: ride.country || "US", state: a.state,
      priority: a.priority, age_days: a.age_days, checked_on: a.checked_on, reasons: a.reasons,
      watch_url: (ride.refresh && ride.refresh.watch_url) || (ride.sources || [])[0] || (ride.links || {}).website || null }));
}

module.exports = { POLICY, QUEUE, assess, queue, fmt, daysBetween, isDate };
