import { useEffect } from 'react'
import { footer } from './content/portfolio'
import { startSmoothScroll } from './motion/smoothScroll'
import { Beginning } from './chapters/Beginning'
import { Journey } from './chapters/Journey'
import { Milestones } from './chapters/Milestones'
import { Next } from './chapters/Next'
import { Playground } from './chapters/Playground'
import { Toolkit } from './chapters/Toolkit'
import { Landing } from './landing/Landing'
import { Trail } from './ui/Trail'
// after every chapter's own stylesheet, so its motion states win
import './styles/motion.css'

export function App() {
  useEffect(() => startSmoothScroll(), [])

  return (
    <>
      <a className="skip" href="#beginning">
        Skip to the story
      </a>
      <Trail />
      <main>
        <Landing />
        <Beginning />
        <Playground />
        <Journey />
        <Milestones />
        <Toolkit />
        <Next />
      </main>
      <footer className="site-foot">
        <a className="back-up" href="#grass">
          <svg viewBox="0 0 20 28" aria-hidden="true">
            <path d="M10 25V4M3 11l7-7 7 7" />
          </svg>
          {footer.backToTop}
        </a>
        <p>
          {footer.line} © {new Date().getFullYear()}
        </p>
      </footer>
    </>
  )
}
