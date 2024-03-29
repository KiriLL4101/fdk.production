import { ReactNode, useCallback } from 'react'
import { Card, CardTheme } from '@/shared/ui/Card/Card'
import { classNames } from '@/shared/lib/className'
import cls from './Tabs.module.scss'

export interface TabItem<T> {
    value: T
    content: ReactNode
}

interface TabsProps<T> {
    className?: string
    tabs: TabItem<T>[]
    value: T
    onTabClick: (tab: TabItem<T>) => void
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
    const { className, tabs, onTabClick, value } = props

    const clickHandle = useCallback(
        (tab: TabItem<T>) => () => {
            onTabClick(tab)
        },
        [onTabClick]
    )

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    className={cls.tab}
                    key={tab.value}
                    onClick={clickHandle(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    )
}
