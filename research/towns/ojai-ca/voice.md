# Ojai — voice pass (Nov 15, 2026)

Applied in place to `data/towns/ojai-ca.json`. Prose only. Every key, number, hour, price,
name, address, URL, `{ride:…}` token and `ride_slug` kept. 43 strings changed (72 small edits).
The file was already close: plain, dated prices, hazards sharp. What changed:

- **Research notes off the page.** "No rate could be read", "could be confirmed", "not confirmed",
  "statute verified", "per the airport's…", "per the City", "read Nov 2026", "Address is from two
  cinema directories", "No source read gives months…". Source-and-date brackets stay, in the
  house form: `(the airport's FAQ, Nov 2026)`.
- **Long sentences cut.** Anything past about twenty words that was two thoughts joined by a
  colon, semicolon or "and" is now two sentences. Price and hour lists were left whole.
- **Two opinion lines.** "a rental fleet worth riding" and "and it's a good one" are gone; the
  bikes are named right after, which says it.
- **US spelling.** centre → center (4), neighbouring → neighboring, remodelling → remodeling.
- **Contractions** where the line was stiff (do not → don't, it is → it's).

No banned word, listicle word, cause hype or mental-health language was in the file. Hazards
lines were only split, never softened. The rider death on Cuyama Road stays as written.

`node tools/verify-town.js data/towns/ojai-ca.json --no-fetch` passes: 0 fails, 3 warnings, all
three the pre-existing "start has no lat/lon" on routes 0, 2 and 4.

Left alone on purpose: `(its own page, Nov 2026)` brackets (house style, and the verifier wants
prices dated); the dense `airline_note` and `rules_and_safety` fact lists apart from the lines
above; "Aug 28 to 31, 2026" (CLAUDE.md wants an en dash for ranges, but it is a date string, so
it is flagged below instead of touched).

## Changes

### `best_months` — too long, research note
**Before:** November to May for the dirt. Bikepacking.com gives that window for the Ojai Rim Loop and calls February and March best, when it is cooler and the creeks run; Pathless Pedaled says to ride Sulphur Mountain in the cooler months. Inland Ojai is hot in summer, so start early then. No source read gives months for the road rides.

**After:** November to May for the dirt. Bikepacking.com gives that window for the Ojai Rim Loop and calls February and March best, when it's cooler and the creeks run. Pathless Pedaled says to ride Sulphur Mountain in the cooler months. Inland Ojai is hot in summer, so start early then.

### `summary` — too long
**Before:** Ojai is a small town in a valley in Ventura County with one car-free path, one gravel mountain and one long highway climb. The Ojai Valley Trail runs 9 paved miles from Bryant Street to Foster Park and on to Ventura, about 15 miles in all. Sulphur Mountain Road is 9 miles of gated dirt, and Highway 33 climbs 10.8 miles into Los Padres National Forest. Center Ride Out, the Los Angeles LGBT Center's three-day ride, camps in Ojai on April 23–25, 2027. There is no airport and no train, so plan on a car to get here; Santa Barbara is the closest airport, about 34 miles west in a straight line.

**After:** Ojai is a small town in a valley in Ventura County with one car-free path, one gravel mountain and one long highway climb. The Ojai Valley Trail runs 9 paved miles from Bryant Street to Foster Park and on to Ventura, about 15 miles in all. Sulphur Mountain Road is 9 miles of gated dirt, and Highway 33 climbs 10.8 miles into Los Padres National Forest. Center Ride Out, the Los Angeles LGBT Center's three-day ride, camps in Ojai on April 23–25, 2027. There's no airport and no train, so plan on a car to get here. Santa Barbara is the closest airport, about 34 miles west in a straight line.

### `about[0]` — too long
**Before:** Ojai sits in a valley in Ventura County at 745 feet: 7,637 people at the 2020 census, in 4.4 square miles. This guide covers the town and the valley around it: Meiners Oaks and the west end toward Lake Casitas, Mira Monte, Oak View and Casitas Springs down the bike path, and Upper Ojai over the hill to the east. Ventura, about 12 miles south, is a different town; it's here only for the shops that are open when Ojai's is shut and the clubs that ride up the path.

**After:** Ojai sits in a valley in Ventura County at 745 feet: 7,637 people at the 2020 census, in 4.4 square miles. This guide covers the town and the valley around it. That's Meiners Oaks and the west end toward Lake Casitas. Mira Monte, Oak View and Casitas Springs down the bike path. Upper Ojai over the hill to the east. Ventura, about 12 miles south, is a different town. It's here only for the shops that are open when Ojai's is shut and the clubs that ride up the path.

### `about[1]` — too long
**Before:** It's written for two readers. The first is the Center Ride Out rider. The ride reaches Ojai on Friday, April 23, 2027, riders can stay in camp or ride an out-and-back on Saturday, and they roll for Los Angeles by 7:00 am on Sunday. The Center has not published where the camp is. Saturday is the day for coffee, a shop and a short ride. The second reader is whoever drives up to meet them and needs a room, and anyone who comes with a bike on another weekend.

**After:** It's written for two readers. The first is the Center Ride Out rider. The ride reaches Ojai on Friday, April 23, 2027. Riders can stay in camp or ride an out-and-back on Saturday. They roll for Los Angeles by 7:00 am on Sunday. The Center has not published where the camp is. Saturday is the day for coffee, a shop and a short ride. The second reader is whoever drives up to meet them and needs a room. Or anyone who comes with a bike on another weekend.

### `about[2]` — research note
**Before:** Ojai is one of everything. One bike shop, The Mob Shop, downtown and closed Tuesday and Wednesday. One coffee place open at 6 every day, Ojai Coffee Roasters. No recurring group ride that starts in the valley could be confirmed; the rides that reach it come up the path from Ventura. Dinner ends early: most kitchens close by 8 or 9.

**After:** Ojai is one of everything. One bike shop, The Mob Shop, downtown and closed Tuesday and Wednesday. One coffee place open at 6 every day, Ojai Coffee Roasters. We found no recurring group ride that starts in the valley. The rides that reach it come up the path from Ventura. Dinner ends early: most kitchens close by 8 or 9.

### `riding[0]` — too long
**Before:** Start with the Ojai Valley Trail. It's a paved rail-trail, car-free, 9.3 miles from Bryant Street in Ojai down to Foster Park, where the Ventura River Trail carries on to the coast, about 15 miles in all. It drops gently the whole way, so the climb is on the way home: about 500 feet from Foster Park, 800 to 1,000 from Ventura. Weekends are crowded and the pavement has root bumps.

**After:** Start with the Ojai Valley Trail. It's a paved rail-trail, car-free, 9.3 miles from Bryant Street in Ojai down to Foster Park. There the Ventura River Trail carries on to the coast, about 15 miles in all. It drops gently the whole way, so the climb is on the way home: about 500 feet from Foster Park, 800 to 1,000 from Ventura. Weekends are crowded and the pavement has root bumps.

