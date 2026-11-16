import { chapters, next, profile } from '../content/portfolio'
import { useSeen } from '../motion/useInView'
import { ChapterHead } from '../ui/ChapterHead'
import { CopyEmail } from '../ui/CopyEmail'
import { SunsetScene } from './scenes/SunsetScene'
import './next.css'

const chapter = chapters.find((c) => c.id === 'next')!

/**
 * The path through the grass runs on toward a sun someone drew over the
 * sunset. The site ends where the day does: what I'm doing now, and how
 * to reach me.
 */
export function Next() {
  const [nowRef, nowSeen] = useSeen<HTMLDivElement>(0.4)
  const [endRef, endSeen] = useSeen<HTMLParagraphElement>(0.8)
  return (
      <section id={chapter.id} className="chapter next" aria-labelledby={`${chapter.id}-title`}>
        <div className="sunset photo-edge">
          <SunsetScene />
        </div>

        <div className="wrap next-inner">
          <ChapterHead chapter={chapter} />

          <div className="next-grid">
            <div ref={nowRef} className={`next-now${nowSeen ? ' is-seen' : ''}`}>
              <h3 className="next-label">right now</h3>
              <ul>
                {next.now.map((n, i) => (
                  <li key={n} style={{ '--i': i } as React.CSSProperties}>
                    {n}
                  </li>
                ))}
              </ul>
              {next.ambition && <p className="next-ambition">{next.ambition}</p>}
            </div>

            <div className="next-contact">
              <p className="next-invite">{next.invite}</p>
              <div className="next-email-row">
                <a className="next-email" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <CopyEmail email={profile.email} labels={next} />
              </div>
              <ul className="next-links">
                <li>
                  <a href={profile.links.github.href} target="_blank" rel="noreferrer">
                    {profile.links.github.label}
                  </a>
                </li>
                <li>
                  <a href={profile.links.linkedin.href} target="_blank" rel="noreferrer">
                    {profile.links.linkedin.label}
                  </a>
                </li>
                {profile.cv && (
                  <li>
                    <a href={profile.cv} target="_blank" rel="noreferrer">
                      My CV (PDF)
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <p ref={endRef} className={`next-closing${endSeen ? ' is-seen' : ''}`}>{next.closing}</p>
        </div>
      </section>
  )
}
