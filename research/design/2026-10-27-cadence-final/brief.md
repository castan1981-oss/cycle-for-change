# Brief — 2026-10-27-cadence-final (homepage only, `feat/home-editorial-film`, PR #215)

**Aim.** Put "Read the last ride" on the first screen and fix the crisis line; then bring the middle of the page up to
the finish the hero and the dark rooms already have — rooms that alternate, one big picture per section, numerals
that carry a section, no component the site doesn't already own.

**Owners.** A = `cfc-site/home.css`, `cfc-site/chrome.css`. B = `scripts/build-home.js`, `cfc-site/home.js`,
`tools/hero-film.py` + `hero-wide-9.*`, `scripts/chrome.js` (`CSS_V`), `data/today.json`, `CLAUDE.md`,
tests. B regenerates once (§2 order), then A fits. **Not touched:** the hero's type and scrim (the links
row only), the phone hero film, the strip, the sign's lockup, the orgs' copy, every word of his.

## Ranked (shared first)

1. **988 tap pads.** `display:inline-block;line-height:44px` on `.foot-crisis a`, `.menu-foot a` (chrome.css: the
   fault is in every footer and `CSS_V` bumps anyway) and `.orgs-help a[href^="tel"]` (home.css). Lab broken 1, ux 3.
   Move 11. I5 E1. A.
2. **Tab jumps the hero.** `html:not(:has(.ridebar.is-on)){scroll-padding-bottom:0}` in chrome.css. Lab broken 2,
   motion 3. I3 E1. A.
3. **Hero: Read the last ride** (Cadence MUST). Second `.link.link--bone` in `.hero-links`, `href = NOTE.href`, in the
   HTML at build, none when `NOTE` is null (B). Under 760 a column of 44px rows, left-aligned,
   `max-width:calc(100% - 60px)`; one row, 28px gap, from 760. Drop `.hero-links .link{min-height:44px}`;
   `padding-block:10px`. Under 700 tall, ux's query (stencil `min(32vw,150px)`, `--s1` margins, acts `--s2`) keeps
   the stencil under his chin at 360/375/390/430. Press `:active{color:var(--dust)}`; `.hero-pause{min-width:148px}`
   at ≥760 (the lab's CLS). `hero-contrast.py` must pass. 390-first, 1440-first. Task 4: 6.09 → 1,
   4.60 → 1. Moves 11, 9. I5 E2. A + B.
4. **The bar at ≥900.** `@media(min-width:900px){.home .ridebar{display:none}}`, home.css unlayered; the header's Ride
   with me stands in; phones unchanged. 1440-screen-05/06. Critic 2, motion 2b. I4 E1. A. *For Robert.*
5. **Order.** hero · strip · why · **road** · today · **orgs** · year · ride · find · read · sign. Markup only
   (build-home.js ~488), no CSS `order`. Rooms alternate concrete / tar / concrete / patina / concrete / plaster; 988 at
   ~6.6 screens, was 8.4. ux 4e.
   Move 7. I3 E2. B + A. *For Robert.*
6. **#today.** One control: the disc (`.gr-film-play`, the site's film control), glyph to pause by `data-playing`,
   never fades; `.today-film-btn`, the 0:03 line and `tPlay` go (system over motion: one component site-wide; the hero's box
   stays, WCAG 2.2.2). Wrappers `.today-lead`, `.today-say`, the film a sibling of `.today-ph` (B).
   1024+: row 1 the sign cols 1–6 · line and ask cols 8–12, feet aligned; row 2 the gravel photo cols 1–8 · the film
   cols 9–12 at 4:5, captions under. 390: word group 8/16/16, photo `--s4` under, film inset 7 of 12 columns,
   right-aligned. Film caption from `today.json` `where` (B; *For Robert*). 1440-screen-02, 390-screen-03/04. Critic
   4, type 1, photo 2. 1,464 → ~1,050px. Moves 1, 2, 6. I4 E3. B + A.
7. **#why.** 1024+: words cols 1–5, not sticky; Boise cols 7–12 at 4:5; the shadow 4:5 on cols 1–3, feet aligned
   (`display:contents`; no new crop). 390: the photo second (`order` on contents children; nothing
   focusable moves). Cut `.plates` (system over ux: the sign already changes twice; the lab reads chips).
   1440-screen-01, 390-screen-02. Type 1, photo 2. I4 E2. A + B. *For Robert.*
8. **The dead right halves at 1440.** #road: side cols 1–4, `111` a 900 `--fs-display` tabular numeral, label 13/700
   under (two spans in ROAD, B), log cols 6–12; #year aside `align-self:start`; the orgs' door and help on one row
   under one asphalt hairline (door cols 1–8 at `--fs-display`, help 9–12); #find `align-items:start`, tools cols
   7–12. 1440-screen-04/05/07/08. Critic 1, type 2. Moves 4, 5. I4 E2. A (+ B for ROAD).
9. **How this works.** Numerals 1 2 3 at 900 `--fs-h2` by CSS counter, marks hidden, the line `--fs-body` asphalt.
   Not a fold: Pass 37 keeps it on the second screen. Type 4. I3 E1. A.
10. **Phone rhythm.** A colour change gets `--s5` both sides, one room one hairline, 8/16/24 inside a group;
    `.miles-grid` `--s5` on phones; `.org{padding:var(--s2) 0 var(--s3)}` (pays for item 1). Type 3, ux 4d. I3 E1. A.
11. **One square on map and list.** `.mp-dot` a 24px ink square, 13/800 plaster numeral, `--soft` dashed
    `--dust-deep`; `.yr-i` the same. Drops the page's only radius and shadow (frozen rule). System 1. I3 E1. A. The
    13 phone rows keep their date boxes.
12. **Hero wide film → `hero-wide-9`.** The palms cut to the wheel (reel 322–336, 15 frames; `L["wide"]=88`, tall
    panel rail 54–141); the road a static `road_w (0, 580, 1080, 914)` — the fallback, not the tracked crop: nothing
    the gate can read as an effect; tunnel focus .9; `rail_w` unchanged; phone stays 8; poster frame 0. Every frame
    looked at for vehicles; `hero-contrast.py` passes. Photo 1, Cadence 4. Move 6. I4 E2. B.
13. **Small finish.** `.ridewith-big`, `.orgs-door` to `--fs-display`; tabular on `.log .mi`, `.date-d`,
    `.miles-big`; `.read-list b::after` the arrow, its small text asphalt (1440-screen-09); `.home .nav` flat on
    phones (390-screen-02); the find field with `#mkSearch`, field and button 52px (B inlines the mark); `.facts-dl` →
    M9 `.facts` (390-screen-10; B markup); the sign's dash off (two rose bars in one
    lockup, 1440-screen-09); the log stroke with the dash's ends. I2 E1–2. A (+ B).
