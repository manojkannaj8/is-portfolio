import { chapters, milestones } from '../content/portfolio'
import type { Milestone } from '../content/types'
import { useSeen } from '../motion/useInView'
import { ChalkEdge } from '../ui/Chalk'
import { ChapterHead } from '../ui/ChapterHead'
import './milestones.css'

const chapter = chapters.find((c) => c.id === 'milestones')!

/**
 * The one bright page in the book: cream paper and glossy sticker stars,
 * the same stars that hang in the trees, given out like gold stars in
 * school. Each one is pressed onto the page as it comes into view.
 */
export function Milestones() {
  return (
    <section id={chapter.id} className="chapter milestones" aria-labelledby={`${chapter.id}-title`}>
      <ChalkEdge variant={0} />
      <div className="wrap">
        <ChapterHead chapter={chapter} />
        <ol className="awards">
          {milestones.map((m, i) => (
            <Award key={m.id} m={m} i={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function Award({ m, i }: { m: Milestone; i: number }) {
  const [ref, seen] = useSeen<HTMLLIElement>(0.45)
  const tilt = [-12, 9, -5, 14, -8][i % 5]
  return (
    <li
      ref={ref}
      className={`award award--${i}${seen ? ' is-seen' : ''}`}
      style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
    >
      <Sticker kind={m.star} />
      <div className="award-text">
        <p className="award-when">{m.when}</p>
        <h3 className="award-title">{m.title}</h3>
        <p className="award-detail">{m.detail}</p>
      </div>
    </li>
  )
}

const STAR = 'M50 4l13.5 28.6 31.3 4-23 21.7 5.9 31L50 74.2 22.3 89.3l5.9-31-23-21.7 31.3-4z'

function Sticker({ kind }: { kind: Milestone['star'] }) {
  return (
    <svg className={`sticker sticker--${kind}`} viewBox="0 0 100 100" aria-hidden="true">
      <path className="sticker-shadow" d={STAR} />
      <path className="sticker-body" d={STAR} />
      {kind !== 'outline' && <path className="sticker-shine" d="M50 12l9 19.5M30 40l-17-2.2" />}
      {kind !== 'outline' && <path className="sticker-gloss" d="M50 4l13.5 28.6 31.3 4-23 21.7L50 50 28.2 36.6 36.5 32.6z" />}
    </svg>
  )
}
