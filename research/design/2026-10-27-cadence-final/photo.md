# Photo desk — Cadence final pass, the homepage (Oct 27, 2026)

Read: Cadence 3 and 4, the critic, the brand gate's v9 read, `tools/hero-film.py`, the page at 390/1440, contact
sheets of `hero-wide-8.mp4` and his two clips (`scratchpad/pass/photo/wide-8-sheet.jpg`, `pe-*.jpg`). Only the
cleared ranges were looked at.

## 1. The hero film (Cadence 4)

**What's wrong.** The road (out 0–47) is the only true landscape, and his camera tilts up through it: the horizon
drops from source row ~850 (reel 247) to ~1060 (reel 294). With the fixed crop (rows 503–1417) the horizon starts
above the stencil and sinks into it, so the white gate pillar rides through the CYCLE|FOR gap around reel 258–266.
The tunnel (48–72) is the bars and the thighs cut by the header. The palms strip (73–111, rows ≥1030 only) is grass,
a kerb and a leg for 1.3 s: a third of the loop, the weakest footage on the page.

**Fix 1 — hold the road's horizon.** `crop_for()` gets a per-frame `y` for `road` (ffmpeg `crop` takes an
expression in `n`): the horizon at 33% of the panel, so the ridge clears the 64px header and the pillar's base stays
above the stencil at 1440, 1024 and 1920 (at 1366×768 it grazes the stencil's top by ~30px for 0.2 s). Measured
horizon, source rows: reel 247 → 850, 259 → 905, 270 → 990, 282 → 1010, 294 → 1060; `y0 = horizon − 300`,
interpolated (550 → 760). It cancels the slow tilt only; his bob and the shake stay: a crop, not an effect.
Fallback if the gate reads it as one: a static `road_w` region `(0, 580, 1080, 914)`, which halves the overlap.
Impact 4, effort 3.

**Fix 2 — the palms go, except the wheel.** Keep reel 322–336 (15 frames, 0.5 s: the warm road, the tire's
diagonal, the stem's shadow, no grass): `palms_t = ("hit", 10.74, 11.24, (0, 1030, 1080, 890))`, focus .5. Lane:
`road` 48 → `tunnel` 25 → `palms_t` 15 = **88 frames** (`L["wide"] = 88`; the tall panel is rail 54–141). Long,
medium, short, then the seam. Frame 0 stays the road beside his face. Option: split the road (`road_b` 271–294
first, `road_a` 247–270 last) so the tall panel's jump lands mid-road, one cut at a time. Impact 4, effort 2.

**Tunnel: keep focus .9.** The whole frame is his reel's best image (a silhouette against the exit), but it's a
face, and one face at a time is the gate's ruling. Any crop between the helmet and the bars reads as a headless
torso; the bar-mount crop reads as the bike.

**Tall panel: keep `rail_w` (250, 180, 830, 1660).** His face sits 33% across, 31% down: at 1440 x≈1178, y≈279
(gutter 1024–1030, Pause 1213–1344 × 804–852); at 1024×768 x≈903 (the panel shows to 1024; Pause 850–981 ×
672–720). Clear everywhere, no nav link on the gutter. Optional: `(250, 260, 830, 1660)` lifts his face to 27%,
the phone's framing.

Under the words after the fixes: asphalt behind the stencil, the ridge and the pillar above it; the tunnel's lit
floor; the warm road and the tire. The phone film stays: Robert central, the gate's 07:25 pass.

Files: `tools/hero-film.py`, a recut to `hero-wide-9.*` (the phone stays at 8: scratch `--out`, copy the wide
files), `scripts/build-home.js` paths, `tools/hero-contrast.py` must pass, CLAUDE.md §3 and §10.

## 2. Story and today (Cadence 3)

**#why at 1440.** Now two mediums (400px and 294px). One big, one small: `robert-boise` on columns 7–12 (≈614×768,
4:5), `pv-shadow` on columns 1–3 (≈288×360) under the plates, its bottom on the big one's bottom edge. The man, then
his shadow with the peace sign. CSS only (`.story-photos{display:contents}` at ≥1024, the figures on the parent
grid). Impact 3, effort 2. Optional: a square crop of the shadow for the small slot (rows 520–1400, x 100–980) so
the hand fills it; a `sq` crop beside `band` in `photos.js` + `grade.py`.

**#why at 390.** `robert-boise` full bleed alone is right; `pv-shadow` stays hidden.

**#today at 1440.** The film is a 230px thumbnail with two controls. Run it as a picture: 4:5 on columns 1–4
(≈392×490) under the words, its bottom on the photo's bottom edge, both captions on one line. One control: the round
play on the poster (Pause while playing); the `Play · 0:03` strip goes. The 4:3 photo stays the strong picture.
Impact 3, effort 2 (`home.css`, `todaySection()`, `home.js`).

**#today at 390.** Two full-width wall pictures back to back. Keep the photo full bleed; inset the film at 7 of 12
columns, right-aligned, 4:5 (≈210×262): two scales, two edges. The 120–160px gaps between label, sign, line and link
are the grid's `gap` on `display:contents` children (the type desk's). `photo2` stays off: three of one wall is too
many. Impact 3, effort 2.

**The film's caption.** It has none. `data/today.json`'s `film` gets `"where": "Phoenix · October"`: the same wall the
registry dates `Phoenix, AZ · Oct 2026` (`love-wall`), the same ride; `placeMonth()` renders it. Effort 1.

## 3. The rules

Every picture passes at 1:1 (`pe-home-photos.jpg`, `pe-zoom-*.jpg`): both hero films (the gate's read);
`robert-boise` Boise, ID · May 2025; `pv-shadow` Paradise Valley, AZ · Jul 2026 (a far figure on the road,
unrecognisable); `robert-desert` Paradise Valley, AZ · Sep 2025; `oct12-gravel-1` and `oct12-love-1` Phoenix · Oct
2026; the film poster, him alone. No vehicle anywhere, no grade, no wash, clean edges, AVIF/WebP beside each.

## For Robert

- The camera originals of the tunnel and palms ride: sharper, and the whole palms shot could come back.
- One landscape (3:2) of you riding, car-free, with place and month: the story has only portraits.
- Confirm the 3 s film is the LOVE wall, the same morning as the photo (its caption would say Phoenix · Oct 2026).
