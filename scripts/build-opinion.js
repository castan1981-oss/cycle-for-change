#!/usr/bin/env node
/* Cycle for Change — the opinion series (Nov 18, 2026).

   Robert's brief: first-person opinion pieces backed by reporting ("a cyclist speaking honestly to other cyclists"),
   written five or six at a time and published close together. One source file per piece in data/opinion/<slug>.md;
   this script lays each one out as a field note at /field-notes/<slug>/ and keeps four things in step with them:

     cfc-site/field-notes/<slug>/index.html     the piece
     cfc-site/field-notes/opinion/index.html    the series page (only while at least one piece is showing)
     cfc-site/field-notes/index.html            its cards, between the opinion:cards markers
     cfc-site/sitemap-pages.xml                 its URLs, between the opinion markers (live pieces only)

   The words are his (CLAUDE.md §5): this script lays out, numbers the sources and checks the rules. It never writes.

   When a piece shows
     status: draft                    never on the live site
     status: ready + publish: DATE    live from that day (Phoenix time). Netlify runs this on every deploy and a deploy
                                      is forced every morning, so a batch released on dates a few days apart goes out
                                      by itself once the PR is merged.
     a ready piece that fails the checks is held back and the build says why; the deploy does not fail over it.

   Preview: `--preview`, or a Netlify deploy preview / branch deploy, shows every piece (drafts and scheduled ones wear
   a banner and are noindex). Never commit the output of a --preview run.

   node scripts/build-opinion.js            build, as production would today
   node scripts/build-opinion.js --preview  build with every piece showing
   node scripts/build-opinion.js --check    the checks only; exits 1 if a ready piece fails one
   node scripts/build-opinion.js --queue    what is live, scheduled and in draft */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MARK = "<!-- built by scripts/build-opinion.js. Never hand-edit; the source is data/opinion/";
const HUB = "/field-notes/opinion/";
const OPINION_LINE = "Opinion. The take is mine. The facts are sourced at the end.";
const CARDS = ["<!-- opinion:cards (scripts/build-opinion.js writes between these two lines) -->", "<!-- /opinion:cards -->"];
const MAP = ["<!-- opinion (scripts/build-opinion.js writes between these two lines) -->", "<!-- /opinion -->"];

