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

const navItems = [
  { to: '/', label: 'Главная', end: true, icon: 'flat' },
  { to: '/request', label: 'Оставить заявку', end: false, icon: 'new' },
  { to: '/payments', label: 'Реестры платежей', end: false, icon: 'payment' },
  { to: '/accruals', label: 'Реестры начислений', end: false, icon: 'cash' },
  { to: '/history', label: 'История платежей', end: false, icon: 'calendar' },
  { to: '/widget', label: 'Платежный виджет', end: false, icon: 'qr' },
  { to: '/validation', label: 'Настройка валидации', end: false, icon: 'setting' },
]

export function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`cabinet-sidebar ${isOpen ? 'is-open' : ''}`}
      aria-label="Навигация"
    >
      <nav className="cabinet-sidebar__nav">
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
