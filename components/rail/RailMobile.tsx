'use client'

// Client: the mobile menu is stateful (open/close, focus trap, scroll lock).
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PRIMARY_NAV, UTILITY_NAV } from './nav'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

const WORDMARK_TRACK = { letterSpacing: 'var(--u-wordmark-track)' } as const

export function RailMobile() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    if (!panel) return

    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab') return
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      )
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  return (
    <>
      {/* Collapsed bar — the rail below --bp-md. Not a hamburger drawer. */}
      <div className="fixed inset-x-0 top-0 z-rail flex h-rail-h items-center justify-between border-b border-line-hairline bg-surface-rail px-5 md:hidden">
        <Link
          href="/"
          className="font-ui text-micro uppercase text-text-primary"
          style={WORDMARK_TRACK}
        >
          PAXIA
        </Link>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex min-h-tap items-center text-micro uppercase text-text-primary"
        >
          Menu
        </button>
      </div>

      {/* Bone panel — a moment of paper in a dark world. Unfolds from the
          right; the inversion makes it read as a physical object. */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={open ? undefined : true}
        className={`fixed inset-0 z-overlay flex flex-col bg-surface-inverse px-6 py-7 text-text-bone transition-transform duration-slow ease-heavy md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className="font-ui text-micro uppercase text-text-bone"
            style={WORDMARK_TRACK}
          >
            PAXIA
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="inline-flex min-h-tap items-center text-micro uppercase text-text-bone"
          >
            Close
          </button>
        </div>

        <nav
          aria-label="Primary"
          className="mt-11 flex flex-1 flex-col items-start gap-5"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="font-display text-d-1 text-text-bone"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Utility" className="flex gap-6">
          {UTILITY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="inline-flex min-h-tap items-center text-micro uppercase text-text-bone-muted"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle className="text-text-bone-muted" />
        </nav>
      </div>
    </>
  )
}
