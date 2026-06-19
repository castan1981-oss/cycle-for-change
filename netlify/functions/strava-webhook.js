// Strava webhook subscription + activity events → bust Strava cache.
// Subscribe once via Strava API; set STRAVA_VERIFY_TOKEN in env.

const VERIFY = process.env.STRAVA_VERIFY_TOKEN || "cfc-strava-verify";

exports.handler = async (event) => {
  const headers = { "Content-Type": "application/json" };

  if (event.httpMethod === "GET") {
    const params = event.queryStringParameters || {};
    if (params["hub.mode"] === "subscribe" && params["hub.verify_token"] === VERIFY) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ "hub.challenge": params["hub.challenge"] }),
      };
    }
    return { statusCode: 403, headers, body: "Forbidden" };
  }

  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body || "{}");
      if (body.object_type === "activity" && (body.aspect_type === "create" || body.aspect_type === "update")) {
        try {
          const strava = require("./strava");
          if (strava && strava.bustCache) strava.bustCache();
        } catch (_) {
          /* cache clears on next cold start */
        }
      }
    } catch (_) {
      /* ignore parse errors */
    }
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  return { statusCode: 405, headers, body: "Method not allowed" };
};
