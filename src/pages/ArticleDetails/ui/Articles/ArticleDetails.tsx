import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ArticleDetails } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { Button, ButtonTheme, Text } from 'shared/ui'

import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { AddCommentForm } from 'features/addCommentsForm'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Page } from 'widgets/Page/Page'
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from '../../model/slices/articleDetailsCommentsSlice'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'

import styles from './ArticleDetails.module.scss'

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
}

const ArticleDetailsPage = () => {
    const { t } = useTranslation('article-details')
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text))
        },
        [dispatch]
    )

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    if (!id) {
        return <div className={styles.articleDetailsPage}>{t('Статья не найдена')}</div>
    }

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <Page className={styles.articleDetailsPage}>
                <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                    {t('Назад к списку')}
                </Button>
                <ArticleDetails articleId={id} />
                <div className={styles.commentsBlock}>
                    <Text title={t('Комментарии')} />
                    <AddCommentForm onSendComment={onSendComment} />
                    <CommentList isLoading={commentsIsLoading} comments={comments} />
                </div>
            </Page>
        </DynamicModuleLoader>
    )
}

export default ArticleDetailsPage
