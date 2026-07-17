import Image from 'next/image'
import { Reveal } from '@/components/reveal/Reveal'

/**
 * Craft — asymmetric two columns (docs/02 §3.5): 7/12 editorial image, one
 * column gap, 4/12 text. Macro texture — weave, stitch, selvedge — never a
 * garment. Detail implies mastery; a full garment implies a catalog. The image
 * travels far, the text settles near: two motions, not one chained fade.
 */
export function Craft() {
  return (
    <section aria-label="Craft" className="px-[var(--margin-x)] py-sect-wide">
      <div className="grid grid-cols-4 gap-5 md:grid-cols-12">
        <Reveal distance="far" className="col-span-4 md:col-span-7">
          <div className="relative aspect-editorial w-full overflow-hidden bg-surface-frame">
            <Image
              src="/img/craft.svg"
              alt="Macro detail of hand-finished wool: weave, stitch, and selvedge."
              fill
              sizes="(min-width: 900px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div className="col-span-4 md:col-span-4 md:col-start-9 md:self-center">
          <Reveal distance="near">
            <p className="text-micro uppercase text-text-muted">The Hand</p>
            <h2 className="mt-5 font-display text-d-2 text-text-primary">
              Mastery is a detail you were never meant to see.
            </h2>
            <p className="mt-6 max-w-body text-base text-text-secondary">
              Every seam is closed by hand, every selvedge kept. We photograph
              the cloth, not the garment — the proof of a house lives in the
              half-inch no one thinks to look at.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
