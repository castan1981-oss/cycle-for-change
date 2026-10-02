#!/usr/bin/env node
// seo/crawl.mjs — the case study's weekly site snapshot.
//
// Reads the live sitemap index, fetches every listed page, and records what a
// search engine sees: status, speed, title, description, canonical, robots,
// headings, words, structured data, links, images. Then it works out the
// site-wide picture: inlinks per page, orphans, duplicates, thin pages,
// broken internal links, linked pages missing from the sitemap.
//
// No dependencies (Node 18+). Usage:
//   node seo/crawl.mjs                         # crawl https://cycleforchange.org
//   node seo/crawl.mjs --base http://localhost:8888 --out seo/snapshots
//   node seo/crawl.mjs --limit 50              # quick check
//
// Writes <out>/<YYYY-MM-DD>.summary.json (committed), plus <date>.json (every
// page) and <date>-pages.csv, which seo/.gitignore keeps out of the repo.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith('--')) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]);
    return acc;
  }, [])
);
const BASE = (args.base || 'https://cycleforchange.org').replace(/\/$/, '');
const OUT = args.out || path.join(path.dirname(new URL(import.meta.url).pathname), 'snapshots');
const LIMIT = args.limit ? Number(args.limit) : Infinity;
const CONCURRENCY = Number(args.concurrency || 8);
// A sitemap file listing more than SAMPLE_OVER URLs (e.g. 45,000 generated provider pages) is
// crawled as a fixed panel of SAMPLE URLs, the same ones every week while they exist, so weeks compare.
const SAMPLE = Number(args.sample || 300);
const SAMPLE_OVER = Number(args['sample-over'] || 2000);
const UA = 'SearchLab/1.0 (site owner\'s weekly case-study crawler)';
const today = new Date().toISOString().slice(0, 10);

// ---------- helpers ----------
const host = new URL(BASE).host;
const norm = (u) => {
  try {
    const x = new URL(u, BASE);
    x.hash = '';
    if (x.host === 'www.' + host) x.host = host;
    return x.toString();
  } catch { return null; }
};
const isInternal = (u) => { try { const h = new URL(u).host; return h === host || h === 'www.' + host; } catch { return false; } };
const decode = (s) => (s || '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;|&#x27;|&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
  .replace(/&middot;/g, '·').replace(/&rsquo;|&lsquo;/g, "'").replace(/&rdquo;|&ldquo;/g, '"').replace(/&hellip;/g, '…')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/\s+/g, ' ').trim();
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? decode(m[2] ?? m[3] ?? m[4]) : null;
};
const metaContent = (html, key, val) => {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const t of tags) if ((attr(t, key) || '').toLowerCase() === val) return attr(t, 'content');
  return null;
};
const section = (u) => {
  const p = new URL(u).pathname;
  if (p === '/' || p === '/index.html') return 'home';
  const first = p.split('/').filter(Boolean)[0] || 'home';
  return first.replace(/\.html$/, '');
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, { method = 'GET', tries = 2 } = {}) {
  for (let i = 0; i < tries; i++) {
    const t0 = performance.now();
    try {
      const res = await fetch(url, { method, redirect: 'manual', headers: { 'user-agent': UA } });
      const tHead = performance.now() - t0;
      const body = method === 'GET' ? await res.text() : '';
      return { status: res.status, headers: res.headers, body, ms: Math.round(performance.now() - t0), ttfb: Math.round(tHead) };
    } catch (e) {
      if (i === tries - 1) return { status: 0, error: String(e.message || e), headers: new Headers(), body: '', ms: 0, ttfb: 0 };
      await sleep(500);
    }
  }
}

