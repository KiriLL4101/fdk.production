import { memo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { getUserAuthData } from 'entities/User'
import { AppLink } from 'shared/ui'
import { AppLinkVariant } from 'shared/ui/AppLink/AppLink'
import { classNames } from 'shared/lib/className'
import { SidebarItemType } from '../../model/types/sidebar'

import styles from './SidebarItem.module.scss'

interface SidebarItemProps {
    item: SidebarItemType
    collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation()
    const isAuth = useSelector(getUserAuthData)

    if (item.authOnly && !isAuth) {
        return null
    }

    return (
        <AppLink variant={AppLinkVariant.SECONDARY} to={item.path} className={styles.item}>
            <item.Icon className={styles.icon} />
            <span
                className={classNames(
                    styles.link,
                    {
                        [styles.collapsed]: collapsed,
                    },
                    []
                )}
            >
                {t(item.text)}
            </span>
        </AppLink>
    )
})
