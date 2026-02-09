import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CabinetLayout } from './components/Layout/CabinetLayout'
import { Dashboard } from './pages/Dashboard'
import { placeholderRoutes } from './constants/routes'

const PlaceholderPage = lazy(() =>
  import('./pages/PlaceholderPage').then((m) => ({ default: m.PlaceholderPage }))
)

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
