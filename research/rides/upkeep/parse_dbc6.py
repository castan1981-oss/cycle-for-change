import re, html

with open('/home/runner/work/cycle-for-change/cycle-for-change/research/rides/upkeep/dbc_rides_raw.html') as f:
    content = f.read()

# Decode HTML entities
decoded = html.unescape(content)

# Get ALL text blocks with "Ride Name:" or similar
text_blocks = re.findall(r'"text":\[0,"([^"]{5,3000})"\]', decoded)
print(f"Total text blocks: {len(text_blocks)}")
print()

# Print ALL blocks that have ride-related content
for i, block in enumerate(text_blocks):
    if 'Ride Name:' in block or 'Wheels Down:' in block or 'When: Every' in block or 'When: First' in block:
        print(f"Block {i}:")
        print(block.replace('\\n', '\n'))
        print("---")

# Also look for titles
titles = re.findall(r'"title":\[0,"([^"]{5,100})"\]', decoded)
print("\nRide titles found:")
for t in titles[:30]:
    print(' ', t)
