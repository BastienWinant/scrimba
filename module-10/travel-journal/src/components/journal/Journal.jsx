import './Journal.css'

import { useState } from 'react'

import tripsData from '../../assets/data/trips.json'

import Feed from './feed/Feed'
import Display from './display/Display'

export default function Journal() {
  const [tripObj, setTripObj] = useState(tripsData[0])

  const updateTripObj = (idx) => {
    setTripObj(tripsData[idx])
  }

  return (
    <div className="journal">
      <Feed entries={tripsData} handleClick={updateTripObj} />
      <Display tripObj={tripObj} />
    </div>
  )
}