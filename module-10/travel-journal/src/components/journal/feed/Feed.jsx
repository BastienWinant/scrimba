import './Feed.css'

import Card from './card/Card'

export default function Feed(props) {
  const trips = props.entries
  
  const cardElements = trips.map((tripObj, idx) => {
    return <Card key={idx} id={idx} item={tripObj} handleClick={props.handleClick} />
  })

  return (
    <section className="feed">
      {cardElements}
    </section>
  )
}