/**
 * Переиспользуемая кнопка по дизайну Andromeda UI Kit (Figma node 870-1874).
 * Варианты: primary, secondary, ghost. Размеры: s, m, l.
 */
import { forwardRef } from 'react'
import './Button.css'

const VARIANTS = ['primary', 'secondary', 'ghost']
const SIZES = ['s', 'm', 'l']

export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'm',
    type = 'button',
    disabled = false,
    className = '',
    children,
    ...rest
  },
  ref
) {
  const v = VARIANTS.includes(variant) ? variant : 'primary'
  const s = SIZES.includes(size) ? size : 'm'
  const classes = ['btn', `btn--${v}`, `btn--${s}`, className].filter(Boolean).join(' ')

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  )
})
