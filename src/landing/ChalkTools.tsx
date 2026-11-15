import { landing } from '../content/portfolio'
import { CHALKS } from './world'

interface ChalkToolsProps {
  drawing: boolean
  ink: string
  onToggle: () => void
  onInk: (value: string) => void
  onWash: () => void
}

/** Pick up a stick of chalk, choose a colour, wash the grass clean. */
export function ChalkTools({ drawing, ink, onToggle, onInk, onWash }: ChalkToolsProps) {
  return (
    <div className={`tools${drawing ? ' is-drawing' : ''}`}>
      {drawing && (
        <div className="tools-tray">
          <div className="inks" role="radiogroup" aria-label="Chalk colour">
            {CHALKS.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={ink === c.value}
                aria-label={c.label}
                className="ink"
                style={{ '--c': c.value } as React.CSSProperties}
                onClick={() => onInk(c.value)}
              />
            ))}
          </div>
          <button type="button" className="tool-link" onClick={onWash}>
            {landing.washAway}
          </button>
        </div>
      )}
      <button type="button" className="chalk-toggle" aria-pressed={drawing} onClick={onToggle}>
        <ChalkStick ink={ink} lifted={drawing} />
        <span className="chalk-toggle-text">
          <span>{drawing ? landing.chalkOff : landing.chalkOn}</span>
          {drawing && <span className="chalk-hint">{landing.chalkHint}</span>}
        </span>
      </button>
    </div>
  )
}

function ChalkStick({ ink, lifted }: { ink: string; lifted: boolean }) {
  return (
    <svg className={`stick${lifted ? ' is-lifted' : ''}`} viewBox="0 0 48 48" aria-hidden="true">
      <g transform="rotate(-38 24 24)">
        <rect x="8" y="18" width="32" height="12" rx="3" fill={ink} />
        <rect x="8" y="18" width="32" height="12" rx="3" fill="url(#stick-shade)" />
        <path d="M37 18c2 1.5 3 3.5 3 6s-1 4.5-3 6" fill="none" stroke="rgb(0 0 0 / .25)" strokeWidth="1.2" />
        <path d="M14 21h9M12 26h6" stroke="rgb(255 255 255 / .55)" strokeWidth="1.4" strokeLinecap="round" />
      </g>
      <defs>
        <linearGradient id="stick-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".25" />
          <stop offset="1" stopColor="#000" stopOpacity=".25" />
        </linearGradient>
      </defs>
    </svg>
  )
}
