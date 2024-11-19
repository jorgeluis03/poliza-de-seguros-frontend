import React from 'react'
import { Navbar } from '../../components/Navbar'
import { Header } from '../../components/Header';
import { api } from '../../utility/axios';
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
        name: 'Reportes',
        submenu: [],
    }
];
export const Reportes = () => {
    const descargarPolizas = async () => {
        try {
            const response = await api.get('/v1/reports/polizas', { responseType: 'blob' })
            // Crear una URL para descargar
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Nombre del archivo descargado
            link.setAttribute('download', 'ReportePolizas.pdf');

            // Simular clic en el enlace
            document.body.appendChild(link);
            link.click();

            // Limpiar el enlace y la URL creada
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

            console.log("Reporte de pólizas descargado correctamente");
        } catch (error) {
            console.error("Error al descargar el reporte de pólizas:", error);
        }
    }
    return (
        <>
            <div>
                <Navbar menus={menus} />
                <Header currentTitle="Reportes" bgHeader={"bg-red-600"} />
                <div className="container overflow-x-auto bg-white shadow-lg rounded-lg max-w-full mx-auto mt-6">
                    <table className="min-w-full table-auto">
                        <thead className="bg-secondary">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">N°</th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Nombre Reporte</th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Descargar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-6 py-4">1</td>
                                <td className="px-6 py-4">Reporte de Pólizas</td>
                                <td>
                                    <button className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={descargarPolizas}>
                                        Descargar
                                        <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">2</td>
                                <td className="px-6 py-4">Reporte de Usuarios</td>
                                <td>
                                    <button className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => { }}>
                                        Descargar
                                        <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}
