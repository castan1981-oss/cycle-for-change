"""The house photo grade (Pass 6, Sept 29 2026): high-key. Lifted blacks, half a stop over,
warm, and a light bone-forward duotone (22%) so phone photos read as one campaign.
The desert at 10 a.m., not 8 p.m. Originals live in cfc-site/photos/; the site loads cfc-site/img/.

  python3 tools/grade.py --all                       # regrade the manifest below (photos/ -> img/)
  python3 tools/grade.py --all --only phx-canal,stanley-dock   # just these outputs
  python3 tools/grade.py IN OUT [--strength 0.22] [--lift 0.13] [--stop 0.5] [--max 1200] [--crop 4:5]

Needs Pillow + numpy. Add a photo: drop the original in cfc-site/photos/, add a line to MANIFEST.
"""
import sys, os, argparse
import numpy as np
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'cfc-site')
BONE = np.array([0xE8, 0xDF, 0xD0]) / 255.0       # highlight end of the duotone
SHADOW = np.array([0x3A, 0x3E, 0x36]) / 255.0     # warm asphalt, a step above tar, so blacks never go dead

# output, source, options. Robert's picks (Sept 29): crew = hero, portrait = the Pledge door, mural = the close.
# card-south / card-pv have no color original; photos/*-duo.jpg are the old duotone files, re-lifted.
def _long(k):   # Pass 25: portraits run at most ~460px wide on desktop, so 1440 tall is plenty; landscapes get 1600
    try:
        w, h = Image.open(os.path.join(ROOT, 'photos', f'{k}.jpg')).size
        return 1440 if h > w else 1600
    except OSError:
        return 1600
PASS25_LOOK = {'': {}, 'sun': dict(stop=0.3, lift=0.11), 'dusk': dict(strength=0.10, stop=0.15, lift=0.06, warm=0.04)}
MANIFEST = [
    # Pass 11 (Sept 30): crew-2x.jpg is crew.jpg super-resolved 2x (EDSR, after a light denoise) so the
    # hero is crisp at 2x screens; a gentler stop so the sunset holds. Re-run tools/sr.py if crew.jpg changes.
    ('img/hero.jpg',         'photos/crew-2x.jpg',     dict(max=1600, stop=0.3, lift=0.11, q=80)),
    ('img/hero-wide.jpg',    'photos/crew-2x.jpg',     dict(max=2000, stop=0.3, lift=0.11, crop='7:5', focus=(0.5, 0.46), q=80)),
    ('img/people.jpg',       'photos/finish-line-2x.jpg', dict(max=1600, q=80)),   # 2x through tools/sr.py (Pass 11)
    ('img/close.jpg',        'photos/mural-2x.jpg',    dict(max=1600, q=80)),
    ('img/door-pledge.jpg',  'photos/portrait.jpg',    dict(max=1000, crop='4:5')),
    ('img/door-ride.jpg',    'photos/ride-lavender.jpg', dict(max=1000, crop='4:5')),
    ('img/door-read.jpg',    'photos/card-south-duo.jpg', dict(strength=0.0, stop=0.35, lift=0.12, warm=0.08)),
    ('img/card-journal.jpg', 'photos/mural-2x.jpg',    dict(max=1000, crop='4:5')),
    ('img/card-south.jpg',   'photos/card-south-duo.jpg', dict(strength=0.0, stop=0.35, lift=0.12, warm=0.08)),
    ('img/card-pv.jpg',      'photos/card-pv-duo.jpg', dict(strength=0.0, stop=0.25, lift=0.10, warm=0.06)),
    ('img/portrait.jpg',     'photos/portrait.jpg',    dict(max=1024)),
    ('img/bike.jpg',         'photos/bike-detail.jpg', dict(max=1000)),
    ('img/vest.jpg',         'photos/vest-ride.jpg',   dict(max=1200, crop='4:5')),
    ('img/crew-haus.jpg',    'photos/crew-haus.jpg',   dict(max=1000)),
    ('img/haus-road.jpg',    'photos/haus-road.jpg',   dict(max=1600)),
    # Pass 25 (Oct 4, 2026): Robert's own photos through the site, from ~/Pictures/CFC Stockpile/.
    # Where each one runs and its alt text: scripts/photos.js. Sun-in-frame shots take the Pass 11
    # sunset settings ('sun') so the sky holds; the /tonight/ dusk keeps its dark ('dusk').
    # No cars in any of them (Robert, Oct 4): landscapes and riding only. sedona-road is cropped to the butte.
] + [(f'img/ph/{k}.jpg', f'photos/{k}.jpg', dict(max=_long(k), q=76, **PASS25_LOOK[look])) for k, look in [
    ('phx-canal', 'sun'), ('pv-camelback-road', ''), ('sedona-road', ''), ('boise-river-path', ''),
    ('sawtooth-lake', ''), ('seattle-path', ''), ('gravel-pines', ''),
    ('gravel-road', ''), ('robert-camelback', ''), ('encinitas-beach', ''), ('stanley-dock', ''),
    ('hood-from-air', ''), ('pv-morning-road', ''), ('sawtooth-road', ''), ('robert-peace', ''),
    ('robert-desert', ''), ('robert-boise', ''), ('bike-wall', ''), ('robert-selfie-camelback', ''),
    ('pv-sunrise-bars', 'sun'), ('riders-camelback', ''), ('pv-golden-climb', 'sun'),
    ('pv-cloud-road', ''), ('canal-sunrise', 'sun'), ('pv-shadow', ''), ('hills-road', ''),
    ('pv-dusk', 'sun'), ('camelback-sunrise', 'sun'), ('south-mountain', ''), ('phx-skyline', ''),
    ('flagstaff-dusk', 'dusk'), ('empty-road', ''), ('sawtooth-calm', ''),
]]

