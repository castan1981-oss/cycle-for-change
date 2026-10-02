# g5-texas: second pass (Oct 2, 2026)

- **Group:** g5-texas (areas tx-dfw, tx-austin-sa, tx-houston)
- **Agent:** second-pass prover (Claude Sonnet 5.5)
- **Date:** Friday, Oct 2, 2026
- **Files:** `g5-texas.json` (13 new records), `g5-texas-outcomes.json` (90 entries), this report.
- A dry run of `node tools/merge-ride-research.js … --dry` accepted all 13 records. Nothing under `cfc-site/` was touched.

## Counts

| Outcome | Leads |
|---|---|
| proven | 13 |
| gone | 4 |
| still-unproven | 73 |
| total worked | 90 |

13 records: 6 Houston area (Spring, Houston x2, Magnolia, The Woodlands, Sugar Land), 5 DFW (Fort Worth, Flower Mound, Roanoke, Plano, Grand Prairie) and 2 Austin. Confidence: 5 high, 8 medium.

## Search budget

The shared web-search cap (200 per session) ran out after about 25 of my searches. From then on I used the links already in the leads and what those pages linked to. Strava event searches for Waco, Austin and San Antonio never ran. That is the main reason the still-unproven count is high.

## What worked

- **A host's own store or club page that is current.** Sun & Ski's store page says "Sundays at 7am". Motherland's, Plano Bicycle Association's and Lone Star Cyclists' ClubExpress/WordPress calendars list the next dates.
- **ClubExpress calendars carry dates in the page HTML** (`calendar-grid-link` title text for Lone Star Cyclists; a list view for PBA). Fetching the month view and reading the `title=` attributes gave start, address and every Thursday in October.
- **Elfsight events widget.** Bike Mart's group-rides page draws its calendar from an Elfsight widget. `core.service.elfsight.com/p/boot/?page=<page url>&w=<widget id>` returns every event as JSON, with repeat rules and locations. The page text shows nothing without scripts.
- **Dallas Bike Coalition's social-rides calendar** embeds its events as JSON in the page's `props` attribute (Astro island). Only useful to read: every entry was created in Jun 2025 or earlier, so none counts as recent proof.
- **Strava club pages show "Club Posts" with dates** when the club posts. The Bagel Ride's club (Austin) shows posts to Sep 30, 2026 and the Friday Flora Coffee Ride details. The other Strava clubs in this group show only a description and an "Upcoming Club Event" flag.
- **Linktree** pages sometimes carry a dated link title (Ride Bikes Austin: "9/15/26 Parque Zaragoza Cleanup & Taco Ride").
- **Meetup iCal under the group-ID URL.** `meetup.com/social-cycling-austin/events/` says "group not found", but the event URL redirects to `meetup.com/<uuid>/events/`, and `…/events/ical/` there answers with a real feed. Social Cycling Austin's feed has no events.

## What didn't

- **Facebook and Instagram** gave login walls or blank pages every time. Roughly 25 leads end there.
- **Directory pages** (Bike San Antonio, Austin Triathlon Club, Bike Denton, Bike The Woodlands) are undated. Bike The Woodlands is the exception: it says "last updated 04/24/26", which is why its rides are medium.
- **Strava event pages by search** were not possible after the cap.
- **Shop sites that failed:** budabikeco.com, sanantoniocyclingclub.org, thegravelcollective.com, queerride.org, brittonbikes.com over https. Britton's loads on http but has route maps only.

## Surprises

