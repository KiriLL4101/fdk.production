import { StateSchema } from 'app/providers/StoreProvider'
import { getProfileError } from './getProfileError'

describe('getProfileError.test', () => {
    test('should return error message', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: 'Error message',
            },
        }
        expect(getProfileError(state as StateSchema)).toEqual('Error message')
    })
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileError(state as StateSchema)).toEqual(undefined)
    })
})
