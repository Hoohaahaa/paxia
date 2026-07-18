/**
 * Search — a static index over everything the site knows (docs/02 §1: Search).
 * Pure functions, React-free. The index is built from the same /lib data the
 * pages render, so it can never disagree with them; a real search service can
 * replace `searchEntries` without touching the UI.
 */
import { getCollections, getProducts } from './catalog'
import { getStores } from './stores'
import { getTalent } from './agency'
import { getArticles } from './journal'

export type SearchEntry = {
  type: 'Collection' | 'Piece' | 'Store' | 'Talent' | 'Journal' | 'Page'
  title: string
  href: string
  /** Lowercased haystack, never rendered. */
  text: string
  /** One rendered context line. */
  line: string
}

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = []

  for (const c of getCollections())
    entries.push({
      type: 'Collection',
      title: c.title,
      href: `/collections/${c.slug}`,
      text: `${c.title} ${c.season} ${c.intro}`.toLowerCase(),
      line: c.season,
    })

  for (const p of getProducts())
    entries.push({
      type: 'Piece',
      title: p.name,
      href: `/products/${p.slug}`,
      text: `${p.name} ${p.eyebrow} ${p.line} ${p.material} ${p.composition}`.toLowerCase(),
      line: p.eyebrow,
    })

  for (const s of getStores())
    entries.push({
      type: 'Store',
      title: s.city,
      href: `/store/${s.slug}`,
      text: `${s.city} ${s.address.join(' ')} ${s.line}`.toLowerCase(),
      line: s.address[0] ?? '',
    })

  for (const t of getTalent())
    entries.push({
      type: 'Talent',
      title: t.name,
      href: `/agency/${t.slug}`,
      text: `${t.name} ${t.base}`.toLowerCase(),
      line: t.base,
    })

  for (const a of getArticles())
    entries.push({
      type: 'Journal',
      title: a.title,
      href: `/journal/${a.slug}`,
      text: `${a.title} ${a.standfirst} ${a.body.join(' ')}`.toLowerCase(),
      line: a.date,
    })

  entries.push(
    { type: 'Page', title: 'Bespoke', href: '/bespoke', text: 'bespoke atelier appointment fitting made to measure', line: 'The Atelier' },
    { type: 'Page', title: 'About', href: '/about', text: 'about the house paxia history', line: 'The House' },
    { type: 'Page', title: 'Contact', href: '/contact', text: 'contact write email press client care', line: 'Write to the house' },
  )

  return entries
}

/** Built once per module load — the data is static. */
const INDEX = buildIndex()

export function searchEntries(query: string, limit = 12): SearchEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []
  return INDEX.filter((entry) =>
    terms.every((term) => entry.text.includes(term)),
  ).slice(0, limit)
}
