import { Suspense } from 'react'

import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { classNames } from 'shared/lib/className'
import { useTheme } from './providers/ThemeProvider'
import { AppRouter } from './providers/router'

export const App = () => {
    const { theme } = useTheme()

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
