import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import eruda from 'eruda'
import './index.css'
import App from './App.jsx'

const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
const forceDebug = new URLSearchParams(window.location.search).get('debug') === '1'

if (isMobile || forceDebug) {
  eruda.init()
  console.log('[Eruda] mobile debug console enabled')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
