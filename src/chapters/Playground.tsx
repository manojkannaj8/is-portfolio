import { chapters, projects } from '../content/portfolio'
import { useSeen } from '../motion/useInView'
import type { Project } from '../content/types'
import { ChapterHead } from '../ui/ChapterHead'
import { CanopyScene } from './scenes/CanopyScene'
import { HealthDemo, MapDemo, QuizDemo, RailDemo } from './playground/demos'
import './playground.css'

const chapter = chapters.find((c) => c.id === 'playground')!

/**
 * Looking up from the grass into the trees, where ideas hang like stars.
 * Each project is its own small exhibit with a working illustration of
 * what it does, laid out differently from the one before it.
 */
export function Playground() {
  return (
    <section id={chapter.id} className="chapter playground" aria-labelledby={`${chapter.id}-title`}>
      <div className="canopy photo-edge">
        <CanopyScene />
      </div>
      <div className="wrap playground-head">
        <ChapterHead chapter={chapter} />
      </div>

      <div className="wrap exhibits">
        {projects.map((p, i) => (
          <Exhibit key={p.id} project={p} layout={(['a', 'b', 'c', 'd'] as const)[i % 4]} />
        ))}
      </div>
    </section>
  )
}

function Exhibit({ project: p, layout }: { project: Project; layout: 'a' | 'b' | 'c' | 'd' }) {
  const [ref, seen] = useSeen<HTMLElement>(0.25)
  return (
    <article
      ref={ref}
      className={`exhibit exhibit--${layout}${seen ? ' is-seen' : ''}`}
      aria-labelledby={`${p.id}-name`}
    >
      <div className="exhibit-text">
        {(p.context || p.status === 'in progress') && (
          <p className="exhibit-context">
            {p.context}
            {p.status === 'in progress' && <span className="stamp">in progress</span>}
          </p>
        )}
        <h3 id={`${p.id}-name`} className="exhibit-name">
          {p.name}
        </h3>
        <dl className="exhibit-facts">
          <div>
            <dt>The problem</dt>
            <dd>{p.problem}</dd>
          </div>
          <div>
            <dt>{p.status === 'in progress' ? "What I'm building" : 'What I built'}</dt>
            <dd>{p.built}</dd>
          </div>
          {p.contribution && (
            <div>
              <dt>My part</dt>
              <dd>{p.contribution}</dd>
            </div>
          )}
          {p.outcome && (
            <div>
              <dt>How it went</dt>
              <dd>{p.outcome}</dd>
            </div>
          )}
          <div>
            <dt>Built with</dt>
            <dd>
              <ul className="tool-list">
                {p.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        {(p.repo || p.live) && (
          <p className="exhibit-links">
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer">
                See it live
              </a>
            )}
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noreferrer">
                Read the code
              </a>
            )}
          </p>
        )}
      </div>
      <div className="exhibit-visual">
        {p.demo.kind === 'quiz' && <QuizDemo demo={p.demo} />}
        {p.demo.kind === 'health' && <HealthDemo demo={p.demo} />}
        {p.demo.kind === 'map' && <MapDemo demo={p.demo} />}
        {p.demo.kind === 'rail' && <RailDemo demo={p.demo} />}
      </div>
    </article>
  )
}
