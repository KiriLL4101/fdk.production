import { ChangeEvent, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'

import { Button, Input, ButtonTheme, Text, TextTheme } from 'shared/ui'
import { loginActions } from '../../model/slice/loginSlice'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'

import styles from './LoginForm.module.scss'

export const LoginForm = memo(() => {
    const { t } = useTranslation()

    const { username, password, error, isLoading } = useSelector(getLoginState)
    const dispatch = useDispatch()

    const onChangeUsername = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            dispatch(loginActions.setUsername(target.value))
        },
        [dispatch]
    )

    const onChangePassword = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            dispatch(loginActions.setPassword(target.value))
        },
        [dispatch]
    )

    const onSubmitLogin = useCallback(() => {
        dispatch(
            loginByUsername({ username, password }) as unknown as AnyAction
        )
    }, [dispatch, username, password])

    return (
        <div className={styles.LoginForm}>
            <Text title={t('Форма авторизации')} />
            {error && (
                <Text
                    text={t('Вы ввели неверный логин или пароль')}
                    theme={TextTheme.ERROR}
                />
            )}
            <Input
                type="text"
                className={styles.input}
                label={t('Введите username')}
                onChange={onChangeUsername}
                value={username}
                autofocus
            />
            <Input
                type="text"
                className={styles.input}
                label={t('Введите пароль')}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={styles.loginBtn}
                onClick={onSubmitLogin}
                disabled={isLoading}
            >
                {t('Войти')}
            </Button>
        </div>
    )
})
