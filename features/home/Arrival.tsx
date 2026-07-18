import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal/Reveal'
import { TextReveal } from '@/components/reveal/TextReveal'
import { SectionIndex } from './SectionIndex'
import { Atmosphere } from './Atmosphere'

/**
 * Arrival — the 100vh opening (docs/02 §3.1). Full-bleed campaign image with
 * --scrim-rail on its left so the rail dissolves into it. The image drifts
 * scale(1→1.03) over --t-ambient — the sole sanctioned scale, below conscious
 * detection, so a static frame never reads as a screenshot.
 */
export function Arrival() {
  return (
    <section
      aria-label="Arrival"
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <div className="ambient-drift absolute inset-0">
        <Image
          src="/img/hero.svg"
          alt="A PAXIA campaign photograph, low warm light on tailored wool."
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-scrim-rail"
      />

      {/* Interactive atmosphere — above image and scrim, below content. */}
      <Atmosphere />

      <div className="relative z-content flex h-full flex-col justify-end px-[var(--margin-x)] pb-9">
        <div className="max-w-content">
          <Reveal distance="near">
            <p className="text-micro uppercase text-text-image-muted">
              High Fashion / Meaningful Design
            </p>
          </Reveal>
          {/* The masthead sets itself line by line — composed breaks, never
              re-wrapped by measurement. */}
          <TextReveal
            as="h1"
            className="mt-5 font-display text-d-4 text-text-image"
          >
            {['We don’t follow.', 'We define.']}
          </TextReveal>
          <Reveal distance="near" index={2}>
            <p className="mt-6 max-w-lead text-lead text-text-image-secondary">
              Timeless designs for those who choose presence over trends.
            </p>
            <p className="mt-7">
              <Link
                href="/collections"
                className="inline-flex min-h-tap items-center gap-2 text-micro uppercase text-text-image"
              >
                Discover the world of PAXIA
                <span aria-hidden="true">↗</span>
              </Link>
            </p>
          </Reveal>
        </div>
      </div>

      <SectionIndex count={4} active={0} />
    </section>
  )
}
