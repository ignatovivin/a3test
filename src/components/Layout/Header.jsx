import { NotificationIcon } from '../icons/NotificationIcon'
import { PersonalIcon } from '../icons/PersonalIcon'
import { ArrowDownIcon } from '../icons/ArrowDownIcon'

export function Header({ onMenuClick }) {
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
            <button type="button" className="cabinet-header__dropdown" aria-haspopup="listbox" aria-expanded="false">
              Выберите заявку или договор
              <ArrowDownIcon />
            </button>
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
