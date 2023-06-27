import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { userActions } from 'entities/User'
import { loginByUsername } from './loginByUsername'

jest.mock('axios')

const mockedAxios = jest.mocked(axios)

describe('loginByUsername.test.ts', () => {
    let dispatch: Dispatch
    let getState: () => StateSchema

    beforeEach(() => {
        dispatch = jest.fn()
        getState = jest.fn()
    })

    test('should be success login', async () => {
        const userValue = { username: '123', id: 1 }
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }))

        const action = loginByUsername({ username: '123', password: '321' })
        const result = await action(dispatch, getState, undefined)

        expect(dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userValue)
        )
        expect(dispatch).toHaveBeenCalledTimes(3)
        expect(mockedAxios.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(userValue)
    })

    test('should be error login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))

        const action = loginByUsername({ username: '123', password: '321' })
        const result = await action(dispatch, getState, undefined)

        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(mockedAxios.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('error')
    })
})
