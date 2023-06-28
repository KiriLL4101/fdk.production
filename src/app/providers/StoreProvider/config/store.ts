import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject
} from '@reduxjs/toolkit'
import { NavigateOptions, To } from 'react-router-dom'

import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'

import { type StateSchema } from './stateSchema'
import { createReducerManager } from './reducerManager'

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void
) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer
    }

    const reducerManager = createReducerManager(rootReducer)

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