async function sitemapUrls(url, seen = new Set()) {
  if (seen.has(url)) return [];
  seen.add(url);
  const r = await get(url);
  if (r.status !== 200) return [{ sitemapError: url, status: r.status }];
  const locs = [...r.body.matchAll(/<(sitemap|url)>([\s\S]*?)<\/\1>/g)].map((m) => ({
    kind: m[1],
    loc: decode((m[2].match(/<loc>([\s\S]*?)<\/loc>/) || [])[1]),
    lastmod: (m[2].match(/<lastmod>([\s\S]*?)<\/lastmod>/) || [])[1] || null,
  }));
  const out = [];
  const urls = locs.filter((l) => l.kind === 'url');
  for (const l of locs.filter((l) => l.kind === 'sitemap')) for (const x of await sitemapUrls(l.loc, seen)) out.push(x);
  let keep = urls;
  if (urls.length > SAMPLE_OVER) {
    // Fixed panel: the SAMPLE URLs with the smallest hash, stable from week to week.
    const h = (s) => { let x = 2166136261; for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; };
    keep = urls.map((l) => [h(l.loc), l]).sort((a, b) => a[0] - b[0]).slice(0, SAMPLE).map((p) => p[1]);
    sampledMaps.push({ sitemap: url, total: urls.length, sampled: keep.length });
  }
  sitemapTotal += urls.length;
  for (const l of keep) out.push({ url: norm(l.loc), lastmod: l.lastmod, sitemap: url });
  return out;
}
let sitemapTotal = 0;
const sampledMaps = [];

function jsonLdTypes(html) {
  const types = new Set();
  let errors = 0;
  for (const m of html.matchAll(/<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const walk = (n) => {
        if (Array.isArray(n)) return n.forEach(walk);
        if (n && typeof n === 'object') {
          if (n['@type']) [].concat(n['@type']).forEach((t) => types.add(t));
          Object.values(n).forEach(walk);
        }
      };
      walk(JSON.parse(m[1]));
    } catch { errors++; }
  }
  return { types: [...types].sort(), errors };
}

