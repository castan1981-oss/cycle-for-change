/* Cycle for Change — the list-page paragraph (Oct 26, 2026; growth plan Phase 4 "b", the 500K plan's search track).

   Every hub, facet, day and state page in the rides directory gets one paragraph, written by the build from the rides
   on that page: which days they ride (and which day is the big one), the earliest and latest start, how many roll on a
   weekday evening, how many are no-drop or say beginners are welcome, who else they're made for, what kind of bike,
   how often they run, and when they were checked. The sentences are picked by what the data says, so two pages with
   different rides never read the same, and no sentence is written that the rides can't back.

   House style: numerals for counts (the directory's own "24 rides"), and no sentence opens on a number.
   Pure: no file reads, no clock, so a rebuild of the same data writes the same words. tools/build-rides.js calls
   listLede() and puts the result in a fold ("About these N rides"), crawled but a tap away (the step-down rule,
   CLAUDE.md §6). Tests: tools/test/list-lede.test.js. */
"use strict";

const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const DAY_LONG = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
// the bike a ride is for: as a noun in a list ("8 road, 1 mountain bike") and before "rides" ("mountain-bike rides").
// E-bikes ("e-bikes welcome") and "mixed" aren't a kind of ride here.
const BIKE = { road: "road", gravel: "gravel", mtb: "mountain bike", fixed: "fixed gear", social: "social", cruiser: "cruiser",
  bmx: "BMX", track: "track", cyclocross: "cyclocross" };
const BIKE_ADJ = { ...BIKE, mtb: "mountain-bike", fixed: "fixed-gear" };
// who a ride is made for, after no-drop and beginners (those get their own sentence)
const FOR = [["lgbtq", "LGBTQ+ riders"], ["wtf", "women, trans and femme riders"], ["bipoc", "BIPOC riders"], ["family", "families"],
  ["adaptive", "adaptive riders"], ["youth", "young riders"]];
const TIME = /^\d{2}:\d{2}$/;

