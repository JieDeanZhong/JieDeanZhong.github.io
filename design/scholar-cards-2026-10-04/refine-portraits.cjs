// Refine only the alpha at the gray studio-background boundary.
// All retained RGB values are copied byte-for-byte from the embedded originals.
const sharp = require('/Users/jie/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
const fs = require('node:fs')
const path = require('node:path')
const root = path.resolve('design/scholar-cards-2026-10-04')
;(async () => {
  const report = []
  for (const [name, hairBottom] of [
    ['lianjun-zhang', 0.36],
    ['yongtao-zhu', 0.7],
    ['kevin-chan', 0.65],
  ]) {
    const { data: rgb, info } = await sharp(`${root}/originals/${name}.png`)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
    const { width: w, height: h } = info
    const dest = `${root}/processed/${name}-cutout.png`
    const a = await sharp(dest).extractChannel('alpha').raw().toBuffer()
    const dist = new Float32Array(w * h).fill(10000)
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        const i = y * w + x
        if (a[i] < 200) dist[i] = 0
        else dist[i] = Math.min(dist[i], x ? dist[i - 1] + 1 : 10000, y ? dist[i - w] + 1 : 10000)
      }
    for (let y = h - 1; y >= 0; y--)
      for (let x = w - 1; x >= 0; x--) {
        const i = y * w + x
        dist[i] = Math.min(
          dist[i],
          x < w - 1 ? dist[i + 1] + 1 : 10000,
          y < h - 1 ? dist[i + w] + 1 : 10000
        )
      }
    const out = Buffer.alloc(w * h * 4)
    for (let y = 0; y < h; y++) {
      let left = 0,
        right = w - 1
      while (left < w && a[y * w + left] < 128) left++
      while (right > 0 && a[y * w + right] < 128) right--
      const lx = Math.max(0, left - 12),
        rx = Math.min(w - 1, right + 12)
      for (let x = 0; x < w; x++) {
        const i = y * w + x,
          s = i * 3,
          d = i * 4
        let alpha = a[i]
        // Broad matting band around flyaway hair; a narrow band around clothing.
        const band = y < h * hairBottom ? 26 : 3
        if (alpha && dist[i] < band && left < right && lx > 0 && rx < w - 1) {
          const bgx = x < (left + right) / 2 ? lx : rx
          const b = (y * w + bgx) * 3
          const delta = Math.hypot(
            rgb[s] - rgb[b],
            rgb[s + 1] - rgb[b + 1],
            rgb[s + 2] - rgb[b + 2]
          )
          const keyed = Math.max(0, Math.min(1, (delta - 6) / 38))
          alpha = Math.round(alpha * keyed)
        }
        if (alpha < 3) alpha = 0
        out[d] = rgb[s]
        out[d + 1] = rgb[s + 1]
        out[d + 2] = rgb[s + 2]
        out[d + 3] = alpha
      }
    }
    await sharp(out, { raw: { width: w, height: h, channels: 4 } })
      .png({ compressionLevel: 9 })
      .toFile(dest + '.tmp')
    fs.renameSync(dest + '.tmp', dest)
    await sharp(dest)
      .webp({ lossless: true, effort: 6 })
      .toFile(`public/static/images/people/${name}-cutout.webp`)
    const encoded = await sharp(dest).raw().toBuffer()
    let different = 0,
      visible = 0
    for (let i = 0; i < w * h; i++)
      if (encoded[i * 4 + 3] === 255) {
        visible++
        for (let c = 0; c < 3; c++) if (encoded[i * 4 + c] !== rgb[i * 3 + c]) different++
      }
    report.push({
      name,
      width: w,
      height: h,
      fullyOpaquePixels: visible,
      changedOpaqueRGBChannels: different,
    })
  }
  fs.writeFileSync(`${root}/portrait-verification.json`, JSON.stringify(report, null, 2) + '\n')
  console.log(report)
})()
