// GET /.netlify/functions/strava  (also /api/strava)
// Live mileage tally, chart points and recent activity feed from Strava.
//
// How it stays current without hammering Strava:
//   - The computed tally lives in a Netlify Blob ("cfc-strava" / "tally"), so
//     every function instance sees the same number.
//   - The Strava webhook (strava-webhook.js) marks that blob dirty the moment
//     a ride is created, updated or deleted. Nothing is fetched there.
//   - The next read of this function recomputes when the blob is dirty or
//     older than FRESH_MS, then writes it back. The page polls every minute,
//     so an uploaded ride lands on the site within about a minute.
//   - Errors are surfaced (reason) and backed off, never reported as 0 miles.

const GOAL = 7500; // legacy field; the coming-soon page ignores goal and pct
const METERS_TO_MILES = 0.000621371;
const SEASON_START = "2026-06-01";
const FRESH_MS = 20 * 60 * 1000;      // recompute anyway if the blob is older than this
const ERROR_BACKOFF_MS = 5 * 60 * 1000; // after a Strava error, don't retry for this long
const MAX_PAGES = 20;

const STORE = "cfc-strava";
const KEY = "tally";

const auth = require("./lib/strava-auth");

const BIKE = new Set(["Ride", "VirtualRide", "GravelRide", "MountainBikeRide"]);
const RUN = new Set(["Run", "TrailRun"]);
const SWIM = new Set(["Swim", "OpenWaterSwim"]);

// in-memory copy for the life of this instance; the blob is the truth
let memo = null;

exports.bustCache = () => {
  memo = null;
};

async function readBlob() {
  try {
    const raw = await auth.store().get(KEY, { type: "json" });
    return raw && typeof raw === "object" ? raw : null;
  } catch (_) {
    return null;
  }
}

async function writeBlob(record) {
  memo = record;
  try {
    await auth.store().setJSON(KEY, record);
  } catch (_) {
    /* in-memory only when blobs are unavailable */
  }
}

exports.handler = async (event) => {
  require("./lib/blobs").connect(event);

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // browsers always revalidate; the edge holds it for 30s so a page poll
    // from many visitors is one function call, not many
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control": "public, s-maxage=30, stale-while-revalidate=30",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const now = Date.now();
  const record = (await readBlob()) || memo;
  const have = record && record.data;

  const fresh =
    have &&
    !record.dirty &&
    now - (record.ts || 0) < FRESH_MS;
  // after a failure, hold off even when there is no data yet — a dead token
  // must not turn every page poll into a Strava call
  const backingOff =
    record &&
    record.errorTs &&
    now - record.errorTs < ERROR_BACKOFF_MS;

  const BONUS = parseFloat(process.env.MANUAL_BONUS_MILES || "0");
  const fallback = have ? record.data : staticFallback(BONUS);

  // never let an error answer sit in the edge cache: the moment the feed
  // recovers, the next poll should see it
  const noEdge = { ...headers, "Netlify-CDN-Cache-Control": "no-store" };

  if (fresh || backingOff) {
    return {
      statusCode: 200,
      headers: record.error ? noEdge : headers,
      body: JSON.stringify({
        ...fallback,
        configured: true,
        cached: true,
        ...(record.error ? { error: true, reason: record.error } : {}),
      }),
    };
  }

  if (!auth.configured()) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ...fallback, configured: false }),
    };
  }

  try {
    const data = await compute(BONUS);
    await writeBlob({ ts: now, dirty: false, data });
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (err) {
    const reason = (err && err.message) || "strava error";
    // keep whatever we had, remember the failure, back off
    await writeBlob({
      ts: record && record.ts ? record.ts : 0,
      dirty: true,
      data: have ? record.data : null,
      error: reason,
      errorTs: now,
    });
    return {
      statusCode: 200,
      headers: noEdge,
      body: JSON.stringify({ ...fallback, configured: true, error: true, reason }),
    };
  }
};

// exported so the webhook can nudge without importing the whole handler
exports.markDirty = async (why) => {
  const record = (await readBlob()) || memo || {};
  await writeBlob({ ...record, dirty: true, dirtyAt: Date.now(), dirtyWhy: why || "" });
};

async function compute(bonus) {
  const accessToken = await auth.getAccessToken();

  const after = Math.floor(new Date(`${SEASON_START}T00:00:00Z`).getTime() / 1000);
  const activities = await fetchAllActivities(accessToken, after);
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

  const totalMiles = mapped.reduce((s, a) => s + a.miles, 0) + bonus;
  const pct = Math.min(100, Math.round((totalMiles / GOAL) * 1000) / 10);
  const chartPoints = buildChartPoints(mapped, bonus);
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
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (athleteRes.ok) {
      const athlete = await athleteRes.json();
      if (athlete.id) profileUrl = `https://www.strava.com/athletes/${athlete.id}`;
    }
  } catch (_) {
    /* optional */
  }

  return {
    totalMiles: Math.round(totalMiles),
    miles: Math.round(totalMiles * 10) / 10,
    goal: GOAL,
    pct,
    chartPoints,
    recent,
    rides: mapped.length,
    profileUrl,
    configured: true,
    updated: new Date().toISOString(),
  };
}

async function fetchAllActivities(accessToken, after) {
  const all = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=200&page=${page}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (!res.ok) {
      // 403 with "activity:read_permission missing" = token issued without
      // activity:read_all — re-authorise via /.netlify/functions/strava-connect.
      // Anything else in the body is Strava's own reason; keep it visible.
      let detail = "";
      try { detail = (await res.text()).replace(/\s+/g, " ").slice(0, 160); } catch (_) { /* none */ }
      throw new Error(`strava activities ${res.status}${detail ? ` ${detail}` : ""}`);
    }
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
    rides: 0,
    profileUrl: null,
    configured: false,
    updated: new Date().toISOString(),
  };
}
