import { AppLink, Avatar, Skeleton, Text, VStack } from 'shared/ui'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Comment } from '../../model/types/comment'

import styles from './CommentCard.module.scss'

interface CommentCardProps {
    comment?: Comment
    isLoading?: boolean
}

export const CommentCard = ({ comment, isLoading }: CommentCardProps) => {
    if (isLoading) {
        return (
            <VStack gap='8' max className={styles.commentCard}>
                <div className={styles.header}>
                    <Skeleton width={30} height={30} border='50%' />
                    <Skeleton height={16} width={100} className={styles.username} />
                </div>
                <Skeleton className={styles.text} width='100%' height={50} />
            </VStack>
        )
    }

    if (!comment) {
        return null
    }

    return (
        <VStack max className={styles.commentCard}>
            <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={styles.header}>
                {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
                <Text className={styles.username} title={comment.user.username} />
            </AppLink>
            <Text className={styles.text} text={comment.text} />
        </VStack>
    )
}
