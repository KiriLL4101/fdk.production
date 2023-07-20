import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById'
import { Avatar, Icon, Skeleton, Text, TextAlign, TextSize } from 'shared/ui'
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'

import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails'
import { ArticleBlock, ArticleBlockType } from '../../model/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'

import styles from './ArticleDetails.module.scss'

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
}

interface ArticleDetailsProps {
    articleId: string
}

export const ArticleDetails = ({ articleId }: ArticleDetailsProps) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const isLoading = useSelector(getArticleDetailsIsLoading)
    const error = useSelector(getArticleDetailsError)
    const article = useSelector(getArticleDetailsData)

    const renderBlocks = useCallback((block: ArticleBlock) => {
        if (block.type === ArticleBlockType.CODE) {
            return (
                <ArticleCodeBlockComponent key={block.id} className={styles.block} block={block} />
            )
        }

        if (block.type === ArticleBlockType.TEXT) {
            return (
                <ArticleTextBlockComponent key={block.id} className={styles.block} block={block} />
            )
        }

        if (block.type === ArticleBlockType.IMAGE) {
            return (
                <ArticleImageBlockComponent key={block.id} className={styles.block} block={block} />
            )
        }

        return null
    }, [])

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(articleId))
        }
    }, [dispatch, articleId])

    let content

    if (isLoading) {
        content = (
            <>
                <Skeleton className={styles.avatar} width={200} height={200} border="50%" />
                <Skeleton className={styles.title} width={300} height={32} />
                <Skeleton className={styles.skeleton} width={600} height={24} />
                <Skeleton className={styles.skeleton} width="100%" height={200} />
                <Skeleton className={styles.skeleton} width="100%" height={200} />
            </>
        )
    } else if (error) {
        content = (
            <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи.')} />
        )
    } else if (article) {
        content = (
            <>
                <div className={styles.avatarWrapper}>
                    <Avatar src={article?.img} size={200} />
                </div>
                <Text
                    className={styles.title}
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />
                <div className={styles.articleInfo}>
                    <Icon Svg={EyeIcon} />
                    <Text text={`${article.views}`} />
                </div>
                <div className={styles.articleInfo}>
                    <Icon Svg={CalendarIcon} />
                    <Text text={article.createdAt} />
                </div>
                {article?.blocks.map(renderBlocks)}
            </>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={styles.articleDetails}>{content}</div>
        </DynamicModuleLoader>
    )
}
