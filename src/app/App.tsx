import { Link } from 'react-router-dom'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { MainPage } from 'pages/Main'
import { AboutPage } from 'pages/About'

import { useTheme } from './providers/ThemeProvider'

import './styles/index.scss'

export const App = () => {
  const { toggleTheme } = useTheme()

  return (
    <div className="app">
      <button onClick={toggleTheme}>Theme</button>
      <Link to={'/'}>Main</Link>
      <Link to={'/about'}>about</Link>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}