// CLAUDE.md §4: banned anywhere, and the never-list a machine can spot. A hit holds a ready piece back.
const BANNED = [
  [/\bleverag(e|es|ed|ing)\b/i, "banned word: leverage"],
  [/\bsynerg(y|ies)\b/i, "banned word: synergy"],
  [/\bjourney\b/i, "banned word: journey"],
  [/\bpassionate about\b/i, "banned phrase: passionate about"],
  [/\bthrilled to announce\b/i, "banned phrase: thrilled to announce"],
  [/\bexcited to share\b/i, "banned phrase: excited to share"],
  [/\b(years?|months?|days?) sober\b|\bsober since\b|\bsobriety date\b/i, "never-list: continuous-sobriety phrasing"],
  [/\brelaps/i, "never-list: relapse"],
  [/\bIronman\b|\b7,?500[- ]miles?\b/i, "never-list: the retired Ironman / 7,500-mile framing"],
  [/\{\{|\bTODO\b|\bTK\b/, "unfinished: a placeholder is still in the text"],
];

const phxToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Phoenix" }).format(new Date());
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const human = (iso) => { const [y, m, d] = iso.split("-").map(Number); return `${MONTHS[m - 1]} ${d}, ${y}`; };

/* —— reading a source file ——
   Front matter between two --- lines, one `key: value` a line. Then the body:
     a paragraph                      blank line between paragraphs; the first one is the lede
     ## A heading                     sentence case
     > A line pulled out big          at most one or two a piece
     - a list item
     a claim.[3]                      a citation: the number of a source below
     ## Sources                       last; one a line, `3. What it is, who, when | https://…` */
function parse(text, file = "") {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: no front matter (the file starts with --- and the fields, then ---)`);
  const meta = {};
  for (const line of m[1].split("\n")) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const i = line.indexOf(":");
    if (i < 0) throw new Error(`${file}: front matter line without a colon: ${line}`);
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  let body = m[2].replace(/\r/g, "");
  const sources = [];
  const s = body.search(/^## Sources\s*$/m);
  if (s >= 0) {
    for (const line of body.slice(s).split("\n").slice(1)) {
      const t = line.trim();
      if (!t) continue;
      const sm = t.match(/^(\d+)\.\s+(.*?)(?:\s*\|\s*(\S+))?$/);
      if (!sm) throw new Error(`${file}: a source line that isn't "N. What it is | https://…": ${t}`);
      sources.push({ n: Number(sm[1]), label: sm[2].trim(), url: sm[3] || "" });
    }
    body = body.slice(0, s);
  }
  const blocks = [];
  for (const chunk of body.split(/\n\s*\n/)) {
    const t = chunk.trim();
    if (!t) continue;
    if (/^## /.test(t)) blocks.push({ type: "h2", text: t.slice(3).trim() });
    else if (/^> /.test(t)) blocks.push({ type: "quote", text: t.split("\n").map((l) => l.replace(/^>\s?/, "")).join(" ") });
    else if (/^- /.test(t)) blocks.push({ type: "list", items: t.split("\n").map((l) => l.replace(/^-\s+/, "").trim()) });
    else blocks.push({ type: "p", text: t.replace(/\n/g, " ") });
  }
  const lede = blocks.length && blocks[0].type === "p" ? blocks.shift().text : "";
  const plain = [lede, ...blocks.map((b) => (b.items ? b.items.join(" ") : b.text))].join(" ");
  return { meta, lede, blocks, sources, plain, words: plain.replace(/\[\d+\]/g, "").split(/\s+/).filter(Boolean).length };
}

/* —— the checks. errors hold a ready piece back; warnings are for whoever is preparing it —— */
function lint(piece, { photos = null } = {}) {
  const { meta, lede, blocks, sources, plain } = piece;
  const errors = [], warnings = [];
  for (const k of ["title", "slug", "status", "description", "dek"]) if (!meta[k]) errors.push(`front matter: ${k} is missing`);
  if (meta.status && !["draft", "ready"].includes(meta.status)) errors.push(`status is "${meta.status}"; it is draft or ready`);
  if (meta.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(meta.slug)) errors.push("slug: lowercase words joined by hyphens");
  if (meta.slug === "opinion") errors.push("slug: /field-notes/opinion/ is the series page");
  if (piece.file && meta.slug && path.basename(piece.file, ".md") !== meta.slug) errors.push("the file name and the slug differ");
  if (meta.status === "ready" && !/^\d{4}-\d{2}-\d{2}$/.test(meta.publish || "")) errors.push("a ready piece needs publish: YYYY-MM-DD");
  if (meta.updated && !/^\d{4}-\d{2}-\d{2}$/.test(meta.updated)) errors.push("updated: YYYY-MM-DD");
  if (meta.description && (meta.description.length < 70 || meta.description.length > 160)) errors.push(`description is ${meta.description.length} characters; 70 to 160`);
  if (meta.title && meta.title.length > 60) warnings.push(`title is ${meta.title.length} characters; search cuts near 60`);
  if (meta.title && /\s[A-Z][a-z]+\s[A-Z][a-z]+\s[A-Z][a-z]+/.test(meta.title)) warnings.push("title looks like Title Case; the site is sentence case");
  if (!lede) errors.push("the body starts with a paragraph (the lede)");
  if (!blocks.some((b) => b.type === "p")) errors.push("no body under the lede");
  if (!meta.photo) warnings.push("no photo: the card and the page run without a picture");
  else if (photos && !photos[meta.photo]) errors.push(`photo "${meta.photo}" is not in scripts/photos.js`);
  const all = [meta.title, meta.description, meta.dek, plain, sources.map((s) => s.label).join(" ")].join(" ");
  for (const [re, why] of BANNED) if (re.test(all)) errors.push(why);
  const cited = new Set([...plain.matchAll(/\[(\d+)\]/g)].map((x) => Number(x[1])));
  const have = new Set(sources.map((s) => s.n));
  for (const n of cited) if (!have.has(n)) errors.push(`[${n}] is cited and there is no source ${n}`);
  sources.forEach((s, i) => {
    if (s.n !== i + 1) errors.push(`sources are numbered 1, 2, 3 in order; found ${s.n} in place ${i + 1}`);
    if (!/^https:\/\/\S+$/.test(s.url)) errors.push(`source ${s.n} has no https link`);
    if (!cited.has(s.n)) warnings.push(`source ${s.n} is never cited in the text`);
  });
  // a number with nothing behind it: a %, a $ figure or a year-stamped claim in a paragraph that cites nothing
  for (const b of blocks) {
    if (b.type !== "p" || /\[\d+\]/.test(b.text)) continue;
    if (/\d+(\.\d+)?%|\$\d/.test(b.text)) warnings.push(`a figure with no citation: "${b.text.slice(0, 70)}…"`);
  }
  if (!sources.length) warnings.push("no sources: fine for pure opinion, wrong if the piece states facts");
  return { errors, warnings };
}

/* —— when a piece shows —— */
function stateOf(piece, today) {
  if (piece.meta.status !== "ready") return "draft";
  if (piece.lint.errors.length) return "held";
  return piece.meta.publish <= today ? "live" : "scheduled";
}

/* —— his text to HTML: curly quotes, [n] citations, [text](url), **bold**, *italic*. Nothing else. —— */
function inline(text, curlText) {
  const out = [];
  let last = 0;
  const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)|\s?\[(\d+)\]/g;
  const words = (t) => esc(curlText(t)).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<i>$1</i>");
  for (const m of text.matchAll(re)) {
    out.push(words(text.slice(last, m.index)));
    if (m[3]) out.push(`<sup><a href="#src-${m[3]}">${m[3]}</a></sup>`);
    else out.push(`<a href="${esc(m[2])}"${/^https?:/.test(m[2]) ? ' rel="noopener"' : ""}>${words(m[1])}</a>`);
    last = m.index + m[0].length;
  }
  out.push(words(text.slice(last)));
  return out.join("");
}

