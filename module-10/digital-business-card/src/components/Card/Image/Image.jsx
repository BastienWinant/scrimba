import React from "react"
import PortraitImg from './profile.png'
import './Image.css'

function Image() {
  return (
    <img src={PortraitImg} alt="Portrait" className="card-img" />
  )
}

export default Image