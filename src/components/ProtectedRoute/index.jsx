import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export const ProtectedRoute = ({ children, allowedRoles }) => {

    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to='/login' />
    }

    try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
        if (allowedRoles.includes(userRole)) {
            return children;
        } else {
            return <Navigate to='/no-page' />
        }

    } catch (error) {
        console.error('Token inválido', error);
        localStorage.removeItem('token');
        return <Navigate to="/login" />;

    }
}
