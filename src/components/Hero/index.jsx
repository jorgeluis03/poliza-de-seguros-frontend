import React from 'react'
import { FaPlay } from 'react-icons/fa'
import HeroImg from '../../assets/logo.png'
import { motion } from 'framer-motion'
import { SlideRight } from '../../utility/animation'
export const Hero = () => {
    return (
        <>
            <section>
                <div className='container grid grid-cols-1 md:grid-cols-2
                min-h-[650px] relative'>
                    {/* Brand Info */}
                    <div className='flex flex-col justify-center py-14 md:py-0 font-playfair'>
                        <div className='text-center md:text-left space-y-6'>
                            <motion.h1
                                variants={SlideRight(0.6)}
                                initial='hidden'
                                animate='visible'
                                className='text-5xl lg:text-6xl font-bold
                            leading-relaxed xl:leading-normal'>
                                Protección a tu alcance, seguridad{" "}
                                <span className='text-primary'> para tu futuro</span>
                            </motion.h1>
                            <motion.p
                                variants={SlideRight(1.2)}
                                initial='hidden'
                                animate='visible'
                                className='text-gray-600 xl:max-w-[500px]'>
                                Consulta tus pólizas, revisa el estado de tus seguros y mantente informado con notificaciones en tiempo real,
                                estés donde estés.
                            </motion.p>

                            {/* Button Section */}
                            <motion.div
                                variants={SlideRight(1.5)}
                                initial='hidden'
                                animate='visible'
                                className=' flex justify-center gap-8 md:justify-start items-center'>
                                <button className='text-primary border-primary border-2 px-6 py-2 rounded-md
                                hover:bg-primary hover:text-white font-semibold duration-300
                                hidden md:block hover:scale-110'>
                                    Conoce más
                                </button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className='flex justify-center items-center '>
                        <motion.img
                            initial={{ opacity: 0, x: -100, rotate: 45 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ duration: 2 }}
                            src={HeroImg} alt="" className='w-[350px] md:w-[550px] xl:w-[700px]
                        drop-shadow' />
                    </div>
                </div>
            </section>
        </>
    )
}
