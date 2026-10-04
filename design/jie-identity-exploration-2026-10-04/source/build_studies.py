from pathlib import Path
import json, re, math, html, copy, base64
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parents[1]
W, H = 1500, 1000
INK, PAPER, WHITE = '#1D1D1F', '#F7F6F1', '#FFFFFF'
MUTED, LINE, GREEN, TINT, RED = '#686E6A', '#D8DDD6', '#416754', '#E8EEE7', '#AC4937'
pdfmetrics.registerFont(TTFont('CN', '/Library/Fonts/Arial Unicode.ttf'))
pdfmetrics.registerFont(TTFont('Sans', '/System/Library/Fonts/Supplemental/Arial.ttf'))
pdfmetrics.registerFont(TTFont('Bold', '/System/Library/Fonts/Supplemental/Arial Bold.ttf'))
pdfmetrics.registerFont(TTFont('Serif', '/System/Library/Fonts/Supplemental/Georgia.ttf'))

def shape(name, d, fill='ink', stroke=None, width=0, cap='butt'):
    return dict(name=name, d=d, fill=fill, stroke=stroke, width=width, cap=cap)

def poly(name, pts, fill='ink'):
    return shape(name, 'M '+' L '.join(f'{x:g} {y:g}' for x,y in pts)+' Z', fill)

def box(name,x,y,w,h,fill='ink'):
    return poly(name,[(x,y),(x+w,y),(x+w,y+h),(x,y+h)],fill)

def circle(name,x,y,r,fill='ink'):
    k=r*0.55228475
    return shape(name,f'M {x+r} {y} C {x+r} {y+k} {x+k} {y+r} {x} {y+r} C {x-k} {y+r} {x-r} {y+k} {x-r} {y} C {x-r} {y-k} {x-k} {y-r} {x} {y-r} C {x+k} {y-r} {x+r} {y-k} {x+r} {y} Z',fill)

def stroke(name,d,width=7,cap='round'):
    return shape(name,d,None,'ink',width,cap)

MARKS={}
# 01. Original low-contrast humanist drawing, optical rather than modular.
MARKS['01']=[
    shape('Wood / single humanist outline','M 45 8 L 56 8 L 56 24 L 86 24 L 86 33 L 59 33 C 65 45 77 56 92 64 L 85 73 C 72 65 63 57 56 46 L 56 73 L 45 73 L 45 47 C 37 58 27 66 15 73 L 8 65 C 23 57 36 45 42 33 L 14 33 L 14 24 L 45 24 Z'),
    poly('Dot 1',[(18,79),(28,82),(21,95),(11,91)]),
    poly('Dot 2',[(37,81),(46,80),(48,94),(38,95)]),
    poly('Dot 3',[(58,80),(67,78),(72,92),(62,95)]),
    poly('Dot 4',[(80,77),(88,73),(96,87),(87,93)])]
# 02. Modular square rhythm; fresh draft, existing v04 files are untouched.
MARKS['02']=[shape('Wood / geometric outline','M 44 8 L 56 8 L 56 22 L 92 22 L 92 33 L 56 33 L 56 40 L 92 66 L 92 74 L 82 74 L 56 55 L 56 74 L 44 74 L 44 55 L 18 74 L 8 74 L 8 66 L 44 40 L 44 33 L 8 33 L 8 22 L 44 22 Z')]+[box('Unit / square '+str(i+1),8+i*24,84,12,12) for i in range(4)]
# 03. An open, round monoline gesture; same width throughout.
MARKS['03']=[stroke('Crossbar','M 17 28 L 83 28',7.8),stroke('Stem','M 50 10 L 50 68',7.8),stroke('Left diagonal','M 47 36 C 39 47 26 58 13 65',7.8),stroke('Right diagonal','M 53 36 C 61 47 74 59 87 65',7.8)]+[circle('Round point '+str(i+1),19+21*i,86,5.3) for i in range(4)]
# 04. One branching event, curved contours; no leaves, molecules or helix.
MARKS['04']=[shape('Wood / elastic junction','M 45 8 L 55 8 L 55 25 L 86 25 L 86 33 L 55 33 C 58 46 68 55 88 63 L 84 72 C 69 67 60 60 54 51 L 54 72 L 46 72 L 46 51 C 40 61 29 68 15 72 L 11 63 C 31 57 41 47 45 33 L 14 33 L 14 25 L 45 25 Z')]+[
    stroke('Rounded point 1','M 21 84 L 18 91',8),
    stroke('Rounded point 2','M 41 84 L 42 92',8),
    stroke('Rounded point 3','M 61 84 L 63 92',8),
    stroke('Rounded point 4','M 80 82 L 84 90',8)]
# 05. Bespoke contemporary serif character, not an outlined stock glyph.
MARKS['05']=[
    shape('Stem with restrained wedge','M 39 9 L 58 7 L 56 13 L 56 73 L 44 73 L 45 14 L 39 13 Z'),
    shape('Hairline and terminal','M 13 27 L 76 27 L 83 20 L 91 31 L 13 31 Z'),
    shape('Left branch','M 44 33 L 52 37 C 40 55 24 66 8 72 L 6 69 C 22 58 36 45 44 33 Z'),
    shape('Right branch','M 56 34 C 65 44 76 54 95 61 L 84 73 C 70 61 61 49 54 37 Z'),
    shape('Dot 1','M 21 80 L 25 81 C 24 89 20 97 13 96 C 9 91 15 86 21 80 Z'),
    shape('Dot 2','M 39 81 C 45 83 51 90 46 97 C 39 98 41 90 37 82 Z'),
    shape('Dot 3','M 59 79 C 68 82 74 88 70 95 C 63 99 63 86 57 81 Z'),
    shape('Dot 4','M 78 76 C 89 78 97 84 94 91 C 87 98 83 83 77 79 Z')]
