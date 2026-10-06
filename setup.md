# Cycle for Change — setup notes

The site deploys from GitHub: every push to `main` on `castan1981-oss/cycle-for-change`
publishes `cfc-site/` on Netlify. Nothing here needs doing for the site to work; these are the
one-time settings behind the live parts.

## Live mileage (Strava)

The homepage and the tally line on every page show **miles since June 1, 2026** — one number,
never a percentage. It reads `/api/strava` (the `strava` function).

1. Open `cycleforchange.org/strava-setup.html` and follow its three steps.
2. Netlify → the site → **Project configuration → Environment variables**: add the three values
   it gives you.
3. **Deploys → Trigger deploy.** Environment changes only take effect on a new deploy.

If the feed fails, the site shows "—", never 0.

Strava data stays on the tally and the ride log. It never goes through an AI step or onto other
public pages (see `CLAUDE.md` §10).

## Mile updates signup

The footer signup on every page is the Netlify form **`waitlist`**. Submissions are in
**Netlify → Forms → waitlist** (exportable as CSV). No list tool or welcome email is wired up
yet. The email template is `email/mile-updates.html`.

Spam protection is the hidden honeypot field. If junk comes in, turn on Netlify's form spam
filtering in the Forms settings.

## Rider reports for the ride directory

The `ride-report` form on every ride page feeds the Monday upkeep. Setting it up (GitHub secrets
`ANTHROPIC_API_KEY`, `NETLIFY_API_TOKEN`, `NETLIFY_SITE_ID`) is in `tools/RIDES-UPKEEP.md`.

## What's gone

There is no pledge board, no votes and no pledge form any more (`/pledge/` redirects home since
Oct 5, 2026). Don't make or renew a Netlify token for the old `pledges` function — it would
republish old pledgers' names. Old `pledges` form submissions in Netlify can be exported and
then deleted.
