/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

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

const contentAnimation = {
    enter: styles.contentEnter,
    enterActive: styles.contentEnterActive,
    exit: styles.contentExit,
    exitActive: styles.contentExitActive
}

export const Modal: FC<ModalProps> = (props) => {
    const { className = '', children, isOpen, onClose } = props

    const [mounted, setMounted] = useState(false)
    const [animationIn, setAnimationIn] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setAnimationIn(isOpen)
    }, [isOpen])

    useEffect(() => {
        if (isOpen && !mounted) {
            setMounted(true)
        } else if (!isOpen && mounted) {
            setTimeout(() => {
                setMounted(false)
            }, ANIMATION_DELAY)
        }
    }, [isOpen, mounted])

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        },
        [onClose]
    )

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    if (!mounted) return null

    return (
        <Portal>
            <div className={classNames(styles.modal, {}, [className])}>
                <div className={styles.overlay} onClick={onClose} />
                <CSSTransition
                    in={animationIn}
                    nodeRef={contentRef}
                    timeout={ANIMATION_DELAY}
                    mountOnEnter
                    unmountOnExit
                    classNames={contentAnimation}
                >
                    <div ref={contentRef} className={styles.content}>
                        {children}
                    </div>
                </CSSTransition>
            </div>
        </Portal>
    )
}