### `riding[1]` — too long
**Before:** The short road climb is the Upper Ojai Summit: 6.5 miles and 781 feet east out of town on a two-lane road with narrow shoulders. The long one is Highway 33 north: 10.8 miles and 2,625 feet at 4.6 percent, through the three Wheeler Gorge tunnels, with no water you can count on. Caltrans is rebuilding those tunnels and expects to finish in winter 2026/2027, so check State Route 33 before you go. The long road day is the Lake Casitas loop, 48 miles out Highway 150 to the coast and home up the path.

**After:** The short road climb is the Upper Ojai Summit: 6.5 miles and 781 feet east out of town on a two-lane road with narrow shoulders. The long one is Highway 33 north: 10.8 miles and 2,625 feet at 4.6 percent. It goes through the three Wheeler Gorge tunnels, and there's no water you can count on. Caltrans is rebuilding those tunnels and expects to finish in winter 2026/2027, so check State Route 33 before you go. The long road day is the Lake Casitas loop, 48 miles out Highway 150 to the coast and home up the path.

### `riding[2]` — too long
**Before:** The gravel is Sulphur Mountain Road: about 9 miles and 2,100 feet of gated ranch road with cattle on it, no cars, no water and little shade, ridden as a 30-mile loop from town. The Ojai Rim Loop is the two-day version, 67 miles and 10,277 feet. Both are for the cooler months.

**After:** The gravel is Sulphur Mountain Road: about 9 miles and 2,100 feet of gated ranch road. Cattle on it, no cars, no water and little shade. Ride it as a 30-mile loop from town. The Ojai Rim Loop is the two-day version, 67 miles and 10,277 feet. Both are for the cooler months.

### `getting_there` — too long, too long, stiff
**Before:** Drive. Ojai has no airport and no train. Santa Barbara Airport (SBA) is the closest with airlines, about 34 miles west in a straight line; Hollywood Burbank is about 54 and Los Angeles International about 59 southeast, and the road is longer than each figure. From the south or the coast, take the 101 to Ventura and Highway 33 north, 14 miles to town. Route 150 over Casitas Pass also comes in from the 101; the Ojai Valley Inn's directions page advises against it in rain, at night or if you don't know the road (Nov 2026). Without a car: Gold Coast Transit Route 16 links the Ventura Transit Center with downtown Ojai, and every bus has a front rack for three built bikes, free. The nearest train is the Pacific Surfliner in Ventura, where a full-size bike rides free with a reserved bike space; Ventura is the bottom of the bike path, about 15 miles below Ojai.

**After:** Drive. Ojai has no airport and no train. Santa Barbara Airport (SBA) is the closest with airlines, about 34 miles west in a straight line. Hollywood Burbank is about 54 and Los Angeles International about 59 southeast. The drive is longer than each number. From the south or the coast, take the 101 to Ventura and Highway 33 north, 14 miles to town. Route 150 over Casitas Pass also comes in from the 101. The Ojai Valley Inn's directions page says to skip it in rain, at night or if you don't know the road (Nov 2026). Without a car: Gold Coast Transit Route 16 links the Ventura Transit Center with downtown Ojai. Every bus has a front rack for three built bikes, free. The nearest train is the Pacific Surfliner in Ventura, where a full-size bike rides free with a reserved bike space. Ventura is the bottom of the bike path, about 15 miles below Ojai.

### `routes[0].description` (Ojai Valley Trail) — too long
**Before:** The car-free path down the valley. TrailLink lists it as a 9.3-mile rail-trail from Bryant Street in Ojai to Foster Park (37 Casitas Vista Rd), where it meets the Ventura River Trail and keeps going to the coast. Ojai to Ventura is about 15 miles one way, gently downhill, so the climb is on the way home: about 500 feet from Foster Park back up to Ojai, 800 to 1,000 from Ventura. Ride out as far as you like and turn around. The miles and feet here are one way, Ojai to Foster Park. Blue Iguana Inn sits beside the path, and Ojai Valley Brewery is on Bryant Street, the street the Ojai end is on.

**After:** The car-free path down the valley. TrailLink lists it as a 9.3-mile rail-trail from Bryant Street in Ojai to Foster Park (37 Casitas Vista Rd). There it meets the Ventura River Trail and keeps going to the coast. Ojai to Ventura is about 15 miles one way, gently downhill, so the climb is on the way home. That's about 500 feet from Foster Park back up to Ojai, 800 to 1,000 from Ventura. Ride out as far as you like and turn around. The miles and feet here are one way, Ojai to Foster Park. Blue Iguana Inn sits beside the path, and Ojai Valley Brewery is on Bryant Street, the street the Ojai end is on.

### `routes[1].description` (Upper Ojai Summit climb) — US spelling, stiff
**Before:** The short climb east out of town to Upper Ojai. The segment is 6.5 miles and 781 feet at a 2.3% average, 7.5% at its steepest, from 663 feet to 1,421. It starts about a mile and a half east of the centre of town. Short enough for a Saturday morning: up, turn around, back for coffee. Graded moderate, not easy, because you share a two-lane road with cars and it is not a quiet one.

**After:** The short climb east out of town to Upper Ojai. The segment is 6.5 miles and 781 feet at a 2.3% average, 7.5% at its steepest, from 663 feet to 1,421. It starts about a mile and a half east of the center of town. Short enough for a Saturday morning: up, turn around, back for coffee. It's graded moderate, not easy. You share a two-lane road with cars, and it isn't a quiet one.

### `routes[2].description` (Sulphur Mountain Road loop) — too long, comma, fragment
**Before:** Where the gravel bikes go. Down the Ojai Valley Trail, a short stretch on Highway 33, then up Sulphur Mountain Road: a gated ranch road, closed to cars, about 9 miles and 2,100 feet at a 5% average (12% at its steepest) from about 400 feet to 2,300. It comes out on pavement in Upper Ojai and drops back to town on a switchbacked road. A gravel bike with wide tires; not a road bike. Ride it in the cooler months. The Channel Islands Bicycle Club ran a version of this loop from Ventura in April 2026.

**After:** Where the gravel bikes go. Down the Ojai Valley Trail, a short stretch on Highway 33, then up Sulphur Mountain Road. It's a gated ranch road, closed to cars. About 9 miles and 2,100 feet at a 5% average (12% at its steepest), from about 400 feet to 2,300. It comes out on pavement in Upper Ojai and drops back to town on a switchbacked road. Bring a gravel bike with wide tires, not a road bike. Ride it in the cooler months. The Channel Islands Bicycle Club ran a version of this loop from Ventura in April 2026.

### `routes[3].description` (Highway 33 climb, Matilija to the top) — too long, US spelling
**Before:** The climb. Highway 33 leaves the valley, runs through Wheeler Gorge and its three tunnels, and keeps going up into Los Padres National Forest. The segment is 10.8 miles and 2,625 feet at a 4.6% average, from 943 feet to 3,568. The miles and feet are one way, and the start is about 4 miles from the centre of town, so from Ojai and back it is a much bigger day than the numbers say. Turn around at the top and come down the way you went up. Ojai Deer Lodge is on the same road, Maricopa Highway, on the way out.

