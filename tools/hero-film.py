#!/usr/bin/env python3
"""Cycle for Change: the homepage hero film (Oct 27, 2026, the editorial homepage, v9).

Robert and Cadence approved a full-screen moving hero. Robert, on the staged v8: "the video needs to be changed".
He then sent his own clean footage ("These are without words", Oct 27). This cuts the hero from two of those clips:

  rail   his selfie-mount ride across the rail yard: one continuous 6 s take, 1080x1920, his face, the pink jersey
  hit    his "CFC Reel Hit v3" reel, 1080x1920: three of its moving shots (the red-rock road with his shadow, the
         tunnel, the palms). Its other shots are out: the black-kit ride at the camera (parked cars on the left in
         every frame), the bike lane (a white shape that could be a vehicle beyond the far kerb), the overlook (a
         smoke plume over the city, a vignette baked in) and the stills (other people, the finish line)

  phone  608x1080  one frame: the rail-yard take, then the palms and the tunnel. Frame 0 is his face (the poster)
  wide   1620x960  the wide panel the words sit in (the red-rock road, the tunnel, the palms) and the tall one at
                   the right: the rail-yard take, uncut, his face in frame 0. The gutter at 70% clears the nav.

Every frame of every shot used was looked at for vehicles and faces: no car, truck or van anywhere, and only Robert is
recognisable. Nothing is synthetic, nothing is graded and nothing is slowed down. Older cuts (v1-v8: road-film-2, the
three-band test reel) are in git history; road-film-2 is not car-free (CLAUDE.md §10).

  python3 tools/hero-film.py --rail ~/path/1789929494081.mov --hit ~/path/CFC-Reel-Hit-v3.mp4 [--out cfc-site/film] [--n 8]

writes hero-phone-<n>.mp4/.webm and hero-wide-<n>.mp4/.webm (H.264 High + VP9, no audio, +faststart) and
a poster for each (frame 0) as .jpg/.webp/.avif. Bump --n on any recut (phones and Safari cache /film/ for a week).
His clips stay out of git (raw clips and social cuts never go in the repo); the outputs are committed.
"""
import argparse, os, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILM = os.path.join(ROOT, "cfc-site", "film")
TAR = "0x141218"          # --tar, the gutter between frames

FPS = 30
L = {"phone": 4.65, "wide": 3.75}   # each film's loop, seconds

# sources: (path, width, height). Both are Robert's own clips, passed on the command line.
def sources(rail, hit):
    return {"rail": (rail, 1080, 1920), "hit": (hit, 1080, 1920)}

# shots: name -> (source, t0, t1, region) where region is the part of the source frame the shot may use
# (x, y, w, h); the crop to the slot's shape is taken from its centre unless the slot gives a focus (fx, fy 0..1).
# The reel's own cuts (frame diffs): tunnel 5.600-7.199, red-rock road 8.200-9.899, palms 9.900-11.299; each shot
# keeps a few frames clear of them.
SHOTS = {
    "rail":   ("rail", 1.80, 6.30, (0, 0, 1080, 1920)),   # from 1.8 s: before it he's looking off to the left
    "road":   ("hit", 8.24, 9.86, (0, 0, 1080, 1920)),    # a road under a red-rock ridge, his shadow on it
    "tunnel": ("hit", 6.32, 7.17, (0, 0, 1080, 1920)),    # from 6.32 s: a red post behind his helmet before it
    "palms":  ("hit", 9.94, 11.26, (0, 0, 1080, 1920)),   # low, at the camera, the palms
}
# phones: the same shots a little closer (900x1600 of the 1080x1920 frame, still downscaled), so his face sits in the
# top quarter, clear of the stencil, on every phone from 360x640 to 430x932
for k in ("rail", "palms", "tunnel"):
    SHOTS[k + "_p"] = SHOTS[k][:3] + ((90, 250, 900, 1600),)

# lanes: (slot w, slot h, [(shot, focus 0..1 along the axis the crop slides on), ...]); the last shot of each lane is
# trimmed to the loop.
PHONE = [   # one frame; frame 0 is his face (the poster and the reduced-motion still)
    (608, 1080, [("rail_p", .5, 2.5), ("palms_p", .5), ("tunnel_p", .5)]),
]
WIDE = [    # the wide panel the words sit in, cut on its own clock; the tall one is the rail-yard take, uncut. Frame 0:
            # the red-rock road beside his face
    (1134, 960, [("road", .5), ("tunnel", .42), ("palms", .44)]),   # his face above the stencil in both
    (480, 960, [("rail", .5)]),
]

def dur(shot): return SHOTS[shot][2] - SHOTS[shot][1]

def lane_times(lane, L):
    """[(shot, focus, start_in_loop, length)] trimmed to L"""
    out, t = [], 0.0
    for shot, f, *cap in lane:
        if t >= L - 1e-6: break
        d = min(dur(shot), cap[0] if cap else 99, L - t)
        out.append((shot, f, t, d)); t += d
    if t < L - 1e-3: raise SystemExit(f"lane too short: {t:.2f}s of {L}s")
    return out

