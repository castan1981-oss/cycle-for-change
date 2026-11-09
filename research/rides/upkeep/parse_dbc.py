import re, html, json

with open('/home/runner/work/cycle-for-change/cycle-for-change/research/rides/upkeep/dbc_rides_raw.html') as f:
    content = f.read()

# Strip tags
t = re.sub(r'(?s)<(script|style).*?</\1>', ' ', content)
t = html.unescape(re.sub(r'<[^>]+>', ' ', t))
t = re.sub(r'\s+', ' ', t)

print("TEXT LENGTH:", len(t))
print()

# Find relevant parts
keywords = ['Monday Moss', 'Femme Pedale', 'Shifty', 'Taco Tuesday', 'TITS', 'F(RIDE)day', 'Coffee Ride', 'First Friday', 'Shop Ride', 'Hangover', 'Pull Through']
for kw in keywords:
    idx = t.lower().find(kw.lower())
    if idx >= 0:
        print(f'=== {kw} at pos {idx} ===')
        print(t[max(0,idx-100):idx+300])
        print()
    else:
        print(f'=== {kw} NOT FOUND ===')
        print()

# Also look for JSON data embedded in the page
print("=== JSON/DATA search ===")
json_blocks = re.findall(r'(?:\"start\"|\"dtstart\"|\"datetime\"|\"date\"):\s*\"[^\"]{5,30}\"', content[:50000])
print("Date fields found:", json_blocks[:20])

# Look for Sanity CMS data
sanity = re.findall(r'__remixContext.*?(?=</script>)', content[:100000], re.DOTALL)
print("Remix context blocks:", len(sanity))
if sanity:
    print("First 500 chars:", sanity[0][:500])
