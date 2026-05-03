import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DealsProvider } from './context/DealsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DealsProvider>
      <App />
    </DealsProvider>
  </StrictMode>,
)
