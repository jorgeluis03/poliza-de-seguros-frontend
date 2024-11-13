import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AlertWithAction = ({ title, message, onClose, onAction }) => {
    const [isVisible, setIsVisible] = useState(true);

    // Maneja el cierre del alert
    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    // Si el alert no es visible, no lo renderizamos
    if (!isVisible) return null;

    return (
        <div className="relative w-full overflow-hidden rounded-md border border-green-500 bg-white text-neutral-600 dark:bg-neutral-950 dark:text-neutral-300" role="alert">
            <div className="flex w-full items-center gap-2 bg-green-500/10 p-4">
                <div className="bg-green-500/15 text-green-500 rounded-full p-1" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="flex flex-col gap-2 ml-2">
                    <div>
                        <h3 className="text-sm font-semibold text-green-500">{title}</h3>
                        <p className="text-xs font-medium sm:text-sm">{message}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            type="button" 
                            className="whitespace-nowrap text-center text-sm font-semibold tracking-wide text-green-500 transition hover:opacity-75 active:opacity-100"
                            onClick={onAction}
                        >
                            Iniciar Sesión
                        </button>
                        <button 
                            type="button" 
                            className="whitespace-nowrap text-center text-sm font-medium tracking-wide text-neutral-600 transition hover:opacity-75 dark:text-neutral-300 active:opacity-100"
                            onClick={handleClose}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

AlertWithAction.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func, // Función opcional para manejar el cierre
    onAction: PropTypes.func // Función opcional para la acción principal
};
