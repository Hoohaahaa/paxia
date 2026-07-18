import { TextReveal } from '@/components/reveal/TextReveal'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal/Reveal'

export const metadata: Metadata = {
  title: 'About',
  description: 'PAXIA — one house: ready-to-wear, bespoke, stores, agency, journal.',
}

/**
 * About — the house explains itself the way it dresses: few words, no
 * announcement. A statement, the five surfaces as a printed index, one craft
 * image, and the facts in mono. No timeline, no team wall, no mission section —
 * we demonstrate, we do not announce (docs/05 §3).
 */
const SURFACES = [
  { label: 'Collections', line: 'Ready-to-wear, in studies.', href: '/collections' },
  { label: 'Bespoke', line: 'One garment, one person.', href: '/bespoke' },
  { label: 'Store', line: 'Five cities, one room.', href: '/store' },
  { label: 'Agency', line: 'The faces of the house.', href: '/agency' },
  { label: 'Journal', line: 'Notes, written slowly.', href: '/journal' },
]

const FACTS = [
  { term: 'Founded', detail: 'Yerevan' },
  { term: 'Atelier', detail: '1 Abovyan Street' },
  { term: 'Cities', detail: 'Yerevan · Istanbul · Milan · Berlin · Madrid' },
  { term: 'Surfaces', detail: 'Five, one language' },
]

export default function AboutPage() {
  return (
    <main id="main" className="px-[var(--margin-x)] py-sect-normal">
      <header>
        <p className="text-micro uppercase text-text-muted">About</p>
        <TextReveal as="h1" className="mt-5 max-w-lead font-display text-d-3 text-text-primary">
          A house, not a shop.
        </TextReveal>
        <p className="mt-6 max-w-lead text-lead text-text-secondary">
          PAXIA makes clothes, keeps an atelier, holds five rooms in five
          cities, represents its own faces, and writes down what it learns.
          One identity carries all of it.
        </p>
      </header>

      <section aria-label="The surfaces" className="mt-sect-wide">
        <ul className="max-w-body">
          {SURFACES.map((surface, i) => (
            <li key={surface.href} className="border-t border-line-hairline">
              <Reveal distance="near" index={i}>
                <Link
                  href={surface.href}
                  className="group flex min-h-tap items-baseline justify-between gap-6 py-5"
                >
                  <span className="font-display text-d-1 text-text-primary">
                    {surface.label}
                  </span>
                  <span className="text-base text-text-muted transition-colors duration-fast ease-out group-hover:text-text-secondary">
                    {surface.line}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <Reveal distance="far" className="mt-sect-wide">
        <div className="relative aspect-campaign w-full overflow-hidden bg-surface-frame">
          <Image
            src="/img/craft.svg"
            alt="Macro detail of hand-finished wool."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      <section
        aria-label="The facts"
        className="mt-sect-wide grid grid-cols-4 gap-8 md:grid-cols-12 md:gap-5"
      >
        <h2 className="col-span-4 text-micro uppercase text-text-muted md:col-span-3">
          The Facts
        </h2>
        <dl className="col-span-4 max-w-body md:col-span-8 md:col-start-5">
          {FACTS.map((fact) => (
            <div
              key={fact.term}
              className="flex justify-between gap-6 border-t border-line-hairline py-3 font-mono text-small tabular-nums"
            >
              <dt className="uppercase text-text-muted">{fact.term}</dt>
              <dd className="text-right text-text-secondary">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  )
}
