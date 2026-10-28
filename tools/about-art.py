#!/usr/bin/env python3
"""The /about/ page's pictures (Oct 28, 2026): plain crops of Robert's own files, no grade.

Run from the repo root:  python3 tools/about-art.py
Writes cfc-site/img/about/<name>-<N>.jpg (q78) with an .avif (q52) and a .webp (q78) beside it, the same way
tools/grade.py does for the registry. Every crop is a rectangle of his file: nothing redrawn, nothing laid over,
no mask, no fade, a light unsharp (0.6 px, 35%) after the resize, as grade.py.

The love bubble (AIDS/LifeCycle): one real finish-line photo (photos/finish-line-2x.jpg) read four ways. Every crop
keeps only Robert recognisable (CLAUDE.md §10): his teammate's face is outside every rectangle (his arm and hand
stay), the crowd is out of focus or out of frame. When Robert sends more ALC photos, add them to CROPS and to
data/about.json's bubble list; bump N for a recut. Each crop was looked at 1:1 for faces and vehicles.
"""
import pathlib
from PIL import Image, ImageFilter, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "cfc-site" / "photos"
OUT = ROOT / "cfc-site" / "img" / "about"
N = 1

# name: (source file, crop box in the source's pixels, longest side served)
CROPS = {
    # the opening: Robert leaning on his bars on a bridge, no sunglasses, looking straight at you (the one photo in the
    # library where you see his eyes). The file is 768×1024; a full-resolution original is on Robert's list.
    "open":      ("portrait.jpg", (0, 0, 768, 1024), 1024),
    # the mission: Robert and Caleb at sunset on a desert road (Caleb cleared by Robert, Oct 26, 2026), 4:5; the two
    # riders behind them are far off and backlit; the left edge sits right of the saguaro's arm (no sliver of it)
    "crew":      ("crew-2x.jpg", (310, 0, 1948, 2048), 1440),
    # the 10,000: the road toward the Sawtooths (Stanley, ID · Jun 2024), a 2.4:1 band for wide screens (phones get the
    # registry's 4:3); the cut keeps the road's bend and the peaks, below the open sky
    "road-w":    ("sawtooth-road.jpg", (0, 420, 2400, 1420), 2000),
    # AIDS/LifeCycle, the finish: Robert crossing with his teammate, their hands up together (the teammate's face is
    # right of x 800, out of frame)
    "alc-finish": ("finish-line-2x.jpg", (0, 20, 800, 1580), 1560),
    # the same moment: the two hands, held up
    "alc-hands":  ("finish-line-2x.jpg", (300, 0, 800, 500), 500),
    # the barrier at the line: the AIDS/LifeCycle banner and the hands reaching over it (heads above y 760 are out)
    "alc-banner": ("finish-line-2x.jpg", (1150, 760, 1800, 1260), 650),
    # the rainbow umbrella over the crowd (the people under it start below y 480)
    "alc-umbrella": ("finish-line-2x.jpg", (1180, 40, 1800, 480), 620),
}


def save(img, stem):
    img = img.filter(ImageFilter.UnsharpMask(radius=0.6, percent=35, threshold=2))
    img.save(f"{stem}.jpg", "JPEG", quality=78, optimize=True, progressive=True)
    img.save(f"{stem}.avif", "AVIF", quality=52, speed=4)
    img.save(f"{stem}.webp", "WEBP", quality=78, method=6)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (src, box, longest) in CROPS.items():
        im = ImageOps.exif_transpose(Image.open(SRC / src)).convert("RGB").crop(box)
        s = min(1.0, longest / max(im.size))
        if s < 1:
            im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
        save(im, OUT / f"{name}-{N}")
        print(f"{name}-{N}: {im.size[0]}x{im.size[1]}")


if __name__ == "__main__":
    main()
