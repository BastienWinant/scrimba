import React from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    if (dice.every(die => die.isHeld && die.value === dice[0].value)) {
      setTenzies(true)
      console.log('You won!')
    }
  }, [dice])

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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {dieElements}
      </div>
      <button className="roll-dice" type="button" onClick={rollDice}>{tenzies ? 'New Game': 'Roll'}</button>
      {tenzies && <Confetti />}
    </main>
  )
}

export default App
