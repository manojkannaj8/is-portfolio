/**
 * One shared requestAnimationFrame loop. Anything that animates per frame
 * subscribes here instead of starting its own loop, so the page never runs
 * more than one rAF and everything pauses together when the tab is hidden.
 */
type Tick = (dt: number, now: number) => void

const subs = new Set<Tick>()
let raf = 0
let last = 0

function frame(now: number) {
  const dt = Math.min(64, now - (last || now)) / 1000
  last = now
  subs.forEach((fn) => fn(dt, now))
  raf = subs.size ? requestAnimationFrame(frame) : 0
}

function start() {
  if (!raf && subs.size && !document.hidden) {
    last = 0
    raf = requestAnimationFrame(frame)
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(raf)
    raf = 0
  } else start()
})

export function onTick(fn: Tick): () => void {
  subs.add(fn)
  start()
  return () => {
    subs.delete(fn)
    if (!subs.size && raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }
}

/** Frame-rate independent exponential smoothing. */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt))
}
