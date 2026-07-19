import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Reveal } from '@/components/reveal/Reveal'
import { getStore, getStores } from '@/lib/stores'

type Params = { store: string }

export function generateStaticParams(): Params[] {
  return getStores().map((s) => ({ store: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { store } = await params
  const found = getStore(store)
  return found
    ? { title: `${found.city} — Store`, description: found.line }
    : { title: 'Store' }
}

/**
 * Store Detail — one room at full width. Architectural image, then the
 * practical facts set like a printed card: address, hours, phone, all mono
 * tabular. Low density; the page trusts one image and one column of facts.
 */
export default async function StoreDetailPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { store } = await params
  const found = getStore(store)
  if (!found) notFound()

  return (
    <main id="main" className="px-[var(--margin-x)] py-sect-normal">
      <nav aria-label="Breadcrumb" className="text-micro uppercase text-text-muted">
        <Link href="/store" className="hover:text-text-primary">
          Store
        </Link>
        <span aria-hidden="true" className="mx-2 text-text-metadata">
          /
        </span>
        <span className="text-text-secondary">{found.city}</span>
      </nav>

      <header className="mt-9">
        <p className="text-micro uppercase text-text-muted">
          {found.flagship ? 'Flagship' : 'Store'}
        </p>
        <h1 className="mt-5 font-display text-d-3 text-text-primary">
          {found.city}
        </h1>
        <p className="mt-6 max-w-lead text-lead text-text-secondary">
          {found.line}
        </p>
      </header>

      <Reveal distance="far" className="mt-sect-tight">
        <div className="relative aspect-campaign w-full overflow-hidden bg-surface-frame">
          <Image
            src={found.image}
            alt={`Inside the ${found.city} store.`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      <section
        aria-label="Practical information"
        className="mt-sect-tight grid grid-cols-4 gap-8 md:grid-cols-12 md:gap-5"
      >
        <div className="col-span-4 md:col-span-3">
          <h2 className="font-mono text-nano uppercase tabular-nums text-text-muted">
            Address
          </h2>
          <address className="mt-3 font-mono text-small not-italic tabular-nums text-text-secondary">
            {found.address.map((row) => (
              <span key={row} className="block">
                {row}
              </span>
            ))}
          </address>
        </div>
        <div className="col-span-4 md:col-span-3 md:col-start-5">
          <h2 className="font-mono text-nano uppercase tabular-nums text-text-muted">
            Hours
          </h2>
          <dl className="mt-3 font-mono text-small tabular-nums text-text-secondary">
            {found.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4">
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="col-span-4 md:col-span-3 md:col-start-9">
          <h2 className="font-mono text-nano uppercase tabular-nums text-text-muted">
            Contact
          </h2>
          <p className="mt-3 font-mono text-small tabular-nums text-text-secondary">
            {found.phone}
          </p>
          <Link
            href="/bespoke"
            className="mt-5 inline-flex min-h-tap items-center gap-2 text-micro uppercase text-text-primary"
          >
            Book Appointment <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
