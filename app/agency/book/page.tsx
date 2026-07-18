import type { Metadata } from 'next'
import Link from 'next/link'
import { AgencyForm } from '@/features/agency/AgencyForm'

export const metadata: Metadata = {
  title: 'Book a Model',
  description: 'Book PAXIA agency talent for casting, campaigns, and shows.',
}

export default function BookPage() {
  return (
    <main id="main" className="px-[var(--margin-x)] py-sect-normal">
      <nav aria-label="Breadcrumb" className="text-micro uppercase text-text-muted">
        <Link href="/agency" className="hover:text-text-primary">
          Agency
        </Link>
        <span aria-hidden="true" className="mx-2 text-text-metadata">
          /
        </span>
        <span className="text-text-secondary">Book a Model</span>
      </nav>

      <header className="mt-9 max-w-body">
        <h1 className="font-display text-d-2 text-text-primary">
          Book a Model
        </h1>
        <p className="mt-6 max-w-lead text-lead text-text-secondary">
          Casting, campaigns, shows. Tell us the work and the dates; one booker
          handles your request from first note to call sheet.
        </p>
      </header>

      <div className="mt-11 max-w-body">
        <AgencyForm kind="book" />
      </div>
    </main>
  )
}
