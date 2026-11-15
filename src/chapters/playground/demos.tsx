import { useId, useState } from 'react'
import type { ProjectDemo } from '../../content/types'

type Demo<K extends ProjectDemo['kind']> = Extract<ProjectDemo, { kind: K }>

function Note({ children }: { children: React.ReactNode }) {
  return <p className="illustration-note">{children}</p>
}

/* ───────── Quiz Generator: notes in, question out ───────── */

export function QuizDemo({ demo }: { demo: Demo<'quiz'> }) {
  const [made, setMade] = useState(false)
  const [picked, setPicked] = useState<number | null>(null)
  const reset = () => {
    setMade(false)
    setPicked(null)
  }
  return (
    <div className={`paper quiz${made ? ' is-made' : ''}`}>
      <div className="quiz-notes">
        <p className="paper-label">class notes</p>
        <p className="quiz-notes-text">{demo.notes}</p>
      </div>
      <div className="quiz-sheet" aria-live="polite">
        {made ? (
          <>
            <p className="paper-label">question 1</p>
            <p className="quiz-q">{demo.question}</p>
            <ul className="quiz-options">
              {demo.options.map((o, i) => {
                const state = picked === null ? '' : i === demo.answer ? ' is-right' : picked === i ? ' is-wrong' : ''
                return (
                  <li key={o}>
                    <button
                      type="button"
                      className={`quiz-option${state}`}
                      disabled={picked !== null}
                      onClick={() => setPicked(i)}
                    >
                      {o}
                    </button>
                  </li>
                )
              })}
            </ul>
            {picked !== null && (
              <button type="button" className="paper-action" onClick={reset}>
                {picked === demo.answer ? 'Right! Start over' : 'Not quite. Start over'}
              </button>
            )}
          </>
        ) : (
          <button type="button" className="paper-action paper-action--big" onClick={() => setMade(true)}>
            Turn these notes into a quiz
          </button>
        )}
      </div>
      <Note>illustration of the idea, not the live app</Note>
    </div>
  )
}

/* ───────── Health predictor: symptoms move the needle ───────── */

export function HealthDemo({ demo }: { demo: Demo<'health'> }) {
  const [on, setOn] = useState<Set<number>>(() => new Set([0]))
  const max = demo.symptoms.reduce((s, x) => s + x.weight, 0)
  const score = [...on].reduce((s, i) => s + demo.symptoms[i].weight, 0)
  const t = score / max
  const level = t < 0.3 ? 0 : t < 0.6 ? 1 : 2
  const toggle = (i: number) =>
    setOn((prev) => {
      const n = new Set(prev)
      if (n.has(i)) n.delete(i)
      else n.add(i)
      return n
    })
  // needle sweeps 180° across the dial
  const angle = -90 + t * 180
  return (
    <div className="paper health">
      <p className="paper-label">symptoms</p>
      <ul className="health-chips">
        {demo.symptoms.map((s, i) => (
          <li key={s.label}>
            <button type="button" aria-pressed={on.has(i)} className="chip" onClick={() => toggle(i)}>
              {s.label}
            </button>
          </li>
        ))}
      </ul>
      <div className={`gauge gauge--${level}`}>
        <svg viewBox="0 0 200 116" aria-hidden="true">
          <path className="gauge-track" d="M20 104a80 80 0 0 1 160 0" />
          <path className="gauge-zone gauge-zone--0" pathLength={3} d="M20 104a80 80 0 0 1 160 0" />
          <path className="gauge-zone gauge-zone--1" pathLength={3} d="M20 104a80 80 0 0 1 160 0" />
          <path className="gauge-zone gauge-zone--2" pathLength={3} d="M20 104a80 80 0 0 1 160 0" />
          <g className="gauge-needle" style={{ rotate: `${angle}deg` }}>
            <path d="M100 104V36" />
          </g>
          <circle cx="100" cy="104" r="7" className="gauge-hub" />
        </svg>
        <p className="gauge-read" aria-live="polite">
          <span className="sr-only">Predicted: </span>
          {demo.levels[level]}
        </p>
      </div>
      <Note>illustration with made-up weights, not the trained model</Note>
    </div>
  )
}

/* ───────── Tourist safety: a hiker in a risk zone calls for help ───────── */

