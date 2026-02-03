/**
 * Блокировка прокрутки при открытых модалках/меню.
 * На больших экранах (≥1024px): только overflow hidden у body и .cabinet-content — без
 * position:fixed, чтобы не было сдвига/адаптива интерфейса при открытии модалки.
 * На планшете/мобиле (<1024px): дополнительно position:fixed у .cabinet-content, чтобы
 * скролл под бургер-меню не тянулся.
 */
const LOCK_CLASS = 'body-scroll-lock'
const SCROLL_CONTAINER_SELECTOR = '.cabinet-content'
const DESKTOP_BREAKPOINT = 1024
let lockCount = 0
let savedScrollTop = 0
let scrollContainer = null
let usedFixed = false

function applyLock() {
  document.body.classList.add(LOCK_CLASS)
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= DESKTOP_BREAKPOINT

  if (!isDesktop) {
    usedFixed = true
    scrollContainer = document.querySelector(SCROLL_CONTAINER_SELECTOR)
    if (scrollContainer) {
      savedScrollTop = scrollContainer.scrollTop
      scrollContainer.style.position = 'fixed'
      scrollContainer.style.top = `-${savedScrollTop}px`
      scrollContainer.style.left = '0'
      scrollContainer.style.right = '0'
      scrollContainer.style.bottom = '0'
      scrollContainer.style.overflow = 'hidden'
      scrollContainer.style.width = '100%'
    }
  } else {
    usedFixed = false
    scrollContainer = null
  }
}

function removeLock() {
  document.body.classList.remove(LOCK_CLASS)
  if (usedFixed && scrollContainer) {
    scrollContainer.style.position = ''
    scrollContainer.style.top = ''
    scrollContainer.style.left = ''
    scrollContainer.style.right = ''
    scrollContainer.style.bottom = ''
    scrollContainer.style.overflow = ''
    scrollContainer.style.width = ''
    scrollContainer.scrollTop = savedScrollTop
    scrollContainer = null
  }
  usedFixed = false
}

export function lockBodyScroll() {
  lockCount += 1
  if (lockCount === 1) applyLock()
}

export function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) removeLock()
}
