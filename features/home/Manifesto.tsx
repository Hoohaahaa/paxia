import { TextReveal } from '@/components/reveal/TextReveal'

/**
 * Manifesto — type only, no image (docs/02 §3.3). One --d-2 statement offset to
 * column 3, wrapped in --sect-hero of nothing. The most expensive thing on the
 * page and the cheapest to build: it tells the eye the house is confident enough
 * to spend 380px of scroll on a single sentence. Reveals as one settle.
 */
export function Manifesto() {
  return (
    <section aria-label="Manifesto" className="px-[var(--margin-x)] py-sect-hero">
      <div className="grid grid-cols-4 md:grid-cols-12">
        <div className="col-span-4 md:col-span-8 md:col-start-3">
          <TextReveal className="max-w-lead font-display text-d-2 text-text-primary">
            Presence is the last luxury. What endures was never made to be
            noticed — only to be trusted.
          </TextReveal>
        </div>
      </div>
    </section>
  )
}
