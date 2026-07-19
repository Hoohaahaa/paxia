#!/usr/bin/env node
/**
 * ingest-images — the photography pipeline (docs/07_IMAGES.md).
 *
 * Reads source photos from ./photos/<slot>.(jpg|jpeg|png|webp), applies the
 * house grade (darkened, warmed — photography is scheme-invariant), crops to
 * the slot's ratio, exports an optimized progressive JPEG to public/img/,
 * enforces the 05_QUALITY size budgets, and regenerates the PHOTOS list in
 * lib/images.ts. Slots without a source keep their placeholder art. Removing
 * a source and re-running reverts the slot to its placeholder.
 *
 * Run via `pnpm images`.
 */
import { existsSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const SRC_DIR = join(ROOT, 'photos')
const OUT_DIR = join(ROOT, 'public', 'img')
const MANIFEST = join(ROOT, 'lib', 'images.ts')

// Slot → [width, height, budgetKB]. Ratios per docs/01 §6.6, budgets per 05.
const PORTRAIT = [1200, 1600, 160]
const EDITORIAL = [1440, 1800, 160]
const CAMPAIGN = [2400, 1350, 220]
const CITY = [1600, 1000, 160]

const SLOTS = {
  hero: CAMPAIGN,
  campaign: CAMPAIGN,
  craft: EDITORIAL,
  bespoke: PORTRAIT,
  collections: PORTRAIT,
  store: PORTRAIT,
  agency: PORTRAIT,
  journal: PORTRAIT,
  'collection-volume-one': PORTRAIT,
  'collection-winter-study': PORTRAIT,
  'collection-stone-series': PORTRAIT,
  'product-coat': PORTRAIT,
  'product-knit': PORTRAIT,
  'product-dress': PORTRAIT,
  'product-overcoat': PORTRAIT,
  'product-scarf': PORTRAIT,
  'product-cardigan': PORTRAIT,
  'product-shirt': PORTRAIT,
  'product-trouser': PORTRAIT,
  'product-blazer': PORTRAIT,
  'city-yerevan': CITY,
  'city-istanbul': CITY,
  'city-milan': CITY,
  'city-berlin': CITY,
  'city-madrid': CITY,
  'journal-1': EDITORIAL,
  'journal-2': EDITORIAL,
  'journal-3': EDITORIAL,
  'talent-arev': PORTRAIT,
  'talent-lucine': PORTRAIT,
  'talent-nare': PORTRAIT,
  'talent-tigran': PORTRAIT,
  'talent-sona': PORTRAIT,
  'talent-vahe': PORTRAIT,
}

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']

function findSource(slot) {
  for (const ext of EXTENSIONS) {
    const p = join(SRC_DIR, `${slot}.${ext}`)
    if (existsSync(p)) return p
  }
  return null
}

const sources = existsSync(SRC_DIR) ? readdirSync(SRC_DIR) : []
const unknown = sources.filter((f) => {
  const name = f.replace(/\.(jpg|jpeg|png|webp)$/i, '')
  return /\.(jpg|jpeg|png|webp)$/i.test(f) && !(name in SLOTS)
})
if (unknown.length) {
  console.warn(`ignoring ${unknown.length} file(s) with no matching slot: ${unknown.join(', ')}`)
  console.warn('slot names are listed in docs/07_IMAGES.md')
}

let failures = 0
const done = []

for (const [slot, [w, h, budgetKB]] of Object.entries(SLOTS)) {
  const src = findSource(slot)
  const out = join(OUT_DIR, `${slot}.jpg`)
  if (!src) {
    // No source → the slot reverts to its placeholder.
    if (existsSync(out)) unlinkSync(out)
    continue
  }
  try {
    const buffer = await sharp(src)
      .rotate() // honour EXIF orientation
      .resize(w, h, { fit: 'cover', position: 'attention' })
      // The house grade: darker, slightly desaturated, warmed toward linen.
      .modulate({ brightness: 0.92, saturation: 0.86 })
      .tint({ r: 250, g: 243, b: 232 })
      .jpeg({ quality: 74, progressive: true, mozjpeg: true })
      .toBuffer()
    const kb = Math.round(buffer.length / 1024)
    if (kb > budgetKB) {
      console.error(`✗ ${slot}: ${kb} KB exceeds its ${budgetKB} KB budget — supply a simpler frame or crop tighter`)
      failures++
      continue
    }
    writeFileSync(out, buffer)
    done.push(slot)
    console.log(`✓ ${slot}.jpg  ${w}×${h}  ${kb} KB`)
  } catch (error) {
    console.error(`✗ ${slot}: ${error.message}`)
    failures++
  }
}

// Regenerate the manifest between the markers.
const manifest = readFileSync(MANIFEST, 'utf8')
const entries = done.map((slot) => `  '${slot}',`).join('\n')
const next = manifest.replace(
  /\/\/ <photos>[\s\S]*?\/\/ <\/photos>/,
  `// <photos>\n${entries ? `${entries}\n` : ''}  // </photos>`,
)
writeFileSync(MANIFEST, next)

console.log(`\n${done.length}/${Object.keys(SLOTS).length} slots photographed; the rest keep their placeholder art.`)
if (failures) {
  console.error(`${failures} failure(s).`)
  process.exit(1)
}
