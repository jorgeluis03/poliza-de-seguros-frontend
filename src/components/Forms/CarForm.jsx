import React from 'react'
import { CONSTANTS } from '../../utility/constants'
import { ErrorMessage } from '../ErrorMessage'
export const CarForm = ({ register, errors }) => {
    return (
        <div className="container">
            <div className="border-b mt-12 border-gray-900/10 pb-12">
                <h2 className="text-xl font-semibold text-gray-900">Detalles del auto</h2>
                <p className="mt-1 text-md text-gray-600">Ingresa los detalles del auto a asegurar.</p>

                <div className="mt-10 grid grid-cols-1 gap-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center ">
                        <div>
                            <label htmlFor="marcaAuto" className="block text-sm font-medium text-gray-900">
                                Marca
                            </label>
                            <div className="mt-1">
                                <input
                                    id="marcaAuto"
                                    name="marcaAuto"
                                    type="text"
                                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ingresa la marca del auto"
                                    {...register("marcaAuto", { required: CONSTANTS.VALIDATION.REQUIRED })}
                                />
                                {errors.marcaAuto && <ErrorMessage error={errors.marcaAuto}/>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="modeloAuto" className="block text-sm font-medium text-gray-900">
                                Modelo
                            </label>
                            <div className="mt-1">
                                <input
                                    id="modeloAuto"
                                    name="modeloAuto"
                                    type="text"
                                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ingresa el modelo del auto"
                                    {...register("modeloAuto", { required: CONSTANTS.VALIDATION.REQUIRED })}
                                />
                                {errors.modeloAuto && <ErrorMessage error={errors.modeloAuto}/>}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center ">
                        <div>
                            <label htmlFor="numeroPlaca" className="block text-sm font-medium text-gray-900">
                                Número de Placa
                            </label>
                            <div className="mt-1">
                                <input
                                    id="numeroPlaca"
                                    name="numeroPlaca"
                                    type="text"
                                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ingresa el número de placa"
                                    {...register("numeroPlaca", { required: CONSTANTS.VALIDATION.REQUIRED })}
                                />
                                {errors.numeroPlaca && <ErrorMessage error={errors.numeroPlaca}/>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="anioAuto" className="block text-sm font-medium text-gray-900">
                                Año
                            </label>
                            <div className="mt-1">
                                <input
                                    id="anioAuto"
                                    name="anioAuto"
                                    type="number"
                                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ingresa el año del auto"
                                    {...register("anioAuto", { required: CONSTANTS.VALIDATION.REQUIRED })}
                                />
                                {errors.anioAuto && <ErrorMessage error={errors.anioAuto}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
