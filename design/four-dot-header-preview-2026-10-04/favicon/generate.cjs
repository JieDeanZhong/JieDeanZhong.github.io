// Re-render the original four-square geometry; no font or redraw is involved.
const fs = require('node:fs/promises')
const path = require('node:path')
const sharp = require('sharp')

async function main() {
  const root = path.resolve(__dirname, '../../..')
  const output = path.join(root, 'public/static/favicons')
  const source = await fs.readFile(
    path.join(root, 'public/static/images/four-dot-mark.svg'),
    'utf8'
  )
  const squares = source.match(/<rect\b[^>]*\/>/g).join('\n    ')
  // 14px wide at 16px display size, centred on a transparent square canvas.
  const group = `<g transform="translate(16 107.63616) scale(1.12)">\n    ${squares}\n  </g>`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="#000">\n  ${group}\n</svg>\n`
  await fs.writeFile(path.join(output, 'favicon.svg'), svg)
  await fs.writeFile(
    path.join(output, 'safari-pinned-tab.svg'),
    svg
  )
  const render = (size) =>
    sharp(Buffer.from(svg), { density: 576 }).resize(size, size).png().toBuffer()
  for (const [file, size] of [
    ['favicon-16x16.png', 16],
    ['favicon-32x32.png', 32],
    ['android-chrome-96x96.png', 96],
    ['apple-touch-icon.png', 180],
    ['mstile-150x150.png', 150],
  ]) {
    await fs.writeFile(path.join(output, file), await render(size))
  }
  const sizes = [16, 32, 48]
  const images = await Promise.all(sizes.map(render))
  const header = Buffer.alloc(6 + sizes.length * 16)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(sizes.length, 4)
  let offset = header.length
  sizes.forEach((size, i) => {
    const entry = 6 + i * 16
    header[entry] = size
    header[entry + 1] = size
    header.writeUInt16LE(1, entry + 4)
    header.writeUInt16LE(32, entry + 6)
    header.writeUInt32LE(images[i].length, entry + 8)
    header.writeUInt32LE(offset, entry + 12)
    offset += images[i].length
  })
  await fs.writeFile(path.join(output, 'favicon.ico'), Buffer.concat([header, ...images]))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
