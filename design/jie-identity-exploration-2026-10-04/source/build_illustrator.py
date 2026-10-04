from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
template=(root/'source/illustrator_template.jsx').read_text()
data=(root/'source/study-data.json').read_text()
script=template.replace('__STUDY_DATA__',data).replace('__OUTPUT_FOLDER__',json.dumps(str(root)))
(root/'Open-in-Illustrator.jsx').write_text(script)
print('Native Illustrator import script ready. It creates a new document, 15 named artboards, editable paths and labels.')
