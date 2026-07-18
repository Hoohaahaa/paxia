'use client'

// Client: the scheme switch. The authoritative state is the data-theme
// attribute set before first paint (see ThemeScript); this component reads it
// after mount, flips it, and persists the choice.
import { useEffect, useState } from 'react'

const KEY = 'paxia-theme'
const THEME_COLOR: Record<'night' | 'day', string> = {
  // Mirrors --ink-950 / --ink-000; the theme-color meta cannot read a var().
  // eslint-disable-next-line no-restricted-syntax
  night: '#080706', // token-lint-disable
  // eslint-disable-next-line no-restricted-syntax
  day: '#FAF8F5', // token-lint-disable
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
    setTheme(
      document.documentElement.getAttribute('data-theme') === 'day'
        ? 'day'
        : 'night',
    )
  }, [])

  function toggle() {
    const next = theme === 'day' ? 'night' : 'day'
    setTheme(next)
    apply(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // Private mode: the choice simply does not persist.
    }
  }

  // Until mounted the label is unknown; render a stable placeholder so the
  // rail never shifts.
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
 * scheme never flashes. Kept tiny; reads localStorage, falls back to
 * prefers-color-scheme, falls back to night.
 */
export function ThemeScript() {
  const code = `try{var t=localStorage.getItem('${KEY}');if(!t&&matchMedia('(prefers-color-scheme: light)').matches)t='day';if(t==='day'){document.documentElement.setAttribute('data-theme','day');document.documentElement.style.colorScheme='light'}}catch(e){}`
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}