export function MapDemo({ demo }: { demo: Demo<'map'> }) {
  const [sent, setSent] = useState(false)
  const pid = useId().replace(/:/g, '')
  return (
    <div className={`map${sent ? ' is-sent' : ''}`}>
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustrated map: a tourist on a hill trail inside a high-risk zone, and a rescue station nearby.">
        <defs>
          <pattern id={`hatch-${pid}`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <path d="M0 0V10" className="map-hatch" />
          </pattern>
        </defs>
        <rect width="640" height="400" className="map-ground" />
        {/* contour lines of a hill */}
        <g className="map-contours">
          <path d="M80 330c40-120 160-210 300-220s200 60 200 150-120 120-260 110S50 420 80 330Z" />
          <path d="M140 310c30-90 130-160 240-160s150 50 150 115-90 95-200 90-215 30-190-45Z" />
          <path d="M200 290c20-60 100-110 180-110s110 35 110 80-70 70-150 66-160 20-140-36Z" />
          <path d="M260 270c14-36 66-60 120-60s70 22 70 50-46 44-100 42-104 6-90-32Z" />
        </g>
        {/* river */}
        <path className="map-river" d="M0 120c70 10 110 40 140 80s60 90 40 200" />
        {/* risk zone */}
        <path className="map-zone" fill={`url(#hatch-${pid})`} d="M360 140c60-20 130 0 150 50s-10 110-80 116-120-30-126-80 0-74 56-86Z" />
        <text x="440" y="132" className="map-zone-label">high-risk zone</text>
        {/* trail */}
        <path className="map-trail" d="M40 380c60-40 90-90 160-110s110 10 170-20 60-60 70-70" />
        {/* station */}
        <g className="map-station" transform="translate(80 70)">
          <path d="M0-22l20 8v14c0 14-9 24-20 28-11-4-20-14-20-28v-14z" />
          <path d="M-7 1h14M0-6v14" className="map-station-cross" />
          <text x="30" y="5">rescue station</text>
        </g>
        {/* alert line */}
        <path className="map-alert-line" pathLength={1} d="M440 220C360 160 240 100 104 76" />
        {/* tourist */}
        <g className="map-tourist" transform="translate(440 220)">
          <circle r="34" className="map-ring map-ring--2" />
          <circle r="20" className="map-ring map-ring--1" />
          <circle r="9" className="map-dot" />
        </g>
      </svg>
      <div className="map-bar">
        <p aria-live="polite">{sent ? 'Location shared with the rescue station.' : 'A hiker has wandered into a high-risk zone.'}</p>
        <button type="button" className="paper-action" onClick={() => setSent((s) => !s)}>
          {sent ? 'Reset' : demo.action}
        </button>
      </div>
      <Note>illustration of the idea, not the live app</Note>
    </div>
  )
}

/* ───────── Railway maintenance: every department on one line ───────── */

const RAIL_JOBS = [
  { at: 0.12, len: 0.08, dept: 0 },
  { at: 0.27, len: 0.06, dept: 1 },
  { at: 0.4, len: 0.1, dept: 2 },
  { at: 0.56, len: 0.05, dept: 0 },
  { at: 0.66, len: 0.08, dept: 3 },
  { at: 0.81, len: 0.07, dept: 1 },
]

export function RailDemo({ demo }: { demo: Demo<'rail'> }) {
  const [dept, setDept] = useState<number | null>(null)
  const W = 1000
  return (
    <div className={`rail${dept !== null ? ' is-filtered' : ''}`}>
      <svg viewBox={`0 0 ${W} 170`} role="img" aria-label="Illustrated railway line with maintenance jobs from different departments marked along it.">
        <g className="rail-sleepers">
          {Array.from({ length: 50 }, (_, i) => (
            <rect key={i} x={20 + i * 19.2} y="66" width="7" height="38" rx="1.5" />
          ))}
        </g>
        <path className="rail-line" d={`M10 74H${W - 10}`} />
        <path className="rail-line" d={`M10 96H${W - 10}`} />
        {RAIL_JOBS.map((j, i) => (
          <g key={i} className={`rail-job rail-job--${j.dept}${dept === j.dept ? ' is-on' : ''}`}>
            <rect x={j.at * W} y="56" width={j.len * W} height="58" rx="8" />
            <text x={j.at * W + (j.len * W) / 2} y="140" textAnchor="middle">
              {demo.departments[j.dept]}
            </text>
          </g>
        ))}
        <g className="rail-station" transform="translate(10 30)">
          <circle r="7" />
          <text x="14" y="5">station A</text>
        </g>
        <g className="rail-station" transform={`translate(${W - 10} 30)`}>
          <circle r="7" />
          <text x="-14" y="5" textAnchor="end">
            station B
          </text>
        </g>
      </svg>
      <div className="rail-legend" role="group" aria-label="Show one department's jobs">
        {demo.departments.map((d, i) => (
          <button
            key={d}
            type="button"
            className={`chip rail-chip rail-chip--${i}`}
            aria-pressed={dept === i}
            onClick={() => setDept(dept === i ? null : i)}
          >
            {d}
          </button>
        ))}
      </div>
      <Note>illustration of the idea; the app is still being built</Note>
    </div>
  )
}