const andList = (a) => (a.length < 3 ? a.join(" and ") : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`);
const tagsOf = (r) => { const t = [...(r.inclusive_focus || [])]; if (r.drop_policy === "no-drop" && !t.includes("no-drop")) t.push("no-drop"); return t; };
const fmtTimeDefault = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
};
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const md = (ymd) => { const [, m, d] = ymd.split("-").map(Number); return `${MONTHS[m - 1]} ${d}`; };
const checkedOn = (r) => (r._f && r._f.checked_on) || r.verified_on || null;
// weekly (the default), every other week, once a month (on a rule or posted month by month), or posted date by date
const cadence = (r) => (r.frequency === "monthly" ? "monthly" : r.frequency === "biweekly" ? "biweekly" : r.frequency === "irregular" ? "irregular" : "weekly");
const isEvening = (r) => TIME.test(r.start_hhmm || "") && +r.start_hhmm.slice(0, 2) >= 17;
const weekday = (d) => DAY_ORDER.indexOf(d) < 5;

// ---- the sentences; each returns null when the rides don't back it ----

function daysSentence(rides, focus) {
  if (focus.day) return null;
  const by = Object.fromEntries(DAY_ORDER.map((d) => [d, 0]));
  for (const r of rides) for (const d of new Set(r.days || [])) if (d in by) by[d]++;
  const used = DAY_ORDER.filter((d) => by[d]);
  if (!used.length) return null;
  const N = rides.length;
  const plural = (d) => `${DAY_LONG[d]}s`;
  if (used.length === 1) return `${N === 2 ? "Both" : `All ${N}`} ride on ${plural(used[0])}.`;
  const top = Math.max(...used.map((d) => by[d]));
  if (top === 1) return `They ride on ${andList(used.map(plural))}.`;
  const tops = used.filter((d) => by[d] === top);
  if (tops.length === 1 && N >= 4 && top / N >= 0.4) return `${DAY_LONG[tops[0]]} is the big day: ${top} of the ${N} ride then.`;
  const spread = used.length === 7 ? "There's a ride every day of the week" : used.length <= 3 ? `They ride on ${andList(used.map(plural))}` : `They ride on ${used.length} days of the week`;
  const most = tops.length === 1 ? `${DAY_LONG[tops[0]]} has the most, with ${top}` : tops.length <= 3 ? `${andList(tops.map((d) => DAY_LONG[d]))} have the most, ${top} each` : null;
  const empty = DAY_ORDER.filter((d) => !by[d]);
  const gap = used.length === 6 ? `; only ${DAY_LONG[empty[0]]} has none` : "";
  return `${spread}${most ? `; ${most}` : ""}${gap}.`;
}

function timesSentence(rides, fmtTime) {
  const timed = rides.filter((r) => TIME.test(r.start_hhmm || "")).sort((a, b) => a.start_hhmm.localeCompare(b.start_hhmm) || a.name.localeCompare(b.name));
  if (timed.length < 2) return null;
  const first = timed[0], last = timed[timed.length - 1];
  if (first.start_hhmm === last.start_hhmm) return `Every one with a posted start time rolls at ${fmtTime(first.start_hhmm)}.`;
  // names lead when both are short enough to read as a name; otherwise just the times
  if (first.name.length <= 44 && last.name.length <= 44) return `The earliest start is ${first.name} at ${fmtTime(first.start_hhmm)}; the latest is ${last.name} at ${fmtTime(last.start_hhmm)}.`;
  return `Starts run from ${fmtTime(first.start_hhmm)} to ${fmtTime(last.start_hhmm)}.`;
}

function eveningSentence(rides, focus) {
  if (focus.day === "sat" || focus.day === "sun") return null;
  const ev = rides.filter((r) => (r.days || []).some(weekday) && isEvening(r));
  if (ev.length === rides.length) return `${rides.length === 2 ? "Both" : "All of them"} start at 5 pm or later, after work.`;
  if (ev.length < 2) return null;
  return focus.day ? `After work, ${ev.length} start at 5 pm or later.` : `After work, ${ev.length} roll on a weekday evening.`;
}

function ridersSentence(rides, focus) {
  const N = rides.length;
  const nd = focus.tag === "no-drop" ? 0 : rides.filter((r) => tagsOf(r).includes("no-drop")).length;
  const bg = focus.tag === "beginner" ? 0 : rides.filter((r) => tagsOf(r).includes("beginner")).length;
  const ndText = nd === N ? `${N === 2 ? "Both are" : "Every one is"} no-drop, so the group waits for everyone` : `The group waits for everyone on ${nd} of them (no-drop)`;
  const bgAll = `${N === 2 ? "both say" : "every one says"} beginners are welcome`;
  if (nd && bg) return `${ndText}, and ${bg === N ? bgAll : `beginners are welcome on ${bg}`}.`;
  if (nd) return `${ndText}.`;
  if (bg) return bg === N ? `${bgAll[0].toUpperCase()}${bgAll.slice(1)}.` : `Beginners are welcome on ${bg} of them.`;
  return null;
}

function madeForSentence(rides, focus) {
  const list = FOR.filter(([k]) => k !== focus.tag).map(([k, label]) => [label, rides.filter((r) => tagsOf(r).includes(k)).length]).filter(([, n]) => n);
  if (!list.length) return null;
  const [[l0, c0], ...more] = list;
  const head = c0 === 1 ? `There's one ride made for ${l0}` : `There are ${c0} rides made for ${l0}`;
  return `${head}${more.length ? `${more.length === 1 ? " and " : ", "}${andList(more.map(([label, n]) => `${n} for ${label}`))}` : ""}.`;
}

