# Motion and interaction, before: studio pass 1 (Oct 21, 2026)

Audit only. No site file was changed. Everything below was measured in headless Chromium 141 at 390×844 (2x, touch)
and 1440×900, each with reduced motion on and off, on the critic's 14 pages. Then it was measured again with
the proposed CSS/JS loaded from a scratch override folder, so every fix marked **tested** has a before and after.

Harness and raw results: `/tmp/claude-0/-home-claude/065fb8a8-1db5-530f-9a75-ba4101ea1410/scratchpad/motion/`
(`srv.py` in-process server, `cls.py`, `focus.py`, `ring_sweep.py`, `interact.py`, `rm_sweep.py`, `*.json`,
`shots/`, `shots_after/`, and the prototype sheets in `override/`).

Limits:
- No WebKit or Firefox in the sandbox, so iOS needs Robert's phone.
- Headless Chromium can't fire `:active` from emulated touch, even with a test rule. Press states were checked by
  mouse-down instead.
- H.264 films were served as VP9 copies.
- `/api/strava` was stubbed with `data/tally.json`, answering after 450 ms.

Impact and effort are 1–5. Effort 1 means one rule or one line. Effort 2 means a handful of rules, or under
30 lines of JS in one file. Effort 3 or more touches generators.

---

## The fixes, ranked

| # | Fix | Impact | Effort | Where |
|---|-----|:-:|:-:|---|
| 1 | The Ride with me bar shows only the mile number on every inner page (**live now**) | 5 | 1 | `/chrome.js:18,20` |
| 2 | One focus ring that reads on every ground (`--ring`) | 5 | 2 | `/chrome.css`, `/home.css`, `rides.css`, `events.css`, `styles.css` |
| 3 | The mile number rolls through 34 values on every homepage load. Paint it once | 4 | 1 | `/home.js:62–74` |
| 4 | Typing in the sign moves the page under the thumb (phone) and pushes Ride with me below the fold (1440×900) | 4 | 2 | `/home.css` sign block |
| 5 | Film controls: invisible focusable button while playing, no keyboard pause on today's film, scale bounces, caption jumps | 4 | 2 | `home.css`, `rides.css`, `nov7.css`, `build-home.js` |
| 6 | The timing scale, plus folds and the menu opening on it instead of snapping | 3 | 2 | `/chrome.css`, `/home.css`, `/chrome.js`, `/home.js` |
| 7 | Press feedback on touch: no `:active` anywhere, a blue tap flash, 31 hovers that stick after a tap | 3 | 2 | sheets + one listener in `chrome.js`/`home.js` |
| 8 | Reduced-motion gaps: one global guard, and `brief.js` smooth-scrolls regardless | 3 | 1 | `/chrome.css`, `styles.css`, `brief/brief.js` |
| 9 | Focused items hide under the sticky nav and the Ride with me bar | 3 | 1 | `/chrome.css` |
| 10 | Things that move for decoration | 2 | 1 | `rides.css`, `styles.css`, `tonight.css`, `home.css`, `cyclefor.js` |
| 11 | `/brief/` shifts 46 px after load | 2 | 1 | `scripts/build-brief.js:61`, `brief/brief.js:462` |
| 12 | Breadcrumb ring clipped on 915 pages | 2 | 1 | `rides.css:590` |
| 13 | `aria-current` missing from the phone menu | 2 | 1 | `/chrome.js:95–99`, `/chrome.css` |
| 14 | Dead motion code to delete (hero film, old tally bar, ping, chips, cards, wall, row nudge, a stray `}`) | 1 | 1 | `home.css`, `home.js`, `styles.css`, `rides.css` |

---

## 1. The Ride with me bar shows "3,848" and nothing else (impact 5, effort 1). Live on cycleforchange.org

On every inner page (2,517 of them), once `/api/strava` answers, the bar at the foot of the screen loses its
date, its title and its X. It becomes a dark strip with the mile number in it. Confirmed on the live site: on
`/guides/bike-tire-pressure/` at 390 the bar reads **"4,060"** and nothing else
(`shots/LIVE-ridebar-390.png`). Locally it's the same at both widths (`shots/ridebar@1440-guide.png`). The
homepage is fine because it doesn't load `/chrome.js`.

Cause: since a488656 (Oct 19), `scripts/chrome.js` writes `data-cur="2027-04-25"` on `<aside class="ridebar">`
for `/ridebar.js:39`. `/chrome.js:18` paints the tally into **every** `[data-cur]`, so it overwrites the bar's
whole contents with the number.

