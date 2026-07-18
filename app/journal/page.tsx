import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '@/lib/journal'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'The PAXIA journal — notes from the house.',
}

/**
 * Journal — the bone reading world (docs/02 §4): typographic, uninterrupted.
 * The index is a contents page, not a card wall: date, serif title,
 * standfirst, hairline rules. Images stay on the homepage teaser; here the
 * type carries everything.
 */
export default function JournalPage() {
  const articles = getArticles()

  return (
    <main id="main" className="bg-surface-inverse text-text-bone">
      <div className="px-[var(--margin-x)] py-sect-normal">
        <header>
          <p className="text-micro uppercase text-text-bone-muted">Journal</p>
          <h1 className="mt-5 font-display text-d-3 text-text-bone">
            The Journal
          </h1>
          <p className="mt-6 max-w-lead text-lead text-text-bone-muted">
            Notes from the house — the atelier, the cloth, the cities. Written
            slowly, published when finished.
          </p>
        </header>

        <ul className="mt-sect-tight max-w-body">
          {articles.map((article) => (
            <li key={article.slug} className="border-t border-line-bone">
              <Link
                href={`/journal/${article.slug}`}
                className="group block py-8"
              >
                <p className="font-mono text-nano uppercase tabular-nums text-text-bone-muted">
                  {article.date}
                </p>
                <h2 className="mt-3 font-display text-d-1 text-text-bone">
                  {article.title}
                </h2>
                <p className="mt-4 max-w-lead text-base text-text-bone-muted">
                  {article.standfirst}
                </p>
                <span className="mt-5 inline-flex min-h-tap items-center gap-2 text-micro uppercase text-text-bone">
                  Enter Journal <span aria-hidden="true">↗</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
