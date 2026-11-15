/**
 * Hand-drawn chalk marks used across chapters. Every path uses
 * pathLength=1 so CSS can draw it on with stroke-dashoffset.
 */

/** A loose loop drawn around a word or phrase. */
export function ChalkCircle({ className = '' }: { className?: string }) {
  return (
    <svg className={`chalk-mark chalk-mark--circle ${className}`} viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
      <path
        pathLength={1}
        d="M262 22C214 4 98 2 40 22 6 34 2 62 30 78c40 22 170 22 230 4 34-10 44-34 18-52-22-15-68-20-108-20"
      />
    </svg>
  )
}

/** A quick double underline. */
export function ChalkUnderline({ className = '' }: { className?: string }) {
  return (
    <svg className={`chalk-mark chalk-mark--underline ${className}`} viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true">
      <path pathLength={1} d="M4 12c60-6 180-10 292-4" />
      <path pathLength={1} d="M30 24c70-5 160-7 240-3" />
    </svg>
  )
}

/** A rough chalk edge that joins one chapter's ground onto the one above it. */
export function ChalkEdge({ variant = 0 }: { variant?: 0 | 1 | 2 }) {
  const d = [
    'M0 40C90 22 160 30 260 18s180-14 290 4 170 22 290 6 200-26 300-12 160 18 300 6V60H0Z',
    'M0 28c120 14 220 18 330 4s190-24 300-8 170 26 300 14 230-20 360-6 110 8 150 2V60H0Z',
    'M0 22c80 18 170 22 270 10s210-20 320 0 180 24 290 10 220-22 340-10 160 16 220 8V60H0Z',
  ][variant]
  return (
    <svg className="chalk-edge" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}
