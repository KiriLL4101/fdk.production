import { useTranslation } from 'react-i18next'
import { Button, Input } from 'shared/ui'

import { ButtonTheme } from 'shared/ui/Button/Button'

import styles from './LoginForm.module.scss'

export const LoginForm = () => {
    const { t } = useTranslation()
    return (
        <div className={styles.LoginForm}>
            <Input
                type="text"
                className={styles.input}
                label={t('Введите username')}
                autofocus
            />
            <Input
                type="text"
                className={styles.input}
                label={t('Введите пароль')}
            />
            <Button theme={ButtonTheme.OUTLINE} className={styles.loginBtn}>
                {t('Войти')}
            </Button>
        </div>
    )
}
