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
import {
    articlesPageActions,
    articlesPageReducer,
    getArticles,
} from '../../model/slices/articlesPageSlice'
import {
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'

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

    useInitialEffect(() => {
        dispatch(articlesPageActions.initState())
        dispatch(fetchArticlesList({}))
    })

    return (
        <DynamicModuleLoader reducers={reducers}>
            <ArticleViewSelector view={view} onViewClick={onChangeView} />
            <ArticleList isLoading={isLoading} view={view} articles={articles} />
        </DynamicModuleLoader>
    )
}

export default Articles
