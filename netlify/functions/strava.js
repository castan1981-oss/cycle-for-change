// GET /.netlify/functions/strava
// Returns live mileage tally, chart points, and recent activity feed from Strava.

const GOAL = 7500;
const METERS_TO_MILES = 0.000621371;
const SEASON_START = "2027-07-01";
const CACHE_MS = 30 * 60 * 1000;
const MAX_PAGES = 20;

const BIKE = new Set(["Ride", "VirtualRide", "GravelRide", "MountainBikeRide"]);
const RUN = new Set(["Run", "TrailRun"]);
const SWIM = new Set(["Swim", "OpenWaterSwim"]);

let cache = { ts: 0, data: null };

exports.bustCache = () => {
  cache = { ts: 0, data: null };
};

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=900",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (Date.now() - cache.ts < CACHE_MS && cache.data) {
    return { statusCode: 200, headers, body: JSON.stringify({ ...cache.data, cached: true }) };
  }

  const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;
  const BONUS = parseFloat(process.env.MANUAL_BONUS_MILES || "0");

  const fallback = cache.data || staticFallback(BONUS);

  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ...fallback, configured: false }),
    };
  }

  try {
    const token = await refreshAccessToken(
      STRAVA_CLIENT_ID,
      STRAVA_CLIENT_SECRET,
      STRAVA_REFRESH_TOKEN
    );
    if (!token.access_token) throw new Error("no access token");

    const after = Math.floor(new Date(`${SEASON_START}T00:00:00Z`).getTime() / 1000);
    const activities = await fetchAllActivities(token.access_token, after);
    const mapped = activities
      .map((a) => {
        const discipline = mapDiscipline(a);
        if (!discipline) return null;
        const miles = (a.distance || 0) * METERS_TO_MILES;
        return {
          id: a.id,
          discipline,
          title: a.name || "Untitled",
          miles: Math.round(miles * 10) / 10,
          note: a.description || "",
          date: a.start_date || a.start_date_local,
          start: new Date(a.start_date || a.start_date_local).getTime(),
        };
      })
      .filter(Boolean);

    mapped.sort((a, b) => b.start - a.start);

    const totalMiles = mapped.reduce((s, a) => s + a.miles, 0) + BONUS;
    const pct = Math.min(100, Math.round((totalMiles / GOAL) * 1000) / 10);
    const chartPoints = buildChartPoints(mapped, BONUS);
    const recent = mapped.slice(0, 6).map(({ discipline, title, miles, note, date }) => ({
      discipline,
      title,
      miles,
      note,
      date,
    }));

    let profileUrl = null;
    try {
      const athleteRes = await fetch("https://www.strava.com/api/v3/athlete", {
        headers: { Authorization: `Bearer ${token.access_token}` },
      });
      if (athleteRes.ok) {
        const athlete = await athleteRes.json();
        if (athlete.id) profileUrl = `https://www.strava.com/athletes/${athlete.id}`;
      }
    } catch (_) {
      /* optional */
    }

    const data = {
      totalMiles: Math.round(totalMiles),
      miles: Math.round(totalMiles * 10) / 10,
      goal: GOAL,
      pct,
      chartPoints,
      recent,
      profileUrl,
      configured: true,
      updated: new Date().toISOString(),
    };

    cache = { ts: Date.now(), data };
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (err) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ...fallback, configured: true, error: true }),
    };
  }
};

async function refreshAccessToken(clientId, clientSecret, refreshToken) {
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
  return res.json();
}

async function fetchAllActivities(accessToken, after) {
  const all = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=200&page=${page}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (!res.ok) break;
    const acts = await res.json();
    if (!Array.isArray(acts) || acts.length === 0) break;
    all.push(...acts);
    if (acts.length < 200) break;
  }
  return all;
}

function mapDiscipline(a) {
  const t = a.sport_type || a.type;
  if (BIKE.has(t)) return "bike";
  if (RUN.has(t)) return "run";
  if (SWIM.has(t)) return "swim";
  return null;
}

function buildChartPoints(activities, bonus) {
  const sorted = [...activities].sort((a, b) => a.start - b.start);
  if (!sorted.length) {
    return bonus > 0 ? [{ x: 0, y: bonus }, { x: 100, y: bonus }] : [{ x: 0, y: 0 }, { x: 100, y: 0 }];
  }

  const slots = 12;
  const step = Math.max(1, Math.ceil(sorted.length / slots));
  const points = [];
  let cumulative = bonus;

  for (let i = 0; i < sorted.length; i++) {
    cumulative += sorted[i].miles;
    if (i % step === 0 || i === sorted.length - 1) {
      points.push({
        x: Math.round((i / Math.max(sorted.length - 1, 1)) * 100),
        y: Math.round(cumulative * 10) / 10,
      });
    }
  }

  if (points[0].x !== 0) points.unshift({ x: 0, y: bonus });
  if (points[points.length - 1].x !== 100) {
    points.push({ x: 100, y: Math.round(cumulative * 10) / 10 });
  }
  return points;
}

function staticFallback(bonus) {
  return {
    totalMiles: Math.round(bonus),
    miles: bonus,
    goal: GOAL,
    pct: Math.min(100, Math.round((bonus / GOAL) * 1000) / 10),
    chartPoints: [
      { x: 0, y: bonus },
      { x: 100, y: bonus },
    ],
    recent: [],
    profileUrl: null,
    configured: false,
    updated: new Date().toISOString(),
  };
}