Fix now, with no rebuild (the tested version):
```js
// /chrome.js:18 and :20
document.querySelectorAll("[data-cur]:not(.ridebar)").forEach(…)
if (document.querySelector("[data-cur]:not(.ridebar)")) (function tryNext(i) { …
```
On the next chrome regeneration, rename the bar's attribute to `data-until` (`scripts/chrome.js:121`,
`/ridebar.js:39`) so the two can't collide again. This should go out as its own small PR ahead of the studio pass.

## 2. One focus ring that reads on every ground (impact 5, effort 2). Tested

Today the ring is `outline:2px solid currentColor` (`chrome.css:62`, `home.css:62`). That works for light
text on dark ground. It fails on **dark buttons sitting on light ground**, because the ring takes the button's
light text colour and draws it on light paper. Measured ring contrast against its ground, Tab-through and a sweep
of every focusable on the 14 pages:

| Where | Element | Ring vs ground |
|---|---|---|
| Desktop nav "Ride with me", every inner page (Tab stop 7) | `.nav .btn--sm` | **1.00:1**, gone |
| "Download the GPX", "Sign up for STP", "Give us the OK" (1,609 pages carry `.btn--ink`) | `.btn--ink` | **1.00:1** |
| "Near me" on `/rides/` and 63 hubs | `#gr-geo` (`.gr-hub .gr-search .btn--bone`) | **1.14:1** |
| "Send my OK" on `/cyclefor/` | `.btn--ink` | 1.14:1 |
| **"Call 988"** on `/resources/` (asphalt ring on the tar door) | `.res-door--now .btn--bone` | **1.08:1** |
| The 988 bar on phones | `.help-bar` | 1.00:1 |
| Play disc on the ride film (asphalt ring drawn on the dark frame) | `.gr-film-play` | 1.08:1 |
| 51 state links on the US map (focus turns a dark state rose-ink) | `.gr-map--us a` (`rides.css:487–488`) | **1.51–2.7:1** |
| Dark kind tiles on `/rides/az/`, `/rides/united-states/` | `.tile-p--ink` (`events.css:285` sets the ring to bone, on bone) | 1.00:1 |
| The ride-report form on the rose field (1,530 pages) | `.dir-report .field` (`outline:0`, the only cue is the 1 px underline thickening to 2 px) | a hairline (4.68:1, 1,256 px change) |

The homepage already patches the nav button (`home.css:848`), but `/chrome.css` doesn't.

**The fix:** one ring colour token. It defaults to ink and flips to plaster inside the dark rooms. The ring
appears instantly and never fades.
```css
/* /chrome.css — in :root (top of file, with the spacing tokens) */
--ring:var(--asphalt);

/* /chrome.css — replaces line 62 */
:focus-visible{outline:2px solid var(--ring);outline-offset:3px}
.foot,.pledge,.ridebar,.help-bar,.res-door--now,.dir-report,.s--creosote,.theme-dark,
.gr-banner,.gr-next,.gr-jump{--ring:var(--paper)}
.help-bar:focus-visible{outline-offset:-5px}          /* the bar is at the screen's edge: draw it inside */
.field:focus-visible{outline:2px solid var(--ring);outline-offset:4px}   /* after line 260; delete outline:0 there */

/* /home.css — in :root */
--ring:var(--asphalt);
/* /home.css — replaces line 62 */
:focus-visible{outline:2px solid var(--ring);outline-offset:3px}
.foot,.ridebar,.s--tar,.s--creosote,.on-creosote,.sign,.nums--bar{--ring:var(--paper)}
.road-play:focus-visible{outline:3px solid var(--asphalt);outline-offset:-9px}   /* ring inside the plaster disc; replaces 667 */
.field:focus-visible{outline:2px solid var(--ring);outline-offset:4px}           /* after 470; delete outline:0 there */

/* /rides/rides.css */
.gr-film-play:focus-visible{outline:3px solid var(--asphalt);outline-offset:-9px}   /* replaces 679 */
.gr-map--us a:focus-visible .gr-us-st{fill:var(--asphalt);fill-opacity:1}           /* 487: focus inverts, never rose */
.gr-map--us a:focus-visible .gr-us-code{fill:var(--paper)}
.gr-map--us a:focus-visible .gr-us-st--3,.gr-map--us a:focus-visible .gr-us-st--4{fill:var(--paper)}
.gr-map--us a:focus-visible .gr-us-code--3,.gr-map--us a:focus-visible .gr-us-code--4{fill:var(--asphalt)}
/* hover keeps the rose-ink fill; split 487 so :hover and :focus-visible are separate rules */

/* /events/events.css — delete line 285 (.tile-p--ink:focus-visible{outline-color:var(--bone)}) */
```
Also add the same per-element fixes to `nov7.css:81` (`.rp-film-play`).

The report fields go from the thin underline to a full ring (7,304 px changed instead of 1,256).

