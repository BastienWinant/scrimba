import './Feed.css'

import { useTripsListContext } from '../../../providers/tripsProvider'

import Card from './card/Card'

export default function Feed() {
  const { trips } = useTripsListContext()
  
  const cardElements = trips.map((tripObj, idx) => {
    return <Card key={idx} item={tripObj} />
  })

  return (
    <section className="feed">
      {cardElements}
    </section>
  )
}