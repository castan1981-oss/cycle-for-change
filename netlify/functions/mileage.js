// Backward-compatible alias → /.netlify/functions/strava
const strava = require("./strava");

exports.handler = async (event) => {
  const res = await strava.handler(event);
  if (res.body) {
    try {
      const data = JSON.parse(res.body);
      return {
        ...res,
        body: JSON.stringify({
          miles: data.totalMiles ?? data.miles ?? 0,
          goal: data.goal ?? 7500,
          pct: data.pct ?? 0,
          updated: data.updated,
          configured: data.configured,
          cached: data.cached,
          error: data.error,
        }),
      };
    } catch (_) {
      return res;
    }
  }
  return res;
};