**After:** The climb. Highway 33 leaves the valley, runs through Wheeler Gorge and its three tunnels, and keeps going up into Los Padres National Forest. The segment is 10.8 miles and 2,625 feet at a 4.6% average, from 943 feet to 3,568. The miles and feet are one way, and the start is about 4 miles from the center of town. From Ojai and back it's a much bigger day than the numbers say. Turn around at the top and come down the way you went up. Ojai Deer Lodge is on the same road, Maricopa Highway, on the way out.

### `routes[3].water` (Highway 33 climb, Matilija to the top) — too long
**Before:** None you can count on. The Forest Service says there is no potable water on the byway. A 2015 ride report says Wheeler Gorge Campground has no running water and that bottled water was sold at the visitor center there; that is old, so don't plan on it. Fill up in Ojai.

**After:** None you can count on. The Forest Service says there is no potable water on the byway. A 2015 ride report says Wheeler Gorge Campground has no running water and that bottled water was sold at the visitor center there. That's old, so don't plan on it. Fill up in Ojai.

### `routes[3].hazards` (Highway 33 climb, Matilija to the top) — too long
**Before:** Three tunnels in Wheeler Gorge; a 2015 ride report says the first one curves and is disorienting inside. Caltrans is rebuilding the three tunnels (post miles 18.2 to 19.0): it shut the road to everyone for 55 hours on Aug 28 to 31, 2026, and expects to finish in winter 2026/2027 (Caltrans release, Aug 12, 2026). Check Caltrans for State Route 33 before you go. Rocks and gravel fall onto the road, which matters most on the way down. The road draws motorcycle groups and car clubs. Spotty or no cell service in the gorge (2015 report). No services. Wind on the descent. Los Padres National Forest listed fire danger as Very High on Nov 15, 2026.

**After:** Three tunnels in Wheeler Gorge; a 2015 ride report says the first one curves and is disorienting inside. Caltrans is rebuilding the three tunnels (post miles 18.2 to 19.0). It shut the road to everyone for 55 hours on Aug 28 to 31, 2026, and expects to finish in winter 2026/2027 (Caltrans release, Aug 12, 2026). Check Caltrans for State Route 33 before you go. Rocks and gravel fall onto the road, which matters most on the way down. The road draws motorcycle groups and car clubs. Spotty or no cell service in the gorge (2015 report). No services. Wind on the descent. Los Padres National Forest listed fire danger as Very High on Nov 15, 2026.

