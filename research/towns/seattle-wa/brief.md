# Brief — seattle-wa

Written by @town-editor (opened from the main session), 2026-10-03. A
**refresh**: `data/towns/seattle-wa.json` exists as an event-host page built
around the STP start in the University District (hotels, restaurants and
shops mostly in the U District). This run makes it a full destination guide
for the whole city while keeping the STP-start listings the verifier passes.

## The town

- id `seattle-wa` · Seattle, Washington · King County · America/Los_Angeles
- Centre for distances: **downtown, 47.6039, -122.3300** (as in the file).
- `kind: destination` (was event-host). Keep the legacy fields the STP event
  page (`/events/seattle-to-portland/`) uses.
- Suggested `covers[]`: Bellevue, Kirkland, Redmond, Issaquah, Mercer Island,
  Bainbridge Island. (Tacoma has its own rides hub; leave it out.)

## Who it's for

A rider coming for the STP in July or for a summer week of lakes, islands and
the Cascades foothills, flying into SEA with a bike case or renting here.
They want the Burke-Gilman, a ferry-and-island day, one real climb, a
Saturday group ride, and where to sleep — near the U District for the STP
start, or downtown / Capitol Hill otherwise.

## Zones (spread the picks across them)

1. **The trails north and east** — Burke-Gilman, Sammamish River Trail, the
   wineries at Woodinville, Redmond.
2. **Lake Washington** — the loop, Mercer Island, Seward Park, the I-90
   trail.
3. **The Eastside hills** — Cougar Mountain, Tiger Mountain, Issaquah, the
   Snoqualmie Valley; Cascade's Eastside rides.
4. **The water side** — Alki and West Seattle, Elliott Bay Trail, Discovery
   Park, Bainbridge Island by ferry (and Vashon).
5. **Where a visitor sleeps and eats** — the U District (STP start), Capitol
   Hill, Fremont / Ballard, downtown.

## Already known (don't re-research; link)

- Rides hub `/rides/wa/seattle/` (14 rides). In rides.json: Good Weather
  Sunday Social (Capitol Hill, Sun 10:30 from Tailwind Cafe), NorthStar
  Cycling Sunday Service (Central District, NorthStar Clubhouse), WTFNB
  Weekly with Brevay (Thu 6:30 am, Pacha Collective), Mello Fellos Saturday
  Ride, Moxie Monday, COGS Wednesday Evening Ride, Cascade's FRUMPS and
  Eastside rides, Beer Junction Bike Club (West Seattle), Critical Mass, Bike
  Disco. Use `{ride:<slug>|label}`.
- Event page `/events/seattle-to-portland/` (data/events/seattle-to-portland.json).
- 2027 calendar: **Seattle to Portland (STP) — July 10, 2027, confirmed,
  `riding: true`** (Cascade Bicycle Club; starts at the University of
  Washington). Also Emerald City Ride (Apr 24 projected), Ride for Major
  Taylor (May 2 projected), Obliteride (Aug 14 confirmed), RSVP (Aug 21
  projected), Bike the US for MS Pacific Coast (Aug 23 confirmed).
- Existing shops: Montlake Bicycle Shop, R+E Cycles, Gregg's Greenlake,
  Recycled Cycles (address missing — fix or drop). Re-check, then add.

## Watch for

- Rain: October to May. `best_months` from a source; fenders are the local
  norm only if a source says so.
- Washington State Ferries bike fares and boarding (bikes board first) —
  current WSF pages.
- Link light rail and bus bike rules (bike racks on buses, bikes on Link) —
  current Sound Transit / King County Metro pages.
- STP logistics (bag transport, getting back from Portland: Amtrak Cascades
  bike reservations, Cascade's own bus) — 2027 or 2026 pages only.