function bikeSentence(rides, focus) {
  const N = rides.length;
  const by = {};
  for (const r of rides) for (const d of new Set(r.discipline || [])) if (BIKE[d] && d !== focus.disc) by[d] = (by[d] || 0) + 1;
  const order = Object.keys(by).sort((a, b) => by[b] - by[a] || a.localeCompare(b));
  const cm = focus.kind === "critical-mass" ? 0 : rides.filter((r) => r.kind === "critical-mass").length;
  const os = focus.kind === "open-streets" ? 0 : rides.filter((r) => r.kind === "open-streets").length;
  const extra = [cm && (cm === 1 ? "a Critical Mass" : `${cm} Critical Mass rides`), os && (os === 1 ? "an open-streets day" : `${os} open-streets days`)].filter(Boolean);
  const plus = extra.length ? `, plus ${andList(extra)}` : "";
  if (!order.length) return extra.length ? `The list includes ${andList(extra)}.` : null;
  if (focus.disc) return `Some are listed for other bikes too: ${andList(order.slice(0, 4).map((d) => `${by[d]} ${BIKE[d]}`))}${plus}.`;
  if (order.length === 1 && by[order[0]] === N) return `${N === 2 ? "Both are" : `All ${N} are`} ${BIKE_ADJ[order[0]]} rides${plus}.`;
  return `By bike: ${andList(order.slice(0, 5).map((d) => `${by[d]} ${BIKE[d]}`))}${plus}.`;
}

function cadenceSentence(rides) {
  const N = rides.length;
  const c = { weekly: 0, biweekly: 0, monthly: 0, irregular: 0 };
  for (const r of rides) c[cadence(r)]++;
  if (c.weekly === N) return N >= 3 ? `All ${N} run every week.` : null;
  if (c.monthly === N) return `${N === 2 ? "Both run" : `All ${N} run`} once a month.`;
  if (c.irregular === N) return `${N === 2 ? "Both are" : `All ${N} are`} posted date by date.`;
  const parts = [c.weekly && `${c.weekly} every week`, c.biweekly && `${c.biweekly} every other week`, c.monthly && `${c.monthly} once a month`, c.irregular && `${c.irregular} on dates posted one at a time`].filter(Boolean);
  return parts.length > 1 ? `They run ${andList(parts)}.` : null;
}

function checkedSentence(rides) {
  const dates = rides.map(checkedOn).filter(Boolean).sort();
  if (!dates.length) return null;
  const a = dates[0], b = dates[dates.length - 1];
  const each = rides.length === 2 ? "Both were checked at the source" : "Each one was checked at its source";
  if (a === b) return `${each} on ${md(a)}, ${a.slice(0, 4)}.`;
  return a.slice(0, 4) === b.slice(0, 4) ? `${each} between ${md(a)} and ${md(b)}, ${b.slice(0, 4)}.` : `${each} between ${md(a)}, ${a.slice(0, 4)} and ${md(b)}, ${b.slice(0, 4)}.`;
}

/**
 * The paragraph for a list of rides.
 * @param {object[]} rides  the rides on the page (fields: name, days, start_hhmm, frequency, discipline, kind,
 *                          inclusive_focus, drop_policy, verified_on, optional _f.checked_on)
 * @param {object} opts     focus: { day | tag | disc | kind } — what the page is already about, so it isn't said again;
 *                          fmtTime(hhmm): the build's own time format (the default is the same shape: "6:30 pm")
 * @returns {string[]} the sentences, in reading order; empty under two rides
 */
function listLede(rides, { focus = {}, fmtTime = fmtTimeDefault } = {}) {
  if (!rides || rides.length < 2) return [];
  // a day page leads with the times; everywhere else the days come first
  const said = [
    focus.day ? null : daysSentence(rides, focus),
    timesSentence(rides, fmtTime),
    eveningSentence(rides, focus),
    ridersSentence(rides, focus),
    madeForSentence(rides, focus),
    bikeSentence(rides, focus),
    cadenceSentence(rides),
  ].filter(Boolean);
  const checked = checkedSentence(rides);
  // a paragraph, not a report: the first five that came up, then the check
  return [...said.slice(0, 5), ...(checked ? [checked] : [])];
}

module.exports = { listLede };
