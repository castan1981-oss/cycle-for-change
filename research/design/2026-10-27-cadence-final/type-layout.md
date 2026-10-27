# Type and layout, pass 2026-10-27-cadence-final (homepage)

From `home.css`, `build-home.js` and the before shots; no site file changed. Grid at 1440: content 1,248, column 82,
gutter 24 → 3 cols 294 · 4 400 · 5 506 · 6 612 · 7 718 · 8 824. At 390: gutter 16, content 357, a half 170.
I/E = impact / effort, 1–5.

## Scale: on it and off it

Nothing under 13px. Off the token scale: the opener (`.story-h .year-h .orgs-h .find-h`, 40→92; keep, it's the one),
`.ridewith-big` 32→72 at **900**, `.orgs-door` 26→48, `.hero-intro` 22→40, `.strip-n` 40→76, `.miles-big` 83→336.
Fix: the two big sentences take `--fs-display` (36→68) at 800; 900 stays for the 10,000, plates and date numerals.
`.ridewith-big{font-size:var(--fs-display);font-weight:800}` `.orgs-door{font-size:var(--fs-display)}`. Measures
(28–40ch, short paragraphs) are fine. Tabular numerals are on `.strip-n` only: add them to `.log .mi`, `.date-d`,
`.miles-big`. I/E 2/1, `home.css`.

## 1. #why and #today (Cadence 3)

**#why at 1440 — one big portrait, one small.** Now 4 and 3 columns, feet aligned: medium-everything. Proposed: words
cols 1–5 (head 9ch, lede 28ch at `--fs-lede`, not sticky); Boise portrait cols 7–12 (612×765, 4:5; a 6% upscale of the
1,152px source at 2x); the shadow photo a 294px square on cols 1–3 under the words, its foot on the big photo's foot.
The plates row goes (system desk). I/E 4/2.

```css
@media (min-width:1024px){
  .story-in{grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--col-gap);grid-template-rows:auto 1fr;align-items:start}
  .story-words{grid-column:1/span 5;grid-row:1;position:static}
  .story-photos{display:contents}
  .story-ph--a{grid-column:7/-1;grid-row:1/3}
  .story-ph--b{grid-column:1/span 3;grid-row:2;align-self:end}
  .story-ph--b img{aspect-ratio:1/1}
}
```

**#why at 390 — the photo second, not fifth.** Head → full-bleed portrait (`--s3` under the head) → caption → lede and
more (`--s4`). DOM unchanged: `.story-words{display:contents}` and `order` on `.story-h .story-photos .story-lede
.story-more`; nothing focusable moves. I/E 3/1.

**#today at 1440 — a sign row, then two pictures at 2:1.** Now a 230px film thumbnail with its own Play line beside
an 8-column photo. Proposed, with two wrappers in `todaySection()` (`.today-lead` = eyebrow + sign, `.today-say` =
line + ask; the film a sibling of `.today-ph`): row 1, feet aligned: the sign cols 1–6 · his line (30ch,
`--fs-intro`) and the ask cols 8–12. Row 2, feet aligned: the gravel photo cols 1–8 (824×618) · the film cols 9–12
(400×500, 4:5), captions under each. The sign in type sits over the sign painted on the gravel in the photo. One
control, the disc (system desk). I/E 4/3, `build-home.js` + `home.css`.

```css
@media (min-width:1024px){
  .today-in{grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--col-gap);row-gap:var(--s4);align-items:end}
  .today-lead{grid-column:1/span 6} .today-say{grid-column:8/-1}
  .today-ph{grid-column:1/span 8} .today-film{grid-column:9/-1;width:auto}
}
```

**#today at 390.** One tight word group (eyebrow→sign 8, sign→line 16, line→ask 16), the photo `--s4` under, then the
film **inset at half width on the right** (170×213) instead of a second full-bleed wall portrait. 1,464px → about
1,050. I/E 4/1.

```css
@media (max-width:759px){
  .today-in{gap:var(--s4)} .today-sign{margin:var(--s1) 0 var(--s2)} .today-line{margin-bottom:var(--s2)} .today-ask{margin:0}
  .today-film{width:50%;margin-inline:auto 0}
}
```

## 2. The right halves at 1440 (critic 1)

| Section | Now | Proposed | I/E |
|---|---|---|---|
| #road | log and side both `1/span 7`; 530px of bruise empty | side facts in the margin: `.miles-side{grid-column:1/span 4;flex-direction:column}` — `111` a 900 numeral at `--fs-display`, "rides since June 1." the 13/700 label, the two links under; `.miles-log{grid-column:6/-1}` (718px for the strokes); `align-items:start` | 4/1 |
| #year aside | `align-self:end`, stranded bottom-right | `align-self:start`: key, note and link top-right, where a legend sits (the map's north-east is empty) | 3/1 |
| orgs' line | `.orgs-door` at 24ch beside empty patina; the help on its own hairline below | one row under one hairline: `.orgs>.wrap` the 12-grid, head and list `1/-1`; `.orgs-door{grid-column:1/span 8}` at `--fs-display`; `.orgs-help{grid-column:9/-1;flex-direction:column;align-items:flex-start}`; both `border-top:1px solid var(--asphalt);padding-top:var(--s3);margin-top:var(--s5)` | 4/2 |
| #find | tools `align-items:end`, level with nothing | `align-items:start`, the label's top on the head's cap line; `.find-tools{grid-column:7/-1}`; field and button 52px (system desk) | 3/1 |

## 3. Phone rhythm (Cadence 5)

`--sec` is 52px everywhere under 760 and every inner group is 40–64 apart: one even stack, 14 screens. Rule: a colour
change gets the big gap (`--s5` top and bottom of the tar and patina rooms); sections sharing a room get one hairline
and `--s5` once; inside a group 8/16/24.

- **#why and #today share the room** (both concrete): cut the hairline and `.today-in`'s 64px top; `--s5` from the last
  story paragraph to "The ride on…". −52px. I/E 2/1.
- **#today** as above: −410px; the two wall portraits become one big, one small.
- **#road**: `.miles-grid{margin-top:var(--s5)}` on phones (104 now, the page's biggest inner gap). I/E 2/1.
- **The 13 rows (981px)** keep every row and 44px link; the date becomes the row's numeral, not a 64×56 box:
  `.yr a{grid-template-columns:4.5ch minmax(0,1fr);gap:12px;min-height:56px;padding:6px 0}`
  `.date{width:auto;height:auto;border:0;align-items:flex-start}` `.date-d{font-size:var(--fs-h4)}`. Projected rows
  stay gunmetal, "date projected" in the line. ≈740px (−240). The box, dashed when projected, stays at 760+. I/E 3/1.
- **#orgs**: `.org{padding:var(--s2) 0 var(--s3)}`; the door at `--fs-display` is the room's opener. −60px. I/E 2/1.
- Together about −760px: 14.0 → 13.1 screens, with four changes of scale in the first five (the strip's numerals, the
  full-bleed portrait, the sign, the half-width film).

## 4. Numerals that carry a section (Cadence 2)

| Where | Now | Proposed | I/E |
|---|---|---|---|
| #road | "111 rides since June 1." inline at `--fs-intro` | `111` at 900 `--fs-display`, tabular; the label 13/700 under it (two spans in `ROAD`) | 3/1 |
| How this works | three marks that repeat their headline | the `<ol>` numbered 1 2 3 at 900 `--fs-h2` in the mark's cell: `.how-steps li::before{counter-increment:step;content:counter(step);font:900 var(--fs-h2)/1 var(--display)}` `.how-mk{display:none}` (marks stay in the sprite); no new words | 3/1 |
| #year | `.yr-i` 13/800, dots 14/800 | one numeral: `.yr-i,.mp-dot{font:900 .875rem/1 var(--display)}`, tabular | 1/1 |
| #find | "1,423" in a body line | leave it; the strip says 1,423 already | — |

Same-relationship gaps after this pass: head→body `--s3`; group→group `--s4` (phones) / `--s5` (1024+); room→room
`--sec`; caption `--s1` under a photo, 13/700 gunmetal, left edge.
