import { useTranslation } from 'react-i18next'

const Articles = () => {
    const { t } = useTranslation()

    return <div>{t('Статьи')}</div>
}

export default Articles
