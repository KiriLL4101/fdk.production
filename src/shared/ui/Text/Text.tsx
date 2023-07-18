import { DefaultTFuncReturn } from 'i18next'

import { classNames } from 'shared/lib/className'

import styles from './Text.module.scss'

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error'
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center'
}

interface TextProps {
    className?: string
    title?: DefaultTFuncReturn | string
    text?: DefaultTFuncReturn | string
    theme?: TextTheme
    align?: TextAlign
}

export const Text = (props: TextProps) => {
    const {
        className = '',
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT
    } = props

    return (
        <div
            className={classNames(styles.Text, {}, [
                className,
                styles[theme],
                styles[align]
            ])}
        >
            {title && <p className={styles.title}>{title}</p>}
            {text && <p className={styles.text}>{text}</p>}
        </div>
    )
}
