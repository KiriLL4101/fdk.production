import { ButtonHTMLAttributes, memo } from 'react'
import { classNames } from '@/shared/lib/className'
import styles from './Button.module.scss'

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: ButtonTheme
    square?: boolean
    size?: ButtonSize
    fullWidth?: boolean
}

export const Button = memo((props: ButtonProps) => {
    const {
        className = '',
        children,
        theme = ButtonTheme.CLEAR,
        square,
        size = ButtonSize.M,
        disabled = false,
        fullWidth = false,
        ...otherProps
    } = props

    const mods: Record<string, boolean> = {
        [styles.square]: Boolean(square),
        [styles.disabled]: disabled,
        [styles.fullWidth]: fullWidth,
    }

    return (
        <button
            type='button'
            className={classNames(styles.Button, mods, [className, styles[theme], styles[size]])}
            {...otherProps}
        >
            {children}
        </button>
    )
})
