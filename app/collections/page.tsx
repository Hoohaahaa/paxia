import type { Metadata } from 'next'
import { Frame } from '@/components/frame/Frame'
import { Reveal } from '@/components/reveal/Reveal'
import { getCollections, getProductsByCollection } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'The PAXIA collections — ready-to-wear studies in one language.',
}

export default function CollectionsPage() {
  const collections = getCollections()

  return (
    <main id="main" className="px-[var(--margin-x)] py-sect-normal">
      <header className="max-w-content">
        <p className="text-micro uppercase text-text-muted">Collections</p>
        <h1 className="mt-5 font-display text-d-3 text-text-primary">
          The Collections
        </h1>
        <p className="mt-6 max-w-lead text-lead text-text-secondary">
          Three studies in one language. Read them as chapters — each is
          complete, and each says more beside the others.
        </p>
      </header>

      <ul className="mt-11 grid grid-cols-1 gap-seam sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection, i) => (
          <li key={collection.slug} className="aspect-portrait">
            <Reveal distance="mid" index={i} className="h-full">
              <Frame
                variant="collection"
                href={`/collections/${collection.slug}`}
                image={collection.cover}
                alt={`${collection.title} — ${collection.season}.`}
                label={collection.season}
                title={collection.title}
                meta={`${getProductsByCollection(collection.slug).length} Pieces`}
                cta="Explore Collection"
                sizes="(min-width: 1200px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </main>
  )
}
