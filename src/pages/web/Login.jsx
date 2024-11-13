import React from 'react'
import LogoImg from '../../assets/logo.png'
import BgLoginImg from '../../assets/bgLogin.png'
import { NavLink } from 'react-router-dom'

export const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-12 bg-gray-50 lg:px-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img src={LogoImg} alt="Your Company Logo" className="mx-auto h-14 w-auto" />
          <h2 className="mt-8 text-center text-3xl font-extrabold text-gray-900">
            Inicia sesión en tu cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ingresa tu usuario"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <a href="#" className="text-sm text-primary hover:text-secondary font-semibold">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
            </div>

            <div>
              <NavLink to="/dashboard">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-semibold bg-primary hover:bg-secondary transition duration-300"
                >
                  Iniciar Sesión
                </button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex w-1/2 h-full">
        <img src={BgLoginImg} alt="Login Background" className="object-cover w-full h-full" />
      </div>
    </div>
  )
}
