"""Robert's photos, from the originals in cfc-site/photos/ to what the site loads in cfc-site/img/.

Studio pass 1 (Oct 21, 2026): the registry photos (img/ph/) are served CLEAN, not graded: a plain Lanczos
resize, a light unsharp (0.6 px, 35%), JPG q76, with an AVIF (q52) and a WebP (q78) beside each, the same
name. Robert chose the hero "clear, crisp, ungraded" on Oct 5; the Pass 6 high-key grade below (lifted
blacks, half a stop over, a 22% bone duotone) washed the inner-page photos and pulled skin toward bone.
To bring the grade back, set CLEAN = False (one setting) and regrade with --all --only <keys>.
Crops are plain crops of his own file, never extended: `box` (source pixels, after any check for cars and
faces) or `crop` + `focus`. Every changed picture gets a new file number (-2, -3 …): phones cache hard.

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
def _long_of(src, box=None):   # the long side for a clean copy: 1440 for a portrait, 1600 for a landscape
    try:
        w, h = (box[2] - box[0], box[3] - box[1]) if box else Image.open(os.path.join(ROOT, src)).size
        return 1440 if h > w else 1600
    except OSError:
        return 1600
PASS25_LOOK = {'': {}, 'sun': dict(stop=0.3, lift=0.11), 'dusk': dict(strength=0.10, stop=0.15, lift=0.06, warm=0.04)}
CLEAN = True    # studio pass 1: serve the registry photos ungraded (see the note at the top)
V = 2           # the registry's file number: img/ph/<key>-2.jpg. Bump it when every registry photo changes again.
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
]] + [
    # —— Studio pass 1 (Oct 21, 2026): clean registry copies, numbered, and the art-directed crops ——
    # Each box was looked at 1:1 for cars and faces (research/design/2026-10-21-studio-1/, B's reply):
    #   empty-road     stops at x 1380: two white shapes on the far right horizon (buildings or a trailer) stay out.
    #   pv-cloud-road  starts at x 560: an SUV parked in the brush on the left, and a pale shape beside it, are out.
    #   south-mountain-view  the view only, above the valley highway (a white shape on it) and left of the rider.
    #   love-wall      the left of the Oct 12 LOVE-wall photo: his bike, no car.
    #   Held, not regraded or placed: pv-camelback-road (a pale shape behind the wall left of the gate may be a parked
    #   car); south-mountain whole (a rider's face, front on, and a white shape on the valley highway).
    (f'img/ph/{k}-{V}.jpg', f'{src}', dict(max=_long_of(src, box), box=box, clean=True, q=76)) for k, src, box in [
        (k, f'photos/{k}.jpg', None) for k in [
            'phx-canal', 'sedona-road', 'boise-river-path', 'sawtooth-lake', 'seattle-path',
            'gravel-pines', 'gravel-road', 'robert-camelback', 'encinitas-beach', 'stanley-dock', 'hood-from-air',
            'pv-morning-road', 'sawtooth-road', 'robert-peace', 'robert-desert', 'robert-boise', 'bike-wall',
            'robert-selfie-camelback', 'pv-sunrise-bars', 'riders-camelback', 'pv-golden-climb', 'canal-sunrise',
            'pv-shadow', 'hills-road', 'pv-dusk', 'camelback-sunrise', 'phx-skyline',
            'flagstaff-dusk', 'sawtooth-calm', 'haus-road']
    ] + [
        ('empty-road', 'photos/empty-road.jpg', (220, 300, 1380, 1847)),              # 3:4, as the registry's portraits
        ('pv-cloud-road', 'photos/pv-cloud-road.jpg', (560, 480, 1800, 2133)),        # 3:4
        ('south-mountain-view', 'photos/south-mountain.jpg', (0, 20, 880, 1120)),     # 4:5, left of x 1000 (the rider), above y 1140 (the highway)
        ('love-wall', 'img/today/oct12-love-1.jpg', (0, 0, 719, 899)),                # 4:5
    ]
] + [
    # bands: a 2:1 for desktop (-w) and a 4:3 for phones (-b), used when the figure is a wide band (.ph--wide)
    (f'img/ph/{k}-{kind}-{V}.jpg', f'photos/{src}.jpg', dict(max=mx, box=box, clean=True, q=76)) for k, src, kind, box, mx in [
        ('riders-camelback', 'riders-camelback', 'w', (0, 630, 1800, 1530), 1800),
        ('riders-camelback', 'riders-camelback', 'b', (0, 420, 1800, 1770), 1600),
        ('empty-road', 'empty-road', 'w', (0, 830, 1380, 1520), 1380),
        ('empty-road', 'empty-road', 'b', (0, 700, 1380, 1735), 1380),
        ('sawtooth-calm', 'sawtooth-calm', 'w', (0, 240, 2400, 1440), 2400),          # the 2400 original, crisp at 2x
        ('phx-skyline', 'phx-skyline', 'w', (0, 120, 2400, 1320), 2400),
    ]
]

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

def clean_look(im):
    """No grade: the photo as he took it, with a light unsharp after the resize (0.6 px, 35%)."""
    from PIL import ImageFilter
    return im.convert('RGB').filter(ImageFilter.UnsharpMask(radius=0.6, percent=35, threshold=2))

def process(src, dst, strength=0.22, lift=0.13, stop=0.5, warm=0.06, sat=1.08, max=0, up=False, crop=None, focus=(0.5, 0.5), q=82, box=None, clean=False):
    im = Image.open(src)
    if box: im = im.crop(box)
    if crop: im = crop_to(im, crop, focus)
    if max:
        if up and im.width < max and im.height < max:
            f = max / float(im.width if im.width >= im.height else im.height)
            im = im.resize((round(im.width * f), round(im.height * f)), Image.LANCZOS)
        else:
            im.thumbnail((max, max), Image.LANCZOS)
    g = clean_look(im) if (clean and CLEAN) else grade(im, strength, lift, stop, warm, sat)
    if os.path.dirname(dst): os.makedirs(os.path.dirname(dst), exist_ok=True)
    g.save(dst, quality=q, optimize=True, progressive=True)
    # Oct 18, 2026: an AVIF beside every graded JPG (about 45% of the bytes at the same look, quality 52);
    # scripts/photos.js serves it first when it exists, the JPG stays the fallback.
    # Studio pass 1: a WebP (q78) too, for the browsers between.
    if dst.lower().endswith('.jpg'):
        g.save(dst[:-4] + '.avif', 'AVIF', quality=52, speed=4)
        if clean: g.save(dst[:-4] + '.webp', 'WEBP', quality=78, method=6)
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
