'use client'

// Client: the reveal is driven by an IntersectionObserver.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type Distance = 'near' | 'mid' | 'far'

const DISTANCE: Record<Distance, string> = {
  near: 'var(--reveal-near)',
  mid: 'var(--reveal-mid)',
  far: 'var(--reveal-far)',
}

export interface RevealProps {
  children: ReactNode
  /** Heavier things travel further: text=near, frames=mid, images=far. */
  distance?: Distance
  /** Sibling position, for the 60ms stagger. Max 5 before it reads as loading. */
  index?: number
  className?: string
}

/**
 * Reveal — the only entry animation (docs/03_MOTION.md): opacity 0→1 plus
 * translateY(reveal-*)→0 over --t-medium --e-inout, once, at 20% visible.
 * Under reduced motion the travel tokens collapse to 0 and only opacity moves.
 */
export function Reveal({
  children,
  distance = 'mid',
  index = 0,
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const style = {
    '--reveal-distance': DISTANCE[distance],
    '--reveal-delay': `calc(var(--reveal-stagger) * ${index})`,
  } as CSSProperties

  return (
    <div ref={ref} data-shown={shown} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  )
}
