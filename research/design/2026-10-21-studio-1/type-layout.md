# Type and layout: audit and proposal (studio pass 1, Oct 21, 2026)

This is type-layout's audit step. It changes no site files. Everything below was measured with Playwright
against `cfc-site/` served in-process, at 390, 1024 and 1440. The proposal was then tested by serving each
sheet with its block appended to its end, which is how it would ship, across 24 pages × 3 widths.

- **Scripts:** `/tmp/claude-0/-home-claude/065fb8a8-1db5-530f-9a75-ba4101ea1410/scratchpad/type/`
  - `measure.py`, `measure2.py`: type, measure, gaps, caps, grids
  - `trial2.py`: the as-shipped test
  - `hometest.py`: homepage first-screen pixel diff
  - `rhythm.py`, `share.py`: ride-page gaps, share of text under 13px
- **The CSS as files, one per sheet:** `…/scratchpad/type/split/*.add.css`
- **After shots:** `…/scratchpad/type/shipped/<page>@<width>-first.png` and `-full.png`
- **Before shots:** the critic's, in `…/scratchpad/before/` and `before-tiles/`

**Test result, as shipped:**
- 72 renders: no horizontal scroll and no rendered text under 12px at any width.
- At 1440, every inner page now reaches the 1344 grid edge. Before, the right edge was x 916 on events,
  towns, calendar and the brief, and 1040 on the guide.
- 1440 page heights drop 2–32%. Reference and ride pages are the exception at +2–7%, from the bigger body
  size and real section air.
- Phone pages grow 1–5%.
- The homepage first screen is pixel-identical at 390×844, 375×667 and 1440×900.

**One cascade rule for whoever builds it:** each block goes at the **end** of its sheet. I also tested
inserting the blocks right after `/chrome.css`. The Pass 22/29 blocks and the section sheets then win, and
crumbs, labels, ledes and the slab change back.

---

## 1. Type scale: measured vs proposed

### Measured (computed px at 390 / 1440)

| Role | Now | Where it comes from | Problem |
|---|---|---|---|
| h1 | 44 / 84, 800, lh .94 | `chrome.css:73` | Fine. `home.css .h1` (44/76) has no markup left. |
| h2 (section) | 25.6 / 38.4, 800 | `chrome.css:74` | Too close to h3 on a phone (1.23×). Margins are in `em` (`events.css:8` `2em` = 77px at 1440). |
| h2 used as a label | 12 / 700 | `.gr-filter-label`, `.cal-q`, `.fn-related h2` | Under the 13px label rule. |
| h3 | 20.8 / 27.2, 800 (700 on directory pages, `events.css:9`) | `chrome.css:75` | OK |
| h4 | 17.6 fixed | `chrome.css:76` | Same size as body. No step. |
| lede | 18.7 / 23.2, 34ch | `chrome.css:78` | Seven variants: `.gr-sub` 16, `.cal-sub` 16, `.town .lede` 16.8, `.fn-pillar-intro` 19.2, `.tagline` 20, `.cf-lede` 18.3/22.4. The Phoenix lede is 16.8px in a 366px strip. |
| body | 17 fixed, lh 1.5 | `chrome.css:53` | `.fn-body p` 17.3/1.7. Facts `dd` 15.7. Rows 15–17. |
| small / meta | 13.6, 14, 14.4, 15.2 (four values) | `.85rem`, `.9rem`, `.95rem` across sheets | No single meta size. |
| label | **12px / 400** almost everywhere (crumbs, `dt`, `.gr-*` mono lines, chips, tile counts, captions); `.eyebrow` alone is 13/700 | 12px or `.75rem` is declared 190 times: chrome 11, home 38, styles 19, rides 49, events 34, calendar 29, brief 10 | The rule is 13/700. In practice 12/400 is the house label. |
| button | 13 / 800 / .04em caps | `chrome.css:335`, `home.css:1070` | ✓ But `.gr-btn` (ride buttons, "All 46 rides") is a second system at **12/700 sentence case**. Design-system's call. |
| link | 15 / 700 | ✓ | |
| under 12px, live | `.gr-clear` 11px (`rides.css:78`); brief `.bf-wx-temp small`, `.bf-wx-wind`, `.bf-climb-nums dt/dd small` 11px (`brief.css:89–106`); footnote `sup` 11.9px | | The 11px rules in `home.css` (391, 439, 510, 624) don't render. Route mile numbers are 10px in a scaled SVG, so they render about 13px. |

