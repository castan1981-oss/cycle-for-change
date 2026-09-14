// Shared Strava credentials for the functions.
//
// The refresh token normally comes from STRAVA_REFRESH_TOKEN in the
// environment. Once /strava-connect has been used, the token it obtained
// lives in the "cfc-strava" blob under "auth" and wins over the env one, so
// re-authorising never means editing environment variables. Rotated refresh
// tokens are written back, and a still-valid access token is reused instead
// of refreshing on every call.

const STORE = "cfc-strava";
const KEY = "auth";

let memo = null;

async function readAuth() {
  try {
    const { getStore } = require("@netlify/blobs");
    const raw = await getStore(STORE).get(KEY, { type: "json" });
    if (raw && raw.refresh_token) {
      memo = raw;
      return raw;
    }
  } catch (_) {
    /* no blobs here */
  }
  return memo;
}

async function saveAuth(auth) {
  memo = auth;
  try {
    const { getStore } = require("@netlify/blobs");
    await getStore(STORE).setJSON(KEY, auth);
  } catch (_) {
    /* memory only */
  }
}

function env() {
  const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;
  return { clientId: STRAVA_CLIENT_ID, clientSecret: STRAVA_CLIENT_SECRET, envRefresh: STRAVA_REFRESH_TOKEN };
}

function configured() {
  const e = env();
  return Boolean(e.clientId && e.clientSecret);
}

// Resolve a usable access token. Throws with a readable message if it can't.
async function getAccessToken() {
  const { clientId, clientSecret, envRefresh } = env();
  if (!clientId || !clientSecret) throw new Error("strava not configured");

  const stored = await readAuth();
  const now = Math.floor(Date.now() / 1000);

  if (stored && stored.access_token && stored.expires_at && stored.expires_at > now + 60) {
    return stored.access_token;
  }

  const refreshToken = (stored && stored.refresh_token) || envRefresh;
  if (!refreshToken) throw new Error("no strava refresh token");

  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const token = await res.json();
  if (!token.access_token) {
    throw new Error("token refresh failed" + (token.message ? `: ${token.message}` : ""));
  }

  await saveAuth({
    ...(stored || {}),
    access_token: token.access_token,
    refresh_token: token.refresh_token || refreshToken,
    expires_at: token.expires_at || now + 6 * 3600,
    updated: new Date().toISOString(),
  });

  return token.access_token;
}

// Exchange an authorisation code (from /strava-connect) for tokens.
async function exchangeCode(code) {
  const { clientId, clientSecret } = env();
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
    }),
  });
  return res.json();
}

module.exports = { readAuth, saveAuth, getAccessToken, exchangeCode, configured, env };
