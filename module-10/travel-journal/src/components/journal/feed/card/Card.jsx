import './Card.css'
import PinIcon from './pin-3.svg'

export default function Card(props) {
  function onCardClick(e) {
    const cardId = e.target.closest('.card').dataset.id
    props.handleClick(cardId)
  }
  
  return (
    <article className="card" data-id={props.id}>
      <img src={props.item.imageUrl} alt="Trip photo." className="card-img" />
      <div className="card-body">
        <header className="card-header">
          <h3 className="card-title">{props.item.title}</h3>
          <div className="card-location">
            <img src={PinIcon} alt="Pin icon." className="pin-icon" />
            <p className="card-location-name">{props.item.location}</p>
          </div>
        </header>
        <section className="card-dates">
          <p className="card-date">{props.item.startDate}</p>
          -
          <p className="card-date">{props.item.endDate}</p>
        </section>
        <p className="card-description">{props.item.description}</p>
        <a href={props.item.googleMapsUrl} className="card-link" target='_blank'>View on Google Maps</a>
      </div>
      <button type="button" className="card-btn" onClick={onCardClick}>
        <p>{props.item.title}</p>
        <span>View</span>
      </button>
    </article>
  )
}