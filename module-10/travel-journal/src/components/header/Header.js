import './Header.css'
import EarthIcon from './world.svg'

export default function Header() {
  return (
    <header className="header">
      <img src={EarthIcon} className='header-img' alt='Eart icon.' />
      <h1 className="header-title">my travel journal.</h1>
    </header>
  )
}