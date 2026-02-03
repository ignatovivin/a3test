import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function CabinetLayout() {
  return (
    <div className="page-layout">
      <Header />
      <div className="cabinet">
        <div className="cabinet__body">
          <Sidebar isOpen={false} onClose={() => {}} />
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
