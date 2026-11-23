// Training (/training/, Nov 23, 2026). Robert: "a complete separate login for this, cycleforchange.org/training … and
// after we get it done, present it to Benson and see if he would like to use that." For him first, then maybe others.
// The rules live here so netlify/functions/training.js stays a thin door and tools/test/training.test.js can hold them.
//
// Who: two invited people, no sign-up. Robert (the athlete) and John Benson (his coach, who sees Robert's week and
// writes the week's note). The repo is public, so an invite is a private link whose SHA-256 is below; the link itself
// is only in Robert's hands and the claude.ai project doc. Opening it lets that person set a password, once per use.
//
// What's stored (Netlify Blobs, store "training"; deploy previews write to "training-preview"):
//   pw/<user>                 the password, scrypt-hashed with its own salt. Never the password.
//   s/<sha256 of session>     who is signed in and until when. The cookie holds the session; the store only its hash.
//   fail/<user>               recent failed sign-ins (times only), to slow guessing.
//   feed/<athlete>            the athlete's private TrainingPeaks calendar link. Never sent back to the browser.
//   cache/<athlete>           the calendar's workouts as last read, for 15 minutes.
//   ride/<athlete>/<day>/<id> a ride the athlete dropped: day, miles, moving time, climbing, the file's name. The file
//                             itself is read in the browser and never leaves it.
//   note/<athlete>/<monday>   the coach's note for that week.
// Nothing here is public, nothing goes to GitHub, and no Strava data is read (CLAUDE.md §8, §10): the plan comes from
// TrainingPeaks' own calendar feed and the rides from files off the bike computer.

"use strict";
const crypto = require("crypto");

const DAY = 864e5;
const SESSION_DAYS = 30;
const COOKIE = "cfc_t";
const USERS = {
  robert: { name: "Robert", role: "athlete", athlete: "robert", invite: "e096fc81a7e57722047b55c7bc8d0138bd27b1e5d1bfc26075c2e6a666161ff0" },
  john: { name: "John", role: "coach", athlete: "robert", invite: "472a8f1ed0f66c77cdc9b48d576d1cd150044f700e0754ebee958f386ce6b4c6" },
};

const sha = (s) => crypto.createHash("sha256").update(String(s)).digest("hex");
const strip = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u0008\u000b-\u001f\u007f<>]/g, " ").trim().slice(0, max);
const isYmd = (s) => { if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false; const t = Date.parse(s + "T00:00:00Z"); return !Number.isNaN(t) && new Date(t).toISOString().slice(0, 10) === s; };

function originOk(h) {
  const src = (h && (h.origin || h.referer || h.referrer)) || "";
  let host;
  try { host = new URL(src).hostname.toLowerCase(); } catch (_) { return false; }
  return /^(www\.)?cycleforchange\.org$/.test(host) || /\.netlify\.app$/.test(host) || host === "localhost" || host === "127.0.0.1";
}
function storeName(h) {
  const ctx = String((h && h["x-nf-deploy-context"]) || "").toLowerCase();
  const host = String((h && (h["x-forwarded-host"] || h.host)) || "").toLowerCase().split(":")[0];
  return ctx === "production" || /^(www\.)?cycleforchange\.org$/.test(host) ? "training" : "training-preview";
}

// ---- invites and passwords ----
function inviteUser(k) {
  if (typeof k !== "string" || k.length < 24 || k.length > 200) return null;
  const got = Buffer.from(sha(k), "hex");
  for (const id of Object.keys(USERS)) if (crypto.timingSafeEqual(got, Buffer.from(USERS[id].invite, "hex"))) return id;
  return null;
}
function passwordOk(p) { return typeof p === "string" && p.length >= 10 && p.length <= 200; }
function hashPassword(p, salt = crypto.randomBytes(16).toString("hex")) {
  return { salt, hash: crypto.scryptSync(p, salt, 32).toString("hex") };
}
function checkPassword(p, rec) {
  if (!rec || typeof p !== "string" || !rec.salt || !rec.hash) return false;
  const got = crypto.scryptSync(p, rec.salt, 32);
  const want = Buffer.from(rec.hash, "hex");
  return got.length === want.length && crypto.timingSafeEqual(got, want);
}
// eight wrong passwords in fifteen minutes and the door waits
function locked(fails, now) { return (fails || []).filter((t) => now - t < 15 * 6e4).length >= 8; }

