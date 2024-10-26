import './Display.css'
import PinIcon from './pin-3.svg'

export default function Display(props) {
  return (
    <section className="display">
      <header className="display-header">
        <h2 className="display-title">Sydney Opera House</h2>
        <div className="display-location">
          <img src={PinIcon} alt="Pin icon." className="display-pin-icon" />
          <p className="display-location-name">Australia</p>
        </div>
      </header>
      <img src="https://images.unsplash.com/photo-1559651868-066bcc28f358" alt="Trip photo." className="display-img" />
      <p className="display-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam libero iste id, odio fugit tempora quibusdam natus! Natus architecto impedit adipisci sequi. Eaque sit nesciunt deserunt mollitia, minus dolorum iusto?</p>
    </section>
  )
}