# 06 and 07 are original curves provided by a parallel drawing study.
hand=ROOT/'source/handstyles.json'
if hand.exists():
    h=json.loads(hand.read_text())
    MARKS['06']=h['broad_nib']; MARKS['07']=h['personal_pen']
else:
    MARKS['06']=[shape('Bold crossbar','M 15 25 L 84 19 L 92 29 L 20 36 Z'),shape('Tapered vertical','M 46 7 L 61 10 L 51 73 L 40 75 Z'),shape('Left sweep','M 45 36 L 57 39 C 43 53 28 64 8 70 L 10 58 C 26 51 38 42 45 36 Z'),shape('Right sweep','M 57 36 C 69 46 79 54 95 56 L 87 71 C 75 69 65 57 51 42 Z')]+[poly('Ink dot '+str(i),p) for i,p in enumerate([[(19,78),(29,80),(21,94),(10,90)],[(38,81),(47,80),(49,94),(38,96)],[(58,79),(68,77),(75,89),(64,94)],[(79,75),(87,71),(97,84),(88,91)]])]
    MARKS['07']=[stroke('Pen crossbar','M 16 31 C 35 31 63 25 85 26',5.7),stroke('Pen stem','M 52 10 C 51 27 46 52 47 70',6.3),stroke('Pen left sweep','M 49 36 C 36 50 24 61 12 65',5.6),stroke('Pen right sweep','M 54 39 C 65 50 76 61 92 63',6.4)]+[stroke('Pen dot '+str(i),'M %s %s C %s %s %s %s %s %s'%p,5.8) for i,p in enumerate([(24,79,21,82,19,87,17,89),(41,80,42,83,43,88,43,91),(59,78,62,81,64,86,64,89),(78,76,81,80,86,84,88,86)])]
# 08. Modern bookplate / negative character, intentionally a strong block.
MARKS['08']=[shape('Seal field','M 9 8 L 91 8 L 94 12 L 94 92 L 10 92 L 6 88 L 6 12 Z')]
seal=[shape('Wood / white cut','M 46 19 L 55 19 L 55 31 L 82 31 L 82 39 L 57 39 L 83 61 L 78 69 L 55 49 L 55 68 L 46 68 L 46 49 L 23 69 L 18 61 L 44 39 L 18 39 L 18 31 L 46 31 Z','paper')]+[box('White cut '+str(i),18+i*19,76,9,8,'paper') for i in range(4)]
MARKS['08']+=seal
# 09. Stencil construction: gaps are real open space, not painted masks.
MARKS['09']=[box('Stem above',44,8,12,12),box('Beam left',8,26,33,11),box('Beam right',59,26,33,11),box('Stem middle',44,26,12,49),poly('Cut left branch',[(39,42),(43,54),(17,75),(8,75),(8,66)]),poly('Cut right branch',[(61,42),(92,66),(92,75),(83,75),(57,54)])]+[box('Datum '+str(i),8+i*24,84,12,12) for i in range(4)]
# 10. Cellular / separable parts. Preserve eight-stroke logic.
MARKS['10']=[stroke('Top capsule','M 50 11 L 50 22',10),stroke('Beam capsule left','M 16 33 L 36 33',10),stroke('Beam capsule right','M 64 33 L 84 33',10),stroke('Central capsule','M 50 37 L 50 69',10),stroke('Left capsule','M 35 48 L 15 66',10),stroke('Right capsule','M 65 48 L 85 66',10)]+[stroke('Spore '+str(i),f'M {18+i*21} 84 L {20+i*21} 90',8) for i in range(4)]
# 11. Non-character alternative. One fork and a four-point cadence.
MARKS['11']=[shape('Possibility / fork','M 44 64 L 44 49 C 44 39 37 33 27 30 L 10 24 L 14 12 L 31 18 C 40 21 46 26 50 32 C 55 24 62 20 71 17 L 86 12 L 90 24 L 74 30 C 63 33 56 39 56 49 L 56 64 Z')]+[circle('Point '+str(i),17+i*22,85,6) for i in range(4)]
# 12. Latin alternative with a joining branch; J and Z remain independently readable.
MARKS['12']=[shape('J / hooked trunk','M 9 12 L 47 12 L 47 65 C 47 84 38 94 22 94 C 12 94 6 89 3 81 L 13 76 C 15 81 18 83 23 83 C 31 83 35 77 35 66 L 35 24 L 9 24 Z'),shape('Z / angular branch','M 54 12 L 93 12 L 93 22 L 65 65 L 94 65 L 94 77 L 50 77 L 50 66 L 79 24 L 54 24 Z'),poly('Shared branch',[(39,45),(44,36),(66,46),(60,56)])]

