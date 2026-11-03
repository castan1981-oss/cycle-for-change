# UX, pass 2026-10-27-cadence-final: the homepage

Measured on `feat/home-editorial-film` at `c796bdf7e2` with the lab's method (in-process server, Playwright, reduced
motion); the proposed CSS was injected in the page only. Scripts and shots:
`/tmp/claude-0/-home-claude/42a8e16b-6128-5358-8471-887b1648b6bf/scratchpad/ux-measure/`. No site file changed.

## 1. Hero: "Read the last ride" (Cadence 1, MUST) — impact 5, effort 1

**Where.** A second `<a class="link link--bone">` inside `.hero-links`, after Find a group ride, `href` = `NOTE.href`
(the same value `#road` uses, `scripts/build-home.js` line 245). When `NOTE` is null the link is left out; it never
points at the riding page. The Pause button stays where it is.

**How the row stacks.** Under 760 the two links are a column, one 44px line each, left edges aligned
(`.hero-links{flex-direction:column;align-items:flex-start;gap:0}`; without `flex-start` the underlines stretch to
143px). At 760 and up they stay on one row, 28px apart (138 + 143 = 309px; at 1440 both sit at y 808–852, the Pause
button at x 1213).

**Under 700px tall** the block reclaims the new line so the stencil doesn't climb into his face
(`@media (max-width:759px) and (max-height:700px)`): `.hero-mark--stack{width:min(32vw,150px)}`, `.hero-intro` and
`.hero-line` `margin-top:var(--s1)`, `.hero-acts{margin-top:var(--s2);gap:8px}`.

Measured with that CSS (chin from the poster, frame y 320):

| Size | Stencil top (before) | Chin | Find | Read | Under the last row |
|---|---|---|---|---|---|
| 360×640 | 203 (199) | 190 | 528–572 | 572–616 | 24 |
| 375×667 | 226 (220) | 198 | 555–599 | 599–643 | 24 |
| 390×844 | 294 (338) | 250 | 732–776 | 776–820 | 24 |
| 430×932 | 376 (420) | 276 | 820–864 | 864–908 | 24 |

The hero stays exactly one screen at every size; the Pause button (48×48, x 296–364) sits beside the last line with
150px or more between. Both links are on the first screen at every size. Run `python3 tools/hero-contrast.py`: it
reads every `.hero-links a`, and the stencil moves up 44px on tall phones. Files: `scripts/build-home.js` (HERO),
`cfc-site/home.css`.

## 2. Task 4 after

390: 1 tap, 0 screens (was 5.09). 1440: 1 tap, 0 screens (was 3.60). Taps + screens 6.09 → 1 and 4.60 → 1; the
target is 143×44, on the first screen, no scroll. The `#road` link stays as the second way in, beside the log; the
lab's date mismatch there (the log says Oct 25, the write-up is Oct 10) only closes when that day's row is one of the
four, so it's not this pass.

## 3. 988 calls Trevor on phones — impact 5, effort 1

Cause: two 44px pads on lines 22px apart. Fix by layout: `display:inline-block;line-height:44px` on the tel links, so
any line that carries a number is 44px tall and the pads can't reach each other. Measured: 15 of 15 points on
`tel:988` at 360, 375 and 390, in the orgs room and the footer (was 5 and 10); the lines are 44px apart; the orgs
block grows 126 → 170px, the footer's 90 → 131.

- `cfc-site/home.css` line 332 (`.orgs-help a[href^="tel"]`): in scope.
- `cfc-site/chrome.css` lines 695–696 (`.foot-crisis a`, `.menu-foot a`): **in scope**. The pass bumps `CSS_V` and
  regenerates everything anyway, and the fault is in every page's footer. If the art director keeps the PR to the
  homepage, mirror it as `.home .foot-crisis a[href^="tel"]` in home.css's unlayered foot and file the chrome line.

Alternative with tidier rows: split the one span into two, the menu's shape (markup in build-home.js and chrome.js).

## 4. Phone rhythm and order (Cadence 5)

`#how` carries no `order:-1` on this branch: it's first in the DOM inside `#why`, so nothing to protect. None of
these cut Robert's words.

| Fix | Impact | Effort | Files |
|---|---|---|---|
| **a.** `#year`: move "All my 2027 rides, with sign-up links" to `.year-foot` under the 13 rows (the CSS hook exists, unused). The pick comes after the list; DOM and visual order agree at every width. | 3 | 1 | build-home.js |
| **b.** `#ride`: cut "All my 2027 rides" (a duplicate of a). One action: Sign up with the Center. | 2 | 1 | build-home.js |
| **c.** `#today` at 390 is 1.73 screens: the 3-second clip is 538px full bleed with two controls. Put the film on six of twelve columns (4:5, ≈231px tall), tighten the words block (`.today-ask` s4 → s2), one control for the clip (motion desk). About 0.4 screen back. | 3 | 2 | home.css, build-home.js |
| **d.** `#orgs`: `.org{padding:var(--s3) 0}` (−48px, which pays for item 3's +44). | 1 | 1 | home.css |
| **e.** Order (SHOULD, the art director's call): hero · strip · why · **road** · today · **orgs** · year · ride · find · read · sign. Grounds alternate concrete / tar / concrete / patina / concrete / plaster; the concrete run after the film goes from 3.9 screens to 2.2; it reads the log, then the day's story, then who, then the rides, then the one ride. Markup only (build-home.js lines 488–489), no CSS `order`, so tab order stays visual. CSS fit-ups: `.today`'s top hairline follows tar now; `.ridewith`'s phone `padding-top:0` follows concrete. 988 arrives at about 6.6 screens, was 8.36. | 3 | 2 | build-home.js, home.css |

Not this pass: How this works (Pass 37 puts it on the second screen; its three sentences repeat the strip, the log
and the orgs' line — For Robert), the 13 rows (§1: all of them), the footer's 1.2 screens (chrome). After a–e the
page is about 13.4 screens at 390, from 14.0.

## 5. The bar at 1440; the Read rows

- **The bar covers the page at 1440** (1440-screen-05/06). From 900 the sticky header already carries Ride with me on
  every screen past the film; the bar says it again and sits on the right column. Fix: `home.js` keeps `#rideBar`
  `hidden` at ≥900 on the homepage (`matchMedia`; `.ridebar[hidden]{display:none}` outranks `.is-on`); the phone bar
  is unchanged. **For Robert:** §1 says the bar is at the foot of every page; this makes the wide homepage the
  exception. Impact 3, effort 1.
- **Tab jumps the hero** (lab, broken 2): `html:has(#rideBar:not(.is-on)){scroll-padding-bottom:0}` in home.css's
  unlayered foot (chrome.css line 679 site-wide, later). Needed either way: the stacked links put Find a group ride
  68px from the foot. Impact 2, effort 1.
- The phone bar's "Palm Spring…" is chrome: not this pass.
- **Read rows don't look like links.** The title takes the link's arrow (`.read-list b::after{content:"\2192"}`, 400,
  6px gap, the same hover move as `.link::after`): the arrow is the affordance (§3), on touch too. Impact 2, effort 1,
  home.css.
- **Looks tappable, isn't:** the three plates under "It always says cycling" read as chips; show one word at a time
  after CYCLE FOR, as `#today` does (reduced motion: "me"). The 13 map dots: an `<a>` each with a 44px pad opening
  its row, or they stay inert and the lab keeps flagging them. Impact 2, effort 2, build-home.js, home.css, home.js.
