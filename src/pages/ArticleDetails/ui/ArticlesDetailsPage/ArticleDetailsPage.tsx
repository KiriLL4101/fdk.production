import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { ArticleDetails } from 'entities/Article'
import { VStack } from 'shared/ui'

import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { Page } from 'widgets/Page/Page'
import { ArticleRecommendationsList } from 'features/articleRecommendationsList'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations'

import styles from './ArticleDetailsPage.module.scss'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage = () => {
    const { t } = useTranslation('article-details')
    const { id } = useParams<{ id: string }>()

    const dispatch = useAppDispatch()

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
        dispatch(fetchArticleRecommendations())
    })

    if (!id) {
        return <Page className={styles.articleDetailsPage}>{t('Статья не найдена')}</Page>
    }

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <Page className={styles.articleDetailsPage}>
                <VStack gap='16' max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails articleId={id} />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default ArticleDetailsPage