- **Cool Cat Cycles (Cinco Ranch, Katy) is gone.** `coolcatcycles.com` returns a hosting "suspended page", and the shop's address, 24948 FM 1093 #220, is now **Handlebar Cyclery**. Three leads (Bike Attack, no-drop Sunday, gravel) are dead; the Strava club still carries the old text. Motherland Cycling Club already uses Handlebar Cyclery as its Katy start.
- **Bike Barn is now Trek Bicycle Houston.** `bikebarn.com` redirects to Trek's Houston store list.
- **Handlebar Cyclery's "Rides" button goes to its Strava club.** The shop itself has no ride page. The members' club, Handlebar Bicycle Club, publishes its weekly list (Saturday 7:00 am at the shop; Sunday, Tuesday and Thursday rides from Humble Grounds Coffee House), but it is a paid club with a member-only portal and does not say guests may ride.
- **The Strava club text and the club's own site disagree for Pride Bike Ride Houston.** Strava says Monday and Tuesday rides at 7:30 pm; pridebikeride.com lists only Tuesday. Left as unproven.
- **Bike Mart (Dallas) rides sit in a widget that has 18 recurring rides**, including Lake Highlands Hill Loop, Ferndale Loop, Tour de Allen/Plano/Murphy/Richardson and McKinney Monday/Wednesday rides. The host is at the cap on the site, so only Panther Island (a different store, Fort Worth) went in. The widget is a good source for a later pass.
- **Dallas Bike Coalition's calendar is mostly stale.** Almost every entry was created Jun 2025, so entries copied from it by the first sweep (Hump Day Hops, Detox Monday, White Rock Roadies, Cycloholics) have no recent proof.
- **Space City Cycling Club** (Clear Lake) publishes five weekly 7:30 am rides on its site, but the pages say nothing about guests. Listed as medium with a note to ask first.

## Why these (new records)

- **Sun & Ski Sunday Shop Ride (Spring).** The biggest regular ride in north Houston, four pace groups, store page says Sundays at 7am.
- **Coffee & Bikes Sunday Social Ride (Houston, Heights).** Slow Sunday social with a coffee stop, about monthly, next ride Oct 4.
- **Love & Coffee Ride (Magnolia).** Friday no-drop coffee ride, 25 miles at 16 mph.
- **Woodlands Tuesday Night Ride (The Woodlands).** Fast evening ride with a second lap at 6:30 pm.
- **Motherland Sunday Recovery Ride (Sugar Land).** Club's easy Sunday ride, calendar lists the next Sundays.
- **Space City Cycling Club Weekly Rides (Clear Lake).** Five rides a week from Trek Clear Lake, pace groups from cruiser to 25+ mph.
- **Ride Bikes Austin Friday Night Ride (Austin).** Weekly 8 pm roll from Parque Zaragoza.
- **Friday Flora Coffee Ride (Austin).** Friday 7:15 am from Flora Coffee, 23 or 50 miles. Medium: last post is Jul 24.
- **Panther Island Group Ride (Fort Worth).** Led beginner-friendly Wednesday ride from Bike Mart Clearfork.
- **Dirt Disciples Thursday Ride (Flower Mound).** Northshore MTB, advanced west side reversed, 6:00 pm.
- **Velo Cafe Tuesday Night Group Ride (Roanoke).** MTB at Knob Hills, 6:30 pm.
- **PBA Sunday Caffeine Cruise (Plano).** Novice, no-drop, 17 miles, 9 am; guests get 30 free days.
- **Lone Star Cyclists Thursday Training Ride (Grand Prairie).** Dated every Thursday in October.

## Where rides are posted here (field guide notes)

