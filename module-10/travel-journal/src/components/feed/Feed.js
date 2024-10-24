import './Feed.css'

import Card from './card/Card'

export default function Feed(props) {
  const cardElements = props.tripsData.map((tripObj, idx) => <Card key={idx} item={tripObj} />)
  return (
    <section className='feed'>
      {cardElements}
    </section>
  )
}