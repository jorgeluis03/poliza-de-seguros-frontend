import React from 'react'
import { Navbar } from '../../components/NavbarGestion'
import { Header } from '../../components/Header';
import { UsuariosMock } from '../../mockData/data';
import { UserFilter } from '../../components/Filter/UserFilter';
const menus = [
    {
        name: 'Usuarios',
        submenu: [],
    },
    {
        name: 'Pólizas',
        submenu: [],
    },
    {
        name: 'Cotizaciones',
        submenu: [
            { name: 'Solicitudes', link: '/cotizaciones/solicitudes' },
            { name: 'Expirado', link: '/cotizaciones/expirado' },
        ],
    },
    {
        name: 'Reportes',
        submenu: [],
    }
];

export const AdminDashboard = () => {
    return (
        <div>
            <Navbar menus={menus} />
            <Header currentTitle="Usuarios" bgHeader={"bg-indigo-500"} />
            <UserFilter />
            <div className="container overflow-x-auto bg-white shadow-lg rounded-lg max-w-full mx-auto mt-6">
                <table className="min-w-full table-auto">
                    <thead className="bg-secondary">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">DNI</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Nombre</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Apellido</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Correo</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Teléfono</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Dirección</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {UsuariosMock.map((row, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.dni}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{row.nombre}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{row.apellido}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{row.correo}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{row.telefono}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{row.direccion}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <button className='bg-yellow-400 py-2 px-6 rounded-md hover:bg-yellow-300
                                    text-white font-semibold hover:scale-105'>
                                        Editar
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <button className='py-2 px-6 rounded-md
                                    border-2 border-red-500 font-semibold hover:scale-105'>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
