import { useCallback, useEffect, useRef, useState } from 'react'
import { landing, profile } from '../content/portfolio'
import { startPointerTracking } from '../motion/pointer'
import { useReducedMotion } from '../motion/useReducedMotion'
import { Atmosphere } from './Atmosphere'
import type { ChalkLayerHandle } from './ChalkLayer'
import { ChalkName } from './ChalkName'
import { ChalkTools } from './ChalkTools'
import { Stage } from './Stage'
import { CHALKS, PHOTO } from './world'
import './landing.css'

/**
 * The first screen: you are standing on Ishita's patch of grass, looking
 * down at Ishita's shoes. The light comes up, the doodles catch it one by one,
 * and the name is written in chalk beside you.
 */
export function Landing() {
  const reduced = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const chalkRef = useRef<ChalkLayerHandle>(null)
  const [lit, setLit] = useState(false)
  const [written, setWritten] = useState(false)
  const [inView, setInView] = useState(true)
  const [drawing, setDrawing] = useState(false)
  const [ink, setInk] = useState<string>(CHALKS[0].value)
  const [looked, setLooked] = useState(false)

  useEffect(() => startPointerTracking(), [])

  // Entrance: wait for the photograph and the chalk face, then light up.
  useEffect(() => {
    let cancelled = false
    const photo = new Image()
    photo.src = PHOTO.webp
    const ready = Promise.all([
      photo.decode().catch(() => undefined),
      document.fonts.load('400 100px Mansalva').catch(() => undefined),
    ])
    const timeout = new Promise((r) => setTimeout(r, 2500))
    Promise.race([ready, timeout]).then(() => {
      if (cancelled) return
      setLit(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!lit) return
    if (reduced) {
      setWritten(true)
      return
    }
    const t = setTimeout(() => setWritten(true), 1350)
    return () => clearTimeout(t)
  }, [lit, reduced])

  // Pause the atmosphere when the hero is off screen.
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.02 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Escape puts the chalk down.
  useEffect(() => {
    if (!drawing) return
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setDrawing(false)
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [drawing])

  const onLookAround = useCallback(() => setLooked(true), [])

  return (
    <section
      ref={heroRef}
      className={`hero${lit ? ' is-lit' : ''}${reduced ? ' is-still' : ''}${drawing ? ' is-drawing' : ''}`}
      aria-labelledby="hero-name"
    >
      <Stage
        lit={lit}
        active={inView}
        reduced={reduced}
        drawing={drawing}
        ink={ink}
        chalkRef={chalkRef}
        onLookAround={onLookAround}
      />

      <Atmosphere reduced={reduced} visible={inView} />

      <header className="topline">
        <a className="wordmark" href="/" aria-label={`${profile.name}, home`}>
          {profile.name}
        </a>
        <ul className="elsewhere">
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
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
        </ul>
      </header>

      <div className="hello">
        <p className="greeting" aria-hidden="true">
          {landing.greeting}
        </p>
        <h1 id="hero-name" className="name">
          <span className="sr-only">{profile.name}</span>
          <ChalkName text={profile.firstName} written={written} />
        </h1>
      </div>

      <div className="intro">
        <p className="intro-lead">{landing.intro}</p>
        <p className="intro-invite">{landing.invite}</p>
        <a className="step" href="#beginning">
          <span>{landing.stepForward}</span>
          <svg viewBox="0 0 40 56" aria-hidden="true">
            <path pathLength={1} d="M20 4c-3 12 3 22 0 34" />
            <path pathLength={1} d="M9 34l11 15 11-15" />
          </svg>
        </a>
      </div>

      <p className={`look-around${looked ? ' is-gone' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 24 12" aria-hidden="true"><path d="M7 1L2 6l5 5M2 6h20M17 1l5 5-5 5" /></svg>
        {landing.lookAround}
      </p>

      <ChalkTools
        drawing={drawing}
        ink={ink}
        onToggle={() => setDrawing((d) => !d)}
        onInk={setInk}
        onWash={() => chalkRef.current?.wash()}
      />
    </section>
  )
}
