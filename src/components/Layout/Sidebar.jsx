import { NavLink } from 'react-router-dom'
import { Button } from '../Button/Button'
import { ServiceCaptionIcon } from '../icons/ServiceCaptionIcon'
import { SettingIcon } from '../icons/SettingIcon'
import { CashIcon } from '../icons/CashIcon'
import { PaymentIcon } from '../icons/PaymentIcon'
import { QrIcon } from '../icons/QrIcon'
import { CalendarIcon } from '../icons/CalendarIcon'
import { FlatIcon } from '../icons/FlatIcon'
import { NewIcon } from '../icons/NewIcon'
import { PersonalIcon } from '../icons/PersonalIcon'
import { navItems } from './navItems'

export function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`cabinet-sidebar ${isOpen ? 'is-open' : ''}`}
      aria-label="Навигация"
    >
      <nav className="cabinet-sidebar__nav">
        {/* Профиль — на планшете/мобиле перенесён из шапки в меню бургера */}
        <div className="cabinet-sidebar__profile-entry">
          <button
            type="button"
            className="cabinet-sidebar__link cabinet-sidebar__profile-btn"
            onClick={onClose}
            aria-label="Профиль"
          >
            <PersonalIcon className="cabinet-sidebar__link-icon" />
            Профиль
          </button>
        </div>
        {navItems.map(({ to, label, end, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `cabinet-sidebar__link ${isActive ? 'cabinet-sidebar__link--active' : ''}`
            }
            onClick={onClose}
          >
            {icon === 'flat' && <FlatIcon className="cabinet-sidebar__link-icon" />}
            {icon === 'new' && <NewIcon className="cabinet-sidebar__link-icon" />}
            {icon === 'setting' && <SettingIcon className="cabinet-sidebar__link-icon" />}
            {icon === 'cash' && <CashIcon className="cabinet-sidebar__link-icon" />}
            {icon === 'payment' && <PaymentIcon className="cabinet-sidebar__link-icon" />}
            {icon === 'qr' && <QrIcon className="cabinet-sidebar__link-icon" />}
            {icon === 'calendar' && <CalendarIcon className="cabinet-sidebar__link-icon" />}
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="cabinet-sidebar__footer">
        <Button type="button" variant="secondary" className="cabinet-sidebar__btn">
          Задать вопрос
        </Button>
        <div className="cabinet-sidebar__caption-wrap">
          <span className="cabinet-sidebar__caption-icon" aria-hidden>
            <ServiceCaptionIcon />
          </span>
          <p className="cabinet-sidebar__caption">
            Услуга оказывается Платежным сервисом А3
          </p>
        </div>
      </div>
    </aside>
  )
}
