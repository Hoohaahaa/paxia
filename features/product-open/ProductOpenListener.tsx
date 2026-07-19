'use client'

// Client: the product-open transition (docs/03_MOTION.md → Page Transition).
// "The selected image is the origin. It expands into the hero position over
// --t-hero --e-heavy while surrounding frames fall away. The visitor should
// feel they entered the object."
//
// Implementation: a delegated click listener + a FLIP overlay driven by the
// Web Animations API. WAAPI consumes the duration/easing tokens verbatim from
// the cascade, so the motion contract holds at runtime with no dependency.
// transform + opacity only; reduced motion and modified clicks fall through
// to a normal navigation.
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const token = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

const ms = (value: string) => {
  const n = parseFloat(value)
  return value.endsWith('ms') ? n : n * 1000
}

/** Wait until the product hero exists and its rect is stable (reveal settled). */
function waitForHero(timeoutMs: number): Promise<DOMRect | null> {
  return new Promise((resolve) => {
    const start = performance.now()
    let last: DOMRect | null = null
    const tick = () => {
      const el = document.querySelector('[data-product-hero]')
      if (performance.now() - start > timeoutMs) return resolve(last)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (
          last &&
          Math.abs(rect.top - last.top) < 0.5 &&
          Math.abs(rect.left - last.left) < 0.5 &&
          rect.width > 0
        )
          return resolve(rect)
        last = rect
      }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

export function ProductOpenListener() {
  const router = useRouter()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element).closest<HTMLAnchorElement>(
        'a[data-product-open]',
      )
      if (!link) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const img = link.querySelector('img')
      if (!img) return
      e.preventDefault()

      const origin = img.getBoundingClientRect()
      const href = link.getAttribute('href') ?? '/'

      // Overlay: a void backdrop (the surrounding frames "fall away" beneath
      // it) and a clone of the chosen image, both above content, below rail.
      const overlay = document.createElement('div')
      overlay.setAttribute('aria-hidden', 'true')
      overlay.style.cssText = `position:fixed;inset:0;z-index:var(--z-overlay);pointer-events:none;`
      const backdrop = document.createElement('div')
      backdrop.style.cssText = `position:absolute;inset:0;background:var(--surface-void);opacity:0;`
      const clone = document.createElement('img')
      clone.src = img.currentSrc || img.src
      clone.alt = ''
      clone.style.cssText = `position:absolute;top:${origin.top}px;left:${origin.left}px;width:${origin.width}px;height:${origin.height}px;object-fit:cover;transform-origin:top left;`
      overlay.append(backdrop, clone)
      document.body.append(overlay)

      const tHero = ms(token('--t-hero'))
      const tMedium = ms(token('--t-medium'))
      const tFast = ms(token('--t-fast'))
      const eHeavy = token('--e-heavy')
      const eInout = token('--e-inout')
      const eOut = token('--e-out')

      backdrop.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: tMedium,
        easing: eInout,
        fill: 'forwards',
      })

      router.push(href)

      waitForHero(1500).then((target) => {
        const finish = () => {
          const exit = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: tFast,
            easing: eOut,
            fill: 'forwards',
          })
          exit.onfinish = () => overlay.remove()
        }
        if (!target) return finish()
        const dx = target.left - origin.left
        const dy = target.top - origin.top
        const sx = target.width / origin.width
        const sy = target.height / origin.height
        const move = clone.animate(
          [
            { transform: 'translate(0px, 0px) scale(1, 1)' },
            { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
          ],
          { duration: tHero, easing: eHeavy, fill: 'forwards' },
        )
        move.onfinish = finish
      })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [router])

  return null
}
