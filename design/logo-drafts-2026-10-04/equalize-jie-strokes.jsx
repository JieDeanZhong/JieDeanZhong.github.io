#target illustrator
(function(){
  var out = new Folder('/Users/jie/Projects/2_coding_projects/JieDeanZhong.github.io/design/logo-drafts-2026-10-04');
  var report = new File(out.fsName+'/stroke-v02-status.txt');
  var active = app.activeDocument, master = null, log = [], changed = 0;
  function trace(s){report.open('a');report.writeln(s);report.close();}
  report.open('w');report.write('START\n');report.close();
  function anchors(p){var a=[];for(var i=0;i<p.pathPoints.length;i++)a.push([p.pathPoints[i].anchor[0],p.pathPoints[i].anchor[1]]);return a;}
  function signature(p){var a=anchors(p),s=p.name+'|'+p.geometricBounds.join(',')+'|';for(var i=0;i<a.length;i++)s+=a[i].join(',')+';';return s;}
  function update(d){
    var dots=[],branches=[],before=[],n=0;
    for(var i=0;i<d.pathItems.length;i++){
      var p=d.pathItems[i];
      if(p.name.indexOf('Huo - dot ')===0){dots.push(p);before.push(signature(p));}
      if(p.name==='Mu - left branch'||p.name==='Mu - right branch')branches.push(p);
    }
    for(var j=0;j<branches.length;j++){
      var b=branches[j],stem=null;
      for(var k=0;k<b.parent.pathItems.length;k++){var s=b.parent.pathItems[k];if(s.name==='Mu - vertical stem')stem=s;}
      if(!stem||b.pathPoints.length!==4)throw Error('Unexpected logo geometry: '+b.parent.name);
      var a=anchors(b),top=[],bottom=[],ymax=-1e10,ymin=1e10;
      for(var m=0;m<a.length;m++){ymax=Math.max(ymax,a[m][1]);ymin=Math.min(ymin,a[m][1]);}
      for(var m=0;m<a.length;m++){if(Math.abs(a[m][1]-ymax)<0.001)top.push(m);else if(Math.abs(a[m][1]-ymin)<0.001)bottom.push(m);}
      if(top.length!==2||bottom.length!==2)throw Error('Branch has non-horizontal terminals.');
      var xt=(a[top[0]][0]+a[top[1]][0])/2,xb=(a[bottom[0]][0]+a[bottom[1]][0])/2;
      var slope=(xb-xt)/(ymax-ymin),w=Math.abs(stem.geometricBounds[2]-stem.geometricBounds[0]);
      var newWidth=w*Math.sqrt(1+slope*slope),oldWidth=Math.abs(a[top[0]][0]-a[top[1]][0]);
      for(var m=0;m<top.length;m++){var idx=top[m];a[idx][0]=xt+(a[idx][0]<xt?-newWidth/2:newWidth/2);}
      for(var m=0;m<bottom.length;m++){var idx=bottom[m];a[idx][0]=xb+(a[idx][0]<xb?-newWidth/2:newWidth/2);}
      b.setEntirePath(a);b.closed=true;
      for(var m=0;m<b.pathPoints.length;m++){b.pathPoints[m].pointType=PointType.CORNER;b.pathPoints[m].leftDirection=b.pathPoints[m].anchor;b.pathPoints[m].rightDirection=b.pathPoints[m].anchor;}
      var actual=Math.abs(a[top[0]][0]-a[top[1]][0])/Math.sqrt(1+slope*slope);
      if(Math.abs(actual-w)>0.001)throw Error('Stroke width verification failed.');
      log.push(d.name+' / '+b.parent.name+' / '+b.name+' : '+(oldWidth/Math.sqrt(1+slope*slope)).toFixed(4)+' -> '+actual.toFixed(4)+' pt; stem '+w.toFixed(4)+' pt');n++;
    }
    for(var z=0;z<dots.length;z++)if(signature(dots[z])!==before[z])throw Error('Dot geometry unexpectedly changed.');
    log.push(d.name+': '+n+' diagonal paths corrected; '+dots.length+' square dots verified unchanged.');
    changed+=n;
  }
  try {
    for(var i=0;i<app.documents.length;i++)if(app.documents[i].name==='Jie-Dean-Zhong-logo-studies-v01.ai')master=app.documents[i];
    if(!master)throw Error('The original logo studies document is not open.');
    for(var di=0;di<app.documents.length;di++)if(app.documents[di].name==='Untitled-1'){trace('Updating working copy');update(app.documents[di]);}
    trace('Updating master');master.activate();update(master);trace('Geometry complete');
    var labels=master.layers.getByName('04 - Labels and typography');labels.locked=false;
    for(var t=0;t<labels.textFrames.length;t++){
      var tf=labels.textFrames[t];
      if(tf.position[0]>1280 && tf.contents==='FIRST DRAFT / 04 OCT 2026'){tf.contents='REVISION 02 / 04 OCT 2026';tf.name=tf.contents;}
      if(tf.contents==='7 x 7 / Mu skeleton / four square dots'){tf.contents='Equal 1u stroke widths / four square dots unchanged';tf.name=tf.contents;}
      if(tf.position[0]>1280 && tf.contents.indexOf('\u4fdd\u7559\u300c\u6728\u300d')===0){tf.contents='\u6487\u3001\u637a\u6309\u5782\u76f4\u4e8e\u7b14\u753b\u7684\u65b9\u5411\u7b49\u539a\u4fee\u6b63\uff1b\u56db\u4e2a\u65b9\u70b9\u4fdd\u6301\u539f\u6837\u3002';tf.name=tf.contents;}
    }
    labels.locked=true;master.selection=null;master.artboards.setActiveArtboardIndex(1);
    var opt=new IllustratorSaveOptions();opt.pdfCompatible=true;opt.compressed=true;
    trace('Saving v02');master.saveAs(new File(out.fsName+'/Jie-Dean-Zhong-logo-studies-v02.ai'),opt);
    trace('Saved v02');var png=new ExportOptionsPNG24();png.artBoardClipping=true;png.antiAliasing=true;png.transparency=false;png.horizontalScale=140;png.verticalScale=140;
    master.exportFile(new File(out.fsName+'/02-jie-equal-strokes-v02'),ExportType.PNG24,png);
    trace('Exported board');
    // Export a close-up from a duplicate of the corrected solid logo, preserving every source path.
    var solid=null;
    for(var g=0;g<master.groupItems.length;g++){var gr=master.groupItems[g];if(gr.name==='Primary / solid / 224 px'&&gr.geometricBounds[0]>1280){solid=gr;break;}}
    if(solid){
      var preview=app.documents.add(DocumentColorSpace.RGB,420,420);
      preview.artboards[0].artboardRect=[0,420,420,0];
      var copy=solid.duplicate(preview.layers[0],ElementPlacement.PLACEATEND);var bounds=copy.geometricBounds;
      copy.translate((420-(bounds[2]-bounds[0]))/2-bounds[0],(420+(bounds[1]-bounds[3]))/2-bounds[1]);
      png.horizontalScale=160;png.verticalScale=160;
      preview.exportFile(new File(out.fsName+'/jie-logo-v02-preview'),ExportType.PNG24,png);
      var svg=new ExportOptionsSVG();svg.embedRasterImages=false;svg.coordinatePrecision=4;
      preview.exportFile(new File(out.fsName+'/jie-logo-v02'),ExportType.SVG,svg);
      preview.close(SaveOptions.DONOTSAVECHANGES);
    }
    master.activate();app.executeMenuCommand('fitin');master.save();
    if(active!==master && active.name==='Untitled-1'){active.activate();active.selection=null;}
    report.open('w');report.write('SUCCESS\nTotal diagonal paths corrected: '+changed+'\n'+log.join('\n'));report.close();
  }catch(e){report.open('w');report.write('ERROR: '+e+'\nLine: '+e.line+'\n'+log.join('\n'));report.close();alert('Logo refinement: '+e+' (line '+e.line+')');}
})();
