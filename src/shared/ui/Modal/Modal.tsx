import { FC, ReactNode } from 'react'

import { classNames } from '@/shared/lib/className'
import { useModal } from '@/shared/lib/hooks/useModal'
import { useTheme } from '@/app/providers/ThemeProvider'
import { Portal } from '../Portal/Portal'

import styles from './Modal.module.scss'
import { Overlay } from '../Overlay/Overlay'

interface ModalProps {
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    className?: string
    lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal: FC<ModalProps> = (props) => {
    const { className = '', children, isOpen, lazy, onClose } = props

    const { close, isClosing, isMounted } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    })

    const { theme } = useTheme()

    const mods = {
        [styles.opened]: isOpen,
        [styles.isClosing]: isClosing,
    }

    if (lazy && !isMounted) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(styles.modal, mods, [className, theme, 'app_modal'])}>
                <Overlay onClick={close} />
                <div className={styles.content}>{children}</div>
            </div>
        </Portal>
    )
}
