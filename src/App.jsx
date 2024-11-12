import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/web/Home'
import { NoPage } from './pages/web/NoPage'
import { Login } from './pages/web/Login'
import { Register } from './pages/web/Register'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { UserHome } from './pages/user/UserHome'
import { FormPolicy } from './pages/user/FormPolicy'
import { FormProfile } from './pages/user/FormProfile'
export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path='/mis-polizas' element={<UserHome />} />
          <Route path='/solicitar-poliza' element={<FormPolicy />} />
          <Route path='/perfil' element={<FormProfile />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
