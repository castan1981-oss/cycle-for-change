// GET  /.netlify/functions/votes — org list + tallies
// POST /.netlify/functions/votes — cast one vote (body: { orgId, fingerprint })

const ORGS = [
  {
    id: "onenten",
    name: "one·n·ten",
    desc: "Phoenix nonprofit for LGBTQ+ youth ages 11–24 — safe spaces, housing, leadership.",
    url: "https://onenten.org",
  },
  {
    id: "lalgbtcenter",
    name: "Los Angeles LGBT Center",
    desc: "Health, housing and advocacy for LGBTQ+ people — the Center Ride Out beneficiary.",
    url: "https://www.lalgbtcenter.org",
  },
  {
    id: "sfaf",
    name: "San Francisco AIDS Foundation",
    desc: "No-cost HIV, harm-reduction and LGBTQ+ health services — the Cycle to Zero beneficiary.",
    url: "https://www.sfaf.org",
  },
];

// Real votes only (Sept 28, 2026). The board used to start from made-up numbers so it
// didn't look empty; those are gone. Tallies live under a new blob key. The first read
// carries over anything stored under the old key with the old seed taken back out,
// so no real vote is lost.
const SEED = { onenten: 0, lalgbtcenter: 0, sfaf: 0 };
const KEY = "tallies-real";
const LEGACY_KEY = "tallies";
const LEGACY_SEED = { onenten: 318, lalgbtcenter: 305, sfaf: 289 };

const blobs = require("./lib/blobs");

// A warm instance keeps its last read for reads only, briefly. Every write
// re-reads the blob first, so two instances can't overwrite each other's votes.
const READ_CACHE_MS = 30 * 1000;
let store = null;
let storeTs = 0;

exports.handler = async (event) => {
  blobs.connect(event);

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const data = await loadStore(event.httpMethod === "POST");

  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers: { ...headers, "Cache-Control": "public, max-age=30" },
      body: JSON.stringify(buildResponse(data)),
    };
  }

  if (event.httpMethod === "POST") {
    let body;
    try {
      body = JSON.parse(event.body || "{}");
    } catch {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "invalid json" }) };
    }

    const orgId = String(body.orgId || "").trim();
    const fingerprint = String(body.fingerprint || "").trim().slice(0, 64);
    if (!orgId || !fingerprint) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "missing orgId or fingerprint" }) };
    }
    if (!ORGS.find((o) => o.id === orgId)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "unknown org" }) };
    }
    if (data.voters[fingerprint]) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ error: "already voted", votedFor: data.voters[fingerprint] }),
      };
    }

    data.votes[orgId] = (data.votes[orgId] || 0) + 1;
    data.voters[fingerprint] = orgId;
    await saveStore(data);

    return { statusCode: 200, headers, body: JSON.stringify(buildResponse(data, orgId)) };
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: "method not allowed" }) };
};

function buildResponse(data, justVoted) {
  const real = Object.values(data.votes).reduce((s, n) => s + n, 0);
  const total = real || 1; // divisor only; totalVotes reports the real count
  return {
    orgs: ORGS.map((o) => ({
      ...o,
      votes: data.votes[o.id] || 0,
      pct: Math.round(((data.votes[o.id] || 0) / total) * 1000) / 10,
    })),
    totalVotes: real,
    votedFor: justVoted || null,
  };
}

async function loadStore(fresh) {
  if (store && !fresh && Date.now() - storeTs < READ_CACHE_MS) return store;

  try {
    const raw = await blobs.store("cfc-votes").get(KEY, { type: "json" });
    if (raw && raw.votes) {
      store = { votes: raw.votes, voters: raw.voters || {} };
      storeTs = Date.now();
      return store;
    }
    const old = await blobs.store("cfc-votes").get(LEGACY_KEY, { type: "json" });
    if (old && old.votes) {
      const votes = { ...SEED };
      for (const id of Object.keys(old.votes)) votes[id] = Math.max(0, (old.votes[id] || 0) - (LEGACY_SEED[id] || 0));
      store = { votes, voters: old.voters || {} };
      storeTs = Date.now();
      await blobs.store("cfc-votes").setJSON(KEY, store);
      return store;
    }
  } catch (_) {
    /* blobs unavailable: keep whatever this instance has */
    if (store) return store;
  }

  if (!store) store = { votes: { ...SEED }, voters: {} };
  storeTs = Date.now();
  return store;
}

async function saveStore(data) {
  store = data;
  storeTs = Date.now();
  try {
    await blobs.store("cfc-votes").setJSON(KEY, data);
  } catch (_) {
    /* in-memory only when blobs unavailable */
  }
}
