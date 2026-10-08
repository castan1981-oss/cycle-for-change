// netlify/functions/review.js — the Post it / Drop it buttons in a review email (Oct 8, 2026).
// GET shows the review with one confirm button (mail apps open links on their own to scan them, so a
// GET never changes anything). POST "post" adds the review to data/ride-reviews.json on main through the
// GitHub API (GITHUB_TOKEN: a fine-grained token, Contents read/write on this repo only); Netlify's
// deploy then puts it on the ride page. "drop" changes nothing: the review just never goes up.
const { verify } = require("./lib/review-link.js");
const RV = require("../../tools/lib/reviews.js");
const REPO = process.env.REVIEWS_REPO || "castan1981-oss/cycle-for-change";
const FILE = "data/ride-reviews.json";
const SLUG_OK = { has: (x) => /^[a-z0-9]+(-[a-z0-9]+){2,}$/.test(x) && x.length <= 140 };
const escH = (t) => String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function page(title, inner) {
  return { statusCode: 200, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" },
    body: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escH(title)}</title>
<style>body{margin:0;background:#E1DFDB;color:#1C1A22;font:17px/1.5 Overpass,Arial,sans-serif}main{max-width:560px;margin:0 auto;padding:32px 16px}
h1{font-size:24px;margin:0 0 16px}q{display:block;font-size:20px;margin:0 0 12px}.by{color:#4A4E55;font-size:15px;margin:0 0 22px}
button,.b{display:inline-block;min-height:48px;padding:0 22px;font:800 14px/48px Arial,sans-serif;letter-spacing:.04em;text-transform:uppercase;border:2px solid #1C1A22;background:#1C1A22;color:#EFEDEA;cursor:pointer;text-decoration:none}
.g{background:#EFEDEA;color:#1C1A22}a{color:#1C1A22}</style></head><body><main>${inner}</main></body></html>` };
}
const card = (rv) => `<q>${escH(rv.words)}</q><p class="by"><b>${escH(rv.name)}</b>${rv.from ? `, ${escH(rv.from)}` : ""} · ${escH(rv.date)} · <a href="/rides/${escH(rv.slug)}/#reviews">the ride page</a></p>`;

async function gh(method, path, body) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, { method,
    headers: { authorization: `Bearer ${process.env.GITHUB_TOKEN}`, accept: "application/vnd.github+json", "user-agent": "cfc reviews", "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined });
  return { status: res.status, json: await res.json().catch(() => null) };
}

async function postReview(rv) {
  for (let tries = 0; tries < 3; tries++) {
    const cur = await gh("GET", `${FILE}?ref=main`);
    if (cur.status !== 200) return `GitHub said ${cur.status}`;
    const list = JSON.parse(Buffer.from(cur.json.content, "base64").toString("utf8"));
    if (list.some((x) => x.id === rv.id)) return "already";
    list.push({ ...rv, posted: new Date().toISOString().slice(0, 10) });
    list.sort(RV.byNewest);
    const put = await gh("PUT", FILE, { message: `reviews: post ${rv.id} (${rv.slug})`, branch: "main", sha: cur.json.sha,
      content: Buffer.from(JSON.stringify(list, null, 2) + "\n").toString("base64") });
    if (put.status === 200 || put.status === 201) return "posted";
    if (put.status !== 409) return `GitHub said ${put.status}`;
  }
  return "GitHub was busy, try again";
}

exports.handler = async (event) => {
  const q = event.httpMethod === "POST" ? Object.fromEntries(new URLSearchParams(event.isBase64Encoded ? Buffer.from(event.body || "", "base64").toString() : event.body || "")) : event.queryStringParameters || {};
  const raw = verify(q.d, q.s, process.env.REVIEWS_SECRET);
  const rv = raw && RV.valid(raw, SLUG_OK);
  if (!rv) return page("Link not valid", `<h1>That link doesn’t work</h1><p>It’s expired or was changed. The review is still in Netlify under Forms → ride-review.</p>`);
  const a = q.a === "drop" ? "drop" : "post";
  if (event.httpMethod !== "POST") {
    const form = `<form method="POST"><input type="hidden" name="a" value="${a}"><input type="hidden" name="d" value="${escH(q.d)}"><input type="hidden" name="s" value="${escH(q.s)}">`;
    return page(a === "post" ? "Post this review?" : "Drop this review?", `<h1>${a === "post" ? "Post this review?" : "Drop this review?"}</h1>${card(rv)}${form}<button${a === "drop" ? ' class="g"' : ""}>${a === "post" ? "Post it" : "Drop it"}</button></form>`);
  }
  if (a === "drop") return page("Dropped", `<h1>Dropped</h1><p>It won’t go up.</p>${card(rv)}`);
  if (!process.env.GITHUB_TOKEN) return page("Not set up", `<h1>Almost</h1><p>GITHUB_TOKEN isn’t set in Netlify yet, so this can’t post.</p>`);
  const r = await postReview(rv);
  if (r === "posted" || r === "already") return page("Posted", `<h1>${r === "posted" ? "Posted" : "Already up"}</h1><p>It’s on <a href="/rides/${escH(rv.slug)}/#reviews">the ride page</a> once the site finishes deploying, a few minutes.</p>${card(rv)}`);
  return page("Didn’t post", `<h1>That didn’t post</h1><p>${escH(r)}. Tap back and try again.</p>`);
};
