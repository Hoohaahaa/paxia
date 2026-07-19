import { TextReveal } from '@/components/reveal/TextReveal'
import type { Metadata } from 'next'
import Link from 'next/link'
import { InquiryForm } from '@/components/form/InquiryForm'
import { getStores } from '@/lib/stores'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Write to PAXIA — client care, press, and the ateliers.',
}

/**
 * Contact — a letter, not a ticket system. One form, then the practicalities
 * set like the back page of a programme: each city's line routes to its store
 * page, where hours and addresses already live. No department dropdown — the
 * house sorts its own mail.
 */
export default function ContactPage() {
  return (
    <main id="main" className="px-[var(--margin-x)] py-sect-normal">
      <header className="max-w-body">
        <p className="text-micro uppercase text-text-muted">Contact</p>
        <TextReveal as="h1" className="mt-5 font-display text-d-3 text-text-primary">
          Write to the house
        </TextReveal>
        <p className="mt-6 max-w-lead text-lead text-text-secondary">
          One address for everything — a piece, a fitting, a story, an idea.
          Letters are read in the order they arrive and answered by a person.
        </p>
      </header>

      <div className="mt-11 max-w-body">
        <InquiryForm
          submitLabel="Send"
          confirmMessage="Thank you. Your letter has a place in the queue and will be answered within two working days."
          fields={[
            {
              kind: 'text',
              id: 'contact-name',
              name: 'name',
              label: 'Name',
              autoComplete: 'name',
              requiredMessage: 'Add your name so we know who is writing.',
            },
            {
              kind: 'email',
              id: 'contact-email',
              name: 'email',
              label: 'Email',
              autoComplete: 'email',
              requiredMessage: 'Add an email so we can reply.',
            },
            {
              kind: 'textarea',
              id: 'contact-message',
              name: 'message',
              label: 'Your letter',
              rows: 6,
              requiredMessage: 'The letter needs at least a line.',
            },
          ]}
        />
      </div>

      <section aria-label="The rooms" className="mt-sect-wide max-w-body">
        <h2 className="text-micro uppercase text-text-muted">In person</h2>
        <ul className="mt-5">
          {getStores().map((store) => (
            <li key={store.slug} className="border-t border-line-hairline">
              <Link
                href={`/store/${store.slug}`}
                className="group flex min-h-tap items-baseline justify-between gap-6 py-4"
              >
                <span className="text-base text-text-primary">{store.city}</span>
                <span className="font-mono text-small tabular-nums text-text-muted transition-colors duration-fast ease-out group-hover:text-text-secondary">
                  {store.phone}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
