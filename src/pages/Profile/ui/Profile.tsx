import { ChangeEvent, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import {
    profileReducer,
    fetchProfileData,
    ProfileCard,
    getProfileIsLoading,
    getProfileError,
    profileActions,
    getProfileReadonly,
    getProfileForm,
    getProfileValidateErrors,
    ValidateProfileError,
} from 'entities/Profile'
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { Text, TextTheme, VStack } from 'shared/ui'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { Page } from 'widgets/Page/Page'
import { ProfileHeader } from './ProfileHeader/ProfileHeader'

const reducers: ReducersList = {
    profile: profileReducer,
}

const Profile = () => {
    const { t } = useTranslation('profile')
    const dispatch = useAppDispatch()

    const { id } = useParams<{ id: string }>()

    const formData = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)
    const validateErrors = useSelector(getProfileValidateErrors)

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [ValidateProfileError.INCORRECT_CITY]: t('Некорректный регион'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    }

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id))
        }
    })

    const onChangeFirstName = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            dispatch(profileActions.updateProfile({ firstName: target.value }))
        },
        [dispatch]
    )

    const onChangeLastName = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            dispatch(profileActions.updateProfile({ lastName: target.value }))
        },
        [dispatch]
    )

    const onChangeAge = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            dispatch(
                profileActions.updateProfile({
                    age: Number(target.value.split(/ /)[0].replace(/[^\d]/g, '')),
                })
            )
        },
        [dispatch]
    )

    const onChangeCity = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            dispatch(profileActions.updateProfile({ city: target.value }))
        },
        [dispatch]
    )

    const onChangeUsername = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            dispatch(profileActions.updateProfile({ username: target.value }))
        },
        [dispatch]
    )

    const onChangeAvatar = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            dispatch(profileActions.updateProfile({ avatar: target.value }))
        },
        [dispatch]
    )

    const onChangeCurrency = useCallback(
        (currency: Currency) => {
            dispatch(profileActions.updateProfile({ currency }))
        },
        [dispatch]
    )

    const onChangeCountry = useCallback(
        (country: Country) => {
            dispatch(profileActions.updateProfile({ country }))
        },
        [dispatch]
    )

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <Page>
                <VStack gap='16' max>
                    <ProfileHeader />
                    {validateErrors?.length &&
                        validateErrors.map((err) => (
                            <Text
                                key={err}
                                text={validateErrorTranslates[err]}
                                theme={TextTheme.ERROR}
                            />
                        ))}
                    <ProfileCard
                        data={formData}
                        isLoading={isLoading}
                        error={error}
                        readonly={readonly}
                        onChangeFirstName={onChangeFirstName}
                        onChangeLastName={onChangeLastName}
                        onChangeAge={onChangeAge}
                        onChangeCity={onChangeCity}
                        onChangeUsername={onChangeUsername}
                        onChangeAvatar={onChangeAvatar}
                        onChangeCurrency={onChangeCurrency}
                        onChangeCountry={onChangeCountry}
                    />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default Profile