function analyse(url, html) {
  const head = (html.match(/<head\b[\s\S]*?<\/head>/i) || [''])[0];
  const title = decode((head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]);
  const description = metaContent(head, 'name', 'description');
  const robots = metaContent(head, 'name', 'robots');
  const canonTag = (head.match(/<link\b[^>]*rel\s*=\s*["']?canonical["']?[^>]*>/i) || [])[0];
  const canonical = canonTag ? norm(attr(canonTag, 'href')) : null;
  const ogImage = metaContent(head, 'property', 'og:image');
  const ogTitle = metaContent(head, 'property', 'og:title');
  const lang = attr((html.match(/<html\b[^>]*>/i) || [''])[0], 'lang');
  const viewport = !!metaContent(head, 'name', 'viewport');
  const hreflang = (head.match(/<link\b[^>]*hreflang/gi) || []).length;

  const body = (html.match(/<body\b[\s\S]*<\/body>/i) || [html])[0]
    .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, ' ');
  const main = (body.match(/<main\b[\s\S]*?<\/main>/i) || [body])[0];
  const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => decode(m[1].replace(/<[^>]+>/g, ' ')));
  const h2 = (body.match(/<h2\b/gi) || []).length;
  const text = decode(main.replace(/<[^>]+>/g, ' '));
  const words = text ? text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length : 0;

  const links = [];
  for (const m of body.matchAll(/<a\b[^>]*>/gi)) {
    const href = attr(m[0], 'href');
    if (!href || /^(mailto:|tel:|javascript:|#|sms:|data:)/i.test(href)) continue;
    const abs = norm(href);
    if (!abs) continue;
    links.push({ to: abs, internal: isInternal(abs), nofollow: /nofollow/i.test(attr(m[0], 'rel') || '') });
  }
  const imgs = body.match(/<img\b[^>]*>/gi) || [];
  const imgNoAlt = imgs.filter((t) => attr(t, 'alt') === null).length;
  const ld = jsonLdTypes(html);

  return {
    title, titleLen: title.length, description, descLen: description ? description.length : 0,
    robots, noindex: /noindex/i.test(robots || ''), canonical,
    canonicalSelf: canonical ? canonical.replace(/\/$/, '') === url.replace(/\/$/, '') : null,
    ogTitle: !!ogTitle, ogImage: !!ogImage, lang, viewport, hreflang,
    h1: h1s, h1Count: h1s.length, h2, words,
    schema: ld.types, schemaErrors: ld.errors,
    linksInternal: [...new Set(links.filter((l) => l.internal).map((l) => l.to))],
    linksExternal: [...new Set(links.filter((l) => !l.internal).map((l) => l.to))].length,
    images: imgs.length, imgNoAlt,
  };
}

// ---------- crawl ----------
const t0 = Date.now();
const robots = await get(BASE + '/robots.txt');
// Every sitemap robots.txt names (some sites list an index and a flat file); /sitemap.xml if none.
const robotSitemaps = robots.status === 200
  ? [...robots.body.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map((m) => m[1].trim().replace(/^https?:\/\/[^/]+/i, BASE))
  : [];
const listed = [];
const seenMaps = new Set();
for (const sm of robotSitemaps.length ? robotSitemaps : [BASE + '/sitemap.xml']) for (const x of await sitemapUrls(sm, seenMaps)) listed.push(x);
const sitemapErrors = listed.filter((l) => l.sitemapError);
const inSitemap = new Map();
for (const l of listed.filter((l) => l.url)) if (!inSitemap.has(l.url)) inSitemap.set(l.url, l);
if (!inSitemap.has(BASE + '/')) inSitemap.set(BASE + '/', { url: BASE + '/', lastmod: null, sitemap: null });

const queue = [...inSitemap.keys()].slice(0, LIMIT);
const pages = [];
let i = 0;
async function worker() {
  while (i < queue.length) {
    const url = queue[i++];
    const r = await get(url);
    const row = {
      url, path: new URL(url).pathname, section: section(url), status: r.status, ms: r.ms, ttfb: r.ttfb,
      bytes: r.body.length, xRobots: r.headers.get('x-robots-tag'), location: r.headers.get('location'),
      lastmod: inSitemap.get(url)?.lastmod || null, error: r.error || null,
    };
    if (r.status === 200 && /html/i.test(r.headers.get('content-type') || 'text/html')) Object.assign(row, analyse(url, r.body));
    pages.push(row);
    if (pages.length % 100 === 0) process.stderr.write(`  ${pages.length}/${queue.length}\n`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

// ---------- site-wide picture ----------
const byUrl = new Map(pages.map((p) => [p.url, p]));
const inlinks = new Map();
const linkedNotListed = new Map();
for (const p of pages) for (const to of p.linksInternal || []) {
  const key = to.split('?')[0];
  if (key === p.url) continue;
  inlinks.set(key, (inlinks.get(key) || 0) + 1);
  if (!inSitemap.has(key) && !byUrl.has(key)) linkedNotListed.set(key, (linkedNotListed.get(key) || 0) + 1);
}
for (const p of pages) p.inlinks = inlinks.get(p.url) || 0;

// check linked-but-unlisted pages (cap 400) for status
const toCheck = [...linkedNotListed.keys()].filter((u) => !/\.(png|jpe?g|webp|gif|svg|ics|json|xml|pdf|css|js|mp4)$/i.test(u)).slice(0, 400);
const unlisted = [];
let j = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (j < toCheck.length) {
    const u = toCheck[j++];
    const r = await get(u, { method: 'HEAD' });
    unlisted.push({ url: u, status: r.status, location: r.headers.get('location'), linkedFrom: linkedNotListed.get(u) });
  }
}));

const ok = pages.filter((p) => p.status === 200 && p.title !== undefined);
const count = (f) => ok.filter(f).length;
const dup = (key) => {
  const m = new Map();
  for (const p of ok) if (p[key]) m.set(p[key], (m.get(p[key]) || 0) + 1);
  return [...m.entries()].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]);
};
const pct = (arr, q) => { if (!arr.length) return 0; const s = [...arr].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(q * s.length))]; };
const sections = {};
for (const p of pages) {
  const s = (sections[p.section] ||= { pages: 0, ok: 0, words: [], thin: 0, schema: {}, inlinks: [], orphans: 0 });
  s.pages++;
  if (p.status === 200 && p.title !== undefined) {
    s.ok++; s.words.push(p.words); s.inlinks.push(p.inlinks);
    if (p.words < 250) s.thin++;
    if (p.inlinks === 0 && p.section !== 'home') s.orphans++;
    for (const t of p.schema) s.schema[t] = (s.schema[t] || 0) + 1;
  }
}
for (const s of Object.values(sections)) {
  s.medianWords = pct(s.words, 0.5); s.medianInlinks = pct(s.inlinks, 0.5);
  delete s.words; delete s.inlinks;
}
const schemaAll = {};
for (const p of ok) for (const t of p.schema) schemaAll[t] = (schemaAll[t] || 0) + 1;

