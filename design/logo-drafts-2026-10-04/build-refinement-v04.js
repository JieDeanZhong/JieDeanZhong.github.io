#target illustrator
(function () {
  var folder = new Folder('/Users/jie/Projects/2_coding_projects/JieDeanZhong.github.io/design/logo-drafts-2026-10-04');
  var status = new File(folder.fsName + '/refinement-v04-status.txt');
  status.open('w'); status.writeln('START'); status.close();
  function log(s) { status.open('a'); status.writeln(s); status.close(); }
  try {
    var W = 1440, H = 960;
    var doc = app.documents.add(DocumentColorSpace.RGB, W, H);
    doc.artboards[0].artboardRect = [0,H,W,0];
    doc.artboards[0].name = '01 - Revision comparison';
    doc.artboards.add([1520,H,2960,0]); doc.artboards[1].name = '02 - Construction and optical correction';
    doc.artboards.add([0,-80,W,-1040]); doc.artboards[2].name = '03 - Homepage and size proofs';
    doc.artboards.add([1520,-80,2120,-680]); doc.artboards[3].name = '04 - Recommended master';
    function rgb(hex) { var c = new RGBColor(); c.red=parseInt(hex.substr(0,2),16); c.green=parseInt(hex.substr(2,2),16); c.blue=parseInt(hex.substr(4,2),16); return c; }
    var ink=rgb('1D1D1F'), white=rgb('FFFFFF'), paper=rgb('FAFAF7'), muted=rgb('66706E'), pale=rgb('DFE3DF'), accent=rgb('45695B'), tint=rgb('EDF2EE');
    var backgrounds=doc.layers[0]; backgrounds.name='01 - Backgrounds';
    var guides=doc.layers.add(); guides.name='02 - Construction guides - toggle';
    var marks=doc.layers.add(); marks.name='03 - Editable vector logos';
    var textLayer=doc.layers.add(); textLayer.name='04 - Labels and annotations';
    function font(n,f) {try{return app.textFonts.getByName(n);}catch(e){return app.textFonts.getByName(f);}}
    var sans=font('HelveticaNeue','ArialMT'), medium=font('HelveticaNeue-Medium','Arial-BoldMT'), mono=font('Menlo-Regular','Courier'), cn=font('PingFangSC-Regular','ArialMT');
    function box(p,x,y,w,h,c,n){var a=p.pathItems.rectangle(H-y,x,w,h);a.filled=true;a.fillColor=c;a.stroked=false;a.name=n||'Rectangle';return a;}
    function line(p,x1,y1,x2,y2,c,width,dashed){var a=p.pathItems.add();a.setEntirePath([[x1,H-y1],[x2,H-y2]]);a.filled=false;a.stroked=true;a.strokeColor=c;a.strokeWidth=width||0.7;if(dashed)a.strokeDashes=[3,5];return a;}
    function text(s,x,y,size,c,f){var t=textLayer.textFrames.add();t.contents=s;t.position=[x,H-y];t.textRange.characterAttributes.size=size;t.textRange.characterAttributes.textFont=f||sans;t.textRange.characterAttributes.fillColor=c||ink;t.name=s;return t;}
    function poly(p,pts,x,y,u,c,name){var a=p.pathItems.add(),q=[];for(var i=0;i<pts.length;i++)q.push([x+pts[i][0]*u,H-y-pts[i][1]*u]);a.setEntirePath(q);a.closed=true;a.stroked=false;a.filled=true;a.fillColor=c;a.name=name;return a;}
    var old={id:'V03 B',angle:35,h:4.8,beam:0.7,bw:1,dw:1};
    var skeleton={id:'V04 geometry',angle:40,h:5.4,beam:0.95,bw:1,dw:1};
    var master={id:'V04 recommended',angle:40,h:5.4,beam:0.95,bw:0.90,dw:0.94};
    function geometry(s){
      var k=1/Math.tan(s.angle*Math.PI/180), q=s.dw*Math.sqrt(1+k*k), ci=1+k*s.h, co=ci-q;
      var j0=(co-3)/k,j1=(ci-3)/k, tip=co/k, b=s.beam, e=b+s.bw;
      if(j0<=e)throw Error('Branch joint intersects beam in '+s.id);
      return {points:[[3,0],[4,0],[4,b],[7,b],[7,e],[4,e],[4,j0],[7,tip],[7,s.h],[6,s.h],[4,j1],[4,s.h],[3,s.h],[3,j1],[1,s.h],[0,s.h],[0,tip],[3,j0],[3,e],[0,e],[0,b],[3,b]],j0:j0,j1:j1,tip:tip,k:k,q:q,neck:j0-e};
    }
    function logo(s,x,y,u,c,name){var g=marks.groupItems.add();g.name=name;poly(g,geometry(s).points,x,y,u,c,'Wood - single continuous editable outline');for(var d=0;d<4;d++)box(g,x+d*2*u,y+(s.h+1)*u,u,u,c,'Dot '+(d+1)+' - original 1u square');return g;}
    function pageHead(ox,oy,num,title,sub){box(backgrounds,ox,oy,W,H,paper,'Page '+num);text('JIE DEAN ZHONG',ox+48,oy+31,12,ink,medium);text('IDENTITY REFINEMENT / V04 / '+num,ox+1112,oy+33,10,muted,mono);line(textLayer,ox+48,oy+68,ox+1392,oy+68,pale);text(title,ox+48,oy+92,34,ink,cn);text(sub,ox+49,oy+145,14,muted,cn);}
    function foot(ox,oy,left,right){line(textLayer,ox+48,oy+892,ox+1392,oy+892,pale);text(left,ox+48,oy+911,11,muted,cn);text(right,ox+1080,oy+913,9,muted,mono);}
    pageHead(0,0,'01','\u6770 / \u4ece\u7ed3\u6784\u5230\u89c6\u89c9\u5747\u8861','\u56fa\u5b9a\u56db\u70b9\u4e0e\u4e24\u4fa7\u8fb9\u754c\uff0c\u5148\u8c03\u6574\u9aa8\u67b6\uff0c\u518d\u6821\u6b63\u6a2a\u753b\u4e0e\u659c\u753b\u7684\u91cd\u91cf\u3002');
    var columns=[48,512,976], specs=[old,skeleton,master];
    var titles=['01  \u4e0a\u4e00\u7248 B','02  \u9aa8\u67b6\u8c03\u6574','03  \u63a8\u8350\u4fee\u8ba2'];
    var subtitles=['V03 / REFERENCE','V04 / EQUAL STROKES','V04 / OPTICAL ADJUSTMENT'];
    for(var i=0;i<3;i++){
      var x=columns[i],s=specs[i],u=42,ly=574-(s.h+1)*u;
      if(i===2)box(backgrounds,x-16,190,448,572,tint,'Recommended panel');
      text(titles[i],x,210,23,i===2?accent:ink,cn);text(subtitles[i],x,251,10,muted,mono);
      logo(s,x+61,ly,u,ink,s.id+' / comparison');
      text(i===0?'7 : 6.8  /  35 deg':'7 : 7.4  /  40 deg',x,663,12,muted,mono);
      text(i===2?'\u7ad6 1.00 / \u6a2a 0.90 / \u659c 0.94':'\u7ad6 / \u6a2a / \u659c = 1.00',x,694,14,ink,cn);
      text(i===0?'\u4fdd\u7559\u4f5c\u6bd4\u8f83\u57fa\u51c6\u3002':i===1?'\u589e\u52a0\u9ad8\u5ea6\uff0c\u7ed9\u6a2a\u753b\u4e0e\u5206\u53c9\u7559\u51fa\u95f4\u9694\u3002':'\u51cf\u8f7b\u4e0a\u90e8\u9ed1\u91cf\uff0c\u4fdd\u7559\u56db\u70b9\u7684\u7a33\u5b9a\u8282\u594f\u3002',x,725,12,muted,cn);
      logo(s,x,807,32/7,ink,s.id+' / 32px width');
      logo(s,x+75,797,48/7,ink,s.id+' / 48px width');
      text('32 / 48 px wide',x+166,815,11,muted,mono);
    }
    foot(0,0,'\u4e09\u7248\u56db\u70b9\u5c3a\u5bf8\u4e0e\u95f4\u8ddd\u76f8\u540c\uff1b02 \u2192 03 \u4ec5\u8c03\u6574\u6a2a\u753b\u4e0e\u659c\u753b\u5bbd\u5ea6\u3002','04 OCT 2026 / REVIEW COPY');
    // Construction sheet.
    var ox=1520,oy=0, gx=ox+86,gy=245,gu=65,gm=geometry(master);
    pageHead(ox,oy,'02','\u6770 / \u6784\u9020\u4e0e\u6821\u6b63','\u4ee5\u56db\u70b9\u4f5c\u4e3a\u6a21\u6570\uff1b\u4fdd\u7559\u5173\u952e\u5bf9\u9f50\uff0c\u5141\u8bb8\u7b14\u753b\u5185\u90e8\u4f7f\u7528\u975e\u6574\u6570\u4f4d\u7f6e\u3002');
    for(var vx=0;vx<=7;vx++)line(guides,gx+vx*gu,gy-20,gx+vx*gu,gy+7.4*gu+22,(vx===0||vx===7)?accent:pale,(vx===0||vx===7)?0.8:0.5,true);
    var ys=[0,master.beam,master.beam+master.bw,master.h,master.h+1,master.h+2];
    for(var z=0;z<ys.length;z++)line(guides,gx-24,gy+ys[z]*gu,gx+7*gu+20,gy+ys[z]*gu,pale,0.6,true);
    logo(master,gx,gy,gu,ink,'Recommended / construction');
    line(guides,gx,gy-33,gx+7*gu,gy-33,accent,0.8);line(guides,gx,gy-38,gx,gy-28,accent,0.8);line(guides,gx+7*gu,gy-38,gx+7*gu,gy-28,accent,0.8);
    text('7u / common outer width',gx+111,gy-58,11,accent,mono);
    text('u',gx+gu*0.4,gy+7.4*gu+30,12,accent,mono);
    text('u',gx+gu*1.4,gy+7.4*gu+30,12,accent,mono);
    text('\u56db\u70b9\u5404 1u\uff0c\u70b9\u95f4\u8ddd 1u\uff0c\u4e0a\u4e0b\u95f4\u9694 1u\u3002',gx,807,13,muted,cn);
    var tx=ox+684;
    text('01 / \u5bf9\u9f50',tx,220,20,ink,cn);text('\u6a2a\u753b\u4e24\u7aef\u3001\u6487\u637a\u5916\u7f18\u4e0e\u56db\u70b9\u603b\u5bbd\u5747\u4e3a 7u\u3002',tx,257,14,muted,cn);
    text('02 / \u7559\u767d',tx,319,20,ink,cn);text('\u6a2a\u753b\u5e95\u90e8\u81f3\u5206\u53c9\u5916\u7f18\u7ea6 0.64u\u3002',tx,356,14,muted,cn);text('\u4e2d\u592e\u4fdd\u7559\u77ed\u7ad6\u6bb5\uff0c\u907f\u514d\u6a2a\u753b\u548c\u6487\u637a\u6324\u5728\u4e00\u8d77\u3002',tx,382,14,muted,cn);
    text('03 / \u89c6\u89c9\u7c97\u7ec6',tx,447,20,ink,cn);
    var weights=[1,0.9,0.94],names=['\u4e3b\u5e72 1.00u','\u6a2a\u753b 0.90u','\u659c\u753b 0.94u'];
    for(var wi=0;wi<3;wi++){box(marks,tx,492+wi*53,weights[wi]*150,12,ink,'Relative width '+names[wi]);text(names[wi],tx+180,487+wi*53,14,ink,cn);}
    text('\u8fd9\u4e9b\u6570\u503c\u662f\u672c\u7a3f\u7684\u89c6\u89c9\u8bd5\u9a8c\u503c\uff0c\u5e76\u975e\u901a\u7528\u6bd4\u4f8b\u3002',tx,667,13,muted,cn);
    text('04 / \u8fde\u7eed\u8f6e\u5ed3',tx,733,20,ink,cn);text('\u4e0a\u90e8\u5408\u4e3a\u4e00\u6761\u95ed\u5408\u8f6e\u5ed3\uff0c\u56db\u70b9\u72ec\u7acb\u4fdd\u7559\u3002',tx,770,14,muted,cn);text('\u6d88\u9664\u91cd\u53e0\u8fb9\u7f18\uff0c\u4fbf\u4e8e\u7ee7\u7eed\u8c03\u6574\u951a\u70b9\u3002',tx,796,14,muted,cn);
    foot(ox,oy,'\u7f51\u683c\u548c\u8f85\u52a9\u7ebf\u5355\u72ec\u5206\u5c42\uff0c\u53ef\u9690\u85cf\u540e\u5224\u65ad\u6574\u4f53\u3002','W:H 7:7.4 / ANGLE 40 DEG');
    // Context and small-size proofs. All marks are native vector, at labelled widths.
    ox=0;oy=1040;
    pageHead(ox,oy,'03','\u6770 / \u5b9e\u9645\u4f7f\u7528\u68c0\u67e5','\u7528\u7f51\u9875\u9875\u7709\u3001\u59d3\u540d\u7ec4\u5408\u3001\u9ed1\u767d\u53cd\u8f6c\u4e0e\u5c0f\u5c3a\u5bf8\u68c0\u67e5\uff1b\u5e94\u7528\u753b\u9762\u4e3a\u6392\u7248\u9884\u89c8\u3002');
    text('HOMEPAGE HEADER / DARK',ox+48,oy+201,10,muted,mono);
    box(backgrounds,ox+48,oy+233,1344,116,ink,'Homepage header - existing site dark gray');
    logo(master,ox+82,oy+260,48/7,white,'Homepage header / 48px width');
    text('Jie Dean Zhong',ox+151,oy+270,23,white,medium);
    var nav=['Research','Blog','News','About'], nx=[910,1040,1140,1240];
    for(var n=0;n<nav.length;n++)text(nav[n],ox+nx[n],oy+277,16,rgb('D1D5DB'),sans);
    text('NAME LOCKUP / LIGHT',ox+48,oy+395,10,muted,mono);
    logo(master,ox+69,oy+441,64/7,ink,'Name lockup / 64px width');
    text('Jie Dean Zhong',ox+161,oy+453,30,ink,medium);text('\u949f\u6770',ox+163,oy+496,15,muted,cn);
    text('SYMBOL / REVERSED',ox+878,oy+395,10,muted,mono);
    box(backgrounds,ox+878,oy+433,230,136,ink,'Reverse test');logo(master,ox+961,oy+466,64/7,white,'Reverse / same construction');
    box(backgrounds,ox+1132,oy+433,230,136,white,'Positive test');logo(master,ox+1215,oy+466,64/7,ink,'Positive / same construction');
    line(textLayer,ox+48,oy+609,ox+1392,oy+609,pale);
    text('SMALL SIZE / SYMBOL WIDTH',ox+48,oy+634,10,muted,mono);
    var sizes=[16,24,32,48],sx=[68,200,356,532];
    for(var si=0;si<sizes.length;si++){
      var sz=sizes[si],px=ox+sx[si];
      logo(master,px,oy+698,sz/7,ink,'Native size / '+sz+'px black');
      text(sz+' px',px,oy+778,11,muted,mono);
      box(backgrounds,px,oy+813,sz+18,(sz/7)*7.4+18,ink,'Reverse size field '+sz);
      logo(master,px+9,oy+822,sz/7,white,'Native size / '+sz+'px reverse');
    }
    text('\u68c0\u67e5\u91cd\u70b9',ox+879,oy+661,19,ink,cn);
    text('\u2022 \u56db\u70b9\u662f\u5426\u4ecd\u80fd\u6e05\u695a\u5206\u5f00',ox+879,oy+704,14,muted,cn);
    text('\u2022 \u4e2d\u592e\u662f\u5426\u51fa\u73b0\u8fc7\u91cd\u7684\u9ed1\u5757',ox+879,oy+739,14,muted,cn);
    text('\u2022 \u659c\u753b\u4e0e\u6a2a\u7ad6\u662f\u5426\u663e\u5f97\u540c\u6837\u6709\u529b',ox+879,oy+774,14,muted,cn);
    text('\u2022 \u4e0e\u59d3\u540d\u5e76\u6392\u65f6\u662f\u5426\u4fdd\u6301\u5e73\u8861',ox+879,oy+809,14,muted,cn);
    foot(ox,oy,'\u6807\u6ce8\u4e3a\u753b\u677f\u4e2d\u7684\u539f\u59cb\u50cf\u7d20\u5bbd\u5ea6\uff1b\u67e5\u770b 100% \u53ef\u5224\u65ad\u5c0f\u5c3a\u5bf8\u8868\u73b0\u3002','PREVIEW / NOT PUBLISHED');
    // Clean master on its own artboard, no raster content.
    box(backgrounds,1520,1040,600,600,white,'Master white background');
    logo(master,1520+118,1040+(600-7.4*52)/2,52,ink,'V04 / RECOMMENDED EDITABLE MASTER');
    // Save a compact, transparent SVG from exactly the same outline and four squares.
    function svg(c){var p=geometry(master).points,d='';for(var a=0;a<p.length;a++)d+=(a?'L':'M')+p[a][0].toFixed(5)+' '+p[a][1].toFixed(5)+' ';d+='Z';var st='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 7.4" fill="'+c+'" role="img" aria-label="Jie"><path d="'+d+'"/>';for(var k=0;k<4;k++)st+='<rect x="'+(k*2)+'" y="6.4" width="1" height="1"/>';return st+'</svg>';}
    function write(name,content){var f=new File(folder.fsName+'/'+name);f.encoding='UTF-8';f.open('w');f.write(content);f.close();}
    write('jie-v04.svg',svg('#1d1d1f'));write('jie-v04-white.svg',svg('#ffffff'));
    for(var sn=0;sn<specs.length;sn++){var ss=specs[sn],gg=geometry(ss);log(ss.id+': angle='+ss.angle+'; height='+(ss.h+2)+'u; stem=1; horizontal='+ss.bw+'; diagonal='+ss.dw+'; neck='+gg.neck.toFixed(5)+'; dots 1x1 at x=0,2,4,6; outer width=7u');}
    backgrounds.locked=true;guides.locked=true;textLayer.locked=true;doc.activeLayer=marks;doc.selection=null;
    doc.artboards.setActiveArtboardIndex(0);
    var save=new IllustratorSaveOptions();save.pdfCompatible=true;save.compressed=true;doc.saveAs(new File(folder.fsName+'/Jie-refinement-v04.ai'),save);log('AI saved');
    var namesPng=['jie-v04-comparison','jie-v04-construction','jie-v04-applications','jie-v04-master'];
    for(var ab=0;ab<4;ab++){doc.artboards.setActiveArtboardIndex(ab);var png=new ExportOptionsPNG24();png.artBoardClipping=true;png.antiAliasing=true;png.transparency=false;png.horizontalScale=(ab===2?100:140);png.verticalScale=png.horizontalScale;doc.exportFile(new File(folder.fsName+'/'+namesPng[ab]),ExportType.PNG24,png);log('PNG '+namesPng[ab]);}
    doc.artboards.setActiveArtboardIndex(0);app.executeMenuCommand('fitin');doc.save();
    log('SUCCESS / '+doc.artboards.length+' artboards / '+doc.rasterItems.length+' raster items / '+doc.pathItems.length+' paths');
  } catch(e) {log('ERROR '+e+' / line '+e.line);alert('Logo refinement: '+e+' / line '+e.line);}
})();
