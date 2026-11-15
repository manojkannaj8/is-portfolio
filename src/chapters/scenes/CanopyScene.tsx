import { useEffect, useRef } from 'react'
import { pointer } from '../../motion/pointer'
import { onTick } from '../../motion/ticker'
import { useReducedMotion } from '../../motion/useReducedMotion'
import { useVisible } from '../../motion/useVisible'
import { CANOPY, canopyStars, starSrc } from './canopyData'
import './scenes.css'

/**
 * Looking up into the trees. The star stickers that hang in the photo are
 * lifted onto their own layer: they sway on their strings, sit a little
 * nearer than the leaves when the pointer moves, and swing when the
 * pointer brushes past them like a breeze. Sunlight dapples through the
 * canopy and a little glitter drifts down.
 */
export function CanopyScene() {
  const [rootRef, visible] = useVisible<HTMLDivElement>()
  const reduced = useReducedMotion()
  const coverRef = useRef<HTMLDivElement>(null)
  const baseRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)
  const starEls = useRef<(HTMLImageElement | null)[]>([])
  const glitterRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reduced || !visible) return
    const root = rootRef.current!
    const base = baseRef.current!
    const layer = starsRef.current!
    const canvas = glitterRef.current!
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    const cover = coverRef.current!
    let rect = root.getBoundingClientRect()
    let photo = cover.getBoundingClientRect()
    let cw = 0
    let ch = 0
    const measure = () => {
      rect = root.getBoundingClientRect()
      photo = cover.getBoundingClientRect()
      cw = canvas.offsetWidth
      ch = canvas.offsetHeight
      canvas.width = Math.round(cw * dpr)
      canvas.height = Math.round(ch * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    const onScroll = () => {
      rect = root.getBoundingClientRect()
      photo = cover.getBoundingClientRect()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // a pendulum per star: angle and angular velocity of the extra swing
    const swing = canopyStars.map(() => ({ a: 0, v: 0 }))
    let lastX = pointer.x
    let lastY = pointer.y

    const glitter = Array.from({ length: window.innerWidth < 720 ? 18 : 34 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: 1 + Math.random() * 2.2,
      vy: 0.012 + Math.random() * 0.02,
      ph: Math.random() * Math.PI * 2,
      hue: Math.random() < 0.5 ? '#fff6c8' : Math.random() < 0.5 ? '#ffd34d' : '#bfe8ff',
    }))

    const off = onTick((dt, now) => {
      const t = now / 1000
      const a = pointer.active
      // depth: leaves drift a little, stars a little more
      base.style.transform = `translate3d(${(-pointer.nx * 8 * a).toFixed(2)}px, ${(-pointer.ny * 6 * a).toFixed(2)}px, 0)`
      layer.style.transform = `translate3d(${(-pointer.nx * 13 * a).toFixed(2)}px, ${(-pointer.ny * 10 * a).toFixed(2)}px, 0)`

      // pointer velocity, in px per second, drives the breeze
      const vx = (pointer.x - lastX) / Math.max(dt, 0.001)
      const vy = (pointer.y - lastY) / Math.max(dt, 0.001)
      lastX = pointer.x
      lastY = pointer.y
      const inside = pointer.y > rect.top && pointer.y < rect.bottom
      const reach = rect.width * 0.12

      canopyStars.forEach((s, i) => {
        const el = starEls.current[i]
        if (!el) return
        const p = swing[i]
        if (inside) {
          const sx = photo.left + (s.cx / 100) * photo.width
          const sy = photo.top + (s.cy / 100) * photo.height
          const d = Math.hypot(pointer.x - sx, pointer.y - sy)
          if (d < reach) {
            const f = (1 - d / reach) ** 2
            p.v += (vx * 0.05 + vy * 0.012) * f * (1.2 - s.depth * 0.5)
          }
        }
        // damped spring back to rest
        p.v += (-p.a * 26 - p.v * 3.2) * dt
        p.a = Math.max(-14, Math.min(14, p.a + p.v * dt))
        const sway = Math.sin(t * ((Math.PI * 2) / s.period) + s.phase) * (1.3 + s.depth * 1.2)
        el.style.transform = `rotate(${(sway + p.a).toFixed(2)}deg)`
      })

      // glitter drifting down through the light
      ctx.clearRect(0, 0, cw, ch)
      for (const g of glitter) {
        g.y += g.vy * dt
        g.x += Math.sin(t * 0.6 + g.ph) * 0.0006
        if (g.y > 1.04) {
          g.y = -0.04
          g.x = Math.random()
        }
        const tw = Math.max(0, Math.sin(t * 2.4 + g.ph * 3))
        const x = g.x * cw - pointer.nx * 18 * a
        const y = g.y * ch - pointer.ny * 12 * a
        const r = g.s * (0.6 + tw * 0.9)
        ctx.globalAlpha = 0.25 + tw * 0.7
        ctx.fillStyle = g.hue
        // a tiny four-point star
        ctx.beginPath()
        ctx.moveTo(x, y - r * 2.2)
        ctx.quadraticCurveTo(x, y, x + r * 2.2, y)
        ctx.quadraticCurveTo(x, y, x, y + r * 2.2)
        ctx.quadraticCurveTo(x, y, x - r * 2.2, y)
        ctx.quadraticCurveTo(x, y, x, y - r * 2.2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    })

    return () => {
      off()
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      ctx.clearRect(0, 0, cw, ch)
    }
  }, [reduced, visible, rootRef])

  return (
    <div ref={rootRef} className="scene canopy-scene" aria-hidden="true">
      <div className="cover" ref={coverRef} style={{ '--a': CANOPY.width / CANOPY.height, '--px': 0.5, '--py': 0.38 } as React.CSSProperties}>
        <div className="cover-layer" ref={baseRef}>
          <picture>
            <source srcSet={CANOPY.avif} type="image/avif" />
            <img className="cover-photo" src={CANOPY.webp} alt="" loading="lazy" decoding="async" width={CANOPY.width} height={CANOPY.height} />
          </picture>
          <div className="dapple dapple--1" />
          <div className="dapple dapple--2" />
          <div className="dapple dapple--3" />
        </div>
        <div className="cover-layer" ref={starsRef}>
          {canopyStars.map((s, i) => (
            <img
              key={s.id}
              ref={(el) => {
                starEls.current[i] = el
              }}
              className={`hang hang--${s.kind}${i < 10 ? ' hang--glint' : ''}`}
              src={starSrc(s.id)}
              alt=""
              loading="lazy"
              decoding="async"
              style={
                {
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.w}%`,
                  '--d': `${(i * 0.83) % 9}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
      <div className="sunshafts" />
      <canvas className="glitter" ref={glitterRef} />
    </div>
  )
}
