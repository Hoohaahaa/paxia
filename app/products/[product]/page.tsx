import { imageSrc } from '@/lib/images'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Frame } from '@/components/frame/Frame'
import { Reveal } from '@/components/reveal/Reveal'
import { PurchaseModule } from '@/features/product/PurchaseModule'
import {
  formatPrice,
  getCollection,
  getProduct,
  getProducts,
  getRelatedProducts,
} from '@/lib/catalog'

type Params = { product: string }

export function generateStaticParams(): Params[] {
  return getProducts().map((p) => ({ product: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { product } = await params
  const found = getProduct(product)
  return found
    ? { title: found.name, description: found.line }
    : { title: 'Piece' }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { product } = await params
  const found = getProduct(product)
  if (!found) notFound()

  const collection = getCollection(found.collection)
  const related = getRelatedProducts(found)
  const hero = found.images[0] ?? imageSrc('collection-volume-one')
  const detail = found.images[1] ?? hero

  return (
    <main id="main" className="px-[var(--margin-x)] py-sect-normal">
      <nav aria-label="Breadcrumb" className="text-micro uppercase text-text-muted">
        <Link href="/collections" className="hover:text-text-primary">
          Collections
        </Link>
        {collection ? (
          <>
            <span aria-hidden="true" className="mx-2 text-text-metadata">
              /
            </span>
            <Link
              href={`/collections/${collection.slug}`}
              className="hover:text-text-primary"
            >
              {collection.title}
            </Link>
          </>
        ) : null}
        <span aria-hidden="true" className="mx-2 text-text-metadata">
          /
        </span>
        <span className="text-text-secondary">{found.name}</span>
      </nav>

      {/* 1 — Emotion. Image-led; the piece is felt before it is specified. */}
      <section className="mt-9 grid gap-8 lg:grid-cols-2 lg:gap-5">
        <Reveal distance="far">
          {/* data-product-hero: landing target of the product-open transition. */}
          <div
            data-product-hero
            className="relative aspect-portrait w-full overflow-hidden bg-surface-frame"
          >
            <Image
              src={hero}
              alt={`${found.name} — ${found.eyebrow}.`}
              fill
              priority
              sizes="(min-width: 1200px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div className="lg:self-center">
          <Reveal distance="near">
            <p className="text-micro uppercase text-text-muted">{found.eyebrow}</p>
            <h1 className="mt-4 font-display text-d-2 text-text-primary">
              {found.name}
            </h1>
            <p className="mt-6 max-w-lead text-lead text-text-secondary">
              {found.line}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2 — Object. A second look, closer. */}
      <section className="mt-sect-wide" aria-label="The piece">
        <Reveal distance="far">
          <div className="relative aspect-editorial w-full overflow-hidden bg-surface-frame">
            <Image
              src={detail}
              alt={`${found.name}, detail.`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* 3 — Material. 4 — Craft. Prose, offset, one measure. */}
      <div className="mt-sect-wide flex flex-col gap-9 lg:grid lg:grid-cols-12 lg:gap-5">
        <h2 className="text-micro uppercase text-text-muted lg:col-span-3">
          Material
        </h2>
        <div className="lg:col-span-8 lg:col-start-5">
          <Reveal distance="near">
            <p className="max-w-body text-lead text-text-secondary">
              {found.material}
            </p>
            <p className="mt-6 max-w-body text-base text-text-muted">
              {found.origin}
            </p>
          </Reveal>
        </div>
      </div>

      {/* 5 — Information. Specifications arrive late, never first. */}
      <section className="mt-sect-wide flex flex-col gap-9 lg:grid lg:grid-cols-12 lg:gap-5">
        <h2 className="text-micro uppercase text-text-muted lg:col-span-3">
          Information
        </h2>
        <dl className="flex flex-col gap-6 lg:col-span-8 lg:col-start-5">
          {[
            { term: 'Composition', detail: found.composition },
            { term: 'Care', detail: found.care },
          ].map((row) => (
            <div key={row.term} className="border-t border-line-hairline pt-4">
              <dt className="font-mono text-nano uppercase tabular-nums text-text-muted">
                {row.term}
              </dt>
              <dd className="mt-2 max-w-body text-base tabular-nums text-text-secondary">
                {row.detail}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 6 — Purchase. Last in the sequence; sticks below --bp-lg only. */}
      <section
        aria-label="Purchase"
        className="sticky bottom-0 z-content mt-sect-wide border-t border-line-hairline bg-surface-void py-6 lg:static lg:border-0 lg:py-0"
      >
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            <PurchaseModule
              name={found.name}
              priceEUR={found.priceEUR}
              sizes={found.sizes}
            />
          </div>
        </div>
      </section>

      {/* 7 — Related. */}
      {related.length > 0 ? (
        <section aria-label="Continue" className="mt-sect-hero">
          <p className="text-micro uppercase text-text-muted">Continue</p>
          <ul className="mt-8 grid grid-cols-2 gap-seam lg:grid-cols-3">
            {related.map((item, i) => (
              <li key={item.slug} className="aspect-portrait">
                <Reveal distance="mid" index={i} className="h-full">
                  <Frame
                    variant="product"
                    transition="product"
                    href={`/products/${item.slug}`}
                    image={item.images[0] ?? hero}
                    alt={`${item.name} — ${item.eyebrow}.`}
                    label={item.eyebrow}
                    title={item.name}
                    meta={formatPrice(item.priceEUR)}
                    cta="View Piece"
                    sizes="(min-width: 1200px) 33vw, 50vw"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  )
}
