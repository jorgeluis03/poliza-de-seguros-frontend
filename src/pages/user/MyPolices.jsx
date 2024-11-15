import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navbar } from '../../components/NavbarGestion'
import { Header } from '../../components/Header';
import { PolicyFilter } from '../../components/Filter/PolicyFilter';
import { ModalDialog } from '../../components/ModalDialog';
import { Modal } from '../../components/Modal';
import { api } from '../../utility/axios';
import { Pagination } from '../../components/Paginator';
import { Spinner } from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';

const menus = [
  {
    name: 'Mis Polizas',
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

export const MyPolices = () => {

  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [myPolices, setMyPolices] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyPolices(page);
  }, [page]);

  const enableModal = () => {
    setShowModal(!showModal);
  };

  const enableModalDelete = () => {
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
      const polices = response.data.content.map((police) => {
        let tipoDePoliza = '';
        switch (police.tipoPoliza) {
          case 1:
            tipoDePoliza = 'Auto';
            break;
          case 2:
            tipoDePoliza = 'Inmueble';
            break;
          case 3:
            tipoDePoliza = 'Celular';
            break;
          default:
            tipoDePoliza = 'Desconocido';
            break;
        }
        return { ...police, tipoPoliza: tipoDePoliza };
      });
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

  return (
    <div>
      <Navbar menus={menus} />
      <Header currentTitle="Mis Pólizas" bgHeader={"bg-blue-600"} />
      <PolicyFilter />
      <div className="container overflow-x-auto bg-white shadow-lg rounded-lg max-w-full mx-auto mt-6">
        <table className="min-w-full table-auto">
          <thead className="bg-secondary">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">N° Póliza</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Tipo Póliza</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Fecha Inicio</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">Fecha Vencimiento</th>
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
                <td className="px-6 py-4">{police.fechaInicio}</td>
                <td className="px-6 py-4">{police.fechaVencimiento}</td>
                <td className="px-6 py-4">{police.estado}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <button className='bg-yellow-400 py-2 px-6 rounded-md hover:bg-yellow-300
                                    text-white font-semibold hover:scale-105'
                    onClick={() => handlerEditar(police.idPoliza)}>
                    Editar
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <button className='py-2 px-6 rounded-md
                                    border-2 border-red-500 font-semibold hover:scale-105'
                    onClick={enableModalDelete}>
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
        />}

      {isLoading &&
        <Spinner />
      }

    </div>
  )
}
