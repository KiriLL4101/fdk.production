import { memo } from 'react'
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'
import { NotificationList } from 'entities/Notification'
import { Button, ButtonTheme, Icon, Popover } from 'shared/ui'
import { classNames } from 'shared/lib/className'

import styles from './NotificationButton.module.scss'

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props

    const trigger = (
        <Button theme={ButtonTheme.CLEAR}>
            <Icon Svg={NotificationIcon} inverted />
        </Button>
    )

    return (
        <Popover
            className={classNames(styles.NotificationButton, {}, [className])}
            direction='bottom left'
            trigger={trigger}
        >
            <NotificationList className={styles.notifications} />
        </Popover>
    )
})