META=[
('01','知性 / Humanist','清晰、沉着，有一点人的温度','轻微收放的轮廓与有方向的四点；适合长期使用。','最稳妥的主标候选。个性来自比例，不依赖装饰。','学术  /  平衡  /  日常'),
('02','构件 / Modular','把理性变成可复用的结构','直线、斜线、方点共享节律；可延展为图案和章节标记。','系统感最强。风险是机构化，需要姓名组合带回个人感。','秩序  /  模块  /  系统'),
('03','圆线 / Monoline','更平易近人的研究者','等线宽、开放曲线、圆点；像清楚且友善的解释。','适合导航和个人博客。16 px 的线条需单独加重。','亲和  /  清爽  /  简洁'),
('04','生长 / Branching','一次分岔，保留多种可能','横竖保持平稳，撇捺转成弹性曲线；四个圆钝笔点稳定重心。','生物隐喻探索。需验证小尺寸，避免增加叶片或细枝。','生命  /  可能性  /  柔韧'),
('05','文脉 / Editorial','理性可以有书卷气','定制宋意轮廓：横细竖厚，收笔克制，四点有书写感。','适合首页与文章署名；favicon 应使用加粗简化版本。','学术  /  文化  /  阅读'),
('06','落笔 / Broad nib','大方而明确地使用自己的文字','宽笔提按、切角与不对称重心；饱满的黑白形态。','文化表达最鲜明。是原创手写风格探索，非真实签名。','自信  /  个性  /  书写'),
('07','随笔 / Personal pen','网站首先属于一个具体的人','略有倾斜的笔势、连续节奏、四个独立笔点。','个人感最强。选定后可根据你的真实字迹再定制。','自然  /  温暖  /  私人'),
('08','印记 / Seal','一个安静、有分量的身份印记','现代方形负字：不用仿旧纹理，也不依赖朱红色。','适合头像和书签。需避免茶饮、文创品牌的联想过强。','文化  /  稳定  /  印记'),
('09','切口 / Stencil','把实验与构造过程留在字里','少量真实断口，让骨架与组装关系同时可见。','适合设计与研究交叉身份；最小尺寸断口可能消失。','实验  /  构造  /  工具'),
('10','单元 / Cellular','相对独立的部件，组成一个整体','胶囊笔画与独立节点；保留“杰”的基本空间关系。','更具探索性。识字性较弱，适合先作为辅助图形。','生物  /  模块  /  联结'),
('11','分岔 / Possibility','不使用完整汉字的对照选项','一个分岔和四点的节律；来自“杰”的结构联想。','抽象符号，不能读作“杰”；需与全名长期共同出现。','开放  /  简约  /  抽象'),
('12','JZ / Joined initials','拉丁字母身份的对照选项','J 的竖干与 Z 的斜向结构建立连接。','跨语言识别直接，但失去“杰”最鲜明的文化特征。','国际  /  紧凑  /  字母'),
]
META={a[0]:dict(id=a[0],title=a[1],promise=a[2],idea=a[3],caution=a[4],tags=a[5]) for a in META}

def parse(d):
    toks=re.findall(r'[MLCZ]|-?\d+(?:\.\d+)?(?:e[-+]?\d+)?',d)
    cmds=[];i=0
    while i<len(toks):
        cmd=toks[i];i+=1;n={'M':2,'L':2,'C':6,'Z':0}[cmd]
        cmds.append([cmd]+[float(v) for v in toks[i:i+n]]);i+=n
    return cmds

def transformed(d,x,y,s):
    out=[]
    for c in parse(d):
        out.append([c[0]]+[round(v*s+(x if i%2==0 else y),5) for i,v in enumerate(c[1:])])
    return out

PAGES=[]
class Page:
    def __init__(self,name): self.name=name;self.items=[];PAGES.append(self)
    def rect(self,x,y,w,h,fill,name='Field',group='Backgrounds'):
        self.items.append(dict(type='rect',x=x,y=y,w=w,h=h,fill=fill,name=name,group=group))
    def text(self,text,x,y,size=15,fill=INK,font='CN',name=None,group='Typography'):
        if any('\u3400' <= ch <= '\u9fff' for ch in text):font='CN'
        self.items.append(dict(type='text',text=text,x=x,y=y,size=size,fill=fill,font=font,name=name or text,group=group))
    def line(self,x1,y1,x2,y2,color=LINE,width=1,group='Guides'):
        self.items.append(dict(type='path',commands=[['M',x1,y1],['L',x2,y2]],fill=None,stroke=color,width=width,cap='butt',name='Rule',group=group))
    def image(self,path,x,y,w,h):
        self.items.append(dict(type='image',path=str(path),x=x,y=y,w=w,h=h,name='Existing website portrait / context only',group='Portraits / application context'))
    def mark(self,key,x,y,size,ink=INK,paper=PAPER,group=None,variant=None):
        for e in variant or MARKS[key]:
            colour=lambda v:ink if v=='ink' else paper if v=='paper' else v
            self.items.append(dict(type='path',commands=transformed(e['d'],x,y,size/100),fill=colour(e.get('fill')),stroke=colour(e.get('stroke')),width=e.get('width',0)*size/100,cap=e.get('cap','butt'),name=e['name'],group=group or (key+' / '+META[key]['title'])))
    def para(self,text,x,y,maxwidth,size=15,fill=MUTED,leading=25,font='CN'):
        row='';dy=y
        tokens=list(text) if any('\u3400' <= ch <= '\u9fff' for ch in text) else re.findall(r'\S+\s*|\n',text)
        for ch in tokens:
            if ch=='\n' or pdfmetrics.stringWidth(row+ch,font,size)>maxwidth:
                self.text(row,x,dy,size,fill,font);dy+=leading;row='' if ch=='\n' else ch
            else:row+=ch
        if row:self.text(row,x,dy,size,fill,font)
        return dy+leading

