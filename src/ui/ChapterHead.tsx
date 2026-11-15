import type { Chapter } from '../content/types'
import { spriteSrc } from '../landing/world'
import { useSeen } from '../motion/useInView'

/**
 * Every chapter opens with the doodle that led to it, lifted out of the
 * hero photograph, beside the chapter title written in chalk.
 */
export function ChapterHead({ chapter, align = 'start' }: { chapter: Chapter; align?: 'start' | 'end' }) {
  const [ref, seen] = useSeen<HTMLElement>(0.5)
  return (
    <header ref={ref} className={`chapter-head chapter-head--${align}${seen ? ' is-seen' : ''}`}>
      <img className="chapter-doodle" src={spriteSrc(chapter.doodle)} alt="" loading="lazy" decoding="async" />
      <div>
        <h2 id={`${chapter.id}-title`} className="chapter-title">
          {chapter.title}
        </h2>
        <p className="chapter-intro">{chapter.intro}</p>
      </div>
    </header>
  )
}
