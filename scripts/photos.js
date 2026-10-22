/* Cycle for Change — Robert's photos, one registry (Pass 25, Oct 4, 2026; studio pass 1, Oct 21, 2026).

   Robert: "What about having a whole bunch of photos edited throughout the site that I have taken."
   Every photo the generators place comes from here, with its alt text and where/when it was taken.
   The originals are in cfc-site/photos/ (picked from ~/Pictures/CFC Stockpile/ on his Mac);
   `python3 tools/grade.py --all --only <key>-2` writes the served copy to cfc-site/img/ph/ — since studio pass 1
   CLEAN (ungraded: a plain resize and a light unsharp), numbered (`-2`), with an AVIF and a WebP beside each.

   figure(key, opts)  the <figure class="ph …"> the page carries. Styles: `.ph` in /chrome.css (and the same block
                      in /home.css). Studio pass 1: a clean edge — edge to edge on phones, on the grid on desktop.
                      No mask, no fade, no wash, no frame, nothing laid over the picture.
     cls      the desktop layout: "ph--wide" (a 2:1 band), "ph--frame" (3:2, the column's width) or
              nothing (portraits 4:5 and narrow, landscapes 3:2). Phones always get the photo's own shape.
              A photo with a `band` gets "ph--wide" (and its band crops) unless the caller says otherwise.
     line     a caption in place of the photo's own place · month line
     caption  false = no caption at all
     eager    the one picture on a first screen: fetchpriority="high", no lazy load

   `band` (studio pass 1): art-directed crops for a wide band, plain crops of his own file (tools/grade.py):
     w  the 2:1 desktop crop, served at ≥600px     b  the 4:3 phone crop (when the band has one)

   Rules (house): only Robert is recognisable in any of these — no group-ride crowds, no kids, no
   strangers' faces (07-group-rides in the stockpile needs people's OK first). No cars, trucks or vans,
   not even parked in the distance (Robert, Oct 4: "landscapes or cycling"). A photo goes where it
   is true to the place, and its caption always says where it was really taken: a Phoenix road on a
   guide about a ride in Texas says Phoenix. Never the first thing on a phone on a rides hub (Pass 12).
   Every placement is looked at 1:1 for vehicles and faces before it ships. */
"use strict";

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// The served file number (tools/grade.py `V`). Bump both together when every registry photo changes again.
const V = 2;
// shape: "p" = portrait 1080×1440, "l" = landscape 1600×1200 (what tools/grade.py writes for img/ph/)
const SIZE = { p: [1080, 1440], l: [1600, 1200] };
const ph = (key, shape, where, alt, pos, [w, h] = SIZE[shape], more = {}) => ({ src: `/img/ph/${key}-${V}.jpg`, w, h, shape, where, alt, pos, ...more });
const band = (key, { b = true, bw = 1600, bh = 1200 } = {}) => ({ w: `/img/ph/${key}-w-${V}.jpg`, ...(b ? { b: `/img/ph/${key}-b-${V}.jpg`, bw, bh } : {}) });

