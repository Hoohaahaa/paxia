/**
 * Catalog — the Collections/Product data for Slice 03. Pure data + pure
 * getters, no React (docs/CLAUDE.md folder map: /lib is React-free). Structure
 * is deliberately flat so a CMS/DAM can replace it later without touching the
 * pages. Copy follows the voice in docs/05_QUALITY.md §3 — curated names, no
 * marketing adjectives, prices as plain integers (EUR).
 */

export type Product = {
  slug: string
  name: string
  collection: string
  eyebrow: string
  /** The emotional line — read before any specification (docs/02 §5). */
  line: string
  priceEUR: number
  material: string
  composition: string
  care: string
  origin: string
  sizes: string[]
  /** Portrait images; the first is the origin of the Emotion section. */
  images: string[]
}

export type Collection = {
  slug: string
  title: string
  season: string
  /** Editorial standfirst — the type-only opening (docs/02 §4). */
  intro: string
  cover: string
}

const COLLECTIONS: Collection[] = [
  {
    slug: 'volume-one',
    title: 'Volume One',
    season: 'Spring / Summer 2026',
    intro:
      'The first study. Cloth left to speak before cut, and cut left to speak before season. Twelve pieces, each one a sentence the next completes.',
    cover: '/img/collection-volume-one.svg',
  },
  {
    slug: 'winter-study',
    title: 'Winter Study',
    season: 'Autumn / Winter 2026',
    intro:
      'Weight as warmth, warmth as quiet. Heavier wools, longer lines, a palette drawn down to the near-dark the house is named for.',
    cover: '/img/collection-winter-study.svg',
  },
  {
    slug: 'stone-series',
    title: 'Stone Series',
    season: 'Continuous',
    intro:
      'The pieces that do not change with the season. Foundations in the material the house returns to — kept in production, refined in silence.',
    cover: '/img/collection-stone-series.svg',
  },
]

