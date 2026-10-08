// netlify/functions/lib/review-link.js — the signed Post it / Drop it links in a review email (Oct 8, 2026).
// The link carries the review itself (base64url JSON) and an HMAC made with REVIEWS_SECRET, so nothing
// is stored between the email and the tap, and nobody can make a link that posts words of their own.
const crypto = require("crypto");
const DAYS = 60;
const b64 = (s) => Buffer.from(s, "utf8").toString("base64url");
const unb64 = (s) => Buffer.from(String(s || ""), "base64url").toString("utf8");
const mac = (secret, d) => crypto.createHmac("sha256", secret).update(d).digest("base64url");

function sign(review, secret, now = Date.now()) {
  const d = b64(JSON.stringify({ ...review, exp: now + DAYS * 864e5 }));
  return { d, s: mac(secret, d) };
}
function verify(d, s, secret, now = Date.now()) {
  if (!secret || !d || !s) return null;
  const want = Buffer.from(mac(secret, d)), got = Buffer.from(String(s));
  if (want.length !== got.length || !crypto.timingSafeEqual(want, got)) return null;
  let o; try { o = JSON.parse(unb64(d)); } catch (e) { return null; }
  if (!o || !o.exp || o.exp < now) return null;
  delete o.exp;
  return o;
}
module.exports = { sign, verify };
