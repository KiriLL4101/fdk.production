import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { AppLink } from 'shared/ui'
import { AppLinkVariant } from 'shared/ui/AppLink/AppLink'
import { classNames } from 'shared/lib/className'
import { SidebarItemType } from '../../model/items'

import styles from './SidebarItem.module.scss'

interface SidebarItemProps {
    item: SidebarItemType
    collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation()

    return (
        <AppLink
            variant={AppLinkVariant.SECONDARY}
            to={item.path}
            className={styles.item}
        >
            <item.Icon className={styles.icon} />
            <span
                className={classNames(
                    styles.link,
                    {
                        [styles.collapsed]: collapsed
                    },
                    []
                )}
            >
                {t(item.text)}
            </span>
        </AppLink>
    )
})
