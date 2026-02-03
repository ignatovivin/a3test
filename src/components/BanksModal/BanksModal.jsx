/**
 * Модальное окно «Подключенные банки» — Figma node 219-8005.
 * Открывается по кнопкам «Все» и «Подключить банк».
 */

import { useEffect } from 'react'
import { Button } from '../Button/Button'

const CONNECTED_BANKS = [
  { name: 'Альфа-Банк', logo: '/bank-alfa.svg' },
  { name: 'Озон-Банк', logo: '/bank-ozon.svg' },
  { name: 'Тбанк', logo: '/bank-tbank.svg' },
  { name: 'Райффайзен', logo: '/bank-raiff.svg' },
  { name: 'ВТБ', logo: '/bank-vtb.svg' },
]

const AVAILABLE_BANKS = [
  { name: 'ПСБ' },
  { name: 'Почта Банк' },
  { name: 'Точка Банк' },
  { name: 'Газпромбанк' },
  { name: 'Модульбанк' },
]

export function BanksModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="banks-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="banks-modal-title"
    >
      <div
        className="banks-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="banks-modal__header">
          <h2 id="banks-modal-title" className="banks-modal__title">
            Подключенные банки
          </h2>
          <button
            type="button"
            className="banks-modal__close"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="banks-modal__spacer" aria-hidden />

        <div className="banks-modal__content">
          <div className="banks-modal__section">
            <div className="banks-modal__bank-rows">
              {[CONNECTED_BANKS.slice(0, 3), CONNECTED_BANKS.slice(3, 5)].map((row, rowIndex) => (
                <div key={rowIndex} className="banks-modal__row">
                  {row.map((bank) => (
                    <div key={bank.name} className="banks-modal__card banks-modal__card--connected">
                      <div className="banks-modal__card-logo" aria-hidden>
                        <img src={bank.logo} alt="" width="32" height="32" />
                      </div>
                      <span className="banks-modal__card-name">{bank.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="banks-modal__section banks-modal__section--available">
            <div className="banks-modal__section-head">
              <h3 className="banks-modal__section-title">Банки доступные к подключению</h3>
              <p className="banks-modal__section-subtitle">Выберите один или несколько</p>
            </div>
            <div className="banks-modal__bank-rows">
              {[AVAILABLE_BANKS.slice(0, 3), AVAILABLE_BANKS.slice(3, 5)].map((row, rowIndex) => (
                <div key={rowIndex} className="banks-modal__row">
                  {row.map((bank) => (
                    <button
                      key={bank.name}
                      type="button"
                      className="banks-modal__card banks-modal__card--available"
                    >
                      <span className="banks-modal__card-logo banks-modal__card-logo--placeholder" aria-hidden>
                        {bank.name.charAt(0)}
                      </span>
                      <span className="banks-modal__card-name">{bank.name}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <Button type="button" variant="primary" size="m" className="banks-modal__submit">
            Подключить
          </Button>
        </div>
      </div>
    </div>
  )
}
