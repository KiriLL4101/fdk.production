import { HTMLAttributes, memo, ReactNode } from 'react'
import { classNames } from '@/shared/lib/className'
import styles from './Card.module.scss'

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children: ReactNode
    theme?: CardTheme
    max?: boolean
}

export const Card = memo((props: CardProps) => {
    const { className, theme = CardTheme.NORMAL, max, children, ...otherProps } = props

    return (
        <div
            className={classNames(styles.Card, { [styles.max]: max }, [className, styles[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    )
})
