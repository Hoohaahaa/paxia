import { TextReveal } from '@/components/reveal/TextReveal'
import type { Metadata } from 'next'
import { SearchPanel } from '@/features/search/SearchPanel'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the house — pieces, cities, faces, and words.',
}

export default function SearchPage() {
  return (
    <main id="main" className="px-[var(--margin-x)] py-sect-normal">
      <header>
        <p className="text-micro uppercase text-text-muted">Search</p>
        <TextReveal as="h1" className="mt-5 font-display text-d-3 text-text-primary">
          Looking for something
        </TextReveal>
      </header>
      <div className="mt-11 max-w-body">
        <SearchPanel />
      </div>
    </main>
  )
}
