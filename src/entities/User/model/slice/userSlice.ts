import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserSchema, User } from '../types/user'

const initialState: UserSchema = {}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {},
        initAuthData: (state) => {},
        logout: (state) => {}
    }
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
