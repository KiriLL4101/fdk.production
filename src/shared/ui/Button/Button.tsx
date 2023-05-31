import { ButtonHTMLAttributes, FC } from 'react'
import styles from './Button.module.scss'
import { classNames } from 'shared/lib/className'

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  square?: boolean
  size?: ButtonSize
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className = '',
    children,
    theme = ButtonTheme.CLEAR,
    square,
    size = ButtonSize.M,
    ...otherProps
  } = props

  const mods: Record<string, boolean> = {
    [styles[theme]]: true,
    [styles.square]: Boolean(square),
    [styles[size]]: true
  }

  return (
    <button type="button" className={classNames(styles.Button, mods, [className])} {...otherProps}>
      {children}
    </button>
  )
}