### `routes[4].water` (Lake Casitas loop) — US spelling
**Before:** Faria County Park on the coast has restrooms and water (Komoot's notes on the neighbouring loop). Nothing else is named.

**After:** Faria County Park on the coast has restrooms and water (Komoot's notes on the neighboring loop). Nothing else is named.

### `coffee[1].note` (Coffee Connection) — research note
**Before:** In Meiners Oaks, on the west side of the valley toward Highway 150 and the lake. Opens at 6 on Saturday and is done by 1, so it's a morning stop. Sunday is in doubt: the shop's own page says 6 to 1, two listings say closed, so call first: 805-646-7821. Outdoor seating per one listing, not the shop's own page; nothing stated about bike parking. Farmer and the Cook is on the same street.

**After:** In Meiners Oaks, on the west side of the valley toward Highway 150 and the lake. Opens at 6 on Saturday and is done by 1, so it's a morning stop. Sunday is in doubt. The shop's own page says 6 to 1 and two listings say closed, so call first: 805-646-7821. One listing shows outdoor seating; the shop's own page doesn't. Nothing on bike parking. Farmer and the Cook is on the same street.

### `coffee[2].note` (Three Birds) — too long
**Before:** Downtown, a block or so off Ojai Avenue on Signal Street. Opens at 7 and stays open until 4, so it's the one for after the ride. Reviewers on two listings describe a large outdoor seating area; the café's own site doesn't mention it, and nothing says bike parking.

**After:** Downtown, a block or so off Ojai Avenue on Signal Street. Opens at 7 and stays open until 4, so it's the one for after the ride. Reviewers on two listings describe a large outdoor seating area. The café's own site doesn't mention it, and nothing mentions bike parking.

### `hotels[0].note` (Blue Iguana Inn) — research note
**Before:** The one on the path. Its own page puts it "two miles from downtown Ojai" with "onsite bike rental" and "the adjacent Ojai Valley Trail." Rooms, suites and cottages around a pool. Its policies page says "Weekends require at least a 2-night booking" and that holidays and special events may need longer; check-in is 3 pm. Nothing about bringing your own bike. No rate could be read (Nov 2026).

**After:** The one on the path. Its own page puts it "two miles from downtown Ojai" with "onsite bike rental" and "the adjacent Ojai Valley Trail." Rooms, suites and cottages around a pool. Its policies page says "Weekends require at least a 2-night booking" and that holidays and special events may need longer; check-in is 3 pm. Nothing about bringing your own bike. Check the site for rates.

### `hotels[1].note` (Ojai Rancho Inn) — US spelling, research note
**Before:** West end of town, about half a mile from the centre, where Highway 33 comes in. 17 rooms, a pool and a bar on site. Its amenities list says "Complimentary bicycles for use" and the page calls town "an easy 5 minute bike ride," or 15 minutes on foot by the path behind the property. Free parking, fridge and microwave in the rooms. Nothing about bringing your own bike. No rate could be read (Nov 2026).

**After:** West end of town, about half a mile from the center, where Highway 33 comes in. 17 rooms, a pool and a bar on site. Its amenities list says "Complimentary bicycles for use" and the page calls town "an easy 5 minute bike ride," or 15 minutes on foot by the path behind the property. Free parking, fridge and microwave in the rooms. Nothing about bringing your own bike. Check the site for rates.

### `hotels[2].note` (Hummingbird Inn) — US spelling, tangled
**Before:** East side, about a mile from the centre on Ojai Avenue, on the way out to the orchard roads. Pool, fire pit, fridges and microwaves in the rooms. Its home page says "grab a complimentary bicycle and tour Ojai." The patio rooms are downstairs, by its rooms page, which is the one to ask for with a bike. Nothing about bringing your own. $186 a night before tax on Hotels.com for Nov 17–18 (read Nov 15, 2026).

**After:** East side, about a mile from the center on Ojai Avenue, on the way out to the orchard roads. Pool, fire pit, fridges and microwaves in the rooms. Its home page says "grab a complimentary bicycle and tour Ojai." Its rooms page says the patio rooms are downstairs. Ask for one if you have a bike. Nothing about bringing your own. $186 a night before tax on Hotels.com for Nov 17–18 (read Nov 15, 2026).

### `hotels[3].note` (Casa Ojai Inn) — research note, trim
**Before:** East side on Ojai Avenue, the same stretch as the Hummingbird and across from Soule Park Golf Course. The most bike detail of any lodging page in town: "All guests at Casa Ojai and our sister hotel Su Nido Inn are welcome to use our complimentary bicycles," and the amenities list has "Bicycles, Locks, and Helmets included with amenity fee" plus a "hydration station available for refilling water bottles." Saltwater pool. The amenity fee isn't priced on the page and no rate could be read (Nov 2026). The site's footer is dated 2022, so call to confirm before you count on it.

**After:** East side on Ojai Avenue, the same stretch as the Hummingbird and across from Soule Park Golf Course. Its page says more about bikes than any other place to stay in town: "All guests at Casa Ojai and our sister hotel Su Nido Inn are welcome to use our complimentary bicycles," and the amenities list has "Bicycles, Locks, and Helmets included with amenity fee" plus a "hydration station available for refilling water bottles." Saltwater pool. The amenity fee isn't priced on the page (Nov 2026). Check the site for rates. The site's footer is dated 2022, so call before you count on it.

### `hotels[5].note` (Ojai Valley Inn) — research note
**Before:** The splurge: the big golf resort on the west side of town. Its activities page says "Pick up a complimentary Linus bicycle" and lists two guided bike tours, about 3 and about 7 miles. Those are cruisers for a picnic, not a ride. Nothing about bringing your own bike, and no rate could be read (Nov 2026).

**After:** The splurge: the big golf resort on the west side of town. Its activities page says "Pick up a complimentary Linus bicycle" and lists two guided bike tours, about 3 and about 7 miles. Those are cruisers for a picnic, not a ride. Nothing about bringing your own bike. Check the site for rates.

### `bike_shops[0].note` (The Mob Shop) — hype, too long
**Before:** Downtown Ojai, on Ojai Avenue. The one shop in town with a workshop and a rental fleet worth riding. Monday, Thursday and Friday 10 to 5, Saturday 9 to 5, Sunday 9 to 4; closed Tuesday and Wednesday. Tune-ups from $99 (Basic) to $189 (Premium-Plus), wash and lube $39, 50-hour fork or shock service $95 plus parts, and wheelbuilding (Nov 2026); the page gives no turnaround time, so call before you count on a same-day fix. Rentals are book-ahead only, no walk-ins: ENVE Melee road bike in 54, 56 and 58, ENVE MOG and Salsa Flyway gravel bikes, a Moots Vamoots 33 and Pivot mountain bikes, each listed "from $125" (Nov 2026; the page doesn't say per what), with a security deposit at pick-up and helmets included. The rental pages say these bikes "may not be rented for mass start events or races," so ask the shop before you plan one for an organized ride.

**After:** Downtown Ojai, on Ojai Avenue. The one shop in town, with a workshop and a rental fleet. Monday, Thursday and Friday 10 to 5, Saturday 9 to 5, Sunday 9 to 4; closed Tuesday and Wednesday. Tune-ups from $99 (Basic) to $189 (Premium-Plus), wash and lube $39, 50-hour fork or shock service $95 plus parts, and wheelbuilding (Nov 2026). The page gives no turnaround time, so call before you count on a same-day fix. Rentals are book-ahead only, no walk-ins. The bikes: ENVE Melee road bike in 54, 56 and 58, ENVE MOG and Salsa Flyway gravel bikes, a Moots Vamoots 33 and Pivot mountain bikes. Each is listed "from $125" (Nov 2026; the page doesn't say per what). Security deposit at pick-up, helmets included. The rental pages say these bikes "may not be rented for mass start events or races," so ask the shop before you plan one for an organized ride.

### `bike_shops[1].note` (Ventura Bike Depot) — too long
**Before:** Downtown Ventura, about 12 miles south of Ojai. The reason to make the trip: it's open every day, 9 to 5, so it covers the Tuesday and Wednesday when the Ojai shop is closed. Safety check $49, basic tune-up $89, standard tune-up $149, deluxe $299, parts extra (Nov 2026); e-bike work is mechanical only. Rents "premium road bikes" and hardtail mountain bikes by the block, from four hours to four days, plus Gazelle e-bikes; the page doesn't name the road bike models or sizes, so ask. Helmet free with a rental. A local shop since 1995, by its own About page.

**After:** Downtown Ventura, about 12 miles south of Ojai. The reason to make the trip: it's open every day, 9 to 5, so it covers the Tuesday and Wednesday when the Ojai shop is closed. Safety check $49, basic tune-up $89, standard tune-up $149, deluxe $299, parts extra (Nov 2026); e-bike work is mechanical only. Rents "premium road bikes" and hardtail mountain bikes by the block, from four hours to four days, plus Gazelle e-bikes. The page doesn't name the road bike models or sizes, so ask. Helmet free with a rental. A local shop since 1995, by its own About page.

### `culture[1].note` (Ojai Valley Brewery & Side Street Wine) — too long
**Before:** A small brewery and winery with a tasting room and a big outdoor patio, about five minutes from downtown by its own listing, on Bryant Street, the street the Ojai Valley Trail's Ojai end is on. Open Monday to Thursday 4 to 9 p.m., Friday 3 to 10, Saturday noon to 11, Sunday 11 a.m. to 8 p.m. (its Google listing, Nov 2026); (805) 798-9282. Weekends bring a food vendor and a band; the listing showed six such nights in September and October 2026. The patio is the room for a group.

**After:** A small brewery and winery with a tasting room and a big outdoor patio. It's about five minutes from downtown by its own listing, on Bryant Street, the street the Ojai Valley Trail's Ojai end is on. Open Monday to Thursday 4 to 9 p.m., Friday 3 to 10, Saturday noon to 11, Sunday 11 a.m. to 8 p.m. (its Google listing, Nov 2026); (805) 798-9282. Weekends bring a food vendor and a band; the listing showed six such nights in September and October 2026. The patio is the room for a group.

### `culture[2].note` (Ojai Certified Farmers' Market) — research note
**Before:** Sundays 9 a.m. to 1 p.m., all year, rain or shine, behind the Arcade. The day, hours and address are the same on the Ventura County agricultural commissioner's market list and on the market's LocalHarvest listing (updated Jan 2025). Produce, flowers and food from the growers. On Center Ride Out Sunday the riders roll by 7:00 am, so this one is for whoever drove up, and for any other weekend.

**After:** Sundays 9 a.m. to 1 p.m., all year, rain or shine, behind the Arcade (Ventura County agricultural commissioner's market list; the market's LocalHarvest listing, updated Jan 2025). Produce, flowers and food from the growers. On Center Ride Out Sunday the riders roll by 7:00 am, so this one is for whoever drove up, and for any other weekend.

### `culture[3].note` (Ojai Playhouse) — research note
**Before:** The town's one movie house, 200 seats, built in 1914. A flood shut it in 2014 and it reopened November 22, 2024 after a long rebuild. It runs 35mm and 4K film, plus comedy, talks and music, and has a café and a bar, by its own reopening release. Listings for the week of Nov 15, 2026 show films most days, afternoons and evenings. Address is from two cinema directories, not the theater's own page; check showtimes on its site.

**After:** The town's one movie house, 200 seats, built in 1914. A flood shut it in 2014 and it reopened November 22, 2024 after a long rebuild. It runs 35mm and 4K film, plus comedy, talks and music, and has a café and a bar, by its own reopening release. Listings for the week of Nov 15, 2026 show films most days, afternoons and evenings. Check showtimes on its site.

### `culture[4].note` (Ojai Valley Museum) — US spelling
**Before:** Valley history and local art in an old chapel on the main street: one gallery that changes about four times a year, a Sespe Wilderness diorama, a Chumash garden round the patio. Open Thursday to Sunday 10 a.m. to 4 p.m., to 7 p.m. on third Fridays, when it's free. Suggested donation $5 (Nov 2026); (805) 640-1390. It was closed for remodelling in mid-November 2026; its page says normal hours resume Thursday, November 19. An hour, not an afternoon.

**After:** Valley history and local art in an old chapel on the main street: one gallery that changes about four times a year, a Sespe Wilderness diorama, a Chumash garden round the patio. Open Thursday to Sunday 10 a.m. to 4 p.m., to 7 p.m. on third Fridays, when it's free. Suggested donation $5 (Nov 2026); (805) 640-1390. It was closed for remodeling in mid-November 2026; its page says normal hours resume Thursday, November 19. An hour, not an afternoon.

### `clubs[0].note` (Easy Rider (Channel Islands Bicycle Club and BikeVentura)) — too long
**Before:** The closest thing to a group ride into the Ojai Valley. Free rides from the Museum of Ventura County lot that the group calls beginner-friendly and no-drop, in two groups: Easy Rider and a longer Easy Rider Plus. The Plus group rode up the path to Meiners Oaks on Nov 15, 2026, about 29 miles round trip. Sign the online waiver first, and be able to ride 20 miles at 12 mph. Day and time: {ride:ventura-ca-easy-rider-community-ride|the Easy Rider ride}.

**After:** The closest thing to a group ride into the Ojai Valley. Free rides from the Museum of Ventura County lot, in two groups: Easy Rider and a longer Easy Rider Plus. The group calls them beginner-friendly and no-drop. The Plus group rode up the path to Meiners Oaks on Nov 15, 2026, about 29 miles round trip. Sign the online waiver first, and be able to ride 20 miles at 12 mph. Day and time: {ride:ventura-ca-easy-rider-community-ride|the Easy Rider ride}.

### `clubs[1].note` (Channel Islands Bicycle Club) — too long
**Before:** A road club in Ventura that describes itself as social riding. Weekly rides leave from Ventura, and special rides come up to Ojai: on April 2, 2026 it ran a Sulphur Mountain gravel and road loop into Ojai, 47 miles from the Museum lot or 32 from the Sulphur Mountain trailhead, with lunch in Meiners Oaks. Ride as a member, or sign the ride waiver on the club's calendar page.

**After:** A road club in Ventura that describes itself as social riding. Weekly rides leave from Ventura, and special rides come up to Ojai. On April 2, 2026 it ran a Sulphur Mountain gravel and road loop into Ojai: 47 miles from the Museum lot or 32 from the Sulphur Mountain trailhead, with lunch in Meiners Oaks. Ride as a member, or sign the ride waiver on the club's calendar page.

### `clubs[2].note` (Great Outdoors — Santa Barbara Ventura County chapter) — too long, commas
**Before:** An all-volunteer LGBTQIA+ and allies outdoors club, not a cycling club. It hikes and camps, and it has led a bike ride from Ventura up the trail to Ojai and back: 30 miles, at a pace it called leisurely, with lunch in downtown Ojai (Nov 23, 2025). No bike ride was on its calendar on Nov 15, 2026, so check the outings page. Register for an outing on the site. Membership is $25 a year (Nov 2026).

**After:** An all-volunteer LGBTQIA+ and allies outdoors club, not a cycling club. It hikes and camps. It has led a bike ride from Ventura up the trail to Ojai and back: 30 miles at a pace it called leisurely, with lunch in downtown Ojai (Nov 23, 2025). No bike ride was on its calendar on Nov 15, 2026, so check the outings page. Register for an outing on the site. Membership is $25 a year (Nov 2026).

### `bring_your_bike.summary` — too long, spoken
**Before:** Bring it, and plan on a car. Ojai has no airport: Santa Barbara is about 34 miles west in a straight line, Burbank about 54 and Los Angeles International about 59 southeast, and no airport page names a shuttle to town. Delta, American and Southwest all check a packed bike at the standard bag fee (Nov 2026), so flying with it costs less than renting. The Mob Shop downtown rents road, gravel and mountain bikes by advance booking only, is closed Tuesday and Wednesday, and says its performance bikes can't be rented for mass-start events or races. No shop in the Ojai Valley or Ventura says on its own site that it receives a shipped bike. Once you are in town with a built bike, you can ride to everything.

**After:** Bring it, and plan on a car. Ojai has no airport. Santa Barbara is about 34 miles west in a straight line, Burbank about 54 and Los Angeles International about 59 southeast. No airport page names a shuttle to town. Delta, American and Southwest all check a packed bike at the standard bag fee (Nov 2026), so flying with it costs less than renting. The Mob Shop downtown rents road, gravel and mountain bikes by advance booking only. It's closed Tuesday and Wednesday, and it says its performance bikes can't be rented for mass-start events or races. No shop in the Ojai Valley or Ventura says on its own site that it receives a shipped bike. Once you're in town with a built bike, you can ride to everything.

### `bring_your_bike.fly.airports[0].note` — research note
**Before:** The closest airport with airline service, about 34 miles west in a straight line; the drive is longer. Alaska (Portland, San Diego, Seattle), American (Dallas-Fort Worth, Phoenix), Delta (Salt Lake City), Southwest (Las Vegas, Oakland, Sacramento, Denver, San Diego) and United (Chicago, Denver, Los Angeles, San Francisco), per the airport's airlines page (last modified Sept 29, 2026). Uber and Lyft pick up in front of the terminal; taxis, rental cars and the Santa Barbara Airbus are listed on the airport's ground-transport page. That page says nothing about oversized bags and names no service to Ojai. 500 James Fowler Road, Santa Barbara.

**After:** The closest airport with airline service, about 34 miles west in a straight line; the drive is longer. Alaska (Portland, San Diego, Seattle), American (Dallas-Fort Worth, Phoenix), Delta (Salt Lake City), Southwest (Las Vegas, Oakland, Sacramento, Denver, San Diego) and United (Chicago, Denver, Los Angeles, San Francisco) (the airport's airlines page, last modified Sept 29, 2026). Uber and Lyft pick up in front of the terminal; taxis, rental cars and the Santa Barbara Airbus are listed on the airport's ground-transport page. That page says nothing about oversized bags and names no service to Ojai. 500 James Fowler Road, Santa Barbara.

### `bring_your_bike.fly.airports[1].note` — research note
**Before:** About 54 miles southeast in a straight line. Alaska, Allegiant, American, Breeze, Delta, JetBlue, Southwest and United, per the airport's FAQ (Nov 2026). Ten rental car companies on site in one building, and an Amtrak and Metrolink station on Empire Avenue. The easier Los Angeles airport to get a rental car and a bike case out of. 2827 N Hollywood Way, Burbank.

**After:** About 54 miles southeast in a straight line. Alaska, Allegiant, American, Breeze, Delta, JetBlue, Southwest and United (the airport's FAQ, Nov 2026). Ten rental car companies on site in one building, and an Amtrak and Metrolink station on Empire Avenue. The easier Los Angeles airport to get a rental car and a bike case out of. 2827 N Hollywood Way, Burbank.

### `bring_your_bike.fly.airports[2].note` — research note
**Before:** About 59 miles southeast in a straight line; the most flights. Alaska, Southwest, Delta, American and United, per the airport's airline list (Sept 2026). Ride apps and taxis pick up at the LAX-it lot; rental car offices are off airport by shuttle (Sept 2026). The Ojai Valley Inn's directions page has you on the 101 for about 50 miles, then Highway 33 for 14 more (Nov 2026).

**After:** About 59 miles southeast in a straight line; the most flights. Alaska, Southwest, Delta, American and United (the airport's airline list, Sept 2026). Ride apps and taxis pick up at the LAX-it lot; rental car offices are off airport by shuttle (Sept 2026). The Ojai Valley Inn's directions page has you on the 101 for about 50 miles, then Highway 33 for 14 more (Nov 2026).

### `bring_your_bike.fly.airline_note` — research note
**Before:** From each airline's own page, Nov 2026, unless marked. Delta: a non-motorized touring or single-seat racing bike in a container built for bikes goes at the standard bag allowance and fee; over 50 lb pays the excess weight fee; 100 lb or more, or over 115 linear inches, is refused; a hard-shell bike case needs no release form, a soft bag signs a limited release; some Delta Connection flights exclude bikes. First bag $45, second $55, US domestic Main Cabin. American: one non-motorized touring, mountain, tandem or racing bike in a hard case, a bike bag or a box built for bikes; standard checked bag fee up to 50 lb, standard overweight fee from 50 to 70 lb, oversize fees do not apply; handlebars sideways, pedals off or wrapped; not in a hard case it is treated as fragile. Main Cabin first bag $50 at the airport or $45 online, second $60 or $55, for tickets issued on or after April 9, 2026; overweight is $30 for 50 to 53 lb and $100 for 53 to 70 lb. Southwest: a non-motorized single-seat bike is checked baggage at standard checked bag and overweight fees, oversize fees waived; over 100 lb or 115 inches is refused; pedals and handlebars removed and wrapped; cardboard or a soft case flies with a limited release. The Southwest bike page gives no dollar figures; its fee page had $45 and $55 in Sept 2026. Alaska (Sept 2026): a cased bike is a standard checked bag, oversize waived and overweight waived to 70 lb, first bag $45, second $55. United: not confirmed; read its sports-equipment page before you book. Keep the case under 50 lb and it is one ordinary checked bag on every carrier confirmed here.

**After:** From each airline's own page, Nov 2026, unless marked. Delta: a non-motorized touring or single-seat racing bike in a container built for bikes goes at the standard bag allowance and fee; over 50 lb pays the excess weight fee; 100 lb or more, or over 115 linear inches, is refused; a hard-shell bike case needs no release form, a soft bag signs a limited release; some Delta Connection flights exclude bikes. First bag $45, second $55, US domestic Main Cabin. American: one non-motorized touring, mountain, tandem or racing bike in a hard case, a bike bag or a box built for bikes; standard checked bag fee up to 50 lb, standard overweight fee from 50 to 70 lb, oversize fees do not apply; handlebars sideways, pedals off or wrapped; not in a hard case it is treated as fragile. Main Cabin first bag $50 at the airport or $45 online, second $60 or $55, for tickets issued on or after April 9, 2026; overweight is $30 for 50 to 53 lb and $100 for 53 to 70 lb. Southwest: a non-motorized single-seat bike is checked baggage at standard checked bag and overweight fees, oversize fees waived; over 100 lb or 115 inches is refused; pedals and handlebars removed and wrapped; cardboard or a soft case flies with a limited release. The Southwest bike page gives no dollar figures; its fee page had $45 and $55 in Sept 2026. Alaska (Sept 2026): a cased bike is a standard checked bag, oversize waived and overweight waived to 70 lb, first bag $45, second $55. United: we don't have its rule, so read its sports-equipment page before you book. Keep the case under 50 lb and it's one ordinary checked bag on every carrier above but United.

### `bring_your_bike.ship.note` — too long
**Before:** No shop in the Ojai Valley or Ventura says on its own site that it receives and builds a shipped bike (Nov 15, 2026). The Mob Shop's contact, workshop and store-policy pages say nothing about shipping, boxing or assembly; call (805) 272-8102 before you send anything, and remember it is closed Tuesday and Wednesday. Trek Bicycle Ventura boxes a bike for the trip home for $79.99 (Nov 2026); that covers leaving, not arriving. The carriers people use (Sept 2026): BikeFlights ships by UPS, states no transit-day count and says to allow an extra day or two for weather; ShipBikes, also UPS ground, says no more than 6 business days one way in the continental US. If a shop agrees to take it, ship at least a week ahead.

**After:** No shop in the Ojai Valley or Ventura says on its own site that it receives and builds a shipped bike (Nov 15, 2026). The Mob Shop's contact, workshop and store-policy pages say nothing about shipping, boxing or assembly; call (805) 272-8102 before you send anything. It's closed Tuesday and Wednesday. Trek Bicycle Ventura boxes a bike for the trip home for $79.99 (Nov 2026). That covers leaving, not arriving. The carriers people use (Sept 2026): BikeFlights ships by UPS, states no transit-day count and says to allow an extra day or two for weather; ShipBikes, also UPS ground, says no more than 6 business days one way in the continental US. If a shop agrees to take it, ship at least a week ahead.

### `bring_your_bike.rent.note` — hype, too long, too long
**Before:** One rental shop in Ojai, and it's a good one: The Mob Shop, downtown. Book ahead; it takes no walk-ins, and its rental pages say the performance bikes "may not be rented for mass start events or races" and can't be transported without the shop's permission. So it suits a ride from town, or the people who drove up to meet a Center Ride Out rider; ask the shop before you plan one for an organized ride. Ventura Bike Depot, about 12 miles south, rents road bikes and is open every day. The math: a bike case is a standard checked bag on Delta, American and Southwest, about $90 round trip on Delta or American paid online (Nov 2026). For a fit you depend on, or a visit that covers a Tuesday or Wednesday, bring yours.

**After:** One rental shop in Ojai: The Mob Shop, downtown. Book ahead; it takes no walk-ins. Its rental pages say the performance bikes "may not be rented for mass start events or races" and can't be transported without the shop's permission. So it suits a ride from town, or the people who drove up to meet a Center Ride Out rider. Ask the shop before you plan one for an organized ride. Ventura Bike Depot, about 12 miles south, rents road bikes and is open every day. The math: a bike case is a standard checked bag on Delta, American and Southwest, about $90 round trip on Delta or American paid online (Nov 2026). For a fit you depend on, or a visit that covers a Tuesday or Wednesday, bring yours.

### `bring_your_bike.get_around.note` — spoken, too long
**Before:** To get here with a bike case, yes. Ojai has no airport and no train. The nearest airline airport is Santa Barbara, about 34 miles west in a straight line; Burbank and Los Angeles International are about 54 and 59 southeast. Neither the Santa Barbara nor the Burbank ground-transport page names a shuttle to Ojai, and a bus rack takes a built bike, not a box. Rent a car at the airport, or book a large rideshare and expect the case to ride in the back. From Santa Barbara the Ojai Valley Inn's directions page gives two ways off the 101: Highway 33 from Ventura, 14 miles to town, or Route 150 over Casitas Pass, which it advises against in rain, at night or if you do not know the road (Nov 2026). Once you are in Ojai with a built bike you do not need the car: the town is 4.4 square miles, the one bike shop is downtown, and the bike path runs about 15 miles down the valley to Ventura (VCTC's bike booklet). Center Ride Out riders arrive on the bike; this is for the people driving up to meet them.

**After:** To get here with a bike case, yes. Ojai has no airport and no train. The nearest airline airport is Santa Barbara, about 34 miles west in a straight line; Burbank and Los Angeles International are about 54 and 59 southeast. Neither the Santa Barbara nor the Burbank ground-transport page names a shuttle to Ojai, and a bus rack takes a built bike, not a box. Rent a car at the airport, or book a large rideshare and expect the case to ride in the back. From Santa Barbara the Ojai Valley Inn's directions page gives two ways off the 101: Highway 33 from Ventura, 14 miles to town, or Route 150 over Casitas Pass, which it advises against in rain, at night or if you don't know the road (Nov 2026). Once you're in Ojai with a built bike you don't need the car. The town is 4.4 square miles, the one bike shop is downtown, and the bike path runs about 15 miles down the valley to Ventura (VCTC's bike booklet). Center Ride Out riders arrive on the bike; this is for the people driving up to meet them.

### `bring_your_bike.get_around.transit_bike_rules` — research note, spoken
**Before:** Gold Coast Transit Route 16 links downtown Ojai (stops at the Y, Blanche, Signal and the Park n' Ride, per the City) with the Ventura Transit Center at Pacific View Mall (per the Ojai transit audit, April 2026). Gold Coast's bike page, read Nov 2026: every fixed-route bus has a front rack for three bikes, first come, first served; the bike rides free; tell the driver before you load, and load from the curb side. E-bikes that do not fold go on the rack; batteries must be sealed lithium-ion; no gas-powered or homemade bikes. A folded bike can come aboard if it is secured and out of the aisle. The page gives no size or weight limit, and the district takes no responsibility for damage. The Ojai Trolley is the City's own bus: one route along Ojai Avenue and Maricopa Highway, out to Meiners Oaks and Mira Monte, about hourly, weekdays roughly 6:30 am to 7:30 pm and weekends roughly 7 am to 8 pm, every day but seven holidays (audit, April 2026; the City's page). $1.50 a ride or $4 a day, exact fare, free with a transfer from Gold Coast (effective Jan 1, 2026). Nothing the City publishes says whether the trolley carries bikes; ask at (805) 646-5581 ext. 207. The nearest train is the Pacific Surfliner in Ventura, about 12 miles south in a straight line: a full-size bike rides free with a reserved bike space, up to 50 lb and 4-inch tires, standard e-bikes included (Pacific Surfliner's bike page, Nov 2026).

**After:** Gold Coast Transit Route 16 links downtown Ojai (the City lists stops at the Y, Blanche, Signal and the Park n' Ride) with the Ventura Transit Center at Pacific View Mall (Ojai transit audit, April 2026). Gold Coast's bike page (Nov 2026): every fixed-route bus has a front rack for three bikes, first come, first served; the bike rides free; tell the driver before you load, and load from the curb side. E-bikes that don't fold go on the rack; batteries must be sealed lithium-ion; no gas-powered or homemade bikes. A folded bike can come aboard if it is secured and out of the aisle. The page gives no size or weight limit, and the district takes no responsibility for damage. The Ojai Trolley is the City's own bus: one route along Ojai Avenue and Maricopa Highway, out to Meiners Oaks and Mira Monte, about hourly, weekdays roughly 6:30 am to 7:30 pm and weekends roughly 7 am to 8 pm, every day but seven holidays (audit, April 2026; the City's page). $1.50 a ride or $4 a day, exact fare, free with a transfer from Gold Coast (effective Jan 1, 2026). Nothing the City publishes says whether the trolley carries bikes; ask at (805) 646-5581 ext. 207. The nearest train is the Pacific Surfliner in Ventura, about 12 miles south in a straight line: a full-size bike rides free with a reserved bike space, up to 50 lb and 4-inch tires, standard e-bikes included (Pacific Surfliner's bike page, Nov 2026).

### `bring_your_bike.rules_and_safety` — research note, spoken, too long
**Before:** California law (Nov 2026). Drivers must give three feet when passing a bike (Vehicle Code 21760); where a second lane runs the same way, the driver moves into it to pass if that is practicable; where three feet is not possible, the driver slows to a reasonable speed and passes only when it does not endanger the rider. The fine is $35, or $220 if a collision injures the rider (statute verified Nov 11, 2026). Helmets are required under 18 (21212). E-bikes come in three classes (312.5): class 1 pedal-assist to 20 mph, class 2 throttle to 20 mph, class 3 pedal-assist to 28 mph with a speedometer, rider 16 or older and helmeted. Ride as far right as practicable except when passing, turning left, avoiding a hazard or in a lane too narrow to share (21202). No earbuds in both ears (27400). At night, a white headlight and a red rear reflector or light (21201). Sidewalk riding is set city by city (21206); Ojai's own rule isn't confirmed, so walk the bike under the Arcade. CalBike's page (modified Aug 24, 2026) does not list a stop-as-yield law; a rider may go on the walk signal (21456). On the Ojai Valley Trail, class 1 and class 2 e-bikes are allowed; class 3 is not allowed on shared-use paths unless a local ordinance says so (VCTC's bike booklet, undated). The read: the valley floor and the trail are the quiet miles, and the state highways out of town are mountain roads. The Ojai Valley Inn's own directions page tells drivers to skip Route 150 over Casitas Pass in rain, at night or if they do not know it (Nov 2026). A rider was killed on Cuyama Road near Del Norte Road in Ojai on Aug 7, 2020, on what BikinginLA, citing the Ojai Valley News, called a narrow two-lane country road with no shoulders. On Highway 33 north of town, Caltrans is rebuilding three tunnels near Wheeler Gorge (post miles 18.2 to 19.0); it shut the road to everyone for 55 hours on Aug 28 to 31, 2026, and expects to finish in winter 2026/2027 (Caltrans release, Aug 12, 2026). Check Caltrans before you plan that climb.

**After:** California law (Nov 2026). Drivers must give three feet when passing a bike (Vehicle Code 21760); where a second lane runs the same way, the driver moves into it to pass if that is practicable; where three feet is not possible, the driver slows to a reasonable speed and passes only when it does not endanger the rider. The fine is $35, or $220 if a collision injures the rider (statute, Nov 11, 2026). Helmets are required under 18 (21212). E-bikes come in three classes (312.5): class 1 pedal-assist to 20 mph, class 2 throttle to 20 mph, class 3 pedal-assist to 28 mph with a speedometer, rider 16 or older and helmeted. Ride as far right as practicable except when passing, turning left, avoiding a hazard or in a lane too narrow to share (21202). No earbuds in both ears (27400). At night, a white headlight and a red rear reflector or light (21201). Sidewalk riding is set city by city (21206); we couldn't find Ojai's own rule, so walk the bike under the Arcade. CalBike's page (modified Aug 24, 2026) does not list a stop-as-yield law; a rider may go on the walk signal (21456). On the Ojai Valley Trail, class 1 and class 2 e-bikes are allowed; class 3 is not allowed on shared-use paths unless a local ordinance says so (VCTC's bike booklet, undated). The read: the valley floor and the trail are the quiet miles, and the state highways out of town are mountain roads. The Ojai Valley Inn's own directions page tells drivers to skip Route 150 over Casitas Pass in rain, at night or if they don't know it (Nov 2026). A rider was killed on Cuyama Road near Del Norte Road in Ojai on Aug 7, 2020, on what BikinginLA, citing the Ojai Valley News, called a narrow two-lane country road with no shoulders. On Highway 33 north of town, Caltrans is rebuilding three tunnels near Wheeler Gorge (post miles 18.2 to 19.0). It shut the road to everyone for 55 hours on Aug 28 to 31, 2026, and expects to finish in winter 2026/2027 (Caltrans release, Aug 12, 2026). Check Caltrans before you plan that climb.

### `faq[0].a` (Should I bring my bike to Ojai?) — spoken
**Before:** Yes, if you're driving or the fit matters. Delta, American and Southwest check a packed bike at the standard bag fee (Nov 2026), and Ojai's one rental shop, The Mob Shop, is book-ahead only and closed Tuesday and Wednesday. No shop in the Ojai Valley or Ventura says it receives a shipped bike, so fly with it or drive it. You'll want a car to get here: there is no airport or train.

**After:** Yes, if you're driving or the fit matters. Delta, American and Southwest check a packed bike at the standard bag fee (Nov 2026), and Ojai's one rental shop, The Mob Shop, is book-ahead only and closed Tuesday and Wednesday. No shop in the Ojai Valley or Ventura says it receives a shipped bike, so fly with it or drive it. You'll want a car to get here. There's no airport or train.

## For the verifier

Nothing below was changed. Each one read wrong, thin or likely to go stale.

1. **Four hotels have no rate.** Blue Iguana Inn, Ojai Rancho Inn, Casa Ojai Inn and Ojai Valley
   Inn said "No rate could be read (Nov 2026)". The page now says "Check the site for rates."
   `price_hint` is null on all four. Get a dated rate or leave it.
2. **Ojai Playhouse address** (145 E Ojai Ave) came from two cinema directories, not the
   theater's own page. The note that said so was a research note and is off the page; the
   address still needs a first-party check.
3. **`best_months`**: the dropped line said no source gives months for the road rides. The field
   now only speaks for the dirt. Fine if true; say so if a road-season source turns up.
4. **Airport miles are straight-line** (SBA 34, BUR 54, LAX 59) and `nearest_airport.miles` /
   `major_airport.miles` carry them bare. The prose says "in a straight line"; a card that
   shows only the number will read as a drive. LAX also reads odd next to the Inn's "101 for
   about 50 miles, then Highway 33 for 14 more".
5. **Difficulty grades.** Highway 33 (10.8 miles, 2,625 feet, three tunnels, no water, about
   4 miles from town each way) is "moderate", the same grade as the 781-foot Upper Ojai climb.
   Lake Casitas is "hard". Check 33 against the grading rule.
6. **Sulphur Mountain numbers.** "about 9 miles and 2,100 feet at a 5% average" from "about 400
   feet to 2,300": 2,100 feet over 9 miles is nearer 4.4%, and 400 to 2,300 is 1,900. Sources
   may differ; pick one set.
7. **Ojai Rim Loop: "Nordhoff Ridge at 6,700 feet."** Reads high for Nordhoff Ridge. Check it
   against the Bikepacking.com page (could be the route's high point, or the day-one gain of
   6,676 feet bleeding in).
8. **Trail length.** `summary` says "9 paved miles", `routes[0].miles` is 9, everything else
   says 9.3. Same trail; decide whether the summary should say 9.3.
9. **FAQ "Which Ojai hotels lend bikes" says four.** Casa Ojai's own lines conflict: "welcome
   to use our complimentary bicycles" and "Bicycles, Locks, and Helmets included with amenity
   fee". The FAQ handles it, but confirm which is current (the footer is dated 2022).
10. **Coffee Connection.** Sunday hours unconfirmed and weekday opening is "5 or 6 a.m.
    (sources differ)". A phone call settles both.
11. **Channel Islands Bicycle Club ride "April 2, 2026"** was a Thursday. Possible for a special
    ride; check the date. `routes[2]` just says April 2026.
12. **Easy Rider Plus "rode up the path to Meiners Oaks on Nov 15, 2026"** is the same day the
    file was verified. Confirm it is a ride that happened, not a calendar listing.
13. **Dated lines that go stale fast.** Ojai Valley Museum "normal hours resume Thursday,
    November 19"; Los Padres fire danger "Very High on Nov 15, 2026" (routes 3 and 5); Libbey
    Bowl "lists nothing for April 2027 yet"; Caltrans tunnel work "winter 2026/2027".
14. **"Aug 28 to 31, 2026"** (routes[3].hazards, rules_and_safety): house style is an en dash,
    Aug 28–31. Left as is because it is a date.
15. **United** has no bike rule in `airline_note` ("we don't have its rule"). SBA and LAX both
    list United. Worth one more read of its sports-equipment page.
16. **The Mob Shop "from $125"**: the page doesn't say per day or per what. Ask the shop.
17. **Ojai sidewalk rule** not found; the page says to walk the bike under the Arcade.
