import { FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/className'
import {
    AppLink,
    Button,
    Text,
    TextTheme,
    ButtonTheme,
    AppLinkVariant,
    Avatar,
    Dropdown,
} from 'shared/ui'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { LoginModal } from 'features/AuthByUserName'
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from 'entities/User'

import styles from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className = '' }) => {
    const { t } = useTranslation()

    const [isAuthModal, setIsAuthModal] = useState(false)

    const authData = useSelector(getUserAuthData)
    const isAdmin = useSelector(isUserAdmin)
    const isManager = useSelector(isUserManager)

    const dispatch = useDispatch()

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    const isAdminPanelAvailable = isAdmin || isManager

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
                <Dropdown
                    direction='bottom left'
                    className={styles.dropdown}
                    items={[
                        ...(isAdminPanelAvailable
                            ? [
                                {
                                    content: t('Админка'),
                                    href: RoutePath.admin_panel,
                                },
                            ]
                            : []),
                        {
                            content: t('Профиль'),
                            href: RoutePath.profile + authData.id,
                        },
                        {
                            content: t('Выйти'),
                            onClick: onLogout,
                        },
                    ]}
                    trigger={<Avatar size={30} src={authData.avatar} />}
                />
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
