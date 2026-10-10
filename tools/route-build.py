#!/usr/bin/env python3
"""route-build.py — turn a ride's route file into what its ride page shows (Oct 9, 2026).

    python3 tools/route-build.py <slug>        # one ride
    python3 tools/route-build.py --all         # every ride in data/ride-routes.json

Reads the ride's entry in data/ride-routes.json and its GPX (data/routes/<slug>/<file>.gpx, the file
the host sent, or Robert's own ride file with the host's OK). Writes, into cfc-site/rides/routes/<slug>/:
  route-<posted>.json   the line in map pixels, the climb chart, distance, climbing, turns, markers
  map-<posted>.jpg      a quiet street map under the line (OpenStreetMap tiles, credited on the page)
  <slug>-<posted>.gpx   the file riders download, as the host sent it
tools/build-rides.js reads route-<posted>.json; the deploy never fetches anything.

Needs Pillow and the network (OpenStreetMap tiles; opentopodata.org for heights when the GPX has none).
Light use only: one ride's tiles at a time, with a real User-Agent, per the OSM tile policy.
Routes only from the people who run the ride. Never from Strava's API (CLAUDE.md §8, §10).
"""
import io, json, math, os, sys, time, shutil, urllib.request
import xml.etree.ElementTree as ET
from PIL import Image, ImageOps

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
DATA = os.path.join(ROOT, 'data', 'ride-routes.json')
OUT = os.path.join(ROOT, 'cfc-site', 'rides', 'routes')
UA = 'cycleforchange.org route map (one ride at a time)'
MAP_W = 1300          # the map image's width; the page scales it
FT = 3.28084
MI = 1609.344


def hav(a, b):
    R = 6371000.0
    la1, la2 = math.radians(a[1]), math.radians(b[1])
    dl, dg = la2 - la1, math.radians(b[0] - a[0])
    h = math.sin(dl / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin(dg / 2) ** 2
    return 2 * R * math.asin(math.sqrt(h))


def read_gpx(p):
    """[(lon, lat, ele|None)] from trkpt, else rtept, else wpt."""
    root = ET.parse(p).getroot()
    pts = []
    for tag in ('trkpt', 'rtept'):
        for el in root.iter():
            if el.tag.split('}')[-1] != tag:
                continue
            ele = None
            for c in el:
                if c.tag.split('}')[-1] == 'ele' and c.text:
                    try: ele = float(c.text)
                    except ValueError: pass
            pts.append((float(el.get('lon')), float(el.get('lat')), ele))
        if pts:
            break
    if len(pts) < 2:
        raise SystemExit(f'{p}: no track or route points')
    return pts


def resample(pts, step=160.0):
    cum = [0.0]
    for a, b in zip(pts, pts[1:]):
        cum.append(cum[-1] + hav(a, b))
    total, out, j, d = cum[-1], [], 0, 0.0
    while d <= total:
        while cum[j + 1] < d:
            j += 1
        t = (d - cum[j]) / max(1e-9, cum[j + 1] - cum[j])
        a, b = pts[j], pts[j + 1]
        e = a[2] + (b[2] - a[2]) * t if a[2] is not None and b[2] is not None else None
        out.append([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, d, e])
        d += step
    last = pts[-1]
    out.append([last[0], last[1], total, last[2]])
    return out, total


def heights(samples):
    if all(s[3] is not None for s in samples):
        return
    for k in range(0, len(samples), 100):
        chunk = samples[k:k + 100]
        q = '|'.join(f'{s[1]:.6f},{s[0]:.6f}' for s in chunk)
        req = urllib.request.Request('https://api.opentopodata.org/v1/srtm30m?locations=' + q, headers={'User-Agent': UA})
        res = json.load(urllib.request.urlopen(req, timeout=40))['results']
        for s, r in zip(chunk, res):
            s[3] = r['elevation']
        time.sleep(1.1)


def smooth(vals, n=2):
    return [sum(vals[max(0, i - n):i + n + 1]) / len(vals[max(0, i - n):i + n + 1]) for i in range(len(vals))]


def merc(lon, lat, z):
    n = 2 ** z * 256
    s = math.sin(math.radians(lat))
    return (lon + 180) / 360 * n, (0.5 - math.log((1 + s) / (1 - s)) / (4 * math.pi)) * n


def basemap(lons, lats):
    """Pick the deepest zoom where the route fits ~1300 px wide, stitch OSM tiles, tint them quiet."""
    pad_lon = (max(lons) - min(lons)) * 0.08 + 0.004
    pad_lat = (max(lats) - min(lats)) * 0.06 + 0.004
    for z in range(16, 9, -1):
        x0, y0 = merc(min(lons) - pad_lon, max(lats) + pad_lat, z)
        x1, y1 = merc(max(lons) + pad_lon, min(lats) - pad_lat, z)
        if x1 - x0 <= 2200 and y1 - y0 <= 3000:
            break
    tx0, ty0, tx1, ty1 = int(x0 // 256), int(y0 // 256), int(x1 // 256), int(y1 // 256)
    big = Image.new('RGB', ((tx1 - tx0 + 1) * 256, (ty1 - ty0 + 1) * 256))
    for tx in range(tx0, tx1 + 1):
        for ty in range(ty0, ty1 + 1):
            req = urllib.request.Request(f'https://tile.openstreetmap.org/{z}/{tx}/{ty}.png', headers={'User-Agent': UA})
            big.paste(Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=30).read())).convert('RGB'), ((tx - tx0) * 256, (ty - ty0) * 256))
            time.sleep(0.05)
    im = big.crop((int(x0 - tx0 * 256), int(y0 - ty0 * 256), int(x1 - tx0 * 256), int(y1 - ty0 * 256)))
    g = ImageOps.autocontrast(ImageOps.grayscale(im), cutoff=1)
    # After Hours: concrete paper, patina streets — quiet enough for the rose line to read
    im = ImageOps.colorize(g, black='#9AA6A3', mid='#D9D7D2', white='#F3F1EE', midpoint=150)
    k = MAP_W / im.size[0]
    im = im.resize((MAP_W, round(im.size[1] * k)), Image.LANCZOS)
    return im, (lambda lon, lat: (round((merc(lon, lat, z)[0] - x0) * k, 1), round((merc(lon, lat, z)[1] - y0) * k, 1))), z