def srgb_to_lin(x): return np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4)
def lin_to_srgb(x): return np.where(x <= 0.0031308, x * 12.92, 1.055 * np.power(np.clip(x, 0, 1), 1 / 2.4) - 0.055)

def grade(im, strength=0.22, lift=0.13, stop=0.5, warm=0.06, sat=1.08):
    a = np.asarray(im.convert('RGB')).astype(np.float64) / 255.0
    lin = srgb_to_lin(a) * (2 ** stop)                                  # exposure, in linear light
    lin = np.clip(lin, 0, None)
    lin = 1 - (1 - lin) / (1 + lin * 0.35)                               # soft shoulder so the sky holds
    s = lin_to_srgb(np.clip(lin, 0, 1))
    s = lift + (1 - lift) * s                                            # lifted blacks
    lum = 0.2126 * s[..., 0] + 0.7152 * s[..., 1] + 0.0722 * s[..., 2]
    s[..., 0] += warm * lum                                              # warm toward bone in the highlights
    s[..., 2] -= warm * lum * 0.9
    lum3 = lum[..., None]
    s = np.clip(lum3 + (s - lum3) * sat, 0, 1)
    lum = 0.2126 * s[..., 0] + 0.7152 * s[..., 1] + 0.0722 * s[..., 2]
    duo = SHADOW + (BONE - SHADOW) * lum[..., None]                      # the light bone-forward duotone
    out = s * (1 - strength) + duo * strength
    return Image.fromarray((np.clip(out, 0, 1) * 255 + 0.5).astype(np.uint8))

def crop_to(im, ratio, focus=(0.5, 0.5)):
    rw, rh = [float(x) for x in ratio.split(':')]
    W, H = im.size
    target = rw / rh
    if W / H > target:   # too wide
        nw = int(H * target); x0 = int((W - nw) * focus[0]); return im.crop((x0, 0, x0 + nw, H))
    nh = int(W / target); y0 = int((H - nh) * focus[1]); return im.crop((0, y0, W, y0 + nh))

def process(src, dst, strength=0.22, lift=0.13, stop=0.5, warm=0.06, sat=1.08, max=0, up=False, crop=None, focus=(0.5, 0.5), q=82):
    im = Image.open(src)
    if crop: im = crop_to(im, crop, focus)
    if max:
        if up and im.width < max and im.height < max:
            f = max / float(im.width if im.width >= im.height else im.height)
            im = im.resize((round(im.width * f), round(im.height * f)), Image.LANCZOS)
        else:
            im.thumbnail((max, max), Image.LANCZOS)
    g = grade(im, strength, lift, stop, warm, sat)
    if os.path.dirname(dst): os.makedirs(os.path.dirname(dst), exist_ok=True)
    g.save(dst, quality=q, optimize=True, progressive=True)
    print(f'{os.path.relpath(dst, ROOT)}  {g.size[0]}x{g.size[1]}  {os.path.getsize(dst) // 1024} KB')

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--all':
        # --only a,b grades just those outputs (by file stem), so a new photo doesn't re-encode the rest
        only = set(sys.argv[sys.argv.index('--only') + 1].split(',')) if '--only' in sys.argv else None
        for dst, src, opts in MANIFEST:
            if only and os.path.splitext(os.path.basename(dst))[0] not in only: continue
            process(os.path.join(ROOT, src), os.path.join(ROOT, dst), **opts)
        sys.exit(0)
    p = argparse.ArgumentParser(); p.add_argument('inp'); p.add_argument('out')
    p.add_argument('--strength', type=float, default=0.22); p.add_argument('--lift', type=float, default=0.13)
    p.add_argument('--stop', type=float, default=0.5); p.add_argument('--warm', type=float, default=0.06)
    p.add_argument('--sat', type=float, default=1.08); p.add_argument('--max', type=int, default=0)
    p.add_argument('--crop', default=None); p.add_argument('--q', type=int, default=82)
    a = p.parse_args()
    process(a.inp, a.out, a.strength, a.lift, a.stop, a.warm, a.sat, a.max, False, a.crop, q=a.q)
