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
export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/polices' element={<Polizas />} />
          <Route path='/my-polices' element={<MyPolices />} />
          <Route path='/my-polices/:idPolicy' element={<FormPolicy/>} />
          <Route path='/request-policy' element={<FormPolicy />} />
          <Route path='/profile' element={<FormProfile />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
