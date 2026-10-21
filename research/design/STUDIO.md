# The Wrenches — the bar every page is held to

Robert, Oct 21, 2026: the website needs **usability and an image that is easy to navigate and
enjoyable to look at. Modern, and high fashion in the sense that it looks polished.**

Earlier, in his words: the site read "too dark", "words on a page", "a little blocky and plain",
"very sloppy" when worn textures went live, and "looks unfinished" when a photo was feathered. He
wants it "highly polished", "visually stunning, high fashion", "the most useful thing anybody's
ever seen", and "custom and very classy and easy to understand". He also said a share carousel was
"too polished" — well made, but it could have been anyone's. Both are true at once: **finished
like a fashion house, personal like one man made it.**

The studio is **The Wrenches** (Robert's pick, Oct 21, 2026). This file is its shared bar. The agents in `.claude/agents/` (`art-director`,
`ux-architect`, `type-layout`, `design-system`, `photo-editor`, `motion-interaction`,
`usability-lab`, `design-critic`) read it before they start. `/design` runs them.

## What doesn't move

The identity is **frozen until Dec 1, 2027** (CLAUDE.md §3). The studio polishes *inside* it:
- Lane Paint: the hand-drawn CYCLE FOR stencil and the rose bar. Never redrawn, never a font.
- After Hours palette, the eight values and the token names in CLAUDE.md §3. No new colors, no
  tints outside them, no gradients.
- Overpass only, self-hosted. No second family, ever.
- Square corners, hairlines, no shadows, no pills, no grain, nothing painted or worn (the big
  desktop hero stencil is the one exception).
- Labels sentence case, 13px/700. Buttons alone keep caps. One primary button per screen.
- The banned look (serif italic accents, small mono caps with middots, tracked caps labels,
  Claude's default three fonts) and the retired list. Chevrons/arrows as decoration read "tech".
- Voice, the never-list and health safety (CLAUDE.md §4). The studio doesn't write copy; where a
  layout needs fewer words it cuts, it never invents his.
- Photos: no cars, only Robert recognisable, captions say place and month (CLAUDE.md §10).

If a fix needs any of those to move, it isn't this studio's fix. Write it down for Robert instead.

## The references

Fashion houses that make cycling look expensive, for **finish**: assos.com, maap.cc,
pasnormalstudios.com, rapha.cc, cafeducycliste.com. Product sites Robert named for **clarity**:
specialized.com, tesla.com. Sites he named for **usefulness**: thesyn.cc, behavioralhealthguide.org,
recovery.com. Learn the move, never the look: nobody's colors, fonts, marks or layouts get copied.

## What "polished" means here — the eleven moves

1. **One idea per screen.** Every screen-height has one thing it's about. If two things fight for
   the eye, one goes under a fold or to another screen.
2. **Scale contrast.** Big things are really big (the stencil, the photo, the h1); small things are
   quiet and small (labels at 13px, never under 12). Medium-everything is what looks cheap.
3. **Air is the luxury.** Space comes from one scale — 8, 16, 24, 40, 64, 104, 168 px — kept as
   tokens at the top of `/chrome.css` and `/home.css`. Generous between sections, tight inside a
   group.
4. **One grid, one edge.** Every page sits on the same 12-column grid with the same outer margin at
   each width. Hairlines, headings, photos and buttons share left edges. Nothing floats in a corner
   of a 1440 screen with the rest empty.
5. **Use the width on desktop.** At 1024+ a page composes in two or three columns (words beside the
   picture, the list beside the map) instead of a phone column stranded on the left.
6. **Photographs carry it.** Big, crisp, art-directed per width (`<picture>` crops), edge to edge or
   inset exactly on the grid. A clean edge, not a fade into the page. No thumbnails in boxes, no
   washed-out picture behind words.
7. **Color in fields, not in bits.** The palette is used as big calm fields — plaster, concrete,
   bruise, drained pool — to give each section of a page its own room. Rose stays the blank and wet
   paint: rare, so it means something.
8. **Fewer boxes.** Separate with space first, a hairline second, a box last. A grid of bordered
   cards is the last resort, not the default.
9. **Every state designed.** Hover, focus, press, current page, empty, loading, disabled — all
   drawn on purpose, all the same family across the site.
10. **Finish the details.** Headings balanced (`text-wrap: balance`), no widows in short lines,
    numbers tabular in tables and stats, icons on one stroke and optically centered, images with
    width/height so nothing jumps, lines that actually line up.
11. **Easy before pretty.** A stranger on a phone can tell in five seconds what the site is, where
    they are, and the one thing to do next. If a polish move costs that, it loses.

## What makes it look cheap (the critic's list)

Medium-size everything. Bordered boxes inside bordered boxes. A phone layout stranded on a desktop
screen. Faded or feathered photos. Mixed icon weights. Text set too wide or too narrow. Uneven
section spacing. Three kinds of button. Labels and chips competing with the headline. Pages that
end in a pile of links. Anything that could be any brand's template.

## The score (used before and after every pass)

Each 1–5, with the screenshot that earned it:
1. **First screen** — in five seconds a stranger knows what this is and what to do.
2. **Way-finding** — where am I, where can I go, how do I get back.
3. **Hierarchy** — the eye goes where it should, in order.
4. **Finish** — alignment, spacing, states, details. Would a fashion house ship it?
5. **Photography** — big, crisp, right crop, right place.
6. **Consistency** — one button, one card, one row, one rhythm across page types.
7. **Desktop composition** — the width is used on purpose.
8. **Phone comfort** — one thumb, sun, cellular.
9. **His** — it looks like one person made it, not a template.
10. **Ease of reading** — measure, leading, contrast, length.

Out of 50. A pass ships when it raises the total without dropping any line, and the usability
lab's task times don't get worse.

## The core tasks (the usability lab runs these, 390 and 1440)

1. What is this site, and whose is it? (first screen of `/`)
2. Find a group ride in Phoenix this week.
3. When is Robert's next ride, and how do I ride it with him?
4. Read his latest ride write-up.
5. Find out how a charity ride's fundraising minimum works (a guide).
6. Get help right now (`/resources/`, crisis line without a tap).

Measured: taps, scroll depth to the answer, whether the answer is on the first screen, the
smallest tap target on the way, anything that looked tappable and wasn't.
