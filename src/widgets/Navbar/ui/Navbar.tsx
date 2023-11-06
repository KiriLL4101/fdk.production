import { FC, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/className'
import { AppLink, Button, Text, TextTheme, ButtonTheme, AppLinkVariant, HStack } from '@/shared/ui'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { LoginModal } from '@/features/AuthByUserName'
import { getUserAuthData } from '@/entities/User'
import { NotificationButton } from '@/features/notificationButton'

import { AvatarDropdown } from '@/features/avatarDropdown'
import styles from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className = '' }) => {
    const { t } = useTranslation()

    const [isAuthModal, setIsAuthModal] = useState(false)

    const authData = useSelector(getUserAuthData)

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

    if (authData) {
        return (
            <div className={classNames(styles.navbar, {}, [className])}>
                <Text
                    className={styles.appName}
                    title={t('Up Course')}
                    theme={TextTheme.INVERTED}
                />
                <AppLink to={RoutePath.article_create} variant={AppLinkVariant.SECONDARY}>
                    {t('Создать статью')}
                </AppLink>
                <HStack gap='16' className={styles.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
            </div>
        )
    }

    return (
        <div className={classNames(styles.navbar, {}, [className])}>
            <div className={styles.links}>
                <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onShowModal}>
                    {t('Войти')}
                </Button>
            </div>
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </div>
    )
}
