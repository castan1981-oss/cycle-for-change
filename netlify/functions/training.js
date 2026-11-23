// /api/training → /.netlify/functions/training (netlify.toml). The door for /training/ (Nov 23, 2026); the rules and
// what is stored are in lib/training.js. Every call is a POST with JSON { op, … } from the page itself.
//
//   invite        { k }                 whose invite link this is (their first name), or no
//   set-password  { k, password }       sets that person's password and signs them in
//   login         { who, password }     signs in
//   logout                              signs out
//   week          { monday? }           the signed-in person's week: the plan, the rides, the coach's note
//   set-feed      { url }               the athlete's TrainingPeaks calendar link (athlete only)
//   ride          { day, miles, … }     a ride dropped on the page (athlete only);  ride-remove { day, id }
//   note          { monday, text }      the coach's note for a week (coach only)

const L = require("./lib/training");
const blobs = require("./lib/blobs");

const HEAD = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", "Content-Type": "application/json; charset=utf-8" };
const json = (status, body, cookie) => ({ statusCode: status, headers: cookie ? { ...HEAD, "Set-Cookie": cookie } : HEAD, body: JSON.stringify(body) });
const FEED_MAX = 2 * 1024 * 1024, CACHE_MS = 15 * 6e4;

function lower(h) {
  const out = {};
  for (const k of Object.keys(h || {})) out[k.toLowerCase()] = h[k];
  return out;
}

// the athlete's calendar, read at TrainingPeaks at most every 15 minutes
async function workouts(store, athlete, now, fetchFn = fetch) {
  const url = await store.get(`feed/${athlete}`, { type: "text" });
  if (!url) return { hasFeed: false, list: [], read: null };
  const cached = await store.get(`cache/${athlete}`, { type: "json" });
  if (cached && now - cached.t < CACHE_MS) return { hasFeed: true, list: cached.list, read: cached.t };
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 8000);
    const res = await fetchFn(url, { signal: ctl.signal, redirect: "error", headers: { accept: "text/calendar, text/plain" } });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`status ${res.status}`);
    const text = await res.text();
    if (text.length > FEED_MAX || !/BEGIN:VCALENDAR/i.test(text)) throw new Error("not a calendar");
    const list = L.parseIcs(text);
    await store.setJSON(`cache/${athlete}`, { t: now, list });
    return { hasFeed: true, list, read: now };
  } catch (e) {
    // TrainingPeaks didn't answer: show the last read, and say so
    return { hasFeed: true, list: cached ? cached.list : [], read: cached ? cached.t : null, stale: true };
  }
}

async function ridesOf(store, athlete, monday) {
  const out = [];
  for (let i = 0; i < 7; i++) {
    const day = L.addDays(monday, i);
    const { blobs: keys } = await store.list({ prefix: `ride/${athlete}/${day}/` });
    for (const k of keys) { const r = await store.get(k.key, { type: "json" }); if (r) out.push(r); }
  }
  return out;
}

