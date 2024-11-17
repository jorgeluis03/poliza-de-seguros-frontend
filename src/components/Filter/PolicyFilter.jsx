import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const PolicyFilter = ({ onSearch, onClear }) => {
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    const role = decodedToken.role;

    const [filters, setFilters] = useState({
        numeroPoliza: '',
        tipoPoliza: '',
        usuarioCorreo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleClear = () => {
        setFilters({
            numeroPoliza: '',
            tipoPoliza: '',
            usuarioCorreo: ''
        });
        onClear();
    }

    const handlerSearch = () => {
        onSearch(filters);
    }

    return (
        <div className="container overflow-x-auto bg-white shadow-lg rounded-lg max-w-full mx-auto mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Filtrar:</h2>
            <div className='flex justify-between items-center mb-6'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                    <div>
                        <label htmlFor="numeroPoliza" className="block text-sm font-medium text-gray-700">
                            N° de Póliza
                        </label>
                        <input
                            type="text"
                            name="numeroPoliza"
                            id="numeroPoliza"
                            value={filters.numeroPoliza}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Ingrese el N° de Póliza"
                        />
                    </div>

                    {
                        role == 'ROLE_ADMIN' &&
                        <>
                            <div>
                                <label htmlFor="tipoPoliza" className="block text-sm font-medium text-gray-700">
                                    Tipo Poliza
                                </label>
                                <select
                                    name="tipoPoliza"
                                    id="tipoPoliza"
                                    value={filters.tipoPoliza}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="">Seleccione el tipo de póliza</option>
                                    <option value="Auto">Auto</option>
                                    <option value="Inmueble">Inmueble</option>
                                    <option value="Celular">Celular</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="usuarioCorreo" className="block text-sm font-medium text-gray-700">
                                    Correo Cliente
                                </label>
                                <input
                                    type="text"
                                    name="usuarioCorreo"
                                    id="usuarioCorreo"
                                    value={filters.usuarioCorreo}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Ingrese el correo del cliente"
                                />
                            </div>
                        </>

                    }
                </div>


                <div className="flex flex-col space-y-4 justify-center">
                    <button
                        onClick={handlerSearch}
                        className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-secondary transition duration-200"
                    >
                        Buscar
                    </button>
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-300 transition duration-200"
                    >
                        Limpiar
                    </button>
                    {
                        role !== 'ROLE_ADMIN' &&
                        <NavLink
                            to="/request-policy"
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-400 transition duration-200"
                        >
                            Solicitar
                        </NavLink>
                    }


                </div>
            </div>

        </div>
    )
}
