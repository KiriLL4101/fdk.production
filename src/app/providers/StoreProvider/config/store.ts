import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject
} from '@reduxjs/toolkit'

import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'

import { type StateSchema } from './stateSchema'
import { createReducerManager } from './reducerManager'

export function createReduxStore(initialState?: StateSchema) {
    const rootReducer: ReducersMapObject<StateSchema> = {
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
