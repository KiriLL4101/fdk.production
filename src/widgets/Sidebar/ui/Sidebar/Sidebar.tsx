import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Button, ThemeSwitcher, LangSwitcher } from 'shared/ui'
import { classNames } from 'shared/lib/className'
import { ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'

import styles from './Sidebar.module.scss'

interface SidebarProps {
    className?: string
}

export const Sidebar = ({ className = '' }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)

    const sidebarItemsList = useSelector(getSidebarItems)

    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    return (
        <div
            data-testid="sidebar"
            className={classNames(styles.Sidebar, { [styles.collapsed]: collapsed }, [className])}
        >
            <div className={styles.items}>
                {sidebarItemsList.map((item) => (
                    <SidebarItem key={item.path} item={item} collapsed={collapsed} />
                ))}
            </div>
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={styles.collapseBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={styles.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} />
            </div>
        </div>
    )
}
