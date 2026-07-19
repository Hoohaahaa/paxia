import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Frame } from '@/components/frame/Frame'
import { Reveal } from '@/components/reveal/Reveal'
import {
  formatPrice,
  getCollection,
  getCollections,
  getProductsByCollection,
} from '@/lib/catalog'

type Params = { collection: string }

export function generateStaticParams(): Params[] {
  return getCollections().map((c) => ({ collection: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { collection } = await params
  const found = getCollection(collection)
  return found
    ? { title: found.title, description: found.intro }
    : { title: 'Collection' }
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { collection } = await params
  const found = getCollection(collection)
  if (!found) notFound()

  const products = getProductsByCollection(found.slug)

  return (
    <main id="main" className="px-[var(--margin-x)] py-sect-normal">
      <nav aria-label="Breadcrumb" className="text-micro uppercase text-text-muted">
        <Link href="/collections" className="hover:text-text-primary">
          Collections
        </Link>
        <span aria-hidden="true" className="mx-2 text-text-metadata">
          /
        </span>
        <span className="text-text-secondary">{found.title}</span>
      </nav>

      {/* Editorial intro — type only, the exhibition's wall text (docs/02 §4). */}
      <header className="mt-9 max-w-content">
        <p className="text-micro uppercase text-text-muted">{found.season}</p>
        <h1 className="mt-5 font-display text-d-2 text-text-primary">
          {found.title}
        </h1>
        <p className="mt-6 max-w-lead text-lead text-text-secondary">
          {found.intro}
        </p>
      </header>

      <ul className="mt-11 grid grid-cols-2 gap-seam lg:grid-cols-3">
        {products.map((product, i) => (
          <li key={product.slug} className="aspect-portrait">
            <Reveal distance="mid" index={i} className="h-full">
              <Frame
                variant="product"
                transition="product"
                href={`/products/${product.slug}`}
                image={product.images[0] ?? found.cover}
                alt={`${product.name} — ${product.eyebrow}.`}
                label={product.eyebrow}
                title={product.name}
                meta={formatPrice(product.priceEUR)}
                cta="View Piece"
                sizes="(min-width: 1200px) 33vw, 50vw"
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </main>
  )
}
