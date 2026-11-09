import re, html

with open('/home/runner/work/cycle-for-change/cycle-for-change/research/rides/upkeep/dbc_rides_raw.html') as f:
    content = f.read()

# Decode HTML entities
decoded = html.unescape(content)

# Now search for ride text blocks - get ALL of them
text_blocks = re.findall(r'"text":\[0,"([^"]{20,3000})"\]', decoded)
print(f"Found {len(text_blocks)} text blocks\n")
for block in text_blocks[:60]:
    if any(kw in block for kw in ['Ride Name', 'When:', 'Where:', 'Wheels Down', 'Meet up', 'Moss', 'Femme', 'Shifty', 'Coffee', 'Shop Ride', 'Pull Through', 'pedale', 'monday moss', 'Monday Moss', 'Femme Pedale']):
        print("TEXT BLOCK:")
        print(block[:800])
        print("---")
