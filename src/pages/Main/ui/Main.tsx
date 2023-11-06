import { useTranslation } from 'react-i18next'
import { Counter } from '@/entities/Counter'

const Main = () => {
    const { t } = useTranslation()

    return (
        <div>
            {t('Главная')}
            <Counter />
        </div>
    )
}

export default Main
