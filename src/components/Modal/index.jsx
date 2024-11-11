import React, { useEffect, useState } from 'react'
import { InfoRow } from '../InfoRow'
import { TitleSection } from '../TitleSection'

export const Modal = ({ applicant, closeModal }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);  // Mostrar modal después de que se ha montado
    return () => setShow(false);  // Limpiar estado al desmontar
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay oscuro */}
      <div
        className={`fixed inset-0 bg-gray-900 opacity-50 ${show ? 'opacity-50' : 'opacity-0'} transition-opacity duration-300`}
        onClick={closeModal}
      ></div>
      
      {/* Contenido del modal */}
      <div
        className={`relative bg-white shadow-lg rounded-lg max-w-2xl w-full mx-4 p-6 z-10 transition-transform transform ${
          show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        style={{ transitionDuration: '300ms' }}
      >
        <TitleSection
          title="Applicant Information"
          description="Personal details and application."
        />
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <InfoRow label="Full name" value={applicant.fullName} />
            <InfoRow label="Application for" value={applicant.position} />
            <InfoRow label="Email address" value={applicant.email} />
            <InfoRow label="Salary expectation" value={applicant.salary} />
            <InfoRow label="About" value={applicant.about} />
          </dl>
        </div>
        <button
          onClick={closeModal}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  )
}
