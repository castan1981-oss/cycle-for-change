# The editorial homepage: art director's sign-off (Tue Oct 27, 2026)

Branch `feat/home-editorial-film`, draft PR #215, read at 46b6f3fa99 (v6) plus c5af3d7217 (the brand gate's sixth read).
Nothing is live. This is the final visual call before Robert and Cadence see it. No site file was changed.

What I read: my v2 brief (`art-director.md`), the approved direction (`brief.md`), CLAUDE.md §3 "The editorial homepage",
the critic's five reads (`critic.md` … `critic-v5.md`), the brand gate's six (`research/brand/2026-10-26-home*.md`), the
access desk's working output (scratchpad `access/out/v5/`, its v6 run still going), and the v6 diff.
Screenshots: `R/` = `/tmp/claude-0/-home-claude/42a8e16b-6128-5358-8471-887b1648b6bf/scratchpad/review/` (`before/`, `after6/`,
`after6-reduced/`, `film6-*-sheet.jpg`). My own checks: `AD/` = `…/scratchpad/ad6/` (`wide-rot.png`: the wide film's first
half-second; `forest-src.png`: the forest shot's source at 5.75 s and 6.2 s; `lab/tasks-*.json`: where each core task's
first link sits on the homepage, live against v6).

## The call

**Not ready yet. Close.** The page is right. Two small visual fixes (one recut, one CSS rule) and two gates that haven't
filed stand between it and Robert's phone. None of it is a design round. After the fixes, one cold read and one brand read
of the new poster, then it goes to Robert and Cadence as one preview with before and after.

Why it's close:
- Below the hero, this is the most finished the site has been: labelled hairlines, one opener size, the map over the
  date-block list, the orgs on patina with 988 and Trevor inside the room, the closing sign (R/after6/1440-02 to -05,
  390-03 to -06).
- The first screen answers who, what and what next at every size down to 375×667 (R/after6/375se-first, 390-first,
  1440-first).
- The critic's last read (v5) is 37 against 35 with no line dropped, and the brand gate passed v6.
- The live homepage's reel (`road-film-2`) has a car in two shots (the brand gate's v2 and v5 reads). This page takes it
  off.

Why it's not done:
- The 1440 poster cuts a rider in half at the window edge. That frame is the LCP and the only picture a reduced-motion,
  Save-Data or slow-connection visitor gets.
- The stop button sits off the grid at 1440, and the access desk measured its label under 4.5:1 at wide sizes.
- access-speed and the usability lab haven't filed on this pass. The studio bar needs both. Task 4 is slower by
  construction, so it goes to Robert as a decision. The other five tasks are no slower.

## Against my sign-off list (v2 brief)

| Check | Result | Evidence |
|---|---|---|
| No seam or cut crosses type at 360×640, 375×667, 390×844, 430×932, 820×1180 | Pass | One full frame on phones and portrait screens (R/after6/390-first, 375se-first, 820-first) |
| His face above the mark in the poster | Pass, tight at 1440 | Phone: clear air (R/after6-reduced/390-first). 1440: his chin at y ≈ 360, the stencil's cap line at 370 (R/after6-reduced/1440-first) |
| The still is sharp, in daylight, his face | Phone pass. Wide: fails | The wide poster's narrow panel cuts the forest rider in half (`cfc-site/film/hero-wide-6.jpg`, x ≈ 1400–1620; R/after6-reduced/1440-first, x 1270–1440). Must-fix 1 |
| No shot under 1.0 s | Misses by 0.05 s. Waived | s1_mint and s5_forest run 0.95 s, the whole of each clean clip in the repo. Footage, decision 2 |
| No shot on screen twice within 3 s | Fails. Waived | Four clean shots in a 3.1 s loop of two panels means each plays twice. Footage, decision 2 |
| Wide: no two panels cut within 0.4 s | Superseded | Since v5 the panels cut together in pairs. One cut across the frame reads as one edit and is calmer than staggered cuts. I accept the change |
| Phone mp4 ≤ 2 MB; LCP no worse | 804 KB, pass. LCP pending | The access desk's earlier run had text LCP about 1.3 s throttled, CLS about 0. Its v6 run is going |
| 1440: words in panel 1, blank clear of the gutter, nothing off the 12-column lines | Pass, except the stop | Words end x 720, gutter 1025–1030, strip at 96/520/944, story photos at 626/1050, ledes at 838. The stop ends at 1383 against the 1344 edge (R/after6/1440-first). Must-fix 2 |
| Phone length ≤ 13,500 px at 390 | Pass | 11,853 (live 10,934, +8%) |
| Rose only on blanks, plates, lanes and strokes | Pass | Counted on R/after6/390-00…07 and 1440-00…05. The rose "change" plate inside the LOVE-wall selfie is his own picture |
| Said once | Pass | 10,000 at display size once (`#road`); 4,273 once (the strip); no counts table; Center Ride Out in `#year` and `#ride` only |
| No copy that isn't already the site's | Pass, with Robert's OK pending | The brand gate's list of strings new to the homepage (`research/brand/2026-10-26-home-v2.md`, "New strings") still needs his yes |

