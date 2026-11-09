import re, html, json

with open('/home/runner/work/cycle-for-change/cycle-for-change/research/rides/upkeep/dbc_rides_raw.html') as f:
    content = f.read()

decoded = html.unescape(content)

# Find the main data array for rides - it starts after a specific pattern
# Look for each ride's full data block by its title
rides_to_check = [
    'Monday Moss',
    "Women's Monthly Shop Ride",
    'Femme Pedale Women\'s Ride',
    'F(RIDE)day Coffee Ride',
    'Shifty Freewheelers\' Monday Night Ride',
]

for ride in rides_to_check:
    # Find the title entry
    title_pattern = f'"title":[0,"{ride}"'
    idx = decoded.find(title_pattern)
    if idx < 0:
        print(f"NOT FOUND: {ride}")
        continue

    # Get 3000 chars BEFORE the title (this is where the event data should be)
    ctx = decoded[max(0,idx-3000):idx+500]

    # Find rrule and startDate
    rrules = re.findall(r'"rrule":\[0,"([^"]+)"\]', ctx)
    start_dates = re.findall(r'"startDate":\[0,"([^"]+)"\]', ctx)
    all_texts = re.findall(r'"text":\[0,"([^"]{3,300})"\]', ctx)
    locations = re.findall(r'"location":\[0,"([^"]{3,100})"\]', ctx)

    print(f"=== {ride} ===")
    print(f"rrule: {rrules[-3:] if rrules else 'None'}")
    print(f"startDate: {start_dates[-3:] if start_dates else 'None'}")
    print(f"texts: {[t.replace(chr(10), '|') for t in all_texts[-3:]]}")
    print(f"locations: {locations[-3:]}")
    print()