14. **Ship.** B: `CSS_V`, the §2 regeneration, `node --test tools/test/*.test.js`, `validate-rides`, no bare
    `chrome.css"`; CLAUDE.md §3 (order, one control, the bar, the film).

## Not this pass

- The per-frame horizon crop (photo fix 1): effort 3, and the gate's call whether a tracked crop is an effect. Only if
  the recut's sheet still puts the pillar in the CYCLE | FOR gap.
- Cutting or carding #read; cutting How this works: his sections. Arrows now.
- The 13 rows as numerals (type 3): the dashed box is the honest mark where the map is hidden.
- Map dots as links (the rows are the links); a square crop of the shadow; `photo2`.
- Chrome: the phone bar's "Palm Spring…", the two-screen footer, `.link:active` site-wide, the menu's open.

## For Robert

1. The Ride with me bar is hidden at ≥900 on the homepage; the header's Ride with me carries it. Phones keep it. §1
   says every page.
2. Section order: story · 10,000 · today · the orgs · the 2027 rides · Center Ride Out · find · read · sign.
3. The three plates under "It always says cycling" are cut. The sign still changes in today and at the foot.
4. The 3 s film gets a caption, "Phoenix · Oct 2026" — the LOVE wall, the same morning as the photo?
5. The sign's rose dash comes off: the blank is its bar.
6. Next pass, your call: cut #read (the footer and Guides say it) or three photo cards; How this works repeats the
   strip, the log and the orgs.
7. "Cycle for Change" is never in readable words on the first screen (lab, task 1).
8. Photo desk: the camera originals of the tunnel and palms ride; one 3:2 of you riding, car-free. "Thu Oct 22 / —"
   is a ride with no title on Strava.

**Held:** one primary per screen; no copy invented; After Hours only; clean photos, no cars, only Robert; the stencil
spells CYCLE FOR; no rose on hover or press; 988 + Trevor wherever mental health comes up; reduced motion.

## Sign-off

_Pending. Ships when the critic's total rises at 390 and 1440 with no line down; lab tasks 1–6 no slower, 988 taps
land on 988 at 360/375/390; `hero-contrast.py`, brand-ambassador and access-speed pass; one PR, one preview, Robert's
yes on his phone._
