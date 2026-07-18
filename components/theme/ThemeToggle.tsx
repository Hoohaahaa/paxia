'use client'

// Client: the scheme switch. The single source of truth is the data-theme
// attribute on <html>, set pre-paint by ThemeScript. Every toggle instance
// (rail + mobile menu) observes that attribute, so they can never disagree —
// the stale-sibling bug behind "light/dark doesn't work properly".
import { useEffect, useState } from 'react'

const KEY = 'paxia-theme'
const THEME_COLOR: Record<'night' | 'day', string> = {
  // Mirrors --ink-950 / --ink-000; the theme-color meta cannot read a var().
  // eslint-disable-next-line no-restricted-syntax
  night: '#080706', // token-lint-disable
  // eslint-disable-next-line no-restricted-syntax
  day: '#FAF8F5', // token-lint-disable
}

function currentTheme(): 'night' | 'day' {
  return document.documentElement.getAttribute('data-theme') === 'day'
    ? 'day'
    : 'night'
}

function apply(theme: 'night' | 'day') {
  const root = document.documentElement
  if (theme === 'day') root.setAttribute('data-theme', 'day')
  else root.removeAttribute('data-theme')
  root.style.colorScheme = theme === 'day' ? 'light' : 'dark'
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLOR[theme])
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'night' | 'day' | null>(null)

  useEffect(() => {
    setTheme(currentTheme())
    // Follow the attribute, whoever changes it (the other toggle instance,
    // ThemeScript on a hard load, devtools).
    const observer = new MutationObserver(() => setTheme(currentTheme()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  function toggle() {
    const next = currentTheme() === 'day' ? 'night' : 'day'
    apply(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // Private mode: the choice simply does not persist.
    }
  }

  // Until mounted the label is unknown; a stable placeholder keeps the rail
  // from shifting.
  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex min-h-tap items-center text-micro uppercase transition-colors duration-fast ease-out ${className}`}
    >
      {theme === null ? ' ' : theme === 'day' ? 'Night' : 'Day'}
    </button>
  )
}

/**
 * Inline, render-blocking by design: runs before the page paints so the
 * scheme never flashes. Night is the default always — the house is dark-first
 * (01_TOKENS §1.10); day is entered only by explicit choice, never inferred
 * from the OS.
 */
export function ThemeScript() {
  const code = `try{if(localStorage.getItem('${KEY}')==='day'){document.documentElement.setAttribute('data-theme','day');document.documentElement.style.colorScheme='light';var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','${THEME_COLOR.day}')}}catch(e){}`
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}
