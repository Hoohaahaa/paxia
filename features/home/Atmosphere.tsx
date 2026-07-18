'use client'

// Client: the interactive atmosphere on Arrival (01_TOKENS §6.4).
//
// Two variants, both gated to fine pointers without reduced motion, both
// degrading to the still photograph:
//
//   light      (default)  the cursor light field — a patina glow that drifts
//                         toward the pointer. Permitted by 05_QUALITY
//                         ("atmospheric depth · environmental light").
//   particles  (?atmosphere=particles)  PROVISIONAL, owner evaluation only —
//                         see the amendment in 06_DO_NOT §WebGL/Atmosphere.
//                         A dust-mote canvas displaced by the cursor.
//   off        (?atmosphere=off)  photograph only.
//
// Colours come from the cascade at runtime (--glow-cursor token, --patina-400,
// --ink-000) — no literals in code. Movement is transform-only and lerped;
// everything stops when the tab hides or the section leaves the viewport.
import { useEffect, useRef, useState } from 'react'

type Mode = 'light' | 'particles' | 'off'

function resolveMode(): Mode {
  const param = new URLSearchParams(window.location.search).get('atmosphere')
  if (param === 'particles' || param === 'off') return param
  return 'light'
}

function gated(): boolean {
  return (
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

const token = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

export function Atmosphere() {
  const [mode, setMode] = useState<Mode | null>(null)

  useEffect(() => {
    setMode(gated() ? resolveMode() : 'off')
  }, [])

  if (mode === 'light') return <LightField />
  if (mode === 'particles') return <Particles />
  return null
}

/** The cursor light — a patina glow, lerped toward the pointer, idly
 *  wandering when the pointer is elsewhere. The room notices the visitor. */
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

/** PROVISIONAL (owner evaluation, 06_DO_NOT amendment): dust motes in the
 *  Arrival light, displaced gently by the cursor. Canvas 2D, token colours. */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const section = canvas.closest('section')
    const ctx = canvas.getContext('2d')
    if (!ctx || !section) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const patina = token('--patina-400')
    const bone = token('--ink-000')

    let w = 0
    let h = 0
    const resize = () => {
      w = section.clientWidth
      h = section.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    type Mote = {
      x: number; y: number; vx: number; vy: number
      r: number; a: number; phase: number; tone: string
    }
    const count = Math.min(80, Math.round((w * h) / 26000))
    const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo)
    const motes: Mote[] = Array.from({ length: count }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-0.06, 0.02),
      vy: rand(-0.05, 0.05),
      r: rand(0.5, 1.7),
      a: rand(0.08, 0.3),
      phase: rand(0, Math.PI * 2),
      tone: Math.random() < 0.7 ? bone : patina,
    }))

    let mx = -1e4
    let my = -1e4
    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }
    const onLeave = () => {
      mx = -1e4
      my = -1e4
    }

    let raf = 0
    let running = true
    const tick = (t: number) => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      for (const m of motes) {
        // Cursor influence: a slow radial push, felt more than seen.
        const dx = m.x - mx
        const dy = m.y - my
        const d2 = dx * dx + dy * dy
        if (d2 < 150 * 150 && d2 > 1) {
          const d = Math.sqrt(d2)
          const force = ((150 - d) / 150) * 0.05
          m.vx += (dx / d) * force
          m.vy += (dy / d) * force
        }
        m.vx *= 0.985
        m.vy *= 0.985
        m.x += m.vx + Math.sin(t / 4000 + m.phase) * 0.05
        m.y += m.vy + Math.cos(t / 5000 + m.phase) * 0.04
        if (m.x < -4) m.x = w + 4
        if (m.x > w + 4) m.x = -4
        if (m.y < -4) m.y = h + 4
        if (m.y > h + 4) m.y = -4
        ctx.globalAlpha = m.a * (0.75 + 0.25 * Math.sin(t / 2600 + m.phase))
        ctx.fillStyle = m.tone
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([entry]) => {
      running = Boolean(entry?.isIntersecting) && !document.hidden
      cancelAnimationFrame(raf)
      if (running) raf = requestAnimationFrame(tick)
    })
    io.observe(section)
    const onVisibility = () => {
      running = !document.hidden
      cancelAnimationFrame(raf)
      if (running) raf = requestAnimationFrame(tick)
    }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', resize)
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', resize)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
