import './App.css'

import Header from './components/header/Header'
import Journal from './components/journal/Journal'

function App() {
  return (
    <div className='app-container'>
      <Header />
      <main>
        <Journal />
      </main>
    </div>
  )
}

export default App;
