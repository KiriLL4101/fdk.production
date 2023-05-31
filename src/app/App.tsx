import { Suspense } from 'react'

import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { useTheme } from './providers/ThemeProvider'
import { classNames } from 'shared/lib/className'

import './styles/index.scss'
import { useTranslation } from 'react-i18next'

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
