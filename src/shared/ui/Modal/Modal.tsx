/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, ReactNode } from 'react'

import { Portal } from '../Portal/Portal'

import styles from './Modal.module.scss'

interface ModalProps {
    children: ReactNode
    isOpen: boolean
    onClose: () => void
}

export const Modal: FC<ModalProps> = (props) => {
    const { isOpen, onClose, children } = props

    if (!isOpen) return null

    return (
        <Portal>
            <div className={styles.content}>{children}</div>
            <div className={styles.overlay} onClick={() => onClose()} />
        </Portal>
    )
}
