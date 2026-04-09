import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

function showFatalError(message) {
  const root = document.getElementById('root')
  if (!root || root.dataset.errorShown) return
  root.dataset.errorShown = 'true'
  const escaped = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  root.innerHTML = `<div style="padding:2rem;font-family:sans-serif;color:#b63f1d"><h2>Erro ao carregar o aplicativo</h2><pre style="white-space:pre-wrap;font-size:0.85rem">${escaped}</pre></div>`
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    console.error('ErrorBoundary caught:', error)
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', color: '#b63f1d' }}>
          <h2>Erro ao carregar o aplicativo</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}>
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

try {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  )
} catch (err) {
  console.error('Failed to mount React app:', err)
  showFatalError(String(err?.message || err))
}
