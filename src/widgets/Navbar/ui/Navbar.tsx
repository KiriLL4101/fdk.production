import { FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/className'
import { Button } from 'shared/ui'
import { ButtonTheme } from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUserName'
import { getUserAuthData, userActions } from 'entities/User'

import styles from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className = '' }) => {
    const { t } = useTranslation()

    const [isAuthModal, setIsAuthModal] = useState(false)

    const authData = useSelector(getUserAuthData)
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

    if (authData) {
        return (
            <div className={classNames(styles.Navbar, {}, [className])}>
                <div className={styles.links}>
                    <Button
                        theme={ButtonTheme.CLEAR_INVERTED}
                        onClick={onLogout}
                    >
                        {t('Выйти')}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
            <div className={styles.links}>
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    onClick={onShowModal}
                >
                    {t('Войти')}
                </Button>
            </div>
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </div>
    )
}
