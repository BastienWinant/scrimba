import './card.css'
import PinIcon from '../../assets/images/pin-3.svg'

export default function Card(props) {
  return (
    <article className="card">
      <img src={props.item.imageUrl} alt="Trip photo." className="card-img" />
      <div className="card-body">
        <header className="card-header">
          <h2 className="card-title">{props.item.title}</h2>
          <span className="card-location">
            <img src={PinIcon} alt="Pin icon." className="pin-icon" />
            <p className="location-name">{props.item.location}</p>
          </span>
        </header>
        <section className="card-dates">
          <p className="date">{props.item.startDate}</p> - <p className="date">{props.item.endDate}</p>
        </section>
        <p className="card-description">{props.item.description}</p>
        <a href={props.item.googleMapsUrl} className="google-maps-link" target="_blank">View on Google Maps</a>
      </div>
    </article>
  )
}