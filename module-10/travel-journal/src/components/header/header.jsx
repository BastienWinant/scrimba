import './header.css'
import GlobeIcon from './earth.svg'

export default function Header() {
  return (
    <header className="header">
      <img src={GlobeIcon} className="header-img" alt="Globe icon." />
      <h1 className="header-title">my travel journal.</h1>
    </header>
  )
}