import React, { useState } from 'react';
import LogoImg from '../../assets/logo.png';
import BgLoginImg from '../../assets/bgLogin.png';
import { api } from '../../utility/axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CONSTANTS } from '../../utility/constants';
import { AlertWithAction } from '../../components/Alerts/AlertWithAction';
import { motion } from 'framer-motion';
import { SlideLeft } from '../../utility/animation';
import { AlertInfo } from '../../components/Alerts/AlertInfo';

export const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const payload = {
      nombreUsuario: data.username,
      correo: data.email,
      contrasena: data.password
    };

    try {
      setIsLoading(true);
      await api.post('/register', payload);
      setAlertVisible(true);
    } catch (error) {
      setErrorMessage(error.response.data);
      console.error(error);
    } finally {
      setTimeout(() => {}, 1000);
      setIsLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
    setErrorMessage(null);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-12 bg-gray-50 lg:px-16">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img src={LogoImg} alt="Your Company Logo" className="mx-auto h-14 w-auto" />
            <h2 className="mt-8 text-center text-3xl font-extrabold text-gray-900">
              Crea tu cuenta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Nombre de Usuario
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ingresa tu nombre de usuario"
                    {...register('username', { required: CONSTANTS.VALIDATION.REQUIRED })}
                  />
                  {errors.username && <span className="text-red-500 text-sm font-medium">{errors.username.message}</span>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ingresa tu correo electrónico"
                    {...register('email', { required: CONSTANTS.VALIDATION.INVALID_EMAIL })}
                  />
                  {errors.email && <span className="text-red-500 text-sm font-medium">{errors.email.message}</span>}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Crea una contraseña"
                    {...register('password', { required: CONSTANTS.VALIDATION.INVALID_PASSWORD })}
                  />
                  {errors.password && <span className="text-red-500 text-sm font-medium">{errors.password.message}</span>}
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirmar Contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    className="block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Confirma tu contraseña"
                    {...register('confirmPassword', {
                      required: CONSTANTS.VALIDATION.INVALID_PASSWORD,
                      validate: value => value === password || 'Las contraseñas no coinciden'
                    })}
                  />
                  {errors.confirmPassword && <span className="text-red-500 text-sm font-medium">{errors.confirmPassword.message}</span>}
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
                    'Registrarse'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 h-full">
          <img src={BgLoginImg} alt="Register Background" className="object-cover w-full h-full" />
        </div>
      </div>

      {alertVisible && (
        <motion.div
          variants={SlideLeft(0)}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-0 left-0 right-0 z-50 p-4">
          <AlertWithAction
            title="Registro Exitoso"
            message={'Tu cuenta ha sido creada exitosamente. Por favor inicia sesión'}
            onClose={handleCloseAlert}
            onAction={() => { navigate('/login') }}
          />
        </motion.div>
      )}

      {errorMessage &&
        <motion.div 
        variants={SlideLeft(0)}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-0 left-0 right-0 z-50 p-4">
          <AlertInfo message={errorMessage} onClose={handleCloseAlert} />
        </motion.div>}
    </>
  );
};
