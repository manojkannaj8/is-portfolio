import { useEffect, useRef, useState } from 'react'
import { chapters, journey } from '../content/portfolio'
import { useReducedMotion } from '../motion/useReducedMotion'
import { ChalkEdge } from '../ui/Chalk'
import { ChapterHead } from '../ui/ChapterHead'
import './journey.css'

const chapter = chapters.find((c) => c.id === 'journey')!

/**
 * A chalk path drawn down the grass as you scroll, wandering from one
 * stop to the next. The path is built from the real positions of the
 * stops, so it always passes through them at any screen size.
 */
export function Journey() {
  const listRef = useRef<HTMLOListElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [d, setD] = useState('')
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [reached, setReached] = useState(-1)
  const reduced = useReducedMotion()

  // Build the path through each stop's marker.
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const build = () => {
      const box = list.getBoundingClientRect()
      const pts = [...list.querySelectorAll<HTMLElement>('.stop-dot')].map((el) => {
        const r = el.getBoundingClientRect()
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top }
      })
      if (!pts.length) return
      let path = `M${pts[0].x} ${Math.max(0, pts[0].y - 80)} L${pts[0].x} ${pts[0].y}`
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1]
        const b = pts[i]
        const swing = (i % 2 ? 1 : -1) * Math.min(90, box.width * 0.12)
        const dy = b.y - a.y
        path += ` C${a.x + swing} ${a.y + dy * 0.35} ${b.x - swing} ${b.y - dy * 0.35} ${b.x} ${b.y}`
      }
      const last = pts[pts.length - 1]
      path += ` C${last.x + 40} ${last.y + 60} ${last.x - 30} ${last.y + 90} ${last.x + 10} ${last.y + 130}`
      setD(path)
      setSize({ w: box.width, h: box.height + 140 })
    }
    build()
    const ro = new ResizeObserver(build)
    ro.observe(list)
    document.fonts?.ready.then(build)
    return () => ro.disconnect()
  }, [])

  // Draw the path as the visitor walks down the page.
  useEffect(() => {
    const list = listRef.current
    const path = pathRef.current
    if (!list || !path || !d) return
    const len = path.getTotalLength()
    path.style.strokeDasharray = `${len}`
    const dots = [...list.querySelectorAll<HTMLElement>('.stop-dot')]
    if (reduced) {
      path.style.strokeDashoffset = '0'
      setReached(dots.length - 1)
      return
    }
    let shown = -1
    const update = () => {
      const box = list.getBoundingClientRect()
      const lead = window.innerHeight * 0.62
      const p = Math.min(1, Math.max(0, (lead - box.top) / (box.height + 140)))
      path.style.strokeDashoffset = `${len * (1 - p)}`
      let n = -1
      dots.forEach((dot, i) => {
        if (dot.getBoundingClientRect().top < lead) n = i
      })
      if (n !== shown) {
        shown = n
        setReached(n)
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [d, reduced])

  return (
    <section id={chapter.id} className="chapter journey" aria-labelledby={`${chapter.id}-title`}>
      <ChalkEdge variant={2} />
      <div className="wrap">
        <ChapterHead chapter={chapter} align="end" />
        <div className="journey-road">
          <svg className="journey-path" width={size.w} height={size.h} aria-hidden="true">
            <path ref={pathRef} d={d} />
          </svg>
          <ol ref={listRef} className="stops">
            {journey.map((s, i) => (
              <li key={`${s.when}-${s.title}`} className={`stop${i <= reached ? ' is-reached' : ''}`}>
                <span className="stop-dot" aria-hidden="true" />
                <p className="stop-when">{s.when}</p>
                <div className="stop-body">
                  <h3 className="stop-title">{s.title}</h3>
                  <p className="stop-place">{s.place}</p>
                  <p className="stop-detail">{s.detail}</p>
                  {s.list && (
                    <ul className="stop-list">
                      {s.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
