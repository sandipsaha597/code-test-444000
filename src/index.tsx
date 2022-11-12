import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AppProvider from './AppContext/AppContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    {/* Using react router v6. It's smaller and better than v5 */}
    <BrowserRouter>
      {/* Using context API because the app is small. Redux would have been an overkill */}
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
