#!/usr/bin/env python3
"""Put the shared site chrome (scripts/chrome.js) on the hand-written pages.

Run from the repo root:   python3 scripts/apply-chrome.py
Safe to re-run: it rebuilds each page's <head>, header and footer from the
current scripts/chrome.js. Pages covered: every .html under cfc-site/guides,
field-notes, resources, journal, tonight, nov7, cyclefor, privacy, methodology, contact and fruitloop
(templates included), plus 404.html.

What it does to each page
  - <head>: keeps the page's title, description, canonical, og:type and JSON-LD,
    regenerates everything else (fonts, share tags, icons, /chrome.css + the
    section's own stylesheets) through CHROME.head() so it matches the generators
  - the top <header> (+ any old tally bar) -> the shared header, menu and tally line
  - <footer> -> the shared footer (988 + Trevor Project, mile updates signup)
  - the end-of-page CTA (.fn-cta) -> the shared pledge block (CHROME.PLEDGE);
    resources pages get the crisis line first and a quiet "why this page is here"
    note instead of the pledge block
  - button classes -> the homepage's (.btn--bone / .btn--ink / .btn--ghost / .link)
  - homepage anchors that no longer exist -> ones that do
  - studio pass 1 (Oct 21, 2026): nothing in <main> comes after the closing block. A page's back link and notes
    (.fn-back, .fn-note) move above it, so the closing field and the footer are one ending. Stylesheets carry
    scripts/chrome.js's CSS_V (head() versions them; an old ?v= on a section sheet is replaced).
  - resources pages: the "Right now" crisis lines sit right under the h1, ahead of the intro (§4)
"""
import json, re, subprocess, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = ROOT / "cfc-site"
NODE = ["node", str(ROOT / "scripts/chrome.js")]
C = json.loads(subprocess.check_output(NODE))

SECTION_STYLES = {  # stylesheets after /chrome.css, by top-level folder
    "guides": ["/styles.css"], "field-notes": ["/styles.css"], "resources": ["/styles.css"],
    "journal": ["/styles.css"], "tonight": ["/tonight/tonight.css"], "nov7": ["/nov7/nov7.css"], "cyclefor": ["/cyclefor/cyclefor.css"], "": ["/styles.css"],
}
ANCHORS = {'href="/#tally"': 'href="/"', 'href="/#rides"': 'href="/#ride"',
           'href="/#disciplines"': 'href="/"', 'href="/#pledge"': 'href="/"',
           'href="/#board"': 'href="/"', 'href="/#vote"': 'href="/#orgs"', 'href="#top"': 'href="/"', 'href="/pledge/"': 'href="/#orgs"', 'href="/pledge/#questions"': 'href="/#how"', 'href="/pledge/#vote"': 'href="/#orgs"'}
CLASSES = [(r'class="btn btn-y"', 'class="btn btn--bone"'), (r'class="btn btn-solid"', 'class="btn btn--ink"'),
           (r'class="btn btn-dark"', 'class="btn btn--ghost"'), (r'class="btn-link"', 'class="link"'),
           (r'class="btn"', 'class="btn btn--ghost"')]
RETIRED_INLINE = [
    ' style="color:var(--cream);border-bottom-color:var(--cream);"',
    ' style="color:var(--yellow);border-bottom:1px solid var(--yellow);"',
    ' style="border:1px solid rgba(255,255,255,.2);"',
    ' style="border-color:var(--yellow-deep);"',
]


def meta(s, name, attr="name"):
    m = re.search(r'<meta %s="%s" content="([^"]*)"' % (attr, re.escape(name)), s)
    return m.group(1) if m else ""


