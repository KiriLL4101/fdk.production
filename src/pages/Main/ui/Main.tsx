import { Counter } from 'entities/Counter'
import { useTranslation } from 'react-i18next'

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
