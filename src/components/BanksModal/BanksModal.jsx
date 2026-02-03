/**
 * Модальное окно «Подключенные банки» — Figma node 219-8005.
 * Открывается по кнопкам «Все» и «Подключить банк».
 */

import { useEffect, useState } from 'react'
import { Button } from '../Button/Button'

const CONNECTED_BANKS = [
  { name: 'Альфа-Банк', logo: '/bank-alfa.svg' },
  { name: 'Озон-Банк', logo: '/bank-ozon.svg' },
  { name: 'Тбанк', logo: '/bank-tbank.svg' },
  { name: 'Райффайзен', logo: '/bank-raiff.svg' },
  { name: 'ВТБ', logo: '/bank-vtb.svg' },
]

const AVAILABLE_BANKS = [
  { id: 'psb', name: 'ПСБ', logo: '/bank-psb.svg' },
  { id: 'pochta', name: 'Почта Банк', logo: '/bank-pochta.svg' },
  { id: 'tochka', name: 'Точка Банк', logo: '/bank-tochka.svg' },
  { id: 'gazprom', name: 'Газпромбанк', logo: '/bank-gazprom.svg' },
  { id: 'modulbank', name: 'Модульбанк', logo: '/bank-modulbank.svg' },
]

export function BanksModal({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedBankIds, setSelectedBankIds] = useState([])

  const toggleBank = (id) => {
    setSelectedBankIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const handleSubmit = () => {
    const selectedBanks = AVAILABLE_BANKS.filter((bank) =>
      selectedBankIds.includes(bank.id),
    )
    // Здесь позже можно заменить на реальный вызов API
    // или колбэк из пропсов, сейчас просто логируем.
    // eslint-disable-next-line no-console
    console.log('Banks to connect:', selectedBanks)
    setShowSuccess(true)
  }

  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)
    setTimeout(() => {
      setShowSuccess(false)
      setSelectedBankIds([])
      setIsClosing(false)
      onClose()
    }, 200)
  }
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleClose])

  if (!isOpen && !isClosing) return null

  return (
    <div
      className={`banks-modal-overlay${isClosing ? ' banks-modal-overlay--closing' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={showSuccess ? 'banks-modal-success-title' : 'banks-modal-title'}
    >
      <div
        className={
          `banks-modal${showSuccess ? ' banks-modal--success' : ''}` +
          (isClosing ? ' banks-modal--closing' : '')
        }
        onClick={(e) => e.stopPropagation()}
      >
        {!showSuccess && (
          <header className="banks-modal__header">
            <h2 id="banks-modal-title" className="banks-modal__title">
              Подключенные банки
            </h2>
            <button
              type="button"
              className="banks-modal__close"
              onClick={handleClose}
              aria-label="Закрыть"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </header>
        )}

        <div className="banks-modal__spacer" aria-hidden />

        {showSuccess ? (
          <div className="banks-modal__content banks-modal__content--success">
            <div className="banks-modal__success-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17L4 12" />
              </svg>
            </div>
            <div className="banks-modal__success-text-block">
              <h3 id="banks-modal-success-title" className="banks-modal__success-title">Заявка отправлена</h3>
              <p className="banks-modal__success-text">
                Мы получили запрос на подключение выбранных банков. После обработки они появятся в списке подключённых.
              </p>
            </div>
            <Button
              type="button"
              variant="primary"
              size="m"
              className="banks-modal__submit"
              onClick={handleClose}
            >
              Хорошо
            </Button>
          </div>
        ) : (
          <div className="banks-modal__content">
            <div className="banks-modal__section">
              <div className="banks-modal__bank-rows">
                {[CONNECTED_BANKS.slice(0, 4), CONNECTED_BANKS.slice(4)].map((row, rowIndex) => (
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
                {[AVAILABLE_BANKS.slice(0, 4), AVAILABLE_BANKS.slice(4)].map((row, rowIndex) => (
                  <div key={rowIndex} className="banks-modal__row">
                    {row.map((bank) => {
                      if (!bank) return null
                      const isSelected = selectedBankIds.includes(bank.id)
                      return (
                        <button
                          key={bank.id}
                          type="button"
                          className={
                            `banks-modal__card banks-modal__card--available` +
                            (isSelected ? ' banks-modal__card--available-selected' : '')
                          }
                          onClick={() => toggleBank(bank.id)}
                          aria-pressed={isSelected ? 'true' : 'false'}
                        >
                          {bank.logo ? (
                            <span className="banks-modal__card-logo" aria-hidden>
                              <img src={bank.logo} alt="" width="32" height="32" />
                            </span>
                          ) : (
                            <span className="banks-modal__card-logo banks-modal__card-logo--placeholder" aria-hidden>
                              {bank.name.charAt(0)}
                            </span>
                          )}
                          <span className="banks-modal__card-name">{bank.name}</span>
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              size="m"
              className="banks-modal__submit"
              disabled={selectedBankIds.length === 0}
              onClick={handleSubmit}
            >
              Подключить
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
