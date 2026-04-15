/**
 * Regenerate all raster favicons from public/favicon.svg.
 * Run with: node scripts/generate-favicons.js
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '..', 'public')
const svgPath = path.join(publicDir, 'favicon.svg')

const pngTargets = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
]

const icoSizes = [16, 32, 48]

async function main() {
  const svg = await readFile(svgPath)

  for (const { name, size } of pngTargets) {
    const out = path.join(publicDir, name)
    await sharp(svg, { density: 384 })
      .resize(size, size)
      .png()
      .toFile(out)
    console.log(`wrote ${name} (${size}x${size})`)
  }

  const icoBuffers = await Promise.all(
    icoSizes.map((size) =>
      sharp(svg, { density: 384 }).resize(size, size).png().toBuffer(),
    ),
  )
  const ico = await pngToIco(icoBuffers)
  await writeFile(path.join(publicDir, 'favicon.ico'), ico)
  console.log(`wrote favicon.ico (${icoSizes.join(',')})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