After (`ring_sweep_after.json`, `focus_after.json`):
- No ground failures on any of the 14 pages at either width.
- The weakest Tab stop rose from 1.51:1 to **4.03:1** (the state map). Every button above reads at 12.9–14.7:1.
- What the sweep still flags are false positives: the honeypot input, and the clip input inside `.cf-pick`,
  which draws its ring with `:focus-within`.

## 3. The mile number is an animated counter (impact 4, effort 1). Tested

The agent rules say never animate the mile number, but `/home.js:62–74` (`rollTo`) rolls the last 38 miles
in on every load. Recorded per frame with motion on, it shows **34 different numbers in 800 ms at 390** and 17
at 1440: 3,848 (the baked number), then 3,810, 3,812, 3,814 … 3,848. The page briefly shows a wrong number, and
every `[data-miles]` on the page moves. Under reduced motion it's already one number.

```js
// /home.js — rollTo becomes:
function rollTo(target) { shownMiles = target; paintMiles(target); }
// and drop `rolled`, `rolling` (lines 54, 64–73)
```
After: one value at both widths, motion on or off.

## 4. The sign moves the page while you type (impact 4, effort 2). Tested

**Phone (`#why`, `.sign-play`):**
- The first keystroke turns the 25×9 bar into a 30 px plate.
- "Clear the sign" appears (`display:none` → 44 px), pushing "Say it on video" down **56 px**.
- Once the word passes about 8 characters, the plate wraps under the stencil and pushes **the input you're
  typing in down 40 px**.

Measured layout shift was 0.026 + 0.034 (motion on) and 0.098 (reduced motion) at 390.
Screenshot: `sign390_pair.png`.

**Desktop 1440×900:**
- The first keystroke grows the blank from 34 to 50 px, and the reset button turns the note line into a 44 px row.
- Together they move "Ride with me" (`#heroRide`) from y 832–896 to **871–935**, so the first screen's main tile
  drops below a 900 px laptop fold while the visitor plays with the sign.

The fix reserves the space so nothing below the plate moves. The plate wipe is the one piece of movement left:
```css
/* /home.css, after the Pass 37 phone block */
@media (max-width:759px){
  .sign-play-sign{min-height:78px;align-content:flex-start}          /* room for stencil + plate on two rows */
  .sign-play-reset[hidden]{display:inline-flex!important;visibility:hidden}   /* hold its slot, out of the tab order */
}
/* desktop: the filled plate gives back its extra height; the reset sits in the note's line */
.sign-plate--blank[data-empty="false"]{margin-bottom:calc(var(--w) * -.047)}
.sign-note .sign-reset{position:relative;min-height:0;padding:3px 10px 1px;border-width:1px}
.sign-note .sign-reset::before{content:"";position:absolute;left:0;right:0;top:-11px;bottom:-11px}   /* 44px hit */
```
After:
- Phone: the input stays at the same y for an empty sign, "m" and "my dad and everyone else" at 360, 390 and
  430, with no layout shifts.
- Desktop: the tile moves 2 px instead of 39 and stays on the first screen (`shots_after/sign1440-pair.png`).

**Optional: the art director's call.** The spec gives the plate the 320 ms step. Animating every keystroke
would be busy, so the plate moves only once, when the blank first fills. It wipes on left to right, like a stripe
of wet paint. Clearing it is instant, and the stencil never moves. Tested: 19 frames, no shift, none under reduced
motion.
```css
@keyframes plate-in{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0)}}
@media (prefers-reduced-motion:no-preference){[data-sign-plate][data-empty="false"]{animation:plate-in var(--t-open) var(--ease) both}}
```

## 5. Film play and pause (impact 4, effort 2). Tested except the new markup

What already works, and must stay:
- On phones all three films (`#roadVid`, `#todayVid`, the TSR film) stay a still with a play button.
  Measured: still paused after 1.8 s on screen.
- Every film is muted, and none has an `autoplay` attribute.
- Under reduced motion nothing autoplays on desktop either.
- The reel and the ride film have a play/pause line under the picture.

What's wrong:
- **The big play button stays focusable while it's invisible.** Once a film plays, the disc goes to
  `opacity:0; pointer-events:none`. It is still in the tab order, and it still says "Play the film, 11 seconds".
  Measured: focus lands on an invisible button. Files: `home.css:668`, `home.css:1258`, `rides.css:680`,
  `nov7.css`.
- **Today's film (`#todayFig`) has no keyboard pause on desktop.** It autoplays and loops when on screen. Its
  only control is that invisible disc, and the picture itself is click-only. That fails WCAG 2.2.2 (moving content
  over 5 s needs a pause control).
