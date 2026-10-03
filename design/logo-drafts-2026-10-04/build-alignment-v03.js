#target illustrator
(function(){
 var out=new Folder('/Users/jie/Projects/2_coding_projects/JieDeanZhong.github.io/design/logo-drafts-2026-10-04');
 var status=new File(out.fsName+'/alignment-v03-status.txt');
 function log(s){status.open('a');status.writeln(s);status.close();}
 status.open('w');status.write('START\n');status.close();
 try{
  var doc=app.documents.add(DocumentColorSpace.RGB,1320,960);
  doc.artboards[0].artboardRect=[0,960,1320,0];doc.artboards[0].name='00 - Alignment comparison';
  var specs=[
   {id:'A',angle:45,h:5,beam:1,title:'Square / 45 degrees',zh:'\u65b9\u6b63\u5bf9\u9f50',note:'\u4fdd\u7559\u65b9\u6b63\u6bd4\u4f8b\uff0c\u6536\u56de\u5916\u6269\u7684\u7b14\u753b\u3002',ratio:'7 : 7'},
   {id:'B',angle:35,h:4.8,beam:0.7,title:'Lower joint / 35 degrees',zh:'\u63a5\u70b9\u4e0b\u79fb',note:'\u63a5\u70b9\u79bb\u5f00\u6a2a\u753b\uff0c\u7ed9\u4e2d\u5fc3\u7559\u51fa\u547c\u5438\u3002',ratio:'7 : 6.8'},
   {id:'C',angle:53,h:6,beam:1,title:'Tall / 53 degrees',zh:'\u4fee\u957f\u7ed3\u6784',note:'\u589e\u52a0\u9ad8\u5ea6\uff0c\u8ba9\u6487\u637a\u66f4\u63a5\u8fd1\u5411\u4e0b\u751f\u957f\u3002',ratio:'7 : 8'}
  ];
  function rgb(h){var c=new RGBColor();c.red=parseInt(h.substr(0,2),16);c.green=parseInt(h.substr(2,2),16);c.blue=parseInt(h.substr(4,2),16);return c;}
  var ink=rgb('191B1C'),paper=rgb('FAFAF7'),white=rgb('FFFFFF'),gray=rgb('646B6E'),guideColor=rgb('D5DAD8'),red=rgb('B25140');
  function font(n,f){try{return app.textFonts.getByName(n);}catch(e){return app.textFonts.getByName(f);}}
  var regular=font('HelveticaNeue','ArialMT'),bold=font('HelveticaNeue-Medium','Arial-BoldMT'),mono=font('Menlo-Regular','Courier'),cjk=font('PingFangSC-Regular','ArialMT');
  var paperLayer=doc.layers[0];paperLayer.name='01 - Backgrounds';
  var guides=doc.layers.add();guides.name='02 - Alignment guides - toggle visibility';
  var marks=doc.layers.add();marks.name='03 - Editable logo structures';
  var labels=doc.layers.add();labels.name='04 - Notes and dimensions';
  function rect(p,x,y,w,h,color,name){var a=p.pathItems.rectangle(960-y,x,w,h);a.stroked=false;a.filled=true;a.fillColor=color;a.name=name||'Rectangle';return a;}
  function line(p,x1,y1,x2,y2,color,width,dash){var a=p.pathItems.add();a.setEntirePath([[x1,960-y1],[x2,960-y2]]);a.filled=false;a.stroked=true;a.strokeColor=color;a.strokeWidth=width;if(dash)a.strokeDashes=[3,4];return a;}
  function txt(s,x,y,size,color,f){var t=labels.textFrames.add();t.contents=s;t.textRange.characterAttributes.textFont=f||regular;t.textRange.characterAttributes.size=size;t.textRange.characterAttributes.fillColor=color||ink;t.position=[x,960-y];t.name=s;return t;}
  function polygon(p,points,x,y,u,color,name){var a=p.pathItems.add(),q=[];for(var i=0;i<points.length;i++)q.push([x+points[i][0]*u,960-y-points[i][1]*u]);a.setEntirePath(q);a.closed=true;a.stroked=false;a.filled=true;a.fillColor=color;a.name=name;return a;}
  function geometry(s){
   var k=1/Math.tan(s.angle*Math.PI/180),q=Math.sqrt(1+k*k),c=1+k*s.h,outer=c-q;
   var p=[[3.5,(outer-3.5)/k],[3.5,(c-3.5)/k],[1,s.h],[0,s.h],[0,outer/k]];
   var r=[];for(var i=0;i<p.length;i++)r.push([7-p[i][0],p[i][1]]);
   return {left:p,right:r,k:k,q:q,visibleJoin:(outer-3)/k};
  }
  function draw(s,x,y,u,color,name){
   var g=marks.groupItems.add();g.name=name;var shape=geometry(s);
   polygon(g,shape.left,x,y,u,color,'Left diagonal - 1u normal width - aligned terminal');
   polygon(g,shape.right,x,y,u,color,'Right diagonal - 1u normal width - aligned terminal');
   rect(g,x+3*u,y,u,s.h*u,color,'Vertical stem - 1u');
   rect(g,x,y+s.beam*u,7*u,u,color,'Horizontal beam - aligned to outer dots');
   for(var n=0;n<4;n++)rect(g,x+2*n*u,y+(s.h+1)*u,u,u,color,'Square dot '+(n+1)+' - 1u');
   return g;
  }
  rect(paperLayer,0,0,1320,960,paper,'Comparison background');
  txt('JIE DEAN ZHONG',60,35,12,ink,bold);txt('IDENTITY / STRUCTURE STUDIES / V03',918,37,10,gray,mono);
  line(labels,60,72,1260,72,guideColor,0.7,false);
  txt('\u6770 / Alignment studies',60,94,36,ink,cjk);
  txt('\u4ee5\u56db\u4e2a\u65b9\u70b9\u4e3a\u57fa\u51c6\uff1a\u5148\u5b9a\u5bf9\u9f50\uff0c\u518d\u63a8\u6572\u659c\u7387\u4e0e\u63a5\u70b9\u3002',62,146,14,gray,cjk);
  var cols=[60,476,892];
  for(var a=0;a<3;a++){
   var s=specs[a],col=cols[a],x=col+54,u=36,dotY=520,y=dotY-(s.h+1)*u;
   txt(s.id+' / '+s.zh,col,196,22,ink,cjk);txt(s.title,col,231,11,gray,mono);
   for(var g=0;g<=7;g++)line(guides,x+g*u,258,x+g*u,577,(g===0||g===7)?red:guideColor,(g===0||g===7)?0.6:0.4,true);
   line(guides,x-12,484,x+264,484,guideColor,0.5,true);line(guides,x-12,520,x+264,520,guideColor,0.5,true);line(guides,x-12,556,x+264,556,guideColor,0.5,true);
   draw(s,x,y,u,ink,s.id+' / Construction / aligned to four dots');
   txt('W:H = '+s.ratio+'   /   stroke = 1u',col,597,11,gray,mono);
   txt(s.note,col,622,12,gray,cjk);
   line(labels,col,668,col+368,668,guideColor,0.7,false);
   txt('REVERSE',col,690,9,gray,mono);txt('24 / 40 PX WIDE',col+173,690,9,gray,mono);
   rect(paperLayer,col,723,136,142,ink,s.id+' / Reverse field');
   var small=12;draw(s,col+(136-7*small)/2,723+(142-(s.h+2)*small)/2,small,white,s.id+' / Reverse');
   draw(s,col+179,758,24/7,ink,s.id+' / 24 px');draw(s,col+245,748,40/7,ink,s.id+' / 40 px');
   txt('Jie Dean Zhong',col+173,825,18,ink,bold);
   // Independent artwork artboard uses the same 1u square dots and 1u gap.
   var ax=1400+a*500;doc.artboards.add([ax,960,ax+420,480]);doc.artboards[a+1].name=s.id+' - '+s.title;
   rect(paperLayer,ax,0,420,480,white,s.id+' / Master white background');
   var mu=42;draw(s,ax+(420-7*mu)/2,(480-(s.h+2)*mu)/2,mu,ink,s.id+' / Editable master');
   var ge=geometry(s);
   if(Math.abs(ge.q/Math.sqrt(1+ge.k*ge.k)-1)>0.000001)throw Error('Width check failed.');
   log(s.id+': angle '+s.angle+' degrees; width 7u; height '+(s.h+2)+'u; branch terminals x=0..1 and 6..7; dots x=0,2,4,6; normal width=1u; visible join y='+ge.visibleJoin.toFixed(4)+'u');
  }
  line(labels,60,902,1260,902,guideColor,0.7,false);
  txt('\u56db\u70b9\u7684\u5927\u5c0f\u3001\u95f4\u8ddd\u4e0e\u4e0a\u4e0b\u7559\u767d\u4e00\u81f4\uff1b\u4e09\u7248\u5747\u4e3a\u53ef\u7f16\u8f91\u77e2\u91cf\u3002',60,922,11,gray,cjk);
  txt('04 OCT 2026 / ALIGNMENT BEFORE GRID',1000,924,9,gray,mono);
  paperLayer.locked=true;guides.locked=true;labels.locked=true;doc.activeLayer=marks;doc.selection=null;
  doc.artboards.setActiveArtboardIndex(0);var opts=new IllustratorSaveOptions();opts.pdfCompatible=true;opts.compressed=true;
  doc.saveAs(new File(out.fsName+'/Jie-alignment-studies-v03.ai'),opts);log('AI saved');
  var png=new ExportOptionsPNG24();png.artBoardClipping=true;png.antiAliasing=true;png.transparency=false;png.horizontalScale=140;png.verticalScale=140;
  for(var b=0;b<4;b++){doc.artboards.setActiveArtboardIndex(b);doc.exportFile(new File(out.fsName+'/'+(b===0?'jie-alignment-comparison-v03':'jie-v03-'+specs[b-1].id)),ExportType.PNG24,png);log('PNG exported: '+b);}
  doc.artboards.setActiveArtboardIndex(0);app.executeMenuCommand('fitin');doc.save();log('SUCCESS / four artboards / '+doc.rasterItems.length+' raster items');
 }catch(e){log('ERROR '+e+' / line '+e.line);alert('Alignment studies: '+e+' / line '+e.line);}
})();
