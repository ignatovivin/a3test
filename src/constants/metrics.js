/**
 * Данные для блока «Ключевые показатели» — Figma node 476-9645.
 * Включает метрики и данные для графика.
 */

// Данные для трех метрик
export const METRICS = [
  {
    id: 'revenue',
    title: 'Платежи, ₽',
    value: '1 253 345,00',
    change: '+12.5%',
    isSelected: true,
  },
  {
    id: 'transactions',
    title: 'Средний чек, ₽',
    value: '258 345,00',
    change: '+8.3%',
    isSelected: false,
  },
  {
    id: 'users',
    title: 'Прошло платежей',
    value: '253',
    change: '+15.2%',
    isSelected: false,
  },
]

// Данные для графика по каждой метрике (значения в диапазоне 0-57 как в Figma). Больше точек для плавного графика.
export const CHART_DATA = {
  revenue: [
    { date: '15,пн', value: 35, comparison: 48 },
    { date: '16,вт', value: 39, comparison: 46 },
    { date: '17,ср', value: 42, comparison: 43 },
    { date: '18,чт', value: 28, comparison: 40 },
    { date: '19,пт', value: 38, comparison: 46 },
    { date: '20,сб', value: 45, comparison: 50 },
    { date: '21,вс', value: 38, comparison: 43 },
    { date: '22,пн', value: 32, comparison: 37 },
    { date: '23,вт', value: 44, comparison: 44 },
    { date: '24,ср', value: 48, comparison: 46 },
    { date: '25,чт', value: 41, comparison: 43 },
    { date: '26,пт', value: 35, comparison: 40 },
  ],
  transactions: [
    { date: '15,пн', value: 25, comparison: 40 },
    { date: '16,вт', value: 28, comparison: 39 },
    { date: '17,ср', value: 30, comparison: 38 },
    { date: '18,чт', value: 22, comparison: 35 },
    { date: '19,пт', value: 30, comparison: 38 },
    { date: '20,сб', value: 35, comparison: 42 },
    { date: '21,вс', value: 28, comparison: 36 },
    { date: '22,пн', value: 24, comparison: 32 },
    { date: '23,вт', value: 34, comparison: 38 },
    { date: '24,ср', value: 38, comparison: 39 },
    { date: '25,чт', value: 32, comparison: 37 },
    { date: '26,пт', value: 27, comparison: 36 },
  ],
  users: [
    { date: '15,пн', value: 20, comparison: 30 },
    { date: '16,вт', value: 22, comparison: 31 },
    { date: '17,ср', value: 25, comparison: 33 },
    { date: '18,чт', value: 18, comparison: 29 },
    { date: '19,пт', value: 26, comparison: 32 },
    { date: '20,сб', value: 30, comparison: 35 },
    { date: '21,вс', value: 24, comparison: 32 },
    { date: '22,пн', value: 20, comparison: 28 },
    { date: '23,вт', value: 28, comparison: 33 },
    { date: '24,ср', value: 32, comparison: 34 },
    { date: '25,чт', value: 28, comparison: 33 },
    { date: '26,пт', value: 22, comparison: 31 },
  ],
}