def head(p,index,title,sub):
    p.rect(0,0,W,H,PAPER,'Paper')
    p.text('JIE DEAN ZHONG',54,45,13,INK,'Bold')
    p.text('PERSONAL IDENTITY / EXPLORATIONS / 04 OCT 2026',995,45,10,MUTED,'Sans')
    p.line(54,70,1446,70)
    p.text(title,54,125,35,INK,'CN')
    p.text(sub,56,163,15,MUTED)
    p.line(54,940,1446,940)
    p.text('杰 / 原创矢量草稿 · 供选方向，非最终品牌规范',54,968,11,MUTED)
    p.text(f'{index:02d} / 12',1387,968,11,MUTED,'Sans')

# 01: First impressions. Equal-sized optical fields, all black.
p=Page('01 - Twelve directions')
head(p,1,'一个名字，十二种气质','先看轮廓，再看故事。01–10 为“杰”的字形探索；11–12 为替代身份符号。')
for i,key in enumerate(META):
    col,row=i%4,i//4;x=54+col*350;y=199+row*240
    if col:p.line(x-14,y+5,x-14,y+218)
    p.text(key,x+4,y+24,12,MUTED,'Sans')
    p.mark(key,x+92,y+12,135)
    p.text(META[key]['title'],x+4,y+177,20,INK)
    p.text(META[key]['tags'],x+4,y+204,12,MUTED)
    if row<2:p.line(x,y+227,x+324,y+227)

# 02-07: Two distinct directions, with identical presentation and contexts.
pairs=[('01','02','清晰与秩序'),('03','04','亲和与生命'),('05','06','阅读与落笔'),('07','08','随笔与印记'),('09','10','切割与组装'),('11','12','两种替代身份')]
for pi,(a,b,title) in enumerate(pairs,2):
    p=Page(f'{pi:02d} - {a} and {b}')
    head(p,pi,title,'每个方案都展示原始矢量、反白、姓名组合与实际大小；尺寸标注指 100 × 100 设计框。')
    p.line(750,206,750,905)
    for key,x in [(a,54),(b,798)]:
        m=META[key]
        p.text(key+'  '+m['title'],x,219,25,INK)
        p.text(m['promise'],x,253,15,MUTED)
        p.mark(key,x+37,282,260)
        p.rect(x+410,324,180,180,INK,'Reverse field')
        p.mark(key,x+426,340,148,WHITE,INK,group=key+' / Reverse')
        p.text('MONOCHROME / MASTER',x+30,570,10,MUTED,'Sans')
        p.text('REVERSED',x+410,535,10,MUTED,'Sans')
        p.para(m['idea'],x,614,620,15,MUTED,25)
        p.rect(x,671,648,84,INK,'Site header preview')
        p.mark(key,x+20,690,45,WHITE,INK,group=key+' / Header lockup')
        p.text('Jie Dean Zhong',x+83,714,23,WHITE,'Serif' if key=='05' else 'Sans')
        p.text('Research  /  Writing',x+430,714,12,'#D0D5CF','Sans')
        for j,sz in enumerate([16,24,32,48]):
            xx=x+24+j*90
            p.mark(key,xx,835-sz,sz,group=key+' / Size '+str(sz))
            p.text(str(sz)+' px',xx,859,10,MUTED,'Sans')
        p.para(m['caution'],x+389,796,240,13,MUTED,22)

# 08: Full-size homepage context for three deliberately different candidates.
p=Page('08 - Homepage contexts')
head(p,8,'放到首页，身份是否成立','三个不同取向：01 的克制、04 的生长、06 的文化表达。下方是布局提案，不是已修改的网站。')
for i,key in enumerate(['01','04','06']):
    x=54+i*474;m=META[key]
    p.text(key+' / '+m['title'],x,215,20,INK)
    p.rect(x,245,444,594,WHITE,'Homepage paper')
    p.rect(x,245,444,64,INK,'Existing graphite header')
    p.mark(key,x+19,258,36,WHITE,INK,group=key+' / Website header')
    p.text('Jie Dean Zhong',x+67,284,16,WHITE,'Sans')
    p.text('Research   About',x+312,283,10,'#D0D5CF','Sans')
    p.mark(key,x+31,347,82,group=key+' / Homepage mark',paper=WHITE)
    p.text('钟杰',x+137,383,23,INK)
    p.text('Jie Dean Zhong',x+137,416,25,INK,'Sans')
    p.text('Undergraduate Researcher',x+39,473,20,INK,'Sans')
    p.text('in Biological Sciences',x+39,504,20,INK,'Sans')
    p.text('Synthetic biology, microbial engineering',x+39,552,13,MUTED,'Sans')
    p.text('and immunology.',x+39,575,13,MUTED,'Sans')
    p.line(x+39,613,x+403,613)
    p.text('Research',x+39,658,24,INK,'Sans')
    p.text('Selected projects and questions',x+39,690,14,MUTED,'Sans')
    p.rect(x+39,728,365,71,PAPER,'Research content preview')
    p.text('Engineered biological systems',x+54,770,16,INK,'Sans')
    p.para(m['promise'],x,879,422,15,INK,23)

