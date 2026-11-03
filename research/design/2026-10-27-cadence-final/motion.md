# Motion, the staged homepage (pass 2026-10-27-cadence-final)

Read on `feat/home-editorial-film` at `c796bdf7e2`: Playwright at 390, 375, 360 and 1440, reduced motion on and
off, keyboard. No site file changed.

## What moves today

No keyframes, no parallax, no counters. Every transition is on the one scale (`--t-color` 120, `--t-move` 200,
`--t-open` 320, `--ease`); under reduced motion every computed duration is 0s, scrolling is `auto`, neither film
starts (the button still plays the hero).

| What | How | Verdict |
|---|---|---|
| Hero film | poster → film, opacity, 320 | keep |
| `.hero-ride`, `.hero-pause`, `.link` | colour 120; arrow nudge 4px, 200, pointer only | keep |
| Header over the film | tar → solid, 320; mark and button fade in | keep; 2c |
| `.ridebar` | slides up 320; away at `#ride` and the footer | 2b |
| `.today-play` disc | fades out while playing | goes; 2a |
| `.story-words` sticky at 1024 | scroll-tied; inert at 1440 | 4 |

## 1. The hero with two links

Both links in the HTML at build, never injected. Tab order: Ride with me → Find a group ride → Read the last ride →
Pause; the button is last in the DOM and absolute, so it keeps its place and its inside ring. Measured with a cloned
second link: at ≤430 the row goes 44 → 92px (two rows), 12px clear of the button; at 1440 one row. Keep
`.hero-links{max-width:calc(100% - 60px)}` under 760.

Nothing else in the hero moves.

States per link are the house `.link`: hover (pointer only) nudges the arrow, 200; focus is the ring, instant;
`aria-current` never applies. **Add the missing press:** `.hero-links .link:active{color:var(--dust)}` (`.link`
has no transition: instant). Impact 2, effort 1, `home.css`.

The Pause label swap widens the button 131 → 140px and moves its left edge 10px (the lab's two CLS shifts):
`@media(min-width:760px){.hero-pause{min-width:148px;justify-content:flex-start}}`. Impact 1, effort 1. Re-run
`tools/hero-contrast.py` once the link is in.

## 2. The critic's three

**a. Two play controls on a 3 s loop.** One control, the hero's: drop `.today-play` (the round disc and its fade) and
the Play/0:03 line; one `.hero-pause`-style button at the frame's foot right, always there, glyph swap by
`data-playing` (display, instant), label "Play the film, 3 seconds" / "Pause the film". The still with that button is
the real play button (§10); a tap on the frame still toggles; desktop autoplay (in view, muted, never under reduced
motion) unchanged. Impact 3, effort 2. `build-home.js` (`todaySection`), `home.js` (`tPlay` goes), `home.css`
(`.today-play`, `.today-film-cap`, `.today-film-btn`, `.today-film-len` → one `.film-btn` shared with the hero).

**b. The bar at 1440 covers content and repeats the header.** Once the film scrolls under, the header's Ride with me
line is there at ≥900, pointing at the same next ride (`data-ride-next`, re-picked by `/ridebar.js`): at that width
it is the thing that says Ride with me as you scroll. Phones keep the bar.
`@media(min-width:900px){.home .ridebar{display:none} html{scroll-padding-bottom:0}}`, `home.css`, unlayered. The
bar's rules (next ride, rolls on its own, never on `/resources/`) are untouched. Impact 4, effort 1.

**c. Text through the frosted header on phones.** `.home .nav{background:var(--bone);backdrop-filter:none}` before
the `[data-solid="false"]` rule: flat like the bar over the film, no blur to composite while a phone scrolls.
Impact 2, effort 1.

## 3. The lab's Tab jump

Confirmed: `scroll-padding-bottom` 76/96 is on while the bar is away, so a link whole on the first screen counts as
hidden and Chromium centres it (376px at 390, 390 at 1440). The padding should exist only while the bar does:
`html:not(:has(.ridebar.is-on)){scroll-padding-bottom:0}`. With it the first scroll is Tab 6, "on Strava", below the
fold, at every size. `:has()` is already in both sheets. `home.css` this pass; the same line in `chrome.css` S4
fixes every inner page. Impact 3, effort 1.

## 4. Cadence 5 and 3: no motion

No scroll reveals, section fades, photo zooms, cross-fades or sticky heads. Rhythm is the fields, hairlines, spacing
and scale — type-layout's. States give the finish: rows underline and the date block fills on hover, press is
`--bone-2` instant, the ring is the ring; the sign's plate grows as you type with no transition (keep it so); every
new crop carries width/height so nothing lands late. If note 3 makes the photo column taller than the words, remove
`.story-words{position:sticky}` rather than let the words slide.

## Not this pass

Shared chrome: the phone menu's open (height and opacity), `.link:active` site-wide, the inner pages' frost. In
`home.js`, `reduce` is read once at load; a `change` listener that pauses both films is one line.

## For Robert

At 1440 the header's Ride with me line stands in for the bar on the homepage; phones keep the bar.
