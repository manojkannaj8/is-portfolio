import { useEffect, useRef, useState } from 'react'

/**
 * True once the element has been seen (and stays true). Used to start
 * one-time drawings, never to hide content: everything is visible by
 * default and only the decoration waits for the visitor.
 */
export function useSeen<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen, threshold])
  return [ref, seen] as const
}