Distinct font sizes per page: 10–29 (the TSR ride page has 29).

Share of visible text under 13px at 1440:

| Page | Under 13px |
|---|---|
| `/towns/arizona/phoenix/` | **40%** |
| `/rides/` | **35%** |
| `/events/2027/` | **32%** |
| `/find-a-ride/` | 27% |
| `/rides/az/phoenix/` | 26% |

That's the "words on a page" grey. Most of it is 12px mono-weight label text.

### Proposed (one scale, in `/chrome.css` and `/home.css`, identical `:root`)

The ratio is about 1.15 on a phone and 1.25 at 1440. Weight carries the contrast: 800 display, 400 body,
700 labels.

| Token | 390 → 1440 | clamp() |
|---|---|---|
| `--fs-h1` | 44 → 86 | `clamp(2.75rem, 1.775rem + 4vw, 5.375rem)` |
| `--fs-display` (home `.h2`, unchanged) | 36 → 68 | `clamp(2.25rem, 1.507rem + 3.048vw, 4.25rem)` |
| `--fs-h2` | 27 → 44 | `clamp(1.6875rem, 1.293rem + 1.619vw, 2.75rem)` |
| `--fs-h3` | 21 → 28 | `clamp(1.3125rem, 1.15rem + .667vw, 1.75rem)` |
| `--fs-lede` | 20 → 24 | `clamp(1.25rem, 1.157rem + .381vw, 1.5rem)` |
| `--fs-h4` | 18 → 22 | `clamp(1.125rem, 1.032rem + .381vw, 1.375rem)` |
| `--fs-intro` (long ledes: town, event) | 18 → 20 | `clamp(1.125rem, 1.079rem + .19vw, 1.25rem)` |
| `--fs-body` | 17 → 18, lh 1.55 | `clamp(1.0625rem, 1.039rem + .095vw, 1.125rem)` |
| `--fs-small` (meta, captions, back links) | 14 → 15 | `clamp(.875rem, .852rem + .095vw, .9375rem)` |
| `--fs-label` (labels, counts, chips) | 13, 700 for labels, sentence case, gunmetal | `.8125rem` |
| button | 13 / 800 / .04em caps | unchanged |

Line height:
- Display: h1 .94, h2 1.0, h3 1.08, h4 1.15.
- Lede 1.4, intro 1.5, body 1.55.

Share of text under 13px at 1440 after the change:

| Page | Before | After |
|---|---|---|
| `/rides/` | 35% | **7%** |
| `/rides/az/phoenix/` | 26% | **3%** |
| `/events/2027/` | 32% | **2%** |
| `/guides/` | 13% | **2%** |
| `/find-a-ride/` | 27% | 11% |

The town page still counts 38%. That's the source URLs inside the closed "Sources" fold, which the counter
includes. They are small print by intent.

---

## 2. Spacing scale: tokens, and where it drifts today

```
--s1:8px  --s2:16px  --s3:24px  --s4:40px  --s5:64px  --s6:104px  --s7:168px
--top:   clamp(24px, 9.14px + 3.81vw, 64px)     tally line → breadcrumb, every inner page
--gap:   clamp(40px, 31.09px + 2.286vw, 64px)   between groups inside a section
--sec:   clamp(64px, 49.14px + 3.81vw, 104px)   between sections
--band:  clamp(64px, 25.37px + 9.905vw, 168px)  a colour band's padding (homepage .s)
--col-gap: clamp(16px, 13.03px + .762vw, 24px)  the 12-column gutter
```