def new_head(s, page):
    old = re.search(r"<head>(.*?)</head>", s, re.S).group(1)
    title = re.search(r"<title>(.*?)</title>", old, re.S).group(1).strip()
    title = re.sub(r"\s*[—–|]\s*Cycle for Change\s*$", "", title)   # head() adds the brand once
    desc = meta(old, "description") or meta(old, "og:description", "property")
    canon = re.search(r'<link rel="canonical" href="([^"]+)"', old)
    url = canon.group(1) if canon else "https://cycleforchange.org/" + page.relative_to(SITE).as_posix().replace("index.html", "")
    ogtype = meta(old, "og:type", "property") or "website"
    ld = [json.loads(m) for m in re.findall(r'<script type="application/ld\+json">(.*?)</script>', old, re.S)]
    # page-specific bits that survive the rebuild: noindex, <style> blocks, inline non-LD scripts
    keep = re.findall(r'<meta name="robots" content="noindex[^>]*>', old)
    keep += re.findall(r'<style>.*?</style>', old, re.S)
    keep += [m for m in re.findall(r'<script(?![^>]*ld\+json)[^>]*>.*?</script>', old, re.S)]
    extra = "\n".join("  " + k.strip() for k in keep)
    top = page.relative_to(SITE).parts[0] if len(page.relative_to(SITE).parts) > 1 else ""
    dark = 'content="dark"' in old or 'class="theme-dark"' in s
    spec = {"title": title, "description": desc, "url": url, "ogType": ogtype, "dark": dark,
            "styles": SECTION_STYLES.get(top, ["/styles.css"]), "ld": ld, "extra": extra}
    # a page with its own share card (/nov7/) keeps it: image, alt, and a share title that isn't "<title> — Cycle for Change"
    img = meta(old, "og:image", "property")
    if img and img != C["OG_IMAGE"]:
        spec["image"] = img
        spec["imageAlt"] = meta(old, "og:image:alt", "property")
    ogt = meta(old, "og:title", "property")
    if ogt and ogt != title and ogt != title + " — Cycle for Change" and "Cycle for Change" not in ogt:
        spec["ogTitle"] = ogt
    if keep and keep[0].startswith('<meta name="robots"'):   # one robots tag: the page's own noindex replaces the default
        spec["robots"] = re.search(r'content="([^"]*)"', keep[0]).group(1)
        spec["extra"] = "\n".join("  " + k.strip() for k in keep[1:])
    head = subprocess.check_output(NODE + ["head", json.dumps(spec)]).decode()
    return s.replace("<head>" + old + "</head>", "<head>\n" + head + "\n</head>", 1)


def chrome(s: str, page) -> str:
    s = new_head(s, page)
    s = re.sub(r'<div class="util">\s*<div class="wrap">.*?</div>\s*</div>\s*', "", s, flags=re.S)
    # skip link + top-level header (+ an already-applied menu and tally line)
    s = re.sub(r'(?:<a class="skip"[^>]*>[^<]*</a>\s*)?<header(?: class="(?:site-head|nav site-head|head wrap)"[^>]*)?>.*?</header>'
               r'(?:\s*<div class="menu" id="menu".*?</div>\s*</div>)?(?:\s*<p class="tally-line">.*?</p>)?',
               lambda m: C["HEADER"], s, count=1, flags=re.S)
    s = re.sub(r'<footer(?: class="[^"]*")?>.*?</footer>(?:\s*<script src="/(?:chrome|events/events|field-notes/field-notes)\.js(?:\?v=\d+)?" defer></script>)*',
               lambda m: C["FOOTER"], s, count=1, flags=re.S)
    s = re.sub(r'<main(?![^>]*\bid=)', '<main id="main"', s, count=1)
    # the end-of-page pledge block: one shared component
    s = re.sub(r'<(div|section) class="fn-cta"[^>]*>.*?</\1>(?=\s*(?:<p class="fn-back"|<p class="fn-note"|</main>))', lambda m: C["PLEDGE"], s, count=1, flags=re.S)
    # ...and a page that already carries it gets the current one (Oct 5, 2026: eighteen hand pages still
    # said "Pledge a mile" a pass after the pledge was gone, because only .fn-cta was ever swapped)
    s = re.sub(r'<section class="pledge" aria-labelledby="pledge-h">.*?</section>', lambda m: C["PLEDGE"], s, count=1, flags=re.S)
    s = ending_last(s)
    s = re.sub(r'\s*<script src="/(?:events/events|field-notes/field-notes|rides/tally)\.js" defer></script>', "", s)
    for a, b in ANCHORS.items():
        s = s.replace(a, b)
    for a, b in CLASSES:
        s = re.sub(a, b, s)
    for x in RETIRED_INLINE:
        s = s.replace(x, "")
    if "/resources/" in str(page) or page.parent.name == "resources" or "resources" in page.parts:
        s = resources(s)
    return s


