import { createPortal } from 'react-dom'
import { Button } from '../Button/Button'

// Текстовые шаблоны для модалок услуг
const SERVICE_MODAL_CONTENT = {
  banks: {
    description:
      'Сервис собирает все начисления по адресу и показывает единую картину платежей по банкам и услугам.',
    price: 'Бесплатно',
    priceValue: null,
    benefit:
      'Рост собираемости платежей за счёт удобного сценария «заплатить всё разом» и снижение просрочки по начислениям.',
  },
  'insurance-1': {
    description:
      'Страхование обязательных платежей и коммунальных услуг — защита от непредвиденных расходов для собственников.',
    price: '300₽/мес',
    priceValue: '300₽/мес',
    benefit:
      'Дополнительный источник дохода от страховых партнёров и снижение финансовых рисков по задолженности клиентов.',
  },
  'insurance-2': {
    description:
      'Расширенные программы страхования для собственников: имущество, ответственность перед соседями и дополнительные опции.',
    price: 'От 500₽/мес',
    priceValue: '500₽/мес',
    benefit:
      'Увеличение среднего чека за счёт доппродаж и повышение лояльности клиентов за счёт расширенной защиты.',
  },
}

export function ServiceModal({ service, onClose, onToggle }) {
  if (!service) return null

  const isConnected = service.bage === 'Подключена'
  const content = SERVICE_MODAL_CONTENT[service.id] || {}
  const descriptionText = content.description || service.description

  const modal = (
    <div className="service-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
      <div className="service-modal" onClick={(e) => e.stopPropagation()}>
        <header className="service-modal__header">
          <h2 id="service-modal-title" className="service-modal__title">
            {service.title}
          </h2>
          <button
            type="button"
            className="service-modal__close"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="service-modal__body">
          <p className="service-modal__description">{descriptionText}</p>

          <div className="service-modal__benefit">
            <h3 className="service-modal__benefit-title">Выгода для поставщика</h3>
            <p className="service-modal__benefit-text">
              {content.benefit ||
                'Прирост собираемости платежей, снижение задолженности и дополнительные доходы за счёт подключённого сервиса.'}
            </p>
          </div>

          <div className="service-modal__footer-section">
            <div className="service-modal__tariff">
              <div className="service-modal__tariff-price">{content.price || 'Бесплатно'}</div>
              <Button
                type="button"
                variant={isConnected ? 'secondary' : 'primary'}
                size="m"
                className="service-modal__tariff-button"
                onClick={() => onToggle && onToggle(service)}
              >
                {isConnected
                  ? 'Отключить'
                  : content.priceValue
                    ? `Подключить за ${content.priceValue}`
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

