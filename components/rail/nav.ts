/** The IA tree from docs/02_LAYOUT_IA.md §1. The rail never invents a route. */
export type NavItem = {
  label: string
  href: string
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: 'Collections', href: '/collections' },
  { label: 'Bespoke', href: '/bespoke' },
  { label: 'Store', href: '/store' },
  { label: 'Agency', href: '/agency' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
]

export const UTILITY_NAV: readonly NavItem[] = [
  { label: 'Search', href: '/search' },
  { label: 'Cart (0)', href: '/cart' },
]
