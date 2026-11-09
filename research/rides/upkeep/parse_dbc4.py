import re, html

with open('/home/runner/work/cycle-for-change/cycle-for-change/research/rides/upkeep/dbc_rides_raw.html') as f:
    content = f.read()

# Decode HTML entities
decoded = html.unescape(content)

# Now search for ride text blocks
text_blocks = re.findall(r'"text":\[0,"([^"]{20,2000})"\]', decoded)
print(f"Found {len(text_blocks)} text blocks")
for block in text_blocks[:40]:
    if any(kw in block for kw in ['Moss', 'Femme', 'Shifty', 'Taco', 'TITS', 'Coffee', 'First Friday', 'Shop Ride', 'Hangover', 'Pull Through', 'pedale', 'monday moss']):
        print("RIDE TEXT BLOCK:")
        print(block[:600])
        print("---")
