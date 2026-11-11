"""Shared pieces for the Cycle for Change print and social kit (tools/cfc-kit/).

Everything here is the site's own: the mark from scripts/mark-2027.js (cycle for, lowercase, and its pink plate; the
one drawing, never a copy), the blank as that plate, empty or carrying a word, the After Hours tokens, Overpass from
cfc-site/fonts/ (never Google's build: it breaks the middot). Square corners, hairlines, no shadows, no grain, nothing
laid over a photo. CLAUDE.md §3.

Boards are HTML at their real size in CSS px (96 px = 1 in for print), rendered by Chromium: PNG/JPG screenshots for
social, page.pdf() for print, so the type stays vector.
"""
import base64, io, json, os, pathlib, subprocess, html as _html
from datetime import datetime, timezone, timedelta

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent
SITE = ROOT / "cfc-site"
BUILD = HERE / ".build"
OUT = BUILD / "out"

# After Hours (CLAUDE.md §3). The names are this kit's; since Nov 11, 2026 the rose family is the mark's pink:
# plate = the mark's plate (a word on it is 19 px bold or bigger), rose = the pink a step down (the accent, and a plate
# with small type: a date, an org), rose_ink = small pink text on light, powder = the lifted pink, pink on dark.
T = dict(
    concrete="#E1DFDB", concrete2="#D7D5D0", plaster="#EFEDEA", patina="#A9BDB8", patina_deep="#687F7C",
    plate="#C2557F", rose="#B1406C", rose_ink="#983359", powder="#E3ABC0", gunmetal="#4A4E55", pool="#2C4F55",
    asphalt="#1C1A22", tar="#141218",
)

_MARK = None


def mark_paths():
    """The mark's paths, from the one drawing (scripts/mark-2027.js): CYCLE_PATHS, FOR_PATHS, PLATE_D, PINK."""
    global _MARK
    if _MARK is None:
        _MARK = json.loads(subprocess.run(["node", "scripts/mark-2027.js"], cwd=ROOT, capture_output=True, text=True, check=True).stdout)
        assert _MARK["PINK"].upper() == T["plate"], "the kit's plate is not the mark's pink"
    return _MARK


def curl(s):
    """Curly quotes and apostrophes in visible text (scripts/curl-quotes.js does the same for the pages)."""
    import re
    s = str(s)
    s = re.sub(r"(?<=\w)'(?=\w)", "\u2019", s)            # they'd, it's
    s = re.sub(r"(?<=\d)'(?=s\b)", "\u2019", s)
    s = re.sub(r"(^|[\s(\[])'", "\\1\u2018", s)
    s = s.replace("'", "\u2019")
    s = re.sub(r'(^|[\s(\[])"', "\\1\u201c", s)
    return s.replace('"', "\u201d")


def esc(s):
    return _html.escape(curl(s), quote=True)


def mark(width, ink, plate=True, stacked=False, label="Cycle for"):
    """The mark, `width` px wide. One line with its plate (the logo: 514 x 97), the words alone (plate=False: 404 x 97,
    for a sign whose plate is type), or stacked for a square space (cycle / for + the plate: 252 x 196). The letters
    take the ground's ink; the plate is always the pink."""
    m = mark_paths()
    words = lambda t="": f'<g fill="{ink}">{m["CYCLE_PATHS"]}<g{t}>{m["FOR_PATHS"]}</g></g>'
    blank = lambda t="": f'<path fill="{T["plate"]}" d="{m["PLATE_D"]}"{t}/>'
    if stacked:
        down = ' transform="translate(-261.7 112)"'
        vw, vh, body = 252, 196, words(down) + blank(down)
    elif plate:
        vw, vh, body = 514, 97, words() + blank()
    else:
        vw, vh, body = 404, 97, words()
    return (f'<svg class="mark" viewBox="0 0 {vw} {vh}" width="{width:.1f}" height="{width * vh / vw:.1f}" role="img" '
            f'aria-label="{esc(label)}">{body}</svg>')


