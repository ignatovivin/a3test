import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function CabinetLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="page-layout">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="cabinet">
        {sidebarOpen && (
          <button
            type="button"
            className="cabinet-sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            aria-label="Закрыть меню"
          />
        )}
        <div className="cabinet__body">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="cabinet-main">
            <div className="cabinet-content">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
