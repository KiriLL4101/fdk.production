import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { ValidateProfileError } from 'entities/Profile'
import { validateProfileData } from './validateProfileData'

const data = {
    username: 'admin',
    age: 22,
    country: Country.Kazakhstan,
    lastName: 'Ivanov',
    firstName: 'Ivan',
    city: 'asf',
    currency: Currency.USD,
}

describe('validateProfileData.test', () => {
    test('should return empty array errors', async () => {
        const result = validateProfileData(data)

        expect(result).toEqual([])
    })

    test('should return incorrect first and last name', async () => {
        const result = validateProfileData({ ...data, firstName: '', lastName: '' })

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
    })

    test('should return incorrect age', async () => {
        const result = validateProfileData({ ...data, age: undefined })

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE])
    })

    test('should return incorrect city', async () => {
        const result = validateProfileData({ ...data, city: undefined })

        expect(result).toEqual([ValidateProfileError.INCORRECT_CITY])
    })

    test('should return incorrect all', async () => {
        const result = validateProfileData({})

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_CITY,
        ])
    })
})