def sign(width, ink, word, wrap=False):
    """The sign: the mark's words, `width` px wide, and the blank as a plate carrying a word, as on the site (CLAUDE.md
    §3): the pink, plaster type in Overpass 900 at 0.58 of the mark's height (as tall as the mark's own plate), a 0.07em
    corner, 2.5 degrees off square, lifted 0.15 of the mark's height. A long word puts the plate under the words
    (wrap=True, as /cyclefor/ does). word=None leaves the plate empty, to write or type on."""
    h = width * 97 / 404
    fs = h * 0.58
    tilt = "border-radius:.07em;transform:rotate(-2.5deg);transform-origin:0 100%"
    if word is not None:
        plate = (f'<span class="plate" style="display:block;background:{T["plate"]};color:{T["plaster"]};font-size:{fs:.1f}px;'
                 f'padding:.18em .36em .1em;{tilt}">{esc(word)}</span>')
    else:
        plate = (f'<span class="plate plate--empty" style="display:block;font-size:{fs:.1f}px;background:{T["plate"]};'
                 f'width:{(width * 0.9 if wrap else h * 0.96):.0f}px;height:{fs * 1.28:.0f}px;{tilt}"></span>')
    if wrap:
        return (f'<div class="sign sign--wrap">{mark(width, ink, plate=False)}'
                f'<div style="margin-top:{h * 0.2:.0f}px">{plate}</div></div>')
    return (f'<div class="sign" style="gap:{h * 0.16:.1f}px">{mark(width, ink, plate=False)}'
            f'<div style="margin-bottom:{h * 0.15:.1f}px">{plate}</div></div>')


def font_css():
    f = (SITE / "fonts" / "overpass-latin.woff2").as_uri()
    g = (SITE / "fonts" / "overpass-latin-ext.woff2").as_uri()
    return (f'@font-face{{font-family:"Overpass";font-weight:100 900;src:url("{f}") format("woff2");'
            'unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}'
            f'@font-face{{font-family:"Overpass";font-weight:100 900;src:url("{g}") format("woff2");'
            'unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1E9F,U+2020,U+20A0-20AB,U+2113}')


BASE_CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{font-family:"Overpass",system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-kerning:normal;font-variant-numeric:lining-nums}
.board{position:relative;overflow:hidden}
.mark{display:block;flex:none}
.sign{display:flex;align-items:flex-end;flex-wrap:nowrap}
.sign--wrap{display:block}
.sign--wrap .plate{width:max-content}
.plate{display:inline-block;font-weight:900;line-height:1;white-space:nowrap;letter-spacing:-.005em}
.ph{display:block;width:100%;object-fit:cover}
.label{font-weight:700;letter-spacing:0}
.num{font-weight:900;letter-spacing:-.03em;line-height:.86;font-feature-settings:"tnum" 0}
.hair{border-top:1.5px solid currentColor;opacity:.28}
"""

FIT = """<script>
// shrink anything marked data-fit until it fits its box (one line or a set height)
for (const e of document.querySelectorAll('[data-fit]')) {
  const w = +e.dataset.fit, h = +(e.dataset.fith || 0);
  let s = parseFloat(getComputedStyle(e).fontSize);
  while ((e.scrollWidth > w || (h && e.scrollHeight > h)) && s > 8) { s -= 1; e.style.fontSize = s + 'px'; }
}
document.body.dataset.ready = '1';
</script>"""


def page(inner, css="", w=1080, h=1350, bg="transparent", print_size=None):
    at_page = f"@page{{size:{print_size};margin:0}}" if print_size else ""
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{font_css()}{BASE_CSS}{at_page}{css}</style></head>'
            f'<body><div class="board" style="width:{w}px;height:{h}px;background:{bg}">{inner}</div>{FIT}</body></html>')


def photo_uri(rel):
    return (SITE / rel).as_uri()


_REG = None


def registry():
    """The site's photo registry (scripts/photos.js PHOTOS): where each picture was taken, its alt, its crop."""
    global _REG
    if _REG is None:
        out = subprocess.run(["node", "-e", "process.stdout.write(JSON.stringify(require('./scripts/photos.js').PHOTOS))"],
                             cwd=ROOT, capture_output=True, text=True, check=True).stdout
        _REG = json.loads(out)
    return _REG


