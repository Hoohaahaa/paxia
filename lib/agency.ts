/**
 * Agency — talent data (docs/02 §1: Agency → Talent · Become a Model · Book a
 * Model). Pure data + getters, React-free. Measurements in mono-friendly
 * strings; the register is organized, not glamorous (docs/02 §4).
 */

export type Talent = {
  slug: string
  name: string
  base: string
  height: string
  bust: string
  waist: string
  hips: string
  shoe: string
  hair: string
  eyes: string
  image: string
}

const TALENT: Talent[] = [
  {
    slug: 'arev',
    name: 'Arev',
    base: 'Yerevan',
    height: '179 cm',
    bust: '82 cm',
    waist: '61 cm',
    hips: '89 cm',
    shoe: 'EU 40',
    hair: 'Black',
    eyes: 'Brown',
    image: '/img/talent-arev.svg',
  },
  {
    slug: 'lucine',
    name: 'Lucine',
    base: 'Milan',
    height: '177 cm',
    bust: '80 cm',
    waist: '60 cm',
    hips: '88 cm',
    shoe: 'EU 39',
    hair: 'Dark brown',
    eyes: 'Green',
    image: '/img/talent-lucine.svg',
  },
  {
    slug: 'nare',
    name: 'Naré',
    base: 'Berlin',
    height: '181 cm',
    bust: '83 cm',
    waist: '62 cm',
    hips: '90 cm',
    shoe: 'EU 41',
    hair: 'Black',
    eyes: 'Dark brown',
    image: '/img/talent-nare.svg',
  },
  {
    slug: 'tigran',
    name: 'Tigran',
    base: 'Yerevan',
    height: '188 cm',
    bust: '96 cm',
    waist: '76 cm',
    hips: '94 cm',
    shoe: 'EU 44',
    hair: 'Black',
    eyes: 'Brown',
    image: '/img/talent-tigran.svg',
  },
  {
    slug: 'sona',
    name: 'Sona',
    base: 'Istanbul',
    height: '176 cm',
    bust: '81 cm',
    waist: '61 cm',
    hips: '89 cm',
    shoe: 'EU 39',
    hair: 'Chestnut',
    eyes: 'Hazel',
    image: '/img/talent-sona.svg',
  },
  {
    slug: 'vahe',
    name: 'Vahé',
    base: 'Madrid',
    height: '190 cm',
    bust: '98 cm',
    waist: '78 cm',
    hips: '96 cm',
    shoe: 'EU 45',
    hair: 'Dark brown',
    eyes: 'Grey',
    image: '/img/talent-vahe.svg',
  },
]

export function getTalent(): Talent[] {
  return TALENT
}

export function getTalentBySlug(slug: string): Talent | undefined {
  return TALENT.find((t) => t.slug === slug)
}