def rdp(pts, eps):
    if len(pts) < 3:
        return pts
    a, b = pts[0], pts[-1]
    dx, dy = b[0] - a[0], b[1] - a[1]
    L = math.hypot(dx, dy)
    if L < 1e-9:   # a loop: split it
        h = len(pts) // 2
        return rdp(pts[:h + 1], eps)[:-1] + rdp(pts[h:], eps)
    dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        d = abs(dy * pts[i][0] - dx * pts[i][1] + b[0] * a[1] - b[1] * a[0]) / L
        if d > dmax:
            dmax, idx = d, i
    if dmax > eps:
        return rdp(pts[:idx + 1], eps)[:-1] + rdp(pts[idx:], eps)
    return [a, b]


def build(slug, entry):
    gpx = os.path.join(ROOT, entry['gpx'])
    posted = entry['posted']
    pts = read_gpx(gpx)
    samples, total = resample(pts)
    heights(samples)
    ele = smooth([s[3] for s in samples])
    gain = sum(max(0, b - a) for a, b in zip(ele, ele[1:]))
    im, P, z = basemap([p[0] for p in pts], [p[1] for p in pts])

    line = [P(p[0], p[1]) for p in pts]
    line = rdp(line, 0.8)
    prof = [[round(s[2] / MI, 3), round(e * FT)] + list(P(s[0], s[1])) for s, e in zip(samples, ele)]

    def at_mile(m):
        best = min(prof, key=lambda p: abs(p[0] - m))
        return best[2], best[3]

    cues = []
    for c in entry.get('cues') or []:
        if 'mi' not in c:
            continue
        x, y = at_mile(c['mi'])
        cues.append({'mi': round(c['mi'], 1), 't': c['t'], 's': c.get('s', ''), 'k': c.get('k', 'turn'), 'x': x, 'y': y})
    marks = []
    step = 10 if total / MI >= 25 else 5
    for m in range(step, int(total / MI) + 1, step):
        x, y = at_mile(m)
        marks.append({'mi': m, 'x': x, 'y': y})

    d = os.path.join(OUT, slug)
    os.makedirs(d, exist_ok=True)
    for f in os.listdir(d):            # one route per ride: the newest replaces the last
        os.remove(os.path.join(d, f))
    im.save(os.path.join(d, f'map-{posted}.jpg'), 'JPEG', quality=74, optimize=True, progressive=True)
    shutil.copyfile(gpx, os.path.join(d, f'{slug}-{posted}.gpx'))
    out = {
        'slug': slug, 'posted': posted, 'zoom': z,
        'W': im.size[0], 'H': im.size[1], 'map': f'/rides/routes/{slug}/map-{posted}.jpg',
        'gpx': f'/rides/routes/{slug}/{slug}-{posted}.gpx',
        'mi': round(total / MI, 1), 'gain_ft': round(gain * FT), 'low_ft': round(min(ele) * FT), 'high_ft': round(max(ele) * FT),
        'start': {'x': line[0][0], 'y': line[0][1], 'lat': round(pts[0][1], 6), 'lng': round(pts[0][0], 6)},
        'end': {'x': line[-1][0], 'y': line[-1][1]},
        'loop': hav(pts[0], pts[-1]) < 400,
        'path': [[round(x, 1), round(y, 1)] for x, y in line],
        'prof': prof, 'cues': cues, 'marks': marks,
    }
    with open(os.path.join(d, f'route-{posted}.json'), 'w') as f:
        json.dump(out, f, separators=(',', ':'))
    print(f'{slug}: {out["mi"]} mi, {out["gain_ft"]:,} ft, zoom {z}, {len(out["path"])} line points, {len(cues)} turns')


def main():
    routes = json.load(open(DATA))
    args = sys.argv[1:]
    slugs = [k for k in routes if not k.startswith('_')] if args == ['--all'] else args
    if not slugs:
        raise SystemExit(__doc__)
    for s in slugs:
        if s not in routes:
            raise SystemExit(f'{s}: not in data/ride-routes.json')
        build(s, routes[s])


if __name__ == '__main__':
    main()
