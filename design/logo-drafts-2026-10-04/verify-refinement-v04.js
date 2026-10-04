#target illustrator
(function(){
  var root='/Users/jie/Projects/2_coding_projects/JieDeanZhong.github.io/design/logo-drafts-2026-10-04';
  var report=new File(root+'/verification-v04.txt');report.open('w');
  try {
    var doc=null;
    for(var d=0;d<app.documents.length;d++)if(app.documents[d].name==='Jie-refinement-v04.ai')doc=app.documents[d];
    if(!doc)throw Error('V04 document not found');
    doc.activate();
    var labels=doc.layers.getByName('04 - Labels and annotations');labels.locked=false;
    // Repair the baseline caption explicitly, then regenerate the review export.
    var repaired=0;
    for(var t=0;t<labels.textFrames.length;t++){
      var f=labels.textFrames[t];
      if(Math.abs(f.position[0]-48)<1 && Math.abs(f.position[1]-235)<15){
        f.contents='\u4fdd\u7559\u4f5c\u6bd4\u8f83\u57fa\u51c6\u3002';f.name=f.contents;repaired++;
      }
    }
    labels.locked=true;
    var master=doc.groupItems.getByName('V04 / RECOMMENDED EDITABLE MASTER');
    if(master.pathItems.length!==5)throw Error('Master must have one wood outline and four dots');
    var unit=52,b=master.geometricBounds,wood=master.pathItems.getByName('Wood - single continuous editable outline');
    if(Math.abs(master.width-unit*7)>0.001 || Math.abs(master.height-unit*7.4)>0.001)throw Error('Master bounds mismatch');
    if(wood.pathPoints.length!==22)throw Error('Unexpected outline point count');
    for(var n=1;n<=4;n++){
      var dot=master.pathItems.getByName('Dot '+n+' - original 1u square');
      if(Math.abs(dot.width-unit)>0.001 || Math.abs(dot.height-unit)>0.001)throw Error('Dot size mismatch');
      if(Math.abs(dot.left-b[0]-(n-1)*2*unit)>0.001)throw Error('Dot spacing mismatch');
      if(Math.abs(dot.top-(b[1]-6.4*unit))>0.001)throw Error('Dot baseline mismatch');
      report.writeln('Dot '+n+': 52 x 52 pt; spacing 52 pt; expected position verified.');
    }
    if(doc.rasterItems.length!==0)throw Error('Unexpected raster content');
    report.writeln('Master: 364 x 384.8 pt; continuous 22-point wood outline; 4 original square dots.');
    report.writeln('Document: '+doc.artboards.length+' artboards; '+doc.pathItems.length+' vector paths; 0 raster items.');
    report.writeln('Baseline caption updated: '+repaired);
    doc.selection=null;doc.artboards.setActiveArtboardIndex(0);app.executeMenuCommand('fitin');doc.save();
    var png=new ExportOptionsPNG24();png.artBoardClipping=true;png.antiAliasing=true;png.transparency=false;png.horizontalScale=140;png.verticalScale=140;
    doc.exportFile(new File(root+'/jie-v04-comparison'),ExportType.PNG24,png);
    report.writeln('PASS / AI saved and comparison re-exported.');
  }catch(e){report.writeln('FAIL '+e+' / line '+e.line);alert('V04 verification: '+e);}
  report.close();
})();
