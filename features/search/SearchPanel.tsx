'use client'

// Client: live query state. The index itself is static (lib/search).
import { useId, useState } from 'react'
import Link from 'next/link'
import { searchEntries } from '@/lib/search'

/**
 * SearchPanel — one field, results as a printed index. Results update as the
 * visitor types and are announced politely. The empty state is a statement and
 * one suggestion, never an icon of a sad box (docs/04_COMPONENTS.md).
 */
export function SearchPanel() {
  const [query, setQuery] = useState('')
  const resultsId = useId()
  const results = searchEntries(query)
  const attempted = query.trim().length > 0

  return (
    <div>
      <label
        htmlFor="site-search"
        className="font-mono text-nano uppercase tabular-nums text-text-metadata"
      >
        Search the house
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        role="combobox"
        aria-expanded={results.length > 0}
        aria-controls={resultsId}
        className="mt-2 w-full rounded-none border-0 border-b border-line-hairline bg-transparent px-0 py-3 text-lead text-text-primary outline-none transition-colors duration-fast ease-out placeholder:text-text-muted focus-visible:border-accent"
        placeholder="A piece, a city, a name, a word"
      />

      <div aria-live="polite" className="mt-9">
        {attempted && results.length === 0 ? (
          <div>
            <p className="max-w-lead font-display text-d-1 text-text-primary">
              Nothing answers to that yet.
            </p>
            <Link
              href="/collections"
              className="mt-5 inline-flex min-h-tap items-center gap-2 text-micro uppercase text-text-secondary hover:text-text-primary"
            >
              Explore Collection <span aria-hidden="true">↗</span>
            </Link>
          </div>
        ) : (
          <ul id={resultsId}>
            {results.map((entry) => (
              <li key={entry.href} className="border-t border-line-hairline">
                <Link
                  href={entry.href}
                  className="group flex min-h-tap items-baseline justify-between gap-6 py-4"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-nano uppercase tabular-nums text-text-metadata">
                      {entry.type}
                    </span>
                    <span className="text-base text-text-primary">
                      {entry.title}
                    </span>
                  </span>
                  <span className="text-small text-text-muted transition-colors duration-fast ease-out group-hover:text-text-secondary">
                    {entry.line}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
