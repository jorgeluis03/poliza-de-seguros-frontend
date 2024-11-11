import React from 'react'
import { useState } from 'react';
export const UserFilter = ({ onSearch, onClear }) => {
    const [filters, setFilters] = useState({
        dni: '',
        nombre: '',
        apellido: '',
        correo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleSearch = () => {
        onSearch(filters);
    };

    const handleClear = () => {
        setFilters({
            dni: '',
            nombre: '',
            apellido: '',
            correo: '',
        });
        onClear();
    };

    return (
        <div className="container overflow-x-auto bg-white shadow-lg rounded-lg max-w-full mx-auto mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Filtrar:</h2>
            <div className='flex justify-between items-center mb-6'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                            DNI
                        </label>
                        <input
                            type="text"
                            name="dni"
                            id="dni"
                            value={filters.dni}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Ingrese el DNI"
                        />
                    </div>

                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            value={filters.nombre}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Ingrese el nombre"
                        />
                    </div>

                    <div>
                        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                            Apellido
                        </label>
                        <input
                            type="text"
                            name="apellido"
                            id="apellido"
                            value={filters.apellido}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Ingrese el apellido"
                        />
                    </div>

                    <div>
                        <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                            Correo
                        </label>
                        <input
                            type="email"
                            name="correo"
                            id="correo"
                            value={filters.correo}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Ingrese el correo"
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-4 justify-center">
                    <button
                        onClick={handleSearch}
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

                </div>
            </div>

        </div>
    );
};
