import { PaperClipIcon } from '@heroicons/react/20/solid'
import { InfoRow } from '../../components/InfoRow'
export const DetallesPoliza = () => {
    return (
        <div className='container'>
            <div className="px-4  mt-12 sm:px-0">
                <h3 className="text-base/7 font-semibold text-gray-900">Detalles de la Póliza</h3>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Información General</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <InfoRow label="Número de Póliza" value={"detalles.numeroPoliza"} />
                    <InfoRow label="Tipo de Póliza" value={"detalles.tipoPoliza"} />
                    <InfoRow label="Correo del Usuario" value={"detalles.usuarioDTO?.correo" || 'N/A'} />
                    <InfoRow label="Monto Asegurado" value={"detalles.montoAsegurado"} />
                    <InfoRow label="Fecha de Inicio" value={"detalles.fechaInicio"} />
                    <InfoRow label="Fecha de Vencimiento" value={"detalles.fechaVencimiento"} />
                    <InfoRow label="Estado" value={"detalles.estado"} />
                    
                </dl>
            </div>
            <div className="px-4  mt-12 sm:px-0">
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Información Del Tipo de Póliza</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <InfoRow label="Número de Póliza" value={"detalles.numeroPoliza"} />
                    <InfoRow label="Tipo de Póliza" value={"detalles.tipoPoliza"} />
                    <InfoRow label="Correo del Usuario" value={"detalles.usuarioDTO?.correo" || 'N/A'} />
                    <InfoRow label="Monto Asegurado" value={"detalles.montoAsegurado"} />
                    <InfoRow label="Fecha de Inicio" value={"detalles.fechaInicio"} />
                    <InfoRow label="Fecha de Vencimiento" value={"detalles.fechaVencimiento"} />
                    <InfoRow label="Estado" value={"detalles.estado"} />
                    
                </dl>
            </div>
        </div>
    )
}
