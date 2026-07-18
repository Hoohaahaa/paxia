'use client'

// Client because the active-route mark is derived from the current path.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PRIMARY_NAV, UTILITY_NAV } from './nav'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export function Rail() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <div className="fixed inset-y-0 left-0 z-rail hidden w-rail flex-col border-r border-line-hairline bg-surface-rail px-5 py-7 md:flex">
      <Link
        href="/"
        className="font-ui text-micro uppercase text-text-primary"
        style={{ letterSpacing: 'var(--u-wordmark-track)' }}
      >
        PAXIA
      </Link>

      <nav aria-label="Primary" className="mt-11">
        <ul className="flex flex-col gap-5">
          {PRIMARY_NAV.map((item) => {
            const active = isActive(item.href)
            return (
              <li key={item.href} className="relative">
                {/* Active mark: a patina rule, inset left of the label. The
                    text colour never changes — only this mark does. Tweening
                    the mark between items waits on real routes. */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-3 top-1/2 h-3 w-seam -translate-y-1/2 bg-accent transition-opacity duration-normal ease-out ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`block text-micro uppercase transition-colors duration-fast ease-out ${
                    active
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="flex-1" />

      <nav aria-label="Utility">
        <ul className="flex flex-col gap-4">
          {UTILITY_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block text-micro uppercase text-text-muted transition-colors duration-fast ease-out hover:text-text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle className="text-text-muted hover:text-text-primary" />
          </li>
        </ul>
      </nav>
    </div>
  )
}
