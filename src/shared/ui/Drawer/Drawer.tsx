import { memo, ReactNode } from 'react'

import { useTheme } from 'app/providers/ThemeProvider'
import { classNames } from 'shared/lib/className'
import { useModal } from 'shared/lib/hooks/useModal'
import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'

import styles from './Drawer.module.scss'

interface DrawerProps {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

export const Drawer = memo((props: DrawerProps) => {
    const { className, children, onClose, lazy, isOpen } = props
    const { theme } = useTheme()

    const { close, isClosing, isMounted } = useModal({
        animationDelay: 300,
        onClose,
        isOpen,
    })

    const mods = {
        [styles.opened]: isOpen,
        [styles.isClosing]: isClosing,
    }

    if (lazy && !isMounted) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(styles.drawer, mods, [className, theme, 'app_drawer'])}>
                <Overlay onClick={close} />
                <div className={styles.content}>{children}</div>
            </div>
        </Portal>
    )
})
