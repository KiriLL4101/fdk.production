import { ReactNode, memo } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import { classNames } from '@/shared/lib/className'

import styles from './AppLink.module.scss'

export enum AppLinkVariant {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
    className?: string
    variant?: AppLinkVariant
    children?: ReactNode
}

export const AppLink = memo(
    ({
        className = '',
        children,
        to,
        variant = AppLinkVariant.PRIMARY,
        ...props
    }: AppLinkProps) => (
        <Link
            {...props}
            className={classNames(styles.appLink, {}, [className, styles[variant]])}
            to={to}
        >
            {children}
        </Link>
    )
)
