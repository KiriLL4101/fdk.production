import { ChangeEvent, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'

import { Button, Input, ButtonTheme, Text, TextTheme } from 'shared/ui'
import {
    DynamicModuleLoader,
    ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
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
const LoginForm = memo(() => {
    const { t } = useTranslation()

    const username = useSelector(getLoginUsername)
    const password = useSelector(getLoginPassword)
    const error = useSelector(getLoginError)
    const isLoading = useSelector(getLoginIsLoading)

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
        </DynamicModuleLoader>
    )
})

export default LoginForm
