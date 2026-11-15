import { useId } from 'react'

/**
 * A word written on the grass in chalk. The fill is broken up by noise so
 * it has the grain of real chalk; a soft-edged mask sweeps across to
 * write it on when `written` turns true (see .chalk-name in landing.css).
 */
export function ChalkName({ text, written }: { text: string; written: boolean }) {
  const uid = useId().replace(/:/g, '')
  const grain = `grain-${uid}`

  return (
    <svg
      className={`chalk-name${written ? ' is-written' : ''}`}
      viewBox="0 0 560 200"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={grain} x="-4%" y="-8%" width="108%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6"
            result="holes"
          />
          <feComposite in="SourceGraphic" in2="holes" operator="in" result="chalky" />
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="2" result="warp" />
          <feDisplacementMap in="chalky" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g>
        {/* faint smudge where the chalk dust settles */}
        <text className="chalk-name-dust" x="14" y="150" textLength="528" lengthAdjust="spacingAndGlyphs">
          {text}
        </text>
        <text
          className="chalk-name-ink"
          x="14"
          y="150"
          textLength="528"
          lengthAdjust="spacingAndGlyphs"
          filter={`url(#${grain})`}
        >
          {text}
        </text>
      </g>
    </svg>
  )
}
