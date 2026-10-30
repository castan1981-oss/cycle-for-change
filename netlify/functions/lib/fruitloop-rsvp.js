// The Fruit Loop RSVP (Oct 30, 2026). Robert: "click this link yes I'm coming. No, I'm not that's it", plus "maybe but
// keep me informed on upcoming events", and only the maybes leave contact details. The rules live here so
// netlify/functions/rsvp.js stays a thin door and tools/test/fruitloop-rsvp.test.js can hold them.
//
// What's stored (Netlify Blobs, store "fruitloop-rsvp"; deploy previews write to "fruitloop-rsvp-preview"):
//   r/<friday>/<answer>/<id>   one key per browser per Friday; the answer is in the key, so the tally is a list, no reads.
//                              A second tap from the same browser replaces the first answer instead of adding one.
//   c/<id>                     a maybe's name, email and/or phone, the Friday they asked on, when.
// Nothing about a yes or a no: no name, no IP, no device details. <id> is a random string the page keeps in the browser.
//
// The tally (GET, header X-Tally-Key) and removing a contact need Robert's private key. The repo is public, so only the
// key's SHA-256 is here; the key itself is in his link (/fruitloop/tally/#k=…) and the project doc.

"use strict";
const crypto = require("crypto");

const HOUR = 36e5, DAY = 864e5;
// Every Friday from Fri, Dec 11, 2026, rolling at 6:00 pm Phoenix (UTC−7 all year) = 01:00 UTC the next day.
// Same clock as /fruitloop/fruitloop.js: a ride counts as "next" until 2 h 45 min after the roll (coffee's done).
const FIRST_ROLL = Date.UTC(2026, 11, 12, 1, 0);
const FIRST_DAY = "2026-12-11";
const AHEAD_DAYS = 56;                       // an RSVP can name a Friday up to eight weeks past the next one
const ANSWERS = ["going", "maybe", "not"];
const ALIAS = { yes: "going", in: "going", coming: "going", no: "not", cant: "not", out: "not", posted: "maybe" };
const TALLY_KEY_SHA256 = "2a1e5ceb4677be675df9fb2cf0d954f11d2b6ca682e9a649ad85148a1f1c7f56";

function dayOf(roll) {
  return new Date(roll - 7 * HOUR).toISOString().slice(0, 10);
}
function nextRide(now) {
  let roll = FIRST_ROLL;
  while (roll + 2.75 * HOUR <= now) roll += 7 * DAY;
  return dayOf(roll);
}
// The page sends the Friday it showed. Take it if it's a ride day from the next one on, within eight weeks;
// anything else (a stale tab after the ride, a made-up date) goes on the next ride.
function pickDate(asked, now) {
  const next = nextRide(now);
  if (typeof asked !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(asked)) return next;
  const t = Date.parse(asked + "T00:00:00Z");
  if (Number.isNaN(t) || new Date(t).toISOString().slice(0, 10) !== asked) return next;
  if (new Date(t).getUTCDay() !== 5 || asked < FIRST_DAY || asked < next) return next;
  if (t > Date.parse(next + "T00:00:00Z") + AHEAD_DAYS * DAY) return next;
  return asked;
}

const strip = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function newId() {
  return crypto.randomBytes(15).toString("base64url");
}

// One submission → what to store. Never throws.
function clean(input) {
  const x = input && typeof input === "object" ? input : {};
  const raw = strip(x.a, 20).toLowerCase();
  const a = ANSWERS.includes(raw) ? raw : ALIAS[raw] || null;
  if (!a) return { ok: false, error: "answer" };
  const bot = strip(x.website, 200) !== "";             // the hidden field people never see
  const id = /^[A-Za-z0-9_-]{8,64}$/.test(String(x.id || "")) ? String(x.id) : newId();
  if (a !== "maybe") return { ok: true, a, id, bot, contact: null };

  const name = strip(x.name, 60);
  const email = strip(x.email, 254).toLowerCase();
  const phone = strip(x.phone, 30).replace(/[^0-9+().\- ]/g, "").trim();
  const digits = phone.replace(/\D/g, "").length;
  if (!name) return { ok: false, error: "name" };
  if (email && !EMAIL.test(email)) return { ok: false, error: "email" };
  if (phone && (digits < 7 || digits > 15)) return { ok: false, error: "phone" };
  if (!email && !phone) return { ok: false, error: "contact" };
  return { ok: true, a, id, bot, contact: { name, email, phone } };
}

// Requests come from the page itself: cycleforchange.org, a Netlify deploy preview, or a local preview.
function originOk(h) {
  const src = (h && (h.origin || h.referer || h.referrer)) || "";
  let host;
  try { host = new URL(src).hostname.toLowerCase(); } catch (_) { return false; }
  return /^(www\.)?cycleforchange\.org$/.test(host) || /\.netlify\.app$/.test(host) || host === "localhost" || host === "127.0.0.1";
}

// Previews and branch deploys get their own store, so trying the preview never adds to the real count.
function storeName(h) {
  const ctx = String((h && h["x-nf-deploy-context"]) || "").toLowerCase();
  const host = String((h && (h["x-forwarded-host"] || h.host)) || "").toLowerCase().split(":")[0];
  const live = ctx === "production" || /^(www\.)?cycleforchange\.org$/.test(host);
  return live ? "fruitloop-rsvp" : "fruitloop-rsvp-preview";
}

function keyOk(k) {
  if (typeof k !== "string" || k.length < 16 || k.length > 200) return false;
  const got = crypto.createHash("sha256").update(k).digest();
  return crypto.timingSafeEqual(got, Buffer.from(TALLY_KEY_SHA256, "hex"));
}

async function record(store, d, c, now) {
  for (const other of ANSWERS) if (other !== c.a) await store.delete(`r/${d}/${other}/${c.id}`);
  await store.set(`r/${d}/${c.a}/${c.id}`, String(now));
  if (c.contact) await store.setJSON(`c/${c.id}`, { ...c.contact, d, t: new Date(now).toISOString() });
}

async function tally(store, now) {
  const by = {};
  const { blobs: rs = [] } = await store.list({ prefix: "r/" });
  for (const b of rs) {
    const [, d, a] = b.key.split("/");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || !ANSWERS.includes(a)) continue;
    (by[d] = by[d] || { going: 0, maybe: 0, not: 0 })[a]++;
  }
  const { blobs: cs = [] } = await store.list({ prefix: "c/" });
  const got = await Promise.all(cs.map((b) => store.get(b.key, { type: "json" }).catch(() => null)));
  const contacts = got
    .map((c, i) => (c ? { id: cs[i].key.slice(2), name: c.name || "", email: c.email || "", phone: c.phone || "", d: c.d || "", t: c.t || "" } : null))
    .filter(Boolean)
    .sort((p, q) => (q.t > p.t ? 1 : q.t < p.t ? -1 : 0));
  const next = nextRide(now);
  const dates = Object.keys(by).sort().map((d) => ({ d, ...by[d] }));
  return { ok: true, next, nextCounts: by[next] || { going: 0, maybe: 0, not: 0 }, dates, contacts };
}

async function removeContact(store, id) {
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(String(id || ""))) return false;
  await store.delete(`c/${id}`);
  return true;
}

module.exports = { ANSWERS, FIRST_DAY, nextRide, pickDate, clean, originOk, storeName, keyOk, record, tally, removeContact };
