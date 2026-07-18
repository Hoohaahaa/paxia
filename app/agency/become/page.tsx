import type { Metadata } from 'next'
import Link from 'next/link'
import { InquiryForm } from '@/components/form/InquiryForm'

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
        <InquiryForm
          submitLabel="Introduce Yourself"
          confirmMessage="Thank you. The agency reviews every introduction and replies within a week, whatever the answer."
          fields={[
            {
              kind: 'text',
              id: 'agency-name',
              name: 'name',
              label: 'Name',
              autoComplete: 'name',
              requiredMessage: 'Add your name so we know who is writing.',
            },
            {
              kind: 'email',
              id: 'agency-email',
              name: 'email',
              label: 'Email',
              autoComplete: 'email',
              requiredMessage: 'Add an email so we can reply.',
            },
            {
              kind: 'text',
              id: 'agency-city',
              name: 'city',
              label: 'Where you are based',
            },
            {
              kind: 'textarea',
              id: 'agency-notes',
              name: 'notes',
              label: 'Anything we should know',
            },
          ]}
        />
      </div>
    </main>
  )
}