| Drift | Measured now (1440 unless noted) | Becomes |
|---|---|---|
| **Page top** (tally line to crumbs) | Hubs **6px** (`.gr-head{padding-top:6px}`, `rides.css:7`); `main.wrap` pages 80 (`chrome.css:219`); `/rides/` 64; guide 38. The h1 lands at y 149 / 223 / 236 / 141 depending on page type. | `--top`: crumbs at y 168 (1440) / 127 (390) on every inner page. |
| **Section gap** | Event page: 77 (h2 `2em`), 43 (town box), 48 (folds, `clamp(28px,5vw,48px)`), 72 (`.ph` margin). Town page: 77/48/22. | `--sec` (104) between every section in the reading column; h2 margin `0 0 --s2`. |
| **Ride page siblings** | **11 different gaps**: 8, 11, 14, 20, 22, 24, 26, 30, 34, 46, 51 (390); up to 77 (1440). | **3**: 16 (a line that belongs to the block above), 24 (inside a group), 40/64 (`--gap`, between sections). |
| **Hub steps** | `.gr-steps` gap 48, but photos add `clamp(36px,6vw,72px)` both sides, so 120–144 around a photo. | `--gap` everywhere; row gap `--s5` in the desktop grid. |
| **`--sec` itself** | chrome `clamp(64px,9vw,128px)` = 128 at 1440; home `clamp(76px,9.5vw,152px)` = 137; home phones 60. Three values. | One `--sec` 64→104. The homepage bands use `--band` (164 at 1440; phones `--s5` 64). This is the one change that makes home 8% taller at 1440. Keep `--sec` on `.s` if the art director wants it shorter. |
| **The sliver** | `.foot{margin-top:var(--sec)}` leaves 64/128px of concrete between the slab and the footer. | 0 when the page ends on the slab. |

---

## 3. The width problem: which rule strands each page type, and the composition

| Template | Pages | The rule that strands it | 1440 now | Composition proposed (≥1024px) |
|---|---|---|---|---|
| **T3 Reference**: event, town guide | 12 + 16 | `article{max-width:820px}`, `events/events.css:23` | Column x 96–916, right 428px empty for 7,500px. Town lede a 366px strip, 49 cpl. Town doors 4×2 with an empty 8th cell. | Reading column on cols 1–7 (`--measure` text). **Town:** the seven guide doors become a sticky list in cols 9–12 beside the h1, no hole. **Event:** the facts become a one-column list in cols 9–12 beside the lede, sign-up and history. |
| **T3b Index and list**: `/towns/`, `/events/`, a town's coffee/shops/hotels | 12 + 72 | same `article{max-width:820px}` | x 916 | Cap off. Lede and jump bar keep a measure (60% of `--maxw`). Place cards 2-up. The portrait sits beside "Every town, by state" (cols 1–5 / 6–12). |
| **T5 Calendar**: home, months, kinds, riding, all | 24 | same rule (`article.calendar`) | x 916 | **Home:** When? (cols 1–6) beside Or pick what kind (7–12), months 4×3. **Riding:** rows on 1–8, Robert's portrait sticky in 9–12. **Month, kind, /all/:** rows use the width (name · where/what · Details). |
| **T2 Directory hubs**: `/rides/`, states, cities, kinds, `/find-a-ride/` | 916 | No cap. `.ph--p{max-width:460px}` (`chrome.css:319`) alone in a flex column (`.gr-steps`, `rides.css:282`). `.gr-tiles` `auto-fill minmax(118px)` makes 9 tracks for 6 tiles, so tiles stop at x 925. `.gr-kinds` 4-up with 9 tiles leaves 1 orphan. | Portrait 456px with 800px of nothing beside it. Tile rows end 420px short. | One 12-col grid. A portrait pairs with the next block (town guide, map or step) in 6–12. Map on 1–7 with "Nearby" in 8–12. Tiles `auto-fit minmax(140px)` so 6 tiles fill the row. Find-a-ride: kinds 3×3 on 1–8 with the photo in 9–12. |
| **T4 Ride page** | 1,425 | `.gr-ride .ride{max-width:820px}` (`rides.css:143`); `.ride--film>:not(.gr-top){max-width:820px}` (`rides.css:746`) | Everything below the first screen in an 820 column; the 900×402 state map is a full-width box. | Cols 1–7 for when / where / pace, the buttons, the route note, reviews and the "drill". **The state map moves to cols 9–12 beside the h1 and facts** (1,423 pages; the two film pages keep the film there). Route grid and town box full width. |
| **T1 Reading**: guides, field notes | 27 | `.fn-article{max-width:var(--read)}` centered (`styles.css:52`); `.fn-post>.pledge{max-width:var(--read)}` (123) | Column centered at x 400–1040, so the slab is centered too. Off the 96 edge everything else uses. | Column on cols 1–7 at the 96 edge. "Keep reading" sticky in cols 9–12. "← All guides" moves above the slab. |
| **T6 Hubs**: `/guides/`, `/resources/` | 6 | `.fn-spokes` `auto-fill minmax(280px)` = 4 tracks | Rows of 2/4, 3/4 with the hairline running across the holes. `.fn-note` 1,248px wide, 191 cpl. | `auto-fit`: 6 and 9 go 3-up, 10 goes 5-up at ≥1200. Note at `--measure`. |
| **T7 Tool**: `/brief/` | 1 | `.bf-top{max-width:760px}` (`brief.css:3`) | Drop box 760 wide, right 500px empty. | Words on cols 1–6; the drop box on 7–12, as tall as the words. |
| **The closing slab** | every inner page | `.pledge{max-width:820px}` (`chrome.css:222`); `.fn-post>.pledge` 640 centered | Pinned left at 820, or centered at 640 on guides. | Full bleed, words on the grid edge, flush on the footer. This is UX F1's geometry; the colour is design-system's call. Footer at ≥1024: stencil cols 1–5, link columns 6–12. |

