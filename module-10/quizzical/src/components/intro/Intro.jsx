import React from 'react'
import './Intro.css'

export default function Intro(props) {
  return (
    <div className="intro">
      <h1>Quizzical</h1>
      <p className="description">Test Your Wits,<br />One Fun Fact at a Time!</p>
      <button className="btn start-btn" onClick={props.handleClick}>Start quiz</button>
    </div>
  )
}