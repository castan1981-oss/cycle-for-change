# Photo editor: studio pass 1, audit (Oct 21, 2026)

Branch `design/studio-pass-1`. Audit only: nothing in `cfc-site/`, `scripts/` or `tools/` was changed.

**The art director's ruling for this pass: photo edges go clean.** No mask fades. Edge to edge on phones, inset
exactly on the grid on desktop. No washed photo behind words. CLAUDE.md §3 ("Photo edges dissolve into the page")
gets rewritten in the build.

## How this was measured

- **Inventory.** Playwright served `cfc-site/` in-process (shoot.py's pattern) and read every `<img>`, `<video>` and
  CSS background on the 14 pages at 390 and 1440: the computed box, `currentSrc`, natural size, the mask on the img
  and on every ancestor, opacity and filter, the caption's text and x. Script and JSON:
  `scratchpad/photo/inventory.py`, `scratchpad/photo/inv.json`.
- **Sharpness.** Each source was downscaled and upscaled again and the RMS error measured, which gives its true
  resolution. A Laplacian variance pass scored the film posters against their own frames.
- **Grade.** The 1st, 50th and 99th luminance percentiles were measured on each original and on its served copy.
- **Rules.** Every photo on these pages, and every proposed crop, was zoomed to 1:1 to look for vehicles and faces.
- **Proof of the fix.** A scratch copy of six pages plus the homepage got the clean `.ph` block below and the new
  crops (ungraded, plain Lanczos), shot at 390, 820, 1024 and 1440: `scratchpad/photo/mock/` and
  `scratchpad/photo/after/`. Candidate crops are in `scratchpad/photo/crops/`. All of these sit under
  `/tmp/claude-0/-home-claude/065fb8a8-1db5-530f-9a75-ba4101ea1410/scratchpad/photo/`.

## What's wrong, in one paragraph

Every picture on the inner pages is masked: a 12% fade at the top, 14% at the foot, and on desktop 2.5% at each
side (`.ph img` in `/chrome.css:301–325`). The same block is in `/home.css:874–904`. Separately, the
`/guides/` hero fades 30% on its inner edge and 45% at its foot (`styles.css:16–28`). On top of the masks,
`tools/grade.py` gives every served photo the Pass 6 "high-key" grade:
- blacks lifted to 17–27% grey (the originals sit at 1–8%)
- +0.3 to +0.5 stop of exposure
- a 22% bone duotone

The grade is the "washed" read. The critic blamed the masks; the masks and the grade compound. On top of both,
four of the five portraits on these pages run at 460 px wide with ~800 px of bare concrete beside them, and two of
the three biggest pictures are soft. The hero behind `/rides/` is a 1024 px original pushed through EDSR to 2048;
measured detail falls from 43 to 8. The TSR film's poster is a frame whose true resolution is ~518×648 under an
864×1080 label; its sharpness scores 26 against 460 for a frame four seconds later in the same clip.

Before: `before-tiles/rides_az_phoenix@1440-02.png`, `before-tiles/find-a-ride@1440-02.png`. After (mock):
`scratchpad/photo/after/rides_az_phoenix@1440-ph0.png`, `find-a-ride@1440-ph0.png`, `guides@1440-ph0.png`,
`home@1440-first.png`.

## Inventory: every picture on the 14 pages

R = rendered box (CSS px). "Soft?" compares the true resolution of the file served at that width with the pixels
it fills at DPR 2. Edge = the treatment today. ✓ = passes the rule.

| Page | Picture (served file) | R @390 | R @1440 | Source → true res | Soft? | Edge today | Weight (AVIF / JPG) | Cars | Faces | Caption |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | hero `img/sign-print-4(-phone).avif` | 390×844, full bleed | 720×1077, right half | 1200×1600 (phone 960×1280), full res | **yes at 1440** (720 css = 1440 device px, file has 1200) | phone: scrim under the sign (OK, measured); desktop: **22% mask on the inner edge** (`home.css:1099`) | 135 / 453 KB (phone 97 KB) | ✓ | Robert only ✓ | none (hero) |
| `/` | `#today` lead `img/today/oct12-gravel-1.avif` | 390×390 | 691×642 | 1600×1200, crisp | no | **10–12% fade at the foot** (`home.css:1247`, `:1279`) | 229 KB | ✓ | Robert ✓ | "Phoenix · October" (one line for both; no year) |
| `/` | `#today` close `oct12-love-1.avif` | 390×219 | 1248×418 | 1600×899, crisp | slightly at 1440 (1248 css = 2496 device px) | 12% fade at the foot | 168 KB | ✓ | none | shares the line above |
| `/` | `#today` film `today-oct12-1` | 175×310 | 193×344 | 720×1280 | no | clean ✓ | 329 KB webm | ✓ | Robert ✓ | none |
| `/` | reel `road-film-2.mp4`, poster `.webp` | 357×447 | 503×629 | 864×1080, poster crisp (686) | no | clean ✓ (Robert asked for this) | poster 176 KB, film 4.1 MB on tap | ✓ (cars cut Oct 6) | ✓ | "Watch the last ride 0:12" |
| `/rides/` | `img/hero.avif` (key `crew`) | 390×293 | **1248×600** | crew.jpg 1024² → EDSR 2048² → 1600² | **yes, badly**: the 2x is invented detail, smeared (HF 43 → 8); at 1248 wide it blooms | top/foot fade + 2.5% sides | 95 / 242 KB | ✓ | **✗ two riders' faces, full on, front and centre.** The registry alt says "two riders" and names neither; nothing on record says the second rider gave an OK | **none: no place · month** (`crew` has no `where`) |
| `/rides/az/phoenix/` | `img/ph/phx-canal.avif` | 390×488 (4:5) | **460×575 beside ~800 px of nothing** | 1800×2400 | no | fades + sides | 86 KB | ✓ (a road behind the fence, no vehicle) | none ✓ | Phoenix, AZ · Aug 2025 ✓ (x 107 against a 96 edge) |
| `/rides/scottsdale…saturday-ride/` | film `tsr-1.mp4`, poster `film/tsr-1.jpg` | 390×488 | 440×550 | 864×1080 label, **true ~518×648** | **yes: the softest picture on the site** (sharpness 26) | clean ✓ | poster 55 KB; film 4.3 MB on tap | ride video, cars allowed; the poster frame has none | riders from behind ✓ | "From the ride, Oct 2026" (no place; data says "Scottsdale · Oct 2026") |
| `/rides/scottsdale…` | route map `routes/…/map-2026-10-10.jpg` | 355×555 | 465×726 | 1300×2032 | no | clean ✓ | 307 KB | map | — | OSM credit ✓ (drawn by route-build.py, not this desk's) |
| `/find-a-ride/` | `img/ph/robert-camelback.avif` | 390×488 | **460×575, alone** | 1800×2400 | no | fades + sides | 102 KB | ✓ | Robert ✓ | Paradise Valley, AZ · Apr 2026 ✓ (x 107) |
| `/events/2027/` | `img/ph/sawtooth-road.avif` | 390×293 | 820×410 | 2400×1800 | no | fades + sides | 203 KB | **✗ a camper trailer (and what looks like a person beside it) by the cabin, left of centre, in both crops** | small, far ✓ | Stanley, ID · Jun 2024 ✓ (x 116) |
| `/events/2027/riding/` | `img/ph/robert-peace.avif` | 390×488 | **460×575, alone** | 1800×2400 | no | fades + sides | 121 KB | ✓ | Robert ✓ | Paradise Valley, AZ · Sep 2025 ✓ (x 116) |
| `/events/seattle-to-portland/` | no photo (topo `tile-art` SVG at 40% opacity under the specs) | — | — | — | — | not a photo; **washed art under words** (`events.css:302–303`), see fix 11 | — | — | — | — |
| `/towns/arizona/phoenix/` | **no photo** | — | — | — | — | — | — | — | — | — |
| `/brief/` | none on load (the poster `<img>` is hidden until a ride is dropped) | — | — | — | — | — | — | — | — | — |
| `/guides/` | hero `img/haus-road.jpg` **behind/beside the h1** | 390×293 | 720×576 | 1600×1200 | no | **mask: 12% top, 55→100% foot on phones; 30% inner edge + 22% foot on desktop** | **314 KB JPG, no AVIF**, `fetchpriority=high` | ✓ | Robert ✓ | none |
| `/guides/` | cards `img/card-pv.jpg`, `card-south.jpg`, `card-journal.jpg` | 357×447 | 293×366 | 800×1000 copies of old duotones: card-pv true 800×1000; **card-south true ~400×500; card-journal ~2x upscale of a 768 px original** | **south and journal yes** | clean (`.fn-card figure`) ✓ | 150 / 62 / 75 KB, **JPG only, no AVIF** | **✗ card-journal: a white car parked down the street, right of centre** | none ✓ (card-south's only source is an old 800×1000 duotone with no color original and no place on record, so the "South Mountain at sunset" card can't be checked against its title) | none on cards |
| `/guides/bike-tire-pressure/` | none | — | — | — | — | — | — | — | — | — |
| `/cyclefor/` | none on load (the clip preview `<video>` stays hidden until a file is chosen) | — | — | — | — | — | — | — | — | — |
| `/resources/` | `img/ph/sawtooth-calm.avif` | 390×293 | 1248×600 | 2400×1800 → 1600 | slightly at 1440 (1600 file into 2496 device px) | fades + sides | 233 KB | ✓ (two small signs, no vehicle) | none ✓ | Stanley, ID · Jun 2024 ✓ |

**Also found (outside the 14, same system):**
- **`scripts/apply-photos.js` is broken.** Since the Oct 18 AVIF change, `figure()` writes
  `<figure …><picture><source…><img…>`, but apply-photos' regex wants `<figure class="ph ph--…"><img src=…>`. It
  matches **0 of the 16** figures on the hand pages, so nothing on guides, field notes or the 404 picks up registry
  changes any more. One-line fix (tested, matches 16/16):
  `/<figure class="ph ph--[pl]([^"]*)">(?:<picture>[\s\S]*?)?<img src="([^"]+)"[\s\S]*?<\/figure>/g`
- The `people` photo (`/img/people.jpg`, a finish line) shows a second man's face and a crowd. It's on 6 pages
  (`/rides/lgbtq/`, `/no-drop/`, `/beginner/`, `/women-trans-femme/`, `/rides/about/`, `/field-notes/`).
- **`south-mountain.jpg` shows a rider's face, front on** (white helmet, Hills Angels kit, a peace sign). The registry
  alt says "a rider" where every photo of Robert says "Robert", so it may be someone else. It runs on
  `/field-notes/south-mountain-climb/`.
- `crew` is on `/rides/` and `/rides/az/`.
- Leftover masks (each one goes): `nov7.css:6, :57`; `home.css` `.hero-media`, `.plane-fig`, `.card figure`,
  `.close figure` (none of these four are in today's homepage markup, so they're dead CSS); the `.today-ph` masks;
  `.sign--print .sign-ph`; `styles.css` `.fn-pillar-photo`; `rides.css:499` `.gr-head-art`, the hub's contour art
  in a radial fade.
- Captions are `font-family:var(--mono);font-size:.75rem` (12px). That's the right family now, but it's under the
  13px label size, and on desktop they're pushed 2.5% in (x 107/116) to sit under a faded edge that won't exist.
- `figure()` sets `loading="lazy"` on every photo. None of these photos is on a first screen, so that's right.
  The `/guides/` hero is eager with `fetchpriority=high`, also right.

## The plan

### A. The clean-edged `.ph`: exact CSS

Replace **`/chrome.css` lines 295–325** (from `/* —— Pass 25 (Oct 4, 2026): Robert's photos through the site ——`
to the closing `}` before `/* —— Pass 29`) and the identical block in **`/home.css` lines 874–904** with this. It was
tested in `scratchpad/photo/mock/` at 390, 820, 1024 and 1440. Captions land exactly on the column edge every time:
x 16 / 34 / 43 / 96.

```css
/* —— Robert's photos: one figure, a clean edge (studio pass 1, Oct 21, 2026) ——
   Robert: a feathered photo "looks unfinished"; worn textures "very sloppy". A photo keeps its own hard edge:
   edge to edge on phones, inset exactly on the grid on desktop. No mask, no fade, no wash, no frame, no shadow,
   nothing laid over it. `.ph` + its shape (`--p` portrait, `--l` landscape) + an optional desktop layout:
     --wide   a 2:1 band, the full width of its column
     --frame  3:2, the full width of a reading column
     --tall   4:5, five of the twelve columns, on the left edge (also where a lone --p lands)
   A portrait never runs as a lone 4:5 on a wide page: scripts/photos.js gives it a 2:1 desktop source
   (<picture> with media) and the builder adds --wide. Crops come from those sources, not from object-fit.
   The place · month line sits under the photo on the photo's own left edge. The same block is in /home.css. */
.ph{margin:clamp(40px,6vw,64px) 0;position:relative}
.ph picture{display:block}
.ph img{display:block;width:100%;height:auto;object-fit:cover;background:var(--bone-2)}
.ph figcaption{margin:8px 0 0;padding:0;font-size:13px;font-weight:700;line-height:1.3;letter-spacing:0;text-transform:none;color:var(--mute)}
.theme-dark .ph img{background:var(--tar)}
.theme-dark .ph figcaption{color:var(--dust)}
@media (max-width:899px){
  .ph{margin-inline:calc(-1 * var(--gut))}
  .ph figcaption{padding-inline:var(--gut)}
  .ph--p img,.ph--tall img{aspect-ratio:4/5}
  .ph--l img{aspect-ratio:4/3}
}
@media (min-width:600px) and (max-width:899px){
  .ph--wide img,.ph--frame img{aspect-ratio:3/2}       /* tablets take the desktop crop, a little taller */
}
@media (min-width:900px){
  .ph img{aspect-ratio:3/2}
  .ph--wide img{aspect-ratio:2/1}
  .ph--frame img{aspect-ratio:3/2}
  .ph--p:not(.ph--wide):not(.ph--frame) img,.ph--tall img{aspect-ratio:4/5}
  /* five of twelve grid columns, measured from the grid itself so it lands on a column line in any parent */
  .ph--p:not(.ph--wide):not(.ph--frame),.ph--tall{
    width:min(100%,calc((min(100vw,var(--maxw)) - 2 * var(--gut) - 11 * var(--col-gap,24px)) * 5 / 12 + 4 * var(--col-gap,24px)))}
}
```

Notes for the build:
- **`--col-gap`** is the grid gutter `type-layout` sets at the top of `/chrome.css` and `/home.css`. Until it exists,
  the 24px fallback lands `--tall` on 5/12 of the 1248 grid (≈ 500px). Re-check once the grid tokens land.
- **The vertical margin** `clamp(40px,6vw,64px)` sits on the spacing scale (40 → 64).
- **`--wide` and `--frame` fill whatever column they're in.** On the 820px calendar and town articles that's 820.
  When `type-layout` widens those templates, the photos follow with no change here.
- **Width-specific crops** go in through `<picture><source media="(min-width:600px)" srcset="…-w.avif" type="image/avif">`.
  `figure()` gains a `wide` key per registry entry; see C.

Then remove every other mask on a photo:
1. **`styles.css:15–28`, the `/guides/` and `/field-notes/phoenix/` hero.** Replace the
   `.fn-pillar-head--photo` / `.fn-pillar-photo` block with the one below (tested). Phones: edge to edge above the
   words, no overlap, no fade. Desktop: the right half, to the screen edge, full strength, a hard inner edge on the
   concrete. The h1 never sits on the picture, so no scrim is needed.
   ```css
   .fn-pillar-head--photo{position:relative;isolation:isolate;background:var(--bone);overflow:hidden;padding-top:0}
   .fn-pillar-photo{margin:0 0 clamp(24px,5vw,40px);aspect-ratio:4/3;overflow:hidden;background:var(--bone-2)}
   .fn-pillar-photo img{width:100%;height:100%;object-fit:cover;object-position:50% 40%;display:block}
   @media (min-width:900px){
     .fn-pillar-head--photo{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;padding:0}
     .fn-pillar-head--photo .wrap{grid-column:1;grid-row:1;padding-block:clamp(48px,7vw,88px) clamp(40px,5vw,64px);max-width:none;padding-inline:max(var(--gut),calc((100vw - var(--maxw)) / 2 + var(--gut))) clamp(24px,4vw,64px)}
     .fn-pillar-photo{grid-column:2;grid-row:1;margin:0;aspect-ratio:auto;min-height:clamp(440px,40vw,600px);align-self:stretch}
   }
   ```
2. **`home.css:1099`.** `.sign--print .sign-ph`: drop both `mask-image` declarations. The photo meets the tar on a
   hard vertical line at x 720, exactly half the screen. Tested: it reads as a cover, not a seam.
   (`.sign-scrim` on phones stays. That's the measured flat scrim, words over a full-strength photo, which the rule
   allows.)
3. **`home.css:1247` and `:1279`.** `.today-ph img` and `.today-ph--lead img`: drop the masks. Tested; the lead photo
   now ends on the same line as the film and the ask tile.
4. **`home.css:276–371, 548–565, 688–722`.** `.hero-media`, `.hero-film`, `.plane-fig`, `.card figure`,
   `.close figure` are in no live markup (0 hits in `index.html`). Delete them, so nobody revives a fade from them.
5. **`nov7/nov7.css:6, :57`.** `.rp-ph img`: drop the masks (same rule, same reasons).
6. **`rides/rides.css:499`.** `.gr-head-art` is drawn contour art at .32 opacity in a radial fade, behind the h1.
   It's not a photo, but it is a fade under words. It's `graphics-maps`' call; flagged.
7. **`events/events.css:257, 302–303`.** The topo `tile-art` at .4 under the STP poster's 12px rose text is the
   critic's "contour lines through the address". It's not a photo, so it's `graphics-maps`' and `type-layout`'s
   call; noted here only because "no washed picture behind words" covers it in spirit.

### B. The grade: stop washing the photos

The Pass 6 grade predates Pass 32 ("clear, crisp, ungraded" hero) and is the other half of "washed". **Recommendation:
serve the registry photos ungraded.** That means a plain Lanczos resize, a light unsharp (0.6 px, 35%), q76, and
AVIF q52 + WebP q78. Concretely: `PASS25_LOOK` in `tools/grade.py` gets a `'clean'` entry that skips `grade()`, and
every Pass 25 key moves to it. Then regrade with `--all --only <keys>` and bump every served filename (`-2`).

The side-by-side is `scratchpad/photo/grade-vs-clean.jpg`. On sawtooth-calm, phx-canal and robert-camelback the
clean versions read as the same place in better light. On haus-road the grade had blown the sky to cream.

The STUDIO rule is "a grade that changes his skin" is banned; the duotone does exactly that (it pulls skin toward
bone). The art director should confirm this, because it changes the look of ~33 photos at once. It's inside the
frozen identity: no new color, no filter, it removes one.

### C. Which pictures get bigger, smaller, moved or dropped

The direction everywhere: **big and few.** One photo per page on these templates, and on desktop never a 460px
portrait alone. Every desktop crop below is made from a photo already in the repo; each was checked at 1:1 for
cars and faces.

| # | Page | Today | Plan | Crops (files in `scratchpad/photo/crops/`) |
|---|---|---|---|---|
| C1 | `/rides/az/phoenix/` | phx-canal 460×575 beside ~800px of concrete | **`--wide`: 1248×624 at 1440, edge to edge 4:5 on phones.** Same spot (after the picks, before the town guide), never the first thing on a phone ✓ | `phx-canal-w21` (1800×900, rows 540–1440: the canal, the path, the storm sky, no bars) for ≥600; the full 4:5 on phones keeps the bars |
| C2 | `/find-a-ride/` | robert-camelback 460×575, alone | **`--wide` at 1248×624**, helmet to hip | `robert-camelback-w21` (rows 640–1540). Tested at 820/1024/1440: face in the upper third, cactus right, Mummy Mountain left, no sky slab |
| C3 | `/events/2027/riding/` | robert-peace 460×575, alone in the 820 column | **`--frame` 820×547** (fills the column) | `robert-peace-w` (3:2, rows 420–1620: helmet to bike, peace sign, the ridge). A 2:1 was tried and rejected: in an 820 column it leaves him small under a slab of sky, cut at the chest |
| C4 | `/rides/` | `crew` (soft, a second rider's face with no OK on record, no caption) at 1248×600 | **Replace with `riders-camelback`** (four riders from behind under Camelback, Paradise Valley · Sep 2025): `--wide`. Then **drop `crew` from `/rides/az/` too**, using `pv-camelback-road` or `phx-skyline` there | `riders-camelback-w` (2:1) desktop, `riders-camelback-p43` (4:3) phones |
| C5 | `/events/2027/` | sawtooth-road, trailer in frame | **Swap to `empty-road`** (Temecula, CA · Apr 2026: a country road, two riders tiny and far), same `--wide`. Or crop sawtooth-road right of x 900 (no trailer), but that loses the peaks over the road | `empty-road-w21` (1800×900), `empty-road-43` |
| C6 | `/resources/` | sawtooth-calm, 1248×600 at the foot | **Keep, clean edge.** It's the one quiet landscape and it's in the right place, after the content and not behind the crisis line. Make the desktop source the full 2400 original, not the 1600 copy, so it's crisp at 2x | `sawtooth-calm-w` (2400×1200) |
| C7 | `/guides/` hero | haus-road, masked, graded, 314 KB JPG, no AVIF | **Keep the picture, clean** (A.1), ungraded, plus AVIF/WebP siblings (`haus-road-2.avif`). It's Robert grinning mid-ride, and the guides should open on him | `haus-road-clear` (1600×1200, the original as is) |
| C8 | `/guides/` "From the road" cards | card-pv 150 KB, card-south ~400px true res, card-journal 2x upscale with a parked car | **Rebuild all three from the registry originals**, ungraded 4:5 + AVIF. `card-pv` → `pv-shadow`. `card-south` → **`south-mountain` cropped left of the rider** (the climb's view with no face; registered as Phoenix, AZ · Oct 2025, South Mountain), so the South Mountain card shows a photo whose place is on record. `card-journal` → the left 4:5 of `img/today/oct12-love-1.jpg` (Robert's bike at the LOVE wall, no car). Same three on `/field-notes/` and `/journal/` | `card-pv-4x5`, `south-mountain-4x5-norider` (860×1075), `card-journal-love-4x5` (719×899) |
| C9 | TSR ride page | poster `tsr-1.jpg` (true ~518px, the softest picture on the site) | **New poster: the frame at 3.9 s** (the line along the bike lane at sunrise, riders from behind, no car), 864×1080, WebP 90 KB / JPG 146 KB. Bump to `tsr-1b.jpg`/`.webp`; `data/ride-films.json` poster → it. The film stays | `tsr-1-poster-cand.jpg/.webp` |
| C10 | `/towns/arizona/phoenix/` | no picture at all; a 365px strip of text with the right half empty | **Add one.** `phx-skyline` (Paradise Valley, AZ · Apr 2026, downtown and the South Mountain range behind; checked at 1:1, no cars) as a `--wide` band after the tiles, so the town guide finally looks like the town. `TOWN_PHOTO["phoenix-az"] = "phx-skyline"` in build-events.js. It's already the `/field-notes/phoenix/` hero, so also fix that hero's edge (A.1) | `phx-skyline-w` (2400×1200) |
| C11 | Home hero desktop | 720×1077 from a 1200×1600 file | Clean edge (A.2). It's still soft at 2x; it needs Robert's full-resolution export (For Robert, 1) | — |
| C12 | Home `#today` | masks at the foot | Clean (A.3). Nothing else; the band works | — |
| C13 | `/rides/lgbtq/`, `/no-drop/`, `/beginner/`, `/women-trans-femme/`, `/rides/about/`, `/field-notes/` | `people` (a second man's face, a crowd) | **Replace with `riders-camelback`** (riders from behind) until Robert clears `people` | as C4 |
| C14 | `/field-notes/south-mountain-climb/` | `south-mountain` (another rider's face) | Use the no-rider crop as the figure, or ask Robert (For Robert, 4) | `south-mountain-4x5-norider` |

**Registry change for C1–C4 (`scripts/photos.js`).**
1. `ph()` gains an optional `wide` (the desktop crop's file) and an `avif`/`webp` pair for it.
2. `figure()` writes `<source media="(min-width:600px)" type="image/avif" srcset="/img/ph/<key>-w.avif">` +
   `<source media="(min-width:600px)" srcset="/img/ph/<key>-w.jpg">` before the phone sources.
3. `figure()` adds `ph--wide` automatically for a `--p` photo that has a `wide`.
4. `tools/grade.py` MANIFEST gains `(img/ph/<key>-w.jpg, photos/<key>.jpg, dict(crop='2:1', focus=(.5, fy)))`
   lines. It already supports `crop` and `focus`; the `fy` values are the row offsets given above.

Keep `width`/`height` on the `<img>` as the phone shape. The `aspect-ratio` in CSS holds the box at every width,
so nothing jumps (CLS stays 0).

### D. Captions

- **One edge.** Captions sit on the photo's left edge (the CSS above). Today they're at x 107/116 against a 96 edge.
- **Place and month, always.** `crew` and `people` have no `where`. Retiring them (C4, C13) closes that.
- **TSR film.** The caption reads "From the ride, Oct 2026"; the data says "Scottsdale · Oct 2026". The
  `.split(" · ").pop()` in build-rides.js:2213 drops the place. Use the whole line: "From the ride, Scottsdale ·
  Oct 2026".
- **Homepage `#today`.** "Phoenix · October" has no year, and it sits once, at the foot of the section, under
  neither photo (at 1440 it's ~500px below the lead photo). Move it directly under the lead photo, and make it
  "Phoenix · Oct 2026" from `data/today.json`. The date is already in the eyebrow, so this is the house format, not
  new copy.

## Fixes, ranked (impact 1–5, effort 1–5)

| Rank | Fix | Impact | Effort | Owner |
|---|---|---|---|---|
| 1 | Clean `.ph` block in `/chrome.css` + `/home.css` (A); all photo masks gone (A.1–A.5) | 5 | 1 | photo-editor |
| 2 | Portraits stop standing alone on desktop: art-directed 2:1 / 3:2 sources for phx-canal, robert-camelback, robert-peace (C1–C3; registry `wide` + grade.py crops) | 5 | 3 | photo-editor |
| 3 | Stop washing them: ungraded registry photos, files bumped to `-2` (B) | 4 | 2 | photo-editor + art-director sign-off |
| 4 | Rule breaks: `crew` off `/rides/` + `/rides/az/` → riders-camelback; `people` off 6 pages; sawtooth-road (trailer) off `/events/2027/` → empty-road; card-journal (car) rebuilt (C4, C5, C8, C13) | 5 | 2 | photo-editor |
| 5 | `/guides/` hero clean and full strength, with AVIF/WebP (A.1, C7) | 4 | 1 | photo-editor |
| 6 | TSR poster: the 3.9 s frame instead of the 518px-true frame (C9) | 4 | 1 | photo-editor |
| 7 | Fix `apply-photos.js` regex (0/16 → 16/16) so hand pages take any of the above | 4 | 1 | photo-editor |
| 8 | Captions on the photo's edge, 13px/700, place and month everywhere, TSR film place restored, `#today` line under its photo (D) | 3 | 1 | photo-editor |
| 9 | Phoenix town guide gets phx-skyline `--wide` (C10) | 3 | 1 | photo-editor (+ type-layout for the two-column page) |
| 10 | Guide/field-note cards rebuilt from the registry: crisp, true to the place, AVIF (C8) | 3 | 2 | photo-editor |
| 11 | Homepage hero inner edge and `#today` masks off (A.2, A.3) | 3 | 1 | photo-editor; the critic said this first screen must survive, so check `home@1440-first` before/after |
| 12 | Dead hero/plane/card/close CSS deleted from home.css (A.4) | 1 | 1 | design-system |
| 13 | `/resources/` sawtooth-calm desktop source from the 2400 original (C6) | 2 | 1 | photo-editor |

Weight: the plan is roughly neutral. Wide AVIFs are ~100–190 KB each, against today's 86–121 KB portraits. They
replace them on desktop only (phones keep the 4:5 file), and the `/guides/` hero drops from 314 KB JPG to an AVIF of
~150 KB.

## For Robert: pictures the site needs and doesn't have

1. **A full-resolution export of the canal-path hero** (the original iPhone file behind `sign-print-4.jpg`). Today
   it's 1200×1600 filling 1440×2154 device pixels on a desktop retina screen. Every page: `/`.
2. **A landscape of you riding in Phoenix, shot wide (3:2 or 16:9).** Every photo of you we have is portrait. The
   desktop crops above work, but each one cuts you at the hip. Pages: `/find-a-ride/`, `/events/2027/riding/`,
   `/rides/az/phoenix/`, the Phoenix town guide.
3. **Your OK, or a no, on two group photos that show other people's faces.**
   - `crew`: the sunset stop with the rider in the Hills Angels jersey. It's on `/rides/` and `/rides/az/`; I'm
     taking it off until you say.
   - `people`: the finish line with a second rider and the crowd. It's on six pages.
   - With OKs these can stay. `crew`'s original is only 1024 px, though, so even with the OK it needs your full-size
     file to run big.
4. **The South Mountain climb photo shows a rider's face, front on** (the one on
   `/field-notes/south-mountain-climb/`). Is that you? If it's someone else, did they say yes? If not, I'll run the
   view-only crop.
5. **TSR, Oct 10: a still from your phone** (not the video), the group in a line at sunrise, from behind. The ride
   page would open on it at full resolution instead of a video frame. Same for every future ride write-up: one
   still per ride.
6. **One photo per 2027 ride you're doing, from last year or the route.** Palm Springs, LA → Ojai, SF, Seattle →
   Portland. The riding page and each event page (STP has none) need a picture of the place. The registry only has
   Seattle's bike path and Idaho.
7. **Phoenix town guide:** South Mountain at dawn and a McDowell loop, landscape. The guide's own subtitle names
   them and we have neither. `/towns/arizona/phoenix/`.
8. **A photo for the guides' "Get ready" stage:** your bike, a tire, a pump, close up, landscape. The ten tire and
   wheel guides have no picture at all. `/guides/bike-tire-pressure/` and its nine siblings.

## Rules check on everything proposed

- **No car, truck or van.** Checked at 1:1:
  - phx-canal-w21: the road behind the fence is empty.
  - robert-camelback-w21, robert-peace-w, riders-camelback-w/p43, empty-road-w21, sawtooth-calm-w, phx-skyline-w,
    pv-shadow 4:5, south-mountain no-rider 4:5, the love-wall 4:5, the TSR 3.9 s frame: none.
  - Rejected: sawtooth-road (trailer), card-journal (car).
- **Only Robert recognisable.**
  - riders-camelback and the TSR frame are riders from behind; empty-road's two riders are ~10 px tall.
  - Rejected for now: crew, people, south-mountain-with-rider.
- **Captions** come from `scripts/photos.js` only. The two new placements (riders-camelback, empty-road,
  phx-skyline) already have their place · month there. Nothing is guessed.
- **AVIF/WebP beside every JPG**, file numbers bumped (`-2`, `tsr-1b`), Safari and phones cache hard.
- No grain, no duotone (B removes one), no AI-extended image. Every crop is a plain crop of his own file.
