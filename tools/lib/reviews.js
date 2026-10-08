/*
  tools/lib/reviews.js — rider reviews on ride pages (Oct 8, 2026). One place for the rules, used by
  tools/build-rides.js (the summary), tools/reviews-pull.js (a Netlify submission → a review a person
  reads) and tools/reviews-post.js (the approved review → data/ride-reviews.json).

  A review is the rider's own words. Nothing here rewrites them: it trims, takes links, emails and
  phone numbers out (the form says "Links come out"), and refuses what isn't a review. A person reads
  every one before it goes up; `flags` are notes for that person, never a decision.
*/
"use strict";

const AGAIN = ["yes", "no"];
const PACE = ["easier", "right", "harder"];
const MIN_WORDS = 20, MAX_WORDS = 600, MAX_NAME = 30, MAX_FROM = 40;

const LINK = /\b(?:https?:\/\/|www\.)\S+|\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|org|net|io|co|app|ly|me|us|gg|tv|bike|cc)\b(?:\/\S*)?/gi;
const EMAIL = /[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}/gi;
const PHONE = /(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\b\d{3})[\s.-]?\d{3}[\s.-]?\d{4}\b/g;
// words a person should look at twice before posting (§4: no mental-health language on ride pages)
const LOOK = /\b(suicid\w*|self[- ]?harm|kill (?:my|him|her)self|depress\w*|anxiety|sober|sobriety|relapse\w*|rehab|overdos\w*|therapy|mental health)\b/i;

const squash = (s) => String(s == null ? "" : s).replace(/[\u0000-\u0008\u000b-\u001f\u007f<>]/g, "").replace(/\s+/g, " ").trim();
const strip = (s) => squash(String(s == null ? "" : s).replace(EMAIL, " ").replace(LINK, " ").replace(PHONE, " "));

/*
  clean(sub, slugs) — sub = a Netlify submission ({ id, created_at, data: {...} }) or its data with id/date;
  slugs = a Set of ride slugs. → { ok: true, review, flags } | { ok: false, reason }
*/
function clean(sub, slugs) {
  const d = (sub && sub.data) || sub || {};
  const id = String((sub && sub.id) || d.id || "").trim();
  if (!/^[a-z0-9]{6,40}$/i.test(id)) return { ok: false, reason: "no submission id" };
  const slug = String(d.ride || "").trim().toLowerCase();
  if (!slugs || !slugs.has(slug)) return { ok: false, reason: `not a ride we list ("${slug.slice(0, 80)}")` };
  const again = String(d.again || "").trim().toLowerCase();
  if (!AGAIN.includes(again)) return { ok: false, reason: "no answer to 'ride it again?'" };
  const paceRaw = String(d.pace || "").trim().toLowerCase();
  const pace = PACE.includes(paceRaw) ? paceRaw : null;
  const rawWords = squash(d.words);
  const words = strip(rawWords).slice(0, MAX_WORDS).trim();
  if (words.length < MIN_WORDS) return { ok: false, reason: `too short (${words.length} characters after links came out)` };
  const name = strip(d.name).slice(0, MAX_NAME).trim();
  if (!name || !/[\p{L}]/u.test(name)) return { ok: false, reason: "no first name" };
  const from = strip(d.from).slice(0, MAX_FROM).trim() || null;
  const at = String((sub && sub.created_at) || d.date || "");
  const date = /^\d{4}-\d{2}-\d{2}/.test(at) ? at.slice(0, 10) : null;
  if (!date) return { ok: false, reason: "no date" };

  const flags = [];
  if (words !== rawWords.slice(0, MAX_WORDS).trim()) flags.push("A link, email or phone number came out of the words.");
  const look = rawWords.match(LOOK);
  if (look) flags.push(`It mentions “${look[0]}”. Ride pages carry no mental-health language; post it only if that’s fine where it is.`);
  if (/@\w{2,}/.test(rawWords)) flags.push("It names an @handle.");
  if (rawWords.length > 40 && rawWords === rawWords.toUpperCase() && /[A-Z]/.test(rawWords)) flags.push("It’s all capitals.");
  if (String(d["bot-field"] || "").trim()) return { ok: false, reason: "the bot field was filled" };

  return { ok: true, review: { id, slug, name, from, again, pace, words, date }, flags };
}

// a review read back from data/ride-reviews.json or an issue: the same shape, or null
function valid(rv, slugs) {
  if (!rv || typeof rv !== "object") return null;
  const r = clean({ id: rv.id, created_at: rv.date, data: { ride: rv.slug, again: rv.again, pace: rv.pace, words: rv.words, name: rv.name, from: rv.from } }, slugs);
  return r.ok ? r.review : null;
}

const PACE_TEXT = { easier: "easier than it says", right: "about right", harder: "harder than it says" };
const PACE_TAG = { easier: "Pace easier than it says", right: "Pace about right", harder: "Pace harder than it says" };

/* summary(list) → { n, yes, pace: "right" | null, paceN, paceAll } — the pace most riders named,
   only when it's at least half of those who answered and nothing else ties it */
function summary(list) {
  const n = list.length, yes = list.filter((r) => r.again === "yes").length;
  const counts = {};
  list.forEach((r) => { if (r.pace) counts[r.pace] = (counts[r.pace] || 0) + 1; });
  const paceAll = Object.values(counts).reduce((a, b) => a + b, 0);
  const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const top = ranked[0] && (!ranked[1] || ranked[0][1] > ranked[1][1]) && ranked[0][1] * 2 >= paceAll ? ranked[0] : null;
  return { n, yes, pace: top ? top[0] : null, paceN: top ? top[1] : 0, paceAll };
}

// "4 of 4 would ride it again" → plain words for the stats and the tag at the top of the page
function againText(s) {
  if (!s.n) return "";
  if (s.n === 1) return s.yes ? "would ride it again" : "wouldn’t ride it again";
  if (s.yes === s.n) return `all ${s.n} would ride it again`;
  if (s.yes === 0) return "none would ride it again";
  return `${s.yes} of ${s.n} would ride it again`;
}

// newest first; a stable order for reviews on the same day
const byNewest = (a, b) => (b.date || "").localeCompare(a.date || "") || String(b.id).localeCompare(String(a.id));

module.exports = { clean, valid, summary, againText, byNewest, PACE_TEXT, PACE_TAG, AGAIN, PACE, MIN_WORDS, MAX_WORDS };
