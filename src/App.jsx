import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CabinetLayout } from './components/Layout/CabinetLayout'
import { Dashboard } from './pages/Dashboard'

const PlaceholderPage = lazy(() =>
  import('./pages/PlaceholderPage').then((m) => ({ default: m.PlaceholderPage }))
)

const placeholderRoutes = [
  { path: 'request', title: 'Оставить заявку', description: 'Форма заявки.' },
  { path: 'payments', title: 'Реестры платежей', description: 'Реестры платежей.' },
  { path: 'accruals', title: 'Реестры начислений', description: 'Реестры начислений.' },
  { path: 'history', title: 'История платежей', description: 'История платежей.' },
  { path: 'widget', title: 'Платежный виджет', description: 'Платежный виджет.' },
  { path: 'validation', title: 'Настройка валидации', description: 'Настройка валидации.' },
  { path: 'notifications', title: 'Уведомления', description: 'Раздел уведомлений.' },
]

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<CabinetLayout />}>
            <Route index element={<Dashboard />} />
            {placeholderRoutes.map(({ path, title, description }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense fallback={null}>
                    <PlaceholderPage title={title} description={description} />
                  </Suspense>
                }
              />
            ))}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
