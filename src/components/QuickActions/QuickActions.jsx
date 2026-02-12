/**
 * Блок быстрых действий — Figma Frame 194 (487-11842).
 * Три кнопки: Создать счет, Выгрузить реестр, Импорт платежей.
 */
import React from 'react'
import { Button } from '../Button/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { UploadIcon } from '../icons/UploadIcon'
import { DownloadIcon } from '../icons/DownloadIcon'

const ACTIONS = [
  { id: 'create-invoice', label: 'Создать счет', Icon: PlusIcon },
  { id: 'export-register', label: 'Выгрузить реестр', Icon: UploadIcon },
  { id: 'import-payments', label: 'Импорт платежей', Icon: DownloadIcon },
]

export function QuickActions() {
  return (
    <section className="cabinet-quick-actions" aria-label="Быстрые действия">
      <div className="cabinet-quick-actions__bar">
        {ACTIONS.map(({ id, label, Icon }, index) => (
          <React.Fragment key={id}>
            <div className="cabinet-quick-actions__cell">
              <Button type="button" variant="ghost" size="s" className="cabinet-quick-actions__btn">
                <Icon className="cabinet-quick-actions__icon" />
                <span>{label}</span>
              </Button>
            </div>
            {index < ACTIONS.length - 1 && (
              <span className="cabinet-quick-actions__divider" aria-hidden />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}
