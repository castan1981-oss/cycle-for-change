#!/usr/bin/env python3
"""The /about/ page's art-directed crops (Oct 28, 2026). Plain crops of Robert's own files, no grade (CLAUDE.md §3,
"Photos have a clean edge"): a resize and the house's light unsharp, a JPG with an AVIF and a WebP beside it.

  python3 tools/about-art.py            writes cfc-site/img/about/*-<N>.{jpg,avif,webp}

Bump N (the file number) when a crop changes: phones and Safari cache hard.
"""
import pathlib
from PIL import Image, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "cfc-site" / "photos"
OUT = ROOT / "cfc-site" / "img" / "about"
N = 2

# key: (source file, crop box in the source's pixels (l, t, r, b), served width)
CROPS = {
    # the opening, wide: a 2.39:1 band of his Camelback selfie, the mountain on the left third, his face on the right.
    # -2 starts at x 340: a pale box on a driveway at the far left of -1 couldn't be cleared as not a car (the brand gate)
    "open-w": ("robert-selfie-camelback.jpg", (340, 560, 2400, 1422), 2060),
    # the opening, phone: 4:5 around his face, the edge of Camelback behind him
    "open-p": ("robert-selfie-camelback.jpg", (830, 100, 2190, 1800), 1200),
}


def clean(im):
    return im.convert("RGB").filter(ImageFilter.UnsharpMask(radius=0.6, percent=35, threshold=2))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for key, (src, box, width) in CROPS.items():
        im = Image.open(SRC / src)
        im = im.crop(box)
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        im = clean(im)
        base = OUT / f"{key}-{N}"
        im.save(f"{base}.jpg", quality=78, optimize=True, progressive=True)
        im.save(f"{base}.avif", "AVIF", quality=52, speed=4)
        im.save(f"{base}.webp", "WEBP", quality=78, method=6)
        print(f"wrote {base.relative_to(ROOT)}.jpg/.avif/.webp {im.width}x{im.height}")


if __name__ == "__main__":
    main()
