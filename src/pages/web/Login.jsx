import React from 'react'
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import LogoImg from '../../assets/logo.png'
import BgLoginImg from '../../assets/bgLogin.png'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CONSTANTS } from '../../utility/constants';
import { api } from '../../utility/axios';
import { AlertInfo } from '../../components/Alerts/AlertInfo';
import { ErrorMessage } from '../../components/ErrorMessage';

export const Login = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    const payload = {
      username: data.username,
      password: data.password
    };

    await login(payload);
  }

  const login = async (payload) => {
    try {
      setIsLoading(true);
      const response = await api.post('/login', payload);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);

      const decodedToken = jwtDecode(response.data.token);
      const role = decodedToken.role;

      role === 'ROLE_ADMIN' ? navigate('/polices') : navigate('/my-polices');
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setErrorMessage(error.response.data.message);
      }
    } finally {
      setTimeout(() => { setErrorMessage(null) }, 2000);
      setIsLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-12 bg-gray-50 lg:px-16">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img src={LogoImg} alt="Your Company Logo" className="mx-auto h-14 w-auto" />
            <h2 className="mt-8 text-center text-3xl font-extrabold text-gray-900">
              Inicia sesión en tu cuenta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Nombre de Usuario
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ingresa tu nombre de usuario"
                    {...register('username', { required: CONSTANTS.VALIDATION.REQUIRED })}
                  />
                  {errors.username && <ErrorMessage error={errors.username} />}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <a href="#" className="text-sm text-primary hover:text-secondary font-semibold">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ingresa tu contraseña"
                    {...register('password', { required: CONSTANTS.VALIDATION.REQUIRED })}
                  />
                  {errors.password && <ErrorMessage error={errors.password} />}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-semibold bg-primary hover:bg-secondary transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.268 0 0 6.268 0 14h4zm2 5.291l2-2V4a8 8 0 118 8h-4a4 4 0 00-4 4v4.291l2-2z"></path>
                      </svg>
                      Cargando...
                    </div>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 h-full">
          <img src={BgLoginImg} alt="Login Background" className="object-cover w-full h-full" />
        </div>
      </div>
      {errorMessage &&
        <AlertInfo message={errorMessage} onClose={handleCloseAlert} />
      }
    </>

  )
}
