import './Feed.css'

import Card from './card/Card'

export default function Feed(props) {
  const cardElements = props.entries.map((entry, idx) => {
    return <Card key={idx} item={entry} />
  })
  return (
    <section className="feed">
      {cardElements}
    </section>
  )
}