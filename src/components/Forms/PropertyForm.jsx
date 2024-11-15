import React from 'react'
import { useState } from 'react';
import { CONSTANTS } from '../../utility/constants';
export const PropertyForm = ({ register, errors, watch }) => {

    const tipoInmueble = watch("tipoInmueble")
    return (
        <div className="container">
            <div className="border-b mt-12 border-gray-900/10 pb-12">
                <h2 className="text-xl font-semibold text-gray-900">Detalles del Inmueble</h2>
                <p className="mt-1 text-md text-gray-600">Ingresa los detalles del inmueble a asegurar.</p>

                <div className="mt-10 grid grid-cols-1 gap-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center ">
                        <div>
                            <label htmlFor="direccionInmueble" className="block text-sm font-medium text-gray-900">
                                Direccion
                            </label>
                            <div className="mt-1">
                                <input
                                    id="direccionInmueble"
                                    name="direccionInmueble"
                                    type="text"
                                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ingresa la dirección del inmueble"
                                    {...register("direccionInmueble", { required: CONSTANTS.VALIDATION.REQUIRED })}
                                />
                                {errors.direccionInmueble && <span className="text-red-500">{errors.direccionInmueble.message}</span>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="tipoInmueble" className="block text-sm font-medium text-gray-900">
                                Tipo de Inmueble
                            </label>
                            <div className="mt-1">
                                <select
                                    id="tipoInmueble"
                                    name="tipoInmueble"
                                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    {...register("tipoInmueble", { required: CONSTANTS.VALIDATION.REQUIRED })}
                                >
                                    <option value="">Selecciona el tipo de inmueble</option>
                                    <option value="1">Departamento</option>
                                    <option value="2">Casa</option>
                                    <option value="3">Edificio</option>
                                </select>
                                {errors.tipoInmueble && <span className="text-red-500">{errors.tipoInmueble.message}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
