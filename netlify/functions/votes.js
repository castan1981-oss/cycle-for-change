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

const SEED = { onenten: 318, lalgbtcenter: 305, sfaf: 289 };

let store = null;

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const data = await loadStore();

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
  const total = Object.values(data.votes).reduce((s, n) => s + n, 0) || 1;
  return {
    orgs: ORGS.map((o) => ({
      ...o,
      votes: data.votes[o.id] || 0,
      pct: Math.round(((data.votes[o.id] || 0) / total) * 1000) / 10,
    })),
    totalVotes: total,
    votedFor: justVoted || null,
  };
}

async function loadStore() {
  if (store) return store;

  try {
    const { getStore } = require("@netlify/blobs");
    const blobStore = getStore("cfc-votes");
    const raw = await blobStore.get("tallies", { type: "json" });
    if (raw && raw.votes) {
      store = raw;
      return store;
    }
  } catch (_) {
    /* fall through to seed */
  }

  store = { votes: { ...SEED }, voters: {} };
  return store;
}

async function saveStore(data) {
  store = data;
  try {
    const { getStore } = require("@netlify/blobs");
    const blobStore = getStore("cfc-votes");
    await blobStore.setJSON("tallies", data);
  } catch (_) {
    /* in-memory only when blobs unavailable */
  }
}
