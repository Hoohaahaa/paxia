'use client'

// Client: size selection + add-to-bag state.
import { useState } from 'react'
import { Button } from '@/components/button/Button'
import { formatPrice } from '@/lib/catalog'

export interface PurchaseModuleProps {
  name: string
  priceEUR: number
  sizes: string[]
}

/**
 * PurchaseModule — arrives last in the product narrative (docs/02 §5). Price in
 * mono tabular, a size selector, one action. The cart is not wired in Slice 03,
 * so "Add to Bag" confirms via an aria-live line rather than pretending to
 * persist. Voice: "Add to Bag", never "Buy Now" (docs/05_QUALITY §3).
 */
export function PurchaseModule({ name, priceEUR, sizes }: PurchaseModuleProps) {
  const onlySize = sizes.length === 1 ? sizes[0] ?? null : null
  const [size, setSize] = useState<string | null>(onlySize)
  const [added, setAdded] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <p className="font-mono text-lead tabular-nums text-text-primary">
        {formatPrice(priceEUR)}
      </p>

      <fieldset>
        <legend className="font-mono text-nano uppercase tabular-nums text-text-muted">
          Size
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((s) => {
            const selected = s === size
            return (
              <button
                key={s}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setSize(s)
                  setAdded(false)
                }}
                className={`inline-flex min-h-tap min-w-tap items-center justify-center rounded-soft border px-4 text-micro uppercase outline-none transition-colors duration-fast ease-out focus-visible:shadow-focus ${
                  selected
                    ? 'border-accent text-text-primary'
                    : 'border-line-hairline text-text-secondary hover:border-line-strong'
                }`}
              >
                {s}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3">
        <Button
          variant="primary"
          disabled={!size}
          onClick={() => setAdded(true)}
          className="w-full"
        >
          {added ? 'Added to Bag' : 'Add to Bag'}
        </Button>
        <p aria-live="polite" className="min-h-4 text-small text-text-muted">
          {!size
            ? 'Select a size to continue.'
            : added
              ? `${name}, size ${size}, is in your bag.`
              : ''}
        </p>
      </div>
    </div>
  )
}