# 09: Actual-size systematic raster inspection page. No enlarged marks disguised as 16 px.
p=Page('09 - All small-size proofs')
head(p,9,'小到 16 像素，剩下的才是结构','此页在 100% / 1 px = 1 pt 导出时检查；16、24、32、48 指设计框边长，内含留白。')
for half,keys in enumerate([list(META)[:6],list(META)[6:]]):
    x=54+half*730
    p.text('方案',x,224,12,MUTED)
    for j,sz in enumerate([16,24,32,48]):p.text(str(sz)+' px',x+235+j*85,224,11,MUTED,'Sans')
    p.text('32 px 反白',x+578,224,11,MUTED)
    for i,key in enumerate(keys):
        y=263+i*104
        p.line(x,y+83,x+678,y+83)
        p.text(key+'  '+META[key]['title'].split(' / ')[0],x,y+36,17,INK)
        for j,sz in enumerate([16,24,32,48]):p.mark(key,x+235+j*85,y+47-sz/2,sz,group=key+' / Exact '+str(sz))
        p.rect(x+584,y+17,54,54,INK,'Reverse size field')
        p.mark(key,x+595,y+28,32,WHITE,INK,group=key+' / Exact reverse 32')

# 10: Concrete responsive variants, not just advice to simplify.
MICRO={}
MICRO['03']=copy.deepcopy(MARKS['03'])
for e in MICRO['03']:
    if e.get('stroke'):e['width']=10
MICRO['05']=copy.deepcopy(MARKS['05'])
MICRO['05'][0]['d']='M 40 8 L 58 8 L 57 15 L 57 73 L 43 73 L 44 15 L 40 15 Z'
MICRO['05'][1]['d']='M 12 25 L 77 25 L 83 20 L 92 33 L 12 33 Z'
for e in MICRO['05'][2:]:e['stroke']='ink';e['width']=1.5;e['cap']='round'
MICRO['07']=copy.deepcopy(MARKS['07'])
for e in MICRO['07']:
    if e.get('stroke'):e['width']=max(8.0,e.get('width',6.0)*1.35)
    elif e.get('fill')=='ink':
        # Preserve hand-drawn contours while adding a small centered stroke at micro sizes.
        e['stroke']='ink';e['width']=1.7;e['cap']='round'
p=Page('10 - Optical size variants')
head(p,10,'同一个身份，两套尺寸','以 03、05、07 示范：放大版保留气质，小图标版加重细线、减少过细收笔。')
for i,key in enumerate(['03','05','07']):
    x=54+i*474
    p.text(key+'  '+META[key]['title'],x,221,22,INK)
    p.text('DISPLAY / 首页与大尺寸',x,264,11,MUTED)
    p.mark(key,x+65,294,258,group=key+' / Display comparison')
    p.line(x,578,x+425,578)
    p.text('MICRO / 16–24 px 候选',x,617,12,GREEN)
    for j,sz in enumerate([16,24,48]):
        xx=x+20+j*88
        p.mark(key,xx,725-sz,sz,group=key+' / Micro '+str(sz),variant=MICRO[key])
        p.text(str(sz)+' px',xx,759,11,MUTED,'Sans')
    p.mark(key,x+306,659,92,variant=MICRO[key],group=key+' / Micro enlarged')
    p.text('放大观察',x+308,785,11,MUTED)
    p.para({'03':'线宽从 7.8 加至 10 单位，圆点保持独立。','05':'增厚横画、简化楔形收笔，保留宋意的粗细关系。','07':'扩大手写笔画的有效黑量；继续保留四个独立笔点。'}[key],x,837,414,15,MUTED,25)

# 11: A real system from parts. Black primary fixed; accents only outside the mark.
p=Page('11 - Modules and a visual system')
head(p,11,'让构件去变化，让主标保持稳定','以 02 为例：四点可成为节律，横竖与斜画可成为版面图形。它们不必被固定解释成四个研究方向。')
p.text('01 / FIXED IDENTITY',54,225,12,MUTED,'Sans')
p.mark('02',72,258,255)
p.text('主标：固定构图',76,556,18,INK)
p.para('“杰”承担身份识别；不要让主标每次访问都随机变形。',76,592,308,15,MUTED,26)
p.text('02 / ELEMENTS',495,225,12,MUTED,'Sans')
p.rect(495,286,100,15,INK,'Horizontal module',group='Modules')
p.rect(649,264,15,100,INK,'Vertical module',group='Modules')
p.items.append(dict(type='path',commands=[['M',730,280],['L',748,268],['L',814,337],['L',796,350],['Z']],fill=INK,stroke=None,width=0,cap='butt',name='Diagonal module',group='Modules'))
for i in range(4):p.rect(496+i*64,432,26,26,INK,'Four-point unit '+str(i),group='Modules')
p.text('横 / 竖 / 斜',495,392,15,MUTED)
p.text('四点节律',495,500,15,MUTED)
p.text('03 / IN USE',938,225,12,MUTED,'Sans')
p.rect(936,259,506,317,TINT,'Research card')
p.text('RESEARCH NOTES',963,299,12,GREEN,'Sans')
p.text('Questions worth',963,385,34,INK,'Serif')
p.text('following.',963,427,34,INK,'Serif')
for i in range(4):p.rect(965+i*37,506,14,14,GREEN,'Card rhythm',group='System applications')
p.rect(54,676,1388,207,INK,'Footer / black')
p.mark('02',80,720,102,WHITE,INK,group='Footer lockup')
p.text('Jie Dean Zhong',210,758,34,WHITE,'Sans')
p.text('Exploring biological systems, one question at a time.',212,801,17,'#C9D1CA','Sans')
for i in range(4):
    # Modular divider, not a second competing logo.
    p.rect(1165+i*53,728+i*18,24,24,'#8CA895','Secondary rhythm',group='System applications')

