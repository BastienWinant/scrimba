import './header.css'
import HeaderImg from '../../assets/images/world.svg'

export default function Header() {
  return (
    <header className="header">
      <img src={HeaderImg} alt="Globe Icon" className="header-img" />
      <h1 className="header-title">
        my travel journal.
      </h1>
    </header>
  )
}