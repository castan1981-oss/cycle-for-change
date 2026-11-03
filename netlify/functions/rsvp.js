// /api/rsvp → /.netlify/functions/rsvp (netlify.toml). The Fruit Loop RSVP (Oct 30, 2026); rules and storage in
// lib/fruitloop-rsvp.js.
//
//   POST  {a: going|not|maybe, d, id, name?, email?, phone?}   from /fruitloop/rsvp/. JSON from the page's script
//         (answers JSON); a plain form post without the script answers 303 → /fruitloop/, the ride page.
//   GET   with X-Tally-Key                                     the tally, for /fruitloop/tally/ (Robert only).
//   POST  {op: "remove", id} with X-Tally-Key                  takes one "keep me posted" contact off the list.
//
// A failed write never strands a rider: the no-script path still lands on the ride page, the script path says so.

const L = require("./lib/fruitloop-rsvp");
const blobs = require("./lib/blobs");

const HEAD = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };
const json = (status, body) => ({ statusCode: status, headers: { ...HEAD, "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify(body) });
const go = (to) => ({ statusCode: 303, headers: { ...HEAD, Location: to }, body: "" });

function lower(h) {
  const out = {};
  for (const k of Object.keys(h || {})) out[k.toLowerCase()] = h[k];
  return out;
}
function parse(event, h) {
  const raw = event.isBase64Encoded ? Buffer.from(event.body || "", "base64").toString("utf8") : event.body || "";
  const ct = String(h["content-type"] || "");
  if (/json/i.test(ct)) {
    try { return { form: false, input: JSON.parse(raw || "{}") }; } catch (_) { return { form: false, input: {} }; }
  }
  return { form: true, input: Object.fromEntries(new URLSearchParams(raw)) };
}

exports.handler = async (event) => {
  blobs.connect(event);
  const h = lower(event.headers);
  const store = () => blobs.store(L.storeName(h));

  if (event.httpMethod === "GET") {
    if (!L.keyOk(h["x-tally-key"])) return json(403, { ok: false, error: "key" });
    try {
      return json(200, await L.tally(store(), Date.now()));
    } catch (e) {
      return json(500, { ok: false, error: "store" });
    }
  }
  if (event.httpMethod !== "POST") return json(405, { ok: false, error: "method" });

  const { form, input } = parse(event, h);

  if (input.op === "remove") {
    if (!L.keyOk(h["x-tally-key"])) return json(403, { ok: false, error: "key" });
    try {
      return json(200, { ok: await L.removeContact(store(), input.id) });
    } catch (e) {
      return json(500, { ok: false, error: "store" });
    }
  }

  if (!L.originOk(h)) return form ? go("/fruitloop/") : json(403, { ok: false, error: "origin" });

  const c = L.clean(input);
  if (!c.ok) return form ? go(`/fruitloop/rsvp/?missing=${c.error}#posted`) : json(400, { ok: false, error: c.error });

  const now = Date.now();
  const d = L.pickDate(input.d, now);
  if (!c.bot) {
    try {
      await L.record(store(), d, c, now);
    } catch (e) {
      return form ? go("/fruitloop/") : json(500, { ok: false, error: "store" });
    }
  }
  return form ? go("/fruitloop/") : json(200, { ok: true, d, a: c.a, id: c.id });
};
