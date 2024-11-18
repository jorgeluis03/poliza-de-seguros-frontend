import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { Header } from '../../components/Header';
import { api } from '../../utility/axios';
import { Pagination } from '../../components/Paginator';
import { Spinner } from '../../components/Spinner';
import { ModalDialog } from '../../components/ModalDialog';
import { PolicyFilter } from '../../components/Filter/PolicyFilter';
import { SlideLeft } from '../../utility/animation';
import { AlertInfo } from '../../components/Alerts/AlertInfo';
import { Modal } from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
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

const applicant = {
    fullName: "Margot Foster",
    position: "Backend Developer",
    email: "margotfoster@example.com",
    salary: "$120,000",
    about: "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt...",
};

export const Polizas = () => {
    const [page, setPage] = useState(0);
    const [polizas, setpolizas] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showModalCancelar, setShowModalCancelar] = useState(false);
    const [showModalAprobar, setShowModalAprobar] = useState(false);
    const [showModalDetalles, setShowModalDetalles] = useState(false);
    const [selectedIdPoliza, setSelectedIdPoliza] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [detallesPoliza, setDetallesPoliza] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchPolices();
    }, [page]);

    const fetchPolices = async () => {
        setIsLoading(true);
        try {
            let params = {
                page: page,
                size: 3
            }
            const response = await api.get('/v1/polices', { params });
            setpolizas(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        } catch (error) {
            console.error("Error al obtener las pólizas:", error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            setIsLoading(false);
        }
    }

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const enableModalCancelar = (idPoliza) => {
        setSelectedIdPoliza(idPoliza)
        setShowModalCancelar(!showModalCancelar);
    };

    const enableModalAprobar = (idPoliza) => {
        setSelectedIdPoliza(idPoliza)
        setShowModalAprobar(!showModalAprobar);
    };


    const aprobarPoliza = async () => {
        setIsLoading(true);
        try {
            await actualizarEstadoPoliza(selectedIdPoliza, 'VIGENTE');
        } catch (error) {
            console.error("Error al aprobar la póliza:", error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            setShowModalAprobar(false);
            setIsLoading(false);
        }
    }
    const cancelarPoliza = async () => {
        setIsLoading(true);
        try {
            await actualizarEstadoPoliza(selectedIdPoliza, 'CANCELADO');
        } catch (error) {
            console.error("Error al cancelar la póliza:", error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            setShowModalCancelar(false);
            setIsLoading(false);
        }
    }

    const actualizarEstadoPoliza = async (idPoliza, estado) => {
        try {
            await api.patch(`/v1/polices/${idPoliza}`, { estado: estado });
        } catch (error) {
            console.error("Error al actualizar el estado de la póliza:", error);
        }
    }

    const onSearch = async (filters) => {
        try {
            const response = await api.get('/v1/polices/search', { params: filters });
            setpolizas(response.data);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    }

    const onClear = () => {
        fetchPolices(page);
    };

    const handleCloseAlert = () => {
        setErrorMessage(null);
    };

    const fetchDetallesPoliza = async (id) => {
        navigate(`/polices/${id}`);
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

    return (
        <>
            <div>
                <Navbar menus={menus} />
                <Header currentTitle="Polizas" bgHeader={"bg-red-600"} />
                <PolicyFilter onSearch={onSearch} onClear={onClear} />
                <div className="container overflow-x-auto bg-white shadow-lg rounded-lg max-w-full mx-auto mt-6">
                    <table className="min-w-full table-auto">
                        <thead className="bg-secondary">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">N° Póliza</th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Tipo Póliza</th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Cliente</th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Monto Asegurado</th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Fecha Inicio</th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Fecha Vencimiento</th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {polizas.map((poliza) => (
                                <tr key={poliza.idPoliza}>
                                    <td className="px-6 py-4">{poliza.numeroPoliza}</td>
                                    <td className="px-6 py-4">{poliza.tipoPoliza}</td>
                                    <td className="px-6 py-4">{poliza.usuarioDTO.correo}</td>
                                    <td className="px-6 py-4">{poliza.montoAsegurado}</td>
                                    <td className="px-6 py-4">{poliza.fechaInicio}</td>
                                    <td className="px-6 py-4">{poliza.fechaVencimiento}</td>
                                    <td className="px-6 py-4">{poliza.estado}</td>
                                    <td>
                                        <button className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => fetchDetallesPoliza(poliza.idPoliza)}>
                                            Ver detalles
                                            <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </button>
                                    </td>
                                    {/* <td className="px-6 py-4 text-sm text-gray-900">
                                        <button className='bg-yellow-400 py-2 px-6 rounded-md hover:bg-yellow-300
                                    text-white font-semibold hover:scale-105'
                                            onClick={() => enableModalAprobar(poliza.idPoliza)}>
                                            Aprobar
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <button className='py-2 px-6 rounded-md
                                    border-2 border-red-500 font-semibold hover:scale-105'
                                            onClick={() => enableModalCancelar(poliza.idPoliza)}>
                                            Cancelar
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        totalPages={totalPages}
                        totalElements={totalElements}
                        onNext={handleNextPage}
                        onPrevious={handlePreviousPage}
                        page={page}
                    />
                </div>

                {showModalCancelar &&
                    <ModalDialog
                        open={showModalCancelar}
                        setOpen={setShowModalCancelar}
                        dialogTitle="Cancelar Póliza"
                        dialogMessage="¿Estás seguro de cancelar esta póliza?"
                        onConfirm={cancelarPoliza}
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

                {isLoading &&
                    <Spinner />
                }
            </div>
            {errorMessage &&
                <motion.div
                    variants={SlideLeft(0)}
                    initial="hidden"
                    animate="visible"
                    className="fixed top-0 left-0 right-0 z-50 p-4">
                    <AlertInfo message={errorMessage} onClose={handleCloseAlert} />
                </motion.div>
            }

            {
                showModalDetalles &&
                <Modal
                    open={showModalDetalles}
                    setOpen={setShowModalDetalles}
                    detalles={detallesPoliza}
                />
                
            }
        </>
    )
}
