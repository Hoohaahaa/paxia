/**
 * SectionIndex — a reading position on the right edge (docs/02 §3.1), not a
 * slideshow control. Numerals in mono nano; the active step in patina. It is
 * decorative to assistive tech: it mirrors scroll, it does not add meaning.
 * Wiring the active step to scroll position comes with Slice 02's sections.
 */
export function SectionIndex({
  count = 4,
  active = 0,
}: {
  count?: number
  active?: number
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute right-6 top-1/2 z-content hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`font-mono text-nano tabular-nums ${
            i === active ? 'text-patina-500' : 'text-text-metadata'
          }`}
        >
          {String(i + 1).padStart(2, '0')}
        </span>
      ))}
    </div>
  )
}
