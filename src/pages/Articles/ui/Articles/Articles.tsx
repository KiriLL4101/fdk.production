import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { ArticleList, ArticleViewSelector } from 'entities/Article'
import { ArticleView } from 'entities/Article/model/types/article'
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { Page } from 'widgets/Page/Page'
import {
    articlesPageActions,
    articlesPageReducer,
    getArticles,
} from '../../model/slices/articlesPageSlice'
import {
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'

import styles from './Articles.module.scss'

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
}

const Articles = () => {
    const { t } = useTranslation()

    const dispatch = useAppDispatch()
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const view = useSelector(getArticlesPageView)

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view))
        },
        [dispatch]
    )

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage())
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(initArticlesPage());
    })

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page onScrollEnd={onLoadNextPart} className={styles.articlesPage}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList isLoading={isLoading} view={view} articles={articles} />
            </Page>
        </DynamicModuleLoader>
    )
}

export default Articles
