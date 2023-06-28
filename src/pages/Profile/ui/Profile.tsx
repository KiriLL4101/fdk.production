/* eslint-disable i18next/no-literal-string */
import { useEffect } from 'react'

import { profileReducer, fetchProfileData, ProfileCard } from 'entities/Profile'
import {
    DynamicModuleLoader,
    ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'

const reducers: ReducersList = {
    profile: profileReducer
}

const Profile = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <ProfileCard />
        </DynamicModuleLoader>
    )
}

export default Profile
