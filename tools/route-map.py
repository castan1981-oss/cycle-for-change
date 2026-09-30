"""The 2027 route map (Pass 8, Sept 30 2026): the lower 48 as one stroke, Lake Michigan, the six
rides as dots with their dates, Phoenix as the ring, a dashed line from home to each ride.
Writes an inline SVG fragment to cfc-site/img/route-2027.svg (currentColor, so it takes the page's
ink). Coordinates are real (lon, lat), equirectangular, x scaled by cos 38°. Re-run when the six
rides change (they come from data/calendar-2027.json "riding": true)."""
import json, math, os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

OUTLINE = [(-122.75,49.0),(-124.7,48.4),(-123.9,46.2),(-124.5,42.8),(-124.4,40.4),(-122.5,37.8),(-121.9,36.6),(-120.5,34.4),
  (-118.4,33.9),(-117.1,32.7),(-114.6,32.7),(-111.0,31.3),(-106.5,31.8),(-103.2,29.0),(-100.9,29.4),(-99.5,27.5),(-97.4,25.9),
  (-97.4,27.8),(-94.8,29.3),(-90.1,29.9),(-88.0,30.4),(-87.2,30.4),(-85.0,29.7),(-82.6,27.9),(-81.8,26.1),(-80.2,25.8),
  (-80.6,28.4),(-81.4,30.3),(-81.1,32.1),(-79.9,32.8),(-75.5,35.2),(-76.0,36.9),(-75.1,38.3),(-74.9,38.9),(-74.0,40.7),
  (-71.9,41.1),(-70.0,41.7),(-71.0,42.4),(-70.3,43.7),(-67.0,44.9),(-67.8,46.1),(-69.2,47.4),(-71.5,45.0),(-73.3,45.0),
  (-76.3,44.0),(-79.0,43.3),(-78.9,42.9),(-83.0,42.3),(-82.4,43.0),(-82.9,44.1),(-84.7,45.8),(-84.3,46.5),(-89.0,48.0),
  (-92.1,46.8),(-97.2,49.0)]
LAKE_MI = [(-84.7,45.8),(-85.6,44.8),(-86.3,43.2),(-86.9,41.7),(-87.6,41.9),(-87.9,43.0),(-88.0,44.5),(-87.1,45.7)]
HOME = (-112.07, 33.45)
RIDES = [  # (lon, lat, label, second point for a line ride, label dx, dy, anchor)
  (-116.5, 33.8, '02.06 PALM SPRINGS', None, 2, 14, 'end'),        # Tour de Palm Springs
  (-118.2, 34.05, '04.23 LOS ANGELES', None, -8, -6, 'end'),          # Center Ride Out (LA)
  (-122.4, 37.8, '05.21 SAN FRANCISCO', None, -8, 3.5, 'end'),        # Cycle to Zero (SF)
  (-122.3, 47.6, '07.10 SEATTLE-PORTLAND', (-122.7, 45.5), 7, 3.5, 'start'),  # Seattle to Portland
  (-122.5, 37.86, '09.10 SAUSALITO', (-122.9, 38.5), -8, -8, 'end'),  # Recovery Ride, Sausalito → Guerneville
  (-110.9, 32.2, '11.20 TUCSON', None, 7, 6, 'start'),               # El Tour de Tucson
]
K = math.cos(math.radians(38)); S = 9.2; PAD_L = 118; PAD_T = 10
def P(lon, lat): return ((lon + 125.5) * K * S + PAD_L, (49.6 - lat) * S + PAD_T)
def path(pts, close=True):
    return 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in (P(*p) for p in pts)) + (' Z' if close else '')
W, H = P(-66.5, 24.2); W += 6
out = [f'<svg viewBox="0 0 {W:.0f} {H:.0f}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The lower 48 states with the six 2027 rides marked: Palm Springs, Los Angeles, San Francisco twice, Seattle to Portland, Tucson, and Phoenix as home.">']
out.append(f'<path d="{path(OUTLINE)}" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round" opacity=".5"/>')
out.append(f'<path d="{path(LAKE_MI)}" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round" opacity=".5"/>')
hx, hy = P(*HOME)
for lon, lat, label, second, dx, dy, anchor in RIDES:
    x, y = P(lon, lat)
    out.append(f'<path d="M{hx:.1f},{hy:.1f} L{x:.1f},{y:.1f}" fill="none" stroke="currentColor" stroke-width=".9" stroke-dasharray="2 3" opacity=".55"/>')
for lon, lat, label, second, dx, dy, anchor in RIDES:
    x, y = P(lon, lat)
    if second:
        x2, y2 = P(*second)
        out.append(f'<path d="M{x:.1f},{y:.1f} L{x2:.1f},{y2:.1f}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>')
    out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="3.2" fill="currentColor"/>')
    out.append(f'<text x="{x + dx:.1f}" y="{y + dy:.1f}" text-anchor="{anchor}" font-family="Space Mono, ui-monospace, monospace" font-size="8" letter-spacing=".08em" fill="currentColor">{label}</text>')
out.append(f'<circle cx="{hx:.1f}" cy="{hy:.1f}" r="5.5" fill="none" stroke="currentColor" stroke-width="2"/>')
out.append(f'<text x="{hx + 9:.1f}" y="{hy + 3.5:.1f}" font-family="Space Mono, ui-monospace, monospace" font-size="8" letter-spacing=".08em" fill="currentColor">PHOENIX · HOME</text>')
out.append('</svg>')
svg = '\n'.join(out)
dst = os.path.join(ROOT, 'cfc-site', 'img', 'route-2027.svg')
open(dst, 'w').write(svg); print(dst, len(svg), 'bytes', f'{W:.0f}x{H:.0f}')
