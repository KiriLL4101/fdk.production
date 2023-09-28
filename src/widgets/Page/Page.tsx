import { memo, MutableRefObject, ReactNode, UIEvent, useRef } from 'react'

import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { classNames } from 'shared/lib/className'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { getRestorationScrollByPath, restorationScrollActions } from 'features/restorationScroll'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { useThrottle } from 'shared/lib/hooks/useThrottle'
import { StateSchema } from 'app/providers/StoreProvider'

import styles from './Page.module.scss'

interface PageProps {
    className?: string
    children: ReactNode
    onScrollEnd?: () => void
}

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const scrollPosition = useSelector((state: StateSchema) =>
        getRestorationScrollByPath(state, pathname))

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    })

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition
    })

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            restorationScrollActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            })
        )
    }, 500)

    return (
        <section
            ref={wrapperRef}
            onScroll={onScroll}
            className={classNames(styles.page, {}, [className])}
        >
            {children}
            <div ref={triggerRef} />
        </section>
    )
})
