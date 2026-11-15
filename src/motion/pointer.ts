import { damp, onTick } from './ticker'

/**
 * A smoothed pointer shared by every layer of the landing world.
 * `nx`/`ny` run from -1 to 1 across the viewport; `x`/`y` are client pixels.
 * Values ease toward the real pointer so parallax and light feel weighty.
 * Layers read this object inside their own onTick callbacks and write
 * transforms directly, so no inherited CSS variable changes per frame.
 */
export interface PointerState {
  x: number
  y: number
  nx: number
  ny: number
  /** Eases from 0 to 1 once the visitor has moved a pointer or touched. */
  active: number
}

export const pointer: PointerState = { x: 0, y: 0, nx: 0, ny: 0, active: 0 }
const target = { x: 0, y: 0, active: 0 }

let users = 0
let stop: (() => void) | null = null
let idleT = 0

function bind() {
  target.x = pointer.x = window.innerWidth * 0.62
  target.y = pointer.y = window.innerHeight * 0.42

  const move = (e: PointerEvent) => {
    target.x = e.clientX
    target.y = e.clientY
    target.active = 1
  }
  window.addEventListener('pointermove', move, { passive: true })
  window.addEventListener('pointerdown', move, { passive: true })

  const off = onTick((dt) => {
    const w = window.innerWidth
    const h = window.innerHeight
    // Before any pointer input (touch screens), let the light wander slowly.
    if (!target.active) {
      idleT += dt
      target.x = w * (0.56 + Math.sin(idleT * 0.21) * 0.2)
      target.y = h * (0.42 + Math.cos(idleT * 0.17) * 0.14)
    }
    pointer.x = damp(pointer.x, target.x, 5, dt)
    pointer.y = damp(pointer.y, target.y, 5, dt)
    pointer.active = damp(pointer.active, target.active, 3, dt)
    pointer.nx = (pointer.x / w) * 2 - 1
    pointer.ny = (pointer.y / h) * 2 - 1
  })

  return () => {
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerdown', move)
    off()
  }
}

/** Reference-counted: the first user starts tracking, the last one stops it. */
export function startPointerTracking(): () => void {
  if (users++ === 0) stop = bind()
  return () => {
    if (--users === 0 && stop) {
      stop()
      stop = null
    }
  }
}
