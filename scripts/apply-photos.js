#!/usr/bin/env node
/* Refresh Robert's photos on the hand-written pages from scripts/photos.js (Pass 25, Oct 4, 2026).

   The generators call PH.figure() on every build; the hand-written pages (guides, field notes,
   resources, journal, /tonight/, /pledge/, the 404) carry the same <figure class="ph …"> baked in.
   After you change a photo's alt text, place line or crop in scripts/photos.js, run:

     node scripts/apply-photos.js

   It finds each `<figure class="ph ph--…">` on those pages, reads the photo (from the img src) and the
   layout class, and writes the figure again from the registry. To put a photo on a new hand page, paste
   the output of `node -e 'console.log(require("./scripts/photos.js").figure("<key>"))'` where it goes. */
"use strict";
const fs = require("fs");
const path = require("path");
const PH = require("./photos.js");

const SITE = path.join(__dirname, "..", "cfc-site");
const HAND = ["guides", "field-notes", "resources", "journal", "tonight", "pledge"];
const BY_SRC = Object.fromEntries(Object.entries(PH.PHOTOS).map(([k, p]) => [p.src, k]));
const FIG = /<figure class="ph ph--[pl]([^"]*)"><img src="([^"]+)"[\s\S]*?<\/figure>/g;

function htmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? htmlFiles(p) : d.name.endsWith(".html") && !d.name.startsWith("_") ? [p] : [];
  });
}

let changed = 0, seen = 0;
for (const f of [...HAND.flatMap((d) => htmlFiles(path.join(SITE, d))), path.join(SITE, "404.html")]) {
  const before = fs.readFileSync(f, "utf8");
  const after = before.replace(FIG, (m, rest, src) => {
    seen++;
    const key = BY_SRC[src];
    if (!key) throw new Error(`${path.relative(SITE, f)}: ${src} is not in scripts/photos.js`);
    const cls = rest.trim();
    const hadCaption = m.includes("<figcaption>");
    return PH.figure(key, { cls, caption: hadCaption });
  });
  if (after !== before) { fs.writeFileSync(f, after); changed++; console.log("updated", path.relative(SITE, f)); }
}
console.log(`${seen} photos on the hand-written pages, ${changed} page${changed === 1 ? "" : "s"} updated`);
