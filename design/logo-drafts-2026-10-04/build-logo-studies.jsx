#target illustrator
(function () {
  var out = new Folder('/Users/jie/Projects/2_coding_projects/JieDeanZhong.github.io/design/logo-drafts-2026-10-04');
  var report = new File(out.fsName + '/build-status.txt');
  try {
    var d = app.documents.add(DocumentColorSpace.RGB, 1200, 900);
    d.artboards[0].artboardRect = [0, 900, 1200, 0];
    d.artboards[0].name = '01 - JZ - shared 7x7 grid';
    d.artboards.add([1280, 900, 2480, 0]);
    d.artboards[1].name = '02 - Jie - modular Chinese character';
    var bg = d.layers[0]; bg.name = '01 - Paper and reverse fields';
    var gridLayer = d.layers.add(); gridLayer.name = '02 - Construction grids - toggle visibility';
    var art = d.layers.add(); art.name = '03 - Editable logo geometry';
    var typeLayer = d.layers.add(); typeLayer.name = '04 - Labels and typography';
    function rgb(hex) {
      var c = new RGBColor(); c.red = parseInt(hex.substr(0,2),16); c.green = parseInt(hex.substr(2,2),16); c.blue = parseInt(hex.substr(4,2),16); return c;
    }
    var ink=rgb('191B1C'), white=rgb('FFFFFF'), paper=rgb('FAFAF7'), muted=rgb('686D70'), gridC=rgb('DADDDC'), accent=rgb('BA513F'), soft=rgb('AEB3B3');
    function font(name, fallback) { try { return app.textFonts.getByName(name); } catch(e) { return app.textFonts.getByName(fallback); } }
    var regular=font('HelveticaNeue','ArialMT'), bold=font('HelveticaNeue-Medium','Arial-BoldMT'), mono=font('Menlo-Regular','Courier'), chinese=font('PingFangSC-Regular','ArialMT');
    function rect(parent,x,y,w,h,fill,name) { var p=parent.pathItems.rectangle(900-y,x,w,h); p.stroked=false; p.filled=true; p.fillColor=fill; p.name=name||'Rectangle'; return p; }
    function path(parent,pts,fill,name) { var p=parent.pathItems.add(), q=[]; for(var i=0;i<pts.length;i++)q.push([pts[i][0],900-pts[i][1]]); p.setEntirePath(q);p.closed=true;p.stroked=false;p.filled=true;p.fillColor=fill;p.name=name||'Module';return p; }
    function line(parent,x1,y1,x2,y2,color,width) {var p=parent.pathItems.add();p.setEntirePath([[x1,900-y1],[x2,900-y2]]);p.stroked=true;p.filled=false;p.strokeColor=color;p.strokeWidth=width;return p;}
    function text(parent,content,x,y,size,color,f,name) {var t=parent.textFrames.add();t.contents=content;t.position=[x,900-y];t.textRange.characterAttributes.textFont=f||regular;t.textRange.characterAttributes.size=size;t.textRange.characterAttributes.fillColor=color||ink;t.name=name||content;return t;}
    function group(parent,name){var g=parent.groupItems.add();g.name=name;return g;}
    var jPoly=[[0,0],[4,0],[4,4],[0,4],[0,2],[1,2],[1,3],[3,3],[3,1],[0,1]];
    var zPoly=[[4,3],[7,3],[7,4],[5,6],[7,6],[7,7],[3,7],[3,6],[5,4],[4,4]];
    var leftBranch=[[3,2],[4,2],[1,5],[0,5]];
    var rightBranch=[[3,2],[4,2],[7,5],[6,5]];
    function shape(parent,points,x,y,u,color,name){var p=[];for(var i=0;i<points.length;i++)p.push([x+points[i][0]*u,y+points[i][1]*u]);return path(parent,p,color,name);}
    function jz(parent,x,y,u,color,name,separate){var g=group(parent,name||'JZ');shape(g,jPoly,x,y,u,color,'J - square hook');shape(g,zPoly,x,y,u,separate||color,'Z - 45 degree diagonal');return g;}
    function jie(parent,x,y,u,color,name,dotsColor){var g=group(parent,name||'Jie');shape(g,leftBranch,x,y,u,color,'Mu - left branch');shape(g,rightBranch,x,y,u,color,'Mu - right branch');rect(g,x+3*u,y,u,5*u,color,'Mu - vertical stem');rect(g,x,y+u,7*u,u,color,'Mu - horizontal beam');for(var i=0;i<4;i++)rect(g,x+2*i*u,y+6*u,u,u,dotsColor||color,'Huo - dot '+(i+1));return g;}
    function grid(x,y,u){var g=group(gridLayer,'7 x 7 / 1u = '+u+'pt');for(var i=0;i<=7;i++){line(g,x+i*u,y,x+i*u,y+7*u,gridC,0.6);line(g,x,y+i*u,x+7*u,y+i*u,gridC,0.6);}for(var k=0;k<7;k++){text(typeLayer,String(k+1),x+k*u+u/2-3,y-21,9,soft,mono);text(typeLayer,String(k+1),x-23,y+k*u+u/2-6,9,soft,mono);}line(g,x,y+7*u+18,x+u,y+7*u+18,accent,0.8);line(g,x,y+7*u+14,x,y+7*u+22,accent,0.8);line(g,x+u,y+7*u+14,x+u,y+7*u+22,accent,0.8);text(typeLayer,'1u',x+u/2-7,y+7*u+25,10,accent,mono);}
    function base(o,num,title,subtitle){
      rect(bg,o,0,1200,900,paper,'Artboard '+num+' paper');
      text(typeLayer,'JIE DEAN ZHONG',o+64,42,12,ink,bold);
      text(typeLayer,'PERSONAL IDENTITY / STUDY '+num,o+810,44,10,muted,mono);
      line(typeLayer,o+64,77,o+1136,77,gridC,0.7);
      text(typeLayer,title,o+64,105,38,ink,bold);
      text(typeLayer,subtitle,o+66,160,14,muted,chinese);
      text(typeLayer,'A / CONSTRUCTION',o+64,209,10,muted,mono);
      text(typeLayer,'B / SOLID MARK',o+560,209,10,muted,mono);
      text(typeLayer,'C / REVERSE',o+912,209,10,muted,mono);
      line(typeLayer,o+64,629,o+1136,629,gridC,0.7);
      text(typeLayer,'D / STRUCTURE',o+64,652,10,muted,mono);
      text(typeLayer,'E / SMALL SIZES',o+392,652,10,muted,mono);
      text(typeLayer,'F / HOMEPAGE SIGNATURE',o+744,652,10,muted,mono);
      line(typeLayer,o+64,842,o+1136,842,gridC,0.7);
      text(typeLayer,'FIRST DRAFT / 04 OCT 2026',o+64,862,9,muted,mono);
      text(typeLayer,'7 x 7 modules / editable filled paths / monochrome',o+706,862,9,muted,mono);
    }
    function samples(o,draw){
      draw(art,o+560,280,32,ink,'Primary / solid / 224 px');
      rect(bg,o+912,254,224,224,ink,'Reverse field');
      draw(art,o+940,282,24,white,'Primary / reverse / 168 px');
      text(typeLayer,'No grid / 224 px',o+560,548,11,muted,regular);
      text(typeLayer,'White on graphite',o+912,500,11,muted,regular);
      var sz=[16,24,32,48],pos=[392,462,538,622];
      for(var i=0;i<sz.length;i++) {draw(art,o+pos[i],758-sz[i],sz[i]/7,ink,'Size check / '+sz[i]+' px');text(typeLayer,String(sz[i])+' px',o+pos[i],783,10,muted,mono);}
      rect(bg,o+744,700,392,93,ink,'Homepage header sample');
      draw(art,o+763,724,5.5,white,'Homepage / 38.5 px');
      text(typeLayer,'Jie Dean Zhong',o+820,728,21,white,bold);
      text(typeLayer,'RESEARCH  /  WRITING',o+821,758,8.5,rgb('B5B9BC'),mono);
    }
    base(0,'01','JZ / Shared grid','J \u7684\u4e0b\u6a2a\u4e0e Z \u7684\u4e0a\u6a2a\u8854\u63a5\uff1b\u7528\u4e00\u6761 45\xb0 \u659c\u7ebf\u6253\u7834\u65b9\u683c\u8282\u594f\u3002');
    grid(88,260,44);
    jz(art,88,260,44,ink,'01 / Master on 7 x 7 grid');
    text(typeLayer,'7 x 7 / square terminals / 45 degree diagonal',64,602,10,muted,mono);
    samples(0,jz);
    jz(art,64,702,13,ink,'01 / J + Z decomposition',accent);
    text(typeLayer,'J',185,708,25,ink,bold);
    text(typeLayer,'+',217,712,18,muted,regular);
    text(typeLayer,'Z',244,708,25,accent,bold);
    text(typeLayer,'Shared middle beam',185,751,11,muted,regular);
    text(typeLayer,'\u5171\u4eab\u4e2d\u6bb5\uff0c\u5f62\u6210\u4e00\u4e2a\u7b26\u53f7',185,771,11,muted,chinese);
    base(1280,'02','\u6770 / Modular character','\u4fdd\u7559\u300c\u6728\u300d\u7684\u9aa8\u67b6\uff0c\u628a\u56db\u70b9\u538b\u6210\u7b49\u8ddd\u65b9\u5757\uff1b\u4ee5\u5b57\u5f62\u672c\u8eab\u5efa\u7acb\u8fa8\u8bc6\u5ea6\u3002');
    // Chinese headline uses a CJK font while all marks remain native paths.
    for(var ti=0;ti<typeLayer.textFrames.length;ti++){if(typeLayer.textFrames[ti].contents==='\u6770 / Modular character')typeLayer.textFrames[ti].textRange.characterAttributes.textFont=chinese;}
    grid(1368,260,44);
    jie(art,1368,260,44,ink,'02 / Master on 7 x 7 grid');
    text(typeLayer,'7 x 7 / Mu skeleton / four square dots',1344,602,10,muted,mono);
    samples(1280,jie);
    jie(art,1344,702,13,ink,'02 / Mu + Huo decomposition',accent);
    text(typeLayer,'\u6728 + \u706c',1465,706,26,ink,chinese);
    text(typeLayer,'One character, two rhythms',1465,751,11,muted,regular);
    text(typeLayer,'\u4e0a\u65b9\u8fde\u8d2f\uff0c\u4e0b\u65b9\u56db\u70b9\u72ec\u7acb',1465,771,11,muted,chinese);
    bg.locked=true;gridLayer.locked=true;typeLayer.locked=true;
    d.activeLayer=art;d.selection=null;
    d.artboards.setActiveArtboardIndex(0);
    var opts=new IllustratorSaveOptions();opts.pdfCompatible=true;opts.compressed=true;
    d.saveAs(new File(out.fsName+'/Jie-Dean-Zhong-logo-studies-v01.ai'),opts);
    var exp=new ExportOptionsPNG24();exp.artBoardClipping=true;exp.antiAliasing=true;exp.transparency=false;exp.horizontalScale=140;exp.verticalScale=140;
    for(var b=0;b<2;b++){d.artboards.setActiveArtboardIndex(b);d.exportFile(new File(out.fsName+'/'+(b===0?'01-jz-grid-study':'02-jie-modular-study')),ExportType.PNG24,exp);}
    d.artboards.setActiveArtboardIndex(0);
    app.executeMenuCommand('fitin');
    d.save();
    report.open('w');report.write('SUCCESS\nArtboards: '+d.artboards.length+'\nPaths: '+d.pathItems.length+'\nRaster items: '+d.rasterItems.length+'\nText frames: '+d.textFrames.length+'\nAI: '+d.fullName.fsName);report.close();
  } catch(e){report.open('w');report.write('ERROR: '+e+'\nLine: '+e.line);report.close();alert('Logo study creation: '+e+' (line '+e.line+')');}
})();