const PHOTOS = {
  // —— the first five (Passes 6–16). Studio pass 1: crew and people come off the site (a second rider's face with no OK
  //    on record, no place · month). card-south / card-pv / card-journal are rebuilt below from the registry. ——
  haus: ph("haus-road", "l", "", "Robert grinning into the camera mid-ride, a canal path and the sun behind him.", "50% 40%"),   // Phoenix (Robert, Oct 22, 2026); month not yet given — the where line stays empty until it is, so no half caption shows

  // —— Pass 25: the stockpile picks ——
  "phx-skyline": ph("phx-skyline", "l", "Phoenix, AZ · Apr 2026", "Downtown Phoenix seen from the hills to the north, mountains beyond it and green yards below.", "50% 40%", undefined, { band: band("phx-skyline", { b: false }) }),
  "canal-sunrise": ph("canal-sunrise", "p", "Phoenix, AZ · Oct 2025", "The sun coming up over a canal path, seen over the handlebars.", "50% 50%"),
  "phx-canal": ph("phx-canal", "p", "Phoenix, AZ · Aug 2025", "Over the handlebars along a Phoenix canal path, storm clouds lit gold above the palms.", "50% 50%"),
  "pv-shadow": ph("pv-shadow", "p", "Paradise Valley, AZ · Jul 2026", "Robert’s shadow on the road with one hand up in a peace sign, the bars in front and a mountain ahead.", "50% 55%"),
  "pv-cloud-road": ph("pv-cloud-road", "p", "Paradise Valley, AZ · Apr 2026", "Over the bars down a quiet desert road under a sky full of small clouds.", "50% 45%"),
  "flagstaff-dusk": ph("flagstaff-dusk", "l", "Flagstaff, AZ · Jul 2026", "Sunset over a mountain meadow outside Flagstaff, one pine standing in the grass.", "50% 55%"),
  "stanley-dock": ph("stanley-dock", "p", "Stanley, ID · Jun 2024", "A bike leaning at the end of a dock on a mountain lake, the Sawtooth peaks across the water.", "50% 55%"),
  "hood-from-air": ph("hood-from-air", "p", "Over Mount Hood, OR · Jul 2024", "Mount Hood from a plane window, snow on the peak and clouds below.", "50% 45%"),
  "pv-morning-road": ph("pv-morning-road", "p", "Paradise Valley, AZ · Sep 2025", "A desert road in the morning, two riders up ahead and a mountain behind them.", "50% 55%"),
  "pv-sunrise-bars": ph("pv-sunrise-bars", "p", "Paradise Valley, AZ · Sep 2025", "The sun coming up over the valley, seen past the handlebars at the top of a climb.", "50% 45%"),
  "pv-golden-climb": ph("pv-golden-climb", "l", "Paradise Valley, AZ · Nov 2025", "A desert ridge lit gold by the first sun, houses on the slope and the moon still up.", "50% 50%"),   // cropped above the riders coming up the road
  "pv-dusk": ph("pv-dusk", "p", "Paradise Valley, AZ · Aug 2025", "A cracked desert road topping out over the valley, a rider up ahead, the sky going orange at the horizon.", "50% 50%"),
  "camelback-sunrise": ph("camelback-sunrise", "l", "Paradise Valley, AZ · Nov 2025", "Camelback Mountain lit red at sunrise above a quiet street.", "50% 45%"),
  "riders-camelback": ph("riders-camelback", "p", "Paradise Valley, AZ · Sep 2025", "A few riders up the road ahead, a desert ridge and Camelback behind them.", "50% 50%", undefined, { band: band("riders-camelback") }),
  "robert-camelback": ph("robert-camelback", "p", "Paradise Valley, AZ · Apr 2026", "Robert standing with his bike on a desert overlook in a yellow helmet, saguaros behind him.", "50% 35%"),
  "robert-desert": ph("robert-desert", "p", "Paradise Valley, AZ · Sep 2025", "Robert in a lavender jersey, standing with his bike on a desert road, a peace sign up, mountains behind.", "50% 40%"),
  "robert-peace": ph("robert-peace", "p", "Paradise Valley, AZ · Sep 2025", "Robert in a red helmet on a desert road with his bike, throwing a peace sign.", "50% 40%"),
  "robert-selfie-camelback": ph("robert-selfie-camelback", "l", "Paradise Valley, AZ · Oct 2025", "Robert mid-ride in a red helmet and purple jersey, Camelback Mountain behind him.", "60% 45%"),
  "sedona-road": ph("sedona-road", "l", "Sedona, AZ · Apr 2026", "A red rock butte outside Sedona under a clear sky, trees along its foot.", "50% 50%", [1280, 960]),   // cropped to the butte, above the traffic
  "gravel-pines": ph("gravel-pines", "p", "Bellemont, AZ · Apr 2026", "Looking over the bars down a dirt road through ponderosa pines.", "50% 55%"),
  "gravel-road": ph("gravel-road", "p", "Bellemont, AZ · Apr 2026", "A wide, rutted dirt road under a big sky, seen over the handlebars.", "50% 55%"),
  "encinitas-beach": ph("encinitas-beach", "p", "Encinitas, CA · Apr 2026", "A gravel bike leaning in the sand at Encinitas, the Pacific behind it.", "50% 55%"),
  "empty-road": ph("empty-road", "p", "Temecula, CA · Apr 2026", "A country road running out through dry grass toward low hills, two riders far up ahead.", "50% 50%", undefined, { band: band("empty-road", { bw: 1380, bh: 1035 }) }),
  "seattle-path": ph("seattle-path", "p", "Seattle, WA · Jul 2026", "A bike path curving under downtown Seattle’s towers.", "50% 50%"),
  "boise-river-path": ph("boise-river-path", "l", "Boise, ID · Sep 2024", "A paved path along the river below a canyon wall, early light.", "50% 50%"),
  "hills-road": ph("hills-road", "p", "Boise, ID · Jun 2025", "A two-lane road dropping through dry foothills under a gray sky.", "50% 55%"),
  "robert-boise": ph("robert-boise", "p", "Boise, ID · May 2025", "Robert standing with his bike on a bridge, sunglasses on, smiling.", "50% 35%"),
  "bike-wall": ph("bike-wall", "l", "Boise, ID · Jun 2025", "A green road bike against a white wall, the helmet hung on the bars.", "45% 60%"),
  "sawtooth-lake": ph("sawtooth-lake", "l", "Stanley, ID · Jun 2024", "A still mountain lake holding the pine slopes and the jagged Sawtooth peaks.", "50% 45%"),
  "sawtooth-road": ph("sawtooth-road", "l", "Stanley, ID · Jun 2024", "A two-lane road winding toward the snow-streaked Sawtooth Mountains.", "50% 50%"),
  "sawtooth-calm": ph("sawtooth-calm", "l", "Stanley, ID · Jun 2024", "A gravel path through tall pines under a blue sky, mountains in the distance.", "50% 55%", undefined, { band: band("sawtooth-calm", { b: false }) }),

  // —— Studio pass 1 (Oct 21, 2026): crops that keep a rule ——
  // South Mountain: the view only. The full photo has a rider's face, front on (Robert hasn't said who it is), and a
  // white shape on the valley highway. 4:5, left of the rider and above the highway. Place and month: the registry's.
  "south-mountain-view": ph("south-mountain-view", "p", "Phoenix, AZ · Oct 2025", "The view from the South Mountain climb: a far range of mountains over the valley floor.", "50% 50%", [880, 1100]),
  // Robert's bike at the LOVE wall, the left of the Oct 12 photo (data/today.json says Phoenix · October; the homepage
  // eyebrow dates it Oct 12, 2026). Replaces card-journal, which had a parked car down the street.
  "love-wall": ph("love-wall", "p", "Phoenix, AZ · Oct 2026", "Robert’s red bike leaning on a painted wall, the LOVE mural behind it.", "50% 50%", [719, 899]),
};