### The CSS, per sheet (append at the end of each)

**`/chrome.css`** (the `:root` block also goes in `/home.css`, unchanged):
```css
:root{
  --s1:8px; --s2:16px; --s3:24px; --s4:40px; --s5:64px; --s6:104px; --s7:168px;
  --top:clamp(24px, 9.14px + 3.81vw, 64px);
  --gap:clamp(40px, 31.09px + 2.286vw, 64px);
  --sec:clamp(64px, 49.14px + 3.81vw, 104px);
  --band:clamp(64px, 25.37px + 9.905vw, 168px);
  --col-gap:clamp(16px, 13.03px + .762vw, 24px);
  --fs-label:.8125rem;
  --fs-small:clamp(.875rem, .852rem + .095vw, .9375rem);
  --fs-body:clamp(1.0625rem, 1.039rem + .095vw, 1.125rem);
  --fs-intro:clamp(1.125rem, 1.079rem + .19vw, 1.25rem);
  --fs-h4:clamp(1.125rem, 1.032rem + .381vw, 1.375rem);
  --fs-lede:clamp(1.25rem, 1.157rem + .381vw, 1.5rem);
  --fs-h3:clamp(1.3125rem, 1.15rem + .667vw, 1.75rem);
  --fs-h2:clamp(1.6875rem, 1.293rem + 1.619vw, 2.75rem);
  --fs-display:clamp(2.25rem, 1.507rem + 3.048vw, 4.25rem);
  --fs-h1:clamp(2.75rem, 1.775rem + 4vw, 5.375rem);
  --measure:30em;
}
body{font-size:var(--fs-body);line-height:1.55}
h1{font-size:var(--fs-h1)}
h2{font-size:var(--fs-h2);letter-spacing:-.03em}
h3{font-size:var(--fs-h3);line-height:1.08}
h4{font-size:var(--fs-h4);line-height:1.15}
.lede{font-size:var(--fs-lede);line-height:1.4}
p,li,dd,figcaption,blockquote{text-wrap:pretty}
.foot-col a{text-wrap:balance}
.tally-line,.ph figcaption{font-size:var(--fs-small)}
.foot-line{font-size:var(--fs-label)}
main.wrap{padding-top:var(--top)}
@media (min-width:900px){.ph figcaption{padding-left:0}}
.pledge{max-width:none;margin:var(--sec) calc(50% - 50vw) 0;padding:var(--gap) max(var(--gut),calc((100vw - var(--maxw)) / 2 + var(--gut)));border-bottom:1px solid var(--line-d)}
.wrap>.pledge{margin-inline:calc(50% - 50vw)}
.pledge-line{font-size:var(--fs-h2);line-height:1;letter-spacing:-.03em;max-width:20ch;margin:0 0 var(--s3)}
.pledge-copy{margin:0 0 var(--s4)}
main:has(.pledge)~.foot{margin-top:0}
@media (min-width:1024px){
  .foot>.wrap{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--col-gap);align-items:end}
  .foot-sign{grid-column:1 / span 5;margin:0;--fw:clamp(300px,30vw,440px)}
  .foot-grid{grid-column:6 / -1}
  .foot-crisis,.foot-line{grid-column:1 / -1}
}
```

**`/home.css`** (after the same `:root` block):
```css
.h2{font-size:var(--fs-display)}
.h3{font-size:var(--fs-h3)}
.lede{font-size:var(--fs-lede);line-height:1.4}
.s{padding-block:var(--band)}
@media (max-width:759px){.s{padding-block:var(--s5)}}
p,li,dd,figcaption{text-wrap:pretty}
.ride-h3{text-wrap:balance}
.tally-line,.foot-line{font-size:var(--fs-label)}
```

