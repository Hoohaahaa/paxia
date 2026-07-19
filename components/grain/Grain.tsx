/**
 * Grain — a single tiling turbulence fixed to the viewport, above the
 * atmosphere and below content (docs/01_TOKENS.md §6.4). At 2.8% it is
 * invisible as texture and present as stock: it kills the digital flatness
 * of large dark fields and stops banding in gradients. It never animates.
 */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-atmosphere"
      style={{
        opacity: 'var(--grain-opacity)',
        backgroundImage: 'url(/grain.svg)',
        backgroundSize: 'var(--grain-size)',
        mixBlendMode: 'overlay',
      }}
    />
  )
}
