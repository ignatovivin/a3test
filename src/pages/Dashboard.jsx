import { useState, useRef } from 'react'
import { Button } from '../components/Button/Button'
import { BanksModal } from '../components/BanksModal/BanksModal'
import { ServiceModal } from '../components/ServiceModal/ServiceModal'
import { MetricsChart } from '../components/MetricsChart/MetricsChart'
import { QuickActions } from '../components/QuickActions/QuickActions'
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon'
import { PlusIcon } from '../components/icons/PlusIcon'
import { CONNECTED_BANKS } from '../constants/banks'
import { SERVICES } from '../constants/services'
import { EVENTS } from '../constants/events'

export function Dashboard() {
  const [banksModalOpen, setBanksModalOpen] = useState(false)
  const [activeService, setActiveService] = useState(null)
  const servicesGridRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e) => {
    if (!servicesGridRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - servicesGridRef.current.offsetLeft)
    setScrollLeft(servicesGridRef.current.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !servicesGridRef.current) return
    e.preventDefault()
    const x = e.pageX - servicesGridRef.current.offsetLeft
    const walk = (x - startX) * 0.8
    servicesGridRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <>
      <BanksModal isOpen={banksModalOpen} onClose={() => setBanksModalOpen(false)} />

      {/* Двухколоночный layout */}
      <div className="cabinet-content__columns">
        {/* Левая колонка */}
        <div className="cabinet-content__column">
          {/* Быстрые действия — Figma Frame 194 (487-11842) */}
          <QuickActions />

          {/* Блок «Ключевые показатели» — Figma node 476-9645 */}
          <MetricsChart />

          {/* Блок «Заявка на подключение» — Figma node 476-9790 */}
          <div className="cabinet-request-container">
            <div className="cabinet-request-container__header">
              <h3 className="cabinet-request-container__title">Заявка на подключение</h3>
              <Button type="button" variant="ghost" size="s" className="cabinet-block__filter" aria-label="Все заявки">
                <span className="cabinet-block__filter-text">Все</span>
                <ChevronRightIcon className="cabinet-block__filter-chevron" />
              </Button>
            </div>
            <div className="cabinet-request-container__content">
              <div className="cabinet-request-container__info">
                <div className="cabinet-request-container__info-content">
                  <h4 className="cabinet-request-container__info-title">Подключение услуг ЖКХ</h4>
                  <p className="cabinet-request-container__info-subtitle">Заявка № 596013843254 от 10.08.2023</p>
                </div>
              </div>
              <div className="cabinet-request-container__status">
                <div className="cabinet-request-container__progress-bar">
                  <div className="cabinet-request-container__progress-segment cabinet-request-container__progress-segment--active" />
                  <div className="cabinet-request-container__progress-segment" />
                  <div className="cabinet-request-container__progress-segment" />
                </div>
                <div className="cabinet-request-container__status-labels">
                  <span className="cabinet-request-container__status-label cabinet-request-container__status-label--active">Создана</span>
                  <span className="cabinet-request-container__status-label">В работе</span>
                  <span className="cabinet-request-container__status-label">Выполнена</span>
                </div>
              </div>
            </div>
          </div>

          {/* Блок «Ваши услуги» — Figma node 336:8082: один смысловой блок (заголовок + карточки + кнопка) */}
          <div className="cabinet-services-section" aria-labelledby="cabinet-services-title">
            <div className="cabinet-services-section__header">
              <h3 id="cabinet-services-title" className="cabinet-block__title">Ваши услуги</h3>
              <Button type="button" variant="ghost" size="s" className="cabinet-block__filter" aria-label="Все услуги">
                <span className="cabinet-block__filter-text">Все</span>
                <ChevronRightIcon className="cabinet-block__filter-chevron" />
              </Button>
            </div>
            <div
              className="cabinet-services-section__grid"
              ref={servicesGridRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="cabinet-service-card"
                >
                  <div className="cabinet-service-card__body">
                    <div className="cabinet-service-card__top">
                      <div className="cabinet-service-card__icon" aria-hidden>
                        <img src={service.icon} alt="" width="32" height="32" />
                      </div>
                    </div>
                    <h4 className="cabinet-service-card__title">{service.title}</h4>
                    <p className="cabinet-service-card__description">{service.description}</p>
                  </div>
                  {(service.price || service.priceValue) && (
                    <div className="cabinet-service-card__details">
                      <div className="cabinet-service-card__meta">
                        {service.price && (
                          <div className="cabinet-service-card__price">{service.price}</div>
                        )}
                        {service.priceValue && (
                          <div className="cabinet-service-card__meta-note">{service.priceValue}</div>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="s"
                        className="cabinet-service-card__link"
                        onClick={() => setActiveService(service)}
                      >
                        Подробнее
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="cabinet-content__column">
          {/* Промо-баннер над подключенными банками — Figma Promo Container 476-9871 */}
          <section className="cabinet-promo-banner" aria-label="Новая услуга Household">
            <div className="cabinet-promo-banner__content">
              <h3 className="cabinet-promo-banner__title">Новая услуга Household</h3>
              <p className="cabinet-promo-banner__subtitle">Подключай автоматический поиск и оплату ЖКУ</p>
            </div>
          </section>

          {/* Блок «Подключенные банки» — Figma node 476-9793 */}
          <div className="cabinet-banks-container">
            <div className="cabinet-banks-container__header">
              <h3 className="cabinet-banks-container__title">Подключенные банки</h3>
              <button
                type="button"
                className="cabinet-banks-container__nav-btn"
                aria-label="Все банки"
                onClick={() => setBanksModalOpen(true)}
              >
                <ChevronRightIcon />
              </button>
            </div>
            <div className="cabinet-banks-container__list">
              <div className="cabinet-banks-container__header-row">
                <span className="cabinet-banks-container__header-label">Топ по объему</span>
                <span className="cabinet-banks-container__header-label">Объем, ₽</span>
              </div>
              <div className="cabinet-banks-container__cards">
                {CONNECTED_BANKS.map((bank) => (
                  <div key={bank.name} className="cabinet-banks-container__card">
                    <div className="cabinet-banks-container__card-left">
                      <div className="cabinet-banks-container__card-logo" aria-hidden>
                        <img src={bank.logo} alt="" width="32" height="32" />
                      </div>
                      <div className="cabinet-banks-container__card-info">
                        <span className="cabinet-banks-container__card-name">{bank.name}</span>
                        {bank.date && <span className="cabinet-banks-container__card-date">{bank.date}</span>}
                      </div>
                    </div>
                    <div className="cabinet-banks-container__card-right">
                      {bank.amount && <span className="cabinet-banks-container__card-amount">{bank.amount}</span>}
                      {bank.growth && (
                        <span className="cabinet-banks-container__card-growth">{bank.growth}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="cabinet-banks-container__connect"
                onClick={() => setBanksModalOpen(true)}
                aria-label="Подключить банк"
              >
                <span className="cabinet-banks-container__connect-icon" aria-hidden>
                  <PlusIcon />
                </span>
                <span className="cabinet-banks-container__connect-text">Подключить банк</span>
              </button>
            </div>
          </div>

          {/* Блок «События» — Figma node 476-9794 */}
          <div className="cabinet-events-container">
            <div className="cabinet-events-container__header">
              <h3 className="cabinet-events-container__title">События</h3>
              <button
                type="button"
                className="cabinet-events-container__nav-btn"
                aria-label="Все события"
              >
                <ChevronRightIcon />
              </button>
            </div>
            <div className="cabinet-events-container__list">
              {EVENTS.map((event) => (
                <div key={event.id} className="cabinet-events-container__item">
                  <div className="cabinet-events-container__details">
                    <span className="cabinet-events-container__title-text">{event.title}</span>
                    <span className="cabinet-events-container__time">{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  )
}
