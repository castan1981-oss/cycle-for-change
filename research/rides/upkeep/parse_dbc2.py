import re

with open('/home/runner/work/cycle-for-change/cycle-for-change/research/rides/upkeep/dbc_rides_raw.html') as f:
    content = f.read()

# Find all hrefs
links = re.findall(r'href="([^"]{5,150})"', content)
unique_links = sorted(set(links))
print('Links in page:')
for l in unique_links[:50]:
    print(' ', l)
print()

# Find API/fetch references
api_calls = re.findall(r'(?:api|fetch|ical|\.ics|gcal|calendar\.google|meetup\.com)[^\s"\'<>]{0,100}', content, re.IGNORECASE)
print('API/calendar references:')
for a in sorted(set(api_calls))[:20]:
    print(' ', a[:120])
print()

# Find all URLs in the page
urls = re.findall(r'https?://[^\s"\'<>]{5,100}', content)
print('URLs found:')
for u in sorted(set(urls))[:30]:
    print(' ', u[:120])
