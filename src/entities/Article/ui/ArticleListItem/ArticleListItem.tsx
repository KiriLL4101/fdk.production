import { HTMLAttributeAnchorTarget } from 'react'
import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/className'
import { AppLink, Avatar, Button, ButtonTheme, Card, Icon, Text } from 'shared/ui'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { Article, ArticleBlockType, ArticleTextBlock, ArticleView } from '../../model/types/article'

import styles from './ArticleListItem.module.scss'

interface ArticleListItemProps {
    className?: string
    article: Article
    view: ArticleView
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = (props: ArticleListItemProps) => {
    const { className, article, view, target } = props
    const { t } = useTranslation()

    const types = <Text text={article.types.join(', ')} className={styles.types} />

    const views = (
        <>
            <Text text={String(article.views)} className={styles.views} />
            <Icon Svg={EyeIcon} />
        </>
    )
    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock

        return (
            <div className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
                <Card>
                    <div className={styles.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={styles.username} />
                        <Text text={article.createdAt} className={styles.date} />
                    </div>
                    <Text title={article.title} className={styles.title} />
                    {types}
                    <img src={article.img} className={styles.img} alt={article.title} />
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={styles.textBlock} />
                    )}
                    <div className={styles.footer}>
                        <AppLink target={target} to={RoutePath.article_details + article.id}>
                            <Button theme={ButtonTheme.OUTLINE}>{t('Читать далее...')}</Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <AppLink
            target={target}
            to={RoutePath.article_details + article.id}
            className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}
        >
            <Card className={styles.card}>
                <div className={styles.imageWrapper}>
                    <img alt={article.title} src={article.img} className={styles.img} />
                    <Text text={article.createdAt} className={styles.date} />
                </div>
                <div className={styles.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={styles.title} />
            </Card>
        </AppLink>
    )
}
