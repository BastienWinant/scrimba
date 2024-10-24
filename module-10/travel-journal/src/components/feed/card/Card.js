import './Card.css'
import PinIcon from './pin-3.svg'

export default function Card(props) {
  return (
    <article className='card'>
      <img src={props.item.imageUrl} className='card-img' alt='Illustrative photograph.' />
      <div className='card-body'>
        <header className='card-header'>
          <h2 className='card-title'>{props.item.title}</h2>
          <div className='card-location'>
            <img src={PinIcon} alt='Pin icon.' className='pin-icon' />
            <p className='card-location-name'>{props.item.location}</p>
          </div>
        </header>
        <section className='card-dates'>
          <p className='card-date'>{props.item.startDate}</p>
          -
          <p className='card-date'>{props.item.endDate}</p>
        </section>
        <p className='card-description'>{props.item.description}</p>
        <a href={props.item.googleMapsUrl} className='card-link' target='_blank'>View on Google Maps</a>
      </div>
    </article>
  )
}