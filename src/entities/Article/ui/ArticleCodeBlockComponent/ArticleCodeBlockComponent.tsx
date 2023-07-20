import { memo } from 'react'

import { Code } from 'shared/ui'
import { classNames } from 'shared/lib/className'
import { ArticleCodeBlock } from '../../model/types/article'

import styles from './ArticleCodeBlockComponent.module.scss'

interface ArticleCodeBlockComponentProps {
    className?: string
    block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props

    return (
        <div className={classNames(styles.articleCodeBlockComponent, {}, [className])}>
            <Code text={block.code} />
        </div>
    )
})
