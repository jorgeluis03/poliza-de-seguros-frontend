import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navbar } from '../../components/Navbar'
import { Header } from '../../components/Header';
import { PolicyFilter } from '../../components/Filter/PolicyFilter';
import { ModalDialog } from '../../components/ModalDialog';
import { api } from '../../utility/axios';
import { Pagination } from '../../components/Paginator';
import { Spinner } from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { AlertInfo } from '../../components/Alerts/AlertInfo';
const menus = [
  {
    name: 'Mis Polizas',
    submenu: [],
  }
];

export const MyPolices = () => {

  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [myPolices, setMyPolices] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIdPoliza, setSelectedIdPoliza] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyPolices(page);
  }, [page]);

  const enableModalDelete = (idPoliza) => {
    setSelectedIdPoliza(idPoliza);
    setShowModalDelete(!showModalDelete);
  };

  const fetchMyPolices = async (page) => {
    setIsLoading(true);
    const params = {
      usuario: localStorage.getItem('username'),
      page: page,
      size: 3
    };
    try {
      const response = await api.get('/v1/polices/by-user', { params });
      const polices = response.data.content;
      setMyPolices(polices);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

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

  const handlerEditar = (idPolicy) => {
    navigate(`/my-polices/${idPolicy}`);
  }

  const handlerEliminar = async () => {
    setIsLoading(true);
    try {
      await api.delete(`/v1/polices/${selectedIdPoliza}`);
      fetchMyPolices(page);
      setShowModalDelete(false);
    } catch (error) {
      console.error('Error deleting policy:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const onSearch = async (filters) => {
    try {
      const response = await api.get('/v1/polices/search', { params: filters });
      setMyPolices(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setTimeout(() => { setErrorMessage(null) }, 2000);
    }
  }

  const onClear = () => {
    fetchMyPolices(page);
  };

  const handleCloseAlert = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <div>
        <Navbar menus={menus} />
        <Header currentTitle="Mis Pólizas" bgHeader={"bg-blue-600"} />
        <PolicyFilter onSearch={onSearch} onClear={onClear} />
        {myPolices.length == 0 ?
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-gray-500 text-2xl">No hay pólizas registradas</h1>
          </div>
          :
          <div className="container overflow-x-auto bg-white shadow-lg rounded-lg max-w-full mx-auto mt-6">
            <table className="min-w-full table-auto">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">N° Póliza</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Tipo Póliza</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Fecha Inicio</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Fecha Vencimiento</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Monto Asegurado</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Estado</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myPolices.map((police) => (
                  <tr key={police.idPoliza}>
                    <td className="px-6 py-4">{police.numeroPoliza}</td>
                    <td className="px-6 py-4">{police.tipoPoliza}</td>
                    <td className="px-6 py-4">{new Date(police.fechaInicio).toLocaleDateString('es-ES')}</td>
                    <td className="px-6 py-4">{new Date(police.fechaVencimiento).toLocaleDateString('es-ES')}</td>
                    <td className="px-6 py-4">S/. {police.montoAsegurado}.00</td>
                    <td className="px-6 py-4">{police.estado}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <button className={`${police.estado === 'RECHAZADO' ? 'bg-yellow-200' : 'bg-yellow-400 hover:bg-yellow-300'} py-2 px-6 rounded-md 
                    text-white font-semibold hover:scale-105`}
                        onClick={() => handlerEditar(police.idPoliza)}
                        disabled={police.estado == 'RECHAZADO'}>
                        Editar
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <button className='py-2 px-6 rounded-md
                                    border-2 border-red-500 font-semibold hover:scale-105'
                        onClick={() => enableModalDelete(police.idPoliza)}>
                        Eliminar
                      </button>
                    </td>
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

        }

        {showModal &&
          <Modal
            applicant={applicant}
            open={showModal}
            setOpen={setShowModal}
            dialogTitle="Detalles de la Póliza:" />
        }

        {showModalDelete &&
          <ModalDialog
            open={showModalDelete}
            setOpen={setShowModalDelete}
            dialogTitle="Eliminar Póliza"
            dialogMessage="¿Estás seguro de eliminar esta póliza?"
            onConfirm={handlerEliminar}
          />}

        {isLoading &&
          <Spinner />
        }

      </div>
      {errorMessage &&
        <AlertInfo message={errorMessage} onClose={handleCloseAlert} />
      }
    </>
  )
}
