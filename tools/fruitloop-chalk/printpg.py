import asyncio, subprocess, json, qrcode, base64, io
from post import *
W,Hh=1080,1398
subprocess.run(['python3','bg.py',json.dumps({"W":W,"H":Hh,"scale":0.70,"left":110,"top":266,"out":"bg-print.png","feather":200,"burn":0.28,"feather_bottom":True})],cwd=HERE,check=True)
q=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M,box_size=20,border=3); q.add_data('https://cycleforchange.org/fl'); q.make(fit=True)
img=q.make_image(fill_color=(26,24,30),back_color=(244,241,236)); b=io.BytesIO(); img.save(b,'PNG'); qr=base64.b64encode(b.getvalue()).decode()
extra=f'''<img src="data:image/png;base64,{qr}" style="position:absolute;right:40px;bottom:104px;width:160px;height:160px;image-rendering:pixelated">
<div class="col" style="right:218px;bottom:170px;align-items:flex-end">{blk('SCAN FOR\nTHE DETAILS',26,C['white'],61,sw='1.8px',fl=5,lh=1.2)}</div>'''
h=html(H+'/bg-print.png',T+'/logo-1-night.png',W,Hh,extra=extra,foot_bottom=14,handle_bottom=26,right_top=470)
asyncio.run(shoot(h,os.path.join(H,'out/print.png'),W,Hh,scale=3))
