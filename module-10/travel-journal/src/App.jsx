import './App.css'
import travelLogs from './assets/data/data.json'

import Header from './components/header/header'
import Card from './components/card/card'

function App() {
  const cardElements = travelLogs.map((tripObj, i) => {
    return <Card key={i} item={tripObj} />
  })

  console.log(cardElements)
  return (
    <>
      <Header />
      <main>
        {cardElements}
      </main>
    </>
  )
}

export default App
