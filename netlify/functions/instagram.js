// GET /.netlify/functions/instagram
// Returns recent Instagram posts via Graph API or Behold JSON feed.

const CACHE_MS = 60 * 60 * 1000;
let cache = { ts: 0, data: null };

function mapGraphPosts(items) {
  return (items || [])
    .filter((p) => p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM")
    .slice(0, 6)
    .map((p) => ({
      id: p.id,
      url: p.media_url || p.thumbnail_url,
      permalink: p.permalink,
      caption: (p.caption || "").slice(0, 120),
      timestamp: p.timestamp,
    }));
}

function mapBeholdPosts(items) {
  return (items || [])
    .filter((p) => p.mediaType === "IMAGE" || p.mediaType === "CAROUSEL_ALBUM")
    .slice(0, 6)
    .map((p) => ({
      id: p.id,
      url: p.sizes?.medium?.mediaUrl || p.mediaUrl || p.thumbnailUrl,
      permalink: p.permalink,
      caption: (p.prunedCaption || p.caption || "").slice(0, 120),
      timestamp: p.timestamp,
    }));
}

async function fetchBeholdPosts(feedId) {
  const res = await fetch(`https://feeds.behold.so/${feedId}`);
  if (!res.ok) throw new Error("behold fetch failed");
  const json = await res.json();
  return mapBeholdPosts(json.posts);
}

async function fetchGraphPosts(token) {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${token}&limit=6`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("instagram api error");
  const json = await res.json();
  return mapGraphPosts(json.data);
}

exports.handler = async () => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=3600",
  };

  const handle = process.env.INSTAGRAM_HANDLE || "cycle_forchange";
  const profileUrl = `https://instagram.com/${handle}`;
  const beholdFeedId = process.env.BEHOLD_FEED_ID || null;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (Date.now() - cache.ts < CACHE_MS && cache.data) {
    return { statusCode: 200, headers, body: JSON.stringify({ ...cache.data, cached: true }) };
  }

  const emptyPayload = (source) => ({
    source,
    profileUrl,
    handle: `@${handle}`,
    beholdFeedId,
    posts: [],
  });

  if (token) {
    try {
      const posts = await fetchGraphPosts(token);
      const data = { source: "api", profileUrl, handle: `@${handle}`, posts, beholdFeedId: null };
      cache = { ts: Date.now(), data };
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    } catch (_) {
      /* fall through to Behold or empty */
    }
  }

  if (beholdFeedId) {
    try {
      const posts = await fetchBeholdPosts(beholdFeedId);
      const data = { source: "behold", profileUrl, handle: `@${handle}`, posts, beholdFeedId };
      cache = { ts: Date.now(), data };
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    } catch (_) {
      /* fall through to empty */
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(emptyPayload(token ? "api" : beholdFeedId ? "behold" : "static")),
  };
};
