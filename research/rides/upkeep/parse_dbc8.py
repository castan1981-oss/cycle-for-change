import re, html

with open('/home/runner/work/cycle-for-change/cycle-for-change/research/rides/upkeep/dbc_rides_raw.html') as f:
    content = f.read()

# Decode HTML entities
decoded = html.unescape(content)

# For each ride, search near its title for details
ride_names = [
    'Femme Pedale',
    'Monday Moss',
    'Shifty Freewheelers',
    'F(RIDE)day Coffee Ride',
    "Women's Monthly Shop Ride",
]

for ride in ride_names:
    idx = decoded.find(ride)
    while idx >= 0:
        # Get context around this mention
        ctx = decoded[max(0, idx-200):idx+800]
        # Strip HTML
        ctx = re.sub(r'<[^>]+>', ' ', ctx)
        ctx = re.sub(r'\s+', ' ', ctx)
        print(f"=== {ride} at pos {idx} ===")
        print(ctx[:600])
        print()
        idx = decoded.find(ride, idx+1)
        if idx > 150000:  # Only look in first 150KB
            break
