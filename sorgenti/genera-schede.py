"""Schede tecniche di prodotto: asciugamani, letto, portachiavi. Uso: python3 sorgenti/genera-schede.py"""
import re
from pathlib import Path
R=Path(__file__).resolve().parent.parent
SYM=re.search(r'd="([^"]+)"',(R/'assets/simbolo-vino.svg').read_text()).group(1)
P='#281C2D'; VINO='#511B36'; CREMA='#FFF3E7'; COR='#F25B45'; LINE='#281C2D'
def sym(x,y,s,c): return f'<g transform="translate({x} {y}) scale({s/431:.5f})"><path fill="{c}" d="{SYM}"/></g>'
def dim_h(x1,x2,y,t): return f'<g stroke="{LINE}" stroke-width="1" opacity=".55"><path d="M{x1} {y}H{x2}M{x1} {y-5}V{y+5}M{x2} {y-5}V{y+5}"/></g><text x="{(x1+x2)/2}" y="{y-8}" text-anchor="middle" class="d">{t}</text>'
def dim_v(x,y1,y2,t): return f'<g stroke="{LINE}" stroke-width="1" opacity=".55"><path d="M{x} {y1}V{y2}M{x-5} {y1}H{x+5}M{x-5} {y2}H{x+5}"/></g><text x="{x+10}" y="{(y1+y2)/2+4}" class="d">{t}</text>'
def head(title,sub):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
<style>@font-face{{font-family:O;src:url(../../font/outfit-variable-latin.woff2)}}@font-face{{font-family:D;src:url(../../font/dm-sans-variable-latin.woff2)}}
.t{{font:600 44px O;letter-spacing:-1.5px;fill:{P}}}.s{{font:400 17px D;fill:{P}}}.e{{font:700 13px D;letter-spacing:2px;fill:{P}}}.d{{font:500 13px D;fill:{P};opacity:.75}}.l{{font:700 14px D;fill:{P}}}</style>
<defs><filter id="tx"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .22 0"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>
<rect width="1600" height="1000" fill="{CREMA}"/>
<text x="64" y="80" class="e">SCHEDA TECNICA · STELLA.CASA</text><text x="64" y="138" class="t">{title}</text><text x="64" y="172" class="s">{sub}</text>
<path d="M64 950H1536" stroke="{P}" stroke-opacity=".2"/><text x="64" y="975" class="d">Disegni non in scala esatta. Misure in mm. Da confermare con il fornitore su campione.</text>'''
def towel(x,y,w,h,body,band,emb,label,sz):
    bb=y+h-h*.16
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{body}" stroke="{P}" stroke-opacity=".25"/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="#000" filter="url(#tx)"/>'
            f'<rect x="{x}" y="{bb}" width="{w}" height="{h*.07}" fill="{band}"/><path d="M{x} {bb+h*.012}H{x+w}M{x} {bb+h*.058}H{x+w}" stroke="{emb}" stroke-opacity=".25"/>'
            + sym(x+w/2-sz/2, bb-sz-h*.07, sz, emb) +
            f'<text x="{x}" y="{y+h+26}" class="l">{label}</text>')
def asciugamani():
    s=[head('Asciugamani','Spugna di cotone 600 g/m², fascia tessuta in tinta. Simbolo ricamato a punto raso, centrato sopra la fascia.')]
    for row,(name,body,band,emb) in enumerate([('Chiaro','#F2E3D2','#E8D2BD',VINO),('Scuro',VINO,'#43152D',CREMA)]):
        base=480+row*360
        s.append(f'<text x="64" y="{base-120}" class="e">{name.upper()}</text><text x="64" y="{base-96}" class="s">{"Crema, ricamo vino" if row==0 else "Vino, ricamo crema"}</text>')
        for x,w,h,lab,sz in [(300,150,160,'Ospite 40 × 60',22),(500,190,215,'Viso 50 × 100',28),(740,250,270,'Telo 100 × 150',36)]:
            s.append(towel(x,base-h,w,h,body,band,emb,lab,sz))
    x,w,h=740,250,270; y=480-h; bb=y+h-h*.16
    s.append(dim_h(x+w/2-18,x+w/2+18,bb-36-h*.07-10,'40'))
    s.append(dim_v(1004,bb-h*.07,bb,'30'))
    s.append(f'<g transform="translate(1110 250)"><rect width="420" height="420" rx="20" fill="#fff"/><text x="30" y="46" class="e">DETTAGLIO RICAMO</text>'
             + sym(130,90,160,VINO) +
             f'<path d="M110 290H310" stroke="{P}" stroke-opacity=".3"/><text x="30" y="330" class="s">Punto raso, filo poliestere lucido</text><text x="30" y="356" class="s">Altezza 35–45 mm (telo 40 mm)</text><text x="30" y="382" class="s">Tenuta del colore a 60 °C</text></g>')
    s.append('</svg>'); return ''.join(s)
def letto():
    s=[head('Letto: federe e lenzuolo','Percalle di cotone 300 fili. Federa con bordo Oxford 50 mm. Il corallo è solo un profilo sottile sul risvolto.')]
    for row,(name,body,emb) in enumerate([('Chiaro','#FBF3EA',VINO),('Scuro',VINO,CREMA)]):
        y0=240+row*350
        s.append(f'<text x="64" y="{y0+10}" class="e">{name.upper()}</text><text x="64" y="{y0+34}" class="s">{"Bianco crema, ricamo vino" if row==0 else "Vino, ricamo crema"}</text>')
        # pillow with oxford flange
        x,y,w,h=300,y0-40,400,250
        s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="{body}" stroke="{P}" stroke-opacity=".25"/><rect x="{x+26}" y="{y+26}" width="{w-52}" height="{h-52}" rx="3" fill="none" stroke="{emb}" stroke-opacity=".35" stroke-dasharray="3 3"/>'
                 + sym(x+w-26-30-24, y+h-26-30-24, 24, emb) + f'<text x="{x}" y="{y+h+26}" class="l">Federa 50 × 80, bordo 50 mm</text>')
        # sheet turndown
        x2,y2,w2,h2=780,y0-40,480,250
        s.append(f'<rect x="{x2}" y="{y2}" width="{w2}" height="{h2}" rx="4" fill="{body}" stroke="{P}" stroke-opacity=".25"/><rect x="{x2}" y="{y2}" width="{w2}" height="70" fill="{body}" stroke="{P}" stroke-opacity=".18"/><path d="M{x2} {y2+70}H{x2+w2}" stroke="{COR}" stroke-width="3"/>'
                 + sym(x2+w2/2-14, y2+18, 28, emb) + f'<text x="{x2}" y="{y2+h2+26}" class="l">Lenzuolo sopra, risvolto 300 mm</text>')
    s.append(dim_v(1272,200,270,''))
    s.append(f'<g transform="translate(1330 230)"><text x="0" y="0" class="e">POSIZIONI</text><text x="0" y="34" class="s">Federa: angolo del bordo,</text><text x="0" y="58" class="s">simbolo 25–30 mm.</text><text x="0" y="98" class="s">Lenzuolo: centro del</text><text x="0" y="122" class="s">risvolto, 30 mm.</text><text x="0" y="162" class="s">Profilo corallo 3 mm</text><text x="0" y="186" class="s">sotto il risvolto.</text></g>')
    s.append('</svg>'); return ''.join(s)
def portachiavi():
    s=[head('Portachiavi','Pelle conciata al vegetale, 4 mm, bordi tinti e lucidati. Anello in ottone spazzolato Ø 25 mm.')]
    for i,(name,c,edge) in enumerate([('Vino',VINO,'#3A1326'),('Corallo',COR,'#C9432F')]):
        x=300+i*420; y=300
        s.append(f'<circle cx="{x+100}" cy="{y-52}" r="42" fill="none" stroke="#B8925A" stroke-width="7"/>')
        s.append(f'<g transform="translate(4 8)" opacity="1">'+sym(x,y,200,edge)+'</g>'+sym(x,y,200,c))
        s.append(f'<path d="M{x+76} {y+2}a24 24 0 0 1 48 0v26h-48z" fill="{c}"/><circle cx="{x+100}" cy="{y}" r="9" fill="{CREMA}"/>')
        s.append(f'<text x="{x}" y="{y+250}" class="l">{name}</text>')
    s.append(dim_h(300,500,585,'40'))
    s.append(dim_v(270,276,500,'50'))
    s.append(f'<g transform="translate(1180 300)"><text x="0" y="0" class="e">SEZIONE</text><rect x="0" y="30" width="200" height="16" rx="3" fill="{VINO}"/><text x="0" y="80" class="s">Spessore 4 mm, bordo tinto</text>'
             f'<text x="0" y="140" class="e">NOTE</text><text x="0" y="172" class="s">Nessun indirizzo sul portachiavi.</text><text x="0" y="198" class="s">Simbolo inciso a secco sul retro.</text><text x="0" y="224" class="s">Foro rinforzato Ø 6 mm.</text></g>')
    s.append('</svg>'); return ''.join(s)
for n,f in [('asciugamani',asciugamani),('letto',letto),('portachiavi',portachiavi)]:
    (R/f'stampa/schede/scheda-{n}.svg').write_text(f(),encoding='utf-8')
print('ok')
