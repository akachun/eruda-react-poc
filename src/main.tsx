import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import eruda from 'eruda'
import './index.css'
import App from './App'

const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
const forceDebug = new URLSearchParams(window.location.search).get('debug') === '1'
const enableEruda = isMobile || forceDebug

if (enableEruda) {
  eruda.init({
    defaults: {
      theme: 'Light',
      transparency: 0.95,
      displaySize: 85,
    },
  })

  // Minimal customization: keep default floating button, tweak color only.
  eruda.util.evalCss(`
    .eruda-entry-btn {
      background: linear-gradient(135deg, #5f8fce, #72b7e8) !important;
      color: #f5faff !important;
      border-radius: 10px !important;
      box-shadow: 0 0 10px rgba(95, 143, 206, 0.45) !important;
    }
  `)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