WHY = '''<div class="fn-why">
    <p class="eyebrow">Why this page is here</p>
    <p>Riding is part of what kept me steady before I had the words for anything. Cycle for Change rides for the kinds of orgs on this page: in 2027 I ride 10,000 miles, and the money goes through those orgs&rsquo; own rides. That&rsquo;s the connection. <a href="/#orgs">The orgs I ride for</a></p>
  </div>'''


def resources(s: str) -> str:
    """Resources pages break two rules on purpose: the crisis line comes before the
    intro, and the page closes with a quiet note instead of the pledge block.
    Studio pass 1: on /resources/ the crisis line is the "Right now" door (988, Trevor, 911): the doors come right
    after the h1 and the intro after them (doors_first). The age pages keep their aside right under the h1."""
    s = doors_first(s)
    m = re.search(r'\s*<aside class="fn-crisis">.*?</aside>', s, re.S)
    if m and "</h1>" in s and s.index("</h1>") < m.start():
        aside = m.group(0).strip()
        s = s[:m.start()] + s[m.end():]
        s = s.replace("</h1>", "</h1>\n        " + aside, 1)
    s = re.sub(r'<section class="pledge" aria-labelledby="pledge-h">.*?</section>', WHY, s, count=1, flags=re.S)
    s = re.sub(r'<div class="fn-why">.*?</div>', WHY, s, count=1, flags=re.S)   # and refresh the note once it's there
    return s


def doors_first(s: str) -> str:
    """/resources/ (brief item 10): h1, then the three doors (Right now first: 988, Trevor, 911), then the intro. That
    keeps both of §4's rules, "crisis line right under the h1" and "opens on three doors". The intro and its line move
    out of the header to just after the doors (same words), once; a page that already has them there is left alone."""
    if 'class="wrap res-intro"' in s or 'class="res-doors-wrap"' not in s:
        return s
    m = re.search(r'\n(\s*)<p class="fn-pillar-intro">.*?</p>\s*(?:<div class="fn-line"[^>]*>.*?</div>\s*)?(?=</div>\s*</header>)', s, re.S)
    if not m:
        return s
    intro = m.group(0).strip()
    s = s[:m.start()] + "\n" + s[m.end():]
    d = re.search(r'(<section class="res-doors-wrap"[^>]*>.*?</section>)', s, re.S)
    return s[:d.end()] + '\n\n    <div class="wrap res-intro">\n      ' + intro + '\n    </div>' + s[d.end():]


def ending_last(s: str) -> str:
    """Studio pass 1: the closing block is the last thing in <main>. Whatever a hand page put after it (a back
    link, a note) moves to just before it, in the same order; the 988 help bar stays where it is (it's fixed)."""
    m = re.search(r'(\n?[ \t]*)(<section class="pledge" aria-labelledby="pledge-h">.*?</section>)(.*?)(\s*(?:<a class="help-bar"[^>]*>.*?</a>\s*)?</main>)', s, re.S)
    if not m or not m.group(3).strip():
        return s
    moved = m.group(3).strip()
    return s[:m.start()] + m.group(1) + moved + m.group(1) + m.group(2) + m.group(4) + s[m.end():]


def main():
    pages = [SITE / "404.html"]
    for d in ("guides", "field-notes", "resources", "journal", "tonight", "nov7", "cyclefor", "privacy", "methodology", "contact", "fruitloop"):
        pages += sorted((SITE / d).rglob("*.html"))
    for p in pages:
        s = p.read_text()
        t = chrome(s, p)
        if t != s:
            p.write_text(t)
        print(("updated " if t != s else "same    ") + str(p.relative_to(ROOT)))


if __name__ == "__main__":
    sys.exit(main())
