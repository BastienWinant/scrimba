import './Display.css'
import PinIcon from './pin-3.svg'

export default function Display(props) {
  return (
    <section className="display">
      <header className="display-header">
        <h2 className="display-title">{props.tripObj.title}</h2>
        <section className='display-subtitle'>
          <div className="display-location">
            <img src={PinIcon} alt="Pin icon." className="display-pin-icon" />
            <p className="display-location-name">{props.tripObj.location}</p>
          </div>
          <a href={props.tripObj.googleMapsUrl} className='display-link' target='_blank'>View on Google Maps</a>
        </section>
      </header>
      <img src={props.tripObj.imageUrl} alt="Trip photo." className="display-img" />
      <p className="display-description">{props.tripObj.description}</p>
    </section>
  )
}