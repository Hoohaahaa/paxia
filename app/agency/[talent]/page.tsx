import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Reveal } from '@/components/reveal/Reveal'
import { getTalent, getTalentBySlug } from '@/lib/agency'

type Params = { talent: string }

export function generateStaticParams(): Params[] {
  return getTalent().map((t) => ({ talent: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { talent } = await params
  const found = getTalentBySlug(talent)
  return found
    ? { title: `${found.name} — Agency` }
    : { title: 'Talent' }
}

/**
 * Talent detail — a comp card, set like a document: portrait left,
 * measurements as a mono table right. Organized, not glamorous.
 */
export default async function TalentPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { talent } = await params
  const found = getTalentBySlug(talent)
  if (!found) notFound()

  const rows = [
    { term: 'Base', detail: found.base },
    { term: 'Height', detail: found.height },
    { term: 'Bust', detail: found.bust },
    { term: 'Waist', detail: found.waist },
    { term: 'Hips', detail: found.hips },
    { term: 'Shoe', detail: found.shoe },
    { term: 'Hair', detail: found.hair },
    { term: 'Eyes', detail: found.eyes },
  ]

  return (
    <main id="main" className="px-[var(--margin-x)] py-sect-normal">
      <nav aria-label="Breadcrumb" className="text-micro uppercase text-text-muted">
        <Link href="/agency" className="hover:text-text-primary">
          Agency
        </Link>
        <span aria-hidden="true" className="mx-2 text-text-metadata">
          /
        </span>
        <span className="text-text-secondary">{found.name}</span>
      </nav>

      <div className="mt-9 grid grid-cols-4 gap-8 md:grid-cols-12 md:gap-5">
        <Reveal distance="far" className="col-span-4 md:col-span-6">
          <div className="relative aspect-portrait w-full overflow-hidden bg-surface-frame">
            <Image
              src={found.image}
              alt={`${found.name}, studio portrait.`}
              fill
              priority
              sizes="(min-width: 900px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="col-span-4 md:col-span-5 md:col-start-8 md:self-center">
          <Reveal distance="near">
            <h1 className="font-display text-d-2 text-text-primary">
              {found.name}
            </h1>
            <dl className="mt-8 max-w-body">
              {rows.map((row) => (
                <div
                  key={row.term}
                  className="flex justify-between gap-6 border-t border-line-hairline py-3 font-mono text-small tabular-nums"
                >
                  <dt className="uppercase text-text-muted">{row.term}</dt>
                  <dd className="text-text-secondary">{row.detail}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/agency/book"
              className="mt-8 inline-flex min-h-tap items-center gap-2 text-micro uppercase text-text-primary"
            >
              Book {found.name} <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </main>
  )
}
