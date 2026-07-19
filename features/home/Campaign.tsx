import { imageSrc } from '@/lib/images'
import Image from 'next/image'
import { TextReveal } from '@/components/reveal/TextReveal'

/**
 * Campaign — the single full-bleed reveal (docs/02 §3.4). One image, one --d-3
 * line bottom-left over --scrim-bottom, no CTA. Rare by contract: rarity is what
 * makes it land. Below the fold, so the image is lazy — the hero holds priority.
 */
export function Campaign() {
  return (
    <section
      aria-label="Campaign"
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <Image
        src={imageSrc('campaign')}
        alt="A PAXIA campaign photograph in low winter light."
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-scrim-bottom"
      />
      <div className="absolute inset-x-0 bottom-0 px-[var(--margin-x)] pb-9">
        <TextReveal
          as="h2"
          className="max-w-body font-display text-d-3 text-text-image"
        >
          Winter Study — the city keeps its secrets.
        </TextReveal>
      </div>
    </section>
  )
}
