import type { Metadata } from 'next'
import Image from 'next/image'
import { Reveal } from '@/components/reveal/Reveal'
import { InquiryForm } from '@/components/form/InquiryForm'
import { getStores } from '@/lib/stores'

export const metadata: Metadata = {
  title: 'Bespoke',
  description:
    'The PAXIA atelier — garments made for one person, in conversation.',
}

/**
 * Bespoke — the bone world (docs/02 §4): the dark site is the house, this page
 * is its paper. --surface-inverse ground, intimate density, narrow measure,
 * everything set like a letter. The process is three numbered movements, then
 * the appointment form (Field debut). No product grid — bespoke sells a
 * conversation, not inventory.
 */
const PROCESS = [
  {
    step: '01',
    title: 'The Conversation',
    body: 'It begins with an hour, not a sketch. What the piece is for, where it will live, how it should age. Cloth arrives on the table only after the life it is meant for is understood.',
  },
  {
    step: '02',
    title: 'The Making',
    body: 'One cutter, one maker, one garment. A muslin first, corrected on the body. The cloth is cut only when the muslin stops needing correction — usually the third fitting.',
  },
  {
    step: '03',
    title: 'The Keeping',
    body: 'A bespoke piece stays in our books. Alterations, repair, and pressing remain the atelier’s work for the life of the garment, in any of the five cities.',
  },
]

export default function BespokePage() {
  return (
    <main id="main" className="bg-surface-inverse text-text-bone">
      <div className="px-[var(--margin-x)] py-sect-normal">
        <header>
          <p className="text-micro uppercase text-text-bone-muted">Bespoke</p>
          <h1 className="mt-5 font-display text-d-3 text-text-bone">
            The Atelier
          </h1>
          <p className="mt-6 max-w-lead text-lead text-text-bone-muted">
            A garment made for one person, in conversation. Slower than buying,
            and different in kind — the piece is not chosen; it is arrived at.
          </p>
        </header>

        <Reveal distance="far" className="mt-sect-tight">
          <div className="relative aspect-editorial w-full max-w-content overflow-hidden md:aspect-campaign">
            <Image
              src="/img/bespoke.svg"
              alt="The atelier table — shears, chalk, a muslin in progress."
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* The process — three movements, set like a printed programme. */}
        <section aria-label="The process" className="mt-sect-wide">
          <ol className="flex max-w-body flex-col gap-9">
            {PROCESS.map((item, i) => (
              <li key={item.step} className="border-t border-line-bone pt-6">
                <Reveal distance="near" index={i}>
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-nano uppercase tabular-nums text-text-bone-muted">
                      {item.step}
                    </span>
                    <div>
                      <h2 className="font-display text-d-1 text-text-bone">
                        {item.title}
                      </h2>
                      <p className="mt-4 max-w-body text-base text-text-bone-muted">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* The request — a letter to the atelier, not a checkout. */}
        <section aria-label="Request an appointment" className="mt-sect-wide">
          <div className="max-w-body">
            <h2 className="font-display text-d-2 text-text-bone">
              Begin the conversation
            </h2>
            <p className="mt-5 max-w-lead text-base text-text-bone-muted">
              Tell us who you are and which atelier suits you. The first
              appointment carries no obligation and no cost.
            </p>
            <div className="mt-9">
              <InquiryForm
                tone="bone"
                submitLabel="Request Bespoke"
                confirmMessage="Thank you. The atelier will write within two working days to set a time."
                fields={[
                  {
                    kind: 'text',
                    id: 'bespoke-name',
                    name: 'name',
                    label: 'Name',
                    autoComplete: 'name',
                    requiredMessage: 'Add your name so we know who to expect.',
                  },
                  {
                    kind: 'email',
                    id: 'bespoke-email',
                    name: 'email',
                    label: 'Email',
                    autoComplete: 'email',
                    requiredMessage:
                      'Add an email so we can confirm the appointment.',
                  },
                  {
                    kind: 'select',
                    id: 'bespoke-city',
                    name: 'city',
                    label: 'Preferred atelier',
                    options: getStores().map((store) => ({
                      value: store.slug,
                      label: store.city,
                    })),
                  },
                  {
                    kind: 'textarea',
                    id: 'bespoke-notes',
                    name: 'notes',
                    label: 'What are we making',
                  },
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
