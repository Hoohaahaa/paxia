import type { Metadata } from 'next'
import Link from 'next/link'
import { InquiryForm } from '@/components/form/InquiryForm'

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
        <InquiryForm
          submitLabel="Request Booking"
          confirmMessage="Thank you. A booker will write within one working day to confirm availability."
          fields={[
            {
              kind: 'text',
              id: 'booking-name',
              name: 'name',
              label: 'Name',
              autoComplete: 'name',
              requiredMessage: 'Add your name so we know who is writing.',
            },
            {
              kind: 'email',
              id: 'booking-email',
              name: 'email',
              label: 'Email',
              autoComplete: 'email',
              requiredMessage: 'Add an email so we can reply.',
            },
            {
              kind: 'text',
              id: 'booking-company',
              name: 'company',
              label: 'Company or title',
            },
            {
              kind: 'textarea',
              id: 'booking-notes',
              name: 'notes',
              label: 'The work, the dates, the city',
            },
          ]}
        />
      </div>
    </main>
  )
}
