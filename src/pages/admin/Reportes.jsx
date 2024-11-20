import React from 'react'
import { Navbar } from '../../components/Navbar'
import { Header } from '../../components/Header';
import { api } from '../../utility/axios';
import { FaFileExcel, FaFilePdf } from "react-icons/fa6";
import { Spinner } from '../../components/Spinner';
import { useState } from 'react';
const menus = [
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

    const [isLoading, setIsLoading] = useState(false);

    const descargarReportePoliza = async (tipo) => {
        try {
            setIsLoading(true);
            let response = null;
            let fileName = 'ReportePolizas';

            switch (tipo) {
                case 'pdf':
                    response = await api.get('/v1/reports/polizas-pdf', { responseType: 'blob' });
                    fileName += '.pdf';
                    break;
                case 'xlsx':
                    response = await api.get('/v1/reports/polizas-xlsx', { responseType: 'blob' });
                    fileName += '.xlsx';
                    break;
                default:
                    throw new Error('Tipo de reporte no soportado');
            }

            // Crear una URL para descargar
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);

            document.body.appendChild(link);
            link.click();

            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el reporte de pólizas:", error);
        } finally {
            setIsLoading(false);
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
                                <td className="px-6 py-4 flex space-x-4">
                                    <button className="inline-flex items-center font-medium text-red-600 hover:underline"
                                        onClick={() => descargarReportePoliza("pdf")}>
                                        <FaFilePdf size={24} />
                                    </button>
                                    <button className="inline-flex items-center font-medium text-green-600 hover:underline"
                                        onClick={() => descargarReportePoliza("xlsx")}>
                                        <FaFileExcel size={24} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            {isLoading &&
                <Spinner />
            }
        </>
    )
}
