import { useTranslation } from 'react-i18next'
import { Text, VStack } from '@/shared/ui'
import { CommentCard } from '../CommentCard/CommentCard'
import { Comment } from '../../model/types/comment'

interface CommentListProps {
    comments?: Comment[]
    isLoading?: boolean
}

export const CommentList = (props: CommentListProps) => {
    const { comments, isLoading } = props
    const { t } = useTranslation()

    if (isLoading) {
        return (
            <VStack gap='16' max>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        )
    }

    return (
        <VStack gap='16' max>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} isLoading={isLoading} />
                ))
            ) : (
                <Text text={t('Комментарии отсутствуют')} />
            )}
        </VStack>
    )
}
