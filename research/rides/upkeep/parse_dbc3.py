import re, urllib.parse

with open('/home/runner/work/cycle-for-change/cycle-for-change/research/rides/upkeep/dbc_rides_raw.html') as f:
    content = f.read()

# Find the Sanity CMS data - it's URL-encoded in the page
# Look for the JSON data blocks
json_blocks = re.findall(r'\[1,\{[^\]]{200,2000}\}\]', content)
print(f"Found {len(json_blocks)} JSON blocks")
for i, block in enumerate(json_blocks[:5]):
    print(f"Block {i}: {block[:300]}")
    print()

# Try to find event-specific data
# Look for specific ride names in the raw HTML
raw_matches = re.findall(r'.{0,200}(?:Monday Moss|Femme Pedale|Shifty Freewheelers|Taco Tuesday|TITS Tuesday|Coffee Ride|First Friday|Shop Ride|Hangover Riders).{0,200}', content, re.DOTALL)
print(f"\nFound {len(raw_matches)} raw matches for ride names")
for m in raw_matches[:10]:
    # Decode URL entities
    cleaned = urllib.parse.unquote(m)
    print(cleaned[:300])
    print("---")
