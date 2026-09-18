# Video — cross-platform working folder (not published)

Netlify only serves `cfc-site/`, so nothing here goes live. Never put a
video in `cfc-site/`.

Run the strategist with `@marketing-strategist` in Claude Code, or just
ask it to post or schedule a video. It publishes through the **Metricool**
connector; connect it once (Settings → Connectors) with the social
profiles already linked inside Metricool. The agent never sees a login.

- `inbox/` — drop finished cuts here. `YYYY-MM-DD-<slug>.mp4` (9:16 for
  Reels / TikTok / Shorts). Optional sidecar `YYYY-MM-DD-<slug>.md` with
  the ride, the hook, or anything to avoid. Big files can stay in Google
  Drive instead; name the file in the chat and the agent finds it.
- `posted/` — the agent moves a file here after it is scheduled and
  verified.
- `campaigns/` — cross-platform plans, `YYYY-MM-<slug>.md`.
- `reports/` — monthly cross-platform reads, `YYYY-MM.md`.
- `publish-log.md` — one row per network per post, with the Metricool
  post ID. This is the source of truth for what went out.

Instagram-only strategy and caption drafting still live in
`social/instagram/` with `@instagram-specialist`.

## Connection notes (filled in by the agent on first run)

- Connected networks and handles: _not yet confirmed_
- How `createScheduledPost` takes media (URL vs upload): _not yet confirmed_
- Time zone the tool expects: _not yet confirmed_ (we post in America/Phoenix, no DST)

## Rule

The agent drafts the full post spec and waits for Robert to say "post it"
or "schedule it" in the chat, per post. No standing permission.
