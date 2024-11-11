import React from 'react'
import LogoImg from '../../assets/logo.png'
import BgLoginImg from '../../assets/bgLogin.png'
import { NavLink } from 'react-router-dom'

export const Register = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-12 bg-gray-50 lg:px-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img src={LogoImg} alt="Your Company Logo" className="mx-auto h-14 w-auto" />
          <h2 className="mt-8 text-center text-3xl font-extrabold text-gray-900">
            Crea tu cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nombre de Usuario
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ingresa tu nombre de usuario"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ingresa tu correo electrónico"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Crea una contraseña"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirmar Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Confirma tu contraseña"
                />
              </div>
            </div>

            <div>
              <NavLink to="/user-home"
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-semibold bg-primary hover:bg-secondary transition duration-300"
              >
                Registrarse
              </NavLink>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex w-1/2 h-full">
        <img src={BgLoginImg} alt="Register Background" className="object-cover w-full h-full" />
      </div>
    </div>
  )
}
