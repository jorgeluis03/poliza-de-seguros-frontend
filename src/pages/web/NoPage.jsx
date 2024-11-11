import React from 'react'
import { NavLink } from 'react-router-dom'

export const NoPage = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Página no encontrada
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Lo siento, no se encontró la pagina que buscas.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <NavLink to="/">
              <button className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Regresar
              </button>
            </NavLink>
          </div>
        </div>
      </main>
    </>
  )
}
