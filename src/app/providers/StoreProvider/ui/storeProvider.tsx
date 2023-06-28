import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'

import { StateSchema } from '../config/stateSchema'
import { createReduxStore } from '../config/store'

interface storeProviderProps {
    children?: ReactNode
    initialState?: DeepPartial<StateSchema>
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: storeProviderProps) => {
    const { children, initialState, asyncReducers } = props

    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>
    )

    return <Provider store={store}>{children}</Provider>
}
