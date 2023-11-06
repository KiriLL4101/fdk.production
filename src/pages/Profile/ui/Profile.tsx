import { useParams } from 'react-router-dom'

import { EditableProfileCard } from '@/features/editableProfileCard'
import { VStack } from '@/shared/ui'
import { Page } from '@/widgets/Page/Page'

const Profile = () => {
    const { id } = useParams<{ id: string }>()

    return (
        <Page>
            <VStack gap='16' max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    )
}

export default Profile
