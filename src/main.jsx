import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import eruda from 'eruda'
import './index.css'
import App from './App.jsx'

const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
const forceDebug = new URLSearchParams(window.location.search).get('debug') === '1'
const enableEruda = isMobile || forceDebug

window.__ERUDA_ENABLED__ = enableEruda

if (enableEruda) {
  eruda.init({
    useShadowDom: true,
  })
  window.__ERUDA__ = eruda
  console.log('[Eruda] enabled (shadow dom on)')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
