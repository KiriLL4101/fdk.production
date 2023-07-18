import axios from 'axios'

import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchProfileData } from './fetchProfileData'

jest.mock('axios')

const mockedAxios = jest.mocked(axios)

describe('fetchProfileData.test', () => {
    test('should be return profile data', async () => {
        const data = {
            username: 'admin',
            age: 22,
            country: Country.Kazakhstan,
            lastName: 'Ivanov',
            firstName: 'Ivan',
            city: 'asf',
            currency: Currency.USD,
        }

        const thunk = new TestAsyncThunk(fetchProfileData)

        thunk.api.get.mockReturnValue(Promise.resolve({ data }))
        const result = await thunk.callThunk()

        expect(mockedAxios.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)
    })

    test('should be error get profile data', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData)
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))

        const result = await thunk.callThunk()

        expect(mockedAxios.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('error')
    })
})