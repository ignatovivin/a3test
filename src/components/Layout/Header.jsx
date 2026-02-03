import { useState, useEffect, useRef } from 'react'
import { NotificationIcon } from '../icons/NotificationIcon'
import { PersonalIcon } from '../icons/PersonalIcon'
import { ArrowDownIcon } from '../icons/ArrowDownIcon'

const DROPDOWN_OPTIONS = [
  { id: '1', label: 'Заявка № 12345' },
  { id: '2', label: 'Договор № 67890' },
  { id: '3', label: 'Заявка № 11111' },
]

export function Header({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (!dropdownOpen) return
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [dropdownOpen])

  const displayLabel = selectedOption ? selectedOption.label : 'Выберите заявку или договор'

  return (
    <div className="cabinet-header-wrap">
      <div className="cabinet-header__bg" aria-hidden="true" />
      <header className="cabinet-header">
        <div className="cabinet-header__top">
          <div className="cabinet-header__left">
            <div className="cabinet-header__menu-wrap">
              {onMenuClick && (
                <button
                  type="button"
                  className="cabinet-header__menu-btn"
                  onClick={onMenuClick}
                  aria-label="Открыть меню"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              )}
            </div>
            <div className="cabinet-header__tags">
              <img
                src="/tags.svg"
                alt="a3 личный кабинет"
                className="cabinet-header__logo"
                width="191"
                height="44"
              />
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
            <button type="button" aria-label="Уведомления" className="cabinet-header__icon-btn">
              <NotificationIcon />
            </button>
            <button type="button" aria-label="Профиль" className="cabinet-header__icon-btn cabinet-header__profile">
              <PersonalIcon />
              <ArrowDownIcon />
            </button>
          </div>
        </div>
      </header>
      <hr className="cabinet-header__divider" />
    </div>
  )
}