## Against the studio bar

| Gate | State |
|---|---|
| Critic, cold | v5: 37 against 35, no line dropped. v6 hasn't been read. One more cold read on the build that goes to Robert (below) |
| Usability lab | **Not filed.** My spot check is below. It doesn't replace the lab's run |
| brand-ambassador | v6 passes (`research/brand/2026-10-26-home-v6.md`). Needs one more look at the new wide poster after must-fix 1 |
| access-speed | **Not filed.** The v6 run started 01:09. Its v5 run had one fail: "Play the film" at 3.86:1 over the poster at 1280×800 and 1920×1080 (needs 4.5). Its own test with a .7 ground passed at 6.36. Must-fix 2 carries that |

**My spot check of the six tasks** (homepage leg only; page y of the first visible way to the answer, reduced motion;
`AD/lab/tasks-before.json`, `tasks-after6.json`):

| Task | 390 live → v6 | 1440 live → v6 | Verdict |
|---|---|---|---|
| 1 What is this, whose | first screen → first screen | first screen → first screen | Same |
| 2 A group ride in Phoenix | tile y 734 → "Find a group ride" y 776, both to `/rides/` | header "Find a ride" → same | Same |
| 3 His next ride, how to ride it | tile y 660 → tile y 687 | header y 10 → hero tile y 732 | Same, first screen |
| 4 His latest write-up | y 810 (first screen) → **y 5,046** | y 758 → **y 4,101** | **Slower**: about six phone screens, four and a half at 1440. Decision 1 |
| 5 A guide | menu → Guides, 2 taps | header Guides | Same |
| 6 Help now | menu → Resources, 2 taps (plus "Help lines, by age" at y 7,835, new) | header Resources | Same |

## Must fix before Robert sees it

Ranked. Owners: **A** = markup builder (generators, film, images, CSS_V, CLAUDE.md). **B** = CSS builder
(`cfc-site/home.css` only).

**1. The wide poster: start the loop where the forest rider is whole.**
Moves 6, 10 · impact 3, effort 1 · A · `tools/hero-film.py` (`WIDE`, `build()`/`encode()`), `scripts/build-home.js`
(`FILM.wide`), CLAUDE.md §3 and §10 (file names).
- *Evidence:* `cfc-site/film/hero-wide-6.jpg` and R/after6-reduced/1440-first. The narrow panel shows an orange sleeve, a
  hand and half a wheel at the window's edge. The critic named this in v5 (item 3), and v6's crop change (`s5_forest`
  focus .5 → .75) doesn't reach frame 0. At 5.75 s in road-film-2 the rider is on the source frame's own right edge
  (`AD/forest-src.png`, left), so no crop can fix that frame. Half a second later he's in the middle of the trail.
- *Change:* rotate the wide film so it starts 0.35 s in. The film is frames 0.35–3.1 of the current cut, then 0–0.35. Same
  frames, same paired cuts (now at 0.60, 1.80 and 2.75 s). The loop point falls mid-shot, so the loop stops showing a
  seam. Frame 0 is his face beside the whole rider (`AD/wide-rot.png`, the 0.35 frame; 0.25 also works). The poster is
  still frame 0. The phone film doesn't change. Write `hero-wide-7.*`. Run `python3 tools/hero-contrast.py`.
- *Accept when:* at 1440×900, 1280×800 and 1024×768, the poster's narrow panel shows the whole rider inside what the
  screen shows (object-fit takes about 40 px off the right at 1440 and 136 at 1024). The brand gate reads the new frame 0.
  Every frame is one it has already cleared, so this is a look, not a review.

