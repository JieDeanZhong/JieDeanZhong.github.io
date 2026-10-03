#target illustrator
(function(){
 var d=app.activeDocument, out=File(d.fullName).parent;
 if(d.name!=='Jie-Dean-Zhong-logo-studies-v01.ai') {alert('Please select the logo study document.');return;}
 var labels=d.layers.getByName('04 - Labels and typography'); labels.locked=false;
 var fixes=[
 [66,160,'J \u7684\u4e0b\u6a2a\u4e0e Z \u7684\u4e0a\u6a2a\u8854\u63a5\uff1b\u7528\u4e00\u6761 45\u00b0 \u659c\u7ebf\u6253\u7834\u65b9\u683c\u8282\u594f\u3002'],
 [185,771,'\u5171\u4eab\u4e2d\u6bb5\uff0c\u5f62\u6210\u4e00\u4e2a\u7b26\u53f7'],
 [1344,105,'\u6770 / Modular character'],
 [1346,160,'\u4fdd\u7559\u300c\u6728\u300d\u7684\u9aa8\u67b6\uff0c\u628a\u56db\u70b9\u538b\u6210\u7b49\u8ddd\u65b9\u5757\uff1b\u4ee5\u5b57\u5f62\u672c\u8eab\u5efa\u7acb\u8fa8\u8bc6\u5ea6\u3002'],
 [1465,706,'\u6728 + \u706c'],
 [1465,771,'\u4e0a\u65b9\u8fde\u8d2f\uff0c\u4e0b\u65b9\u56db\u70b9\u72ec\u7acb']
 ];
 var changed=0,log='';
 for(var i=0;i<labels.textFrames.length;i++){
  var t=labels.textFrames[i],p=t.position;
  if(t.contents===fixes[1][2] && t.textRange.characterAttributes.textFont.name.indexOf('PingFang')<0){t.contents='Shared middle beam';t.name=t.contents;changed++;}
  if(t.contents===fixes[5][2] && t.textRange.characterAttributes.textFont.name.indexOf('PingFang')<0){t.contents='One character, two rhythms';t.name=t.contents;changed++;}
 }
 labels.locked=true;
 for(var n=0;n<d.pathItems.length;n++){
  var a=d.pathItems[n];if(a.name.indexOf('Huo - dot')===0){log+=a.parent.name+' | '+a.name+' | '+a.geometricBounds.join(',')+'\n';}
 }
 var pOpts=new ExportOptionsPNG24();pOpts.artBoardClipping=true;pOpts.antiAliasing=true;pOpts.transparency=false;pOpts.horizontalScale=140;pOpts.verticalScale=140;
 for(var b=0;b<2;b++){d.artboards.setActiveArtboardIndex(b);d.exportFile(new File(out.fsName+'/'+(b===0?'01-jz-grid-study':'02-jie-modular-study')),ExportType.PNG24,pOpts);}
 d.artboards.setActiveArtboardIndex(0);app.executeMenuCommand('fitin');d.save();
 var f=new File(out.fsName+'/proof-status.txt');f.open('w');f.write('Fixed text frames: '+changed+'\n'+log);f.close();
})();
