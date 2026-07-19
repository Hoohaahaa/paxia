import { imageSrc } from '@/lib/images'
import { Frame, type FrameVariant } from '@/components/frame/Frame'
import { Reveal } from '@/components/reveal/Reveal'

/**
 * EcosystemStrip — the investor answer (docs/02 §3.2, §4.4). Five frames a
 * --seam apart, edge to edge. Order is fixed and is the emotional sequence:
 * product · service · place · people · culture. Below --bp-lg it scroll-snaps
 * with a partial frame at the edge — the partial is what invites the swipe.
 */
type StripFrame = {
  variant: FrameVariant
  href: string
  image: string
  alt: string
  label: string
  title: string
  meta: string
  cta: string
}

const FRAMES: readonly StripFrame[] = [
  {
    variant: 'collection',
    href: '/collections',
    image: imageSrc('collections'),
    alt: 'A ready-to-wear look in warm low light.',
    label: 'Collections',
    title: 'Ready to Wear',
    meta: 'Volume One',
    cta: 'Explore Collection',
  },
  {
    variant: 'product',
    href: '/bespoke',
    image: imageSrc('bespoke'),
    alt: 'Hands at the atelier table, mid-fitting.',
    label: 'Bespoke',
    title: 'The Atelier',
    meta: 'By Appointment',
    cta: 'Request Bespoke',
  },
  {
    variant: 'store',
    href: '/store',
    image: imageSrc('store'),
    alt: 'A flagship interior, stone and shadow.',
    label: 'Store',
    title: 'Five Cities',
    meta: 'Worldwide',
    cta: 'Visit Store',
  },
  {
    variant: 'agency',
    href: '/agency',
    image: imageSrc('agency'),
    alt: 'A studio portrait under even light.',
    label: 'Agency',
    title: 'The Faces',
    meta: 'Talent',
    cta: 'Discover Agency',
  },
  {
    variant: 'journal',
    href: '/journal',
    image: imageSrc('journal'),
    alt: 'An open editorial spread on a bone ground.',
    label: 'Journal',
    title: 'The Journal',
    meta: 'Editorial',
    cta: 'Enter Journal',
  },
]

const FRAME_SIZES = '(min-width: 1200px) 18vw, (min-width: 640px) 45vw, 71vw'

export function EcosystemStrip() {
  return (
    <section aria-label="The PAXIA ecosystem" className="w-full">
      <ul className="flex snap-x snap-mandatory gap-seam overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible">
        {FRAMES.map((frame, i) => (
          <li
            key={frame.href}
            className="h-strip w-[71%] shrink-0 snap-start sm:w-[45%] lg:w-auto"
          >
            <Reveal distance="mid" index={i} className="h-full">
              <Frame
                variant={frame.variant}
                href={frame.href}
                image={frame.image}
                alt={frame.alt}
                label={frame.label}
                title={frame.title}
                meta={frame.meta}
                cta={frame.cta}
                sizes={FRAME_SIZES}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
