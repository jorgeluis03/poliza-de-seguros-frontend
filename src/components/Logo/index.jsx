import React from 'react'
import { SiSecurityscorecard } from "react-icons/si";
export const LogoTitle = () => {
    return (
        <div className='flex items-center gap-2 font-bold uppercase text-xl'>
            <SiSecurityscorecard />
            <p>
                Segur<span className='text-primary'>AI</span>
            </p>
        </div>
    )
}
