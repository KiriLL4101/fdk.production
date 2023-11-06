import { memo } from 'react'

import { classNames } from '@/shared/lib/className'

import cls from './Overlay.module.scss'

interface OverlayProps {
    className?: string
    onClick?: () => void
}

export const Overlay = memo((props: OverlayProps) => {
    const { className, onClick } = props

    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    return <div onClick={onClick} className={classNames(cls.Overlay, {}, [className])} />
})