**2. The stop button: on the content edge, its label at 4.5:1.**
Moves 4, 9 · impact 2, effort 1 · B · `cfc-site/home.css` line 88, `.hero-pause`.
- *Evidence:* R/after6/1440-first. The box runs x 1254–1383, 39 px past the 1344 edge every other thing on the page stops
  at. The critic called it out in v5 too. The access desk's v5 run measured the label at 3.86:1 over the poster at 1280×800
  and 1920×1080.
- *Change:* `right:max(var(--gut),calc((100vw - var(--maxw)) / 2 + var(--gut)))`, the footer's own edge (`chrome.css`
  line 639), and `background:rgba(20,18,24,.7)`, the access desk's tested ground. Hover stays .85, press stays tar. Re-run
  hero-contrast.py and the access desk's ring check, because the box now sits over different pixels.

**3. File the two missing gates on the build with 1 and 2 in it.**
- `access-speed`: its report in `research/access/` (contrast on every frame of both films at the nine sizes, rings, motion
  under reduced motion, Save-Data and 2G/3G, LCP and CLS throttled, WebKit). Pass or the one thing that fails.
- `usability-lab`: the six core tasks at 390 and 1440, live against this build (taps, scroll depth, first screen yes or
  no, smallest target on the way). Task 4 will read slower, and that's decision 1. Any other task slower comes back to me.

**4. One cold read and one brand look, then stop.**
- `design-critic` reads the final build cold, before and after in the same run, because the "before" has scored 35–37
  from run to run.
- It ships to Robert if the total is above the before and no line drops. New notes from that read go to the next pass,
  not this one. Five reads in, the gates are trading the same three things back and forth. The rulings below close them.

**5. One doc line.**
A · CLAUDE.md §3, the editorial paragraph: "carrying the menu or the nav links only. Over the film the header shows only
the menu (and the nav links at ≥900)" says the same thing twice. Keep one.

### If a builder is in the file anyway

- "harm- / reduction" breaks at its hyphen at 390 and 1440 (R/after6/390-04, 1440-03). A · `scripts/build-home.js` line
  349: `<span class="nowrap">harm-reduction</span>`, the same as "queer-serving" on line 353.

## Rulings (so the gates stop going round)

1. **Over the film, the header is the site's own solid bar with no mark, at every width.** The hero's stencil is the mark
   on the first screen. The header's mark and its Ride with me come in once the film has scrolled under it.
   - The alternatives each break a standing rule: two marks on one screen (the brand gate, v5); a floating box for the
     menu (the critic, v4); a gradient lid; or a menu that fails 3:1 over the sky in the mint shot.
   - The cost is accepted: on phones a 64 px tar bar carries only the menu (R/after6/390-first), and at 1440 the five
     links are centred with nothing either side.
   - Closed for this pass. Revisit only if his originals give a held shot with a dark top, where a clear header could pass.
2. **The panels cut together, in pairs.** This replaces my v2 rule of staggered cuts.
3. **The footage rules (1.0 s floor, nothing twice within 3 s) are waived** until his originals arrive. They can't be met
   with four clean clips of about a second each.
4. **The 330 px 10,000 stays.** It's the approved direction's "large 10,000-mile editorial feature". It outranks the
   stencils on purpose, it's a numeral of the goal, never the stencil and never a mark.

## Not this pass

- **`#today` at 1440:** a 230 px clip in a box beside a big still of the same moment (R/after6/1440-01). The critic's
  fourth-worst in v5. Lay it out around his next day's pictures (decision 5), and give the hero's stop and `#today`'s round
  play one control style at the same time.
