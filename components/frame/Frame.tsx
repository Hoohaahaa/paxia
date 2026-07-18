import Image from 'next/image'
import Link from 'next/link'

/**
 * Frame — the central primitive (docs/04_COMPONENTS.md).
 *
 * A Frame is NOT a card: radius 0, no shadow, no border, image bleeds to every
 * edge, label sits inside the image, separation comes from the seam gap only.
 *
 * The Frame fills the height its parent gives it — the caller sizes it (a strip
 * cell with `h-strip`, or an aspect-ratio box). One component, six variants;
 * the variant carries semantics and default sizes, never a different shape.
 */
export type FrameVariant =
  | 'collection'
  | 'product'
  | 'campaign'
  | 'store'
  | 'agency'
  | 'journal'

export interface FrameProps {
  variant?: FrameVariant
  href: string
  image: string
  /** Describe the image, not the surface. Decorative-only frames pass ''. */
  alt: string
  /** Eyebrow: the surface name, top-left inside the image. */
  label: string
  /** Display title, bottom-left. */
  title: string
  /** Metadata line under the title (mono, nano). */
  meta?: string
  /** Call to action beneath the rule. Follows the voice list in 05_QUALITY. */
  cta?: string
  /** next/image sizes hint — required; there is no sensible default. */
  sizes: string
  priority?: boolean
  className?: string
  /**
   * 'product' marks this Frame as an origin for the product-open transition
   * (docs/03_MOTION.md): the image expands into the product hero on click.
   */
  transition?: 'product'
}

export function Frame({
  href,
  image,
  alt,
  label,
  title,
  meta,
  cta,
  sizes,
  priority = false,
  className = '',
  transition,
}: FrameProps) {
  return (
    <Link
      href={href}
      data-product-open={transition === 'product' ? '' : undefined}
      className={`group relative block h-full overflow-hidden bg-surface-frame ${className}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />

      {/* Scrim — mandatory under any text over imagery (05_QUALITY §1). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-scrim-bottom"
      />

      {/* Lift — inset light on hover/focus. The image itself never moves. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 shadow-frame transition-opacity duration-fast ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      <span className="absolute left-5 top-5 inline-flex items-center gap-1 text-micro uppercase text-text-image-secondary">
        {label}
        <span aria-hidden="true">↗</span>
      </span>

      <div className="absolute inset-x-0 bottom-0 flex flex-col p-5">
        <h3 className="font-display text-d-1 text-text-image">{title}</h3>
        {meta ? (
          <p className="mt-2 font-mono text-nano uppercase tabular-nums text-text-image-muted">
            {meta}
          </p>
        ) : null}
        <span className="mt-4 h-px w-full bg-line-hairline transition-colors duration-fast ease-out group-hover:bg-accent group-focus-visible:bg-accent" />
        {cta ? (
          <span className="mt-3 text-micro uppercase text-text-image-secondary">
            {cta}
          </span>
        ) : null}
      </div>
    </Link>
  )
}
