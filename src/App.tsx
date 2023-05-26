import { Route, Routes } from 'react-router-dom'
import { Counter } from './components/Counter'
import './index.scss'
import { MainLazy } from './pages/Main.lazy'
import { AboutLazy } from './pages/About.lazy'
import { Link } from 'react-router-dom'
import { Suspense } from 'react'

export const App = () => {
  return (
    <div className="app">
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