def check(lanes, label):
    """no shot plays in two lanes at once"""
    spans = [(s, a, a + d, i) for i, (w, h, lane) in enumerate(lanes) for (s, f, a, d) in lane_times(lane, L[label])]
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

def build(lanes, gap, out_w, out_h, srcs, tmp, name):
    args, chains, n = [], [], 0
    lane_labels = []
    for li, (sw, sh, lane) in enumerate(lanes):
        seg_labels = []
        for shot, f, a, d in lane_times(lane, L[name]):
            src = SHOTS[shot][0]; path = srcs[src][0]; t0 = SHOTS[shot][1]
            args += ["-ss", f"{t0:.3f}", "-t", f"{d:.3f}", "-i", path]
            x, y, cw, ch = crop_for(shot, sw, sh, f)
            chains.append(f"[{n}:v]crop={cw}:{ch}:{x}:{y},scale={sw}:{sh}:flags=lanczos,setsar=1,fps={FPS},format=yuv420p,trim=duration={d:.3f},setpts=PTS-STARTPTS[s{n}]")
            seg_labels.append(f"[s{n}]"); n += 1
        chains.append(f"{''.join(seg_labels)}concat=n={len(seg_labels)}:v=1:a=0,trim=duration={L[name]:.3f},setpts=PTS-STARTPTS[l{li}]")
        lane_labels.append(f"[l{li}]")
    if len(lane_labels) == 1:
        chains.append(f"{lane_labels[0]}setsar=1[out]")
    else:   # the gutter: pad each lane but the last on its right, then side by side
        padded = []
        for li, lab in enumerate(lane_labels):
            if li < len(lane_labels) - 1:
                chains.append(f"{lab}pad={lanes[li][0] + gap}:{lanes[li][1]}:0:0:color={TAR}[p{li}]"); padded.append(f"[p{li}]")
            else: padded.append(lab)
        chains.append(f"{''.join(padded)}hstack=inputs={len(padded)},setsar=1[out]")
    master = os.path.join(tmp, f"{name}-master.mp4")
    cmd = ["ffmpeg", "-v", "error", "-y", *args, "-filter_complex", ";".join(chains), "-map", "[out]", "-an",
           "-c:v", "libx264", "-crf", "14", "-preset", "veryfast", "-pix_fmt", "yuv420p", master]
    subprocess.run(cmd, check=True)
    probe = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", master], capture_output=True, text=True).stdout.strip()
    assert probe == f"{out_w},{out_h}", (probe, out_w, out_h)
    return master

# v7 (the art director) started the wide loop 0.35 s in (0 = no turn). Same frames, same pairs, the seam inside the loop moves, and
# frame 0 (the poster: the LCP and the only picture for reduced motion, Save-Data and slow connections) is his face
# beside the whole forest rider instead of a rider cut by the clip's own edge
WIDE_START = 0.0
def rotate(master, start, length, tmp):
    out = os.path.join(tmp, "rot-" + os.path.basename(master))
    fc = (f"[0:v]split[a][b];[a]trim=start={start:.3f}:end={length:.3f},setpts=PTS-STARTPTS[x];"
          f"[b]trim=start=0:end={start:.3f},setpts=PTS-STARTPTS[y];[x][y]concat=n=2:v=1:a=0[out]")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", master, "-filter_complex", fc, "-map", "[out]", "-an",
                    "-c:v", "libx264", "-crf", "14", "-preset", "veryfast", "-pix_fmt", "yuv420p", out], check=True)
    return out

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
    ap.add_argument("--rail", required=True, help="his rail-yard ride (1789929494081.mov)")
    ap.add_argument("--hit", required=True, help="his reel, CFC-Reel-Hit-v3.mp4")
    ap.add_argument("--out", default=FILM)
    ap.add_argument("--n", type=int, default=8)
    a = ap.parse_args()
    srcs = sources(os.path.abspath(os.path.expanduser(a.rail)), os.path.abspath(os.path.expanduser(a.hit)))
    used = {SHOTS[e[0]][0] for lanes in (PHONE, WIDE) for (_, _, lane) in lanes for e in lane}
    for k in used:
        if not srcs[k][0] or not os.path.exists(srcs[k][0]): sys.exit(f"missing source {k}: {srcs[k][0]}")
    check(PHONE, "phone"); check(WIDE, "wide")
    os.makedirs(a.out, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        print("phone")
        m = build(PHONE, 6, 608, 1080, srcs, tmp, "phone")
        encode(m, a.out, f"hero-phone-{a.n}", 29, 43)
        print("wide")
        m = build(WIDE, 6, 1620, 960, srcs, tmp, "wide")
        if WIDE_START: m = rotate(m, WIDE_START, L["wide"], tmp)
        encode(m, a.out, f"hero-wide-{a.n}", 31, 45)

if __name__ == "__main__":
    main()
