import asyncio
from post import blk, scr, row, FIT
from lib import *
W,Hh=1080,1920
# Reels: keep words out of the top ~250 px, the bottom ~420 px (caption and buttons) and the right ~140 px (the buttons)
GLOW='filter:drop-shadow(0 0 6px rgba(20,18,24,.85)) drop-shadow(0 0 16px rgba(20,18,24,.6))'
def page(inner,bg='transparent'):
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}
html,body{{background:{bg}}}
.b{{position:relative;filter:url(#chalk7);-webkit-text-stroke:var(--sw) currentColor;white-space:nowrap;width:max-content}}
.col{{position:absolute;display:flex;flex-direction:column}} .col .scr{{position:static}}
.glow{{{GLOW}}}
</style></head><body>{DEFS}<div class="fl" style="width:{W}px;height:{Hh}px;background:{bg}">{inner}</div>{FIT}</body></html>'''
LOGO=T+'/logo-1-night.png'
jobs={
 'reel-1-logo.png':page(f'<img class="glow" src="{LOGO}" style="position:absolute;left:60px;top:300px;width:900px">'),
 'reel-2-date.png':page('<div class="col glow" style="left:70px;top:1010px">'+''.join([
     blk('STARTS',70,C['yellow'],1,sw='3.4px'),
     scr(220,C['rose'],2),
     blk('FRIDAY, DEC 11',96,C['rose'],21,fit=860,sw='4px',mt=4),
     scr(560,C['yellow'],22,h=22,sw=12),
     blk('MEET 5:30 PM · ROLL 6:00 PM',50,C['white'],5,fit=860,sw='3px',mt=8),
     scr(520,C['blue'],6),
   ])+'</div>'),
 'reel-3-place.png':page('<div class="col glow" style="left:70px;top:1080px">'+''.join([
     row('pin',C['rose'],blk('THE RAINBOW CROSSWALK',56,C['white'],7,fit=760,sw='3px'),mt=0),
     blk('CENTRAL AVE & PORTLAND ST, PHOENIX',38,C['white'],8,fit=860,sw='2.4px',mt=10,fl=5),
     scr(640,C['rose'],9),
   ])+'</div>'),
 'reel-4-miles.png':page('<div class="col glow" style="left:70px;top:1010px">'+''.join([
     blk('14 FLAT MILES',96,C['cyan'],14,fit=860,sw='4px'),
     scr(520,C['cyan'],16),
     blk('10–12 MPH PACE',80,C['orange'],15,fit=860,sw='3.6px',mt=6),
     scr(460,C['purple'],33),
     blk('NOBODY GETS DROPPED.',52,C['white'],10,fit=860,sw='3px',mt=8),
     scr(520,C['yellow'],11),
   ])+'</div>'),
 'reel-5-end.png':page(f'''<img src="{LOGO}" style="position:absolute;left:60px;top:330px;width:960px">
<div class="col" style="left:70px;top:860px">'''+''.join([
     blk('STARTS FRIDAY, DEC 11',76,C['rose'],21,fit=860,sw='3.6px'),
     scr(600,C['yellow'],22,h=22,sw=12),
     blk('MEET 5:30 · ROLL 6:00',56,C['white'],5,fit=860,sw='3px',mt=10),
     blk('THE RAINBOW CROSSWALK',48,C['white'],7,fit=860,sw='2.8px',mt=10),
     blk('CENTRAL AVE & PORTLAND ST',40,C['white'],8,fit=860,sw='2.4px',mt=4,fl=5),
     scr(620,C['blue'],6),
     blk('CYCLEFORCHANGE.ORG/FRUITLOOP',44,C['white'],41,fit=860,sw='2.6px',mt=26,fl=5),
     scr(640,C['rose'],42,h=16,sw=8),
     blk('@CYCL_EFORCHANGE',38,C['white'],51,fit=860,sw='2.2px',mt=10,fl=5),
   ])+'</div>',bg='#1A181E'),
}
async def main():
    for n,h in jobs.items():
        await shoot(h,os.path.join(H,'out',n),W,Hh,transparent=(n!='reel-5-end.png'))
asyncio.run(main())
