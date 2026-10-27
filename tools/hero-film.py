#!/usr/bin/env python3
"""Cycle for Change: the homepage hero film (Oct 26, 2026, the editorial homepage).

Robert and Cadence approved a full-screen moving hero, with "cycling-video-no-text.mp4" (Robert's own
three-band reel) as the test footage and Robert "open to a better edit from his real footage". The test reel
can't run as it is. It has a parked truck behind him at the overlook and traffic in the last second, and the
homepage hero stays car-free (CLAUDE.md §10). It is 512 px wide and ends in glitch frames. So this is the better
edit, cut from his real footage only:

  phone  540x960   the three stacked bands from his reel (his edit grammar, the look he approved), each band its
                   own sequence: the clean shots of the reel (the selfie, the jersey, riding at sunset, the
                   overlook cropped clear of the truck) and the homepage reel's shots cropped to the band
  wide   1620x960  the same three frames turned sideways: three tall panels from the homepage reel, the TSR
                   selfie and the LOVE wall loop, at native sharpness (the reel's bands are too small to fill a
                   desktop screen)

Every shot was checked by eye for vehicles and faces: only Robert is recognisable, and riders ahead are
from behind. Nothing is synthetic, nothing is graded and nothing is slowed down. Each band or panel cuts on
its own clock, so the frame never jumps all at once except at the loop.

  python3 tools/hero-film.py --reel ~/path/cycling-video-no-text.mp4 [--out cfc-site/film] [--n 1]

writes hero-phone-<n>.mp4/.webm and hero-wide-<n>.mp4/.webm (H.264 High + VP9, no audio, +faststart) and
a poster for each (frame 0) as .jpg/.webp/.avif. Bump --n on any recut (phones and Safari cache /film/ for a week).
The source reel stays out of git (social cuts never go in the repo); the outputs are committed.
"""
import argparse, os, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILM = os.path.join(ROOT, "cfc-site", "film")
TAR = "0x141218"          # --tar, the gutter between frames
FPS = 30
L = 7.1                   # the loop, seconds

# sources: (path, width, height). "reel" is Robert's three-band reel; its bands are cut out by y range.
def sources(reel):
    return {
        "reel": (reel, 512, 910),
        "road": (os.path.join(FILM, "road-film-2.mp4"), 864, 1080),   # the homepage reel, car clips cut Oct 6
        "tsr": (os.path.join(FILM, "tsr-1.mp4"), 864, 1080),          # his first TSR; only the selfie is used
        "love": (os.path.join(FILM, "today-oct12-1.mp4"), 720, 1280), # the LOVE wall loop, Oct 12
    }

# the reel's bands (rows of the 512x910 frame): top 0-276, middle 277-594, bottom 596-909
BAND = {"top": (0, 277), "mid": (277, 318), "bot": (596, 314)}

# shots: name -> (source, t0, t1, region) where region is the part of the source frame the shot may use
# (x, y, w, h); the crop to the slot's shape is taken from its centre unless the slot gives a focus (fx, fy 0..1).
SHOTS = {
    # Robert's reel. Times are inside the reel; regions keep to one band.
    "r_selfie":  ("reel", 1.00, 1.85, (0, 0, 512, 277)),        # the selfie, grinning, the Assos jersey
    # not used: the tan-jersey peace sign (3.95-4.70) reads as shirtless at a glance on a phone; Robert's call
    "r_sunset":  ("reel", 0.35, 0.85, (0, 0, 512, 277)),        # sitting up at sunset, the bars
    "r_wheel":   ("reel", 2.05, 2.85, (0, 0, 512, 277)),        # the wheel on the concrete
    "r_jersey":  ("reel", 3.05, 3.80, (0, 0, 512, 277)),        # riding, the jersey close
    "r_riding":  ("reel", 0.05, 4.25, (0, 285, 512, 302)),      # riding at the camera at sunset (the middle band)
    "r_ledge":   ("reel", 0.40, 3.50, (120, 596, 392, 231)),    # the overlook, cropped right of the parked truck and trailer
    # the homepage reel (road-film-2), one shot each
    "s1_mint":   ("road", 0.05, 1.35, (0, 0, 864, 1080)),
    "s2_drone":  ("road", 1.45, 2.65, (0, 0, 864, 1080)),
    "s3_ahead":  ("road", 2.75, 4.05, (0, 0, 864, 1080)),
    "s4_river":  ("road", 4.15, 5.45, (0, 0, 864, 1080)),
    "s5_forest": ("road", 5.75, 6.75, (0, 0, 864, 1080)),
    "s6_tunnel": ("road", 6.85, 8.15, (0, 0, 864, 1080)),
    "s7_road":   ("road", 8.25, 9.55, (0, 0, 864, 1080)),
    "s8_bike":   ("road", 9.65, 10.95, (0, 0, 864, 1080)),
    "s9_sun":    ("road", 11.05, 11.60, (0, 0, 864, 1080)),
    "t_selfie":  ("tsr", 3.22, 3.72, (0, 0, 864, 1080)),
    "love":      ("love", 0.00, 3.20, (0, 0, 720, 1280)),
}

