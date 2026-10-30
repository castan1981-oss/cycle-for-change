"""Posts (1080 x 1350) and Stories (1080 x 1920) for Instagram, in the site's look.

Every line on them is a line the site already says (the hero's caption, the sign's question, the find count, the
2027 list's head) or comes from the data (the count, the rides, the stat bank). Nothing is laid over a photo: a
picture and a solid field sit one above the other, clean edged. Stories keep the top 200 px and the bottom 330 px
clear of words for Instagram's own bars.
"""
import json
from datetime import date
from lib import *

SZ = {"post": (1080, 1350), "story": (1080, 1920)}
M = 64                                    # side margin
MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
FOR = {"center-ride-out": "the Center", "cycle-to-zero": "SFAF"}   # the homepage's plates (build-home.js FOR)

CSS = f"""
.field{{position:absolute;left:0;right:0;display:flex;flex-direction:column}}
.in{{padding:0 {M}px}}
.foot{{display:flex;justify-content:space-between;align-items:baseline;font-weight:700;font-size:26px}}
.lab{{font-weight:700;font-size:30px;line-height:1.2}}
.big{{font-weight:800;letter-spacing:-.018em;line-height:1.02}}
.body{{font-weight:400;line-height:1.32}}
"""


def foot(color, left="cycleforchange.org", right="@cycl_eforchange"):
    return f'<div class="foot in" style="color:{color}"><span>{esc(left)}</span><span>{esc(right)}</span></div>'


def split(size, ph, ph_h, bg, inner, foot_html, cap_color):
    """A photo edge to edge on top, its place · month line under it on the field's left edge (CLAUDE.md §10), the
    words under that, the foot at the field's foot (Stories: above the clear zone). ph = {rel, where, focus | pos}."""
    W, H = SZ[size]
    bottom = 330 if size == "story" else 52
    cap = f'<p class="in" style="font-weight:700;font-size:22px;color:{cap_color};margin-bottom:{34 if size=="post" else 44}px">{esc(ph["where"])}</p>' if ph.get("where") else ""
    return (f'{photo(ph["rel"], W, ph_h, focus=ph.get("focus"), pos=ph.get("pos", "50% 50%"))}'
            f'<div class="field" style="top:{ph_h}px;bottom:0;background:{bg};padding:22px 0 {bottom}px">'
            f'{cap}<div style="flex:1">{inner}</div>{foot_html}</div>')


def reg_photo(key, **kw):
    r = registry()[key]
    return dict(rel=f"photos/{key}.jpg", where=r["where"], pos=r.get("pos", "50% 50%"), **kw)


# —— 1. who: the count and the year, his photo (cropped to the waist) ——
def intro(size):
    W, H = SZ[size]
    ph = 740 if size == "post" else 1040
    inner = (f'<div class="in">{sign(560, T["plaster"], T["powder"], T["asphalt"], "change")}'
             f'<p class="big" style="color:{T["plaster"]};font-size:{50 if size=="post" else 58}px;margin-top:40px">'
             f'10,000 miles. One year.<br>All on the bike.</p></div>')
    pic = reg_photo("robert-camelback", focus=(500 if size == "post" else 430, 1480, 0.62))
    return page(split(size, pic, ph, T["asphalt"], inner, foot(T["patina"]), T["patina"]), CSS, W, H, T["asphalt"])


# —— 2. the sign's question ——
def who(size):
    W, H = SZ[size]
    top = 120 if size == "post" else 300
    q = 100 if size == "post" else 112
    inner = (f'<div class="in" style="padding-top:{top}px">{stencil(660 if size=="post" else 760, T["asphalt"], T["rose"], stacked=True)}'
             f'<p class="big" style="color:{T["asphalt"]};font-size:{q}px;margin-top:{70 if size=="post" else 110}px">Who do you<br>cycle for?</p>'
             f'<p class="body" style="color:{T["gunmetal"]};font-size:{36 if size=="post" else 42}px;margin-top:28px;max-width:860px">'
             f'Say it on video. Five seconds. Post it and tag @cycl_eforchange.</p></div>')
    bottom = 52 if size == "post" else 330
    return page(f'<div class="field" style="top:0;bottom:0;padding-bottom:{bottom}px"><div style="flex:1">{inner}</div>'
                f'{foot(T["gunmetal"], "cycleforchange.org/cyclefor", "")}</div>', CSS, W, H, T["concrete"])


