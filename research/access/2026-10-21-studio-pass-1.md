# Access and speed — studio pass 1 (design/studio-pass-1 at 25f0412 vs main at a488656)

The gate's own sweep ran to completion on 83c77f2 before the container restarted (Oct 21, 19:56); the shift and
weight run was rerun on Oct 22 against the fixes below, and the before tree at a488656. Scripts and raw results:
`scratchpad/access/scripts/`, `final/`. Checked with headless Chromium (Playwright), an in-process server, every
request off localhost aborted, the tally fed from `data/tally.json`.

## Sizes and pages
390×844 · 375×667 · 360×640 · 430×932 · 820×1180 · 1024×768 · 1440×900, plus the homepage at 1366×768 and `/nov7/`
at 375×548. Pages: the critic's 14, `/tonight/`, `/rides/lgbtq/`, `/field-notes/`, `/events/2027/april/`,
`/towns/arizona/phoenix/coffee/`, `/towns/arizona/phoenix/routes/`, `/resources/teens/`, `/404.html`, `/nov7/`.

## Result: pass, after four fixes (4ab1676)

| check | result |
|---|---|
| Horizontal scroll | **0** of 23 pages × 9 sizes (nothing wider than the viewport; the skip link is the only off-screen element, by design) |
| Text under 12px | **0** outside the US map's state codes (8.8px SVG text on `/rides/`, 46 states — predates the pass; the same states are 44px buttons in "Every state, as a list") |
| Small rose text under 4.5:1 | **0** |
| axe color-contrast | 3 before, 3 after, **0 new**. Two fixed in 4ab1676: the ride-report form's helper text on the rose field (plaster at 80% opacity, 3.59:1 → 4.68:1) and `/tonight/`'s evening note (gunmetal on bruise, 2.05:1 → patina, 8.7:1). Left: none. |
| axe nested-interactive | 13 → **3** (the two SVG maps and `/brief/`'s drop zone carry focusable children on purpose; predates the pass) |
| Tap targets < 44px (phone, non-inline) | 184 → **120** across the 23 pages; 67 fixed by the pass, 3 new → all 3 fixed in 4ab1676 (footer Privacy 43→47px wide; the "I rode it" and review chips get a 44px hit area; the one new map state is the map, below). What's left predates the pass: the US map's states, the town map's SVG label links (15px tall; the same towns are 44px buttons under the map), `h3` link rows on place cards (26–29px, inside 44px+ cards), breadcrumb words 35–41px wide. |
| Visible focus | **4,208 Tab and menu stops, every one draws a ring**, none focuses off-screen. Weak-ring readings 94 → 64 by the pixel sampler; the 49 "new" ones were checked by screenshot and are sampler misses (wrapped links, round play buttons, the drop zone): each draws a solid 2px ring at 3:1 or better. `/brief/`'s hidden file input is not in the Tab order; Tab lands on the drop zone (`role=button`), which rings. |
| Labels on every field | pass (axe `label` rule: 0 violations) |
| Reduced motion | **0 violations** on 46 page-sizes: no animation, no SMIL, no autoplay with `prefers-reduced-motion: reduce` |
| Film on phones | **0** autoplay; every film sits on its poster, paused, until tapped (30 records) |
| Layout shift at load | **0** on 49 of 50 page-sizes; `/field-notes/`, the TSR page and the Phoenix hub read 0.0007–0.0012 (a 19px icon settling, under the 0.1 threshold by two orders). After a scroll-through: the homepage at 1440 reads 0.11 from the reel's "12 s" length label painting in — **identical before the pass (0.116)**, not a regression, noted for pass 2. `/tonight/` 0.117 → 0; `/towns/…/routes/` 0.015 → 0; `/brief/` 0.003 → 0. The Ride with me landing (`/events/2027/riding/#…`) is 0 in 8 of 8 loads at 390 and 1440 (fixed in a556f88). |
| `width`/`height` + `alt` on images | pass; 18 "empty alt" flags are the town art SVGs, decorative, `alt=""` on purpose |
| `/resources/` crisis line | 988 and the Trevor line on the first screen at 375×667 and 360×640 without a tap; above the 988 bar at 390×844 |
| `/nov7/` at 375×548 | all four buttons on screen |
| Homepage at 1366×768 | the finder tiles' bottom edge 952 → 725, on the first screen |

## Weight (first load, offline, bytes over the wire, uncompressed static server)

| page | size | before | after | change | why |
|---|---|---|---|---|---|
| `/` | 390 | 922 KB | 932 KB | +1% | — |
| `/` | 1440 | 959 KB | 970 KB | +1% | — |
| `/rides/` | 390 | 525 KB | 623 KB | +19% | `crew` (soft, a second face) → `riders-camelback`, sharper (121 → 177 KB); CSS +40 KB (the system block in rides.css) |
| `/rides/` | 1440 | 525 KB | 621 KB | +18% | same |
| TSR ride page | 390 | 809 KB | 866 KB | +7% | the sharper `tsr-1b` poster; CSS |
| TSR ride page | 1440 | 809 KB | 866 KB | +7% | same |
| `/towns/arizona/phoenix/` | 390 | 234 KB | 527 KB | +125% | **the page had no photo; it has one now** (`phx-skyline`, 256 KB AVIF, lazy, below the first screen); CSS +35 KB |
| `/towns/arizona/phoenix/` | 1440 | 234 KB | 569 KB | +143% | same, the 2:1 band crop (297 KB) |
| `/guides/` | 390 | 447 KB | 330 KB | −26% | the hero JPG replaced by AVIF/WebP |
| `/guides/` | 1440 | 735 KB | 619 KB | −16% | same |

Two pages crossed +15%, both because a picture was added or sharpened, both lazy-loaded below the first screen,
so first paint is unchanged. **For pass 2:** `phx-skyline` is a dense scene that AVIF compresses poorly at the house
q52 (256 KB at 1600px; q40 would be 152 KB at a look worth checking) — a per-image quality in `tools/grade.py` would
earn 100 KB on the Phoenix guide. The CSS growth (chrome.css 51 KB, rides.css 75 KB, events.css 45 KB) is the
system block landing in every sheet; the dead-class cleanup the design-system desk listed (132 classes) is the way
back down.

## Fixes made by this gate (4ab1676, CSS_V 47 in 25f0412)
- `events/events.css`: `.dir-report-form .lab small` full opacity (4.68:1 on the rose field).
- `tonight/tonight.css`: `#evenings .fine` patina on bruise (8.7:1).
- `chrome.css`: `.foot-trust a` 2px side padding → Privacy 47×46.
- `rides/rides.css`: `.gr-tags .gr-tag-rev::before` 44px hit area on the 32px chip.

## Not fixed, on purpose (predate the pass; pass 2 candidates)
- The US map's 8.8px state codes and sub-44px state shapes on `/rides/` (the list under it is the accessible path).
- The town map's SVG label links (15px tall) on city hubs (the same towns are 44px buttons under the map).
- `h3` link rows inside place cards (26–29px line boxes inside 44px+ cards) — the card is the target; the link could
  take the card's hit area.
- The homepage reel's "12 s" label (0.11 shift when the reel scrolls in, before and after).
