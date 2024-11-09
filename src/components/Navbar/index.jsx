import React from 'react'
import { SiSecurityscorecard } from "react-icons/si";
export const Navbar = () => {
    return (
        <>
            <nav>
                <div className="container flex justify-between items-center
                py-8">
                    {/* logo section */}
                    <div className='flex items-center gap-2 font-bold uppercase text-xl'>
                        <SiSecurityscorecard />
                        <p>
                            Segur<span className='text-primary'>AI</span>
                        </p>
                    </div>

                    {/* buttons section */}
                    <div className='flex items-center gap-4'>
                        
                        <button className='text-primary border-primary border-2 px-6 py-2 rounded-md
                        font-semibold hidden md:block hover:scale-110 duration-200'>
                            Iniciar Sesión
                        </button>
                        <button className='text-white px-6 py-2 rounded-md
                        bg-primary font-semibold hover:scale-110 duration-200'>
                            Registrarse
                        </button>
                    </div>
                </div>
            </nav>

        </>
    )
}
