import React from 'react'
import ReactDOM from 'react-dom/client'
import { initDataLayer } from './utils/tracking'
import { loadGTM } from './utils/gtm'
import { loadGA4 } from './utils/ga4'
import App from './App'

initDataLayer()
loadGTM()
loadGA4()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
