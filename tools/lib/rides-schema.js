"use strict";
/*
  rides-schema.js — the group-rides data contract (schema v3, Sept 30, 2026).

  One place for the vocabularies, the field order, the country helpers and the
  safety list. Used by tools/build-rides.js, tools/derive-ride-fields.js,
  tools/validate-rides.js, tools/rides-watch.js and tools/rides-apply.js.
  The prose version lives in data/SCHEMA.md ("Group rides").
*/

const VOCAB = {
  kind: ["group-ride", "open-streets", "critical-mass", "training-series"],
  discipline: ["road", "gravel", "mtb", "social", "cruiser", "fixed", "track", "cyclocross", "ebike", "mixed", "bmx"],
  frequency: ["weekly", "biweekly", "monthly", "irregular"],
  days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
  drop_policy: ["no-drop", "groups", "drop", "unknown"],
  host_type: ["shop", "club", "collective", "nonprofit", "informal", "brand", "team", "cafe", "public"],
  inclusive_focus: ["lgbtq", "wtf", "bipoc", "beginner", "no-drop", "family", "adaptive", "youth"],
  confidence: ["high", "medium", "low"],
  status: ["active", "seasonal-break", "paused", "ended"],
  refresh_method: ["ics", "calendar-page", "meetup", "ridewithgps", "eventbrite", "heylo", "spond", "strava-club",
    "instagram", "facebook", "static-page", "federation-calendar", "news"],
  geo_precision: ["start", "city"],
};

// Canonical key order for a ride record. Keys not listed keep their place at the end.
const FIELD_ORDER = [
  "slug", "name", "name_en", "kind", "status", "status_note", "status_since",
  "city", "neighborhood", "region", "state", "country", "lat", "lng", "geo_precision", "tz",
  "discipline", "schedule", "days", "time_local", "start_hhmm", "start_times", "frequency", "monthly_rule", "season", "season_months",
  "start_location", "distance_km", "distance_miles", "duration", "duration_min", "pace", "drop_policy",
  "host", "founded_year", "founded_note", "cost", "language", "visitor_notes", "description",
  "links", "inclusive_focus", "sources", "verified_on", "last_seen", "evidence", "confidence", "refresh",
];

const US_STATES = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut",
  DE: "Delaware", DC: "District of Columbia", FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana",
  NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
  NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah",
  VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

// Plain English names where the ICU name reads oddly to a rider ("Hong Kong SAR China").
const COUNTRY_NAME_OVERRIDE = {
  US: "United States", GB: "United Kingdom", HK: "Hong Kong", MO: "Macau", PS: "Palestine", TR: "Turkey",
  KR: "South Korea", CZ: "Czechia", CI: "Ivory Coast", VN: "Vietnam", LA: "Laos", RU: "Russia",
};
// Extra words a searcher might type for a country.
const COUNTRY_ALIASES = {
  US: ["usa", "america", "united states of america"], GB: ["uk", "britain", "great britain", "england", "scotland", "wales", "northern ireland"],
  NL: ["holland", "the netherlands"], TR: ["turkiye", "türkiye"], CZ: ["czech republic"], KR: ["korea"], AE: ["uae", "emirates"],
  ZA: ["rsa"], CH: ["suisse", "schweiz", "svizzera"], DE: ["deutschland"], ES: ["espana", "españa"], MX: ["méxico"],
  BR: ["brasil"], IT: ["italia"], JP: ["nippon"], NZ: ["aotearoa"], BE: ["belgie", "belgique", "belgië"], AT: ["osterreich", "österreich"],
};

let DISPLAY = null;
function countryName(cc) {
  if (!cc) return null;
  cc = String(cc).toUpperCase();
  if (COUNTRY_NAME_OVERRIDE[cc]) return COUNTRY_NAME_OVERRIDE[cc];
  try {
    DISPLAY = DISPLAY || new Intl.DisplayNames(["en"], { type: "region" });
    const n = DISPLAY.of(cc);
    return n && n !== cc ? n : cc;
  } catch (e) { return cc; }
}