- **Houston suburbs:** Bike The Woodlands Coalition's Local Ride Calendar (`bikethewoodlands.org/rides`, hand-updated, "last updated 04/24/26") is the one page that lists The Woodlands, Magnolia, Conroe and Spring rides together. Its riders post each ride on **Chasing Watts** (free login). Motherland (`motherlandcycling.org/events/`) is a WordPress events calendar; its `?ical=1` URL returns HTML, not a feed.
- **Houston club pages:** Space City (`spacecitycycling.club/riding/`), Clutch City Cruisers (`clutchcitycruisers.com`, copyright 2022), Pride Bike Ride (`pridebikeride.com`), NWCC (`nwcc.bike`, EventON calendar).
- **Dallas–Fort Worth:** ClubExpress calendars (PBA `planobicycle.org`, Lone Star Cyclists `lscyclists.clubexpress.com`, DORBA `dorba.org`) are the best proof sources; read the month view. DORBA's weekly rides page lists every trail ride but no dates. Bike Mart's group-rides page is an Elfsight widget.
- **Denton:** Bike Denton's page and Velo Republic's page agree on the weekly rides; neither is dated and the groups post on Facebook.
- **Austin:** Instagram and Linktree first; Meetup is dead for Social Cycling Austin. The Bagel Ride's Strava club is a rare public feed of dated posts.
- **San Antonio and Waco:** Bike San Antonio's directory and the Waco Bicycle Club's runsignup page give schedules but no dates; Waco's starts go to members by email.
- **Machine-readable:** Meetup iCal (group-ID URL), ClubExpress calendar HTML, Motherland's events page, the Elfsight JSON. None of the 13 records has an `.ics` feed.

## Rejected / gone

- **Cool Cat Cycles Bike Attack, Sunday no-drop and gravel (Katy):** site suspended, address now Handlebar Cyclery (fetched Oct 2, 2026).
- **Bike Barn / Trek Bicycle Houston shop events:** bikebarn.com redirects to Trek's Houston store list (Oct 2, 2026).
- **Corpus Christi Sunday Lamar Park ride:** the only date on Nelo's listing is Jul 31, 2016. Left as still-unproven, likely stale.

## Held back for the host cap

