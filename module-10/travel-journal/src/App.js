import './App.css'

import TripsProvider from './providers/tripsProvider'

import Header from './components/header/Header'
import Journal from './components/journal/Journal'

function App() {
  return (
    <div className='app-container'>
      <Header />
      <main>
        <TripsProvider>
          <Journal />
        </TripsProvider>
      </main>
    </div>
  )
}

export default App;
