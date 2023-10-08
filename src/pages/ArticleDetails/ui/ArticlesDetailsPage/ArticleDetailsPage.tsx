import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ArticleDetails, ArticleList } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { Text, TextSize } from 'shared/ui'

import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { AddCommentForm } from 'features/addCommentsForm'
import { Page } from 'widgets/Page/Page'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'

import styles from './ArticleDetailsPage.module.scss'
import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { getArticleRecommendations } from '../../model/slices/articleDetailsPageRecommendationsSlice'
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations'
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations'

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage = () => {
    const { t } = useTranslation('article-details')
    const { id } = useParams<{ id: string }>()

    const dispatch = useAppDispatch()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const recommendations = useSelector(getArticleRecommendations.selectAll)
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading)

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
        dispatch(fetchArticleRecommendations())
    })

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text))
        },
        [dispatch]
    )
    if (!id) {
        return <Page className={styles.articleDetailsPage}>{t('Статья не найдена')}</Page>
    }

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <Page className={styles.articleDetailsPage}>
                <ArticleDetailsPageHeader />
                <ArticleDetails articleId={id} />
                <Text size={TextSize.L} className={styles.commentTitle} title={t('Рекомендуем')} />
                <ArticleList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    className={styles.recommendations}
                    target="_blank"
                />
                <Text size={TextSize.L} className={styles.commentTitle} title={t('Комментарии')} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList isLoading={commentsIsLoading} comments={comments} />
            </Page>
        </DynamicModuleLoader>
    )
}

export default ArticleDetailsPage
