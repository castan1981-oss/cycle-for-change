import asyncio, subprocess, json
from post import *
W,Hh=1080,1920
subprocess.run(['python3','bg.py',json.dumps({"W":W,"H":Hh,"scale":0.76,"left":70,"top":585,"out":"bg-story.png","feather":200,"burn":0.28,"feather_bottom":True})],cwd=HERE,check=True)
h=html(H+'/bg-story.png',T+'/logo-1-night.png',W,Hh,logo_top=238,left_top=770,left2_top=1270,right_top=770,foot_bottom=240,handle_bottom=252,LFIT=270,LFIT2=255)
asyncio.run(shoot(h,os.path.join(H,'out/story.png'),W,Hh))
