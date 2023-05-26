import { Link } from 'react-router-dom'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { MainLazy } from './pages/Main.lazy'
import { AboutLazy } from './pages/About.lazy'

import './styles/index.scss'
import { useTheme } from './theme/useTheme'

export const App = () => {
  const { toggleTheme } = useTheme()

  return (
    <div className="app">
      <button onClick={toggleTheme}>Theme</button>
      <Link to={'/'}>Main</Link>
      <Link to={'/about'}>about</Link>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLazy />} />
          <Route path="/about" element={<AboutLazy />} />
        </Routes>
      </Suspense>
    </div>
  )
}
