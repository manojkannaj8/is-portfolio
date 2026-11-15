import { useEffect, useRef, useState } from 'react'

/**
 * True while the element is on (or near) the screen. Scenes use it to
 * start and stop their animation loops so nothing off-screen costs frames.
 */
export function useVisible<T extends Element>(margin = '200px') {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return [ref, visible] as const
}
