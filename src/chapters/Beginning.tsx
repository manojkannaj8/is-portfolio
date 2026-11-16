import { beginning, chapters } from '../content/portfolio'
import { PHOTO } from '../landing/world'
import { useSeen } from '../motion/useInView'
import { ChalkCircle, ChalkEdge, ChalkUnderline } from '../ui/Chalk'
import { ChapterHead } from '../ui/ChapterHead'
import './beginning.css'

const chapter = chapters.find((c) => c.id === 'beginning')!

/**
 * Night has fallen on the same patch of grass. A close-up of the shoes
 * from the hero, and a first-person statement whose key words get circled
 * and underlined in chalk as you read them.
 */
export function Beginning() {
  const [ref, seen] = useSeen<HTMLParagraphElement>(0.6)
  // watch the grid, not the photo: a fully clipped element never counts as visible
  const [photoRef, photoSeen] = useSeen<HTMLDivElement>(0.2)
  const [factsRef, factsSeen] = useSeen<HTMLDListElement>(0.4)
  return (
    <section id={chapter.id} className="chapter beginning" aria-labelledby={`${chapter.id}-title`}>
      <ChalkEdge variant={0} />
      <div className="wrap">
        <ChapterHead chapter={chapter} />

        <p ref={ref} className={`beginning-statement${seen ? ' is-seen' : ''}`}>
          {beginning.statement.map((part, i) =>
            part.mark ? (
              <span key={i} className={`marked marked--${part.mark}`}>
                {part.text}
                {part.mark === 'circle' ? <ChalkCircle /> : <ChalkUnderline />}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>

        <div ref={photoRef} className={`beginning-grid${photoSeen ? ' is-seen' : ''}`}>
          <figure className="beginning-photo">
            <picture>
              <source srcSet={PHOTO.avif} type="image/avif" />
              <img
                src={PHOTO.webp}
                alt="A close look at my canvas shoes on the grass."
                loading="lazy"
                decoding="async"
                width={PHOTO.width}
                height={PHOTO.height}
              />
            </picture>
          </figure>

          <div className="beginning-words">
            {beginning.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <dl ref={factsRef} className={`beginning-facts${factsSeen ? ' is-seen' : ''}`}>
            {beginning.facts.map((f, i) => (
              <div key={f.label} style={{ '--i': i } as React.CSSProperties}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
