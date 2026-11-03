#!/usr/bin/env python3
"""Cycle for Change: the film in the homepage's road section (#road), under the 10,000 (Oct 28, 2026).

Robert sent two clips on Oct 28, 2026: "Can this be the hero video" (a captioned reel) and "This another video that could
go below the fold". This cuts the second one, his 28 s landscape reel (1920x1080, SDR, its own music), into a silent
16:9 loop for #road. Three of its shots, every cut a hard cut on a frame:

  drone     0.60-5.70 s   the drone over him on the desert road, his shadow long beside him (the poster is 1.0 s)
  lookout   9.20-11.00 s  him sitting at the overlook, the bike against the rail, the drone on the ledge (before he
                          reaches for the camera at 11.3 s)
  mountain  19.75-20.85 s the mountain road from the bars, the curve and the ridge

Left out, frame by frame (Oct 28, 2026):
  the sunset bike   6.1-8.9 s   a long white shape past the road on the left in every frame (could be a parked trailer)
  the canal path    17.3-18.4 s a long white band on the horizon (a train or a row of vehicles: can't be cleared)
  the bridge        18.5-19.6 s someone on the bridge ahead
  the side-on ride  23.1-24.3 s soft: a zoomed crop, below the bar for a film this size
  the city shots, the crosswalk, the flare and the chest mount: vehicles possible, motion blur, or his chin in the lens
His first clip that morning (a 360 selfie reel, 1080x1830 HDR) had its words burned in over the middle of nearly every
frame; none of it is used.

Nothing is graded, slowed, sharpened or synthetic. No car, truck or van anywhere; only Robert is recognisable. The drone
shot looks down on the city far below: no vehicle can be made out.

  python3 tools/road-film.py --src ~/path/clip.mov [--out cfc-site/film] [--n 3]

writes road-film-<n>.mp4 (H.264 High, CRF 29) and .webm (VP9), 1440x810, 30 fps, no audio, +faststart, metadata
stripped, and the poster as .jpg/.webp/.avif (q82 / q78 / q52). Bump --n on a recut (/film/ caches for a week). His clip
stays out of git.
"""
import argparse, os, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H, FPS = 1440, 810, 30
SHOTS = [(0.60, 5.70), (9.20, 11.00), (19.75, 20.85)]
POSTER_AT = 1.0


def run(args):
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", *args], check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True)
    ap.add_argument("--out", default=os.path.join(ROOT, "cfc-site", "film"))
    ap.add_argument("--n", type=int, default=3)
    a = ap.parse_args()
    base = os.path.join(a.out, f"road-film-{a.n}")
    parts = [f"[0:v]trim=start={t0}:end={t1},setpts=PTS-STARTPTS,scale={W}:{H}:flags=lanczos,fps={FPS},format=yuv420p[v{i}]"
             for i, (t0, t1) in enumerate(SHOTS)]
    fc = ";".join(parts) + ";" + "".join(f"[v{i}]" for i in range(len(SHOTS))) + f"concat=n={len(SHOTS)}:v=1:a=0[v]"
    run(["-i", a.src, "-filter_complex", fc, "-map", "[v]", "-an", "-c:v", "libx264", "-profile:v", "high",
         "-preset", "veryfast", "-crf", "29", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-map_metadata", "-1",
         base + ".mp4"])
    run(["-i", base + ".mp4", "-an", "-c:v", "libvpx-vp9", "-crf", "40", "-b:v", "0", "-row-mt", "1",
         "-deadline", "good", "-cpu-used", "4", "-map_metadata", "-1", base + ".webm"])
    png = base + ".poster.png"
    run(["-ss", str(POSTER_AT), "-i", a.src, "-frames:v", "1", "-vf", f"scale={W}:{H}:flags=lanczos", png])
    from PIL import Image
    im = Image.open(png).convert("RGB")
    im.save(base + ".jpg", quality=82, optimize=True, progressive=True)
    im.save(base + ".webp", quality=78, method=6)
    im.save(base + ".avif", quality=52)
    os.remove(png)
    print(f"road-film-{a.n}: {sum(t1 - t0 for t0, t1 in SHOTS):.2f} s, {W}x{H}")


if __name__ == "__main__":
    main()
