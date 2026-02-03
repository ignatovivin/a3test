/**
 * Блокировка прокрутки body при открытых модалках/меню.
 * Счётчик позволяет нескольким слоям (модалка + бургер-меню) блокировать скролл;
 * разблокировка только когда все закрыты.
 */
let lockCount = 0

export function lockBodyScroll() {
  lockCount += 1
  document.body.style.overflow = 'hidden'
}

export function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.overflow = ''
  }
}
