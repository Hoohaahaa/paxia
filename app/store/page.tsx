import { TextReveal } from '@/components/reveal/TextReveal'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal/Reveal'
import { getStores } from '@/lib/stores'

export const metadata: Metadata = {
  title: 'Store',
  description: 'PAXIA flagship stores — five cities, one house.',
}

/**
 * Store — architectural, wide, spacious; the slowest page in the site
 * (docs/02 §4). Rooms, not inventory: each store is a full-width architectural
 * band, image left of an address column, alternating. Density stays low on
 * purpose — one store per viewport-ish stride, --sect-wide apart.
 */
export default function StorePage() {
  const stores = getStores()

  return (
    <main id="main" className="px-[var(--margin-x)] py-sect-normal">
      <header className="max-w-content">
        <p className="text-micro uppercase text-text-muted">Store</p>
        <TextReveal as="h1" className="mt-5 font-display text-d-3 text-text-primary">
          Five Cities
        </TextReveal>
        <p className="mt-6 max-w-lead text-lead text-text-secondary">
          Each store is a room of the same house — built with local stone and
          the same light. Visit any of them and you have visited all of them.
        </p>
      </header>

      <ul className="mt-sect-tight flex flex-col gap-sect-wide">
        {stores.map((store, i) => (
          <li key={store.slug}>
            <article className="grid grid-cols-4 items-end gap-8 md:grid-cols-12 md:gap-5">
              <Reveal
                distance="far"
                className={`col-span-4 md:col-span-8 ${i % 2 === 1 ? 'md:col-start-5 md:order-2' : ''}`}
              >
                <Link
                  href={`/store/${store.slug}`}
                  className="group relative block aspect-campaign w-full overflow-hidden bg-surface-frame"
                >
                  <Image
                    src={store.image}
                    alt={`The ${store.city} store.`}
                    fill
                    sizes="(min-width: 900px) 66vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-scrim-bottom"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 shadow-frame transition-opacity duration-fast ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h2 className="font-display text-d-1 text-text-image">
                      {store.city}
                    </h2>
                    {store.flagship ? (
                      <p className="mt-2 font-mono text-nano uppercase tabular-nums text-text-image-muted">
                        Flagship
                      </p>
                    ) : null}
                  </div>
                </Link>
              </Reveal>

              <Reveal
                distance="near"
                className={`col-span-4 md:col-span-3 ${i % 2 === 1 ? 'md:col-start-1 md:order-1' : 'md:col-start-10'}`}
              >
                <p className="max-w-body text-base text-text-secondary">
                  {store.line}
                </p>
                <address className="mt-5 font-mono text-small not-italic tabular-nums text-text-muted">
                  {store.address.map((row) => (
                    <span key={row} className="block">
                      {row}
                    </span>
                  ))}
                </address>
                <Link
                  href={`/store/${store.slug}`}
                  className="mt-5 inline-flex min-h-tap items-center gap-2 text-micro uppercase text-text-primary"
                >
                  Visit Store <span aria-hidden="true">↗</span>
                </Link>
              </Reveal>
            </article>
          </li>
        ))}
      </ul>
    </main>
  )
}
