import { useState, useEffect, useRef } from 'react'
import { Button } from '../components/Button/Button'
import { BanksModal } from '../components/BanksModal/BanksModal'

/* Банки: иконки Озон.svg, Райфайзен.svg, Тбанк.svg, Альфа.svg, ВТБ.svg */
const BANKS = [
  { name: 'Альфа-Банк', logo: '/bank-alfa.svg' },
  { name: 'Озон-Банк', logo: '/bank-ozon.svg' },
  { name: 'Тбанк', logo: '/bank-tbank.svg' },
  { name: 'Райффайзен', logo: '/bank-raiff.svg' },
  { name: 'ВТБ', logo: '/bank-vtb.svg' },
]

/* Слайды по Figma node 219:3927 — Title/H3, Captions 1, Button Primary M */
const SLIDES = [
  {
    title: 'Единый реестр платежей',
    subtitle: 'Единый реестр платежей вместо отдельных платёжек',
    buttonText: 'Подключить бесплатно',
  },
  {
    title: 'Удобная отчётность',
    subtitle: 'Все платёжки и начисления в одном месте',
    buttonText: 'Подробнее',
  },
  {
    title: 'Быстрое подключение',
    subtitle: 'Подключите банк за несколько минут',
    buttonText: 'Подключить банк',
  },
]

const SLIDER_AUTOPLAY_MS = 5000

/* Слайды + клон первого в конце для бесконечного цикла (без перемотки справа налево) */
const SLIDES_WITH_CLONE = [...SLIDES, SLIDES[0]]

export function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [banksModalOpen, setBanksModalOpen] = useState(false)
  const listRef = useRef(null)

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
  const TRANSITION_MS = 400
  useEffect(() => {
    if (currentSlide !== SLIDES.length) return
    const t = setTimeout(() => {
      setIsJumping(true)
      setCurrentSlide(0)
    }, TRANSITION_MS + 50)
    return () => clearTimeout(t)
  }, [currentSlide])

  useEffect(() => {
    if (!isJumping) return
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsJumping(false))
    })
    return () => cancelAnimationFrame(raf)
  }, [isJumping])

  /* Для пагинации и aria: логический индекс 0..N-1 */
  const displayIndex = currentSlide % SLIDES.length

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
                  <div className="cabinet-slider__text">
                    <div className="cabinet-slider__text-block">
                      <h2 className="cabinet-slider__title">{slide.title}</h2>
                      <p className="cabinet-slider__subtitle">{slide.subtitle}</p>
                    </div>
                    <Button type="button" variant="primary" size="m">
                      {slide.buttonText}
                    </Button>
                  </div>
                  <div className="cabinet-slider__banner">
                    <img
                      src="/slider-banner.png"
                      alt=""
                      className="cabinet-slider__banner-img"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <nav className="cabinet-slider__pagination" aria-label="Переключение слайдов">
          <div className="cabinet-slider__pagination-inner">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`cabinet-slider__dot ${index === displayIndex ? 'cabinet-slider__dot--active' : ''}`}
                aria-label={`Слайд ${index + 1}`}
                aria-current={index === displayIndex ? 'true' : undefined}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </nav>
      </section>

      {/* Block «Подключенные банки» — Figma */}
      <section className="cabinet-block">
        <div className="cabinet-block__header">
          <h3 className="cabinet-block__title">Подключенные банки</h3>
          <button type="button" className="cabinet-block__filter" aria-label="Фильтр: Все" onClick={() => setBanksModalOpen(true)}>
            <span>Все</span>
            <svg className="cabinet-block__filter-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
        <div className="cabinet-block__banks">
          {BANKS.map((bank) => (
            <div key={bank.name} className="cabinet-bank-card">
              <div className="cabinet-bank-card__logo" aria-hidden>
                <img src={bank.logo} alt="" width="32" height="32" />
              </div>
              <span className="cabinet-bank-card__name">{bank.name}</span>
            </div>
          ))}
        </div>
        <div className="cabinet-block__footer">
          <hr className="cabinet-block__divider" />
          <Button type="button" variant="ghost" size="s" onClick={() => setBanksModalOpen(true)}>
            Подключить банк
          </Button>
        </div>
      </section>
    </>
  )
}
