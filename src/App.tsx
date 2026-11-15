import { footer } from './content/portfolio'
import { Beginning } from './chapters/Beginning'
import { Journey } from './chapters/Journey'
import { Milestones } from './chapters/Milestones'
import { Next } from './chapters/Next'
import { Playground } from './chapters/Playground'
import { Toolkit } from './chapters/Toolkit'
import { Landing } from './landing/Landing'
import { Trail } from './ui/Trail'

export function App() {
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
        <p>
          {footer.line} © {new Date().getFullYear()}
        </p>
      </footer>
    </>
  )
}
