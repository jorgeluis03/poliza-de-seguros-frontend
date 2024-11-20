import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/web/Home'
import { NoPage } from './pages/web/NoPage'
import { Login } from './pages/web/Login'
import { Register } from './pages/web/Register'
import { Polizas } from './pages/admin/Polizas'
import { MyPolices } from './pages/user/MyPolices'
import { FormPolicy } from './pages/user/FormPolicy'
import { FormProfile } from './pages/user/FormProfile'
import { DetallesPoliza } from './pages/admin/DetallesPoliza'
import { Reportes } from './pages/admin/Reportes'
import { ProtectedRoute } from './components/ProtectedRoute'

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route
            path='/polices'
            element={
              <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                <Polizas />
              </ProtectedRoute>} />
          <Route
            path='/polices/:idPolicy'
            element={
              <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                <DetallesPoliza />
              </ProtectedRoute>} />
          <Route
            path='/reports'
            element={
              <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                <Reportes />
              </ProtectedRoute>} />

          <Route
            path='/my-polices'
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <MyPolices />
              </ProtectedRoute>} />
          <Route
            path='/my-polices/:idPolicy'
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <FormPolicy />
              </ProtectedRoute>} />
          <Route
            path='/request-policy'
            element={
              <ProtectedRoute allowedRoles={['ROLE_CLIENT']}>
                <FormPolicy />
              </ProtectedRoute>} />

          {/* <Route path='/polices/:idPolicy' element={<DetallesPoliza />} /> */}
          {/*  <Route path='/reports' element={<Reportes />} /> */}
          {/* <Route path='/my-polices' element={<MyPolices />} /> */}
          {/* <Route path='/my-polices/:idPolicy' element={<FormPolicy />} />
          <Route path='/request-policy' element={<FormPolicy />} /> */}
          <Route path='/profile' element={<FormProfile />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
