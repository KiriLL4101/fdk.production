import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { ChangeEvent, useCallback } from 'react'
import {
    ArticleSortField,
    ArticleSortSelector,
    ArticleType,
    ArticleTypeTabs,
    ArticleView,
    ArticleViewSelector,
} from 'entities/Article'
import { useDebounce } from 'shared/lib/hooks/useDebounce'
import { SortOrder } from 'shared/types'
import { Card, Input } from 'shared/ui'
import styles from './ArticlesFilters.module.scss'
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import { articlesPageActions } from '../../model/slices/articlesPageSlice'

export const ArticlesFilters = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const view = useSelector(getArticlesPageView)
    const sort = useSelector(getArticlesPageSort)
    const order = useSelector(getArticlesPageOrder)
    const search = useSelector(getArticlesPageSearch)
    const type = useSelector(getArticlesPageType)

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }))
    }, [dispatch])

    const debouncedFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view))
        },
        [dispatch]
    )

    const onChangeSort = useCallback(
        (newSort: ArticleSortField) => {
            dispatch(articlesPageActions.setSort(newSort))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData]
    )

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(articlesPageActions.setOrder(newOrder))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData]
    )

    const onChangeSearch = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            dispatch(articlesPageActions.setSearch(target.value))
            dispatch(articlesPageActions.setPage(1))
            debouncedFetchData()
        },
        [dispatch, debouncedFetchData]
    )

    const onChangeType = useCallback(
        (value: ArticleType) => {
            dispatch(articlesPageActions.setType(value))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData]
    )

    return (
        <div className={styles.articlesFilters}>
            <div className={styles.sortWrapper}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card className={styles.search}>
                <Input onChange={onChangeSearch} value={search} label={t('Поиск')} />
            </Card>
            <ArticleTypeTabs value={type} onChangeType={onChangeType} className={styles.tabs} />
        </div>
    )
}
