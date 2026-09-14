// GET /.netlify/functions/strava-connect
//
// Re-authorise the site's Strava connection without touching env vars.
//
//   1. Open the URL while logged in to Strava as the account that rides.
//      It bounces to Strava's consent screen asking for
//      read + activity:read_all (the scope the current token is missing).
//   2. Click Authorize. Strava sends the browser back here with a code.
//   3. This function exchanges the code using the client secret already in
//      Netlify, checks the athlete is the one already connected (or, if no
//      token works any more, that ?token=<STRAVA_VERIFY_TOKEN> was given at
//      step 1), stores the tokens in the "cfc-strava" blob, marks the tally
//      dirty and shows the fresh count.
//
// Nobody else can hijack the feed: authorising a different Strava account is
// refused, and the OAuth state is a one-shot nonce kept server-side.
//
// Strava app setting required once: Authorization Callback Domain =
// cycleforchange.org (https://www.strava.com/settings/api).

const auth = require("./lib/strava-auth");

const STORE = "cfc-strava";
const STATE_KEY = "connect-state";
const STATE_TTL_MS = 10 * 60 * 1000;
const DEFAULT_VERIFY = "cfc-strava-verify";
const SCOPE = "read,activity:read_all";

exports.handler = async (event) => {
  const q = event.queryStringParameters || {};
  const host = (event.headers && (event.headers["x-forwarded-host"] || event.headers.host)) || "cycleforchange.org";
  const self = `https://${host}/.netlify/functions/strava-connect`;

  if (event.httpMethod !== "GET") return page(405, "Method not allowed.");
  if (!auth.configured()) return page(500, "STRAVA_CLIENT_ID / STRAVA_CLIENT_SECRET are not set in Netlify.");

  // —— step 3: back from Strava ——
  if (q.code || q.error) {
    if (q.error) return page(400, `Strava said: ${escapeHtml(q.error)}. Nothing changed.`);

    const state = await readState();
    if (!state || !q.state || q.state !== state.nonce || Date.now() - state.ts > STATE_TTL_MS) {
      return page(400, "That link has expired. Start again from /.netlify/functions/strava-connect.");
    }
    await clearState();

    const granted = String(q.scope || "");
    if (!/activity:read_all/.test(granted)) {
      return page(400, `Strava granted "${escapeHtml(granted)}" but the feed needs activity:read_all. Start again and leave "View data about your activities" ticked.`);
    }

    const token = await auth.exchangeCode(q.code);
    if (!token.access_token || !token.refresh_token) {
      return page(502, `Token exchange failed${token.message ? `: ${escapeHtml(token.message)}` : ""}.`);
    }
    const athlete = token.athlete || {};

    // the account must be the one already wired up, unless the caller proved
    // themselves with the verify token at step 1 because nothing works any more
    if (!state.gated) {
      const currentId = await currentAthleteId();
      if (currentId == null) {
        return page(403, "Couldn't confirm the current Strava account, so this connection was refused. Start again with ?token=<STRAVA_VERIFY_TOKEN>.");
      }
      if (String(currentId) !== String(athlete.id)) {
        return page(403, "That is a different Strava account from the one connected to this site. Nothing changed.");
      }
    }

    await auth.saveAuth({
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expires_at: token.expires_at,
      athlete_id: athlete.id,
      athlete: athlete.firstname ? `${athlete.firstname} ${athlete.lastname || ""}`.trim() : "",
      scope: granted,
      updated: new Date().toISOString(),
    });

    let summary = "";
    try {
      const strava = require("./strava");
      await strava.markDirty("reconnect");
      const res = await strava.handler({ httpMethod: "GET", headers: {} });
      const d = JSON.parse(res.body);
      summary = d.error
        ? `The feed still reports an error: ${escapeHtml(d.reason || "unknown")}.`
        : `${Number(d.miles || 0).toLocaleString("en-US")} miles across ${d.rides || 0} rides since June 1.`;
    } catch (_) {
      summary = "The tally will refresh on its next read.";
    }

    return page(200, `Connected as ${escapeHtml(athlete.firstname || "the athlete")}. ${summary}`);
  }

  // —— step 1: off to Strava ——
  const verify = process.env.STRAVA_VERIFY_TOKEN || DEFAULT_VERIFY;
  const gated = Boolean(q.token) && verify !== DEFAULT_VERIFY && q.token === verify;
  if (q.token && !gated) return page(403, "Bad token.");

  const nonce = randomId();
  await writeState({ nonce, ts: Date.now(), gated });

  const url =
    "https://www.strava.com/oauth/authorize" +
    `?client_id=${encodeURIComponent(auth.env().clientId)}` +
    "&response_type=code" +
    `&redirect_uri=${encodeURIComponent(self)}` +
    "&approval_prompt=force" +
    `&scope=${encodeURIComponent(SCOPE)}` +
    `&state=${encodeURIComponent(nonce)}`;

  return { statusCode: 302, headers: { Location: url, "Cache-Control": "no-store" }, body: "" };
};

async function currentAthleteId() {
  try {
    const access = await auth.getAccessToken();
    const res = await fetch("https://www.strava.com/api/v3/athlete", {
      headers: { Authorization: `Bearer ${access}` },
    });
    if (!res.ok) return null;
    const a = await res.json();
    return a && a.id != null ? a.id : null;
  } catch (_) {
    return null;
  }
}

async function readState() {
  try {
    const { getStore } = require("@netlify/blobs");
    return await getStore(STORE).get(STATE_KEY, { type: "json" });
  } catch (_) {
    return null;
  }
}
async function writeState(s) {
  try {
    const { getStore } = require("@netlify/blobs");
    await getStore(STORE).setJSON(STATE_KEY, s);
  } catch (_) {
    /* without blobs the callback can't verify state; it will refuse */
  }
}
async function clearState() {
  try {
    const { getStore } = require("@netlify/blobs");
    await getStore(STORE).delete(STATE_KEY);
  } catch (_) {
    /* fine */
  }
}

function randomId() {
  try {
    return require("crypto").randomBytes(16).toString("hex");
  } catch (_) {
    return String(Date.now()) + Math.random().toString(16).slice(2);
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function page(status, text) {
  const body = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Strava — Cycle for Change</title><style>body{margin:0;min-height:100svh;display:grid;place-items:center;background:#E8DFD0;color:#2A2E28;font:18px/1.4 "Space Grotesk",system-ui,sans-serif;padding:24px}p{max-width:40ch;margin:0}a{color:inherit}</style></head><body><p>${text} <a href="/">Back to the site.</a></p></body></html>`;
  return { statusCode: status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }, body };
}
