import re, html

with open('/home/runner/work/cycle-for-change/cycle-for-change/research/rides/upkeep/dbc_rides_raw.html') as f:
    content = f.read()

# Decode HTML entities
decoded = html.unescape(content)

# Get ALL text blocks with enough content
text_blocks = re.findall(r'"text":\[0,"([^"]{5,3000})"\]', decoded)
print(f"Total text blocks: {len(text_blocks)}")
print()

# Print ALL blocks that contain ride-related info we care about
target_rides = ['Femme Pedale', 'Monday Moss', 'Shifty', 'Coffee Ride', 'Shop Ride', 'F(RIDE)', 'friday coffee', 'friday ride', 'Thursday', '7:00pm', '6:30pm', '7:15am']
for i, block in enumerate(text_blocks):
    lower_block = block.lower()
    if any(kw.lower() in lower_block for kw in target_rides):
        print(f"Block {i}:")
        print(block.replace('\\n', '\n')[:600])
        print("---")
