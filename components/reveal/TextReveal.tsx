'use client'

// Client: the masked line-rise for display headlines (docs/03_MOTION.md →
// Reveal). Each rendered line sits in an overflow-hidden mask and travels its
// own height over --t-slow --e-heavy, staggered --reveal-stagger between
// lines — the editorial "type sets itself" entrance. Lines are the staggered
// children (a headline has 3–4 at most), never words. Triggered once, at 20%
// visible. Under reduced motion the travel tokens collapse and only opacity
// moves. Until hydration the text renders plainly — content never depends on
// JavaScript.
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'

export interface TextRevealProps {
  /** A string (lines are measured from layout) or explicit lines (composed
   *  breaks, e.g. the Arrival masthead — never re-wrapped by measurement). */
  children: string | string[]
  /** Semantic element — the animation must never change the document outline. */
  as?: ElementType
  className?: string
}

export function TextReveal({
  children,
  as: Tag = 'p',
  className = '',
}: TextRevealProps) {
  const explicit = Array.isArray(children) ? children : null
  const ref = useRef<HTMLElement>(null)
  const [lines, setLines] = useState<string[] | null>(explicit)
  const [shown, setShown] = useState(false)
  const text = Array.isArray(children) ? children.join(' ') : children

  // Measure real layout lines from word positions after first paint.
  useEffect(() => {
    if (explicit) return
    const el = ref.current
    if (!el) return
    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'))
    if (words.length === 0) return
    const byLine: string[][] = []
    let lastTop: number | null = null
    for (const word of words) {
      const top = word.offsetTop
      if (lastTop === null || Math.abs(top - lastTop) > 1) {
        byLine.push([])
        lastTop = top
      }
      byLine[byLine.length - 1]?.push(word.textContent ?? '')
    }
    setLines(byLine.map((w) => w.join(' ')))
    // `explicit` is content-derived; `text` is the stable key for both shapes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  useEffect(() => {
    const el = ref.current
    if (!el || lines === null) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [lines])

  let content: ReactNode
  if (lines === null) {
    // Pre-measure pass: every word addressable, visually identical to plain
    // text. Spaces live outside the measured spans so they never collapse.
    content = text.split(/\s+/).map((word, i, all) => (
      <span key={i}>
        <span data-word className="inline-block">
          {word}
        </span>
        {i < all.length - 1 ? ' ' : null}
      </span>
    ))
  } else {
    content = lines.map((line, i) => (
      <span key={i} className="block overflow-hidden">
        <span
          className="block will-change-transform"
          style={
            {
              opacity: shown ? 1 : 0,
              transform: shown ? 'translateY(0)' : 'translateY(100%)',
              transition:
                'transform var(--t-slow) var(--e-heavy), opacity var(--t-slow) var(--e-heavy)',
              transitionDelay: `calc(var(--reveal-stagger) * ${i})`,
            } as CSSProperties
          }
        >
          {line}
        </span>
      </span>
    ))
  }

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{content}</span>
    </Tag>
  )
}
