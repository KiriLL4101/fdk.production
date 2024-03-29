import { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import { NotificationList } from '@/entities/Notification'
import { Button, ButtonTheme, Drawer, Icon, Popover } from '@/shared/ui'
import { classNames } from '@/shared/lib/className'

import styles from './NotificationButton.module.scss'

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props
    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false)
    }, [])

    const trigger = (
        <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
            <Icon Svg={NotificationIcon} inverted />
        </Button>
    )

    return (
        <>
            <BrowserView>
                <Popover
                    className={classNames(styles.NotificationButton, {}, [className])}
                    direction='bottom left'
                    trigger={trigger}
                >
                    <NotificationList className={styles.notifications} />
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </>
    )
})
