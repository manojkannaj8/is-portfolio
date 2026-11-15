import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/mansalva/400.css'
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/chapters.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
