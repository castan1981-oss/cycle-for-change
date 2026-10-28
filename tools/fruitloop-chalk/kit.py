"""The rest of the Fruit Loop launch kit in the chalk look: the announcement carousel, the seven place cards,
the Stories, the 11 x 17 poster, the stickers, the coming-soon teasers, the survey and the jersey.

    python3 tools/fruitloop-chalk/kit.py            # writes .build/out/kit/<board>.png

Copy follows Robert's flyer rules (Oct 27): never "free", "every Friday", "18 and up" or "hosted by".
The place stories are the sourced ones from the page (see the page's note for the sources)."""
import asyncio, os, io, base64, qrcode, random, math, sys, subprocess, json
from post import blk, scr, row, FIT
from lib import *
OUT=os.path.join(H,'out','kit'); os.makedirs(OUT,exist_ok=True)
LOGO=T+'/logo-1-night.png'
MUTE='#A9BDB8'
LOOP_D="M493 936 L537 937 L536 1141 L645 1140 L643 1187 L179 1188 L183 1004 L180 718 L237 717 L235 669 L280 669 L309 662 L319 698 L393 699 L413 705 L414 474 L413 459 L401 445 L400 432 L413 409 L414 129 L338 129 L338 120 L325 119 L337 82 L339 29 L461 4 L494 7 L494 2 L547 7 L601 18 L659 37 L665 37 L665 27 L647 26 L647 35 L709 42 L778 69 L801 86 L800 354 L860 355 L859 395 L871 411 L854 417 L855 507 L800 507 L799 910 L755 910 L754 965 L513 965 L514 937 L493 936 L493 944 L502 944 L502 1009 L490 1007"
PLACES={ # point on the loop, label spot, name, when, story (sourced; the page's note has the sources)
 1:((493,936),(398,880),'THE CROSSWALK','START, 2018','The city painted it in July 2018 to mark Roosevelt as Phoenix’s first gayborhood. Half a block south, Cruisin’ Central opened in 1977. You went in through the alley.'),
 2:((464,1186),(500,1110),'OLD CITY HALL','MILE 2, 1975','In 1975 Sam Burnett and Tony Secuya got a marriage license here and married in their apartment on 2nd Avenue. A judge voided it. Arizona caught up on October 17, 2014.'),
 3:((179,1188),(215,1110),'THE CAPITOL','MILE 3, 1981','In 1981 somewhere between 600 and 1,000 people marched from Patriots Square down Washington Street to the Capitol. We ride their route.'),
 4:((414,194),(520,205),'THE TRANS FLAG','MILE 7, 1999','In 1999 Monica Helms, a Navy veteran, designed the trans pride flag at her home near here, Indian School and 3rd Avenue. It flew for the first time at Phoenix Pride in 2000, half a mile east in Steele Indian School Park.'),
 5:((327,115),(250,40),'THE CURVE','THE STOP, MILE 8','Phoenix is a grid of straight lines. Seventh Avenue bends here, in the middle of Melrose, and the city painted the second rainbow crosswalk right in the bend. Our one stop. Charlie’s is under a mile up the street.'),
 6:((514,949),(650,880),'THE FRUIT LOOP','MILE 14, 1940S TO 1990S','Roosevelt, 3rd, Portland, 1st: the old bar circuit we’re named for. In 1964 police raided 915 N 1st St and the paper printed the names of the 23 people arrested. So we never post who rides with us.'),
 7:((490,1007),(390,1080),'COFFEE','THE FINISH, MILE 14.5','Three blocks south of the crosswalk, over coffee. The spot gets named once it’s set. Stay for one or roll home. Nobody has to buy anything.'),
}
PCOL={1:C['rose'],2:C['cyan'],3:C['orange'],4:C['pink'],5:C['yellow'],6:C['green'],7:C['purple']}
def ring(cx,cy,r,seed):
    rnd=random.Random(seed); pts=[]
    for k in range(0,380,12):
        a=math.radians(k-90); rr=r*(1+rnd.uniform(-.05,.05)); pts.append((cx+rr*math.cos(a),cy+rr*math.sin(a)))
    return 'M'+' L'.join(f'{x:.1f} {y:.1f}' for x,y in pts)
