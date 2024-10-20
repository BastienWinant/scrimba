import './card.css'

export default function Card(props) {
  return (
    <article className="card">
      <img src={props.item.imageUrl} alt="travel picture" className="card-img" />
    </article>
  )
}