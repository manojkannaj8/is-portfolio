import { useEffect, useRef } from 'react'
import { pointer } from '../motion/pointer'
import { onTick } from '../motion/ticker'

/**
 * Golden-hour air: a pool of warm light that follows the pointer (or
 * wanders on its own on touch screens) and a few specks of dust drifting
 * through it. Dust is brighter inside the light, the way it is in sun.
 */
export function Atmosphere({ reduced, visible }: { reduced: boolean; visible: boolean }) {
  const lightRef = useRef<HTMLDivElement>(null)
  const dustRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reduced || !visible) return
    const light = lightRef.current
    const canvas = dustRef.current
    if (!light || !canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    let w = 0
    let h = 0
    const fit = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(canvas)

    const count = window.innerWidth < 720 ? 22 : 40
    const motes = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.3 + Math.random() * 0.7, // depth: nearer motes are bigger, faster
      vx: 0.004 + Math.random() * 0.008,
      vy: -(0.003 + Math.random() * 0.01),
      ph: Math.random() * Math.PI * 2,
    }))

    const off = onTick((dt, now) => {
      light.style.transform = `translate3d(${pointer.x.toFixed(1)}px, ${pointer.y.toFixed(1)}px, 0)`
      ctx.clearRect(0, 0, w, h)
      const lx = pointer.x
      const ly = pointer.y
      const reach = Math.max(w, h) * 0.32
      for (const m of motes) {
        m.x += m.vx * m.z * dt
        m.y += m.vy * m.z * dt + Math.sin(now / 1400 + m.ph) * 0.0004
        if (m.x > 1.05) m.x = -0.05
        if (m.y < -0.05) {
          m.y = 1.05
          m.x = Math.random()
        }
        const x = m.x * w - pointer.nx * 14 * m.z
        const y = m.y * h - pointer.ny * 10 * m.z
        const d = Math.hypot(x - lx, y - ly)
        const glow = Math.max(0, 1 - d / reach)
        const twinkle = 0.75 + Math.sin(now / 600 + m.ph * 3) * 0.25
        const a = (0.12 + glow * 0.75) * twinkle * m.z
        const r = 0.6 + m.z * 1.5 + glow * 0.8
        ctx.globalAlpha = a
        ctx.fillStyle = glow > 0.35 ? '#ffe6b0' : '#f2c27a'
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    })

    return () => {
      off()
      ro.disconnect()
    }
  }, [reduced, visible])

  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="sunlight" ref={lightRef} />
      <div className="vignette" />
      {!reduced && <canvas className="dust" ref={dustRef} />}
    </div>
  )
}
