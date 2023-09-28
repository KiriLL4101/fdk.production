import { StateSchema } from 'app/providers/StoreProvider'
import { createSelector } from '@reduxjs/toolkit'

export const getRestorationScroll = (state: StateSchema) => state.restorationScroll.scroll

export const getRestorationScrollByPath = createSelector(
    getRestorationScroll,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0
)
