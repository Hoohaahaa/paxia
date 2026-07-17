import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal/Reveal'

/**
 * JournalPreview — three articles, editorial ratio, --gutter apart (docs/02 §3.7):
 * date in mono nano, title in --d-1, no excerpt. An excerpt is a magazine
 * admitting its headline failed. The title sits below the image on --surface-void,
 * so this is not a Frame (label-inside, scrim, CTA) — it is the Journal's own
 * editorial register. Reveals as a stagger.
 */
type Article = {
  href: string
  img: string
  alt: string
  date: string
  title: string
}

const ARTICLES: readonly Article[] = [
  {
    href: '/journal/the-atelier-at-dawn',
    img: '/img/journal-1.svg',
    alt: 'The atelier before opening, chairs stacked, light low.',
    date: 'March 2026',
    title: 'The Atelier at Dawn',
  },
  {
    href: '/journal/on-keeping-the-selvedge',
    img: '/img/journal-2.svg',
    alt: 'A bolt of wool half-unrolled on a cutting table.',
    date: 'February 2026',
    title: 'On Keeping the Selvedge',
  },
  {
    href: '/journal/five-cities-one-house',
    img: '/img/journal-3.svg',
    alt: 'A flagship doorway at dusk, brass handle worn bright.',
    date: 'January 2026',
    title: 'Five Cities, One House',
  },
]

export function JournalPreview() {
  return (
    <section
      aria-label="From the Journal"
      className="px-[var(--margin-x)] py-sect-normal"
    >
      <p className="text-micro uppercase text-text-muted">The Journal</p>
      <ul className="mt-8 grid grid-cols-4 gap-5 md:grid-cols-12">
        {ARTICLES.map((article, i) => (
          <li key={article.href} className="col-span-4">
            <Reveal distance="mid" index={i}>
              <Link href={article.href} className="group block">
                <div className="relative aspect-editorial w-full overflow-hidden bg-surface-frame">
                  <Image
                    src={article.img}
                    alt={article.alt}
                    fill
                    sizes="(min-width: 900px) 30vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 shadow-frame transition-opacity duration-fast ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </div>
                <p className="mt-4 font-mono text-nano uppercase tabular-nums text-text-metadata">
                  {article.date}
                </p>
                <h3 className="mt-2 font-display text-d-1 text-text-primary">
                  {article.title}
                </h3>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