// ---- sessions ----
function newSession(user, now) {
  const token = crypto.randomBytes(32).toString("base64url");
  return { token, key: `s/${sha(token)}`, rec: { u: user, exp: now + SESSION_DAYS * DAY } };
}
function cookieOf(h) {
  const m = String((h && h.cookie) || "").match(new RegExp(`(?:^|;\\s*)${COOKIE}=([A-Za-z0-9_-]{20,100})`));
  return m ? m[1] : null;
}
const setCookie = (token) => `${COOKIE}=${token}; Path=/; Max-Age=${SESSION_DAYS * 86400}; HttpOnly; Secure; SameSite=Lax`;
const clearCookie = () => `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
async function whoIs(store, h, now) {
  const token = cookieOf(h);
  if (!token) return null;
  const rec = await store.get(`s/${sha(token)}`, { type: "json" });
  if (!rec || !USERS[rec.u] || rec.exp < now) return null;
  return { id: rec.u, ...USERS[rec.u], invite: undefined };
}

// ---- the TrainingPeaks calendar link ----
// Only TrainingPeaks' own hosts, only https, so the site's server can't be pointed anywhere else.
function feedUrl(raw) {
  const s = strip(raw, 600).replace(/^webcal:\/\//i, "https://");
  let u;
  try { u = new URL(s); } catch (_) { return null; }
  if (u.protocol !== "https:" || u.username || u.password || (u.port && u.port !== "443")) return null;
  if (!/(^|\.)trainingpeaks\.com$/i.test(u.hostname)) return null;
  if (u.pathname === "/" || u.pathname === "") return null;      // the home page isn't a calendar
  return u.toString();
}

// ---- reading an .ics calendar ----
const unescapeIcs = (s) => s.replace(/\\n/gi, "\n").replace(/\\([,;\\])/g, "$1");
function icsDate(v, params) {
  const m = String(v).match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?/);
  if (!m) return null;
  const day = `${m[1]}-${m[2]}-${m[3]}`;
  if (!m[4]) return { day, ms: null };
  // a "floating" or zoned time is the athlete's own clock: the day written is the day meant
  const ms = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0));
  if (m[7] && !/TZID/i.test(params || "")) {
    const phx = new Date(ms - 7 * 36e5).toISOString().slice(0, 10);   // UTC stamps are read on Phoenix's clock
    return { day: phx, ms };
  }
  return { day, ms };
}
// "Planned Time: 1:30:00", "Duration: 1:30", "1h 30m", "90 min": the first one found, in minutes
function minutesIn(text) {
  const t = String(text || "");
  let m = t.match(/(?:planned\s*(?:time|duration)|duration|time)\s*[:=]\s*(\d{1,2}):(\d{2})(?::(\d{2}))?/i);
  if (m) return +m[1] * 60 + +m[2];
  m = t.match(/\b(\d{1,2})\s*h(?:ours?|rs?)?\s*(?:(\d{1,2})\s*m(?:in(?:utes?)?)?)?\b/i);
  if (m) return +m[1] * 60 + +(m[2] || 0);
  m = t.match(/\b(\d{2,3})\s*min(?:utes?)?\b/i);
  if (m) return +m[1];
  return null;
}
function parseIcs(text) {
  const lines = String(text || "").replace(/\r\n?/g, "\n").replace(/\n[ \t]/g, "").split("\n");
  const out = [];
  let cur = null;
  for (const line of lines) {
    if (/^BEGIN:VEVENT/i.test(line)) { cur = {}; continue; }
    if (/^END:VEVENT/i.test(line)) {
      if (cur && cur.start && cur.title) {
        let minutes = cur.start.ms != null && cur.end && cur.end.ms != null ? Math.round((cur.end.ms - cur.start.ms) / 6e4) : null;
        if (!(minutes > 0 && minutes <= 16 * 60)) minutes = minutesIn(cur.desc) || minutesIn(cur.title);
        out.push({ id: sha(cur.uid || `${cur.start.day}|${cur.title}`).slice(0, 16), day: cur.start.day, title: strip(cur.title, 160), desc: strip(cur.desc || "", 4000), minutes: minutes > 0 && minutes <= 16 * 60 ? minutes : null });
      }
      cur = null; continue;
    }
    if (!cur) continue;
    const m = line.match(/^([A-Za-z-]+)((?:;[^:]*)?):(.*)$/);
    if (!m) continue;
    const key = m[1].toUpperCase(), val = m[3];
    if (key === "DTSTART") cur.start = icsDate(val, m[2]);
    else if (key === "DTEND") cur.end = icsDate(val, m[2]);
    else if (key === "SUMMARY") cur.title = unescapeIcs(val);
    else if (key === "DESCRIPTION") cur.desc = unescapeIcs(val);
    else if (key === "UID") cur.uid = val;
  }
  return out.sort((a, b) => a.day.localeCompare(b.day) || a.title.localeCompare(b.title));
}

// ---- the week ----
const addDays = (ymd, n) => new Date(Date.parse(ymd + "T00:00:00Z") + n * DAY).toISOString().slice(0, 10);
const phxToday = (now) => new Date(now - 7 * 36e5).toISOString().slice(0, 10);
function mondayOf(ymd) {
  const dow = new Date(ymd + "T00:00:00Z").getUTCDay();
  return addDays(ymd, -((dow + 6) % 7));
}
function pickMonday(asked, now) {
  const today = phxToday(now);
  if (!isYmd(asked)) return mondayOf(today);
  const m = mondayOf(asked);
  return Math.abs(Date.parse(m) - Date.parse(mondayOf(today))) > 370 * DAY ? mondayOf(today) : m;
}
function weekOf(monday, workouts, rides) {
  return [0, 1, 2, 3, 4, 5, 6].map((i) => {
    const day = addDays(monday, i);
    return { day, planned: (workouts || []).filter((w) => w.day === day), rides: (rides || []).filter((r) => r.day === day) };
  });
}

// ---- a dropped ride ----
function cleanRide(x) {
  const r = x && typeof x === "object" ? x : {};
  if (!isYmd(r.day)) return { ok: false, error: "day" };
  const miles = Number(r.miles), moving = Number(r.moving_s), gain = Number(r.gain_ft);
  if (!(miles > 0 && miles < 400)) return { ok: false, error: "miles" };
  return { ok: true, ride: {
    id: crypto.randomBytes(9).toString("base64url"), day: r.day, miles: Math.round(miles * 10) / 10,
    moving_s: moving > 0 && moving < 48 * 3600 ? Math.round(moving) : null,
    gain_ft: gain >= 0 && gain < 60000 ? Math.round(gain) : null, name: strip(r.name, 80),
  } };
}
const cleanNote = (t) => strip(String(t == null ? "" : t).replace(/[ \t]+/g, " "), 600);

module.exports = { USERS, COOKIE, SESSION_DAYS, sha, strip, isYmd, originOk, storeName, inviteUser, passwordOk, hashPassword, checkPassword, locked,
  newSession, cookieOf, setCookie, clearCookie, whoIs, feedUrl, parseIcs, minutesIn, addDays, phxToday, mondayOf, pickMonday, weekOf, cleanRide, cleanNote };