- **Scale bounces.** Hover is `scale(1.06)` and hiding is `scale(.9)` (`home.css:666`, `rides.css:678`,
  `nov7.css:80`). The agent rules ban scale bounces.
- **The caption jumps.** "Play" and "Pause" differ in width, so "From the ride, Oct 2026" moves 11 px sideways on
  every toggle (87→98 px at 390, 978→967 at 1440).

Fix:
```css
/* /home.css (road + today) — same shape in rides.css for .gr-film-play/.gr-film-fig, nov7.css for .rp-film-play */
.road-play{transition:opacity var(--t-move) var(--ease),visibility 0s}
@media (hover:hover){.road-play:hover{transform:none;background:var(--volt)}}          /* replaces 666: a fill, like every button */
.road-film[data-playing="true"] .road-play,
.today-film[data-playing="true"] .today-play{opacity:0;transform:none;visibility:hidden;
  transition:opacity var(--t-move) var(--ease),visibility 0s linear var(--t-move)}       /* replaces 668, 1258: out of the tab order */
/* rides.css */
.gr-film-btn [data-film-label]{display:inline-block;min-width:2.9em}                     /* Play/Pause, same width */
```
In `scripts/build-home.js` `todaySection()` (line 68), give today's film the reel's line under the picture: a
`<figcaption>` with a `.road-film-btn` that says "Play" / "Pause". In `/home.js:418–436`, wire it the same way
`paintReel` does, setting `data-playing` and the label. Without it, hiding the disc leaves keyboard users with no
control at all.

After (CSS only): the disc fades on the 200 ms step, nothing scales, the disc leaves the tab order, the caption
stays put, and under reduced motion everything is instant.

## 6. The timing scale; folds and the menu on it (impact 3, effort 2). Tested

### What runs today
Computed on every element of the 14 pages with motion on, counted by element:

| Duration | Easing | Elements |
|---|---|---|
| .18s | ease | 291 |
| .15s | ease | 139 |
| .16s | ease | 24 |
| .3s | ease | 16 |
| .25s | ease | 16 |
| .2s | ease | 15 |
| .6s | cubic-bezier(.2,.7,.2,1) | 3 |
| 2.4s infinite | ease-out (`ping`) | 1 |

There are also two JS clocks: the map zoom at 420 ms (`rides/map.js:90`) and the route zoom at 280 ms
(`rides/route.js:66`, against a `.25s` width transition at `rides.css:830`). That's eight durations and three
easings.

### The tokens: exact CSS
Put this at the top of **both** `/chrome.css` (inside the `:root` at lines 15–41) and `/home.css` (`:root` at
18–42), beside the spacing scale. The homepage doesn't load chrome.css. Every section sheet reads these from
chrome.css.
```css
:root{
  /* motion: one scale, one easing (studio pass 1) */
  --t-color:120ms;   /* press, and any colour/fill/border change: hover fills, a state flipping */
  --t-move:200ms;    /* small movement or reveal: a link's arrow, the play disc fading, a bar growing; closing things */
  --t-open:320ms;    /* things that open or arrive: folds, the phone menu, the Ride with me bar, the plate */
  --ease:cubic-bezier(.2,.7,.2,1);
  --ring:var(--asphalt);
}
@media (prefers-reduced-motion:reduce){
  :root{--t-color:0ms;--t-move:0ms;--t-open:0ms}
  html{scroll-behavior:auto}
  *,*::before,*::after{transition-duration:0s!important;transition-delay:0s!important;
    animation-duration:0s!important;animation-iteration-count:1!important;scroll-behavior:auto!important}
}
```
- In `/home.css`, this replaces 783–787. It uses `0s` instead of `.01ms`, so even an `all` transition can't
  fade a ring in. Nothing listens for `transitionend`.
