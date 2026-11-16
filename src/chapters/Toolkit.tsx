import { useMemo, useState } from 'react'
import { chapters, projects, toolkit, toolPlaces } from '../content/portfolio'
import { useSeen } from '../motion/useInView'
import { ChalkEdge } from '../ui/Chalk'
import { ChapterHead } from '../ui/ChapterHead'
import './toolkit.css'

const chapter = chapters.find((c) => c.id === 'toolkit')!

/**
 * A chalkboard and a box of chalk. Every tool is a stick of chalk; pick
 * one up (hover, focus or tap) and the places it was used light up on the
 * board. Point at a place and its sticks light up instead.
 */
export function Toolkit() {
  const places = useMemo(
    () => [...projects.map((p) => ({ id: p.id, name: p.name })), ...toolPlaces],
    [],
  )
  const [boxRef, boxSeen] = useSeen<HTMLDivElement>(0.25)
  const [tool, setTool] = useState<string | null>(null)
  const [pinned, setPinned] = useState<string | null>(null)
  const [place, setPlace] = useState<string | null>(null)

  const activeTool = tool ?? pinned
  const usedIn = useMemo(() => {
    if (!activeTool) return null
    for (const g of toolkit) for (const t of g.tools) if (t.name === activeTool) return new Set(t.usedIn)
    return null
  }, [activeTool])
  const placeTools = useMemo(() => {
    if (!place) return null
    const s = new Set<string>()
    toolkit.forEach((g) => g.tools.forEach((t) => t.usedIn.includes(place) && s.add(t.name)))
    return s
  }, [place])

  const status = activeTool
    ? usedIn && usedIn.size
      ? `${activeTool}: used in ${usedIn.size} ${usedIn.size === 1 ? 'place' : 'places'}.`
      : `${activeTool}: one of my languages; no project on this board uses it yet.`
    : ''

  return (
    <section id={chapter.id} className="chapter toolkit" aria-labelledby={`${chapter.id}-title`}>
      <ChalkEdge variant={1} />
      <div className="wrap">
        <ChapterHead chapter={chapter} align="end" />
        <div className={`board${activeTool ? ' has-tool' : ''}${place ? ' has-place' : ''}`}>
          <div ref={boxRef} className={`chalkbox${boxSeen ? ' is-seen' : ''}`}>
            {toolkit.map((g, gi) => (
              <div key={g.name} className="stick-group" style={{ '--c': `var(--${g.ink})` } as React.CSSProperties}>
                <h3 className="stick-group-name">{g.name}</h3>
                <ul className="sticks">
                  {g.tools.map((t, ti) => {
                    const lit = activeTool === t.name || (placeTools?.has(t.name) ?? false)
                    return (
                      <li key={t.name}>
                        <button
                          type="button"
                          className={`stick-btn${lit ? ' is-lit' : ''}`}
                          style={{ '--i': gi * 3 + ti, '--r': `${((gi * 7 + ti * 5) % 9) - 4}deg` } as React.CSSProperties}
                          aria-pressed={pinned === t.name}
                          onPointerEnter={(e) => e.pointerType === 'mouse' && setTool(t.name)}
                          onPointerLeave={(e) => e.pointerType === 'mouse' && setTool(null)}
                          onFocus={() => setTool(t.name)}
                          onBlur={() => setTool(null)}
                          onClick={() => setPinned(pinned === t.name ? null : t.name)}
                        >
                          {t.name}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="slate">
            <p className="slate-hint" aria-live="polite">
              <span key={activeTool ?? 'none'} className="slate-hint-text">
                {status || 'Pick up a stick of chalk.'}
              </span>
            </p>
            <ul className="places">
              {places.map((p) => {
                const lit = usedIn?.has(p.id) ?? false
                return (
                  <li
                    key={p.id}
                    className={`place${lit ? ' is-lit' : ''}${place === p.id ? ' is-pointed' : ''}`}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setPlace(p.id)}
                    onPointerLeave={() => setPlace(null)}
                  >
                    <svg className="place-tick" viewBox="0 0 40 30" aria-hidden="true">
                      <path pathLength={1} d="M4 16l10 10L36 4" />
                    </svg>
                    {p.name}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
