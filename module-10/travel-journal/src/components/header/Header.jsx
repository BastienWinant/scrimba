import './Header.css'
import EarthIcon from './world-2.svg'

export default function Header() {
  return (
    <header className="header">
      <img src={EarthIcon} alt="Earth icon." className="header-img" />
      <h1 className="header-title">my travel journal.</h1>
    </header>
  )
}