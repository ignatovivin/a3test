/**
 * Компонент Bage — бейдж (контейнер для метки/тега).
 */

import './Bage.css'

export function Bage({ className = '', children, as: Component = 'span', ...rest }) {
  const classes = ['bage', className].filter(Boolean).join(' ')
  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  )
}