const PRODUCTS: Product[] = [
  {
    slug: 'the-atelier-coat',
    name: 'The Atelier Coat',
    collection: 'volume-one',
    eyebrow: 'Outerwear',
    line: 'A coat that keeps its shape the way a room keeps its silence.',
    priceEUR: 2400,
    material: 'Double-faced virgin wool, milled in Biella and finished by hand.',
    composition: '100% virgin wool. Horn buttons. Cupro lining.',
    care: 'Specialist dry clean. Rest on a broad hanger between wears.',
    origin: 'Cut and closed in the Yerevan atelier.',
    sizes: ['44', '46', '48', '50', '52'],
    images: ['/img/product-coat.svg', '/img/craft.svg'],
  },
  {
    slug: 'raw-edge-knit',
    name: 'Raw-Edge Knit',
    collection: 'volume-one',
    eyebrow: 'Knitwear',
    line: 'Left unfinished at the hem, because the hand should be visible.',
    priceEUR: 680,
    material: 'Wholegarment cashmere, knitted in a single piece.',
    composition: '100% grade-A cashmere.',
    care: 'Hand wash cold. Dry flat, away from light.',
    origin: 'Knitted in Milan, finished in Yerevan.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/img/product-knit.svg', '/img/craft.svg'],
  },
  {
    slug: 'column-dress',
    name: 'Column Dress',
    collection: 'volume-one',
    eyebrow: 'Ready to Wear',
    line: 'One line from shoulder to floor. Nothing asked of the body it does not offer back.',
    priceEUR: 1450,
    material: 'Matte silk crêpe with a weighted hem.',
    composition: '100% silk. Concealed closure.',
    care: 'Specialist dry clean only.',
    origin: 'Cut and closed in the Yerevan atelier.',
    sizes: ['34', '36', '38', '40', '42'],
    images: ['/img/product-dress.svg', '/img/craft.svg'],
  },
  {
    slug: 'greatcoat',
    name: 'The Greatcoat',
    collection: 'winter-study',
    eyebrow: 'Outerwear',
    line: 'Weight you stop noticing by the second block.',
    priceEUR: 3200,
    material: 'Triple-milled Melton, dense enough to stand on its own.',
    composition: '90% virgin wool, 10% cashmere. Horn buttons.',
    care: 'Specialist dry clean. Brush along the grain.',
    origin: 'Cut and closed in the Yerevan atelier.',
    sizes: ['46', '48', '50', '52', '54'],
    images: ['/img/product-overcoat.svg', '/img/craft.svg'],
  },
  {
    slug: 'field-scarf',
    name: 'Field Scarf',
    collection: 'winter-study',
    eyebrow: 'Accessories',
    line: 'The last thing on, the first thing remembered.',
    priceEUR: 320,
    material: 'Brushed lambswool, woven double-width and folded.',
    composition: '100% lambswool.',
    care: 'Dry clean. Fold, do not hang.',
    origin: 'Woven in Berlin.',
    sizes: ['One Size'],
    images: ['/img/product-scarf.svg', '/img/craft.svg'],
  },
  {
    slug: 'ribbed-cardigan',
    name: 'Ribbed Cardigan',
    collection: 'winter-study',
    eyebrow: 'Knitwear',
    line: 'A door you can close against the season.',
    priceEUR: 890,
    material: 'Heavy-gauge merino, ribbed throughout.',
    composition: '100% extrafine merino wool.',
    care: 'Hand wash cold. Dry flat.',
    origin: 'Knitted in Milan.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/img/product-cardigan.svg', '/img/craft.svg'],
  },
  {
    slug: 'stone-shirt',
    name: 'Stone Shirt',
    collection: 'stone-series',
    eyebrow: 'Shirting',
    line: 'The one you reach for without deciding to.',
    priceEUR: 420,
    material: 'Washed cotton poplin with a softened collar.',
    composition: '100% long-staple cotton. Mother-of-pearl buttons.',
    care: 'Machine wash cold. Iron while damp.',
    origin: 'Cut and closed in the Yerevan atelier.',
    sizes: ['36', '38', '40', '42', '44'],
    images: ['/img/product-shirt.svg', '/img/craft.svg'],
  },
  {
    slug: 'straight-trouser',
    name: 'Straight Trouser',
    collection: 'stone-series',
    eyebrow: 'Tailoring',
    line: 'A straight line, held all day.',
    priceEUR: 560,
    material: 'High-twist wool with a clean, dry hand.',
    composition: '100% virgin wool. Extended tab closure.',
    care: 'Specialist dry clean.',
    origin: 'Cut and closed in the Yerevan atelier.',
    sizes: ['44', '46', '48', '50', '52'],
    images: ['/img/product-trouser.svg', '/img/craft.svg'],
  },
  {
    slug: 'unstructured-blazer',
    name: 'Unstructured Blazer',
    collection: 'stone-series',
    eyebrow: 'Tailoring',
    line: 'Tailoring with the armour taken out.',
    priceEUR: 1180,
    material: 'Half-lined hopsack, soft in the shoulder.',
    composition: '100% virgin wool. Cupro half-lining.',
    care: 'Specialist dry clean.',
    origin: 'Cut and closed in the Yerevan atelier.',
    sizes: ['44', '46', '48', '50', '52'],
    images: ['/img/product-blazer.svg', '/img/craft.svg'],
  },
]

const priceFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export function formatPrice(eur: number): string {
  return priceFormatter.format(eur)
}

export function getCollections(): Collection[] {
  return COLLECTIONS
}

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug)
}

export function getProducts(): Product[] {
  return PRODUCTS
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return PRODUCTS.filter((p) => p.collection === collectionSlug)
}

/** Related = other pieces from the same collection, then filled from the rest. */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCollection = PRODUCTS.filter(
    (p) => p.collection === product.collection && p.slug !== product.slug,
  )
  const others = PRODUCTS.filter(
    (p) => p.collection !== product.collection && p.slug !== product.slug,
  )
  return [...sameCollection, ...others].slice(0, limit)
}
