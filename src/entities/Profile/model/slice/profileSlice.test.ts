import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { ProfileSchema, ValidateProfileError } from '../types/profile'
import { profileActions, profileReducer } from './profileSlice'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'

const data = {
    username: 'admin',
    age: 22,
    country: Country.Kazakhstan,
    lastName: 'Ivanov',
    firstName: 'Ivan',
    city: 'asf',
    currency: Currency.USD,
}

describe('profileSlice.test.ts', () => {
    test('should be set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false }
        expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({
            readonly: true,
        })
    })

    test('should be cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } }

        expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit())).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data,
        })
    })

    test('should be update profile field', () => {
        const state: DeepPartial<ProfileSchema> = { form: { age: 21 } }

        expect(
            profileReducer(state as ProfileSchema, profileActions.updateProfile({ age: 123 }))
        ).toEqual({
            form: { age: 123 },
        })
    })

    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        }

        expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({
            isLoading: true,
            validateErrors: undefined,
        })
    })

    test('test update profile service fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        }

        expect(
            profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, ''))
        ).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            validateError: undefined,
            form: data,
            data,
        })
    })
})
