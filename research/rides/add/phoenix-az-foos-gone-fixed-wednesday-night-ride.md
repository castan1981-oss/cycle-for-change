# Foos Gone Fixed Wednesday Night Ride (Phoenix)

Area: Phoenix, AZ · Agent: @ride-scout · Date: 2026-10-25 (Phoenix) · Slug: `phoenix-az-foos-gone-fixed-wednesday-night-ride`

Robert's tip, Oct 25, 2026: a Phoenix fixed-gear crew, Instagram @foosgonefixed ("Let's Ride Bikes Foo!", bio "Weekly Wednesday night rides"), meets at Lux Central, 4402 N Central Ave.

## Summary

One record, Phoenix, confidence **medium**.

- Every Wednesday night (the crew's own bio says weekly; a regular says "most Wednesdays").
- Meet at Lux Central, 4402 N Central Ave, Phoenix, AZ 85012. A regular posted meet 8:20 pm, roll out 8:30 pm (June 2025). The crew itself has not published a time anywhere I could read.
- About 20 miles, a loop with a convenience-store snack stop (a regular's words).
- Singlespeed / fixed-gear oriented, all bikes welcome (a regular's words, April 2026).
- Pace, cost, drop policy: unknown (null).
- `discipline` is `fixed` + `social`: a fixed-gear crew's night loop with a stop, in the same family as Downtempo and Loops PHX.
- `host.type` `informal`: a crew with an Instagram account, no shop, club or site behind it that I could find.

## Why medium, not high

The confidence rule for high needs the host's own page to state day, time and start, plus a dated 2026 signal. Here the host's own page is Instagram, which is a login wall for the agent. It states the day (Robert read the bio: "Weekly Wednesday night rides") but not a time or a meeting spot. The spot and the time come from a secondary source, a regular rider on Reddit, and the newest dated signal (Apr 4, 2026) says "usually" and "I haven't ridden with them in a while". That is "a dated 2026 signal exists but the schedule comes from a secondary page": medium.

## Evidence

Each line: URL, the sentence that proves the field, and the date I read it.

1. **Instagram @foosgonefixed** — https://www.instagram.com/foosgonefixed/
   - What it proves: the host exists and the ride is **weekly, Wednesday night**. Bio: "Weekly Wednesday night rides"; name line "Let's Ride Bikes Foo!" (Robert's reading, Oct 25, 2026).
   - For the agent this URL is a **bot wall**: every fetch (desktop, mobile, Googlebot, facebookexternalhit, Twitterbot user agents, the `/embed/` page, `?__a=1`, the web_profile_info API, Threads) redirected to `instagram.com/accounts/login/` or returned 401/400. Read Oct 25, 2026 (UTC Oct 26, 04:10–04:30).
   - The handle is real: Facebook's oEmbed endpoint (`graph.facebook.com/v12.0/instagram_oembed?url=https://www.instagram.com/foosgonefixed/`) returns a valid embed for it, and returns "The requested resource does not exist" for a made-up handle (checked Oct 25, 2026). The Wayback Machine lists a snapshot of the profile from Nov 12, 2022 (`archive.org/wayback/available` API, read Oct 25, 2026), so the account is at least four years old; the snapshot itself is blocked for this agent.
2. **r/phoenix, "Any bike groups here?", comment by u/surewriting_, Apr 4, 2026** — https://www.reddit.com/r/phoenix/comments/1sbpj82/any_bike_groups_here/oe665rj/
   - Proves: **meeting spot Lux Central**, **Wednesday nights**, **all bikes welcome**, the crew overlaps Downtempo and Critical Mass. Verbatim: "Foos Gone Fixed is singlespeed/fixed gear oriented, but all bikes are welcome. They usually meet up Wednesday nights at Lux Central, but I haven't ridden with them in a while. They're a really fun group, and most of the folks who ride with them also do the downtempo and critical mass rides."
   - Read Oct 25, 2026 through the PullPush Reddit archive API (`api.pullpush.io/reddit/search/comment/?q="foos gone fixed"`), which returned the comment body, author, subreddit, permalink and `created_utc` 1775262059 (= 2026-04-04 00:20 UTC, Apr 3 evening in Phoenix). reddit.com itself returns 403 to the agent. This is the newest dated signal → `last_seen` 2026-04-04.
3. **r/FixedGearBicycle, "What's the reason you pick fixed rather than road?", Jun 21, 2025** — https://www.reddit.com/r/FixedGearBicycle/comments/1lgne3j/whats_the_reason_you_pick_fixed_rather_than_road/
   - Proves: **time** (meet 8:20, roll 8:30), **~20-mile loop with a snack stop**, and that the crew's own channel is @foosgonefixed. Top-level comment by u/surewriting_ (read Oct 25, 2026 via the redlib mirror https://twt.omada.cafe/r/FixedGearBicycle/comments/1lgne3j/whats_the_reason_you_pick_fixed_rather_than_road , fetched with WebFetch): "Do it. There's a bunch of us in the valley." / "Meet up at Lux Central, most Wednesday at 8:20, rollout 8:30." / "20 mile loop, typically a stop for snacks at a convenience store." / "Check it out @foosgonefixed on IG." The post is dated Jun 21 '25 on the mirror; the comment shows no date of its own.
   - Caveat on the time: the comment says "8:20" and "8:30" with no am/pm. The record reads them as pm because the bio says "night rides" and the Apr 2026 comment says "Wednesday nights". `start_hhmm` 20:30 is the roll time.
   - Same thread, reply by u/Scruboverlord_ (permalink https://www.reddit.com/r/FixedGearBicycle/comments/1lgne3j/whats_the_reason_you_pick_fixed_rather_than_road/myxt0i4/ , `created_utc` 1750481790 = 2025-06-21, via PullPush): "Also Foos gone fixed is a great group ride. phxfxd is another group who runs group rides Monday and some Friday nights." Proves a second person knows it as a running group ride in mid-2025.
4. **r/phoenix, "Is there like chiller but still kinda competitive…", comment by u/V33d, Aug 28, 2024** — https://www.reddit.com/r/phoenix/comments/1f3dr93/is_there_like_chiller_but_still_kinda_competitive/lkd108f/
   - Proves: the crew was known in Aug 2024 and lives on Instagram. "Saturday Morning Service, Foos Gone Fixed, Sunday Congregation … All of those are on Instagram with details of when/where their rides are." (via PullPush, read Oct 25, 2026).
5. **Lux Coffee** — https://www.luxcoffee.com/
   - Proves: the start address and hours. Raw page text: "Lux Central 4402 N Central Ave, Phoenix, AZ 85012 (602) 327-1396 • Open daily 6am-10pm" (curl, Oct 25, 2026). The site has no events page and no mention of the ride.

Robert's statement that it meets at Lux Central matches the two independent Reddit regulars (June 2025, April 2026). I did not assume it.

## Couldn't confirm

- **Start time from the host.** The 8:20 meet / 8:30 roll is one rider's word from June 2025. The crew's own posts may say something else now, or shift with the season. Null would hide the ride from "tonight" pages, so the record carries 20:30 with `visitor_notes` and `refresh.notes` saying where it came from.
- **Pace** (null), **cost** (null; nothing says it is free, though nothing suggests a fee), **drop policy** (`unknown`), **duration** (null).
- **Weekly vs most weeks.** Bio says "Weekly"; the regular says "most Wednesday" and "usually". Recorded as weekly with both phrasings in `schedule`.
- **A page the watcher can read.** None exists. No Strava club (`strava.com/clubs/foosgonefixed` and `/foos-gone-fixed` are 404; Strava club search needs a login), no Facebook page (`facebook.com/foosgonefixed` is a login redirect, not proof either way), no Linktree, no website (`foosgonefixed.com` does not resolve), no Meetup, Eventbrite or allevents listing, not on Phoenix Spokes People's rides page or dtphx.org's calendar or 2022 group-rides article (that one names PHXFXD as the fixed-gear crew, not this one). Not indexed by Bing, Google, DuckDuckGo or Brave under the name or handle. TikTok `@foosgonefixed` exists as a URL but returned no profile data (status 10221). The Wayback Machine has a Nov 2022 snapshot of the Instagram profile but it is blocked for this agent.

## What a person can check by hand

1. Open https://www.instagram.com/foosgonefixed/ and read the latest post or story: this week's date, meet time, roll time, and whether it still says Lux Central. If the posts show the time regularly, record it as the host's own and bump confidence to high with a `verified_on` of that day.
2. At Lux Central on a Wednesday around 8:15 pm: are there fixed-gear bikes outside? Ask the crew for pace, distance and whether they want to be listed (then "I run this ride" on the ride page).
3. Ask the Downtempo or Critical Mass crowd; the Apr 2026 comment says they overlap.
4. Optional: in a browser, open http://web.archive.org/web/20221112041120/https://www.instagram.com/foosgonefixed/ to see what the bio said in 2022.

## Rejected

None. (PHXFXD, @phxfxd, is a different Phoenix fixed-gear crew with Monday and some Friday night rides per the June 2025 comment; Instagram-only, not researched further here.)

## Stats

Candidates looked at 1 · listed 1 (medium) · couldn't confirm 0 · rejected 0. Fetches: about 70.

## Sources

- https://www.instagram.com/foosgonefixed/ (login wall)
- https://graph.facebook.com/v12.0/instagram_oembed?url=https://www.instagram.com/foosgonefixed/
- http://archive.org/wayback/available?url=instagram.com/foosgonefixed/
- https://www.reddit.com/r/phoenix/comments/1sbpj82/any_bike_groups_here/oe665rj/ (via api.pullpush.io)
- https://www.reddit.com/r/FixedGearBicycle/comments/1lgne3j/whats_the_reason_you_pick_fixed_rather_than_road/ (via twt.omada.cafe)
- https://www.reddit.com/r/FixedGearBicycle/comments/1lgne3j/whats_the_reason_you_pick_fixed_rather_than_road/myxt0i4/ (via api.pullpush.io)
- https://www.reddit.com/r/phoenix/comments/1f3dr93/is_there_like_chiller_but_still_kinda_competitive/lkd108f/ (via api.pullpush.io)
- https://www.luxcoffee.com/
- https://www.phoenixspokespeople.org/events/
- https://dtphx.org/events/calendar
- https://dtphx.org/post/strength-in-numbers-how-group-rides-bolster-dtphx-bike-culture (Oct 13, 2022)
- https://www.phoenixnewtimes.com/?p=40534733 ("7 Best Group Bike Rides in Metro Phoenix", undated, c. 2014)
- https://www.phoenixnewtimes.com/?p=40560068
- https://www.phoenixnewtimes.com/?p=40540580
- https://www.strava.com/clubs/foosgonefixed (404) · https://www.strava.com/clubs/foos-gone-fixed (404)
- https://www.facebook.com/foosgonefixed (login redirect) · https://linktr.ee/foosgonefixed (404) · https://www.tiktok.com/@foosgonefixed (no data)
- https://allevents.in/phoenix/fixed-gear · https://www.eventbrite.com/d/az--phoenix/fixed-gear/ · https://weeklyrides.com/search?q=phoenix