- **`#year` at 1440:** three left edges on the right side (the lede on column 8 at x 838, the key and note on column 9 at
  944, the list's second column on 7 at 732), with the key and note parked at the foot under an empty block
  (R/after6/1440-02). Toronto's dot sits off the drawn land on purpose (US outline only).
- **Phones:** the dates note comes before the list it describes (R/after6/390-03). Two button shapes in one scroll: ink at
  content width, ghost at full width (390-05). A lone "I" ends the line at 375 ("everyone else. I").
- **Tablet portrait (820):** the phone film is soft at that size (R/after6/820-first), and the page is a long phone column.
  The originals fix the first. The second is its own pass.
- **The footer** (chrome, sitewide): the Trevor number breaks at its hyphen on phones (R/after6/390-07).

## For Robert (and Cadence): the decisions

Put these in the PR as one approval checklist. Everything else is the studio's.

1. **"Read the last ride": in "From the road" (as now), or back on the first screen?**
   - *Now:* the hero has one button (Ride with me) and one quiet link (Find a group ride), as approved ("one primary
     CTA"). The write-up link sits under the log of his last rides. On a phone that's about six screens down (y 5,046;
     live has it on the first screen at y 810). At 1440 it's y 4,101 against 758.
   - *Back up:* a second quiet link beside "Find a group ride". From 760 up it fits on one line. On phones it wraps to a
     second line, which pushes the whole block up 44 px. On an iPhone SE that runs past the first screen unless the stop
     button moves.
   - *Studio's lean:* leave it in "From the road" while there's one write-up (TSR, Oct 10). Bring it up when write-ups
     come weekly. Either way he decides, because the bar says no task gets slower and this one does.
2. **His original clips, for a sharper, calmer film.**
   - *What to send:* the camera or phone originals (not a reel export) of the four shots in the hero: the mint-jersey
     selfie on the desert road, the drone over red dirt, the forest trail, the dawn road with two riders ahead. Plus any
     other takes of 4 s or more where he's the only one you can recognise and no vehicle is in frame.
   - *What it buys:* shots held 3–4 s, sharp at 2x on a laptop and an iPad, no shot twice in a loop. That's the
     critic's photography ceiling (footage 2 of 5 today).
   - *What it costs:* a recut is a new film file number. No layout change, no second approval of the page.
   - *Studio's lean:* approve the page on this footage and recut when the originals come. Photography doesn't drop
     against the live page, and the live reel has a car in it.
3. **The words new to the homepage.** One yes or no on the brand gate's list (`research/brand/2026-10-26-home-v2.md`, "New
   strings"): the strip's labels, the line under the 10,000, the photo alts and captions, "entry by lottery", "206 miles,
   one or two days", "checked Oct 26", the JSON-LD description. Every one is built from the site's own words or the
   calendar's. None is his story.
4. **What the studio changed from the approved direction, for him and Cadence to OK together:**
   - Torn-paper caption tabs cut: on concrete they read as smudges.
   - The drawn bicycle cut: no drawing was good enough.
   - The texture is a fine asphalt on the two dark rooms only, never on a photo.
   - The hero's letters are clean. This ends the one worn stencil (Pass 27): over moving film the wear read as noise.
   - On phones the film is one full frame instead of the test reel's three bands: the seams cut through the words.
   - The test reel itself isn't used: a parked truck at the overlook, traffic in its last second, glitch frames, 512 px
     wide.
   - The tan-jersey peace sign is out: at a glance on a phone it reads as shirtless. His call to bring it back.
5. **`#today` still says Monday, October 12.** It needs a new day from him (the word, his line, his pictures). Otherwise it
   stays as it is on the live page.
6. **If approval waits:** the live homepage reel has a car at the far end of one shot and a parked vehicle in another (the
   brand gate's reads, and CLAUDE.md §10). A one-line PR can take the reel off the live page now, separate from this pass.
   His call.

## Who edits what (for the fixes above)

- **A:** `tools/hero-film.py` → `cfc-site/film/hero-wide-7.*`; `scripts/build-home.js` (`FILM.wide`, and line 349 if
  taken); CLAUDE.md §3 and §10; `CSS_V` in `scripts/chrome.js` (B's sheet changes). Then the regeneration in CLAUDE.md §2
  order, the tests and `hero-contrast.py`.
- **B:** `cfc-site/home.css`, the `.hero-pause` rule only.
- **Nobody** touches `chrome.css`, `home.js` or `ridebar.js` for this.

## Sign-off sequence

1. A and B land 1, 2 and 5 (and the line-349 span if taken). One commit, `hero-wide-7`, contrast script green.
2. The brand gate looks at frame 0 of `hero-wide-7`. access-speed and the usability lab file on that build.
3. The critic reads it cold, before and after in the same run.
4. I compare before and after at 390 and 1440 against this list, then write "Signed off" under this line. The PR
   description gets the checklist above, the screenshots and the Search Lab line. It goes to Robert and Cadence as one
   preview.

Not signed off yet.
