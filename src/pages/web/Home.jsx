import React from 'react'
import { CardService } from '../../components/CardServices'
import { Hero } from '../../components/Hero'
import { NavbarWeb } from '../../components/Navbar'
import BgImage from '../../assets/bg.png'

const bgStyle = {
    backgroundImage: `url(${BgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }

export const Home = () => {
    return (
        <div className="overflow-x-hidden">
            <div style={bgStyle}>
                <NavbarWeb />
                <Hero />
            </div>
            <CardService />
        </div>
    )
}
