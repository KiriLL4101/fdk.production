import { StoryFn } from '@storybook/react'
import { DeepPartial } from '@reduxjs/toolkit'

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
// import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
// import { profileReducer } from 'entities/Profile'
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice'
import { profileReducer } from 'entities/Profile'

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer
}

export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
    (StoryComponent: StoryFn) =>
        (
            <StoreProvider
                initialState={state}
                asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
            >
                <StoryComponent />
            </StoreProvider>
        )
