import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Page } from 'widgets/Page/Page'

import styles from './ArticleEditPage.module.scss'

const ArticleEditPage = () => {
    const { t } = useTranslation()
    const { id } = useParams<{ id: string }>()
    const isEdit = Boolean(id)

    return (
        <Page className={styles.root}>
            {isEdit ? t('Редактирование статьи с ID = ') + id : t('Создание новой статьи')}
        </Page>
    )
}

export default ArticleEditPage
