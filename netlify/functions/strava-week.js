// GET /.netlify/functions/strava-week
// The last 7 days of public Strava rides/runs/swims, as little as the site needs:
// the day, the miles, the sport type. Nothing else leaves here.
//
// Oct 6, 2026: this used to return activity IDs, exact start times, watts, heart
// rate, kudos, descriptions and that day's weather (looked up from the start
// coordinates), and it didn't skip private rides. Now: private and followers-only
// activities are dropped, and each ride is { date: "YYYY-MM-DD", miles, type }.

const METERS_TO_MILES = 0.000621371;
const WINDOW_DAYS = 7;

const auth = require("./lib/strava-auth");

const BIKE = new Set(["Ride", "VirtualRide", "GravelRide", "MountainBikeRide"]);
const RUN = new Set(["Run", "TrailRun"]);
const SWIM = new Set(["Swim", "OpenWaterSwim"]);

exports.handler = async (event) => {
  require("./lib/blobs").connect(event);

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=900",
  };
  if (event && event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (!auth.configured()) {
    return { statusCode: 200, headers, body: JSON.stringify({ configured: false, rides: [] }) };
  }

  try {
    const accessToken = await auth.getAccessToken();

    const after = Math.floor(Date.now() / 1000) - WINDOW_DAYS * 24 * 3600;
    const activities = await fetchActivities(accessToken, after);

    const rides = activities
      .filter((a) => isPublic(a) && isTracked(a))
      .map((a) => ({
        date: (a.start_date_local || a.start_date || "").slice(0, 10),
        miles: Math.round((a.distance || 0) * METERS_TO_MILES * 10) / 10,
        type: a.sport_type || a.type,
      }))
      .sort((x, y) => (x.date < y.date ? 1 : x.date > y.date ? -1 : 0));

    const totals = {
      count: rides.length,
      miles: Math.round(rides.reduce((s, r) => s + r.miles, 0) * 10) / 10,
    };

    const now = new Date();
    const start = new Date(now.getTime() - WINDOW_DAYS * 24 * 3600 * 1000);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        configured: true,
        windowDays: WINDOW_DAYS,
        weekStart: start.toISOString().slice(0, 10),
        weekEnd: now.toISOString().slice(0, 10),
        totals,
        rides,
      }),
    };
  } catch (_) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ configured: true, error: true, rides: [] }),
    };
  }
};

async function fetchActivities(accessToken, after) {
  const url = `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=100&page=1`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!res.ok) throw new Error(`strava activities ${res.status}`);
  const acts = await res.json();
  return Array.isArray(acts) ? acts : [];
}

function isPublic(a) {
  if (!a || a.private === true) return false;
  return !a.visibility || a.visibility === "everyone";
}

function isTracked(a) {
  const t = a.sport_type || a.type;
  return BIKE.has(t) || RUN.has(t) || SWIM.has(t);
}
