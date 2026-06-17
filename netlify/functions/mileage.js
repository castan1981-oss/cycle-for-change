// netlify/functions/mileage.js
// TEST MODE: counts activities from the last 7 days so the counter shows real
// miles now. Switch START_MODE back to "year" before the 2027 launch.

const PLEDGE_GOAL = 7500;
const METERS_PER_MILE = 1609.34;

// "week" = last 7 days (test).  "year" = Jan 1 of PLEDGE_YEAR onward (launch).
const START_MODE = "week";

let cache = { ts: 0, miles: 0 };
const CACHE_MS = 15 * 60 * 1000;

exports.handler = async () => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=900",
  };

  if (Date.now() - cache.ts < CACHE_MS && cache.ts !== 0) {
    return { statusCode: 200, headers, body: JSON.stringify({ ...payload(cache.miles), cached: true }) };
  }

  const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;
  const YEAR = parseInt(process.env.PLEDGE_YEAR || "2027", 10);
  const BONUS = parseFloat(process.env.MANUAL_BONUS_MILES || "0");

  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    return { statusCode: 200, headers, body: JSON.stringify({ ...payload(BONUS), configured: false }) };
  }

  try {
    const tokenRes = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: STRAVA_REFRESH_TOKEN,
      }),
    });
    const token = await tokenRes.json();
    if (!token.access_token) throw new Error("no access token");

    // window start
    let after, before;
    if (START_MODE === "week") {
      after = Math.floor((Date.now() - 7 * 24 * 3600 * 1000) / 1000);
      before = Math.floor(Date.now() / 1000);
    } else {
      after = Math.floor(new Date(`${YEAR}-01-01T00:00:00Z`).getTime() / 1000);
      before = Math.floor(new Date(`${YEAR + 1}-01-01T00:00:00Z`).getTime() / 1000);
    }

    let meters = 0, page = 1, keepGoing = true;
    while (keepGoing && page <= 12) {
      const url = `https://www.strava.com/api/v3/athlete/activities?after=${after}&before=${before}&per_page=200&page=${page}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token.access_token}` } });
      if (!res.ok) break;
      const acts = await res.json();
      if (!Array.isArray(acts) || acts.length === 0) { keepGoing = false; break; }
      for (const a of acts) meters += a.distance || 0;
      if (acts.length < 200) keepGoing = false;
      page++;
    }

    const miles = meters / METERS_PER_MILE + BONUS;
    cache = { ts: Date.now(), miles };
    return { statusCode: 200, headers, body: JSON.stringify({ ...payload(miles), configured: true, mode: START_MODE }) };
  } catch (err) {
    const miles = cache.miles || BONUS;
    return { statusCode: 200, headers, body: JSON.stringify({ ...payload(miles), error: true }) };
  }
};

function payload(miles) {
  const m = Math.max(0, miles);
  return {
    miles: Math.round(m * 10) / 10,
    goal: PLEDGE_GOAL,
    pct: Math.min(100, Math.round((m / PLEDGE_GOAL) * 1000) / 10),
    updated: new Date().toISOString(),
  };
}
