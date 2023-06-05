import { FC } from 'react'

import { classNames } from 'shared/lib/className'

import styles from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className = '' }) => (
    <div className={classNames(styles.Navbar, {}, [className])} />
)
