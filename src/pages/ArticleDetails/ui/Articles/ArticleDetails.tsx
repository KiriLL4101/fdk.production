import { useTranslation } from 'react-i18next'

const ArticleDetails = () => {
    const { t } = useTranslation()

    return <div>{t('Статьи')}</div>
}

export default ArticleDetails
