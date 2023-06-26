import { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { userActions } from 'entities/User'
import { classNames } from 'shared/lib/className'
import { useTheme } from './providers/ThemeProvider'
import { AppRouter } from './providers/router'

export const App = () => {
    const { theme } = useTheme()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch])

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}
