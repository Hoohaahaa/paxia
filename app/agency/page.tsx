import { TextReveal } from '@/components/reveal/TextReveal'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal/Reveal'
import { getTalent } from '@/lib/agency'

export const metadata: Metadata = {
  title: 'Agency',
  description: 'The PAXIA agency — faces of the house. Talent and bookings.',
}

/**
 * Agency — structured grid, medium-high density, organized not glamorous
 * (docs/02 §4). Talent tiles are an index, not a campaign: portrait, then
 * name/base/height in mono BELOW the image — the clinical register is the
 * point, so this is deliberately not a Frame (no scrim, no serif inside).
 */
export default function AgencyPage() {
  const talent = getTalent()

  return (
    <main id="main" className="px-[var(--margin-x)] py-sect-normal">
      <header className="max-w-content">
        <p className="text-micro uppercase text-text-muted">Agency</p>
        <TextReveal as="h1" className="mt-5 font-display text-d-3 text-text-primary">
          The Faces
        </TextReveal>
        <p className="mt-6 max-w-lead text-lead text-text-secondary">
          The agency represents the people who carry the house. Managed from
          Yerevan, working in every city we dress.
        </p>
      </header>

      <section aria-label="Talent" className="mt-sect-tight">
        <ul className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3">
          {talent.map((person, i) => (
            <li key={person.slug}>
              <Reveal distance="mid" index={i % 3}>
                <Link href={`/agency/${person.slug}`} className="group block">
                  <div className="relative aspect-portrait w-full overflow-hidden bg-surface-frame">
                    <Image
                      src={person.image}
                      alt={`${person.name}, studio portrait.`}
                      fill
                      sizes="(min-width: 900px) 30vw, 50vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 shadow-frame transition-opacity duration-fast ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-4">
                    <h2 className="text-base text-text-primary">{person.name}</h2>
                    <p className="font-mono text-nano uppercase tabular-nums text-text-metadata">
                      {person.base} · {person.height}
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* The two pathways from the IA — set as a printed index, not banners. */}
      <section aria-label="Work with the agency" className="mt-sect-wide">
        <ul className="max-w-body">
          {[
            {
              href: '/agency/become',
              title: 'Become a Model',
              line: 'Introductions are read by people, not filters.',
            },
            {
              href: '/agency/book',
              title: 'Book a Model',
              line: 'Casting, campaigns, shows. One booker per request.',
            },
          ].map((path) => (
            <li key={path.href} className="border-t border-line-hairline">
              <Link
                href={path.href}
                className="group flex min-h-tap items-baseline justify-between gap-6 py-6"
              >
                <span>
                  <span className="font-display text-d-1 text-text-primary">
                    {path.title}
                  </span>
                  <span className="mt-2 block text-base text-text-muted">
                    {path.line}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-micro uppercase text-text-secondary transition-colors duration-fast ease-out group-hover:text-text-primary"
                >
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
