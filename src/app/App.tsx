import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'
import { useTheme } from './providers/ThemeProvider'

import './styles/index.scss'
import { classNames } from 'shared/lib/className'
import { Suspense } from 'react'

export const App = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          {/* <Sidebar /> */}
          <AppRouter />
        </div>
      </Suspense>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  )
}
