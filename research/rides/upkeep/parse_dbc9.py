import re, html

with open('/home/runner/work/cycle-for-change/cycle-for-change/research/rides/upkeep/dbc_rides_raw.html') as f:
    content = f.read()

decoded = html.unescape(content)

# Get 2000 chars around each key ride name occurrence
target_rides = [
    ('Femme Pedale', 'Women\'s Ride'),
    ('Monday Moss', 'MTB'),
    ('F(RIDE)day Coffee', 'Coffee'),
    ('Women\'s Monthly Shop Ride', 'Shop'),
]

for ride_name, _ in target_rides:
    idx = decoded.find('"title":[0,"' + ride_name)
    if idx < 0:
        idx = decoded.find(ride_name)

    if idx >= 0:
        ctx = decoded[max(0,idx-500):idx+2000]
        # Extract text values
        texts = re.findall(r'"text":\[0,"([^"]{5,500})"\]', ctx)
        dates = re.findall(r'"(?:startDate|rrule|date)":\[0,"([^"]{5,100})"\]', ctx)
        locations = re.findall(r'"location":\[0,"([^"]{3,100})"\]', ctx)

        print(f"=== {ride_name} ===")
        print("Texts:", [t.replace('\\n', ' | ') for t in texts[:5]])
        print("Dates/RRules:", dates[:5])
        print("Locations:", locations[:3])
        print()
