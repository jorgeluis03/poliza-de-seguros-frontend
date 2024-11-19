import { useParams, useNavigate } from 'react-router-dom';
import { InfoRow } from '../../components/InfoRow';
import { api } from '../../utility/axios';
import { useState, useEffect } from 'react';
import { ModalDialog } from '../../components/ModalDialog';

export const DetallesPoliza = () => {

    const { idPolicy } = useParams()
    const [detalles, setDetalles] = useState({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showModalRechazar, setShowModalRechazar] = useState(false);
    const [showModalAprobar, setShowModalAprobar] = useState(false);
    const [selectedIdPoliza, setSelectedIdPoliza] = useState(null);

    useEffect(() => {
        if (idPolicy) {
            fetchPolicyById(idPolicy);
        }
    }, []);

    const fetchPolicyById = async (id) => {
        try {
            const response = await api.get(`/v1/polices/${id}`);
            const policyData = response.data.payload;
            let policyDetails = {};
            switch (policyData.tipoPoliza) {
                case 'Auto':
                    policyDetails = await fetchAutoPolicyDetails(id);
                    break;
                case 'Inmueble':
                    policyDetails = await fetchInmueblePolicyDetails(id);
                    break;
                case 'Celular':
                    policyDetails = await fetchCelularPolicyDetails(id);
                    break;
                default:
                    throw new Error("Tipo de póliza desconocido");
            }
            setDetalles({ ...policyData, ...policyDetails });
        } catch (error) {
            console.error('Error al obtener detalles de la póliza:', error);
        }
    };

    const fetchAutoPolicyDetails = async (id) => {
        const response = await api.get(`/v1/polices/autos/${id}`);
        const policyData = response.data.payload;
        return {
            marcaAuto: policyData.marca,
            modeloAuto: policyData.modelo,
            anioAuto: policyData.anio,
            numeroPlaca: policyData.numeroPlaca,
        };
    };

    const fetchInmueblePolicyDetails = async (id) => {
        const response = await api.get(`/v1/polices/property/${id}`);
        const policyData = response.data.payload;
        return {
            direccionInmueble: policyData.direccion,
            tipoInmueble: policyData.tipoInmueble,
        };
    };

    const fetchCelularPolicyDetails = async (id) => {
        const response = await api.get(`/v1/polices/phone/${id}`);
        const policyData = response.data.payload;
        return {
            marcaCelular: policyData.marca,
            modeloCelular: policyData.modelo,
        };
    };

    const enableModalRechazar = (idPoliza) => {
        setSelectedIdPoliza(idPoliza)
        setShowModalRechazar(!showModalRechazar);
    };

    const enableModalAprobar = (idPoliza) => {
        setSelectedIdPoliza(idPoliza)
        setShowModalAprobar(!showModalAprobar);
    };

    const aprobarPoliza = async () => {
        setIsLoading(true);
        try {
            await actualizarEstadoPoliza(selectedIdPoliza, 'VIGENTE');
            navigate('/polices');
        } catch (error) {
            console.error("Error al aprobar la póliza:", error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }
    const rechazarPoliza = async () => {
        setIsLoading(true);
        try {
            await actualizarEstadoPoliza(selectedIdPoliza, 'RECHAZADO');
            navigate('/polices');
        } catch (error) {
            console.error("Error al cancelar la póliza:", error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }

    const actualizarEstadoPoliza = async (idPoliza, estado) => {
        try {
            await api.patch(`/v1/polices/${idPoliza}`, { estado: estado });
        } catch (error) {
            console.error("Error al actualizar el estado de la póliza:", error);
        }
    }

    return (
        <>
            <div className='container'>
                <div className="px-4  mt-12 sm:px-0">
                    <h3 className="font-semibold text-gray-900 text-2xl" >Detalles de la Póliza</h3>
                    <p className="mt-1 max-w-2xl text-gray-500 text-2xl">Información del Cliente</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className='grid md:grid-cols-2 grid-cols-1'>
                            <InfoRow label="Nombre de Usuario" value={detalles.usuarioDTO?.nombreUsuario} />
                            <InfoRow label="Correo del Usuario" value={detalles.usuarioDTO?.correo} />
                        </div>
                    </dl>
                </div>
                <div className="px-4  mt-12 sm:px-0">
                    <p className="mt-1 max-w-2xl text-gray-500 text-2xl">Información General</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className='grid md:grid-cols-2 grid-cols-1'>
                            <InfoRow label="Número de Póliza" value={detalles.numeroPoliza} />
                            <InfoRow label="Tipo de Póliza" value={detalles.tipoPoliza} />
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1'>
                            <InfoRow label="Fecha de Inicio" value={detalles.fechaInicio} />
                            <InfoRow label="Fecha de Vencimiento" value={detalles.fechaVencimiento} />
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1'>
                            <InfoRow label="Monto Asegurado" value={detalles.montoAsegurado} />
                            <InfoRow label="Estado" value={detalles.estado} />
                        </div>
                    </dl>
                </div>
                <div className="px-4  mt-12 sm:px-0">
                    <p className="mt-1 max-w-2xl text-gray-500 text-2xl">Información Del {detalles.tipoPoliza}</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        {detalles.tipoPoliza == 'Auto' &&
                            <>
                                <div className='grid md:grid-cols-2 grid-cols-1'>
                                    <InfoRow label="Marca de Auto" value={detalles.marcaAuto} />
                                    <InfoRow label="Modelo de Auto" value={detalles.modeloAuto} />
                                </div>
                                <div className='grid md:grid-cols-2 grid-cols-1'>
                                    <InfoRow label="Número de Placa" value={detalles.numeroPlaca} />
                                    <InfoRow label="Año" value={detalles.anioAuto} />
                                </div>
                            </>
                        }
                        {detalles.tipoPoliza == 'Inmueble' &&
                            <div className='grid md:grid-cols-2 grid-cols-1'>
                                <InfoRow label="Direccion del Inmueble" value={detalles.direccionInmueble} />
                                <InfoRow label="Tipo de Inmueble" value={detalles.tipoInmueble} />
                            </div>
                        }
                        {detalles.tipoPoliza == 'Celular' &&
                            <div className='grid md:grid-cols-2 grid-cols-1'>
                                <InfoRow label="Marca de Celular" value={detalles.marcaCelular} />
                                <InfoRow label="Modelo de Celular" value={detalles.modeloCelular} />
                            </div>
                        }
                    </dl>
                </div>
            </div>
            {detalles.estado == 'PENDIENTE' &&
                <div className="container mt-6 mb-12 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-green-600 px-6 py-2 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => enableModalAprobar(detalles.idPoliza)}
                    >
                        Aprobar
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-red-600 px-6 py-2 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => enableModalRechazar(detalles.idPoliza)}
                    >
                        Rechazar
                    </button>
                </div>
            }


            {showModalRechazar &&
                <ModalDialog
                    open={showModalRechazar}
                    setOpen={setShowModalRechazar}
                    dialogTitle="Cancelar Póliza"
                    dialogMessage="¿Estás seguro de rechazar esta póliza?"
                    onConfirm={rechazarPoliza}
                />
            }

            {showModalAprobar &&
                <ModalDialog
                    open={showModalAprobar}
                    setOpen={setShowModalAprobar}
                    dialogTitle="Aprobar Póliza"
                    dialogMessage="¿Estás seguro de aprobar esta póliza?"
                    onConfirm={aprobarPoliza}
                />
            }

            <div className='container fixed top-0 right-0 p-8 mx-12 flex justify-end'>
                <button className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => { navigate('/polices') }}>
                    Regresar
                    <svg className="w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0l4 4M1 5l4-4" />
                    </svg>
                </button>
            </div>


        </>
    )
}