function banner(piece) {
  if (piece.state === "live") return "";
  const why = piece.state === "draft" ? "Draft. Not published."
    : piece.state === "scheduled" ? `Scheduled. Goes live ${human(piece.meta.publish)}.`
    : `Held back. ${piece.lint.errors.length} thing${piece.lint.errors.length === 1 ? "" : "s"} to fix: ${piece.lint.errors.join("; ")}.`;
  return `\n    <p class="fn-todo" role="note">${esc(why)} Only a preview shows this page.</p>`;
}

function renderPage(piece, others, { CHROME, PHOTOS, curlText }) {
  const { meta, lede, blocks, sources } = piece;
  const url = `/field-notes/${meta.slug}/`;
  const date = meta.publish || piece.today;
  const mins = Math.max(1, Math.round(piece.words / 230));
  const body = blocks.map((b) => {
    if (b.type === "h2") return `      <h2>${inline(b.text, curlText)}</h2>`;
    if (b.type === "quote") return `      <blockquote>${inline(b.text, curlText)}</blockquote>`;
    if (b.type === "list") return `      <ul>\n${b.items.map((i) => `        <li>${inline(i, curlText)}</li>`).join("\n")}\n      </ul>`;
    return `      <p>${inline(b.text, curlText)}</p>`;
  }).join("\n");
  const src = sources.length ? `

      <h2 id="sources">Sources</h2>
      <div class="fn-sources"><ol>
${sources.map((s) => `<li id="src-${s.n}"><a href="${esc(s.url)}" rel="noopener">${esc(curlText(s.label))}</a></li>`).join("\n")}
</ol></div>` : "";
  const ld = {
    "@context": "https://schema.org", "@type": "BlogPosting", articleSection: "Opinion", headline: meta.title, description: meta.description,
    datePublished: date, ...(meta.updated ? { dateModified: meta.updated } : {}), url: CHROME.SITE + url,
    author: { "@type": "Person", name: "Robert Castan", url: CHROME.SITE + "/about/" },
    publisher: { "@type": "Organization", name: "Cycle for Change", url: CHROME.SITE + "/" }, mainEntityOfPage: CHROME.SITE + url,
    ...(sources.length ? { citation: sources.map((s) => s.url) } : {}),
  };
  const head = CHROME.head({
    title: meta.title, description: meta.description, url, ogType: "article", styles: ["/styles.css"], ld: [ld],
    ...(piece.state === "live" ? {} : { robots: "noindex, nofollow" }),
  });
  const next = others.slice(0, 2).map((o) => `    <a href="/field-notes/${o.meta.slug}/">${esc(curlText(o.meta.title))}</a>`);
  if (next.length < 2) next.push(`    <a href="/rides/">Find a group ride</a>`);
  if (next.length < 2) next.push(`    <a href="/field-notes/">Field notes</a>`);
  const fig = meta.photo && PHOTOS.PHOTOS[meta.photo] ? `\n\n    ${PHOTOS.figure(meta.photo, { cls: PHOTOS.PHOTOS[meta.photo].shape === "p" ? "" : null })}` : "";
  return `<!DOCTYPE html>
${MARK}${meta.slug}.md -->
<html lang="en">
<head>
${head}
</head>
<body id="top">

${CHROME.HEADER}

<main id="main" class="fn-post">
  <article class="fn-article">${banner(piece)}
    <p class="fn-meta">
      <span class="fn-chip">Opinion</span>
      <span class="dot">·</span>
      <time datetime="${date}">${human(date)}</time>
      <span class="dot">·</span>
      <span>${mins} min read</span>
    </p>

    <h1>${esc(curlText(meta.title))}</h1>

    <p class="fn-lede">${inline(lede, curlText)}</p>${fig}

    <div class="fn-body">
      <p class="fn-evidence">${OPINION_LINE}</p>
${body}${meta.updated ? `\n      <p class="fn-evidence">Updated ${human(meta.updated)}.</p>` : ""}${src}
    </div>

  </article>

  <nav class="fn-related" aria-label="Keep reading">
    <h2>Keep reading</h2>
${next.join("\n")}
  </nav>

  <p class="fn-back"><a href="${HUB}">← All opinion</a></p>
  ${CHROME.PLEDGE}
</main>

${CHROME.FOOTER}
</body>
</html>
`;
}

