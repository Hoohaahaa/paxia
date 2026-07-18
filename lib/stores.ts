/**
 * Stores — flagship data for Store and Store Detail (docs/02 §1). Pure data +
 * getters, React-free. Hours in mono-friendly strings; coordinates for the
 * future map, unused today.
 */

export type Store = {
  slug: string
  city: string
  address: string[]
  hours: { days: string; time: string }[]
  phone: string
  /** One architectural line — the room, not the inventory. */
  line: string
  image: string
  flagship: boolean
}

const STORES: Store[] = [
  {
    slug: 'yerevan',
    city: 'Yerevan',
    address: ['1 Abovyan Street', '0001 Yerevan'],
    hours: [
      { days: 'Mon – Sat', time: '11:00 – 20:00' },
      { days: 'Sun', time: 'By appointment' },
    ],
    phone: '+374 10 000 000',
    line: 'The first room. Tufa stone, brass, and the atelier one floor above.',
    image: '/img/city-yerevan.svg',
    flagship: true,
  },
  {
    slug: 'istanbul',
    city: 'Istanbul',
    address: ['Abdi İpekçi Caddesi 23', '34367 Nişantaşı'],
    hours: [{ days: 'Mon – Sat', time: '10:00 – 20:00' }],
    phone: '+90 212 000 00 00',
    line: 'A gallery off the avenue, kept deliberately quiet.',
    image: '/img/city-istanbul.svg',
    flagship: false,
  },
  {
    slug: 'milan',
    city: 'Milan',
    address: ['Via della Spiga 8', '20121 Milano'],
    hours: [{ days: 'Mon – Sat', time: '10:00 – 19:30' }],
    phone: '+39 02 0000 0000',
    line: 'Stone floor, one rail, north light.',
    image: '/img/city-milan.svg',
    flagship: false,
  },
  {
    slug: 'berlin',
    city: 'Berlin',
    address: ['Kurfürstendamm 195', '10707 Berlin'],
    hours: [{ days: 'Mon – Sat', time: '11:00 – 19:00' }],
    phone: '+49 30 000 000 00',
    line: 'A former print works. The presses left; the proportions stayed.',
    image: '/img/city-berlin.svg',
    flagship: false,
  },
  {
    slug: 'madrid',
    city: 'Madrid',
    address: ['Calle de Serrano 47', '28001 Madrid'],
    hours: [{ days: 'Mon – Sat', time: '10:30 – 20:00' }],
    phone: '+34 91 000 00 00',
    line: 'Late light, high ceilings, linen curtains that move.',
    image: '/img/city-madrid.svg',
    flagship: false,
  },
]

export function getStores(): Store[] {
  return STORES
}

export function getStore(slug: string): Store | undefined {
  return STORES.find((s) => s.slug === slug)
}