// Oct 18, 2026: the AVIF sibling of the JPG (python3 tools/grade.py writes it) goes first in a <picture>, the JPG is
// the fallback. Studio pass 1: the WebP too, and the band's own crops ahead of both at ≥600px.
const fs = require("fs");
const path = require("path");
const SITE_DIR = path.join(__dirname, "..", "cfc-site");
const sib = (src, ext) => { const a = src.replace(/\.jpe?g$/i, "." + ext); return a !== src && fs.existsSync(path.join(SITE_DIR, a)) ? a : null; };
const sources = (src, media = "") => {
  const m = media ? ` media="${media}"` : "";
  const av = sib(src, "avif"), wp = sib(src, "webp");
  return `${av ? `<source${m} type="image/avif" srcset="${av}">` : ""}${wp ? `<source${m} type="image/webp" srcset="${wp}">` : ""}${media ? `<source${m} srcset="${src}">` : ""}`;
};

function figure(key, { cls = null, line = "", caption = true, eager = false } = {}) {
  const p = PHOTOS[key];
  if (!p) throw new Error(`scripts/photos.js: no photo called "${key}"`);
  const cap = caption ? (line || p.where || "") : "";
  const B = p.band;
  // a photo with a band runs as the band unless the caller asked for something else (cls given, even "")
  const layout = cls == null ? (B ? "ph--wide" : "") : cls;
  const asBand = B && /\bph--wide\b/.test(layout);
  // on phones a band shows its 4:3 crop when it has one, else the photo's own shape
  const phone = asBand && B.b ? { src: B.b, w: B.bw, h: B.bh, shape: "l" } : p;
  const img = `<img src="${phone.src}" alt="${esc(p.alt)}" width="${phone.w}" height="${phone.h}" ${eager ? `fetchpriority="high"` : `loading="lazy"`} decoding="async"${p.pos && !asBand ? ` style="object-position:${p.pos}"` : ""}>`;
  const pic = `<picture>${asBand ? sources(B.w, "(min-width:600px)") : ""}${sources(phone.src)}${img}</picture>`;
  return `<figure class="ph ph--${phone.shape || "l"}${layout ? " " + layout : ""}">${pic}${cap ? `<figcaption>${esc(cap)}</figcaption>` : ""}</figure>`;
}

// A card's picture (the guides, field notes and journal "From the road" cards, studio pass 1): the registry photo in
// the card's 4:5 figure, and its place · month line right under it (`.fn-card-where`). Hand pages carry the output.
function card(key) {
  const p = PHOTOS[key];
  if (!p) throw new Error(`scripts/photos.js: no photo called "${key}"`);
  const img = `<img src="${p.src}" alt="${esc(p.alt)}" width="${p.w}" height="${p.h}" loading="lazy" decoding="async"${p.pos ? ` style="object-position:${p.pos}"` : ""}>`;
  return `<figure><picture>${sources(p.src)}${img}</picture></figure>${p.where ? `<span class="fn-card-where">${esc(p.where)}</span>` : ""}`;
}

module.exports = { PHOTOS, figure, card, sources, V };
