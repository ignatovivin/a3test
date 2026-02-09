/**
 * Иконка пункта навигации по ключу (flat, new, setting, cash, payment, qr, calendar).
 * Используется в Sidebar и в бургер-меню Header.
 */
import { FlatIcon } from './FlatIcon'
import { NewIcon } from './NewIcon'
import { SettingIcon } from './SettingIcon'
import { CashIcon } from './CashIcon'
import { PaymentIcon } from './PaymentIcon'
import { QrIcon } from './QrIcon'
import { CalendarIcon } from './CalendarIcon'

const ICON_MAP = {
  flat: FlatIcon,
  new: NewIcon,
  setting: SettingIcon,
  cash: CashIcon,
  payment: PaymentIcon,
  qr: QrIcon,
  calendar: CalendarIcon,
}

export function NavIcon({ icon, className, ...props }) {
  const IconComponent = ICON_MAP[icon]
  if (!IconComponent) return null
  return <IconComponent className={className} {...props} />
}