def loop_svg(w,h,hi=None,nums=True,stroke=22,col=None):
    col=col or C['rose']; g=''
    if nums:
        for n,((px,py),(lx,ly),*_ ) in PLACES.items():
            big = (n==5) or (n==hi); r=58 if big else 44
            c=PCOL[n] if (hi is None or n==hi) else '#6B6F78'
            g+=f'<path d="M{px} {py} L{lx} {ly}" stroke="{c}" stroke-width="5" fill="none" stroke-linecap="round"/>'
            g+=f'<circle cx="{lx}" cy="{ly}" r="{r-4}" fill="#1A181E"/><path d="{ring(lx,ly,r,n)}" stroke="{c}" stroke-width="9" fill="none" stroke-linecap="round"/>'
            g+=f'<text x="{lx}" y="{ly+ (22 if big else 17)}" text-anchor="middle" font-family="chalk" font-size="{64 if big else 50}" fill="{C["white"] if (hi is None or n==hi) else "#8A8E96"}" stroke="{C["white"] if (hi is None or n==hi) else "#8A8E96"}" stroke-width="2">{n}</text>'
    dim = '' if hi is None else 'opacity=".55"'
    return f'''<svg viewBox="-70 -60 1190 1310" width="{w}" height="{h}" style="display:block;overflow:visible" aria-hidden="true">
<g filter="url(#chalk11)"><path d="{LOOP_D}" fill="none" stroke="{col}" stroke-width="{stroke}" stroke-linejoin="round" stroke-linecap="round" {dim}/>{g}</g></svg>'''
def qr_png(url,size=12):
    q=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M,box_size=size,border=3); q.add_data(url); q.make(fit=True)
    b=io.BytesIO(); q.make_image(fill_color=(26,24,30),back_color=(244,241,236)).save(b,'PNG')
    return 'data:image/png;base64,'+base64.b64encode(b.getvalue()).decode()