# 12: Short selection guide and primary sources. Descriptive, not fake objective scores.
p=Page('12 - Selection and sources')
head(p,12,'如何选择，以及为什么这样设计','以下是设计判断，不是用户研究结果。所有“分岔、生命、可能性”均为造型隐喻，不是汉字字源解释。')
for i,(key,label,desc) in enumerate([('01','主标优先验证','先验证小尺寸、记忆轮廓与姓名组合。'),('02','系统优先验证','主标固定，构件可用于版面与辅助图形。'),('04','生物隐喻探索','弹性分岔为气质对照，继续检查小尺寸。'),('06','文化与个性探索','宽笔风格形成个人感，细端尚需校正。')]):
    x=54+(i%2)*730;y=216+(i//2)*180
    p.mark(key,x,y+6,94)
    p.text(key+' / '+label,x+122,y+32,21,INK)
    p.para(desc,x+122,y+67,495,15,MUTED,25)
p.line(54,593,1446,593)
p.text('一手参考 / PRINCIPLES, NOT TEMPLATES',54,635,13,INK,'Bold')
refs=[
('1  Paul Rand · Logos, Flags, and Escutcheons (1991)','识别优先；单色、可见性、可复用。','paulrand.design/writing/articles/1991-logos-flags-and-escutcheons.html'),
('2  Google Design · Evolving the Google Identity','小尺寸单独调整重量与光学比例。','design.google/library/evolving-google-identity'),
('3  Pentagram · MIT Media Lab','共同构件可以形成稳定而灵活的系统。','pentagram.com/work/mit-media-lab'),
('4  Monotype · Tencent global identity','不同文字保留结构，以重量和笔画气质协调。','enterprise.monotype.com/resources/case-studies/tencent-expands-global-presence'),
('5  Monotype · Quentin Blake handwriting','手写个性来自有规律的不规则与实际笔迹。','monotype.com/resources/case-studies/a-bespoke-handwriting-typeface-for-sir-quentin-blake'),
('6  Nielsen Norman Group · Homepage Links','左上角归属标识与明确的返回首页入口。','nngroup.com/articles/homepage-links/'),
('7  W3C WAI · Functional Images','功能图像的文字替代应描述用途或目的地。','w3.org/WAI/tutorials/images/functional/')]
for i,(title,summary,url) in enumerate(refs):
    col=0 if i<4 else 1;row=i if i<4 else i-4;x=54+col*730;y=672+row*64
    p.text(title,x,y,13,INK,'Sans')
    p.text(summary,x,y+23,12,MUTED)
    p.text(url,x,y+43,8.3,MUTED,'Sans')
    p.items[-1]['url']='https://'+url

# Function-first brief and a usage assessment, added ahead of stylistic preferences.
p=Page('Function comes first')
head(p,1,'先确定任务，再决定字形','核心任务：让学术访客认出“这是钟杰的网站”，把图形与姓名建立稳定联系，并顺利浏览研究与文章。')
p.text('使用情境 / INTENDED FUNCTION',54,228,12,INK,'Bold')
p.text('鼓励 / ENCOURAGED',433,228,12,GREEN,'Bold')
p.text('避免 / AVOID',970,228,12,RED,'Bold')
brief=[
('标签页与书签','在许多标签页中重新找到你。','紧凑、稳定的轮廓；16–32 px 单独校正；黑白仍可识别。','极细线、过密交点、依赖颜色；缩小后四点粘成一条线。'),
('所有页面的页眉','确认网站归属，并返回首页。','左上角标志与姓名成组；有独立轮廓；点击目标清楚。','占用过多导航空间；与普通导航文字混同；像无关装饰。'),
('首页个人介绍','迅速知道你是谁、研究什么。','姓名和研究身份优先；图形有个人感；中英文在重量上协调。','标志占满首屏；研究内容被挤走；看起来像商业品牌或机构。'),
('长期身份与扩展','研究方向改变时仍然适用。','主标固定；辅助构件延展；生物学作为轻度隐喻。','绑定某项实验、疾病或学科；同时塞入 DNA、树、火焰等解释。'),
('跨语言识别','不识中文也能把形状与你联系。','“杰”旁配 Jie Dean Zhong；保留中文结构；持续一致使用。','为了国际化强行拉丁化；要求访客先解谜；臆测外国人的偏好。')]
for i,(title,task,yes,no) in enumerate(brief):
    y=262+i*112
    p.line(54,y-14,1446,y-14)
    p.text(title,54,y+18,20,INK)
    p.text(task,54,y+49,13,MUTED)
    p.para(yes,433,y+17,465,15,INK,25)
    p.para(no,970,y+17,463,15,MUTED,25)
p.line(54,824,1446,824)
p.text('功能门槛：单色成立 → 小尺寸可辨 → 姓名组合协调 → 首页内容优先 → 最后选择气质。',54,858,19,INK)
p.text('导航依据：NN/g · Homepage Links Remain a Necessity；功能图像命名依据：W3C WAI · Functional Images。',54,894,12,MUTED)
first=PAGES.pop();PAGES.insert(0,first)

p=Page('Functional selection matrix')
head(p,14,'按用途筛选，不用故事替轮廓打分','这是当前草稿的设计适配判断；未进行真实访客识别实验。主标候选必须先通过小尺寸与姓名组合检查。')
xs=[54,326,560,812,1060]
for x,tx in zip(xs,['方向','标签页 / 16–24 px','页眉与姓名组合','首页个人身份','扩展与主要代价']):p.text(tx,x,222,14,INK)
matrix=[
('01 知性','优先细化','优先细化','清晰、克制','系统性适中；个性较含蓄'),
('02 构件','优先细化','优先细化','偏理性、偏机构','模块最好用；需个人化排版'),
('03 圆线','使用 MICRO 版','清爽、易协调','亲和、平易','通用感较强；辨识靠比例'),
('04 生长','需收紧笔点','可用，继续校正','个人与生物隐喻兼顾','辅助图形可延展；防生态化'),
('05 文脉','使用 MICRO 版','避免过小使用','学术、阅读气质','细线不是所有尺寸都适用'),
('06 落笔','需优化细端','优先细化','个人与文化表达强','需要控制字重及四点节律'),
('07 随笔','使用 MICRO 版','需增重与字重匹配','个人感强','最好用真实笔迹进一步定制'),
('08 印记','负形需再检查','黑块视觉重量较大','文化识别强','可能引发文创、茶饮联想'),
('09 切口','断口易消失','中等尺寸可用','实验感、工具感','尺寸版须保持同一骨架'),
('10 单元','离散部件易混','需中文识读检查','辅助图形更合适','可拆分最直观；字形较松'),
('11 分岔','形状简洁','必须与全名共现','个人身份联系较弱','不能读作杰；记忆需建立'),
('12 JZ','需清理连接处','字母环境较直接','文化信息较少','JZ 组合常见，独特性有限')]
for i,row in enumerate(matrix):
    y=265+i*46
    if i in [0,1]:p.rect(46,y-23,1400,45,TINT,'Shortlist row')
    for j,value in enumerate(row):p.text(value,xs[j],y,14,INK if j==0 else MUTED)
    p.line(54,y+17,1446,y+17,LINE,0.5)
p.text('选择顺序：01、02 先验证主标功能；04、06 保留为个人气质的对照，再做同等标准的功能验证。',54,862,18,INK)
p.text('下一轮再做：精修单一方向 → 16/24/32/48 px 真实渲染 → 放入当前页面 → 短时识别与回忆检查。',54,900,13,MUTED)

# An additional layout retains the actual homepage's identity and portrait hierarchy.
p=Page('Current portrait context')
head(p,15,'放回现有的个人首页','保留左侧姓名与研究身份、右侧肖像的关系；以 01、02 检查标志是否服务于人物，而非争夺首屏。')
for i,key in enumerate(['01','02']):
    x=54+i*714
    p.text(key+' / '+META[key]['title'],x,224,23,INK)
    p.rect(x,255,678,576,WHITE,'Existing layout context')
    p.rect(x,255,678,67,INK,'Site graphite navigation')
    p.mark(key,x+18,271,34,WHITE,INK,group=key+' / Portrait layout header')
    p.text('Jie Dean Zhong',x+65,296,16,WHITE,'Sans')
    p.text('Research   Blog   About',x+508,295,11,'#D0D5CF','Sans')
    p.rect(x,322,678,284,'#F0F1EC','Profile hero field')
    p.mark(key,x+29,360,42,group=key+' / Portrait layout homepage',paper='#F0F1EC')
    p.text('Jie Dean Zhong',x+32,446,28,INK,'Sans')
    p.text('钟杰',x+33,482,25,INK)
    p.text('Undergraduate Researcher',x+34,520,14,MUTED,'Sans')
    p.text('in Biological Sciences',x+34,543,14,MUTED,'Sans')
    p.image(REPO/'public/static/images/upper-body-trans.png',x+347,328.1875,320,277.8125)
    p.text('About',x+32,657,24,INK,'Sans')
    p.para('Jie Dean Zhong is an undergraduate student in Biological Sciences at Xi’an Jiaotong-Liverpool University.',x+32,693,285,14,MUTED,23,'Sans')
    p.para('His academic interests focus on synthetic biology, microbial engineering, and immunology.',x+359,693,283,14,MUTED,23,'Sans')
    p.text('Research',x+32,795,17,INK,'Sans')
p.text('功能检查：人像仍是视觉焦点；姓名不用解读图形就能读到；主标在页眉与介绍区保持同源。',54,883,17,INK)
portrait_page=PAGES.pop();PAGES.insert(9,portrait_page)

# Keep all page numbers truthful after inserting the functional brief.
for i,p in enumerate(PAGES,1):
    p.name=f'{i:02d} - '+re.sub(r'^\d+ - ','',p.name)
    for e in p.items:
        if e['type']=='text' and e['x']==1387 and e['y']==968:e['text']=f'{i:02d} / {len(PAGES):02d}'

def path_svg(e):
    return ' '.join(c[0]+(' '+' '.join(f'{n:g}' for n in c[1:]) if len(c)>1 else '') for c in e['commands'])

def svg_page(p,width=W,height=H):
    bits=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',f'<title>{html.escape(p.name)}</title>']
    current=None
    for e in p.items:
        if e['group']!=current:
            if current is not None:bits.append('</g>')
            current=e['group'];bits.append('<g data-name="'+html.escape(current,quote=True)+'">')
        if e['type']=='rect':bits.append(f'<rect x="{e["x"]}" y="{e["y"]}" width="{e["w"]}" height="{e["h"]}" fill="{e["fill"]}"/>')
        elif e['type']=='path':bits.append(f'<path d="{path_svg(e)}" fill="{e.get("fill") or "none"}" stroke="{e.get("stroke") or "none"}" stroke-width="{e["width"]}" stroke-linecap="{e["cap"]}" stroke-linejoin="round"><title>{html.escape(e["name"])}</title></path>')
        elif e['type']=='image':
            encoded=base64.b64encode(Path(e['path']).read_bytes()).decode()
            bits.append(f'<image xmlns:xlink="http://www.w3.org/1999/xlink" x="{e["x"]}" y="{e["y"]}" width="{e["w"]}" height="{e["h"]}" xlink:href="data:image/png;base64,{encoded}"/>')
        else:
            family={'CN':'Arial Unicode MS, Hiragino Sans GB, sans-serif','Sans':'Arial, Helvetica, sans-serif','Bold':'Arial, Helvetica, sans-serif','Serif':'Georgia, serif'}[e['font']]
            bits.append(f'<text x="{e["x"]}" y="{e["y"]}" font-family="{family}" font-weight="{700 if e["font"]=="Bold" else 400}" font-size="{e["size"]}" fill="{e["fill"]}">{html.escape(e["text"])}</text>')
    if current:bits.append('</g>')
    return '\n'.join(bits+['</svg>'])

def draw_pdf(p,c):
    for e in p.items:
        c.saveState()
        if e.get('fill'):c.setFillColor(HexColor(e['fill']))
        if e['type']=='rect':c.rect(e['x'],H-e['y']-e['h'],e['w'],e['h'],stroke=0,fill=1)
        elif e['type']=='image':c.drawImage(e['path'],e['x'],H-e['y']-e['h'],e['w'],e['h'],mask='auto')
        elif e['type']=='text':
            c.setFont(e['font'],e['size']);c.drawString(e['x'],H-e['y'],e['text'])
            if e.get('url'):
                width=pdfmetrics.stringWidth(e['text'],e['font'],e['size'])
                c.linkURL(e['url'],(e['x'],H-e['y']-2,e['x']+width,H-e['y']+e['size']),relative=0,thickness=0)
        else:
            if e.get('stroke'):
                c.setStrokeColor(HexColor(e['stroke']));c.setLineWidth(e['width']);c.setLineCap(1 if e['cap']=='round' else 0);c.setLineJoin(1)
            path=c.beginPath()
            for cmd in e['commands']:
                if cmd[0]=='M':path.moveTo(cmd[1],H-cmd[2])
                elif cmd[0]=='L':path.lineTo(cmd[1],H-cmd[2])
                elif cmd[0]=='C':path.curveTo(cmd[1],H-cmd[2],cmd[3],H-cmd[4],cmd[5],H-cmd[6])
                else:path.close()
            c.drawPath(path,stroke=bool(e.get('stroke')),fill=bool(e.get('fill')))
        c.restoreState()

if __name__=='__main__':
    for sub in ['marks','artboards','previews']: (ROOT/sub).mkdir(exist_ok=True)
    pdf=REPO/'output/pdf/Jie-Identity-Explorations.pdf'
    c=canvas.Canvas(str(pdf),pagesize=(W,H),pageCompression=1)
    c.setTitle('Jie / Twelve identity directions');c.setAuthor('Jie Dean Zhong · design studies')
    for i,p in enumerate(PAGES):
        draw_pdf(p,c);c.showPage()
        (ROOT/'artboards'/f'{i+1:02d}.svg').write_text(svg_page(p))
    c.save()
    for key in MARKS:
        for suffix,ink,paper in [('black',INK,WHITE),('white',WHITE,INK)]:
            p=Page(key+' / '+META[key]['title']);p.mark(key,0,0,100,ink,paper)
            (ROOT/'marks'/f'{key}-{suffix}.svg').write_text(svg_page(p,100,100));PAGES.pop()
    for key,mark in MICRO.items():
        p=Page(key+' / micro');p.mark(key,0,0,100,variant=mark)
        (ROOT/'marks'/f'{key}-micro.svg').write_text(svg_page(p,100,100));PAGES.pop()
    data={'width':W,'height':H,'pages':[{'name':p.name,'items':p.items} for p in PAGES]}
    (ROOT/'source/study-data.json').write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')))
    (ROOT/'source/marks.json').write_text(json.dumps(MARKS,ensure_ascii=False,indent=2))
    print(f'Created {len(PAGES)} artboards, 12 original vector marks, 3 micro variants, PDF: {pdf}')
