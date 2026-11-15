import { useEffect, useLayoutEffect, useRef } from 'react'
import { chapters, landing } from '../content/portfolio'
import { pointer } from '../motion/pointer'
import { onTick } from '../motion/ticker'
import { ChalkLayer, type ChalkLayerHandle } from './ChalkLayer'
import { doors, marks, PHOTO, spriteSrc } from './world'

interface StageProps {
  lit: boolean
  /** false while the hero is scrolled out of view: per-frame work pauses */
  active: boolean
  reduced: boolean
  drawing: boolean
  ink: string
  chalkRef: React.RefObject<ChalkLayerHandle | null>
  onLookAround: () => void
}

/**
 * The photograph, sized like `object-fit: cover`, with its own chalk doodles
 * lifted onto a layer above it. Everything inside is positioned in
 * percentages of the photo, so doodles, notes and drawings stay glued to
 * the grass at every crop. On touch screens narrower than the photo the
 * stage scrolls sideways so the visitor can look around.
 */
export function Stage({ lit, active, reduced, drawing, ink, chalkRef, onLookAround }: StageProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const depthRef = useRef<HTMLDivElement>(null)
  const markRefs = useRef<(HTMLImageElement | null)[]>([])

  // Centre narrow screens on the shoes.
  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const centre = () => {
      const stage = el.firstElementChild as HTMLElement
      el.scrollLeft = stage.offsetWidth * (PHOTO.shoes.x / 100) - el.clientWidth / 2
    }
    centre()
    const ro = new ResizeObserver(centre)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let start = el.scrollLeft
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - start) > 24) {
        onLookAround()
        el.removeEventListener('scroll', onScroll)
      }
    }
    const t = setTimeout(() => (start = el.scrollLeft), 300)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(t)
      el.removeEventListener('scroll', onScroll)
    }
  }, [onLookAround])

  // Depth: the ground drifts gently against the pointer; small marks turn
  // toward the light when it passes near them.
  useEffect(() => {
    if (reduced || !active) return
    const depth = depthRef.current
    if (!depth) return
    let rect = depth.getBoundingClientRect()
    const measure = () => (rect = depth.getBoundingClientRect())
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })
    scrollRef.current?.addEventListener('scroll', measure, { passive: true })
    const near = new Float32Array(marks.length)

    const off = onTick((dt) => {
      const a = pointer.active
      depth.style.transform = `translate3d(${(-pointer.nx * 9 * a).toFixed(2)}px, ${(-pointer.ny * 7 * a).toFixed(2)}px, 0) scale(1.025)`
      const px = ((pointer.x - rect.left) / rect.width) * 100
      const py = ((pointer.y - rect.top) / rect.height) * 100
      const aspect = rect.width / rect.height
      marks.forEach((m, i) => {
        const el = markRefs.current[i]
        if (!el) return
        const dx = (px - m.cx) * aspect
        const dy = py - m.cy
        const d = Math.sqrt(dx * dx + dy * dy)
        const t = Math.max(0, 1 - d / 22) * a
        const n = near[i] + (t - near[i]) * Math.min(1, dt * 6)
        if (Math.abs(n - near[i]) < 0.0005) return
        near[i] = n
        const ease = n * n * (3 - 2 * n)
        el.style.transform = `rotate(${(ease * 22).toFixed(2)}deg) scale(${(1 + ease * 0.35).toFixed(3)})`
      })
    })
    return () => {
      off()
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
    }
  }, [reduced, active])

  return (
    <div className="stage-scroll" ref={scrollRef}>
      <div className="stage">
        <div className="stage-depth" ref={depthRef}>
          <picture>
            <source srcSet={PHOTO.avif} type="image/avif" />
            <img
              className="photo"
              src={PHOTO.webp}
              width={PHOTO.width}
              height={PHOTO.height}
              alt="Looking down at my own feet: canvas shoes and olive trousers on golden-hour grass, surrounded by chalk stars, spirals and flowers."
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="ground-dusk" aria-hidden="true" />

          <div className="marks" aria-hidden="true">
            {marks.map((m, i) => (
              <img
                key={m.id}
                ref={(el) => {
                  markRefs.current[i] = el
                }}
                className={`mark mark--${m.kind}`}
                src={spriteSrc(m.id)}
                alt=""
                loading="eager"
                decoding="async"
                style={
                  {
                    left: `${m.x}%`,
                    top: `${m.y}%`,
                    width: `${m.w}%`,
                    '--i': i,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          <nav className="doors" aria-label="Doodles leading to each chapter" inert={drawing}>
            {doors.map((d) => {
              const ch = chapters.find((c) => c.doodle === d.id)!
              return (
                <a
                  key={d.id}
                  href={`#${ch.id}`}
                  className={`door door--${d.side}`}
                  style={
                    {
                      left: `${d.x}%`,
                      top: `${d.y}%`,
                      width: `${d.w}%`,
                      height: `${d.h}%`,
                      '--ink': d.ink,
                      '--order': d.order,
                    } as React.CSSProperties
                  }
                >
                  <img className="door-sprite" src={spriteSrc(d.id)} alt="" decoding="async" />
                  <span className="door-label">
                    <span className="door-title">{ch.title}</span>
                    <span className="door-teaser">{ch.teaser}</span>
                  </span>
                </a>
              )
            })}
          </nav>

          <YouAreHere lit={lit} />

          <ChalkLayer ref={chalkRef} active={drawing} ink={ink} />
        </div>
      </div>
    </div>
  )
}

function YouAreHere({ lit }: { lit: boolean }) {
  return (
    <div className={`here${lit ? ' is-lit' : ''}`} aria-hidden="true">
      <p className="here-text">
        {landing.youAreHere}
        <span>{landing.youAreHereAside}</span>
      </p>
      <svg className="here-arrow" viewBox="0 0 120 80" fill="none">
        <path
          className="here-line"
          pathLength={1}
          d="M6 10c22-6 52-4 70 10 14 11 20 26 24 44"
        />
        <path className="here-head" pathLength={1} d="M88 54l12 14 8-17" />
      </svg>
    </div>
  )
}