const fold = (s) => String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, "");
const slugify = (s) => fold(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const countrySlug = (cc) => slugify(countryName(cc));

// Where the site never lists LGBTQ-focused rides, even public ones: same-sex relations are criminalised,
// or the law / the authorities ban LGBTQ public gatherings or "propaganda". Conservative on purpose.
// Checked against ILGA World's map as known in 2026; add to it, don't remove without a source.
const NO_LGBTQ_LISTING = new Set([
  "AF", "DZ", "BD", "BN", "BI", "CM", "TD", "KM", "EG", "ER", "SZ", "ET", "GM", "GH", "GD", "GN", "GY", "ID", "IR", "IQ",
  "JM", "KE", "KI", "KW", "LB", "LR", "LY", "MW", "MY", "MV", "ML", "MR", "MA", "MM", "NG", "OM", "PK", "PG", "QA",
  "LC", "VC", "WS", "SA", "SN", "SL", "SB", "SO", "SS", "LK", "SD", "SY", "TZ", "TG", "TO", "TN", "TM", "TV", "UG",
  "AE", "UZ", "YE", "ZM", "ZW", "BF", "TT",
  // bans on LGBTQ events / "propaganda", or crackdowns on LGBTQ groups
  "RU", "BY", "HU", "GE", "KZ", "KG", "TR", "AZ", "CN", "TJ",
]);

// Local-language day names, used by the watcher to find the schedule on a host's page.
const DAY_WORDS = {
  mon: ["monday", "lunes", "segunda", "lundi", "montag", "lunedi", "lunedì", "maandag", "dilluns", "mandag", "måndag", "maanantai", "poniedzialek", "poniedziałek", "pondeli", "pondělí", "月曜"],
  tue: ["tuesday", "martes", "terca", "terça", "mardi", "dienstag", "martedi", "martedì", "dinsdag", "dimarts", "tirsdag", "tisdag", "tiistai", "wtorek", "utery", "úterý", "火曜"],
  wed: ["wednesday", "miercoles", "miércoles", "quarta", "mercredi", "mittwoch", "mercoledi", "mercoledì", "woensdag", "dimecres", "onsdag", "keskiviikko", "sroda", "środa", "streda", "středa", "水曜"],
  thu: ["thursday", "jueves", "quinta", "jeudi", "donnerstag", "giovedi", "giovedì", "donderdag", "dijous", "torsdag", "torstai", "czwartek", "ctvrtek", "čtvrtek", "木曜"],
  fri: ["friday", "viernes", "sexta", "vendredi", "freitag", "venerdi", "venerdì", "vrijdag", "divendres", "fredag", "perjantai", "piatek", "piątek", "patek", "pátek", "金曜"],
  sat: ["saturday", "sabado", "sábado", "samedi", "samstag", "sonnabend", "sabato", "zaterdag", "dissabte", "lordag", "lørdag", "lördag", "lauantai", "sobota", "土曜"],
  sun: ["sunday", "domingo", "dimanche", "sonntag", "domenica", "zondag", "diumenge", "sondag", "søndag", "söndag", "sunnuntai", "niedziela", "nedele", "neděle", "日曜"],
};

function orderRecord(r) {
  const out = {};
  for (const k of FIELD_ORDER) if (Object.prototype.hasOwnProperty.call(r, k)) out[k] = r[k];
  for (const k of Object.keys(r)) if (!Object.prototype.hasOwnProperty.call(out, k)) out[k] = r[k];
  return out;
}

// Sort: US by state, then the world by country; city, then name.
function sortRides(rides) {
  return rides.sort((a, b) => {
    const ca = a.country || "US", cb = b.country || "US";
    if ((ca === "US") !== (cb === "US")) return ca === "US" ? -1 : 1;
    return (ca === "US" ? String(a.state).localeCompare(String(b.state)) : countryName(ca).localeCompare(countryName(cb)))
      || String(a.city).localeCompare(String(b.city)) || String(a.name).localeCompare(String(b.name));
  });
}

function refreshMethodFor(url) {
  const u = String(url || "").toLowerCase();
  if (!u) return "static-page";
  if (/\.ics(\?|$)|webcal:|ical=1|\/ical\//.test(u)) return "ics";
  if (u.includes("meetup.com")) return "meetup";
  if (u.includes("ridewithgps.com")) return "ridewithgps";
  if (u.includes("eventbrite.")) return "eventbrite";
  if (u.includes("heylo.")) return "heylo";
  if (u.includes("spond.com")) return "spond";
  if (u.includes("strava.com")) return "strava-club";
  if (u.includes("instagram.com")) return "instagram";
  if (u.includes("facebook.com") || u.includes("fb.me")) return "facebook";
  if (/calendar|events?\b|\/events|agenda|kalender|calendrier|calendario|termine/.test(u)) return "calendar-page";
  return "static-page";
}

const SOCIAL_HOSTS = /(^|\.)(instagram\.com|facebook\.com|fb\.me|fb\.com|strava\.com|x\.com|twitter\.com|tiktok\.com|threads\.net|linktr\.ee|whatsapp\.com|chat\.whatsapp\.com|t\.me)$/i;
const isSocial = (url) => { try { return SOCIAL_HOSTS.test(new URL(url).hostname); } catch (e) { return false; } };

// start_times: a host's own table of start-time changes, [{ from: "YYYY-MM-DD", start_hhmm: "HH:MM" }],
// oldest first. From `from` (the ride's local date) on, the ride starts at that time; before the first
// entry it starts at start_hhmm. Arizona rides move with the heat and the light ("6:30 from the first
// Saturday of September, 7:00 from the second Saturday of October"), so the build, the ride page and the
// watcher all ask startOn(ride, date) instead of reading start_hhmm. Only what the host published — never a guess.
function startOn(ride, ymd) {
  let t = ride && ride.start_hhmm ? ride.start_hhmm : null;
  const tab = ride && Array.isArray(ride.start_times) ? ride.start_times : [];
  for (const e of tab) if (e && typeof e.from === "string" && e.from <= ymd && typeof e.start_hhmm === "string") t = e.start_hhmm;
  return t;
}
// every time the ride can start at (the base and the table), for "does the host's page mention our time"
function startTimesAll(ride) {
  const out = new Set(); if (ride && ride.start_hhmm) out.add(ride.start_hhmm);
  for (const e of (ride && Array.isArray(ride.start_times) ? ride.start_times : [])) if (e && e.start_hhmm) out.add(e.start_hhmm);
  return [...out];
}

module.exports = {
  VOCAB, FIELD_ORDER, US_STATES, COUNTRY_ALIASES, NO_LGBTQ_LISTING, DAY_WORDS,
  countryName, countrySlug, slugify, fold, orderRecord, sortRides, refreshMethodFor, isSocial, startOn, startTimesAll,
};
