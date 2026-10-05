/* Cycle for Change — Robert's photos, one registry (Pass 25, Oct 4, 2026).

   Robert: "What about having a whole bunch of photos edited throughout the site that I have taken."
   Every photo the generators place comes from here, with its alt text and where/when it was taken.
   The originals are in cfc-site/photos/ (picked from ~/Pictures/CFC Stockpile/ on his Mac);
   `python3 tools/grade.py --all --only <key>` writes the house-graded copy to cfc-site/img/ph/.

   figure(key, opts)  the <figure class="ph …"> the page carries. Styles: `.ph` in /chrome.css
                      (and the same block in /home.css for /pledge/). The picture dissolves into
                      whatever it sits on at its top and foot (Pass 7, Pass 23b: no hard edge, no
                      frame, no type over it); on phones it runs edge to edge.
     cls      the desktop layout: "ph--wide" (a 2:1 band), "ph--frame" (3:2, the column's width) or
              nothing (portraits 4:5 and narrow, landscapes 3:2). Phones always get the photo's own shape.
     line     a caption in place of the photo's own place · month line
     caption  false = no caption at all

   Rules (house): only Robert is recognisable in any of these — no group-ride crowds, no kids, no
   strangers' faces (07-group-rides in the stockpile needs people's OK first). No cars, trucks or vans,
   not even parked in the distance (Robert, Oct 4: "landscapes or cycling"). A photo goes where it
   is true to the place, and its caption always says where it was really taken: a Phoenix road on a
   guide about a ride in Texas says Phoenix. Never the first thing on a phone on a rides hub (Pass 12). */
"use strict";

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// shape: "p" = portrait 1080×1440, "l" = landscape 1600×1200 (what tools/grade.py writes for img/ph/)
const SIZE = { p: [1080, 1440], l: [1600, 1200] };
const ph = (key, shape, where, alt, pos, [w, h] = SIZE[shape]) => ({ src: `/img/ph/${key}.jpg`, w, h, shape, where, alt, pos });