- Plano Bicycle Association: Tuesday Night Coed Ride (6:00 pm, Carpenter Park, west side) and Wednesday Night ABCD (6:00 pm, NW corner of Spring Creek & Coit). Both have their own ride pages. PBA already has three on the site with the Caffeine Cruise.
- Motherland Cycling Club: Saturday ride (7:30 am, start only on a Strava route) and the combined Saturday ride (location varies).
- Bicycle World RGV: Harlingen, Brownsville and McAllen shop rides (page copyright 2026, undated).
- CC Cycling Club: Wednesday Lamar ride (Nelo's listing shows next date Wed Oct 7, 2026, 6:00 pm).
- Bike Mart: the other widget rides (see Surprises).

## Couldn't confirm (for a local rider to check)

Pointers only; each has a note in `g5-texas-outcomes.json`.

**Women / trans / femme / BIPOC / queer**
- Pride Bike Ride Houston Monday Miles. Monday 7:30 pm, Hyde Park Blvd (Strava club text). Check the club's Facebook group, `facebook.com/groups/pridebikeridehouston`.
- Houston Gravel Collective. Strava club 959076.
- Houston Ladies Cycling Club. `facebook.com/groups/hlccl`.
- Toxic Shocks ladies' Monday ride, 7 pm. `facebook.com/groups/toxicshocks`. Only a 2019 listing.
- Spokes y Folkx (Austin). Monthly, beginner, no-drop. Instagram `@spokesyfolxrideatx`, Strava club 904721.
- Austin Gravel Collective. Strava club 1112577; Eventbrite organizer page.
- Bikin' Betties (Austin). Monthly Mondays. `facebook.com/groups/bikinbetties`.
- Austin Latino Heritage Bike Ride; Black History Bike Ride Austin (two 2026 rides, May 17 and Jun 21, 10:00 am at the Haskell House).
- Black Girls Do Bike San Antonio. Wed 10:00 am Phil Hardberger Park, Thu 6:30 pm Tobin Park, fourth Saturday. A Feb 28, 2026 ride was found.
- LezRideSA. About monthly.
- Rebel Betties (San Antonio women's MTB). Meetup and Facebook via `stormmtb.org/groups`.
- Queer Ride (Austin). Already on the site as medium: Do512 says Wednesday 7 pm at the Capitol South Gate.

**Everyone else**
- Dallas (via Dallas Bike Coalition, all created Jun 2025): Hangover Riders Gravel Wednesday and Detox Monday, Miso's Hump Day Hops (2nd and 4th Wednesday), White Rock Roadies, Dallas Cycloholics.
- PlayTri White Rock (first Saturday 10:00 am), Richardson Green Bunny (Tuesday 6:00 pm), Bike Mart White Rock Coffee Outside (Sept 19 and Oct 17, 9:00 am).
- Denton County Cycling Saturday, Tuesday Bike Night; The Sunrise Gang (DORBA, Sat/Sun 6:00 am, location varies).
- Velo Republic and Ride Around Dallas Strava clubs; Frisco, Corinth and Flower Mound Facebook clubs.
- Houston: Society Cycle Works Strava event (one-off trial run on Oct 10), ROMMEO (hard Tue/Thu rides, start varies), Friends of Friends Saturday, Woodlands Bike Social Margarita Monday, Handlebar Cyclery Saturday (7:00 vs 7:30), Clutch City Cruisers (Thursday 7:30 pm, Market Square Park; site copyright 2022), HTX Bike Social (second Friday), Ciclistas del Barrio (Instagram), EaDo Bike Co, Southwest Cycling Club, Major Taylor Houston, Handlebar Bicycle Club, Blue Line Saturday Brunch Ride.
- Austin and San Antonio: Social Cycling Austin's five rides, North Austin Social Bicycling, CapTex Cruisers, Nelo's, Buda Bike Co, Austin Trek stores, Alamo Bicycle La Tuna ride, SA Gear Shifters, Downtown Highlife last Friday, Ride Away Bicycles, Britton's, San Antonio Cycling Club, Waco Bicycle Club's five rides (starts go to members), Corpus Christi and RGV rides.

## Stats

- Leads in file: 90 (the file groups some rides, e.g. "Local clubs" and "Various").
- Worked: 90. Proven: 13. Gone: 4. Still unproven: 73.
- Web searches used: about 25 (cap reached). Page fetches: about 150.
- Records: 13 (5 high, 8 medium). Hosts at the three-ride cap blocked about 12 further rides that were otherwise provable.

## Sources

Fetched pages used as proof:
- `https://www.sunandski.com/stores/the-woodlands-5`, `https://www.bikethewoodlands.org/rides`
- `https://coffeeandbikeshtx.com/`, `/rides/cb-71/`, `/rides/cb-80/`, `/rides/cb-85/`
- `https://motherlandcycling.org/events/`, `/event/blockhouse-coffee-recovery-ride/`
- `https://spacecitycycling.club/riding/`, `/membership/`, `/about/`
- `https://linktr.ee/RideBikesAustin`, `https://austinbikegroups.com/groups`
- `https://www.bikemart.com/pages/group-rides` and its Elfsight widget JSON
- `https://www.dorba.org/content.aspx?page_id=22&club_id=600794&module_id=647759`, `…item_id=2376144`
- `https://planobicycle.org/` (home, calendar `page_id=4002`, ride pages 280346, 280369, 281503, 293004)
- `https://lscyclists.clubexpress.com/content.aspx?page_id=4002&club_id=500833` and the Thursday event page
- `https://www.strava.com/clubs/1158711`
- Also read, not used as proof: `pridebikeride.com` (home, about, contact), `blackhistorybikeride.com`, `bikedenton.org/resources/group-rides`, `velorepublicbikes.com`, `runsignup.com/MemberOrg/WacoBicycleClub/Page/club-rides`, `bicycleworldrgv.com/articles/group-rides-pg625.htm`, `neloscycles.com/CC-Cycling-Club/`, `austintriclub.org` group-ride directory, `bike-san-antonio.org/sa-bike-groups/`, `stormmtb.org/groups`, `clutchcitycruisers.com`, `pullthroughcoffee.com/rides-runs`, `dallasbicyclecoalition.org/social-rides/`, `coolcatcycles.com`, `bikebarn.com`, `handlebarcyclery.com`, `handlebarbicycleclub.com/weeklyrides`, `mthcc.com`, `southwestcyclingclub.com`, `nwcc.bike`, and the Strava club pages named in the leads.
