"""Super-resolve a phone photo 2x before it goes through the house grade (Pass 11, Sept 30 2026).

The hero looked soft and blocky at 2x screens because photos/crew.jpg is a 1024px phone export.
This runs a light denoise (the JPEG blocking would otherwise get sharpened into the picture),
then EDSR x2 (Lim et al., the OpenCV dnn_superres port) in tiles so it fits in memory, and
writes a q94 JPEG next to the original:

  python3 tools/sr.py cfc-site/photos/crew.jpg              # -> cfc-site/photos/crew-2x.jpg
  python3 tools/sr.py cfc-site/photos/mural.jpg OUT.jpg

Then point the MANIFEST line in tools/grade.py at the -2x file and run the grade. Needs
opencv-contrib-python (pip install opencv-contrib-python-headless) and numpy. The model
(38 MB) is fetched once from GitHub into ~/.cache/cfc/. Slow: ~8 minutes per 1024px photo on a
laptop CPU — run it once per photo, not in a build.
"""
import os, sys, time, urllib.request
import numpy as np
import cv2

MODEL_URL = "https://raw.githubusercontent.com/Saafke/EDSR_Tensorflow/master/models/EDSR_x2.pb"
CACHE = os.path.join(os.path.expanduser("~"), ".cache", "cfc")
TILE, OVERLAP, SCALE = 192, 16, 2


def model_path():
    os.makedirs(CACHE, exist_ok=True)
    p = os.path.join(CACHE, "EDSR_x2.pb")
    if not os.path.exists(p):
        print("fetching EDSR_x2.pb (38 MB) …")
        urllib.request.urlretrieve(MODEL_URL, p)
    return p


def upscale(img):
    sr = cv2.dnn_superres.DnnSuperResImpl_create()
    sr.readModel(model_path())
    sr.setModel("edsr", SCALE)
    H, W = img.shape[:2]
    out = np.zeros((H * SCALE, W * SCALE, 3), np.uint8)
    for y in range(0, H, TILE):
        for x in range(0, W, TILE):
            y0, x0 = max(0, y - OVERLAP), max(0, x - OVERLAP)
            y1, x1 = min(H, y + TILE + OVERLAP), min(W, x + TILE + OVERLAP)
            up = sr.upsample(img[y0:y1, x0:x1])
            oy, ox = (y - y0) * SCALE, (x - x0) * SCALE
            h, w = min(TILE, H - y) * SCALE, min(TILE, W - x) * SCALE
            out[y * SCALE:y * SCALE + h, x * SCALE:x * SCALE + w] = up[oy:oy + h, ox:ox + w]
    return out


def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    src = sys.argv[1]
    dst = sys.argv[2] if len(sys.argv) > 2 else os.path.splitext(src)[0] + "-2x.jpg"
    img = cv2.imread(src)
    if img is None:
        sys.exit(f"can't read {src}")
    img = cv2.fastNlMeansDenoisingColored(img, None, 3, 3, 7, 21)
    t = time.time()
    out = upscale(img)
    cv2.imwrite(dst, out, [cv2.IMWRITE_JPEG_QUALITY, 94, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
    print(f"{dst}  {out.shape[1]}x{out.shape[0]}  {os.path.getsize(dst) // 1024} KB  {time.time() - t:.0f}s")


if __name__ == "__main__":
    main()
