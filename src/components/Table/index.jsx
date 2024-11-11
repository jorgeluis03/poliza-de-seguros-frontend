import React from 'react'

export const Table = () => {
    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg max-w-full mx-auto mt-6">
          <table className="min-w-full table-auto">
            <thead className="bg-red-500">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">DNI</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">Apellido</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">Correo</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">Teléfono</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">Dirección</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.dni}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.apellido}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.correo}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.telefono}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.direccion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}
