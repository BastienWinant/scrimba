import React from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid'

function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice() {
    let newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }

    return newDice
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    }))
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      if (die.id === id) {
        return {
          ...die,
          isHeld: !die.isHeld
        }
      } else {
        return die
      }
    }))
  }

  const dieElements = dice.map(die => <Die
                                        key={die.id}
                                        value={die.value}
                                        isHeld={die.isHeld}
                                        holdDice={() => holdDice(die.id)}
                                      />)

  return (
    <main>
      <div className='dice-container'>
        {dieElements}
      </div>
      <button className="roll-dice" type="button" onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
