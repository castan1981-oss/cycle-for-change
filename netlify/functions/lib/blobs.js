// Netlify Blobs, connected.
//
// Every function in this folder uses the Lambda-compatible signature
// (exports.handler = async (event) => …). In that mode the Blobs client is NOT
// configured for you: the context arrives inside each invocation's event and
// has to be connected by hand ("Lambda compatibility mode" in the
// @netlify/blobs README). Without it getStore() throws, the callers' try/catch
// swallows the error, and state quietly lives in one instance's memory — votes
// and the shared Strava tally reset on every cold start.
//
// connect(event) is the same thing @netlify/blobs' connectLambda(event) does,
// plus the uncached endpoint when the runtime provides one, so strong reads
// work. Call it first thing in every handler. It never throws and does nothing
// when the event carries no Blobs context (local runs, tests).

function readContext() {
  try {
    const raw = globalThis.netlifyBlobsContext || process.env.NETLIFY_BLOBS_CONTEXT;
    return raw ? JSON.parse(Buffer.from(raw, "base64").toString("utf8")) : null;
  } catch (_) {
    return null;
  }
}

function connect(event) {
  try {
    if (globalThis.netlifyBlobsContext) return true; // the runtime already did it
    if (!event || !event.blobs) return !!readContext();

    const data = JSON.parse(Buffer.from(event.blobs, "base64").toString("utf8"));
    const h = event.headers || {};
    const context = {
      deployID: h["x-nf-deploy-id"],
      siteID: h["x-nf-site-id"],
      edgeURL: data.url,
      token: data.token,
    };
    if (data.url_uncached) context.uncachedEdgeURL = data.url_uncached;
    if (data.primary_region) context.primaryRegion = data.primary_region;

    // the token is per-invocation, so this is rewritten on every call
    process.env.NETLIFY_BLOBS_CONTEXT = Buffer.from(JSON.stringify(context)).toString("base64");
    return true;
  } catch (_) {
    return false;
  }
}

// A store that reads strongly when it can and eventually when it can't, rather
// than throwing a consistency error into a silent catch.
function store(name) {
  const { getStore } = require("@netlify/blobs");
  const context = readContext();
  const strong = !!(context && context.uncachedEdgeURL);
  return getStore(strong ? { name, consistency: "strong" } : { name });
}

module.exports = { connect, store };
