import React from 'react'

export const PhoneForm = () => {
    return (
        <div className="container">
            <div className="border-b mt-12 border-gray-900/10 pb-12">
                <h2 className="text-xl font-semibold text-gray-900">Detalles del Celular</h2>
                <p className="mt-1 text-md text-gray-600">Ingresa los detalles del celular a asegurar.</p>

                <div className="mt-10 grid grid-cols-1 gap-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center ">
                        <div>
                            <label htmlFor="marca" className="block text-sm font-medium text-gray-900">
                                Marca
                            </label>
                            <div className="mt-1">
                                <input
                                    id="marca"
                                    name="marca"
                                    type="text"
                                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ingresa la marca del celular"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="modelo" className="block text-sm font-medium text-gray-900">
                                Modelo
                            </label>
                            <div className="mt-1">
                                <input
                                    id="modelo"
                                    name="modelo"
                                    type="text"
                                    required
                                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ingresa el modelo del celular"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
