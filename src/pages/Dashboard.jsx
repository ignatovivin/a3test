import { useState, useEffect, useRef } from 'react'
import { Button } from '../components/Button/Button'
import { Bage } from '../components/Bage/Bage'
import { BanksModal } from '../components/BanksModal/BanksModal'
import { ServiceModal } from '../components/ServiceModal/ServiceModal'
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon'
import { CONNECTED_BANKS } from '../constants/banks'
import { SERVICES } from '../constants/services'
import { SLIDES, SLIDER_AUTOPLAY_MS, MOBILE_BREAKPOINT } from '../constants/slider'
import { SLIDER_TRANSITION_MS, SLIDER_TRANSITION_SAFETY_MS } from '../constants/timing'

/* Слайды + клон первого в конце для бесконечного цикла (без перемотки справа налево) */
const SLIDES_WITH_CLONE = [...SLIDES, SLIDES[0]]

export function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [banksModalOpen, setBanksModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeService, setActiveService] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const handle = () => setIsMobile(mql.matches)
    handle()
    mql.addEventListener('change', handle)
    return () => mql.removeEventListener('change', handle)
  }, [])

  /* Автовоспроизведение: с последнего переходим на клон первого, затем мгновенно на первый */
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= SLIDES.length - 1) return SLIDES.length /* клон первого */
        return prev + 1
      })
    }, SLIDER_AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [])

  /* После анимации на клон первого — мгновенно сброс на первый без анимации (без перемотки) */
  const handleTransitionEnd = (e) => {
    if (e.target !== listRef.current || e.propertyName !== 'transform') return
    if (currentSlide !== SLIDES.length) return
    setIsJumping(true)
    setCurrentSlide(0)
  }

  /* Страховка: если transitionend не сработал (reduced motion и т.д.), сброс через длительность анимации */
  useEffect(() => {
    if (currentSlide !== SLIDES.length) return
    const t = setTimeout(() => {
      setIsJumping(true)
      setCurrentSlide(0)
    }, SLIDER_TRANSITION_MS + SLIDER_TRANSITION_SAFETY_MS)
    return () => clearTimeout(t)
  }, [currentSlide])

  useEffect(() => {
    if (!isJumping) return
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsJumping(false))
    })
    return () => cancelAnimationFrame(raf)
  }, [isJumping])

  return (
    <>
      <BanksModal isOpen={banksModalOpen} onClose={() => setBanksModalOpen(false)} />

      {/* Slider — Figma node 219:3927, автовоспроизведение, зацикленный */}
      <section className="cabinet-slider" aria-label="Слайдер">
        <div className="cabinet-slider__track">
          <div
            ref={listRef}
            className="cabinet-slider__list"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: isJumping ? 'none' : undefined,
            }}
            role="list"
            onTransitionEnd={handleTransitionEnd}
          >
            {SLIDES_WITH_CLONE.map((slide, index) => (
              <div
                key={index}
                className="cabinet-slider__slide"
                role="listitem"
                aria-hidden={index !== currentSlide}
              >
                <div className="cabinet-slider__inner">
                  <div className="cabinet-slider__content">
                    <div className="cabinet-slider__text">
                      <div className="cabinet-slider__text-block">
                        <h4 className="cabinet-slider__title">
                          {isMobile && slide.title === 'Единый реестр платежей' ? 'Реестр платежей' : slide.title}
                        </h4>
                        <p className="cabinet-slider__subtitle">{slide.subtitle}</p>
                      </div>
                    </div>
                    <div className="cabinet-slider__actions">
                      <Button type="button" variant="primary" size="m">
                        {slide.buttonText}
                      </Button>
                    </div>
                  </div>
                  <img
                    src="/slider-hero.png"
                    alt=""
                    className="cabinet-slider__image"
                    width={220}
                    height={192}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Один смысловой блок: подключенные банки + кнопка (gap 8) */}
      <div className="cabinet-banks-section">
        <section className="cabinet-block">
          <div className="cabinet-block__header">
            <h3 className="cabinet-block__title">Подключенные банки</h3>
            {/* Кнопка «Все» — Button Ghost S + фон как в Figma node 219-4014 */}
            <Button
              type="button"
              variant="ghost"
              size="s"
              className="cabinet-block__filter"
              aria-label="Фильтр: Все"
              onClick={() => setBanksModalOpen(true)}
            >
              <span className="cabinet-block__filter-text">Все</span>
              <ChevronRightIcon className="cabinet-block__filter-chevron" />
            </Button>
          </div>
          <div className="cabinet-block__banks-wrap">
            <div className="cabinet-block__banks">
              {CONNECTED_BANKS.map((bank) => (
                <div key={bank.name} className="cabinet-bank-card">
                  <div className="cabinet-bank-card__logo" aria-hidden>
                    <img src={bank.logo} alt="" width="32" height="32" />
                  </div>
                  <span className="cabinet-bank-card__name">{bank.name}</span>
                </div>
              ))}
            </div>
            <div className="cabinet-connect-bank" aria-label="Подключение банка">
              <Button
                type="button"
                variant="ghost"
                size="s"
                className="cabinet-connect-bank__btn"
                onClick={() => setBanksModalOpen(true)}
              >
                Подключить банк
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Блок «Услуги» — Figma node 336:8082: один смысловой блок (заголовок + карточки + кнопка) */}
      <div className="cabinet-services-section" aria-labelledby="cabinet-services-title">
        <div className="cabinet-services-section__header">
          <h3 id="cabinet-services-title" className="cabinet-block__title">Услуги</h3>
          <Button type="button" variant="ghost" size="s" className="cabinet-block__filter" aria-label="Все услуги">
            <span className="cabinet-block__filter-text">Все</span>
            <ChevronRightIcon className="cabinet-block__filter-chevron" />
          </Button>
        </div>
        <div className="cabinet-services-section__grid">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="cabinet-service-card"
            >
              <div className="cabinet-service-card__top">
                <div className="cabinet-service-card__icon" aria-hidden>
                  <img src={service.icon} alt="" width="32" height="32" />
                </div>
                {service.bage && (
                  <Bage className="cabinet-service-card__bage">{service.bage}</Bage>
                )}
              </div>
              <h4 className="cabinet-service-card__title">{service.title}</h4>
              <p className="cabinet-service-card__description">{service.description}</p>
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
          ))}
        </div>
      </div>
      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  )
}
