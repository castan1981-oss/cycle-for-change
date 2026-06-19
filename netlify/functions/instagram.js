// GET /.netlify/functions/instagram
// Returns recent Instagram posts when INSTAGRAM_ACCESS_TOKEN is configured.

const CACHE_MS = 60 * 60 * 1000;
let cache = { ts: 0, data: null };

exports.handler = async () => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=3600",
  };

  const handle = process.env.INSTAGRAM_HANDLE || "cycl_eforchange";
  const profileUrl = `https://instagram.com/${handle}`;
  const beholdFeedId = process.env.BEHOLD_FEED_ID || null;

  if (Date.now() - cache.ts < CACHE_MS && cache.data) {
    return { statusCode: 200, headers, body: JSON.stringify({ ...cache.data, cached: true }) };
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        source: beholdFeedId ? "behold" : "static",
        profileUrl,
        handle: `@${handle}`,
        beholdFeedId,
        posts: [],
      }),
    };
  }

  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${token}&limit=6`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("instagram api error");
    const json = await res.json();
    const posts = (json.data || [])
      .filter((p) => p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM")
      .slice(0, 6)
      .map((p) => ({
        id: p.id,
        url: p.media_url || p.thumbnail_url,
        permalink: p.permalink,
        caption: (p.caption || "").slice(0, 120),
        timestamp: p.timestamp,
      }));

    const data = { source: "api", profileUrl, handle: `@${handle}`, posts, beholdFeedId: null };
    cache = { ts: Date.now(), data };
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (_) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        source: beholdFeedId ? "behold" : "static",
        profileUrl,
        handle: `@${handle}`,
        beholdFeedId,
        posts: [],
        error: true,
      }),
    };
  }
};
