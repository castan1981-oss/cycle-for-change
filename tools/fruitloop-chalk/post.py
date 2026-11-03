import asyncio, sys
from lib import *
W,Hh=1080,1350
FIT='''<script>
for(const e of document.querySelectorAll('[data-fit]')){const m=+e.dataset.fit;let s=parseFloat(getComputedStyle(e).fontSize);while(e.scrollWidth>m&&s>10){s-=1;e.style.fontSize=s+'px'}}
</script>'''
def blk(txt,size,color,seed,fit=None,sw='2.4px',amp=1.0,mt=0,lh=1.14,fl=7):
    f=f' data-fit="{fit}"' if fit else ''
    return f'<div class="b"{f} style="font-size:{size}px;color:{color};--sw:{sw};margin-top:{mt}px;line-height:{lh};filter:url(#chalk{fl})">{lines(txt,seed,amp)}</div>'
def scr(w,color,seed,mt=0,ml=0,h=18,sw=10):
    return f'<div style="margin:{mt-4}px 0 -6px {ml}px;height:{h+24}px">{scribble(w,color,seed,h=h,sw=sw)}</div>'
def row(ic,color,inner,gap=14,mt=8):
    return f'<div style="display:flex;gap:{gap}px;align-items:center;margin-top:{mt}px"><div style="position:relative;width:58px;height:58px;flex:none">{icon(ic,color,58)}</div><div>{inner}</div></div>'
def html(bg,logo,W=1080,Hh=1350,logo_top=22,left_top=430,left2_top=915,right_top=470,extra='',foot_bottom=18,handle_bottom=30,LFIT=290,LFIT2=262):
    right=''.join([
      blk('MEET 5:30 PM /\nROLL 6:00 PM',47,C['white'],5,fit=318,lh=1.12,sw='3px'),
      scr(320,C['blue'],6),
      row('pin',C['rose'],blk('THE RAINBOW\nCROSSWALK',38,C['white'],7,fit=262,lh=1.1,sw='2.6px',fl=5),mt=14),
      blk('CENTRAL AVE &\nPORTLAND ST, PHOENIX',30,C['white'],8,fit=340,lh=1.16,mt=6,sw='2.1px',fl=5),
      scr(330,C['rose'],9),
      row('bike',C['rose'],blk('NOBODY GETS\nDROPPED.',28,C['white'],10,fit=262,lh=1.18,sw='2px',fl=5),mt=8),
      scr(320,C['yellow'],11),
      row('light',C['green'],blk('BRING A FRONT\nAND REAR LIGHT',28,C['white'],12,fit=262,lh=1.22,sw='2px',fl=5),mt=8),
      scr(320,C['blue'],13),
    ])
    left=''.join([
      blk('STARTS',74,C['yellow'],1,fit=LFIT,sw='3.4px'),
      scr(220,C['rose'],2),
      blk('FRIDAY\nDEC 11',112,C['rose'],21,fit=LFIT,sw='4.2px',lh=1.0,mt=4),
      scr(280,C['yellow'],22,mt=6,h=24,sw=12),
    ])
    left2=''.join([
      blk('14 FLAT\nMILES',66,C['cyan'],14,fit=LFIT2,sw='3.6px',lh=1.0),
      scr(250,C['cyan'],16),
      blk('14–16 MPH\nPACE',52,C['orange'],15,fit=LFIT2,sw='3.2px',lh=1.04,mt=6),
      scr(240,C['purple'],33),
    ])
    foot=''.join([
      blk('CYCLEFORCHANGE.ORG/FRUITLOOP',30,C['white'],41,fit=440,sw='2.2px',fl=5),
      scr(420,C['rose'],42,h=14,sw=8),
    ])
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}
.b{{position:relative;filter:url(#chalk7);-webkit-text-stroke:var(--sw) currentColor;white-space:nowrap;width:max-content}}
.col{{position:absolute;display:flex;flex-direction:column}} .col .scr{{position:static}}
</style></head><body>{DEFS}
<div class="fl" style="width:{W}px;height:{Hh}px;background:#1A181E url('{bg}') 0 0/100% 100% no-repeat">
<img src="{logo}" style="position:absolute;left:34px;top:{logo_top}px;width:1010px">
<div class="col" style="left:44px;top:{left_top}px">{left}</div>
<div class="col" style="left:44px;top:{left2_top}px">{left2}</div>
<div class="col" style="left:716px;top:{right_top}px;width:340px">{right}</div>
<div class="col" style="right:30px;bottom:{foot_bottom}px;align-items:flex-end">{foot}</div>
<div class="col" style="left:44px;bottom:{handle_bottom}px">{blk('@CYCL_EFORCHANGE',26,C['white'],51,sw='1.8px',fl=5)}</div>
{extra}</div>{FIT}</body></html>'''
if __name__=='__main__':
    out=sys.argv[1] if len(sys.argv)>1 else 'out/post.png'
    asyncio.run(shoot(html(H+'/bg-post.png',T+'/logo-1-night.png'),os.path.join(H,out),W,Hh))