function card(piece, { PHOTOS, curlText }) {
  const { meta } = piece;
  const pic = meta.photo && PHOTOS.PHOTOS[meta.photo] ? `\n          ${PHOTOS.card(meta.photo)}` : "";
  const tag = piece.state === "live" ? `Opinion &middot; ${human(meta.publish)}` : `Opinion &middot; ${piece.state === "scheduled" ? "scheduled " + human(meta.publish) : piece.state}`;
  return `        <a class="fn-card" href="/field-notes/${meta.slug}/">${pic}
          <span class="fn-chip">${tag}</span>
          <span class="fn-title">${esc(curlText(meta.title))}</span>
          <p class="fn-dek">${esc(curlText(meta.dek))}</p>
        </a>`;
}

function renderHub(shown, deps) {
  const { CHROME } = deps;
  const live = shown.filter((p) => p.state === "live");
  const head = CHROME.head({
    title: "Opinion", url: HUB, styles: ["/styles.css"],
    description: "First-person opinion from Robert Castan on bikes, bike shops and the people who ride. The take is his. Every fact has a source at the bottom.",
    ld: [{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Opinion", url: CHROME.SITE + HUB, hasPart: live.map((p) => ({ "@type": "BlogPosting", headline: p.meta.title, url: `${CHROME.SITE}/field-notes/${p.meta.slug}/` })) }],
    ...(live.length ? {} : { robots: "noindex, nofollow" }),
  });
  return `<!DOCTYPE html>
${MARK}*.md -->
<html lang="en">
<head>
${head}
</head>
<body id="top">

${CHROME.HEADER}

<main id="main">
  <section class="fn-masthead">
    <div class="wrap">
      <span class="eyebrow">Opinion</span>
      <h1>What I think, and where I got it.</h1>
      <p class="fn-num-cap">The take is mine. Every fact has a source at the bottom of the page.</p>
    </div>
  </section>

  <section class="fn-index">
    <div class="wrap">
      <p class="fn-spokes-head">${shown.length === 1 ? "One so far" : "Newest first"}</p>
      <div class="fn-cards">
${shown.map((p) => card(p, deps)).join("\n")}
      </div>
      <p class="fn-back"><a href="/field-notes/">The rides, written from the road: Field notes &rarr;</a></p>
    </div>
  </section>
  ${CHROME.PLEDGE}
</main>

${CHROME.FOOTER}
</body>
</html>
`;
}

// put `inner` between two marker lines; if the markers aren't in the file yet, plant them with `plant(text, block)`
function between(text, [a, b], inner, plant) {
  const block = `${a}\n${inner ? inner + "\n" : ""}${b}`;
  const i = text.indexOf(a), j = text.indexOf(b);
  if (i >= 0 && j > i) {
    const lineStart = text.lastIndexOf("\n", i) + 1;
    const indent = text.slice(lineStart, i);
    return text.slice(0, i) + `${a}\n${inner ? inner + "\n" : ""}${indent}${b}` + text.slice(j + b.length);
  }
  return plant(text, block);
}

function load(dataDir, { photos = null, today }) {
  if (!fs.existsSync(dataDir)) return [];
  return fs.readdirSync(dataDir).filter((f) => f.endsWith(".md") && !f.startsWith("_")).sort().map((f) => {
    const file = path.join(dataDir, f);
    const piece = { file, today, ...parse(fs.readFileSync(file, "utf8"), f) };
    piece.lint = lint(piece, { photos });
    piece.state = stateOf(piece, today);
    return piece;
  });
}

function run({ dataDir = path.join(ROOT, "data", "opinion"), siteDir = path.join(ROOT, "cfc-site"), today = phxToday(), preview = false, deps = null, log = console.log } = {}) {
  deps = deps || { CHROME: require("./chrome.js"), PHOTOS: require("./photos.js"), curlText: require("./curl-quotes.js").curlText };
  const pieces = load(dataDir, { photos: deps.PHOTOS.PHOTOS, today });
  const byDate = (a, b) => (b.meta.publish || "9999").localeCompare(a.meta.publish || "9999") || a.meta.slug.localeCompare(b.meta.slug);
  const shown = pieces.filter((p) => p.state === "live" || preview).sort(byDate);
  const live = pieces.filter((p) => p.state === "live").sort(byDate);
  const notes = path.join(siteDir, "field-notes");
  const mine = (file) => fs.existsSync(file) && fs.readFileSync(file, "utf8").includes(MARK);
  const write = (file, text) => {
    if (fs.existsSync(file) && !mine(file)) throw new Error(`${path.relative(siteDir, file)} exists and this script did not write it; pick another slug`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== text) fs.writeFileSync(file, text);
  };
  const drop = (file) => { if (mine(file)) { fs.rmSync(file); try { fs.rmdirSync(path.dirname(file)); } catch { /* not empty */ } } };

  for (const p of pieces) {
    if (!p.meta.slug) continue;
    const file = path.join(notes, p.meta.slug, "index.html");
    if (shown.includes(p)) write(file, renderPage(p, shown.filter((o) => o !== p), deps));
    else drop(file);
  }
  const hub = path.join(notes, "opinion", "index.html");
  if (shown.length) write(hub, renderHub(shown, deps)); else drop(hub);

  const index = path.join(notes, "index.html");
  if (fs.existsSync(index)) {
    const before = fs.readFileSync(index, "utf8");
    const after = between(before, CARDS, shown.map((p) => card(p, deps)).join("\n"), (t, block) => {
      const at = t.indexOf('<div class="fn-cards">');
      if (at < 0) throw new Error("field-notes/index.html: no .fn-cards to put the opinion cards in");
      const end = at + '<div class="fn-cards">'.length;
      return t.slice(0, end) + "\n        " + block.replace(/\n(?=<!-- \/opinion)/, "\n        ") + t.slice(end);
    });
    if (after !== before) fs.writeFileSync(index, after);
  }
  const map = path.join(siteDir, "sitemap-pages.xml");
  if (fs.existsSync(map)) {
    const entry = (loc, mod) => `  <url>\n    <loc>https://cycleforchange.org${loc}</loc>\n    <lastmod>${mod}</lastmod>\n  </url>`;
    const urls = live.length ? [entry(HUB, live[0].meta.publish), ...live.map((p) => entry(`/field-notes/${p.meta.slug}/`, p.meta.updated || p.meta.publish))].join("\n") : "";
    const before = fs.readFileSync(map, "utf8");
    const after = between(before, MAP.map((x) => "  " + x), urls, (t, block) => t.replace("</urlset>", block + "\n</urlset>"));
    if (after !== before) fs.writeFileSync(map, after);
  }
  for (const p of pieces) {
    log(`${p.state.padEnd(9)} ${p.meta.slug || path.basename(p.file)}${p.state === "scheduled" || p.state === "live" ? "  " + p.meta.publish : ""}`);
    for (const e of p.lint.errors) log(`  fix   ${e}`);
    if (p.state !== "live") for (const w of p.lint.warnings) log(`  note  ${w}`);
  }
  if (!pieces.length) log("no pieces in data/opinion/");
  return { pieces, shown, live };
}

module.exports = { parse, lint, stateOf, inline, renderPage, renderHub, card, between, run, load, BANNED, OPINION_LINE, HUB, MARK };

if (require.main === module) {
  const args = new Set(process.argv.slice(2));
  const today = phxToday();
  if (args.has("--check") || args.has("--queue")) {
    const pieces = load(path.join(ROOT, "data", "opinion"), { photos: require("./photos.js").PHOTOS, today });
    let bad = 0;
    for (const p of pieces) {
      console.log(`${p.state.padEnd(9)} ${p.meta.slug}${p.meta.publish ? "  " + p.meta.publish : ""}  (${p.words} words, ${p.sources.length} sources)`);
      if (args.has("--check")) {
        for (const e of p.lint.errors) console.log(`  fix   ${e}`);
        for (const w of p.lint.warnings) console.log(`  note  ${w}`);
        if (p.meta.status === "ready" && p.lint.errors.length) bad++;
      }
    }
    process.exit(bad ? 1 : 0);
  }
  const ctx = process.env.CONTEXT || "";
  run({ today, preview: args.has("--preview") || ctx === "deploy-preview" || ctx === "branch-deploy" });
}
