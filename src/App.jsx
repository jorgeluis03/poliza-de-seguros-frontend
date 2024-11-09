import React from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import BgImage from './assets/bg.png'
import CardService from './components/CardServices'

const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed"
}

export const App = () => {
  return (
    <div className="overflow-x-hidden">
      <div style={bgStyle}>
        <Navbar />
        <Hero />
      </div>
      <CardService />
    </div>
  )
}
