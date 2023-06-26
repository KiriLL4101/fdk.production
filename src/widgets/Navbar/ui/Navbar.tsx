import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/className'
import { Button } from 'shared/ui'
import { ButtonTheme } from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUserName'

import styles from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className = '' }) => {
    const [isAuthModal, setIsAuthModal] = useState(false)

    const { t } = useTranslation()

    const onCloseModal = () => {
        setIsAuthModal(false)
    }

    const onShowModal = () => {
        setIsAuthModal(true)
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
