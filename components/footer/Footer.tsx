import Link from 'next/link'

/**
 * Footer — the ground the site rests on (docs/02 §3.8). --surface-rail, wordmark,
 * WORLDWIDE, four link columns in --u-micro, legal in --u-nano.
 *
 * The nano headings/legal use --text-muted, not --text-metadata: metadata is a
 * 4.69:1 floor legal only at ≥14px on void (01_TOKENS §1.9), and on the lighter
 * --surface-rail ground at nano it drops below AA. Accessibility outranks the
 * visual spec (00_VISION decision hierarchy), so we take the higher-contrast ink.
 * Every link is a documented IA route (docs/02 §1); the footer invents nothing.
 */
const COLUMNS: readonly { heading: string; items: { label: string; href: string }[] }[] = [
  {
    heading: 'Houses',
    items: [
      { label: 'Collections', href: '/collections' },
      { label: 'Bespoke', href: '/bespoke' },
    ],
  },
  {
    heading: 'Places',
    items: [
      { label: 'Store', href: '/store' },
      { label: 'Agency', href: '/agency' },
    ],
  },
  {
    heading: 'Editorial',
    items: [
      { label: 'Journal', href: '/journal' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    heading: 'Client',
    items: [
      { label: 'Search', href: '/search' },
      { label: 'Cart', href: '/cart' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-surface-rail px-[var(--margin-x)] py-sect-tight">
      <div className="flex flex-col gap-9">
        <div className="flex items-baseline justify-between">
          <span
            className="font-ui text-micro uppercase text-text-primary"
            style={{ letterSpacing: 'var(--u-wordmark-track)' }}
          >
            PAXIA
          </span>
          <span className="text-micro uppercase text-text-muted">Worldwide</span>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4"
        >
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="font-mono text-nano uppercase tabular-nums text-text-muted">
                {col.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-tap items-center text-micro uppercase text-text-secondary transition-colors duration-fast ease-out hover:text-text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <p className="font-mono text-nano uppercase tabular-nums text-text-muted">
          © 2026 PAXIA — All rights reserved
        </p>
      </div>
    </footer>
  )
}
