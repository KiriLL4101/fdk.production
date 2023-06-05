/* eslint-disable i18next/no-literal-string */
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/className'

import { Button, Modal } from 'shared/ui'
import { ButtonTheme } from 'shared/ui/Button/Button'

import styles from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className = '' }) => {
    const [opened, setOpened] = useState(false)
    const { t } = useTranslation()

    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
            <div className={styles.links}>
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    onClick={() => setOpened(true)}
                >
                    {t('Войти')}
                </Button>
            </div>
            <Modal isOpen={opened} onClose={() => setOpened(false)}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio dolorum vel repellendus facere, architecto porro,
                quod similique, natus deleniti reiciendis nulla aspernatur.
                Libero mollitia vitae natus ullam dolore illum! Nisi.
            </Modal>
        </div>
    )
}
