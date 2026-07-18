import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Reveal } from '@/components/reveal/Reveal'
import { getArticle, getArticles } from '@/lib/journal'

type Params = { article: string }

export function generateStaticParams(): Params[] {
  return getArticles().map((a) => ({ article: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { article } = await params
  const found = getArticle(article)
  return found
    ? { title: found.title, description: found.standfirst }
    : { title: 'Journal' }
}

/**
 * Article — reading, uninterrupted (docs/02 §4). Bone ground, one column at
 * --measure-body, standfirst at --measure-lead, a single editorial image after
 * the opening. No sidebar, no related wall, no share row — the next step at
 * the end is the whole navigation.
 */
export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { article } = await params
  const found = getArticle(article)
  if (!found) notFound()

  const [opening, ...rest] = found.body

  return (
    <main id="main" className="bg-surface-inverse text-text-bone">
      <div className="px-[var(--margin-x)] py-sect-normal">
        <nav aria-label="Breadcrumb" className="text-micro uppercase text-text-bone-muted">
          <Link href="/journal" className="hover:text-text-bone">
            Journal
          </Link>
        </nav>

        <article className="mt-9">
          <header className="max-w-body">
            <p className="font-mono text-nano uppercase tabular-nums text-text-bone-muted">
              {found.date}
            </p>
            <h1 className="mt-4 font-display text-d-2 text-text-bone">
              {found.title}
            </h1>
            <p className="mt-6 max-w-lead text-lead text-text-bone-muted">
              {found.standfirst}
            </p>
          </header>

          <div className="mt-11 max-w-body text-base text-text-bone">
            {opening ? <p>{opening}</p> : null}
          </div>

          <Reveal distance="far" className="mt-11">
            <div className="relative aspect-editorial w-full max-w-body overflow-hidden">
              <Image
                src={found.image}
                alt={found.alt}
                fill
                sizes="(min-width: 900px) 66ch, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-11 flex max-w-body flex-col gap-6 text-base text-text-bone">
            {rest.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </article>

        <footer className="mt-sect-wide max-w-body border-t border-line-bone pt-6">
          <Link
            href="/journal"
            className="inline-flex min-h-tap items-center gap-2 text-micro uppercase text-text-bone"
          >
            <span aria-hidden="true">←</span> All entries
          </Link>
        </footer>
      </div>
    </main>
  )
}
