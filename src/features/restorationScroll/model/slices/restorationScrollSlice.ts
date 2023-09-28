import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RestorationScrollSchema } from '../types/restorationScrollSchema';

const initialState: RestorationScrollSchema = {
    scroll: {},
}

export const restorationScrollSlice = createSlice({
    name: 'restorationScroll',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>
        ) => {
            state.scroll[payload.path] = payload.position
        },
    },
})

// Action creators are generated for each case reducer function
export const { actions: restorationScrollActions } = restorationScrollSlice
export const { reducer: restorationScrollReducer } = restorationScrollSlice
