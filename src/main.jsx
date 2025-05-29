import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ScoreProvider } from './contexts/ScoreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScoreProvider>
        <App />
        <ToastContainer position="top-right" autoClose={5000} />
      </ScoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