exports.handler = async (event) => {
  blobs.connect(event);
  const h = lower(event.headers);
  if (event.httpMethod !== "POST") return json(405, { ok: false, error: "method" });
  if (!L.originOk(h)) return json(403, { ok: false, error: "origin" });
  let input = {};
  try { input = JSON.parse((event.isBase64Encoded ? Buffer.from(event.body || "", "base64").toString("utf8") : event.body) || "{}"); } catch (_) { /* empty */ }
  const now = Date.now();
  let store;
  try { store = blobs.store(L.storeName(h)); } catch (e) { return json(500, { ok: false, error: "store" }); }

  try {
    const op = String(input.op || "");

    if (op === "invite") {
      const id = L.inviteUser(input.k);
      return id ? json(200, { ok: true, name: L.USERS[id].name }) : json(403, { ok: false, error: "invite" });
    }
    if (op === "set-password") {
      const id = L.inviteUser(input.k);
      if (!id) return json(403, { ok: false, error: "invite" });
      if (!L.passwordOk(input.password)) return json(400, { ok: false, error: "password" });
      await store.setJSON(`pw/${id}`, L.hashPassword(input.password));
      const s = L.newSession(id, now);
      await store.setJSON(s.key, s.rec);
      return json(200, { ok: true, name: L.USERS[id].name }, L.setCookie(s.token));
    }
    if (op === "login") {
      const id = String(input.who || "").toLowerCase().trim();
      if (!L.USERS[id]) return json(403, { ok: false, error: "login" });
      const fails = (await store.get(`fail/${id}`, { type: "json" })) || [];
      if (L.locked(fails, now)) return json(429, { ok: false, error: "wait" });
      if (!L.checkPassword(input.password, await store.get(`pw/${id}`, { type: "json" }))) {
        await store.setJSON(`fail/${id}`, [...fails.filter((t) => now - t < 15 * 6e4), now].slice(-12));
        return json(403, { ok: false, error: "login" });
      }
      const s = L.newSession(id, now);
      await store.setJSON(s.key, s.rec);
      return json(200, { ok: true, name: L.USERS[id].name }, L.setCookie(s.token));
    }
    if (op === "logout") {
      const token = L.cookieOf(h);
      if (token) await store.delete(`s/${L.sha(token)}`);
      return json(200, { ok: true }, L.clearCookie());
    }

    const me = await L.whoIs(store, h, now);
    if (!me) return json(401, { ok: false, error: "signin" });
    const athlete = me.athlete;

    if (op === "week") {
      const monday = L.pickMonday(input.monday, now);
      const w = await workouts(store, athlete, now);
      const rides = await ridesOf(store, athlete, monday);
      const note = await store.get(`note/${athlete}/${monday}`, { type: "json" });
      return json(200, { ok: true, me: { name: me.name, role: me.role }, athlete: L.USERS[athlete].name, today: L.phxToday(now), monday,
        days: L.weekOf(monday, w.list, rides), hasFeed: w.hasFeed, read: w.read, stale: !!w.stale, note: note || null });
    }
    if (op === "set-feed") {
      if (me.role !== "athlete") return json(403, { ok: false, error: "role" });
      const url = L.feedUrl(input.url);
      if (!url) return json(400, { ok: false, error: "feed" });
      await store.set(`feed/${athlete}`, url);
      await store.delete(`cache/${athlete}`);
      const w = await workouts(store, athlete, now);
      return json(200, { ok: true, found: w.list.length, stale: !!w.stale });
    }
    if (op === "ride") {
      if (me.role !== "athlete") return json(403, { ok: false, error: "role" });
      const c = L.cleanRide(input);
      if (!c.ok) return json(400, { ok: false, error: c.error });
      await store.setJSON(`ride/${athlete}/${c.ride.day}/${c.ride.id}`, c.ride);
      return json(200, { ok: true, ride: c.ride });
    }
    if (op === "ride-remove") {
      if (me.role !== "athlete") return json(403, { ok: false, error: "role" });
      if (!L.isYmd(input.day) || !/^[A-Za-z0-9_-]{6,20}$/.test(String(input.id || ""))) return json(400, { ok: false, error: "ride" });
      await store.delete(`ride/${athlete}/${input.day}/${input.id}`);
      return json(200, { ok: true });
    }
    if (op === "note") {
      if (me.role !== "coach") return json(403, { ok: false, error: "role" });
      const monday = L.pickMonday(input.monday, now);
      const text = L.cleanNote(input.text);
      if (!text) await store.delete(`note/${athlete}/${monday}`);
      else await store.setJSON(`note/${athlete}/${monday}`, { text, by: me.name, t: new Date(now).toISOString() });
      return json(200, { ok: true });
    }
    return json(400, { ok: false, error: "op" });
  } catch (e) {
    return json(500, { ok: false, error: "store" });
  }
};
exports.workouts = workouts;
