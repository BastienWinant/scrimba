import './Journal.css'

import { useState } from 'react'

import Feed from './feed/Feed'
import Display from './display/Display'

export default function Journal() {
  const [cardIndex, setCardIndex] = useState(0)

  const updateCardIndex = (idx) => {
    setCardIndex(idx)
  }

  return (
    <div className="journal">
      <Feed displayCardIdx={cardIndex} />
      <Display />
    </div>
  )
}