import { Profile, ValidateProfileError } from '../../types/profile'

export function validateProfileData(profile?: Profile) {
    if (!profile) {
        return [ValidateProfileError.NO_DATA]
    }

    const errors: ValidateProfileError[] = []

    const { firstName, lastName, age, city } = profile

    if (!firstName || !lastName) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA)
    }

    if (!age) {
        errors.push(ValidateProfileError.INCORRECT_AGE)
    }

    if (!city) {
        errors.push(ValidateProfileError.INCORRECT_CITY)
    }

    return errors
}