# —— 3. the ride and who it was for: the homepage's #today (data/today.json), or --for/--date/--photo ——
# t = {word, label, photo: {rel, where, pos} | None}. The label is the homepage's dated line ("The ride on Monday,
# October 12."), never "today", so a post that goes up later still tells the truth. A word about the mind brings
# 988 and Trevor onto the piece.
def help_line(color, size_px):
    return f'<p class="body" style="font-size:{size_px}px;color:{color};margin-top:26px;font-weight:700;max-width:900px">{help_html()}</p>'


def today(size, t):
    W, H = SZ[size]
    word = t["word"]
    wrap = word is None or len(word) > 8
    helps = help_line(T["plaster"], 24 if size == "post" else 28) if about_mind(word) else ""
    body = (f'<p class="lab" style="color:{T["patina"]};margin-bottom:26px">{esc(t["label"])}</p>'
            f'{sign(520 if size=="post" else 600, T["plaster"], T["powder"], T["asphalt"], word, wrap=wrap)}{helps}')
    if t.get("photo"):
        ph = 720 if size == "post" else 980
        return page(split(size, t["photo"], ph, T["tar"], f'<div class="in">{body}</div>', foot(T["patina"]), T["patina"]),
                    CSS, W, H, T["tar"])
    top = 200 if size == "post" else 420
    bottom = 52 if size == "post" else 330
    return page(f'<div class="field" style="top:0;bottom:0;padding-bottom:{bottom}px"><div style="flex:1"><div class="in" style="padding-top:{top}px">'
                f'{body.replace('class="lab" style="', 'class="lab" style="font-size:40px;')}</div></div>{foot(T["patina"])}</div>', CSS, W, H, T["tar"])


# —— 4. a stat from the bank: ground by kind (hard truth on asphalt, what helps on patina, being seen on concrete) ——
GROUND = {"harm": (T["asphalt"], T["plaster"], T["patina"], T["powder"]),
          "hope": (T["patina"], T["asphalt"], T["pool"], T["rose"]),
          "visibility": (T["concrete"], T["asphalt"], T["gunmetal"], T["rose"])}


def stat(size, s):
    W, H = SZ[size]
    bg, ink, soft, bar = GROUND[s["type"]]
    top = 96 if size == "post" else 260
    help_ = f'<p class="body" style="font-size:24px;color:{ink};margin-top:14px;font-weight:700">{help_html()}</p>' if s.get("mh") else ""
    src = f'{s["org"]}, {s["report"]}, {s["year"]}.'
    inner = (f'<div class="in" style="padding-top:{top}px">'
             f'<p class="lab" style="color:{soft}">{esc(TYPE_LABEL[s["type"]])}</p>'
             f'<p class="num" data-fit="{W-2*M}" style="color:{ink};font-size:{380 if size=="post" else 420}px;margin-top:40px;white-space:nowrap">{esc(s["number"])}</p>'
             f'<p class="big" data-fit="{W-2*M}" data-fith="{330 if size=="post" else 480}" style="color:{ink};font-size:{56 if size=="post" else 64}px;margin-top:52px;font-weight:700;letter-spacing:-.012em;line-height:1.14">{esc(s["stat"])}</p>'
             f'<p class="body" data-fit="{W-2*M}" data-fith="{110 if size=="post" else 150}" style="color:{soft};font-size:{38 if size=="post" else 44}px;margin-top:30px;line-height:1.24">{esc(s["why"])}</p>'
             f'</div>')
    lower = (f'<div class="in"><p class="body" style="font-size:22px;color:{soft};line-height:1.35">Source: {esc(src)}</p>'
             f'<p class="body" style="font-size:22px;color:{soft};line-height:1.35;margin-top:4px">{esc(s["caveat"])}</p>{help_}'
             f'<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:36px">'
             f'{stencil(300, ink, bar)}<span style="font-weight:700;font-size:26px;color:{soft}">cycleforchange.org</span></div></div>')
    bottom = 52 if size == "post" else 330
    return page(f'<div class="field" style="top:0;bottom:0;padding-bottom:{bottom}px"><div style="flex:1">{inner}</div>{lower}</div>',
                CSS, W, H, bg)