const summary = {
  date: today, base: BASE, crawlSeconds: Math.round((Date.now() - t0) / 1000),
  robotsTxt: robots.status === 200 ? robots.body.trim() : `status ${robots.status}`,
  sitemapUrls: sitemapTotal, sitemapUrlsCrawled: inSitemap.size, sampled: sampledMaps, sitemapErrors,
  crawled: pages.length,
  status: pages.reduce((m, p) => ((m[p.status] = (m[p.status] || 0) + 1), m), {}),
  html200: ok.length,
  speed: { medianMs: pct(ok.map((p) => p.ms), 0.5), p90Ms: pct(ok.map((p) => p.ms), 0.9), medianTtfb: pct(ok.map((p) => p.ttfb), 0.5), medianKB: Math.round(pct(ok.map((p) => p.bytes), 0.5) / 1024) },
  titles: { missing: count((p) => !p.title), tooLong: count((p) => p.titleLen > 60), tooShort: count((p) => p.title && p.titleLen < 25), duplicates: dup('title').length, duplicatePages: dup('title').reduce((s, [, n]) => s + n, 0) },
  descriptions: { missing: count((p) => !p.description), tooLong: count((p) => p.descLen > 160), tooShort: count((p) => p.description && p.descLen < 70), duplicates: dup('description').length, duplicatePages: dup('description').reduce((s, [, n]) => s + n, 0) },
  h1: { missing: count((p) => p.h1Count === 0), multiple: count((p) => p.h1Count > 1) },
  canonical: { missing: count((p) => !p.canonical), notSelf: count((p) => p.canonical && !p.canonicalSelf) },
  indexing: { noindexInSitemap: count((p) => p.noindex), xRobotsNoindex: pages.filter((p) => /noindex/i.test(p.xRobots || '')).length },
  social: { missingOgImage: count((p) => !p.ogImage) },
  content: { medianWords: pct(ok.map((p) => p.words), 0.5), thinUnder250: count((p) => p.words < 250), over1000: count((p) => p.words >= 1000) },
  schema: { pagesWithAny: count((p) => p.schema.length > 0), pagesWithNone: count((p) => p.schema.length === 0), parseErrors: count((p) => p.schemaErrors > 0), types: schemaAll },
  links: { orphans: count((p) => p.inlinks === 0 && p.section !== 'home'), medianInlinks: pct(ok.map((p) => p.inlinks), 0.5), linkedNotInSitemap: unlisted.filter((u) => u.status === 200).length, brokenInternal: unlisted.filter((u) => u.status >= 400 || u.status === 0).length, redirectsLinked: unlisted.filter((u) => u.status >= 300 && u.status < 400).length },
  images: { total: ok.reduce((s, p) => s + p.images, 0), missingAlt: ok.reduce((s, p) => s + p.imgNoAlt, 0) },
  sections,
  topDuplicateTitles: dup('title').slice(0, 10),
  topDuplicateDescriptions: dup('description').slice(0, 10),
  broken: unlisted.filter((u) => u.status >= 400 || u.status === 0).slice(0, 50),
  notInSitemap: unlisted.filter((u) => u.status === 200).slice(0, 50),
};

await mkdir(OUT, { recursive: true });
// Committed: the small summary. Ignored by git (seo/.gitignore): the full per-page JSON and CSV.
await writeFile(path.join(OUT, `${today}.summary.json`), JSON.stringify(summary, null, 1));
const slim = pages.map(({ linksInternal, ...rest }) => ({ ...rest, outlinks: linksInternal ? linksInternal.length : 0 }));
await writeFile(path.join(OUT, `${today}.json`), JSON.stringify({ summary, pages: slim }, null, 1));
const cols = ['url', 'section', 'status', 'ms', 'title', 'titleLen', 'descLen', 'h1Count', 'words', 'inlinks', 'outlinks', 'schema', 'canonicalSelf', 'noindex', 'lastmod'];
const csv = [cols.join(',')].concat(slim.map((p) => cols.map((c) => {
  const v = Array.isArray(p[c]) ? p[c].join('|') : p[c] ?? '';
  return /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v;
}).join(','))).join('\n');
await writeFile(path.join(OUT, `${today}-pages.csv`), csv);

console.log(JSON.stringify(summary, null, 1));
