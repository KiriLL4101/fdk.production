import { Suspense } from 'react'

import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'
import { useTheme } from './providers/ThemeProvider'
import { classNames } from 'shared/lib/className'
import { ThemeSwitcher } from 'shared/ui'

import './styles/index.scss'

export const App = () => {
  const { theme } = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          {/* <Sidebar /> */}
          <AppRouter />
        </div>
      </Suspense>
      <ThemeSwitcher />
    </div>
  )
}