# —— 5. Ride with me: the next of his 2027 rides ——
def when(r):
    if not r.get("start"):
        return "2027", "TBA"
    y, m, d = map(int, r["start"].split("-"))
    if r.get("end") and r["end"] != r["start"]:
        y2, m2, d2 = map(int, r["end"].split("-"))
        days = f"{d}–{d2}" if m2 == m else f"{d}–{MON[m2-1]} {d2}"
    else:
        days = str(d)
    return MON[m - 1], days


def kind(r):
    return f'{r["days"]} days' if r["category"] == "Charity ride" else r["category"].lower()


def ride(size, r, n_rides):
    W, H = SZ[size]
    ph = 620 if size == "post" else 880
    mon, days = when(r)
    dow = DOW[date.fromisoformat(r["start"]).weekday()] if r.get("start") else ""
    plate = f'{dow + ", " if dow and r.get("days") == 1 else ""}{mon} {days}'
    line = " \u00b7 ".join(x for x in [r["where"], kind(r)] if x)
    inner = (f'<div class="in"><p class="lab" style="color:{T["gunmetal"]}">Ride with me</p>'
             f'<p class="big" data-fit="{W-2*M}" style="color:{T["asphalt"]};font-size:{96 if size=="post" else 104}px;margin-top:18px;white-space:nowrap">{esc(r["name"])}</p>'
             f'<div style="display:flex;align-items:center;gap:22px;margin-top:30px">'
             f'<span class="plate" style="background:{T["rose"]};color:{T["plaster"]};font-size:52px;padding:12px 18px 6px">{esc(plate)}</span>'
             f'<span class="num" style="font-size:52px;color:{T["asphalt"]};letter-spacing:-.02em">2027</span></div>'
             f'<p class="body" style="color:{T["gunmetal"]};font-size:34px;margin-top:26px">{esc(line)}</p>'
             f'<p class="body" style="color:{T["asphalt"]};font-size:30px;margin-top:{20 if size=="post" else 40}px;font-weight:700">'
             f'All my 2027 rides, with sign-up links.</p></div>')
    pic = reg_photo("robert-desert", focus=(560 if size == "post" else 470, 1400, 0.62))
    return page(split(size, pic, ph, T["concrete"], inner, foot(T["gunmetal"], "cycleforchange.org/2027"), T["gunmetal"]),
                CSS, W, H, T["concrete"])


