import { useEffect, useRef, useState } from 'react'

type State = 'idle' | 'copied' | 'failed'

/**
 * A small chalk button beside the email address. It copies the address,
 * draws a tick and says so, then quietly resets.
 */
export function CopyEmail({ email, labels }: { email: string; labels: { copy: string; copied: string; copyFailed: string } }) {
  const [state, setState] = useState<State>('idle')
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    let ok = false
    try {
      await navigator.clipboard.writeText(email)
      ok = true
    } catch {
      // Older browsers or blocked permission: fall back to a hidden textarea.
      const t = document.createElement('textarea')
      t.value = email
      t.setAttribute('readonly', '')
      t.style.position = 'fixed'
      t.style.opacity = '0'
      document.body.appendChild(t)
      t.select()
      try {
        ok = document.execCommand('copy')
      } catch {
        ok = false
      }
      t.remove()
    }
    setState(ok ? 'copied' : 'failed')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), ok ? 1800 : 3200)
  }

  return (
    <button type="button" className={`copy-btn is-${state}`} onClick={copy} aria-label={`Copy ${email}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g className="copy-icon">
          <rect x="8" y="8" width="11" height="12" rx="2.5" />
          <path d="M5 15.5V6.5A2.5 2.5 0 0 1 7.5 4H15" />
        </g>
        <path className="copy-tick" pathLength={1} d="M5 12.5l4.5 4.5L19 7" />
      </svg>
      <span className="sr-only" aria-live="polite">
        {state === 'copied' ? labels.copied : state === 'failed' ? labels.copyFailed : ''}
      </span>
      <span className="copy-labels" aria-hidden="true">
        <span className="copy-label copy-label--idle">{labels.copy}</span>
        <span className="copy-label copy-label--copied">{labels.copied}</span>
        <span className="copy-label copy-label--failed">{labels.copyFailed}</span>
      </span>
    </button>
  )
}
