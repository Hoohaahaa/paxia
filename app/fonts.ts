import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'

/**
 * Free fallbacks for Slice 01 (Open Decisions 1 & 2 in PROJECT_STATE.md).
 * Each font is self-hosted by next/font and exposed as the --font-loaded-*
 * variable that styles/tokens.css weaves into --font-display / --font-ui /
 * --font-mono. When Ogg/Söhne land, the licensed names win ahead of these —
 * nothing else changes.
 *
 * Playfair Display is only ever set at display sizes (≥32px) per
 * docs/01_TOKENS.md §2.4, so no non-display weights are requested.
 */
export const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-loaded-display',
})

export const fontUI = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-loaded-ui',
})

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-loaded-mono',
})
