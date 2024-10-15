import React from "react"
import './Card.css'

import Image from './Image/Image'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'

function Card() {
  return (
    <div className="card">
      <Image />
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

export default Card