// Strava webhook.
//
//   GET  ?hub.mode=subscribe&hub.verify_token=…&hub.challenge=…
//        Strava's one-time callback check. Echoes the challenge.
//   POST {object_type:"activity", aspect_type:"create"|"update"|"delete", …}
//        A ride landed. Marks the tally blob dirty and returns at once; the
//        next read of /api/strava recomputes. Nothing slow happens here, so
//        Strava's 2-second callback limit is never a problem.
//   GET  ?op=status|subscribe|unsubscribe&token=<STRAVA_VERIFY_TOKEN>
//        One-time management from a browser tab, using the Strava app
//        credentials already in the environment. Only enabled when
//        STRAVA_VERIFY_TOKEN is set to something other than the default.
//
// Setup once: set STRAVA_VERIFY_TOKEN in Netlify env, deploy, then open
//   https://cycleforchange.org/.netlify/functions/strava-webhook?op=subscribe&token=<that>

const DEFAULT_VERIFY = "cfc-strava-verify";
const VERIFY = process.env.STRAVA_VERIFY_TOKEN || DEFAULT_VERIFY;
const API = "https://www.strava.com/api/v3/push_subscriptions";

exports.handler = async (event) => {
  require("./lib/blobs").connect(event);

  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  const json = (statusCode, body) => ({ statusCode, headers, body: JSON.stringify(body) });

  if (event.httpMethod === "GET") {
    const q = event.queryStringParameters || {};

    if (q["hub.mode"] === "subscribe") {
      if (q["hub.verify_token"] === VERIFY) {
        return json(200, { "hub.challenge": q["hub.challenge"] });
      }
      return json(403, { error: "bad verify token" });
    }

    if (q.op) return manage(q, event, json);

    return json(403, { error: "forbidden" });
  }

  if (event.httpMethod === "POST") {
    let why = "";
    try {
      const body = JSON.parse(event.body || "{}");
      if (body.object_type === "activity") {
        why = `${body.aspect_type || "?"} ${body.object_id || ""}`.trim();
      }
    } catch (_) {
      /* ignore parse errors; still acknowledge */
    }
    if (why) {
      try {
        await require("./strava").markDirty(why);
      } catch (_) {
        /* the 20-minute refresh in strava.js still catches it */
      }
    }
    return json(200, { ok: true });
  }

  return json(405, { error: "method not allowed" });
};

async function manage(q, event, json) {
  if (VERIFY === DEFAULT_VERIFY) {
    return json(403, { error: "set STRAVA_VERIFY_TOKEN in the environment first" });
  }
  if (q.token !== VERIFY) return json(403, { error: "bad token" });

  const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } = process.env;
  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET) {
    return json(200, { ok: false, error: "STRAVA_CLIENT_ID / STRAVA_CLIENT_SECRET missing" });
  }

  const creds = `client_id=${encodeURIComponent(STRAVA_CLIENT_ID)}&client_secret=${encodeURIComponent(STRAVA_CLIENT_SECRET)}`;
  const host = (event.headers && (event.headers["x-forwarded-host"] || event.headers.host)) || "cycleforchange.org";
  const callback = `https://${host}/.netlify/functions/strava-webhook`;

  try {
    if (q.op === "status") {
      const res = await fetch(`${API}?${creds}`);
      return json(200, { ok: res.ok, callback, subscriptions: await res.json() });
    }

    if (q.op === "subscribe") {
      const existing = await (await fetch(`${API}?${creds}`)).json();
      if (Array.isArray(existing) && existing.length) {
        return json(200, { ok: true, already: true, subscriptions: existing });
      }
      const body = new URLSearchParams({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        callback_url: callback,
        verify_token: VERIFY,
      });
      const res = await fetch(API, { method: "POST", body });
      return json(200, { ok: res.ok, callback, result: await res.json() });
    }

    if (q.op === "unsubscribe") {
      const existing = await (await fetch(`${API}?${creds}`)).json();
      const results = [];
      for (const sub of Array.isArray(existing) ? existing : []) {
        const res = await fetch(`${API}/${sub.id}?${creds}`, { method: "DELETE" });
        results.push({ id: sub.id, status: res.status });
      }
      return json(200, { ok: true, removed: results });
    }

    return json(400, { error: "op must be status, subscribe or unsubscribe" });
  } catch (err) {
    return json(200, { ok: false, error: (err && err.message) || "strava error" });
  }
}
