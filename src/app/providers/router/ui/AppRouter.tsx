import { Suspense, memo, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AppRoutersProps, routeConfig } from '@/shared/config/routeConfig/routeConfig'
import { PageLoader } from '@/widgets/PageLoader/PageLoader'
import { RequireAuth } from './RequireAuth'

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: AppRoutersProps) => {
        const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth roles={route.roles}>{element}</RequireAuth>
                    ) : (
                        element
                    )
                }
            />
        )
    }, [])

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
})
