"""Ricamo realistico del simbolo su una foto: punto raso, bordo, rilievo, increspatura."""
from pathlib import Path
from PIL import Image, ImageFilter
import numpy as np
SYM=np.asarray(Image.open(Path(__file__).resolve().parent/'sym.png').convert('L')).astype(float)/255  # 862x862, bianco = simbolo
def _b(a,r): return np.asarray(Image.fromarray((np.clip(a,0,1)*255).astype('uint8')).filter(ImageFilter.GaussianBlur(r))).astype(float)/255
def _lum(a): return .2126*a[...,0]+.7152*a[...,1]+.0722*a[...,2]
def hexc(h): return np.array([int(h[i:i+2],16) for i in (1,3,5)])/255
def coeffs(dst,src):
    A=[];B=[]
    for (x,y),(u,v) in zip(dst,src):
        A+= [[x,y,1,0,0,0,-u*x,-u*y],[0,0,0,x,y,1,-v*x,-v*y]]; B+=[u,v]
    return np.linalg.solve(np.array(A,float),np.array(B,float)).tolist()
def art(color,res=900,angle=38,period=8.5):
    from scipy.ndimage import label
    m=np.asarray(Image.fromarray((SYM*255).astype('uint8')).resize((res,res),Image.LANCZOS)).astype(float)/255
    n=_b(np.random.default_rng(7).random((res,res)),2.5); m=np.clip((_b(m,1.5)+(n-.5)*.35-.5)*6+.5,0,1)
    lab,k=label(m>.5)
    yy,xx=np.mgrid[0:res,0:res].astype(float)
    sheen=np.ones((res,res))
    rng=np.random.default_rng(11)
    for i in range(1,k+1):
        ang=np.deg2rad(angle if i%2 else -angle)
        u=(xx*np.cos(ang)+yy*np.sin(ang))/period
        idx=np.floor(u); frac=u-idx
        prof=np.sqrt(np.clip(1-(2*frac-1)**2,0,1))          # filo come cilindro
        var=rng.normal(0,.05,int(idx.max()-idx.min())+3)[(idx-idx.min()).astype(int)]
        sh=.50+.62*prof**1.1+var
        sheen[lab==i]=sh[lab==i]
    er=np.asarray(Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.MinFilter(7))).astype(float)/255
    edge=np.clip(m-er,0,1)
    col=color[None,None,:]*sheen[...,None]*(1-.22*edge[...,None])
    dome=_b(er,10); col=col*(.88+.2*dome[...,None])
    rgba=np.dstack([np.clip(col,0,1),m])
    return Image.fromarray((rgba*255).astype('uint8'),'RGBA')
def apply(base,quad,color,soft=None,fold=6.0,lightk=1.0,period=8.5):
    """base: HxWx3 0..1; quad: tl,tr,br,bl della superficie. soft: sfocatura (px) per la profondità di campo; fold: quanto le pieghe deformano il ricamo."""
    from scipy.ndimage import map_coordinates, gaussian_filter
    H,W,_=base.shape; a=art(color,period=period)
    c=coeffs(quad,[(0,0),(a.width,0),(a.width,a.height),(0,a.height)])
    w=np.asarray(a.transform((W,H),Image.PERSPECTIVE,c,Image.BICUBIC)).astype(float)/255
    L=_lum(base)
    # nitidezza locale: stima dalla varianza del laplaciano nell'area
    m0=w[...,3]>.5
    if soft is None:
        lap=np.abs(L-gaussian_filter(L,1.0)); s_loc=lap[m0].mean() if m0.any() else .01
        soft=float(np.clip(.012/max(s_loc,1e-4)-0.6,0,4))
    # pieghe: sposta il ricamo lungo il gradiente della luminanza sfocata
    Lb=gaussian_filter(L,8); gy,gx=np.gradient(Lb)
    yy,xx=np.mgrid[0:H,0:W].astype(float)
    dx=gx*fold*40; dy=gy*fold*40
    w=np.dstack([map_coordinates(w[...,k],[yy-dy,xx-dx],order=1) for k in range(4)])
    if soft>0: w=np.dstack([gaussian_filter(w[...,k],soft) for k in range(4)])
    rgb,m=w[...,:3],w[...,3]
    lit=gaussian_filter(L,3); ref=np.median(lit[m>.5]) if (m>.5).any() else 1
    shade=np.clip(1+(lit/ref-1)*1.6*lightk,.55,1.3)
    tex=np.clip((L-gaussian_filter(L,2))*1.5+1,.85,1.15)
    rgb=rgb*shade[...,None]*tex[...,None]
    sh=np.roll(np.roll(gaussian_filter(m,2.6+soft),3,axis=0),2,axis=1)
    pucker=np.clip(gaussian_filter(m,7)-m,0,1)
    out=base*(1-.40*np.clip(sh-m,0,1)[...,None])*(1-.14*pucker[...,None])
    hi=np.clip(m-np.roll(np.roll(m,-1,axis=0),-1,axis=1),0,1)
    rgb=rgb+.08*hi[...,None]
    return out*(1-m[...,None])+np.clip(rgb,0,1)*m[...,None]
