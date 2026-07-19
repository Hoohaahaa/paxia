import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Your bag.',
}

/**
 * Cart — the rail links here, so the page must exist; checkout does not yet
 * (docs/02 §1 lists it under [Future]). Until then this is the editorial
 * EmptyState from 04_COMPONENTS: a statement and one action. When the bag
 * gains contents, this page gains a list — the route does not move.
 */
export default function CartPage() {
  return (
    <main id="main" className="px-[var(--margin-x)] py-sect-normal">
      <header>
        <p className="text-micro uppercase text-text-muted">Cart</p>
      </header>
      <div className="mt-11">
        <p className="max-w-lead font-display text-d-2 text-text-primary">
          Your bag is empty — the collections are not.
        </p>
        <Link
          href="/collections"
          className="mt-7 inline-flex min-h-tap items-center gap-2 text-micro uppercase text-text-secondary hover:text-text-primary"
        >
          Explore Collection <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </main>
  )
}