def photo(rel, w, h, focus=None, pos="50% 50%"):
    """A photo filling a w x h box, clean edged. focus = (y0, y1, cx) in the original's pixels: show rows y0..y1
    (scaled up or down to fill), centred on cx (0-1) across; else object-fit cover at pos."""
    if focus:
        from PIL import Image
        nw, nh = Image.open(SITE / rel).size
        y0, y1, cx = focus
        k = max(h / (y1 - y0), w / nw)
        iw, ih = nw * k, nh * k
        left = min(0, max(w - iw, w / 2 - cx * iw))
        top = min(0, max(h - ih, h - y1 * k))
        return (f'<div style="position:relative;width:{w}px;height:{h}px;overflow:hidden">'
                f'<img src="{photo_uri(rel)}" style="position:absolute;left:{left:.1f}px;top:{top:.1f}px;width:{iw:.1f}px;height:{ih:.1f}px;max-width:none"></div>')
    return f'<img class="ph" src="{photo_uri(rel)}" style="width:{w}px;height:{h}px;object-position:{pos}">'


MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def place_month(where, ymd):
    """build-home.js placeMonth: "Phoenix · October" + 2026-10-12 -> "Phoenix · Oct 2026"."""
    place = str(where or "").split(" \u00b7 ")[0].strip()
    try:
        y, m = map(int, str(ymd).split("-")[:2])
        return f"{place} \u00b7 {MONTHS[m - 1]} {y}"
    except Exception:
        return str(where or "")


# A day's word about the mind gets 988 and Trevor on the piece itself (CLAUDE.md §4): a Story carries no caption.
import re as _re
MIND = _re.compile(r"mental|mind|anxi|depress|grief|griev|suicid|sober|sobriety|recover|therap|panic|trauma|lonel|addict|heal|self[- ]?harm|ptsd|bipolar|eating", _re.I)


def about_mind(word):
    return bool(word) and bool(MIND.search(word))


def qr_svg(url, dark=T["asphalt"], light=T["plaster"], size=200, quiet=2):
    """A QR code as inline SVG (vector in the PDFs), modules as one path, its own light tile."""
    import qrcode
    q = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=0)
    q.add_data(url); q.make(fit=True)
    m = q.get_matrix(); n = len(m); tot = n + 2 * quiet
    d = "".join(f"M{x+quiet} {y+quiet}h1v1h-1z" for y, row in enumerate(m) for x, v in enumerate(row) if v)
    return (f'<svg viewBox="0 0 {tot} {tot}" width="{size}" height="{size}" shape-rendering="crispEdges" role="img" aria-label="QR code">'
            f'<rect width="{tot}" height="{tot}" fill="{light}"/><path d="{d}" fill="{dark}"/></svg>')


def fmt_int(n):
    return f"{int(round(n)):,}"


PHX = timezone(timedelta(hours=-7))
YEAR_START = datetime(2027, 1, 1, tzinfo=PHX)


def season_words(now=None):
    """The words beside the count, as tools/lib/season.js has them."""
    now = now or datetime.now(PHX)
    return ("miles in 2027, all on the bike." if now >= YEAR_START
            else "training miles since June 1. The 10,000 start Jan 1.")


def live_miles():
    """The count: /api/strava (the one place the site reads Strava), else the committed data/tally.json."""
    try:
        out = subprocess.run(["curl", "-s", "--max-time", "15", "https://cycleforchange.org/api/strava"],
                             capture_output=True, text=True, timeout=20).stdout
        return float(json.loads(out)["miles"]), "live"
    except Exception:
        return float(json.load(open(ROOT / "data" / "tally.json"))["miles"]), "data/tally.json"


def riding():
    """His 2027 rides, the calendar's own list (scripts/chrome.js RIDING)."""
    out = subprocess.run(["node", "-e", "process.stdout.write(JSON.stringify(require('./scripts/chrome.js').RIDING))"],
                         cwd=ROOT, capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def ride_counts():
    """The homepage's numbers (scripts/build-home.js RN): listed rides from live.json, countries outside the US."""
    rides = json.load(open(SITE / "rides" / "live.json"))
    abroad = {r.get("country") for r in rides if r.get("country") and r.get("country") != "US"}
    return len(rides), len(abroad)


def stats():
    return json.load(open(ROOT / "data" / "stats" / "stat-bank.json"))["stats"]


TYPE_LABEL = {"harm": "Hard truth", "hope": "What helps", "visibility": "Being seen"}
HELP = "If it’s now: 988, call or text, any hour. Trevor Project 1-866-488-7386."


def help_html():
    """The help line, escaped, with the phone number kept on one line."""
    return esc(HELP).replace("1-866-488-7386", '<span style="white-space:nowrap">1-866-488-7386</span>')
