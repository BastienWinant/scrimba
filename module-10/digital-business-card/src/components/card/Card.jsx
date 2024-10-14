import React from "react"
import "./Card.css"
import PortraitImg from './profile.png'

import Header from "./header/Header.jsx"
import Body from './body/Body.jsx'
import Footer from './footer/Footer.jsx'

const Card = () => {
  return (
    <>
      <div className="card">
        <img src={PortraitImg} alt="Portrait" className="card-img" />
        <Header />
        <Body />
        <Footer />
      </div>
    </>
  )
}

export default Card