- In `/chrome.css`, this replaces 279–282.
- Opening uses `--t-open`. Closing uses `--t-move`, so things leave a little faster than they arrive.
- Hover only under `(hover:hover)`. Press shows at once, with no transition. `aria-current` never animates (it
  doesn't today, and stays that way).

### Which rules move onto the tokens
| File:line | Selector | Today | Becomes |
|---|---|---|---|
| chrome.css:112, home.css:128 | `.btn` | bg/color/border .18s ease | `var(--t-color) var(--ease)` ×3 |
| chrome.css:138, home.css:155 | `.link::after` | transform .18s | `transform var(--t-move) var(--ease)` |
| chrome.css:176 (add) | `.nav .btn--sm` | **no hover at all** (it's asphalt, but the hover rules skip `btn--sm`) | `transition:… var(--t-color)`; `@media (hover:hover){.nav .btn--sm:hover{background:var(--volt);border-color:var(--volt);color:var(--asphalt)}}` |
| chrome.css:342–343, home.css:1141–1142 | `.ridebar`, `.ridebar.is-on` | transform .25s ease, visibility .25s | `transform var(--t-open) var(--ease), visibility 0s linear var(--t-open)` |
| home.css:1126, 1129 | `.finder-tile`, `.finder-s` | .15s | `var(--t-color)` |
| home.css:1262 | `.today-ask-go::after` | .18s | `var(--t-move)` |
| home.css:664 | `.road-play` | opacity+transform .2s | see #5 |
| styles.css:89 | `.fn-spoke` | background .16s, hover unguarded | `var(--t-color)`; hover inside `(hover:hover)` |
| rides.css:39 | `.gr-tile` | .15s | `var(--t-color)` |
| rides.css:56 | `.gr-day-bar` | height .2s | `var(--t-move)` |
| rides.css:416–417, 443–447 | map layers | opacity .2s | `var(--t-move)` |
| rides.css:459, 481 | `.gr-map-reg-dot`, `.gr-us-st` | fill .15s | `var(--t-color)` |
| rides.css:512, 515 | `.gr-btn-mk`, `.gr-btn-go` | .18s | `var(--t-color)`, `var(--t-move)` |
| rides.css:676 | `.gr-film-play` | .2s + scale | see #5 |
| rides.css:830 + route.js:66 | `.gr-route-inner` zoom | width .25s / JS 280 ms | `var(--t-open)`; JS reads the token (below) |
| rides.css:849 | `.gr-rt-you` | opacity .15s, no reduced guard | `var(--t-color)` |
| events.css:286 | `.tile-art` | opacity .3s | `var(--t-move)` |
| events.css:394, 438 | `.tw-st`, `.gr-map-reg-dot` | fill .15s | `var(--t-color)` |
| events.css:426, 428 | map layers | .2s | `var(--t-move)` |
| events.css:482 | `.pbtn` | .18s | `var(--t-color)` |
| nov7.css:78, 106 | `.rp-film-play`, `.lp-tile` | .2s+scale, .15s | see #5; `var(--t-color)` |
| rides/map.js:90 | region zoom | 420 ms rAF | 320 ms, read from `--t-open` |

The JS can read the token, so it gets 0 under reduced motion for free:
```js
var T_OPEN = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--t-open")) || 0;
```

Once the global guard is in, these per-selector reduced-motion rules are redundant and can go (design-system):
- `chrome.css:281`, `chrome.css:357`
- `home.css:677`, `home.css:1134`, `home.css:1156`
- `rides.css:67`, `426`, `474`, `495`, `530`, `691`, `787`, `799`, `833`
- `events.css:452`, `events.css:523`
- `nov7.css:93`, `nov7.css:119`
- `cyclefor.css:102`, `calendar.css:196`, `brief.css:131`

The last three guard transitions that no longer exist.

### Folds: `<details>` on 1,556 pages snap open
Every fold measured opens in one frame:
- `/find-a-ride/` About
- the TSR "First time on this ride?"
- the Phoenix guide's About
- `/events/2027/riding/` rows
- `/brief/` "How it's worked out"

The good news: the summary itself never moves. Only what's under it moves.

CSS-only (`::details-content` + `interpolate-size`) works in Chromium but not reliably in Safari, and Robert
checks on an iPhone. So the fold animation goes in `/chrome.js` as one delegated listener, using the Web
Animations API, which Safari has supported since 13.1. Tested version:
```js
  /* —— 5. folds: open and close with height and opacity, never a jump (studio pass 1) ——
     The summary stays where it is; only what's under it moves. Reduced motion: the browser's own instant toggle. */
  (function () {
    var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)");
    if (!document.documentElement.animate) return;
    var EASE = "cubic-bezier(.2,.7,.2,1)";
    document.addEventListener("click", function (e) {
      var s = e.target.closest && e.target.closest("details > summary");
      var hit = e.target.closest && e.target.closest("a, button, input, label");
      if (!s || e.defaultPrevented || (still && still.matches) || (hit && hit !== s)) return;   // links inside a summary still go
      var d = s.parentNode;
      if (d.__fold) d.__fold.cancel();
      e.preventDefault();
      var opening = !d.open, h0 = d.offsetHeight, h1, cs = getComputedStyle(d);
      if (opening) { d.open = true; h1 = d.offsetHeight; }
      else h1 = s.offsetHeight + parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth) + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      var ms = opening ? 320 : 200;
      var kids = [].filter.call(d.children, function (k) { return k !== s; });
      d.style.overflow = "hidden";
      var a = d.__fold = d.animate([{ height: h0 + "px" }, { height: h1 + "px" }], { duration: ms, easing: EASE });
      kids.forEach(function (k) { k.animate([{ opacity: opening ? 0 : 1 }, { opacity: opening ? 1 : 0 }], { duration: ms, easing: EASE, fill: "forwards" }).onfinish = function () { this.cancel(); }; });
      a.onfinish = a.oncancel = function () { d.style.overflow = ""; d.__fold = null; if (!opening && a.playState === "finished") d.open = false; };
    });
  })();
```
After, on five folds at both widths:
- 18–20 frames over 320 ms to open and 12–13 frames over 200 ms to close.
- The summary's y is constant throughout.
- Exactly two `toggle` events, so `calendar.js:88` still fills its rows.
- No inline styles or animations left behind. Enter and Space work.
- A link inside a calendar summary still navigates.
- Under reduced motion it's instant.

Programmatic `details.open = true` (`ride.js:151, 188`, `calendar.js:149, 177`) isn't intercepted.

The homepage has no `<details>`, so `/home.js` doesn't need this script.

Not tested: on a fold whose open height is over 1.5 screens (the Phoenix sources list is 7,849 px at 390),
consider fading only and skipping the height animation.

**One fold marker.** On `/find-a-ride/` the About fold shows "+" at **both** ends (the critic's note).
`details.gr-fold` gets `::after` (`rides.css:373`) and `.gr-fold` gets `::before` (`rides.css:570`). Only the ride
page resets the `::before` (`rides.css:652`). The markers also mix an en dash (`"–"`: `rides.css:571`,
`events.css:338`) with a real minus (`"\2212"`: `rides.css:374`).
- Add `details.gr-fold>summary::before{content:none}`.
- Use `"\2212"` everywhere.
- The marker just swaps. It never rotates, because a turning plus reads as a chevron.

### The phone menu snaps open and shut
`#menu` toggles `hidden` (`/chrome.js:34–38`, `/home.js:487–492`), so it appears in a single frame.

What already works: focus goes to the close button, Esc returns focus to the menu button, Tab stays inside the
menu, and the page keeps its scroll.

Tested version for `setMenu` in both files:
```js
var mStill = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)");
var setMenu = function (open, refocus) {
  var anim = !(mStill && mStill.matches) && menu.animate;
  if (menu.__a) { menu.__a.onfinish = null; menu.__a.cancel(); menu.__a = null; }
  if (open) {
    menu.hidden = false;
    if (anim) menu.__a = menu.animate([{ opacity: 0, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, clipPath: "inset(0 0 0 0)" }],
                                      { duration: 320, easing: "cubic-bezier(.2,.7,.2,1)" });
  } else if (anim && !menu.hidden) {
    menu.__a = menu.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: "cubic-bezier(.2,.7,.2,1)" });
    menu.__a.onfinish = function () { menu.hidden = true; menu.__a = null; };
  } else menu.hidden = true;
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  document.body.style.overflow = open ? "hidden" : "";
  if (open) menuClose.focus(); else if (refocus) menuBtn.focus();
};
```
- Opening unrolls the menu down from the header (a height reveal with no layout cost) and fades it in, over
  320 ms in 16 frames.
- Closing fades it out over 200 ms. Reopening mid-close works.
- Focus behaviour is unchanged, and reduced motion makes it instant.
- Screenshot: `shots_after/menu-mid-open.png`.

## 7. Press feedback on touch (impact 3, effort 2). Partly tested (mouse-down proxy)

Today:
- No element on the site has an `:active` style except the map dots.
- A tap shows Chrome's default **blue** tap flash, `rgba(51,181,229,.4)`. iOS shows a grey flash.
- On top of that, **31 `:hover` rules aren't inside `(hover:hover)`**, so on a phone a tapped tile goes dark and
  *stays* dark when you come back. For example, `.res-card:hover` flips the town tiles to asphalt (19 pages), and
  `.fn-spoke:hover` changes the guide tiles' background. Measured: `.fn-spoke` changed colour on touch.
- The full list: `chrome.css:273`; `styles.css:41, 77, 90, 102`;
  `events.css:88, 90, 93, 353, 357, 396, 405, 406, 418`; `calendar.css:69, 116`;
  `rides.css:20, 70, 101, 106, 110, 173, 186, 190, 206, 321, 404, 405, 487, 491`; `tonight.css:274`.

Fix:
```css
/* /chrome.css and /home.css */
html{-webkit-tap-highlight-color:transparent}       /* only together with the press states below */
.btn:active,.gr-btn:active,.res-card:active,.gr-tile:active,.finder-tile:active,.pbtn:active,.fn-spoke:active{transition-duration:0s}
.btn--ink:active,.btn-solid:active,.nav .btn--sm:active{background:var(--volt);border-color:var(--volt);color:var(--asphalt)}
.btn--ghost:active,.btn--bone:active,.pbtn:active{background:var(--asphalt);border-color:var(--asphalt);color:var(--bone)}
.res-card:active,.gr-tile:active{background:var(--asphalt);color:var(--bone)}
.gr-btn:active .gr-btn-mk{background:var(--volt)}
.finder-tile:active{background:var(--paper);border-color:var(--paper);color:var(--asphalt)}   /* home.css */
```
- The press shows the same fill as hover, so it's one family. It appears in the frame of the touch, which is
  under 120 ms, and eases back on `--t-color` when the finger lifts.
- iOS only applies `:active` when a touch listener exists. Add one line to `/chrome.js` and `/home.js`:
  `document.addEventListener("touchstart", function () {}, { passive: true });`
- Move the 31 hover rules inside `@media (hover:hover){…}`.
- Checked with a mouse-down: the nav button turns powder rose. Real touch has to be checked on Robert's phone.

## 8. Reduced-motion gaps (impact 3, effort 1). Tested

Swept every element's computed transition and animation under `prefers-reduced-motion: reduce`.

Still moving:
- `/guides/` (24 elements): `.fn-spoke` background .16s and the `.fn-card img` zoom .6s.
  `styles.css` has no reduced-motion block.
- `/resources/` (3).
- the TSR route's position dot (`rides.css:849`).
- the homepage's hidden ping.
- **`brief/brief.js:107, 223, 280`** call `scrollIntoView({ behavior: "smooth" })` regardless of the setting.

The global guard in #6 brings the CSS gaps to **zero on all 14 pages at both widths** (measured). For brief.js:
```js
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;   // top of brief.js
el.top.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });   // and the other two
```
Already right:
- `hub.js`, `rides.js`, `route.js`, `cyclefor.js` and `map.js` all check the setting.
- Under reduced motion the Ride with me bar arrives instantly (measured) and no film autoplays.

## 9. Focus hidden under the sticky nav and the Ride with me bar (impact 3, effort 1). Tested

- Tabbing down the Phoenix guide at 390, four stops end up partly or fully under the Ride with me bar (46–100%).
- Tabbing the US map at 1440, three states end up under the sticky nav (24–46%).

`home.css:47` already pads the bottom for the old tally bar, but `/chrome.css` doesn't.
```css
/* /chrome.css */
html{scroll-padding-top:calc(var(--nav-h) + 12px)}
@media (max-width:899px){html{scroll-padding-bottom:76px}}    /* the bar is 61px + safe area */
@media (min-width:900px){html{scroll-padding-bottom:96px}}    /* the 420px box, 20px off the foot */
```
After: 0 stops under the bar and 0 under the nav. The skip link sits over the nav by design.

## 10. Things that move for decoration (impact 2, effort 1)

| What | Where | Pages | Recommendation |
|---|---|---|---|
| Six shop-floor photos rise up on load, staggered 70 ms, 700 ms each | `rides.css:770–777` (`gr-rise`) | Friday Shop Ride | Drop the animation. The photos stand still on their hairline |
| Hover zooms the photo to 1.035× over 600 ms | `styles.css:133–134` (`.fn-card img`) | guides, journal, field notes | Drop it. Hover underlines the title (already does) |
| "Tonight · free group rides · soonest first ·" scrolls forever, 32 s loop | `tonight.css:61–62` | `/tonight/` | Make it one still line. It's `aria-hidden` anyway |
| The plate cycles five words every 2.4 s, forever | `cyclefor/cyclefor.js:16–24` | `/cyclefor/` | **For Robert:** this is his documented idea (CLAUDE.md §5). Keep it, but run once through the words and stop on "you". That fixes the never-ending carousel and WCAG 2.2.2. Each word also changes the plate's width (133 → 64 px). The wipe from #4 could carry each change instead of a jump |
| Pulsing ring around the live dot, 2.4 s infinite | `home.css:325–328` | home (inside a hidden tally line) | Delete. It's invisible today and reads "tech" if it ever shows |
| The link arrow nudges 4 px on hover | `chrome.css:139`, `home.css:156` | all | Keep it on `--t-move`. The arrow is the link's affordance (CLAUDE.md §3) |

## 11. `/brief/` shifts 46 px after load (impact 2, effort 1). Tested

This is the only load shift on the 14 pages (CLS 0.009 at 390, 0.0026 at 1440). `brief.js:462` sends a HEAD
request for `sample.gpx`, then un-hides "Try one of Robert's rides". That pushes the fold and the closing block
down 46 px about 100 ms in.

`cfc-site/brief/sample.gpx` is committed (331 KB), so build it visible: drop `hidden` in
`scripts/build-brief.js:61`, drop the HEAD check, and bump `V`. If the check has to stay, reserve the line
instead with `.bf-sample{min-height:44px}` and `.bf-sample[hidden]{display:block!important;visibility:hidden}`.
Either way the result is 0.

## 12. The breadcrumb ring is clipped on 915 pages (impact 2, effort 1). Tested

`.gr-head{overflow:hidden}` (`rides.css:590`) cuts off the top of the ring on the first crumb ("Group rides").
The crumb's 44 px hit area overhangs the header by 14 px (`rides.css:595`). Replace the rule with
`.gr-head{overflow-x:clip}`, which still stops the header art from widening a phone page. The ring then draws
whole around the 44 px target (`shots_after/grhead-pair.png`).

## 13. `aria-current` in the phone menu (impact 2, effort 1). Tested

The desktop nav underlines the current section. The phone menu marks nothing, so on a phone you can't tell
where you are from the menu.
```js
// /chrome.js:95–96
var SECTION = { …, "/guides/": /^\/(field-notes|guides|journal)\//, … };   // the menu links /guides/, the nav /field-notes/
document.querySelectorAll(".nav-links a, .menu-list a").forEach(function (a) { … });
```
```css
/* /chrome.css — static, never animated (prototype; type-layout may prefer the row's hairline going ink instead) */
.menu-list a[aria-current="page"]{text-decoration:underline;text-decoration-thickness:3px;text-underline-offset:8px}
```
Tested: "Find a ride" is marked on `/rides/` (`shots_after/menu-mid-open.png`). The critic already flagged "Field notes" vs "The guides" as one
section with two names. That's for ux-architect.

## 14. Dead motion code (impact 1, effort 1). For design-system

None of these selectors or ids exist on the pages any more:
- `home.css:184` `.nav` colour transition: the nav no longer changes, since Pass 23b.
- `home.css:319–370` `.hero-film`, `.film-btn`: there's no `#heroVid`.
- `home.css:420` `.chip span`.
- `home.css:695–696` `.card img` zoom.
- `home.css:756–773` `.bar`: there's no `#bar`.
- `styles.css:40–41` `.fn-row` and its hover padding nudge.
- `rides.css:788–799` `.gr-wall-track` marquee: the drawing is saved, not shown.
- `/home.js:341–377` (hero film) and `442–480` (the old bar).

Also, **a stray `}` at `home.css:789`** makes the parser throw away the next rule. `.faq-h{margin:0 0 12px}` never
applies (the CSSOM only has `.faq + .faq-h`). It's harmless today because the page has no `.faq-h`, but it will
silently eat whatever rule lands there next.

---

## Measurements

**Layout shift, load + 3 s + a slow scroll to the foot.** 14 pages × 390/1440 × reduced motion on/off:

| | Before | After (prototype) |
|---|---|---|
| Load | 0 everywhere except `/brief/` (0.009 / 0.0026) | 0 everywhere |
| Scroll | 0 everywhere | 0 everywhere |
| Typing in the sign at 390 (shifts right after input, which CLS doesn't count but a thumb feels) | 0.060 (motion on) / 0.098 (reduced) | 0 |

**Focus:**

| | Before | After |
|---|---|---|
| Rings under 3:1 against their ground | the 10 kinds in #2, 51 state links, every inner page's nav button | none |
| Weakest Tab stop | 0 (no visible ring) | 4.03:1 |
| Focus ring fades in | `transition:all` under the old `.01ms` guard: technically yes, not visibly | never |

**Moving parts:**

| Part | Before | After |
|---|---|---|
| Mile number on load | 34 values / 800 ms | 1 |
| Phone menu | 1 frame | 320 ms open, 200 ms close; reduced motion: 1 frame |
| Folds | 1 frame | 320 / 200 ms, summary still; reduced motion: 1 frame |
| Ride with me bar | slides in 250 ms ease, **contents overwritten** | 320 ms on `--ease`, contents intact |
| Hover fills | .15–.18 s ease, settle in 143–163 ms; the nav Ride with me has no hover | 120 ms `--ease`, settles in 107 ms |
| Under reduced motion, elements still moving | 29 on the 14 pages, plus brief.js's 3 smooth scrolls | 0 |

**Films:**
- On phones nothing autoplays (all three paused after 1.8 s on screen), before and after.
- On desktop they autoplay muted when 40% on screen; with reduced motion, never.
- Sound never plays.

## Hand-offs
- **design-system:** #14 dead code; the redundant reduced-motion rules listed in #6; one fold marker (#6).
- **ux-architect:** "Field notes" vs "Guides", one section with two names (#13).
- **Before the pass:** ship #1 alone. It's broken on the live site.
- **For Robert:** whether `/cyclefor/`'s plate stops after one turn (#10), and whether the sign's plate gets the
  one-time paint wipe (#4, the art director's call).
