import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CabinetLayout } from './components/Layout/CabinetLayout'
import { Dashboard } from './pages/Dashboard'
import { PlaceholderPage } from './pages/PlaceholderPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
      <Routes>
        <Route path="/" element={<CabinetLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="request" element={<PlaceholderPage title="Оставить заявку" description="Форма заявки." />} />
          <Route path="payments" element={<PlaceholderPage title="Реестры платежей" description="Реестры платежей." />} />
          <Route path="accruals" element={<PlaceholderPage title="Реестры начислений" description="Реестры начислений." />} />
          <Route path="history" element={<PlaceholderPage title="История платежей" description="История платежей." />} />
          <Route path="widget" element={<PlaceholderPage title="Платежный виджет" description="Платежный виджет." />} />
          <Route path="validation" element={<PlaceholderPage title="Настройка валидации" description="Настройка валидации." />} />
        </Route>
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
