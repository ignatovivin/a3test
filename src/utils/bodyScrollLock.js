/**
 * Блокировка прокрутки при открытых модалках/меню.
 * Блокирует и body, и контейнер контента (.cabinet-content), т.к. скролл идёт в нём.
 * Счётчик позволяет нескольким слоям блокировать скролл; разблокировка только когда все закрыты.
 */
const LOCK_CLASS = 'body-scroll-lock'
let lockCount = 0

export function lockBodyScroll() {
  lockCount += 1
  document.body.classList.add(LOCK_CLASS)
}

export function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.classList.remove(LOCK_CLASS)
  }
}
