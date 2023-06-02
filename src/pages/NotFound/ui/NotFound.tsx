import { useTranslation } from 'react-i18next'

import styles from './NotFound.module.scss'

export const NotFound = () => {
    const { t } = useTranslation()
    return <div className={styles.notFound}>{t('Страница не найдена')}</div>
}
