import { useTranslation } from 'react-i18next'
import { memo, useCallback, Suspense } from 'react'
import { useSelector } from 'react-redux'

import { Text, TextSize } from '@/shared/ui/Text/Text'
import { CommentList } from '@/entities/Comment'
import { VStack } from '@/shared/ui/Stack'
import { Loader } from '@/shared/ui/Loader/Loader'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect'
import { classNames } from '@/shared/lib/className'
import { AddCommentForm } from '@/features/addCommentsForm'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'

interface ArticleDetailsCommentsProps {
    className?: string
    id?: string
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
    const { className, id } = props
    const { t } = useTranslation()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const dispatch = useAppDispatch()

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text))
        },
        [dispatch]
    )

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    return (
        <VStack gap='16' max className={classNames('', {}, [className])}>
            <Text size={TextSize.L} title={t('Комментарии')} />
            <Suspense fallback={<Loader />}>
                <AddCommentForm onSendComment={onSendComment} />
            </Suspense>
            <CommentList isLoading={commentsIsLoading} comments={comments} />
        </VStack>
    )
})
