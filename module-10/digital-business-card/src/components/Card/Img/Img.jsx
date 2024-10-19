import './Img.css'

import React from "react"
import PortraitImg from './profile.png'

export default function Img() {
  return (
    <img src={PortraitImg} alt="Portrait" className="card-img" />
  )
}