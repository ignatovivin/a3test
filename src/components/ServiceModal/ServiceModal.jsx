import { createPortal } from 'react-dom'
import { useState, useEffect, useCallback } from 'react'
import { Button } from '../Button/Button'
import { CloseIcon } from '../icons/CloseIcon'
import { lockBodyScroll, unlockBodyScroll } from '../../utils/bodyScrollLock'
import { MODAL_CLOSE_DELAY_MS } from '../../constants/timing'

export function ServiceModal({ service, onClose, onToggle }) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = useCallback(() => {
    if (isClosing) return
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, MODAL_CLOSE_DELAY_MS)
  }, [isClosing, onClose])

  useEffect(() => {
    if (!service) return
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleEscape)
    lockBodyScroll()
    return () => {
      document.removeEventListener('keydown', handleEscape)
      unlockBodyScroll()
    }
  }, [service, handleClose])

  if (!service && !isClosing) return null

  const isConnected = service?.bage === 'Подключена'
  const descriptionText = service?.modalDescription || service?.description

  const modal = (
    <div className={`service-modal-overlay${isClosing ? ' service-modal-overlay--closing' : ''}`} onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
      <div className={`service-modal${isClosing ? ' service-modal--closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <header className="service-modal__header">
          <h2 id="service-modal-title" className="service-modal__title">
            {service.title}
          </h2>
          <button
            type="button"
            className="service-modal__close"
            onClick={handleClose}
            aria-label="Закрыть"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="service-modal__body">
          <p className="service-modal__description">{descriptionText}</p>

          <div className="service-modal__benefit">
            <h3 className="service-modal__benefit-title">Выгода для поставщика</h3>
            <p className="service-modal__benefit-text">
              {service?.benefit ||
                'Прирост собираемости платежей, снижение задолженности и дополнительные доходы за счёт подключённого сервиса.'}
            </p>
          </div>

          <div className="service-modal__footer-section">
            <div className="service-modal__tariff">
              <div className="service-modal__tariff-price">{service?.price || 'Бесплатно'}</div>
              <Button
                type="button"
                variant={isConnected ? 'secondary' : 'primary'}
                size="m"
                className="service-modal__tariff-button"
                onClick={() => onToggle?.(service)}
              >
                {isConnected
                  ? 'Отключить'
                  : service?.priceValue
                    ? `Подключить за ${service.priceValue}`
                    : 'Подключить'}
              </Button>
            </div>

            <div className="service-modal__divider"></div>
            <p className="service-modal__agreement">
              Нажимая на кнопку, вы соглашаетесь с подключением опции и Условиями
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

