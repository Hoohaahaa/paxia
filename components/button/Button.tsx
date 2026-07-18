import type { ButtonHTMLAttributes } from 'react'

/**
 * Button — a crafted object, not an interface control (docs/04_COMPONENTS.md).
 * --u-micro uppercase, padding --s-4/--s-6, --r-soft (the one radius in the
 * system), min 44px. Hover moves light and contrast only — never colour drama,
 * never a gradient, never scale. Press compresses 1px. Focus uses --focus-ring.
 */
type Variant = 'primary' | 'secondary' | 'ghost' | 'text'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-ink-0 text-text-bone hover:bg-ink-50',
  secondary:
    'border border-line-hairline text-text-primary hover:border-line-strong',
  ghost: 'text-text-secondary hover:text-text-primary',
  text: 'text-text-primary underline-offset-4 hover:underline',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`inline-flex min-h-tap items-center justify-center rounded-soft px-6 py-4 text-micro uppercase outline-none transition-[transform,background-color,border-color,color] duration-fast ease-out focus-visible:shadow-focus active:translate-y-px disabled:pointer-events-none disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  )
}
