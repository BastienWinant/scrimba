import './Card.css'

import Img from './Img/Img'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'

export default function Card() {
  return (
    <div className="card">
      <Img />
      <Header />
      <Body />
      <Footer />
    </div>
  )
}