import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { lockBodyScroll, unlockBodyScroll } from '../../utils/bodyScrollLock'
import { NotificationIcon } from '../icons/NotificationIcon'
import { PersonalIcon } from '../icons/PersonalIcon'
import { ArrowDownIcon } from '../icons/ArrowDownIcon'
import { LogoutIcon } from '../icons/LogoutIcon'
import { ServiceCaptionIcon } from '../icons/ServiceCaptionIcon'
import { Button } from '../Button/Button'
import { navItems } from './Sidebar'
import { FlatIcon } from '../icons/FlatIcon'
import { NewIcon } from '../icons/NewIcon'
import { SettingIcon } from '../icons/SettingIcon'
import { CashIcon } from '../icons/CashIcon'
import { PaymentIcon } from '../icons/PaymentIcon'
import { QrIcon } from '../icons/QrIcon'
import { CalendarIcon } from '../icons/CalendarIcon'

const DROPDOWN_OPTIONS = [
  { id: '1', label: 'Заявка № 12345' },
  { id: '2', label: 'Договор № 67890' },
  { id: '3', label: 'Заявка № 11111' },
]

function MenuLinkIcon({ icon }) {
  if (icon === 'flat') return <FlatIcon className="cabinet-header__menu-item-icon" />
  if (icon === 'new') return <NewIcon className="cabinet-header__menu-item-icon" />
  if (icon === 'setting') return <SettingIcon className="cabinet-header__menu-item-icon" />
  if (icon === 'cash') return <CashIcon className="cabinet-header__menu-item-icon" />
  if (icon === 'payment') return <PaymentIcon className="cabinet-header__menu-item-icon" />
  if (icon === 'qr') return <QrIcon className="cabinet-header__menu-item-icon" />
  if (icon === 'calendar') return <CalendarIcon className="cabinet-header__menu-item-icon" />
  return null
}

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const dropdownRef = useRef(null)
  const menuDropdownRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!dropdownOpen) return
    const handleClickOutside = (e) => {
      const inHeader = dropdownRef.current?.contains(e.target)
      const inPanel = menuDropdownRef.current?.contains(e.target)
      if (!inHeader && !inPanel) setDropdownOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [dropdownOpen])

  useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    lockBodyScroll()
    return () => {
      document.removeEventListener('click', handleClickOutside)
      unlockBodyScroll()
    }
  }, [menuOpen])

  const displayLabel = selectedOption ? selectedOption.label : 'Выберите заявку или договор'

  return (
    <div className="cabinet-header-wrap">
      <div className="cabinet-header__bg" aria-hidden="true" />
      <header className="cabinet-header">
        <div className="cabinet-header__top">
          <div className="cabinet-header__left">
            <div className="cabinet-header__tags">
              <Link to="/" className="cabinet-header__logo-link" aria-label="На главную">
                <img
                  src="/tags.svg"
                  alt="a3 личный кабинет"
                  className="cabinet-header__logo"
                  width="191"
                  height="44"
                />
              </Link>
            </div>
            <div className="cabinet-header__dropdown-wrap" ref={dropdownRef}>
              <button
                type="button"
                className={`cabinet-header__dropdown ${dropdownOpen ? 'is-open' : ''}`}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                aria-controls="header-dropdown-list"
                id="header-dropdown-button"
                onClick={() => setDropdownOpen((v) => !v)}
              >
                <span>{displayLabel}</span>
                <ArrowDownIcon />
              </button>
              {dropdownOpen && (
                <div
                  className="cabinet-header__dropdown-panel"
                  role="listbox"
                  id="header-dropdown-list"
                  aria-labelledby="header-dropdown-button"
                >
                  <ul className="cabinet-header__dropdown-list">
                    {DROPDOWN_OPTIONS.map((opt) => (
                      <li key={opt.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={selectedOption?.id === opt.id}
                          className="cabinet-header__dropdown-item"
                          onClick={() => {
                            setSelectedOption(opt)
                            setDropdownOpen(false)
                          }}
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="cabinet-header__icons">
            <Link to="/notifications" aria-label="Уведомления" className="cabinet-header__icon-btn">
              <NotificationIcon />
            </Link>
            <button type="button" aria-label="Профиль" className="cabinet-header__icon-btn cabinet-header__profile">
              <PersonalIcon />
              <ArrowDownIcon />
            </button>
            <div className="cabinet-header__menu-wrap" ref={menuRef}>
              <button
                type="button"
                className="cabinet-header__icon-btn cabinet-header__menu-btn cabinet-header__menu-btn--right"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                aria-controls="header-menu-list"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path fillRule="evenodd" clipRule="evenodd" d="M22 5.25H2V6.75H22V5.25ZM2 11.25H22V12.75H2V11.25ZM2 17.25H22V18.75H2V17.25Z" fill="currentColor" />
                </svg>
              </button>
              {menuOpen && (
                <div
                  className="cabinet-header__menu-panel"
                  id="header-menu-list"
                  role="menu"
                  aria-label="Навигация"
                >
                  <div className="cabinet-header__menu-body">
                    <div className="cabinet-header__menu-dropdown-wrap" ref={menuDropdownRef}>
                      <button
                        type="button"
                        className={`cabinet-header__menu-dropdown ${dropdownOpen ? 'is-open' : ''}`}
                        aria-haspopup="listbox"
                        aria-expanded={dropdownOpen}
                        aria-controls="header-menu-dropdown-list"
                        onClick={() => setDropdownOpen((v) => !v)}
                      >
                        <span>{displayLabel}</span>
                        <ArrowDownIcon />
                      </button>
                      {dropdownOpen && (
                        <div
                          className="cabinet-header__menu-dropdown-panel"
                          role="listbox"
                          id="header-menu-dropdown-list"
                        >
                          <ul className="cabinet-header__dropdown-list">
                            {DROPDOWN_OPTIONS.map((opt) => (
                              <li key={opt.id}>
                                <button
                                  type="button"
                                  role="option"
                                  aria-selected={selectedOption?.id === opt.id}
                                  className="cabinet-header__dropdown-item"
                                  onClick={() => {
                                    setSelectedOption(opt)
                                    setDropdownOpen(false)
                                  }}
                                >
                                  {opt.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <ul className="cabinet-header__menu-list">
                      {navItems.map(({ to, label, end, icon }) => (
                        <li key={to} role="none">
                          <NavLink
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                              `cabinet-header__menu-item ${isActive ? 'cabinet-header__menu-item--active' : ''}`
                            }
                            onClick={() => setMenuOpen(false)}
                            role="menuitem"
                          >
                            <MenuLinkIcon icon={icon} />
                            {label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                    <hr className="cabinet-header__menu-divider" />
                    <div className="cabinet-header__menu-account">
                      <button
                        type="button"
                        className="cabinet-header__menu-item"
                        onClick={() => setMenuOpen(false)}
                        role="menuitem"
                      >
                        <PersonalIcon className="cabinet-header__menu-item-icon" />
                        Аккаунт
                      </button>
                      <button
                        type="button"
                        className="cabinet-header__menu-item"
                        onClick={() => setMenuOpen(false)}
                        role="menuitem"
                      >
                        <LogoutIcon className="cabinet-header__menu-item-icon" />
                        Выйти
                      </button>
                    </div>
                    <div className="cabinet-header__menu-footer">
                      <Button type="button" variant="secondary" className="cabinet-header__menu-btn">
                        Задать вопрос
                      </Button>
                      <div className="cabinet-header__menu-caption-wrap">
                        <span className="cabinet-header__menu-caption-icon" aria-hidden>
                          <ServiceCaptionIcon />
                        </span>
                        <p className="cabinet-header__menu-caption">
                          Услуга оказывается Платежным сервисом А3
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <hr className="cabinet-header__divider" />
    </div>
  )
}
