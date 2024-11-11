import React from 'react'
import { FaCar } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaHeartbeat } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { SlideLeft } from "../../utility/animation";

const OurServicesData = [
    {
        id: 1,
        title: "Póliza de Auto",
        desc: "Protege tu vehículo contra accidentes, robos y más, con opciones adaptadas a tus necesidades.",
        icon: <FaCar />,
        delay: 0.3,
    },
    {
        id: 2,
        title: "Póliza de Inmueble",
        desc: "Cubre tu hogar o negocio frente a imprevistos como incendios, daños por agua y robos.",
        link: "/",
        icon: <FaHome />,
        delay: 0.6,
    },
    {
        id: 3,
        title: "Póliza de Celular",
        desc: "Protege tu dispositivo contra robos y daños accidentales.",
        link: "/",
        icon: <FaMobileAlt />,
        delay: 0.9,
    }
];


export const CardService = () => {
  return (
    <div>
            <div className="container py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2
                md:grid-cols-4 gap-6 font-playfair">
                    <div className='space-y-4 p-6'>
                        <h1 className='text-3xl md:text-4xl font-bold'>Lo que ofrecemos para ti</h1>
                        <p className='text-gray-500'>Protege lo que más importa con nuestras pólizas de seguros personalizadas: automóvil, inmuebles, celular y más.</p>
                    </div>
                    {OurServicesData.map((item) => {
                        return (
                            <motion.div
                                variants={SlideLeft(item.delay)}
                                initial="hidden"
                                whileInView="visible"
                                key={item.id}
                                className="bg-gray-100 space-y-4 p-6 hover:bg-white rounded-xl hover:shadow-[0_0_22px_0_rgba(0,0,0,0.15)] "
                            >
                                <div className="text-4xl">{item.icon}</div>
                                <p className="text-2xl font-semibold">{item.title}</p>
                                <p className="text-gray-500">{item.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
  )
}
