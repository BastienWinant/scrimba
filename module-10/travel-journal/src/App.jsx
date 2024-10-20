import './App.css'
import TravelLogs from './assets/data/data.json'

import Header from './components/header/header'

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="card-feed"></div>
      </main>
    </>
  )
}

export default App
