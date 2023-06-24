/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { classNames } from 'shared/lib/className'
import { Portal } from '../Portal/Portal'

import styles from './Modal.module.scss'

interface ModalProps {
    children: ReactNode
    isOpen: boolean
    onClose: () => void
    className?: string
}

const ANIMATION_DELAY = 300

export const Modal: FC<ModalProps> = (props) => {
    const { className = '', children, isOpen, onClose } = props

    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
        }
    }, [isOpen])

    const closeHandler = useCallback(() => {
        if (!onClose) return
        setIsClosing(true)

        timerRef.current = setTimeout(() => {
            onClose()
            setIsClosing(false)
        }, ANIMATION_DELAY)
    }, [onClose])

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeHandler()
            }
        },
        [closeHandler]
    )

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current)
            }
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    const mods: Record<string, boolean> = {
        [styles.opened]: isOpen,
        [styles.isClosing]: isClosing
    }

    if (!isMounted) return null

    return (
        <Portal>
            <div className={classNames(styles.Modal, mods, [className])}>
                <div className={styles.overlay} onClick={closeHandler} />
                <div className={styles.content}>{children}</div>
            </div>
        </Portal>
    )
}
