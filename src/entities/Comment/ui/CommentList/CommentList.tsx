import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui'
import { CommentCard } from '../CommentCard/CommentCard'
import { Comment } from '../../model/types/comment'

import styles from './CommentList.module.scss'

interface CommentListProps {
    comments?: Comment[]
    isLoading?: boolean
}

export const CommentList = (props: CommentListProps) => {
    const { comments, isLoading } = props
    const { t } = useTranslation()

    return (
        <div className={styles.list}>
            {comments?.length ? (
                comments.map((comment) => <CommentCard comment={comment} isLoading={isLoading} />)
            ) : (
                <Text text={t('Комментарии отсутствуют')} />
            )}
        </div>
    )
}
