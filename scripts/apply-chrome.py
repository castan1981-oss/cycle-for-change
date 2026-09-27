#!/usr/bin/env python3
"""Put the shared site chrome (scripts/chrome.js) on the hand-written content pages.

Run from the repo root:   python3 scripts/apply-chrome.py
Safe to re-run: it replaces whatever header/footer/font link a page has with the
current one from scripts/chrome.js. Pages covered: every .html under
cfc-site/guides, field-notes, resources and journal (templates included).

What it does to each page
  - fonts: Outfit + Space Mono (no Fraunces, Anton, Space Grotesk)
  - stylesheets: /events/events.css (base + chrome) then /styles.css (reading)
  - the top <header> (and the old .util tally bar) -> the shared .site-head
  - <footer> -> the shared .site-foot (with 988 + Trevor Project)
  - /field-notes/field-notes.js -> /events/events.js (guarded mileage paint)
  - homepage anchors that no longer exist -> ones that do
"""
import json, re, subprocess, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = ROOT / "cfc-site"
C = json.loads(subprocess.check_output(["node", str(ROOT / "scripts/chrome.js")]))

FONT_RE = re.compile(
    r'(?:<link rel="preconnect" href="https://fonts\.googleapis\.com">\s*)?'
    r'(?:<link rel="preconnect" href="https://fonts\.gstatic\.com" crossorigin>\s*)?'
    r'<link href="https://fonts\.googleapis\.com/css2\?[^"]*" rel="stylesheet">')
ANCHORS = {'href="/#tally"': 'href="/"', 'href="/#rides"': 'href="/#ride"',
           'href="/#disciplines"': 'href="/#pledge"'}
RETIRED_INLINE = [
    ' style="color:var(--cream);border-bottom-color:var(--cream);"',
    ' style="color:var(--yellow);border-bottom:1px solid var(--yellow);"',
    ' style="border:1px solid rgba(255,255,255,.2);"',
    ' style="border-color:var(--yellow-deep);"',
]


def chrome(s: str) -> str:
    s = FONT_RE.sub(C["FONTS"], s, count=1)
    if "/events/events.css" not in s:
        s = s.replace('<link rel="stylesheet" href="/styles.css">',
                      '<link rel="stylesheet" href="/events/events.css">\n  <link rel="stylesheet" href="/styles.css">', 1)
    # old tally strip above/inside the header
    s = re.sub(r'<div class="util">\s*<div class="wrap">.*?</div>\s*</div>\s*', '', s, flags=re.S)
    # top-level header only (inner mastheads carry a class and are left alone)
    s = re.sub(r'(?:<a class="skip"[^>]*>[^<]*</a>\s*)?<header(?: class="site-head")?>.*?</header>', lambda m: C["HEADER"], s, count=1, flags=re.S)
    s = re.sub(r'<footer(?: class="site-foot")?>.*?</footer>', lambda m: C["FOOTER"], s, count=1, flags=re.S)
    s = re.sub(r'<main(?![^>]*\bid=)', '<main id="main"', s, count=1)
    s = s.replace('/field-notes/field-notes.js', '/events/events.js')
    for a, b in ANCHORS.items():
        s = s.replace(a, b)
    for x in RETIRED_INLINE:
        s = s.replace(x, "")
    return s


def main():
    pages = []
    for d in ("guides", "field-notes", "resources", "journal"):
        pages += sorted((SITE / d).rglob("*.html"))
    for p in pages:
        s = p.read_text()
        t = chrome(s)
        if t != s:
            p.write_text(t)
        print(("updated " if t != s else "same    ") + str(p.relative_to(ROOT)))


if __name__ == "__main__":
    sys.exit(main())
