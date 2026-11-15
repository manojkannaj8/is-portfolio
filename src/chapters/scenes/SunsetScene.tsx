import { useEffect, useRef } from 'react'
import { pointer } from '../../motion/pointer'
import { onTick } from '../../motion/ticker'
import { useSeen } from '../../motion/useInView'
import { useReducedMotion } from '../../motion/useReducedMotion'
import { useVisible } from '../../motion/useVisible'
import { SUNSET, sunParts, sunSrc } from './sunData'
import './scenes.css'

const FLARES = [
  { t: 0.35, size: 7, kind: 'disc' },
  { t: 0.62, size: 3.4, kind: 'ring' },
  { t: 0.9, size: 11, kind: 'soft' },
  { t: 1.2, size: 4.5, kind: 'hex' },
  { t: 1.55, size: 2.4, kind: 'disc' },
] as const

/**
 * The end of the day. When the scene comes into view the sun is drawn
 * over the sunset, core first and then each ray, and afterwards it keeps
 * shimmering. Its glow breathes, a lens flare swings with the pointer and
 * fireflies come out over the grass.
 */
export function SunsetScene() {
  const [rootRef, visible] = useVisible<HTMLDivElement>()
  // watch the scene's own box (the photo box is wider than a phone screen)
  const [seenRef, drawn] = useSeen<HTMLDivElement>(0.3)
  const sunRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const coverRef = useRef<HTMLDivElement>(null)
  const baseRef = useRef<HTMLDivElement>(null)
  const flareRefs = useRef<(HTMLSpanElement | null)[]>([])
  const fliesRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reduced || !visible) return
    const root = rootRef.current!
    const cover = coverRef.current!
    const base = baseRef.current!
    const sun = sunRef.current!
    const canvas = fliesRef.current!
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(2, window.devicePixelRatio || 1)

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

    // one pre-rendered glow, stamped for every firefly
    const glow = document.createElement('canvas')
    glow.width = glow.height = 48
    const g = glow.getContext('2d')!
    const grad = g.createRadialGradient(24, 24, 0, 24, 24, 24)
    grad.addColorStop(0, 'rgba(250,255,200,1)')
    grad.addColorStop(0.18, 'rgba(226,255,120,0.85)')
    grad.addColorStop(0.5, 'rgba(190,240,80,0.18)')
    grad.addColorStop(1, 'rgba(190,240,80,0)')
    g.fillStyle = grad
    g.fillRect(0, 0, 48, 48)

    const flies = Array.from({ length: window.innerWidth < 720 ? 14 : 26 }, () => ({
      x: Math.random(),
      y: 0.55 + Math.random() * 0.42,
      f1: 0.15 + Math.random() * 0.25,
      f2: 0.1 + Math.random() * 0.2,
      ph: Math.random() * Math.PI * 2,
      blink: 0.5 + Math.random() * 0.9,
      size: 14 + Math.random() * 16,
    }))

    let flare = 0
    const off = onTick((dt, now) => {
      const t = now / 1000
      const a = pointer.active
      base.style.transform = `translate3d(${(-pointer.nx * 8 * a).toFixed(2)}px, ${(-pointer.ny * 6 * a).toFixed(2)}px, 0)`
      sun.style.transform = `translate3d(${(-pointer.nx * 14 * a).toFixed(2)}px, ${(-pointer.ny * 10 * a).toFixed(2)}px, 0)`

      // lens flare: elements strung along the line from the sun through the pointer
      const sx = photo.left + (SUNSET.sun.x / 100) * photo.width - pointer.nx * 14 * a - rect.left
      const sy = photo.top + (SUNSET.sun.y / 100) * photo.height - pointer.ny * 10 * a - rect.top
      const inside = pointer.y > rect.top && pointer.y < rect.bottom && pointer.x > rect.left && pointer.x < rect.right
      flare += ((inside ? 1 : 0.35) - flare) * Math.min(1, dt * 3)
      const px = pointer.x - rect.left
      const py = pointer.y - rect.top
      FLARES.forEach((f, i) => {
        const el = flareRefs.current[i]
        if (!el) return
        const x = sx + (px - sx) * f.t
        const y = sy + (py - sy) * f.t
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`
        el.style.opacity = (flare * (i === 2 ? 0.45 : 0.7)).toFixed(3)
      })

      // fireflies over the grass
      ctx.clearRect(0, 0, cw, ch)
      for (const fly of flies) {
        const x = (fly.x + Math.sin(t * fly.f1 + fly.ph) * 0.05 + Math.sin(t * fly.f2 * 2.3 + fly.ph) * 0.02) * cw
        const y = (fly.y + Math.cos(t * fly.f2 + fly.ph) * 0.035) * ch
        const on = Math.max(0, Math.sin(t * fly.blink + fly.ph))
        const alpha = on * on * on
        if (alpha < 0.02) continue
        ctx.globalAlpha = alpha
        const s = fly.size * (0.7 + alpha * 0.5)
        ctx.drawImage(glow, x - pointer.nx * 20 * a - s / 2, y - pointer.ny * 10 * a - s / 2, s, s)
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
    <div ref={rootRef} className="scene sunset-scene" aria-hidden="true">
      <div
        className="cover sunset-cover"
        ref={coverRef}
        style={
          {
            '--a': SUNSET.width / SUNSET.height,
            '--px': 0.48,
            '--py': 0.5,
            '--sx': `${SUNSET.sun.x}%`,
            '--sy': `${SUNSET.sun.y}%`,
          } as React.CSSProperties
        }
      >
        <div className="cover-layer" ref={baseRef}>
          <picture>
            <source srcSet={SUNSET.avif} type="image/avif" />
            <img className="cover-photo" src={SUNSET.webp} alt="" loading="lazy" decoding="async" width={SUNSET.width} height={SUNSET.height} />
          </picture>
          <div className="sun-glow" />
        </div>
        <div className={`cover-layer sun${drawn || reduced ? ' is-drawn' : ''}`} ref={sunRef}>
          {sunParts.map((p, i) => (
            <img
              key={p.id}
              className={p.id === 'core' ? 'sun-core' : 'sun-ray'}
              src={sunSrc(p.id)}
              alt=""
              loading="lazy"
              decoding="async"
              style={
                {
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.w}%`,
                  height: `${p.h}%`,
                  transformOrigin: `${p.ax}% ${p.ay}%`,
                  '--ox': `${p.ax}%`,
                  '--oy': `${p.ay}%`,
                  '--dir': `${p.angle + 90}deg`,
                  '--i': i,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
      <div className="flares" ref={seenRef}>
        {FLARES.map((f, i) => (
          <span
            key={i}
            ref={(el) => {
              flareRefs.current[i] = el
            }}
            className={`flare flare--${f.kind}`}
            style={{ '--s': `${f.size}vmin` } as React.CSSProperties}
          />
        ))}
      </div>
      <canvas className="fireflies" ref={fliesRef} />
    </div>
  )
}
