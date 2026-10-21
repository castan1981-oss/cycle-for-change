#!/usr/bin/env node
/* Refresh Robert's photos on the hand-written pages from scripts/photos.js (Pass 25, Oct 4, 2026).

   The generators call PH.figure() on every build; the hand-written pages (guides, field notes,
   resources, journal, /tonight/, the 404) carry the same pictures baked in. After you change a photo's
   alt text, place line, crop or file number in scripts/photos.js, run:

     node scripts/apply-photos.js

   It rewrites three kinds of picture from the registry:
     1. every `<figure class="ph ph--…">` (reads the photo from the img src and keeps the layout class);
     2. the pillar heroes, `<figure class="fn-pillar-photo">` (/guides/, /field-notes/phoenix/): eager, no caption;
     3. the "From the road" cards, `<a class="fn-card" …><figure>…</figure>` + its `.fn-card-where` line.
   A src is found by any of the registry file's names (`/img/ph/<key>.jpg`, `-2.jpg`, …), so a file-number bump
   reaches the pages. To put a photo on a new hand page, paste the output of
   `node -e 'console.log(require("./scripts/photos.js").figure("<key>"))'` where it goes.

   Studio pass 1 (Oct 21, 2026): the old pattern wanted `<figure class="ph …"><img src=…>`; since the Oct 18 AVIF
   change figure() writes a <picture> first, so it matched 0 of the 16 figures. It reads either shape now. */
"use strict";
const fs = require("fs");
const path = require("path");
const PH = require("./photos.js");

const SITE = path.join(__dirname, "..", "cfc-site");
const HAND = ["guides", "field-notes", "resources", "journal", "tonight", "pledge"];
// a registry photo by any of its file names: /img/ph/phx-canal.jpg, /img/ph/phx-canal-2.jpg, the band crops
const stem = (src) => String(src).replace(/^\/img\/ph\//, "").replace(/\.(jpe?g|avif|webp)$/i, "").replace(/-(w|b)-\d+$|-\d+$/, "");
const BY_STEM = {};
for (const [k, p] of Object.entries(PH.PHOTOS)) { BY_STEM[stem(p.src)] = BY_STEM[stem(p.src)] || k; BY_STEM[k] = BY_STEM[k] || k; }
// the old card and hero files, retired in studio pass 1, and the registry photo that replaces each
const RETIRED = {
  "/img/card-pv.jpg": "pv-shadow", "/img/card-south.jpg": "south-mountain-view", "/img/card-journal.jpg": "love-wall",
  "/img/people.jpg": "riders-camelback", "/img/haus-road.jpg": "haus", "/img/ph/south-mountain.jpg": "south-mountain-view",
};
const keyOf = (src, f) => {
  const k = RETIRED[src] || BY_STEM[stem(src)];
  if (!k) throw new Error(`${path.relative(SITE, f)}: ${src} is not in scripts/photos.js`);
  return k;
};
const FIG = /<figure class="ph ph--[pl]([^"]*)">(?:<picture>[\s\S]*?)?<img src="([^"]+)"[\s\S]*?<\/figure>/g;
const HERO = /<figure class="fn-pillar-photo">(?:<picture>[\s\S]*?)?<img src="([^"]+)"[\s\S]*?<\/figure>/g;
const CARD = /(<a class="fn-card"[^>]*>\s*)<figure>(?:<picture>[\s\S]*?)?<img src="([^"]+)"[\s\S]*?<\/figure>(?:<span class="fn-card-where">[^<]*<\/span>)?/g;

function hero(key) {
  const p = PH.PHOTOS[key];
  const img = `<img src="${p.src}" alt="${p.alt.replace(/"/g, "&quot;")}" width="${p.w}" height="${p.h}" fetchpriority="high" decoding="async">`;
  return `<figure class="fn-pillar-photo"><picture>${PH.sources(p.src)}${img}</picture></figure>`;
}

function htmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? htmlFiles(p) : d.name.endsWith(".html") && !d.name.startsWith("_") ? [p] : [];
  });
}

let changed = 0;
const seen = { figures: 0, heroes: 0, cards: 0 };
for (const f of [...HAND.flatMap((d) => htmlFiles(path.join(SITE, d))), path.join(SITE, "404.html")]) {
  const before = fs.readFileSync(f, "utf8");
  const after = before
    .replace(FIG, (m, rest, src) => {
      seen.figures++;
      return PH.figure(keyOf(src, f), { cls: rest.trim(), caption: m.includes("<figcaption>") });
    })
    .replace(HERO, (m, src) => { seen.heroes++; return hero(keyOf(src, f)); })
    .replace(CARD, (m, open, src) => { seen.cards++; return open + PH.card(keyOf(src, f)); });
  if (after !== before) { fs.writeFileSync(f, after); changed++; console.log("updated", path.relative(SITE, f)); }
}
console.log(`${seen.figures} photos, ${seen.heroes} heroes, ${seen.cards} cards on the hand-written pages; ${changed} page${changed === 1 ? "" : "s"} updated`);
