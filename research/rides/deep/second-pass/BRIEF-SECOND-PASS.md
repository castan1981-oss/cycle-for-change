# Second pass: prove the leads (Oct 2, 2026)

First read `research/rides/deep/BRIEF-DEEP.md`, then `research/rides/world/BRIEF.md` (house rules,
proof of life, confidence, record shape, vocabularies, safety, the LGBTQ never-list).

The first sweep ran short of web search. Now search is ON. Your input file is
`research/rides/deep/second-pass/<group>-leads.json`: leads the first scouts found but could not
prove. Each has name, host, what is known, what was missing, and links.

## The job
For each lead, most promising first (queer, women/trans/femme and BIPOC rides come first in the
file, then the rest), try to PROVE it is still rolling at a public source you can read without a
login: a public Strava club event page (`site:strava.com group_events <city> <club>`), the
host's own site, a shop page, Meetup, RideWithGPS club events, a public Google Calendar, a dated
public Instagram or Facebook post only if the page loads with text and a date. Search for the
group name plus the city. Spend your search budget on the first 40–50 leads; for the rest just
try the links already given.

Write two files in `research/rides/deep/second-pass/`:
1. `<group>.json` — a JSON array of NEW ride records for leads you proved (the same record shape
   as the deep-sweep scouts, high and medium confidence only, evidence under 12 months, at most 3
   rides per host). Read the area's `research/rides/deep/<area>/_existing.tsv` so you never add a
   ride the site already has.
2. `<group>-outcomes.json` — one entry per lead you worked, `{ "id", "outcome", "note", "contact" }`.
   outcome: `proven` (it's in the JSON above), `gone` (the host says it ended or the page is
   dead), `still-unproven`. `note`: one plain sentence on what you saw and where. `contact`: only a
   PUBLIC way to reach the host that they publish for the public (a contact-page URL, a published
   club email, the Instagram handle). Never a personal email, a phone number, or anything that
   looks like a private person's. Null when none.

Also write `<group>.md`: a short report (counts, what worked, what didn't, surprises).

## Rules
- Never log in, never create accounts, never solve CAPTCHAs, never message anyone.
- Never guess. Unknown is null. If a source is blocked, say so and move on.
- Do not edit rides.json or any file outside `research/rides/deep/second-pass/`.
- Queer-focused rides only where the host says so in its own words; never list one in a country
  on the never-list (see the world brief).
- Plain voice, short sentences, no hype.
