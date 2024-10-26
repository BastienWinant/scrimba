import './App.css'

import tripsData from './assets/data/trips.json'

import Header from './components/header/Header'
import Journal from './components/journal/Journal'

function App() {
  return (
    <div className='app-container'>
      <Header />
      <main>
        <Journal entries={tripsData} />
      </main>
    </div>
  )
}

export default App;
