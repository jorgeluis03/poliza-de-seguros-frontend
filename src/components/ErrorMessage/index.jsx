import React from 'react'

export const ErrorMessage = ({ error }) => {
    return error ? <span className="text-red-500 text-sm font-medium">{error.message}</span> : null;
}