**`/events/events.css`**:
```css
.crumbs{font-size:var(--fs-label);font-weight:500;margin:0 0 var(--s3)}
.crumbs [aria-current]{font-weight:700}
.facts dt,.dir-fold>summary,.dir-report--compact>summary,.town-fold>summary{font-size:var(--fs-label);font-weight:700;color:var(--mute)}
.dir-report-form .lab,.dir-report-role span,.wx-status,.tile-p .b,.tile-p .s,.ev-spec,.res-k,.ev-poster-kind,.ev-poster-when,.ev-poster-climb,.ev-poster-spec li,.row-date{font-size:var(--fs-label)}
.back,.town-more,.verified,.wx-credit,.row-meta,.gr-map figcaption{font-size:var(--fs-small)}
.facts>div{align-content:start}
.facts dd,.row-meta,.wx-day,.wx-now b,.count,.tile-p--event .d,.ev-poster-date{font-variant-numeric:lining-nums tabular-nums}
.faq details p,.weather-note,.place p,.place-line,.town-fold-body p,.tg-ready,article.event>section>p,.ev-signup-note{max-width:var(--measure)}
.town .lede,article.event>.lede{font-size:var(--fs-intro);max-width:var(--measure);line-height:1.5}
.res-card b,.tagline{text-wrap:balance}
article:is(.event,.town,.index,.resource,.calendar) h2{margin:0 0 var(--s2)}
article:is(.event,.town,.index)>:is(section,.dir-fold,.weather,.faq,.town-box,.local-rides,.ph){margin-top:var(--sec)}
@media (min-width:1024px){
  main.wrap>article:is(.event,.town){max-width:none;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--col-gap);align-items:start}
  article:is(.event,.town)>*{grid-column:1 / span 7;min-width:0}
  article.event>:is(.eyebrow,h1){grid-column:1 / -1}
  article.event>dl.facts{grid-column:9 / -1;grid-row:3 / span 40;grid-template-columns:1fr;margin:0}
  article.town>.res-grid{grid-column:9 / -1;grid-row:1 / span 40;position:sticky;top:calc(var(--nav-h) + var(--s3));grid-template-columns:1fr;margin:0}
  article.town>.res-grid .res-card{display:grid;grid-template-columns:22px minmax(0,1fr);column-gap:12px;row-gap:2px;padding:12px 14px}
  article.town>.res-grid .res-card>*{grid-column:2}
  article.town>.res-grid .res-card>.mk{grid-column:1;grid-row:1 / span 3}
  article:is(.event,.town) .town-strip{grid-template-columns:repeat(auto-fit,minmax(min(150px,100%),1fr))}
  .related .tiles-p--events{grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
  .tiles-p--towns{grid-template-columns:repeat(auto-fit,minmax(min(160px,100%),1fr))}
  main.wrap>article:is(.index,.resource){max-width:none}
  article.index>:is(.lede,.towns-jump,.dir-report),article.resource>:is(.lede,.verified,.dir-report){max-width:calc(var(--maxw) * .6)}
  article.resource>.places--cards{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}
  main.wrap>article.index{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--col-gap);align-items:start}
  article.index>*{grid-column:1 / -1;min-width:0}
  article.index>.ph--p{grid-column:1 / span 5;max-width:none}
  article.index>.ph--p+section{grid-column:6 / -1;align-self:center;margin-top:var(--sec)}
}
```