def page(W,Hh,inner,bg='#1A181E',extra_css=''):
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>{BASE_CSS}
.b{{position:relative;filter:url(#chalk7);-webkit-text-stroke:var(--sw) currentColor;white-space:nowrap;width:max-content}}
.col{{display:flex;flex-direction:column}} .col .scr,.scr{{position:static}}
.abs{{position:absolute}}
{extra_css}</style></head><body>{DEFS}<div class="fl" style="width:{W}px;height:{Hh}px;background:{bg}">{inner}</div>{FIT}</body></html>'''
def para(txt,size,color,seed,width,sw='1.6px',lh=1.3,mt=0):
    """Wrapped chalk text for the longer lines (stories, answers)."""
    words=txt.upper().split(' ')
    return f'<div style="position:relative;filter:url(#chalk5);-webkit-text-stroke:{sw} currentColor;font-size:{size}px;color:{color};line-height:{lh};width:{width}px;margin-top:{mt}px;white-space:normal">{" ".join('<span style="display:inline-block;white-space:nowrap">'+jit(w_,seed*97+i,.7)+'</span>' for i,w_ in enumerate(words))}</div>'
URL='CYCLEFORCHANGE.ORG/FRUITLOOP'
def foot(seed=900,w=420):
    return blk(URL,28,C['white'],seed,sw='2px',fl=5)+scr(w,C['rose'],seed+1,h=14,sw=8)
B={}
# ── Announcement carousel ───────────────────────────────────────────
B['Feed-2-map']=(1080,1350,page(1080,1350,f'''
<div class="abs col" style="left:64px;top:60px">{blk('ONE STOP. 14 MILES.',84,C['yellow'],101,sw='4px',fit=950)}{scr(560,C['rose'],102,h=20,sw=12)}
{blk('START AT THE RAINBOW CROSSWALK. COFFEE AT THE END.',30,C['white'],103,sw='2px',fl=5,fit=950,mt=4)}</div>
<div class="abs" style="left:24px;top:260px">{loop_svg(600,660)}</div>
<div class="abs col" style="left:640px;top:270px;gap:2px">'''+''.join(
  f'''<div style="display:flex;gap:14px;align-items:flex-start;margin-bottom:30px"><div style="position:relative;width:52px;flex:none">{blk(str(n),46,PCOL[n],110+n,sw='3px')}</div><div class="col">{blk(p[2],32,C['white'],120+n,sw='2.4px',fit=360)}{blk(p[3],22,MUTE,130+n,sw='1.4px',fl=5,fit=360,mt=2)}</div></div>''' for n,p in PLACES.items())+f'''</div>
<div class="abs col" style="left:64px;bottom:52px">{foot(140,440)}</div>
<div class="abs" style="right:56px;bottom:40px"><img src="{LOGO}" style="width:330px;display:block"></div>'''))
B['Feed-3-how']=(1080,1350,page(1080,1350,f'''
<div class="abs" style="left:56px;top:56px"><img src="{LOGO}" style="width:560px;display:block"></div>
<div class="abs col" style="left:64px;top:300px">{blk('HOW IT WORKS',92,C['yellow'],201,sw='4.2px')}{scr(560,C['rose'],202,h=22,sw=12)}</div>
<div class="abs col" style="left:64px;top:480px;gap:40px">'''+''.join(
  f'''<div class="col">{blk(h_,54,c_,210+i,sw='3.2px',fit=950)}{para(s_,30,C['white'],220+i,940,mt=8)}</div>''' for i,(h_,c_,s_) in enumerate([
   ('BRING A LIGHT. TWO, ACTUALLY.',C['cyan'],'White on the front, red on the back. It’s dark by 5:30.'),
   ('NOBODY GETS DROPPED.',C['rose'],'About 10 to 12 mph, flat. A sweep rides at the back.'),
   ('WE STOP AT EVERY RED.',C['orange'],'Then we wait for whoever caught it.'),
   ('ANY BIKE.',C['purple'],'About 14 flat miles, one stop, coffee about 7:45. Starts Friday, Dec 11.')]))+f'''</div>
<div class="abs col" style="left:64px;bottom:52px">{foot(240,440)}</div>'''))
# ── The seven place cards ───────────────────────────────────────────
for n,p in PLACES.items():
    B[f'Stop-{n}']=(1080,1350,page(1080,1350,f'''
<div class="abs" style="left:60px;top:40px;width:250px;height:250px"><svg viewBox="0 0 250 250" width="250" height="250" style="overflow:visible"><g filter="url(#chalk11)"><path d="{ring(125,125,110,300+n)}" stroke="{PCOL[n]}" stroke-width="14" fill="none" stroke-linecap="round"/></g></svg>
 <div class="abs" style="left:0;top:0;width:250px;height:250px;display:flex;align-items:center;justify-content:center">{blk(str(n),170,C['white'],310+n,sw='6px')}</div></div>
<div class="abs col" style="left:340px;top:70px">{blk(f'{n} OF 7',28,MUTE,320+n,sw='1.8px',fl=5)}{blk(p[3],34,PCOL[n],330+n,sw='2.4px',fit=680,mt=8)}</div>
<div class="abs col" style="left:64px;top:320px">{blk(p[2],96,C['white'],340+n,sw='4.2px',fit=950)}{scr(600,PCOL[n],350+n,h=22,sw=12)}</div>
<div class="abs" style="left:64px;top:500px">{para(p[4],36,C['white'],360+n,560,sw='2.1px',lh=1.32)}</div>
<div class="abs" style="left:640px;top:480px">{loop_svg(400,440,hi=n,stroke=18)}</div>
<div class="abs col" style="left:64px;bottom:52px">{blk('A QUEER NIGHT RIDE. STARTS FRIDAY, DEC 11.',28,C['yellow'],370+n,sw='2px',fl=5,fit=640)}{foot(380+n*3,440)}</div>
<div class="abs" style="right:56px;bottom:44px"><img src="{LOGO}" style="width:300px;display:block"></div>'''))
# ── Stories ─────────────────────────────────────────────────────────
B['Story-1-date']=(1080,1920,page(1080,1920,f'''
<div class="abs" style="left:60px;top:250px"><img src="{LOGO}" style="width:960px;display:block"></div>
<div class="abs col" style="left:70px;top:680px">{blk('SAVE THE DATE',56,C['yellow'],401,sw='3px')}{scr(380,C['rose'],402)}
{blk('FRIDAY',190,C['rose'],403,sw='6px',lh=.98,mt=10)}{blk('DEC 11',230,C['white'],404,sw='7px',lh=.95)}{scr(760,C['yellow'],405,h=26,sw=14)}
{blk('MEET 5:30 · ROLL 6:00 PM',60,C['white'],406,sw='3.2px',mt=20,fit=940)}{scr(560,C['cyan'],407)}
{blk('THE RAINBOW CROSSWALK',52,C['white'],408,sw='3px',mt=14,fit=940)}{blk('CENTRAL AVE & PORTLAND ST',40,MUTE,409,sw='2.2px',fl=5,mt=4,fit=940)}
{blk('14 FLAT MILES · COFFEE AT THE END',40,C['cyan'],410,sw='2.4px',mt=26,fit=940)}</div>
<div class="abs col" style="left:70px;bottom:250px">{foot(411,460)}</div>'''))
subprocess.run(['python3','bg.py',json.dumps({"W":1080,"H":1920,"scale":0.62,"left":330,"top":900,"out":"bg-tonight.png","feather":220,"burn":0.26,"feather_bottom":True})],cwd=HERE,check=True)
B['Story-2-tonight']=(1080,1920,page(1080,1920,f'''
<div class="abs" style="left:60px;top:240px"><img src="{LOGO}" style="width:960px;display:block"></div>
<div class="abs col" style="left:70px;top:660px">{blk('TONIGHT.',200,C['yellow'],501,sw='7px')}{scr(700,C['rose'],502,h=26,sw=14)}</div>
<div class="abs col" style="left:70px;top:950px;gap:6px">
{blk('MEET',40,MUTE,503,sw='2.2px',fl=5)}{blk('5:30 PM',96,C['white'],504,sw='4px')}{scr(300,C['cyan'],505)}
{blk('ROLL',40,MUTE,506,sw='2.2px',fl=5,mt=18)}{blk('6:00 PM',96,C['white'],507,sw='4px')}{scr(300,C['orange'],508)}
{blk('WHERE',40,MUTE,509,sw='2.2px',fl=5,mt=18)}{blk('THE RAINBOW\nCROSSWALK',54,C['white'],510,sw='3px',lh=1.08,fit=420)}{blk('CENTRAL & PORTLAND',34,C['white'],511,sw='2px',fl=5,mt=4,fit=420)}{scr(380,C['rose'],512)}
{blk('BRING',40,MUTE,513,sw='2.2px',fl=5,mt=18)}{blk('TWO LIGHTS',62,C['green'],514,sw='3.2px',fit=420)}</div>''',extra_css='.fl{background:#1A181E url("'+H+'/bg-tonight.png") 0 0/100% 100% no-repeat !important}'))
# ── The 11 x 17 poster (prints from the 1056 x 1632 board at 3x) ─────
B['Main']=(1056,1632,page(1056,1632,f'''
<div class="abs" style="left:48px;top:48px"><img src="{LOGO}" style="width:960px;display:block"></div>
<div class="abs col" style="left:64px;top:470px;width:420px">
{blk('STARTS',58,C['yellow'],601,sw='3px')}{scr(200,C['rose'],602)}
{blk('FRIDAY\nDEC 11',104,C['rose'],603,sw='4.4px',lh=1.0,fit=420,mt=4)}{scr(320,C['yellow'],604,h=22,sw=12)}
{blk('MEET 5:30 PM /\nROLL 6:00 PM',46,C['white'],605,sw='3px',lh=1.12,mt=8,fit=420)}{scr(340,C['cyan'],606)}
{row('pin',C['rose'],blk('THE RAINBOW\nCROSSWALK',38,C['white'],607,sw='2.6px',lh=1.1,fit=330),mt=10)}{blk('CENTRAL AVE & PORTLAND ST,\nPHOENIX',28,C['white'],608,sw='2px',fl=5,lh=1.18,mt=6,fit=420)}{scr(360,C['rose'],609)}
{blk('14 FLAT MILES',52,C['cyan'],610,sw='3.2px',fit=420,mt=6)}{blk('10–12 MPH PACE',44,C['orange'],611,sw='3px',fit=420,mt=2)}{scr(360,C['purple'],612)}
</div>
<div class="abs" style="left:500px;top:470px">{loop_svg(500,560)}</div>
<div class="abs col" style="left:540px;top:1060px">{row('bike',C['rose'],blk('NOBODY GETS\nDROPPED.',30,C['white'],613,sw='2px',fl=5,lh=1.18,fit=330),mt=8)}{scr(330,C['yellow'],614)}
{row('light',C['green'],blk('BRING A FRONT\nAND REAR LIGHT',30,C['white'],615,sw='2px',fl=5,lh=1.18,fit=330),mt=8)}{scr(330,C['blue'],616)}</div>
<div class="abs" style="left:64px;bottom:64px;display:flex;gap:28px;align-items:center">
<img src="{qr_png('https://cycleforchange.org/fl')}" style="width:190px;height:190px;image-rendering:pixelated;display:block">
<div class="col">{blk('THE SEVEN PLACES,\nAND WHY THEY MATTER',34,C['yellow'],650,sw='2.4px',lh=1.15)}{scr(380,C['rose'],651)}{blk('CYCLEFORCHANGE.ORG/FL',40,C['white'],652,sw='2.6px',mt=6)}{blk('@CYCL_EFORCHANGE',28,MUTE,653,sw='1.8px',fl=5,mt=6)}</div></div>'''))
# ── Stickers (each board drawn at 3x so it prints sharp) ────────────
def sticker(W,Hh,inner):
    return page(W,Hh,inner)
B['Sticker']=(576,576,sticker(576,576,f'''
<div class="abs col" style="left:52px;top:40px">{blk('PHOTOS',150,C['yellow'],701,sw='6px',lh=.95,fit=470)}{blk('OK',170,C['rose'],702,sw='7px',lh=.95)}{scr(360,C['cyan'],703,h=22,sw=14)}</div>
<div class="abs" style="left:88px;bottom:40px;width:400px"><img src="{LOGO}" style="width:400px;display:block"></div>'''))
B['Sticker-Fruity']=(1200,1600,sticker(1200,1600,f'''
<div class="abs" style="left:60px;top:90px"><img src="{LOGO}" style="width:1080px;display:block"></div>
<div class="abs col" style="left:90px;top:560px">{blk('FRUITY',230,C['rose'],711,sw='8px',lh=.95)}{blk('FRIDAY',230,C['yellow'],712,sw='8px',lh=.95)}{scr(900,C['cyan'],713,h=30,sw=18)}</div>
<div class="abs" style="left:90px;bottom:110px;display:flex;gap:40px;align-items:center"><img src="{qr_png('https://cycleforchange.org/fruity')}" style="width:300px;height:300px;image-rendering:pixelated;display:block">
<div class="col">{blk('SCAN FOR\nTHE RIDE',60,C['white'],714,sw='3px',lh=1.1)}{scr(380,C['rose'],715)}{blk('CYCLEFORCHANGE.ORG/FRUITY',40,MUTE,716,sw='2.2px',fl=5,mt=8,fit=640)}</div></div>'''))
B['Sticker-Dropped']=(1200,1200,sticker(1200,1200,f'''
<div class="abs col" style="left:90px;top:90px">{blk('NOBODY',190,C['white'],721,sw='7px',lh=.95)}{blk('GETS',190,C['white'],722,sw='7px',lh=.95)}{blk('DROPPED.',190,C['rose'],723,sw='7px',lh=.95,fit=1030)}{scr(820,C['yellow'],724,h=30,sw=18)}</div>
<div class="abs" style="left:90px;bottom:90px"><img src="{LOGO}" style="width:640px;display:block"></div>
<div class="abs" style="right:90px;bottom:90px"><img src="{qr_png('https://cycleforchange.org/fruity')}" style="width:240px;height:240px;image-rendering:pixelated;display:block"></div>'''))
B['Sticker-Crosswalk']=(1200,1200,sticker(1200,1200,f'''
<div class="abs col" style="left:90px;top:90px">{blk('MEET ME AT',110,C['yellow'],731,sw='5px')}{blk('THE',170,C['white'],732,sw='7px',lh=.95,mt=6)}{blk('CROSSWALK.',170,C['rose'],733,sw='7px',lh=.95,fit=1030)}{scr(820,C['cyan'],734,h=30,sw=18)}
{blk('CENTRAL & PORTLAND, PHOENIX',52,C['white'],735,sw='3px',mt=18,fit=1030)}{blk('5:30 PM. BRING TWO LIGHTS.',52,C['white'],736,sw='3px',mt=6,fit=1030)}</div>
<div class="abs" style="left:90px;bottom:90px"><img src="{LOGO}" style="width:640px;display:block"></div>
<div class="abs" style="right:90px;bottom:90px"><img src="{qr_png('https://cycleforchange.org/fruity')}" style="width:240px;height:240px;image-rendering:pixelated;display:block"></div>'''))
# ── Coming soon (the teaser: no name yet) ───────────────────────────
def soon(W,Hh,top):
    rows=[('DAY','FRIDAY',C['rose']),('TIME','6 PM',C['yellow']),('ROUTE','COMING SOON',C['cyan']),('WHEN','DECEMBER',C['orange'])]
    return page(W,Hh,f'''<div class="abs col" style="left:70px;top:{top}px">{blk('A NEW GROUP RIDE',96,C['white'],801,sw='4.2px',fit=940)}{blk('IN PHOENIX',96,C['yellow'],802,sw='4.2px',fit=940)}{scr(640,C['rose'],803,h=24,sw=14)}
<div class="col" style="gap:26px;margin-top:50px">'''+''.join(f'<div class="col">{blk(k,36,MUTE,810+i,sw="2px",fl=5)}{blk(v,92,c,820+i,sw="4px",fit=940)}{scr(420,c,830+i)}</div>' for i,(k,v,c) in enumerate(rows))+f'''</div>
{blk('NO-DROP. LIGHTS ON.',52,C['green'],840,sw='3px',mt=40)}{blk('@CYCL_EFORCHANGE',44,C['white'],841,sw='2.6px',fl=5,mt=24)}</div>''')
B['Soon-Feed']=(1080,1350,soon(1080,1350,70))
B['Soon-Story']=(1080,1920,soon(1080,1920,280))
# ── The survey: the poll sticker goes in the empty band ─────────────
FOOT='STARTS FRIDAY, DEC 11 · 6 PM · THE RAINBOW CROSSWALK'
def sv_frame(inner,seed,label='TAP YOUR ANSWER IN THE POLL'):
    return page(1080,1920,f'''<div class="abs" style="left:60px;top:230px"><img src="{LOGO}" style="width:600px;display:block"></div>{inner}
<div class="abs col" style="left:70px;bottom:270px">{blk(label,32,C['yellow'],seed+90,sw='2px',fl=5)}{blk(FOOT,26,MUTE,seed+91,sw='1.6px',fl=5,mt=10,fit=940)}</div>''')
QS=[('Survey-time','1 OF 6','WHAT TIME SHOULD FRIDAYS ROLL?','It’s dark by 5:50 in December. Lights either way.',['5:30 PM','6:00 PM','6:30 PM','7:00 PM']),
    ('Survey-length','2 OF 6','HOW FAR?','Flat. One stop. Coffee at the end.',['8 MILES','12 MILES','15 MILES','20 MILES']),
    ('Survey-pace','3 OF 6','HOW FAST?','Nobody gets dropped, whatever you pick.',['CHILL, 10–12 MPH','STEADY, 13–15','FAST, DROP ME','NO IDEA YET']),
    ('Survey-end','4 OF 6','WHERE SHOULD IT END?','Three blocks from where we start.',['COFFEE','A BAR','BOTH','STRAIGHT HOME']),
    ('Survey-out','5 OF 6','WHAT WOULD GET YOU OUT?','Tell me what’s missing and I’ll find it.',['LIGHTS TO BORROW','A BIKE TO BORROW','A SLOWER GROUP','A FRIEND COMING']),
    ('Survey-in','6 OF 6','FIRST ONE IS FRI, DEC 11. IN?','Meet 5:30. Roll 6:00.',['I’M IN','MAYBE','CAN’T THAT NIGHT','TELL ME MORE'])]
for i,(name,k,q,sub,ans) in enumerate(QS):
    s=1000+i*100; cols=[C['rose'],C['yellow'],C['cyan'],C['green']]
    plates=''.join(f'''<div style="position:relative;display:flex;align-items:center;gap:18px;min-height:118px;padding:0 22px">
<svg class="abs" style="left:0;top:0" width="455" height="118" viewBox="0 0 455 118"><g filter="url(#chalk11)"><path d="M6 8 L449 4 L452 112 L4 114 Z" fill="none" stroke="{cols[j]}" stroke-width="5" stroke-linejoin="round"/></g></svg>
{blk('ABCD'[j],52,cols[j],s+10+j,sw='3px')}{blk(a,34,C['white'],s+20+j,sw='2.2px',fit=330)}</div>''' for j,a in enumerate(ans))
    B[name]=(1080,1920,sv_frame(f'''<div class="abs col" style="left:70px;top:520px;width:940px">{blk(k,34,MUTE,s,sw='2px',fl=5)}
{para(q,92,C['white'],s+1,940,sw='4px',lh=1.0,mt=10)}{scr(560,cols[i%4],s+2,h=22,sw=12)}{para(sub,32,C['pink'],s+3,940,sw='2px',mt=10)}
<div style="display:grid;grid-template-columns:455px 455px;gap:24px 30px;margin-top:40px">{plates}</div></div>''',s))
B['Survey-0-cover']=(1080,1920,sv_frame(f'''<div class="abs col" style="left:70px;top:620px;width:940px">{blk('A QUEER NIGHT RIDE',40,C['yellow'],1701,sw='2.4px')}{blk('STARTS FRIDAY, DEC 11',40,C['yellow'],1702,sw='2.4px')}
{para('Help me build the Fruit Loop.',120,C['white'],1703,940,sw='5px',lh=.98,mt=30)}{scr(700,C['rose'],1704,h=26,sw=14)}
{blk('SIX QUESTIONS. TEN SECONDS.',46,C['cyan'],1705,sw='2.8px',mt=30,fit=940)}{blk('TAP THROUGH.',46,C['cyan'],1706,sw='2.8px',fit=940)}</div>''',1700))
B['Survey-7-thanks']=(1080,1920,sv_frame(f'''<div class="abs col" style="left:70px;top:620px;width:940px">{blk('THAT’S IT',52,C['yellow'],1801,sw='3px')}{scr(300,C['rose'],1802)}
{para('Thanks. See you at the crosswalk.',120,C['white'],1803,940,sw='5px',lh=.98,mt=20)}{scr(700,C['cyan'],1804,h=26,sw=14)}
{para('I’ll post what you picked before the first ride. Link in bio for the loop and the stories.',40,C['white'],1805,900,sw='2.2px',mt=30)}</div>''',1800,label='LINK IN BIO'))
# ── The jersey ──────────────────────────────────────────────────────
JB="M400,184 C372,184 350,170 342,148 L222,182 C190,192 160,220 140,250 L88,332 L158,384 L212,322 C222,420 226,560 228,700 L230,858 C330,878 470,878 570,858 L572,700 C574,560 578,420 588,322 L642,384 L712,332 L660,250 C640,220 610,192 578,182 L458,148 C450,170 428,184 400,184 Z"
def jersey(front):
    dashes=''.join(f'<path d="M{250+i*52} {420 + (i%2)*3} l40 -3" stroke="{c}" stroke-width="16" stroke-linecap="round"/>' for i,c in enumerate([C['red'],C['orange'],C['yellow'],C['green'],C['blue'],C['purple']]))
    body=f'''<svg width="800" height="1000" viewBox="0 0 800 1000" class="abs" style="left:0;top:0"><path d="{JB}" fill="#1A181E" stroke="#4A4E55" stroke-width="2"/>
<path d="M342,148 C352,128 448,128 458,148 C440,142 360,142 342,148 Z" fill="#4A4E55"/>{'<line x1="400" y1="136" x2="400" y2="868" stroke="#4A4E55" stroke-width="3"/>' if front else ''}
<g filter="url(#chalk11)">{dashes if front else ''}<path d="M88,332 L158,384" stroke="{C['rose']}" stroke-width="10" stroke-linecap="round"/><path d="M712,332 L642,384" stroke="{C['rose']}" stroke-width="10" stroke-linecap="round"/></g></svg>'''
    if front:
        inner=body+f'<div class="abs" style="left:250px;top:470px;width:300px"><img src="{LOGO}" style="width:300px;display:block"></div>'
    else:
        inner=body+f'''<div class="abs" style="left:250px;top:250px;width:300px"><img src="{LOGO}" style="width:300px;display:block"></div>
<div class="abs col" style="left:262px;top:430px;align-items:center;width:276px">{blk('FRUITY',96,C['rose'],1901,sw='4px',fit=276)}{blk('FRIDAY',96,C['yellow'],1902,sw='4px',fit=276)}{scr(250,C['cyan'],1903,h=20,sw=12)}</div>'''
    return page(800,1000,inner,bg='#E1DFDB')
B['Jersey-Front']=(800,1000,jersey(True))
B['Jersey-Back']=(800,1000,jersey(False))
async def main(only=None):
    for name,(W,Hh,html) in B.items():
        if only and name not in only: continue
        scale=3 if name=='Main' else 1
        await shoot(html,os.path.join(OUT,name+'.png'),W,Hh,scale=scale)
        print('wrote',name)
asyncio.run(main(sys.argv[1:] or None))
