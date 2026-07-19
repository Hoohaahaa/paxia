'use client'

// Client: the interactive atmosphere on Arrival (01_TOKENS §6.4) — the cursor
// light field. A patina glow drifts toward the pointer under soft-light blend
// and idly wanders when the pointer is elsewhere: the room notices the
// visitor. Permitted by 05_QUALITY ("atmospheric depth · environmental
// light"); the particle variant was evaluated and closed (06_DO_NOT).
//
// Gated to fine pointers without reduced motion; degrades to the still
// photograph. Colour comes from the --glow-cursor token; movement is
// transform-only, lerped, and stops when the section leaves the viewport.
// `?atmosphere=off` keeps the photograph-only baseline available.
import { useEffect, useRef, useState } from 'react'

export function Atmosphere() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const gated =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const param = new URLSearchParams(window.location.search).get('atmosphere')
    setOn(gated && param !== 'off')
  }, [])

  return on ? <LightField /> : null
}

function LightField() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const section = el.closest('section')
    let raf = 0
    let x = window.innerWidth * 0.65
    let y = window.innerHeight * 0.35
    let tx = x
    let ty = y
    let pointerIn = false
    let running = true

    const onMove = (e: PointerEvent) => {
      pointerIn = true
      tx = e.clientX
      ty = e.clientY
    }
    const onLeave = () => {
      pointerIn = false
    }

    const tick = (t: number) => {
      if (!running) return
      if (!pointerIn) {
        // Idle wander — ambient pace, below conscious detection.
        tx = window.innerWidth * (0.65 + 0.08 * Math.sin(t / 9000))
        ty = window.innerHeight * (0.35 + 0.06 * Math.cos(t / 11000))
      }
      x += (tx - x) * 0.045
      y += (ty - y) * 0.045
      el.style.transform = `translate3d(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([entry]) => {
      running = Boolean(entry?.isIntersecting)
      cancelAnimationFrame(raf)
      if (running) raf = requestAnimationFrame(tick)
    })
    if (section) io.observe(section)
    section?.addEventListener('pointermove', onMove)
    section?.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      section?.removeEventListener('pointermove', onMove)
      section?.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={ref}
        className="absolute h-[70vmax] w-[70vmax]"
        style={{ background: 'var(--glow-cursor)', mixBlendMode: 'soft-light' }}
      />
    </div>
  )
}
