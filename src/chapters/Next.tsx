import { chapters, next, profile } from '../content/portfolio'
import { ChapterHead } from '../ui/ChapterHead'
import './next.css'

const chapter = chapters.find((c) => c.id === 'next')!

/**
 * The path through the grass runs on toward a sun someone drew over the
 * sunset. The site ends where the day does: what I'm doing now, and how
 * to reach me.
 */
export function Next() {
  return (
      <section id={chapter.id} className="chapter next" aria-labelledby={`${chapter.id}-title`}>
        <div className="sunset photo-edge" aria-hidden="true">
          <picture>
            <source srcSet="/world/sunset.avif" type="image/avif" />
            <img src="/world/sunset.webp" alt="" loading="lazy" decoding="async" width={1672} height={941} />
          </picture>
        </div>

        <div className="wrap next-inner">
          <ChapterHead chapter={chapter} />

          <div className="next-grid">
            <div className="next-now">
              <h3 className="next-label">right now</h3>
              <ul>
                {next.now.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              {next.ambition && <p className="next-ambition">{next.ambition}</p>}
            </div>

            <div className="next-contact">
              <p className="next-invite">{next.invite}</p>
              <a className="next-email" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
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

          <p className="next-closing">{next.closing}</p>
        </div>
      </section>
  )
}
