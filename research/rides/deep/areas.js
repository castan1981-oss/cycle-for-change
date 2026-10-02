#!/usr/bin/env node
/*
  areas.js — the deep sweep's areas (Oct 1, 2026). Every ride on the site belongs to exactly one.
    node research/rides/deep/areas.js            writes research/rides/deep/<area>/_existing.tsv
    node research/rides/deep/areas.js --check    just counts
  Arizona was swept on Sept 30 (research/rides/az/); it is its own area here for completeness.
*/
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..", "..", "..");
const rides = JSON.parse(fs.readFileSync(path.join(ROOT, "cfc-site", "rides", "rides.json"), "utf8"));
const mi = (a, b) => { const R = 3958.8, t = Math.PI / 180, dl = (b[0] - a[0]) * t, dn = (b[1] - a[1]) * t;
  const s = Math.sin(dl / 2) ** 2 + Math.cos(a[0] * t) * Math.cos(b[0] * t) * Math.sin(dn / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(s)); };
const US = (r, ...st) => r.country === "US" && st.includes(r.state);
const at = (r) => [r.lat, r.lng];
const LA = (r) => US(r, "CA") && r.lat > 33.7 && r.lat < 34.9 && r.lng < -117.6 && r.lng > -119.6 && !(r.lng > -118.1 && r.lat < 33.95);
const BAY = (r) => US(r, "CA") && r.lat > 36.9 && r.lat < 38.4 && r.lng > -123.1 && r.lng < -121.5;
const NYC = (r) => (US(r, "NY") && r.lat < 41.3 && r.lng > -74.3) || (US(r, "NJ") && r.lat > 40.5);
const CHI = (r) => (US(r, "IL") && mi(at(r), [41.88, -87.63]) <= 60) || (US(r, "IN") && mi(at(r), [41.88, -87.63]) <= 40);
const DFW = (r) => US(r, "TX") && mi(at(r), [32.78, -96.80]) <= 60;
const HOU = (r) => US(r, "TX") && (mi(at(r), [29.76, -95.37]) <= 70 || mi(at(r), [30.63, -96.33]) <= 25);
const ATX = (r) => US(r, "TX") && !DFW(r) && !HOU(r) && r.lng > -99.9 && r.lat < 31.9;
const AREAS = [
  { id: "az", wave: 0, label: "Arizona (swept Sept 30)", test: (r) => US(r, "AZ") },
  { id: "ca-la", wave: 1, label: "Los Angeles and Ventura counties", target: 30, test: LA,
    cities: "Los Angeles (Griffith Park, Silver Lake, Downtown, the Westside), Santa Monica, Venice, Culver City, the South Bay (Manhattan, Hermosa and Redondo Beach, Torrance, Palos Verdes), Long Beach, Pasadena, Altadena, Glendale, Burbank, the San Fernando Valley, Malibu, Santa Clarita, Thousand Oaks, Ventura, Ojai, Oxnard" },
  { id: "ca-bay", wave: 1, label: "San Francisco Bay Area and Santa Cruz", target: 30, test: BAY,
    cities: "San Francisco, Marin (Mill Valley, Fairfax, San Rafael), the East Bay (Oakland, Berkeley, Walnut Creek, Danville), the Peninsula (Palo Alto, Redwood City, San Mateo), the South Bay (San Jose, Los Gatos, Cupertino), Santa Cruz" },
  { id: "nyc", wave: 1, label: "New York City, Long Island, Westchester and North Jersey", target: 30, test: NYC,
    cities: "Manhattan, Brooklyn, Queens, the Bronx, Staten Island, Long Island, Westchester, Jersey City, Hoboken, Montclair, Morristown and North Jersey" },
  { id: "chicago", wave: 1, label: "Chicago and its suburbs", target: 25, test: CHI,
    cities: "Chicago, Evanston, Oak Park, the North Shore, the western and southwest suburbs (Naperville, Wheaton, Tinley Park), Northwest Indiana" },
  { id: "tx-dfw", wave: 2, label: "Dallas–Fort Worth", target: 25, test: DFW,
    cities: "Dallas, Fort Worth, Plano, Frisco, McKinney, Richardson, Denton, Arlington, Irving, Grapevine, Southlake, Cedar Hill, Carrollton" },
  { id: "tx-austin-sa", wave: 2, label: "Austin, San Antonio, Waco and South Texas", target: 25, test: ATX,
    cities: "Austin, Round Rock, Georgetown, Dripping Springs, San Marcos, New Braunfels, San Antonio, Boerne, Waco, Corpus Christi, the Rio Grande Valley (McAllen)" },
  { id: "tx-houston", wave: 2, label: "Houston, Galveston and Bryan–College Station", target: 20, test: HOU,
    cities: "Houston, The Woodlands, Katy, Sugar Land, Pearland, Clear Lake, Galveston, Tomball, Bryan, College Station" },
  { id: "co", wave: 2, label: "Colorado", target: 25, test: (r) => US(r, "CO"),
    cities: "Denver, Golden, Lakewood, Littleton, Aurora, Boulder, Longmont, Louisville, Fort Collins, Loveland, Colorado Springs, Durango, Grand Junction, Steamboat Springs, Crested Butte, Salida, Vail" },
  { id: "wa", wave: 2, label: "Washington", target: 20, test: (r) => US(r, "WA"),
    cities: "Seattle, Bellevue, Redmond, Issaquah, Everett, Tacoma, Olympia, Bellingham, Spokane, Wenatchee, Walla Walla" },
  { id: "or-id", wave: 3, label: "Oregon and Idaho", target: 20, test: (r) => US(r, "OR", "ID"),
    cities: "Portland, Beaverton, Hillsboro, Tualatin, Salem, Corvallis, Eugene, Bend, Hood River, Ashland, Medford, Boise, Coeur d'Alene, Sun Valley/Ketchum" },
  { id: "ca-south", wave: 3, label: "San Diego, Orange County, the Inland Empire and the desert", target: 25,
    test: (r) => US(r, "CA") && !LA(r) && !BAY(r) && r.lat < 34.3,
    cities: "San Diego, Encinitas, Carlsbad, Oceanside, Escondido, Irvine, Costa Mesa, Huntington Beach, Newport Beach, Laguna, Anaheim, Riverside, Redlands, Temecula, Palm Springs" },
  { id: "ca-north-central", wave: 3, label: "Sacramento, the Central Coast, the Central Valley and Northern California", target: 20,
    test: (r) => US(r, "CA") && !LA(r) && !BAY(r) && r.lat >= 34.3,
    cities: "Sacramento, Davis, Folsom, Granite Bay, Auburn, Chico, Redding, Fresno, Bakersfield, Santa Barbara, San Luis Obispo, Monterey, Santa Rosa, Napa, Sonoma, Truckee, Tahoe" },
  { id: "new-england", wave: 3, label: "New England", target: 25, test: (r) => US(r, "MA", "RI", "NH", "VT", "ME", "CT"),
    cities: "Boston, Cambridge, Somerville, the North Shore and MetroWest, Worcester, Northampton, Cape Cod, Providence, Hartford, New Haven, Burlington, Portland ME, Portsmouth NH" },
  { id: "dc-md-va", wave: 4, label: "Washington DC, Maryland, Virginia, Delaware and West Virginia", target: 25, test: (r) => US(r, "DC", "MD", "VA", "DE", "WV"),
    cities: "Washington DC, Arlington, Alexandria, Reston, Bethesda, Silver Spring, Baltimore, Annapolis, Frederick, Richmond, Charlottesville, Harrisonburg, Roanoke, Norfolk, Virginia Beach, Wilmington DE, Morgantown" },
  { id: "pa-nj", wave: 4, label: "Pennsylvania and South and Central Jersey", target: 20, test: (r) => US(r, "PA") || (US(r, "NJ") && !NYC(r)),
    cities: "Philadelphia, the Main Line, Bucks County, Princeton and Hopewell, Red Bank, the Jersey Shore, Lancaster, Harrisburg, State College, Bethlehem and Allentown, Pittsburgh, Erie" },
  { id: "ga-sc", wave: 4, label: "Georgia and South Carolina", target: 20, test: (r) => US(r, "GA", "SC"),
    cities: "Atlanta, Decatur, Roswell, Alpharetta, Athens, Augusta, Savannah, Columbus, Greenville, Charleston, Columbia, Rock Hill" },
  { id: "nc-tn", wave: 4, label: "North Carolina and Tennessee", target: 25, test: (r) => US(r, "NC", "TN"),
    cities: "Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, Winston-Salem, Asheville, Brevard, Boone, Wilmington, Nashville, Franklin, Murfreesboro, Chattanooga, Knoxville, Memphis" },
  { id: "florida", wave: 5, label: "Florida", target: 25, test: (r) => US(r, "FL"),
    cities: "Miami, Key Biscayne, Fort Lauderdale, Boca Raton, West Palm Beach, Naples, Fort Myers, Sarasota, Tampa, St. Petersburg, Orlando, Clermont, Gainesville, Jacksonville, Tallahassee, Pensacola" },
  { id: "upper-midwest", wave: 5, label: "Minnesota, Wisconsin and Iowa", target: 20, test: (r) => US(r, "MN", "WI", "IA"),
    cities: "Minneapolis, St. Paul, Duluth, Rochester MN, Milwaukee, Madison, Green Bay, La Crosse, Des Moines, Iowa City, Cedar Rapids" },
  { id: "great-lakes", wave: 5, label: "Michigan, Ohio, Indiana, Kentucky and downstate Illinois", target: 25,
    test: (r) => US(r, "MI", "OH", "KY") || (US(r, "IN") && !CHI(r)) || (US(r, "IL") && !CHI(r)),
    cities: "Detroit, Ann Arbor, Grand Rapids, Traverse City, Columbus, Cincinnati, Cleveland, Dayton, Indianapolis, Bloomington, Louisville, Lexington, Champaign, Springfield, Peoria" },
  { id: "plains", wave: 5, label: "Missouri, Kansas, Oklahoma, Nebraska, Arkansas and West and East Texas", target: 20,
    test: (r) => US(r, "MO", "KS", "OK", "NE", "AR") || (US(r, "TX") && !DFW(r) && !HOU(r) && !ATX(r)),
    cities: "Kansas City, St. Louis, Columbia MO, Springfield MO, Wichita, Lawrence, Tulsa, Oklahoma City, Omaha, Lincoln, Bentonville, Fayetteville, Little Rock, El Paso, Lubbock, Midland, Tyler" },
  { id: "mountain-west", wave: 6, label: "Utah, Nevada, New Mexico, Montana and Wyoming", target: 20, test: (r) => US(r, "UT", "NV", "NM", "MT", "WY"),
    cities: "Salt Lake City, Park City, Ogden, Provo, St. George, Las Vegas, Henderson, Reno, Albuquerque, Santa Fe, Missoula, Bozeman, Billings, Jackson, Cheyenne, Laramie" },
  { id: "dakotas-ak-hi", wave: 6, label: "The Dakotas, Alaska and Hawaii", target: 12, test: (r) => US(r, "ND", "SD", "AK", "HI"),
    cities: "Sioux Falls, Rapid City, Fargo, Bismarck, Anchorage, Fairbanks, Honolulu, Kailua, Maui, the Big Island" },
  { id: "gulf-south", wave: 6, label: "Louisiana, Mississippi and Alabama", target: 15, test: (r) => US(r, "LA", "MS", "AL"),
    cities: "New Orleans, Baton Rouge, Lafayette, Shreveport, Jackson, Oxford, Tupelo, Hattiesburg, Birmingham, Huntsville, Auburn, Tuscaloosa, Mobile, Fairhope" },
  { id: "ny-upstate", wave: 6, label: "Upstate New York and the Hudson Valley", target: 15, test: (r) => US(r, "NY") && !NYC(r),
    cities: "Buffalo, Rochester, Syracuse, Ithaca, Albany, Saratoga Springs, Beacon, New Paltz, Kingston, Lake Placid" },
  { id: "uk", wave: 7, label: "London and the United Kingdom", target: 25, test: (r) => r.country === "GB",
    cities: "London, Manchester, Bristol, Bath, Birmingham, Leeds, Sheffield, Edinburgh, Glasgow, Cardiff, Brighton, Oxford, Cambridge" },
  { id: "canada", wave: 7, label: "Canada", target: 25, test: (r) => r.country === "CA",
    cities: "Toronto, Ottawa, Montreal, Quebec City, Vancouver, Victoria, Calgary, Edmonton, Winnipeg, Halifax" },
  { id: "mexico", wave: 7, label: "Mexico", target: 20, test: (r) => r.country === "MX",
    cities: "Mexico City, Guadalajara, Monterrey, Puebla, Querétaro, Mérida, Oaxaca, Tijuana" },
  { id: "world-rest", wave: 7, label: "Japan, the UAE, Panama, Rwanda and South Africa", target: 20, test: (r) => ["JP", "AE", "PA", "RW", "ZA"].includes(r.country),
    cities: "Tokyo, Osaka, Kyoto, Dubai, Abu Dhabi, Panama City, Kigali, Cape Town, Johannesburg" },
];
module.exports = { AREAS };
if (require.main === module) {
  const check = process.argv.includes("--check");
  const owner = new Map();
  for (const r of rides) {
    const hits = AREAS.filter((a) => a.test(r));
    if (hits.length !== 1) console.error(`${r.slug}: ${hits.length} areas (${hits.map((a) => a.id).join(", ")})`);
    else owner.set(r.slug, hits[0].id);
  }
  for (const a of AREAS) {
    const mine = rides.filter((r) => owner.get(r.slug) === a.id).sort((x, y) => String(x.verified_on).localeCompare(String(y.verified_on)));
    console.log(`${a.id.padEnd(18)} wave ${a.wave}  ${String(mine.length).padStart(3)} rides  ${a.label}`);
    if (check || a.id === "az") continue;
    const dir = path.join(__dirname, a.id); fs.mkdirSync(dir, { recursive: true });
    const rows = [["slug", "name", "city", "days", "time", "host", "watch_url", "verified_on"].join("\t"),
      ...mine.map((r) => [r.slug, r.name, r.city, (r.days || []).join(","), r.start_hhmm || "", (r.host && r.host.name) || "",
        (r.refresh && r.refresh.watch_url) || (r.sources || [])[0] || "", r.verified_on || ""].map((v) => String(v).replace(/\t/g, " ")).join("\t"))];
    fs.writeFileSync(path.join(dir, "_existing.tsv"), rows.join("\n") + "\n");
  }
}
