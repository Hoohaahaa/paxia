import type { Metadata, Viewport } from 'next'
import '@/styles/tokens.css'
import '@/styles/globals.css'
import { fontDisplay, fontUI, fontMono } from './fonts'
import { Grain } from '@/components/grain/Grain'
import { Rail } from '@/components/rail/Rail'
import { RailMobile } from '@/components/rail/RailMobile'
import { Footer } from '@/components/footer/Footer'
import { ThemeScript } from '@/components/theme/ThemeToggle'
import { ProductOpenListener } from '@/features/product-open/ProductOpenListener'

export const metadata: Metadata = {
  title: {
    default: 'PAXIA',
    template: '%s — PAXIA',
  },
  description:
    'PAXIA — a fashion house. Ready-to-wear, bespoke atelier, flagship stores, agency, and journal, under one identity.',
}

export const viewport: Viewport = {
  // The theme-color meta needs a literal, not a var(). Mirrors --ink-950
  // (surface-void); keep the two in lockstep.
  themeColor: '#080706', // token-lint-disable
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontUI.variable} ${fontMono.variable}`}
    >
      <body className="bg-surface-void text-text-primary font-ui">
        <ThemeScript />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-toast focus:bg-surface-inverse focus:px-4 focus:py-2 focus:text-micro focus:uppercase focus:text-text-bone"
        >
          Skip to content
        </a>

        <Grain />
        <Rail />
        <RailMobile />
        <ProductOpenListener />

        <div className="pt-rail-h md:pl-rail md:pt-0">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