# —— 6. the 2027 list ——
def year(size, rides, lottery=()):
    W, H = SZ[size]
    rows = []
    for i, r in enumerate(rides):
        soft = r["status"] != "confirmed"
        note = "date projected" if r["status"] == "projected" else "2027 dates to come" if r["status"] == "tba" else \
               "entry by lottery" if r["slug"] in lottery else ""
        line = " · ".join(x for x in [r["where"], kind(r), note] if x)
        mon, days = when(r)
        pl = (f' <span class="plate" style="background:{T["rose"]};color:{T["plaster"]};font-size:18px;padding:5px 7px 2px;vertical-align:3px">'
              f'{esc(FOR[r["slug"]])}</span>') if r["slug"] in FOR else ""
        rows.append(
            f'<li style="display:flex;gap:18px;align-items:center;opacity:{.62 if soft else 1}">'
            f'<span style="flex:none;width:86px;height:82px;border:2px {"dashed" if soft else "solid"} {T["asphalt"]};display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1">'
            f'<span style="font-size:18px;font-weight:700">{mon}</span><span class="num" style="font-size:{27 if len(days)>4 else 32}px;margin-top:5px;letter-spacing:-.02em">{days}</span></span>'
            f'<span style="min-width:0"><b data-fit="356" style="font-size:27px;font-weight:800;display:inline-block;white-space:nowrap;letter-spacing:-.01em">{esc(r["name"])}{pl}</b>'
            f'<span style="font-size:19px;color:{T["gunmetal"]};display:block;margin-top:4px;line-height:1.22">{esc(line)}</span></span></li>')
    cols = 2
    top = 88 if size == "post" else 230
    gap = 30 if size == "post" else 52
    inner = (f'<div class="in" style="padding-top:{top}px;color:{T["asphalt"]}">'
             f'<p class="big" style="font-size:{78 if size=="post" else 92}px">The 2027 rides<br>I’m doing.</p>'
             f'<p class="body" style="font-size:30px;color:{T["gunmetal"]};margin-top:20px">Part of the 10,000 miles. Come ride one.</p>'
             f'<div class="hair" style="margin:{36 if size=="post" else 48}px 0 {30 if size=="post" else 40}px;opacity:1;border-color:{T["asphalt"]};border-top-width:2px"></div>'
             f'<ol style="list-style:none;display:grid;grid-template-columns:repeat({cols},minmax(0,1fr));grid-auto-flow:column;grid-template-rows:repeat({-(-len(rides)//cols)},auto);gap:{gap}px 28px">{"".join(rows)}</ol></div>')
    bottom = 52 if size == "post" else 330
    return page(f'<div class="field" style="top:0;bottom:0;padding-bottom:{bottom}px"><div style="flex:1">{inner}</div>'
                f'{foot(T["gunmetal"], "cycleforchange.org/2027", "")}</div>', CSS, W, H, T["concrete"])


# —— 7. Find a group ride (the homepage's count line) ——
def find(size, n, abroad):
    W, H = SZ[size]
    top = 110 if size == "post" else 280
    inner = (f'<div class="in" style="padding-top:{top}px;color:{T["plaster"]}">'
             f'<p class="big" style="font-size:{84 if size=="post" else 96}px">Find a group ride.</p>'
             f'<p class="num" style="font-size:{300 if size=="post" else 330}px;margin-top:{80 if size=="post" else 140}px">{fmt_int(n)}</p>'
             f'<p class="big" style="font-size:{44 if size=="post" else 52}px;margin-top:34px;font-weight:700;line-height:1.16">group rides in the directory, each with the date it was last checked.</p>'
             f'<p class="body" style="font-size:{32 if size=="post" else 38}px;color:{T["patina"]};margin-top:28px">Every state, {abroad} more countries. Shop rides, no-drop rides, queer rides.</p></div>')
    bottom = 52 if size == "post" else 330
    return page(f'<div class="field" style="top:0;bottom:0;padding-bottom:{bottom}px"><div style="flex:1">{inner}</div>'
                f'{foot(T["patina"], "cycleforchange.org/rides", "")}</div>', CSS, W, H, T["pool"])


# —— 8. the count: one plain number, never against 10,000 ——
def miles(size, n, words):
    W, H = SZ[size]
    ph = 560 if size == "post" else 780
    inner = (f'<div class="in" style="color:{T["plaster"]}">'
             f'<p class="num" style="font-size:{280 if size=="post" else 320}px">{fmt_int(n)}</p>'
             f'<p class="big" style="font-size:{46 if size=="post" else 54}px;margin-top:30px;font-weight:700;line-height:1.16;max-width:900px">{esc(words)}</p></div>')
    return page(split(size, reg_photo("robert-selfie-camelback"), ph, T["asphalt"], inner, foot(T["patina"]), T["patina"]),
                CSS, W, H, T["asphalt"])
