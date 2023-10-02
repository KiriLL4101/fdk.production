import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article, ArticleType } from 'entities/Article'
import { addQueryParams } from 'shared/lib/url/addQueryParams'
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../../selectors/articlesPageSelectors'

interface FetchArticlesListProps {
    replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi

    const limit = getArticlesPageLimit(getState())
    const sort = getArticlesPageSort(getState())
    const order = getArticlesPageOrder(getState())
    const search = getArticlesPageSearch(getState())
    const page = getArticlesPageNum(getState())
    const types = getArticlesPageType(getState())

    try {
        addQueryParams({
            sort,
            order,
            search,
            types,
        })

        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                _sort: sort,
                _order: order,
                ...(search && { q: search }),
                ...(types !== ArticleType.ALL && { types }),
            },
        })

        if (!response.data) {
            throw new Error()
        }

        return response.data
    } catch (e) {
        return rejectWithValue('error')
    }
})
