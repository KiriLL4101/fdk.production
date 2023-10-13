import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { Button, ThemeSwitcher, LangSwitcher, VStack } from 'shared/ui'
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

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem item={item} collapsed={collapsed} key={item.path} />
            )),
        [collapsed, sidebarItemsList]
    )

    return (
        <div
            data-testid='sidebar'
            className={classNames(styles.Sidebar, { [styles.collapsed]: collapsed }, [className])}
        >
            <VStack role='navigation' gap='8' className={styles.items}>
                {itemsList}
            </VStack>
            <Button
                data-testid='sidebar-toggle'
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
