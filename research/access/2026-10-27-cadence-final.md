# Access and speed: the homepage after the Cadence final pass

**Tested:** `design/2026-10-27-cadence-final` at cbbc7224ed. I served the repo's `cfc-site/` directly. The tested files
were the same at the start and the end of the read (sha1: index.html 9e1c9990, home.css 25bad64d, home.js 7e0c7f89,
chrome.css 2a44f1bd, ridebar.js a79ee614, chrome.js 0f97f13a).
**How:** an in-process `http.server` started by the same Python process that drives Playwright 1.63. It supports Range
requests, gzips text the way Netlify does, and returns 404 for `/api/` and `/.netlify/`. I tested in Chromium and in
WebKit 26.6 (the Linux build, not an iPhone). Every request off localhost was aborted. Scripts are in
`scratchpad/access/cf/` and screenshots in `scratchpad/pass/access/`. None of it is committed.
**Sizes:** 390×844 first, then 375×667, 360×640, 430×932, 820×1180, 1024×768 and 1440×900. The hero was also read at
1280×800, 1920×1080, 844×560 and 932×560, and I checked a phone on its side at 844×390.
**Method:** the same as the Oct 26 read. Contrast is read per pixel with the text made transparent, scored at the 5th
percentile. The hero was read on the poster and on every 0.1 s of the film: 46 frames for the phone film, 31 for the
wide one. A focus ring is the set of pixels that change when its outline is removed. This time I added two methods:
- Text drawn by `::before` / `::after` (How this works' numerals and every arrow) is read the same way.
- Plates whose line box overhangs the plate are read on glyph pixels only.

## Verdict: pass once F1 and F2 land

The page passes WCAG AA at every size. Two hit areas fall a few pixels short of the house 44px floor at 1024–1280, which
includes iPad landscape, a touch screen. Each needs one value changed in `home.css`. I measured both with the change
injected. Nothing else has to change for sign-off.

**F1: "Read the last ride" in `#road` is 144×43 at 1024.**
- Why: the side column is four columns wide, so its two links stack 16px apart. Each `.link::before` pad reaches 10px,
  so the pads overlap by 4px and Follow on Strava's pad wins.
- Where: `cfc-site/home.css` line 290.
- Change: `.miles-acts{display:flex;flex-wrap:wrap;gap:16px 32px;margin:0}` → `gap:20px 32px`. This is the same fix as
  `.find-links` on Oct 26.
- Measured with it: 47 tall. No overlap at 1024, 1100, 1180, 1280, 1366 or 1440.

**F2: the Trevor number in the orgs room is 118×42 at 1024–1280.**
- Why: in the ≥1024 column, "Help lines, by age" sits 8px under the number (`gap:var(--s1)`). Its pad reaches 10px up
  and takes the number's bottom 2px. A tap on that strip opens `/resources/`, not a call.
- 988 and Trevor no longer overlap anywhere (see Taps).
- Where: `cfc-site/home.css` line 396.
- Change: in `.orgs-help{grid-column:9 / -1;flex-direction:column;align-items:flex-start;gap:var(--s1)}`, set
  `gap:var(--s2)`.
- Measured with it: 120×45 at 1024, 1100, 1180 and 1280. Nothing overlaps.

## The floor

| line | result |
|---|---|
| 390px first; nothing scrolls sideways | **Pass.** 0px of overflow and no element cut at the edge, at all 9 sizes, in Chromium and WebKit. |
| `tools/hero-contrast.py` | **Pass** (exit 0). The tightest line is 360×640 at 6.28:1 against the 4.5 it needs. The two links read 8.00–10.46. |
| Contrast, everything new or moved | **Pass.** The hero's worst frame and the items below are in §1. Below the hero, the lowest line is still the footer's patina eyebrows at 4.52. |
| Tap targets 44px | **Pass on phones.** At 1024–1280, F1 and F2 above. |
| Visible focus | **Pass.** Every hero stop reaches 3:1 on 100% of its ring pixels on every frame, at 8 sizes. The #today disc draws its ring inside itself. |
| Labels on every field | **Pass.** `#q` and `#who` have `<label for>`, and the find field's mark is `aria-hidden`. |
| Keyboard path | **Pass.** The first Tab no longer jumps the hero. The disc's label says Play / Pause. No stop lands under the bar or off screen (§2). |
| Headings and landmarks after the reorder | **Pass.** One h1, no skipped level, and regions in markup order (§3). |
| Reduced motion | **Pass.** Both films stay stills. 0 of 720 elements, and none of their `::before` / `::after`, transition or animate (§4). |
| Under 3 s throttled | **Pass.** LCP is 1.51 s at 390, 1.51–1.81 s at every size. CLS is 0 at load and after a scroll-through at every size (§5). |

## 1. Contrast

**The hero, worst of the poster and every 0.1 s frame** (needs 3 for the intro, 4.5 for the rest):

| size | intro | his line | Find a group ride | Read the last ride | pause label | pause icon | stencil (box) |
|---|---|---|---|---|---|---|---|
| 390×844 | 6.14 | 6.82 | 8.29 | 8.48 | (hidden) | 13.64 | 5.29 |
| 375×667 | 6.00 | 6.88 | 8.11 | 8.41 | (hidden) | 13.58 | 5.35 |
| 360×640 | 5.82 | 6.83 | 8.14 | 8.41 | (hidden) | 13.58 | 5.37 |
| 430×932 | 6.15 | 7.38 | 8.29 | 8.48 | (hidden) | 13.64 | 5.23 |
| 820×1180 | 6.50 | 6.75 | 8.19 | 8.25 | 13.57 | 13.62 | 4.89 |
| 1024×768 | 6.75 | 7.24 | 9.71 | 8.96 | 11.29 | 12.66 | 4.46 |
| 1280×800 | 6.91 | 7.59 | 10.04 | 9.28 | 8.31 | 9.12 | 4.56 |
| 1440×900 | 6.99 | 7.68 | 10.02 | 9.32 | 8.43 | 8.38 | 4.56 |
| 1920×1080 | 6.99 | 7.59 | 9.65 | 9.25 | 8.46 | 8.69 | 4.80 |
| side-on 844×560 | 5.60 | 7.07 | 9.46 | 8.56 | 13.74 | 13.84 | 4.79 |
| side-on 932×560 | 5.66 | 6.81 | 9.82 | 8.72 | 12.47 | 14.35 | 4.81 |

- The other hero items don't change between frames:
  - The header over the film reads 15.91 and the menu lines 15.91.
  - On the Ride with me tile, the Feb 6 plate reads 4.68 (glyph pixels) and the name line 7.15.
- The stencil is read over its whole box, which includes the powder bar.

**The new and moved pieces:**
- **#road**: the `111` numeral is 15.21 (900, 36–68px; min 13.0). "rides since June 1." is 8.93–9.10.
- **How this works**: the 1 2 3 (CSS counter, 900, 27–44px) are 12.93 on concrete.
- **Map squares** (760 and up):
  - The ink squares' numerals are 14.73, and the squares read 6.16–14.73 against the map.
  - On the soft squares (11, 12, 13) the numeral is gunmetal on plaster, 7.15. The plaster fill is the map's own
    colour, so the dashed `--dust-deep` edge draws the square: 3.21 against the map at its lowest and 3.66 against
    the fill (needs 3).
  - The map is `aria-hidden` and the list carries the same rides. There, the dashed date block reads 3.21 on
    concrete, and the row says "projected" in words.
- **Read rows**: the title arrows (`b::after`) and the asphalt small text are both 14.73 on plaster.
- **Find field mark** (`.find-mk`, gunmetal on plaster): 7.15. The field and the button are both 52px tall.
- **#today disc**: its glyph is 14.73 on its plaster.
  - Against the poster and every 0.1 s of the film, the disc's own edge reads 1.05–1.12 on the pale mural frames.
  - 1.4.11 is met by the glyph, which is the icon that identifies the button. The site's `.gr-film-play` on ride pages
    works the same way.
- **Plates**, read on glyph pixels: the #today plate, the two "the Center", SFAF and Feb 6 are all 4.68.
  - The automatic line-box read scores the #today plate at 1.14, because its line box overhangs the plate. That number
    is not the text.
  - "April 23–25," is 14.73 on its glyphs; its line box read 3.15.
- **Every arrow in the moved sections** (`.link::after`, the strip, the log's dash): 8.73–15.36.

**Below the hero, lowest line per section** (the same at 390 and 1440):

| section | lowest |
|---|---|
| strip, How this works, the story, #today | 6.28 |
| #road (tar, asphalt texture) | 8.94 |
| orgs (patina) | 8.73 |
| the 2027 list, plates | 4.68 |
| Ride with me, Find, Read | 7.15 |
| the sign and its placeholder | 9.02 |
| footer (drained pool) | 4.52 |

## 2. Keyboard and focus

**Tab order, phones** (68 stops at 390):
- The hero: skip → menu → Ride with me → Find a group ride → Read the last ride → Pause.
- Then: on Strava → 1,423 → 640 → Powered by Strava → Read the last ride → Follow on Strava → What do you cycle for? →
  the #today disc → three Give links → 988 → Trevor → Help lines → All my 2027 rides → the 13 rows → …

**At 900 and up** (72 stops): skip → the five nav links → Ride with me → Find a group ride → Read the last ride →
Pause → …

**The jump is gone:**
- `scrollY` stays 0 through every hero stop, in Chromium at 360, 375, 390, 430, 820, 1024 and 1440, and in WebKit at
  360, 375, 390 and 1440.
- On a phone on its side (844×390) the hero is taller than the screen, so Tab scrolls 196px to bring Ride with me into
  view. That is expected.

**Nothing hides under the bar:**
- I tabbed through the whole page at 360, 375 and 390 in both engines and waited for the smooth scroll to settle at
  each stop.
- Chromium: no stop sits under the bar, under the header or off screen.
- WebKit at 390: the sign field lands with its bottom 3px under the bar, about 95% of it in view (see M8).
- Scroll padding is 0 while the bar is off and 76px while it's on. At 900 and up it's 0, and the bar is
  `display:none`.

**Rings:**
- Over the film:
  - Menu, Ride with me, both links and Pause reach 3:1 on 100% of their ring pixels, on every frame, at 390, 375, 360,
    820, 1024, 1280, 1440 and 1920. That includes Pause at 1024 and up (last read's F1).
  - One 1280 capture read Pause at 45%: the looping film restarted mid-capture. The rerun read 100%.
- Everywhere else on the page the rings reach 3:1 on 99–100% of their pixels.
- The #today disc:
  - Its ring is 3px of asphalt inside the disc, 14.73 at its core.
  - 91–94% of the ring's pixels reach 3:1 at 2–3x pixel density, and 88% at 1x. The rest are the circle's antialiased
    edge.

**The disc as a control:**
- Its label reads "Play, 3 seconds", then "Pause" while it plays, then "Play, 3 seconds" again.
- The glyph swaps with the state, and the disc never fades.
- Enter and Space both toggle it.
- It is the only control on that film, and the 0:03 line is gone.

**The menu and the sign:**
- The menu works as before. Close takes focus first, Tab cycles through its 9 stops, and Esc puts focus back on the
  menu button.
- Typing in the sign changes the plate and the h2's hidden text. "Clear the sign" puts focus back in the field.

## 3. Taps, headings, landmarks

**Taps (hit area, the run of pixels a tap gives to the link):**
- **The hero's stacked links at 360, 375, 390 and 430:** Find a group ride is 140×47 and Read the last ride 144×47.
  They share no pixel, and neither shares one with Pause. From 760 they sit on one row, at the same sizes.
- **988 and Trevor:**
  - In the orgs room, 988 is 104–112 × 44–45 and Trevor 114–122 × 44–45, at 360–1440. Their boxes meet edge to edge,
    and neither steals a pixel of the other.
  - In the footer: 112×44 and 122×45. In the menu: 112×45 and 122×45.
- **The rest:**
  - The #today disc is 72×72. Powered by Strava is 118×44, and No-drop rides 117×47.
  - The Ride with me bar is 342×60, and its close 48×60.
  - The menu rows are 357×66.
- **Exempt:** "on Strava" sits inside the strip's sentence (59×18), so it's an inline target under 2.5.8.
- **Failing:** F1 and F2.

**Headings and landmarks:**
- Headings in DOM order: h1 Cycle for Change → h2 How this works → h3 ×3 → h2 It always says cycling → h2 The last
  rides → h2 I rode for mental clarity → h2 The orgs I ride for → h3 ×3 → h2 The 2027 rides I'm doing → h2 April
  23–25, I cycle for the Center → h2 Find a group ride → h2 Field notes, guides, the journal → h2 Cycle for. No level
  is skipped.
- Landmarks: banner; nav "Primary" at 900 and up; main; 12 named regions in markup order; search; contentinfo; and the
  bar's complementary on phones (gone with the bar at 900 and up).

**Images and media:**
- All 6 `<img>` have alt: 5 describe the picture, and the map's `alt=""` sits inside an aria-hidden figure.
- The hero `<video>` is `aria-hidden` and `tabindex="-1"`. `#todayVid` has an aria-label.
- `#log` is `aria-live="polite"` and holds 4 rows. There are no duplicate ids.

**axe 4.14** (wcag2a/aa, 21aa, 22aa, best-practice): **0 violations** at 390 and 1440. Three items came back
incomplete:
- The `.signup` aria-label (M4).
- Contrast over the film, which axe can't read; §1 covers it.
- Captions on `#todayVid`, a silent clip, so none are needed.

## 4. Reduced motion and the films

**Reduced motion: pass** in Chromium (390 and 1440) and WebKit (390).
- The hero film gets no `src` and the poster stays. #today's film doesn't start when it comes into view.
- Across 720 elements and their pseudo-elements, the transition and animation durations are all 0s.
- After a full scroll there are 0 running animations, and smooth scrolling is off.
- A press on either control plays its film, and a second press stops it.

**The hero film's safeguards hold, unchanged:**
- It starts 0.33 s after load.
- Off screen it pauses, and it resumes when it's back.
- A stop holds for the tab: after a reload the poster stays until Play.
- Save-Data and 2g/3g keep the still. Under my throttle Chromium reports 4g, so the film loads.
- A phone turned on its side swaps to `hero-wide-9`.
- The gap on iPhone is the same as before: Safari has no `navigator.connection`, so only Reduced Motion and the button
  stop the film. It now costs 906 KB per phone visit (it was 805).

**#today's film:**
- At 900 and up it plays when it's on screen and pauses off screen. Under 900 it waits for a tap.
- It does not check Save-Data (M6).

## 5. Weight and speed

**Throttle** (Chromium CDP): 4× CPU, 1.6 Mbps down / 750 kbps up, 150 ms RTT, cache off. KB = 1,000 bytes as sent with
gzip.

| size | FCP = LCP | load | CLS (load / scroll) | first load | film after load | total |
|---|---|---|---|---|---|---|
| 390×844 | **1.51 s** | 1.74 s | **0 / 0** | 298 KB | +906 KB `hero-phone-8.mp4`, starts 2.02 s | 1.27 MB |
| 375×667 | 1.72 s | 1.68 s | 0 / 0 | 239 KB | +906 KB | 1.27 MB |
| 360×640 | 1.81 s | 1.76 s | 0 / 0 | 240 KB | +906 KB | 1.27 MB |
| 820×1180 | 1.78 s | 1.75 s | 0 / 0 | 249 KB | +906 KB | 1.27 MB |
| 1024×768 | 1.74 s | 1.80 s | 0 / 0 | 301 KB | +943 KB `hero-wide-9.mp4`, starts 2.11 s | 1.53 MB |
| 1440×900 | 1.64 s | 3.37 s | 0 / 0 | 592 KB | +943 KB, starts 3.64 s | 1.53 MB |

**The poster and the LCP:**
- Chrome reports `p.hero-intro` as the LCP, because it treats an image that fills the viewport as a background.
- At 390 the poster (`hero-phone-8.avif`, 45.0 KB) has arrived by 1.28 s and paints in the first frame, at 1.51 s.
- At 1440 the poster (`hero-wide-9.avif`, 98.4 KB) arrives at 1.66 s.
- Unthrottled, LCP is 0.19–0.32 s.

**First load at 390:**
- HTML 11.3, CSS 26.4 (chrome 15.3 + home 11.1), JS 8.2 (home 6.1 + ridebar 2.1), font 39.4 (KB).
- Images: the poster 45.0, #today's video poster 53.4 (M3), asphalt texture 42.1, dash 0.6.
- The Boise portrait (`robert-boise-2.avif`) adds about 71 KB. The reorder put it on the second screen, so Chrome's
  lazy loader starts it during load on a slow link. That moves the load event, not the LCP.
- The 1440 load event waits on the two story photos (138 + 174 KB), as it did before.

**The films:**
- The phone film is 906 KB for 4.5 s. The wide film is 943 KB for 2.93 s, down from 1.36 MB for `hero-wide-7`.
- Each comes in one Range request after load, and the poster stays until it plays.

**CLS:**
- The Pause button is 148×48 at 760 and up in both states, and 48×48 below 760. The label swap after autoplay moves
  nothing.
- The nav's font-swap shift from v7 (0.0007 at 1024) is gone.

**The page's own code:** no library. CSS is 95.7 KB raw / 26.4 KB gzip, and JS 21.1 KB / 8.2 KB.

**Console:** only the two expected 404s (`/api/strava`, `/.netlify/functions/strava`). WebKit logged one aborted film
request, from closing the page.

## Last read's list

- **Fixed:**
  - F1: the pause ring, now 100%.
  - F2: `aria-pressed` is gone.
  - F3: Powered by Strava is 118×44.
  - F4: No-drop rides is 117×47.
  - F5: the Trevor number stays on one line in the footer and the menu.
  - M1: the disc ring is unlayered and drawn inside the disc.
- **Still open, minor, none blocking:**
  - **M2.** The skip link shows as an asphalt box on the tar header. Its text reads 12.93, but its ring is 1.1:1
    against tar. It passes, because the link appearing is the focus indication.
    - Fix: `.home .skip{background:var(--paper);color:var(--asphalt)}`
  - **M3.** `#todayVid` sets `poster="/film/today-oct12-1.webp"`, so 53.4 KB loads at 0.27 s on every first visit, at
    every size, alongside the hero poster. #today now sits even further down the page.
    - Fix: `data-poster`, set by an IntersectionObserver with `rootMargin:"800px"`.
  - **M4.** `div.foot-col.signup[aria-label]` (chrome.js, every page): an aria-label on a div with no role does
    nothing.
  - **M5.** Without JS, the menu button (under 900) and the #today disc render but do nothing.

## New, minor (no fix needed to ship)

- **M6. Save-Data doesn't hold #today's film at 900 and up.**
  - The film starts on screen when `tUser === null && wide && !reduce` (home.js, the IntersectionObserver in the today
    block), which is 338 KB of WebM in Chromium, 373 KB of MP4 elsewhere.
  - Fix: give that condition the hero's Save-Data / 2g / 3g test.
- **M7. Tab order in #road from 1024.**
  - The log's "Powered by Strava" is on the right, and it comes before the side column's two links on the left.
  - Meaning and operation hold (2.4.3), so this is a reading-order wrinkle only.
- **M8. WebKit at 390: the focused sign field ends 3px under the bar.**
  - That 3px is the bottom of its rose underline and the ring under it. About 95% of the field stays in view, so 2.4.11
    passes.
  - Chromium centres the field instead.
- **Already there before this pass:** on a phone on its side (844×390), the bar is on from the first screen and covers
  the last line of the hero text.
  - The bar keys on `#heroRide`, which is below the fold there.
  - ridebar.js is unchanged by this pass.
