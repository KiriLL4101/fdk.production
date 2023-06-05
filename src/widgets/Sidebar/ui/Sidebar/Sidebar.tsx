import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, ThemeSwitcher, LangSwitcher, AppLink } from 'shared/ui'
import { classNames } from 'shared/lib/className'
import { ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { AppLinkVariant } from 'shared/ui/AppLink/AppLink'

import AboutIcon from 'shared/assets/icons/about-20-20.svg'
import MainIcon from 'shared/assets/icons/main-20-20.svg'

import styles from './Sidebar.module.scss'

interface SidebarProps {
    className?: string
}

export const Sidebar = ({ className = '' }: SidebarProps) => {
    const { t } = useTranslation()

    const [collapsed, setCollapsed] = useState(false)

    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    return (
        <div
            data-testid="sidebar"
            className={classNames(
                styles.Sidebar,
                { [styles.collapsed]: collapsed },
                [className]
            )}
        >
            <div className={styles.items}>
                <AppLink
                    variant={AppLinkVariant.SECONDARY}
                    to={RoutePath.main}
                    className={styles.item}
                >
                    <MainIcon className={styles.icon} />
                    <span className={styles.link}>{t('Главная')}</span>
                </AppLink>
                <AppLink
                    variant={AppLinkVariant.SECONDARY}
                    to={RoutePath.about}
                    className={styles.item}
                >
                    <AboutIcon className={styles.icon} />
                    <span className={styles.link}>{t('О сайте')}</span>
                </AppLink>
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
