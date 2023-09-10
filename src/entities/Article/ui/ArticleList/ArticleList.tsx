import { classNames } from 'shared/lib/className'
import { Article, ArticleView } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

import styles from './ArticleList.module.scss'

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
        <ArticleListItemSkeleton className={styles.card} key={index} view={view} />
    ));

export const ArticleList = (props: ArticleListProps) => {
    const { className, articles, view = ArticleView.SMALL, isLoading } = props

    const renderArticle = (article: Article) => (
        <ArticleListItem article={article} view={view} className={styles.card} key={article.id} />
    )

    return (
        <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
            {articles.length > 0 ? articles.map(renderArticle) : null}
            {isLoading && getSkeletons(view)}
        </div>
    )
}
