/* eslint-disable i18next/no-literal-string */
import { profileReducer } from 'entities/Profile'
import {
    DynamicModuleLoader,
    ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const reducers: ReducersList = {
    profile: profileReducer
}

const Profile = () => (
    <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
        <div>Profile</div>
    </DynamicModuleLoader>
)

export default Profile
