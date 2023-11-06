import { createSelector } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'

export const getRestorationScroll = (state: StateSchema) => state.restorationScroll.scroll

export const getRestorationScrollByPath = createSelector(
    getRestorationScroll,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0
)
