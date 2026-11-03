# Cycle for Change — Approved Creative Direction / Claude Implementation Handoff
Date: 2026-10-26
Owner: Robert (final approval). Cadence: art direction and design QA. Claude: technical architecture and implementation. The Wrenches: critical design review. Fact desks: verify dates, claims and content.

## Your assignment
Implement a **real, responsive Cycle for Change homepage** in the EXISTING site architecture. This is a production implementation request, not a request to produce another mockup. Work in a feature branch/staging environment; **do not deploy publicly without Robert's approval**.

## Visual source of truth
1. `Cycle_For_Change_Custom_Graphics_Homepage.html` — latest functional prototype, including a full-screen moving hero, visual sections, graphics and interactions. This is a reference, not production code to copy blindly.
2. `approved_editorial_direction.png` — approved gritty/editorial art direction (concept art; not a literal spec, and some copy/visuals are fictional).
3. `cycling-video-no-text.mp4` — approved test footage for moving hero; Robert is open to a better edit from his real footage.
4. `CFC-Redesign-Handoff-2026-10-26.zip` — YOUR original project handoff, containing architecture, component system, source brand facts, asset manifest and inventories. Resolve conflicts in favor of verified original brand assets/facts and Robert's explicit approvals.

## Approved direction (do not re-litigate)
- Original **CYCLE FOR_** logo/wordmark and existing brand colors, not invented substitutes. Retrieve exact assets and design tokens from existing repository and handoff. The HTML prototype's wordmark is only an approximation.
- Full-viewport (`100svh` with fallbacks) cinematic, moving video hero on mobile and desktop, minimal legible typography overlay, subtle navigation and one primary CTA. Video should be muted, looped, inline, accessible pause control, still poster fallback, responsive art direction/crops, optimized encodes, reduced-motion support. Avoid huge inline base64 video in production.
- A blend of MAAP's fashion-editorial energy and ASSOS's precision, but original to Cycle for Change. Softer/feminine, premium and expressive; NOT masculine extreme-sports or 'monster truck rally'.
- Rich but restrained custom graphics: grain/asphalt texture, distressed rose road markings, subtle torn-paper/collage treatments, custom bicycle line illustration, route motifs, distinctive buttons, editorial rules, date blocks and oversized mileage numerals. Maintain visual hierarchy; avoid decorative overload and stock graphics.
- Original palette: deep bruise/charcoal, powder/dusty rose, concrete, plaster, patina and related existing tokens. The peach/salmon pink from earlier explorations was rejected. Use exact brand values from source rather than color samples guessed from screenshots.
- Authentic footage and photographs of Robert rather than invented riders; the prototype uses his cycling film. Do not publish synthetic imagery as documentary footage.
- Preserve SEO depth with semantic HTML, visible readable copy, strong heading structure, crawlable links, fast rendering, FAQ/content structures where appropriate. Do not hide important content solely in animations or unrendered tabs.

## Homepage structure to implement and refine
1. Full-screen moving video hero / original brand mark / concise story hook and CTA.
2. Distinctive graphic mileage strip / 10,000 miles in 2027.
3. Robert's personal story, photography and emotional copy.
4. Large 10,000-mile editorial feature with custom route/mileage graphics.
5. Route/journey section with purposeful illustrated road/map treatment; do not invent route geography.
6. Purpose and community section: LGBTQ+ youth, mental health, inclusion; use original source copy and verified partner information.
7. Ride/event calendar, only with dates verified against project data; use placeholders or omit unverifiable entries.
8. `CYCLE FOR_` interactive prompt; no user data collection without explicit approval and privacy handling.
9. Strong footer, navigation, relevant existing site CTAs and accessibility.

## Important copy and factual constraints
- The journey is **10,000 miles in 2027, all on the bike**. Validate any additional geographic claims, date schedules, statistics, beneficiary details, and quotes against `BRAND_CONTENT_FACTS.md` and fact desks before publishing.
- Preserve the candid personal core: cycling changed Robert's life. Don't turn it into a generic charity ad.
- Donations route to organizations' own websites according to established site policy; do not introduce unapproved on-site donation checkout.
- Any copy and dates shown in image-generated concept art are NOT verified.

## Quality gates
- Wrenches review desktop and iPhone layouts, typography, original brand fidelity, graphic originality, motion, accessibility and MAAP/ASSOS-level polish; challenge weak work, don't rubber-stamp.
- Fact desks review all public factual copy and dates with sources.
- Test mobile Safari/iPhone first; then desktop Safari/Chrome, responsive breakpoints, video load/performance, contrast, focus/keyboard, reduced motion, LCP/CLS and fallback states.
- Present staging URL or runnable local preview, screenshots/mobile capture, changed-file summary, outstanding issues, and explicit approval checklist to Robert and Cadence.
- Do not claim Wrenches/fact desks have reviewed until actually completed.

## First step
Inspect original source repo and the attached references, report any missing source assets/technical blockers, then implement the homepage in a branch. Keep existing site SEO, URLs and functionality intact. Robert is the final approver.
