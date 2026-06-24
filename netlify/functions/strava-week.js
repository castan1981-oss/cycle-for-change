// GET /.netlify/functions/strava-week
// Returns the last 7 days of Strava rides/runs/swims, each enriched with that
// day's weather. Weather is looked up SERVER-SIDE from the free Open-Meteo API
// using coarse (2-decimal) coordinates; raw GPS is never returned in the body.

const METERS_TO_MILES = 0.000621371;
const METERS_TO_FEET = 3.28084;
const MS_TO_MPH = 2.23694;
const WINDOW_DAYS = 7;

const BIKE = new Set(["Ride", "VirtualRide", "GravelRide", "MountainBikeRide"]);
const RUN = new Set(["Run", "TrailRun"]);
const SWIM = new Set(["Swim", "OpenWaterSwim"]);

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=900",
  };
  if (event && event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;
  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    return { statusCode: 200, headers, body: JSON.stringify({ configured: false, rides: [] }) };
  }

  try {
    const token = await refreshAccessToken(STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN);
    if (!token.access_token) throw new Error("no access token");

    const after = Math.floor(Date.now() / 1000) - WINDOW_DAYS * 24 * 3600;
    const activities = await fetchActivities(token.access_token, after);

    const rides = [];
    for (const a of activities) {
      const discipline = mapDiscipline(a);
      if (!discipline) continue;

      const miles = Math.round((a.distance || 0) * METERS_TO_MILES * 10) / 10;
      const movingSeconds = a.moving_time || 0;
      const speedMph = a.average_speed ? Math.round(a.average_speed * MS_TO_MPH * 10) / 10 : null;
      const elevationFt = a.total_elevation_gain
        ? Math.round(a.total_elevation_gain * METERS_TO_FEET)
        : 0;
      const localDate = (a.start_date_local || a.start_date || "").slice(0, 10);

      let weather = null;
      const ll = a.start_latlng;
      if (Array.isArray(ll) && ll.length === 2 && localDate) {
        weather = await fetchWeather(ll[0], ll[1], localDate);
      }

      rides.push({
        id: a.id,
        discipline,
        type: a.sport_type || a.type,
        title: a.name || "Untitled",
        date: localDate,
        startLocal: a.start_date_local || a.start_date,
        miles,
        movingSeconds,
        movingTime: formatDuration(movingSeconds),
        avgSpeedMph: speedMph,
        elevationFt,
        avgHeartrate: a.average_heartrate || null,
        avgWatts: a.average_watts || null,
        kudos: a.kudos_count || 0,
        note: a.description || "",
        weather, // { tempHighF, tempLowF, windMph, precipIn, conditions } or null
      });
    }

    rides.sort((x, y) => new Date(y.startLocal) - new Date(x.startLocal));

    const totals = rides.reduce(
      (t, r) => {
        t.count += 1;
        t.miles += r.miles;
        t.movingSeconds += r.movingSeconds;
        t.elevationFt += r.elevationFt;
        return t;
      },
      { count: 0, miles: 0, movingSeconds: 0, elevationFt: 0 }
    );
    totals.miles = Math.round(totals.miles * 10) / 10;
    totals.movingTime = formatDuration(totals.movingSeconds);

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
        generatedAt: now.toISOString(),
        totals,
        rides,
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ configured: true, error: true, message: String(err && err.message || err), rides: [] }),
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

async function fetchActivities(accessToken, after) {
  const url = `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=100&page=1`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!res.ok) throw new Error(`strava activities ${res.status}`);
  const acts = await res.json();
  return Array.isArray(acts) ? acts : [];
}

// Open-Meteo historical/recent daily weather. Coordinates are rounded to 2
// decimals (~1km) before the request so precise start points never leave here.
async function fetchWeather(lat, lng, date) {
  try {
    const rlat = Math.round(lat * 100) / 100;
    const rlng = Math.round(lng * 100) / 100;
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${rlat}&longitude=${rlng}` +
      `&start_date=${date}&end_date=${date}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code` +
      `&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const d = await res.json();
    const day = d.daily;
    if (!day || !day.time || !day.time.length) return null;
    return {
      tempHighF: round1(day.temperature_2m_max[0]),
      tempLowF: round1(day.temperature_2m_min[0]),
      windMph: round1(day.wind_speed_10m_max[0]),
      precipIn: round1(day.precipitation_sum[0]),
      conditions: weatherCodeText(day.weather_code[0]),
    };
  } catch (_) {
    return null;
  }
}

function round1(n) {
  return typeof n === "number" ? Math.round(n * 10) / 10 : null;
}

function formatDuration(seconds) {
  if (!seconds) return "0m";
  let h = Math.floor(seconds / 3600);
  let m = Math.round((seconds % 3600) / 60);
  if (m === 60) { h += 1; m = 0; } // carry the rounded minute into the hour
  return h ? `${h}h ${m}m` : `${m}m`;
}

function mapDiscipline(a) {
  const t = a.sport_type || a.type;
  if (BIKE.has(t)) return "bike";
  if (RUN.has(t)) return "run";
  if (SWIM.has(t)) return "swim";
  return null;
}

// WMO weather interpretation codes → short text.
function weatherCodeText(code) {
  const map = {
    0: "Clear", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Rime fog",
    51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
    56: "Freezing drizzle", 57: "Freezing drizzle",
    61: "Light rain", 63: "Rain", 65: "Heavy rain",
    66: "Freezing rain", 67: "Freezing rain",
    71: "Light snow", 73: "Snow", 75: "Heavy snow", 77: "Snow grains",
    80: "Light showers", 81: "Showers", 82: "Heavy showers",
    85: "Snow showers", 86: "Snow showers",
    95: "Thunderstorm", 96: "Thunderstorm w/ hail", 99: "Thunderstorm w/ hail",
  };
  return map[code] || "Unknown";
}
