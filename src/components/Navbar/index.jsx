import React from 'react'
import { NavLink } from 'react-router-dom';
import { LogoTitle } from '../Logo';
export const NavbarWeb = () => {
    return (
        <>
            <nav>
                <div className="container flex justify-between items-center
                py-8">
                    {/* logo section */}
                    <LogoTitle />

                    {/* buttons section */}
                    <div className='flex items-center gap-4'>

                        <button className='text-primary border-primary border-2 px-6 py-2 rounded-md
                        font-semibold hidden md:block hover:scale-110 duration-200'>
                            <NavLink to='/login'>
                                Iniciar Sesión
                            </NavLink>
                        </button>
                        <button className='text-white px-6 py-2 rounded-md
                        bg-primary font-semibold hover:scale-110 duration-200'>
                            <NavLink to='/register'>
                                Registrarse
                            </NavLink>
                        </button>
                    </div>
                </div>
            </nav>

        </>
    )
}
