import { ChangeEvent, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Button, Input, ButtonTheme, Text, TextTheme } from '@/shared/ui'
import {
    DynamicModuleLoader,
    ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'

import styles from './LoginForm.module.scss'

const initialReducers: ReducersList = {
    loginForm: loginReducer
}

interface LoginFormProps {
    onSuccess: () => void
}

const LoginForm = memo(({ onSuccess }: LoginFormProps) => {
    const { t } = useTranslation()

    const username = useSelector(getLoginUsername)
    const password = useSelector(getLoginPassword)
    const error = useSelector(getLoginError)
    const isLoading = useSelector(getLoginIsLoading)

    const dispatch = useAppDispatch()

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

    const onSubmitLogin = useCallback(async () => {
        const response = await dispatch(loginByUsername({ username, password }))

        if (response.meta.requestStatus === 'fulfilled') {
            onSuccess()
        }
    }, [onSuccess, dispatch, username, password])

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <div className={styles.LoginForm}>
                <Text title={t('Форма авторизации')} />
                {error && (
                    <Text
                        text={t('Вы ввели неверный логин или пароль')}
                        theme={TextTheme.ERROR}
                    />
                )}
                <Input
                    type='text'
                    className={styles.input}
                    label={t('Введите username')}
                    onChange={onChangeUsername}
                    value={username}
                    autofocus
                />
                <Input
                    type='text'
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
        </DynamicModuleLoader>
    )
})

export default LoginForm
