import { useTranslation } from 'react-i18next'
import { ChangeEvent, memo, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { ProfileCard } from 'entities/Profile'
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { VStack } from 'shared/ui/Stack'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { ValidateProfileError } from '../../model/consts/consts'
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm'
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import { profileActions, profileReducer } from '../../model/slice/profileSlice'
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader'

interface EditableProfileCardProps {
    className?: string
    id?: string
}

const reducers: ReducersList = {
    profile: profileReducer,
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props
    const { t } = useTranslation('profile')

    const dispatch = useAppDispatch()
    const formData = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)
    const validateErrors = useSelector(getProfileValidateErrors)

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
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
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap='8' max className={className}>
                <EditableProfileCardHeader />
                {validateErrors?.length &&
                    validateErrors.map((err) => (
                        <Text
                            key={err}
                            theme={TextTheme.ERROR}
                            text={validateErrorTranslates[err]}
                            data-testid='EditableProfileCard.Error'
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
        </DynamicModuleLoader>
    )
})
