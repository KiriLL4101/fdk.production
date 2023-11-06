import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button/Button'
import { classNames } from '@/shared/lib/className'
import styles from './PageError.module.scss'

interface PageErrorProps {
    className?: string
}

export const PageError: FC<PageErrorProps> = ({ className = '' }) => {
    const { t } = useTranslation()
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload()
    }

    return (
        <div className={classNames(styles.PageError, {}, [className])}>
            <p>{t('Произошла непредвиденная ошибка')}</p>
            <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
        </div>
    )
}
