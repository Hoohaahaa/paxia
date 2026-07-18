import type { Metadata } from 'next'
import Link from 'next/link'
import { AgencyForm } from '@/features/agency/AgencyForm'

export const metadata: Metadata = {
  title: 'Become a Model',
  description: 'Introduce yourself to the PAXIA agency.',
}

export default function BecomePage() {
  return (
    <main id="main" className="px-[var(--margin-x)] py-sect-normal">
      <nav aria-label="Breadcrumb" className="text-micro uppercase text-text-muted">
        <Link href="/agency" className="hover:text-text-primary">
          Agency
        </Link>
        <span aria-hidden="true" className="mx-2 text-text-metadata">
          /
        </span>
        <span className="text-text-secondary">Become a Model</span>
      </nav>

      <header className="mt-9 max-w-body">
        <h1 className="font-display text-d-2 text-text-primary">
          Become a Model
        </h1>
        <p className="mt-6 max-w-lead text-lead text-text-secondary">
          No portfolio is required — two honest photographs are enough. Every
          introduction is read by a person, and every one receives an answer.
        </p>
      </header>

      <div className="mt-11 max-w-body">
        <AgencyForm kind="become" />
      </div>
    </main>
  )
}