# (shot, focus y 0..1 for landscape crops of portrait sources, or focus x for portrait crops) — the last
# shot of each lane is trimmed to the loop. Order chosen so no shot is in two lanes at the same moment.
PHONE = [   # three bands, 540x316 each, top to bottom, 6 px of tar between
    [("r_selfie", .5), ("s6_tunnel", .42), ("r_sunset", .5), ("s1_mint", .3), ("r_wheel", .5), ("t_selfie", .3), ("r_jersey", .5), ("s9_sun", .5), ("love", .2)],
    [("r_riding", .5), ("s4_river", .45), ("s2_drone", .48), ("s3_ahead", .45)],
    [("s7_road", .62), ("s5_forest", .5), ("r_ledge", .5), ("s8_bike", .62), ("s1_mint", .3)],
]
WIDE = [    # three panels, 536x960 each, left to right, 6 px of tar between
    [("s1_mint", .5), ("s4_river", .5), ("t_selfie", .35), ("s7_road", .5), ("s2_drone", .5), ("s9_sun", .5), ("s5_forest", .5)],
    [("love", .5), ("s6_tunnel", .5), ("s8_bike", .5), ("s3_ahead", .5)],
    [("s6_tunnel", .5), ("s2_drone", .5), ("s5_forest", .5), ("s1_mint", .5), ("s4_river", .5), ("t_selfie", .5), ("s8_bike", .5)],
]

def dur(shot): return SHOTS[shot][2] - SHOTS[shot][1]

def lane_times(lane):
    """[(shot, focus, start_in_loop, length)] trimmed to L"""
    out, t = [], 0.0
    for shot, f in lane:
        if t >= L - 1e-6: break
        d = min(dur(shot), L - t)
        out.append((shot, f, t, d)); t += d
    if t < L - 1e-3: raise SystemExit(f"lane too short: {t:.2f}s of {L}s")
    return out

def check(lanes, label):
    """no shot plays in two lanes at once"""
    spans = [(s, a, a + d, i) for i, lane in enumerate(lanes) for (s, f, a, d) in lane_times(lane)]
    for s1, a1, b1, i1 in spans:
        for s2, a2, b2, i2 in spans:
            if i1 < i2 and s1 == s2 and a1 < b2 and a2 < b1:
                raise SystemExit(f"{label}: {s1} plays in lanes {i1} and {i2} at once ({a1:.2f}-{b1:.2f} / {a2:.2f}-{b2:.2f})")

def crop_for(shot, w, h, focus):
    """the crop (x, y, cw, ch) of the shot's region that has the slot's shape"""
    src, t0, t1, (rx, ry, rw, rh) = SHOTS[shot]
    want = w / h
    if rw / rh > want:          # region too wide: full height, slide x
        ch = rh; cw = int(round(rh * want))
        x = rx + int(round((rw - cw) * focus)); y = ry
    else:                       # region too tall: full width, slide y
        cw = rw; ch = int(round(rw / want))
        x = rx; y = ry + int(round((rh - ch) * focus))
    cw -= cw % 2; ch -= ch % 2
    return x, y, cw, ch

