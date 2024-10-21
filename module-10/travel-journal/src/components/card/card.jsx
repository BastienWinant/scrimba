import './card.css'

export default function Card(props) {
  return (
    <article className="card">
      <div className="card-body">
        <header className="card-header">
          <h2 className="card-title">{props.item.title}</h2>
          <div className="card-location">
            <p className="card-location name">{props.item.location}</p>
          </div>
        </header>
      </div>
    </article>
  )
}