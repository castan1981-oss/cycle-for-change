"use strict";
// IndexNow (Oct 21, 2026, the 500K growth plan).
//
// Tells Bing which pages changed, so it doesn't wait for its own crawl. Bing feeds ChatGPT search and
// Copilot, and the AI-assistant channel sends the site's most engaged visitors; Yandex, Seznam and Naver
// take the same ping. Google doesn't use IndexNow (it reads the sitemaps).
//
// The key is public by design: the key file cfc-site/<KEY>.txt proves we own the host. Only public URLs
// from our own sitemaps are ever sent — never a form, a person or a feed of anyone's data.
//
// Used by netlify/functions/deploy-succeeded.js (every production deploy) and tools/indexnow.js (by hand).

const KEY = "02fdf11f9a0f2fd20baefc2d59a0addc";
const HOST = "cycleforchange.org";
const ORIGIN = "https://" + HOST;
const KEY_LOCATION = ORIGIN + "/" + KEY + ".txt";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_PER_CALL = 10000; // the protocol's limit per POST

// The pages that change on every deploy whatever their sitemap date says (counts, next rides, the tally).
const ALWAYS = ["/", "/rides/", "/events/2027/", "/tonight/"].map((p) => ORIGIN + p);

// Every <loc> (with its <lastmod>, if any) in a sitemap or a sitemap index.
function entries(xml) {
  const out = [];
  const re = /<(url|sitemap)>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(String(xml || "")))) {
    const loc = (m[2].match(/<loc>\s*([^<\s]+)\s*<\/loc>/) || [])[1];
    if (!loc) continue;
    const lastmod = (m[2].match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/) || [])[1] || "";
    out.push({ loc: loc.replace(/&amp;/g, "&"), lastmod: lastmod.slice(0, 10), kind: m[1] });
  }
  return out;
}

// Read the sitemap index and every child sitemap it names. getText(url) → Promise<string>.
async function collect(getText, indexUrl = ORIGIN + "/sitemap.xml") {
  const top = entries(await getText(indexUrl));
  const children = top.filter((e) => e.kind === "sitemap").map((e) => e.loc);
  const urls = top.filter((e) => e.kind === "url");
  for (const child of children) {
    try {
      urls.push(...entries(await getText(child)).filter((e) => e.kind === "url"));
    } catch (err) {
      // One unreadable child sitemap shouldn't stop the rest.
      console.log(`indexnow: skipped ${child}: ${err.message}`);
    }
  }
  return urls;
}

// Our own URLs whose lastmod is on or after `since` (YYYY-MM-DD), plus `always`. since = null → all.
function pick(list, { since = null, always = ALWAYS } = {}) {
  const seen = new Set();
  const out = [];
  const add = (u) => {
    let url;
    try { url = new URL(u); } catch (_) { return; }
    if (url.protocol !== "https:" || url.hostname !== HOST) return;
    const s = url.toString();
    if (!seen.has(s)) { seen.add(s); out.push(s); }
  };
  for (const u of always) add(u);
  for (const e of list) if (!since || (e.lastmod && e.lastmod >= since)) add(e.loc);
  return out;
}

function body(urlList) {
  return { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
}

function batches(urls, size = MAX_PER_CALL) {
  const out = [];
  for (let i = 0; i < urls.length; i += size) out.push(urls.slice(i, i + size));
  return out;
}

// POST the list in batches. Answers [{count, status}]. 200 and 202 mean accepted.
async function submit(urls, fetchImpl = fetch) {
  const results = [];
  for (const urlList of batches(urls)) {
    const res = await fetchImpl(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body(urlList)),
    });
    results.push({ count: urlList.length, status: res.status });
  }
  return results;
}

// YYYY-MM-DD, `days` before now (UTC).
function daysAgo(days, now = Date.now()) {
  return new Date(now - days * 864e5).toISOString().slice(0, 10);
}

module.exports = { KEY, HOST, ORIGIN, KEY_LOCATION, ENDPOINT, ALWAYS, entries, collect, pick, body, batches, submit, daysAgo };
