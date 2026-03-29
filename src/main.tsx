import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TranslationProvider } from './useTranslation.tsx'
import { SettingsProvider } from './components/SettingsContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TranslationProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </TranslationProvider>
  </React.StrictMode>
)