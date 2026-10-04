#target illustrator
/* Original vector study pack. Creates a NEW document; leaves existing documents untouched.
   The data is embedded by build_illustrator.py; no linked images or external fonts for the logos.
   Labels stay editable. Mark groups contain native filled and stroked Bezier paths. */
(function () {
  var DATA = __STUDY_DATA__;
  var out = new File($.fileName).parent;
  var report = new File(out.fsName + '/illustrator-status.txt');
  function log(s) { report.open('a'); report.writeln(s); report.close(); }
  report.encoding = 'UTF-8'; report.open('w'); report.writeln('START'); report.close();
  var doc = null;
  try {
    var W = DATA.width, H = DATA.height, gutter = 100;
    doc = app.documents.add(DocumentColorSpace.RGB, W, H);
    function colour(hex) {
      var c = new RGBColor();
      c.red = parseInt(hex.substr(1, 2), 16);
      c.green = parseInt(hex.substr(3, 2), 16);
      c.blue = parseInt(hex.substr(5, 2), 16);
      return c;
    }
    function font(names) {
      for (var i = 0; i < names.length; i++) {
        try { return app.textFonts.getByName(names[i]); } catch (e) {}
      }
      throw Error('Required label font unavailable: ' + names.join(', '));
    }
    var fonts = {
      CN: font(['ArialUnicodeMS', 'HiraginoSansGB-W3', 'PingFangSC-Regular']),
      Sans: font(['ArialMT', 'HelveticaNeue']),
      Bold: font(['Arial-BoldMT', 'HelveticaNeue-Bold']),
      Serif: font(['Georgia', 'Georgia-Regular'])
    };
    function path(parent, item, ox, oy) {
      var p = parent.pathItems.add();
      p.name = item.name;
      var previous = null;
      for (var k = 0; k < item.commands.length; k++) {
        var c = item.commands[k];
        if (c[0] === 'Z') { p.closed = true; continue; }
        var pt = p.pathPoints.add();
        if (c[0] === 'C') {
          if (previous) previous.rightDirection = [ox + c[1], oy - c[2]];
          pt.anchor = [ox + c[5], oy - c[6]];
          pt.leftDirection = [ox + c[3], oy - c[4]];
          pt.rightDirection = pt.anchor;
        } else {
          pt.anchor = [ox + c[1], oy - c[2]];
          pt.leftDirection = pt.anchor;
          pt.rightDirection = pt.anchor;
        }
        pt.pointType = PointType.CORNER;
        previous = pt;
      }
      // SVG closed curves sometimes end at their starting point. Merge duplicates
      // so Illustrator has one real anchor at the seam and preserves the incoming handle.
      if (p.closed && p.pathPoints.length > 2) {
        var first = p.pathPoints[0], last = p.pathPoints[p.pathPoints.length - 1];
        if (Math.abs(first.anchor[0] - last.anchor[0]) < 0.0001 && Math.abs(first.anchor[1] - last.anchor[1]) < 0.0001) {
          first.leftDirection = last.leftDirection;
          last.remove();
        }
      }
      p.filled = !!item.fill;
      if (item.fill) p.fillColor = colour(item.fill);
      p.stroked = !!item.stroke;
      if (item.stroke) {
        p.strokeColor = colour(item.stroke);
        p.strokeWidth = item.width;
        p.strokeCap = item.cap === 'round' ? StrokeCap.ROUNDENDCAP : StrokeCap.BUTTENDCAP;
        p.strokeJoin = StrokeJoin.ROUNDENDJOIN;
      }
      return p;
    }
    for (var pi = 0; pi < DATA.pages.length; pi++) {
      var page = DATA.pages[pi];
      var ox = (pi % 4) * (W + gutter), oy = H - Math.floor(pi / 4) * (H + gutter);
      var rect = [ox, oy, ox + W, oy - H];
      if (pi === 0) doc.artboards[0].artboardRect = rect;
      else doc.artboards.add(rect);
      doc.artboards[pi].name = page.name;
      var layer = pi === 0 ? doc.layers[0] : doc.layers.add();
      layer.name = page.name;
      var groups = {};
      for (var j = 0; j < page.items.length; j++) {
        var it = page.items[j], g = groups[it.group];
        if (!g) { g = layer.groupItems.add(); g.name = it.group; groups[it.group] = g; }
        var obj;
        if (it.type === 'rect') {
          obj = g.pathItems.rectangle(oy - it.y, ox + it.x, it.w, it.h);
          obj.stroked = false; obj.filled = true; obj.fillColor = colour(it.fill);
          obj.name = it.name;
        } else if (it.type === 'image') {
          obj = g.placedItems.add(); obj.file = new File(out.fsName + '/assets/portrait.png');
          obj.width = it.w; obj.height = it.h;
          obj.position = [ox + it.x, oy - it.y];
          obj.name = it.name; obj.embed();
        } else if (it.type === 'text') {
          // pointText anchor is a baseline, matching the PDF and SVG coordinates.
          obj = g.textFrames.pointText([ox + it.x, oy - it.y]);
          obj.contents = it.text;
          obj.name = it.name;
          obj.textRange.characterAttributes.textFont = fonts[it.font];
          obj.textRange.characterAttributes.size = it.size;
          obj.textRange.characterAttributes.fillColor = colour(it.fill);
        } else obj = path(g, it, ox, oy);
      }
      if (groups.Backgrounds) groups.Backgrounds.zOrder(ZOrderMethod.SENDTOBACK);
      log('Created artboard ' + (pi + 1) + ': ' + page.name);
    }
    doc.selection = null;
    doc.artboards.setActiveArtboardIndex(1);
    var file = new File(out.fsName + '/Jie-Identity-Explorations.ai');
    // Do not overwrite an earlier native save or subsequent user edits.
    if (file.exists) file = new File(out.fsName + '/Jie-Identity-Explorations-' + (new Date()).getTime() + '.ai');
    var save = new IllustratorSaveOptions();
    save.pdfCompatible = true; save.compressed = true;
    doc.saveAs(file, save);
    app.executeMenuCommand('fitin');
    var exp = new ExportOptionsPNG24();
    exp.artBoardClipping = true; exp.antiAliasing = true; exp.transparency = false;
    exp.horizontalScale = 100; exp.verticalScale = 100;
    doc.exportFile(new File(out.fsName + '/previews/illustrator-overview'), ExportType.PNG24, exp);
    log('SUCCESS');
    log('AI: ' + doc.fullName.fsName);
    log('Artboards: ' + doc.artboards.length);
    log('Paths: ' + doc.pathItems.length);
    log('Raster items: ' + doc.rasterItems.length);
    log('Linked images: ' + doc.placedItems.length);
    log('Text frames: ' + doc.textFrames.length);
  } catch (e) {
    log('ERROR: ' + e + ' / line ' + e.line);
    alert('Logo study import: ' + e + '\nThe source files and any existing documents remain intact.');
  }
})();
