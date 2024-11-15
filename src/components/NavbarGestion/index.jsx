import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileImg from '../../assets/profile.png';
import { LogoTitle } from '../Logo';

export const Navbar = ({ menus }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';
  }

  return (
    <nav className="bg-orange-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo o Título */}
          <LogoTitle />

          <div className='flex gap-8 items-center justify-between'>
            {/* Menú principal */}
            <div className="hidden md:flex space-x-6">
              {menus.map((menu, index) => (
                <div key={index} className="relative">
                  <button className="font-semibold hover:text-primary hover:border-b-2 border-primary">
                    {menu.name}
                  </button>
                </div>
              ))}
            </div>

            {/* Menú desplegable (para Perfil) */}
            <div>
              <img
                src={ProfileImg}
                alt="Perfil"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleProfileMenu}
              />
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md">
                  <Link
                    to="/perfil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Ver Perfil
                  </Link>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={logout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};
