import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { Page } from 'widgets/Page/Page'
import { articlesPageReducer } from '../../model/slices/articlesPageSlice'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { ArticlesFilters } from '../ArticlesFilters/ArticlesFilters'

import styles from './ArticlesPage.module.scss'
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList'

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
}

const Articles = () => {
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage())
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams))
    })

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page onScrollEnd={onLoadNextPart} className={styles.articlesPage}>
                <ArticlesFilters />
                <ArticleInfiniteList />
            </Page>
        </DynamicModuleLoader>
    )
}

export default Articles
