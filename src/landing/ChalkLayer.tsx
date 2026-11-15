import { useEffect, useImperativeHandle, useRef } from 'react'

export interface ChalkLayerHandle {
  /** Fade every drawing away, like rain on a pavement. */
  wash: () => void
  hasMarks: () => boolean
}

interface ChalkLayerProps {
  ref?: React.Ref<ChalkLayerHandle | null>
  active: boolean
  ink: string
  onStroke?: () => void
}

const MAX_DPR = 1.5

/**
 * A canvas lying on the grass. While the chalk is picked up, dragging
 * draws grainy chalk lines: each segment is stamped with small irregular
 * grains rather than a smooth stroke, so it reads like the doodles that
 * are already in the photograph.
 */
export function ChalkLayer({ ref, active, ink, onStroke }: ChalkLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inkRef = useRef(ink)
  const marked = useRef(false)
  inkRef.current = ink

  useImperativeHandle(ref, () => ({
    wash() {
      const c = canvasRef.current
      if (!c || !marked.current) return
      c.classList.add('is-washing')
      window.setTimeout(() => {
        c.getContext('2d')?.clearRect(0, 0, c.width, c.height)
        c.classList.remove('is-washing')
        marked.current = false
      }, 900)
    },
    hasMarks: () => marked.current,
  }))

  // Keep the backing store matched to the stage size.
  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const fit = () => {
      const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1)
      const w = Math.round(c.offsetWidth * dpr)
      const h = Math.round(c.offsetHeight * dpr)
      if (c.width === w && c.height === h) return
      // Keep what's drawn when the window changes size.
      let snapshot: HTMLCanvasElement | null = null
      if (marked.current && c.width && c.height) {
        snapshot = document.createElement('canvas')
        snapshot.width = c.width
        snapshot.height = c.height
        snapshot.getContext('2d')!.drawImage(c, 0, 0)
      }
      c.width = w
      c.height = h
      if (snapshot) c.getContext('2d')!.drawImage(snapshot, 0, 0, w, h)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(c)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const c = canvasRef.current
    if (!c || !active) return
    const ctx = c.getContext('2d')!
    let last: { x: number; y: number } | null = null
    let id = -1

    const toLocal = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      return {
        x: ((e.clientX - r.left) / r.width) * c.width,
        y: ((e.clientY - r.top) / r.height) * c.height,
        // chalk width follows the size of the photo on screen
        unit: c.width / 1600,
      }
    }

    const grain = (x: number, y: number, r: number) => {
      // denser in the middle of the stroke, ragged at the edges
      const n = 7
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2
        const d = Math.pow(Math.random(), 0.7) * r
        const s = (0.7 + Math.random() * 1.6) * (r / 6)
        ctx.globalAlpha = 0.28 + Math.random() * 0.6 * (1 - d / r / 1.6)
        ctx.fillRect(x + Math.cos(a) * d, y + Math.sin(a) * d, s, s * (0.6 + Math.random() * 0.8))
      }
    }

    const draw = (e: PointerEvent) => {
      const p = toLocal(e)
      const r = 7.5 * p.unit * (e.pointerType === 'touch' ? 1.3 : 1)
      ctx.fillStyle = inkRef.current
      if (!last) {
        grain(p.x, p.y, r)
      } else {
        const dx = p.x - last.x
        const dy = p.y - last.y
        const dist = Math.hypot(dx, dy)
        const steps = Math.max(1, Math.ceil(dist / (r * 0.35)))
        for (let i = 1; i <= steps; i++) grain(last.x + (dx * i) / steps, last.y + (dy * i) / steps, r)
      }
      ctx.globalAlpha = 1
      last = { x: p.x, y: p.y }
      if (!marked.current) {
        marked.current = true
        onStroke?.()
      }
    }

    const down = (e: PointerEvent) => {
      if (id !== -1) return
      id = e.pointerId
      c.setPointerCapture(id)
      last = null
      draw(e)
    }
    const move = (e: PointerEvent) => {
      if (e.pointerId !== id) return
      // coalesced events keep fast strokes continuous
      const list = e.getCoalescedEvents?.() ?? [e]
      ;(list.length ? list : [e]).forEach(draw)
    }
    const up = (e: PointerEvent) => {
      if (e.pointerId !== id) return
      id = -1
      last = null
    }

    c.addEventListener('pointerdown', down)
    c.addEventListener('pointermove', move)
    c.addEventListener('pointerup', up)
    c.addEventListener('pointercancel', up)
    return () => {
      c.removeEventListener('pointerdown', down)
      c.removeEventListener('pointermove', move)
      c.removeEventListener('pointerup', up)
      c.removeEventListener('pointercancel', up)
    }
  }, [active, onStroke])

  return <canvas ref={canvasRef} className={`chalk-layer${active ? ' is-active' : ''}`} aria-hidden="true" />
}
