import './App.css';
import Header from './components/header/Header'

import tripsData from './assets/data/trips.json'

function App() {
  console.log(tripsData)
  return (
    <>
      <div className='app-container'>
        <Header />
        <main></main>
      </div>
    </>
  );
}

export default App;
