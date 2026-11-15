import { useEffect, useState } from 'react'
import { chapters } from '../content/portfolio'
import type { ChapterId } from '../content/types'
import { spriteSrc } from '../landing/world'

/**
 * Once you step off the grass, the six doodles follow you down the page
 * as a trail. The one for the chapter you're in glows; any of them takes
 * you there. On phones the trail sits along the bottom edge.
 */
export function Trail() {
  const [active, setActive] = useState<ChapterId | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('.hero')
    const heroIo = new IntersectionObserver(([e]) => setShown(!e.isIntersecting || e.intersectionRatio < 0.35), {
      threshold: [0, 0.35, 1],
    })
    if (hero) heroIo.observe(hero)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as ChapterId)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    chapters.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) io.observe(el)
    })
    return () => {
      heroIo.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <nav className={`trail${shown ? ' is-shown' : ''}`} aria-label="Chapters">
      <ol>
        {chapters.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className={active === c.id ? 'is-here' : undefined}
              aria-current={active === c.id ? 'location' : undefined}
              tabIndex={shown ? undefined : -1}
            >
              <img src={spriteSrc(c.doodle)} alt="" loading="lazy" decoding="async" />
              <span className="trail-label">{c.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
