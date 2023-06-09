import { DefaultTFuncReturn } from 'i18next'

import { classNames } from 'shared/lib/className'

import styles from './Text.module.scss'

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error'
}

interface TextProps {
    className?: string
    title?: DefaultTFuncReturn | string
    text?: DefaultTFuncReturn | string
    theme?: TextTheme
}

export const Text = (props: TextProps) => {
    const { className = '', text, title, theme = TextTheme.PRIMARY } = props

    return (
        <div
            className={classNames(styles.Text, {}, [className, styles[theme]])}
        >
            {title && <p className={styles.title}>{title}</p>}
            {text && <p className={styles.text}>{text}</p>}
        </div>
    )
}