def build(lanes, slot, gap, stack, out_w, out_h, srcs, tmp, name):
    args, chains, n = [], [], 0
    lane_labels = []
    for li, lane in enumerate(lanes):
        seg_labels = []
        for shot, f, a, d in lane_times(lane):
            src = SHOTS[shot][0]; path = srcs[src][0]; t0 = SHOTS[shot][1]
            args += ["-ss", f"{t0:.3f}", "-t", f"{d:.3f}", "-i", path]
            x, y, cw, ch = crop_for(shot, slot[0], slot[1], f)
            chains.append(f"[{n}:v]crop={cw}:{ch}:{x}:{y},scale={slot[0]}:{slot[1]}:flags=lanczos,setsar=1,fps={FPS},format=yuv420p,trim=duration={d:.3f},setpts=PTS-STARTPTS[s{n}]")
            seg_labels.append(f"[s{n}]"); n += 1
        chains.append(f"{''.join(seg_labels)}concat=n={len(seg_labels)}:v=1:a=0,trim=duration={L:.3f},setpts=PTS-STARTPTS[l{li}]")
        lane_labels.append(f"[l{li}]")
    # gutters: pad each lane but the last on its far side, then stack
    padded = []
    for li, lab in enumerate(lane_labels):
        if li < len(lane_labels) - 1:
            pw, ph = (slot[0], slot[1] + gap) if stack == "v" else (slot[0] + gap, slot[1])
            chains.append(f"{lab}pad={pw}:{ph}:0:0:color={TAR}[p{li}]"); padded.append(f"[p{li}]")
        else:
            padded.append(lab)
    chains.append(f"{''.join(padded)}{'vstack' if stack == 'v' else 'hstack'}=inputs={len(padded)},setsar=1[out]")
    master = os.path.join(tmp, f"{name}-master.mp4")
    cmd = ["ffmpeg", "-v", "error", "-y", *args, "-filter_complex", ";".join(chains), "-map", "[out]", "-an",
           "-c:v", "libx264", "-crf", "14", "-preset", "veryfast", "-pix_fmt", "yuv420p", master]
    subprocess.run(cmd, check=True)
    probe = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", master], capture_output=True, text=True).stdout.strip()
    assert probe == f"{out_w},{out_h}", (probe, out_w, out_h)
    return master

def encode(master, out_dir, base, crf_h264, crf_vp9):
    mp4 = os.path.join(out_dir, base + ".mp4"); webm = os.path.join(out_dir, base + ".webm")
    common = ["-an", "-map_metadata", "-1", "-pix_fmt", "yuv420p"]
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", master, *common, "-c:v", "libx264", "-profile:v", "high", "-crf", str(crf_h264),
                    "-preset", "veryfast", "-g", "60", "-movflags", "+faststart", mp4], check=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", master, *common, "-c:v", "libvpx-vp9", "-crf", str(crf_vp9), "-b:v", "0",
                    "-deadline", "good", "-cpu-used", "4", "-row-mt", "1", "-g", "60", webm], check=True)
    # the poster is frame 0, so the still and the film's first frame are the same picture
    jpg = os.path.join(out_dir, base + ".jpg")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", master, "-frames:v", "1", "-q:v", "3", jpg], check=True)
    from PIL import Image
    im = Image.open(jpg).convert("RGB")
    im.save(os.path.join(out_dir, base + ".webp"), "WEBP", quality=78, method=6)
    im.save(os.path.join(out_dir, base + ".avif"), "AVIF", quality=52, speed=4)
    im.save(jpg, "JPEG", quality=78, optimize=True, progressive=True)
    for ext in ("mp4", "webm", "jpg", "webp", "avif"):
        p = os.path.join(out_dir, f"{base}.{ext}")
        print(f"  {os.path.relpath(p, ROOT)}  {os.path.getsize(p) / 1024:.0f} KB")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--reel", required=True, help="Robert's three-band reel (cycling-video-no-text.mp4)")
    ap.add_argument("--out", default=FILM)
    ap.add_argument("--n", type=int, default=1)
    a = ap.parse_args()
    srcs = sources(os.path.abspath(os.path.expanduser(a.reel)))
    for k, (p, *_) in srcs.items():
        if not os.path.exists(p): sys.exit(f"missing source {k}: {p}")
    check(PHONE, "phone"); check(WIDE, "wide")
    os.makedirs(a.out, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        print("phone")
        m = build(PHONE, (540, 316), 6, "v", 540, 960, srcs, tmp, "phone")
        encode(m, a.out, f"hero-phone-{a.n}", 27, 40)
        print("wide")
        m = build(WIDE, (536, 960), 6, "h", 1620, 960, srcs, tmp, "wide")
        encode(m, a.out, f"hero-wide-{a.n}", 29, 42)

if __name__ == "__main__":
    main()
