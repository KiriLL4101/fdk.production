import { memo, ReactNode } from 'react'
import { useTheme } from 'app/providers/ThemeProvider'
import { classNames } from 'shared/lib/className'
import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'

import styles from './Drawer.module.scss'

interface DrawerProps {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

export const Drawer = memo((props: DrawerProps) => {
    const { className, children, onClose, isOpen } = props
    const { theme } = useTheme()

    return (
        <Portal>
            <div
                className={classNames(
                    styles.Drawer,
                    {
                        [styles.opened]: isOpen,
                    },
                    [className, theme, 'app_drawer']
                )}
            >
                <Overlay onClick={onClose} />
                <div className={styles.content}>{children}</div>
            </div>
        </Portal>
    )
})
