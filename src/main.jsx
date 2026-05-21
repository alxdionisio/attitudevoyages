import React from 'react'
import ReactDOM from 'react-dom/client'
import { initDataLayer } from './utils/tracking'
import { loadGTM } from './utils/gtm'
import { loadGA4 } from './utils/ga4'
import App from './App'

// dataLayer doit être prêt avant tout événement, mais GTM/GA4 sont différés
// pour libérer le thread principal et améliorer LCP/INP.
initDataLayer()

function scheduleAnalytics() {
  const run = () => {
    loadGTM()
    loadGA4()
  }
  if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(run, { timeout: 4000 })
  } else {
    setTimeout(run, 1500)
  }
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') scheduleAnalytics()
  else window.addEventListener('load', scheduleAnalytics, { once: true })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