const PHOTOS = {
  // —— the first five (Passes 6–16), graded by the old manifest lines ——
  crew: { src: "/img/hero.jpg", w: 1600, h: 1600, shape: "l", alt: "Two riders stopped on a desert road at sunset, saguaros behind them, the sun sitting on the horizon.", pos: "50% 46%" },
  people: { src: "/img/people.jpg", w: 1600, h: 1600, shape: "l", alt: "Two riders crossing a finish line with their hands joined in the air, a rainbow umbrella in the crowd.", pos: "50% 40%" },
  south: { src: "/img/card-south.jpg", w: 800, h: 1000, shape: "p", alt: "Handlebars pointed down a mountain road at sunset, the valley lit below.", pos: "50% 55%" },
  road: { src: "/img/card-pv.jpg", w: 800, h: 1000, shape: "p", alt: "A rider’s shadow on the road, one hand up off the bars, mountains ahead.", pos: "50% 45%" },
  haus: { src: "/img/haus-road.jpg", w: 1600, h: 1200, shape: "l", alt: "Robert grinning into the camera mid-ride, a canal path and the sun behind him.", pos: "50% 40%" },

  // —— Pass 25: the stockpile picks ——
  "phx-skyline": ph("phx-skyline", "l", "Paradise Valley, AZ · Apr 2026", "Downtown Phoenix seen from the hills to the north, mountains beyond it and green yards below.", "50% 40%"),
  "canal-sunrise": ph("canal-sunrise", "p", "Phoenix, AZ · Oct 2025", "The sun coming up over a canal path, seen over the handlebars.", "50% 50%"),
  "south-mountain": ph("south-mountain", "p", "Phoenix, AZ · Oct 2025", "A rider climbing a road on South Mountain, the valley and a far range of mountains behind.", "50% 60%"),
  "phx-canal": ph("phx-canal", "p", "Phoenix, AZ · Aug 2025", "Over the handlebars along a Phoenix canal path, storm clouds lit gold above the palms.", "50% 50%"),
  "pv-shadow": ph("pv-shadow", "p", "Paradise Valley, AZ · Jul 2026", "Robert’s shadow on the road with one hand up in a peace sign, the bars in front and a mountain ahead.", "50% 55%"),
  "pv-cloud-road": ph("pv-cloud-road", "p", "Paradise Valley, AZ · Apr 2026", "Over the bars down a quiet desert road under a sky full of small clouds, a saguaro by the road.", "50% 45%"),
  "flagstaff-dusk": ph("flagstaff-dusk", "l", "Flagstaff, AZ · Jul 2026", "Sunset over a mountain meadow outside Flagstaff, one pine standing in the grass.", "50% 55%"),
  "stanley-dock": ph("stanley-dock", "p", "Stanley, ID · Jun 2024", "A bike leaning at the end of a dock on a mountain lake, the Sawtooth peaks across the water.", "50% 55%"),
  "hood-from-air": ph("hood-from-air", "p", "Over Mount Hood, OR · Jul 2024", "Mount Hood from a plane window, snow on the peak and clouds below.", "50% 45%"),
  "pv-camelback-road": ph("pv-camelback-road", "l", "Paradise Valley, AZ · Feb 2026", "A quiet road curving toward Camelback Mountain, desert trees on both sides.", "50% 45%"),
  "pv-morning-road": ph("pv-morning-road", "p", "Paradise Valley, AZ · Sep 2025", "A desert road in the morning, two riders up ahead and a mountain behind them.", "50% 55%"),
  "pv-sunrise-bars": ph("pv-sunrise-bars", "p", "Paradise Valley, AZ · Sep 2025", "The sun coming up over the valley, seen past the handlebars at the top of a climb.", "50% 45%"),
  "pv-golden-climb": ph("pv-golden-climb", "l", "Paradise Valley, AZ · Nov 2025", "A desert ridge lit gold by the first sun, houses on the slope and the moon still up.", "50% 50%"),   // cropped above the riders coming up the road
  "pv-dusk": ph("pv-dusk", "p", "Paradise Valley, AZ · Aug 2025", "A cracked desert road topping out over the valley, a rider up ahead, the sky going orange at the horizon.", "50% 50%"),
  "camelback-sunrise": ph("camelback-sunrise", "l", "Paradise Valley, AZ · Nov 2025", "Camelback Mountain lit red at sunrise above a quiet street.", "50% 45%"),
  "riders-camelback": ph("riders-camelback", "p", "Paradise Valley, AZ · Sep 2025", "A few riders up the road ahead, a desert ridge and Camelback behind them.", "50% 50%"),
  "robert-camelback": ph("robert-camelback", "p", "Paradise Valley, AZ · Apr 2026", "Robert standing with his bike on a desert overlook in a yellow helmet, saguaros behind him.", "50% 35%"),
  "robert-desert": ph("robert-desert", "p", "Paradise Valley, AZ · Sep 2025", "Robert in a lavender jersey, standing with his bike on a desert road, a peace sign up, mountains behind.", "50% 40%"),
  "robert-peace": ph("robert-peace", "p", "Paradise Valley, AZ · Sep 2025", "Robert in a red helmet on a desert road with his bike, throwing a peace sign.", "50% 40%"),
  "robert-selfie-camelback": ph("robert-selfie-camelback", "l", "Paradise Valley, AZ · Oct 2025", "Robert mid-ride in a red helmet and purple jersey, Camelback Mountain behind him.", "60% 45%"),
  "sedona-road": ph("sedona-road", "l", "Sedona, AZ · Apr 2026", "A red rock butte outside Sedona under a clear sky, trees along its foot.", "50% 50%", [1280, 960]),   // cropped to the butte, above the traffic
  "gravel-pines": ph("gravel-pines", "p", "Bellemont, AZ · Apr 2026", "Looking over the bars down a dirt road through ponderosa pines.", "50% 55%"),
  "gravel-road": ph("gravel-road", "p", "Bellemont, AZ · Apr 2026", "A wide, rutted dirt road under a big sky, seen over the handlebars.", "50% 55%"),
  "encinitas-beach": ph("encinitas-beach", "p", "Encinitas, CA · Apr 2026", "A gravel bike leaning in the sand at Encinitas, the Pacific behind it.", "50% 55%"),
  "empty-road": ph("empty-road", "p", "Temecula, CA · Apr 2026", "A country road running out through dry grass toward low hills, two riders far up ahead.", "50% 50%"),
  "seattle-path": ph("seattle-path", "p", "Seattle, WA · Jul 2026", "A bike path curving under downtown Seattle’s towers.", "50% 50%"),
  "boise-river-path": ph("boise-river-path", "l", "Boise, ID · Sep 2024", "A paved path along the river below a canyon wall, early light.", "50% 50%"),
  "hills-road": ph("hills-road", "p", "Boise, ID · Jun 2025", "A two-lane road dropping through dry foothills under a gray sky.", "50% 55%"),
  "robert-boise": ph("robert-boise", "p", "Boise, ID · May 2025", "Robert standing with his bike on a bridge, sunglasses on, smiling.", "50% 35%"),
  "bike-wall": ph("bike-wall", "l", "Boise, ID · Jun 2025", "A green road bike against a white wall, the helmet hung on the bars.", "45% 60%"),
  "sawtooth-lake": ph("sawtooth-lake", "l", "Stanley, ID · Jun 2024", "A still mountain lake holding the pine slopes and the jagged Sawtooth peaks.", "50% 45%"),
  "sawtooth-road": ph("sawtooth-road", "l", "Stanley, ID · Jun 2024", "A two-lane road winding toward the snow-streaked Sawtooth Mountains.", "50% 50%"),
  "sawtooth-calm": ph("sawtooth-calm", "l", "Stanley, ID · Jun 2024", "A gravel path through tall pines under a blue sky, mountains in the distance.", "50% 55%"),
};

function figure(key, { cls = "", line = "", caption = true, eager = false } = {}) {
  const p = PHOTOS[key];
  if (!p) throw new Error(`scripts/photos.js: no photo called "${key}"`);
  const cap = caption ? (line || p.where || "") : "";
  return `<figure class="ph ph--${p.shape || "l"}${cls ? " " + cls : ""}"><img src="${p.src}" alt="${esc(p.alt)}" width="${p.w}" height="${p.h}" ${eager ? `fetchpriority="high"` : `loading="lazy"`} decoding="async"${p.pos ? ` style="object-position:${p.pos}"` : ""}>${cap ? `<figcaption>${esc(cap)}</figcaption>` : ""}</figure>`;
}

module.exports = { PHOTOS, figure };
