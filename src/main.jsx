import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ModuleRegistry, AllCommunityModule } from 'ag-charts-community'
import './assets/fonts/fonts.css'
import './index.css'
import './styles/design-tokens.css'
import './styles/cabinet.css'
import App from './App.jsx'

// Регистрация модулей AG Charts
ModuleRegistry.registerModules([AllCommunityModule])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
