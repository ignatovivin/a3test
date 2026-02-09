/**
 * Единый источник маршрутов приложения.
 * navItems — для сайдбара и бургер-меню (inNav: true).
 * placeholderRoutes — для страниц-заглушек (все кроме главной).
 */

export const ROUTES = [
  { path: '/', title: 'Главная', end: true, icon: 'flat', inNav: true },
  { path: 'request', title: 'Оставить заявку', description: 'Форма заявки.', end: false, icon: 'new', inNav: true },
  { path: 'payments', title: 'Реестры платежей', description: 'Реестры платежей.', end: false, icon: 'payment', inNav: true },
  { path: 'accruals', title: 'Реестры начислений', description: 'Реестры начислений.', end: false, icon: 'cash', inNav: true },
  { path: 'history', title: 'История платежей', description: 'История платежей.', end: false, icon: 'calendar', inNav: true },
  { path: 'widget', title: 'Платежный виджет', description: 'Платежный виджет.', end: false, icon: 'qr', inNav: true },
  { path: 'validation', title: 'Настройка валидации', description: 'Настройка валидации.', end: false, icon: 'setting', inNav: true },
  { path: 'notifications', title: 'Уведомления', description: 'Раздел уведомлений.', end: false, inNav: false },
]

/** Маршруты для пунктов навигации (сайдбар, бургер-меню) */
export const navItems = ROUTES.filter((r) => r.inNav !== false).map(({ path, title, end, icon }) => ({
  to: path === '/' ? '/' : `/${path}`,
  label: title,
  end,
  icon,
}))

/** Маршруты страниц-заглушек (path, title, description) для App */
export const placeholderRoutes = ROUTES.filter((r) => r.path !== '/').map(({ path, title, description }) => ({
  path,
  title,
  description: description || title,
}))
