/**
 * Journal — articles (docs/02 §1: Journal → Article). Pure data + getters,
 * React-free. Slugs match the homepage JournalPreview links. Bodies are
 * paragraph arrays so the reading page controls measure and rhythm; a CMS
 * swaps this module without touching routes.
 */

export type Article = {
  slug: string
  title: string
  date: string
  standfirst: string
  image: string
  alt: string
  body: string[]
}

const ARTICLES: Article[] = [
  {
    slug: 'the-atelier-at-dawn',
    title: 'The Atelier at Dawn',
    date: 'March 2026',
    standfirst:
      'The room does its best work before anyone speaks. An hour in the atelier before opening.',
    image: '/img/journal-1.svg',
    alt: 'The atelier before opening, chairs stacked, light low.',
    body: [
      'The lights come on in threes, oldest circuit first. Whoever arrives early — usually the head cutter, occasionally no one — walks the length of the table and puts a hand flat on the wool that was left to rest overnight. Cloth relaxes when nobody is watching. So do rooms.',
      'By eight the chalk lines from yesterday have been brushed out and redrawn a millimetre truer. Nobody instructed this. It is what the first hour is for: undoing the small settlements of the day before, so the day begins level.',
      'Visitors ask why the atelier does not open earlier, given how much happens before nine. The answer is that this hour is not before the work. It is the work — the part of it that cannot be done in company.',
    ],
  },
  {
    slug: 'on-keeping-the-selvedge',
    title: 'On Keeping the Selvedge',
    date: 'February 2026',
    standfirst:
      'The woven edge carries the maker’s name and the cloth’s history. We leave it where it can be found.',
    image: '/img/journal-2.svg',
    alt: 'A bolt of wool half-unrolled on a cutting table.',
    body: [
      'The selvedge is the edge the loom finishes for itself — denser, straighter, signed. Most houses cut it away first, the way a printer trims a sheet. We plan the cut so it survives inside the garment: along a seam allowance, inside a hem, under a collar.',
      'It costs cloth to do this. A layout that keeps the selvedge wastes three, sometimes four centimetres across the width, and a coat is many widths. The accountants have learned not to ask.',
      'Years from now, an alteration hand in another city will open the hem and find the woven name of a mill in Biella and a thread of patina we run through our own yardage. They will know what they are holding and take the greater care. That is the entire argument.',
    ],
  },
  {
    slug: 'five-cities-one-house',
    title: 'Five Cities, One House',
    date: 'January 2026',
    standfirst:
      'Why every PAXIA store is built as a room of the same building, and what that demands of the architecture.',
    image: '/img/journal-3.svg',
    alt: 'A flagship doorway at dusk, brass handle worn bright.',
    body: [
      'A brand with five stores usually has five stores. We wanted one house that happens to have doors in five cities — which is a different brief. It rules out theming. Yerevan cannot be the “stone one” and Berlin the “industrial one”; they must be the same room, translated.',
      'The translation runs through material, not layout. Local stone, always. The same brass, aged by the same hand. Light held at the same two temperatures, morning and evening, whatever the latitude does.',
      'The test is a regular client walking into a city they have never visited. If they hesitate at the threshold, we failed. If they hand their coat to a stranger with the certainty of habit, the house is one building.',
    ],
  },
]

export function getArticles(): Article[] {
  return ARTICLES
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}
