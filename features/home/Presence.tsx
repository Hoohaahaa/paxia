'use client'

// Client: hovering/focusing a city crossfades its store image behind the band.
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CITIES = [
  { name: 'Yerevan', img: '/img/city-yerevan.svg' },
  { name: 'Istanbul', img: '/img/city-istanbul.svg' },
  { name: 'Milan', img: '/img/city-milan.svg' },
  { name: 'Berlin', img: '/img/city-berlin.svg' },
  { name: 'Madrid', img: '/img/city-madrid.svg' },
] as const

/**
 * Presence — fixes the reference's worst failure (docs/02 §3.6). City names as
 * a band on --surface-void; hovering or focusing a name reveals its store image
 * behind, at --scrim-full, crossfading over --t-medium --e-inout. The text stays
 * legible always — the image serves the text, never the reverse. Every hover has
 * a focus equivalent, so the reveal is never hover-only.
 */
export function Presence() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      aria-label="Presence"
      className="relative flex min-h-[60svh] items-center overflow-hidden py-sect-normal"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {CITIES.map((city, i) => (
          <Image
            key={city.name}
            src={city.img}
            alt=""
            fill
            sizes="100vw"
            className={`object-cover transition-opacity duration-medium ease-inout ${
              active === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div
          className={`absolute inset-0 bg-scrim-full transition-opacity duration-medium ease-inout ${
            active === null ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      <div className="relative w-full px-[var(--margin-x)]">
        <p className="text-micro uppercase text-text-muted">Presence</p>
        <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          {CITIES.map((city, i) => (
            <li key={city.name}>
              <Link
                href="/store"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="inline-flex min-h-tap items-center text-micro uppercase text-text-secondary transition-colors duration-fast ease-out hover:text-text-primary focus-visible:text-text-primary"
              >
                {city.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