**`/rides/rides.css`**:
```css
.gr-head{padding-top:var(--top)}
.gr-steps{gap:var(--gap)}
.gr-steps>.ph{margin:var(--s4) 0}
.gr-dir h2{margin:0 0 var(--s2)}
.gr-dir .gr-step>h2.gr-filter-label,.gr-dir h2.gr-list-h,.gr-fact dt,.gr-fold>summary{font-size:var(--fs-label);font-weight:700;color:var(--mute)}
.gr-pick-k,.gr-tile-n,.gr-card-meta,.gr-btn-t,.gr-chip,.gr-tag,.gr-route-zoom,.gr-clear{font-size:var(--fs-label)}
.gr-tile-sub,.gr-place,.gr-minor,.gr-footline,.gr-tonight,.gr-all-link .link,.gr-hero-alt a{font-size:var(--fs-small)}
.gr-fact{align-content:start}
.gr-fact dd,.gr-next-when,.gr-rev-stat b,.gr-pick-when,.gr-badge-day{font-variant-numeric:lining-nums tabular-nums}
.gr-pick-name,.gr-tile-name,.gr-card-name{text-wrap:balance}
.gr-visit p,.gr-about p,.gr-rev-words p,.gr-route-hostnote,.gr-note-words p{max-width:var(--measure)}
article.gr-note{font-size:inherit;max-width:none}
@media (min-width:1024px){
  .gr-dir .gr-steps{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--col-gap);row-gap:var(--s5);align-items:start}
  .gr-dir .gr-steps>*{grid-column:1 / -1;margin:0}
  .gr-dir .gr-steps>.pledge{margin:var(--sec) calc(50% - 50vw) 0}
  .gr-dir .gr-steps>.gr-map--where:has(+.gr-near){grid-column:1 / span 7}
  .gr-dir .gr-steps>.gr-map--where+.gr-near{grid-column:8 / -1;align-self:center}
  .gr-dir .gr-steps>.ph--p{grid-column:1 / span 5;max-width:none}
  .gr-dir .gr-steps>.ph--p+:is(.town-box,.gr-map,.gr-step){grid-column:6 / -1;align-self:center}
  .gr-dir .gr-steps>.ph--p+.gr-map--where+.gr-near{grid-column:6 / -1}
  .gr-dir .gr-tiles{grid-template-columns:repeat(auto-fit,minmax(140px,1fr))}
  .gr-find .gr-steps>:is(.gr-step,.gr-all-link,.gr-about){grid-column:1 / span 8}
  .gr-find .gr-steps>.ph--p{grid-column:9 / -1;grid-row:1 / span 3}
  .gr-find .gr-kinds{grid-template-columns:repeat(3,minmax(0,1fr))}
  .gr-ride .ride,.gr-ride .ride--film{max-width:none;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--col-gap);align-items:start}
  .gr-ride .ride>*,.gr-ride .ride--film>:not(.gr-top){grid-column:1 / span 7;max-width:none;min-width:0}
  .gr-ride .ride>:is(.crumbs,.gr-top,.gr-collage,.gr-wall,.town-box),.gr-ride .ride>.gr-route:has(.gr-route-grid){grid-column:1 / -1}
  .gr-ride .ride:not(.ride--film)>.gr-map--ride{grid-column:9 / -1;grid-row:2 / span 6;margin:0}
}
.gr-ride .ride>*{margin-block:0}
.gr-ride .ride>*+*{margin-top:var(--s3)}
.gr-ride .ride>:is(.gr-route,.gr-notes,.gr-ridebox,.gr-about,.gr-links,.town-box,.dir-report){margin-top:var(--gap)}
.gr-ride .ride>:is(.gr-first-link,.gr-verify){margin-top:var(--s2)}
.gr-ride .ride>.gr-top{margin-top:0}
.gr-ride .gr-links h2,.gr-ride .gr-about h2,.gr-ride .town-box h2{margin-top:0}
details.gr-fold:not(.gr-first)>summary{justify-content:flex-start}
details.gr-fold:not(.gr-first)>summary::after{content:none}
```

**`/events/2027/calendar.css`**:
```css
.cal-q,.mo-n,.more-f summary{font-size:var(--fs-label);font-weight:700}
.cal-door-n,.d .dm,.nm .you-tag,.cal-tba,.tile-p--deep .b{font-size:var(--fs-label)}
.cal-key{font-size:var(--fs-small)}
.month-h .n,.cal-pick b{font-variant-numeric:lining-nums tabular-nums}
.cal-door-name,.cal-pick{text-wrap:balance}
@media (min-width:1024px){
  main.wrap>article.calendar{max-width:none}
  .calendar:is(.cal-home,.cal-short){display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--col-gap);align-items:start}
  .calendar.cal-home>*{grid-column:1 / -1}
  .calendar.cal-home>.cal-step[aria-labelledby="when-h"]{grid-column:1 / span 6}
  .calendar.cal-home>.cal-step[aria-labelledby="what-h"]{grid-column:7 / -1}
  .calendar.cal-home .mo-tiles{grid-template-columns:repeat(4,minmax(0,1fr))}
  .calendar.cal-home>.dir-report{grid-column:1 / span 8}
  .calendar.cal-short>*{grid-column:1 / span 8}
  .calendar.cal-short>#results{grid-column:1 / -1}
  .calendar.cal-short:has(>.ph)>#results{grid-column:1 / span 8}
  .calendar.cal-short>.ph{grid-column:9 / -1;grid-row:2 / span 8;max-width:none;margin:0;position:sticky;top:calc(var(--nav-h) + var(--s3))}
  .calendar:not(.cal-home):not(:has(>.ph)) .ev>summary{grid-template-columns:22px 56px minmax(0,5fr) minmax(0,7fr) auto}
  .calendar:not(.cal-home):not(:has(>.ph)) .ev .nm{display:contents}
  .calendar:not(.cal-home):not(:has(>.ph)) .ev .nm>*{padding-top:4px;margin:0}
}
```

