import { ReactNode } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomeView from '../views/HomeView'
import DashboardView from '../views/DashboardView'
import LoginView from '../views/LoginView'

type RouterProviderProps = {
  children: ReactNode
}

const RouterProvider: React.FC<RouterProviderProps> = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/login" element={<LoginView />} />

        <Route path="*" element={<Navigate to={'/login'} replace />} />
      </Routes>
    </HashRouter>
  )
}

export default RouterProvider
