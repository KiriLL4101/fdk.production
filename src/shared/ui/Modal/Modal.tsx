/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, ReactNode } from 'react'

import { ThemeProvider, useTheme } from 'app/providers/ThemeProvider'
import { Portal } from '../Portal/Portal'

import styles from './Modal.module.scss'

interface ModalProps {
    children: ReactNode
    isOpen: boolean
    onClose: () => void
}

export const Modal: FC<ModalProps> = (props) => {
    const { isOpen, onClose, children } = props
    const { theme } = useTheme()

    if (!isOpen) return null

    return (
        <Portal>
            <ThemeProvider>
                <div className={theme}>
                    <div className={styles.content}>{children}</div>
                    <div className={styles.overlay} onClick={() => onClose()} />
                </div>
            </ThemeProvider>
        </Portal>
    )
}