**`/styles.css`**:
```css
.fn-related h2,.fn-spokes-head{font-size:var(--fs-label);font-weight:700}
.fn-spoke .fn-spoke-kicker,.fn-spoke .fn-spoke-more,.fn-chip,.fn-row .fn-rdate{font-size:var(--fs-label)}
.fn-meta,.fn-back{font-size:var(--fs-small)}
.fn-body sup{font-size:max(12px,.7em)}
.fn-lede,.fn-body p,.fn-pillar-intro,.fn-pillar>.fn-note,.res-someone-list{max-width:var(--measure)}
.fn-spoke-title{text-wrap:balance}
.fn-table td{font-variant-numeric:lining-nums tabular-nums}
main.fn-post{padding-top:var(--top)}
.fn-post>.pledge,.fn-pillar>.pledge{max-width:none;margin:var(--sec) calc(50% - 50vw) 0}
main.fn-post,main.fn-pillar{display:flex;flex-direction:column}
:is(.fn-post,.fn-pillar)>.pledge{order:2}
@media (min-width:1024px){
  main.fn-post{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--col-gap);padding-inline:max(var(--gut),calc((100vw - var(--maxw)) / 2 + var(--gut)));align-items:start}
  .fn-post>*{grid-column:1 / -1}
  .fn-post>:is(.fn-article,.fn-back,.fn-note){grid-column:1 / span 7;max-width:none;margin-inline:0;padding-inline:0}
  .fn-post>.fn-related{grid-column:9 / -1;grid-row:1;position:sticky;top:calc(var(--nav-h) + var(--s5));margin:var(--s5) 0 0;padding-inline:0}
  .fn-post>.fn-back{grid-row:2}
  .fn-post>.pledge{grid-row:3}
  .fn-spokes{grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))}
  .fn-spokes:has(>:nth-child(6):last-child),.fn-spokes:has(>:nth-child(9):last-child){grid-template-columns:repeat(3,minmax(0,1fr))}
}
@media (min-width:1200px){.fn-spokes:has(>:nth-child(10):last-child){grid-template-columns:repeat(5,minmax(0,1fr))}}
```

**`/brief/brief.css`**:
```css
.bf-drop p{max-width:var(--measure)}
.bf-wx-temp small,.bf-wx-wind,.bf-climb-nums dt,.bf-climb-nums dd small{font-size:12px}
@media (min-width:1024px){
  .bf-top{max-width:none;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--col-gap);row-gap:var(--s3);align-items:end}
  .bf-top>*{grid-column:1 / span 6}
  .bf-top>.bf-drop{grid-column:7 / -1;grid-row:2 / span 3;align-self:stretch;align-content:center}
  .bf-out{max-width:none}
}
```

**Compatibility:**
- Every selector exists in today's markup; I checked them against the generated pages.
- `:has()` (Safari 15.4+, Chrome 105+, Firefox 121+) only places blocks. Without it, a hub's map and its Nearby list stack full width, as they do today.
- `text-wrap:pretty` is ignored where it isn't supported.
- **No generator change is needed.** CSS is served `max-age=3600, must-revalidate`, so no `?v=` bump (and no 2,600-page regen) is required.

---

## 4. Details

- **Measure** (characters per line at 1440, before → after):

  | Text | Before | After |
  |---|---|---|
  | STP body | 112 | 69 |
  | STP weather note | 105 | 68 |
  | "For visitors" (ride page) | 109 | 72 |
  | Rider review | 97 | 69 |
  | Resources disclaimer | **191** | 69 |
  | Brief drop note | 112 | 66 |
  | Phoenix town lede | 49 (366px strip) | 68 at 20px |
  | Event lede | 50 at 23px | 68 at 20px |
  | Guide body (the model) | 69 | 68 |

  `--measure:30em` scales with each element's own size.
