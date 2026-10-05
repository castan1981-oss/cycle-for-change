# Re-check — five rides the town scouts flagged (Oct 4, 2026)

Batch: `2026-10-04-town-scouts.json`, applied with `tools/rides-apply.js`. Five rides, all five `changed`.

| Ride | What the source showed (fetched Oct 4, 2026) | Changed |
|---|---|---|
| The Saturday Ride (Fuss Buss), Scottsdale | Strava event 814036 (the recurring event that showed Oct 3 at 5:30) now lists Sat Oct 10 at 6:00 am from 8977 N Scottsdale Rd, Intermediate / Rolling. The club's Tuesday (814572) and Thursday (815123) events still show 5:30, so it is not a club-wide shift. No seasonal table is public; the event description needs a club login. The scouts' "a drop ride" is not on the public page — `drop_policy` stays unknown. | 5:30 → 6:00 am (schedule, time_local, start_hhmm); description; refresh notes |
| Sunday Funday Gravel Ride, Fountain Hills | MMC Life page (modified Oct 2) says "Sunday Funday Gravel Ride – 6:30 AM – MMC October 4th & 25th"; the October calendar shows both dates at 6:30a. Still one group, no-drop, ~40 mi. | 6:00 → 6:30 am |
| The Shootout, Tucson | Fair Wheel's page still carries the full seasonal table and "near University Boulevard & Euclid Avenue". The listed point (32.2627, -110.9495) sat ~2 mi north; the intersection from OpenStreetMap geometry is 32.2317, -110.9595. | lat/lng, neighborhood; `start_times` extended through 2027 from the shop's table (Mar 6, Apr 3, Apr 17, Sep 4, Oct 9, Nov 13, 2027); schedule wording |
| BICAS WTF Ride, Tucson | WTF Events page: every last Monday, no-drop, 5–10 mi, gather 6:30 pm, roll 7 pm, after the Monday 3–7 pm workshop at 2001 N 7th Ave. Workshop page (updated Jul 27, 2026) repeats the last-Monday events. Themes month to month are on @bicas_wtf only. | time_local 6:30 pm; distance; pace; start address + point; links (website → events page, Instagram → @bicas_wtf); watch_url → events page |
| Different Spokes Jersey Ride, SF | The Oct 10, 2026 calendar listing (item_id 3061126) says meet 8:45, roll 9:00 at Jane Warner Plaza, Castro and Market (RWGPS 53843226); Sausalito group unchanged. The standing Jersey Ride page still says Peet's, 16th & Market — the dated listing wins. | start_location → Jane Warner Plaza, lat/lng; schedule; description; visitor_notes; watch_url → the ClubExpress calendar |

Gotcha for the next verifier: `derive-ride-fields.js` reads "rolls 5 minutes after" as a 5:00 start (it became 17:00 on the first apply). Say "leaves five minutes after" in schedule text.

Nothing left for a person to check by hand on these five. One lead: whether Scottsdale Cycling's Saturday time moves again in winter — ask the club or watch the Strava event.
