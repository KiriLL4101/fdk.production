import { ChangeEvent, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
    profileReducer,
    fetchProfileData,
    ProfileCard,
    getProfileIsLoading,
    getProfileError,
    profileActions,
    getProfileReadonly,
    getProfileForm
} from 'entities/Profile'
import {
    DynamicModuleLoader,
    ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { ProfileHeader } from './ProfileHeader/ProfileHeader'

const reducers: ReducersList = {
    profile: profileReducer
}

const Profile = () => {
    const dispatch = useAppDispatch()

    const formData = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

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
                    age: Number(
                        target.value.split(/ /)[0].replace(/[^\d]/g, '')
                    )
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
            <ProfileHeader />
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
        </DynamicModuleLoader>
    )
}

export default Profile