- **Fact cells start on one line.** `.facts>div` / `.gr-fact` are grids with stretched rows, so a `dd`
  floated 40, 128 and 139px below its cell top (Phoenix "Best months" vs "Nearest airport"). With
  `align-content:start` every cell measures 39 / 34. Files: `events.css:323`, `rides.css:347`.
- **Tabular numbers** were missing on facts, row times, the next-ride date, event-tile dates ("07.10"),
  the poster date, review stats and table cells. Only `.num`, tile counts and the brief had them.
- **`text-wrap`:** h1–h4 already balance (`chrome.css:72`). Added `pretty` on paragraphs, and `balance`
  on tile, pick, card and door names and the footer links ("The orgs I ride / for" no longer orphans).
  - The homepage "April 23 to / 25, I cycle for" breaks inside the date even with `balance`.
  - The fix needs markup: a `white-space:nowrap` span around the date in `scripts/build-home.js:371`.
  - §4's range rule says "April 23–25". That's for the editor, not this studio.
- **Captions on the column edge:** `.ph figcaption{padding-left:2.5%}` (`chrome.css:324`) put captions at
  x 107–127. Proposed: 0. This holds whatever the photo-editor and Robert decide about feathering.
- **One "+" per fold:** `/find-a-ride/`'s `details.gr-fold` gets `::before "+"` (`rides.css:570`) and
  `::after "+"` (`rides.css:367`). Keep the left one.
- **Found a collision:** `.gr-note{font-size:.85rem;max-width:46em}` (`rides.css:10`) is meant for a hub's
  small-print `<p>`. It also matches Robert's write-up `<article class="gr-note">`. Reset it on the
  article.
- **Under 12px:** `.gr-clear` (11px) goes to 13; the brief's four 11px labels go to 12. The footnote
  `sup` gets a 12px floor.
- **For other desks, not this one:**
  - `.gr-btn` is a second button family at 12/700 sentence case (design-system).
  - The slab and footer colour (UX F1 / design-system).
  - Photo feathering (photo-editor / Robert).

---

## Fixes, ranked

All of these are CSS in shared or section sheets. None needs a regen.

| # | Fix | Impact | Effort | Files |
|---|---|:-:|:-:|---|
| 1 | Lift `article{max-width:820px}`. Reference pages get a reading column with the margin used (town doors sticky in 9–12, event facts beside the lede). Index, list and calendar pages use the width. | 5 | 2 | `events/events.css`, `events/2027/calendar.css` (136 pages) |
| 2 | Hubs on one 12-col grid: the portrait pairs with the next block, tiles `auto-fit`, find-a-ride 3×3 + photo | 5 | 2 | `rides/rides.css` (916 pages) |
| 3 | Ride pages: lift both 820 caps, put the state map in the margin beside the facts, and cut 11 gaps to 3 | 4 | 2 | `rides/rides.css` (1,425 pages) |
| 4 | One ending: full-bleed slab on the grid edge, flush on the footer, footer on 12 columns, "All guides" above the slab | 4 | 1 | `chrome.css`, `styles.css` |
| 5 | One fluid type scale plus the 13px label floor. Under-13 text drops from 26–35% to 2–11% on directory pages. | 4 | 2 | `chrome.css`, `home.css`, all section sheets |
| 6 | `--measure:30em`: 105–191 cpl lines down to 66–72; town and event ledes out of their strips | 4 | 1 | `events.css`, `rides.css`, `styles.css`, `brief.css` |
| 7 | Spacing tokens: one page top (crumbs at y 168 everywhere), `--sec` 104, no `em` section margins, home bands on `--band` | 3 | 1 | `chrome.css`, `home.css`, `events.css`, `rides.css` |
| 8 | Details: fact cells on one top line, tabular numbers, one "+" per fold, captions on the edge, the `.gr-note` collision, the last 11px text | 3 | 1 | `events.css`, `rides.css`, `chrome.css`, `brief.css`, `styles.css` |

Also proposed and tested (impact 3, effort 1):
- **Reading pages** (column on the 96 edge, Keep reading in the margin): `styles.css`
- **The brief** (words beside the drop): `brief.css`
- **Spoke rows** with no holes: `styles.css`
