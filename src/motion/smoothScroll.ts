import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { onTick } from './ticker'

/**
 * Eased wheel and trackpad scrolling, driven by the site's one animation
 * loop. Only for mouse and trackpad users: touch keeps the phone's own
 * native scrolling, and anyone who prefers reduced motion keeps the
 * browser's default. Anchor links (the doodles, the trail) glide too.
 */
let lenis: Lenis | null = null

export function startSmoothScroll(): () => void {
  if (lenis) return () => {}
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = window.matchMedia('(pointer: fine)').matches
  if (reduce || !fine) return () => {}

  lenis = new Lenis({
    autoRaf: false,
    lerp: 0.085,
    wheelMultiplier: 0.9,
    anchors: { offset: 0, duration: 1.4 },
    smoothWheel: true,
    syncTouch: false,
  })
  const off = onTick((_dt, now) => lenis?.raf(now))

  return () => {
    off()
    lenis?.destroy()
    lenis = null
  }
}
