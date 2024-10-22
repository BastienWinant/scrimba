import './App.css'
import Header from './components/header/header'
import Card from './components/card/card'

import tripsData from './assets/data/trips.json'

function App() {
  const cardElements = tripsData.map((tripObj, idx) => {
    return <Card key={idx} item={tripObj} />
  })
  return (
    <>
      <Header />
      <main>
        <div className="feed">
          {cardElements}
        </div>
      </main>
    </>
  )
}

export default App
